import papi, { logger } from '@papi/frontend';
import { getErrorMessage } from 'platform-bible-utils';
import { LocalProjectInfo } from './home.component';

/**
 * The `platform.*` project settings each Home project-list row needs. Requested as a batch via
 * `getMetadataForAllProjects({ includeSettings })` so a supporting Project Data Provider Factory
 * returns them in each project's `settingsSnapshot` in a single cross-process call — replacing the
 * previous per-project `projectDataProviders.get` + 4 serial `getSetting` fan-out (~5×N
 * cross-process round-trips, the cause of the slow initial Home load with many projects).
 */
const HOME_PROJECT_SETTING_KEYS = [
  'platform.isPublished',
  'platform.fullName',
  'platform.name',
  'platform.language',
] as const;

/** The minimal shape this helper reads off each `ProjectMetadata` returned by the project lookup. */
type ProjectMetadataWithSnapshot = {
  id: string;
  settingsSnapshot?: { [settingName: string]: unknown };
};

/** Read a snapshot value as a string, treating any non-string (or absent) value as empty. */
function readSnapshotString(
  snapshot: { [settingName: string]: unknown },
  settingName: string,
): string {
  const value = snapshot[settingName];
  return typeof value === 'string' ? value : '';
}

/**
 * Resolve one project's {@link LocalProjectInfo}.
 *
 * Fast path: take the row straight off `settingsSnapshot` — but only when it carries every needed
 * setting AND the display strings (`fullName`, `language`) are actually set. An unset string comes
 * back empty from the snapshot; the snapshot deliberately does NOT invent a value for it, so for
 * those we defer to `getSetting` (fallback below) — the same value the per-project / pre-batch code
 * returned. This keeps the snapshot a faithful batch of `getSetting`, so a project renders the same
 * whether it took the fast path or the fallback.
 *
 * Fallback: a provider that does not support the `includeSettings` hint, or a project with an unset
 * display setting — fetch directly for just that one project (identical to the pre-batch
 * behavior).
 *
 * Never throws: a project whose lookup fails returns a minimal entry rather than rejecting the
 * whole batch (which would leave the Home list stuck on its spinner).
 */
async function resolveLocalProjectInfo(
  metadata: ProjectMetadataWithSnapshot,
): Promise<LocalProjectInfo> {
  try {
    const { settingsSnapshot } = metadata;
    if (
      settingsSnapshot &&
      HOME_PROJECT_SETTING_KEYS.every((key) => key in settingsSnapshot) &&
      readSnapshotString(settingsSnapshot, 'platform.fullName').length > 0 &&
      readSnapshotString(settingsSnapshot, 'platform.language').length > 0
    ) {
      return {
        projectId: metadata.id,
        isPublished: settingsSnapshot['platform.isPublished'] === true,
        fullName: readSnapshotString(settingsSnapshot, 'platform.fullName'),
        name: readSnapshotString(settingsSnapshot, 'platform.name'),
        language: readSnapshotString(settingsSnapshot, 'platform.language'),
      };
    }

    const pdp = await papi.projectDataProviders.get('platform.base', metadata.id);
    const [isPublished, fullName, name, language] = await Promise.all([
      pdp.getSetting('platform.isPublished'),
      pdp.getSetting('platform.fullName'),
      pdp.getSetting('platform.name'),
      pdp.getSetting('platform.language'),
    ]);
    return { projectId: metadata.id, isPublished, fullName, name, language };
  } catch (e) {
    logger.warn(
      `get-local-projects: could not load info for project ${metadata.id}: ${getErrorMessage(e)}`,
    );
    return {
      projectId: metadata.id,
      isPublished: false,
      fullName: metadata.id,
      name: metadata.id,
      language: '',
    };
  }
}

/**
 * Loads the Home tab's local scripture project list along with the settings each row needs, using a
 * single batched cross-process request (see {@link HOME_PROJECT_SETTING_KEYS}).
 *
 * @param excludePdpFactoryIds PDP factory ids to exclude from the project lookup.
 * @returns Local project info for every available scripture project.
 */
export async function getLocalProjectsInfo(
  excludePdpFactoryIds: string[],
): Promise<LocalProjectInfo[]> {
  try {
    const projectMetadata = await papi.projectLookup.getMetadataForAllProjects({
      includeProjectInterfaces: ['platformScripture.USJ_Chapter'],
      excludePdpFactoryIds,
      includeSettings: [...HOME_PROJECT_SETTING_KEYS],
    });
    // resolveLocalProjectInfo never rejects, so one bad project cannot fail the whole batch.
    return await Promise.all(projectMetadata.map((data) => resolveLocalProjectInfo(data)));
  } catch (e) {
    logger.warn(`get-local-projects: failed to load the project list: ${getErrorMessage(e)}`);
    return [];
  }
}

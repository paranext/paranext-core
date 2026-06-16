import papi from '@papi/frontend';
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
 * Fast path: when the project's `settingsSnapshot` carries every needed setting, read them straight
 * off it — no per-project round-trips.
 *
 * Fallback: when a project's PDP factory did not provide a snapshot (e.g. a non-Paratext provider
 * that does not support the `includeSettings` hint) or it is incomplete, fetch the settings
 * directly for just that one project. This preserves correctness for providers that do not support
 * the hint.
 */
async function resolveLocalProjectInfo(
  metadata: ProjectMetadataWithSnapshot,
): Promise<LocalProjectInfo> {
  const { settingsSnapshot } = metadata;
  if (settingsSnapshot && HOME_PROJECT_SETTING_KEYS.every((key) => key in settingsSnapshot)) {
    const name = readSnapshotString(settingsSnapshot, 'platform.name');
    const fullName = readSnapshotString(settingsSnapshot, 'platform.fullName');
    return {
      projectId: metadata.id,
      isPublished: settingsSnapshot['platform.isPublished'] === true,
      // An unset full name (empty on the wire) falls back to the short name — matching the
      // convention the Manage Books project list uses.
      fullName: fullName.length > 0 ? fullName : name,
      name,
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
  const projectMetadata = await papi.projectLookup.getMetadataForAllProjects({
    includeProjectInterfaces: ['platformScripture.USJ_Chapter'],
    excludePdpFactoryIds,
    includeSettings: [...HOME_PROJECT_SETTING_KEYS],
  });
  return Promise.all(projectMetadata.map((data) => resolveLocalProjectInfo(data)));
}

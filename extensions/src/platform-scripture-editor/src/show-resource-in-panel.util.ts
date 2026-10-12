import papi, { logger } from '@papi/backend';
import type { OpenWebViewOptions, SavedWebViewDefinition } from '@papi/core';
import { doesCatalogRowCoverProject, getErrorMessage } from 'platform-bible-utils';
import type { DblResourceData, ResourceType } from 'platform-bible-utils';
import type { DblResourceReference, ProjectReference, ResourceReference } from 'platform-scripture';
import {
  getResourceReferenceRowId,
  isProjectReference,
  isSameResource,
} from './resource-reference.utils';
import { addToUserTextConnections, toResourceReference } from './select-dbl-resource';
import {
  BIBLE_TEXTS_PANEL_WEBVIEW_TYPE,
  COMMENTARIES_PANEL_WEBVIEW_TYPE,
  warnTabCouldNotOpen,
} from './show-panel.util';

/**
 * Options the Bible texts and Commentaries providers accept. `reloadWebView` types its options as
 * `ReloadWebViewOptions`, but forwards the whole object to the provider, so a resource to select
 * travels with the one build it was asked for.
 */
export interface ResourceTextPanelOptions extends OpenWebViewOptions {
  /** The container project whose texts the panel lists */
  projectId?: string;
  /** The row id of a resource to select in place of the one the panel had selected */
  selectedResourceId?: string;
}

/**
 * The web view state a Bible texts or Commentaries panel is built with: its saved state, the kind
 * of resource it lists, and — when one was asked for — the resource to select.
 *
 * @param savedState The panel's saved state
 * @param resourceType The kind of resource the panel lists
 * @param options The options the panel is being built with
 * @returns The state to build the panel with
 */
export function buildResourceTextPanelState(
  savedState: Record<string, unknown> | undefined,
  resourceType: Extract<ResourceType, 'ScriptureResource' | 'CommentaryResource'>,
  options: ResourceTextPanelOptions,
): Record<string, unknown> {
  return {
    ...savedState,
    resourceType,
    ...(options.selectedResourceId !== undefined
      ? { selectedResourceId: options.selectedResourceId }
      : {}),
  };
}

/** What {@link findCatalogEntry} learned about a resource. */
type CatalogLookup = {
  /** The resource's catalog entry, if either list has one */
  entry: DblResourceData | undefined;
  /**
   * Whether the resource's kind — Bible text or commentary — is known. Not when it is in neither
   * list and the locally-installed list could not be read: it may be a non-DBL commentary, and
   * guessed to be a Bible text it would be asked of a panel that cannot list it.
   */
  isKindKnown: boolean;
  /**
   * Whether the reference built from {@link entry} (or from its absence) can be trusted to be the
   * one the resource is identified by, and so is safe to save. Not while the DBL catalog is unread
   * or not loaded yet: the locally-installed list is then built without it, so every installed
   * resource — DBL ones too — comes back as a non-DBL entry, identified by its project rather than
   * its DBL entry. Saved, that would sit in the list as a second, differently-identified copy of
   * the resource once it is added properly. Never when {@link isKindKnown} is not. With the catalog
   * `notConfigured` — no DBL credentials in this build — every resource is identified by its
   * project, and that is what is saved.
   */
  isReferenceKindKnown: boolean;
};

/**
 * Finds the catalog entry for a locally-installed resource the way the panels build their rows: the
 * DBL catalog followed by the locally-installed resources that are not in it, with the installed
 * flags brought up to date first — the catalog otherwise answers one refresh behind, and would miss
 * a resource installed since.
 *
 * @param resourceProjectId The resource's local project id
 * @returns See {@link CatalogLookup}
 */
async function findCatalogEntry(resourceProjectId: string): Promise<CatalogLookup> {
  // Awaited in full, with no timeout: the local list below waits for the same sync anyway, and
  // reading the catalog before it finishes could mislabel a just-installed resource.
  try {
    await papi.commands.sendCommand('platformGetResources.refreshResourceFlags', false);
  } catch (e) {
    logger.warn(`Could not refresh resource flags before reading: ${getErrorMessage(e)}`);
  }
  const [dblResult, localResult] = await Promise.allSettled([
    papi.commands.sendCommand('platformGetResources.getCachedResources'),
    papi.commands.sendCommand('platformGetResources.getLocalNonDblResources'),
  ]);
  if (dblResult.status === 'rejected')
    logger.warn(`Could not read the DBL resource catalog: ${getErrorMessage(dblResult.reason)}`);
  if (localResult.status === 'rejected')
    logger.warn(
      `Could not read the locally-installed resources: ${getErrorMessage(localResult.reason)}`,
    );

  const catalog = dblResult.status === 'fulfilled' ? dblResult.value : undefined;
  const dblEntries = catalog?.status === 'available' ? catalog.resources : [];
  const localEntries = localResult.status === 'fulfilled' ? localResult.value : [];
  const entry = [...dblEntries, ...localEntries].find((candidate) =>
    doesCatalogRowCoverProject(candidate, resourceProjectId),
  );
  const isCatalogKnown =
    catalog?.status === 'available' ||
    (catalog?.status === 'unavailable' && catalog.reason === 'notConfigured');
  const isKindKnown = !!entry || localResult.status === 'fulfilled';
  return {
    entry,
    isKindKnown,
    isReferenceKindKnown: isCatalogKnown && isKindKnown,
  };
}

/**
 * The reference a resource with no catalog entry is listed under: a project reference, as the
 * panels list it among the downloaded resources.
 *
 * @param resourceProjectId The resource's local project id
 * @returns A project reference named after the resource
 */
async function toUncataloguedResourceReference(
  resourceProjectId: string,
): Promise<ProjectReference> {
  let name = resourceProjectId;
  try {
    const metadata = await papi.projectLookup.getMetadataForProject(resourceProjectId);
    name = metadata.name ?? resourceProjectId;
  } catch (e) {
    logger.warn(`Could not read the name of resource ${resourceProjectId}: ${getErrorMessage(e)}`);
  }
  return { type: 'project', name, id: resourceProjectId };
}

/**
 * The team's list of texts for a project — the shared list the Team layout dialog writes.
 *
 * @param projectId The project whose list to read
 * @returns The list's references, or `undefined` if it could not be read
 */
async function getTeamReferences(projectId: string): Promise<ResourceReference[] | undefined> {
  try {
    const projectSettings = await papi.projectDataProviders.get('platform.base', projectId);
    const teamList = await projectSettings.getSetting(
      'platformScripture.referencedProjectsAndResources',
    );
    // Reaches this project through send/receive without being validated, so an item may be any
    // shape; one whose `id` is not a string would throw when matched.
    return Array.isArray(teamList?.items)
      ? teamList.items.filter(
          (item) =>
            !!item && typeof item === 'object' && (!('id' in item) || typeof item.id === 'string'),
        )
      : [];
  } catch (e) {
    logger.warn(`Could not read the team's texts for project ${projectId}: ${getErrorMessage(e)}`);
    return undefined;
  }
}

/**
 * The panel a resource of this kind is shown in. Each panel lists only rows of its own type, so a
 * resource of any other type would be selected in a panel that filters it out.
 *
 * @param entry The resource's catalog entry, if it has one
 * @returns The panel's web view type, or `undefined` if no panel shows this kind of resource
 */
function getPanelWebViewType(entry: DblResourceData | undefined): string | undefined {
  // No entry is listed as a Bible text, the same default the panels give it.
  if (!entry || entry.type === 'ScriptureResource') return BIBLE_TEXTS_PANEL_WEBVIEW_TYPE;
  if (entry.type === 'CommentaryResource') return COMMENTARIES_PANEL_WEBVIEW_TYPE;
  return undefined;
}

/** A show that failed after the user was told so. */
class ShowFailedError extends Error {}

/**
 * Fails a show the user asked for: tells them, and rejects so the caller knows not to open the
 * resource some other way.
 *
 * @param message What went wrong, for the log
 */
async function failToShow(message: string): Promise<never> {
  logger.error(message);
  await warnTabCouldNotOpen();
  throw new ShowFailedError(message);
}

/** See {@link showResourceInReferencePanel}. */
async function showResourceNow(resourceProjectId: string): Promise<string | undefined> {
  let openDefinitions: SavedWebViewDefinition[];
  try {
    openDefinitions = await papi.webViews.getAllOpenWebViewDefinitions();
  } catch (e) {
    return failToShow(`Could not find the reference tabs: ${getErrorMessage(e)}`);
  }
  const panels = openDefinitions.filter(
    (definition) =>
      definition.webViewType === BIBLE_TEXTS_PANEL_WEBVIEW_TYPE ||
      definition.webViewType === COMMENTARIES_PANEL_WEBVIEW_TYPE,
  );
  // The panels list the resources of the project they show; with none, there is no list to add to.
  // In Simple mode these panels are always open, so this is the case of no project being open —
  // and then the middle column has no project for the resource to replace either. Checked before
  // the catalog, which can be slow to read, since the answer does not depend on it.
  if (!panels.some((definition) => definition.projectId)) return undefined;

  const { entry, isKindKnown, isReferenceKindKnown } = await findCatalogEntry(resourceProjectId);
  // Not guessed: a panel asked for a resource it cannot list shows another one in its place.
  if (!isKindKnown)
    return failToShow(`Could not tell which reference panel lists resource ${resourceProjectId}`);
  const webViewType = getPanelWebViewType(entry);
  // A source-language, enhanced or XML resource is listed in neither panel. It opens the way it
  // always has, in its own viewer.
  if (!webViewType) {
    logger.info(
      `No reference panel lists ${entry?.type} ${resourceProjectId}; not showing it there`,
    );
    return undefined;
  }
  const panel = panels.find((definition) => definition.webViewType === webViewType);
  if (!panel?.projectId)
    return failToShow(`The ${webViewType} tab is not open on a project to show the resource in`);

  const reference: DblResourceReference | ProjectReference = entry
    ? toResourceReference(entry)
    : await toUncataloguedResourceReference(resourceProjectId);

  // Already on the team's list, the resource is available to this user too, and is selected under
  // the team's own reference — which may spell its DBL entry UID in other casing than the catalog,
  // or name the resource by its project rather than its DBL entry.
  const teamReferences = await getTeamReferences(panel.projectId);
  const teamReference = teamReferences?.find(
    (item) =>
      isSameResource(item, reference) ||
      (isProjectReference(item) && item.id === resourceProjectId),
  );
  const selectedReference = teamReference ?? reference;

  // Not saved when the team's list is unknown, as that could save a copy of the team's own
  // reference, nor when the reference's kind is uncertain (see `isReferenceKindKnown`). The panel
  // still lists the resource among the downloaded ones, so it is shown either way.
  if (teamReferences && !teamReference && isReferenceKindKnown) {
    try {
      const textConnections = await papi.projectDataProviders.get(
        'platformScripture.textConnectionSettings',
        panel.projectId,
      );
      await addToUserTextConnections(
        reference,
        () => textConnections.getUserReferencedProjectsAndResources(),
        (list) => textConnections.setUserReferencedProjectsAndResources(list),
      );
    } catch (e) {
      logger.warn(
        `Could not add resource ${resourceProjectId} to the personal list of project ${panel.projectId}: ${getErrorMessage(e)}`,
      );
    }
  } else if (!teamReference) {
    logger.info(
      `Not adding resource ${resourceProjectId} to the personal list of project ${panel.projectId}: ${
        teamReferences
          ? 'its catalog entry could not be confirmed'
          : "the team's list could not be read"
      }`,
    );
  }

  // No `projectId`: the panel keeps whichever project it shows by the time the reload lands, which
  // a project switch during this show may have changed.
  const reloadOptions: ResourceTextPanelOptions = {
    bringToFront: true,
    selectedResourceId: getResourceReferenceRowId(selectedReference),
  };
  let shownWebViewId: string | undefined;
  try {
    shownWebViewId = await papi.webViews.reloadWebView(webViewType, panel.id, reloadOptions);
  } catch (e) {
    return failToShow(`Could not reload the ${webViewType} tab: ${getErrorMessage(e)}`);
  }
  // The tab went away between finding it and reloading it.
  if (!shownWebViewId) return failToShow(`The ${webViewType} tab closed before it could be shown`);
  return shownWebViewId;
}

/** The show in progress, which the next one waits for. */
let previousShow: Promise<unknown> = Promise.resolve();

/**
 * Shows a locally-installed resource in the reference panel for its kind — commentaries in the
 * Commentaries tab, Bible texts (and resources the catalog does not describe) in Bible texts — and,
 * unless the team's list already has it, adds it to the current user's personal list for the
 * project that panel shows. It is shown but not added when that cannot be settled safely: the
 * team's list or the resource's catalog entry cannot be read yet. The shared (team) list is never
 * written, so the resource is added for this user only.
 *
 * Simple mode's middle column only ever shows the project, so this is how a resource is opened
 * there rather than in a Scripture editor.
 *
 * Shows run one at a time: two at once would race over the same personal list, and the later one
 * the user asked for could lose.
 *
 * @param resourceProjectId The resource's local project id
 * @returns The panel's web view id, or `undefined` if the resource should be opened some other way:
 *   neither reference panel is showing a project to add it to, or it is of a kind neither panel
 *   lists
 * @throws If the panel could not be shown. The user has been told.
 */
export function showResourceInReferencePanel(
  resourceProjectId: string,
): Promise<string | undefined> {
  const show = previousShow
    .then(() => showResourceNow(resourceProjectId))
    .catch(async (e) => {
      // The expected failures have told the user already; this tells them about any other.
      if (!(e instanceof ShowFailedError)) {
        logger.error(`Could not show resource ${resourceProjectId}: ${getErrorMessage(e)}`);
        await warnTabCouldNotOpen();
      }
      throw e;
    });
  previousShow = show.catch(() => undefined);
  return show;
}

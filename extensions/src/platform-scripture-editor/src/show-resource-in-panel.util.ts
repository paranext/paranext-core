import papi, { logger } from '@papi/backend';
import type { SavedWebViewDefinition } from '@papi/core';
import { doesCatalogRowCoverProject, getErrorMessage } from 'platform-bible-utils';
import type { DblResourceData } from 'platform-bible-utils';
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
 * Row ids to select in a reference panel the next time its provider builds it, keyed by web view
 * type. Carries the selection through `reloadWebView`, which has no options for extra data.
 */
const pendingResourceSelections = new Map<string, string>();

/**
 * Takes the selection {@link showResourceInReferencePanel} queued for a panel, if any. Called by the
 * panel's web view provider; the selection applies to one build only.
 *
 * @param webViewType The panel's web view type
 * @returns The row id to select, or `undefined` if none is queued
 */
export function takePendingResourceSelection(webViewType: string): string | undefined {
  const rowId = pendingResourceSelections.get(webViewType);
  pendingResourceSelections.delete(webViewType);
  return rowId;
}

/** What {@link findCatalogEntry} learned about a resource. */
type CatalogLookup = {
  /** The resource's catalog entry, if either list has one */
  entry: DblResourceData | undefined;
  /**
   * Whether the reference built from {@link entry} (or from its absence) can be trusted to be the
   * one the resource is identified by. Not while the DBL catalog is unread or not loaded yet: the
   * locally-installed list is then built without it, so every installed resource — DBL ones too —
   * comes back as a non-DBL entry, identified by its project rather than its DBL entry. Saved, that
   * would sit in the list as a second, differently-identified copy of the resource once it is added
   * properly. With the catalog `notConfigured` — no DBL credentials in this build — every resource
   * is identified by its project, and that is what is saved.
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
  // Not bounded by a timeout: the local list below waits for the same sync regardless, and a catalog
  // read before it finishes could miss a resource installed since and so mislabel it.
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
  return {
    entry: [...dblEntries, ...localEntries].find((entry) =>
      doesCatalogRowCoverProject(entry, resourceProjectId),
    ),
    isReferenceKindKnown:
      catalog?.status === 'available' ||
      (catalog?.status === 'unavailable' && catalog.reason === 'notConfigured'),
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
 * @returns The list's references, or none if it could not be read
 */
async function getTeamReferences(projectId: string): Promise<ResourceReference[]> {
  try {
    const projectSettings = await papi.projectDataProviders.get('platform.base', projectId);
    const teamList = await projectSettings.getSetting(
      'platformScripture.referencedProjectsAndResources',
    );
    // Reaches this project through send/receive without being validated, so an item may be any
    // shape; one without a string id is no use for matching, and would break it.
    return Array.isArray(teamList?.items)
      ? teamList.items.filter(
          (item) =>
            !!item && typeof item === 'object' && (!('id' in item) || typeof item.id === 'string'),
        )
      : [];
  } catch (e) {
    logger.warn(`Could not read the team's texts for project ${projectId}: ${getErrorMessage(e)}`);
    return [];
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

/**
 * Fails a show the user asked for: tells them, and rejects so the caller knows not to open the
 * resource some other way.
 *
 * @param message What went wrong, for the log
 */
async function failToShow(message: string): Promise<never> {
  logger.warn(message);
  await warnTabCouldNotOpen();
  throw new Error(message);
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

  const { entry, isReferenceKindKnown } = await findCatalogEntry(resourceProjectId);
  const webViewType = getPanelWebViewType(entry);
  if (!webViewType)
    return failToShow(`No reference panel shows resource ${resourceProjectId} (${entry?.type})`);
  const panel = panels.find((definition) => definition.webViewType === webViewType);
  if (!panel?.projectId)
    return failToShow(`The ${webViewType} tab is not open on a project to show the resource in`);

  const reference: DblResourceReference | ProjectReference = entry
    ? toResourceReference(entry)
    : await toUncataloguedResourceReference(resourceProjectId);

  // Already on the team's list, the resource is available to this user too, and is selected under
  // the team's own reference — which may spell its DBL entry UID in other casing than the catalog,
  // or name the resource by its project rather than its DBL entry.
  const teamReference = (await getTeamReferences(panel.projectId)).find(
    (item) =>
      isSameResource(item, reference) ||
      (isProjectReference(item) && item.id === resourceProjectId),
  );
  const selectedReference = teamReference ?? reference;

  // A reference of uncertain kind is not saved (see `isReferenceKindKnown`). The panel still lists
  // the resource among the downloaded ones, so it is shown either way.
  if (!teamReference && isReferenceKindKnown) {
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
  }

  const rowId = getResourceReferenceRowId(selectedReference);
  pendingResourceSelections.set(webViewType, rowId);
  let shownWebViewId: string | undefined;
  try {
    shownWebViewId = await papi.webViews.reloadWebView(webViewType, panel.id, {
      bringToFront: true,
    });
  } catch (e) {
    return failToShow(`Could not reload the ${webViewType} tab: ${getErrorMessage(e)}`);
  } finally {
    // The provider has taken it by now if the reload reached it; a leftover would select this
    // resource on some later, unrelated rebuild.
    if (pendingResourceSelections.get(webViewType) === rowId)
      pendingResourceSelections.delete(webViewType);
  }
  // The tab went away between finding it and reloading it.
  if (!shownWebViewId) return failToShow(`The ${webViewType} tab closed before it could be shown`);
  return shownWebViewId;
}

/** The show in progress, which the next one waits for. */
let previousShow: Promise<unknown> = Promise.resolve();

/**
 * Shows a locally-installed resource in the reference panel for its kind — commentaries in the
 * Commentaries tab, Bible texts (and resources the catalog does not describe) in Bible texts — and
 * adds it to the current user's personal list for the project that panel shows. The shared (team)
 * list is not touched, so the resource is added for this user only.
 *
 * Simple mode's middle column only ever shows the project, so this is how a resource is opened
 * there rather than in a Scripture editor.
 *
 * Shows run one at a time: two at once would race over the same personal list and the same queued
 * selection, and the later one the user asked for could lose.
 *
 * @param resourceProjectId The resource's local project id
 * @returns The panel's web view id, or `undefined` if neither reference panel is showing a project
 *   to add the resource to — the only case in which the caller should open it some other way
 * @throws If the panel could not be shown. The user has already been told.
 */
export function showResourceInReferencePanel(
  resourceProjectId: string,
): Promise<string | undefined> {
  const show = previousShow.then(() => showResourceNow(resourceProjectId));
  previousShow = show.catch(() => undefined);
  return show;
}

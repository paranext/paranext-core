import papi, { logger } from '@papi/backend';
import type { OpenWebViewOptions, SavedWebViewDefinition } from '@papi/core';
import { doesCatalogRowCoverProject, getErrorMessage } from 'platform-bible-utils';
import type { DblResourceData, ResourceType } from 'platform-bible-utils';
import type { DblResourceReference, ProjectReference, ResourceReference } from 'platform-scripture';
import type { ShowResourceInReferencePanelResult } from 'platform-scripture-editor';
import type { DblResourceCatalog } from 'platform-get-resources';
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

/** How long a show waits for the DBL catalog before treating it as unread. */
const CATALOG_READ_WAIT_MS = 5000;

/**
 * The value `work` settles to, or `undefined` if it has not settled within `ms`.
 *
 * @param work The work to wait for. A rejection before the limit is passed on; one after it is
 *   ignored, since nothing is waiting for it any more.
 * @param ms The longest to wait, in milliseconds
 * @returns What `work` resolved to, or `undefined` once the limit has passed
 */
async function withinTime<T>(work: Promise<T>, ms: number): Promise<T | undefined> {
  // Settled on its own so a rejection after the limit is not reported as unhandled.
  work.catch(() => undefined);
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      work,
      new Promise<undefined>((resolve) => {
        timer = setTimeout(() => resolve(undefined), ms);
      }),
    ]);
  } finally {
    clearTimeout(timer);
  }
}

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
  // Awaited in full: reading the catalog before the sync finishes could mislabel a just-installed
  // resource. With no catalog cached yet there is nothing to sync, and it returns at once.
  try {
    await papi.commands.sendCommand('platformGetResources.refreshResourceFlags', false);
  } catch (e) {
    logger.warn(`Could not refresh resource flags before reading: ${getErrorMessage(e)}`);
  }
  // Bounded: with no catalog cached yet, the read queues behind the startup fetch and its retries,
  // which can outlast the show's deadline. Past the limit the catalog counts as unread, so the
  // resource is still shown but not saved (see `isReferenceKindKnown`).
  let catalog: DblResourceCatalog | undefined;
  let hasCatalogTimedOut = false;
  try {
    catalog = await withinTime(
      papi.commands.sendCommand('platformGetResources.getCachedResources'),
      CATALOG_READ_WAIT_MS,
    );
    hasCatalogTimedOut = !catalog;
    if (hasCatalogTimedOut) logger.warn('Gave up waiting for the DBL resource catalog');
  } catch (e) {
    logger.warn(`Could not read the DBL resource catalog: ${getErrorMessage(e)}`);
  }
  const coversResource = (candidate: DblResourceData) =>
    doesCatalogRowCoverProject(candidate, resourceProjectId);
  let entry = catalog?.status === 'available' ? catalog.resources.find(coversResource) : undefined;

  // The locally-installed list is read only when the catalog does not cover the resource: reading
  // it waits on a second sync of the installed flags, for an answer the catalog already gave. Its
  // own wait for the catalog is bounded too, and skipped once this one has already given up, so a
  // slow catalog is waited out once rather than twice.
  let wasLocalListRead = true;
  if (!entry) {
    try {
      const localEntries = await papi.commands.sendCommand(
        'platformGetResources.getLocalNonDblResources',
        hasCatalogTimedOut ? 0 : CATALOG_READ_WAIT_MS,
      );
      entry = localEntries.find(coversResource);
    } catch (e) {
      wasLocalListRead = false;
      logger.warn(`Could not read the locally-installed resources: ${getErrorMessage(e)}`);
    }
  }

  const isCatalogKnown =
    catalog?.status === 'available' ||
    (catalog?.status === 'unavailable' && catalog.reason === 'notConfigured');
  const isKindKnown = !!entry || wasLocalListRead;
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
 * @returns A project reference named after the resource, or `undefined` if no local project has
 *   this id — and so there is no resource to show or save
 */
async function toUncataloguedResourceReference(
  resourceProjectId: string,
): Promise<ProjectReference | undefined> {
  try {
    const metadata = await papi.projectLookup.getMetadataForProject(resourceProjectId);
    return { type: 'project', name: metadata.name ?? resourceProjectId, id: resourceProjectId };
  } catch (e) {
    logger.warn(`Could not find resource ${resourceProjectId}: ${getErrorMessage(e)}`);
    return undefined;
  }
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

/** What a panel's project is: see {@link getPanelProjectKind}. */
type PanelProjectKind = 'project' | 'resource' | 'unknown';

/**
 * What a panel's project is. In Simple mode the reference panels follow whatever the middle column
 * opens, which can be a resource opened in its viewer; a list saved there would belong to that
 * resource, not to any project the user works in.
 *
 * @param projectId The panel's project id
 * @returns `'project'` for a project the user's list can belong to, `'resource'` for a published
 *   resource, or `'unknown'` if that could not be read
 */
async function getPanelProjectKind(projectId: string): Promise<PanelProjectKind> {
  try {
    const projectSettings = await papi.projectDataProviders.get('platform.base', projectId);
    return (await projectSettings.getSetting('platform.isPublished')) ? 'resource' : 'project';
  } catch (e) {
    logger.warn(`Could not tell whether ${projectId} is a resource: ${getErrorMessage(e)}`);
    return 'unknown';
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
 * How long a show has, from the request, to reach the point where it saves or changes a tab.
 * Shorter than PAPI's 30-second request timeout, so the caller hears how the show ended rather than
 * timing out while it may still go on to happen — unless the save and reload themselves are slow,
 * which nothing bounds. The command's declaration in `platform-scripture-editor.d.ts` states this
 * value; keep the two in step.
 */
export const SHOW_DEADLINE_MS = 20_000;

/**
 * One show's progress against its deadline. Once `commit` succeeds, the show will save and change
 * the tab; once the deadline has passed first, it never will. Whichever of the show and the
 * deadline settles it first is the one that tells the user how it ended, so they are told once.
 */
type ShowProgress = {
  /** Whether the deadline passed, and the user was told, before the show committed */
  isAbandoned: () => boolean;
  /** Claims the show for saving and showing, unless it has been abandoned. @returns Whether it may */
  commit: () => boolean;
  /**
   * Marks the show as ended, so the deadline no longer acts on it.
   *
   * @returns Whether the show may still tell the user how it ended — `false` once it was abandoned
   */
  settle: () => boolean;
};

/** Errors from shows that failed, or were abandoned, after the user was told so. */
const showFailedErrors = new WeakSet<Error>();

/**
 * An error for a show that failed, or was abandoned, after the user was told so.
 *
 * Not a subclass of `Error`: the extension build compiles `extends Error` to a helper that calls
 * `Function.toString`, and the extension host deletes `Function`, so the module would throw on
 * load.
 *
 * @param message What went wrong, for the log
 * @returns The error, recognized by {@link isShowFailedError}
 */
function showFailedError(message: string): Error {
  const error = new Error(message);
  showFailedErrors.add(error);
  return error;
}

/** Whether `e` came from {@link showFailedError}. */
function isShowFailedError(e: unknown): boolean {
  return e instanceof Error && showFailedErrors.has(e);
}

/**
 * Fails a show the user asked for: tells them (unless an abandoned show already has), and throws so
 * the caller knows not to open the resource some other way.
 *
 * @param progress The show's progress against its deadline
 * @param message What went wrong, for the log
 */
async function failToShow(progress: ShowProgress, message: string): Promise<never> {
  logger.error(message);
  // Settled before the warning is sent, or the deadline could pass while it is in flight and warn
  // again.
  if (progress.settle()) await warnTabCouldNotOpen();
  throw showFailedError(message);
}

/** See {@link showResourceInReferencePanel}. */
async function showResourceNow(
  resourceProjectId: string,
  progress: ShowProgress,
): Promise<string | undefined> {
  let openDefinitions: SavedWebViewDefinition[];
  try {
    openDefinitions = await papi.webViews.getAllOpenWebViewDefinitions();
  } catch (e) {
    return failToShow(progress, `Could not find the reference tabs: ${getErrorMessage(e)}`);
  }
  const panels = openDefinitions.filter(
    (definition) =>
      definition.webViewType === BIBLE_TEXTS_PANEL_WEBVIEW_TYPE ||
      definition.webViewType === COMMENTARIES_PANEL_WEBVIEW_TYPE,
  );
  // Simple mode always has these panels open, project or no project. With neither open there is no
  // tab to show the resource in. Checked before the catalog, which can be slow to read, since the
  // answer does not depend on it.
  if (panels.length === 0) return undefined;

  const { entry, isKindKnown, isReferenceKindKnown } = await findCatalogEntry(resourceProjectId);
  // Not guessed: a panel asked for a resource it cannot list shows another one in its place.
  if (!isKindKnown)
    return failToShow(
      progress,
      `Could not tell which reference panel lists resource ${resourceProjectId}`,
    );
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
  if (!panel) return failToShow(progress, `The ${webViewType} tab is not open`);
  // With no project open the panel still shows the resource, from the downloaded ones; there is
  // just no project whose list it could be added to.
  const panelProjectId = panel.projectId;

  const reference: DblResourceReference | ProjectReference | undefined = entry
    ? toResourceReference(entry)
    : await toUncataloguedResourceReference(resourceProjectId);
  // The command takes any id, so one that names no local project must not reach the user's list.
  if (!reference) return failToShow(progress, `No local resource has id ${resourceProjectId}`);

  // Already on the team's list, the resource is available to this user too, and is selected under
  // the team's own reference — which may spell its DBL entry UID in other casing than the catalog,
  // or name the resource by its project rather than its DBL entry.
  const [teamReferences, panelProjectKind]: [
    ResourceReference[] | undefined,
    PanelProjectKind | 'none',
  ] = panelProjectId
    ? await Promise.all([getTeamReferences(panelProjectId), getPanelProjectKind(panelProjectId)])
    : [undefined, 'none'];
  // The same resource named by its project rather than its DBL entry: matched both against the
  // team's list and when replacing the user's earlier copy, so the two agree.
  const isProjectItemForResource = (item: ResourceReference) =>
    isProjectReference(item) && item.id === resourceProjectId;
  const teamReference = teamReferences?.find(
    (item) => isSameResource(item, reference) || isProjectItemForResource(item),
  );
  const selectedReference = teamReference ?? reference;

  // Everything above only reads. Past this point the show saves and changes the tab, which it must
  // not do once its caller has been told it failed.
  if (!progress.commit())
    throw showFailedError(`Gave up showing resource ${resourceProjectId}: out of time`);

  // Not saved when the team's list is unknown, as that could save a copy of the team's own
  // reference, nor when the reference's kind is uncertain (see `isReferenceKindKnown`), nor when the
  // panel is showing a resource rather than a project (see `getPanelProjectKind`). The panel still
  // lists the resource among the downloaded ones, so it is shown either way.
  if (
    panelProjectId &&
    teamReferences &&
    !teamReference &&
    isReferenceKindKnown &&
    panelProjectKind === 'project'
  ) {
    try {
      const textConnections = await papi.projectDataProviders.get(
        'platformScripture.textConnectionSettings',
        panelProjectId,
      );
      await addToUserTextConnections(
        reference,
        () => textConnections.getUserReferencedProjectsAndResources(),
        (list) => textConnections.setUserReferencedProjectsAndResources(list),
        isProjectItemForResource,
      );
    } catch (e) {
      logger.warn(
        `Could not add resource ${resourceProjectId} to the personal list of project ${panelProjectId}: ${getErrorMessage(e)}`,
      );
    }
  } else if (!teamReference) {
    let reason = "the team's list could not be read";
    if (panelProjectKind === 'none') reason = 'no project is open';
    else if (panelProjectKind === 'resource')
      reason = 'the tab is showing a resource, not a project';
    else if (panelProjectKind === 'unknown') reason = "the tab's project could not be read";
    else if (teamReferences) reason = 'its catalog entry could not be confirmed';
    logger.info(
      `Not adding resource ${resourceProjectId} to a personal list (tab project ${panelProjectId}): ${reason}`,
    );
  }

  const selectedResourceId = getResourceReferenceRowId(selectedReference);
  const reloadOptions: ResourceTextPanelOptions = { bringToFront: true, selectedResourceId };
  let shownWebViewId: string | undefined;
  try {
    shownWebViewId =
      panel.state?.selectedResourceId === selectedResourceId
        ? // Already showing it: raised, not reloaded, so it keeps its scroll position and anything
          // in progress in it.
          await papi.webViews.openWebView(webViewType, undefined, {
            existingId: panel.id,
            createNewIfNotFound: false,
            bringToFront: true,
          })
        : // No `projectId`: the provider then uses the project of the definition as it stands when
          // the reload starts — normally the one found above, though a project switch that lands in
          // the same moment can race it.
          //
          // The reload discards anything in progress in the tab, including a resource its picker
          // is installing before it adds it to the list (PT-4510).
          await papi.webViews.reloadWebView(webViewType, panel.id, reloadOptions);
  } catch (e) {
    return failToShow(progress, `Could not show the ${webViewType} tab: ${getErrorMessage(e)}`);
  }
  // The tab went away between finding it and reloading it.
  if (!shownWebViewId)
    return failToShow(progress, `The ${webViewType} tab closed before it could be shown`);
  return shownWebViewId;
}

/**
 * When the show in progress stops holding up the next one: when it ends, or when it is abandoned.
 * An abandoned show may go on reading, but never saves or changes a tab, so the next one need not
 * wait for it — and a retry the user was just invited to make is not held behind the very show that
 * ran out of time.
 */
let previousShow: Promise<unknown> = Promise.resolve();

const NOT_SHOWN: ShowResourceInReferencePanelResult = { status: 'notShown' };

/**
 * Shows a locally-installed resource in the reference panel for its kind — commentaries in the
 * Commentaries tab, Bible texts (and resources the catalog does not describe) in Bible texts — and,
 * unless the team's list already has it, adds it to the current user's personal list for the
 * project that panel shows. It is shown but not added when that cannot be settled safely: the
 * team's list or the resource's catalog entry cannot be read yet, or no project is open. The shared
 * (team) list is never written, so the resource is added for this user only.
 *
 * Simple mode's middle column only ever shows the project, and resources never open there — not
 * even with no project open — so this is how a resource is opened in Simple mode.
 *
 * Shows run one at a time: two at once would race over the same personal list, and the later one
 * the user asked for could lose. Each has {@link SHOW_DEADLINE_MS} from the request, time spent
 * waiting behind another included, to get as far as saving; past it, the user is told the tab could
 * not be opened, the show is dropped, and the next one may start.
 *
 * @param resourceProjectId The resource's local project id
 * @returns How the show ended; see {@link ShowResourceInReferencePanelResult}. Never rejects.
 */
export function showResourceInReferencePanel(
  resourceProjectId: string,
): Promise<ShowResourceInReferencePanelResult> {
  let state: 'pending' | 'committed' | 'settled' | 'abandoned' = 'pending';
  const progress: ShowProgress = {
    isAbandoned: () => state === 'abandoned',
    commit: () => {
      if (state === 'abandoned') return false;
      state = 'committed';
      return true;
    },
    settle: () => {
      if (state === 'abandoned') return false;
      state = 'settled';
      return true;
    },
  };

  const show = previousShow
    .then(() => {
      // Its time ran out while it waited: the user has been told, so there is nothing left to do.
      if (progress.isAbandoned())
        throw showFailedError(`Gave up showing resource ${resourceProjectId}: out of time`);
      return showResourceNow(resourceProjectId, progress);
    })
    .then((webViewId): ShowResourceInReferencePanelResult => {
      // Abandoned while it finished: the user was told the tab could not be opened, so nothing may
      // open in its place now.
      if (!progress.settle()) return NOT_SHOWN;
      return webViewId ? { status: 'shown', webViewId } : { status: 'openElsewhere' };
    })
    .catch(async (e): Promise<ShowResourceInReferencePanelResult> => {
      // The expected failures have told the user already; this tells them about any other. Logged
      // even past the deadline, which has told the user only that the show ran out of time.
      if (!isShowFailedError(e)) {
        logger.error(`Could not show resource ${resourceProjectId}: ${getErrorMessage(e)}`);
        if (progress.settle()) await warnTabCouldNotOpen();
      }
      return NOT_SHOWN;
    });

  let deadlineTimer: ReturnType<typeof setTimeout> | undefined;
  const deadline = new Promise<ShowResourceInReferencePanelResult>((resolve) => {
    deadlineTimer = setTimeout(() => {
      // A committed show is saving or reloading by now, and a settled one has ended; each answers
      // for itself.
      if (state !== 'pending') return;
      state = 'abandoned';
      logger.warn(`Gave up showing resource ${resourceProjectId}: not ready in time`);
      // Answered without waiting for the warning, so the retry it invites is not held behind it.
      // The warning reports its own failures.
      resolve(NOT_SHOWN);
      warnTabCouldNotOpen();
    }, SHOW_DEADLINE_MS);
  });
  // The deadline only ever resolves for a show it abandoned, so the caller's answer waits out a
  // committed show. The next show waits for this one to end, or to be abandoned — and then still for
  // the show before it, which may be one that committed and is still saving.
  const answered = Promise.race([show, deadline]);
  const waitedFor = previousShow;
  previousShow = Promise.race([show, deadline.then(() => waitedFor)]);
  return answered.finally(() => clearTimeout(deadlineTimer));
}

/** Inputs for {@link resolveTextCollectionProjectId}. */
export type TextCollectionProjectCandidate = {
  /** The web view's own `projectId` when opened with one; always wins when set. */
  explicitProjectId: string | undefined;
  /**
   * `projectId ?? scrollGroupSourceProjectId` — the project the grid would otherwise follow. The
   * fallback half is the scroll group's SOURCE project (whichever project last SET the group's
   * reference), not the active editor's project; see the call site in
   * `scripture-text-grid.web-view.tsx`.
   */
  candidateProjectId: string | undefined;
  /**
   * Whether `candidateProjectId` is one of the resources the grid is currently displaying. Focusing
   * a resource cell (e.g. clicking a verse in Chapter view) navigates from that cell, making the
   * resource the group's source project; the grid must not switch its displayed project to one of
   * its own resources.
   */
  candidateIsOwnResource: boolean;
};

/**
 * Resolves which project's text collection the grid shows, latching the last valid one.
 *
 * Opened from the default layout the grid has no explicit `projectId`, so it falls back to
 * following the scroll group's source project. But each resource cell is itself a Scripture editor,
 * and focusing one (clicking a verse in Chapter view) makes that resource the project that last set
 * the group's reference. Following it would switch the grid to a resource that has no text
 * collection of its own and blank it out. So when the candidate is one of the grid's
 * currently-displayed resources, keep the current project; otherwise adopt the candidate (still
 * following along to a genuinely different text-collection project).
 *
 * A project switch does not travel by this route at all: it supplies `explicitProjectId`, which
 * wins outright (see `updateRelatedTextCollectionPanel`).
 *
 * @param previous The currently-latched project id (undefined before the first one resolves).
 * @param candidate See {@link TextCollectionProjectCandidate}.
 * @returns The project id whose text collection to display.
 */
export function resolveTextCollectionProjectId(
  previous: string | undefined,
  candidate: TextCollectionProjectCandidate,
): string | undefined {
  const { explicitProjectId, candidateProjectId, candidateIsOwnResource } = candidate;
  if (explicitProjectId) return explicitProjectId;
  if (!candidateProjectId) return previous;
  if (candidateIsOwnResource) return previous;
  return candidateProjectId;
}

/** What the Text Collection grid's body should render. */
export type GridBodyState = 'cells' | 'loading' | 'empty' | 'error';

/** Inputs for {@link resolveGridBodyState}. */
export type GridBodyStateInput = {
  /** Whether `toGridResources` produced at least one cell to render. */
  hasResources: boolean;
  /** Whether the grid currently has a project to show a collection for. */
  hasProject: boolean;
  /** Whether {@link useTextCollectionSources} has finished assembling its four sources. */
  areSourcesResolved: boolean;
  /** Whether the sources resolved to a failure rather than a value. Terminal. */
  hasSourcesError: boolean;
  /** Whether the cached DBL resource list is still in flight. */
  isLoadingCachedResources: boolean;
  /** Whether the localized strings this body renders are still resolving. */
  isLoadingLocalizedStrings: boolean;
};

/**
 * Decides which of the grid body's four states to render.
 *
 * Extracted as a pure function for the same reason `resolveResourceContentState` is: the sibling
 * Column 3 panels keep this decision out of the render so it can be unit-tested without a web view
 * harness, which the repo does not have.
 *
 * Two rules carry the weight:
 *
 * - **Cells win over loading.** `toGridResources` maps every chosen reference — unresolved DBL ones
 *   become placeholders — so there are cells to show as soon as the sources land, even while the
 *   cached DBL list is still in flight. Each cell renders its own loading/unavailable state, so
 *   showing the text that is ready beats hiding the whole grid behind a spinner.
 * - **Only a bound project can be loading.** With no project there is no
 *   `platformScripture.textConnectionSettings` provider, so the sources never resolve and a spinner
 *   would never end. No project is a steady state, and so is a sources failure — the same rule
 *   `resource-panel-readiness.utils.ts` states as "an unreadable setting is its own answer — never
 *   hide it behind a spinner that cannot end."
 *
 * @param input See {@link GridBodyStateInput}.
 * @returns The body state to render.
 */
export function resolveGridBodyState({
  hasResources,
  hasProject,
  areSourcesResolved,
  hasSourcesError,
  isLoadingCachedResources,
  isLoadingLocalizedStrings,
}: GridBodyStateInput): GridBodyState {
  if (hasResources) return 'cells';
  if (hasSourcesError) return 'error';
  if (!hasProject) return 'empty';
  if (!areSourcesResolved || isLoadingCachedResources || isLoadingLocalizedStrings)
    return 'loading';
  return 'empty';
}

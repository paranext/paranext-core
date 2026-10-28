import type { EffectiveResourceReferenceListState } from './use-effective-resource-reference-list.hook';

/**
 * The front of a resource panel's state machine: what the panel knows about whether anything is
 * configured, before it starts asking which resource to show.
 *
 * - `loading` — the answer is not known yet; show a spinner.
 * - `error` — the configured list could not be read; show a message. Not recoverable from the panel,
 *   so it carries no control (see `PanelReadinessView`).
 * - `catalogError` — the resource catalog could not be loaded, so a configured item cannot be
 *   resolved; show a message with a retry, which can genuinely re-drive the fetch.
 * - `empty` — nothing is configured; show the pick prompt.
 * - `configured` — there is something to display; continue to the downstream branches.
 */
export type ResourcePanelReadiness = 'loading' | 'error' | 'catalogError' | 'empty' | 'configured';

/** The two independent async sources a panel's readiness is derived from. */
export type ResourcePanelReadinessInput = {
  /**
   * The effective resource reference list's state (see `useEffectiveResourceReferenceList`), passed
   * whole rather than as a status plus a separate count.
   *
   * Taking `listStatus` and `configuredCount` separately let them disagree — `'loading'` alongside
   * a count of five, or `'ready'` alongside zero when a list was never delivered — which is the
   * shape the union exists to forbid (see `adr-async-hook-state-shape`). The count is derived here
   * from the narrowed union instead.
   */
  listState: EffectiveResourceReferenceListState;
  /** Whether the DBL resource catalog has finished loading and delivered. */
  isCatalogReady: boolean;
  /** Whether the catalog fetch failed. Recoverable by re-fetching. */
  hasCatalogError: boolean;
  /**
   * How many configured items belong to this panel's resource type. Meaningful only once the
   * catalog has arrived, and not derivable here because filtering needs the catalog and the panel's
   * resource type. Omit for a panel that does not filter, where every configured item matches.
   */
  matchingCount?: number;
};

/**
 * Decides a resource panel's readiness from its two independent async sources.
 *
 * Both panels used to answer "is anything configured?" from a value that is only meaningful once
 * the data had arrived — a list filtered against a catalog that had not loaded yet, or a loading
 * flag that tracked only one of the two sources. Either way a correctly-configured resource
 * rendered as "nothing selected" for the whole fetch. Readiness must therefore be decided from
 * whether the sources have _arrived_, never from whether the result came out empty.
 *
 * Takes an options object rather than positional arguments: the counts are numbers with different
 * meanings, and transposing them silently changes the answer.
 *
 * @param input See {@link ResourcePanelReadinessInput}.
 * @returns Which of the five front states the panel should render.
 */
export function getResourcePanelReadiness({
  listState,
  isCatalogReady,
  hasCatalogError,
  matchingCount,
}: ResourcePanelReadinessInput): ResourcePanelReadiness {
  const listStatus = listState.status;
  const configuredCount = listState.status === 'ready' ? listState.list.items.length : 0;
  const matching = matchingCount ?? configuredCount;

  // An unreadable setting is its own answer — never hide it behind a spinner that cannot end. It
  // outranks a catalog failure because it is the more fundamental of the two.
  if (listStatus === 'error') return 'error';
  if (listStatus === 'loading') return 'loading';

  // Nothing configured at all needs no catalog to be certain, so don't make the user wait for one —
  // and don't report a catalog failure that cannot affect the answer.
  if (configuredCount === 0) return 'empty';

  // Something is configured but the catalog that would resolve it is not coming. Saying so beats
  // spinning on a fetch that already failed.
  if (hasCatalogError) return 'catalogError';

  // Whether a configured item belongs to this panel is a question only the catalog can answer.
  // Deciding "empty" before it arrives is the premature empty state.
  if (!isCatalogReady) return 'loading';

  return matching === 0 ? 'empty' : 'configured';
}

/**
 * Whether a resource panel knows enough to declare the project it displays.
 *
 * Distinct from {@link getResourcePanelReadiness}, which decides what to _render_: an unreadable
 * list or a failed catalog is a renderable answer ("show a message"), but it is not an answer about
 * which project is on screen. The resolved project id is `undefined` in all of those states, and
 * publishing `undefined` as "nothing displayed" would overwrite a correct persisted declaration —
 * so every source the displayed project is derived from has to have arrived.
 *
 * @param listState The effective resource reference list's state (see
 *   `useEffectiveResourceReferenceList`)
 * @param isCatalogReady Whether the DBL resource catalog has finished loading and delivered
 * @param arePanelRowsReady Whether the panel's own rows have been built. Defaults to `true` for a
 *   panel whose displayed project comes straight from the list and the catalog; a panel that also
 *   unions in locally-downloaded projects must pass its own readiness, or it publishes an empty
 *   declaration during the window when that third source is still in flight.
 * @returns True when the panel's displayed project id can be trusted, published included
 */
export function canPublishResourcePanelProjectIds(
  listState: EffectiveResourceReferenceListState,
  isCatalogReady: boolean,
  arePanelRowsReady: boolean = true,
): boolean {
  return listState.status === 'ready' && isCatalogReady && arePanelRowsReady;
}

/**
 * The sources a panel's SELECTION readiness is decided from.
 *
 * The same three async sources as {@link ResourcePanelReadinessInput}, whose field docs apply
 * unchanged, minus `matchingCount` — which panel a configured item belongs to does not bear on
 * whether a row's absence is genuine — plus the panel's own row readiness.
 */
export type ResourceSelectionReadinessInput = Omit<ResourcePanelReadinessInput, 'matchingCount'> & {
  /**
   * Whether the panel's own rows have been built. Defaults to `true` for a panel whose rows come
   * straight from the list and the catalog; a panel that also unions in locally-downloaded projects
   * must pass its own readiness.
   *
   * Defaulted here, while `resolveResourceSelection` refuses to default its settlement flags, and
   * the difference is not an inconsistency: this one describes a THIRD source that most panels do
   * not have, so `true` is the correct reading of "no such source to wait for". A missing
   * settlement flag has no correct reading — its safe-looking default, `false`, renders no resource
   * at all — so it is required instead.
   */
  arePanelRowsReady?: boolean;
};

/**
 * Whether a resource panel's sources have SETTLED enough to decide its selection.
 *
 * Distinct from {@link canPublishResourcePanelProjectIds}, which asks whether the displayed project
 * id can be trusted and therefore waits for a catalog that actually arrived. Selection asks a
 * different question — "is this row's absence from the filtered list real, or has its source simply
 * not landed?" — and a catalog that definitively FAILED answers it well enough to DISPLAY on: the
 * rows in hand are all the rows there are for now.
 *
 * `isCatalogReady` stays `false` for the rest of the session after a catalog failure, while
 * locally-downloaded rows still arrive and are still selectable. Waiting for readiness here would
 * leave the panel with no selection, hence no resource project id, hence a permanent spinner — and
 * no reachable retry, because the panel is `configured` and so never renders `PanelReadinessView`.
 * Failing closed is safe where it means "declare nothing"; here it would mean "show nothing".
 *
 * "For now" is the limit of what a failure settles, and it is why this answer governs display only.
 * A failed catalog is retryable (`refetchCatalog`), and a DBL reference with no catalog row
 * resolves to nothing at all, so a selection can be absent purely because the fetch failed. Writing
 * a fallback over it on that evidence loses the pick permanently — unseen, since the panel is
 * showing the catalog-error view at the time. Callers therefore pass this to
 * `resolveResourceSelection`'s `areSourcesSettled` and the stricter
 * {@link canPublishResourcePanelProjectIds} to its `mayPersistCorrection`.
 *
 * Worth knowing what this does NOT decide. Given the panel's own readiness gate, every state in
 * which the panel actually renders content already implies this is true — so in practice the answer
 * does its work in the states where content is NOT rendered, by withholding the auto-correct that
 * would otherwise run behind an error or loading view where the reader cannot see it.
 *
 * @param input See {@link ResourceSelectionReadinessInput}.
 * @returns True when an absence from the filtered rows can be read as genuine for display purposes
 */
export function canResolveResourceSelection({
  listState,
  isCatalogReady,
  hasCatalogError,
  arePanelRowsReady = true,
}: ResourceSelectionReadinessInput): boolean {
  return listState.status === 'ready' && arePanelRowsReady && (isCatalogReady || hasCatalogError);
}

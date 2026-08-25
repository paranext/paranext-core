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
   * shape the union exists to forbid (see ADR-0025). The count is derived here from the narrowed
   * union instead.
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

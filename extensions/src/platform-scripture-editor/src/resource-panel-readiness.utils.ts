/**
 * The front of a resource panel's state machine: what the panel knows about whether anything is
 * configured, before it starts asking which resource to show.
 *
 * - `loading` — the answer is not known yet; show a spinner.
 * - `error` — the configured list could not be read; show a message and a way to retry.
 * - `empty` — nothing is configured; show the pick prompt.
 * - `configured` — there is something to display; continue to the downstream branches.
 */
export type ResourcePanelReadiness = 'loading' | 'error' | 'empty' | 'configured';

/**
 * Decides a resource panel's readiness from its two independent async sources.
 *
 * Both panels used to answer "is anything configured?" from a value that is only meaningful once
 * the data has arrived — a list filtered against a catalog that had not loaded yet, or a loading
 * flag that tracked only one of the two sources. Either way a correctly-configured resource
 * rendered as "nothing selected" for the whole fetch. Readiness must therefore be decided from
 * whether the sources have _arrived_, never from whether the result came out empty.
 *
 * @param listStatus Status of the effective resource reference list (see
 *   `useEffectiveResourceReferenceList`).
 * @param areResourcesReady Whether the DBL resource catalog has finished loading and delivered. A
 *   pending catalog matches no DBL reference, so a zero `matchingCount` means nothing yet.
 * @param configuredCount How many items are configured in total. Catalog-independent, so it alone
 *   can answer "is anything configured at all?".
 * @param matchingCount How many configured items belong to this panel's resource type. Meaningful
 *   only once the catalog has arrived.
 * @returns Which of the four front states the panel should render.
 */
export function getResourcePanelReadiness(
  listStatus: 'loading' | 'error' | 'ready',
  areResourcesReady: boolean,
  configuredCount: number,
  matchingCount: number,
): ResourcePanelReadiness {
  // An unreadable setting is its own answer — never hide it behind a spinner that cannot end.
  if (listStatus === 'error') return 'error';
  if (listStatus === 'loading') return 'loading';
  // Nothing configured at all needs no catalog to be certain, so don't make the user wait for one.
  if (configuredCount === 0) return 'empty';
  // Something is configured, but whether it belongs to this panel is a question only the catalog
  // can answer. Deciding "empty" before it arrives is the premature empty state.
  if (!areResourcesReady) return 'loading';
  return matchingCount === 0 ? 'empty' : 'configured';
}

export default getResourcePanelReadiness;

/**
 * Which of the grid body's three faces to render.
 *
 * - `catalogError` — the DBL catalog is not coming, so configured references cannot be resolved; show
 *   a message with a retry.
 * - `empty` — the Text Collection has arrived and holds nothing to show; show the pick prompt.
 * - `grid` — there are rows, or an answer is still on its way.
 */
export type ScriptureTextGridBodyState = 'catalogError' | 'empty' | 'grid';

/** The independent signals {@link getGridBodyState} decides from. */
export type ScriptureTextGridBodyStateInput = {
  /** Whether any resolved row can be rendered. */
  hasRows: boolean;
  /** Whether the Text Collection source list has been delivered. */
  hasSources: boolean;
  /**
   * Whether the DBL catalog is not coming — the fetch rejected, or the provider has not registered
   * yet. An installation with no DBL credentials is NOT this: it delivers an empty catalog, which
   * is an answer.
   */
  hasCatalogError: boolean;
  /** Whether anything the other three signals depend on is still in flight. */
  isLoading: boolean;
};

/**
 * Decides the grid body's state from whether its inputs have ARRIVED, never from whether the result
 * came out empty.
 *
 * A failed or not-yet-delivered catalog outranks the pick prompt. "No texts to display, open View
 * Options to choose some" is a confident answer to a question that could not be asked, and it is
 * the answer a user is most likely to act on — by re-adding resources the project already has.
 *
 * @param input See {@link ScriptureTextGridBodyStateInput}.
 * @returns The single state to render.
 */
export function getGridBodyState({
  hasRows,
  hasSources,
  hasCatalogError,
  isLoading,
}: ScriptureTextGridBodyStateInput): ScriptureTextGridBodyState {
  if (hasRows || isLoading) return 'grid';
  if (hasCatalogError) return 'catalogError';
  return hasSources ? 'empty' : 'grid';
}

export default getGridBodyState;

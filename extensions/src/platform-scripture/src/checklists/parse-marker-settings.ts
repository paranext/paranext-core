import type { LocalizeKey } from 'platform-bible-utils';

/**
 * Localize key emitted in `errorMessageKey` when validation fails. The wire boundary is responsible
 * for resolving this key to a localized string before display.
 *
 * Mirrors C# `MarkersDataSource.InvalidMarkerPairErrorKey`. Maps to PT9 `MarkerSettingsForm_1`.
 * Translations live in `extensions/src/platform-scripture/contributions/localizedStrings.json`.
 */
export const INVALID_MARKER_PAIR_ERROR_KEY: LocalizeKey =
  '%markersChecklist_errorInvalidMarkerPair%';

/** A single equivalent-markers pair: `"marker1/marker2"`. */
export type MarkerPair = { marker1: string; marker2: string };

/**
 * Discriminated-union result of parsing the equivalent-markers string. The structural invariant
 * (§3.13 mutex) is enforced by narrowing on `valid`: the success branch exposes `parsedPairs`, the
 * failure branch exposes `errorMessageKey`, and neither field is reachable on the other branch.
 */
export type ParseMarkerSettingsResult =
  | { valid: true; parsedPairs: MarkerPair[] }
  | { valid: false; errorMessageKey: LocalizeKey };

/**
 * Parses a single `"marker1/marker2"` token. Returns the pair when the token is well-formed
 * (exactly one slash, both sides non-empty after trim), or `undefined` when malformed.
 */
function parsePairToken(token: string): MarkerPair | undefined {
  const items = token.split('/');
  if (items.length !== 2) return undefined;
  const marker1 = items[0].trim();
  const marker2 = items[1].trim();
  if (marker1.length === 0 || marker2.length === 0) return undefined;
  return { marker1, marker2 };
}

/**
 * Strict pre-commit parser for the equivalent-markers settings string. Used by the Marker Settings
 * dialog for live keystroke feedback AND by the `platformScripture.checklistEquivalentMarkers`
 * project-setting validator.
 *
 * Format: zero or more space-separated `marker1/marker2` pairs. Empty / null / whitespace-only
 * inputs are valid with an empty pair list. On the FIRST malformed token, validation fails fast
 * with no partial-parse leakage (§3.13 mutex invariant: valid=true ⇔ parsedPairs populated;
 * valid=false ⇔ errorMessageKey populated).
 *
 * Port of PT9 `MarkerSettingsForm.btnOk_Click` (Paratext/Checklists/MarkerSettingsForm.cs:28-49)
 * via C# `MarkersDataSource.ValidateMarkerSettings`. Distinct from `initializeMarkerMappings` in
 * `match-detection.ts`, which is the LENIENT runtime parser that silently skips invalid tokens
 * (VAL-005).
 */
export function parseMarkerSettings(input: string): ParseMarkerSettingsResult {
  // PT9 line 30: null coerces to empty.
  const safeInput = input ?? '';

  // PT9 line 31: trim + collapse multiple spaces to single space (no culture sensitivity —
  // matches C# `Regex.Replace(equivalents.Trim(), " +", " ")`).
  const normalized = safeInput.trim().replace(/ +/g, ' ');

  // PT9 line 32: empty after normalization → valid with zero pairs.
  if (normalized.length === 0) return { valid: true, parsedPairs: [] };

  // PT9 lines 34-43: parse each token; the first malformed one rejects the entire input. The
  // `.map` + `.find` form is equivalent to fail-fast: we map every token to a Maybe<pair>, then
  // bail if any are `undefined`. §3.13 forbids partial-parse leak, so the failure branch returns
  // only `errorMessageKey` (no parsedPairs).
  const parsedTokens = normalized.split(' ').map(parsePairToken);
  if (parsedTokens.some((pair) => pair === undefined)) {
    return { valid: false, errorMessageKey: INVALID_MARKER_PAIR_ERROR_KEY };
  }

  // All tokens parsed; narrow undefined-bearing union to a concrete MarkerPair[]. The filter
  // condition is identical to the `some` check above, so TS narrows away the undefined arm.
  const parsedPairs = parsedTokens.filter((pair): pair is MarkerPair => pair !== undefined);
  return { valid: true, parsedPairs };
}

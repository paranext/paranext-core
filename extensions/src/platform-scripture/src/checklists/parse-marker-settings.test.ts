import { describe, expect, it } from 'vitest';
import { INVALID_MARKER_PAIR_ERROR_KEY, parseMarkerSettings } from './parse-marker-settings';

/**
 * Tests ported byte-for-byte from
 * `c-sharp-tests/Checklists/Markers/MarkerSettingsValidationTests.cs` (22 tests).
 *
 * The C# implementation `MarkersDataSource.ValidateMarkerSettings(string)` returns a
 * `MarkerSettingsValidationResult` with shape `{ Valid, ParsedPairs, ErrorMessage }`. The TS port
 * returns a discriminated union `{ valid: true; parsedPairs } | { valid: false; errorMessageKey }`
 * — narrowing on `valid` exposes the populated field. The structural invariant (§3.13 mutex) is
 * enforced by TypeScript narrowing rather than runtime null checks. Tests use `toEqual` against
 * full result shapes to avoid conditional expectations.
 */

describe('parseMarkerSettings', () => {
  // =====================================================================
  // Happy-path scenarios — valid input returns valid=true with parsed pairs
  // =====================================================================

  describe('happy path', () => {
    it('TS-VAL-002-01: single pair "p/q" parses to one MarkerPair', () => {
      expect(parseMarkerSettings('p/q')).toEqual({
        valid: true,
        parsedPairs: [{ marker1: 'p', marker2: 'q' }],
      });
    });

    it('TS-VAL-002-02: multiple pairs "p/q q1/q2" parses to TWO pairs in source order', () => {
      expect(parseMarkerSettings('p/q q1/q2')).toEqual({
        valid: true,
        parsedPairs: [
          { marker1: 'p', marker2: 'q' },
          { marker1: 'q1', marker2: 'q2' },
        ],
      });
    });

    it('TS-VAL-002-07: empty string is valid with empty pair list', () => {
      expect(parseMarkerSettings('')).toEqual({ valid: true, parsedPairs: [] });
    });

    // Derived from PT9 line 30: `string equivalents = EquivalentMarkers ?? "";`. Null coerces to
    // empty, which takes the valid-empty branch.
    it('TS-VAL-002-07 (null): null input is valid with empty pair list (defensive)', () => {
      // The TS signature is `string`, but C# coerces null to empty via `?? ""` — mirror that
      // behavior here by passing a type-erased null-ish value. Runtime nullish-coalescing handles
      // it identically. Build the null at runtime so the file stays free of literal `null`s.
      // eslint-disable-next-line no-type-assertion/no-type-assertion -- defensive nullish check
      const nullishInput = JSON.parse('null') as unknown as string;
      expect(parseMarkerSettings(nullishInput)).toEqual({ valid: true, parsedPairs: [] });
    });

    it('TS-VAL-002-07 (whitespace): whitespace-only input is valid with empty pair list', () => {
      expect(parseMarkerSettings('   ')).toEqual({ valid: true, parsedPairs: [] });
    });

    it('TS-VAL-002-06: multiple spaces between pairs are collapsed before splitting', () => {
      expect(parseMarkerSettings('p/q   q1/q2')).toEqual({
        valid: true,
        parsedPairs: [
          { marker1: 'p', marker2: 'q' },
          { marker1: 'q1', marker2: 'q2' },
        ],
      });
    });

    it('leading and trailing whitespace is trimmed', () => {
      expect(parseMarkerSettings('  p/q  ')).toEqual({
        valid: true,
        parsedPairs: [{ marker1: 'p', marker2: 'q' }],
      });
    });
  });

  // =====================================================================
  // Error scenarios — malformed input returns valid=false with localize key
  // =====================================================================

  describe('error scenarios', () => {
    it('TS-VAL-002-03: single marker with no slash returns invalid', () => {
      expect(parseMarkerSettings('p')).toEqual({
        valid: false,
        errorMessageKey: INVALID_MARKER_PAIR_ERROR_KEY,
      });
    });

    it('TS-VAL-002-04: triple slash returns invalid', () => {
      expect(parseMarkerSettings('p/q/r')).toEqual({
        valid: false,
        errorMessageKey: INVALID_MARKER_PAIR_ERROR_KEY,
      });
    });

    it('TS-VAL-002-05: empty left side returns invalid', () => {
      expect(parseMarkerSettings('/q')).toEqual({
        valid: false,
        errorMessageKey: INVALID_MARKER_PAIR_ERROR_KEY,
      });
    });

    it('empty right side "p/" returns invalid', () => {
      expect(parseMarkerSettings('p/')).toEqual({
        valid: false,
        errorMessageKey: INVALID_MARKER_PAIR_ERROR_KEY,
      });
    });

    it('both sides empty "/" returns invalid', () => {
      expect(parseMarkerSettings('/')).toEqual({
        valid: false,
        errorMessageKey: INVALID_MARKER_PAIR_ERROR_KEY,
      });
    });

    it('trailing whitespace on right side "p/q  a/ " returns invalid', () => {
      // PT9 :37 requires items[1].Trim().Length > 0. PT9 collapses inner whitespace via
      // Regex.Replace(" +", " ") then splits on ' ', so "p/q  a/ " becomes "p/q a/ " → tokens
      // [p/q, a/]. Second token has empty rhs after trim.
      expect(parseMarkerSettings('p/q  a/ ')).toEqual({
        valid: false,
        errorMessageKey: INVALID_MARKER_PAIR_ERROR_KEY,
      });
    });

    it('whitespace-only right side "p/ " returns invalid', () => {
      expect(parseMarkerSettings('p/ ')).toEqual({
        valid: false,
        errorMessageKey: INVALID_MARKER_PAIR_ERROR_KEY,
      });
    });

    it('whitespace-only left side " /q" returns invalid', () => {
      expect(parseMarkerSettings(' /q')).toEqual({
        valid: false,
        errorMessageKey: INVALID_MARKER_PAIR_ERROR_KEY,
      });
    });

    it('mixed valid+invalid "p/q invalid good/bad" fails fast on first invalid pair', () => {
      // PT9 :41 uses `return;` inside the foreach — first invalid token aborts the entire
      // validation even when surrounded by valid pairs. Contract divergence from
      // initializeMarkerMappings (VAL-005 silent-skip).
      expect(parseMarkerSettings('p/q invalid good/bad')).toEqual({
        valid: false,
        errorMessageKey: INVALID_MARKER_PAIR_ERROR_KEY,
      });
    });

    it('errorMessageKey is the canonical localize key (VAL-002)', () => {
      // The static service returns the localize key; resolution to a localized string happens at
      // the wire boundary. Mirrors C# `MarkersDataSource.InvalidMarkerPairErrorKey` constant.
      expect(INVALID_MARKER_PAIR_ERROR_KEY).toBe('%markersChecklist_errorInvalidMarkerPair%');
    });
  });

  // =====================================================================
  // §3.13 structural invariants — parsedPairs ⊕ errorMessageKey mutually exclusive
  // =====================================================================

  describe('§3.13 structural invariants — parsedPairs ⊕ errorMessageKey mutually exclusive', () => {
    it('valid=false ⇒ no parsedPairs field (no partial-parse leakage)', () => {
      // C# asserts `result.ParsedPairs is null` on failure even when "p/q" parsed successfully
      // BEFORE "invalid" failed — no partial-parse leakage. The TS port uses a discriminated
      // union, so parsedPairs is structurally absent on the failure branch.
      const result = parseMarkerSettings('p/q invalid');
      expect(result).toEqual({ valid: false, errorMessageKey: INVALID_MARKER_PAIR_ERROR_KEY });
      expect('parsedPairs' in result).toBe(false);
    });

    it('valid=true ⇒ no errorMessageKey field', () => {
      const result = parseMarkerSettings('p/q q1/q2');
      expect('errorMessageKey' in result).toBe(false);
      expect(result).toEqual({
        valid: true,
        parsedPairs: [
          { marker1: 'p', marker2: 'q' },
          { marker1: 'q1', marker2: 'q2' },
        ],
      });
    });
  });

  // =====================================================================
  // Golden-master-derived scenarios — gm-007, gm-008
  // =====================================================================

  describe('golden-master scenarios', () => {
    it('gm-007: bidirectional input "p/q q1/q2" parses to two pairs', () => {
      expect(parseMarkerSettings('p/q q1/q2')).toEqual({
        valid: true,
        parsedPairs: [
          { marker1: 'p', marker2: 'q' },
          { marker1: 'q1', marker2: 'q2' },
        ],
      });
    });

    it('gm-008: accumulated pairs "q/q1 q/q2" preserved in source order', () => {
      expect(parseMarkerSettings('q/q1 q/q2')).toEqual({
        valid: true,
        parsedPairs: [
          { marker1: 'q', marker2: 'q1' },
          { marker1: 'q', marker2: 'q2' },
        ],
      });
    });
  });

  // =====================================================================
  // CAP-002 cross-reference scenarios — TS-016, TS-017, TS-018
  // =====================================================================

  describe('CAP-002 cross-reference scenarios', () => {
    it('TS-016: parses bidirectional input "p/q q1/q2" as two pairs (no expansion)', () => {
      // The validator does not perform bidirectional expansion (that is
      // initializeMarkerMappings' concern). It just preserves the source pairs.
      expect(parseMarkerSettings('p/q q1/q2')).toEqual({
        valid: true,
        parsedPairs: [
          { marker1: 'p', marker2: 'q' },
          { marker1: 'q1', marker2: 'q2' },
        ],
      });
    });

    it('TS-017: accumulated pairs "q/q1 q/q2" preserved as two distinct pairs', () => {
      // Same left-hand marker in multiple pairs is not a format violation.
      // initializeMarkerMappings will later accumulate the targets; the validator keeps them as
      // two pairs in source order.
      expect(parseMarkerSettings('q/q1 q/q2')).toEqual({
        valid: true,
        parsedPairs: [
          { marker1: 'q', marker2: 'q1' },
          { marker1: 'q', marker2: 'q2' },
        ],
      });
    });

    it('TS-018: invalid pair rejected, NOT silently skipped (contract divergence from runtime parser)', () => {
      // Pins the divergence: initializeMarkerMappings silently drops "invalid" and "p/q1/q2"
      // (VAL-005), but the strict parser used here REJECTS the entire input on first malformed
      // token (VAL-002).
      expect(parseMarkerSettings('p/q invalid p/q1/q2 good/bad')).toEqual({
        valid: false,
        errorMessageKey: INVALID_MARKER_PAIR_ERROR_KEY,
      });
    });
  });
});

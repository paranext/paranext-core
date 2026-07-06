// CAP-013 (keyboard-switching) RED-phase tests — BiblicalTermsFilterKeyboardMap: the pure
// FilterType → (projectId, surfaceType) resolver ported from PT9's only callsite that picks
// between vernacular/notes/default based on a domain enum (BHV-356 — the 3-way conditional in
// `BiblicalTermsTextFilterAdapter..ctor` GotFocus lambda, BiblicalTermsTextFilterAdapter.cs:63-73;
// extraction EXT-153, "Pure function" pattern). PT10 has no Biblical Terms feature yet — this
// module is the stable placeholder surface a future Biblical Terms port consumes without
// modification (CAP-013 success criterion).
//
// Traceability (strategic-plan-backend.md ### CAP-013):
// - ACCEPTANCE: "all 4 FilterType branches map to correct surface" + "unknown filter falls back
//   to default" — no PT9 spec-XXX / golden master exists; TS-027..030 are PT9 characterization
//   of BHV-356 and the PT10 reimplementation is tested via the mapping table below.
// - TS-027 (Glossary → vernacular), TS-028 (Renderings → vernacular), TS-029 (Notes → notes
//   keyboard ≙ PT10 'comments' per data-contracts §2.5 naming note), TS-030 (other → default).
//   The scenarios state PT9 OS side effects (`osKeyboardAfter`: 'ar-SA' / 'fr-FR' /
//   'system-default'); at THIS unit boundary they map to the resolution tuple (plan D6):
//   vernacular-keyboard activation ↔ `surfaceType: 'vernacular'`; notes-keyboard activation ↔
//   `surfaceType: 'comments'`; ActivateDefaultKeyboard ↔ `{ systemDefault: true }`.
// - data-contracts §9 (TypeScript Implementation — module path + EXT-153 File Organization row:
//   the resolver is an internal helper; the actual activation is the CALLER's job via
//   `papi.keyboard` — CAP-014 scope, not tested here).
//
// Out of scope here (other capabilities): the focus event that triggers resolution and the
// INV-B1-05-gated restore ("only if project has a keyboard") are CAP-014/CAP-010 scope — the
// systemDefault branch of this resolver is an instruction TO the caller, not the restore itself.

import { describe, expect, it } from 'vitest';
import { BiblicalTermsFilterKeyboardMap } from '@renderer/services/keyboard/biblical-terms-filter-keyboard-map';

/** Guid-shaped project id, matching the ProjectId contract (data-contracts §2.2) */
const PROJECT_ID = '5e51f89e-20f7-4b0f-bb4e-b92f4ad3c0e5';

describe('BiblicalTermsFilterKeyboardMap — 4-branch FilterType resolution (BHV-356 / EXT-153)', () => {
  // ACCEPTANCE branch 1 (TS-027): PT9 `filterType == Glossary → GetKeyboard(scrText, false)`
  // (vernacular keyboard, osKeyboardAfter 'ar-SA') ↔ PT10 resolution to the project's
  // 'vernacular' surface. `toEqual` pins the exact contract shape — no extra fields, and
  // explicitly NOT the systemDefault branch.
  it("resolves Glossary to the project's vernacular surface (ACCEPTANCE)", () => {
    const resolution = BiblicalTermsFilterKeyboardMap.resolve('Glossary', PROJECT_ID);

    expect(resolution).toEqual({ projectId: PROJECT_ID, surfaceType: 'vernacular' });
  });

  // ACCEPTANCE branch 2 (TS-028): PT9 `filterType == Renderings` shares the Glossary branch
  // (`GetKeyboard(scrText, false)`) — vernacular surface.
  it("resolves Renderings to the project's vernacular surface (ACCEPTANCE)", () => {
    const resolution = BiblicalTermsFilterKeyboardMap.resolve('Renderings', PROJECT_ID);

    expect(resolution).toEqual({ projectId: PROJECT_ID, surfaceType: 'vernacular' });
  });

  // ACCEPTANCE branch 3 (TS-029): PT9 `filterType == Notes → GetKeyboard(scrText, true)` (the
  // NOTES keyboard, osKeyboardAfter 'fr-FR'). PT10 has no 'notes' surface — PT9 "notes" is PT10
  // 'comments' (data-contracts §2.5 naming note; KEYBOARD_SURFACE_TYPES is exactly
  // ['vernacular', 'comments']). Plan D3.
  it("resolves Notes to the project's comments surface (PT9 notes keyboard) (ACCEPTANCE)", () => {
    const resolution = BiblicalTermsFilterKeyboardMap.resolve('Notes', PROJECT_ID);

    expect(resolution).toEqual({ projectId: PROJECT_ID, surfaceType: 'comments' });
  });

  // ACCEPTANCE branch 4 (TS-030): every OTHER member of PT9's TextFilterType enum
  // (ParatextData/Terms/TextFilterType.cs — names are load-bearing: "DO NOT CHANGE THE NAMES OF
  // THESE VALUES AS THEY ARE SAVED IN FILTERS") falls to PT9's `else →
  // ActivateDefaultKeyboard(scrText)` ↔ PT10 `{ systemDefault: true }`. The INV-B1-05 gate
  // ("only restores if the project HAS a vernacular keyboard") is applied by the caller via
  // CAP-010 — the resolver's systemDefault instruction is unconditional (plan D4).
  it.each(['TermGreek', 'TermHebrew', 'TermOther', 'Gloss', 'OtherGloss'])(
    "resolves the non-mapped PT9 filter type '%s' to the system default (ACCEPTANCE)",
    (filterType) => {
      const resolution = BiblicalTermsFilterKeyboardMap.resolve(filterType, PROJECT_ID);

      expect(resolution).toEqual({ systemDefault: true });
    },
  );
});

describe('BiblicalTermsFilterKeyboardMap — unknown-filter fallback (forward-compat edge)', () => {
  // ACCEPTANCE: "unknown filter falls back to default" (strategic-plan edge case: unknown
  // FilterType, forward-compat). 'Reference' is TS-030's example value ("e.g., Bible
  // reference" — not a PT9 enum member, plan D8); 'SomeFutureFilter' stands in for values a
  // future Biblical Terms port might add; '' covers an unset/cleared filter.
  it.each(['Reference', 'SomeFutureFilter', ''])(
    "falls back to the system default for the unknown filter type '%s' (ACCEPTANCE)",
    (filterType) => {
      const resolution = BiblicalTermsFilterKeyboardMap.resolve(filterType, PROJECT_ID);

      expect(resolution).toEqual({ systemDefault: true });
    },
  );

  // PT9 branched on enum identity — the faithful port matches the three mapped NAMES exactly
  // (plan D5). A lowercase variant is just another unknown string and must NOT activate a
  // project keyboard surface.
  it.each(['glossary', 'renderings', 'notes'])(
    "matches filter types case-sensitively — lowercase '%s' is unknown → system default",
    (filterType) => {
      const resolution = BiblicalTermsFilterKeyboardMap.resolve(filterType, PROJECT_ID);

      expect(resolution).toEqual({ systemDefault: true });
    },
  );
});

describe('BiblicalTermsFilterKeyboardMap — projectId pass-through', () => {
  // Surface resolutions must carry the CALLER's projectId unchanged — that id is what CAP-014
  // hands to `papi.keyboard` to activate the right project's keyboard (PT9 anchor: the lambda
  // closed over ITS OWN scrText). Two distinct projects through the resolver prove the echo is
  // per-call, not cached state (the resolver is pure/stateless).
  it('echoes the projectId of each call in surface resolutions (per-call, not cached)', () => {
    const otherProjectId = 'a3a4e8a0-8c1d-4f6e-9a2b-7c5d3e1f0b9a';

    const first = BiblicalTermsFilterKeyboardMap.resolve('Glossary', PROJECT_ID);
    const second = BiblicalTermsFilterKeyboardMap.resolve('Notes', otherProjectId);

    expect(first).toEqual({ projectId: PROJECT_ID, surfaceType: 'vernacular' });
    expect(second).toEqual({ projectId: otherProjectId, surfaceType: 'comments' });
  });
});

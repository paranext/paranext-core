// CAP-011 (keyboard-switching) RED-phase tests — CrossAppFocusDebounce: the FB-27866 cross-app
// return guard, redesigned for PT10 per FN-015 / data-contracts §4.6 item 4: "if the OS keyboard
// at focus-in differs from what the platform last set, the platform MUST NOT immediately stomp
// the user's choice." A user who alt-tabs away and switches the OS keyboard (Win+Space etc.)
// expects PT10 to honor that choice on return — a load-bearing accessibility requirement, not a
// regression-avoidance note.
//
// Traceability (strategic-plan-backend.md ### CAP-011):
// - BHV-350 / EXT-150 (PT9 characterization: CommentEditorForm.cs:979-986 skips ActivateKeyboard
//   iff resolved keyboard equals BOTH static LastActiveKeyboard AND the per-surface memo; PT10
//   redesigns the two-memo equality into an explicit AppFocus-transition gate per FN-015/FN-016)
// - TS-023 (operative — user-initiated OS keyboard change respected on focus return; ACCEPTANCE 1)
// - TS-022 (operative — first-call-always-fires lineage, CONS-EX-02; the no-baseline tests)
// - TS-064 / TS-065 are "(related)" only — missing-keyboard notification cadence is CAP-012 scope
// - data-contracts §4.6 item 4 (cross-app debounce abstract requirement)
// - backend-alignment §Utility Mapping Summary (FN-015 row): no public timestamps — hence zero
//   fake timers below; only observation-ORDER semantics are pinned (Classic TDD: timing internals
//   are implementation discovery)
//
// Contract design (plan D1): this is a DECISION-ONLY module. CAP-014 FocusKeyboardRouter owns the
// `papi.window` AppFocus + `CurrentOsKeyboard` subscriptions and FORWARDS observations in:
// - `observeAppFocus(isAppFocused, currentOsKeyboardId?)` for every AppFocus subject emission,
//   with the OS keyboard sampled at that moment (`undefined` = sample failed/timed out);
// - `recordActivation(keyboardId)` after every keyboard activation PT10 itself performs;
// - `shouldGateNextActivation()` consulted ONCE per focus-driven activation attempt
//   (true = skip the activate, leaving the user's OS keyboard untouched).
// Consequently these tests need ZERO mocks — no module under `src/` is stubbed, no timers faked.
//
// Out of scope here (other capabilities): the actual subscriptions and the skip-vs-activate
// side effects (CAP-014); the `AppFocus` data type host (CAP-017, done); `lastActivatedKeyboardId`
// session state inside KeyboardActivationService (CAP-010, done — CAP-014 bridges the two).

import { describe, expect, it } from 'vitest';
import { CrossAppFocusDebounce } from '@renderer/services/keyboard/cross-app-focus-debounce';

/** A debounce that has a PT10-set baseline: PT10 last activated `keyboardId` while focused */
function debounceWithBaseline(keyboardId: string): CrossAppFocusDebounce {
  const debounce = new CrossAppFocusDebounce();
  debounce.recordActivation(keyboardId);
  return debounce;
}

describe('CrossAppFocusDebounce — cross-app return decision (FN-015 / FB-27866 / BHV-350)', () => {
  // ACCEPTANCE 1 (strategic plan; TS-023 redesign): PT10 activated ar-SA, the user alt-tabbed
  // away, pressed Win+Space to en-US, and returned. The OS keyboard at focus-in (en-US) differs
  // from what PT10 last set (ar-SA) → the next focus-driven activation must be GATED so the
  // user's choice is preserved (plan D2).
  it('gates the next activation when the user changed the OS keyboard while away (ACCEPTANCE)', () => {
    const debounce = debounceWithBaseline('ar-SA');

    debounce.observeAppFocus(false, 'ar-SA'); // alt-tab away
    debounce.observeAppFocus(true, 'en-US'); // return — user chose en-US while away

    expect(debounce.shouldGateNextActivation()).toBe(true);
  });

  // ACCEPTANCE 2 (strategic plan): same journey but the user did NOT touch the keyboard while
  // away — the OS keyboard at focus-in equals what PT10 last set → no gate; the project keyboard
  // re-activates normally. Repeat queries stay false (nothing to consume).
  it('does not gate when the OS keyboard is unchanged across the away period (ACCEPTANCE)', () => {
    const debounce = debounceWithBaseline('ar-SA');

    debounce.observeAppFocus(false, 'ar-SA');
    debounce.observeAppFocus(true, 'ar-SA'); // return — still the keyboard PT10 set

    expect(debounce.shouldGateNextActivation()).toBe(false);
    expect(debounce.shouldGateNextActivation()).toBe(false);
  });

  // Within-app sessions never involve this guard: without any observed cross-app return, every
  // focus-driven activation proceeds (TS-022 happy path — focus-in activates the notes keyboard)
  it('never gates when no cross-app return has been observed', () => {
    const debounce = debounceWithBaseline('ar-SA');

    expect(debounce.shouldGateNextActivation()).toBe(false);
  });

  // A `true` observation with no preceding `false` is NOT a cross-app return — e.g. the initial
  // AppFocus subject emission at startup (window.service-host seeds { isAppFocused: true }), or a
  // redundant re-emission. The module must not rely on upstream same-value dedup (plan D6).
  it('does not treat a focus observation without a preceding blur as a cross-app return', () => {
    const debounce = debounceWithBaseline('ar-SA');

    debounce.observeAppFocus(true, 'en-US'); // no blur was ever observed

    expect(debounce.shouldGateNextActivation()).toBe(false);
  });

  // First-activation invariant (CONS-EX-02 / TS-022 lineage; plan D3): before PT10 has set ANY
  // keyboard there is no PT10 choice to "stomp" — gating here would break help-docs trigger #3
  // (project keyboard activates on the first focus-in after launching blurred). PT9 agrees: the
  // null memo never equals the resolved keyboard, so the first call always activates.
  it('never gates a cross-app return when no activation was ever recorded (first activation always fires)', () => {
    const debounce = new CrossAppFocusDebounce();

    debounce.observeAppFocus(false, 'en-US');
    debounce.observeAppFocus(true, 'en-US');

    expect(debounce.shouldGateNextActivation()).toBe(false);
  });
});

describe('CrossAppFocusDebounce — gate lifetime (one-shot consumption + re-arming)', () => {
  // Plan D4: the gate protects "the NEXT activate" only. After CAP-014 consults it (and skips),
  // later within-app focus moves must re-apply project keyboards normally — a persistent gate
  // would permanently suppress focus-driven activation.
  it('consumes the gate on query: true exactly once, then false for the following attempts', () => {
    const debounce = debounceWithBaseline('ar-SA');
    debounce.observeAppFocus(false, 'ar-SA');
    debounce.observeAppFocus(true, 'en-US');

    expect(debounce.shouldGateNextActivation()).toBe(true);
    expect(debounce.shouldGateNextActivation()).toBe(false);
    expect(debounce.shouldGateNextActivation()).toBe(false);
  });

  // Plan D5: every cross-app return re-evaluates independently. The baseline is what PT10 last
  // SET — never what the user chose — so as long as the user's externally-chosen keyboard stays
  // active and PT10 performs no new activation, EVERY return keeps honoring the user's choice.
  // Guards against implementations that "adopt" the user keyboard into the baseline when gating
  // (which would stomp the user's choice on the second return).
  it('re-arms the gate on each subsequent return while the user-chosen keyboard is still active', () => {
    const debounce = debounceWithBaseline('ar-SA');

    debounce.observeAppFocus(false, 'ar-SA');
    debounce.observeAppFocus(true, 'en-US'); // user switched to en-US while away
    expect(debounce.shouldGateNextActivation()).toBe(true); // honored (consumed)

    debounce.observeAppFocus(false, 'en-US'); // away again — user keeps en-US
    debounce.observeAppFocus(true, 'en-US'); // en-US still differs from what PT10 last SET
    expect(debounce.shouldGateNextActivation()).toBe(true);
  });

  // Full cycle (plan D4+D9): after a gated return, the user later focuses another project surface
  // within the app; CAP-014 activates the project keyboard and records it. That activation is the
  // new baseline, so the next unchanged away/return round trip does not gate.
  it('re-baselines via recordActivation after a consumed gate (full cross-app cycle)', () => {
    const debounce = debounceWithBaseline('ar-SA');
    debounce.observeAppFocus(false, 'ar-SA');
    debounce.observeAppFocus(true, 'en-US');
    expect(debounce.shouldGateNextActivation()).toBe(true); // user choice honored

    // Within-app focus move → CAP-014 consults (false now) and activates the project keyboard
    expect(debounce.shouldGateNextActivation()).toBe(false);
    debounce.recordActivation('ar-SA');

    debounce.observeAppFocus(false, 'ar-SA');
    debounce.observeAppFocus(true, 'ar-SA'); // unchanged this time

    expect(debounce.shouldGateNextActivation()).toBe(false);
  });
});

describe('CrossAppFocusDebounce — activation baseline tracking (recordActivation)', () => {
  // Plan D9: the comparison baseline is the LATEST keyboard PT10 activated, not the first
  it('compares against the latest recorded activation (unchanged → no gate)', () => {
    const debounce = new CrossAppFocusDebounce();
    debounce.recordActivation('ar-SA');
    debounce.recordActivation('en-US'); // e.g. user moved to a surface with a different keyboard

    debounce.observeAppFocus(false, 'en-US');
    debounce.observeAppFocus(true, 'en-US');

    expect(debounce.shouldGateNextActivation()).toBe(false);
  });

  it('gates when the keyboard at focus-in matches an OLDER activation but not the latest', () => {
    const debounce = new CrossAppFocusDebounce();
    debounce.recordActivation('ar-SA');
    debounce.recordActivation('en-US');

    debounce.observeAppFocus(false, 'en-US');
    debounce.observeAppFocus(true, 'ar-SA'); // user manually switched BACK to ar-SA while away

    expect(debounce.shouldGateNextActivation()).toBe(true);
  });
});

describe('CrossAppFocusDebounce — flicker and degraded observations (strategic-plan edge cases)', () => {
  // Plan D6: rapid `false → true → false → true` flicker (e.g. notification popups stealing and
  // returning focus). The decision must reflect the LATEST completed return at the moment CAP-014
  // finally attempts an activation — a stale armed gate from an earlier flicker frame must not
  // suppress an activation that current reality says should proceed.
  it('lets the latest return win during flicker: changed-then-unchanged ends NOT gated', () => {
    const debounce = debounceWithBaseline('ar-SA');

    debounce.observeAppFocus(false, 'ar-SA');
    debounce.observeAppFocus(true, 'en-US'); // would gate…
    debounce.observeAppFocus(false, 'en-US');
    debounce.observeAppFocus(true, 'ar-SA'); // …but the user switched back before any attempt

    expect(debounce.shouldGateNextActivation()).toBe(false);
  });

  it('lets the latest return win during flicker: unchanged-then-changed ends gated', () => {
    const debounce = debounceWithBaseline('ar-SA');

    debounce.observeAppFocus(false, 'ar-SA');
    debounce.observeAppFocus(true, 'ar-SA'); // no gate…
    debounce.observeAppFocus(false, 'ar-SA');
    debounce.observeAppFocus(true, 'en-US'); // …then the user changed on the second hop

    expect(debounce.shouldGateNextActivation()).toBe(true);
  });

  // Duplicate blur observations (false → false) must be idempotent — still one return (plan D6)
  it('treats duplicate blur observations as one away period', () => {
    const debounce = debounceWithBaseline('ar-SA');

    debounce.observeAppFocus(false, 'ar-SA');
    debounce.observeAppFocus(false, 'ar-SA');
    debounce.observeAppFocus(true, 'en-US');

    expect(debounce.shouldGateNextActivation()).toBe(true);
  });

  // Plan D7: the OS keyboard sample can fail/time out during the transition window
  // (`currentOsKeyboardId === undefined`). With a baseline, gating is fail-safe in BOTH unknown
  // sub-cases: if the user changed, their choice is preserved (required by §4.6 item 4); if they
  // did not, the OS keyboard already equals the baseline so skipping the re-activate changes
  // nothing. NOT gating risks the explicitly prohibited stomp.
  it('gates when the OS keyboard sample is unavailable at focus-in and a baseline exists (fail-safe)', () => {
    const debounce = debounceWithBaseline('ar-SA');

    debounce.observeAppFocus(false, 'ar-SA');
    debounce.observeAppFocus(true, undefined); // OS query timed out during the transition

    expect(debounce.shouldGateNextActivation()).toBe(true);
  });

  // Plan D8: D3 (first-activation-always-fires) outranks the D7 fail-safe when there is no
  // baseline — there is no PT10-set keyboard for the fail-safe to protect.
  it('does not gate an unknown-keyboard return when no activation was ever recorded', () => {
    const debounce = new CrossAppFocusDebounce();

    debounce.observeAppFocus(false, undefined);
    debounce.observeAppFocus(true, undefined);

    expect(debounce.shouldGateNextActivation()).toBe(false);
  });
});

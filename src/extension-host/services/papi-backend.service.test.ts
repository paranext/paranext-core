// CAP-016 (keyboard-switching) RED-phase tests — top-level `papi.keyboard` registration on the
// extension-host papi object (data-contracts §9 "Code Placement": papi-backend.service.ts around
// line 134, alongside `notifications`; strategic-plan-backend.md ### CAP-016 acceptance test).
//
// Traceability: CAP-016 is an Integration capability (no TS-XXX/BHV-XXX) — the contract is
// `papi.keyboard: IKeyboardService` present and typed at the backend so cross-process consumers
// (extensions) can reach the keyboard service.
//
// Two-stage RED note (CAP-008 precedent, plan D1): direct typed access (`papi.keyboard`) cannot
// compile until the member exists, and `typecheck:core` must pass at commit (pre-commit hook
// AI-001). Runtime presence is therefore asserted through an untyped narrowing, and the TYPING
// half of "presence and typing" is pinned transitively: the member must be IDENTICAL to the
// CAP-008 `keyboardService` consumer wrapper, which is statically typed `IKeyboardService`
// (keyboard.service.ts:37). The implementation's own `keyboard: keyboardService as
// IKeyboardService` member then satisfies typecheck:core at GREEN.

import { describe, expect, it } from 'vitest';
import { keyboardService } from '@shared/services/keyboard.service';
import papiBackend from '@extension-host/services/papi-backend.service';
import * as papiBackendModule from '@extension-host/services/papi-backend.service';

/**
 * Reads a member off a module/object without static typing — the member deliberately does not exist
 * on the type surface yet (RED phase). See the two-stage RED note above.
 */
function getUntypedMember(target: object, memberName: string): unknown {
  // The member is absent from the compile-time type until CAP-016 GREEN — see two-stage RED note
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return (target as Record<string, unknown>)[memberName];
}

describe('papi-backend.service — top-level papi.keyboard (CAP-016)', () => {
  it('exposes papi.keyboard as the shared keyboardService consumer wrapper', () => {
    // Presence: the frozen papi object carries the member (papi is frozen at module eval, so the
    // member can only come from the source registration line)
    expect(Object.keys(papiBackend)).toContain('keyboard');

    // Identity + typing (transitively): the member IS the CAP-008 sync-proxied wrapper from
    // @shared/services/keyboard.service, which is statically `IKeyboardService`
    expect(getUntypedMember(papiBackend, 'keyboard')).toBe(keyboardService);
  });

  it('exposes the destructured `keyboard` export (papi member convention note 4)', () => {
    // Every papi member also ships as a destructured frozen export (peers: notifications, window)
    expect(getUntypedMember(papiBackendModule, 'keyboard')).toBe(keyboardService);
  });
});

// CAP-016 (keyboard-switching) RED-phase tests — top-level `papi.keyboard` registration on the
// renderer papi object (data-contracts §9 "Code Placement": papi-frontend.service.ts around line
// 111, same pattern as papi-backend; strategic-plan-backend.md ### CAP-016 acceptance test).
//
// Traceability: CAP-016 is an Integration capability (no TS-XXX/BHV-XXX) — the contract is
// `papi.keyboard: IKeyboardService` present and typed at the frontend so renderer consumers
// (web views, dialogs) can reach the keyboard service.
//
// Two-stage RED note: see papi-backend.service.test.ts — same constraint (typecheck:core at
// commit), same transitive-typing pin via identity with the typed CAP-008 `keyboardService`.

import { describe, expect, it, vi } from 'vitest';

// theme.service-host (in papi-frontend's import graph) queries the system dark-theme media query
// at module-eval time (getSystemDarkThemeMediaQuery) — jsdom has no matchMedia, so stub it before
// the papi-frontend import below evaluates
vi.hoisted(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: undefined,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    }),
  });
});

// The matchMedia stub above must be registered before these modules evaluate
/* eslint-disable import/first */
import { keyboardService } from '@shared/services/keyboard.service';
import papiFrontend from '@renderer/services/papi-frontend.service';
import * as papiFrontendModule from '@renderer/services/papi-frontend.service';
/* eslint-enable import/first */

/**
 * Reads a member off a module/object without static typing — the member deliberately does not exist
 * on the type surface yet (RED phase). See the two-stage RED note above.
 */
function getUntypedMember(target: object, memberName: string): unknown {
  // The member is absent from the compile-time type until CAP-016 GREEN — see two-stage RED note
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return (target as Record<string, unknown>)[memberName];
}

describe('papi-frontend.service — top-level papi.keyboard (CAP-016)', () => {
  it('exposes papi.keyboard as the shared keyboardService consumer wrapper', () => {
    // Presence: the frozen papi object carries the member (papi is frozen at module eval, so the
    // member can only come from the source registration line)
    expect(Object.keys(papiFrontend)).toContain('keyboard');

    // Identity + typing (transitively): the member IS the CAP-008 sync-proxied wrapper from
    // @shared/services/keyboard.service, which is statically `IKeyboardService`
    expect(getUntypedMember(papiFrontend, 'keyboard')).toBe(keyboardService);
  });

  it('exposes the destructured `keyboard` export (papi member convention note 4)', () => {
    // Every papi member also ships as a destructured frozen export (peers: notifications, window)
    expect(getUntypedMember(papiFrontendModule, 'keyboard')).toBe(keyboardService);
  });
});

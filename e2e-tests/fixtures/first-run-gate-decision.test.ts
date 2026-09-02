/**
 * Unit tests for the stuck-first-run-gate decision.
 *
 * The three states the gate can be stuck in are told apart by two observations, and the decision
 * between them must not depend on which observation arrives first: the error screen shows a
 * heading, an alert AND an escape hatch, so a check that races "hatch appeared" against "heading
 * appeared" can reach either answer for one app state. This settles it after the fact, so it is a
 * function of what is on screen and nothing else.
 */
import { describe, expect, it } from 'vitest';
import { decideStuckGateAction } from './helpers';

describe('deciding what a stuck first-run gate needs', () => {
  it('recovers through the escape hatch whenever one is offered', () => {
    // The error screen shows a heading, an alert and a hatch at once. Recovering is right, and must
    // not depend on the hatch being observed before the heading.
    expect(decideStuckGateAction({ escapeHatchVisible: true, onErrorScreen: true })).toBe(
      'recoverable',
    );
    // The loading branch reveals the same hatch once its probe runs long.
    expect(decideStuckGateAction({ escapeHatchVisible: true, onErrorScreen: false })).toBe(
      'recoverable',
    );
  });

  it('names the wizard when a heading is up with no alert and no way out', () => {
    expect(decideStuckGateAction({ escapeHatchVisible: false, onErrorScreen: false })).toBe(
      'wizard',
    );
  });

  it('stays quiet on an error screen that has not offered its hatch', () => {
    // Reporting this as the wizard would name the wrong cause; there is a way out, just not yet.
    expect(decideStuckGateAction({ escapeHatchVisible: false, onErrorScreen: true })).toBe(
      'inconclusive',
    );
  });
});

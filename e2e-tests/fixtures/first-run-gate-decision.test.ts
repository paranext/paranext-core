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
import { decideStuckGateAction, describeInconclusiveOverlayTimeout } from './helpers';

describe('deciding what a stuck first-run gate needs', () => {
  it('reports a gate that has gone as cleared, not as the wizard', () => {
    // The discriminators are read one round-trip after the gate was seen, so a gate that resolves
    // in between leaves both of them false — which is exactly the wizard's signature, and the
    // wizard is the one branch that fails the whole run. Whether the gate is still up decides
    // first, or a healthy app is failed for a settings pin that was fine.
    expect(
      decideStuckGateAction({
        escapeHatchVisible: false,
        onErrorScreen: false,
        gateStillShowing: false,
      }),
    ).toBe('cleared');
  });

  it('recovers through the escape hatch whenever one is offered', () => {
    // The error screen shows a heading, an alert and a hatch at once. Recovering is right, and must
    // not depend on the hatch being observed before the heading.
    expect(
      decideStuckGateAction({
        escapeHatchVisible: true,
        onErrorScreen: true,
        gateStillShowing: true,
      }),
    ).toBe('recoverable');
    // The loading branch reveals the same hatch once its probe runs long.
    expect(
      decideStuckGateAction({
        escapeHatchVisible: true,
        onErrorScreen: false,
        gateStillShowing: true,
      }),
    ).toBe('recoverable');
  });

  it('names the wizard when a heading is up with no alert and no way out', () => {
    expect(
      decideStuckGateAction({
        escapeHatchVisible: false,
        onErrorScreen: false,
        gateStillShowing: true,
      }),
    ).toBe('wizard');
  });

  it('stays quiet on an error screen that has not offered its hatch', () => {
    // Reporting this as the wizard would name the wrong cause; there is a way out, just not yet.
    expect(
      decideStuckGateAction({
        escapeHatchVisible: false,
        onErrorScreen: true,
        gateStillShowing: true,
      }),
    ).toBe('inconclusive');
  });
});

describe('naming the cause of a workspace-overlay timeout that followed an inconclusive gate check', () => {
  it('names the gate/spinner selector collision, not just the original timeout', () => {
    const { message } = describeInconclusiveOverlayTimeout(new Error('locator timeout'));

    expect(message).toContain('first-run gate');
    expect(message).toContain('.pr-twp [role="status"]');
    expect(message).toContain('locator timeout');
  });

  it('describes a non-Error rejection too, rather than losing what was thrown', () => {
    const { message } = describeInconclusiveOverlayTimeout('a plain string rejection');

    expect(message).toContain('a plain string rejection');
  });
});

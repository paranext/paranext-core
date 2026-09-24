import { describe, expect, test } from 'vitest';
import {
  decideRendererCrashReload,
  MAX_CONSECUTIVE_RENDERER_CRASH_RELOADS,
  NO_RENDERER_CRASH_RELOADS_YET,
  RENDERER_CRASH_RELOAD_RECOVERY_MS,
  type RendererCrashReloadBudget,
} from '@main/renderer-crash-reload-budget.util';

/** A moment far enough into a session that subtracting a recovery window from it stays positive */
const NOW = 1_000_000;

/**
 * Run the crashes of a looping renderer through the budget, each one arriving `msApart` after the
 * previous decision, and report what was decided for each.
 *
 * @param crashCount How many times the renderer dies
 * @param msApart How long the renderer survived between crashes
 */
function runCrashes(crashCount: number, msApart: number) {
  let budget: RendererCrashReloadBudget = NO_RENDERER_CRASH_RELOADS_YET;
  const decisions = [];
  for (let crashIndex = 0; crashIndex < crashCount; crashIndex++) {
    const decision = decideRendererCrashReload(budget, NOW + crashIndex * msApart);
    decisions.push(decision);
    if (decision.shouldReload) budget = decision.budget;
  }
  return decisions;
}

describe('decideRendererCrashReload', () => {
  test('reloads the first time a window’s renderer dies', () => {
    // The reload is the only thing that puts a crashed window back into the app at all, so nothing
    // about a first crash should stop it
    const decision = decideRendererCrashReload(NO_RENDERER_CRASH_RELOADS_YET, NOW);

    expect(decision).toEqual({
      shouldReload: true,
      attempt: 1,
      budget: { consecutiveReloads: 1, lastReloadAt: NOW },
    });
  });

  test('keeps reloading up to the cap', () => {
    const decisions = runCrashes(MAX_CONSECUTIVE_RENDERER_CRASH_RELOADS, 100);

    expect(decisions.map((decision) => decision.shouldReload)).toEqual([true, true, true]);
    expect(
      decisions.map((decision) => (decision.shouldReload ? decision.attempt : undefined)),
    ).toEqual([1, 2, 3]);
  });

  test('gives up once the cap is spent', () => {
    // A renderer that dies again immediately is dying at load — a bad bundle, an out-of-memory
    // page — and reloading it forever only rewrites the same crash to the log
    const decisions = runCrashes(MAX_CONSECUTIVE_RENDERER_CRASH_RELOADS + 1, 100);

    expect(decisions[MAX_CONSECUTIVE_RENDERER_CRASH_RELOADS]).toEqual({
      shouldReload: false,
      reloadsAlreadySpent: MAX_CONSECUTIVE_RENDERER_CRASH_RELOADS,
    });
  });

  test('starts the budget over for a renderer that came back and ran for a while', () => {
    // Without this the cap would be a per-session budget: three unrelated crashes over an
    // afternoon, each recovered from, would leave the window down on the fourth
    const spentBudget: RendererCrashReloadBudget = {
      consecutiveReloads: MAX_CONSECUTIVE_RENDERER_CRASH_RELOADS,
      lastReloadAt: NOW - RENDERER_CRASH_RELOAD_RECOVERY_MS - 1,
    };

    const decision = decideRendererCrashReload(spentBudget, NOW);

    expect(decision).toEqual({
      shouldReload: true,
      attempt: 1,
      budget: { consecutiveReloads: 1, lastReloadAt: NOW },
    });
  });

  test('still counts a renderer that died exactly at the recovery mark as looping', () => {
    // The reload has to have OUTLIVED the recovery window to count as having worked; a renderer
    // that dies right at the mark never got past the load that has been killing it
    const spentBudget: RendererCrashReloadBudget = {
      consecutiveReloads: MAX_CONSECUTIVE_RENDERER_CRASH_RELOADS,
      lastReloadAt: NOW - RENDERER_CRASH_RELOAD_RECOVERY_MS,
    };

    expect(decideRendererCrashReload(spentBudget, NOW).shouldReload).toBe(false);
  });

  test('gives a recovered renderer the whole budget again, not one more attempt', () => {
    // Three crashes in a row, then a renderer that survived the recovery window, then three more
    const decisions = runCrashes(
      MAX_CONSECUTIVE_RENDERER_CRASH_RELOADS,
      RENDERER_CRASH_RELOAD_RECOVERY_MS + 1,
    );

    expect(decisions.every((decision) => decision.shouldReload)).toBe(true);
    expect(
      decisions.map((decision) => (decision.shouldReload ? decision.attempt : undefined)),
    ).toEqual([1, 1, 1]);
  });
});

/**
 * How many times in a row a window's renderer is reloaded after it dies before the window is left
 * down. Pure — the caller passes in the budget it is holding and the current time — so the cap and
 * its recovery window are unit-testable without Electron or a crashing renderer.
 */

/**
 * How many times in a row a window's renderer is reloaded after it dies before the window is left
 * down.
 *
 * A renderer that dies again immediately is dying at load — a bad bundle, a startup crash, an
 * out-of-memory page — and reloading it again only burns CPU and rewrites the same crash to the log
 * forever. Stopping leaves the window blank and unroutable, which is what it already was; the user
 * can close it and open another. Three because the reload is the only thing that puts a crashed
 * window back into the app at all, so it is worth a couple of tries before giving the session up on
 * it.
 */
export const MAX_CONSECUTIVE_RENDERER_CRASH_RELOADS = 3;

/**
 * How long a reloaded renderer has to survive before its reload counts as having worked, resetting
 * the crash-reload budget.
 *
 * Without this the cap would be a per-session budget: a window that crashed three times over an
 * afternoon — three unrelated failures, each recovered from — would be left down on the fourth. A
 * renderer that comes back and runs for this long recovered; one that dies again inside it is
 * looping.
 */
export const RENDERER_CRASH_RELOAD_RECOVERY_MS = 30000;

/** What one window has spent of its crash-reload budget so far */
export type RendererCrashReloadBudget = {
  /** How many times in a row this window's renderer has been reloaded after dying */
  consecutiveReloads: number;
  /** When the most recent of those reloads was started, in `Date.now()` milliseconds */
  lastReloadAt: number;
};

/** The budget a window that has not had its renderer reloaded yet starts with */
export const NO_RENDERER_CRASH_RELOADS_YET: RendererCrashReloadBudget = {
  consecutiveReloads: 0,
  lastReloadAt: 0,
};

/** What to do about a renderer that just died, and the budget to hold onto afterwards */
export type RendererCrashReloadDecision =
  | {
      shouldReload: true;
      /** Which attempt this reload is, counting from 1, for the log line that reports it */
      attempt: number;
      /** Budget to carry into the next crash */
      budget: RendererCrashReloadBudget;
    }
  | {
      shouldReload: false;
      /** How many reloads this window had already been given, for the log line that reports it */
      reloadsAlreadySpent: number;
    };

/**
 * Decide whether a window whose renderer just died should be reloaded again.
 *
 * A renderer that came back and ran for {@link RENDERER_CRASH_RELOAD_RECOVERY_MS} recovered, so its
 * next crash starts the budget over; one that dies again inside that window is looping, and stops
 * after {@link MAX_CONSECUTIVE_RENDERER_CRASH_RELOADS}.
 *
 * @param budget What this window has spent of its budget so far
 * @param now Current time in `Date.now()` milliseconds
 */
export function decideRendererCrashReload(
  budget: RendererCrashReloadBudget,
  now: number,
): RendererCrashReloadDecision {
  const consecutiveReloads =
    now - budget.lastReloadAt > RENDERER_CRASH_RELOAD_RECOVERY_MS ? 0 : budget.consecutiveReloads;
  if (consecutiveReloads >= MAX_CONSECUTIVE_RENDERER_CRASH_RELOADS)
    return { shouldReload: false, reloadsAlreadySpent: consecutiveReloads };
  const attempt = consecutiveReloads + 1;
  return {
    shouldReload: true,
    attempt,
    budget: { consecutiveReloads: attempt, lastReloadAt: now },
  };
}

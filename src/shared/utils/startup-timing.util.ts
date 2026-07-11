import { logger } from '@shared/services/logger.service';

/**
 * Prefix that identifies a startup timing mark in the logs. The startup-waterfall parser
 * (`.erb/scripts/startup-waterfall.ts`) greps for this. Keep identical to the C# emitter
 * (`StartupTiming`).
 */
export const STARTUP_MARK_PREFIX = 'STARTUP_MARK';

/**
 * Emit a startup timing mark to the log, if startup marking is enabled for this launch
 * (`globalThis.startupMarks`, set from the `PT_STARTUP_MARKS` env var / query parameter).
 *
 * Each mark carries its own Unix-epoch-ms timestamp so the waterfall parser can order marks across
 * processes without depending on log-line timestamps. When marking is disabled (the production
 * default) this is a single boolean check and returns immediately, so it is safe to leave calls in
 * production code.
 *
 * @param name Kebab-case, space-free token naming the moment (e.g. `'window-created'`).
 */
export function markStartup(name: string): void {
  if (!globalThis.startupMarks) return;
  logger.info(`${STARTUP_MARK_PREFIX} ${globalThis.processType} ${name} ${Date.now()}`);
}

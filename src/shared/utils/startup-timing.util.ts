import { STARTUP_MARK_PREFIX } from '@shared/data/platform.data';
import { logger } from '@shared/services/logger.service';

// Re-exported for existing callers; the constant lives in the import-free platform.data module so
// the startup-waterfall CLI parser can share it without logger side effects.
export { STARTUP_MARK_PREFIX };

/**
 * Emit a startup timing mark to the log, if startup marking is enabled for this launch
 * (`globalThis.startupMarks`, set from the `PT_STARTUP_MARKS` env var / query parameter).
 *
 * Each mark carries its own Unix-epoch-ms timestamp so the waterfall parser can order marks across
 * processes without depending on log-line timestamps. When marking is disabled (the production
 * default) this is a single boolean check and returns immediately, so it is safe to leave calls in
 * production code.
 *
 * @param name Kebab-case token naming the moment (e.g. `'window-created'`). May contain spaces (the
 *   waterfall parser treats everything between the process tag and the trailing epoch as the name)
 *   but must not contain line terminators, which would split the log line and silently lose the
 *   mark - sanitize dynamic values at the call site (see `activateExtensions`).
 */
export function markStartup(name: string): void {
  if (!globalThis.startupMarks) return;
  logger.info(`${STARTUP_MARK_PREFIX} ${globalThis.processType} ${name} ${Date.now()}`);
}

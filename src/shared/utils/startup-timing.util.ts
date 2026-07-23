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
 *   waterfall parser treats everything between the process tag and the trailing epoch as the name).
 *   Line terminators are stripped here (see below), so dynamic values are safe to pass without
 *   pre-sanitizing.
 */
export function markStartup(name: string): void {
  if (!globalThis.startupMarks) return;
  // Strip line terminators from the name: the log hook splits newline-containing messages across
  // physical lines and the waterfall parser matches per line, so a newline would silently lose the
  // mark (or, if the fragment ends in digits, corrupt the waterfall's zero point). Enforce the
  // invariant here - the one place that owns the mark format - rather than as a per-call-site
  // burden. Names legitimately contain spaces, so only line terminators are replaced.
  const safeName = name.replace(/[\r\n\u2028\u2029]+/g, '-');
  logger.info(`${STARTUP_MARK_PREFIX} ${globalThis.processType} ${safeName} ${Date.now()}`);
}

/** Names already emitted via {@link markStartupOnce} this process. TS processes are single-threaded. */
const emittedOnceMarkNames = new Set<string>();

/**
 * Like {@link markStartup}, but emits the named mark at most once per process. Use for "first time X
 * happens" marks reached from code that can run many times (e.g. the first web view rendered, the
 * first chapter served) so re-runs don't inject duplicate or dangling marks into the waterfall.
 *
 * @param name See {@link markStartup}.
 */
export function markStartupOnce(name: string): void {
  if (!globalThis.startupMarks) return;
  if (emittedOnceMarkNames.has(name)) return;
  emittedOnceMarkNames.add(name);
  markStartup(name);
}

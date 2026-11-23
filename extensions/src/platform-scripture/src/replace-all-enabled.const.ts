/**
 * Whether Find offers Replace All. Off because it rewrites every match in the scope at once and
 * can't be undone in the app after its 1-second Cancel window (only by reverting to the history
 * point it saves first). Turn it back on once it has an undo or a confirmation, and un-skip the
 * Replace All e2e test in replace.spec.ts.
 *
 * In a module of its own so that tests can turn it on to reach the Replace All code it hides.
 */
export const IS_REPLACE_ALL_ENABLED = false;

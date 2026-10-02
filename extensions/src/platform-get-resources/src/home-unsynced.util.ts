function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string');
}

/**
 * Collapse an unsynced-changes snapshot (`{ toSend, toReceive }`) into the single list of projects
 * Home marks: those with changes to send or to receive, upper-cased and listed once. Returns
 * `undefined` for a snapshot missing either field or carrying one that is not an array of strings,
 * so a caller can tell a malformed answer from an empty one.
 */
export function parseUnsyncedProjectIds(snapshot: unknown): readonly string[] | undefined {
  if (!snapshot || typeof snapshot !== 'object') return undefined;
  if (!('toSend' in snapshot) || !('toReceive' in snapshot)) return undefined;
  const { toSend, toReceive } = snapshot;
  if (!isStringArray(toSend) || !isStringArray(toReceive)) return undefined;

  return Array.from(new Set([...toSend, ...toReceive].map((id) => id.toUpperCase())));
}

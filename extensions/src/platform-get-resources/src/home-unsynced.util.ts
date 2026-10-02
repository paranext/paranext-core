function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string');
}

/**
 * Collapse an unsynced-changes snapshot (`{ toSend, toReceive }`) into the single list of projects
 * Home marks: those with changes to send or to receive, upper-cased and listed once. A snapshot
 * missing either field, or carrying one that is not an array of strings, yields an empty list.
 */
export function toUnsyncedProjectIds(snapshot: unknown): readonly string[] {
  if (typeof snapshot !== 'object' || snapshot === null) return [];
  if (!('toSend' in snapshot) || !('toReceive' in snapshot)) return [];
  const { toSend, toReceive } = snapshot;
  if (!isStringArray(toSend) || !isStringArray(toReceive)) return [];

  return Array.from(new Set([...toSend, ...toReceive].map((id) => id.toUpperCase())));
}

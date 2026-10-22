import { randomUUID } from 'crypto';

let distinctId: string | undefined;

/**
 * Identifier PostHog uses to group events by "who". Today this is a random UUID minted once per
 * extension-host process and never persisted, so every launch looks like a new anonymous
 * installation and nothing links events to a person or a machine across launches.
 *
 * TODO(PT-4367): user identity (a persisted installation id, or a consented user id) replaces the
 * body of this function. Nothing else in the codebase should know how the id is derived.
 */
export function getDistinctId(): string {
  if (!distinctId) distinctId = randomUUID();
  return distinctId;
}

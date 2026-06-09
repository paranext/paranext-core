import { SingleNotificationDocumentation } from '@shared/models/openrpc.model';
import { MULTI_SOURCE_EVENT_NAMES } from '@shared/data/network-event-names';
import type { MultiSourceNetworkEvents } from 'papi-shared-types';

interface EventRegistrant {
  handler: unknown;
  documentation?: SingleNotificationDocumentation;
}

/**
 * Tracks registered network event emitters, enforcing shared vs. exclusive ownership policy.
 *
 * @internal Exported for unit-testing only; not part of the public API.
 */
export class RpcEventRegistry {
  private byName = new Map<string, EventRegistrant[]>();

  /**
   * Try to register an event. Returns `true` if accepted, `false` if rejected.
   *
   * - Name in `MULTI_SOURCE_EVENT_NAMES` (multi-source): multiple handlers may register; same handler
   *   twice rejected.
   * - Name not in `MULTI_SOURCE_EVENT_NAMES` (single-source): first registrant wins; any subsequent
   *   registration from any handler is rejected.
   */
  tryRegister(
    handler: unknown,
    eventName: string,
    documentation?: SingleNotificationDocumentation,
  ): boolean {
    // Cast is needed: MULTI_SOURCE_EVENT_NAMES is typed as Set<keyof MultiSourceNetworkEvents> but
    // we receive an arbitrary string from the caller — the cast lets Set.has() accept it.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const isMultiSource = MULTI_SOURCE_EVENT_NAMES.has(eventName as keyof MultiSourceNetworkEvents);
    const existing = this.byName.get(eventName);

    if (!existing) {
      this.byName.set(eventName, [{ handler, documentation }]);
      return true;
    }

    if (isMultiSource) {
      if (existing.some((r) => r.handler === handler)) return false;
      existing.push({ handler, documentation });
      return true;
    }

    return false;
  }

  /** Remove a registrant. Returns `true` if the handler had registered this event. */
  tryUnregister(handler: unknown, eventName: string): boolean {
    const existing = this.byName.get(eventName);
    if (!existing) return false;
    const index = existing.findIndex((r) => r.handler === handler);
    if (index < 0) return false;
    existing.splice(index, 1);
    if (existing.length === 0) this.byName.delete(eventName);
    return true;
  }

  /** Remove all event registrations for the given handler (e.g. when a websocket closes) */
  unregisterAll(handler: unknown): void {
    this.byName.forEach((registrants, eventName) => {
      const filtered = registrants.filter((r) => r.handler !== handler);
      if (filtered.length === 0) this.byName.delete(eventName);
      else this.byName.set(eventName, filtered);
    });
  }

  entries(): IterableIterator<[string, EventRegistrant[]]> {
    return this.byName.entries();
  }
}

export default RpcEventRegistry;

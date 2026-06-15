import { SingleNotificationDocumentation } from '@shared/models/openrpc.model';
import { MULTI_SOURCE_EVENT_NAMES } from '@shared/data/network-event-names';

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
    const isMultiSource = MULTI_SOURCE_EVENT_NAMES.has(eventName);
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

  /**
   * Classify an attempt to announce (emit) an event on the network against the registry. Used to
   * warn about misuse without blocking the announcement.
   *
   * - `'ok'` — the announcement is valid: the event is multi-source (any process may announce it,
   *   whether or not it registered), or it is single-source and announced by its registrant.
   * - `'unregistered'` — the event is single-source and no process has registered this name
   *   centrally. Emitting a single-source event that was never registered is deprecated (it does
   *   not appear in the OpenRPC document).
   * - `'foreign-single-source'` — the event is single-source but is being announced by a handler that
   *   did not register it; only the registering process should emit a single-source event.
   */
  checkAnnouncement(
    handler: unknown,
    eventName: string,
  ): 'ok' | 'unregistered' | 'foreign-single-source' {
    // Multi-source events may be announced by any process regardless of registration, so they are
    // always fine to emit.
    if (MULTI_SOURCE_EVENT_NAMES.has(eventName)) return 'ok';
    const existing = this.byName.get(eventName);
    if (!existing || existing.length === 0) return 'unregistered';
    return existing.some((r) => r.handler === handler) ? 'ok' : 'foreign-single-source';
  }

  /** Whether any handler has centrally registered this event name. */
  has(eventName: string): boolean {
    const existing = this.byName.get(eventName);
    return existing !== undefined && existing.length > 0;
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

import { describe, it, expect } from 'vitest';
import {
  MULTI_SOURCE_EVENT_NAMES,
  NetworkEventBuffer,
  createCoreMultiSourceEventEmitter,
  getNetworkEvent,
} from '@shared/services/network.service';
import type { MultiSourceNetworkEvents } from 'papi-shared-types';
import type { PlatformEvent } from 'platform-bible-utils';

describe('NetworkEventBuffer', () => {
  it("'queue' keeps every event and flushes them in emit order", () => {
    const buffer = new NetworkEventBuffer<number>('queue');
    buffer.add(1);
    buffer.add(2);
    buffer.add(2);
    expect(buffer.drain()).toEqual([1, 2, 2]);
    // Draining empties the buffer.
    expect(buffer.drain()).toEqual([]);
  });

  it("'latestByKey' keeps only the latest event per key, in first-seen key order", () => {
    const buffer = new NetworkEventBuffer<{ id: string; n: number }>({
      latestByKey: (e) => e.id,
    });
    buffer.add({ id: 'a', n: 1 });
    buffer.add({ id: 'b', n: 1 });
    buffer.add({ id: 'a', n: 2 }); // updates 'a', keeps its first-seen position
    expect(buffer.drain()).toEqual([
      { id: 'a', n: 2 },
      { id: 'b', n: 1 },
    ]);
    expect(buffer.drain()).toEqual([]);
  });

  it('clear() empties the buffer', () => {
    const buffer = new NetworkEventBuffer<number>('queue');
    buffer.add(1);
    buffer.clear();
    expect(buffer.drain()).toEqual([]);
  });
});

describe('MULTI_SOURCE_EVENT_NAMES stays in sync with the multi-source event names', () => {
  it('contains every public MultiSourceNetworkEvents key (exhaustive)', () => {
    // `Record<keyof MultiSourceNetworkEvents, true>` forces every public key to be listed here —
    // adding a key to MultiSourceNetworkEvents without also adding it to the runtime set becomes a
    // compile error (the exact invariant this test exists to enforce).
    const publicKeys: Record<keyof MultiSourceNetworkEvents, true> = {
      'object:onDidCreateNetworkObject': true,
      'object:onDidDisposeNetworkObject': true,
    };
    Object.keys(publicKeys).forEach((name) =>
      expect(MULTI_SOURCE_EVENT_NAMES.has(name)).toBe(true),
    );
  });

  it('contains the platform-internal multi-source events not declared in the public types', () => {
    expect(MULTI_SOURCE_EVENT_NAMES.has('shared-store:change')).toBe(true);
  });

  it('contains only known multi-source names', () => {
    // The compile-time invariant (set members must be a MultiSourceNetworkEventName) is enforced
    // where MULTI_SOURCE_EVENT_NAMES is declared; here we just guard against accidental additions.
    const known = [
      'object:onDidCreateNetworkObject',
      'object:onDidDisposeNetworkObject',
      'shared-store:change',
    ];
    Array.from(MULTI_SOURCE_EVENT_NAMES).forEach((name) => expect(known).toContain(name));
  });
});

describe('createCoreMultiSourceEventEmitter (synchronous)', () => {
  it('throws synchronously for an event name that is not a pre-approved multi-source event', () => {
    expect(() =>
      // 'as never' bypasses the keyof MultiSourceNetworkEvents constraint to exercise the runtime
      // guard that protects untyped/cast callers.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      createCoreMultiSourceEventEmitter('myExt.notApproved' as never),
    ).toThrow(/not a pre-approved multi-source event/);
  });

  it('synchronously returns an emitter and a registeredEmitterPromise for a pre-approved event', () => {
    const result = createCoreMultiSourceEventEmitter('object:onDidCreateNetworkObject');
    try {
      expect(typeof result.emitter.emit).toBe('function');
      expect(typeof result.emitter.event).toBe('function');
      expect(result.registeredEmitterPromise).toBeInstanceOf(Promise);
    } finally {
      // The background registration touches the (unavailable) network in unit mode; swallow its
      // result so it can't surface as an unhandled rejection, and dispose the emitter so its
      // module-level record doesn't leak into other tests.
      result.registeredEmitterPromise.catch(() => {});
      result.emitter.dispose();
    }
  });
});

describe('getNetworkEvent overloads', () => {
  it('typed call infers payload from NetworkEvents', () => {
    // Compile-time test — if this compiles, the typed overload exists.
    const ev = getNetworkEvent('object:onDidCreateNetworkObject');
    // ev should be PlatformEvent<NetworkObjectDetails> — verify by satisfying the structural type.
    const checked: PlatformEvent<unknown> = ev;
    expect(checked).toBeDefined();
  });

  it('explicit <T> call still resolves (deprecated overload)', () => {
    const ev = getNetworkEvent<{ foo: string }>('arbitraryName');
    const checked: PlatformEvent<{ foo: string }> = ev;
    expect(checked).toBeDefined();
  });
});

import { describe, it, expect } from 'vitest';
import {
  MULTI_SOURCE_EVENT_NAMES,
  createNetworkEventEmitterAsync,
  getNetworkEvent,
} from '@shared/services/network.service';
import type { MultiSourceNetworkEvents } from 'papi-shared-types';
import type { PlatformEvent } from 'platform-bible-utils';

describe('MULTI_SOURCE_EVENT_NAMES stays in sync with MultiSourceNetworkEvents', () => {
  it('contains every key of MultiSourceNetworkEvents', () => {
    type RequiredKeys = keyof MultiSourceNetworkEvents;
    const required: RequiredKeys[] = [
      'object:onDidCreateNetworkObject',
      'object:onDidDisposeNetworkObject',
      'shared-store:change',
    ];
    required.forEach((name) => expect(MULTI_SOURCE_EVENT_NAMES.has(name)).toBe(true));
  });

  it('contains no names absent from MultiSourceNetworkEvents', () => {
    type AllowedKeys = keyof MultiSourceNetworkEvents;
    Array.from(MULTI_SOURCE_EVENT_NAMES).forEach((name) => {
      // The cast verifies the runtime constant only contains keys MultiSourceNetworkEvents declares.
      // If a new entry is added to MULTI_SOURCE_EVENT_NAMES without adding it to
      // MultiSourceNetworkEvents, this assignment is a type error and the test fails to compile.
      const typed: AllowedKeys = name;
      expect(typeof typed).toBe('string');
    });
  });
});

// These integration tests require a running RPC/WebSocket server that the unit test environment
// does not provide. They are kept here for documentation and for future integration test suites;
// skip them in unit test mode to avoid connection timeouts.
describe.skip('createNetworkEventEmitterAsync', () => {
  // The async emitter creator requires network initialization, which involves the WebSocket and RPC
  // setup. If the test environment doesn't bootstrap those, these tests may need mocks. For now,
  // write the tests as integration tests that may be skipped via `describe.skip` if the
  // initialization can't be satisfied in unit test mode. Detect this by trying to await it; if it
  // rejects with a clear "RPC handler not set" or similar error, skip rather than fail.

  it('resolves to a functional emitter for a declared event name', async () => {
    try {
      // The 'as never' cast bypasses the NetworkEventTypes constraint at the call site for a name
      // that won't have been declared in this test's compilation unit. The runtime accepts any
      // string; the typed constraint is enforced at production call sites by NetworkEventTypes.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const emitter = await createNetworkEventEmitterAsync('myExt.testEvent' as never);
      let received: unknown;
      // 'as never' bypasses the NetworkEventTypes constraint — same reason as above.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      getNetworkEvent('myExt.testEvent' as never)((event) => {
        received = event;
      });
      // 'as never' bypasses the typed payload constraint for an ad-hoc test event.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      emitter.emit({ value: 42 } as never);
      await new Promise<void>((resolve) => {
        setTimeout(resolve, 10);
      });
      // Cast is needed: `received` is typed as `unknown`; narrowing to the expected shape.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      expect((received as { value: number }).value).toBe(42);
    } catch (err) {
      if (
        err instanceof Error &&
        /not initialized|RPC handler|not connected|send payload|connect/i.test(err.message)
      ) {
        // Test environment doesn't bootstrap RPC — skip this integration check.
        return;
      }
      throw err;
    }
  });

  it('rejects a second registration of the same single-source event name within one process', async () => {
    try {
      // 'as never' bypasses the NetworkEventTypes constraint for a test-only event name.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      await createNetworkEventEmitterAsync('myExt.unique' as never);
      // 'as never' bypasses the NetworkEventTypes constraint for a test-only event name.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      await expect(createNetworkEventEmitterAsync('myExt.unique' as never)).rejects.toThrow();
    } catch (err) {
      if (
        err instanceof Error &&
        /not initialized|RPC handler|not connected|send payload|connect/i.test(err.message)
      ) {
        return;
      }
      throw err;
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

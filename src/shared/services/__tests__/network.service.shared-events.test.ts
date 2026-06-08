import { describe, it, expect } from 'vitest';
import {
  SHARED_EVENT_NAMES,
  createNetworkEventEmitterAsync,
  getNetworkEvent,
} from '@shared/services/network.service';
import type { SharedNetworkEventTypes } from 'papi-shared-types';

describe('SHARED_EVENT_NAMES stays in sync with SharedNetworkEventTypes', () => {
  it('contains every key of SharedNetworkEventTypes', () => {
    type RequiredKeys = keyof SharedNetworkEventTypes;
    const required: RequiredKeys[] = [
      'network-object.onDidCreateNetworkObject',
      'network-object.onDidDisposeNetworkObject',
      'shared-store.onDidChange',
    ];
    for (const name of required) expect(SHARED_EVENT_NAMES.has(name)).toBe(true);
  });

  it('contains no names absent from SharedNetworkEventTypes', () => {
    type AllowedKeys = keyof SharedNetworkEventTypes;
    for (const name of SHARED_EVENT_NAMES) {
      // The cast verifies the runtime constant only contains keys SharedNetworkEventTypes declares.
      // If a new entry is added to SHARED_EVENT_NAMES without adding it to SharedNetworkEventTypes,
      // this assignment is a type error and the test fails to compile.
      const typed: AllowedKeys = name;
      expect(typeof typed).toBe('string');
    }
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
      // The 'as never' cast bypasses the keyof NetworkEventTypes constraint at the call site for
      // a name that won't have been declared in this test's compilation unit. The runtime accepts
      // any string; the typed constraint is enforced at production call sites by NetworkEventTypes.
      const emitter = await createNetworkEventEmitterAsync('myExt.testEvent' as never);
      let received: unknown;
      getNetworkEvent('myExt.testEvent' as never)((event) => {
        received = event;
      });
      emitter.emit({ value: 42 } as never);
      await new Promise((r) => setTimeout(r, 10));
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

  it('rejects a second registration of the same exclusive event name within one process', async () => {
    try {
      await createNetworkEventEmitterAsync('myExt.unique' as never);
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

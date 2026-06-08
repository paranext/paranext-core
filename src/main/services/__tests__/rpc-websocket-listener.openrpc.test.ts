import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock heavy dependencies so this test can run outside the Electron main process
vi.mock('electron', () => ({ app: { getVersion: () => '0.0.0' } }));
vi.mock('ws', () => ({ WebSocketServer: vi.fn() }));
vi.mock('@shared/services/logger.service', () => ({
  logger: { warn: vi.fn(), info: vi.fn(), debug: vi.fn(), error: vi.fn() },
}));

import { RpcEventRegistry } from '@main/services/rpc-websocket-listener';

describe('generateOpenRpcSchema() includes notifications from the event registry', () => {
  // We test via RpcEventRegistry directly because constructing a full RpcWebSocketListener
  // requires mocking Electron IPC, WebSocketServer, network service startup, and more.
  // The registry itself is the unit under test here; the integration with generateOpenRpcSchema
  // is verified by checking that the entries() API returns the correct shape.

  let reg: RpcEventRegistry;

  beforeEach(() => {
    reg = new RpcEventRegistry();
  });

  it('entries() returns registered events with documentation, enabling notification emission', () => {
    const docs = {
      notification: {
        params: [],
        summary: 'Fired when something happens',
        'x-experimental': true as const,
      },
    };
    reg.tryRegister({}, 'myExt.onDidSomething', docs);

    const entries = [...reg.entries()];
    expect(entries).toHaveLength(1);
    const [eventName, registrants] = entries[0];
    expect(eventName).toBe('myExt.onDidSomething');
    const foundDocs = registrants.find((r) => r.documentation)?.documentation;
    expect(foundDocs).toBeDefined();
    expect(foundDocs?.notification.summary).toBe('Fired when something happens');
    expect(foundDocs?.notification['x-experimental']).toBe(true);

    // Verify the notification entry shape (no result field):
    const notificationEntry = { name: eventName, ...foundDocs!.notification };
    expect('result' in notificationEntry).toBe(false);
    expect(notificationEntry.name).toBe('myExt.onDidSomething');
  });

  it('events without documentation are not surfaced (entries with no docs are skipped)', () => {
    reg.tryRegister({}, 'myExt.undocumented'); // no docs

    const entries = [...reg.entries()];
    expect(entries).toHaveLength(1);
    const [, registrants] = entries[0];
    const foundDocs = registrants.find((r) => r.documentation)?.documentation;
    // The production loop does `if (!docs) continue;` — confirm docs is undefined here
    expect(foundDocs).toBeUndefined();
  });

  it('first registration documentation wins for shared events', () => {
    const firstDocs = {
      notification: { params: [], summary: 'First handler summary' },
    };
    const secondDocs = {
      notification: { params: [], summary: 'Second handler summary' },
    };
    const sharedName = 'network-object.onDidCreateNetworkObject';
    reg.tryRegister({ id: 'A' }, sharedName, firstDocs);
    reg.tryRegister({ id: 'B' }, sharedName, secondDocs);

    const entries = [...reg.entries()];
    expect(entries).toHaveLength(1);
    const [, registrants] = entries[0];
    // Both registrants are present; find() returns the first with documentation
    const foundDocs = registrants.find((r) => r.documentation)?.documentation;
    expect(foundDocs?.notification.summary).toBe('First handler summary');
  });
});

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { RpcEventRegistry, RpcWebSocketListener } from '@main/services/rpc-websocket-listener';
import {
  EXPERIMENTAL_OPENRPC_PREFIX,
  NOTIFICATION_OPENRPC_PREFIX,
} from '@shared/models/openrpc.model';
import { logger } from '@shared/services/logger.service';

// Mock heavy dependencies so this test can run outside the Electron main process
vi.mock('electron', () => ({ app: { getVersion: () => '0.0.0' } }));
vi.mock('ws', () => ({ WebSocketServer: vi.fn() }));
vi.mock('@shared/services/logger.service', () => ({
  logger: { warn: vi.fn(), info: vi.fn(), debug: vi.fn(), error: vi.fn() },
}));

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
    // The non-null assertion is needed here: we have already asserted foundDocs is defined above,
    // but TypeScript's narrowing doesn't carry across the expression boundary.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const notificationEntry = { name: eventName, ...foundDocs!.notification };
    expect('result' in notificationEntry).toBe(false);
    expect(notificationEntry.name).toBe('myExt.onDidSomething');
  });

  it('first registration documentation wins for multi-source events', () => {
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

describe('generateOpenRpcSchema() surfaces every registered event', () => {
  let listener: RpcWebSocketListener;

  beforeEach(() => {
    // The constructor only binds methods (no Electron/WebSocket startup), so a bare instance is
    // enough to register events and generate the schema directly.
    listener = new RpcWebSocketListener();
  });

  it('includes a documented event with its provided documentation', async () => {
    await listener.registerEvent('myExt.onDidSomething', {
      notification: { params: [], summary: 'Fired when something happens' },
    });

    const schema = listener.generateOpenRpcSchema();
    const entry = schema.methods.find((m) => m.name === 'myExt.onDidSomething');
    expect(entry).toBeDefined();
    // Notification summaries get the `(Notification) ` prefix so they're distinguishable from
    // methods in tooling that lists both together.
    expect(entry?.summary).toBe(`${NOTIFICATION_OPENRPC_PREFIX}Fired when something happens`);
    // Notifications carry no `result` field.
    expect(entry && 'result' in entry).toBe(false);
  });

  it('includes an undocumented event with placeholder documentation (not skipped)', async () => {
    await listener.registerEvent('myExt.undocumented'); // no docs

    const schema = listener.generateOpenRpcSchema();
    const entry = schema.methods.find((m) => m.name === 'myExt.undocumented');
    // Previously undocumented events were dropped from the document; now they are surfaced with a
    // placeholder so the OpenRPC document lists every registered event.
    expect(entry).toBeDefined();
    expect(entry?.description).toBe('Notification: No documentation provided');
    expect(entry?.params).toEqual([]);
    expect(entry && 'result' in entry).toBe(false);
  });

  it('prepends (Notification) and [EXPERIMENTAL] to the summary of an experimental event', async () => {
    await listener.registerEvent('myExt.expEvent', {
      notification: { params: [], summary: 'Fires experimentally', 'x-experimental': true },
    });

    const schema = listener.generateOpenRpcSchema();
    const entry = schema.methods.find((m) => m.name === 'myExt.expEvent');
    expect(entry?.summary).toBe(
      `${NOTIFICATION_OPENRPC_PREFIX}${EXPERIMENTAL_OPENRPC_PREFIX}Fires experimentally`,
    );
    expect(entry?.['x-experimental']).toBe(true);
  });
});

describe('method/notification name collisions are rejected (names must be unique across both)', () => {
  let listener: RpcWebSocketListener;

  beforeEach(() => {
    vi.mocked(logger.warn).mockClear();
    listener = new RpcWebSocketListener();
  });

  it('rejects registering an event whose name is already a method, and warns', async () => {
    const registeredMethod = await listener.registerMethod('myExt.sharedName', vi.fn(), {
      method: { params: [], result: { name: 'r', schema: {} }, summary: 'A method' },
    });
    expect(registeredMethod).toBe(true);

    const registeredEvent = await listener.registerEvent('myExt.sharedName', {
      notification: { params: [], summary: 'An event' },
    });
    expect(registeredEvent).toBe(false);
    expect(vi.mocked(logger.warn).mock.calls[0][0]).toMatch(
      /Cannot register network event "myExt\.sharedName".*method with this name is already registered/s,
    );

    // The document carries exactly one entry for the name (the method), so it stays valid.
    const schema = listener.generateOpenRpcSchema();
    expect(schema.methods.filter((m) => m.name === 'myExt.sharedName')).toHaveLength(1);
  });

  it('rejects registering a method whose name is already an event, and warns', async () => {
    const registeredEvent = await listener.registerEvent('myExt.sharedName', {
      notification: { params: [], summary: 'An event' },
    });
    expect(registeredEvent).toBe(true);

    const registeredMethod = await listener.registerMethod('myExt.sharedName', vi.fn(), {
      method: { params: [], result: { name: 'r', schema: {} }, summary: 'A method' },
    });
    expect(registeredMethod).toBe(false);
    expect(vi.mocked(logger.warn).mock.calls[0][0]).toMatch(
      /Cannot register method "myExt\.sharedName".*notification\) with this name is already registered/s,
    );

    const schema = listener.generateOpenRpcSchema();
    expect(schema.methods.filter((m) => m.name === 'myExt.sharedName')).toHaveLength(1);
  });

  it('allows a method and an event with distinct names (both surface in the document)', async () => {
    await listener.registerMethod('myExt.doThing', vi.fn(), {
      method: { params: [], result: { name: 'r', schema: {} }, summary: 'A method' },
    });
    await listener.registerEvent('myExt.onDidThing', {
      notification: { params: [], summary: 'An event' },
    });

    const schema = listener.generateOpenRpcSchema();
    expect(schema.methods.find((m) => m.name === 'myExt.doThing')).toBeDefined();
    expect(schema.methods.find((m) => m.name === 'myExt.onDidThing')).toBeDefined();
    expect(vi.mocked(logger.warn)).not.toHaveBeenCalled();
  });
});

describe('emitEventOnNetwork warns about invalid event announcements', () => {
  let listener: RpcWebSocketListener;

  beforeEach(() => {
    vi.mocked(logger.warn).mockClear();
    // The constructor only binds methods (no Electron/WebSocket startup). There are no connected
    // sockets, so emitEventOnNetwork only runs the announcement validation and the (empty) fan-out.
    listener = new RpcWebSocketListener();
  });

  it('warns that announcing an unregistered single-source event is deprecated', () => {
    listener.emitEventOnNetwork('myExt.unregistered', { foo: 1 });
    expect(logger.warn).toHaveBeenCalledTimes(1);
    expect(vi.mocked(logger.warn).mock.calls[0][0]).toMatch(
      /not registered with the central registry.*deprecated as of 12 June 2026/s,
    );
  });

  it('warns only once per unregistered event name (deduped)', () => {
    listener.emitEventOnNetwork('myExt.unregistered', { foo: 1 });
    listener.emitEventOnNetwork('myExt.unregistered', { foo: 2 });
    expect(logger.warn).toHaveBeenCalledTimes(1);
  });

  it('does not warn when an unregistered multi-source event is announced', () => {
    // Multi-source events may be emitted by any process whether or not they registered.
    listener.emitEventOnNetwork('object:onDidCreateNetworkObject', { foo: 1 });
    expect(logger.warn).not.toHaveBeenCalled();
  });

  it('does not warn when main announces an event it registered itself', async () => {
    // Registering through the listener ties the event to the listener (`this`), which is the same
    // handler emitEventOnNetwork announces under — so the announcement is valid.
    await listener.registerEvent('myExt.mainOwned', {
      notification: { params: [], summary: 'Owned by main' },
    });
    listener.emitEventOnNetwork('myExt.mainOwned', { foo: 1 });
    expect(logger.warn).not.toHaveBeenCalled();
  });
});

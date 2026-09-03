import { beforeEach, describe, expect, it, vi } from 'vitest';
import { RpcEventRegistry } from '@main/services/rpc-websocket-listener';

// Mock heavy dependencies so this test can run outside the Electron main process
vi.mock('electron', () => ({ app: { getVersion: () => '0.0.0' } }));
vi.mock('ws', () => ({ WebSocketServer: vi.fn() }));
vi.mock('@shared/services/logger.service', () => ({
  logger: { warn: vi.fn(), info: vi.fn(), debug: vi.fn(), error: vi.fn() },
}));

describe('RpcEventRegistry — multi-source vs single-source policy', () => {
  const fakeA = { id: 'A' };
  const fakeB = { id: 'B' };

  let reg: RpcEventRegistry;
  beforeEach(() => {
    reg = new RpcEventRegistry();
  });

  it('single-source: first registrant wins; subsequent registrations from any handler rejected', () => {
    expect(reg.tryRegister(fakeA, 'myExt.exclusive')).toBe(true);
    expect(reg.tryRegister(fakeA, 'myExt.exclusive')).toBe(false);
    expect(reg.tryRegister(fakeB, 'myExt.exclusive')).toBe(false);
  });

  it('multi-source: multiple handlers may register; same handler twice rejected', () => {
    expect(reg.tryRegister(fakeA, 'object:onDidCreateNetworkObject')).toBe(true);
    expect(reg.tryRegister(fakeB, 'object:onDidCreateNetworkObject')).toBe(true);
    expect(reg.tryRegister(fakeA, 'object:onDidCreateNetworkObject')).toBe(false);
  });

  it('tryUnregister removes a handler and returns true', () => {
    reg.tryRegister(fakeA, 'myExt.exclusive');
    expect(reg.tryUnregister(fakeA, 'myExt.exclusive')).toBe(true);
    expect(reg.tryUnregister(fakeA, 'myExt.exclusive')).toBe(false); // already gone
  });

  it('tryUnregister returns false for a never-registered handler', () => {
    expect(reg.tryUnregister(fakeA, 'myExt.exclusive')).toBe(false);
  });

  it('has() reports whether any handler has registered a name', () => {
    expect(reg.has('myExt.exclusive')).toBe(false);
    reg.tryRegister(fakeA, 'myExt.exclusive');
    expect(reg.has('myExt.exclusive')).toBe(true);
    // Still registered while any registrant remains; false once the last one unregisters.
    reg.tryUnregister(fakeA, 'myExt.exclusive');
    expect(reg.has('myExt.exclusive')).toBe(false);
  });
});

describe('RpcEventRegistry — checkAnnouncement', () => {
  const fakeA = { id: 'A' };
  const fakeB = { id: 'B' };

  let reg: RpcEventRegistry;
  beforeEach(() => {
    reg = new RpcEventRegistry();
  });

  it("returns 'unregistered' when no one has registered a single-source event", () => {
    expect(reg.checkAnnouncement(fakeA, 'myExt.neverRegistered')).toBe('unregistered');
  });

  it("returns 'ok' for an unregistered multi-source event (any process may emit it)", () => {
    expect(reg.checkAnnouncement(fakeA, 'object:onDidCreateNetworkObject')).toBe('ok');
  });

  it("returns 'ok' when a single-source event is announced by its registrant", () => {
    reg.tryRegister(fakeA, 'myExt.exclusive');
    expect(reg.checkAnnouncement(fakeA, 'myExt.exclusive')).toBe('ok');
  });

  it("returns 'foreign-single-source' when a single-source event is announced by a non-registrant", () => {
    reg.tryRegister(fakeA, 'myExt.exclusive');
    expect(reg.checkAnnouncement(fakeB, 'myExt.exclusive')).toBe('foreign-single-source');
  });

  it("returns 'ok' for a multi-source event regardless of which registrant announces it", () => {
    reg.tryRegister(fakeA, 'object:onDidCreateNetworkObject');
    reg.tryRegister(fakeB, 'object:onDidCreateNetworkObject');
    expect(reg.checkAnnouncement(fakeA, 'object:onDidCreateNetworkObject')).toBe('ok');
    expect(reg.checkAnnouncement(fakeB, 'object:onDidCreateNetworkObject')).toBe('ok');
  });

  it("returns 'ok' for a multi-source event announced by a process that never registered it", () => {
    reg.tryRegister(fakeA, 'object:onDidCreateNetworkObject');
    // Multi-source semantics allow multiple sources; a non-registrant announcement is not flagged.
    expect(reg.checkAnnouncement(fakeB, 'object:onDidCreateNetworkObject')).toBe('ok');
  });
});

/**
 * A client that goes away takes its network event registrations down with it — the socket's close
 * handler calls `unregisterAll` for that client. The same names come back afterwards: a reloaded
 * window replays the URL carrying its own `windowId`, so it re-registers the very same
 * window-scoped event names, and `platform.restartExtensionHost` registers the extension host's on
 * a fresh process. So the cleanup has to leave those names genuinely free rather than merely
 * empty.
 */
describe('RpcEventRegistry — re-registration after a client socket closes', () => {
  const departedClient = { id: 'departed' };
  const survivingClient = { id: 'surviving' };

  let reg: RpcEventRegistry;
  beforeEach(() => {
    reg = new RpcEventRegistry();
  });

  it('frees a single-source event name so another process can register it', () => {
    expect(reg.tryRegister(departedClient, 'platform.themeServiceDataProvider:onDidUpdate')).toBe(
      true,
    );
    // Taken while its registrant is alive, whoever asks
    expect(reg.tryRegister(survivingClient, 'platform.themeServiceDataProvider:onDidUpdate')).toBe(
      false,
    );

    reg.unregisterAll(departedClient);

    expect(reg.has('platform.themeServiceDataProvider:onDidUpdate')).toBe(false);
    expect(reg.tryRegister(survivingClient, 'platform.themeServiceDataProvider:onDidUpdate')).toBe(
      true,
    );
    expect(
      reg.checkAnnouncement(survivingClient, 'platform.themeServiceDataProvider:onDidUpdate'),
    ).toBe('ok');
  });

  it('leaves the other registrants of a multi-source event registered', () => {
    reg.tryRegister(departedClient, 'object:onDidDisposeNetworkObject');
    reg.tryRegister(survivingClient, 'object:onDidDisposeNetworkObject');

    reg.unregisterAll(departedClient);

    expect(reg.has('object:onDidDisposeNetworkObject')).toBe(true);
    // The departed client's slot is gone, so it could register again if it ever came back
    expect(reg.tryRegister(departedClient, 'object:onDidDisposeNetworkObject')).toBe(true);
  });
});

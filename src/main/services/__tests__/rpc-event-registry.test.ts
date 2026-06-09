import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock heavy dependencies so this test can run outside the Electron main process
vi.mock('electron', () => ({ app: { getVersion: () => '0.0.0' } }));
vi.mock('ws', () => ({ WebSocketServer: vi.fn() }));
vi.mock('@shared/services/logger.service', () => ({
  logger: { warn: vi.fn(), info: vi.fn(), debug: vi.fn(), error: vi.fn() },
}));

import { RpcEventRegistry } from '@main/services/rpc-websocket-listener';

describe('RpcEventRegistry — shared vs exclusive policy', () => {
  const fakeA = { id: 'A' };
  const fakeB = { id: 'B' };

  let reg: RpcEventRegistry;
  beforeEach(() => {
    reg = new RpcEventRegistry();
  });

  it('exclusive: first registrant wins; subsequent registrations from any handler rejected', () => {
    expect(reg.tryRegister(fakeA, 'myExt.exclusive')).toBe(true);
    expect(reg.tryRegister(fakeA, 'myExt.exclusive')).toBe(false);
    expect(reg.tryRegister(fakeB, 'myExt.exclusive')).toBe(false);
  });

  it('shared: multiple handlers may register; same handler twice rejected', () => {
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
});

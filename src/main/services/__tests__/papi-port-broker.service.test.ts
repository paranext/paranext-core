import { describe, expect, test, vi, beforeEach } from 'vitest';
import {
  PAPI_PORT_CHANNEL,
  PAPI_PORT_ERROR_CHANNEL,
  PAPI_PORT_REQUEST_CHANNEL,
} from '@shared/data/papi-port.model';
import { INTENTIONAL_CLOSE_CODE } from '@shared/data/rpc.model';
import {
  BrokerFrame,
  BrokerIpcEvent,
  BrokerWebContents,
  registerWindow,
  closeWindowPort,
  closeAllPorts,
  resetForTesting,
  setMessageChannelFactoryForTesting,
} from '@main/services/papi-port-broker.service';
import type { MessagePortMainLike } from '@main/services/message-port-server-socket';

const { mockAcceptLocalClient, mockLoggerWarn, mockLoggerInfo } = vi.hoisted(() => ({
  mockAcceptLocalClient: vi.fn(),
  mockLoggerWarn: vi.fn(),
  mockLoggerInfo: vi.fn(),
}));

vi.mock('electron', () => ({ MessageChannelMain: vi.fn() }));
vi.mock('@shared/services/network.service', () => ({
  acceptLocalClient: mockAcceptLocalClient,
}));
vi.mock('@shared/services/logger.service', () => ({
  logger: { warn: mockLoggerWarn, info: mockLoggerInfo, debug: vi.fn(), error: vi.fn() },
}));

type FakePortMain = MessagePortMainLike & {
  emit: (event: string, ...args: unknown[]) => void;
  postMessage: ReturnType<typeof vi.fn>;
  start: ReturnType<typeof vi.fn>;
  close: ReturnType<typeof vi.fn>;
};

function makeFakePortMain(): FakePortMain {
  const listeners = new Map<string, Set<(...args: unknown[]) => void>>();
  const port = {
    on: vi.fn((event: string, l: (...args: unknown[]) => void) => {
      const forEvent = listeners.get(event) ?? new Set();
      forEvent.add(l);
      listeners.set(event, forEvent);
      return port;
    }),
    off: vi.fn((event: string, l: (...args: unknown[]) => void) => {
      listeners.get(event)?.delete(l);
      return port;
    }),
    postMessage: vi.fn(),
    start: vi.fn(),
    close: vi.fn(),
    emit: (event: string, ...args: unknown[]) => listeners.get(event)?.forEach((l) => l(...args)),
  };
  // One recording fake serves both overloads of `on`/`off`; the tests drive it by event name
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return port as unknown as FakePortMain;
}

type NavigationDetails = { isMainFrame: boolean; isSameDocument: boolean };

function makeFakeWebContents() {
  const ipcListeners = new Map<string, (event: BrokerIpcEvent, ...args: unknown[]) => void>();
  const navigationListeners = new Set<(details: NavigationDetails) => void>();
  // Called with no arguments; typed loosely so the one `on` implementation can store them
  const crashListeners = new Set<(...args: never[]) => void>();
  const destroyedListeners = new Set<(...args: never[]) => void>();
  const mainFrame = { postMessage: vi.fn() };
  function on(event: 'did-start-navigation', listener: (details: NavigationDetails) => void): void;
  function on(event: 'render-process-gone' | 'destroyed', listener: () => void): void;
  function on(event: string, listener: (details: NavigationDetails) => void): void {
    if (event === 'did-start-navigation') navigationListeners.add(listener);
    else if (event === 'render-process-gone') crashListeners.add(listener);
    else if (event === 'destroyed') destroyedListeners.add(listener);
  }
  const webContents: BrokerWebContents = {
    ipc: {
      on: (channel, listener) => {
        ipcListeners.set(channel, listener);
      },
    },
    mainFrame,
    on,
  };
  return {
    webContents,
    mainFrame,
    /** Send the port request as if from `frame` (defaults to the main frame) */
    requestPort: (frame: BrokerFrame | null = mainFrame) =>
      ipcListeners.get(PAPI_PORT_REQUEST_CHANNEL)?.({ senderFrame: frame }),
    navigate: (details: NavigationDetails) => navigationListeners.forEach((l) => l(details)),
    crash: () => crashListeners.forEach((l) => l()),
    destroy: () => destroyedListeners.forEach((l) => l()),
  };
}

describe('papiPortBroker', () => {
  let ports: FakePortMain[];

  beforeEach(() => {
    resetForTesting();
    mockAcceptLocalClient.mockReset();
    mockLoggerWarn.mockClear();
    ports = [];
    setMessageChannelFactoryForTesting(() => {
      const port1 = makeFakePortMain();
      ports.push(port1);
      return { port1, port2: { fake: 'port2', index: ports.length - 1 } };
    });
  });

  test('answers a top-frame request with a started port, served under renderer:<windowId>', () => {
    const fake = makeFakeWebContents();
    registerWindow(fake.webContents, 'w1');

    fake.requestPort();

    expect(mockAcceptLocalClient).toHaveBeenCalledTimes(1);
    expect(mockAcceptLocalClient.mock.calls[0][1]).toBe('renderer:w1');
    expect(ports[0].start).toHaveBeenCalled();
    expect(fake.mainFrame.postMessage).toHaveBeenCalledWith(PAPI_PORT_CHANNEL, { windowId: 'w1' }, [
      { fake: 'port2', index: 0 },
    ]);
  });

  test('answers once per page load: a second request gets a port error and is warned about', () => {
    const fake = makeFakeWebContents();
    registerWindow(fake.webContents, 'w1');
    fake.requestPort();

    fake.requestPort();

    expect(mockAcceptLocalClient).toHaveBeenCalledTimes(1);
    expect(fake.mainFrame.postMessage).toHaveBeenCalledTimes(2);
    expect(fake.mainFrame.postMessage).toHaveBeenLastCalledWith(PAPI_PORT_ERROR_CHANNEL, {
      reason: 'This page already has a PAPI port; a page gets exactly one per load',
    });
    expect(mockLoggerWarn).toHaveBeenCalledWith(expect.stringContaining('already has a PAPI port'));
  });

  test('refuses a request whose sender is not the top frame, or has no frame', () => {
    const fake = makeFakeWebContents();
    registerWindow(fake.webContents, 'w1');

    fake.requestPort({ postMessage: vi.fn() });
    // A detached frame is reported as a null `senderFrame`
    // eslint-disable-next-line no-null/no-null
    fake.requestPort(null);

    expect(mockAcceptLocalClient).not.toHaveBeenCalled();
    expect(fake.mainFrame.postMessage).not.toHaveBeenCalled();
  });

  test('a main-frame navigation to a new document closes the old port with 1001 and allows a new request', () => {
    const fake = makeFakeWebContents();
    registerWindow(fake.webContents, 'w1');
    fake.requestPort();

    fake.navigate({ isMainFrame: true, isSameDocument: false });

    expect(ports[0].postMessage).toHaveBeenCalledWith(
      expect.objectContaining({ code: 1001, reason: 'page navigated away' }),
    );
    expect(ports[0].close).toHaveBeenCalled();

    fake.requestPort();
    expect(mockAcceptLocalClient).toHaveBeenCalledTimes(2);
    expect(mockAcceptLocalClient.mock.calls[1][1]).toBe('renderer:w1');
  });

  test('a subframe or same-document navigation leaves the port alone', () => {
    const fake = makeFakeWebContents();
    registerWindow(fake.webContents, 'w1');
    fake.requestPort();

    fake.navigate({ isMainFrame: false, isSameDocument: false });
    fake.navigate({ isMainFrame: true, isSameDocument: true });

    expect(ports[0].close).not.toHaveBeenCalled();
    fake.requestPort();
    expect(mockAcceptLocalClient).toHaveBeenCalledTimes(1);
  });

  test('a renderer crash closes the old port as 1006 and allows the reloaded page to request a new port', () => {
    const fake = makeFakeWebContents();
    registerWindow(fake.webContents, 'w1');
    fake.requestPort();

    fake.crash();
    fake.requestPort();

    expect(ports[0].postMessage).toHaveBeenCalledWith(
      expect.objectContaining({ code: 1006, reason: 'renderer process gone' }),
    );
    expect(ports[0].close).toHaveBeenCalled();
    expect(mockAcceptLocalClient).toHaveBeenCalledTimes(2);
  });

  test('a peer close frees the slot so a later request in the same load is still refused', () => {
    // The page keeps its first port for its whole life; a port closed by the page (an extension
    // calling close on a stolen port, say) must not let a second request through
    const fake = makeFakeWebContents();
    registerWindow(fake.webContents, 'w1');
    fake.requestPort();

    ports[0].emit('close');
    fake.requestPort();

    expect(mockAcceptLocalClient).toHaveBeenCalledTimes(1);
  });

  test('replies with portError and grants nothing when the network service refuses', () => {
    mockAcceptLocalClient.mockImplementation(() => {
      throw new Error('The PAPI network service is not initialized');
    });
    const fake = makeFakeWebContents();
    registerWindow(fake.webContents, 'w1');

    fake.requestPort();

    expect(fake.mainFrame.postMessage).toHaveBeenCalledWith(PAPI_PORT_ERROR_CHANNEL, {
      reason: 'The PAPI network service is not initialized',
    });
    expect(ports[0].close).toHaveBeenCalled();
    // The failed attempt does not consume the page's one request
    mockAcceptLocalClient.mockImplementation(() => {});
    fake.requestPort();
    expect(mockAcceptLocalClient).toHaveBeenCalledTimes(2);
  });

  test('a grant the frame cannot deliver closes the socket with 1011 and leaves the next request served', () => {
    const fake = makeFakeWebContents();
    registerWindow(fake.webContents, 'w1');
    fake.mainFrame.postMessage.mockImplementationOnce(() => {
      throw new Error('Render frame was disposed before WebFrameMain could be accessed');
    });

    expect(() => fake.requestPort()).not.toThrow();

    expect(ports[0].postMessage).toHaveBeenCalledWith(
      expect.objectContaining({
        code: 1011,
        reason: 'Render frame was disposed before WebFrameMain could be accessed',
      }),
    );
    expect(ports[0].close).toHaveBeenCalled();
    expect(mockLoggerWarn).toHaveBeenCalledWith(expect.stringContaining('window w1'));
    // The undelivered grant does not use up the page's one request
    fake.requestPort();
    expect(mockAcceptLocalClient).toHaveBeenCalledTimes(2);
    expect(fake.mainFrame.postMessage).toHaveBeenLastCalledWith(
      PAPI_PORT_CHANNEL,
      { windowId: 'w1' },
      [{ fake: 'port2', index: 1 }],
    );
    // The failed socket is no longer the window's, so closing the window reaches only the new one
    closeWindowPort('w1', 1001, 'window closing');
    expect(ports[0].postMessage).not.toHaveBeenCalledWith(expect.objectContaining({ code: 1001 }));
    expect(ports[1].postMessage).toHaveBeenCalledWith(expect.objectContaining({ code: 1001 }));
  });

  test('a port error the frame cannot deliver is logged, not thrown', () => {
    const fake = makeFakeWebContents();
    registerWindow(fake.webContents, 'w1');
    fake.requestPort();
    fake.mainFrame.postMessage.mockImplementation(() => {
      throw new Error('frame gone');
    });

    // The refusal of a second request, and the refusal when the network service is not ready
    expect(() => fake.requestPort()).not.toThrow();
    fake.navigate({ isMainFrame: true, isSameDocument: false });
    mockAcceptLocalClient.mockImplementation(() => {
      throw new Error('The PAPI network service is not initialized');
    });
    expect(() => fake.requestPort()).not.toThrow();

    expect(mockLoggerWarn).toHaveBeenCalledWith(expect.stringContaining('frame gone'));
  });

  test('closeWindowPort closes that window’s port with the given code and is a no-op for an unknown window', () => {
    const fake = makeFakeWebContents();
    registerWindow(fake.webContents, 'w1');
    fake.requestPort();

    closeWindowPort('w1', 1001, 'window closing');
    expect(ports[0].postMessage).toHaveBeenCalledWith(
      expect.objectContaining({ code: 1001, reason: 'window closing' }),
    );
    expect(() => closeWindowPort('nope', 1001, 'window closing')).not.toThrow();
  });

  test('closeAllPorts closes every open port with INTENTIONAL_CLOSE_CODE', () => {
    const a = makeFakeWebContents();
    const b = makeFakeWebContents();
    registerWindow(a.webContents, 'w1');
    registerWindow(b.webContents, 'w2');
    a.requestPort();
    b.requestPort();

    closeAllPorts(INTENTIONAL_CLOSE_CODE, 'app shutdown');

    expect(ports[0].postMessage).toHaveBeenCalledWith(expect.objectContaining({ code: 4000 }));
    expect(ports[1].postMessage).toHaveBeenCalledWith(expect.objectContaining({ code: 4000 }));
  });

  test('a destroyed webContents forgets its window', () => {
    const fake = makeFakeWebContents();
    registerWindow(fake.webContents, 'w1');
    fake.requestPort();

    fake.destroy();

    expect(() => closeWindowPort('w1', 1001, 'window closing')).not.toThrow();
    expect(ports[0].postMessage).not.toHaveBeenCalledWith(expect.objectContaining({ code: 1001 }));
  });

  test('a late destroyed signal from an old window leaves a newer window under the same id registered', () => {
    const oldWindow = makeFakeWebContents();
    const newWindow = makeFakeWebContents();
    registerWindow(oldWindow.webContents, 'w1');
    registerWindow(newWindow.webContents, 'w1');
    newWindow.requestPort();

    oldWindow.destroy();
    closeWindowPort('w1', 1001, 'window closing');

    expect(ports[0].postMessage).toHaveBeenCalledWith(
      expect.objectContaining({ code: 1001, reason: 'window closing' }),
    );
    expect(ports[0].close).toHaveBeenCalled();
  });
});

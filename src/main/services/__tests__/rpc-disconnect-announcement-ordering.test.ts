import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { REGISTER_METHOD } from '@shared/data/rpc.model';
import { ProcessType } from '@shared/global-this.model';
import { deserialize } from 'platform-bible-utils';
import { createFakeWebSocket } from './fake-web-socket-test.util';

// Mock heavy dependencies so main's network stack can run outside the Electron main process.
vi.mock('electron', () => ({ app: { getVersion: () => '0.0.0' } }));
vi.mock('ws', () => ({
  WebSocketServer: vi.fn(() => ({ addListener: vi.fn(), removeListener: vi.fn(), close: vi.fn() })),
}));
vi.mock('@shared/services/logger.service', () => ({
  logger: { warn: vi.fn(), info: vi.fn(), debug: vi.fn(), error: vi.fn() },
}));

/** The wire name the network object service announces disposals under */
const DISPOSE_NETWORK_OBJECT_EVENT = 'object:onDidDisposeNetworkObject';
/** Id of the network object the departing client hosts */
const DYING_OBJECT_ID = 'DyingObject';
/** JSON-RPC id of the registration request the surviving client sends */
const REGISTER_REQUEST_ID = 7;
/**
 * How many microtask hops to let run before checking what has been sent. Deliberately far more than
 * the announcement chain needs: the invariant under test is that nothing in the chain yields to the
 * event loop, not that the chain costs some exact number of microtasks, so a generous count keeps
 * the test from breaking over a harmless extra `await` on an already-resolved promise. Draining
 * microtasks can never let a timer or an I/O callback run, so it cannot mask a real yield.
 */
const MICROTASK_HOPS_TO_DRAIN = 20;

/** A JSON-RPC message main handed to a socket, reduced to the fields these tests order by */
type SentMessage = {
  method?: unknown;
  id?: unknown;
  params?: unknown[];
  result?: unknown;
  isResponse?: boolean;
};

/** What main sent to a socket, parsed back off the wire in the order it was sent */
function sentMessages(sentPayloads: string[]): SentMessage[] {
  return sentPayloads.map((payload) => {
    const message: unknown = deserialize(payload);
    if (typeof message !== 'object' || !message) return {};
    const params: unknown = 'params' in message ? message.params : undefined;
    return {
      method: 'method' in message ? message.method : undefined,
      id: 'id' in message ? message.id : undefined,
      params: Array.isArray(params) ? params : undefined,
      result: 'result' in message ? message.result : undefined,
      // An id alone does not make a message a response: main numbers its own outgoing requests from
      // the same small integers, so a request it originates could carry the id this test waits on.
      isResponse: 'result' in message || 'error' in message,
    };
  });
}

/** Matches the notification that tells a process a network object is gone */
const isDisposalOf = (networkObjectId: string) => (message: SentMessage) =>
  message.method === DISPOSE_NETWORK_OBJECT_EVENT && message.params?.[0] === networkObjectId;

/** Matches the response to a request a client sent under `requestId` */
const isResponseTo = (requestId: number) => (message: SentMessage) =>
  message.isResponse === true && message.id === requestId;

/**
 * Lets every microtask that is already queued run — and only those. Never yields to the event loop,
 * so a timer, an I/O completion or anything else waiting on a macrotask stays unrun.
 */
async function drainMicrotasks(): Promise<void> {
  for (let hop = 0; hop < MICROTASK_HOPS_TO_DRAIN; hop++) {
    // Each hop has to resume after the previous one to advance the queue, so they cannot be started
    // together
    // eslint-disable-next-line no-await-in-loop
    await Promise.resolve();
  }
}

/**
 * Brings up main's real network stack — the network object service, the network service beneath it
 * and the websocket listener beneath that — and hands back the callback the (mocked)
 * `WebSocketServer` would run when a client connects.
 */
async function startMainNetworkStack(): Promise<(webSocket: WebSocket) => void> {
  const { WebSocketServer } = await import('ws');
  const { networkObjectService } = await import('@shared/services/network-object.service');
  await networkObjectService.initialize();

  const webSocketServer = vi.mocked(WebSocketServer).mock.results.at(-1)?.value;
  const connectClient = webSocketServer?.addListener.mock.calls.find(
    ([eventName]: [string]) => eventName === 'connection',
  )?.[1];
  if (!connectClient) throw new Error('Main never started listening for websocket connections');
  return connectClient;
}

/**
 * When a process disappears, main tells every surviving process that the network objects it hosted
 * are gone. Whoever hears that drops whatever it holds under each announced id without checking
 * whether that is still the registration the announcement was about — which is only safe while the
 * disposal cannot arrive after a re-registration of the same id, since it would then revoke the new
 * registration instead of the dead one.
 *
 * What rules that out is that the whole path from the socket's close to the outgoing send yields
 * only to the microtask queue (one already-resolved `initialize()` in the network service), while
 * the competing path — answering a registration request that arrives on a surviving socket — sits
 * several microtask hops further down. The margin is microtask depth and nothing more, so one
 * genuine yield to the event loop introduced anywhere along the announcement path closes it. These
 * tests fail when that happens; nothing else in the suite would.
 */
describe('a disconnect announcement reaches surviving sockets before anything can outrun it', () => {
  const originalProcessType = globalThis.processType;
  let connectClient: (webSocket: WebSocket) => void;
  let dyingSocket: ReturnType<typeof createFakeWebSocket>;
  let survivingSocket: ReturnType<typeof createFakeWebSocket>;

  beforeEach(async () => {
    // The services under test keep their connection in module-level state, so each test gets its own
    // copy of them rather than inheriting the previous test's network stack.
    vi.resetModules();
    vi.clearAllMocks();
    // Only the process that owns the connections announces these disposals
    globalThis.processType = ProcessType.Main;

    connectClient = await startMainNetworkStack();
    dyingSocket = createFakeWebSocket();
    survivingSocket = createFakeWebSocket();
    connectClient(dyingSocket.webSocket);
    connectClient(survivingSocket.webSocket);

    // The client about to die hosts a network object, registered the way another process's network
    // object service registers one: over the wire
    dyingSocket.receiveMessage({
      jsonrpc: '2.0',
      id: 1,
      method: REGISTER_METHOD,
      params: [`object:${DYING_OBJECT_ID}`],
    });
    await vi.waitUntil(() => dyingSocket.sentPayloads.length > 0);
  });

  afterEach(() => {
    globalThis.processType = originalProcessType;
  });

  it('is on the wire without the announcement path ever yielding to the event loop', async () => {
    let ranAfterAYieldToTheEventLoop = false;
    const macrotask = setTimeout(() => {
      ranAfterAYieldToTheEventLoop = true;
    });

    dyingSocket.close();
    await drainMicrotasks();

    // Nothing above may have turned the event loop, or the check below would prove nothing about
    // what the announcement path itself waits on
    expect(ranAfterAYieldToTheEventLoop).toBe(false);
    // ...and by then the disposal has already been sent
    expect(
      sentMessages(survivingSocket.sentPayloads).filter(isDisposalOf(DYING_OBJECT_ID)),
    ).toHaveLength(1);

    // The witness is only evidence if it was able to flip: let the event loop turn once for real and
    // require it to fire. Without this, a `drainMicrotasks` that quietly started yielding to the
    // event loop — the one edit that would make the check above vacuous — would still read green,
    // and what the test pins would decay from "before any macrotask" to "eventually".
    await new Promise((resolve) => {
      setTimeout(resolve, 0);
    });
    expect(ranAfterAYieldToTheEventLoop).toBe(true);
    clearTimeout(macrotask);
  });

  it('overtakes a registration request that a surviving client starts in the same turn', async () => {
    // The worst case the ordering has to survive, and the only interleaving in which the hazard
    // exists at all: the close has to come first, because the id stays taken until the close removes
    // the dead client's methods from the registry — a claim that arrives before that is simply
    // refused, and a refused claim is nothing for a late disposal to revoke. So the race is always
    // this one, and it is a real race, since the close only *queues* the announcement here: the
    // claim below starts before that announcement has been sent.
    dyingSocket.close();
    survivingSocket.receiveMessage({
      jsonrpc: '2.0',
      id: REGISTER_REQUEST_ID,
      method: REGISTER_METHOD,
      params: [`object:${DYING_OBJECT_ID}`],
    });

    await vi.waitUntil(() => {
      const settled = sentMessages(survivingSocket.sentPayloads);
      return (
        settled.some(isDisposalOf(DYING_OBJECT_ID)) &&
        settled.some(isResponseTo(REGISTER_REQUEST_ID))
      );
    });

    const messages = sentMessages(survivingSocket.sentPayloads);
    const disposalIndex = messages.findIndex(isDisposalOf(DYING_OBJECT_ID));
    const responseIndex = messages.findIndex(isResponseTo(REGISTER_REQUEST_ID));

    // `findIndex` answers -1 for a message that never came, and -1 sorts before everything, so the
    // ordering below only means something once both messages are known to be present
    expect(disposalIndex).toBeGreaterThanOrEqual(0);
    expect(responseIndex).toBeGreaterThanOrEqual(0);
    // And it is only the race under test while the id really was handed out again: a registration
    // that got refused would leave these two in this order for a reason that has nothing to do with
    // the timing, so a future guard against re-registering a just-departed id would quietly empty
    // this test instead of failing it.
    expect(messages[responseIndex].result).toBe(true);
    // The disposal names an id, so arriving after the response would revoke the registration that
    // response granted rather than the one that died
    expect(disposalIndex).toBeLessThan(responseIndex);
  });
});

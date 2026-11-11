import { describe, expect, it, vi } from 'vitest';
import {
  createProjectSwitchEvents,
  PROJECT_SWITCH_DID_FINISH_EVENT,
  PROJECT_SWITCH_WILL_START_EVENT,
  type ProjectSwitchEventsNetwork,
} from './project-switch-events';

/** Minimal deferred promise so a test can settle a call at a moment of its choosing */
function deferred<T>() {
  let resolveDeferred!: (value: T) => void;
  let rejectDeferred!: (reason?: unknown) => void;
  const promise = new Promise<T>((resolve, reject) => {
    resolveDeferred = resolve;
    rejectDeferred = reject;
  });
  return { promise, resolve: resolveDeferred, reject: rejectDeferred };
}

/** A fake emitter whose `dispose` the test settles itself */
function createFakeEmitter() {
  const disposal = deferred<boolean>();
  return { emit: vi.fn(), dispose: vi.fn(() => disposal.promise), disposal };
}
type FakeEmitter = ReturnType<typeof createFakeEmitter>;

/** Lets pending promise callbacks run */
async function flushPromises() {
  await new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
}

/** Builds the module over a fake network whose creations are scripted per call */
function setup(
  createEmitter: (eventName: string) => Promise<FakeEmitter> = async () => createFakeEmitter(),
) {
  const createNetworkEventEmitterAsync = vi.fn((eventName: string) => createEmitter(eventName));
  const logger = { warn: vi.fn() };
  // The fake stands in for PAPI's network service, the external boundary
  // @ts-expect-error ts(2322) - a partial fake of the network service
  const network: ProjectSwitchEventsNetwork = { createNetworkEventEmitterAsync };
  return {
    events: createProjectSwitchEvents(network, logger),
    createNetworkEventEmitterAsync,
    logger,
  };
}

const registeredEvents = (create: ReturnType<typeof setup>['createNetworkEventEmitterAsync']) =>
  create.mock.calls.map(([eventName]) => eventName).sort();

describe('createProjectSwitchEvents', () => {
  it('registers each event once when two requests overlap', async () => {
    const { events, createNetworkEventEmitterAsync } = setup();

    const [first, second] = await Promise.all([events.getEmitters(), events.getEmitters()]);

    expect(registeredEvents(createNetworkEventEmitterAsync)).toEqual(
      [PROJECT_SWITCH_DID_FINISH_EVENT, PROJECT_SWITCH_WILL_START_EVENT].sort(),
    );
    expect(second.willStart).toBe(first.willStart);
    expect(second.didFinish).toBe(first.didFinish);
    expect(events.peekDidFinish()).toBe(first.didFinish);
  });

  it('retries a rejected registration on the next request without registering the other again', async () => {
    let willStartAttempts = 0;
    const { events, createNetworkEventEmitterAsync } = setup(async (eventName) => {
      if (eventName === PROJECT_SWITCH_WILL_START_EVENT) {
        willStartAttempts += 1;
        if (willStartAttempts === 1) throw new Error('not ready');
      }
      return createFakeEmitter();
    });

    await expect(events.getEmitters()).rejects.toThrow('not ready');
    const emitters = await events.getEmitters();

    expect(emitters.willStart).toBeDefined();
    expect(willStartAttempts).toBe(2);
    expect(
      createNetworkEventEmitterAsync.mock.calls.filter(
        ([eventName]) => eventName === PROJECT_SWITCH_DID_FINISH_EVENT,
      ),
    ).toHaveLength(1);
  });

  it('does not resolve dispose until both emitters are disposed', async () => {
    const created: Record<string, FakeEmitter> = {};
    const { events } = setup(async (eventName) => {
      created[eventName] = createFakeEmitter();
      return created[eventName];
    });
    await events.getEmitters();
    const willStart = created[PROJECT_SWITCH_WILL_START_EVENT];
    const didFinish = created[PROJECT_SWITCH_DID_FINISH_EVENT];

    let disposed = false;
    const disposing = events.dispose().finally(() => {
      disposed = true;
    });
    await flushPromises();
    expect(willStart.dispose).toHaveBeenCalledTimes(1);
    expect(didFinish.dispose).toHaveBeenCalledTimes(1);
    expect(disposed).toBe(false);

    willStart.disposal.resolve(true);
    await flushPromises();
    expect(disposed).toBe(false);

    didFinish.disposal.resolve(true);
    await disposing;
    expect(disposed).toBe(true);
    expect(events.peekDidFinish()).toBeUndefined();
  });

  it('registers the events again after dispose', async () => {
    const { events, createNetworkEventEmitterAsync } = setup(async () => {
      const emitter = createFakeEmitter();
      emitter.disposal.resolve(true);
      return emitter;
    });
    const before = await events.getEmitters();
    await events.dispose();

    const after = await events.getEmitters();

    expect(createNetworkEventEmitterAsync).toHaveBeenCalledTimes(4);
    expect(after.willStart).not.toBe(before.willStart);
    expect(after.didFinish).not.toBe(before.didFinish);
  });

  it('disposes a registration that finishes after dispose and rejects the request waiting on it', async () => {
    const pending = deferred<FakeEmitter>();
    const { events } = setup((eventName) => {
      if (eventName === PROJECT_SWITCH_WILL_START_EVENT) return pending.promise;
      const emitter = createFakeEmitter();
      emitter.disposal.resolve(true);
      return Promise.resolve(emitter);
    });
    const requested = events.getEmitters();
    const outcome = requested.catch((error: unknown) => error);
    await flushPromises();
    await events.dispose();

    const late = createFakeEmitter();
    late.disposal.resolve(true);
    pending.resolve(late);
    expect(await outcome).toMatchObject({
      message: expect.stringContaining('disposed before its creation finished'),
    });

    expect(late.dispose).toHaveBeenCalledTimes(1);
  });

  it('registers again after a mid-registration dispose only once the detached one is gone', async () => {
    const firstWillStart = deferred<FakeEmitter>();
    let willStartCreations = 0;
    let detachedIsLive = false;
    let liveWhenSecondCreated: boolean | undefined;
    const { events } = setup((eventName) => {
      if (eventName === PROJECT_SWITCH_WILL_START_EVENT) {
        willStartCreations += 1;
        if (willStartCreations === 1) return firstWillStart.promise;
        liveWhenSecondCreated = detachedIsLive;
      }
      const emitter = createFakeEmitter();
      emitter.disposal.resolve(true);
      return Promise.resolve(emitter);
    });
    const first = events.getEmitters();
    const firstOutcome = first.catch((error: unknown) => error);
    await flushPromises();
    await events.dispose();
    const second = events.getEmitters();
    await flushPromises();
    expect(willStartCreations).toBe(1);

    const detached = createFakeEmitter();
    detached.dispose.mockImplementation(async () => {
      detachedIsLive = false;
      return true;
    });
    detachedIsLive = true;
    firstWillStart.resolve(detached);
    const emitters = await second;

    expect(liveWhenSecondCreated).toBe(false);
    expect(willStartCreations).toBe(2);
    expect(emitters.willStart).not.toBe(detached);
    expect(await firstOutcome).toMatchObject({
      message: expect.stringContaining('disposed before'),
    });
  });

  it('logs a failing dispose and still disposes the other emitter', async () => {
    const created: Record<string, FakeEmitter> = {};
    const { events, logger } = setup(async (eventName) => {
      created[eventName] = createFakeEmitter();
      return created[eventName];
    });
    await events.getEmitters();
    created[PROJECT_SWITCH_WILL_START_EVENT].disposal.reject(new Error('unregister failed'));
    created[PROJECT_SWITCH_DID_FINISH_EVENT].disposal.resolve(true);

    await expect(events.dispose()).resolves.toBeUndefined();

    expect(created[PROJECT_SWITCH_DID_FINISH_EVENT].dispose).toHaveBeenCalledTimes(1);
    expect(logger.warn).toHaveBeenCalledTimes(1);
    expect(logger.warn).toHaveBeenCalledWith(expect.stringContaining('unregister failed'));
  });
});

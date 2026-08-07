import { beforeEach, describe, expect, test, vi } from 'vitest';
// `vi.mock` calls are hoisted above these imports, so the service resolves against the stubs below
import { startDialogServiceRouter } from '@main/services/dialog.service-router';
import {
  withoutWindowShard,
  withWindows as withWindowsServingShards,
  type ShardAnnouncementListeners,
} from '@main/services/__tests__/service-router-test.util';
import { DIALOG_SERVICE_SHARD_OBJECT_TYPE } from '@shared/models/service-shard.model';
import type { NetworkObjectDetails } from '@shared/models/network-object.model';

const mocks = vi.hoisted(() => {
  // Where the router's shard index parks its subscriptions. Plain arrays rather than the subscribe
  // mocks' recorded calls, which `vi.clearAllMocks()` wipes between tests while the index — module
  // state that subscribes once at load — keeps listening.
  const shardAnnouncementListeners: ShardAnnouncementListeners = { create: [], dispose: [] };
  return {
    getTargetWindowId: vi.fn(),
    getReadyWindowIds: vi.fn(),
    getNotReadyWindowIds: vi.fn(),
    registerRequestHandler: vi.fn(),
    networkObjectGet: vi.fn(),
    sharedStoreSet: vi.fn(),
    sharedStoreRemove: vi.fn(),
    shardAnnouncementListeners,
    onDidCreateNetworkObject: vi.fn((listener: (details: NetworkObjectDetails) => void) => {
      shardAnnouncementListeners.create.push(listener);
      return () => {};
    }),
    onDidDisposeNetworkObject: vi.fn((listener: (networkObjectId: string) => void) => {
      shardAnnouncementListeners.dispose.push(listener);
      return () => {};
    }),
  };
});

vi.mock('@main/services/window-state.service', () => ({
  getTargetWindowId: mocks.getTargetWindowId,
  getReadyWindowIds: mocks.getReadyWindowIds,
  getNotReadyWindowIds: mocks.getNotReadyWindowIds,
}));
vi.mock('@shared/services/network.service', () => ({
  registerRequestHandler: mocks.registerRequestHandler,
  // Pulled in transitively by the network object service; unused by the service routers
  getNetworkEvent: () => vi.fn(),
  createNetworkEventEmitter: () => ({ emit: vi.fn(), dispose: vi.fn() }),
}));
vi.mock('@shared/services/network-object.service', () => ({
  networkObjectService: { get: mocks.networkObjectGet },
  // The real builder, not a stub: what these tests are checking about the timeout lift is the
  // request type it aims at, so a stubbed one would assert nothing
  getNetworkObjectMethodRequestType: (networkObjectId: string, methodName: string) =>
    `object:${networkObjectId}.${methodName}`,
  onDidCreateNetworkObject: mocks.onDidCreateNetworkObject,
  onDidDisposeNetworkObject: mocks.onDidDisposeNetworkObject,
}));
vi.mock('@shared/services/shared-store.service', () => ({
  sharedStoreService: { set: mocks.sharedStoreSet, remove: mocks.sharedStoreRemove },
}));

/** A window's dialog service shard, recording what the router asked it to do */
function dialogShard() {
  return {
    showDialog: vi.fn(async () => 'dialog-response'),
    selectProject: vi.fn(async () => 'project-1'),
    showAboutDialog: vi.fn(async () => undefined),
  };
}

/** Wire windows, each serving its own dialog service shard */
function withWindows(shardsByWindowId: Record<number, unknown>) {
  withWindowsServingShards(mocks, DIALOG_SERVICE_SHARD_OBJECT_TYPE, shardsByWindowId);
}

/** Registrations the router made, keyed by the generic request type it claimed */
function registrations() {
  return new Map<string, { handler: Function; docs: unknown; options: unknown }>(
    mocks.registerRequestHandler.mock.calls.map(([requestType, handler, docs, options]) => [
      requestType,
      { handler, docs, options },
    ]),
  );
}

describe('dialog service router', () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    mocks.getTargetWindowId.mockReturnValue(2);
    mocks.getReadyWindowIds.mockReturnValue([]);
    mocks.getNotReadyWindowIds.mockReturnValue([]);
    mocks.networkObjectGet.mockResolvedValue(undefined);
    mocks.registerRequestHandler.mockResolvedValue(vi.fn());
    mocks.sharedStoreSet.mockReturnValue(undefined);
    mocks.sharedStoreRemove.mockReturnValue(undefined);
    await startDialogServiceRouter();
  });

  test('claims exactly the dialog request names and the about command', () => {
    // The replacement for the deleted renderer-hosted registry's coverage check: nothing else
    // proves a name this router is responsible for still gets registered
    expect([...registrations().keys()].sort()).toEqual(
      [
        'command:platform.about',
        'dialog:selectProject',
        'dialog:showAboutDialog',
        'dialog:showDialog',
      ].sort(),
    );
  });

  test('shows a dialog in the window the user is working in', async () => {
    const shards = { 2: dialogShard(), 3: dialogShard() };
    withWindows(shards);

    await registrations().get('dialog:showDialog')?.handler('about-dialog', { title: 'hi' });

    expect(shards[2].showDialog).toHaveBeenCalledWith('about-dialog', { title: 'hi' });
    expect(shards[3].showDialog).not.toHaveBeenCalled();
  });

  test('follows focus, so the same call reaches a different window once focus moves', async () => {
    const shards = { 2: dialogShard(), 3: dialogShard() };
    withWindows(shards);
    const { handler } = registrations().get('dialog:selectProject') ?? {};

    await handler?.();
    mocks.getTargetWindowId.mockReturnValue(3);
    await handler?.();

    expect(shards[2].selectProject).toHaveBeenCalledTimes(1);
    expect(shards[3].selectProject).toHaveBeenCalledTimes(1);
  });

  test('returns what the window answered, so a caller still gets the user’s response', async () => {
    withWindows({ 2: dialogShard() });

    await expect(registrations().get('dialog:showDialog')?.handler('t')).resolves.toBe(
      'dialog-response',
    );
  });

  test('disables the timeout on every dialog route, since a dialog waits for the user', () => {
    const claimed = registrations();

    expect(claimed.get('dialog:showDialog')?.options).toEqual({ timeoutMilliseconds: 0 });
    expect(claimed.get('dialog:selectProject')?.options).toEqual({ timeoutMilliseconds: 0 });
    expect(claimed.get('dialog:showAboutDialog')?.options).toEqual({ timeoutMilliseconds: 0 });
  });

  test('documents the generic names, which are the ones consumers call', () => {
    const claimed = registrations();

    expect(claimed.get('dialog:showDialog')?.docs).toBeDefined();
    expect(claimed.get('command:platform.about')?.docs).toBeDefined();
  });

  test('keeps each name marked exactly as it was before this router claimed it', () => {
    // The dialog request names carried the experimental mark and `platform.about` did not. Adding
    // one is as much a change to the published surface as dropping one.
    const experimentalByName = new Map(
      [...registrations()].map(([name, { docs }]) => [
        name,
        // The docs are the OpenRPC object the router published; read the wire mark off it
        Reflect.get(Reflect.get(Object(docs), 'method') ?? {}, 'x-experimental'),
      ]),
    );

    expect(Object.fromEntries(experimentalByName)).toEqual({
      'dialog:showDialog': true,
      'dialog:selectProject': true,
      'dialog:showAboutDialog': true,
      'command:platform.about': undefined,
    });
  });

  test('platform.about shows the about dialog in the focused window', async () => {
    // Two names, one implementation: `platform.about` and `dialog:showAboutDialog` must not drift
    // into separate behavior
    const shards = { 2: dialogShard(), 3: dialogShard() };
    withWindows(shards);

    await registrations().get('command:platform.about')?.handler();

    expect(shards[2].showAboutDialog).toHaveBeenCalled();
    expect(shards[3].showAboutDialog).not.toHaveBeenCalled();
  });

  test('platform.about does not wait for the user to close the dialog', async () => {
    // The shard's showAboutDialog resolves as soon as the dialog is on screen rather than when the
    // user closes it. A router that awaited the dialog itself would hang this call for as long as
    // the dialog stayed open, and callers — including a smoke test — await this command.
    const shard = dialogShard();
    shard.showAboutDialog.mockImplementation(async () => {
      // Fire-and-forget over a dialog that stays open, exactly as the renderer's shard does
      new Promise<undefined>(() => {}).catch(() => {});
    });
    withWindows({ 2: shard });

    await expect(registrations().get('command:platform.about')?.handler()).resolves.toBeUndefined();
  });

  test.each([
    'dialog:showDialog',
    'dialog:selectProject',
    'dialog:showAboutDialog',
    'command:platform.about',
  ])('%s refuses to route rather than guessing when no window is available', async (name) => {
    mocks.getTargetWindowId.mockReturnValue(undefined);

    await expect(registrations().get(name)?.handler('t')).rejects.toThrow('No windows available');
  });

  test('lets a window’s dialog outlive the default request timeout', async () => {
    // The router disabling its own inbound timeout is only half the path: the call it then makes to
    // the window's shard is a request of its own, and on the default timeout it gives up ~30s in
    // while the dialog is still on screen. Every method that waits for the user needs the timeout
    // lifted on the shard's request type too.
    withWindows({ 2: dialogShard() });

    const disabledRequestTypes = mocks.sharedStoreSet.mock.calls
      .filter(([, value]) => value === 0)
      .map(([key]) => key);

    expect(disabledRequestTypes).toEqual(
      expect.arrayContaining([
        'platform.customNetworkTimeoutMs.object:shard-of-window-2.showDialog',
        'platform.customNetworkTimeoutMs.object:shard-of-window-2.selectProject',
        'platform.customNetworkTimeoutMs.object:shard-of-window-2.showAboutDialog',
      ]),
    );
  });

  test('lifts the timeout on the name the shard announced, not a rebuilt one', async () => {
    // The window-scoped name is an internal detail of the registration. A lift aimed at a rebuilt
    // spelling of it writes a key nobody reads, and dialogs go back to timing out at ~30s with
    // nothing anywhere reporting that they will.
    withWindows({ 2: dialogShard() });

    const keys = mocks.sharedStoreSet.mock.calls.map(([key]) => key);

    expect(keys).not.toContain('platform.customNetworkTimeoutMs.object:DialogService-2.showDialog');
  });

  test('lifts the timeout for every window that registers a dialog shard', async () => {
    withWindows({ 2: dialogShard(), 3: dialogShard() });

    const keys = mocks.sharedStoreSet.mock.calls.map(([key]) => key);

    expect(keys).toContain('platform.customNetworkTimeoutMs.object:shard-of-window-3.showDialog');
  });

  test('removes the timeouts it set once a window’s dialog shard is gone', async () => {
    // Main owns these entries — the shared store refuses a removal from any other process, so the
    // departing renderer cannot clear them and nothing else would. Left behind, they accumulate one
    // set per window the session has ever had.
    withWindows({ 2: dialogShard() });
    // Wiring the windows for this test retires the ones the previous test left behind, whose own
    // removals are not what is being asserted here
    mocks.sharedStoreRemove.mockClear();

    withoutWindowShard(mocks, 2);

    expect(mocks.sharedStoreRemove.mock.calls.map(([key]) => key)).toEqual([
      'platform.customNetworkTimeoutMs.object:shard-of-window-2.showDialog',
      'platform.customNetworkTimeoutMs.object:shard-of-window-2.selectProject',
      'platform.customNetworkTimeoutMs.object:shard-of-window-2.showAboutDialog',
    ]);
  });
});

import { beforeEach, describe, expect, test, vi } from 'vitest';
// `vi.mock` calls are hoisted above these imports, so the service resolves against the stubs below
import {
  findWebViewIdCommandNames,
  startCommandServiceRouter,
} from '@main/services/command.service-router';
import {
  withWindows as withWindowsServingShards,
  type ShardAnnouncementListeners,
} from '@main/services/__tests__/service-router-test.util';
import type { NetworkObjectDetails } from '@shared/models/network-object.model';
import type { SingleMethodDocumentation } from '@shared/models/openrpc.model';
import { WEB_VIEW_SERVICE_SHARD_OBJECT_TYPE } from '@shared/models/service-shard.model';

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
    request: vi.fn(),
    networkObjectGet: vi.fn(),
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

/** Wire windows whose WebView service shards are the given objects */
function withWindows(
  shardsByWindowId: Record<number, unknown>,
  options?: { unreadyWindowIds?: number[] },
) {
  withWindowsServingShards(mocks, WEB_VIEW_SERVICE_SHARD_OBJECT_TYPE, shardsByWindowId, options);
}

vi.mock('@main/services/window-state.service', () => ({
  getTargetWindowId: mocks.getTargetWindowId,
  getReadyWindowIds: mocks.getReadyWindowIds,
  getNotReadyWindowIds: mocks.getNotReadyWindowIds,
}));
vi.mock('@shared/services/network.service', () => ({
  registerRequestHandler: mocks.registerRequestHandler,
  request: mocks.request,
  // Pulled in transitively by the network object service; unused by the service routers
  getNetworkEvent: () => vi.fn(),
  createNetworkEventEmitter: () => ({ emit: vi.fn(), dispose: vi.fn() }),
}));
vi.mock('@shared/services/network-object.service', () => ({
  networkObjectService: { get: mocks.networkObjectGet },
  onDidCreateNetworkObject: mocks.onDidCreateNetworkObject,
  onDidDisposeNetworkObject: mocks.onDidDisposeNetworkObject,
}));

/** A scoped per-window WebViewService whose web views are the given ids */
function windowShard(openWebViewIds: string[]) {
  return {
    getOpenWebViewDefinition: vi.fn(async (webViewId: string) =>
      openWebViewIds.includes(webViewId) ? { id: webViewId } : undefined,
    ),
  };
}

/**
 * Wire windows whose scoped WebViewServices own the given web view ids, so a command carrying a web
 * view id can be routed by ownership. Windows named in `unreadyWindowIds` are tracked but have not
 * registered their services yet.
 */
function withWindowsOwning(
  webViewIdsByWindowId: Record<number, string[]>,
  options?: { unreadyWindowIds?: number[] },
) {
  const servicesByWindowId = Object.fromEntries(
    Object.entries(webViewIdsByWindowId).map(([windowId, ownedIds]) => [
      windowId,
      windowShard(ownedIds),
    ]),
  );
  withWindows(servicesByWindowId, options);
  return servicesByWindowId;
}

/** Registrations the service made, keyed by the generic request type it claimed */
function registrations() {
  return new Map<string, { handler: Function; docs: unknown; options: unknown }>(
    mocks.registerRequestHandler.mock.calls.map(([requestType, handler, docs, options]) => [
      requestType,
      { handler, docs, options },
    ]),
  );
}

describe('renderer-hosted request service routers', () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    mocks.getTargetWindowId.mockReturnValue(2);
    mocks.getReadyWindowIds.mockReturnValue([]);
    mocks.getNotReadyWindowIds.mockReturnValue([]);
    mocks.networkObjectGet.mockResolvedValue(undefined);
    mocks.registerRequestHandler.mockResolvedValue(vi.fn());
    mocks.request.mockResolvedValue('result');
    await startCommandServiceRouter();
  });

  test('claims the generic command names so callers never address a window directly', () => {
    expect(registrations().has('command:platform.openSettings')).toBe(true);
  });

  test('forwards a command to the focused window’s scoped handler', async () => {
    await registrations().get('command:platform.openSettings')?.handler('arg');

    expect(mocks.request).toHaveBeenCalledWith('command:platform.openSettings-2', 'arg');
  });

  test('follows focus, so the same call reaches a different window once focus moves', async () => {
    const { handler } = registrations().get('command:platform.openSettings') ?? {};
    await handler?.();
    mocks.getTargetWindowId.mockReturnValue(3);
    await handler?.();

    expect(mocks.request).toHaveBeenLastCalledWith('command:platform.openSettings-3');
  });

  test('refuses to route rather than guessing when no window is available', async () => {
    mocks.getTargetWindowId.mockReturnValue(undefined);

    await expect(registrations().get('command:platform.openSettings')?.handler()).rejects.toThrow(
      'No windows available',
    );
  });

  test('documents the generic name, which is the one consumers call', () => {
    // The scoped names renderers register under are an implementation detail and stay undocumented
    expect(
      registrations().get('command:platform.navigateLeftInReferenceHistory')?.docs,
    ).toBeDefined();
  });

  test('routes the scripture navigation commands, so two windows cannot fight over them', () => {
    const claimed = registrations();
    expect(claimed.has('command:platform.goToNextChapter')).toBe(true);
    expect(claimed.has('command:platform.openBookChapterControl')).toBe(true);
  });

  test('sends a command carrying a web view id to the window that owns that web view', async () => {
    // Focus is on window 2, but window 3 is the one showing this web view — its settings must open
    // there, where the web view (and so its project) actually is
    withWindowsOwning({ 2: [], 3: ['owned-view'] });

    await registrations().get('command:platform.openSettings')?.handler('owned-view');

    expect(mocks.request).toHaveBeenCalledWith('command:platform.openSettings-3', 'owned-view');
  });

  test('routes the deprecated openProjectSettings by ownership too', async () => {
    withWindowsOwning({ 2: [], 3: ['owned-view'] });

    await registrations().get('command:platform.openProjectSettings')?.handler('owned-view');

    expect(mocks.request).toHaveBeenCalledWith(
      'command:platform.openProjectSettings-3',
      'owned-view',
    );
  });

  test('follows focus for a command that declares no web view id, even sharing a handler with one that does', async () => {
    // `platform.openUserSettings` opens the same tab as `platform.openSettings` but is declared to
    // take no arguments, so it has no owner to route by and belongs to the window the user is in
    withWindowsOwning({ 2: [], 3: ['owned-view'] });

    await registrations().get('command:platform.openUserSettings')?.handler();

    expect(mocks.networkObjectGet).not.toHaveBeenCalled();
    expect(mocks.request).toHaveBeenCalledWith('command:platform.openUserSettings-2');
  });

  test('falls back to the focused window when no window owns the web view', async () => {
    withWindowsOwning({ 2: [], 3: [] });

    await registrations().get('command:platform.openSettings')?.handler('gone-view');

    expect(mocks.request).toHaveBeenCalledWith('command:platform.openSettings-2', 'gone-view');
  });

  test('uses the focused window when the command carries no web view id', async () => {
    withWindowsOwning({ 2: [], 3: ['owned-view'] });

    await registrations().get('command:platform.openSettings')?.handler();

    expect(mocks.request).toHaveBeenCalledWith('command:platform.openSettings-2');
  });

  test('does not look for an owner for commands that act on the window itself', async () => {
    // Only the commands that take a web view id pay the ownership fan-out; the rest follow focus
    withWindowsOwning({ 2: [], 3: ['owned-view'] });

    await registrations().get('command:platform.goToNextChapter')?.handler('owned-view');

    expect(mocks.networkObjectGet).not.toHaveBeenCalled();
    expect(mocks.request).toHaveBeenCalledWith('command:platform.goToNextChapter-2', 'owned-view');
  });

  test('does not ask a window that has not registered its services yet, and will not fall back to focus', async () => {
    // A window is tracked from the moment it is shown, and asking one that cannot answer costs the
    // network service's whole registration retry — seconds of stall on a user's click — to learn
    // nothing. Not asking it does not make it a window that answered: the web view named here is
    // the one sitting in it, and falling back to focus would open the settings against whatever
    // project the focused window happens to be showing.
    const services = withWindowsOwning({ 2: [], 3: ['owned-view'] }, { unreadyWindowIds: [3] });

    await expect(
      registrations().get('command:platform.openSettings')?.handler('owned-view'),
    ).rejects.toThrow('unreachable');
    expect(services[3].getOpenWebViewDefinition).not.toHaveBeenCalled();
    expect(mocks.request).not.toHaveBeenCalled();
  });

  test('fails the call rather than running it in the wrong window when a window cannot be asked', async () => {
    // Falling back to focus here opens the settings for a web view in a window that does not have
    // it, against whichever project that window happens to be showing
    const services = withWindowsOwning({ 2: [], 3: ['owned-view'] });
    services[3].getOpenWebViewDefinition.mockRejectedValue(new Error('window is busy'));

    await expect(
      registrations().get('command:platform.openSettings')?.handler('owned-view'),
    ).rejects.toThrow('unreachable');
    expect(mocks.request).not.toHaveBeenCalled();
  });

  test('still routes by ownership when the owner answered and another window did not', async () => {
    const services = withWindowsOwning({ 2: [], 3: ['owned-view'] });
    services[2].getOpenWebViewDefinition.mockRejectedValue(new Error('window is busy'));

    await registrations().get('command:platform.openSettings')?.handler('owned-view');

    expect(mocks.request).toHaveBeenCalledWith('command:platform.openSettings-3', 'owned-view');
  });

  test('fails the call when a ready window’s WebView service has not registered yet', async () => {
    // Readiness is keyed on the window service, and a renderer registers its several services
    // moments apart, so a ready window can still be missing the one this asks. That window could
    // not be asked, which is not the same as it answering that it does not own the web view —
    // falling back to focus would run the call against whatever the focused window is showing.
    withWindows({ 2: windowShard([]), 3: undefined });

    await expect(
      registrations().get('command:platform.openSettings')?.handler('owned-view'),
    ).rejects.toThrow('unreachable');
    expect(mocks.request).not.toHaveBeenCalled();
  });
});

/** Documentation for a command taking the given parameter names, in order */
function docsTakingParams(...paramNames: string[]): SingleMethodDocumentation {
  return {
    method: {
      summary: 'A renderer-hosted command',
      params: paramNames.map((name) => ({ name, schema: { type: 'string' } })),
      result: { name: 'return value', schema: { type: 'null' } },
    },
  };
}

describe('which renderer-hosted commands route by web view ownership', () => {
  test('selects the commands whose first documented parameter is a web view id', () => {
    const { routableByOwner } = findWebViewIdCommandNames({
      'platform.openSettings': docsTakingParams('webViewId'),
      'platform.goToNextChapter': docsTakingParams(),
      'platform.openUserSettings': docsTakingParams(),
    });

    expect(routableByOwner).toEqual(['platform.openSettings']);
  });

  test('reports a command that documents a web view id anywhere but first', () => {
    // Routing reads the first argument only. A web view id further along is a command that looks
    // routable by ownership and is not, which is the silent wrong-window bug this list exists to
    // prevent, returned inside a mechanism that looks like it handles it.
    const { routableByOwner, misdeclared } = findWebViewIdCommandNames({
      'platform.openSettings': docsTakingParams('options', 'webViewId'),
    });

    expect(routableByOwner).toEqual([]);
    expect(misdeclared).toEqual(['platform.openSettings']);
  });

  test('selects nothing from commands that take no parameters', () => {
    const { routableByOwner, misdeclared } = findWebViewIdCommandNames({
      'platform.about': docsTakingParams(),
    });

    expect(routableByOwner).toEqual([]);
    expect(misdeclared).toEqual([]);
  });
});

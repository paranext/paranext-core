// CAP-017 (keyboard-switching) RED-phase tests — AppFocus behavior on the renderer window
// data-provider engine (cross-cutting platform addition (b)).
//
// Traceability: strategic-plan-backend.md ### CAP-017; backend-alignment.md §"AppFocus
// Extension"; feedback/phase-3-planning-review-log.md RM-020 — the `AppFocus` data-provider
// host stays co-located with `Focus` in this renderer engine; the `src/main/main.ts` L422-448
// `mainWindow.on('focus' | 'blur')` emitter (implementer scope, NOT tested here) mutates it via
// the `setAppFocus(true | false)` proxy. Edge case (CAP-017): the engine must not spam
// `AppFocus` updates for unchanged values so CAP-011 CrossAppFocusDebounce only observes real
// `false → true` transitions.
//
// Subscribe-then-emit contract at unit level: the data-provider framework layers every
// `set<DataType>` engine method to emit `onDidUpdate` from its returned
// DataProviderUpdateInstructions (data-provider.service.ts), so "subscribers are notified"
// reduces to "setAppFocus returns truthy instructions exactly when the value changed".
// Wire-level subscribe is BE-3 Pass-2 integration scope.

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ProcessType } from '@shared/global-this.model';
// vi.mock factories below are hoisted above this import, so the mock applies to its import graph
import { testingWindowService } from '@renderer/services/window.service-host';

// Runs before the static imports execute: the web-view.service-host import graph pulls in
// theme.service-host, which calls `window.matchMedia` at module scope, and jsdom does not
// implement matchMedia
vi.hoisted(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: undefined,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });
});

globalThis.processType = ProcessType.Renderer;
globalThis.isPackaged = false;
globalThis.resourcesPath = 'resources://';

// window.service-host imports web-view.service-host (getDockLayout), which creates network
// event emitters at module scope. Mock the network layer locally, per the established
// app.component.test.tsx precedent. vi.mock factories are hoisted, so use dynamic import.
vi.mock('@shared/services/network.service', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@shared/services/network.service')>();
  const { PlatformEventEmitter } = await import('platform-bible-utils');
  return {
    ...actual,
    createRequestFunction:
      (requestType: string) =>
      async (...args: unknown[]) =>
        `Mocked ${requestType} request with args ${args.join(', ')}`,
    createNetworkEventEmitter: () => new PlatformEventEmitter(),
    getNetworkEvent: () => new PlatformEventEmitter().event,
    papiNetworkService: {
      createNetworkEventEmitter: () => new PlatformEventEmitter(),
      onDidClientConnect: new PlatformEventEmitter().event,
    },
  };
});

type WindowEngine = ReturnType<typeof testingWindowService.implementWindowDataProviderEngine>;

describe('window.service-host AppFocus engine behavior (CAP-017b)', () => {
  let engine: WindowEngine;

  beforeEach(() => {
    engine = testingWindowService.implementWindowDataProviderEngine();
  });

  afterEach(async () => {
    await engine.dispose();
  });

  it('getAppFocus defaults to { isAppFocused: true } before any setAppFocus (app window is focused at launch; the main-process emitter corrects on first blur)', async () => {
    await expect(engine.getAppFocus()).resolves.toEqual({ isAppFocused: true });
  });

  it('setAppFocus(false) returns truthy update instructions so the layered provider emits AppFocus to subscribers', async () => {
    const updateInstructions = await engine.setAppFocus(false);

    expect(updateInstructions).not.toBe(false);
  });

  it('setAppFocus(false) then getAppFocus reflects the blurred state (RM-020 proxy write path)', async () => {
    await engine.setAppFocus(false);

    await expect(engine.getAppFocus()).resolves.toEqual({ isAppFocused: false });
  });

  it('setAppFocus with an unchanged value returns false — no spurious AppFocus emission for renderer-side flicker (CAP-017 edge case)', async () => {
    await engine.setAppFocus(false);

    const repeatUpdateInstructions = await engine.setAppFocus(false);

    expect(repeatUpdateInstructions).toBe(false);
    await expect(engine.getAppFocus()).resolves.toEqual({ isAppFocused: false });
  });

  it('setAppFocus(true) when already focused (initial state) returns false — no false → true spam on startup', async () => {
    const updateInstructions = await engine.setAppFocus(true);

    expect(updateInstructions).toBe(false);
  });

  it('full blur → focus round-trip emits exactly one update per real transition (FN-015/FN-016 source contract for CAP-011)', async () => {
    const blurInstructions = await engine.setAppFocus(false);
    const refocusInstructions = await engine.setAppFocus(true);

    expect(blurInstructions).not.toBe(false);
    expect(refocusInstructions).not.toBe(false);
    await expect(engine.getAppFocus()).resolves.toEqual({ isAppFocused: true });
  });

  it('setAppFocus supports the selector-first data-provider call shape (selector undefined, isAppFocused) mirroring setFocus', async () => {
    const updateInstructions = await engine.setAppFocus(undefined, false);

    expect(updateInstructions).not.toBe(false);
    await expect(engine.getAppFocus()).resolves.toEqual({ isAppFocused: false });
  });
});

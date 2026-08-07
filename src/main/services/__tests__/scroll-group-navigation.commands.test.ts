import { beforeEach, describe, expect, test, vi } from 'vitest';
import { SerializedVerseRef } from '@sillsdev/scripture';
// `vi.mock` calls are hoisted above these imports, so the service resolves against the stubs below
import { startScrollGroupNavigationCommands } from '@main/services/scroll-group-navigation.commands';

const mocks = vi.hoisted(() => ({
  registerRequestHandler: vi.fn(),
  getTargetWindowId: vi.fn(),
  getTargetWindowServiceShard: vi.fn(),
  getWebViewShard: vi.fn(),
  setScrRef: vi.fn<(...args: unknown[]) => Promise<boolean>>(async () => true),
  getScrRef: vi.fn(),
  getScrRefForProject: vi.fn(),
  navigateReferenceHistory: vi.fn<(...args: unknown[]) => Promise<boolean>>(async () => false),
  pdpGet: vi.fn(),
}));

vi.mock('@shared/services/network.service', () => ({
  registerRequestHandler: mocks.registerRequestHandler,
  getNetworkEvent: () => vi.fn(),
}));
vi.mock('@main/services/window-state.service', () => ({
  getTargetWindowId: mocks.getTargetWindowId,
}));
vi.mock('@main/services/window.service-router', () => ({
  getTargetWindowServiceShard: mocks.getTargetWindowServiceShard,
}));
vi.mock('@main/services/web-view.service-router', () => ({
  getWebViewShard: mocks.getWebViewShard,
}));
vi.mock('@main/services/scroll-group.service-host', () => ({
  setScrRef: mocks.setScrRef,
  getScrRef: mocks.getScrRef,
  getScrRefForProject: mocks.getScrRefForProject,
  navigateReferenceHistory: mocks.navigateReferenceHistory,
}));
vi.mock('@shared/services/project-data-provider.service', () => ({
  get: mocks.pdpGet,
}));

const GEN_5_3: SerializedVerseRef = { book: 'GEN', chapterNum: 5, verseNum: 3 };

/** Registrations the module made, keyed by the generic request type it claimed */
function registrations() {
  return new Map<string, { handler: Function; docs: unknown }>(
    mocks.registerRequestHandler.mock.calls.map(([requestType, handler, docs]) => [
      requestType,
      { handler, docs },
    ]),
  );
}

/** Start the commands and hand back the handler for one of them */
async function getHandler(commandName: string) {
  await startScrollGroupNavigationCommands();
  const registration = registrations().get(`command:${commandName}`);
  if (!registration) throw new Error(`${commandName} was not registered`);
  return registration.handler;
}

/** Every command name this module claims, for the checks that must hold across all of them */
const NAVIGATION_COMMAND_NAMES = [
  'platform.goToNextChapter',
  'platform.goToPreviousChapter',
  'platform.goToNextBook',
  'platform.goToPreviousBook',
  'platform.goToNextVerse',
  'platform.goToPreviousVerse',
  'platform.navigateLeftInReferenceHistory',
  'platform.navigateRightInReferenceHistory',
];

/**
 * Wire the target window to answer with the given navigation context, and hand back the window's
 * WebView shard so tests can see what was written to it.
 */
function withNavigationContext(context: unknown, windowId = 2) {
  const webViewShard = { setDetachedScrRef: vi.fn(async () => true) };
  mocks.getTargetWindowId.mockReturnValue(windowId);
  mocks.getTargetWindowServiceShard.mockImplementation(async () => ({
    windowId: mocks.getTargetWindowId(),
    shard: { getNavigationContext: vi.fn(async () => context) },
  }));
  mocks.getWebViewShard.mockImplementation(async (id: number) =>
    id === windowId ? webViewShard : undefined,
  );
  return webViewShard;
}

beforeEach(() => {
  vi.clearAllMocks();
  mocks.registerRequestHandler.mockResolvedValue(vi.fn());
  mocks.setScrRef.mockResolvedValue(true);
  mocks.navigateReferenceHistory.mockResolvedValue(false);
  mocks.getScrRef.mockResolvedValue(GEN_5_3);
  mocks.getScrRefForProject.mockResolvedValue(GEN_5_3);
  // No project data provider → book list falls back to ALL_BOOK_IDS
  mocks.pdpGet.mockRejectedValue(new Error('no project'));
  withNavigationContext({ readDirection: 'ltr', target: undefined });
});

describe('which commands the navigation module claims', () => {
  test('claims exactly the eight navigation commands', async () => {
    // The replacement for the deleted renderer-hosted registry's coverage check: nothing else
    // proves a name this module is responsible for still gets registered
    await startScrollGroupNavigationCommands();

    expect([...registrations().keys()].sort()).toEqual(
      [
        'command:platform.goToNextChapter',
        'command:platform.goToPreviousChapter',
        'command:platform.goToNextBook',
        'command:platform.goToPreviousBook',
        'command:platform.goToNextVerse',
        'command:platform.goToPreviousVerse',
        'command:platform.navigateLeftInReferenceHistory',
        'command:platform.navigateRightInReferenceHistory',
      ].sort(),
    );
  });

  test('documents every command it claims', async () => {
    await startScrollGroupNavigationCommands();

    registrations().forEach(({ docs }) => expect(docs).toBeDefined());
  });

  test('keeps every command marked experimental on the wire', async () => {
    // All eight carried the mark before they were registered here, and dropping one silently
    // promotes an unsettled command to something an extension may rely on
    await startScrollGroupNavigationCommands();

    registrations().forEach(({ docs }) =>
      expect(docs).toEqual(
        expect.objectContaining({
          method: expect.objectContaining({ 'x-experimental': true }),
        }),
      ),
    );
  });
});

describe('when there is no window to navigate in', () => {
  // Every routed name in main reports an unreachable window by throwing. These eight resolve a
  // value — `undefined` from a go-to, `false` from a history command — so answering quietly here
  // would be indistinguishable, to the caller, from a navigation that happened. `false` has to keep
  // meaning "there was nowhere to move to", which is the answer the keyboard handler acts on.
  test.each(NAVIGATION_COMMAND_NAMES)('%s reports that no window could be asked', async (name) => {
    mocks.getTargetWindowServiceShard.mockRejectedValue(
      new Error('No windows available to route platform.windowServiceDataProvider call'),
    );
    const handler = await getHandler(name);

    await expect(handler()).rejects.toThrow('No windows available');
  });

  test.each(NAVIGATION_COMMAND_NAMES)(
    '%s reports a window that has not registered its window service',
    async (name) => {
      mocks.getTargetWindowServiceShard.mockRejectedValue(
        new Error(
          'platform.windowServiceDataProvider for window 2 is not available. The renderer may not have started yet.',
        ),
      );
      const handler = await getHandler(name);

      await expect(handler()).rejects.toThrow('is not available');
    },
  );

  test.each(NAVIGATION_COMMAND_NAMES)(
    '%s reports a window that failed to answer what to navigate',
    async (name) => {
      mocks.getTargetWindowServiceShard.mockResolvedValue({
        windowId: 2,
        shard: {
          getNavigationContext: vi.fn(async () => {
            throw new Error('the websocket went away mid-call');
          }),
        },
      });
      const handler = await getHandler(name);

      await expect(handler()).rejects.toThrow('the websocket went away mid-call');
    },
  );
});

describe('go-to commands', () => {
  test('no-ops when the window has no navigation target', async () => {
    withNavigationContext({ readDirection: 'ltr', target: undefined });
    const goToNextVerse = await getHandler('platform.goToNextVerse');

    await goToNextVerse();

    expect(mocks.setScrRef).not.toHaveBeenCalled();
  });

  test("writes to the target's scroll group with its project as source", async () => {
    withNavigationContext({
      readDirection: 'ltr',
      target: { webViewId: 'web-view-1', scrollGroupScrRef: 2, projectId: 'project-1' },
    });
    const goToNextVerse = await getHandler('platform.goToNextVerse');

    await goToNextVerse();

    expect(mocks.getScrRefForProject).toHaveBeenCalledWith(2, 'project-1');
    expect(mocks.setScrRef).toHaveBeenCalledWith(
      2,
      { book: 'GEN', chapterNum: 5, verseNum: 4 },
      'project-1',
    );
  });

  test('reads the scroll group without a project frame when the target has no project', async () => {
    withNavigationContext({
      readDirection: 'ltr',
      target: { webViewId: 'web-view-1', scrollGroupScrRef: 0 },
    });
    const goToNextVerse = await getHandler('platform.goToNextVerse');

    await goToNextVerse();

    expect(mocks.getScrRef).toHaveBeenCalledWith(0);
    expect(mocks.getScrRefForProject).not.toHaveBeenCalled();
  });

  test('book navigation skips the versification prefetch it never uses', async () => {
    // getNextBookRef only ever lands on chapter 1 verse 1, so the per-chapter verse counts are
    // round trips with nothing to spend them on
    withNavigationContext({
      readDirection: 'ltr',
      target: { webViewId: 'web-view-1', scrollGroupScrRef: 0, projectId: 'project-1' },
    });
    mocks.getScrRefForProject.mockResolvedValue({ book: 'GEN', chapterNum: 1, verseNum: 1 });
    mocks.pdpGet.mockImplementation(async () => ({ getSetting: vi.fn(async () => '11') }));
    const goToNextBook = await getHandler('platform.goToNextBook');

    await goToNextBook();

    expect(mocks.pdpGet).not.toHaveBeenCalledWith('platformScripture.Versification', 'project-1');
    expect(mocks.setScrRef).toHaveBeenCalledWith(
      0,
      { book: 'EXO', chapterNum: 1, verseNum: 1 },
      'project-1',
    );
  });

  test('backward verse navigation prefetches the previous book it can roll into', async () => {
    // Only the backward commands can land in the previous book, so only they pay for its bounds
    withNavigationContext({
      readDirection: 'ltr',
      target: { webViewId: 'web-view-1', scrollGroupScrRef: 0, projectId: 'project-1' },
    });
    mocks.getScrRefForProject.mockResolvedValue({ book: 'EXO', chapterNum: 1, verseNum: 0 });
    const getFinalVerseNumbersInBook = vi.fn(async (bookNum: number) =>
      bookNum === 1 ? [0, 8, 25, 24] : [0, 10],
    );
    mocks.pdpGet.mockImplementation(async (projectInterface: string) =>
      projectInterface === 'platformScripture.Versification'
        ? { getFinalVerseNumbersInBook }
        : { getSetting: vi.fn(async () => '11') },
    );
    const goToPreviousVerse = await getHandler('platform.goToPreviousVerse');

    await goToPreviousVerse();

    expect(getFinalVerseNumbersInBook).toHaveBeenCalledWith(1);
    expect(mocks.setScrRef).toHaveBeenCalledWith(
      0,
      { book: 'GEN', chapterNum: 3, verseNum: 24 },
      'project-1',
    );
  });

  test('uses the project books-present list rather than the full canon', async () => {
    withNavigationContext({
      readDirection: 'ltr',
      target: { webViewId: 'web-view-1', scrollGroupScrRef: 0, projectId: 'project-1' },
    });
    mocks.getScrRefForProject.mockResolvedValue({ book: 'GEN', chapterNum: 1, verseNum: 1 });
    // Books present = GEN and LEV (positions 1 and 3); EXO is absent
    mocks.pdpGet.mockImplementation(async () => ({ getSetting: vi.fn(async () => '101') }));
    const goToNextBook = await getHandler('platform.goToNextBook');

    await goToNextBook();

    expect(mocks.setScrRef).toHaveBeenCalledWith(
      0,
      { book: 'LEV', chapterNum: 1, verseNum: 1 },
      'project-1',
    );
  });
});

describe('a detached target', () => {
  test('writes the new reference back to the web view, not to a scroll group', async () => {
    const webViewShard = withNavigationContext({
      readDirection: 'ltr',
      target: { webViewId: 'web-view-1', scrollGroupScrRef: GEN_5_3 },
    });
    const goToNextVerse = await getHandler('platform.goToNextVerse');

    await goToNextVerse();

    expect(mocks.setScrRef).not.toHaveBeenCalled();
    expect(webViewShard.setDetachedScrRef).toHaveBeenCalledWith('web-view-1', {
      book: 'GEN',
      chapterNum: 5,
      verseNum: 4,
    });
  });

  test('writes to the window that answered the context, even once focus has moved', async () => {
    // Re-deriving which window owns the web view could land somewhere else if focus moved between
    // reading the context and writing the result — the two must target the same window
    const answeringWindowShard = { setDetachedScrRef: vi.fn(async () => true) };
    const otherWindowShard = { setDetachedScrRef: vi.fn(async () => true) };
    mocks.getTargetWindowId.mockReturnValue(2);
    mocks.getTargetWindowServiceShard.mockResolvedValue({
      windowId: 2,
      shard: {
        getNavigationContext: vi.fn(async () => {
          // Focus moves to window 3 while this window is answering
          mocks.getTargetWindowId.mockReturnValue(3);
          return {
            readDirection: 'ltr',
            target: { webViewId: 'web-view-1', scrollGroupScrRef: GEN_5_3 },
          };
        }),
      },
    });
    mocks.getWebViewShard.mockImplementation(async (id: number) =>
      id === 2 ? answeringWindowShard : otherWindowShard,
    );
    const goToNextVerse = await getHandler('platform.goToNextVerse');

    await goToNextVerse();

    expect(answeringWindowShard.setDetachedScrRef).toHaveBeenCalled();
    expect(otherWindowShard.setDetachedScrRef).not.toHaveBeenCalled();
  });
});

describe('reference-history commands', () => {
  test('maps physical left to logical back in an LTR window', async () => {
    withNavigationContext({
      readDirection: 'ltr',
      target: { webViewId: 'web-view-1', scrollGroupScrRef: 2 },
    });
    mocks.navigateReferenceHistory.mockResolvedValue(true);
    const navigateLeft = await getHandler('platform.navigateLeftInReferenceHistory');

    const didNavigate = await navigateLeft();

    expect(mocks.navigateReferenceHistory).toHaveBeenCalledWith(2, -1);
    expect(didNavigate).toBe(true);
  });

  test('maps physical left to logical forward in an RTL window', async () => {
    // The direction comes from the window; the mapping is applied here. A silent inversion here is
    // the failure this asserts against by checking the offset, not just the returned boolean.
    withNavigationContext({
      readDirection: 'rtl',
      target: { webViewId: 'web-view-1', scrollGroupScrRef: 2 },
    });
    const navigateLeft = await getHandler('platform.navigateLeftInReferenceHistory');

    await navigateLeft();

    expect(mocks.navigateReferenceHistory).toHaveBeenCalledWith(2, 1);
  });

  test('maps physical right to logical forward in an LTR window', async () => {
    withNavigationContext({
      readDirection: 'ltr',
      target: { webViewId: 'web-view-1', scrollGroupScrRef: 2 },
    });
    const navigateRight = await getHandler('platform.navigateRightInReferenceHistory');

    await navigateRight();

    expect(mocks.navigateReferenceHistory).toHaveBeenCalledWith(2, 1);
  });

  test('maps physical right to logical back in an RTL window', async () => {
    withNavigationContext({
      readDirection: 'rtl',
      target: { webViewId: 'web-view-1', scrollGroupScrRef: 2 },
    });
    const navigateRight = await getHandler('platform.navigateRightInReferenceHistory');

    await navigateRight();

    expect(mocks.navigateReferenceHistory).toHaveBeenCalledWith(2, -1);
  });

  test('navigates scroll group 0 when the window has no target, matching the toolbar', async () => {
    withNavigationContext({ readDirection: 'ltr', target: undefined });
    const navigateLeft = await getHandler('platform.navigateLeftInReferenceHistory');

    await navigateLeft();

    expect(mocks.navigateReferenceHistory).toHaveBeenCalledWith(0, -1);
  });

  test('no-ops on a detached target, whose history buttons the toolbar hides', async () => {
    withNavigationContext({
      readDirection: 'ltr',
      target: { webViewId: 'web-view-1', scrollGroupScrRef: GEN_5_3 },
    });
    const navigateLeft = await getHandler('platform.navigateLeftInReferenceHistory');

    const didNavigate = await navigateLeft();

    expect(didNavigate).toBe(false);
    expect(mocks.navigateReferenceHistory).not.toHaveBeenCalled();
  });

  test('reports whether it navigated, which the keyboard handler depends on', async () => {
    withNavigationContext({
      readDirection: 'ltr',
      target: { webViewId: 'web-view-1', scrollGroupScrRef: 2 },
    });
    mocks.navigateReferenceHistory.mockResolvedValue(false);
    const navigateLeft = await getHandler('platform.navigateLeftInReferenceHistory');

    await expect(navigateLeft()).resolves.toBe(false);
  });
});

describe('serialization across windows', () => {
  test('two overlapping presses from different windows advance exactly two steps, in order', async () => {
    // The mutex is app-global now that the handler runs in main, where it used to be per-renderer.
    // Two windows driving the same scroll group interleave without it, each reading the same
    // starting reference and losing a step.
    const contextsByWindowId: Record<number, unknown> = {
      2: { readDirection: 'ltr', target: { webViewId: 'a', scrollGroupScrRef: 2, projectId: 'p' } },
      3: { readDirection: 'ltr', target: { webViewId: 'b', scrollGroupScrRef: 2, projectId: 'p' } },
    };
    mocks.getTargetWindowServiceShard.mockImplementation(async () => {
      const windowId = mocks.getTargetWindowId();
      return {
        windowId,
        shard: { getNavigationContext: vi.fn(async () => contextsByWindowId[windowId]) },
      };
    });
    // Stateful current ref: each read returns the last written ref, so the assertions can tell
    // whether the second run read the first run's result (serialized) or the original (raced)
    mocks.getScrRefForProject.mockImplementation(async () => {
      const lastWrite = mocks.setScrRef.mock.calls.at(-1);
      return lastWrite ? lastWrite[1] : GEN_5_3;
    });
    const goToNextVerse = await getHandler('platform.goToNextVerse');

    mocks.getTargetWindowId.mockReturnValue(2);
    const fromWindow2 = goToNextVerse();
    mocks.getTargetWindowId.mockReturnValue(3);
    const fromWindow3 = goToNextVerse();
    await Promise.all([fromWindow2, fromWindow3]);

    expect(mocks.setScrRef).toHaveBeenNthCalledWith(
      1,
      2,
      { book: 'GEN', chapterNum: 5, verseNum: 4 },
      'p',
    );
    expect(mocks.setScrRef).toHaveBeenNthCalledWith(
      2,
      2,
      { book: 'GEN', chapterNum: 5, verseNum: 5 },
      'p',
    );
  });

  test('a window that is slow to answer does not hold up navigation in another window', async () => {
    // The lock is app-global, so anything held inside it is held against every window. Asking a
    // window what to navigate is a request to another process, and a window that has stopped
    // answering takes the whole request timeout to say so — long enough to stall a second window's
    // keystrokes and queue every auto-repeat behind them. Only this process's own
    // read-compute-write belongs inside the lock.
    let releaseFirstWindow = () => {};
    let askedWindowCount = 0;
    mocks.getTargetWindowServiceShard.mockImplementation(async () => {
      const windowId = mocks.getTargetWindowId();
      askedWindowCount += 1;
      if (askedWindowCount === 1)
        await new Promise<void>((resolve) => {
          releaseFirstWindow = resolve;
        });
      return {
        windowId,
        shard: {
          getNavigationContext: vi.fn(async () => ({
            readDirection: 'ltr',
            target: { webViewId: `web-view-${windowId}`, scrollGroupScrRef: 2, projectId: 'p' },
          })),
        },
      };
    });
    const goToNextVerse = await getHandler('platform.goToNextVerse');

    mocks.getTargetWindowId.mockReturnValue(2);
    const stalledInWindow2 = goToNextVerse();
    mocks.getTargetWindowId.mockReturnValue(3);
    const fromWindow3 = goToNextVerse();
    // Let everything that CAN make progress make it, without waiting on the stalled window
    await new Promise((resolve) => {
      setTimeout(resolve, 0);
    });

    expect(mocks.setScrRef).toHaveBeenCalledTimes(1);
    releaseFirstWindow();
    await Promise.all([stalledInWindow2, fromWindow3]);
    expect(mocks.setScrRef).toHaveBeenCalledTimes(2);
  });
});

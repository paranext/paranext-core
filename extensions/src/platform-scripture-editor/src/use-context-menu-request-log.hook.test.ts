// @vitest-environment jsdom
import { renderHook } from '@testing-library/react';
import type { EditorContextMenuRequest } from 'platform-bible-react/experimental';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  CONTEXT_MENU_STALL_LOG_MS,
  createContextMenuRequestLog,
  useContextMenuRequestLog,
} from './use-context-menu-request-log.hook';

const WEB_VIEW_ID = 'web-view-7';

const MOUSE_REQUEST: EditorContextMenuRequest = {
  position: { x: 4, y: 5 },
  hasSelection: false,
  selectedText: '',
  isKeyboardInvoked: false,
};

/** A menu request that settles when the test says so. */
function openMenuRequest() {
  let settle!: (command: string | undefined) => void;
  const promise = new Promise<string | undefined>((resolve) => {
    settle = resolve;
  });
  return { promise, resolve: settle };
}

describe('createContextMenuRequestLog', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const makeLog = () => {
    const logger = { debug: vi.fn() };
    const log = createContextMenuRequestLog({
      webViewId: WEB_VIEW_ID,
      editorName: 'editor',
      isMainEditor: true,
      logger,
    });
    return { log, logger };
  };

  it('logs a line when a request is made, naming the web view, the editor and how it was raised', () => {
    const { log, logger } = makeLog();

    log.track(MOUSE_REQUEST, openMenuRequest().promise);

    expect(logger.debug).toHaveBeenCalledExactlyOnceWith(
      expect.stringMatching(
        new RegExp(
          `editor context menu of web view ${WEB_VIEW_ID} was requested.*main editor: true.*keyboard: false`,
        ),
      ),
    );
  });

  it('logs once more when a request is still unsettled two seconds later', () => {
    const { log, logger } = makeLog();
    log.track({ ...MOUSE_REQUEST, isKeyboardInvoked: true }, openMenuRequest().promise);
    logger.debug.mockClear();

    vi.advanceTimersByTime(CONTEXT_MENU_STALL_LOG_MS - 1);
    expect(logger.debug).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);
    expect(logger.debug).toHaveBeenCalledExactlyOnceWith(
      expect.stringMatching(new RegExp(`${WEB_VIEW_ID}.*still unsettled after 2000 ms`)),
    );

    vi.advanceTimersByTime(CONTEXT_MENU_STALL_LOG_MS * 3);
    expect(logger.debug).toHaveBeenCalledTimes(1);
  });

  it('logs no stall line for a request that settled in time', async () => {
    const { log, logger } = makeLog();
    const menu = openMenuRequest();
    const tracked = log.track(MOUSE_REQUEST, menu.promise);

    menu.resolve('some.command');
    await expect(tracked).resolves.toBe('some.command');
    logger.debug.mockClear();
    vi.advanceTimersByTime(CONTEXT_MENU_STALL_LOG_MS);

    expect(logger.debug).not.toHaveBeenCalled();
    expect(vi.getTimerCount()).toBe(0);
  });

  it('keeps logging how a request settled, and passes the outcome through', async () => {
    const { log, logger } = makeLog();
    const menu = openMenuRequest();
    const tracked = log.track(MOUSE_REQUEST, menu.promise);

    menu.resolve(undefined);

    await expect(tracked).resolves.toBeUndefined();
    expect(logger.debug).toHaveBeenLastCalledWith(
      expect.stringMatching(new RegExp(`${WEB_VIEW_ID}.*without a pick`)),
    );
  });

  it('clears a waiting stall line when disposed', () => {
    const { log, logger } = makeLog();
    log.track(MOUSE_REQUEST, openMenuRequest().promise);
    logger.debug.mockClear();

    log.dispose();

    expect(vi.getTimerCount()).toBe(0);
    vi.advanceTimersByTime(CONTEXT_MENU_STALL_LOG_MS);
    expect(logger.debug).not.toHaveBeenCalled();
  });
});

describe('useContextMenuRequestLog', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('clears a waiting stall line when the editor unmounts', () => {
    const logger = { debug: vi.fn() };
    const { result, unmount } = renderHook(() =>
      useContextMenuRequestLog({
        webViewId: WEB_VIEW_ID,
        editorName: 'footnote editor',
        isMainEditor: false,
        logger,
      }),
    );
    result.current(MOUSE_REQUEST, openMenuRequest().promise);
    expect(vi.getTimerCount()).toBe(1);

    unmount();

    expect(vi.getTimerCount()).toBe(0);
  });
});

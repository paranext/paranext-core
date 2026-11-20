// @vitest-environment jsdom
import { act, fireEvent, render } from '@testing-library/react';
import type { ViewOptions } from '@eten-tech-foundation/platform-editor';
import type { FootnoteEditorHandle } from 'platform-bible-react';
import type { RefObject } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ABORTED, newPlatformError } from 'platform-bible-utils';
import { getEditorViewOptions } from './editor-view-options.util';
import { PaneFootnoteEditorContextMenu } from './pane-footnote-editor-context-menu.component';
import { SCRIPTURE_EDITOR_WEBVIEW_TYPE } from './platform-scripture-editor.utils';

const {
  mockShowContextMenu,
  mockDismissContextMenu,
  mockSendCommand,
  mockLoggerWarn,
  mockLoggerDebug,
} = vi.hoisted(() => ({
  mockShowContextMenu: vi.fn(),
  mockDismissContextMenu: vi.fn(),
  mockSendCommand: vi.fn(),
  mockLoggerWarn: vi.fn(),
  mockLoggerDebug: vi.fn(),
}));

vi.mock('@papi/frontend', () => ({
  default: {
    overlays: { showContextMenu: mockShowContextMenu, dismissContextMenu: mockDismissContextMenu },
    commands: { sendCommand: mockSendCommand },
  },
  logger: { warn: mockLoggerWarn, error: vi.fn(), info: vi.fn(), debug: mockLoggerDebug },
}));

const WEB_VIEW_ID = 'web-view-1';
const PROJECT_ID = 'project-1';

function makeHandle() {
  return {
    flushPendingEdits: vi.fn(),
    focus: vi.fn(),
    containsFocus: vi.fn(() => false),
    cut: vi.fn(),
    copy: vi.fn(),
    paste: vi.fn(),
    pastePlainText: vi.fn(),
  } satisfies FootnoteEditorHandle;
}

/** A menu request that stays open until the test settles it. */
function openRequest() {
  let settle!: (command: string | undefined) => void;
  mockShowContextMenu.mockImplementationOnce(
    () =>
      new Promise<string | undefined>((resolve) => {
        settle = resolve;
      }),
  );
  return (command: string | undefined) => settle(command);
}

function setup(viewOptions?: ViewOptions) {
  const handle = makeHandle();
  // The wrapper reads the handle through the ref, as the web view's row editor ref is filled.
  const rowEditorRef: RefObject<FootnoteEditorHandle | null> = { current: handle };
  const notifyActionBlocked = vi.fn();
  const utils = render(
    <div>
      <header data-testid="pane-header">
        <button type="button" data-testid="pane-close">
          close
        </button>
        <p data-testid="header-text">Footnotes</p>
      </header>
      <PaneFootnoteEditorContextMenu
        webViewId={WEB_VIEW_ID}
        projectId={PROJECT_ID}
        viewOptions={viewOptions}
        rowEditorRef={rowEditorRef}
        notifyActionBlocked={notifyActionBlocked}
      >
        <div data-testid="row-editor">
          <p data-testid="note-text">note text</p>
          <button type="button" data-testid="note-type-button">
            type
          </button>
        </div>
      </PaneFootnoteEditorContextMenu>
      <p data-testid="read-only-row">another note</p>
    </div>,
  );
  const rightClick = (element: Element) => {
    act(() => {
      fireEvent(
        element,
        new MouseEvent('contextmenu', {
          bubbles: true,
          cancelable: true,
          button: 2,
          clientX: 12,
          clientY: 34,
        }),
      );
    });
  };
  const flush = async () => {
    await act(async () => {
      await Promise.resolve();
      await Promise.resolve();
    });
  };
  return {
    ...utils,
    handle,
    rowEditorRef,
    notifyActionBlocked,
    rightClick,
    flush,
  };
}

describe('PaneFootnoteEditorContextMenu', () => {
  beforeEach(() => {
    mockShowContextMenu.mockReset();
    mockShowContextMenu.mockResolvedValue(undefined);
    mockDismissContextMenu.mockReset();
    mockSendCommand.mockReset();
    mockSendCommand.mockResolvedValue(undefined);
    mockLoggerWarn.mockReset();
    mockLoggerDebug.mockReset();
  });

  describe('opening the menu', () => {
    it('asks for exactly one platform menu for a right-click in the row editor text, not for the main editor', () => {
      const { getByTestId, rightClick } = setup();

      rightClick(getByTestId('note-text'));

      expect(mockShowContextMenu).toHaveBeenCalledTimes(1);
      expect(mockShowContextMenu).toHaveBeenCalledWith(
        SCRIPTURE_EDITOR_WEBVIEW_TYPE,
        WEB_VIEW_ID,
        expect.objectContaining({
          position: { x: 12, y: 34 },
          shouldRunCommand: false,
          contextKeys: expect.objectContaining({
            'platformScriptureEditor.contextMenu.isMainEditor': false,
          }),
        }),
      );
    });

    it("opens nothing for a right-click on the row editor's own button", () => {
      const { getByTestId, rightClick } = setup();

      rightClick(getByTestId('note-type-button'));

      expect(mockShowContextMenu).not.toHaveBeenCalled();
    });

    it.each(['pane-close', 'header-text', 'read-only-row'])(
      'opens nothing for a right-click on %s, which is outside the row editor',
      (testId) => {
        const { getByTestId, rightClick } = setup();

        rightClick(getByTestId(testId));

        expect(mockShowContextMenu).not.toHaveBeenCalled();
      },
    );

    it('wraps the row editor without taking part in its layout', () => {
      const { getByTestId } = setup();

      const wrapper = getByTestId('row-editor').parentElement;

      expect(wrapper?.className).toContain('tw:contents');
    });
  });

  describe('closing the menu', () => {
    it('dismisses an open request when the row editor session ends', () => {
      openRequest();
      const { getByTestId, rightClick, unmount } = setup();
      rightClick(getByTestId('note-text'));
      expect(mockDismissContextMenu).not.toHaveBeenCalled();

      unmount();

      expect(mockDismissContextMenu).toHaveBeenCalledWith(WEB_VIEW_ID);
    });

    it('does not dismiss anything on unmount when no menu was open (control)', () => {
      const { unmount } = setup();

      unmount();

      expect(mockDismissContextMenu).not.toHaveBeenCalled();
    });
  });

  describe('a menu that shows no pick', () => {
    it('logs a request the platform rejected, with its code, naming the web view', async () => {
      mockShowContextMenu.mockRejectedValueOnce(
        newPlatformError('Overlay was replaced by a new request', ABORTED),
      );
      const { getByTestId, rightClick, flush } = setup();

      rightClick(getByTestId('note-text'));
      await flush();

      expect(mockLoggerDebug).toHaveBeenCalledWith(
        expect.stringMatching(new RegExp(`footnote editor.*${WEB_VIEW_ID}.*${ABORTED}.*replaced`)),
      );
      // Still one of the hook's quiet rejections: nothing reaches the warning log.
      expect(mockLoggerWarn).not.toHaveBeenCalled();
    });

    it('logs a menu that closed without a pick, naming the web view', async () => {
      const { getByTestId, rightClick, flush } = setup();

      rightClick(getByTestId('note-text'));
      await flush();

      expect(mockLoggerDebug).toHaveBeenCalledWith(
        expect.stringMatching(
          new RegExp(`footnote editor.*${WEB_VIEW_ID} was requested.*main editor: false`),
        ),
      );
      expect(mockLoggerDebug).toHaveBeenCalledWith(
        expect.stringMatching(new RegExp(`footnote editor.*${WEB_VIEW_ID}.*without a pick`)),
      );
    });
  });

  describe('picking a clipboard command', () => {
    it.each([
      ['platformScriptureEditor.cutSelection', 'cut'],
      ['platformScriptureEditor.copySelection', 'copy'],
      ['platformScriptureEditor.pasteAtSelection', 'paste'],
      ['platformScriptureEditor.pasteAsPlainTextAtSelection', 'pastePlainText'],
    ] as const)("%s calls only the row editor handle's %s", async (command, method) => {
      const settle = openRequest();
      const { getByTestId, rightClick, flush, handle } = setup();
      rightClick(getByTestId('note-text'));

      settle(command);
      await flush();

      expect(handle[method]).toHaveBeenCalledTimes(1);
      const others = (['cut', 'copy', 'paste', 'pastePlainText'] as const).filter(
        (other) => other !== method,
      );
      others.forEach((other) => expect(handle[other]).not.toHaveBeenCalled());
      // Restoring the selection and focusing are the handle's own job, in that order, so the
      // wrapper must not focus ahead of the method.
      expect(handle.focus).not.toHaveBeenCalled();
    });

    it('returns focus to the note text on the next animation frame', async () => {
      const frames: FrameRequestCallback[] = [];
      const raf = vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
        frames.push(callback);
        return frames.length;
      });
      try {
        const settle = openRequest();
        const { getByTestId, rightClick, flush, handle } = setup();
        rightClick(getByTestId('note-text'));
        settle('platformScriptureEditor.copySelection');
        await flush();
        expect(handle.focus).not.toHaveBeenCalled();

        frames.forEach((callback) => callback(0));

        expect(handle.focus).toHaveBeenCalledTimes(1);
      } finally {
        raf.mockRestore();
      }
    });

    it('tells the user the action is blocked when the row editor is gone', async () => {
      const settle = openRequest();
      const { getByTestId, rightClick, flush, rowEditorRef, notifyActionBlocked } = setup();
      rightClick(getByTestId('note-text'));
      // The ref's own type for "no editor mounted" is null.
      // eslint-disable-next-line no-null/no-null
      rowEditorRef.current = null;

      settle('platformScriptureEditor.copySelection');
      await flush();

      expect(notifyActionBlocked).toHaveBeenCalledTimes(1);
    });

    it('tells the user the action is blocked, and logs it, when the row editor refuses it', async () => {
      const settle = openRequest();
      const { getByTestId, rightClick, flush, handle, notifyActionBlocked } = setup();
      handle.paste.mockImplementation(() => {
        throw new Error('read-only');
      });
      rightClick(getByTestId('note-text'));

      settle('platformScriptureEditor.pasteAtSelection');
      await flush();

      expect(notifyActionBlocked).toHaveBeenCalledTimes(1);
      expect(mockLoggerWarn).toHaveBeenCalledWith(expect.stringContaining('read-only'));
    });

    it('does not tell the user anything when the action runs (control)', async () => {
      const settle = openRequest();
      const { getByTestId, rightClick, flush, notifyActionBlocked } = setup();
      rightClick(getByTestId('note-text'));

      settle('platformScriptureEditor.copySelection');
      await flush();

      expect(notifyActionBlocked).not.toHaveBeenCalled();
      expect(mockLoggerWarn).not.toHaveBeenCalled();
    });
  });

  describe('picking any other command', () => {
    it('opens Find with the selection the menu opened on and the editor project', async () => {
      const settle = openRequest();
      const { getByTestId, rightClick, flush, handle } = setup();
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(getByTestId('note-text'));
      selection?.removeAllRanges();
      selection?.addRange(range);
      rightClick(getByTestId('note-text'));

      settle('platformScripture.openFind');
      await flush();

      expect(mockSendCommand).toHaveBeenCalledWith(
        'platformScripture.openFind',
        WEB_VIEW_ID,
        'note text',
        PROJECT_ID,
      );
      expect(handle.copy).not.toHaveBeenCalled();
    });

    it("respells the editor's no-break space stand-in the project's way for Find", async () => {
      // Standard view with invisible characters allowed holds a no-break space as U+001A.
      const settle = openRequest();
      const { getByTestId, rightClick, flush } = setup(
        getEditorViewOptions('standard', true, true),
      );
      const noteText = getByTestId('note-text');
      noteText.textContent = 'Mr.\u001AAbraham';
      window.getSelection()?.selectAllChildren(noteText);
      rightClick(noteText);

      settle('platformScripture.openFind');
      await flush();

      expect(mockSendCommand).toHaveBeenCalledWith(
        'platformScripture.openFind',
        WEB_VIEW_ID,
        'Mr.\u00A0Abraham',
        PROJECT_ID,
      );
    });

    it('sends another extension command with the web view id', async () => {
      const settle = openRequest();
      const { getByTestId, rightClick, flush } = setup();
      rightClick(getByTestId('note-text'));

      settle('someExtension.doThing');
      await flush();

      expect(mockSendCommand).toHaveBeenCalledWith('someExtension.doThing', WEB_VIEW_ID);
    });
  });
});

import { toUsfmNbspSpelling } from '@eten-tech-foundation/platform-editor';
import type { EditorContextMenuRequest } from 'platform-bible-react/experimental';
import { describe, expect, it, vi } from 'vitest';
import { getOpenFindTriggerArgs } from './find-trigger.util';
import {
  CONTEXT_MENU_CAN_FIND_KEY,
  createReadOnlyPanelContextMenuCallbacks,
  getReadOnlyPanelContextMenuShowOptions,
  type ReadOnlyPanelContextMenuCallbacksOptions,
} from './use-read-only-panel-context-menu-callbacks.hook';

vi.mock('@papi/frontend', () => ({
  default: {},
  logger: { debug: vi.fn(), warn: vi.fn(), error: vi.fn(), info: vi.fn() },
}));

const WEB_VIEW_ID = 'web-view-1';
const WEB_VIEW_TYPE = 'platformScriptureEditor.bibleTexts';
const PROJECT_ID = 'project-1';

const REQUEST: EditorContextMenuRequest = {
  position: { x: 12, y: 34 },
  hasSelection: true,
  selectedText: '  grace and peace ',
  isKeyboardInvoked: false,
};

/** The platform services with only the three calls the callbacks make. */
function fakePapi(services: {
  showContextMenu: () => unknown;
  dismissContextMenu: () => unknown;
  sendCommand: () => unknown;
}): ReadOnlyPanelContextMenuCallbacksOptions['papi'] {
  // A full PAPI cannot be built here; the callbacks reach only these three members
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return {
    overlays: {
      showContextMenu: services.showContextMenu,
      dismissContextMenu: services.dismissContextMenu,
    },
    commands: { sendCommand: services.sendCommand },
  } as unknown as ReadOnlyPanelContextMenuCallbacksOptions['papi'];
}

function setup(overrides: Partial<ReadOnlyPanelContextMenuCallbacksOptions> = {}) {
  const showContextMenu = vi.fn(async () => 'picked.command');
  const dismissContextMenu = vi.fn(async () => true);
  const sendCommand = vi.fn(async () => undefined);
  const warn = vi.fn();
  // The tracker hands back the request's own outcome
  const trackRequest = vi.fn<ReadOnlyPanelContextMenuCallbacksOptions['trackRequest']>(
    (_request, showMenu) => showMenu,
  );
  const callbacks = createReadOnlyPanelContextMenuCallbacks({
    webViewId: WEB_VIEW_ID,
    webViewType: WEB_VIEW_TYPE,
    projectId: PROJECT_ID,
    trackRequest,
    papi: fakePapi({ showContextMenu, dismissContextMenu, sendCommand }),
    logger: { warn },
    ...overrides,
  });
  return { callbacks, showContextMenu, dismissContextMenu, sendCommand, warn, trackRequest };
}

describe('getReadOnlyPanelContextMenuShowOptions', () => {
  it('lets the platform run nothing and reports the selection and whether Find has a project', () => {
    expect(getReadOnlyPanelContextMenuShowOptions(REQUEST, true)).toEqual({
      position: { x: 12, y: 34 },
      shouldRunCommand: false,
      contextKeys: {
        'platformScriptureEditor.contextMenu.hasSelection': true,
        'platformScriptureEditor.contextMenu.canFind': true,
      },
    });
    expect(
      getReadOnlyPanelContextMenuShowOptions({ ...REQUEST, hasSelection: false }, false)
        .contextKeys,
    ).toEqual({
      'platformScriptureEditor.contextMenu.hasSelection': false,
      'platformScriptureEditor.contextMenu.canFind': false,
    });
  });
});

describe('createReadOnlyPanelContextMenuCallbacks', () => {
  it("asks for the panel's own web view type, in the panel's own tab, through the request log", async () => {
    const { callbacks, showContextMenu, trackRequest } = setup();

    await expect(callbacks.requestMenu(REQUEST)).resolves.toBe('picked.command');

    expect(showContextMenu).toHaveBeenCalledWith(
      WEB_VIEW_TYPE,
      WEB_VIEW_ID,
      expect.objectContaining({ shouldRunCommand: false }),
    );
    expect(trackRequest).toHaveBeenCalledTimes(1);
  });

  it('tells the menu Find can run while a project has resolved, and cannot while none has', () => {
    const resolved = setup();
    resolved.callbacks.requestMenu(REQUEST);
    const unresolved = setup({ projectId: undefined });
    unresolved.callbacks.requestMenu(REQUEST);

    const canFindOf = (showContextMenu: ReturnType<typeof vi.fn>) =>
      showContextMenu.mock.calls[0][2].contextKeys[CONTEXT_MENU_CAN_FIND_KEY];
    expect(canFindOf(resolved.showContextMenu)).toBe(true);
    expect(canFindOf(unresolved.showContextMenu)).toBe(false);
  });

  it("closes the menu of the panel's own tab", () => {
    const { callbacks, dismissContextMenu } = setup();

    callbacks.dismissMenu();

    expect(dismissContextMenu).toHaveBeenCalledWith(WEB_VIEW_ID);
  });

  it("sends Find exactly the arguments the panel's Ctrl+F sends", () => {
    const { callbacks, sendCommand } = setup();
    const ctrlFArgs = getOpenFindTriggerArgs(
      WEB_VIEW_ID,
      PROJECT_ID,
      toUsfmNbspSpelling(REQUEST.selectedText, undefined),
    );
    expect(ctrlFArgs).toBeDefined();

    callbacks.openFind(REQUEST.selectedText);

    expect(sendCommand).toHaveBeenCalledTimes(1);
    expect(sendCommand).toHaveBeenCalledWith(
      'platformScripture.openFind',
      ctrlFArgs?.webViewId,
      ctrlFArgs?.selectedText,
      ctrlFArgs?.sourceProjectId,
    );
    // Normalized as Ctrl+F normalizes it: trimmed
    expect(ctrlFArgs?.selectedText.startsWith(' ')).toBe(false);
    expect(ctrlFArgs?.selectedText.endsWith(' ')).toBe(false);
  });

  it('sends no Find while no project has resolved, as Ctrl+F sends none', () => {
    const { callbacks, sendCommand } = setup({ projectId: undefined });

    callbacks.openFind('grace');

    expect(sendCommand).not.toHaveBeenCalled();
  });

  it("sends another extension's picked command with the panel's web view id", () => {
    const { callbacks, sendCommand } = setup();

    callbacks.sendCommand('someExtension.doSomething');

    expect(sendCommand).toHaveBeenCalledWith('someExtension.doSomething', WEB_VIEW_ID);
  });

  it('logs, and does not throw, when a command cannot be sent', async () => {
    const failing = vi.fn(async () => {
      throw new Error('no such command');
    });
    const { callbacks, warn } = setup({
      papi: fakePapi({
        showContextMenu: vi.fn(),
        dismissContextMenu: vi.fn(),
        sendCommand: failing,
      }),
    });

    callbacks.sendCommand('someExtension.doSomething');
    callbacks.openFind('grace');
    await Promise.resolve();
    await Promise.resolve();

    expect(warn).toHaveBeenCalledTimes(2);
  });
});

import type { ViewOptions } from '@eten-tech-foundation/platform-editor';
import type papi from '@papi/frontend';
import type { CommandHandlers } from 'papi-shared-types';
import type { EditorContextMenuRequest } from 'platform-bible-react/experimental';
import { getErrorMessage, isPlatformError } from 'platform-bible-utils';
import { EditMenuCommand, isEditMenuCommand } from './edit-menu-actions.util';
import { getEditorOpenFindArgs } from './find-trigger.util';

/** What a picked context-menu command does to the editor that was clicked. */
export type ContextMenuPickEffects = {
  /** Runs a clipboard command on the clicked editor, focusing that editor first. */
  runClipboardCommand: (command: EditMenuCommand) => void;
  /** Opens Find, searching for the text that was selected when the menu opened. */
  openFind: (selectedText: string) => void;
  /** Sends any other command, with the clicked tab's web view id. */
  sendCommand: (command: string) => void;
};

/**
 * Routes the command picked in an editor's context menu. Clipboard commands need the right-click's
 * user activation and the editor's own selection handling, so they run on the editor; Find carries
 * the selection that was current when the menu opened; every other command, including those other
 * extensions contribute to the menu, is sent on.
 *
 * @param command The command id the user picked
 * @param request What the editor reported when the menu opened
 * @param effects What each kind of command does
 */
export function dispatchContextMenuPick(
  command: string,
  request: EditorContextMenuRequest,
  effects: ContextMenuPickEffects,
): void {
  if (isEditMenuCommand(command)) {
    effects.runClipboardCommand(command);
    return;
  }
  if (command === 'platformScripture.openFind') {
    effects.openFind(request.selectedText);
    return;
  }
  effects.sendCommand(command);
}

/** The request key the menu's `when` and `enabledWhen` read for "something is selected". */
export const CONTEXT_MENU_HAS_SELECTION_KEY = 'platformScriptureEditor.contextMenu.hasSelection';

/** The request key the menu's `when` reads for "this is the main Scripture text". */
export const CONTEXT_MENU_IS_MAIN_EDITOR_KEY = 'platformScriptureEditor.contextMenu.isMainEditor';

/**
 * The options `papi.overlays.showContextMenu` gets for one editor right-click: where to open, the
 * facts the menu's conditions read, and no command run by the platform (the editor runs what was
 * picked itself, see {@link dispatchContextMenuPick}).
 *
 * @param request What the editor reported for the right-click
 * @param isMainEditor Whether the click was in the main Scripture text rather than a note editor
 */
export function getContextMenuShowOptions(
  request: EditorContextMenuRequest,
  isMainEditor: boolean,
) {
  return {
    position: request.position,
    shouldRunCommand: false,
    contextKeys: {
      [CONTEXT_MENU_HAS_SELECTION_KEY]: request.hasSelection,
      [CONTEXT_MENU_IS_MAIN_EDITOR_KEY]: isMainEditor,
    },
  };
}

/**
 * Logs, at debug level, a context-menu request that ends without a pick: one that rejects (the menu
 * hook drops a replaced, debounced or not-visible request without a trace) or one that resolves
 * with nothing picked. Either way the request settles exactly as it would without this, so a
 * right-click that showed no menu can be told apart in the log from one whose menu was dismissed.
 *
 * @param request The `showContextMenu` call for one right-click
 * @param webViewId The web view the menu was requested for
 * @param editorName Names the editor in the log line, for example `'editor'`
 * @param logger Receives the debug lines
 * @returns `request`'s own outcome
 */
export async function logContextMenuOutcome(
  request: Promise<string | undefined>,
  webViewId: string,
  editorName: string,
  logger: { debug: (message: string) => void },
): Promise<string | undefined> {
  let command: string | undefined;
  try {
    command = await request;
  } catch (error) {
    const code = isPlatformError(error) && error.code ? `${error.code} ` : '';
    logger.debug(
      `The ${editorName} context menu of web view ${webViewId} was rejected: ${code}${getErrorMessage(error)}`,
    );
    throw error;
  }
  if (command === undefined)
    logger.debug(`The ${editorName} context menu of web view ${webViewId} closed without a pick`);
  return command;
}

/** What {@link createContextMenuCommandEffects} needs from the editor that owns the menu. */
export type ContextMenuCommandEffectsOptions = {
  /** The web view's id, which Find and every other picked command are sent for. */
  webViewId: string;
  /** The project the tab shows, the source for Find; `undefined` while none is resolved. */
  projectId: string | undefined;
  /**
   * The tab's view options, handed to the editor package's no-break-space respelling of Find's text
   * because its signature takes them. Its result does not depend on them today.
   */
  viewOptions: ViewOptions | undefined;
  /** Names the editor in a log line, for example `'editor'` or `'footnote editor'`. */
  editorName: string;
  /** Sends commands. */
  papi: Pick<typeof papi, 'commands'>;
  /** Receives the failure of a command that could not be sent. */
  logger: { warn: (message: string) => void };
};

/**
 * The effects of {@link ContextMenuPickEffects} that do not depend on which editor was clicked:
 * Find, with the arguments Ctrl+F builds, and every other command, sent with the web view id. A
 * failure to send either is logged, never thrown.
 */
export function createContextMenuCommandEffects({
  webViewId,
  projectId,
  viewOptions,
  editorName,
  papi: papiService,
  logger,
}: ContextMenuCommandEffectsOptions): Pick<ContextMenuPickEffects, 'openFind' | 'sendCommand'> {
  return {
    openFind: (selectedText) => {
      const args = getEditorOpenFindArgs(webViewId, projectId, selectedText, viewOptions);
      if (!args) return;
      papiService.commands
        .sendCommand(
          'platformScripture.openFind',
          args.webViewId,
          args.selectedText,
          args.sourceProjectId,
        )
        .catch((e) =>
          logger.warn(
            `Failed to open Find from the ${editorName} context menu: ${getErrorMessage(e)}`,
          ),
        );
    },
    sendCommand: (command) => {
      papiService.commands
        // Assuming that the picked command is one of the registered command handlers in papi
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        .sendCommand(command as keyof CommandHandlers, webViewId)
        .catch((e) =>
          logger.warn(
            `Failed to run ${command} from the ${editorName} context menu: ${getErrorMessage(e)}`,
          ),
        );
    },
  };
}

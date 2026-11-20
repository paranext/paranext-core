import type { EditorContextMenuRequest } from 'platform-bible-react/experimental';
import { useEffect, useMemo } from 'react';
import { logContextMenuOutcome } from './editor-context-menu-pick.util';

/**
 * How long a context-menu request may stay open before the log says so. The same two seconds the
 * menu hook claims the keyboard for: a request still open by then is either a menu the user is
 * still looking at or one that never appeared.
 */
export const CONTEXT_MENU_STALL_LOG_MS = 2000;

/** What {@link createContextMenuRequestLog} names in its lines. */
export type ContextMenuRequestLogOptions = {
  /** The web view the menus are requested for. */
  webViewId: string;
  /** Names the editor in each line, for example `'editor'` or `'footnote editor'`. */
  editorName: string;
  /** Whether the requests come from the main Scripture text rather than a note editor. */
  isMainEditor: boolean;
  /** Receives the debug lines. */
  logger: { debug: (message: string) => void };
};

/** A debug log of one editor's context-menu requests. */
export type ContextMenuRequestLog = {
  /**
   * Logs that `request` was made, logs once more if `showMenu` is still open after
   * {@link CONTEXT_MENU_STALL_LOG_MS} (the menu is still showing or never appeared), and logs how it
   * settled.
   *
   * @returns `showMenu`'s own outcome
   */
  track: (
    request: EditorContextMenuRequest,
    showMenu: Promise<string | undefined>,
  ) => Promise<string | undefined>;
  /** Cancels every stall line still waiting, for when the editor goes away. */
  dispose: () => void;
};

/**
 * Logs each context-menu request an editor makes at debug level: when it is made, when it is still
 * still open two seconds later (the menu is still showing or never appeared), and how it settled
 * (see {@link logContextMenuOutcome}). A right-click that showed no menu can then be told apart in
 * the log: never requested, requested and still open with no menu showing, rejected, or dismissed.
 */
export function createContextMenuRequestLog({
  webViewId,
  editorName,
  isMainEditor,
  logger,
}: ContextMenuRequestLogOptions): ContextMenuRequestLog {
  const stallTimers = new Set<ReturnType<typeof setTimeout>>();
  let requestCount = 0;
  return {
    track: async (request, showMenu) => {
      requestCount += 1;
      const label = `The ${editorName} context menu of web view ${webViewId}`;
      const number = requestCount;
      logger.debug(
        `${label} was requested (#${number}, main editor: ${isMainEditor}, keyboard: ${request.isKeyboardInvoked})`,
      );
      const stallTimer = setTimeout(() => {
        stallTimers.delete(stallTimer);
        logger.debug(
          `${label}: request #${number} is still open after ${CONTEXT_MENU_STALL_LOG_MS} ms (the menu is still showing or never appeared)`,
        );
      }, CONTEXT_MENU_STALL_LOG_MS);
      stallTimers.add(stallTimer);
      try {
        return await logContextMenuOutcome(showMenu, webViewId, editorName, logger);
      } finally {
        clearTimeout(stallTimer);
        stallTimers.delete(stallTimer);
      }
    },
    dispose: () => {
      stallTimers.forEach((timer) => clearTimeout(timer));
      stallTimers.clear();
    },
  };
}

/**
 * {@link createContextMenuRequestLog} for one editor component, disposed when it unmounts.
 *
 * @returns `track`, to wrap each `showContextMenu` call in
 */
export function useContextMenuRequestLog({
  webViewId,
  editorName,
  isMainEditor,
  logger,
}: ContextMenuRequestLogOptions): ContextMenuRequestLog['track'] {
  const log = useMemo(
    () => createContextMenuRequestLog({ webViewId, editorName, isMainEditor, logger }),
    [webViewId, editorName, isMainEditor, logger],
  );
  useEffect(() => () => log.dispose(), [log]);
  return log.track;
}

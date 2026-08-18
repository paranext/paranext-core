import papi, { logger } from '@papi/frontend';
import { getErrorMessage } from 'platform-bible-utils';
import { useEffect } from 'react';
import { getOpenFindTriggerArgs } from './find-trigger.util';

/**
 * Binds Ctrl+F to open Find for the scripture a tab is showing. Shared by every scripture tab type
 * so there is one Ctrl+F→`openFind` implementation: the Scripture editor passes its own project,
 * and the read-only reference panels (model text, Bible text, commentary) pass the displayed
 * resource's project — never the panel's own container project. macOS uses Ctrl (not Cmd) to match
 * the rest of the app; see the `scripture-find` entry in `src/stories/keyboard-shortcuts.data.ts`.
 *
 * While no scripture is resolved (a panel still loading its resource, or an editor with no project)
 * Ctrl+F is left alone: the key is not consumed and the reason is logged, so the keystroke is never
 * silently swallowed.
 *
 * @param webViewId The tab's own web view id, forwarded to the Find command.
 * @param sourceProjectId Project id of the scripture to search, or `undefined` while none is
 *   resolved.
 */
export function useOpenFindShortcut(webViewId: string, sourceProjectId: string | undefined): void {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl+F and nothing more: Ctrl+Shift+F / Ctrl+Alt+F (and macOS Ctrl+Cmd+F) belong to whoever
      // binds them, and this hook now runs in every scripture tab — a loose match would swallow
      // them app-wide. Ctrl rather than Cmd on macOS is deliberate; see the doc comment above.
      if (event.shiftKey || event.altKey || event.metaKey) return;
      if (!event.ctrlKey || event.key.toLowerCase() !== 'f') return;
      const args = getOpenFindTriggerArgs(
        webViewId,
        sourceProjectId,
        window.getSelection()?.toString() ?? '',
      );
      if (!args) {
        logger.debug(
          `Ctrl+F ignored in web view ${webViewId}: no scripture resolved to search yet`,
        );
        return;
      }
      // Only consume the keystroke once Find is actually being opened.
      event.preventDefault();
      papi.commands
        .sendCommand(
          'platformScripture.openFind',
          args.webViewId,
          args.selectedText,
          args.sourceProjectId,
        )
        .catch((e) => logger.warn(`Failed to open Find: ${getErrorMessage(e)}`));
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [webViewId, sourceProjectId]);
}

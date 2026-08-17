import papi, { logger } from '@papi/frontend';
import { getErrorMessage } from 'platform-bible-utils';
import { useEffect } from 'react';
import { getOpenFindTriggerArgs, resolveFindSelectionText } from './find-trigger.util';

/**
 * Binds Ctrl+F to open Find for the resource currently shown in a read-only reference panel (model
 * text, Bible text, or commentary). Searches the displayed resource's project — never the panel's
 * own container project — and does nothing while no resource is resolved. macOS uses Ctrl (not Cmd)
 * to match the Scripture editor.
 *
 * @param webViewId The panel's own web view id, forwarded to the Find command.
 * @param displayedResourceProjectId Project id of the resource currently shown, or `undefined`
 *   while none is resolved (in which case Ctrl+F is a no-op).
 */
export function useOpenFindShortcut(
  webViewId: string | undefined,
  displayedResourceProjectId: string | undefined,
): void {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!event.ctrlKey || event.key.toLowerCase() !== 'f') return;
      // Intercept Ctrl+F like the editor's handler; a panel with no resource resolved then no-ops below.
      event.preventDefault();
      const args = getOpenFindTriggerArgs(
        webViewId,
        displayedResourceProjectId,
        // Panels have no tab menu, so there is no chrome click to survive — only the live selection,
        // trimmed so a double-click's trailing space does not narrow the search.
        resolveFindSelectionText(window.getSelection()?.toString(), undefined),
      );
      if (!args) return;
      papi.commands
        .sendCommand(
          'platformScripture.openFind',
          args.webViewId,
          args.selectedText,
          args.sourceProjectId,
        )
        .catch((e) =>
          logger.warn(`Failed to open Find from reference panel: ${getErrorMessage(e)}`),
        );
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [webViewId, displayedResourceProjectId]);
}

import papi, { logger } from '@papi/frontend';
import { getErrorMessage } from 'platform-bible-utils';
import { useEffect } from 'react';
import { getOpenFindTriggerArgs } from './find-trigger.util';

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
      event.preventDefault();
      const args = getOpenFindTriggerArgs(
        webViewId,
        displayedResourceProjectId,
        window.getSelection()?.toString() ?? '',
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

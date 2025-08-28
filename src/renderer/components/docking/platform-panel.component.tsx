import { PropsWithChildren, useEffect } from 'react';
import { windowService } from '@shared/services/window.service';
import { getErrorMessage } from 'platform-bible-utils';
import { logger } from '@shared/services/logger.service';
import './platform-panel.component.css';

type PlatformPanelProps = PropsWithChildren<{
  /** ID of the tab */
  id: string;
}>;

/**
 * Used for possible styling on every panel in Platform
 *
 * @param children The children of the panel (usually supplied from an extension)
 */
export function PlatformPanel({ id, children }: PlatformPanelProps) {
  // Focus this tab when it is first mounted - doesn't always work perfectly with WebViews, so
  // WebViews also get focused in `web-view.component.tsx`
  useEffect(() => {
    (async () => {
      try {
        await windowService.setFocus({
          focusType: 'tab',
          id,
        });
      } catch (e) {
        logger.warn(`platform-panel failed to set focus on tab ${id}: ${getErrorMessage(e)}`);
      }
    })();
  }, [id]);

  return (
    <div data-tab-id={id} className="platform-panel tw-bg-background">
      {children}
    </div>
  );
}

export default PlatformPanel;

import { useData, useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { floatTab } from '@renderer/services/web-view.service-host';
import { logger } from '@shared/services/logger.service';
import { windowService } from '@shared/services/window.service';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'platform-bible-react';
import { getErrorMessage, isLocalizeKey, isPlatformError, LocalizeKey } from 'platform-bible-utils';
import { useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import './platform-tab-title.component.scss';

type PlatformTabTitleProps = {
  /** Url to image to show on the tab. Defaults to the software's standard logo. */
  iconUrl?: string;
  /** Text to show on the tab */
  text: string | LocalizeKey;
  /** Text to show when hovering over the tab. Defaults to empty string */
  tooltip?: string;
  /**
   * Trigger to make the tab flash. Each time this value changes to a truthy value, it will trigger
   * a new flash animation. Generally pass in `Date.now()`.
   */
  flashTriggerTime?: number;
  /** ID of the tab */
  id: string;
};

// CSS classes for highlighting the active tab header and content
const cssClassTabHeaderHighlight = 'dock-tab-active-highlight';
const cssClassTabContentHighlight = 'dock-tabpane-active-highlight';

/** CSS class for highlighting the focused tab header */
const cssClassTabHeaderWindowFocus = 'dock-tab-window-focus';

// This duration must be ≥ the tabTitleBarFlash animation duration in dock-layout-wrapper.component.scss
const cssHighlightDurationMilliseconds = 3000;

const handleFloatTab = async (tabId: string) => {
  try {
    await floatTab(tabId);
  } catch (error) {
    logger.error(`Failed to float tab ${tabId}: ${getErrorMessage(error)}`);
  }
};

/**
 * Custom tab title for all tabs in Platform
 *
 * @param iconUrl Url to image to show on the tab. Defaults to the software's standard logo.
 * @param text The text to show on the tab title
 * @param tooltip Text to show when hovering over the tab. Defaults to empty string
 * @param flashTriggerTime Trigger to make the tab flash. Each time this value changes to a truthy
 *   value, it will trigger a new flash animation.
 * @param id ID of the tab
 */
export function PlatformTabTitle({
  iconUrl,
  text,
  tooltip,
  flashTriggerTime,
  id,
}: PlatformTabTitleProps) {
  const lastFlashTriggerTimeRef = useRef<number | undefined>(undefined);

  // This ref will always be defined
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const containerRef = useRef<HTMLDivElement>(undefined!);

  const tabAria: LocalizeKey = '%tab_aria_tab%';
  const floatTabKey: LocalizeKey = '%tab_contextMenu_floatTab%';
  const [localizedStrings] = useLocalizedStrings(
    useMemo(
      () => (isLocalizeKey(text) ? [text, tabAria, floatTabKey] : [tabAria, floatTabKey]),
      [text],
    ),
  );
  const title = isLocalizeKey(text) ? localizedStrings[text] : text;
  const tabLabel = localizedStrings[tabAria];
  const floatTabText = localizedStrings[floatTabKey];

  // Handle applying and removing the CSS styles for flashing
  useEffect(() => {
    // We need to walk the DOM to find the right elements to apply flashing styles
    const containerElement = containerRef.current;
    if (!containerElement) return;

    // If no flash trigger time is provided or it hasn't changed, do nothing
    if (!flashTriggerTime || flashTriggerTime === lastFlashTriggerTimeRef.current) return;
    lastFlashTriggerTimeRef.current = flashTriggerTime;

    // Walk up the DOM to the active tab header
    const activeTabHeader = containerElement.closest('.dock-tab-active');
    // Keep walking up to the common ancestor of the active tab header and content
    const rcDockPanel = (activeTabHeader ?? containerElement).closest('.dock-panel');
    // Walk back down to find the active tab content
    const activeTabContent = rcDockPanel?.querySelector('.dock-tabpane-active');

    if (activeTabHeader) activeTabHeader.classList.add(cssClassTabHeaderHighlight);
    if (activeTabContent) activeTabContent.classList.add(cssClassTabContentHighlight);

    const timer = setTimeout(() => {
      if (activeTabHeader) activeTabHeader.classList.remove(cssClassTabHeaderHighlight);
      if (activeTabContent) activeTabContent.classList.remove(cssClassTabContentHighlight);
    }, cssHighlightDurationMilliseconds);

    return () => {
      clearTimeout(timer);
      if (activeTabHeader) activeTabHeader.classList.remove(cssClassTabHeaderHighlight);
      if (activeTabContent) activeTabContent.classList.remove(cssClassTabContentHighlight);
    };
  }, [flashTriggerTime]);

  const [focusSubjectPossiblyError] = useData(windowService.dataProviderName).Focus(
    undefined,
    undefined,
  );

  // Handle applying and removing the CSS styles for this tab being the window's focus
  useEffect(() => {
    if (isPlatformError(focusSubjectPossiblyError)) {
      logger.warn(
        `platform-tab-title window focus came back as error: ${getErrorMessage(focusSubjectPossiblyError)}`,
      );
      return;
    }

    // do nothing if this tab is not focused
    if (
      !focusSubjectPossiblyError ||
      (focusSubjectPossiblyError.focusType !== 'tab' &&
        focusSubjectPossiblyError.focusType !== 'webView') ||
      id !== focusSubjectPossiblyError.id
    )
      return;

    // We need to walk the DOM to find the header to apply window focus styles
    const containerElement = containerRef.current;
    if (!containerElement) return;

    // Walk up the DOM to the active tab header
    const activeTabHeader = containerElement.closest('.dock-tab-active');

    if (!activeTabHeader) return;

    activeTabHeader.classList.add(cssClassTabHeaderWindowFocus);

    return () => {
      activeTabHeader.classList.remove(cssClassTabHeaderWindowFocus);
    };
  }, [focusSubjectPossiblyError, id]);

  const icon = (
    <div
      className="tab-menu-icon"
      style={
        iconUrl
          ? {
              backgroundImage: `url(${iconUrl})`,
            }
          : undefined
      }
    />
  );

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div ref={containerRef} className="title" aria-label={tabLabel}>
                <span>{icon}</span>
                <span>{title}</span>
              </div>
            </TooltipTrigger>
            {tooltip &&
              createPortal(
                <TooltipContent className="tooltip" side="bottom">
                  <p>{tooltip}</p>
                </TooltipContent>,
                document.body,
              )}
          </Tooltip>
        </TooltipProvider>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={() => handleFloatTab(id)}>{floatTabText}</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

export default PlatformTabTitle;

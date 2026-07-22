import { useData, useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { useIsPowerMode } from '@renderer/hooks/use-is-power-mode.hook';
import { useLastFocusedTabId } from '@renderer/hooks/use-last-focused-tab-id.hook';
import { useLastSelectedScriptureNavigableWebViewId } from '@renderer/hooks/use-last-selected-scripture-navigable-web-view-id.hook';
import { floatTab, updateTabPartialSync } from '@renderer/services/web-view.service-host';
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
import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import './platform-tab-title.component.scss';

// Below this measured *column* width (px), every tab in that column hides its title text and
// shows only its icon. Measured against the column, not the tab's own width — see the effect
// below for why. Tuned against Simple mode's default Resources column width (~480px, which
// comfortably fits all 4 tabs' full icon+title content — verified via CDP) so the default layout
// stays in the roomy state; lower this further only if a real narrower case still shows clipped
// text instead of collapsing.
const ICON_ONLY_COLUMN_THRESHOLD_PX = 460;

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
  /**
   * ID of the WebView this tab hosts, if it is a WebView tab (equals the tab ID); `undefined` for
   * non-WebView tabs. Emitted as a `data-web-view-id` attribute to give tests a stable,
   * locale-independent selector.
   */
  webViewId?: string;
};

// CSS classes for highlighting the active tab header and content
const cssClassTabHeaderHighlight = 'platform-dock-tab-active-highlight';
const cssClassTabContentHighlight = 'platform-dock-tabpane-active-highlight';

/** CSS class for highlighting the focused tab header */
const cssClassTabHeaderWindowFocus = 'platform-dock-tab-window-focus';
const cssClassTabContentWindowFocus = 'platform-dock-tabpane-window-focus';

/**
 * CSS class for tinting the tab header of the last-selected web view (the navigation target of the
 * top toolbar's book/chapter/verse controls and navigation commands) while it is also the tab the
 * user most recently focused and focus is outside every tab (PT9 parity)
 */
const cssClassTabHeaderLastSelected = 'platform-dock-tab-last-selected';
/**
 * CSS class for tinting the tab content pane of the last-selected web view while it is also the tab
 * the user most recently focused and focus is outside every tab (PT9 parity)
 */
const cssClassTabContentLastSelected = 'platform-dock-tabpane-last-selected';

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
 * @param webViewId ID of the WebView this tab hosts, if it is a WebView tab; `undefined` otherwise
 */
export function PlatformTabTitle({
  iconUrl,
  text,
  tooltip,
  flashTriggerTime,
  id,
  webViewId,
}: PlatformTabTitleProps) {
  const isPowerMode = useIsPowerMode();

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
      updateTabPartialSync(id, { flashTriggerTime: undefined });
    }, cssHighlightDurationMilliseconds);

    return () => {
      clearTimeout(timer);
      if (activeTabHeader) activeTabHeader.classList.remove(cssClassTabHeaderHighlight);
      if (activeTabContent) activeTabContent.classList.remove(cssClassTabContentHighlight);
    };
  }, [flashTriggerTime, id]);

  const [focusSubjectPossiblyError, setFocusSubject] = useData(
    windowService.dataProviderName,
  ).Focus(undefined, undefined);

  const focusSubject = useMemo(() => {
    if (isPlatformError(focusSubjectPossiblyError)) {
      logger.warn(
        `platform-tab-title window focus came back as error: ${getErrorMessage(focusSubjectPossiblyError)}`,
      );
      return undefined;
    }
    return focusSubjectPossiblyError;
  }, [focusSubjectPossiblyError]);

  const lastSelectedScriptureNavigableWebViewId = useLastSelectedScriptureNavigableWebViewId();
  const lastFocusedTabId = useLastFocusedTabId();
  // The last-selected tint is a Power-mode-only affordance. In Simple mode the toolbar is the single
  // navigation point and every scripture view follows the same scroll group, so there is no "which
  // tab does the toolbar target" question to answer — the tint would only add confusion there.

  // Attach a click listener to the tab to focus this tab. Unfortunately rc-dock doesn't expose
  // rc-tabs onTabClick https://github.com/fis-components/rc-tabs/tree/master?tab=readme-ov-file#props
  // in its use of Tabs https://github.com/ticlo/rc-dock/blob/master/src/DockTabs.tsx#L347
  useEffect(() => {
    // We need to walk the DOM to find the tab button to attach the click listener
    const containerElement = containerRef.current;
    if (!containerElement || !setFocusSubject) return;

    // Walk up the DOM to the tab button
    const tabButton = containerElement.closest('.dock-tab-btn');
    if (!tabButton) return;

    const handleClick = async () => {
      try {
        await setFocusSubject({
          focusType: 'tab',
          id,
        });
      } catch (e) {
        logger.warn(
          `platform-tab-title on tab button click failed to set focus on tab ${id}: ${getErrorMessage(e)}`,
        );
      }
    };

    tabButton.addEventListener('click', handleClick, { passive: true });

    return () => {
      tabButton.removeEventListener('click', handleClick);
    };
  }, [setFocusSubject, id]);

  // Handle applying and removing the CSS styles for this tab being the window's focus
  useEffect(() => {
    // do nothing if this tab is not focused
    if (
      !focusSubject ||
      (focusSubject.focusType !== 'tab' && focusSubject.focusType !== 'webView') ||
      id !== focusSubject.id
    )
      return;

    // We need to walk the DOM to find the header to apply window focus styles
    const containerElement = containerRef.current;
    if (!containerElement) return;

    // Walk up the DOM to the active tab header
    const activeTabHeader = containerElement.closest('.dock-tab-active');
    // Keep walking up to the common ancestor of the active tab header and content
    const rcDockPanel = (activeTabHeader ?? containerElement).closest('.dock-panel');
    // Walk back down to find the active tab content
    const activeTabContent = rcDockPanel?.querySelector('.dock-tabpane-active');

    if (activeTabHeader) activeTabHeader.classList.add(cssClassTabHeaderWindowFocus);
    if (activeTabContent) activeTabContent.classList.add(cssClassTabContentWindowFocus);

    return () => {
      if (activeTabHeader) activeTabHeader.classList.remove(cssClassTabHeaderWindowFocus);
      if (activeTabContent) activeTabContent.classList.remove(cssClassTabContentWindowFocus);
    };
  }, [focusSubject, id]);

  // Handle applying and removing the CSS style that tints this tab's header when it is the
  // last-selected scripture-navigable web view, it was also the tab the user was most recently in,
  // and focus is currently outside every tab (PT9 parity).
  //
  // POWER MODE ONLY: this tint disambiguates which of several independently-navigable tabs the top
  // toolbar/commands are driving. Simple mode has a single navigation point (the toolbar) and forces
  // every scripture view onto one scroll group (the navigation target is pinned to the main editor),
  // so there is nothing to disambiguate and the tint is suppressed (see `isPowerMode`).
  //
  // Restricting the tint to focus-outside-all-tabs - rather than merely "not this tab" - avoids two
  // tabs being visually marked at once: whenever any tab or web view is focused, that tab's own focus
  // highlight is the only marker, and the tint reappears only once focus leaves all tabs (e.g. to a
  // toolbar control or dialog). Additionally requiring this tab to be the last FOCUSED tab keeps the
  // tint off when the user visited some other (e.g. non-navigable) tab in between: the tracked web
  // view keeps driving navigation, but the tab the user was last in was a different one, so tinting
  // this one would wrongly suggest the user just came from it.
  useEffect(() => {
    const isFocusOnATabOrWebView =
      !!focusSubject && (focusSubject.focusType === 'tab' || focusSubject.focusType === 'webView');

    // do nothing in Simple mode (the tint is Power-only), or if this tab is not the last-selected
    // navigable tab, was not the last focused tab, or if focus is on any tab or web view
    if (
      !isPowerMode ||
      id !== lastSelectedScriptureNavigableWebViewId ||
      id !== lastFocusedTabId ||
      isFocusOnATabOrWebView
    )
      return;

    // We need to walk the DOM to find the header and content to apply the last-selected style
    const containerElement = containerRef.current;
    if (!containerElement) return;

    // Walk up the DOM to the active tab header. If this tab is not the front (active) tab in its
    // panel, do nothing at all - falling back to walking up from the container would find the
    // panel's `.dock-tabpane-active` belonging to a SIBLING tab and wrongly tint that pane
    const activeTabHeader = containerElement.closest('.dock-tab-active');
    if (!activeTabHeader) return;

    // Keep walking up to the common ancestor of the active tab header and content
    const rcDockPanel = activeTabHeader.closest('.dock-panel');
    // Walk back down to find the active tab content
    const activeTabContent = rcDockPanel?.querySelector('.dock-tabpane-active');

    activeTabHeader.classList.add(cssClassTabHeaderLastSelected);
    if (activeTabContent) activeTabContent.classList.add(cssClassTabContentLastSelected);

    return () => {
      activeTabHeader.classList.remove(cssClassTabHeaderLastSelected);
      if (activeTabContent) activeTabContent.classList.remove(cssClassTabContentLastSelected);
    };
  }, [focusSubject, id, lastSelectedScriptureNavigableWebViewId, lastFocusedTabId, isPowerMode]);

  // rc-dock's DragDropDiv skips drag-start entirely when the pointerdown's native target carries
  // this class (see `onPointerDown` in `node_modules/rc-dock/es/dragdrop/DragDropDiv.js`) — the
  // library's own supported way to make part of a draggable tab non-draggable. Simple mode's
  // Resources column keeps a visible, clickable tab bar (unlike the headless Home/Editor columns),
  // so its tabs need this to block same-column drag-to-reorder. `tabLocked` (set on the tab group)
  // only blocks drag-to-create-new-panel, not drag-to-reorder within a group — see the group
  // config comment in platform-dock-layout-positioning.util.ts. Applied to the icon/title spans,
  // the icon's own inner div, and the wrapping div, because rc-dock checks only the exact
  // pointerdown target, not its ancestors, so any inner element the pointer might land on also
  // needs the marker — including `.tab-menu-icon` itself, which fills its wrapping span and is the
  // deepest element under the pointer when a tab shows an icon (verified via manual CDP-driven
  // drag reproduction: without this, dragging a tab by its icon graphic was not blocked even
  // though the wrapping span carried the class).
  const dragIgnoreClass = isPowerMode ? '' : ' drag-ignore';

  // Simple mode only: hide the title text once the enclosing COLUMN narrows below
  // ICON_ONLY_COLUMN_THRESHOLD_PX. This measures the column (`.dock-panel`), not this tab's own
  // rendered width — two things were tried first and both failed:
  //
  // 1. A CSS `@container` query on this tab's own width: `container-type: inline-size` gives the
  //    queried element size containment, making its OWN intrinsic size ~0 to break the query's
  //    circular dependency on its own size. rc-dock's tab bar is entirely content-driven
  //    (`flex-basis: auto`/`max-content`) all the way up its ancestor chain, so that containment
  //    corrupted every ancestor relying on this tab's real content width — tabs collapsed to their
  //    minimum floor unconditionally, regardless of how much room was actually available.
  // 2. A ResizeObserver on this tab's own rendered width (no container-type): rc-dock's tab bar
  //    turned out not to be a simple "shrink tabs to fit" flex layout at all — `.dock-nav-list`
  //    (the tabs' direct flex container) never gets width-constrained by its wrapper; it just
  //    renders every tab at full natural size and either lets the wrapper clip/scroll the overflow
  //    or moves excess tabs into rc-dock's own "more" dropdown, based on its own JS measurement of
  //    each tab's full (never-shrunk) width. So a tab's OWN rendered width never actually drops
  //    below any shrink threshold — confirmed via CDP: tabs sat at their full content width no
  //    matter how narrow the column got, right up until rc-dock moved some of them into the
  //    dropdown instead.
  //
  // Measuring the COLUMN's width directly sidesteps both problems: it reflects the divider
  // position exactly (no dependency on the tab bar's internal clip/scroll/dropdown mechanics), and
  // toggling icon-only BEFORE rc-dock measures the tabs means rc-dock's own dropdown only has to
  // engage once even icon-only tabs don't fit — matching the original "rc-dock's overflow dropdown
  // remains the floor" design intent.
  const [isIconOnly, setIsIconOnly] = useState(false);
  useEffect(() => {
    if (isPowerMode) return undefined;
    const element = containerRef.current;
    if (!element) return undefined;
    const panel = element.closest('.dock-panel');
    if (!panel) return undefined;
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      setIsIconOnly(entry.contentRect.width < ICON_ONLY_COLUMN_THRESHOLD_PX);
    });
    observer.observe(panel);
    return () => observer.disconnect();
  }, [isPowerMode]);

  const iconOnlyClass = isIconOnly ? ' icon-only' : '';

  const icon = (
    <div
      className={`tab-menu-icon${dragIgnoreClass}`}
      style={
        iconUrl
          ? {
              backgroundImage: `url(${iconUrl})`,
            }
          : undefined
      }
    />
  );

  const titleWithTooltip = (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            ref={containerRef}
            className={`platform-tab-title${dragIgnoreClass}${iconOnlyClass}`}
            aria-label={tabLabel}
            data-web-view-id={webViewId}
          >
            <span className={dragIgnoreClass.trim()}>{icon}</span>
            <span className={`platform-tab-title-text ${dragIgnoreClass.trim()}`.trim()}>
              {title}
            </span>
          </div>
        </TooltipTrigger>
        {tooltip &&
          createPortal(
            <TooltipContent className="platform-tab-tooltip" side="bottom">
              <p>{tooltip}</p>
            </TooltipContent>,
            document.body,
          )}
      </Tooltip>
    </TooltipProvider>
  );

  // Simple mode: skip the context menu entirely. Its only item is "Float Tab", which is already a
  // no-op because the group config has floatable: false. Removing the menu prevents a dead option
  // from being shown.
  if (!isPowerMode) return titleWithTooltip;

  return (
    <ContextMenu>
      <ContextMenuTrigger>{titleWithTooltip}</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={() => handleFloatTab(id)}>{floatTabText}</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

export default PlatformTabTitle;

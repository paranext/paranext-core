import { useData, useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { useIsPowerMode } from '@renderer/hooks/use-is-power-mode.hook';
import { useLastFocusedTabId } from '@renderer/hooks/use-last-focused-tab-id.hook';
import { useLastSelectedScriptureNavigableWebViewId } from '@renderer/hooks/use-last-selected-scripture-navigable-web-view-id.hook';
import {
  floatTab,
  getOpenTabCountSync,
  updateTabPartialSync,
} from '@renderer/services/web-view.service-shard';
import {
  buildTabMenuItems,
  FLOAT_TAB_COMMAND,
  getMoveTargetWindowId,
  MOVE_TO_NEW_WINDOW_COMMAND,
  type TabMenuContext,
} from '@renderer/components/docking/tab-menu.util';
import { EMPTY_WINDOW_LABEL_KEY } from '@renderer/components/docking/window-label.util';
import type { OverlayContextMenuItem } from '@renderer/components/overlays/overlay-context-menu.component';
import { menuDataService } from '@shared/services/menu-data.service';
import type { WindowSummary } from '@shared/services/window.service-model';
import { handleMenuCommand } from '@shared/data/platform-bible-menu.commands';
import { convertContributionToContextMenuItems } from '@renderer/services/overlays/overlay-menu-converter';
import {
  getWebViewMoveFailureDisposition,
  WebViewMoveFailureDisposition,
} from '@shared/models/web-view-move.model';
import { WebViewId } from '@shared/models/web-view.model';
import { sendCommand } from '@shared/services/command.service';
import { logger } from '@shared/services/logger.service';
import { notificationService } from '@shared/services/notification.service';
import { windowService } from '@shared/services/window.service';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'platform-bible-react';
import { getErrorMessage, isLocalizeKey, isPlatformError, LocalizeKey } from 'platform-bible-utils';
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import './platform-tab-title.component.scss';

// Fixed chrome around the tab bar within its enclosing `.dock-panel` column — specifically
// `.dock-nav-wrap`'s own inline padding and the project-menu hamburger button's own width/margin,
// which sit outside `.dock-nav-list` entirely (NOT the per-tab `.drag-initiator` padding or the
// gaps between tabs — those scale with tab count and are measured live instead; see the effect
// below). Unlike tab labels, this doesn't depend on locale, tab count, or label length, so a small
// constant here (rather than deriving it live) is safe. Measured via CDP as the residual gap
// between `.dock-panel`'s width and the tab bar's real full-size content need (icon+title clones'
// widths, plus their own drag-initiator padding, plus inter-tab gaps) once those per-tab-scaling
// parts are already accounted for separately. Re-measure only if this specific wrap-level chrome
// changes (e.g. the hamburger icon's size/margin or `.dock-nav-wrap`'s own padding), not if a
// Column 3 tab's label, count, or per-tab padding changes — those adapt on their own.
const TAB_BAR_CHROME_OVERHEAD_PX = 40;

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
  /**
   * Type of the WebView this tab hosts, used to look up the menu contributed for it. `undefined`
   * for tabs hosting no WebView, which are answered with the platform's own tab menu.
   */
  webViewType?: string;
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

/** A tab menu with nothing in it, for a tab whose menu has not loaded or failed to */
const EMPTY_TAB_MENU = Object.freeze({ groups: {}, items: [] });

/** What `useData` shows while the contributed menu is still loading */
const TAB_MENU_DEFAULT = Object.freeze({
  includeDefaults: false,
  topMenu: undefined,
  contextMenu: undefined,
  tabMenu: undefined,
});

/** Render converted menu items into the context-menu primitives, submenus and all */
function renderTabMenuItems(
  items: OverlayContextMenuItem[],
  onSelect: (itemId: string) => void,
  keyPrefix = '',
): ReactNode[] {
  return items.map((item, index) => {
    const key = `${keyPrefix}${index}`;
    if (item.type === 'separator') return <ContextMenuSeparator key={key} />;
    if (item.type === 'submenu')
      return (
        <ContextMenuSub key={key}>
          <ContextMenuSubTrigger>{item.label}</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            {renderTabMenuItems(item.items, onSelect, `${key}-`)}
          </ContextMenuSubContent>
        </ContextMenuSub>
      );
    return (
      <ContextMenuItem key={key} onClick={() => onSelect(item.id)}>
        {item.label}
      </ContextMenuItem>
    );
  });
}

const handleFloatTab = async (tabId: string) => {
  try {
    await floatTab(tabId);
  } catch (error) {
    logger.error(`Failed to float tab ${tabId}: ${getErrorMessage(error)}`);
  }
};

/**
 * What the user is told for each way a failed move can have left the tab. A move that did not do
 * what was asked leaves the tab in very different places, and "could not move it" is only true of
 * one of them: the tab that ended up in a window nobody chose DID move, and the tab that nothing
 * could reopen is not on screen at all — telling its owner the action merely failed sends them
 * looking for a tab that is gone.
 *
 * Keyed by the disposition rather than mapped inline so that adding one to
 * {@link WebViewMoveFailureDisposition} fails to compile here until it has copy of its own.
 */
const MOVE_FAILURE_MESSAGE_KEYS: Record<WebViewMoveFailureDisposition, LocalizeKey> = {
  'reopened-in-source-window': '%tab_contextMenu_moveTab_failed%',
  'reopened-in-focused-window': '%tab_contextMenu_moveTab_failedReopenedElsewhere%',
  'not-reopened': '%tab_contextMenu_moveTab_failedNotReopened%',
  'possibly-closed': '%tab_contextMenu_moveTab_failedMayHaveClosed%',
};

/**
 * What a failure that named no disposition is reported as. Those are the failures decided before
 * the move touches the tab at all — an unknown window, a target on its way out, a mode that could
 * not be read — so nothing about where the tab lives has changed. A failure from a step that does
 * touch the tab names where it left it, including when that answer is "it may be gone".
 */
const MOVE_FAILURE_DEFAULT_MESSAGE_KEY: LocalizeKey = '%tab_contextMenu_moveTab_failed%';

/**
 * Tell the user where a failed move left the tab, since the rejection is the only signal that it is
 * not where they asked. Shared by both move actions: the dispositions describe where the tab ended
 * up, which does not depend on where it was headed.
 */
const reportMoveFailure = async (webViewIdToMove: WebViewId, error: unknown) => {
  const disposition = getWebViewMoveFailureDisposition(error);
  try {
    await notificationService.send({
      message: disposition
        ? MOVE_FAILURE_MESSAGE_KEYS[disposition]
        : MOVE_FAILURE_DEFAULT_MESSAGE_KEY,
      severity: 'error',
    });
  } catch (notificationError) {
    logger.warn(
      `Could not notify the user that moving web view ${webViewIdToMove} failed: ${getErrorMessage(notificationError)}`,
    );
  }
};

const handleMoveTabToWindow = async (webViewIdToMove: WebViewId, targetWindowId: number) => {
  try {
    await sendCommand('platform.moveWebViewToWindow', webViewIdToMove, targetWindowId);
  } catch (error) {
    logger.error(
      `Failed to move web view ${webViewIdToMove} to window ${targetWindowId}: ${getErrorMessage(error)}`,
    );
    await reportMoveFailure(webViewIdToMove, error);
  }
};

const handleMoveTabToNewWindow = async (webViewIdToMove: WebViewId) => {
  try {
    await sendCommand('platform.moveWebViewToNewWindow', webViewIdToMove);
  } catch (error) {
    logger.error(
      `Failed to move web view ${webViewIdToMove} to a new window: ${getErrorMessage(error)}`,
    );
    // This menu item is a user action, and the move's rejection is the only signal that the tab is
    // not where they asked, so the failure has to reach the user and not only the log — saying
    // which failure it was, because each one calls for a different reaction
    await reportMoveFailure(webViewIdToMove, error);
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
  webViewType,
}: PlatformTabTitleProps) {
  const isPowerMode = useIsPowerMode();

  const lastFlashTriggerTimeRef = useRef<number | undefined>(undefined);

  // This ref will always be defined
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const containerRef = useRef<HTMLDivElement>(undefined!);

  const tabAria: LocalizeKey = '%tab_aria_tab%';
  const [localizedStrings] = useLocalizedStrings(
    useMemo(
      () =>
        isLocalizeKey(text)
          ? [text, tabAria, EMPTY_WINDOW_LABEL_KEY]
          : [tabAria, EMPTY_WINDOW_LABEL_KEY],
      [text],
    ),
  );
  const title = isLocalizeKey(text) ? localizedStrings[text] : text;
  const tabLabel = localizedStrings[tabAria];
  const emptyWindowLabel = localizedStrings[EMPTY_WINDOW_LABEL_KEY];

  // Every tab has a tab menu. One hosting no web view has no type to look a contributed menu up by,
  // and the data provider answers an unrecognized name with the platform's own items
  const [webViewMenuPossiblyError] = useData(menuDataService.dataProviderName).WebViewMenu(
    // Assume the web view type is correctly formatted; it has already been checked where it is set
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    (webViewType as `${string}.${string}`) ?? 'platform.tab',
    TAB_MENU_DEFAULT,
  );

  /**
   * What this tab can currently do, read when the menu opens rather than subscribed to. The menu
   * needs it at that moment and never again, and the window names are already kept current as
   * window titles.
   *
   * Read on open rather than during render because both halves are expensive to establish: the
   * window list is a round trip to the main process, and counting this window's tabs walks the
   * whole dock layout. Neither belongs in the render of every tab title on every layout change.
   *
   * Deliberately kept when the menu closes, so every open after the first renders the last known
   * targets straight away and refreshes them behind the menu. Only the first open of a given tab's
   * menu has nothing to show, and the move-to-window submenu appears there once the read lands.
   *
   * Not covered by a placeholder on purpose. Showing a disabled "loading" entry would keep the
   * item's position stable when there ARE other windows, but it would put an entry on screen and
   * then take it away again in the single-window case, where today nothing appears at all — trading
   * a smaller flicker for a worse one. Keeping the item permanently and disabling it instead would
   * contradict hiding actions that would be no-ops, which is the rule the rest of this menu
   * follows.
   */
  const [menuTargets, setMenuTargets] = useState<{
    otherWindows: WindowSummary[];
    isOnlyTabInSecondaryWindow: boolean;
  }>({ otherWindows: [], isOnlyTabInSecondaryWindow: false });

  /**
   * Identifies the most recent call to {@link handleMenuOpenChange}, so a round trip that resolves
   * after a newer call was already made does not overwrite what the newer call found. The same
   * newest-wins shape `window-label.util.ts` keeps for its own async label resolution, adapted to a
   * ref because this guard is per tab instance rather than module-wide.
   */
  const latestMenuOpenRequestRef = useRef<symbol | undefined>(undefined);

  const handleMenuOpenChange = async (isOpen: boolean) => {
    if (!isOpen) return;

    // Every call here passes the same `true`, so there is no resolved value of its own to compare
    // against later the way `window-label.util.ts` compares its resolved label — a token stands in
    // for that, identifying this call so a round trip that lands after a newer one was already
    // asked for can tell it is stale and not overwrite what the newer one found.
    const thisMenuOpenRequest = Symbol('menu-open-request');
    latestMenuOpenRequestRef.current = thisMenuOpenRequest;

    let windows: WindowSummary[];
    try {
      windows = await sendCommand('platform.getWindows');
    } catch (error) {
      // Leave the target list empty, which hides the submenu rather than offering an empty one. An
      // empty list would read as "there are no other windows", which is a different claim
      logger.warn(`Could not read the open windows for the tab menu: ${getErrorMessage(error)}`);
      if (latestMenuOpenRequestRef.current === thisMenuOpenRequest)
        setMenuTargets({ otherWindows: [], isOnlyTabInSecondaryWindow: false });
      return;
    }

    const otherWindows = windows.filter((window) => `${window.windowId}` !== globalThis.windowId);
    const isThisWindowSecondary = !windows.some(
      (window) => `${window.windowId}` === globalThis.windowId && window.isMain,
    );

    // Counting this window's tabs is guarded separately because it can fail for reasons that say
    // nothing about the windows — it throws before the dock layout registers. Folding it into the
    // read above would throw away a window list that arrived perfectly well, and report the failure
    // as one the open windows could not be read.
    //
    // Moving the only web view out of a window that is not the primary one empties that window only
    // when nothing else is left behind — a window still holding a dialog, an error tab, or any other
    // non-web-view tab is not emptied by the move. Counting every tab, not just web views, is what
    // tells the two cases apart; an actually-empty window would build an identical one and lose this
    // one, which is the no-op Paratext 9 hides its float item for.
    let isOnlyTabInSecondaryWindow = false;
    try {
      isOnlyTabInSecondaryWindow = isThisWindowSecondary && getOpenTabCountSync() <= 1;
    } catch (error) {
      // Offering the action is the safe way to be wrong: at worst the user makes a window they did
      // not want, which they can close
      logger.warn(`Could not count this window's tabs for the tab menu: ${getErrorMessage(error)}`);
    }

    if (latestMenuOpenRequestRef.current === thisMenuOpenRequest)
      setMenuTargets({ otherWindows, isOnlyTabInSecondaryWindow });
  };

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

  // Give this menu a keyboard path. rc-tabs renders every tab as a focusable `role="tab"` element
  // with the title inside it, and the context-menu trigger sets no tabIndex — so pressing Shift+F10
  // or the Menu key on a focused tab fires `contextmenu` at the tab and it bubbles UP, past the
  // trigger, opening nothing. Forwarding that event to an element INSIDE the trigger sends it back
  // through the trigger on its way up, which is what opens the menu.
  //
  // This is the whole keyboard story for the tab menu: every item in it becomes reachable at once,
  // including ones an extension contributes, rather than only the ones given their own shortcut.
  useEffect(() => {
    if (!isPowerMode) return undefined;
    const containerElement = containerRef.current;
    const tabElement = containerElement?.closest('[role="tab"]');
    if (!containerElement || !tabElement) return undefined;

    const forwardToTrigger = (event: Event) => {
      // Anything raised inside the trigger already reaches it by bubbling, so leave it alone: every
      // ordinary right-click on the tab's title, and the forwarded event below on its way back up,
      // whose target is the element it was dispatched on
      if (event.target instanceof Node && containerElement.contains(event.target)) return;

      event.preventDefault();
      // Carry the position across so the menu opens where the event said, which for a keyboard
      // press is the focused tab rather than wherever the pointer happens to rest
      const { clientX, clientY } = event instanceof MouseEvent ? event : { clientX: 0, clientY: 0 };
      containerElement.dispatchEvent(
        new MouseEvent('contextmenu', { bubbles: true, cancelable: true, clientX, clientY }),
      );
    };

    tabElement.addEventListener('contextmenu', forwardToTrigger);
    return () => tabElement.removeEventListener('contextmenu', forwardToTrigger);
  }, [isPowerMode]);

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

  // Simple mode only: hide the title text once the tab bar's own full content (icon+title for
  // every tab in this column) would no longer fit the available space. Deliberately NOT a single
  // hardcoded pixel threshold for the whole comparison — an earlier version compared the column
  // width against a constant tuned for the current 4 Column 3 tabs' current English labels, which
  // was wrong THE FIRST TIME it was tuned (guessed rather than measured, so tabs clipped well
  // before it ever triggered) and would go wrong AGAIN the moment a label changed, a tab was
  // added/removed, or the UI ran in a different locale with longer/shorter words. The
  // content-dependent part of the comparison below is measured live instead, so it adapts
  // automatically to all of that; only a small, content-INdependent layout constant remains (see
  // TAB_BAR_CHROME_OVERHEAD_PX below).
  //
  // Measures the enclosing `.dock-panel` (the column) for available width — NOT `.dock-nav-wrap`
  // (tried first; see why it fails below), and NOT this tab's own width (tried before that; see
  // why that fails further below).
  //
  // "How wide would the tab bar be if every tab showed its title" is read from each sibling tab's
  // `.platform-tab-title-measure` clone (see platform-tab-title.component.scss) — an
  // always-rendered, invisible, `position: absolute` copy of this tab's own icon+title at full
  // size, decoupled from whether THIS tab is currently collapsed. Summing every sibling clone's
  // width (they all live under the same `.dock-panel`) gives the tab bar's true current full-size
  // need, live, with no caching required.
  //
  // A cached "last full measurement" was tried first instead of these clones — reusing the visible
  // `.dock-nav-list`'s own scrollWidth while not-yet-collapsed, since once collapsed its hidden
  // title text shrinks that scrollWidth (reading it live at that point would make the tab bar look
  // like it always "fits" and immediately, wrongly, re-expand). That failed for a different reason:
  // confirmed via CDP that the very first "not collapsed" measurement can land during a bootstrap
  // race — e.g. while a sibling tab's web view is still showing its "Unknown" loading placeholder,
  // or before its label has finished resolving — permanently caching a wrong width (since caching
  // only updates while not-yet-collapsed, a bad cache taken right before collapsing can never
  // self-correct). The always-live clones have no such race: they reflect whatever `title` a tab
  // currently holds, resolved or not, every time.
  //
  // Three things were tried for "available width" before landing on `.dock-panel`:
  //
  // 1. A CSS `@container` query on this tab's own width: `container-type: inline-size` gives the
  //    queried element size containment, making its OWN intrinsic size ~0 to break the query's
  //    circular dependency on its own size. rc-dock's tab bar is entirely content-driven
  //    (`flex-basis: auto`/`max-content`) all the way up its ancestor chain, so that containment
  //    corrupted every ancestor relying on this tab's real content width — tabs collapsed to their
  //    minimum floor unconditionally, regardless of how much room was actually available.
  // 2. A ResizeObserver on this tab's own rendered width (no container-type): rc-dock's tab bar
  //    turned out not to be a simple "shrink tabs to fit" flex layout at all — `.dock-nav-list`
  //    never gets width-constrained by its wrapper; it just renders every tab at full natural size
  //    and either lets the wrapper clip the overflow or moves excess tabs into rc-dock's own "more"
  //    dropdown, based on its own JS measurement of each tab's full (never-shrunk) width. So a
  //    tab's OWN rendered width never actually drops below any shrink threshold — confirmed via
  //    CDP: tabs sat at their full content width no matter how narrow the column got, right up
  //    until rc-dock moved some of them into the dropdown instead.
  // 3. A ResizeObserver on `.dock-nav-wrap` (the element whose `overflow-x: clip` actually does the
  //    clipping) instead of `.dock-panel`, on the theory that its own rendered width IS the
  //    available space. It has `flex-grow: 0` (rc-dock's own CSS: `.dock-nav-wrap { order: 1;
  //    flex-grow: 0; }`, with a `flex-grow: 1` sibling `.dock-nav-operations` absorbing all leftover
  //    space) — so it only shrinks to less than its own content's natural size while genuinely
  //    being flex-squeezed (not enough total room for the whole `.dock-nav` row), and otherwise just
  //    settles to "however big my current content is." Confirmed via CDP: once collapsed to
  //    icon-only (or once comfortably fitting), `.dock-nav-wrap`'s clientWidth got stuck reporting
  //    its own small content size and never grew even when the column was widened dramatically
  //    (tested up to a 3000px window) — useless for detecting "is there now enough room to
  //    re-expand." `.dock-panel` doesn't have this problem: it's the actual resizable column,
  //    confirmed (both here and by the earlier hardcoded-threshold version) to track the true
  //    available width correctly in both directions.
  const [isIconOnly, setIsIconOnly] = useState(false);
  useEffect(() => {
    // `isPowerMode` is a live subscription, so this effect re-runs on a runtime Simple->Power
    // switch — reset the stale Simple-mode value rather than just skipping setup, since both modes
    // render the tab title through the same code path that applies the icon-only class/aria-label.
    if (isPowerMode) {
      setIsIconOnly(false);
      return undefined;
    }
    const element = containerRef.current;
    if (!element) return undefined;
    const panel = element.closest('.dock-panel');
    if (!panel) return undefined;
    const recomputeIsIconOnly = () => {
      const measureClones = panel.querySelectorAll('.platform-tab-title-measure');
      const fullContentWidth = Array.from(measureClones).reduce(
        (total, clone) => total + clone.getBoundingClientRect().width,
        0,
      );
      // The gap the tab bar's own flex container puts between sibling tabs isn't part of any one
      // tab's own measured width, so it isn't captured by summing the clones above — read it live
      // from `.dock-nav-list`'s own CSS instead of hardcoding it, so it can't drift out of sync
      // with that stylesheet.
      const navList = panel.querySelector('.dock-nav-list');
      const interTabGapPx = navList ? parseFloat(getComputedStyle(navList).columnGap) || 0 : 0;
      const interTabGapsTotal = Math.max(0, measureClones.length - 1) * interTabGapPx;
      const neededWidth = fullContentWidth + interTabGapsTotal + TAB_BAR_CHROME_OVERHEAD_PX;
      setIsIconOnly(neededWidth > panel.getBoundingClientRect().width);
    };
    const resizeObserver = new ResizeObserver(recomputeIsIconOnly);
    resizeObserver.observe(panel);
    // A panel resize isn't the only thing that can change the tab bar's full-size content need —
    // a sibling tab's title resolving from a loading placeholder to its real text (or a tab
    // being added/removed) changes it too, with the panel itself staying the same size. Since
    // this tab's own React props don't change when a SIBLING's title resolves, a MutationObserver
    // on the whole panel (not just this tab's own DOM) is what catches that.
    const mutationObserver = new MutationObserver(recomputeIsIconOnly);
    mutationObserver.observe(panel, { childList: true, characterData: true, subtree: true });
    recomputeIsIconOnly();
    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
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
            // Icon-only tabs hide the only visible differentiator between tabs (the title text), so
            // fall back to the resolved title itself rather than the generic "Tab" label — otherwise
            // a screen reader announces every icon-only tab in this column identically.
            aria-label={isIconOnly ? title : tabLabel}
            data-web-view-id={webViewId}
          >
            <span className={dragIgnoreClass.trim()}>{icon}</span>
            <span className={`platform-tab-title-text ${dragIgnoreClass.trim()}`.trim()}>
              {title}
            </span>
            {/* Always-rendered, invisible full-size measurement clone — see the icon-only-density
                effect above for why this is measured instead of the visible (possibly collapsed)
                content. Not shown or reachable: aria-hidden and outside all interactive classes.
                Wrapped in its own `.drag-initiator` (a new element, not rc-dock's real one around
                this tab) so it picks up the SAME per-tab padding a real tab gets from that class —
                still nested under the real `.dock-tab`/`.dock-panel` ancestors this component
                renders inside, which is what the CSS selectors for that padding key off of. */}
            {!isPowerMode && (
              <div className="platform-tab-title-measure" aria-hidden="true">
                <div className="drag-initiator">
                  {icon}
                  <span>{title}</span>
                </div>
              </div>
            )}
          </div>
        </TooltipTrigger>
        {/* Suppress a tooltip that would only repeat the already-visible title — several callers
            (e.g. Column 3 resource tabs) pass a tooltip that mirrors `text` unconditionally, which
            is only non-redundant once the tab is collapsed to icon-only and the title text is
            hidden. A tooltip that differs from the title (conveying something extra) still shows
            regardless of collapse state. */}
        {tooltip &&
          (isIconOnly || tooltip !== title) &&
          createPortal(
            <TooltipContent className="platform-tab-tooltip" side="bottom">
              <p>{tooltip}</p>
            </TooltipContent>,
            document.body,
          )}
      </Tooltip>
    </TooltipProvider>
  );

  // Simple mode: skip the tab menu entirely. Every item it offers is either a no-op here (floating
  // is off, since the group config has floatable: false) or reaches a second window, which Simple
  // mode does not have. Removing the menu prevents dead options from being shown.
  if (!isPowerMode) return titleWithTooltip;

  const menuContext: TabMenuContext = {
    webViewId,
    ...menuTargets,
  };

  const contributedItems = isPlatformError(webViewMenuPossiblyError)
    ? []
    : convertContributionToContextMenuItems(webViewMenuPossiblyError.tabMenu ?? EMPTY_TAB_MENU);

  const handleSelect = (itemId: string) => {
    if (itemId === FLOAT_TAB_COMMAND) {
      handleFloatTab(id);
      return;
    }
    if (itemId === MOVE_TO_NEW_WINDOW_COMMAND) {
      if (webViewId) handleMoveTabToNewWindow(webViewId);
      return;
    }
    const targetWindowId = getMoveTargetWindowId(itemId);
    if (targetWindowId !== undefined) {
      if (webViewId) handleMoveTabToWindow(webViewId, targetWindowId);
      return;
    }
    // Anything else is an extension's own item, run the way every other contributed menu runs it
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    handleMenuCommand({ command: itemId } as Parameters<typeof handleMenuCommand>[0], id);
  };

  return (
    <ContextMenu onOpenChange={handleMenuOpenChange}>
      <ContextMenuTrigger>{titleWithTooltip}</ContextMenuTrigger>
      <ContextMenuContent>
        {renderTabMenuItems(
          buildTabMenuItems(contributedItems, menuContext, emptyWindowLabel),
          handleSelect,
        )}
      </ContextMenuContent>
    </ContextMenu>
  );
}

export default PlatformTabTitle;

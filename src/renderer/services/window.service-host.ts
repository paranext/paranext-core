import {
  WindowDataTypes,
  IWindowService,
  windowServiceObjectToProxy,
  windowServiceProviderName,
  FocusSubject,
  FocusSubjectOther,
  SetFocusSpecifier,
  FocusSubjectWebView,
  FocusSubjectTab,
} from '@shared/services/window.service-model';
import { dataProviderService } from '@shared/services/data-provider.service';
import { DataProviderEngine, IDataProviderEngine } from '@shared/models/data-provider-engine.model';
import { DataProviderUpdateInstructions } from '@shared/models/data-provider.model';
import {
  createSyncProxyForAsyncObject,
  Unsubscriber,
  deepEqual,
  getErrorMessage,
  debounce,
  PlatformEventEmitter,
} from 'platform-bible-utils';
import {
  getDockLayout,
  getSavedWebViewDefinitionSync,
  onDidCloseWebView,
} from '@renderer/services/web-view.service-host';
import { isDirectionFromTab, TAB_TYPE_WEBVIEW } from '@shared/models/docking-framework.model';
import { WebViewId } from '@shared/models/web-view.model';
import { logger } from '@shared/services/logger.service';

const FOCUS_SUBJECT_OTHER: FocusSubjectOther = Object.freeze({
  focusType: 'other',
});

/**
 * Focus of the app window is somewhere not in a tab (app menu, app toolbar, etc.).
 *
 * This contains the exact element that is being focused. It is a helper internally for this file
 * only. It helps with determining when "other" focus subject changes
 */
type FocusSubjectElement = {
  focusType: 'element';
  element: Element;
};

/**
 * The web view the user most recently selected (focused). Retained when focus moves to something
 * that is not a web view (the toolbar, a dialog, nothing) so top-toolbar navigation keeps targeting
 * the tab the user was just working in. Cleared when that web view closes.
 */
let lastSelectedWebViewId: WebViewId | undefined;

const onDidChangeLastSelectedWebViewIdEmitter = new PlatformEventEmitter<WebViewId | undefined>();

/** Event that fires with the new id when the last selected web view changes */
export const onDidChangeLastSelectedWebViewId = onDidChangeLastSelectedWebViewIdEmitter.event;

/** Gets the id of the web view the user most recently selected, if any is open */
export function getLastSelectedWebViewId(): WebViewId | undefined {
  return lastSelectedWebViewId;
}

function setLastSelectedWebViewId(newWebViewId: WebViewId | undefined): void {
  if (newWebViewId === lastSelectedWebViewId) return;
  lastSelectedWebViewId = newWebViewId;
  onDidChangeLastSelectedWebViewIdEmitter.emit(newWebViewId);
}

/**
 * The tab or web view that most recently had focus, regardless of whether it is
 * scripture-navigable. Unlike {@link lastSelectedWebViewId}, this follows the user's focus to every
 * tab. Retained when focus moves outside all tabs so the last-selected tab tint can tell whether
 * the tracked web view was also the tab the user was most recently in — if the user visited some
 * other tab in between, the tracked web view keeps driving navigation but should not be tinted. (A
 * web view's tab id is the same as its web view id, so the two trackers are comparable.)
 */
let lastFocusedTabId: string | undefined;

const onDidChangeLastFocusedTabIdEmitter = new PlatformEventEmitter<string | undefined>();

/** Event that fires with the new id when the last focused tab changes */
export const onDidChangeLastFocusedTabId = onDidChangeLastFocusedTabIdEmitter.event;

/** Gets the id of the tab or web view that most recently had focus, if any ever has */
export function getLastFocusedTabId(): string | undefined {
  return lastFocusedTabId;
}

function setLastFocusedTabId(newTabId: string | undefined): void {
  if (newTabId === lastFocusedTabId) return;
  lastFocusedTabId = newTabId;
  onDidChangeLastFocusedTabIdEmitter.emit(newTabId);
}

/**
 * Whether a web view is a candidate for BCV navigation: it either belongs to a project
 * (`projectId`) or shows its own BookChapterControl/ScrollGroupSelector toolbar
 * (`shouldShowToolbar`). Web views that are neither (e.g. Find, a settings-style panel) must not
 * become the tracked web view, since navigation commands and the top toolbar would otherwise target
 * a tab with nothing to navigate.
 *
 * Returns `false` (do not track) if the web view's saved definition cannot be read.
 */
function isScriptureNavigableWebView(webViewId: WebViewId): boolean {
  try {
    const definition = getSavedWebViewDefinitionSync(webViewId);
    return !!(definition?.projectId || definition?.shouldShowToolbar);
  } catch (e) {
    logger.warn(
      `window.service-host could not get web view definition for ${webViewId} to check navigability: ${getErrorMessage(e)}`,
    );
    return false;
  }
}

// Clear the tracked web view when it closes. Guarded by id so a stale close event for a
// previously selected web view does not clear a newer selection.
onDidCloseWebView(({ webView }) => {
  if (webView.id === lastSelectedWebViewId) setLastSelectedWebViewId(undefined);
});

class WindowDataProviderEngine
  extends DataProviderEngine<WindowDataTypes>
  implements IDataProviderEngine<WindowDataTypes>
{
  /** The currently focused subject. Do NOT expose `FocusSubjectElement` outside this class */
  #focusSubject: FocusSubject | FocusSubjectElement | undefined;
  /**
   * Getting the focusSubject is async. We are firing off a promise to get it in the constructor,
   * and this tracks that promise. If `undefined`, the work is finished, and #focusSubject can be
   * used freely
   */
  #focusSubjectInitialPromise: Promise<boolean> | undefined;
  #unsubscribeOnDidFocus: Unsubscriber | undefined;

  /**
   * Debounced version of {@link #setDetectFocusInternal}. Debounced because because it takes a sec
   * for the focus to change in the DOM
   */
  #setDetectFocusInternalDebounced = debounce(this.#setDetectFocusInternal.bind(this), 250);

  constructor() {
    super();

    this.#focusSubjectInitialPromise = this.#setDetectFocusInternal();

    // Listen for window-wide focus/blur changes
    const handleChangeFocus = async () => {
      // Run debounce, then make sure we haven't been disposed before sending update
      if ((await this.#setDetectFocusInternalDebounced()) && this.#unsubscribeOnDidFocus)
        this.notifyUpdate('Focus');
    };
    window.addEventListener('focusin', handleChangeFocus);
    window.addEventListener('focusout', handleChangeFocus);
    this.#unsubscribeOnDidFocus = () => {
      window.removeEventListener('focusin', handleChangeFocus);
      window.removeEventListener('focusout', handleChangeFocus);
      return true;
    };
  }

  async getFocus(): Promise<FocusSubject | undefined> {
    // Wait for first retrieval of #focusSubject
    if (this.#focusSubjectInitialPromise) await this.#focusSubjectInitialPromise;

    if (!this.#focusSubject) return undefined;

    // Hide element focus type and just return other
    if (this.#focusSubject?.focusType === 'element') return FOCUS_SUBJECT_OTHER;

    return this.#focusSubject;
  }

  // Can be called with or without a selector
  async setFocus(
    newSetFocusSpecifierPossiblyUndefinedSelector: SetFocusSpecifier | undefined,
    newSetFocusSpecifierPossiblyNotProvided?: SetFocusSpecifier,
  ): Promise<DataProviderUpdateInstructions<WindowDataTypes>> {
    const newSetFocusSpecifier: SetFocusSpecifier | FocusSubjectElement | undefined =
      newSetFocusSpecifierPossiblyUndefinedSelector ?? newSetFocusSpecifierPossiblyNotProvided;

    // Update the tracked focus in this service based on what is actually focused
    if (newSetFocusSpecifier === 'detect') {
      // Need to debounce because it takes a sec for the focus to change in the DOM
      return this.#setDetectFocusInternalDebounced();
    }

    // Figure out what we should be focusing
    let newFocusSubject: FocusSubjectWebView | FocusSubjectTab | undefined;

    // If we should move focus relative to the currently selected tab, do so
    if (isDirectionFromTab(newSetFocusSpecifier)) {
      // If we don't have a tab selected, can't move relative to it. Return false
      if (
        !this.#focusSubject ||
        (this.#focusSubject.focusType !== 'webView' && this.#focusSubject.focusType !== 'tab')
      )
        return false;

      try {
        const tabInfo = (await getDockLayout()).getTabInfoByDirectionFromTab(
          this.#focusSubject.id,
          newSetFocusSpecifier,
        );

        if (!tabInfo)
          // We didn't find the tab they're looking for, so forget it
          return false;

        newFocusSubject = {
          focusType: 'tab',
          id: tabInfo.id,
          tabType: tabInfo.tabType,
        };
      } catch (e) {
        throw new Error(
          `window.service-host.setFocus threw while getting tab info by direction from tab ${this.#focusSubject.id} in direction ${newSetFocusSpecifier}: ${getErrorMessage(e)}`,
        );
      }

      // If we didn't find the tab to focus next, don't change focus
      if (!newFocusSubject) return false;
    }
    // If we should select a specific tab, fill out the partial tab focus subject
    else if (newSetFocusSpecifier?.focusType === 'tab') {
      try {
        const tabInfo = (await getDockLayout()).getTabInfoById(newSetFocusSpecifier.id);

        if (!tabInfo)
          // We didn't find the tab they're looking for, so forget it
          return false;

        newFocusSubject = { ...newSetFocusSpecifier, tabType: tabInfo.tabType };
      } catch (e) {
        throw new Error(
          `window.service-host.setFocus threw while getting tab info for id ${newSetFocusSpecifier.id}: ${getErrorMessage(e)}`,
        );
      }
    }
    // If we should select a specific WebView or should deselect (undefined), go with that
    else newFocusSubject = newSetFocusSpecifier;

    const didChangeFocus = this.#setFocusInternal(newFocusSubject);

    // Update the window even if didn't change focus as far as the window service knows because
    // there are probably situations where something in the window needs to be re-focused even if
    // the service still has the right focus subject
    // deselect if undefined
    if (newFocusSubject === undefined) {
      if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
    }
    // Set the focus in the docking layout to the appropriate tab or WebView
    else (await getDockLayout()).focusTab(newFocusSubject.id);

    return didChangeFocus;
  }

  async dispose(): Promise<boolean> {
    if (this.#unsubscribeOnDidFocus) {
      const success = this.#unsubscribeOnDidFocus();
      this.#unsubscribeOnDidFocus = undefined;
      return success;
    }
    return true;
  }

  /**
   * Set the tracked focus in this window service.
   *
   * Note; this _only_ changes tracked focus in the window service. If you want to change the focus
   * in the window to match it, you must do so elsewhere
   *
   * @param newFocusSubject Focus subject to be considered the new focus of this window service
   * @returns `true` if the service's tracked focus actually changed; `false` otherwise
   */
  #setFocusInternal(newFocusSubject: FocusSubject | FocusSubjectElement | undefined) {
    if (deepEqual(this.#focusSubject, newFocusSubject)) return false;

    this.#focusSubject = newFocusSubject;

    if (newFocusSubject) {
      // Follow focus to every tab and web view with no eligibility gate (see `lastFocusedTabId`)
      if (newFocusSubject.focusType === 'webView' || newFocusSubject.focusType === 'tab')
        setLastFocusedTabId(newFocusSubject.id);

      // Only track web views that are actually scripture-navigable (see
      // `isScriptureNavigableWebView`). An ineligible web view retains whatever was tracked
      // before, same as focus moving to something that is not a web view at all.
      if (newFocusSubject.focusType === 'webView') {
        if (isScriptureNavigableWebView(newFocusSubject.id))
          setLastSelectedWebViewId(newFocusSubject.id);
      }
      // A tab click resolves and stamps `tabType` onto the subject synchronously (see `setFocus`
      // above) and reaches here directly, bypassing the 250ms trailing-edge debounce that
      // `detectFocus()` sits behind. Without this, clicking a web view's tab left the tracker
      // (and thus the top toolbar's BCV) stale until the debounced detect path caught up.
      // For a web view tab, the tab id is the same as its `WebViewId` (see
      // `FocusSubjectTab.id` and `addWebViewToDock` in `platform-dock-layout-storage.util.ts`).
      else if (
        newFocusSubject.focusType === 'tab' &&
        newFocusSubject.tabType === TAB_TYPE_WEBVIEW &&
        isScriptureNavigableWebView(newFocusSubject.id)
      )
        setLastSelectedWebViewId(newFocusSubject.id);
    }

    return true;
  }

  /**
   * Update the service's tracked focus subject to whatever is currently the actual window's focus
   *
   * @returns `true` if the service's tracked focus actually changed; `false` otherwise
   */
  async #setDetectFocusInternal() {
    return this.#setFocusInternal(await detectFocus());
  }
}

/**
 * Detect the current focus of the window. Uses `document.activeElement` and checks with the dock
 * layout
 */
async function detectFocus(): Promise<FocusSubject | FocusSubjectElement | undefined> {
  const { activeElement } = document;

  // No focus
  if (!activeElement) return undefined;

  // Check to see if focus is on a WebView iframe
  if (
    activeElement.tagName === 'IFRAME' &&
    activeElement instanceof HTMLElement &&
    activeElement.dataset.webViewId
  )
    return { focusType: 'webView', id: activeElement.dataset.webViewId };

  try {
    const tabInfo = (await getDockLayout()).getTabInfoByElement(activeElement);

    if (tabInfo)
      return {
        focusType: 'tab',
        id: tabInfo.id,
        tabType: tabInfo.tabType,
      };
  } catch (e) {
    throw new Error(
      `Could not find tabInfo for existing tab while detecting focus on active element ${activeElement.tagName}: ${getErrorMessage(e)}`,
    );
  }

  return { focusType: 'element', element: activeElement };
}

let initializationPromise: Promise<void>;
/** Need to run initialize before using this */
let dataProvider: IWindowService;
export async function initialize(): Promise<void> {
  if (!initializationPromise) {
    initializationPromise = new Promise<void>((resolve, reject) => {
      const executor = async () => {
        try {
          dataProvider = await dataProviderService.registerEngine(
            windowServiceProviderName,
            new WindowDataProviderEngine(),
          );
          resolve();
        } catch (error) {
          reject(error);
        }
      };
      executor();
    });
  }
  return initializationPromise;
}

/** This is an internal-only export for testing purposes and should not be used in development */
export const testingWindowService = {
  implementWindowDataProviderEngine: () => {
    return new WindowDataProviderEngine();
  },
};

// This will be needed later for disposing of the data provider, choosing to ignore instead of
// remove code that will be used later
// @ts-ignore 6133
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const windowService = createSyncProxyForAsyncObject<IWindowService>(async () => {
  await initialize();
  return dataProvider;
}, windowServiceObjectToProxy);

import { OnDidDispose, UnsubscriberAsync, PlatformError } from 'platform-bible-utils';
import {
  DataProviderDataType,
  DataProviderSubscriberOptions,
  DataProviderUpdateInstructions,
} from '@shared/models/data-provider.model';
import { IDataProvider } from '@shared/models/data-provider.interface';
import { DirectionFromTab, TAB_TYPE_WEBVIEW } from '@shared/models/docking-framework.model';

/** JSDOC DESTINATION windowServiceProviderName */
export const windowServiceProviderName = 'platform.windowServiceDataProvider';
export const windowServiceObjectToProxy = Object.freeze({
  /**
   * JSDOC SOURCE windowServiceProviderName
   *
   * This name is used to register the window data provider on the papi. You can use this name to
   * find the data provider when accessing it using the useData hook
   */
  dataProviderName: windowServiceProviderName,
  /**
   * Get the id of the window this code is currently running in.
   *
   * Works from the renderer and from inside a web view. A web view's iframe has no window id of its
   * own; it reaches this through the `papi` object it shares with the renderer hosting it, and this
   * code runs as part of that renderer — so it answers with the id of the window the web view is
   * in. Returns `undefined` in the extension host, which has no window of its own.
   *
   * This answers a different question than `platform.getFocusedWindowId`, which reports which
   * window the user is currently looking at — that call returns a _different_ window's id whenever
   * this one is not the focused window.
   *
   * @returns The id of the current window, or `undefined` if there is no current window (e.g. in
   *   the extension host)
   * @experimental This method is unstable and may change or disappear without notice
   */
  getWindowId(): string | undefined {
    return globalThis.windowId;
  },
});

/** Focus of the window is on a WebView iframe with the specified id */
export type FocusSubjectWebView = {
  focusType: 'webView';
  /** ID of the WebView in focus (its tab ID is the same) */
  id: string;
};

/**
 * Focus of the window is somewhere in a tab (header, toolbar, menu, content, etc.)
 *
 * Note that the focused tab could be a WebView, in which case the tab is focused but it is not
 * focused in the WebView's iframe
 */
export type FocusSubjectTab = {
  focusType: 'tab';
  /** The type of tab. `webView` if it is a WebView tab. */
  tabType: 'webView' | string;
  /** ID of the tab in focus (if this is a WebView, its WebView ID is the same) */
  id: string;
};

/** Focus of the window is somewhere not in a tab (app menu, app toolbar, etc.) */
export type FocusSubjectOther = {
  focusType: 'other';
};

/** Current item that is the subject of top-level focus in the window */
export type FocusSubject = FocusSubjectWebView | FocusSubjectTab | FocusSubjectOther;

/**
 * Gets the id of the web view a focus subject refers to, if it refers to one: either the web view
 * itself (`focusType: 'webView'`) or a web view's tab (`focusType: 'tab'` with
 * {@link TAB_TYPE_WEBVIEW}; a web view tab's id is the same as its `WebViewId`). Returns `undefined`
 * for focus subjects that do not refer to a web view.
 *
 * Shared so every consumer that projects a focus subject to a web view id (e.g. the window
 * service's last-selected tracking and `platform.openBookChapterControl`) stays in lockstep when
 * focus subject shapes change.
 */
export function getWebViewIdFromFocusSubject(focusSubject: FocusSubject): string | undefined {
  if (focusSubject.focusType === 'webView') return focusSubject.id;
  if (focusSubject.focusType === 'tab' && focusSubject.tabType === TAB_TYPE_WEBVIEW)
    return focusSubject.id;
  return undefined;
}

/** Specific item that is intended to be focused at the top level of the window */
export type SetFocusSubject = FocusSubjectWebView | Omit<FocusSubjectTab, 'tabType'>;

/** Instructions that indicate how to change the focus within the window */
export type SetFocusSpecifier = SetFocusSubject | DirectionFromTab | 'detect' | undefined;

// Data Type to initialize data provider engine with
export type WindowDataTypes = {
  Focus: DataProviderDataType<undefined, FocusSubject | undefined, SetFocusSpecifier>;
};

declare module 'papi-shared-types' {
  export interface DataProviders {
    [windowServiceProviderName]: IWindowService;
  }
}

/**
 * JSDOC SOURCE windowService
 *
 * Service that allows to interact with the current application window
 */
export type IWindowService = {
  /**
   * JSDOC SOURCE getFocus
   *
   * Get information about the current subject of focus in the current window
   *
   * @param selector `undefined`. Does not have to be provided
   * @returns Information about the current window's current subject of focus
   */
  getFocus(selector: undefined): Promise<FocusSubject>;
  /** JSDOC DESTINATION getFocus */
  getFocus(): Promise<FocusSubject>;
  /**
   * Sets the subject of focus in the current window.
   *
   * @param focusSubject What to set the current window's focus to. Provide `'detect'` to instruct
   *   the window to update the current focus based on what is actually focused in the window (only
   *   necessary when an action happens that changes the focus but the window service does not
   *   detect already). In most cases, you will not need to set `'detect'` manually.
   * @returns `true` or an array of strings if the focus successfully updated; `false` otherwise
   * @see {@link DataProviderUpdateInstructions} for more info on what to return
   */
  setFocus(
    focusSubject: SetFocusSpecifier,
  ): Promise<DataProviderUpdateInstructions<WindowDataTypes>>;
  /**
   * Sets the subject of focus in the current window.
   *
   * @param selector `undefined`. Does not have to be provided
   * @param focusSubject What to set the current window's focus to. Provide `'detect'` to instruct
   *   the window to update the current focus based on what is actually focused in the window (only
   *   necessary when an action happens that changes the focus but the window service does not
   *   detect already). In most cases, you will not need to set `'detect'` manually.
   *
   *   Note: `'detect'` is on a debounce because it sometimes takes a moment for
   *   `document.activeElement` to be updated. It may take a short moment when awaiting setting
   *   `'detect'`.
   * @returns `true` or an array of strings if the focus successfully updated; `false` otherwise
   * @see {@link DataProviderUpdateInstructions} for more info on what to return
   */
  setFocus(
    selector: undefined,
    focusSubject: SetFocusSpecifier,
  ): Promise<DataProviderUpdateInstructions<WindowDataTypes>>;
  /**
   * Subscribe to run a callback function when the current window's subject of focus is changed
   *
   * @param selector `undefined`. Does not have to be provided
   * @param callback Function to run with the updated localized menuContent for this selector. If
   *   there is an error while retrieving the updated data, the function will run with a
   *   {@link PlatformError} instead of the data. You can call {@link isPlatformError} on this value
   *   to check if it is an error.
   * @param options Various options to adjust how the subscriber emits updates
   * @returns Unsubscriber function (run to unsubscribe from listening for updates)
   */
  subscribeFocus(
    selector: undefined,
    callback: (focusSubject: FocusSubject | PlatformError) => void,
    options?: DataProviderSubscriberOptions,
  ): Promise<UnsubscriberAsync>;
} & OnDidDispose &
  typeof windowServiceObjectToProxy &
  IDataProvider<WindowDataTypes>;

/**
 * One open application window, as a caller choosing a window to act on needs to see it.
 *
 * @experimental This type is unstable and may change or disappear without notice
 */
export type WindowSummary = {
  /**
   * The window's durable id: persisted in its layout entry and handed back to whichever window
   * restores that entry, so it is stable across restarts.
   */
  windowId: string;
  /**
   * The window's title, which follows its own content. Two windows showing the same thing carry the
   * same label, and nothing disambiguates them.
   */
  label: string;
  /**
   * Whether this window currently holds the primary role. The role is reassignable, so this follows
   * the role rather than which window happened to be created first.
   */
  isMain: boolean;
};

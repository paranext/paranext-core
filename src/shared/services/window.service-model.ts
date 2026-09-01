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
   * This name identifies the window data provider on the papi. Every window registers a provider of
   * its own under a window-scoped name — this name with the window's id appended — and what you get
   * from this property depends on where you read it.
   *
   * From a renderer or a web view, it is that window's own scoped name, so the provider found by it
   * — with the useData hook, for instance — both reports and changes the focus of the window you
   * are in. Read it from `papi.window` and use it as it comes.
   *
   * From the extension host, which runs in no window, it is the bare unscoped name. That name
   * resolves to whichever window the router is currently targeting, so two reads can answer for
   * different windows. The bare {@link windowServiceProviderName} constant behaves the same way
   * wherever it is imported. To act on one particular window from there,
   * `platform.getFocusedWindowId` reports which window has focus.
   */
  dataProviderName: windowServiceProviderName,
});

/** A window's focus is on a WebView iframe with the specified id */
export type FocusSubjectWebView = {
  focusType: 'webView';
  /** ID of the WebView in focus (its tab ID is the same) */
  id: string;
};

/**
 * A window's focus is somewhere in a tab (header, toolbar, menu, content, etc.)
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

/** A window's focus is somewhere not in a tab (app menu, app toolbar, etc.) */
export type FocusSubjectOther = {
  focusType: 'other';
};

/** Current item that is the subject of top-level focus in a window */
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

/**
 * A raw input gesture in the app window that transient overlays (context menus, command palettes,
 * dismissable popovers) treat as a request to dismiss.
 *
 * - `'mouseDown'` — a mouse button went down anywhere in the window
 * - `'escape'` — the Escape key went down anywhere in the window
 *
 * These two gestures are deliberately the ONLY inputs this type can describe. Do not add other keys
 * or richer mouse detail — see the security note on {@link EVENT_NAME_ON_DID_APP_WINDOW_INPUT}.
 *
 * @experimental
 */
export type AppWindowInputKind = 'mouseDown' | 'escape';

/**
 * Payload of the {@link EVENT_NAME_ON_DID_APP_WINDOW_INPUT} network event.
 *
 * Deliberately carries nothing but which of the two gestures happened — no key identity, no mouse
 * coordinates, button, or target. See the security note on
 * {@link EVENT_NAME_ON_DID_APP_WINDOW_INPUT} before adding fields.
 *
 * @experimental
 */
export type AppWindowInputEvent = {
  /** Which input gesture happened */
  kind: AppWindowInputKind;
};

/**
 * Name of the network event the main process emits for every mouse-down and every Escape key-down
 * in the app window.
 *
 * The main process's `before-mouse-event`/`before-input-event` hooks see input in EVERY frame,
 * including WebView iframes whose events never reach the parent document. Overlays render in the
 * parent document, so this event is the only way they learn that a click landed inside a WebView.
 * Escape is announced without `preventDefault`, so the focused frame still receives the key and can
 * act on it too.
 *
 * SECURITY: network events are visible to every process and every extension, and the hooks feeding
 * this one see ALL input in the window — including keystrokes typed into other extensions' web
 * views. The announcement is therefore restricted to the two overlay-dismissal gestures, with no
 * key identity, coordinates, or any other detail, so the event cannot be used as a keylogger or to
 * surveil user input. Do not broaden what is announced here without a security review.
 */
export const EVENT_NAME_ON_DID_APP_WINDOW_INPUT = 'platform.onDidAppWindowInput';

/** Specific item that is intended to be focused at the top level of a window */
export type SetFocusSubject = FocusSubjectWebView | Omit<FocusSubjectTab, 'tabType'>;

/** Instructions that indicate how to change the focus within a window */
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
 * Service for interacting with an application window. Every window hosts its own, so a call from a
 * renderer acts on the window it runs in. The extension host is in no window, so a call made there
 * acts on whichever window the router is targeting at that moment, which can differ between two
 * calls.
 *
 * The routing target is usually the focused window, but not always: a window that has taken OS
 * focus does not become the target until it is ready and not closing, so a newly opened window can
 * hold focus while calls still act on the previous one. `platform.getFocusedWindowId` is what
 * tracks focus itself.
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
   *   that window to update its current focus based on what is actually focused in it (only
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
   *   that window to update its current focus based on what is actually focused in it (only
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
   * @param callback Function to run with the window's updated subject of focus. If there is an
   *   error while retrieving the updated data, the function will run with a {@link PlatformError}
   *   instead of the data. You can call {@link isPlatformError} on this value to check if it is an
   *   error.
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

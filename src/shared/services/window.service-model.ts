import { OnDidDispose, UnsubscriberAsync, PlatformError } from 'platform-bible-utils';
import {
  DataProviderDataType,
  DataProviderSubscriberOptions,
  DataProviderUpdateInstructions,
} from '@shared/models/data-provider.model';
import { IDataProvider } from '@shared/models/data-provider.interface';

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
});

/** Focus of the app window is on a WebView iframe with the specified id */
export type FocusSubjectWebView = {
  focusType: 'webView';
  /** ID of the WebView in focus (its tab ID is the same) */
  id: string;
};

/**
 * Focus of the app window is somewhere in a tab (header, toolbar, menu, content, etc.)
 *
 * Note that the focused tab could be a WebView, in which case the tab is focused but it is not
 * focused in the WebView's iframe
 */
export type FocusSubjectTab = {
  focusType: 'tab';
  /**
   * The type of tab. `webView` if it is a WebView tab. `undefined` if we were unable to determine
   * its type. If you need to get its type, try running `getFocus` again
   */
  tabType: 'webView' | string;
  /** ID of the tab in focus (if this is a WebView, its WebView ID is the same) */
  id: string;
};

/** Focus of the app window is somewhere not in a tab (app menu, app toolbar, etc.) */
export type FocusSubjectOther = {
  focusType: 'other';
};

/** Current item that is the subject of top-level app window focus */
export type FocusSubject = FocusSubjectWebView | FocusSubjectTab | FocusSubjectOther;

// Data Type to initialize data provider engine with
export type WindowDataTypes = {
  Focus: DataProviderDataType<undefined, FocusSubject | undefined, FocusSubject | 'detect'>;
};

declare module 'papi-shared-types' {
  export interface DataProviders {
    [windowServiceProviderName]: IWindowService;
  }
}

/**
 * JSDOC SOURCE windowService
 *
 * Service that allows to interact with the main application window
 */
export type IWindowService = {
  /**
   * JSDOC SOURCE getFocus
   *
   * Get information about the current subject of focus in the main app window
   *
   * @param selector `undefined`. Does not have to be provided
   * @returns Information about the main app window's current subject of focus
   */
  getFocus(selector: undefined): Promise<FocusSubject>;
  /** JSDOC DESTINATION getFocus */
  getFocus(): Promise<FocusSubject>;
  /**
   * Sets the subject of focus in the main app window.
   *
   * @param focusSubject What to set the main app window's focus to. Provide `'detect'` to instruct
   *   the window to update the current focus based on what is actually focused in the window (only
   *   necessary when an action happens that changes the focus but the window service does not
   *   detect already). In most cases, you will not need to set `'detect'` manually.
   * @returns `true` or an array of strings if the theme successfully updated; `false` otherwise
   * @see {@link DataProviderUpdateInstructions} for more info on what to return
   */
  setFocus(
    focusSubject: FocusSubject | 'detect',
  ): Promise<DataProviderUpdateInstructions<WindowDataTypes>>;
  /**
   * Sets the subject of focus in the main app window.
   *
   * @param selector `undefined`. Does not have to be provided
   * @param focusSubject What to set the main app window's focus to. Provide `'detect'` to instruct
   *   the window to update the current focus based on what is actually focused in the window (only
   *   necessary when an action happens that changes the focus but the window service does not
   *   detect already). In most cases, you will not need to set `'detect'` manually.
   *
   *   Note: `'detect'` is on a debounce because it sometimes takes a moment for
   *   `document.activeElement` to be updated. It may take a short moment when awaiting setting
   *   `'detect'`.
   * @returns `true` or an array of strings if the theme successfully updated; `false` otherwise
   * @see {@link DataProviderUpdateInstructions} for more info on what to return
   */
  setFocus(
    selector: undefined,
    focusSubject: FocusSubject | 'detect',
  ): Promise<DataProviderUpdateInstructions<WindowDataTypes>>;
  /**
   * Subscribe to run a callback function when the main app window's subject of focus is changed
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

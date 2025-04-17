import { LocalizeKey, OnDidDispose, PlatformError, UnsubscriberAsync } from 'platform-bible-utils';
import { IDataProvider } from '@shared/models/data-provider.interface';
import {
  DataProviderDataType,
  DataProviderSubscriberOptions,
  DataProviderUpdateInstructions,
} from '@shared/models/data-provider.model';

/** JSDOC DESTINATION themeServiceDataProviderName */
export const themeServiceDataProviderName = 'platform.themeServiceDataProvider';
export const themeServiceObjectToProxy = Object.freeze({
  /**
   * JSDOC SOURCE themeServiceDataProviderName
   *
   * This name is used to register the theme service data provider on the papi. You can use this
   * name to find the data provider when accessing it using the useData hook
   */
  dataProviderName: themeServiceDataProviderName,
});

// #region TODO: Move to PBU

export type ThemeContribution = {
  /**
   * Programmatic name for the theme. Alphanumeric and dashes only. Will be converted to kebab-case
   * as this will be used as the class name in the HTML document.
   *
   * If `type` is not specified, it will be determined by whether this has `dark` at the end.
   */
  id: string;
  /**
   * What kind of theme this is. Some UI elements use this to determine how to look. Colors not
   * present in the theme will fall back to the built-in colors for this type. This theme may be
   * paired to a theme of the opposite type (light/dark) by `id` for quick theme switching. For
   * example, `id: 'my-theme'` and `id: 'my-theme-dark'` would be paired together.
   *
   * If this is not specified, it will be determined by whether `id` ends with `dark`.
   *
   * TODO: maybe this should not be optional since there isn't really a good way to say for sure
   * that light is default
   */
  type?: 'light' | 'dark';
  /** LocalizeKey that is the display name for the theme */
  label: LocalizeKey;
  /**
   * Theme colors and other CSS variable properties in Platform.Bible. These are applied in CSS
   * properties using `hsl(var(--variableName))` or Tailwind classes like `tw-bg-primary`
   *
   * See the wiki's [Matching Application
   * Theme](https://github.com/paranext/paranext-extension-template/wiki/Extension-Anatomy#matching-application-theme)
   * section for more information
   */
  cssVariables: {
    [variableName: string]: string | undefined;
    background?: string;
    foreground?: string;
    card?: string;
    'card-foreground'?: string;
    popover?: string;
    'popover-foreground'?: string;
    primary?: string;
    'primary-foreground'?: string;
    secondary?: string;
    'secondary-foreground'?: string;
    muted?: string;
    'muted-foreground'?: string;
    accent?: string;
    'accent-foreground'?: string;
    destructive?: string;
    'destructive-foreground'?: string;
    border?: string;
    input?: string;
    ring?: string;
    'sidebar-background'?: string;
    'sidebar-foreground'?: string;
    'sidebar-primary'?: string;
    'sidebar-primary-foreground'?: string;
    'sidebar-accent'?: string;
    'sidebar-accent-foreground'?: string;
    'sidebar-border'?: string;
    'sidebar-ring'?: string;
    radius?: string;
  };
};

export type ThemeData = ThemeContribution & Required<Pick<ThemeContribution, 'type'>>;

export type AllThemeData = { [themeId: string]: ThemeData | undefined };

/** ID for the style element the theme styles should go into */
export const THEME_STYLE_ELEMENT_ID = 'theme-styles';

/** Gets the CSS stylesheet that should be applied for the given theme */
export function getStylesheetForTheme(theme: ThemeData): string {
  return `
.${theme.id} {
${Object.entries(theme.cssVariables)
  .map(([variableName, value]) => `  --${variableName}: ${value};`)
  .join('\n')}
}
`;
}

/**
 * Applies a CSS stylesheet for the provided theme to the current window
 *
 * @param theme Theme to apply
 * @param previousStyleElement Previous style element if applicable
 * @param styleElementId ID to apply to the new style element. Defaults to
 *   {@link THEME_STYLE_ELEMENT_ID}
 * @returns
 */
export function applyThemeStylesheet(
  theme: ThemeData,
  previousStyleElement?: HTMLStyleElement,
  styleElementId = THEME_STYLE_ELEMENT_ID,
): HTMLStyleElement {
  // Set the class on the body
  const previousThemeId = previousStyleElement?.dataset.themeId;
  if (previousThemeId) window.document.body.classList.remove(previousThemeId);
  window.document.body.classList.add(theme.id);

  // Set up the stylesheet element
  if (previousStyleElement) window.document.head.removeChild(previousStyleElement);
  const themeStyleElement = document.createElement('style');
  themeStyleElement.id = styleElementId;
  themeStyleElement.dataset.themeId = theme.id;
  themeStyleElement.textContent = getStylesheetForTheme(theme);
  document.head.appendChild(themeStyleElement);
  return themeStyleElement;
}

// #endregion

/** ThemeDataTypes handles getting and setting the application theme. */
export type ThemeDataTypes = {
  CurrentTheme: DataProviderDataType<undefined, ThemeData, string>;
  ShouldMatchSystem: DataProviderDataType<undefined, boolean, boolean>;
  AllThemes: DataProviderDataType<undefined, AllThemeData, never>;
};

declare module 'papi-shared-types' {
  export interface DataProviders {
    [themeServiceDataProviderName]: IThemeService;
  }
}

/**
 * JSDOC SOURCE themeService
 *
 * Service that allows to interact with the application theme
 */
export type IThemeService = {
  /**
   * JSDOC SOURCE getCurrentTheme
   *
   * Retrieves the current theme information
   *
   * @param selector `undefined`. Does not have to be provided
   * @returns Information about the currently selected theme
   */
  getCurrentTheme(selector: undefined): Promise<ThemeData>;
  /** JSDOC DESTINATION getCurrentTheme */
  getCurrentTheme(): Promise<ThemeData>;

  /**
   * Sets the current theme
   *
   * @param newThemeId The string id of the theme to change to
   * @returns `true` or an array of strings if the theme successfully updated; `false` otherwise
   * @see {@link DataProviderUpdateInstructions} for more info on what to return
   */
  setCurrentTheme(newThemeId: string): Promise<DataProviderUpdateInstructions<ThemeDataTypes>>;
  /**
   * Sets the current theme
   *
   * @param selector `undefined`. Does not have to be provided
   * @param newThemeId The string id of the theme to change to
   * @returns `true` or an array of strings if the theme successfully updated; `false` otherwise
   * @see {@link DataProviderUpdateInstructions} for more info on what to return
   */
  setCurrentTheme(
    selector: undefined,
    newThemeId: string,
  ): Promise<DataProviderUpdateInstructions<ThemeDataTypes>>;

  /**
   * Subscribes to updates of the current theme. Whenever the current theme changes, the callback
   * function is executed.
   *
   * @param selector `undefined`
   * @param callback The function that will be called whenever the current theme is updated. If
   *   there is an error while retrieving the updated data, the function will run with a
   *   {@link PlatformError} instead of the data. You can call {@link isPlatformError} on this value
   *   to check if it is an error.
   * @param options Various options to adjust how the subscriber emits updates
   * @returns Unsubscriber that should be called whenever the subscription should be deleted
   */
  subscribeCurrentTheme(
    selector: undefined,
    callback: (currentTheme: ThemeData | PlatformError) => void,
    options?: DataProviderSubscriberOptions,
  ): Promise<UnsubscriberAsync>;

  /**
   * JSDOC SOURCE getShouldMatchSystem
   *
   * TODO: UPDATE ShouldMatchSystem TSDocs BEFORE MERGE!!
   *
   * Retrieves the current theme information
   *
   * @param selector `undefined`. Does not have to be provided
   * @returns Information about the currently selected theme
   */
  getShouldMatchSystem(selector: undefined): Promise<boolean>;
  /** JSDOC DESTINATION getShouldMatchSystem */
  getShouldMatchSystem(): Promise<boolean>;

  /**
   * Sets the current theme
   *
   * @param newThemeId The string id of the theme to change to
   * @returns `true` or an array of strings if the theme successfully updated; `false` otherwise
   * @see {@link DataProviderUpdateInstructions} for more info on what to return
   */
  setShouldMatchSystem(
    shouldMatchSystem: boolean,
  ): Promise<DataProviderUpdateInstructions<ThemeDataTypes>>;
  /**
   * Sets the current theme
   *
   * @param selector `undefined`. Does not have to be provided
   * @param newThemeId The string id of the theme to change to
   * @returns `true` or an array of strings if the theme successfully updated; `false` otherwise
   * @see {@link DataProviderUpdateInstructions} for more info on what to return
   */
  setShouldMatchSystem(
    selector: undefined,
    shouldMatchSystem: boolean,
  ): Promise<DataProviderUpdateInstructions<ThemeDataTypes>>;

  /**
   * Subscribes to updates of the current theme. Whenever the current theme changes, the callback
   * function is executed.
   *
   * @param selector `undefined`
   * @param callback The function that will be called whenever the current theme is updated. If
   *   there is an error while retrieving the updated data, the function will run with a
   *   {@link PlatformError} instead of the data. You can call {@link isPlatformError} on this value
   *   to check if it is an error.
   * @param options Various options to adjust how the subscriber emits updates
   * @returns Unsubscriber that should be called whenever the subscription should be deleted
   */
  subscribeShouldMatchSystem(
    selector: undefined,
    callback: (shouldMatchSystem: boolean | PlatformError) => void,
    options?: DataProviderSubscriberOptions,
  ): Promise<UnsubscriberAsync>;

  /**
   * JSDOC SOURCE getAllThemes
   *
   * TODO: UPDATE AllThemes TSDocs BEFORE MERGE!!
   *
   * Retrieves the current theme information
   *
   * @param selector `undefined`. Does not have to be provided
   * @returns Information about the currently selected theme
   */
  getAllThemes(selector: undefined): Promise<AllThemeData>;
  /** JSDOC DESTINATION getAllThemes */
  getAllThemes(): Promise<AllThemeData>;

  /**
   * This data cannot be changed. Trying to use this setter this will always throw. Extensions can
   * provide themes in contributions
   *
   * @param selector `undefined`. Does not have to be provided
   * @param value
   * @returns `true` or an array of strings if the theme successfully updated; `false` otherwise
   * @see {@link DataProviderUpdateInstructions} for more info on what to return
   */
  setAllThemes(
    selector: undefined,
    value: never,
  ): Promise<DataProviderUpdateInstructions<ThemeDataTypes>>;

  /**
   * Subscribes to updates of the current theme. Whenever the current theme changes, the callback
   * function is executed.
   *
   * @param selector `undefined`
   * @param callback The function that will be called when a theme is added/updated/removed. If
   *   there is an error while retrieving the updated data, the function will run with a
   *   {@link PlatformError} instead of the data. You can call {@link isPlatformError} on this value
   *   to check if it is an error.
   * @param options Various options to adjust how the subscriber emits updates
   * @returns Unsubscriber that should be called whenever the subscription should be deleted
   */
  subscribeAllThemes(
    selector: undefined,
    callback: (allThemes: AllThemeData | PlatformError) => void,
    options?: DataProviderSubscriberOptions,
  ): Promise<UnsubscriberAsync>;
} & OnDidDispose &
  IDataProvider<ThemeDataTypes> &
  typeof themeServiceObjectToProxy;

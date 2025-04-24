import { ThemeDefinitionPartial } from './theme.model';

export type ThemeDefinition = ThemeDefinitionPartial &
  Required<Pick<ThemeDefinitionPartial, 'type'>>;

/**
 * Optional suffix on the end of themes that are light type. A theme with the same name but with
 * {@link THEME_SUFFIX_DARK} suffix instead will be paired with a theme with this suffix (or no
 * suffix)
 */
export const THEME_SUFFIX_LIGHT = '-light';
/**
 * Optional suffix on the end of themes that are dark type. A theme with the same name but with
 * {@link THEME_SUFFIX_LIGHT} suffix instead will be paired with a theme with this suffix (or no
 * suffix)
 */
export const THEME_SUFFIX_DARK = '-dark';

/** ID for the style element the theme styles should go into */
export const THEME_STYLE_ELEMENT_ID = 'theme-styles';

/** Gets the CSS stylesheet that should be applied for the given theme */
export function getStylesheetForTheme(theme: ThemeDefinition): string {
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
 * WARNING: THIS MUST BE BOUND TO `window` IN ORDER TO USE!
 *
 * ```ts
 * applyThemeStylesheet.bind(window)()`
 * ```
 *
 * @param theme Theme to apply
 * @param previousStyleElement Previous style element if applicable
 * @param styleElementIdSuffix Suffix to apply to the ID of the new style element. Will be
 *   {@link THEME_STYLE_ELEMENT_ID} with a dash and the suffix added to it
 * @returns
 */
// Must use `this` so it works across iframes
export function applyThemeStylesheet(
  this: Window,
  theme: ThemeDefinition,
  previousStyleElement?: HTMLStyleElement,
  styleElementIdSuffix?: string,
): HTMLStyleElement {
  // Set the class on the body
  const previousThemeId = previousStyleElement?.dataset.themeId;
  if (previousThemeId) this.document.body.classList.remove(previousThemeId);
  this.document.body.classList.add(theme.id);

  // Set up the stylesheet element
  if (previousStyleElement) this.document.head.removeChild(previousStyleElement);
  const themeStyleElement = this.document.createElement('style');
  themeStyleElement.id = `${THEME_STYLE_ELEMENT_ID}${styleElementIdSuffix ? `-${styleElementIdSuffix}` : ''}`;
  themeStyleElement.dataset.themeId = theme.id;
  themeStyleElement.textContent = getStylesheetForTheme(theme);
  this.document.head.appendChild(themeStyleElement);
  return themeStyleElement;
}

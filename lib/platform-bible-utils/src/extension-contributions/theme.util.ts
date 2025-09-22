import { ReplaceType } from '../util';
import { ThemeDefinition, ThemeFamiliesById, ThemeFamily } from './theme.model';

/**
 * {@link ThemeDefinition} with some additional properties derived from the {@link ThemeFamiliesById}
 * it comes from to help with managing the theme
 */
export type ThemeDefinitionExpanded = ThemeDefinition & {
  /**
   * Unique identifier for the {@link ThemeFamily} this theme is in.
   *
   * This is derived from the key of the {@link ThemeFamiliesById} this theme is in
   */
  themeFamilyId: string;
  /**
   * The kind of theme (e.g. light, dark). Some UI elements use the theme type to determine how to
   * look. Colors not present in the theme will fall back to the built-in colors for this type.
   *
   * This is derived from the key of the {@link ThemeFamily} this theme is in
   */
  type: string;
  /**
   * Unique identifier for this theme.
   *
   * This is derived by combining the theme family and type
   */
  id: string;
};

/**
 * Replaces {@link ThemeDefinition} with {@link ThemeDefinitionExpanded} recursively in the provided
 * type. Modifies the type to what is used in the theme service.
 */
export type ExpandThemeDefinition<T> = ReplaceType<T, ThemeDefinition, ThemeDefinitionExpanded>;

/**
 * {@link ThemeFamily} with all {@link ThemeDefinition} replaced by {@link ThemeDefinitionExpanded}.
 * This is used in the theme service
 */
export type ThemeFamilyExpanded = ExpandThemeDefinition<ThemeFamily>;

/**
 * {@link ThemeFamiliesById} with all {@link ThemeDefinition} replaced by
 * {@link ThemeDefinitionExpanded}. This is used in the theme service
 */
export type ThemeFamiliesByIdExpanded = ExpandThemeDefinition<ThemeFamiliesById>;

/** ID for the style element the theme styles should go into */
export const THEME_STYLE_ELEMENT_ID = 'theme-styles';

function getThemeId(themeFamilyId: string, type: string) {
  return `${themeFamilyId ? `${themeFamilyId}-` : ''}${type}`;
}

/**
 * Add the derived properties in {@link ThemeDefinitionExpanded} to {@link ThemeDefinition}s in the
 * given {@link ThemeFamiliesById} and fill in any missing `cssVariables` in the theme definitions
 * with those from the default themes.
 *
 * Does not modify the input object.
 *
 * @param themeFamiliesById Theme families to expand with the additional derived properties
 * @param defaultThemeFamily If provided, themes from this family are used to fill in missing
 *   `cssVariables` in the theme definitions to make sure each theme definition has all necessary
 *   `cssVariables`
 * @returns The expanded theme families
 */
export function expandThemeContribution(
  themeFamiliesById: ThemeFamiliesById,
  defaultThemeFamily: ThemeFamily | undefined,
): ThemeFamiliesByIdExpanded {
  const themeFamiliesByIdExpanded: ThemeFamiliesByIdExpanded = Object.fromEntries(
    Object.entries(themeFamiliesById)
      .map(([themeFamilyId, themeFamily]) => [
        themeFamilyId,
        themeFamily
          ? Object.fromEntries(
              Object.entries(themeFamily)
                .map(([type, themeDefinition]): [string, ThemeDefinitionExpanded | undefined] => [
                  type,
                  themeDefinition
                    ? {
                        ...themeDefinition,
                        // Add the derived properties
                        themeFamilyId,
                        type,
                        id: getThemeId(themeFamilyId, type),
                        cssVariables: {
                          // Fill in the default css variables
                          ...defaultThemeFamily?.[type]?.cssVariables,
                          ...themeDefinition.cssVariables,
                        },
                      }
                    : undefined,
                ])
                .filter(([, themeDefinition]) => !!themeDefinition),
            )
          : undefined,
      ])
      .filter(([, themeFamily]) => !!themeFamily),
  );
  return themeFamiliesByIdExpanded;
}

/** Gets the CSS stylesheet that should be applied for the given theme */
export function getStylesheetForTheme(theme: ThemeDefinitionExpanded): string {
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
  theme: ThemeDefinitionExpanded,
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

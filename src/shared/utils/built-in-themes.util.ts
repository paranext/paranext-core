/**
 * The themes that ship with the software, expanded once and shared.
 *
 * Two processes need pieces of this for two halves of the same job: main's theme service host
 * builds the served theme list and the user-defined families out of it, and each renderer needs the
 * default theme as the last fallback for the theme it paints its first frame with (see
 * `renderer/services/theme.service.ts`). One copy is what stops the two from disagreeing about what
 * "the default theme" is — a disagreement nothing would report, because both answers render.
 */

import { DEFAULT_THEME_FAMILY, DEFAULT_THEME_TYPE } from '@shared/data/platform.data';
import themesDataObject from '@shared/data/themes.data.json';
import { USER_THEME_FAMILY_PREFIX } from '@shared/services/theme.service-model';
import {
  expandThemeContribution,
  ThemeDefinitionExpanded,
  ThemeFamiliesById,
  ThemeFamiliesByIdExpanded,
  ThemeFamily,
} from 'platform-bible-utils';

/**
 * Raw un-expanded themes that are built into the software
 *
 * @experimental
 */
// We know this is the right data type because we write this data
// eslint-disable-next-line no-type-assertion/no-type-assertion
export const THEMES_DATA_OBJECT = themesDataObject as ThemeFamiliesById;

/**
 * Runs {@link expandThemeContribution} on the provided theme families to expand them. Uses the
 * default built-in theme family to back up the `cssVariables` of the provided theme families
 *
 * @param themeFamiliesById Theme families to expand
 * @returns Expanded theme families
 * @experimental
 */
export function expandThemeFamiliesByIdWithDefault(
  themeFamiliesById: ThemeFamiliesById,
): ThemeFamiliesByIdExpanded {
  return expandThemeContribution(themeFamiliesById, THEMES_DATA_OBJECT[DEFAULT_THEME_FAMILY]);
}

/**
 * Expanded themes that are built into the software
 *
 * @experimental
 */
export const BUILT_IN_THEMES: ThemeFamiliesByIdExpanded =
  expandThemeFamiliesByIdWithDefault(THEMES_DATA_OBJECT);

const defaultThemePossiblyUndefined = BUILT_IN_THEMES[DEFAULT_THEME_FAMILY]?.[DEFAULT_THEME_TYPE];
if (!defaultThemePossiblyUndefined)
  throw new Error(
    `Could not find the built-in default theme! Family ${DEFAULT_THEME_FAMILY} type ${DEFAULT_THEME_TYPE}. This should not happen.`,
  );

/**
 * The theme to fall back on when nothing else is known — a profile that has never chosen one, or a
 * stored choice that could not be read
 *
 * @experimental
 */
export const DEFAULT_THEME: ThemeDefinitionExpanded = defaultThemePossiblyUndefined;

/**
 * Gets name of user-defined theme family for the given number
 *
 * @param themeNumber Which user-defined theme family to name
 * @returns The family id for that user-defined theme family
 * @experimental
 */
export function getUserThemeFamilyName(themeNumber: number): string {
  return `${USER_THEME_FAMILY_PREFIX}${themeNumber}`;
}

const defaultUserThemeFamilyPossiblyUndefined = THEMES_DATA_OBJECT[getUserThemeFamilyName(0)];
if (!defaultUserThemeFamilyPossiblyUndefined)
  throw new Error(
    `Could not find the built-in default user theme family! Family ${getUserThemeFamilyName(0)}. This should not happen.`,
  );

/**
 * The user-defined theme family every other user-defined family is filled in from
 *
 * @experimental
 */
export const DEFAULT_USER_THEME_FAMILY: ThemeFamily = defaultUserThemeFamilyPossiblyUndefined;

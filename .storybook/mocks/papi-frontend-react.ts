/**
 * Storybook mock for `@papi/frontend/react`.
 *
 * Webpack aliases `@papi/frontend/react` to this file in `.storybook/main.ts` so components that
 * call PAPI hooks render correctly in Storybook without a live PAPI backend.
 *
 * Add exports here as new stories require them. Each export must be a React hook (or hook-shaped
 * function) that returns sensible static data for the story context.
 */

import type { LocalizeKey } from 'platform-bible-utils';
import { getLocalizedStrings } from '../localization.utils';

export function useLocalizedStrings(keys: LocalizeKey[]) {
  return [getLocalizedStrings(keys)] as const;
}

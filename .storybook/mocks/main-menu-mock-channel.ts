/**
 * Opt-in channel for the main menu in Storybook.
 *
 * The title bar reads its menu with `useData(menuDataService.dataProviderName).MainMenu(...)`,
 * which the mocked `useData` (`renderer-papi-hooks.tsx`) answers with the caller's empty default —
 * so the real `PlatformBibleToolbar` draws no menus. A story that wants the menus provides them
 * here and the mock serves them for the `MainMenu` data type only.
 *
 * Kept dependency-free (types only) so story files under `src/` can import it without pulling the
 * webpack-only hooks mock into `tsc`, the same split `sync-status-mock-channel.ts` uses. A React
 * context, so stories rendered together on a docs page each read their own menu.
 */
import { createContext } from 'react';
import type { Localized, MultiColumnMenu } from 'platform-bible-utils';

/** `undefined` (no provider) leaves `MainMenu` at the caller's default, as before. */
export const MainMenuMockContext = createContext<Localized<MultiColumnMenu> | undefined>(undefined);

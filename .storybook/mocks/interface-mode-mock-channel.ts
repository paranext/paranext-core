/**
 * Opt-in channel for the `platform.interfaceMode` setting in Storybook.
 *
 * The mocked `useSetting` (`renderer-papi-hooks.tsx`) keeps each caller's value in that caller's
 * own state, so the profile popover's Simple / Power switch would only flip the popover. A story
 * that wants the switch to drive the whole window provides the mode and a setter here; every
 * component reading `platform.interfaceMode` then shares that one value, and a write goes to the
 * story.
 *
 * Kept dependency-free (types only) so story files under `src/` can import it without pulling the
 * webpack-only hooks mock into `tsc`, the same split `main-menu-mock-channel.ts` uses.
 */
import { createContext } from 'react';

export type InterfaceModeMock = {
  mode: 'simple' | 'power';
  setMode: (mode: 'simple' | 'power') => void;
};

/** `undefined` (no provider) leaves the setting to the per-caller mock, as before. */
export const InterfaceModeMockContext = createContext<InterfaceModeMock | undefined>(undefined);

import { createContext, useContext } from 'react';

/**
 * Whether the reading component renders inside a tooltip's content. `TooltipContent` sets it, so a
 * component that adds a tooltip of its own (as `ShortcutKeys` does) can leave it out there: a
 * tooltip cannot open from inside another tooltip.
 */
export const InTooltipContext = createContext(false);

/** Whether the calling component renders inside a tooltip's content. */
export function useIsInTooltip(): boolean {
  return useContext(InTooltipContext);
}

import { useContext } from 'react';
import { getSharedContext } from '@/context/shared-context.util';

/**
 * Whether the reading component renders inside a tooltip's content. `TooltipContent` sets it, so a
 * component that adds a tooltip of its own (as `ShortcutKeys` does) can leave it out there: a
 * tooltip cannot open from inside another tooltip. Shared between copies of this library, so it
 * holds when the tooltip and the component come from different copies.
 */
export const InTooltipContext = getSharedContext('inTooltip', false);

/** Whether the calling component renders inside a tooltip's content. */
export function useIsInTooltip(): boolean {
  return useContext(InTooltipContext);
}

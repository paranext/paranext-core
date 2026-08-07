import { ReactNode } from 'react';
import { useIsPowerMode } from '../use-is-power-mode.hook';

export type CharacterMarkerToolbarProps = {
  /**
   * The controls to lay out. One today; footnote and comment buttons are expected to join them
   * without any change to this component.
   */
  children: ReactNode;
  /** CSS class name for the container. Placement belongs to the caller, never to this component. */
  className?: string;
};

/**
 * Slot-based container for the character-marker controls, and the home of the Simple-mode gate.
 *
 * Lays its children out in a row and decides nothing about where that row sits — the `className`
 * pass-through is how a placement wrapper positions it. Adding a second control means passing
 * another child, not editing this component.
 */
export function CharacterMarkerToolbar({ children, className }: CharacterMarkerToolbarProps) {
  const isPowerMode = useIsPowerMode();

  // The character-marker control is only available in 10 Simple right now. Later it will be made
  // available in 10 Power too.
  //
  // Deliberately `!== false` rather than `if (isPowerMode)`: `undefined` means the interface-mode
  // setting has not resolved yet, and rendering on that would paint this Simple-only UI into a
  // Power session for one frame before unmounting it. Withholding a frame in Simple is invisible;
  // showing one in Power is the behavior change this feature is required not to make.
  if (isPowerMode !== false) return undefined;

  return (
    <div
      className={['tw:flex tw:flex-row tw:flex-nowrap tw:items-center tw:gap-1', className]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  );
}

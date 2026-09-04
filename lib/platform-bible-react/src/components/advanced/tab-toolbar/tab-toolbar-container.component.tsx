import { Localized, MultiColumnMenu } from 'platform-bible-utils';
import React, { PropsWithChildren, ReactNode, useCallback, useRef, useState } from 'react';
import {
  SHRINK_STEP,
  ShrinkStepContext,
  useShrinkStepOverride,
} from '@/context/shrink-step.context';
import { useShrinkStep } from '@/hooks/use-shrink-step.hook';
import { cn } from '@/utils/shadcn-ui/utils';
import { SelectMenuItemHandler } from '../menus/platform-menubar.component';

export type TabToolbarCommonProps = {
  /**
   * The handler to use for toolbar item commands related to the project menu. Here is a basic
   * example of how to create this:
   *
   * @example
   *
   * ```tsx
   * const projectMenuCommandHandler: SelectMenuItemHandler = async (selectedMenuItem) => {
   *   const commandName = selectedMenuItem.command;
   *   try {
   *     // Assert the more specific type. Assert the more specific type. The menu data should
   *     // specify a valid command name here. If not, the error will be caught.
   *     // eslint-disable-next-line no-type-assertion/no-type-assertion
   *     await papi.commands.sendCommand(commandName as CommandNames);
   *   } catch (e) {
   *     throw new Error(
   *       `handleMenuCommand error: command: ${commandName}. ${JSON.stringify(e)}`,
   *     );
   *   }
   * };
   * ```
   */
  onSelectProjectMenuItem: SelectMenuItemHandler;

  /**
   * Menu data that is used to populate the Menubar component for the project menu. In an extension,
   * the menu data comes from menus.json in the contributions folder. To access that info, use
   * useMemo to get the WebViewMenu.
   */
  projectMenuData?: Localized<MultiColumnMenu>;

  /** Optional unique identifier */
  id?: string;

  /** Additional css classes to help with unique styling of the extensible toolbar */
  className?: string;

  /** Icon that will be displayed on the Menu Button. Defaults to the hamburger menu icon. */
  menuButtonIcon?: ReactNode;
};

export type TabToolbarContainerProps = PropsWithChildren<{
  /** Optional unique identifier */
  id?: string;
  /** Additional css classes to help with unique styling of the extensible toolbar */
  className?: string;
}>;

/**
 * Breakpoints for the tab toolbar, widest first, measured against the container's own outer box.
 * That box includes the container's horizontal padding, so roughly 32px of each number is padding
 * rather than room for controls — 16px below the narrowest threshold, where the container tightens
 * its padding and gaps to give the space to its controls. Unlike the application titlebar — where
 * the caption-button reserve lands inside or outside the measured box depending on the platform, so
 * `Toolbar` observes its padding-free inner row instead — this padding is the same everywhere, so
 * there is no cross-platform skew to correct.
 *
 * Estimated from the widths of the controls the toolbar carries rather than measured, so expect to
 * adjust them the first time this is watched in a running app.
 */
export const TAB_TOOLBAR_SHRINK_THRESHOLDS_PX = Object.freeze([520, 420, 340]);

/** Wrapper that allows consistent styling for both TabToolbar and TabFloatingMenu. */
export const TabToolbarContainer = React.forwardRef<HTMLDivElement, TabToolbarContainerProps>(
  ({ id, className, children }, ref) => {
    // The root node lives in state, not a ref: mutating `ref.current` does not re-run the effect
    // inside `useShrinkStep`, so a ref would leave the observer permanently unattached. The
    // forwarded ref is still populated alongside it so callers keep the node they expect.
    const [rootNode, setRootNode] = useState<HTMLDivElement | undefined>(undefined);

    // The forwarded ref is read through a ref of its own so `attachRoot` can have a stable
    // identity. Depending on `ref` directly would rebuild this callback whenever the caller passes
    // an inline one — React then detaches the old callback ref with `null` and attaches the new one
    // with the node on every render, and since each of those writes state, the render that follows
    // rebuilds the callback again. That is a render loop, and it is invisible until some caller
    // stops memoizing its ref.
    const forwardedRef = useRef(ref);
    forwardedRef.current = ref;

    const attachRoot = useCallback((node: HTMLDivElement | null) => {
      setRootNode(node ?? undefined);
      const currentRef = forwardedRef.current;
      if (typeof currentRef === 'function') currentRef(node);
      // Writing `ref.current` IS how an object ref is populated — React itself does exactly this
      // for a non-callback ref. There is no non-mutating alternative when forwarding one by hand,
      // which this component must do because it also needs the node in state for the observer.
      // eslint-disable-next-line no-param-reassign
      else if (currentRef) currentRef.current = node;
    }, []);

    const measuredShrinkStep = useShrinkStep(rootNode, TAB_TOOLBAR_SHRINK_THRESHOLDS_PX);
    // A `ShrinkStepOverride` above this wins, so stories and tests can pin a step where there is no
    // layout engine to measure with.
    const shrinkStep = useShrinkStepOverride() ?? measuredShrinkStep;

    // At the narrowest step the padding and inter-zone gaps below cost 48px of a ~300px row, while
    // the start zone is out of room for controls that have nothing shorter left to fall back to.
    // Halving both hands ~24px back, and it all lands in the start zone because that is the only
    // item in this row that grows and shrinks.
    //
    // Keying this off the step is safe: `useShrinkStep` measures this element's BORDER box, which
    // its own padding does not change, so tightening cannot feed back into which step is chosen.
    // For the same reason the thresholds above stay as written — what changes is how much of each
    // band's width reaches the controls, not where the bands fall.
    const isTightened = shrinkStep >= SHRINK_STEP.MINIMUM;

    return (
      <ShrinkStepContext.Provider value={shrinkStep}>
        <div
          ref={attachRoot}
          className={cn(
            'tw:sticky tw:top-0 tw:box-border tw:flex tw:h-14 tw:flex-row tw:items-center tw:justify-between tw:overflow-clip tw:py-2 tw:text-foreground tw:@container/toolbar',
            isTightened ? 'tw:gap-1 tw:px-2' : 'tw:gap-2 tw:px-4',
            className,
          )}
          id={id}
        >
          {children}
        </div>
      </ShrinkStepContext.Provider>
    );
  },
);

export default TabToolbarContainer;

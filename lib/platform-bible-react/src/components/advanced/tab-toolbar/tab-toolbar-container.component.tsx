import { Localized, MultiColumnMenu } from 'platform-bible-utils';
import React, { PropsWithChildren, ReactNode, useCallback, useState } from 'react';
import { ShrinkStepContext } from '@/context/shrink-step.context';
import { useShrinkStep } from '@/hooks/use-shrink-step.hook';
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
  /**
   * Overrides the shrink step this toolbar would otherwise measure from its own width, and
   * publishes it to descendants through `ShrinkStepContext`. Higher means narrower.
   *
   * Intended for stories and tests: measuring needs a layout engine, which jsdom does not have. In
   * the app, leave this unset and let the toolbar measure itself.
   */
  shrinkStep?: number;
}>;

/**
 * Container inline-size breakpoints for the tab toolbar, widest first.
 *
 * INITIAL ESTIMATES, summed from the current control widths rather than measured against the
 * running app. They are tuned with the `visual-verification` skill before this ships; treat a value
 * here as provisional until that has happened.
 */
export const TAB_TOOLBAR_SHRINK_THRESHOLDS_PX = Object.freeze([520, 420, 340]);

/** Wrapper that allows consistent styling for both TabToolbar and TabFloatingMenu. */
export const TabToolbarContainer = React.forwardRef<HTMLDivElement, TabToolbarContainerProps>(
  ({ id, className, children, shrinkStep: shrinkStepOverride }, ref) => {
    // The root node lives in state, not a ref: mutating `ref.current` does not re-run the effect
    // inside `useShrinkStep`, so a ref would leave the observer permanently unattached. The
    // forwarded ref is still populated alongside it so callers keep the node they expect.
    const [rootNode, setRootNode] = useState<HTMLDivElement | undefined>(undefined);

    const attachRoot = useCallback(
      (node: HTMLDivElement | null) => {
        setRootNode(node ?? undefined);
        if (typeof ref === 'function') ref(node);
        // Writing `ref.current` IS how an object ref is populated — React itself does exactly this
        // for a non-callback ref. There is no non-mutating alternative when forwarding one by hand,
        // which this component must do because it also needs the node in state for the observer.
        // eslint-disable-next-line no-param-reassign
        else if (ref) ref.current = node;
      },
      [ref],
    );

    const measuredShrinkStep = useShrinkStep(rootNode, TAB_TOOLBAR_SHRINK_THRESHOLDS_PX);
    const shrinkStep = shrinkStepOverride ?? measuredShrinkStep;

    return (
      <ShrinkStepContext.Provider value={shrinkStep}>
        <div
          ref={attachRoot}
          className={`tw:sticky tw:top-0 tw:box-border tw:flex tw:h-14 tw:flex-row tw:items-center tw:justify-between tw:gap-2 tw:overflow-clip tw:px-4 tw:py-2 tw:text-foreground tw:@container/toolbar ${className}`}
          id={id}
        >
          {children}
        </div>
      </ShrinkStepContext.Provider>
    );
  },
);

export default TabToolbarContainer;

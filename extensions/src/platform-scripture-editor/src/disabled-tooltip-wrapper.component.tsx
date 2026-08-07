import { ComponentPropsWithRef, ReactNode } from 'react';

export type DisabledTooltipWrapperProps = Omit<
  ComponentPropsWithRef<'div'>,
  'children' | 'role' | 'tabIndex' | 'aria-label'
> & {
  /** The control to wrap — typically a button that is `disabled` for the same reason. */
  children: ReactNode;
  /** `true` while the wrapped control is disabled. Drives the focusability and the accessible name. */
  isDisabled: boolean;
  /**
   * The localized explanation of WHY the control is disabled. Becomes the wrapper's accessible name
   * while disabled, so it should be the same text the tooltip shows.
   */
  disabledExplanation?: string;
};

/**
 * Focusable wrapper that lets a DISABLED control still host a tooltip.
 *
 * A disabled button is removed from the tab order and (in most browser/AT combinations) does not
 * fire the pointer and focus events Radix's `Tooltip` listens for — so the one moment the user most
 * needs the explanation ("why can't I use this?") is the one moment the button cannot deliver it.
 * Wrapping the control in a focusable, named element restores it: the wrapper takes the tooltip
 * trigger's place in the tab order and carries the explanation as its accessible name, so keyboard
 * and screen-reader users reach the same information pointer users get on hover. While the control
 * is ENABLED the wrapper is inert — no role, no tab stop, no name — leaving the button itself as
 * the single focusable, named thing.
 *
 * Render it as the `asChild` child of a `TooltipTrigger`; it forwards the trigger's props and ref
 * onto its `div`.
 *
 * The paragraph switcher in `platform-scripture-editor.web-view.tsx` still carries its own inline
 * copy of this pattern; adopting this component there is a follow-up.
 */
export function DisabledTooltipWrapper({
  children,
  isDisabled,
  disabledExplanation,
  ...props
}: DisabledTooltipWrapperProps) {
  return (
    <div
      // Radix's `TooltipTrigger asChild` clones this element with the trigger props it needs
      // (`data-state`, `aria-describedby`, the pointer/focus handlers, the ref). They are internal
      // to Radix and change between versions, so enumerating them here would be both brittle and
      // silently breaking — dropping any one of them stops the tooltip from opening.
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      role={isDisabled ? 'group' : undefined}
      // Disabled buttons cannot host their own tooltip; the wrapper must be focusable to surface
      // the explanation to keyboard and screen-reader users
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={isDisabled ? 0 : undefined}
      aria-label={isDisabled ? disabledExplanation : undefined}
    >
      {children}
    </div>
  );
}

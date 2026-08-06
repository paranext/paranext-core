import { ReactNode } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn-ui/tooltip';

export type DisabledActionTooltipProps = {
  /**
   * Whether the wrapped action(s) are currently disabled. While `true`, the wrapper becomes
   * focusable and labeled with `tooltipText` so the explanation stays reachable for keyboard and
   * screen-reader users.
   */
  disabled: boolean;
  /** Explanation shown in the tooltip, and used as the wrapper's `aria-label`, while `disabled`. */
  tooltipText: string;
  /** The action(s) to render — one or more buttons, a popover trigger, etc. */
  children: ReactNode;
  /** Optional class name for the focusable wrapper `div`. */
  className?: string;
};

/**
 * Wraps one or more actions (buttons, a popover trigger, etc.) that may be disabled, surfacing a
 * tooltip explanation while they are. A disabled `<button>` cannot itself host a tooltip or receive
 * focus, so this renders a focusable, labeled wrapper around the content instead — reachable via
 * keyboard/screen reader exactly while `disabled` is true.
 */
export function DisabledActionTooltip({
  disabled,
  tooltipText,
  children,
  className,
}: DisabledActionTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {/* When the action(s) are disabled they are not focusable, so make this wrapper
              focusable and named while disabled to keep the explanatory tooltip reachable for
              keyboard and screen-reader users. */}
          <div
            className={className}
            role={disabled ? 'group' : undefined}
            // Disabled buttons cannot host their own tooltip; the wrapper must be focusable to
            // surface the explanation to keyboard and screen-reader users.
            // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
            tabIndex={disabled ? 0 : undefined}
            aria-label={disabled ? tooltipText : undefined}
          >
            {children}
          </div>
        </TooltipTrigger>
        {disabled && (
          <TooltipContent>
            <p className="tw:max-w-xs tw:whitespace-pre-line">{tooltipText}</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}

export default DisabledActionTooltip;

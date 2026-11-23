import { ReactNode } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn-ui/tooltip';
import { DisabledTooltipWrapper } from './disabled-tooltip-wrapper.component';

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
 * tooltip explanation while they are, via {@link DisabledTooltipWrapper}. This is the convenience
 * shape for the common case of a single tooltip message driving both the wrapper's accessible name
 * and the tooltip body — use `DisabledTooltipWrapper` directly if the accessible name and the
 * tooltip content need to differ, or the `Tooltip` needs non-default props.
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
          <DisabledTooltipWrapper
            className={className}
            isDisabled={disabled}
            disabledExplanation={tooltipText}
          >
            {children}
          </DisabledTooltipWrapper>
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

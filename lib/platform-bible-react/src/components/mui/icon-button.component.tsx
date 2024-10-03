import '@/components/mui/icon-button.component.css';
import { IconButton as MuiIconButton } from '@mui/material';
import { MouseEventHandler, PropsWithChildren } from 'react';

export type IconButtonProps = PropsWithChildren<{
  /** Optional unique identifier */
  id?: string;
  /**
   * Required. Used as both the tooltip (aka, title) and the aria-label (used for accessibility,
   * testing, etc.), unless a distinct tooltip is supplied.
   */
  label: string;
  /**
   * Enabled status of button
   *
   * @default false
   */
  isDisabled?: boolean;
  /** Optional tooltip to display if different from the aria-label. */
  tooltip?: string;
  /** If true, no tooltip will be displayed. */
  isTooltipSuppressed?: boolean;
  /**
   * If given, uses a negative margin to counteract the padding on one side (this is often helpful
   * for aligning the left or right side of the icon with content above or below, without ruining
   * the border size and shape).
   *
   * @default false
   */
  adjustMarginToAlignToEdge?: 'end' | 'start' | false;
  /**
   * The size of the component. small is equivalent to the dense button styling.
   *
   * @default false
   */
  size: 'small' | 'medium' | 'large';
  /** Additional css classes to help with unique styling of the button */
  className?: string;
  /** Optional click handler */
  onClick?: MouseEventHandler<HTMLButtonElement>;
}>;

/**
 * Iconic button a user can click to do something
 *
 * Thanks to MUI for heavy inspiration and documentation
 * https://mui.com/material-ui/getting-started/overview/
 */
function IconButton({
  id,
  label,
  isDisabled = false,
  tooltip,
  isTooltipSuppressed = false,
  adjustMarginToAlignToEdge = false,
  size = 'medium',
  className,
  onClick,
  children,
}: IconButtonProps) {
  return (
    <MuiIconButton
      id={id}
      disabled={isDisabled}
      edge={adjustMarginToAlignToEdge}
      size={size}
      aria-label={label}
      title={isTooltipSuppressed ? undefined : (tooltip ?? label)}
      className={`papi-icon-button ${className ?? ''}`}
      onClick={onClick}
    >
      {children /* the icon to display */}
    </MuiIconButton>
  );
}

export default IconButton;

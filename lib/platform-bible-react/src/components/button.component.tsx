import { Button as MuiButton } from '@mui/material';
import { MouseEventHandler, PropsWithChildren } from 'react';
import './button.component.css';

export type ButtonProps = PropsWithChildren<{
  /** Optional unique identifier */
  id?: string;
  /**
   * Enabled status of button
   *
   * @default false
   */
  isDisabled?: boolean;
  /** Additional css classes to help with unique styling of the button */
  className?: string;
  /** Optional click handler */
  onClick?: MouseEventHandler<HTMLButtonElement>;
  /** Optional context menu handler */
  onContextMenu?: MouseEventHandler<HTMLButtonElement>;
}>;

/**
 * Button a user can click to do something
 *
 * Thanks to MUI for heavy inspiration and documentation
 * https://mui.com/material-ui/getting-started/overview/
 */
function Button({
  id,
  isDisabled = false,
  className,
  onClick,
  onContextMenu,
  children,
}: ButtonProps) {
  return (
    <MuiButton
      id={id}
      disabled={isDisabled}
      className={`papi-button ${className ?? ''}`}
      onClick={onClick}
      onContextMenu={onContextMenu}
    >
      {children}
    </MuiButton>
  );
}

export default Button;

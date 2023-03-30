import { Button as MuiButton } from '@mui/material';
import { MouseEventHandler, PropsWithChildren } from 'react';
import '@renderer/components/papi-components/button.css';

export type ButtonProps = PropsWithChildren<{
  /**
   * Enabled status of button
   * @default false
   */
  isDisabled?: boolean;
  /**
   * Additional css classes to help with unique styling of the button
   */
  className?: string;
  /**
   * Optional click handler
   */
  onClick?: MouseEventHandler<HTMLButtonElement>;
  /**
   * Optional context menu handler
   */
  onContextMenu?: MouseEventHandler<HTMLButtonElement>;
}>;

/**
 * Primary UI component for user interaction
 */
function Button({ isDisabled = false, className, onClick, onContextMenu, children }: ButtonProps) {
  return (
    <MuiButton
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

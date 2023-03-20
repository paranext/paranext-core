import { Button as MuiButton } from '@mui/material';
import { PropsWithChildren } from 'react';
import './button.css';

type ButtonProps = PropsWithChildren<{
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * Enabled status of button
   */
  disabled?: boolean;
  /**
   * Additional css classes to help with unique styling of the button
   */
  className?: string[];
  /**
   * Optional click handler
   */
  onClick?: () => void;
  /**
   * Optional context menu handler
   */
  onContextMenu?: () => void;
}>;

/**
 * Primary UI component for user interaction
 */
const Button = ({
  primary = false,
  disabled,
  className,
  onClick,
  onContextMenu,
  children,
}: ButtonProps) => {
  const mode = primary ? 'primary' : 'secondary';
  const disabledStatus = disabled ? 'disabled' : 'enabled';
  const additionalClasses = className?.join(' ') ?? '';
  return (
    <MuiButton
      className={['papi-button', mode, disabledStatus, additionalClasses].join(
        ' ',
      )}
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick();
        }
      }}
      onContextMenu={(e) => {
        if (onContextMenu) {
          e.preventDefault();
          onContextMenu();
        }
      }}
    >
      {children}
    </MuiButton>
  );
};

export default Button;

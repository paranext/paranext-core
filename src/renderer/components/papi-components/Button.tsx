import { Button as MuiButton } from '@mui/material';
import { MouseEventHandler, PropsWithChildren } from 'react';
import './button.css';

type ButtonProps = PropsWithChildren<{
  /**
   * Is this the principal call to action on the page?
   */
  isPrimary?: boolean;
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
  onClick?: MouseEventHandler<HTMLButtonElement>;
  /**
   * Optional context menu handler
   */
  onContextMenu?: MouseEventHandler<HTMLButtonElement>;
}>;

/**
 * Primary UI component for user interaction
 */
function Button({
  isPrimary = false,
  disabled,
  className,
  onClick,
  onContextMenu,
  children,
}: ButtonProps) {
  const mode = isPrimary ? 'primary' : 'secondary';
  const classNameString =
    (className && className.length > 0 && className.join(' ')) ?? '';
  return (
    <MuiButton
      disabled={disabled}
      className={['papi-button', mode, classNameString].join(' ')}
      onClick={onClick}
      onContextMenu={onContextMenu}
    >
      {children}
    </MuiButton>
  );
}

export default Button;

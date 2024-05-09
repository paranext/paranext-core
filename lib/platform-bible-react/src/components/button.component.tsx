import { Button as ShadButton } from '@/components/shadcn-ui/button';
import { MouseEventHandler, PropsWithChildren } from 'react';
import '@/components/button.component.css';

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
 * Thanks to Shadcn for heavy inspiration and documentation https://ui.shadcn.com/docs
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
    <ShadButton
      id={id}
      disabled={isDisabled}
      className={`papi-button ${className ?? ''}`}
      onClick={onClick}
      onContextMenu={onContextMenu}
    >
      {children}
    </ShadButton>
  );
}

export default Button;

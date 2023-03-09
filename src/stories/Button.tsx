import './button.css';
import { Button as MuiButton } from '@mui/material';

interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * Icon placed before the label on the button
   */
  startIcon?: string | undefined;
  /**
   * Button contents
   */
  label: string;
  /**
   * Icon placed after the label on the button
   */
  endIcon?: string | undefined;
  /**
   * Enabled status of button
   */
  disabled?: boolean;
  /**
   * Additional css classes to help with unique styling of the button
   */
  additionalCssClasses?: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
  /**
   * Optional context menu handler
   */
  onContextMenu?: () => void;
}

/**
 * Primary UI component for user interaction
 */
const Button = ({
  primary = false,
  startIcon,
  label,
  endIcon,
  disabled,
  additionalCssClasses,
  onClick,
  onContextMenu,
}: ButtonProps) => {
  const mode = primary ? 'primary' : 'secondary';
  const disabledStatus = disabled ? 'enabled' : 'disabled';
  const additionalClasses = additionalCssClasses ?? '';
  return (
    <MuiButton
      className={[
        'storybook-button',
        mode,
        disabledStatus,
        additionalClasses,
      ].join(' ')}
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
      {startIcon && (
        <div>
          <img alt="startIcon" src={startIcon} />
        </div>
      )}
      {label}
      {endIcon && (
        <div>
          <img alt="endIcon" src={endIcon} />
        </div>
      )}
    </MuiButton>
  );
};

export default Button;

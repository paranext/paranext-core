import { Switch as MuiSwitch } from '@mui/material';
import classes from './switch.module.css';

type SwitchProps = {
  /**
   * Is this the principal call to action on the page?
   * @default false
   */
  primary?: boolean;
  /**
   * Enabled status of switch
   * @default false
   */
  disabled?: boolean;
  /**
   * True when (input related to) switch is erroneous
   * @default false
   */
  error?: boolean;
  /**
   * Additional css classes to help with unique styling of the switch
   */
  className?: string[];
  /**
   * Optional click handler
   */
  onClick?: () => {};
  /**
   * Optional context menu handler
   */
  onContextMenu?: () => {};
};

/**
 * Primary UI component for user interaction
 */
function Button({
  primary = false,
  disabled = false,
  error = false,
  className,
  onClick,
  onContextMenu,
}: SwitchProps) {
  const mode = `${primary ? classes.primary : classes.secondary}`;
  const enabledClass = `${disabled ? classes.disabled : classes.enabled}`;
  const errorClass = `${error ? classes.error : ''}`;
  const additionalClasses =
    className &&
    className
      .map((cssClass) => {
        return `${classes[cssClass]}`;
      })
      .join(' ');
  return (
    <MuiSwitch
      disabled={disabled}
      className={[
        classes['papi-switch'],
        mode,
        enabledClass,
        errorClass,
        additionalClasses,
      ].join(' ')}
      onClick={(e) => {
        if (onClick && onClick.length !== 0) {
          e.preventDefault();
          onClick();
        }
      }}
      onContextMenu={(e) => {
        if (onContextMenu && onContextMenu.length !== 0) {
          e.preventDefault();
          onContextMenu();
        }
      }}
    />
  );
}

export default Button;

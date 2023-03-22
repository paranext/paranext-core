import { Switch as MuiSwitch } from '@mui/material';
import { ChangeEvent, MouseEventHandler } from 'react';
import './switch.css';

type SwitchProps = {
  /**
   * If `true`, the component is checked.
   */
  checked?: boolean;
  /**
   * Is this the principal call to action on the page?
   * @default false
   */
  isPrimary?: boolean;
  /**
   * Enabled status of switch
   * @default false
   */
  disabled?: boolean;
  /**
   * True when (input related to) switch is erroneous
   * @default false
   */
  hasError?: boolean;
  /**
   * Additional css classes to help with unique styling of the switch
   */
  className?: string[];
  /**
   * Optional change handler
   */
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  /**
   * Optional click handler
   */
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

/**
 * Primary UI component for user interaction
 */
function Switch({
  checked,
  isPrimary = false,
  disabled = false,
  hasError = false,
  className,
  onChange,
  onClick,
}: SwitchProps) {
  const primaryClass = isPrimary ? 'primary' : 'secondary';
  const errorClass = hasError ? 'error' : '';
  const classNameString = className?.join(' ') ?? '';

  return (
    <MuiSwitch
      checked={checked}
      disabled={disabled}
      className={[
        'papi-switch',
        primaryClass,
        errorClass,
        classNameString,
      ].join(' ')}
      onChange={onChange}
      onClick={onClick}
    />
  );
}

export default Switch;

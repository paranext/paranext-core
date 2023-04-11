import { Switch as MuiSwitch } from '@mui/material';
import { ChangeEvent } from 'react';
import '@renderer/components/papi-components/switch.component.css';

export type SwitchProps = {
  /**
   * If `true`, the component is checked.
   */
  isChecked?: boolean;
  /**
   * Enabled status of switch
   * @default false
   */
  isDisabled?: boolean;
  /**
   * True when (input related to) switch is erroneous
   * @default false
   */
  hasError?: boolean;
  /**
   * Additional css classes to help with unique styling of the switch
   */
  className?: string;
  /**
   * Callback fired when the state is changed.
   * @param event The event source of the callback. You can pull out the new value by accessing event.target.value (string).
   * You can pull out the new checked state by accessing event.target.checked (boolean).
   */
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

/**
 * Primary UI component for user interaction
 */
function Switch({
  isChecked: checked,
  isDisabled = false,
  hasError = false,
  className,
  onChange,
}: SwitchProps) {
  return (
    <MuiSwitch
      checked={checked}
      disabled={isDisabled}
      className={`papi-switch ${hasError ? 'error' : ''} ${className ?? ''}`}
      onChange={onChange}
    />
  );
}

export default Switch;

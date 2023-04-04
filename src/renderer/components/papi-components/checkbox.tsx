import { Checkbox as MuiCheckBox } from '@mui/material';
import { ChangeEvent } from 'react';
import '@renderer/components/papi-components/checkbox.css';

export type CheckboxProps = {
  /**
   * If `true`, the component is checked.
   */
  isChecked?: boolean;
  /**
   * If `true`, the component is in the indeterminate state.
   */
  isIndeterminate?: boolean;
  /**
   * If `true`, the component is checked by default.
   */
  defaultChecked?: boolean;
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
function CheckBox({
  isChecked: checked,
  isIndeterminate: indeterminate,
  defaultChecked = false,
  isDisabled = false,
  hasError = false,
  className,
  onChange,
}: CheckboxProps) {
  return (
    <MuiCheckBox
      checked={checked}
      indeterminate={indeterminate}
      defaultChecked={defaultChecked}
      disabled={isDisabled}
      className={`papi-check-box ${hasError ? 'error' : ''} ${className ?? ''}`}
      onChange={onChange}
    />
  );
}

export default CheckBox;

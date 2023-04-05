import { FormLabel, Checkbox as MuiCheckbox } from '@mui/material';
import { ChangeEvent } from 'react';
import '@renderer/components/papi-components/checkbox.css';

export type CheckboxProps = {
  /**
   * If `true`, the component is checked.
   */
  isChecked?: boolean;
  /**
   * If specified, the label that will appear associated with the checkbox.
   * @default '' (no label will be shown)
   */
  labelText?: string;
  /**
   * If `true`, the component is in the indeterminate state.
   * @default false
   */
  isIndeterminate?: boolean;
  /**
   * If `true`, the component is checked by default.
   * @default false
   */
  isDefaultChecked?: boolean;
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
function Checkbox({
  isChecked,
  labelText = '',
  isIndeterminate = false,
  isDefaultChecked = false,
  isDisabled = false,
  hasError = false,
  className,
  onChange,
}: CheckboxProps) {
  return (
    <FormLabel disabled={isDisabled} error={hasError}>
      <MuiCheckbox
        checked={isChecked}
        indeterminate={isIndeterminate}
        defaultChecked={isDefaultChecked}
        disabled={isDisabled}
        className={`papi-checkbox ${hasError ? 'error' : ''} ${className ?? ''}`}
        onChange={onChange}
      />
      {labelText}
    </FormLabel>
  );
}

export default Checkbox;

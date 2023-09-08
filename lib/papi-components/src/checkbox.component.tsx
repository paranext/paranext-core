import { FormControlLabel, Checkbox as MuiCheckbox } from '@mui/material';
import { ChangeEvent } from 'react';
import './checkbox.component.css';
import LabelPosition from './label-position.model';

export type CheckboxProps = {
  /**
   *  Optional unique identifier
   */
  id?: string;
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
   * Indicates the position of the label relative to the checkbox.
   * @default 'after'
   */
  labelPosition?: LabelPosition;
  /**
   * If `true`, the component is in the indeterminate state.
   * @default false
   */
  isIndeterminate?: boolean;
  /**
   * If `true`, the component is checked by default.
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

/* function CheckboxContainer({ labelText? = '', isDisabled : boolean, hasError : boolean, children? }) {
  return (
    <FormLabel disabled={isDisabled} error={hasError}>
      {children}
      labelText
    </FormLabel>
  );
} */

/**
 * Primary UI component for user interaction
 */
function Checkbox({
  id,
  isChecked,
  labelText = '',
  labelPosition = LabelPosition.After,
  isIndeterminate = false,
  isDefaultChecked,
  isDisabled = false,
  hasError = false,
  className,
  onChange,
}: CheckboxProps) {
  const checkBox = (
    <MuiCheckbox
      id={id}
      checked={isChecked}
      indeterminate={isIndeterminate}
      defaultChecked={isDefaultChecked}
      disabled={isDisabled}
      className={`papi-checkbox ${hasError ? 'error' : ''}`}
      onChange={onChange}
    />
  );

  let result;

  if (labelText) {
    const label = (
      <span className={`papi-checkbox-label ${hasError ? 'error' : ''}`}>{labelText}</span>
    );

    let placement: 'end' | 'start' | 'top' | 'bottom';
    switch (labelPosition) {
      case LabelPosition.After:
        placement = 'end';
        break;
      case LabelPosition.Above:
        placement = 'top';
        break;
      case LabelPosition.Below:
        placement = 'bottom';
        break;
      default:
        placement = 'start';
        break;
    }

    result = (
      <FormControlLabel
        className={`papi-checkbox ${labelPosition.toString()} ${className ?? ''}`}
        disabled={isDisabled}
        control={checkBox}
        label={label}
        labelPlacement={placement}
      />
    );
  } else {
    result = checkBox;
  }
  return result;
}

export default Checkbox;

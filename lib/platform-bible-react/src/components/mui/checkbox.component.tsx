import { FormLabel, Checkbox as MuiCheckbox } from '@mui/material';
import { ChangeEvent } from 'react';
import './checkbox.component.css';
import LabelPosition from './label-position.model';

export type CheckboxProps = {
  /** Optional unique identifier */
  id?: string;
  /** If `true`, the component is checked. */
  isChecked?: boolean;
  /**
   * If specified, the label that will appear associated with the checkbox.
   *
   * @default '' (no label will be shown)
   */
  labelText?: string;
  /**
   * Indicates the position of the label relative to the checkbox.
   *
   * @default 'after'
   */
  labelPosition?: LabelPosition;
  /**
   * If `true`, the component is in the indeterminate state.
   *
   * @default false
   */
  isIndeterminate?: boolean;
  /** If `true`, the component is checked by default. */
  isDefaultChecked?: boolean;
  /**
   * Enabled status of switch
   *
   * @default false
   */
  isDisabled?: boolean;
  /**
   * True when (input related to) switch is erroneous
   *
   * @default false
   */
  hasError?: boolean;
  /** Additional css classes to help with unique styling of the switch */
  className?: string;
  /**
   * Callback fired when the state is changed.
   *
   * @param event The event source of the callback. You can pull out the new value by accessing
   *   event.target.value (string). You can pull out the new checked state by accessing
   *   event.target.checked (boolean).
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

/** Primary UI component for user interaction */
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
      className={`papi-checkbox ${hasError ? 'error' : ''} ${className ?? ''}`}
      onChange={onChange}
    />
  );

  let result;

  if (labelText) {
    const preceding =
      labelPosition === LabelPosition.Before || labelPosition === LabelPosition.Above;

    const labelSpan = (
      <span className={`papi-checkbox-label ${hasError ? 'error' : ''} ${className ?? ''}`}>
        {labelText}
      </span>
    );

    const labelIsInline =
      labelPosition === LabelPosition.Before || labelPosition === LabelPosition.After;

    const label = labelIsInline ? labelSpan : <div>{labelSpan}</div>;

    const checkBoxElement = labelIsInline ? checkBox : <div>{checkBox}</div>;

    result = (
      <FormLabel
        className={`papi-checkbox ${labelPosition.toString()}`}
        disabled={isDisabled}
        error={hasError}
      >
        {preceding && label}
        {checkBoxElement}
        {!preceding && label}
      </FormLabel>
    );
  } else {
    result = checkBox;
  }
  return result;
}

export default Checkbox;

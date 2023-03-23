import {
  Autocomplete as MuiComboBox,
  AutocompleteChangeDetails as MuiComboBoxChangeDetails,
  AutocompleteChangeReason as MuiComboBoxChangeReason,
  TextField as MuiTextField,
} from '@mui/material';
import { FocusEventHandler, SyntheticEvent } from 'react';
import '@renderer/components/papi-components/combobox.css';

type ComboBoxProps = {
  /**
   * Text label title for combobox
   */
  title?: string;
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  isDisabled?: boolean;
  /**
   * True when (input related to) switch is erroneous
   * @default false
   */
  hasError?: boolean;
  /**
   * If `true`, the input will take up the full width of its container.
   * @default false
   */
  isFullWidth?: boolean;
  /**
   * List of available options for the dropdown menu
   */
  options?: readonly unknown[];
  /**
   * Additional css classes to help with unique styling of the button
   */
  className?: string[];
  /**
   * Triggers when content of textfield is changed
   */
  onChange?: (
    event: SyntheticEvent<Element, Event>,
    value: unknown,
    reason: MuiComboBoxChangeReason,
    details?: MuiComboBoxChangeDetails<unknown> | undefined,
  ) => void;
  /**
   * Triggers when textfield gets focus
   */
  onFocus?: FocusEventHandler<HTMLDivElement>; // Storybook crashes when giving the combo box focus
  /**
   * Triggers when textfield loses focus
   */
  onBlur?: FocusEventHandler<HTMLDivElement>;
};

function ComboBox({
  title,
  isDisabled = false,
  hasError = false,
  isFullWidth = false,
  options = [],
  className,
  onChange,
  onFocus,
  onBlur,
}: ComboBoxProps) {
  const errorClass = hasError ? 'error' : '';
  const classNameString = className?.join(' ') ?? '';

  return (
    <MuiComboBox
      disablePortal
      disabled={isDisabled}
      fullWidth={isFullWidth}
      options={options}
      className={['papi-combo-box', errorClass, classNameString].join(' ')}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      renderInput={(props) => (
        <MuiTextField
          {...props}
          error={hasError}
          fullWidth={isFullWidth}
          disabled={isDisabled}
          label={title}
        />
      )}
    />
  );
}

export default ComboBox;

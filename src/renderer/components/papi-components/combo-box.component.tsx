import {
  Autocomplete as MuiComboBox,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  TextField as MuiTextField,
} from '@mui/material';
import { FocusEventHandler, SyntheticEvent } from 'react';
import '@renderer/components/papi-components/combo-box.component.css';

export type ComboBoxChangeDetails<T = string> = AutocompleteChangeDetails<T>;
export type ComboBoxChangeReason = AutocompleteChangeReason;

export type ComboBoxProps = {
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
   * If `true`, the component can be cleared, and will have a button to do so
   * @default true
   */
  isClearable?: boolean;
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
   * Width of the combobox in pixels. Setting this prop overrides the `isFullWidth` prop
   */
  width?: number;
  /**
   * List of available options for the dropdown menu
   */
  options?: readonly (string | { label: string })[];
  /**
   * Additional css classes to help with unique styling of the combo box
   */
  className?: string;
  /**
   * The selected value that the combo box currently holds
   */
  value?: string;
  /**
   * Triggers when content of textfield is changed
   */
  onChange?: (
    event: SyntheticEvent<Element, Event>,
    value: unknown,
    reason?: ComboBoxChangeReason,
    details?: ComboBoxChangeDetails<unknown> | undefined,
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

/**
 * Dropdown selector displaying various options from which to choose
 *
 * Thanks to MUI for heavy inspiration and documentation
 * https://mui.com/material-ui/getting-started/overview/
 */
function ComboBox({
  title,
  isDisabled = false,
  isClearable = true,
  hasError = false,
  isFullWidth = false,
  width,
  options = [],
  className,
  value,
  onChange,
  onFocus,
  onBlur,
}: ComboBoxProps) {
  return (
    <MuiComboBox
      disablePortal
      disabled={isDisabled}
      disableClearable={!isClearable}
      fullWidth={isFullWidth}
      options={options}
      className={`papi-combo-box ${hasError ? 'error' : ''} ${className ?? ''}`}
      value={value}
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
          style={{ width }}
        />
      )}
    />
  );
}

export default ComboBox;

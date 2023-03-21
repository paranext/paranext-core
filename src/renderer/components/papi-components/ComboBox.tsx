import { Autocomplete as MuiComboBox } from '@mui/material';
import { FocusEventHandler } from 'react';
import './combobox.css';

import Textfield from './Textfield';

type ComboBoxProps = {
  /**
   * Text label title for combobox
   */
  title?: string;
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * True when (input related to) switch is erroneous
   * @default false
   */
  error?: boolean;
  /**
   * If `true`, the input will take up the full width of its container.
   * @default false
   */
  fullWidth?: boolean;
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
  onChange?: () => void; // This event handler does not have the suggested signature,
  // but using the suggested one leads to additional MUI import, and I'm not sure if that's a great idea
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
  disabled = false,
  error = false,
  fullWidth = false,
  options = [],
  className,
  onChange,
  onFocus,
  onBlur,
}: ComboBoxProps) {
  const errorClass = error ? 'error' : '';
  const classNameString = className?.join(' ') ?? '';

  return (
    <MuiComboBox
      disablePortal
      disabled={disabled}
      fullWidth={fullWidth}
      options={options}
      className={['papi-combo-box', errorClass, classNameString].join(' ')}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      renderInput={(props) => <Textfield {...props} label={title} />}
    />
  );
}

export default ComboBox;

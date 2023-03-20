import { Autocomplete as MuiComboBox } from '@mui/material';
import classes from './combobox.module.css';

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
  // /**
  //  * Triggers when content of textfield is changed
  //  */
  // onChange?: () => void;
  // /**
  //  * Triggers when textfield gets focus
  //  */
  // onFocus?: () => void;
  // /**
  //  * Triggers when textfield loses focus
  //  */
  // onBlur?: () => void;
};

function ComboBox({
  title,
  disabled = false,
  error = false,
  fullWidth = false,
  options = [],
  className,
}: // onChange,
// onFocus,
// onBlur,
ComboBoxProps) {
  const enabledClass = `${disabled ? classes.disabled : classes.enabled}`;
  const errorClass = `${error ? classes.error : ''}`;
  const fullWidthClass = `${fullWidth ? classes.fullwidth : ''}`;
  const additionalClasses =
    className &&
    className
      .map((cssClass) => {
        return `${classes[cssClass]}`;
      })
      .join(' ');

  return (
    <MuiComboBox
      disablePortal
      disabled={disabled}
      fullWidth={fullWidth}
      options={options}
      className={[
        classes['papi-combo-box'],
        enabledClass,
        errorClass,
        fullWidthClass,
        additionalClasses,
      ].join(' ')}
      // onChange={(e) => {
      //   if (onChange && onChange.length !== 0) {
      //     e.preventDefault();
      //     onChange();
      //   }
      // }}
      // onFocus={(e) => {
      //   if (onFocus && onFocus.length !== 0) {
      //     e.preventDefault();
      //     onFocus();
      //   }
      // }}
      // onBlur={(e) => {
      //   if (onBlur && onBlur.length !== 0) {
      //     e.preventDefault();
      //     onBlur();
      //   }
      // }}
      renderInput={(params) => <Textfield {...params} label={title} />}
    />
  );
}

export default ComboBox;

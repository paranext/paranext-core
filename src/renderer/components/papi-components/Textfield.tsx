import { PropsWithChildren } from 'react';
import { TextField as MuiTextfield } from '@mui/material';
import classes from './textfield.module.css';

type TextfieldProps = PropsWithChildren<{
  /**
   * The variant to use.
   * @default 'outlined'
   */
  variant: 'outlined' | 'filled';
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * If `true`, the label is displayed in an error state.
   * @default false
   */
  error?: boolean;
  /**
   * If `true`, the input will take up the full width of its container.
   * @default false
   */
  fullWidth?: boolean;
  /**
   * The helper text content.
   */
  helperText?: string;
  /**
   * The label content.
   */
  label?: string;
  /**
   * The short hint displayed in the `input` before the user enters a value.
   */
  placeholder?: string;
  /**
   * If `true`, the label is displayed as required and the `input` element is required.
   * @default false
   */
  required?: boolean;
  /**
   * Additional css classes to help with unique styling of the button
   */
  className?: string[];
  /**
   * Triggers when content of textfield is changed by user
   */
  onChange?: () => void;
  /**
   * Triggers when textfield gets focus
   */
  onFocus?: () => void;
  /**
   * Triggers when textfield loses focus
   */
  onBlur?: () => void;
}>;

function Textfield({
  variant = 'outlined',
  disabled = false,
  error = false,
  fullWidth = false,
  helperText,
  label,
  placeholder,
  required = false,
  className,
  onChange,
  onFocus,
  onBlur,
  children,
}: TextfieldProps) {
  const errorClass = error ? 'error' : '';
  const fullWidthClass = fullWidth ? 'full-width' : '';
  const additionalClasses =
    className &&
    className
      .map((cssClass: string) => {
        return `${classes[cssClass]}`;
      })
      .join(' ');

  return (
    <MuiTextfield
      variant={variant}
      disabled={disabled}
      error={error} // Do we want to do this or just use CSS?
      fullWidth={fullWidth} // Do we want to do this or just use CSS?
      helperText={helperText}
      label={label}
      placeholder={placeholder}
      required={required}
      className={[
        classes['papi-textfield'],
        errorClass,
        fullWidthClass,
        additionalClasses,
      ].join(' ')}
      onChange={(e) => {
        if (onChange) {
          e.preventDefault();
          onChange();
        }
      }}
      onFocus={(e) => {
        if (onFocus) {
          e.preventDefault();
          onFocus();
        }
      }}
      onBlur={(e) => {
        if (onBlur) {
          e.preventDefault();
          onBlur();
        }
      }}
    >
      {children}
    </MuiTextfield>
  );
}

export default Textfield;

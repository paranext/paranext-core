import { TextField as MuiTextfield } from '@mui/material';
import './textfield.css';

type TextfieldProps = {
  /**
   * The variant to use.
   * @default 'outlined'
   */
  variant?: 'outlined' | 'filled';
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
   * Triggers when content of textfield is changed
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
};

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
}: TextfieldProps) {
  const classNameString = className?.join(' ') ?? '';

  return (
    <MuiTextfield
      variant={variant}
      disabled={disabled}
      error={error}
      fullWidth={fullWidth}
      helperText={helperText}
      label={label}
      placeholder={placeholder}
      required={required}
      className={['papi-textfield', classNameString].join(' ')}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
}

export default Textfield;

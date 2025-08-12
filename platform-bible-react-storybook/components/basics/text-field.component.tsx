import { Input as ShadInput } from '@/components/shadcn-ui/input';
import { Label as ShadLabel } from '@/components/shadcn-ui/label';
import { cn } from '@/utils/shadcn-ui.util';
import { ChangeEventHandler, FocusEventHandler } from 'react';

export type TextFieldProps = {
  /** Optional unique identifier */
  id?: string;
  /**
   * If `true`, the component is disabled.
   *
   * @default false
   */
  isDisabled?: boolean;
  /**
   * If `true`, the label is displayed in an error state.
   *
   * @default false
   */
  hasError?: boolean;
  /**
   * If `true`, the input will take up the full width of its container.
   *
   * @default false
   */
  isFullWidth?: boolean;
  /** Text that gives the user instructions on what contents the TextField expects */
  helperText?: string;
  /** The title of the TextField */
  label?: string;
  /** The short hint displayed in the `input` before the user enters a value. */
  placeholder?: string;
  /**
   * If `true`, the label is displayed as required and the `input` element is required.
   *
   * @default false
   */
  isRequired?: boolean;
  /** Additional css classes to help with unique styling of the text field */
  className?: string;
  /** Starting value for the text field if it is not controlled */
  defaultValue?: string | number;
  /** Value of the text field if controlled */
  value?: string | number;
  /** Triggers when content of textfield is changed */
  onChange?: ChangeEventHandler<HTMLInputElement>;
  /** Triggers when textfield gets focus */
  onFocus?: FocusEventHandler<HTMLInputElement>;
  /** Triggers when textfield loses focus */
  onBlur?: FocusEventHandler<HTMLInputElement>;
};

/**
 * Text input field
 *
 * Thanks to Shadcn for heavy inspiration and documentation
 * https://ui.shadcn.com/docs/components/input#with-label
 */
export function TextField({
  id,
  isDisabled = false,
  hasError = false,
  isFullWidth = false,
  helperText,
  label,
  placeholder,
  isRequired = false,
  className,
  defaultValue,
  value,
  onChange,
  onFocus,
  onBlur,
}: TextFieldProps) {
  return (
    <div className={cn('tw-inline-grid tw-items-center tw-gap-1.5', { 'tw-w-full': isFullWidth })}>
      <ShadLabel
        htmlFor={id}
        className={cn({
          'tw-text-red-600': hasError,
          'tw-hidden': !label,
        })}
      >{`${label}${isRequired ? '*' : ''}`}</ShadLabel>
      <ShadInput
        id={id}
        disabled={isDisabled}
        placeholder={placeholder}
        required={isRequired}
        className={cn(className, { 'tw-border-red-600': hasError })}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <p className={cn({ 'tw-hidden': !helperText })}>{helperText}</p>
    </div>
  );
}

export default TextField;

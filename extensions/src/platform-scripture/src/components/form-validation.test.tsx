import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import React from 'react';
import {
  FormValidationRibbon,
  FieldError,
  ValidationFieldWrapper,
  useFormValidation,
  formatErrorMessage,
  createValidationError,
  FormValidationError,
} from './form-validation.component';

// Mock scrollIntoView since jsdom doesn't implement it
beforeAll(() => {
  Element.prototype.scrollIntoView = vi.fn();
});

// =====================================================
// FormValidationRibbon Tests
// =====================================================

describe('FormValidationRibbon', () => {
  const sampleErrors: FormValidationError[] = [
    {
      field: 'shortName',
      code: 'SHORTNAME_TOO_SHORT',
      message: 'Short name must be at least 3 characters',
      messageParams: { min: '3' },
    },
    {
      field: 'projectType',
      code: 'TYPE_NOT_SELECTED',
      message: 'Please select a project type',
    },
    {
      field: 'language',
      code: 'LANGUAGE_REQUIRED',
      message: 'Language must be selected',
    },
  ];

  it('should not render when there are no errors', () => {
    const { container } = render(<FormValidationRibbon errors={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('should render error ribbon with multiple errors', () => {
    render(<FormValidationRibbon errors={sampleErrors} />);

    // Should display the default title
    expect(screen.getByText(/Please correct the following errors/)).toBeInTheDocument();

    // Should display error count
    expect(screen.getByText(/3 errors/)).toBeInTheDocument();

    // Should display all error messages
    expect(screen.getByText('Short name must be at least 3 characters')).toBeInTheDocument();
    expect(screen.getByText('Please select a project type')).toBeInTheDocument();
    expect(screen.getByText('Language must be selected')).toBeInTheDocument();
  });

  it('should render single error with correct text', () => {
    const singleError: FormValidationError[] = [
      {
        field: 'shortName',
        code: 'SHORTNAME_TOO_SHORT',
        message: 'Single error message',
      },
    ];

    render(<FormValidationRibbon errors={singleError} />);

    expect(screen.getByText(/1 error/)).toBeInTheDocument();
    expect(screen.getByText('Single error message')).toBeInTheDocument();
  });

  it('should use localized strings when provided', () => {
    const localizedStrings = {
      '%form_validation_error_count%': '{count} validation issues',
      '%form_validation_error_single%': '1 validation issue',
      '%form_validation_errors_title%': 'Fix these problems:',
    };

    render(<FormValidationRibbon errors={sampleErrors} localizedStrings={localizedStrings} />);

    // The title and count are rendered together in the same element
    expect(screen.getByText(/Fix these problems:/)).toBeInTheDocument();
    expect(screen.getByText(/3 validation issues/)).toBeInTheDocument();
  });

  it('should call onErrorClick when error is clicked', () => {
    const onErrorClick = vi.fn();

    render(<FormValidationRibbon errors={sampleErrors} onErrorClick={onErrorClick} />);

    // Click the first error
    const errorButton = screen.getByText('Short name must be at least 3 characters');
    fireEvent.click(errorButton);

    expect(onErrorClick).toHaveBeenCalledTimes(1);
    expect(onErrorClick).toHaveBeenCalledWith(sampleErrors[0]);
  });

  it('should render errors as spans when no onErrorClick provided', () => {
    render(<FormValidationRibbon errors={sampleErrors} />);

    const errorText = screen.getByText('Short name must be at least 3 characters');
    expect(errorText.tagName).toBe('SPAN');
  });

  it('should render errors as buttons when onErrorClick provided', () => {
    const onErrorClick = vi.fn();
    render(<FormValidationRibbon errors={sampleErrors} onErrorClick={onErrorClick} />);

    const errorButton = screen.getByText('Short name must be at least 3 characters');
    expect(errorButton.tagName).toBe('BUTTON');
  });

  it('should have correct accessibility attributes', () => {
    render(<FormValidationRibbon errors={sampleErrors} />);

    const alert = screen.getByRole('alert');
    expect(alert).toHaveAttribute('aria-live', 'polite');
  });

  it('should apply custom className', () => {
    const { container } = render(
      <FormValidationRibbon errors={sampleErrors} className="custom-class" />,
    );

    const alert = container.querySelector('.custom-class');
    expect(alert).toBeInTheDocument();
  });

  it('should respect maxHeight prop for scrollable list', () => {
    render(<FormValidationRibbon errors={sampleErrors} maxHeight={200} />);

    const list = screen.getByRole('list');
    expect(list).toHaveStyle({ maxHeight: '200px' });
  });
});

// =====================================================
// FieldError Tests
// =====================================================

describe('FieldError', () => {
  it('should not render when no message provided', () => {
    const { container } = render(<FieldError />);
    expect(container.firstChild).toBeNull();
  });

  it('should not render when message is empty string', () => {
    const { container } = render(<FieldError message="" />);
    expect(container.firstChild).toBeNull();
  });

  it('should render error message', () => {
    render(<FieldError message="This field is required" />);

    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('should have correct accessibility attributes', () => {
    render(<FieldError message="Error message" id="test-error" />);

    const error = screen.getByRole('alert');
    expect(error).toHaveAttribute('id', 'test-error');
    expect(error).toHaveAttribute('aria-live', 'polite');
  });

  it('should apply custom className', () => {
    render(<FieldError message="Error" className="custom-error" />);

    const error = screen.getByRole('alert');
    expect(error).toHaveClass('custom-error');
  });

  it('should have destructive text styling', () => {
    render(<FieldError message="Error" />);

    const error = screen.getByRole('alert');
    expect(error).toHaveClass('tw-text-destructive');
  });
});

// =====================================================
// ValidationFieldWrapper Tests
// =====================================================

describe('ValidationFieldWrapper', () => {
  it('should render children', () => {
    render(
      <ValidationFieldWrapper fieldId="testField">
        <input data-testid="test-input" />
      </ValidationFieldWrapper>,
    );

    expect(screen.getByTestId('test-input')).toBeInTheDocument();
  });

  it('should not show error when no error provided', () => {
    render(
      <ValidationFieldWrapper fieldId="testField">
        <input data-testid="test-input" />
      </ValidationFieldWrapper>,
    );

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('should show error message when error provided', () => {
    const error: FormValidationError = {
      field: 'testField',
      code: 'REQUIRED',
      message: 'This field is required',
    };

    render(
      <ValidationFieldWrapper fieldId="testField" error={error}>
        <input data-testid="test-input" />
      </ValidationFieldWrapper>,
    );

    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('should call registerRef with focusable element', () => {
    const registerRef = vi.fn();

    render(
      <ValidationFieldWrapper fieldId="testField" registerRef={registerRef}>
        <input data-testid="test-input" />
      </ValidationFieldWrapper>,
    );

    expect(registerRef).toHaveBeenCalledWith('testField', expect.any(HTMLElement));
    // Should pass the input element (focusable)
    const [, element] = registerRef.mock.calls[0];
    expect(element.tagName).toBe('INPUT');
  });

  it('should apply custom className', () => {
    const { container } = render(
      <ValidationFieldWrapper fieldId="testField" className="custom-wrapper">
        <input />
      </ValidationFieldWrapper>,
    );

    expect(container.querySelector('.custom-wrapper')).toBeInTheDocument();
  });
});

// =====================================================
// useFormValidation Hook Tests
// =====================================================

describe('useFormValidation', () => {
  // Test component that uses the hook
  function TestComponent({
    errors,
    onFocusFirstError,
    onFocusField,
  }: {
    errors: FormValidationError[];
    onFocusFirstError?: () => void;
    onFocusField?: (fieldId: string) => void;
  }) {
    const {
      registerFieldRef,
      focusFirstError,
      focusField,
      getFieldError,
      hasErrors,
      getErrorsByField,
      createErrorClickHandler,
    } = useFormValidation();

    return (
      <div>
        <ValidationFieldWrapper
          fieldId="shortName"
          error={getFieldError('shortName', errors)}
          registerRef={registerFieldRef}
        >
          <input data-testid="short-name-input" id="shortName" />
        </ValidationFieldWrapper>

        <ValidationFieldWrapper
          fieldId="projectType"
          error={getFieldError('projectType', errors)}
          registerRef={registerFieldRef}
        >
          <select data-testid="project-type-select" id="projectType">
            <option value="">Select</option>
          </select>
        </ValidationFieldWrapper>

        <button
          data-testid="focus-first-error"
          type="button"
          onClick={() => {
            focusFirstError(errors);
            onFocusFirstError?.();
          }}
        >
          Focus First Error
        </button>

        <button
          data-testid="focus-field"
          type="button"
          onClick={() => {
            focusField('projectType');
            onFocusField?.('projectType');
          }}
        >
          Focus Project Type
        </button>

        <div data-testid="has-errors">{hasErrors(errors) ? 'true' : 'false'}</div>
        <div data-testid="error-count">{getErrorsByField(errors).size}</div>

        <FormValidationRibbon errors={errors} onErrorClick={createErrorClickHandler()} />
      </div>
    );
  }

  const sampleErrors: FormValidationError[] = [
    {
      field: 'shortName',
      code: 'SHORTNAME_TOO_SHORT',
      message: 'Short name error',
    },
    {
      field: 'projectType',
      code: 'TYPE_NOT_SELECTED',
      message: 'Project type error',
    },
  ];

  it('should return hasErrors as true when errors exist', () => {
    render(<TestComponent errors={sampleErrors} />);

    expect(screen.getByTestId('has-errors')).toHaveTextContent('true');
  });

  it('should return hasErrors as false when no errors', () => {
    render(<TestComponent errors={[]} />);

    expect(screen.getByTestId('has-errors')).toHaveTextContent('false');
  });

  it('should get field error correctly', () => {
    render(<TestComponent errors={sampleErrors} />);

    // The field wrapper should show the error - get all matching elements
    const shortNameErrors = screen.getAllByText('Short name error');
    expect(shortNameErrors.length).toBeGreaterThan(0);

    const projectTypeErrors = screen.getAllByText('Project type error');
    expect(projectTypeErrors.length).toBeGreaterThan(0);
  });

  it('should get errors by field', () => {
    render(<TestComponent errors={sampleErrors} />);

    expect(screen.getByTestId('error-count')).toHaveTextContent('2');
  });

  it('should focus first error when called', async () => {
    vi.useFakeTimers();
    const onFocusFirstError = vi.fn();

    render(<TestComponent errors={sampleErrors} onFocusFirstError={onFocusFirstError} />);

    const button = screen.getByTestId('focus-first-error');
    fireEvent.click(button);

    // Wait for the setTimeout in focusField
    await act(async () => {
      vi.advanceTimersByTime(150);
    });

    expect(onFocusFirstError).toHaveBeenCalled();
    // The first error is for shortName, so that input should be focused
    expect(document.activeElement).toBe(screen.getByTestId('short-name-input'));

    vi.useRealTimers();
  });

  it('should focus specific field when called', async () => {
    vi.useFakeTimers();
    const onFocusField = vi.fn();

    render(<TestComponent errors={sampleErrors} onFocusField={onFocusField} />);

    const button = screen.getByTestId('focus-field');
    fireEvent.click(button);

    // Wait for the setTimeout in focusField
    await act(async () => {
      vi.advanceTimersByTime(150);
    });

    expect(onFocusField).toHaveBeenCalledWith('projectType');
    expect(document.activeElement).toBe(screen.getByTestId('project-type-select'));

    vi.useRealTimers();
  });

  it('should handle createErrorClickHandler correctly', async () => {
    vi.useFakeTimers();

    render(<TestComponent errors={sampleErrors} />);

    // Click on an error in the ribbon - there are multiple elements with this text
    // so we need to click the button version (in the ribbon)
    const errorButtons = screen.getAllByText('Short name error');
    const ribbonButton = errorButtons.find((el) => el.tagName === 'BUTTON');
    expect(ribbonButton).toBeDefined();
    fireEvent.click(ribbonButton!);

    // Wait for the setTimeout in focusField
    await act(async () => {
      vi.advanceTimersByTime(150);
    });

    // The input for shortName should be focused
    expect(document.activeElement).toBe(screen.getByTestId('short-name-input'));

    vi.useRealTimers();
  });
});

// =====================================================
// Utility Functions Tests
// =====================================================

describe('formatErrorMessage', () => {
  it('should return template as-is when no params provided', () => {
    const result = formatErrorMessage('ERROR_CODE', 'This is an error message');
    expect(result).toBe('This is an error message');
  });

  it('should substitute single param', () => {
    const result = formatErrorMessage('SHORTNAME_TOO_SHORT', 'Name must be at least {min} chars', {
      min: '3',
    });
    expect(result).toBe('Name must be at least 3 chars');
  });

  it('should substitute multiple params', () => {
    const result = formatErrorMessage(
      'NAME_LENGTH',
      'Name must be between {min} and {max} characters',
      { min: '3', max: '8' },
    );
    expect(result).toBe('Name must be between 3 and 8 characters');
  });

  it('should substitute same param multiple times', () => {
    const result = formatErrorMessage('REPEATED', '{value} is repeated: {value}', {
      value: 'test',
    });
    expect(result).toBe('test is repeated: test');
  });

  it('should leave unknown placeholders unchanged', () => {
    const result = formatErrorMessage('ERROR', 'Value is {value}, unknown is {unknown}', {
      value: 'test',
    });
    expect(result).toBe('Value is test, unknown is {unknown}');
  });
});

describe('createValidationError', () => {
  it('should create error without params', () => {
    const error = createValidationError('fieldName', 'ERROR_CODE', 'Error message');

    expect(error).toEqual({
      field: 'fieldName',
      code: 'ERROR_CODE',
      message: 'Error message',
      messageParams: undefined,
    });
  });

  it('should create error with params', () => {
    const error = createValidationError('shortName', 'SHORTNAME_TOO_SHORT', 'Too short', {
      min: '3',
    });

    expect(error).toEqual({
      field: 'shortName',
      code: 'SHORTNAME_TOO_SHORT',
      message: 'Too short',
      messageParams: { min: '3' },
    });
  });
});

// =====================================================
// Error Clearing Behavior Tests
// =====================================================

describe('Error clearing behavior', () => {
  function FormWithValidation() {
    const [errors, setErrors] = React.useState<FormValidationError[]>([
      {
        field: 'shortName',
        code: 'SHORTNAME_TOO_SHORT',
        message: 'Clear test error message',
      },
    ]);
    const { registerFieldRef, getFieldError } = useFormValidation();

    const clearError = () => {
      setErrors([]);
    };

    return (
      <div>
        <FormValidationRibbon errors={errors} />
        <ValidationFieldWrapper
          fieldId="shortName"
          error={getFieldError('shortName', errors)}
          registerRef={registerFieldRef}
        >
          <input data-testid="clear-test-input" onChange={clearError} />
        </ValidationFieldWrapper>
      </div>
    );
  }

  it('should clear errors when field is corrected', () => {
    render(<FormWithValidation />);

    // Initially error should be visible (appears in both ribbon and field wrapper)
    const initialErrors = screen.getAllByText('Clear test error message');
    expect(initialErrors.length).toBeGreaterThan(0);

    // Simulate user correcting the field
    const input = screen.getByTestId('clear-test-input');
    fireEvent.change(input, { target: { value: 'ABC' } });

    // Error should be cleared
    expect(screen.queryByText('Clear test error message')).not.toBeInTheDocument();
  });
});

// =====================================================
// OK Button Disabled State Tests
// =====================================================

describe('OK button disabled state', () => {
  function FormWithOkButton({ errors }: { errors: FormValidationError[] }) {
    const { hasErrors } = useFormValidation();

    return (
      <div>
        <FormValidationRibbon errors={errors} />
        <button data-testid="ok-button" type="button" disabled={hasErrors(errors)}>
          OK
        </button>
      </div>
    );
  }

  it('should disable OK button when validation errors exist', () => {
    const errors: FormValidationError[] = [
      {
        field: 'shortName',
        code: 'REQUIRED',
        message: 'Required field',
      },
    ];

    render(<FormWithOkButton errors={errors} />);

    const okButton = screen.getByTestId('ok-button');
    expect(okButton).toBeDisabled();
  });

  it('should enable OK button when no validation errors', () => {
    render(<FormWithOkButton errors={[]} />);

    const okButton = screen.getByTestId('ok-button');
    expect(okButton).not.toBeDisabled();
  });
});

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi, describe, it, expect, beforeAll, beforeEach, afterEach } from 'vitest';
import {
  ChooseEncodingForm,
  testEncodingRoundTrip,
  DEFAULT_ENCODINGS,
  type EncodingInfo,
  type ChooseEncodingResult,
} from './choose-encoding-form.component';

// Mock scrollIntoView for JSDOM
beforeAll(() => {
  Element.prototype.scrollIntoView = vi.fn();
});

// =====================================================
// Test Data
// =====================================================

const defaultEncoding: EncodingInfo = {
  codePage: 65001,
  name: 'UTF-8',
  displayName: 'Unicode (UTF-8) - Recommended',
};

const windows1252Encoding: EncodingInfo = {
  codePage: 1252,
  name: 'Windows-1252',
  displayName: 'Western European (Windows-1252)',
};

const sampleText = `\\id MAT
\\c 1
\\v 1 In the beginning was the Word...`;

const sampleTextWithSpecialChars = `\\id MAT
\\c 1
\\v 1 Special characters: \u00e9\u00e8\u00ea \u00fc\u00f6\u00e4`;

// =====================================================
// testEncodingRoundTrip Function Tests
// =====================================================

describe('testEncodingRoundTrip', () => {
  describe('UTF-8 encoding', () => {
    it('should pass for ASCII text', async () => {
      const result = await testEncodingRoundTrip('Hello World', defaultEncoding);

      expect(result.success).toBe(true);
      expect(result.message).toContain('passed');
    });

    it('should pass for text with Unicode characters', async () => {
      const result = await testEncodingRoundTrip(sampleTextWithSpecialChars, defaultEncoding);

      expect(result.success).toBe(true);
      expect(result.message).toContain('passed');
    });

    it('should pass for multiline text', async () => {
      const result = await testEncodingRoundTrip(sampleText, defaultEncoding);

      expect(result.success).toBe(true);
      expect(result.message).toContain('passed');
    });

    it('should pass for empty string', async () => {
      const result = await testEncodingRoundTrip('', defaultEncoding);

      expect(result.success).toBe(true);
    });
  });

  describe('Legacy encodings', () => {
    it('should pass for ASCII-only text with Windows-1252', async () => {
      const result = await testEncodingRoundTrip('Hello World', windows1252Encoding);

      expect(result.success).toBe(true);
    });

    it('should handle text with special characters in legacy encoding', async () => {
      const result = await testEncodingRoundTrip(sampleTextWithSpecialChars, windows1252Encoding);

      // May pass with a note about verification
      expect(result.success).toBe(true);
      expect(result.message).toBeDefined();
    });
  });
});

// =====================================================
// DEFAULT_ENCODINGS Tests
// =====================================================

describe('DEFAULT_ENCODINGS', () => {
  it('should have UTF-8 as the first encoding', () => {
    expect(DEFAULT_ENCODINGS[0].codePage).toBe(65001);
    expect(DEFAULT_ENCODINGS[0].name).toBe('UTF-8');
  });

  it('should include Recommended in UTF-8 display name', () => {
    expect(DEFAULT_ENCODINGS[0].displayName).toContain('Recommended');
  });

  it('should have at least 5 common encodings', () => {
    expect(DEFAULT_ENCODINGS.length).toBeGreaterThanOrEqual(5);
  });

  it('should have unique code pages', () => {
    const codePages = DEFAULT_ENCODINGS.map((e) => e.codePage);
    const uniqueCodePages = new Set(codePages);
    expect(uniqueCodePages.size).toBe(codePages.length);
  });

  it('should include Windows-1252 for legacy support', () => {
    const windows1252 = DEFAULT_ENCODINGS.find((e) => e.codePage === 1252);
    expect(windows1252).toBeDefined();
    expect(windows1252?.name).toBe('Windows-1252');
  });

  it('should include ISO-8859-1 for legacy support', () => {
    const iso88591 = DEFAULT_ENCODINGS.find((e) => e.codePage === 28591);
    expect(iso88591).toBeDefined();
  });
});

// =====================================================
// ChooseEncodingForm Component Tests
// =====================================================

describe('ChooseEncodingForm', () => {
  const defaultProps = {
    currentEncoding: defaultEncoding,
    sampleText,
  };

  describe('Initial rendering', () => {
    it('should render the dialog title', () => {
      render(<ChooseEncodingForm {...defaultProps} />);

      expect(screen.getByText('Choose Encoding')).toBeInTheDocument();
    });

    it('should render the encoding dropdown with current encoding selected', () => {
      render(<ChooseEncodingForm {...defaultProps} />);

      expect(screen.getByRole('combobox', { name: /select encoding/i })).toBeInTheDocument();
      expect(screen.getByText(defaultEncoding.displayName)).toBeInTheDocument();
    });

    it('should render the sample text preview', () => {
      render(<ChooseEncodingForm {...defaultProps} />);

      expect(screen.getByText('Sample text:')).toBeInTheDocument();
      const textarea = screen.getByRole('textbox', { name: /sample text preview/i });
      expect(textarea).toBeInTheDocument();
      expect(textarea).toHaveValue(sampleText);
    });

    it('should render sample text as read-only', () => {
      render(<ChooseEncodingForm {...defaultProps} />);

      const textarea = screen.getByRole('textbox', { name: /sample text preview/i });
      expect(textarea).toHaveAttribute('readonly');
    });

    it('should render Test button', () => {
      render(<ChooseEncodingForm {...defaultProps} />);

      expect(screen.getByRole('button', { name: 'Test' })).toBeInTheDocument();
    });

    it('should render OK and Cancel buttons', () => {
      render(<ChooseEncodingForm {...defaultProps} />);

      expect(screen.getByRole('button', { name: 'OK' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    });

    it('should use default sample text when none provided', () => {
      render(<ChooseEncodingForm currentEncoding={defaultEncoding} />);

      const textarea = screen.getByRole('textbox', { name: /sample text preview/i });
      expect(textarea.textContent).toContain('\\id MAT');
    });

    it('should not display test result initially', () => {
      render(<ChooseEncodingForm {...defaultProps} />);

      expect(screen.queryByText(/test passed/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/test failed/i)).not.toBeInTheDocument();
    });
  });

  describe('Encoding dropdown', () => {
    it('should render encoding dropdown with current encoding displayed', () => {
      render(<ChooseEncodingForm {...defaultProps} />);

      // The dropdown trigger should be present and show the current encoding
      const trigger = screen.getByRole('combobox', { name: /select encoding/i });
      expect(trigger).toBeInTheDocument();

      // The current encoding display name should be visible
      expect(screen.getByText(defaultEncoding.displayName)).toBeInTheDocument();
    });

    it('should render encoding dropdown with label', () => {
      render(<ChooseEncodingForm {...defaultProps} />);

      expect(screen.getByText('Encoding:')).toBeInTheDocument();
      expect(screen.getByLabelText(/select encoding/i)).toBeInTheDocument();
    });

    it('should display different encoding when provided as currentEncoding', () => {
      render(<ChooseEncodingForm currentEncoding={windows1252Encoding} />);

      expect(screen.getByText(windows1252Encoding.displayName)).toBeInTheDocument();
    });
  });

  describe('Test button', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should show loading state when clicked', async () => {
      vi.useRealTimers();
      render(<ChooseEncodingForm {...defaultProps} />);

      const testButton = screen.getByRole('button', { name: 'Test' });
      fireEvent.click(testButton);

      // Should show loading state
      await waitFor(() => {
        expect(screen.getByText(/testing/i)).toBeInTheDocument();
      });
    });

    it('should disable Test button while testing', async () => {
      vi.useRealTimers();
      render(<ChooseEncodingForm {...defaultProps} />);

      const testButton = screen.getByRole('button', { name: 'Test' });
      fireEvent.click(testButton);

      await waitFor(() => {
        expect(testButton).toBeDisabled();
      });
    });

    it('should show success alert after test passes', async () => {
      vi.useRealTimers();
      render(<ChooseEncodingForm {...defaultProps} />);

      const testButton = screen.getByRole('button', { name: 'Test' });
      fireEvent.click(testButton);

      await waitFor(
        () => {
          expect(screen.getByText(/test passed/i)).toBeInTheDocument();
        },
        { timeout: 2000 },
      );
    });

    it('should clear test result when encoding changes', async () => {
      vi.useRealTimers();
      render(<ChooseEncodingForm {...defaultProps} />);

      // Run a test
      const testButton = screen.getByRole('button', { name: 'Test' });
      fireEvent.click(testButton);

      await waitFor(
        () => {
          expect(screen.getByText(/test passed/i)).toBeInTheDocument();
        },
        { timeout: 2000 },
      );

      // Change encoding
      const trigger = screen.getByRole('combobox', { name: /select encoding/i });
      fireEvent.click(trigger);

      await waitFor(() => {
        const windows1252Option = screen.getByText('Western European (Windows-1252)');
        fireEvent.click(windows1252Option);
      });

      // Test result should be cleared
      expect(screen.queryByText(/test passed/i)).not.toBeInTheDocument();
    });
  });

  describe('Form submission', () => {
    it('should call onSubmit with selected encoding when OK is clicked', () => {
      const onSubmit = vi.fn();
      render(<ChooseEncodingForm {...defaultProps} onSubmit={onSubmit} />);

      fireEvent.click(screen.getByRole('button', { name: 'OK' }));

      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit).toHaveBeenCalledWith({
        encoding: defaultEncoding,
      });
    });

    it('should return the updated encoding after selection change', async () => {
      const onSubmit = vi.fn<(result: ChooseEncodingResult) => void>();
      render(<ChooseEncodingForm {...defaultProps} onSubmit={onSubmit} />);

      // Open dropdown and select new encoding
      const trigger = screen.getByRole('combobox', { name: /select encoding/i });
      fireEvent.click(trigger);

      await waitFor(() => {
        const windows1252Option = screen.getByText('Western European (Windows-1252)');
        fireEvent.click(windows1252Option);
      });

      // Submit
      fireEvent.click(screen.getByRole('button', { name: 'OK' }));

      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          encoding: expect.objectContaining({
            codePage: 1252,
            name: 'Windows-1252',
          }),
        }),
      );
    });
  });

  describe('Form cancellation', () => {
    it('should call onCancel when Cancel is clicked', () => {
      const onCancel = vi.fn();
      render(<ChooseEncodingForm {...defaultProps} onCancel={onCancel} />);

      fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));

      expect(onCancel).toHaveBeenCalledTimes(1);
    });

    it('should not call onSubmit when Cancel is clicked', () => {
      const onSubmit = vi.fn();
      const onCancel = vi.fn();
      render(<ChooseEncodingForm {...defaultProps} onSubmit={onSubmit} onCancel={onCancel} />);

      fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));

      expect(onCancel).toHaveBeenCalledTimes(1);
      expect(onSubmit).not.toHaveBeenCalled();
    });
  });

  describe('Localized strings', () => {
    it('should use localized dialog title when provided', () => {
      const localizedStrings = {
        '%choose_encoding_dialog_title%': 'Seleccionar codificacion',
      };

      render(<ChooseEncodingForm {...defaultProps} localizedStrings={localizedStrings} />);

      expect(screen.getByText('Seleccionar codificacion')).toBeInTheDocument();
    });

    it('should use localized button texts when provided', () => {
      const localizedStrings = {
        '%choose_encoding_ok%': 'Aceptar',
        '%choose_encoding_cancel%': 'Cancelar',
        '%choose_encoding_test_button%': 'Probar',
      };

      render(<ChooseEncodingForm {...defaultProps} localizedStrings={localizedStrings} />);

      expect(screen.getByRole('button', { name: 'Aceptar' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Cancelar' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Probar' })).toBeInTheDocument();
    });

    it('should use localized test success message', async () => {
      vi.useRealTimers();
      const localizedStrings = {
        '%choose_encoding_test_success%': 'La prueba fue exitosa.',
      };

      render(<ChooseEncodingForm {...defaultProps} localizedStrings={localizedStrings} />);

      fireEvent.click(screen.getByRole('button', { name: 'Test' }));

      await waitFor(
        () => {
          expect(screen.getByText('La prueba fue exitosa.')).toBeInTheDocument();
        },
        { timeout: 2000 },
      );
    });
  });

  describe('Custom className', () => {
    it('should apply custom className to container', () => {
      const { container } = render(
        <ChooseEncodingForm {...defaultProps} className="custom-class" />,
      );

      expect(container.querySelector('.custom-class')).toBeInTheDocument();
    });
  });
});

// =====================================================
// Accessibility Tests
// =====================================================

describe('Accessibility', () => {
  it('should have accessible labels for encoding dropdown', () => {
    render(<ChooseEncodingForm currentEncoding={defaultEncoding} />);

    const label = screen.getByText('Encoding:');
    expect(label).toHaveAttribute('for', 'encoding-select');
  });

  it('should have accessible label for sample text', () => {
    render(<ChooseEncodingForm currentEncoding={defaultEncoding} />);

    const textarea = screen.getByRole('textbox', { name: /sample text preview/i });
    expect(textarea).toBeInTheDocument();
  });

  it('should indicate busy state on Test button while testing', async () => {
    render(<ChooseEncodingForm currentEncoding={defaultEncoding} />);

    const testButton = screen.getByRole('button', { name: 'Test' });
    fireEvent.click(testButton);

    await waitFor(() => {
      expect(testButton).toHaveAttribute('aria-busy', 'true');
    });
  });
});

// =====================================================
// Edge Cases
// =====================================================

describe('Edge cases', () => {
  it('should handle missing onSubmit callback gracefully', () => {
    render(<ChooseEncodingForm currentEncoding={defaultEncoding} />);

    // Should not throw when clicking OK without onSubmit
    expect(() => {
      fireEvent.click(screen.getByRole('button', { name: 'OK' }));
    }).not.toThrow();
  });

  it('should handle missing onCancel callback gracefully', () => {
    render(<ChooseEncodingForm currentEncoding={defaultEncoding} />);

    // Should not throw when clicking Cancel without onCancel
    expect(() => {
      fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    }).not.toThrow();
  });

  it('should handle empty sample text', () => {
    render(<ChooseEncodingForm currentEncoding={defaultEncoding} sampleText="" />);

    const textarea = screen.getByRole('textbox', { name: /sample text preview/i });
    expect(textarea).toHaveValue('');
  });
});

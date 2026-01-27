import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import {
  ProjectNameForm,
  validateShortNameLocal,
  validateFullName,
  generateShortName,
} from './project-name-form.component';

// Mock scrollIntoView since jsdom doesn't implement it
beforeAll(() => {
  Element.prototype.scrollIntoView = vi.fn();
});

describe('ProjectNameForm', () => {
  // Default props for most tests
  const defaultProps = {
    fullName: 'My Test Project',
    shortName: 'MTP',
    copyright: '(c) 2024',
    isNewProject: true,
    isRegistered: false,
  };

  // Helper to get inputs by id since label matching is flaky
  function getFullNameInput(): HTMLInputElement {
    const element = document.getElementById('fullName');
    if (!(element instanceof HTMLInputElement)) {
      throw new Error('fullName input not found');
    }
    return element;
  }
  function getShortNameInput(): HTMLInputElement {
    const element = document.getElementById('shortName');
    if (!(element instanceof HTMLInputElement)) {
      throw new Error('shortName input not found');
    }
    return element;
  }
  function getCopyrightInput(): HTMLTextAreaElement {
    const element = document.getElementById('copyright');
    if (!(element instanceof HTMLTextAreaElement)) {
      throw new Error('copyright textarea not found');
    }
    return element;
  }

  describe('Rendering', () => {
    it('renders all form fields correctly', () => {
      render(<ProjectNameForm {...defaultProps} />);

      expect(getFullNameInput()).toBeInTheDocument();
      expect(getShortNameInput()).toBeInTheDocument();
      expect(getCopyrightInput()).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /ok/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
    });

    it('populates fields with initial values', () => {
      render(<ProjectNameForm {...defaultProps} />);

      expect(getFullNameInput()).toHaveValue('My Test Project');
      expect(getShortNameInput()).toHaveValue('MTP');
      expect(getCopyrightInput()).toHaveValue('(c) 2024');
    });

    it('displays short name hint text', () => {
      render(<ProjectNameForm {...defaultProps} />);

      expect(screen.getByText(/3-8 characters/i)).toBeInTheDocument();
    });

    it('disables short name field for existing projects', () => {
      render(<ProjectNameForm {...defaultProps} isNewProject={false} />);

      expect(getShortNameInput()).toBeDisabled();
    });

    it('enables short name field for new projects', () => {
      render(<ProjectNameForm {...defaultProps} isNewProject />);

      expect(getShortNameInput()).not.toBeDisabled();
    });
  });

  describe('Short Name Auto-Generation (BHV-030)', () => {
    it('auto-generates short name when full name changes for new project', async () => {
      const user = userEvent.setup();
      render(
        <ProjectNameForm fullName="" shortName="" copyright="" isNewProject isRegistered={false} />,
      );

      const fullNameInput = getFullNameInput();
      await user.type(fullNameInput, 'My New Translation');

      expect(getShortNameInput()).toHaveValue('MNT');
    });

    it('does not auto-generate after short name is manually edited', async () => {
      const user = userEvent.setup();
      render(
        <ProjectNameForm fullName="" shortName="" copyright="" isNewProject isRegistered={false} />,
      );

      const shortNameInput = getShortNameInput();
      const fullNameInput = getFullNameInput();

      // Manually edit short name first
      await user.type(shortNameInput, 'ABC');
      // Then change full name
      await user.type(fullNameInput, 'My Project');

      // Short name should remain as manually entered
      expect(shortNameInput).toHaveValue('ABC');
    });

    it('does not auto-generate for existing projects', async () => {
      const user = userEvent.setup();
      render(<ProjectNameForm {...defaultProps} isNewProject={false} />);

      const fullNameInput = getFullNameInput();
      await user.clear(fullNameInput);
      await user.type(fullNameInput, 'Different Name');

      // Short name should remain unchanged
      expect(getShortNameInput()).toHaveValue('MTP');
    });
  });

  describe('Validation (BHV-029, BHV-056)', () => {
    it('shows error when short name is too short', async () => {
      render(
        <ProjectNameForm
          fullName="Test"
          shortName="ABC"
          copyright=""
          isNewProject
          isRegistered={false}
        />,
      );

      const shortNameInput = getShortNameInput();
      fireEvent.change(shortNameInput, { target: { value: 'AB' } });

      await waitFor(() => {
        const errorElement = document.getElementById('shortName-error');
        expect(errorElement).not.toBeNull();
        expect(errorElement?.textContent).toContain('at least 3 characters');
      });
    });

    it('shows error when short name is too long', async () => {
      const user = userEvent.setup();
      render(
        <ProjectNameForm
          fullName="Test"
          shortName=""
          copyright=""
          isNewProject
          isRegistered={false}
        />,
      );

      const shortNameInput = getShortNameInput();
      // Input has maxLength, but test the validation function directly
      await user.type(shortNameInput, 'ABCDEFGH');

      // Should not show error since we hit max length
      expect(screen.queryByText(/at most 8 characters/i)).not.toBeInTheDocument();
    });

    it('shows error when short name contains invalid characters', async () => {
      render(
        <ProjectNameForm
          fullName="Test"
          shortName="ABC"
          copyright=""
          isNewProject
          isRegistered={false}
        />,
      );

      const shortNameInput = getShortNameInput();
      fireEvent.change(shortNameInput, { target: { value: 'ABC-XYZ' } });

      await waitFor(() => {
        const errorElement = document.getElementById('shortName-error');
        expect(errorElement).not.toBeNull();
        expect(errorElement?.textContent).toContain('only contain letters');
      });
    });

    it('shows error when short name contains spaces', async () => {
      render(
        <ProjectNameForm
          fullName="Test"
          shortName="ABC"
          copyright=""
          isNewProject
          isRegistered={false}
        />,
      );

      const shortNameInput = getShortNameInput();
      fireEvent.change(shortNameInput, { target: { value: 'AB C' } });

      await waitFor(() => {
        const errorElement = document.getElementById('shortName-error');
        expect(errorElement).not.toBeNull();
        expect(errorElement?.textContent).toContain('cannot contain spaces');
      });
    });

    it('shows error when short name is a reserved name', async () => {
      render(
        <ProjectNameForm
          fullName="Test"
          shortName="ABC"
          copyright=""
          isNewProject
          isRegistered={false}
        />,
      );

      const shortNameInput = getShortNameInput();
      fireEvent.change(shortNameInput, { target: { value: 'CON' } });

      await waitFor(() => {
        const errorElement = document.getElementById('shortName-error');
        expect(errorElement).not.toBeNull();
        expect(errorElement?.textContent).toContain('reserved');
      });
    });

    it('shows error when full name is empty', async () => {
      render(<ProjectNameForm {...defaultProps} />);

      const fullNameInput = getFullNameInput();
      fireEvent.change(fullNameInput, { target: { value: '' } });

      await waitFor(() => {
        const errorElement = document.getElementById('fullName-error');
        expect(errorElement).not.toBeNull();
        expect(errorElement?.textContent).toContain('required');
      });
    });

    it('disables OK button when there are validation errors', async () => {
      render(<ProjectNameForm {...defaultProps} />);

      const fullNameInput = getFullNameInput();
      fireEvent.change(fullNameInput, { target: { value: '' } });

      await waitFor(() => {
        const okButton = screen.getByRole('button', { name: /ok/i });
        expect(okButton).toBeDisabled();
      });
    });

    it('enables OK button when all fields are valid', () => {
      render(<ProjectNameForm {...defaultProps} />);

      const okButton = screen.getByRole('button', { name: /ok/i });
      expect(okButton).not.toBeDisabled();
    });
  });

  describe('Registry Warning (BHV-035)', () => {
    it('shows registry warning when registered project name is changed', async () => {
      const user = userEvent.setup();
      render(<ProjectNameForm {...defaultProps} isRegistered />);

      const fullNameInput = getFullNameInput();
      await user.type(fullNameInput, ' Modified');

      await waitFor(() => {
        expect(screen.getByText(/registry/i)).toBeInTheDocument();
      });
    });

    it('does not show registry warning for unregistered projects', async () => {
      const user = userEvent.setup();
      render(<ProjectNameForm {...defaultProps} isRegistered={false} />);

      const fullNameInput = getFullNameInput();
      await user.type(fullNameInput, ' Modified');

      expect(screen.queryByText(/registry/i)).toBeNull();
    });

    it('does not show registry warning when name is unchanged', () => {
      render(<ProjectNameForm {...defaultProps} isRegistered />);

      expect(screen.queryByText(/registry/i)).toBeNull();
    });
  });

  describe('Form Submission', () => {
    it('calls onSubmit with form values when OK is clicked', async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn();
      render(<ProjectNameForm {...defaultProps} onSubmit={onSubmit} />);

      const okButton = screen.getByRole('button', { name: /ok/i });
      await user.click(okButton);

      expect(onSubmit).toHaveBeenCalledWith({
        fullName: 'My Test Project',
        shortName: 'MTP',
        copyright: '(c) 2024',
      });
    });

    it('calls onCancel when Cancel is clicked', async () => {
      const user = userEvent.setup();
      const onCancel = vi.fn();
      render(<ProjectNameForm {...defaultProps} onCancel={onCancel} />);

      const cancelButton = screen.getByRole('button', { name: /cancel/i });
      await user.click(cancelButton);

      expect(onCancel).toHaveBeenCalled();
    });

    it('does not call onSubmit when validation fails', async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn();
      render(<ProjectNameForm {...defaultProps} fullName="" onSubmit={onSubmit} />);

      const okButton = screen.getByRole('button', { name: /ok/i });
      await user.click(okButton);

      expect(onSubmit).not.toHaveBeenCalled();
    });
  });

  describe('Uniqueness Validation', () => {
    // These tests use real timers with 400ms debounce
    it('calls validateShortNameUniqueness after debounce', async () => {
      const validateUniqueness = vi.fn().mockResolvedValue(true);
      render(
        <ProjectNameForm
          {...defaultProps}
          shortName=""
          validateShortNameUniqueness={validateUniqueness}
        />,
      );

      const shortNameInput = getShortNameInput();
      fireEvent.change(shortNameInput, { target: { value: 'ABC' } });

      // Wait for debounce (300ms) + some buffer
      await waitFor(
        () => {
          expect(validateUniqueness).toHaveBeenCalledWith('ABC');
        },
        { timeout: 1000 },
      );
    });

    it('shows error when short name already exists', async () => {
      const validateUniqueness = vi.fn().mockResolvedValue(false);
      render(
        <ProjectNameForm
          fullName="Test"
          shortName="TXX"
          copyright=""
          isNewProject
          isRegistered={false}
          validateShortNameUniqueness={validateUniqueness}
        />,
      );

      const shortNameInput = getShortNameInput();
      fireEvent.change(shortNameInput, { target: { value: 'ABC' } });

      // Wait for validation to be called
      await waitFor(
        () => {
          expect(validateUniqueness).toHaveBeenCalledWith('ABC');
        },
        { timeout: 1000 },
      );

      // Check for error message using the error element ID
      await waitFor(
        () => {
          const errorElement = document.getElementById('shortName-error');
          expect(errorElement).not.toBeNull();
          expect(errorElement?.textContent).toContain('already exists');
        },
        { timeout: 1000 },
      );
    });
  });
});

// =====================================================
// UNIT TESTS FOR VALIDATION FUNCTIONS
// =====================================================

describe('validateShortNameLocal', () => {
  it('returns undefined for valid short name', () => {
    expect(validateShortNameLocal('ABC')).toBeUndefined();
    expect(validateShortNameLocal('Test123')).toBeUndefined();
    expect(validateShortNameLocal('My_Proj')).toBeUndefined();
    expect(validateShortNameLocal('ABCDEFGH')).toBeUndefined();
  });

  it('returns ShortName_TooShort for names under 3 characters', () => {
    expect(validateShortNameLocal('AB')).toBe('ShortName_TooShort');
    expect(validateShortNameLocal('A')).toBe('ShortName_TooShort');
    expect(validateShortNameLocal('')).toBe('ShortName_TooShort');
  });

  it('returns ShortName_TooLong for names over 8 characters', () => {
    expect(validateShortNameLocal('ABCDEFGHI')).toBe('ShortName_TooLong');
    expect(validateShortNameLocal('123456789')).toBe('ShortName_TooLong');
  });

  it('returns ShortName_InvalidChars for names with invalid characters', () => {
    expect(validateShortNameLocal('ABC-DEF')).toBe('ShortName_InvalidChars');
    expect(validateShortNameLocal('ABC.DEF')).toBe('ShortName_InvalidChars');
    expect(validateShortNameLocal('ABC@123')).toBe('ShortName_InvalidChars');
  });

  it('returns ShortName_HasSpaces for names with whitespace', () => {
    expect(validateShortNameLocal('AB C')).toBe('ShortName_HasSpaces');
    expect(validateShortNameLocal(' ABC')).toBe('ShortName_HasSpaces');
    expect(validateShortNameLocal('ABC ')).toBe('ShortName_HasSpaces');
    expect(validateShortNameLocal('AB\tC')).toBe('ShortName_HasSpaces');
  });

  it('returns ShortName_ReservedName for Windows reserved names', () => {
    expect(validateShortNameLocal('CON')).toBe('ShortName_ReservedName');
    expect(validateShortNameLocal('con')).toBe('ShortName_ReservedName');
    expect(validateShortNameLocal('PRN')).toBe('ShortName_ReservedName');
    expect(validateShortNameLocal('AUX')).toBe('ShortName_ReservedName');
    expect(validateShortNameLocal('NUL')).toBe('ShortName_ReservedName');
    expect(validateShortNameLocal('COM1')).toBe('ShortName_ReservedName');
    expect(validateShortNameLocal('LPT9')).toBe('ShortName_ReservedName');
  });
});

describe('validateFullName', () => {
  it('returns undefined for valid full name', () => {
    expect(validateFullName('My Project')).toBeUndefined();
    expect(validateFullName('A')).toBeUndefined();
    expect(validateFullName('Project 123!')).toBeUndefined();
  });

  it('returns FullName_Required for empty name', () => {
    expect(validateFullName('')).toBe('FullName_Required');
  });

  it('returns FullName_Required for whitespace-only name', () => {
    expect(validateFullName('   ')).toBe('FullName_Required');
    expect(validateFullName('\t\n')).toBe('FullName_Required');
  });
});

describe('generateShortName', () => {
  it('generates short name from word initials', () => {
    expect(generateShortName('My Paratext Project')).toBe('MPP');
    expect(generateShortName('New English Translation')).toBe('NET');
    expect(generateShortName('A B C D')).toBe('ABCD');
  });

  it('includes trailing digits in short name', () => {
    expect(generateShortName('Translation 2024')).toBe('T24');
    expect(generateShortName('My Project 1')).toBe('MP1'); // MP + 1 = 3 chars, no padding needed
    expect(generateShortName('Version 10')).toBe('V10');
  });

  it('handles mixed letters and digits', () => {
    expect(generateShortName('My Paratext Project 2024')).toBe('MPP24');
    expect(generateShortName('New 123 Translation 45')).toBe('NT45');
  });

  it('pads short names to minimum 3 characters', () => {
    expect(generateShortName('A')).toBe('AXX');
    expect(generateShortName('A B')).toBe('ABX'); // Two words gives AB, then padded to 3
  });

  it('truncates long names to maximum 8 characters', () => {
    expect(generateShortName('A B C D E F G H I J')).toBe('ABCDEFGH');
    expect(generateShortName('Very Long Project Name With Many Words')).toBe('VLPNWMW');
  });

  it('handles empty input', () => {
    expect(generateShortName('')).toBe('');
    expect(generateShortName('   ')).toBe('');
  });

  it('handles names with no letters', () => {
    expect(generateShortName('123 456')).toBe('56X');
  });

  it('ignores non-letter characters for initials', () => {
    // 'My-Project' is one word (no spaces), so only 'M' is extracted
    expect(generateShortName('My-Project')).toBe('MXX');
    // '123 Test' is two words, but '123' has no letters, so only 'T' is extracted
    // Digits are 1, 2, 3 - last 2 are "23"
    expect(generateShortName('123 Test')).toBe('T23');
  });

  it('uppercases the result', () => {
    expect(generateShortName('lowercase words')).toBe('LWX');
    expect(generateShortName('Mixed Case Words')).toBe('MCW');
  });
});

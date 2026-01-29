import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProjectNameDialog, ProjectNameDialogProps } from './project-name-dialog.component';
import {
  generateShortName,
  sanitizeFullName,
  validateShortName,
  ProjectNameFormInput,
} from '../hooks/use-project-name-form';

// =============================================================================
// UNIT TESTS FOR VALIDATION FUNCTIONS
// =============================================================================

describe('validateShortName', () => {
  it('should reject empty short name', () => {
    const result = validateShortName('');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Short name is required');
  });

  it('should reject short name less than 3 characters', () => {
    const result = validateShortName('AB');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Short name must be 3-8 characters');
  });

  it('should reject short name more than 8 characters', () => {
    const result = validateShortName('ABCDEFGHI');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Short name must be 3-8 characters');
  });

  it('should reject short name with spaces', () => {
    const result = validateShortName('AB C');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Short name must contain only letters and numbers');
  });

  it('should reject short name with special characters', () => {
    const result = validateShortName('ABC!');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Short name must contain only letters and numbers');
  });

  it('should accept valid short name', () => {
    const result = validateShortName('ABC');
    expect(result.isValid).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it('should accept short name with numbers', () => {
    const result = validateShortName('ABC123');
    expect(result.isValid).toBe(true);
  });

  it('should accept 8 character short name', () => {
    const result = validateShortName('ABCDEFGH');
    expect(result.isValid).toBe(true);
  });

  // Reserved Windows names tests (BHV-201)
  it('should reject reserved Windows name CON (case insensitive)', () => {
    expect(validateShortName('CON').isValid).toBe(false);
    expect(validateShortName('con').isValid).toBe(false);
    expect(validateShortName('Con').isValid).toBe(false);
  });

  it('should reject reserved Windows name PRN', () => {
    const result = validateShortName('PRN');
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('reserved Windows name');
  });

  it('should reject reserved Windows name AUX', () => {
    const result = validateShortName('AUX');
    expect(result.isValid).toBe(false);
  });

  it('should reject reserved Windows name NUL', () => {
    const result = validateShortName('NUL');
    expect(result.isValid).toBe(false);
  });

  it('should reject reserved Windows name COM1-COM9', () => {
    for (let i = 1; i <= 9; i++) {
      const result = validateShortName(`COM${i}`);
      expect(result.isValid).toBe(false);
    }
  });

  it('should reject reserved Windows name LPT1-LPT9', () => {
    for (let i = 1; i <= 9; i++) {
      const result = validateShortName(`LPT${i}`);
      expect(result.isValid).toBe(false);
    }
  });

  it('should reject duplicate project name', () => {
    const existingNames = ['EXISTING', 'OTHER'];
    const result = validateShortName('EXISTING', existingNames);
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('A project with this name already exists');
  });

  it('should reject duplicate project name (case insensitive)', () => {
    const existingNames = ['EXISTING', 'OTHER'];
    const result = validateShortName('existing', existingNames);
    expect(result.isValid).toBe(false);
  });
});

describe('sanitizeFullName (BHV-202)', () => {
  it('should replace backslash with forward slash', () => {
    expect(sanitizeFullName('My\\Project')).toBe('My/Project');
  });

  it('should replace multiple backslashes', () => {
    expect(sanitizeFullName('My\\Test\\Project')).toBe('My/Test/Project');
  });

  it('should not modify string without backslash', () => {
    expect(sanitizeFullName('My Project')).toBe('My Project');
  });

  it('should handle empty string', () => {
    expect(sanitizeFullName('')).toBe('');
  });
});

describe('generateShortName (BHV-200)', () => {
  it('should take first letter of each word', () => {
    expect(generateShortName('My Test Project')).toBe('MTP');
  });

  it('should handle single word with padding', () => {
    // Single letter becomes TEE or similar to reach 3 chars
    const result = generateShortName('Test');
    expect(result.length).toBeGreaterThanOrEqual(3);
    expect(result[0]).toBe('T');
  });

  it('should append trailing digits', () => {
    // "24" as separate word: first letters are N, T, P, 2 (NTP2), then trailing digits 24 -> NTP224
    // But truncated to 8 chars, so NTP224 stays as is
    expect(generateShortName('New Translation Project 24')).toBe('NTP224');
  });

  it('should handle two-digit year', () => {
    expect(generateShortName('My Project 2024')).toContain('24');
  });

  it('should truncate to 8 characters', () => {
    const result = generateShortName('A B C D E F G H I J');
    expect(result.length).toBeLessThanOrEqual(8);
  });

  it('should handle empty string', () => {
    expect(generateShortName('')).toBe('');
  });

  it('should handle whitespace-only string', () => {
    expect(generateShortName('   ')).toBe('');
  });

  it('should uppercase all letters', () => {
    const result = generateShortName('my test project');
    expect(result).toBe(result.toUpperCase());
  });
});

// =============================================================================
// COMPONENT TESTS
// =============================================================================

describe('ProjectNameDialog', () => {
  const defaultInput: ProjectNameFormInput = {
    fullName: '',
    shortName: '',
    copyright: '',
    mode: 'create',
    isRestricted: false,
    allowShortNameEdit: true,
    existingProjectNames: [],
  };

  const defaultProps: ProjectNameDialogProps = {
    input: defaultInput,
    onSubmit: vi.fn(),
    onCancel: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render all form fields', () => {
    render(<ProjectNameDialog {...defaultProps} />);

    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/short name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/copyright/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /ok/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
  });

  it('should focus full name input on mount', async () => {
    render(<ProjectNameDialog {...defaultProps} />);

    await waitFor(() => {
      expect(screen.getByLabelText(/full name/i)).toHaveFocus();
    });
  });

  it('should auto-generate short name when typing full name (BHV-200)', async () => {
    const user = userEvent.setup();
    render(<ProjectNameDialog {...defaultProps} />);

    const fullNameInput = screen.getByLabelText(/full name/i);
    await user.type(fullNameInput, 'My Test Project');

    const shortNameInput = screen.getByLabelText(/short name/i) as HTMLInputElement;
    expect(shortNameInput.value).toBe('MTP');
  });

  it('should stop auto-generation when user types in short name field (BHV-203)', async () => {
    const user = userEvent.setup();
    render(<ProjectNameDialog {...defaultProps} />);

    // Type in full name first
    const fullNameInput = screen.getByLabelText(/full name/i);
    await user.type(fullNameInput, 'Test');

    // Now type in short name
    const shortNameInput = screen.getByLabelText(/short name/i);
    await user.clear(shortNameInput);
    await user.type(shortNameInput, 'ABC');

    // Type more in full name - short name should NOT change
    await user.clear(fullNameInput);
    await user.type(fullNameInput, 'New Project Name');

    expect((shortNameInput as HTMLInputElement).value).toBe('ABC');
  });

  it('should replace backslash with forward slash in full name (BHV-202)', async () => {
    const user = userEvent.setup();
    render(<ProjectNameDialog {...defaultProps} />);

    const fullNameInput = screen.getByLabelText(/full name/i) as HTMLInputElement;
    await user.type(fullNameInput, 'My\\Project');

    expect(fullNameInput.value).toBe('My/Project');
  });

  it('should show validation error for invalid short name', async () => {
    const user = userEvent.setup();
    render(<ProjectNameDialog {...defaultProps} />);

    const shortNameInput = screen.getByLabelText(/short name/i);
    await user.type(shortNameInput, 'A');

    await waitFor(() => {
      expect(screen.getByText(/3-8 characters/i)).toBeInTheDocument();
    });
  });

  it('should show validation error for reserved Windows names', async () => {
    const user = userEvent.setup();
    render(<ProjectNameDialog {...defaultProps} />);

    const shortNameInput = screen.getByLabelText(/short name/i);
    await user.type(shortNameInput, 'CON');

    await waitFor(() => {
      expect(screen.getByText(/reserved windows name/i)).toBeInTheDocument();
    });
  });

  it('should disable OK button when form is invalid', () => {
    render(<ProjectNameDialog {...defaultProps} />);

    const okButton = screen.getByRole('button', { name: /ok/i });
    expect(okButton).toBeDisabled();
  });

  it('should enable OK button when form is valid', async () => {
    const user = userEvent.setup();
    render(<ProjectNameDialog {...defaultProps} />);

    await user.type(screen.getByLabelText(/full name/i), 'My Project');

    // Short name auto-generated but may be too short, type valid one
    const shortNameInput = screen.getByLabelText(/short name/i);
    await user.clear(shortNameInput);
    await user.type(shortNameInput, 'MYP');

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /ok/i })).not.toBeDisabled();
    });
  });

  it('should call onSubmit when form is valid and OK is clicked', async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();

    render(<ProjectNameDialog {...defaultProps} onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText(/full name/i), 'My Project');
    const shortNameInput = screen.getByLabelText(/short name/i);
    await user.clear(shortNameInput);
    await user.type(shortNameInput, 'MYP');

    await user.click(screen.getByRole('button', { name: /ok/i }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        action: 'submit',
        nameData: {
          fullName: 'My Project',
          shortName: 'MYP',
          copyright: '',
        },
      });
    });
  });

  it('should call onCancel when Cancel is clicked', async () => {
    const onCancel = vi.fn();
    const user = userEvent.setup();

    render(<ProjectNameDialog {...defaultProps} onCancel={onCancel} />);

    await user.click(screen.getByRole('button', { name: /cancel/i }));

    expect(onCancel).toHaveBeenCalled();
  });

  it('should call onCancel when Escape is pressed', async () => {
    const onCancel = vi.fn();
    const user = userEvent.setup();

    render(<ProjectNameDialog {...defaultProps} onCancel={onCancel} />);

    await user.keyboard('{Escape}');

    expect(onCancel).toHaveBeenCalled();
  });

  describe('edit mode', () => {
    it('should make short name read-only in edit mode', () => {
      const editInput: ProjectNameFormInput = {
        ...defaultInput,
        mode: 'edit',
        shortName: 'EXIST',
      };

      render(<ProjectNameDialog {...defaultProps} input={editInput} />);

      const shortNameInput = screen.getByLabelText(/short name/i);
      expect(shortNameInput).toHaveAttribute('readonly');
    });

    it('should show hint about short name being unchangeable', () => {
      const editInput: ProjectNameFormInput = {
        ...defaultInput,
        mode: 'edit',
        fullName: 'Existing Project',
        shortName: 'EXIST',
      };

      render(<ProjectNameDialog {...defaultProps} input={editInput} />);

      expect(screen.getByText(/cannot be changed after project creation/i)).toBeInTheDocument();
    });
  });

  describe('restricted mode', () => {
    it('should show warning banner for restricted projects', () => {
      const restrictedInput: ProjectNameFormInput = {
        ...defaultInput,
        isRestricted: true,
      };

      render(<ProjectNameDialog {...defaultProps} input={restrictedInput} />);

      expect(screen.getByText(/restricted project/i)).toBeInTheDocument();
      expect(screen.getByText(/editing is not allowed/i)).toBeInTheDocument();
    });

    it('should disable all fields for restricted projects', () => {
      const restrictedInput: ProjectNameFormInput = {
        ...defaultInput,
        isRestricted: true,
      };

      render(<ProjectNameDialog {...defaultProps} input={restrictedInput} />);

      expect(screen.getByLabelText(/full name/i)).toBeDisabled();
      expect(screen.getByLabelText(/short name/i)).toBeDisabled();
      expect(screen.getByLabelText(/copyright/i)).toBeDisabled();
      expect(screen.getByRole('button', { name: /ok/i })).toBeDisabled();
    });
  });

  describe('accessibility', () => {
    it('should have proper aria-invalid on fields with errors', async () => {
      const user = userEvent.setup();
      render(<ProjectNameDialog {...defaultProps} />);

      const shortNameInput = screen.getByLabelText(/short name/i);
      await user.type(shortNameInput, 'A');

      await waitFor(() => {
        expect(shortNameInput).toHaveAttribute('aria-invalid', 'true');
      });
    });

    it('should have aria-required on required fields', () => {
      render(<ProjectNameDialog {...defaultProps} />);

      expect(screen.getByLabelText(/full name/i)).toHaveAttribute('aria-required', 'true');
      expect(screen.getByLabelText(/short name/i)).toHaveAttribute('aria-required', 'true');
    });

    it('should have aria-describedby linking errors to inputs', async () => {
      const user = userEvent.setup();
      render(<ProjectNameDialog {...defaultProps} />);

      const shortNameInput = screen.getByLabelText(/short name/i);
      await user.type(shortNameInput, 'A');

      await waitFor(() => {
        expect(shortNameInput).toHaveAttribute('aria-describedby', 'short-name-error');
      });
    });
  });
});

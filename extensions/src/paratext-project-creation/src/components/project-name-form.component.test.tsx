import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ProjectNameForm } from './project-name-form.component';
import type { ProjectNameFormProps } from 'paratext-project-creation';

// Mock @papi/frontend
vi.mock('@papi/frontend', () => ({
  default: {
    commands: {
      sendCommand: vi.fn(),
    },
  },
  logger: {
    warn: vi.fn(),
  },
}));

// Mock @papi/frontend/react
vi.mock('@papi/frontend/react', () => ({
  useLocalizedStrings: () => [{}],
}));

// Mock lucide-react
vi.mock('lucide-react', () => ({
  AlertCircle: () => <span data-testid="alert-circle-icon" />,
}));

// Import the mocked papi to control responses
const { default: papi } = await import('@papi/frontend');
const mockSendCommand = papi.commands.sendCommand as ReturnType<typeof vi.fn>;

const defaultProps: ProjectNameFormProps = {
  fullName: 'Test Project',
  shortName: 'TST',
  copyright: 'Copyright 2026',
  isNewProject: true,
  isRegistered: false,
  onConfirm: vi.fn(),
  onCancel: vi.fn(),
};

describe('ProjectNameForm', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    mockSendCommand.mockReset();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  // --- Snapshot Tests ---

  it('renders default state for new project', () => {
    const { container } = render(<ProjectNameForm {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it('renders edit mode (existing project) with read-only short name', () => {
    const { container } = render(<ProjectNameForm {...defaultProps} isNewProject={false} />);
    expect(container).toMatchSnapshot();
  });

  it('renders registry warning for registered project with changed name', () => {
    const { container } = render(<ProjectNameForm {...defaultProps} isRegistered />);
    // Change the full name to trigger warning
    const fullNameInput = screen.getByLabelText(/full name/i);
    fireEvent.change(fullNameInput, { target: { value: 'Changed Name' } });
    expect(container).toMatchSnapshot();
  });

  // --- Interaction Tests ---

  it('focuses full name input on mount', () => {
    render(<ProjectNameForm {...defaultProps} />);
    expect(screen.getByLabelText(/full name/i)).toHaveFocus();
  });

  it('disables short name field for existing projects', () => {
    render(<ProjectNameForm {...defaultProps} isNewProject={false} />);
    expect(screen.getByLabelText(/short name/i)).toBeDisabled();
  });

  it('enables short name field for new projects', () => {
    render(<ProjectNameForm {...defaultProps} />);
    expect(screen.getByLabelText(/short name/i)).not.toBeDisabled();
  });

  it('calls onCancel when Cancel button is clicked', () => {
    const onCancel = vi.fn();
    render(<ProjectNameForm {...defaultProps} onCancel={onCancel} />);
    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
    expect(onCancel).toHaveBeenCalledOnce();
  });

  it('calls onCancel when Escape is pressed', () => {
    const onCancel = vi.fn();
    render(<ProjectNameForm {...defaultProps} onCancel={onCancel} />);
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' });
    expect(onCancel).toHaveBeenCalledOnce();
  });

  it('calls onConfirm with form data when OK is clicked', () => {
    const onConfirm = vi.fn();
    render(<ProjectNameForm {...defaultProps} onConfirm={onConfirm} />);
    fireEvent.click(screen.getByRole('button', { name: /ok/i }));
    expect(onConfirm).toHaveBeenCalledWith({
      fullName: 'Test Project',
      shortName: 'TST',
      copyright: 'Copyright 2026',
    });
  });

  it('calls onConfirm via Enter key on input fields', () => {
    const onConfirm = vi.fn();
    render(<ProjectNameForm {...defaultProps} onConfirm={onConfirm} />);
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Enter' });
    expect(onConfirm).toHaveBeenCalledOnce();
  });

  it('updates full name when typed', () => {
    render(<ProjectNameForm {...defaultProps} />);
    const input = screen.getByLabelText(/full name/i);
    fireEvent.change(input, { target: { value: 'New Name' } });
    expect(input).toHaveValue('New Name');
  });

  it('updates copyright when typed', () => {
    render(<ProjectNameForm {...defaultProps} />);
    const textarea = screen.getByLabelText(/copyright/i);
    fireEvent.change(textarea, { target: { value: 'New Copyright' } });
    expect(textarea).toHaveValue('New Copyright');
  });

  it('shows registry warning when registered project name changes', () => {
    render(<ProjectNameForm {...defaultProps} isRegistered />);
    const input = screen.getByLabelText(/full name/i);
    fireEvent.change(input, { target: { value: 'Changed Name' } });
    expect(screen.getByText(/changing the name of a registered project/i)).toBeInTheDocument();
  });

  it('does not show registry warning for unregistered projects', () => {
    render(<ProjectNameForm {...defaultProps} isRegistered={false} />);
    const input = screen.getByLabelText(/full name/i);
    fireEvent.change(input, { target: { value: 'Changed Name' } });
    expect(
      screen.queryByText(/changing the name of a registered project/i),
    ).not.toBeInTheDocument();
  });

  it('disables OK when full name is empty', () => {
    render(<ProjectNameForm {...defaultProps} fullName="" shortName="" />);
    expect(screen.getByRole('button', { name: /ok/i })).toBeDisabled();
  });

  it('auto-generates short name on full name blur for new projects', async () => {
    mockSendCommand.mockResolvedValueOnce('NPN');

    render(<ProjectNameForm {...defaultProps} fullName="" shortName="" />);
    const input = screen.getByLabelText(/full name/i);
    fireEvent.change(input, { target: { value: 'New Project Name' } });
    fireEvent.blur(input);

    await waitFor(() => {
      expect(mockSendCommand).toHaveBeenCalledWith(
        'paratextProjectCreation.generateShortName',
        'New Project Name',
      );
    });
  });

  it('validates short name with debounce on change', async () => {
    mockSendCommand.mockResolvedValue({ isValid: true });

    render(<ProjectNameForm {...defaultProps} />);
    const input = screen.getByLabelText(/short name/i);
    fireEvent.change(input, { target: { value: 'NEW' } });

    // Validation should not fire immediately
    expect(mockSendCommand).not.toHaveBeenCalledWith(
      'paratextProjectCreation.validateShortName',
      expect.anything(),
      expect.anything(),
      expect.anything(),
    );

    // Advance past debounce
    await act(async () => {
      vi.advanceTimersByTime(300);
    });

    await waitFor(() => {
      expect(mockSendCommand).toHaveBeenCalledWith(
        'paratextProjectCreation.validateShortName',
        'NEW',
        true,
        undefined,
      );
    });
  });

  it('shows validation error when short name is invalid', async () => {
    mockSendCommand.mockResolvedValue({
      isValid: false,
      errorCode: 'ShortName_TooShort',
    });

    render(<ProjectNameForm {...defaultProps} />);
    const input = screen.getByLabelText(/short name/i);
    fireEvent.change(input, { target: { value: 'AB' } });

    await act(async () => {
      vi.advanceTimersByTime(300);
    });

    await waitFor(() => {
      expect(screen.getByText('ShortName_TooShort')).toBeInTheDocument();
    });
  });

  it('falls back to client-side validation when backend fails', async () => {
    mockSendCommand.mockRejectedValue(new Error('Backend unavailable'));

    render(<ProjectNameForm {...defaultProps} />);
    const input = screen.getByLabelText(/short name/i);
    fireEvent.change(input, { target: { value: 'AB' } });

    await act(async () => {
      vi.advanceTimersByTime(300);
    });

    await waitFor(() => {
      expect(screen.getByText(/at least 3 characters/i)).toBeInTheDocument();
    });
  });

  it('disables OK button when short name has validation error', async () => {
    mockSendCommand.mockResolvedValue({
      isValid: false,
      errorCode: 'ShortName_TooShort',
    });

    render(<ProjectNameForm {...defaultProps} />);
    const input = screen.getByLabelText(/short name/i);
    fireEvent.change(input, { target: { value: 'AB' } });

    await act(async () => {
      vi.advanceTimersByTime(300);
    });

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /ok/i })).toBeDisabled();
    });
  });

  it('has proper aria attributes for dialog', () => {
    render(<ProjectNameForm {...defaultProps} />);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-label');
  });

  it('links error messages to inputs via aria-describedby', async () => {
    mockSendCommand.mockResolvedValue({
      isValid: false,
      errorCode: 'ShortName_InvalidChars',
    });

    render(<ProjectNameForm {...defaultProps} />);
    const input = screen.getByLabelText(/short name/i);
    fireEvent.change(input, { target: { value: '!!!' } });

    await act(async () => {
      vi.advanceTimersByTime(300);
    });

    await waitFor(() => {
      expect(input).toHaveAttribute('aria-describedby', 'short-name-error');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });
  });
});

import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LanguageSelectionForm } from './language-selection.component';
import type { LanguageSelectionFormProps } from 'paratext-project-creation';

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

// Mock lucide-react - preserve all exports used by platform-bible-react
vi.mock('lucide-react', async (importOriginal) => {
  const actual = await importOriginal<typeof import('lucide-react')>();
  return {
    ...actual,
    AlertCircle: () => <span data-testid="alert-circle-icon" />,
    Loader2: () => <span data-testid="loader-icon" />,
  };
});

// Import the mocked papi to control responses
const { default: papi } = await import('@papi/frontend');
const mockSendCommand = papi.commands.sendCommand as ReturnType<typeof vi.fn>;

const mockLanguages = [
  { languageId: 'eng', languageName: 'English', baseCode: 'eng', script: 'Latn', region: 'US' },
  { languageId: 'fra', languageName: 'French', baseCode: 'fra', script: 'Latn', region: 'FR' },
  { languageId: 'spa', languageName: 'Spanish', baseCode: 'spa', script: 'Latn', region: 'ES' },
  { languageId: 'deu', languageName: 'German', baseCode: 'deu', script: 'Latn', region: 'DE' },
];

const defaultProps: LanguageSelectionFormProps = {
  isNewLanguage: false,
  isRegistered: false,
  onConfirm: vi.fn(),
  onCancel: vi.fn(),
};

/** Helper to render after languages have loaded. */
async function renderAndWaitForLoad(props: Partial<LanguageSelectionFormProps> = {}) {
  mockSendCommand.mockResolvedValueOnce(mockLanguages);
  const result = render(<LanguageSelectionForm {...defaultProps} {...props} />);
  await waitFor(() => {
    expect(screen.queryByText(/loading languages/i)).not.toBeInTheDocument();
  });
  return result;
}

describe('LanguageSelectionForm', () => {
  beforeEach(() => {
    mockSendCommand.mockReset();
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  // --- Loading & Initialization ---

  it('shows loading state while fetching languages', () => {
    mockSendCommand.mockReturnValue(new Promise(() => {}));
    render(<LanguageSelectionForm {...defaultProps} />);
    expect(screen.getByText(/loading languages/i)).toBeInTheDocument();
  });

  it('fetches available languages on mount', async () => {
    mockSendCommand.mockResolvedValueOnce(mockLanguages);
    render(<LanguageSelectionForm {...defaultProps} />);
    // Advance past debounce timer
    await act(async () => {
      vi.advanceTimersByTime(350);
    });
    await waitFor(() => {
      expect(mockSendCommand).toHaveBeenCalledWith(
        'paratextProjectCreation.getAvailableLanguages',
        undefined,
      );
    });
  });

  it('shows empty state when no languages match', async () => {
    mockSendCommand.mockResolvedValueOnce([]);
    render(<LanguageSelectionForm {...defaultProps} />);
    await act(async () => {
      vi.advanceTimersByTime(350);
    });
    await waitFor(() => {
      expect(screen.getByText(/no languages found/i)).toBeInTheDocument();
    });
  });

  it('falls back gracefully when fetching languages fails', async () => {
    mockSendCommand.mockRejectedValueOnce(new Error('Network error'));
    render(<LanguageSelectionForm {...defaultProps} />);
    await act(async () => {
      vi.advanceTimersByTime(350);
    });
    await waitFor(() => {
      expect(screen.queryByText(/loading languages/i)).not.toBeInTheDocument();
    });
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  // --- Snapshot ---

  it('renders loaded state', async () => {
    vi.useRealTimers();
    const { container } = await renderAndWaitForLoad();
    expect(container).toMatchSnapshot();
  });

  // --- Dialog Structure ---

  it('has proper aria attributes for dialog', async () => {
    vi.useRealTimers();
    await renderAndWaitForLoad();
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-label');
  });

  it('renders dialog title without project name', async () => {
    vi.useRealTimers();
    await renderAndWaitForLoad();
    expect(screen.getByText('Choose Language Identifier')).toBeInTheDocument();
  });

  it('renders dialog title with project name', async () => {
    vi.useRealTimers();
    await renderAndWaitForLoad({ projectName: 'MyProject' });
    expect(screen.getByText(/choose language identifier for myproject/i)).toBeInTheDocument();
  });

  // --- Language Selection ---

  it('selects a language when clicked', async () => {
    vi.useRealTimers();
    await renderAndWaitForLoad();
    const row = screen.getByText('English').closest('[role="row"]')!;
    fireEvent.click(row);
    expect(screen.getByDisplayValue('English')).toBeInTheDocument();
  });

  it('selects a language with Enter key', async () => {
    vi.useRealTimers();
    await renderAndWaitForLoad();
    const row = screen.getByText('French').closest('[role="row"]')!;
    fireEvent.keyDown(row, { key: 'Enter' });
    expect(screen.getByDisplayValue('French')).toBeInTheDocument();
  });

  it('updates language name field when language is selected', async () => {
    vi.useRealTimers();
    await renderAndWaitForLoad();
    const row = screen.getByText('Spanish').closest('[role="row"]')!;
    fireEvent.click(row);
    const nameInput = screen.getByLabelText(/language name/i);
    expect(nameInput).toHaveValue('Spanish');
  });

  // --- Search ---

  it('debounces search queries', async () => {
    mockSendCommand.mockResolvedValue(mockLanguages);
    render(<LanguageSelectionForm {...defaultProps} />);

    // Wait for initial load
    await act(async () => {
      vi.advanceTimersByTime(350);
    });
    await waitFor(() => {
      expect(screen.queryByText(/loading languages/i)).not.toBeInTheDocument();
    });

    const callCountAfterInit = mockSendCommand.mock.calls.length;

    const searchInput = screen.getByLabelText(/search/i);
    fireEvent.change(searchInput, { target: { value: 'eng' } });

    // Not yet debounced
    expect(mockSendCommand.mock.calls.length).toBe(callCountAfterInit);

    // Advance past debounce
    await act(async () => {
      vi.advanceTimersByTime(350);
    });

    await waitFor(() => {
      expect(mockSendCommand).toHaveBeenCalledWith(
        'paratextProjectCreation.getAvailableLanguages',
        'eng',
      );
    });
  });

  // --- BCP-47 Preview ---

  it('shows language code preview when language selected', async () => {
    vi.useRealTimers();
    await renderAndWaitForLoad();
    const row = screen.getByText('English').closest('[role="row"]')!;
    fireEvent.click(row);
    expect(screen.getByText(/selected/i).parentElement).toHaveTextContent('English (eng)');
  });

  // --- Variant Validation ---

  it('shows error for invalid variant characters', async () => {
    vi.useRealTimers();
    await renderAndWaitForLoad();
    // Select a language first
    const row = screen.getByText('English').closest('[role="row"]')!;
    fireEvent.click(row);

    const variantInput = screen.getByLabelText(/variant/i);
    fireEvent.change(variantInput, { target: { value: 'INVALID!' } });

    await waitFor(() => {
      expect(screen.getByText(/lowercase letters and digits/i)).toBeInTheDocument();
    });
  });

  it('accepts valid variant', async () => {
    vi.useRealTimers();
    await renderAndWaitForLoad();
    const row = screen.getByText('English').closest('[role="row"]')!;
    fireEvent.click(row);

    const variantInput = screen.getByLabelText(/variant/i);
    fireEvent.change(variantInput, { target: { value: 'fonipa' } });

    expect(screen.queryByText(/lowercase letters and digits/i)).not.toBeInTheDocument();
  });

  // --- Language Name Validation ---

  it('shows error when language name is empty after selection', async () => {
    vi.useRealTimers();
    await renderAndWaitForLoad();
    const row = screen.getByText('English').closest('[role="row"]')!;
    fireEvent.click(row);

    const nameInput = screen.getByLabelText(/language name/i);
    fireEvent.change(nameInput, { target: { value: '' } });

    await waitFor(() => {
      expect(screen.getByText(/language name is required/i)).toBeInTheDocument();
    });
  });

  // --- Registry Warning ---

  it('shows registry warning for registered projects when language changes', async () => {
    vi.useRealTimers();
    await renderAndWaitForLoad({
      isRegistered: true,
      currentLanguageId: 'fra',
    });
    // Select a different language
    const row = screen.getByText('English').closest('[role="row"]')!;
    fireEvent.click(row);

    await waitFor(() => {
      expect(screen.getByText(/registry/i)).toBeInTheDocument();
    });
  });

  it('does not show registry warning for unregistered projects', async () => {
    vi.useRealTimers();
    await renderAndWaitForLoad({ isRegistered: false });
    const row = screen.getByText('English').closest('[role="row"]')!;
    fireEvent.click(row);

    expect(screen.queryByText(/registry/i)).not.toBeInTheDocument();
  });

  // --- Keyboard ---

  it('calls onCancel when Escape is pressed', async () => {
    vi.useRealTimers();
    const onCancel = vi.fn();
    await renderAndWaitForLoad({ onCancel });
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' });
    expect(onCancel).toHaveBeenCalledOnce();
  });

  it('calls onConfirm with validation when Enter is pressed and form is valid', async () => {
    vi.useRealTimers();
    const onConfirm = vi.fn();
    mockSendCommand.mockResolvedValueOnce(mockLanguages); // initial load
    mockSendCommand.mockResolvedValueOnce({ isValid: true }); // validation

    render(<LanguageSelectionForm {...defaultProps} onConfirm={onConfirm} />);
    await waitFor(() => {
      expect(screen.queryByText(/loading languages/i)).not.toBeInTheDocument();
    });

    // Select a language
    const row = screen.getByText('English').closest('[role="row"]')!;
    fireEvent.click(row);

    await act(async () => {
      fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Enter' });
    });

    await waitFor(() => {
      expect(onConfirm).toHaveBeenCalledWith({
        languageId: 'eng',
        languageName: 'English',
      });
    });
  });

  // --- Button Actions ---

  it('calls onCancel when Cancel button is clicked', async () => {
    vi.useRealTimers();
    const onCancel = vi.fn();
    await renderAndWaitForLoad({ onCancel });
    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
    expect(onCancel).toHaveBeenCalledOnce();
  });

  it('validates and confirms when OK is clicked', async () => {
    vi.useRealTimers();
    const onConfirm = vi.fn();
    mockSendCommand.mockResolvedValueOnce(mockLanguages); // initial load
    mockSendCommand.mockResolvedValueOnce({ isValid: true }); // validation

    render(<LanguageSelectionForm {...defaultProps} onConfirm={onConfirm} />);
    await waitFor(() => {
      expect(screen.queryByText(/loading languages/i)).not.toBeInTheDocument();
    });

    const row = screen.getByText('English').closest('[role="row"]')!;
    fireEvent.click(row);

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /ok/i }));
    });

    await waitFor(() => {
      expect(mockSendCommand).toHaveBeenCalledWith(
        'paratextProjectCreation.validateLanguage',
        'eng',
        'English',
      );
      expect(onConfirm).toHaveBeenCalledWith({
        languageId: 'eng',
        languageName: 'English',
      });
    });
  });

  it('shows validation error when validation fails', async () => {
    vi.useRealTimers();
    const onConfirm = vi.fn();
    mockSendCommand.mockResolvedValueOnce(mockLanguages); // initial load
    mockSendCommand.mockResolvedValueOnce({ isValid: false, errorCode: 'Language_NameNotUnique' });

    render(<LanguageSelectionForm {...defaultProps} onConfirm={onConfirm} />);
    await waitFor(() => {
      expect(screen.queryByText(/loading languages/i)).not.toBeInTheDocument();
    });

    const row = screen.getByText('English').closest('[role="row"]')!;
    fireEvent.click(row);

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /ok/i }));
    });

    await waitFor(() => {
      expect(screen.getByText('Language_NameNotUnique')).toBeInTheDocument();
    });
    expect(onConfirm).not.toHaveBeenCalled();
  });

  it('gracefully falls back when validation command fails', async () => {
    vi.useRealTimers();
    const onConfirm = vi.fn();
    mockSendCommand.mockResolvedValueOnce(mockLanguages); // initial load
    mockSendCommand.mockRejectedValueOnce(new Error('Backend error')); // validation fails

    render(<LanguageSelectionForm {...defaultProps} onConfirm={onConfirm} />);
    await waitFor(() => {
      expect(screen.queryByText(/loading languages/i)).not.toBeInTheDocument();
    });

    const row = screen.getByText('English').closest('[role="row"]')!;
    fireEvent.click(row);

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /ok/i }));
    });

    // Should still confirm as fallback
    await waitFor(() => {
      expect(onConfirm).toHaveBeenCalledWith({
        languageId: 'eng',
        languageName: 'English',
      });
    });
  });

  // --- Disabled States ---

  it('disables OK button when no language is selected', async () => {
    vi.useRealTimers();
    await renderAndWaitForLoad();
    expect(screen.getByRole('button', { name: /ok/i })).toBeDisabled();
  });

  it('disables BCP-47 selectors when no language is selected', async () => {
    vi.useRealTimers();
    await renderAndWaitForLoad();
    expect(screen.getByLabelText(/language name/i)).toBeDisabled();
    expect(screen.getByLabelText(/variant/i)).toBeDisabled();
  });

  it('enables OK button when language is selected and name is valid', async () => {
    vi.useRealTimers();
    await renderAndWaitForLoad();
    const row = screen.getByText('English').closest('[role="row"]')!;
    fireEvent.click(row);
    expect(screen.getByRole('button', { name: /ok/i })).toBeEnabled();
  });
});

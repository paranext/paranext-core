import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { ChooseEncodingFormProps, EncodingInfo } from 'paratext-project-creation';
import { ChooseEncodingForm } from './choose-encoding.component';

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

// Mock lucide-react - use importOriginal to preserve all exports used by platform-bible-react
vi.mock('lucide-react', async (importOriginal) => {
  const actual = await importOriginal<typeof import('lucide-react')>();
  return {
    ...actual,
    AlertCircle: () => <span data-testid="alert-circle-icon" />,
    CheckCircle2: () => <span data-testid="check-circle-icon" />,
    Loader2: () => <span data-testid="loader-icon" />,
  };
});

// Import the mocked papi to control responses
const { default: papi } = await import('@papi/frontend');
// eslint-disable-next-line no-type-assertion/no-type-assertion
const mockSendCommand = papi.commands.sendCommand as ReturnType<typeof vi.fn>;

const mockEncodings: EncodingInfo[] = [
  { codePage: 65001, name: 'UTF-8', displayName: 'Unicode (UTF-8)' },
  { codePage: 1252, name: 'Windows-1252', displayName: 'Western European (Windows)' },
  { codePage: 28591, name: 'ISO-8859-1', displayName: 'Western European (ISO)' },
];

const defaultProps: ChooseEncodingFormProps = {
  currentEncoding: mockEncodings[0],
  sampleText: '\\id MAT\n\\c 1\n\\v 1 Test text',
  onConfirm: vi.fn(),
  onCancel: vi.fn(),
};

/** Helper to render after encodings have loaded. */
async function renderAndWaitForLoad(props: Partial<ChooseEncodingFormProps> = {}) {
  mockSendCommand.mockResolvedValueOnce(mockEncodings);
  const result = render(<ChooseEncodingForm {...defaultProps} {...props} />);
  await waitFor(() => {
    expect(screen.queryByText(/loading encodings/i)).not.toBeInTheDocument();
  });
  return result;
}

describe('ChooseEncodingForm', () => {
  beforeEach(() => {
    mockSendCommand.mockReset();
  });

  // --- Loading & Initialization ---

  it('shows loading state while fetching encodings', () => {
    // Never resolve the promise to keep loading state
    mockSendCommand.mockReturnValue(new Promise(() => {}));
    render(<ChooseEncodingForm {...defaultProps} />);
    expect(screen.getByText(/loading encodings/i)).toBeInTheDocument();
  });

  it('fetches available encodings on mount', async () => {
    mockSendCommand.mockResolvedValueOnce(mockEncodings);
    render(<ChooseEncodingForm {...defaultProps} />);
    await waitFor(() => {
      expect(mockSendCommand).toHaveBeenCalledWith('paratextProjectCreation.getAvailableEncodings');
    });
  });

  it('falls back to UTF-8 when fetching encodings fails', async () => {
    mockSendCommand.mockRejectedValueOnce(new Error('Network error'));
    render(<ChooseEncodingForm {...defaultProps} />);
    await waitFor(() => {
      expect(screen.queryByText(/loading encodings/i)).not.toBeInTheDocument();
    });
    // Should still render with the fallback encoding available
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('uses default sample text when none provided', async () => {
    await renderAndWaitForLoad({ sampleText: undefined });
    const textarea = screen.getByLabelText(/sample text/i);
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    expect((textarea as HTMLTextAreaElement).value).toContain('\\id MAT');
  });

  // --- Snapshot ---

  it('renders loaded state', async () => {
    const { container } = await renderAndWaitForLoad();
    expect(container).toMatchSnapshot();
  });

  // --- Dialog Structure ---

  it('has proper aria attributes for dialog', async () => {
    await renderAndWaitForLoad();
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-label');
  });

  it('renders dialog title', async () => {
    await renderAndWaitForLoad();
    expect(screen.getByText('Choose Encoding')).toBeInTheDocument();
  });

  it('renders sample text as read-only', async () => {
    await renderAndWaitForLoad();
    const textarea = screen.getByLabelText(/sample text/i);
    expect(textarea).toHaveAttribute('readonly');
    expect(textarea).toHaveValue('\\id MAT\n\\c 1\n\\v 1 Test text');
  });

  // --- Keyboard ---

  it('calls onCancel when Escape is pressed', async () => {
    const onCancel = vi.fn();
    await renderAndWaitForLoad({ onCancel });
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' });
    expect(onCancel).toHaveBeenCalledOnce();
  });

  it('calls onConfirm with selected encoding when Enter is pressed', async () => {
    const onConfirm = vi.fn();
    await renderAndWaitForLoad({ onConfirm });
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Enter' });
    expect(onConfirm).toHaveBeenCalledWith(mockEncodings[0]);
  });

  // --- Button Actions ---

  it('calls onCancel when Cancel button is clicked', async () => {
    const onCancel = vi.fn();
    await renderAndWaitForLoad({ onCancel });
    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
    expect(onCancel).toHaveBeenCalledOnce();
  });

  it('calls onConfirm with current encoding when OK is clicked', async () => {
    const onConfirm = vi.fn();
    await renderAndWaitForLoad({ onConfirm });
    fireEvent.click(screen.getByRole('button', { name: /ok/i }));
    expect(onConfirm).toHaveBeenCalledWith(mockEncodings[0]);
  });

  // --- Test Button ---

  it('calls testEncodingRoundTrip when Test is clicked', async () => {
    mockSendCommand.mockResolvedValueOnce(mockEncodings); // getAvailableEncodings
    mockSendCommand.mockResolvedValueOnce({ success: true, message: 'Test passed' }); // testEncodingRoundTrip

    render(<ChooseEncodingForm {...defaultProps} />);
    await waitFor(() => {
      expect(screen.queryByText(/loading encodings/i)).not.toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /test/i }));
    });

    await waitFor(() => {
      expect(mockSendCommand).toHaveBeenCalledWith(
        'paratextProjectCreation.testEncodingRoundTrip',
        mockEncodings[0],
        defaultProps.sampleText,
      );
    });
  });

  it('shows success alert after successful test', async () => {
    mockSendCommand.mockResolvedValueOnce(mockEncodings);
    mockSendCommand.mockResolvedValueOnce({
      success: true,
      message: 'Encoding test passed. Text can be saved and restored correctly.',
    });

    render(<ChooseEncodingForm {...defaultProps} />);
    await waitFor(() => {
      expect(screen.queryByText(/loading encodings/i)).not.toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /test/i }));
    });

    await waitFor(() => {
      expect(screen.getByText(/encoding test passed/i)).toBeInTheDocument();
    });
  });

  it('shows failure alert after failed test', async () => {
    mockSendCommand.mockResolvedValueOnce(mockEncodings);
    mockSendCommand.mockResolvedValueOnce({
      success: false,
      message: 'Encoding test failed. Some characters may not survive round-trip.',
    });

    render(<ChooseEncodingForm {...defaultProps} />);
    await waitFor(() => {
      expect(screen.queryByText(/loading encodings/i)).not.toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /test/i }));
    });

    await waitFor(() => {
      expect(screen.getByText(/encoding test failed/i)).toBeInTheDocument();
    });
  });

  it('shows failure alert when test command throws', async () => {
    mockSendCommand.mockResolvedValueOnce(mockEncodings);
    mockSendCommand.mockRejectedValueOnce(new Error('Backend error'));

    render(<ChooseEncodingForm {...defaultProps} />);
    await waitFor(() => {
      expect(screen.queryByText(/loading encodings/i)).not.toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /test/i }));
    });

    await waitFor(() => {
      expect(screen.getByText(/could not complete round-trip test/i)).toBeInTheDocument();
    });
  });

  // --- Disabled States ---

  it('disables Test and OK buttons while loading encodings', () => {
    mockSendCommand.mockReturnValue(new Promise(() => {}));
    render(<ChooseEncodingForm {...defaultProps} />);
    expect(screen.getByRole('button', { name: /test/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /ok/i })).toBeDisabled();
  });
});

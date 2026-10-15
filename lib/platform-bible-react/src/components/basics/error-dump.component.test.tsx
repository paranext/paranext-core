// @vitest-environment jsdom

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { ErrorDump } from './error-dump.component';

const COPY_LABEL = 'Copy error details';

function stubClipboardWriteText(writeText: (text: string) => Promise<void>) {
  Object.defineProperty(navigator, 'clipboard', {
    value: { writeText },
    configurable: true,
  });
}

describe('ErrorDump copy button', () => {
  it('has the localized accessible name', () => {
    render(
      <ErrorDump
        errorDetails="Something broke"
        localizedStrings={{ '%webView_error_dump_copy_button%': COPY_LABEL }}
      />,
    );

    expect(screen.getByRole('button', { name: COPY_LABEL })).toBeInTheDocument();
  });

  it('notifies after the clipboard accepted the text', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    stubClipboardWriteText(writeText);
    const handleCopyNotify = vi.fn();
    render(
      <ErrorDump
        errorDetails="Something broke"
        handleCopyNotify={handleCopyNotify}
        localizedStrings={{ '%webView_error_dump_copy_button%': COPY_LABEL }}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: COPY_LABEL }));

    await waitFor(() => expect(handleCopyNotify).toHaveBeenCalledTimes(1));
    expect(writeText).toHaveBeenCalledWith('Something broke');
  });

  it('does not notify, and does not leave a rejection unhandled, when the clipboard rejects', async () => {
    const writeText = vi.fn().mockRejectedValue(new Error('denied'));
    stubClipboardWriteText(writeText);
    const handleCopyNotify = vi.fn();
    const unhandled = vi.fn();
    process.on('unhandledRejection', unhandled);
    try {
      render(
        <ErrorDump
          errorDetails="Something broke"
          handleCopyNotify={handleCopyNotify}
          localizedStrings={{ '%webView_error_dump_copy_button%': COPY_LABEL }}
        />,
      );

      fireEvent.click(screen.getByRole('button', { name: COPY_LABEL }));

      await waitFor(() => expect(writeText).toHaveBeenCalledWith('Something broke'));
      // Let any pending rejection handling settle before checking.
      await new Promise((resolve) => {
        setTimeout(resolve, 20);
      });
      expect(handleCopyNotify).not.toHaveBeenCalled();
      expect(unhandled).not.toHaveBeenCalled();
    } finally {
      process.off('unhandledRejection', unhandled);
    }
  });
});

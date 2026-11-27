// @vitest-environment jsdom

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { beforeAll, vi } from 'vitest';
import { installNoopResizeObserver } from '@/test-utils/resize-observer.util';
import { ErrorDump } from './error-dump.component';

// Radix positions an open tooltip with a ResizeObserver, which jsdom lacks
beforeAll(() => {
  installNoopResizeObserver();
});

const COPY_LABEL = 'Copy error details';

const originalClipboard = Object.getOwnPropertyDescriptor(navigator, 'clipboard');

function stubClipboardWriteText(writeText: (text: string) => Promise<void>) {
  Object.defineProperty(navigator, 'clipboard', {
    value: { writeText },
    configurable: true,
  });
}

afterEach(() => {
  if (originalClipboard) Object.defineProperty(navigator, 'clipboard', originalClipboard);
  else Reflect.deleteProperty(navigator, 'clipboard');
});

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

  // An unhandled rejection from the copy would fail the run through Vitest's own reporting
  it('does not notify when the clipboard rejects', async () => {
    const writeText = vi.fn().mockRejectedValue(new Error('denied'));
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

    await waitFor(() => expect(writeText).toHaveBeenCalledWith('Something broke'));
    // One macrotask lets the rejected write's handling finish before the check
    await new Promise((resolve) => {
      setTimeout(resolve, 0);
    });
    expect(handleCopyNotify).not.toHaveBeenCalled();
  });
});

describe('ErrorDump copy button tooltip', () => {
  it('shows the localized label as a hover tooltip', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(
      <ErrorDump
        errorDetails="Something broke"
        localizedStrings={{ '%webView_error_dump_copy_button%': COPY_LABEL }}
      />,
    );

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    await user.hover(screen.getByRole('button', { name: COPY_LABEL }));
    expect(await screen.findByRole('tooltip')).toHaveTextContent(COPY_LABEL);
  });
});

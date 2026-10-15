// @vitest-environment jsdom

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ErrorDump } from './error-dump.component';

describe('ErrorDump copy button', () => {
  it('has the localized accessible name', () => {
    render(
      <ErrorDump
        errorDetails="Something broke"
        localizedStrings={{ '%webView_error_dump_copy_button%': 'Copy error details' }}
      />,
    );

    expect(screen.getByRole('button', { name: 'Copy error details' })).toBeInTheDocument();
  });
});

// @vitest-environment jsdom
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { DomainsDisplay } from './domains-display.component';

describe('DomainsDisplay', () => {
  it('shows a domain by its name only', () => {
    render(
      <DomainsDisplay
        domains={[{ code: '1.2.3', label: 'Land', taxonomy: 'SDBH-Lexical' }]}
        domainText="{taxonomy} Domain"
      />,
    );
    expect(screen.getByText('Land')).toBeInTheDocument();
    expect(screen.queryByText('1.2.3')).not.toBeInTheDocument();
  });

  it('falls back to the code when a domain has no name', () => {
    render(
      <DomainsDisplay
        domains={[{ code: '198', taxonomy: 'SDBH-Contextual' }]}
        domainText="{taxonomy} Domain"
      />,
    );
    expect(screen.getByText('198')).toBeInTheDocument();
  });
});

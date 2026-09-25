// @vitest-environment jsdom
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { CatalogRetryBanner } from './catalog-retry-banner.component';

describe('CatalogRetryBanner', () => {
  it('shows the message and retries on click', () => {
    const onRetry = vi.fn();
    render(
      <CatalogRetryBanner
        message="Couldn't load the list of available resources."
        retryLabel="Retry"
        onRetry={onRetry}
      />,
    );

    expect(screen.getByText("Couldn't load the list of available resources.")).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Retry' }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('is not a live region itself, so it can sit inside a persistent one', () => {
    render(
      <CatalogRetryBanner
        message="Couldn't load the list of available resources."
        retryLabel="Retry"
        onRetry={vi.fn()}
      />,
    );

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('disables the retry button while a retry is in flight', () => {
    const onRetry = vi.fn();
    render(
      <CatalogRetryBanner
        message="Couldn't load the list of available resources."
        retryLabel="Retry"
        onRetry={onRetry}
        isRetrying
      />,
    );

    const retryButton = screen.getByRole('button', { name: 'Retry' });
    expect(retryButton).toHaveAttribute('aria-disabled', 'true');
    expect(retryButton).not.toBeDisabled();
    fireEvent.click(retryButton);
    expect(onRetry).not.toHaveBeenCalled();
  });
});

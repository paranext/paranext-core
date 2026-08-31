import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { reloadWebView } from '@renderer/services/web-view.service-shard';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  WebViewCrashedView,
  WEB_VIEW_CRASHED_VIEW_STRING_KEYS,
} from './web-view-crashed-view.component';

vi.mock('@shared/services/logger.service', () => ({
  logger: { error: vi.fn(), warn: vi.fn(), info: vi.fn(), debug: vi.fn() },
}));

vi.mock('@renderer/services/web-view.service-shard', () => ({
  reloadWebView: vi.fn(async () => 'web-view-id'),
}));

vi.mock('@renderer/hooks/papi-hooks', () => ({
  useLocalizedStrings: vi.fn(),
}));

/** Resolved strings, as the localization service returns them once it has answered. */
const LOCALIZED = {
  '%webView_error_crashed_title%': 'Localized title',
  '%webView_error_crashed_message%': 'Localized message for {webViewTitle}',
  '%webView_error_crashed_messageNoTitle%': 'Localized message with no title',
  '%webView_error_crashed_reloadButton%': 'Localized reload',
};

/**
 * What `useLocalizedStrings` returns before (or instead of) resolving: every key seeded with
 * itself. This is the state the view must never render, since it is reached exactly when
 * localization is what broke.
 */
const UNRESOLVED = Object.fromEntries(WEB_VIEW_CRASHED_VIEW_STRING_KEYS.map((key) => [key, key]));

beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(useLocalizedStrings).mockReturnValue([LOCALIZED, false]);
});

describe('WebViewCrashedView', () => {
  it('renders the localized title, message and button', () => {
    render(<WebViewCrashedView webViewId="id" webViewType="type" webViewTitle="Editor - WEB" />);

    expect(screen.getByText('Localized title')).toBeInTheDocument();
    expect(screen.getByText('Localized message for Editor - WEB')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Localized reload' })).toBeInTheDocument();
  });

  it('names the panel that crashed so the user knows which one died', () => {
    render(<WebViewCrashedView webViewId="id" webViewType="type" webViewTitle="Text Collection" />);

    expect(screen.getByText('Localized message for Text Collection')).toBeInTheDocument();
  });

  it('uses the untitled message when the web view has no title', () => {
    render(<WebViewCrashedView webViewId="id" webViewType="type" />);

    expect(screen.getByText('Localized message with no title')).toBeInTheDocument();
  });

  it('falls back to English rather than showing raw localize keys', () => {
    // Reached when localization itself is the thing that broke, which is one of the live causes of a
    // blank web view — `%webView_error_crashed_title%` on screen would be worse than English
    vi.mocked(useLocalizedStrings).mockReturnValue([UNRESOLVED, true]);

    render(<WebViewCrashedView webViewId="id" webViewType="type" webViewTitle="Editor" />);

    expect(screen.getByText('This panel stopped working')).toBeInTheDocument();
    expect(
      screen.getByText('Something went wrong and “Editor” could not be displayed.'),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reload' })).toBeInTheDocument();
    expect(screen.queryByText(/%webView_error_crashed/)).not.toBeInTheDocument();
  });

  it('reloads the web view when the button is clicked', () => {
    render(<WebViewCrashedView webViewId="the-id" webViewType="the-type" webViewTitle="Editor" />);

    fireEvent.click(screen.getByRole('button', { name: 'Localized reload' }));

    expect(reloadWebView).toHaveBeenCalledExactlyOnceWith('the-type', 'the-id');
  });

  it('announces itself and takes focus, since the crash unmounted everything focusable', () => {
    render(<WebViewCrashedView webViewId="id" webViewType="type" webViewTitle="Editor" />);

    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveFocus();
  });
});

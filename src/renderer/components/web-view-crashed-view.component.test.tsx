import { readFileSync } from 'fs';
import path from 'path';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  WebViewCrashedView,
  ENGLISH_DEFAULTS,
  WEB_VIEW_CRASHED_VIEW_STRING_KEYS,
} from './web-view-crashed-view.component';

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

let onReload: ReturnType<typeof vi.fn>;

beforeEach(() => {
  vi.clearAllMocks();
  onReload = vi.fn();
  vi.mocked(useLocalizedStrings).mockReturnValue([LOCALIZED, false]);
});

afterEach(() => {
  // Several tests spy on `document.hasFocus` and on `console.error`; without this they leak into
  // the tests that follow them
  vi.restoreAllMocks();
});

describe('WebViewCrashedView', () => {
  it('renders the localized title, message and button', () => {
    render(<WebViewCrashedView onReload={onReload} webViewTitle="Editor - WEB" />);

    expect(screen.getByText('Localized title')).toBeInTheDocument();
    expect(screen.getByText('Localized message for Editor - WEB')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Localized reload' })).toBeInTheDocument();
  });

  it('names the panel that crashed so the user knows which one died', () => {
    render(<WebViewCrashedView onReload={onReload} webViewTitle="Text Collection" />);

    expect(screen.getByText('Localized message for Text Collection')).toBeInTheDocument();
  });

  it('uses the untitled message when the web view has no title', () => {
    render(<WebViewCrashedView onReload={onReload} />);

    expect(screen.getByText('Localized message with no title')).toBeInTheDocument();
  });

  it('resolves a title that is a localize key rather than printing the key', () => {
    // Web view definitions carry either display text or a localize key as their title, and several
    // panels (Model Text, Scripture Text Grid, Enhanced Resources) ship keys. Interpolating one
    // verbatim would put a raw `%…%` on screen - the exact thing this view exists to avoid.
    vi.mocked(useLocalizedStrings).mockImplementation((keys) =>
      keys.includes('%webView_modelTextPanel_title%')
        ? [{ '%webView_modelTextPanel_title%': 'Model Text' }, false]
        : [LOCALIZED, false],
    );

    render(
      <WebViewCrashedView onReload={onReload} webViewTitle="%webView_modelTextPanel_title%" />,
    );

    expect(screen.getByText('Localized message for Model Text')).toBeInTheDocument();
    expect(screen.queryByText(/%webView_modelTextPanel_title%/)).not.toBeInTheDocument();
  });

  it('falls back to the untitled message when a localize-key title does not resolve', () => {
    // Unresolved keys come back seeded with themselves, which must not reach the message
    vi.mocked(useLocalizedStrings).mockImplementation((keys) =>
      keys.includes('%webView_modelTextPanel_title%')
        ? [{ '%webView_modelTextPanel_title%': '%webView_modelTextPanel_title%' }, true]
        : [LOCALIZED, false],
    );

    render(
      <WebViewCrashedView onReload={onReload} webViewTitle="%webView_modelTextPanel_title%" />,
    );

    expect(screen.getByText('Localized message with no title')).toBeInTheDocument();
    expect(screen.queryByText(/%webView_modelTextPanel_title%/)).not.toBeInTheDocument();
  });

  it('falls back to English rather than blanking when localizing throws', () => {
    // Nothing above this component could catch such a throw: React hands an error raised inside an
    // error boundary's fallback to the NEXT boundary up, and a web view's root has none. An
    // unresolved string and a throwing hook are different failure modes, and a crash inside
    // `useLocalizedStrings` is one of the live causes of the blank pane this panel replaces.
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.mocked(useLocalizedStrings).mockImplementation(() => {
      throw new Error('localization boom');
    });

    render(<WebViewCrashedView onReload={onReload} webViewTitle="Editor" />);

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('This panel stopped working')).toBeInTheDocument();
    expect(
      screen.getByText('Something went wrong and “Editor” could not be displayed.'),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Reload' }));
    expect(onReload).toHaveBeenCalledOnce();
  });

  it('uses the untitled message when localizing throws and the title is a localize key', () => {
    // A localize-key title cannot be resolved with localization down, and a raw `%…%` on screen is
    // exactly what this panel exists to avoid
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.mocked(useLocalizedStrings).mockImplementation(() => {
      throw new Error('localization boom');
    });

    render(
      <WebViewCrashedView onReload={onReload} webViewTitle="%webView_modelTextPanel_title%" />,
    );

    expect(
      screen.getByText('Something went wrong and this panel could not be displayed.'),
    ).toBeInTheDocument();
    expect(screen.queryByText(/%webView_modelTextPanel_title%/)).not.toBeInTheDocument();
  });

  it('falls back to English rather than showing raw localize keys', () => {
    // Reached when localization itself is the thing that broke, which is one of the live causes of a
    // blank web view — `%webView_error_crashed_title%` on screen would be worse than English
    vi.mocked(useLocalizedStrings).mockReturnValue([UNRESOLVED, true]);

    render(<WebViewCrashedView onReload={onReload} webViewTitle="Editor" />);

    expect(screen.getByText('This panel stopped working')).toBeInTheDocument();
    expect(
      screen.getByText('Something went wrong and “Editor” could not be displayed.'),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reload' })).toBeInTheDocument();
    expect(screen.queryByText(/%webView_error_crashed/)).not.toBeInTheDocument();
  });

  it('asks its caller to reload when the button is clicked', () => {
    render(<WebViewCrashedView onReload={onReload} webViewTitle="Editor" />);

    fireEvent.click(screen.getByRole('button', { name: 'Localized reload' }));

    expect(onReload).toHaveBeenCalledOnce();
  });

  it('announces itself and takes focus when the crash destroyed what the user was working in', () => {
    vi.spyOn(document, 'hasFocus').mockReturnValue(true);

    render(<WebViewCrashedView onReload={onReload} webViewTitle="Editor" />);

    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveFocus();
  });

  it('leaves focus alone when the crash happened in a pane the user was not in', () => {
    // Several web views are visible at once, so a background pane crashing on a shared state change
    // must not pull the caret out of whatever the user is actually typing in
    vi.spyOn(document, 'hasFocus').mockReturnValue(false);
    const outsideInput = document.createElement('input');
    document.body.appendChild(outsideInput);
    outsideInput.focus();

    render(<WebViewCrashedView onReload={onReload} webViewTitle="Editor" />);

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByRole('alert')).not.toHaveFocus();
    expect(outsideInput).toHaveFocus();

    outsideInput.remove();
  });
});

// `ENGLISH_DEFAULTS` deliberately restates the English text that also lives in `en.json`, because
// this view has to render when the localization service is the thing that broke. `en.json` is read
// from disk by the extension host rather than bundled into the renderer, so importing it here to
// derive the defaults would add a second 41KB copy to the renderer's load path for four strings -
// the wrong trade against a startup-performance target. The duplication stays; these tests are what
// stop it drifting, since a copy edit to `en.json` would otherwise leave the fallback silently stale.
describe('English fallbacks stay in step with en.json', () => {
  const englishStrings: Record<string, string> = JSON.parse(
    readFileSync(path.resolve(__dirname, '../../../assets/localization/en.json'), 'utf-8'),
  );

  it('has an English default for every key the view resolves', () => {
    expect(Object.keys(ENGLISH_DEFAULTS).sort()).toEqual(
      [...WEB_VIEW_CRASHED_VIEW_STRING_KEYS].sort(),
    );
  });

  // Iterating the entries rather than the key list keeps the keys typed, so this needs no assertion
  Object.entries(ENGLISH_DEFAULTS).forEach(([key, englishDefault]) => {
    it(`declares ${key} in en.json`, () => {
      expect(englishStrings[key]).toBeTruthy();
    });

    it(`uses the same English text as en.json for ${key}`, () => {
      expect(englishDefault).toBe(englishStrings[key]);
    });
  });
});

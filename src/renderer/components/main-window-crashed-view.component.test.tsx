import { readFileSync } from 'fs';
import path from 'path';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  ENGLISH_DEFAULTS,
  MAIN_WINDOW_CRASHED_VIEW_STRING_KEYS,
  MainWindowCrashedView,
} from './main-window-crashed-view.component';

vi.mock('@shared/services/logger.service', () => ({
  logger: { error: vi.fn(), warn: vi.fn(), info: vi.fn(), debug: vi.fn() },
}));

vi.mock('@renderer/hooks/papi-hooks', () => ({ useLocalizedStrings: vi.fn() }));

/** What `useLocalizedStrings` returns before anything has resolved: every key seeded with itself. */
const UNRESOLVED = Object.fromEntries(
  MAIN_WINDOW_CRASHED_VIEW_STRING_KEYS.map((key) => [key, key]),
);

beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(useLocalizedStrings).mockReturnValue([UNRESOLVED, false]);
});

describe('MainWindowCrashedView', () => {
  it('shows localized text when the strings resolve', () => {
    vi.mocked(useLocalizedStrings).mockReturnValue([
      {
        '%mainWindow_error_crashed_title%': 'Localized title',
        '%mainWindow_error_crashed_message%': 'Localized message',
        '%mainWindow_error_crashed_reloadButton%': 'Localized reload',
      },
      false,
    ]);

    render(<MainWindowCrashedView onReload={vi.fn()} />);

    expect(screen.getByText('Localized title')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Localized reload' })).toBeInTheDocument();
  });

  it('shows English rather than raw keys while the strings are unresolved', () => {
    render(<MainWindowCrashedView onReload={vi.fn()} />);

    expect(
      screen.getByText(ENGLISH_DEFAULTS['%mainWindow_error_crashed_title%']),
    ).toBeInTheDocument();
    expect(screen.queryByText('%mainWindow_error_crashed_title%')).not.toBeInTheDocument();
  });

  it('announces itself, since the crash destroyed whatever the user was focused on', () => {
    render(<MainWindowCrashedView onReload={vi.fn()} />);

    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('reloads when the button is pressed', () => {
    const onReload = vi.fn();
    render(<MainWindowCrashedView onReload={onReload} />);

    fireEvent.click(screen.getByRole('button'));

    expect(onReload).toHaveBeenCalledOnce();
  });
});

// `ENGLISH_DEFAULTS` deliberately restates the English text that also lives in `en.json`, because
// this view has to render when the localization service is the thing that broke. These tests are
// what stop the two copies drifting, since a copy edit to `en.json` would otherwise leave the
// fallback silently stale.
describe('English fallbacks stay in step with en.json', () => {
  const englishStrings: Record<string, string> = JSON.parse(
    readFileSync(path.resolve(__dirname, '../../../assets/localization/en.json'), 'utf-8'),
  );

  it('has an English default for every key the view resolves', () => {
    expect(Object.keys(ENGLISH_DEFAULTS).sort()).toEqual(
      [...MAIN_WINDOW_CRASHED_VIEW_STRING_KEYS].sort(),
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

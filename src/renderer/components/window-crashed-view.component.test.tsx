import { readFileSync } from 'fs';
import path from 'path';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { logger } from '@shared/services/logger.service';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  WINDOW_CRASHED_ENGLISH_DEFAULTS,
  WINDOW_CRASHED_VIEW_STRING_KEYS,
  WindowCrashedView,
} from './window-crashed-view.component';

vi.mock('@shared/services/logger.service', () => ({
  logger: { error: vi.fn(), warn: vi.fn(), info: vi.fn(), debug: vi.fn() },
}));

vi.mock('@renderer/hooks/papi-hooks', () => ({ useLocalizedStrings: vi.fn() }));

/** What `useLocalizedStrings` returns before anything has resolved: every key seeded with itself. */
const UNRESOLVED = Object.fromEntries(WINDOW_CRASHED_VIEW_STRING_KEYS.map((key) => [key, key]));

beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(useLocalizedStrings).mockReturnValue([UNRESOLVED, false]);
});

describe('WindowCrashedView', () => {
  it('shows localized text when the strings resolve', () => {
    vi.mocked(useLocalizedStrings).mockReturnValue([
      {
        '%window_error_crashed_title%': 'Localized title',
        '%window_error_crashed_message%': 'Localized message',
        '%window_error_crashed_reloadButton%': 'Localized reload',
      },
      false,
    ]);

    render(<WindowCrashedView onReload={vi.fn()} />);

    expect(screen.getByText('Localized title')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Localized reload' })).toBeInTheDocument();
  });

  it('shows English rather than raw keys while the strings are unresolved', () => {
    render(<WindowCrashedView onReload={vi.fn()} />);

    expect(
      screen.getByText(WINDOW_CRASHED_ENGLISH_DEFAULTS['%window_error_crashed_title%']),
    ).toBeInTheDocument();
    expect(screen.queryByText('%window_error_crashed_title%')).not.toBeInTheDocument();
  });

  it('announces itself, since the crash destroyed whatever the user was focused on', () => {
    render(<WindowCrashedView onReload={vi.fn()} />);

    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
    // Text only: `role="alert"` must not contain focusable content, or a screen reader announces
    // the reload button twice on the paths where focus moves into the screen
    expect(alert).not.toContainElement(screen.getByRole('button'));
  });

  it('titles the window with a real heading, since it is the only content in the document', () => {
    // With the app unmounted this screen is the whole document, so a title styled to look like a
    // heading but marked up as a paragraph leaves the window with no heading at all.
    render(<WindowCrashedView onReload={vi.fn()} />);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: WINDOW_CRASHED_ENGLISH_DEFAULTS['%window_error_crashed_title%'],
      }),
    ).toBeInTheDocument();
  });

  it('falls back to English when resolving the localized text throws', () => {
    // `useLocalizedStrings` reaches a service, and a crash screen renders precisely because
    // something in this window is unwell — so the screen's one service call gets its own boundary.
    // There is no boundary above the renderer root to catch it otherwise.
    vi.mocked(useLocalizedStrings).mockImplementation(() => {
      throw new Error('localization service unreachable');
    });

    render(<WindowCrashedView onReload={vi.fn()} />);

    expect(
      screen.getByText(WINDOW_CRASHED_ENGLISH_DEFAULTS['%window_error_crashed_title%']),
    ).toBeInTheDocument();
  });

  it('still falls back to English when REPORTING the localization failure also throws', () => {
    // This boundary lives inside the renderer boundary's fallback, so a throw from its own
    // `componentDidCatch` re-renders that fallback, mounts a fresh copy of this boundary, and
    // throws again — the repeatedly-throwing fallback React resolves by unmounting the root, which
    // is the blank window the crash screen exists to replace.
    vi.mocked(useLocalizedStrings).mockImplementation(() => {
      throw new Error('localization service unreachable');
    });
    vi.mocked(logger.warn).mockImplementation(() => {
      throw new Error('the logger is as unwell as the tree');
    });

    expect(() => render(<WindowCrashedView onReload={vi.fn()} />)).not.toThrow();
    expect(
      screen.getByText(WINDOW_CRASHED_ENGLISH_DEFAULTS['%window_error_crashed_title%']),
    ).toBeInTheDocument();
  });

  it('reloads when the button is pressed', () => {
    const onReload = vi.fn();
    render(<WindowCrashedView onReload={onReload} />);

    fireEvent.click(screen.getByRole('button'));

    expect(onReload).toHaveBeenCalledOnce();
  });
});

// `WINDOW_CRASHED_ENGLISH_DEFAULTS` deliberately restates the English text that also lives in
// `en.json`, because this view has to render when the localization service is the thing that broke.
// These tests are what stop the two copies drifting, since a copy edit to `en.json` would otherwise
// leave the fallback silently stale.
describe('English fallbacks stay in step with en.json', () => {
  const englishStrings: Record<string, string> = JSON.parse(
    readFileSync(path.resolve(__dirname, '../../../assets/localization/en.json'), 'utf-8'),
  );

  it('has an English default for every key the view resolves', () => {
    expect(Object.keys(WINDOW_CRASHED_ENGLISH_DEFAULTS).sort()).toEqual(
      [...WINDOW_CRASHED_VIEW_STRING_KEYS].sort(),
    );
  });

  // Iterating the entries rather than the key list keeps the keys typed, so this needs no assertion
  Object.entries(WINDOW_CRASHED_ENGLISH_DEFAULTS).forEach(([key, englishDefault]) => {
    it(`declares ${key} in en.json`, () => {
      expect(englishStrings[key]).toBeTruthy();
    });

    it(`uses the same English text as en.json for ${key}`, () => {
      expect(englishDefault).toBe(englishStrings[key]);
    });
  });
});

// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeAll, describe, expect, test, vi } from 'vitest';
import '@testing-library/jest-dom';
import { InterfaceLanguagePicker } from './interface-language-picker.component';
import {
  SAMPLE_LANGUAGES as LANGUAGES,
  SAMPLE_LOCALIZED_STRINGS as STRINGS,
} from './interface-language-picker.data';

// cmdk needs a ResizeObserver and Element.scrollTo, which jsdom lacks.
beforeAll(() => {
  class NoopResizeObserver {
    // jsdom stub: empty no-op intentionally has no `this` usage
    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
    observe() {}

    // jsdom stub: empty no-op intentionally has no `this` usage
    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
    unobserve() {}

    // jsdom stub: empty no-op intentionally has no `this` usage
    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
    disconnect() {}
  }
  // jsdom lacks ResizeObserver; cast required to assign a no-op stub as the global
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  globalThis.ResizeObserver = NoopResizeObserver as unknown as typeof ResizeObserver;
  Element.prototype.scrollIntoView = vi.fn();
});

describe('InterfaceLanguagePicker', () => {
  test('renders each language by its autonym (in-script), English first', () => {
    render(
      <InterfaceLanguagePicker
        languages={LANGUAGES}
        value="en"
        onChange={() => {}}
        localizedStrings={STRINGS}
      />,
    );
    expect(screen.getByText('中文（简体）')).toBeInTheDocument();
    expect(screen.getByText('English')).toBeInTheDocument();
  });

  test('marks the selected language', () => {
    render(
      <InterfaceLanguagePicker
        languages={LANGUAGES}
        value="es"
        onChange={() => {}}
        localizedStrings={STRINGS}
      />,
    );
    expect(screen.getByRole('option', { name: /Español/ })).toHaveAttribute('aria-current', 'true');
  });

  test('calls onChange with the tag when a language is chosen', async () => {
    const onChange = vi.fn();
    render(
      <InterfaceLanguagePicker
        languages={LANGUAGES}
        value="en"
        onChange={onChange}
        localizedStrings={STRINGS}
      />,
    );
    await userEvent.click(screen.getByText('Español'));
    expect(onChange).toHaveBeenCalledWith('es');
  });

  test('search matches by autonym, by English name, and by otherNames alias', async () => {
    render(
      <InterfaceLanguagePicker
        languages={LANGUAGES}
        value="en"
        onChange={() => {}}
        localizedStrings={STRINGS}
      />,
    );
    const search = screen.getByPlaceholderText('Search languages');
    await userEvent.type(search, 'Spanish');
    expect(screen.getByText('Español')).toBeInTheDocument();
    expect(screen.queryByText('中文（简体）')).not.toBeInTheDocument();
  });

  test('otherNames alias filters the row but is never rendered', async () => {
    render(
      <InterfaceLanguagePicker
        languages={LANGUAGES}
        value="en"
        onChange={() => {}}
        localizedStrings={STRINGS}
      />,
    );
    expect(screen.queryByText('Pidgin')).not.toBeInTheDocument(); // never displayed
    await userEvent.type(screen.getByPlaceholderText('Search languages'), 'Pidgin');
    expect(screen.getByText('Tok Pisin')).toBeInTheDocument(); // but it matches
  });

  test('selecting a language does not filter out the remaining options (cmdk v1 regression)', async () => {
    const onChange = vi.fn();
    render(
      <InterfaceLanguagePicker
        languages={LANGUAGES}
        value="en"
        onChange={onChange}
        localizedStrings={STRINGS}
      />,
    );
    await userEvent.click(screen.getByText('Español'));
    expect(onChange).toHaveBeenCalledWith('es');
    // All languages must remain visible — cmdk v1 would overwrite the search input with the
    // selected item's value prop ('es'), filtering out every non-matching language.
    expect(screen.getByText('English')).toBeInTheDocument();
    expect(screen.getByText('Español')).toBeInTheDocument();
    expect(screen.getByText('中文（简体）')).toBeInTheDocument();
    expect(screen.getByText('Tok Pisin')).toBeInTheDocument();
  });

  test('hides the search box when there is only one language', () => {
    render(
      <InterfaceLanguagePicker
        languages={{ en: { autonym: 'English' } }}
        value="en"
        onChange={() => {}}
        localizedStrings={STRINGS}
      />,
    );
    expect(screen.queryByPlaceholderText('Search languages')).not.toBeInTheDocument();
  });
});

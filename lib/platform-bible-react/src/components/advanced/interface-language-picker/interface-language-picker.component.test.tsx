// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { beforeAll, beforeEach, describe, expect, test, vi } from 'vitest';
import '@testing-library/jest-dom';
import type { LanguageInfo } from '../ui-language-selector.component';
import { InterfaceLanguagePicker } from './interface-language-picker.component';
import {
  SAMPLE_LANGUAGES as LANGUAGES,
  SAMPLE_LOCALIZED_STRINGS as STRINGS,
} from './interface-language-picker.data';

// cmdk needs a ResizeObserver and Element.scrollIntoView, which jsdom lacks.
const scrollIntoView = vi.fn();
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
  Element.prototype.scrollIntoView = scrollIntoView;
});

beforeEach(() => {
  scrollIntoView.mockClear();
});

/** Holds `value` in state and updates it on `onChange`, the way a real consumer does. */
function StatefulPicker({
  initialValue,
  onChange,
}: {
  initialValue: string;
  onChange: (tag: string) => void;
}) {
  const [value, setValue] = useState(initialValue);
  return (
    <InterfaceLanguagePicker
      languages={LANGUAGES}
      value={value}
      onChange={(tag) => {
        onChange(tag);
        setValue(tag);
      }}
      localizedStrings={STRINGS}
    />
  );
}

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
    expect(screen.getAllByRole('option')).toHaveLength(Object.keys(LANGUAGES).length);
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

  test('shows the no-results message when nothing matches, and Enter then chooses nothing', async () => {
    const onChange = vi.fn();
    render(
      <InterfaceLanguagePicker
        languages={LANGUAGES}
        value="en"
        onChange={onChange}
        localizedStrings={STRINGS}
      />,
    );
    await userEvent.type(screen.getByPlaceholderText('Search languages'), 'zzzz{Enter}');
    expect(await screen.findByText('No matching languages')).toBeInTheDocument();
    expect(screen.queryByText('English')).not.toBeInTheDocument();
    expect(onChange).not.toHaveBeenCalled();
  });

  test('keeps the typed query after choosing a filtered match (cmdk v1 regression)', async () => {
    const onChange = vi.fn();
    render(
      <InterfaceLanguagePicker
        languages={LANGUAGES}
        value="en"
        onChange={onChange}
        localizedStrings={STRINGS}
      />,
    );
    const search = screen.getByPlaceholderText('Search languages');
    await userEvent.type(search, 'Spa');
    await userEvent.click(screen.getByText('Español'));
    expect(onChange).toHaveBeenCalledWith('es');
    // cmdk v1 would overwrite the search box with the chosen item's `value` prop ('es'), so the
    // query the user typed must still be there afterwards.
    expect(search).toHaveValue('Spa');
  });

  test('Enter chooses the first match after typing', async () => {
    const onChange = vi.fn();
    render(
      <InterfaceLanguagePicker
        languages={LANGUAGES}
        value="en"
        onChange={onChange}
        localizedStrings={STRINGS}
      />,
    );
    await userEvent.type(screen.getByPlaceholderText('Search languages'), 'Spa{Enter}');
    expect(onChange).toHaveBeenCalledWith('es');
  });

  test('Enter without typing re-picks the current language', async () => {
    const onChange = vi.fn();
    render(
      <InterfaceLanguagePicker
        languages={LANGUAGES}
        value="fr"
        onChange={onChange}
        localizedStrings={STRINGS}
      />,
    );
    await userEvent.click(screen.getByPlaceholderText('Search languages'));
    await userEvent.keyboard('{Enter}');
    expect(onChange).toHaveBeenCalledWith('fr');
  });

  test('clearing the search returns the highlight to the current language', async () => {
    const onChange = vi.fn();
    render(<StatefulPicker initialValue="en" onChange={onChange} />);
    await userEvent.click(screen.getByText('Français'));
    const search = screen.getByPlaceholderText('Search languages');
    await userEvent.type(search, 'tok');
    await userEvent.clear(search);
    onChange.mockClear();
    await userEvent.keyboard('{Enter}');
    expect(onChange).toHaveBeenCalledWith('fr');
    expect(onChange).not.toHaveBeenCalledWith('en');
  });

  test('follows a value and languages that arrive after mount', async () => {
    const onChange = vi.fn();
    // Built fresh each time so `rerender` actually re-renders with the new props.
    const buildPicker = (languages: Record<string, LanguageInfo>, value: string) => (
      <InterfaceLanguagePicker
        languages={languages}
        value={value}
        onChange={onChange}
        localizedStrings={STRINGS}
      />
    );
    // A consumer may render its fallbacks first, then the real setting and language list.
    const { rerender } = render(buildPicker({ en: { autonym: 'English' } }, 'en'));
    rerender(buildPicker(LANGUAGES, 'fr'));
    await userEvent.click(screen.getByPlaceholderText('Search languages'));
    await userEvent.keyboard('{Enter}');
    expect(onChange).toHaveBeenCalledWith('fr');
  });

  test('highlights the top row when the value names no listed language', async () => {
    const onChange = vi.fn();
    render(
      <InterfaceLanguagePicker
        languages={LANGUAGES}
        value="de"
        onChange={onChange}
        localizedStrings={STRINGS}
      />,
    );
    expect(screen.getByRole('option', { name: 'English' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    await userEvent.click(screen.getByPlaceholderText('Search languages'));
    await userEvent.keyboard('{Enter}');
    expect(onChange).toHaveBeenCalledWith('en');
  });

  test('search ignores accents, so an unaccented query still matches', async () => {
    render(
      <InterfaceLanguagePicker
        languages={LANGUAGES}
        value="en"
        onChange={() => {}}
        localizedStrings={STRINGS}
      />,
    );
    await userEvent.type(screen.getByPlaceholderText('Search languages'), 'francais');
    expect(screen.getByText('Français')).toBeInTheDocument();
    expect(screen.queryByText('English')).not.toBeInTheDocument();
  });

  test('search still matches when the query carries the accents', async () => {
    render(
      <InterfaceLanguagePicker
        languages={LANGUAGES}
        value="en"
        onChange={() => {}}
        localizedStrings={STRINGS}
      />,
    );
    await userEvent.type(screen.getByPlaceholderText('Search languages'), 'Español');
    expect(screen.getByText('Español')).toBeInTheDocument();
    expect(screen.queryByText('Français')).not.toBeInTheDocument();
  });

  test('arrow keys move the highlight through the filtered list', async () => {
    const onChange = vi.fn();
    render(
      <InterfaceLanguagePicker
        languages={LANGUAGES}
        value="en"
        onChange={onChange}
        localizedStrings={STRINGS}
      />,
    );
    // 'an' matches only Español (Spanish) and Français (French).
    await userEvent.type(screen.getByPlaceholderText('Search languages'), 'an');
    await userEvent.keyboard('{ArrowDown}{Enter}');
    expect(onChange).toHaveBeenCalledWith('fr');
  });

  test('typing again moves the highlight back to the top match', async () => {
    const onChange = vi.fn();
    render(
      <InterfaceLanguagePicker
        languages={LANGUAGES}
        value="en"
        onChange={onChange}
        localizedStrings={STRINGS}
      />,
    );
    const search = screen.getByPlaceholderText('Search languages');
    // 'a' and 'an' both match only Español and Français, so the row arrowed to still matches.
    await userEvent.type(search, 'a');
    await userEvent.keyboard('{ArrowDown}');
    await userEvent.type(search, 'n{Enter}');
    expect(onChange).toHaveBeenCalledWith('es');
  });

  test('exposes the highlighted row as the active descendant of the search box', async () => {
    render(
      <InterfaceLanguagePicker
        languages={LANGUAGES}
        value="en"
        onChange={() => {}}
        localizedStrings={STRINGS}
      />,
    );
    const search = screen.getByRole('combobox', { name: 'Search languages' });
    expect(search).toHaveAttribute('aria-controls', screen.getByRole('listbox').id);
    expect(search).toHaveAttribute(
      'aria-activedescendant',
      screen.getByRole('option', { name: /English/ }).id,
    );

    await userEvent.type(search, 'an');
    expect(search).toHaveAttribute(
      'aria-activedescendant',
      screen.getByRole('option', { name: 'Español' }).id,
    );

    await userEvent.keyboard('{ArrowDown}');
    expect(search).toHaveAttribute(
      'aria-activedescendant',
      screen.getByRole('option', { name: 'Français' }).id,
    );

    await userEvent.type(search, 'zzzz');
    expect(search).not.toHaveAttribute('aria-activedescendant');
  });

  test('scrolls the top match into view when typing moves the highlight', async () => {
    render(
      <InterfaceLanguagePicker
        languages={LANGUAGES}
        value="en"
        onChange={() => {}}
        localizedStrings={STRINGS}
      />,
    );
    scrollIntoView.mockClear();
    await userEvent.type(screen.getByPlaceholderText('Search languages'), 'tok');
    expect(scrollIntoView.mock.contexts).toContain(
      screen.getByRole('option', { name: 'Tok Pisin' }),
    );
  });

  test('does not scroll the row under the pointer', async () => {
    render(
      <InterfaceLanguagePicker
        languages={LANGUAGES}
        value="en"
        onChange={() => {}}
        localizedStrings={STRINGS}
      />,
    );
    const hovered = screen.getByRole('option', { name: 'Tok Pisin' });
    scrollIntoView.mockClear();
    await userEvent.hover(hovered);
    expect(hovered).toHaveAttribute('aria-selected', 'true');
    expect(scrollIntoView.mock.contexts).not.toContain(hovered);
  });
});

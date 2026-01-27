import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  LanguageSelectionForm,
  LanguageSelectionFormProps,
  LanguageInfo,
  ScriptOption,
  RegionOption,
  validateLanguageName,
  validateVariant,
  assembleBcp47,
  parseBcp47,
} from './language-selection-form.component';

// Mock scrollIntoView since jsdom doesn't implement it
beforeAll(() => {
  Element.prototype.scrollIntoView = vi.fn();
});

// =====================================================
// TEST DATA
// =====================================================

const sampleLanguages: LanguageInfo[] = [
  {
    code: 'eng',
    name: 'English',
    altNames: ['Anglais'],
    scripts: ['Latn'],
    regions: ['US', 'GB', 'AU'],
  },
  {
    code: 'fra',
    name: 'French',
    altNames: ['Francais', 'Langue francaise'],
    scripts: ['Latn'],
    regions: ['FR', 'CA', 'BE'],
  },
  {
    code: 'deu',
    name: 'German',
    altNames: ['Deutsch'],
    scripts: ['Latn'],
    regions: ['DE', 'AT', 'CH'],
  },
  {
    code: 'spa',
    name: 'Spanish',
    altNames: ['Espanol', 'Castellano'],
    scripts: ['Latn'],
    regions: ['ES', 'MX', 'AR'],
  },
  {
    code: 'por',
    name: 'Portuguese',
    altNames: ['Portugues'],
    scripts: ['Latn'],
    regions: ['PT', 'BR'],
  },
  {
    code: 'zho',
    name: 'Chinese',
    altNames: ['Mandarin', 'Zhongwen'],
    scripts: ['Hans', 'Hant'],
    regions: ['CN', 'TW', 'HK'],
  },
  {
    code: 'ara',
    name: 'Arabic',
    altNames: ['Al-Arabiya'],
    scripts: ['Arab'],
    regions: ['SA', 'EG', 'AE'],
  },
  {
    code: 'hin',
    name: 'Hindi',
    altNames: [],
    scripts: ['Deva'],
    regions: ['IN'],
  },
];

const sampleScripts: ScriptOption[] = [
  { code: 'Latn', name: 'Latin' },
  { code: 'Cyrl', name: 'Cyrillic' },
  { code: 'Arab', name: 'Arabic' },
  { code: 'Deva', name: 'Devanagari' },
  { code: 'Hans', name: 'Simplified Chinese' },
  { code: 'Hant', name: 'Traditional Chinese' },
];

const sampleRegions: RegionOption[] = [
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'FR', name: 'France' },
  { code: 'CA', name: 'Canada' },
  { code: 'DE', name: 'Germany' },
  { code: 'CN', name: 'China' },
  { code: 'IN', name: 'India' },
];

const defaultProps: LanguageSelectionFormProps = {
  languages: sampleLanguages,
  scriptOptions: sampleScripts,
  regionOptions: sampleRegions,
  isNewLanguage: true,
  isRegistered: false,
};

// Helper functions
function getLanguageNameInput(): HTMLInputElement {
  const element = document.getElementById('languageName');
  if (!(element instanceof HTMLInputElement)) {
    throw new Error('languageName input not found');
  }
  return element;
}

function getVariantInput(): HTMLInputElement {
  const element = document.getElementById('variant');
  if (!(element instanceof HTMLInputElement)) {
    throw new Error('variant input not found');
  }
  return element;
}

function getSearchInput(): HTMLInputElement {
  const element = document.getElementById('languageSearch');
  if (!(element instanceof HTMLInputElement)) {
    throw new Error('languageSearch input not found');
  }
  return element;
}

function getListbox(): HTMLElement {
  return screen.getByRole('listbox');
}

function getLanguageOption(listbox: HTMLElement, languageName: string): HTMLElement {
  const element = within(listbox).getByText(languageName).closest('[role="option"]');
  if (!(element instanceof HTMLElement)) {
    throw new Error(`Language option "${languageName}" not found`);
  }
  return element;
}

// =====================================================
// VALIDATION FUNCTION TESTS
// =====================================================

describe('validateLanguageName', () => {
  it('returns undefined for valid language name', () => {
    expect(validateLanguageName('English')).toBeUndefined();
    expect(validateLanguageName('My Custom Language')).toBeUndefined();
  });

  it('returns Language_NameRequired for empty name', () => {
    expect(validateLanguageName('')).toBe('Language_NameRequired');
  });

  it('returns Language_NameRequired for whitespace-only name', () => {
    expect(validateLanguageName('   ')).toBe('Language_NameRequired');
    expect(validateLanguageName('\t\n')).toBe('Language_NameRequired');
  });
});

describe('validateVariant', () => {
  it('returns undefined for valid variant', () => {
    expect(validateVariant('')).toBeUndefined();
    expect(validateVariant('fonipa')).toBeUndefined();
    expect(validateVariant('1996')).toBeUndefined();
    expect(validateVariant('arevela')).toBeUndefined();
  });

  it('returns Language_VariantInvalidChars for invalid characters', () => {
    expect(validateVariant('FONIPA')).toBe('Language_VariantInvalidChars'); // uppercase
    expect(validateVariant('fon-ipa')).toBe('Language_VariantInvalidChars'); // hyphen
    expect(validateVariant('fon_ipa')).toBe('Language_VariantInvalidChars'); // underscore
    expect(validateVariant('fon ipa')).toBe('Language_VariantInvalidChars'); // space
  });
});

// =====================================================
// BCP-47 ASSEMBLY/PARSING TESTS
// =====================================================

describe('assembleBcp47', () => {
  it('returns base code when no optional components', () => {
    expect(assembleBcp47('eng', undefined, undefined, undefined)).toBe('eng');
    expect(assembleBcp47('fra', undefined, undefined, undefined)).toBe('fra');
  });

  it('includes script when provided', () => {
    expect(assembleBcp47('eng', 'Latn', undefined, undefined)).toBe('eng-Latn');
  });

  it('includes region when provided', () => {
    expect(assembleBcp47('eng', undefined, 'US', undefined)).toBe('eng-US');
  });

  it('includes variant when provided', () => {
    expect(assembleBcp47('fra', undefined, undefined, 'fonipa')).toBe('fra-fonipa');
  });

  it('includes all components in correct order', () => {
    expect(assembleBcp47('eng', 'Latn', 'US', undefined)).toBe('eng-Latn-US');
    expect(assembleBcp47('fra', 'Latn', 'CA', 'fonipa')).toBe('fra-Latn-CA-fonipa');
  });

  it('handles empty string variant same as undefined', () => {
    expect(assembleBcp47('eng', 'Latn', 'US', '')).toBe('eng-Latn-US');
  });
});

describe('parseBcp47', () => {
  it('parses base code only', () => {
    const result = parseBcp47('eng');
    expect(result.baseCode).toBe('eng');
    expect(result.script).toBeUndefined();
    expect(result.region).toBeUndefined();
    expect(result.variant).toBeUndefined();
  });

  it('parses code with script', () => {
    const result = parseBcp47('eng-Latn');
    expect(result.baseCode).toBe('eng');
    expect(result.script).toBe('Latn');
    expect(result.region).toBeUndefined();
    expect(result.variant).toBeUndefined();
  });

  it('parses code with region', () => {
    const result = parseBcp47('eng-US');
    expect(result.baseCode).toBe('eng');
    expect(result.script).toBeUndefined();
    expect(result.region).toBe('US');
    expect(result.variant).toBeUndefined();
  });

  it('parses code with script and region', () => {
    const result = parseBcp47('eng-Latn-US');
    expect(result.baseCode).toBe('eng');
    expect(result.script).toBe('Latn');
    expect(result.region).toBe('US');
    expect(result.variant).toBeUndefined();
  });

  it('parses code with all components', () => {
    const result = parseBcp47('fra-Latn-CA-fonipa');
    expect(result.baseCode).toBe('fra');
    expect(result.script).toBe('Latn');
    expect(result.region).toBe('CA');
    expect(result.variant).toBe('fonipa');
  });

  it('handles empty string', () => {
    const result = parseBcp47('');
    expect(result.baseCode).toBe('');
    expect(result.script).toBeUndefined();
    expect(result.region).toBeUndefined();
    expect(result.variant).toBeUndefined();
  });
});

// =====================================================
// COMPONENT RENDERING TESTS
// =====================================================

describe('LanguageSelectionForm rendering', () => {
  it('renders dialog title', () => {
    render(<LanguageSelectionForm {...defaultProps} />);
    expect(screen.getByText('Choose Language Identifier')).toBeInTheDocument();
  });

  it('renders dialog title with project name', () => {
    render(<LanguageSelectionForm {...defaultProps} projectName="My Project" />);
    expect(screen.getByText('Choose Language Identifier for My Project')).toBeInTheDocument();
  });

  it('renders search input', () => {
    render(<LanguageSelectionForm {...defaultProps} />);
    expect(getSearchInput()).toBeInTheDocument();
  });

  it('renders language list with column headers', () => {
    render(<LanguageSelectionForm {...defaultProps} />);
    expect(screen.getByText('Code')).toBeInTheDocument();
    expect(screen.getByText('Language Name')).toBeInTheDocument();
  });

  it('renders all sample languages in list', () => {
    render(<LanguageSelectionForm {...defaultProps} />);
    const listbox = getListbox();
    expect(within(listbox).getByText('English')).toBeInTheDocument();
    expect(within(listbox).getByText('French')).toBeInTheDocument();
    expect(within(listbox).getByText('German')).toBeInTheDocument();
  });

  it('renders language name input', () => {
    render(<LanguageSelectionForm {...defaultProps} />);
    expect(getLanguageNameInput()).toBeInTheDocument();
  });

  it('renders script, region, variant labels', () => {
    render(<LanguageSelectionForm {...defaultProps} />);
    expect(screen.getByText('Script:')).toBeInTheDocument();
    expect(screen.getByText('Region:')).toBeInTheDocument();
    expect(screen.getByText('Variant:')).toBeInTheDocument();
  });

  it('renders OK and Cancel buttons', () => {
    render(<LanguageSelectionForm {...defaultProps} />);
    expect(screen.getByRole('button', { name: 'OK' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
  });

  it('disables variant when no language selected', () => {
    render(<LanguageSelectionForm {...defaultProps} />);
    expect(getVariantInput()).toBeDisabled();
  });
});

// =====================================================
// SEARCH FUNCTIONALITY TESTS
// =====================================================

describe('LanguageSelectionForm search', () => {
  // Note: Tests use real timers with longer timeouts for debounce
  it('filters languages by code prefix', async () => {
    render(<LanguageSelectionForm {...defaultProps} />);

    const searchInput = getSearchInput();
    fireEvent.change(searchInput, { target: { value: 'eng' } });

    // Wait for debounce (300ms) + buffer
    await waitFor(
      () => {
        const listbox = getListbox();
        expect(within(listbox).getByText('English')).toBeInTheDocument();
        expect(within(listbox).queryByText('French')).not.toBeInTheDocument();
      },
      { timeout: 1000 },
    );
  });

  it('filters languages by name (case-insensitive)', async () => {
    render(<LanguageSelectionForm {...defaultProps} />);

    const searchInput = getSearchInput();
    fireEvent.change(searchInput, { target: { value: 'french' } });

    await waitFor(
      () => {
        const listbox = getListbox();
        expect(within(listbox).getByText('French')).toBeInTheDocument();
        expect(within(listbox).queryByText('English')).not.toBeInTheDocument();
      },
      { timeout: 1000 },
    );
  });

  it('filters languages by alternative name', async () => {
    render(<LanguageSelectionForm {...defaultProps} />);

    const searchInput = getSearchInput();
    fireEvent.change(searchInput, { target: { value: 'deutsch' } });

    await waitFor(
      () => {
        const listbox = getListbox();
        expect(within(listbox).getByText('German')).toBeInTheDocument();
      },
      { timeout: 1000 },
    );
  });

  it('shows no results message when no matches', async () => {
    render(<LanguageSelectionForm {...defaultProps} />);

    const searchInput = getSearchInput();
    fireEvent.change(searchInput, { target: { value: 'xyz123' } });

    await waitFor(
      () => {
        expect(screen.getByText('No languages found')).toBeInTheDocument();
      },
      { timeout: 1000 },
    );
  });
});

// =====================================================
// LANGUAGE SELECTION TESTS
// =====================================================

describe('LanguageSelectionForm language selection', () => {
  it('selects language when clicked', async () => {
    render(<LanguageSelectionForm {...defaultProps} />);

    const listbox = getListbox();
    const englishOption = getLanguageOption(listbox, 'English');

    fireEvent.click(englishOption);

    await waitFor(() => {
      expect(englishOption).toHaveAttribute('aria-selected', 'true');
    });
  });

  it('populates language name when language selected', async () => {
    render(<LanguageSelectionForm {...defaultProps} />);

    const listbox = getListbox();
    const englishOption = getLanguageOption(listbox, 'English');

    fireEvent.click(englishOption);

    await waitFor(() => {
      expect(getLanguageNameInput()).toHaveValue('English');
    });
  });

  it('enables variant after selection', async () => {
    render(<LanguageSelectionForm {...defaultProps} />);

    const listbox = getListbox();
    const englishOption = getLanguageOption(listbox, 'English');

    fireEvent.click(englishOption);

    await waitFor(() => {
      expect(getVariantInput()).not.toBeDisabled();
    });
  });

  it('updates preview when language selected', async () => {
    render(<LanguageSelectionForm {...defaultProps} />);

    const listbox = getListbox();
    const frenchOption = getLanguageOption(listbox, 'French');

    fireEvent.click(frenchOption);

    await waitFor(() => {
      expect(screen.getByText(/French \(fra\)/)).toBeInTheDocument();
    });
  });
});

// =====================================================
// BCP-47 PREVIEW TESTS
// =====================================================

describe('LanguageSelectionForm BCP-47 preview', () => {
  it('shows base code only when no components selected', async () => {
    render(<LanguageSelectionForm {...defaultProps} />);

    const listbox = getListbox();
    const englishOption = getLanguageOption(listbox, 'English');
    fireEvent.click(englishOption);

    await waitFor(() => {
      expect(screen.getByText(/English \(eng\)/)).toBeInTheDocument();
    });
  });
});

// =====================================================
// VALIDATION TESTS
// =====================================================

describe('LanguageSelectionForm validation', () => {
  it('prevents submission when no language is selected', async () => {
    const onSubmit = vi.fn();
    render(<LanguageSelectionForm {...defaultProps} onSubmit={onSubmit} />);

    // OK button should be disabled when no language is selected
    const okButton = screen.getByRole('button', { name: 'OK' });
    expect(okButton).toBeDisabled();

    // Even if we try to click, onSubmit should not be called
    // (button is disabled, but let's verify the validation logic)
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('shows error for empty language name', async () => {
    render(<LanguageSelectionForm {...defaultProps} />);

    // Select a language first
    const listbox = getListbox();
    const englishOption = getLanguageOption(listbox, 'English');
    fireEvent.click(englishOption);

    // Clear the language name
    const nameInput = getLanguageNameInput();
    fireEvent.change(nameInput, { target: { value: '' } });

    await waitFor(() => {
      const errorElement = document.getElementById('languageName-error');
      // eslint-disable-next-line no-null/no-null
      expect(errorElement).not.toBeNull();
      expect(errorElement?.textContent).toContain('required');
    });
  });

  it('shows error for invalid variant characters', async () => {
    render(<LanguageSelectionForm {...defaultProps} />);

    // Select a language first
    const listbox = getListbox();
    const englishOption = getLanguageOption(listbox, 'English');
    fireEvent.click(englishOption);

    // Enter invalid variant (uppercase - note component auto-lowercases, so we use special chars)
    const variantInput = getVariantInput();
    fireEvent.change(variantInput, { target: { value: 'inv@lid' } });

    await waitFor(() => {
      const errorElement = document.getElementById('variant-error');
      // eslint-disable-next-line no-null/no-null
      expect(errorElement).not.toBeNull();
      expect(errorElement?.textContent).toContain('lowercase letters');
    });
  });

  it('disables OK button when validation errors exist', async () => {
    render(<LanguageSelectionForm {...defaultProps} />);

    // OK button should be disabled initially (no selection)
    expect(screen.getByRole('button', { name: 'OK' })).toBeDisabled();

    // Select a language
    const listbox = getListbox();
    const englishOption = getLanguageOption(listbox, 'English');
    fireEvent.click(englishOption);

    // Now OK should be enabled
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'OK' })).not.toBeDisabled();
    });

    // Clear name to create error
    const nameInput = getLanguageNameInput();
    fireEvent.change(nameInput, { target: { value: '' } });

    // OK should be disabled again
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'OK' })).toBeDisabled();
    });
  });
});

// =====================================================
// REGISTRY WARNING TESTS
// =====================================================

describe('LanguageSelectionForm registry warning', () => {
  it('does not show warning for unregistered projects', async () => {
    render(
      <LanguageSelectionForm
        {...defaultProps}
        isRegistered={false}
        currentLanguageId="eng"
        currentLanguageName="English"
      />,
    );

    // Change language
    const listbox = getListbox();
    const frenchOption = getLanguageOption(listbox, 'French');
    fireEvent.click(frenchOption);

    await waitFor(() => {
      expect(
        screen.queryByText(/Changing the language of a registered project/),
      ).not.toBeInTheDocument();
    });
  });

  it('shows warning for registered project when language changed', async () => {
    render(
      <LanguageSelectionForm
        {...defaultProps}
        isRegistered
        currentLanguageId="eng"
        currentLanguageName="English"
      />,
    );

    // Change language
    const listbox = getListbox();
    const frenchOption = getLanguageOption(listbox, 'French');
    fireEvent.click(frenchOption);

    await waitFor(() => {
      expect(screen.getByText(/Changing the language of a registered project/)).toBeInTheDocument();
    });
  });

  it('does not show warning when no change made', () => {
    render(
      <LanguageSelectionForm
        {...defaultProps}
        isRegistered
        currentLanguageId="eng"
        currentLanguageName="English"
      />,
    );

    expect(
      screen.queryByText(/Changing the language of a registered project/),
    ).not.toBeInTheDocument();
  });
});

// =====================================================
// CALLBACK TESTS
// =====================================================

describe('LanguageSelectionForm callbacks', () => {
  it('calls onSubmit with correct result', async () => {
    const onSubmit = vi.fn();
    render(<LanguageSelectionForm {...defaultProps} onSubmit={onSubmit} />);

    // Select a language
    const listbox = getListbox();
    const englishOption = getLanguageOption(listbox, 'English');
    fireEvent.click(englishOption);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'OK' })).not.toBeDisabled();
    });

    // Click OK
    fireEvent.click(screen.getByRole('button', { name: 'OK' }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        languageId: 'eng',
        languageName: 'English',
      });
    });
  });

  it('calls onCancel when Cancel clicked', () => {
    const onCancel = vi.fn();
    render(<LanguageSelectionForm {...defaultProps} onCancel={onCancel} />);

    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));

    expect(onCancel).toHaveBeenCalled();
  });

  it('does not call onSubmit when validation fails', async () => {
    const onSubmit = vi.fn();
    render(<LanguageSelectionForm {...defaultProps} onSubmit={onSubmit} />);

    // Try to submit without selection
    fireEvent.click(screen.getByRole('button', { name: 'OK' }));

    expect(onSubmit).not.toHaveBeenCalled();
  });
});

// =====================================================
// INITIALIZATION TESTS
// =====================================================

describe('LanguageSelectionForm initialization', () => {
  it('pre-selects language from currentLanguageId', () => {
    render(
      <LanguageSelectionForm
        {...defaultProps}
        currentLanguageId="eng"
        currentLanguageName="English"
      />,
    );

    const listbox = getListbox();
    const englishOption = getLanguageOption(listbox, 'English');
    expect(englishOption).toHaveAttribute('aria-selected', 'true');
  });

  it('populates language name from prop', () => {
    render(
      <LanguageSelectionForm
        {...defaultProps}
        currentLanguageId="eng"
        currentLanguageName="Custom English Name"
      />,
    );

    expect(getLanguageNameInput()).toHaveValue('Custom English Name');
  });

  it('shows preview with full BCP-47 code when currentLanguageId has components', () => {
    render(
      <LanguageSelectionForm
        {...defaultProps}
        currentLanguageId="fra-Latn-CA"
        currentLanguageName="Canadian French"
      />,
    );

    // The component should show the preview since 'fra' is in the list
    // and the name from currentLanguageName
    expect(screen.getByText(/Canadian French/)).toBeInTheDocument();
  });
});

// =====================================================
// UNIQUENESS VALIDATION TESTS
// =====================================================

describe('LanguageSelectionForm uniqueness validation', () => {
  it('calls uniqueness validator and shows error for non-unique name', async () => {
    const validateUniqueness = vi.fn().mockResolvedValue(false);

    render(
      <LanguageSelectionForm
        {...defaultProps}
        validateLanguageNameUniqueness={validateUniqueness}
      />,
    );

    // Select a language
    const listbox = getListbox();
    const englishOption = getLanguageOption(listbox, 'English');
    fireEvent.click(englishOption);

    // Wait for validation to be called (debounced)
    await waitFor(
      () => {
        expect(validateUniqueness).toHaveBeenCalledWith('English');
      },
      { timeout: 1000 },
    );

    // Check for error message
    await waitFor(
      () => {
        const errorElement = document.getElementById('languageName-error');
        // eslint-disable-next-line no-null/no-null
        expect(errorElement).not.toBeNull();
        expect(errorElement?.textContent).toContain('already in use');
      },
      { timeout: 1000 },
    );
  });

  it('clears error when uniqueness validation passes', async () => {
    const validateUniqueness = vi.fn().mockResolvedValue(true);

    render(
      <LanguageSelectionForm
        {...defaultProps}
        validateLanguageNameUniqueness={validateUniqueness}
      />,
    );

    // Select a language
    const listbox = getListbox();
    const englishOption = getLanguageOption(listbox, 'English');
    fireEvent.click(englishOption);

    // Wait for validation
    await waitFor(
      () => {
        expect(validateUniqueness).toHaveBeenCalledWith('English');
      },
      { timeout: 1000 },
    );

    // There should be no error - getElementById returns null if not found
    await waitFor(
      () => {
        const errorElement = document.getElementById('languageName-error');
        // eslint-disable-next-line no-null/no-null
        expect(errorElement).toBeNull();
      },
      { timeout: 500 },
    );
  });
});

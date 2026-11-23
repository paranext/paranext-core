import { describe, it, expect } from 'vitest';
import {
  presentEncyclopediaItem,
  presentEncyclopediaItems,
  type EncyclopediaDisplayItemInput,
  type EncyclopediaPresenterOptions,
  type EncyclopediaItemPresentation,
} from './encyclopedia-presenter';

/**
 * RED-phase / inline-Vitest tests for `encyclopedia-presenter` — the pure-TypeScript presentation
 * module that sits between the C# `EncyclopediaDisplayItem` DTO (returned by PAPI command
 * `object:platform.enhancedResources.loadEncyclopedia`, see
 * `.context/features/enhanced-resources/data-contracts.md` §3.8) and the React UI types consumed by
 * `EncyclopediaTab` / `EncyclopediaDisplayItem`.
 *
 * Forward-note coverage:
 *
 * - **FN-023** — Encyclopedia rows render source-language fields (Hebrew/Greek script + translit) the
 *   same way `SourceLanguageIndexedList` does for dictionary entries. The presenter resolves the
 *   active display mode (Hebrew vs Greek) and produces a `displaySource` string in `script` /
 *   `translit` / `both` form; the wiring layer maps that onto the SLI item's `sourceLanguageText`
 *   so the row shows both an original-script lemma and a Latin headline.
 *
 * Decisions baked into this contract:
 *
 * 1. Single export pair: `presentEncyclopediaItem(input, options)` and `presentEncyclopediaItems`.
 *    Undefined input → undefined output for the singular form.
 * 2. Translit fallback: presenter prefers `input.translit` when non-empty; otherwise falls back
 *    through `options.transliterate(lemma)`. Keeps the presenter pure (caller owns
 *    transliteration).
 * 3. Display-mode selection: `resourceLanguage === 'heb'` → `hebrewDisplayMode`; otherwise
 *    `greekDisplayMode`. `dictionaryId` echoes 'SDBH' / 'SDBG' for caller pivots.
 * 4. `displaySource` shape:
 *
 *    - `'script'` → lemma alone
 *    - `'translit'` → translit alone
 *    - `'both'` → `"<lemma> (<translit>)"`, gracefully degrades to the lemma when translit is empty.
 * 5. `lemma`, `sourceText`, `glosses`, `entries`, `imageIds`, `collection`, and `tokenId` are
 *    forwarded unchanged so the wiring layer can render the row body and the side-drawer detail
 *    without a second adapter pass.
 */

// ---------------------------------------------------------------------------
// Fixture builders
// ---------------------------------------------------------------------------

function buildInput(
  overrides: Partial<EncyclopediaDisplayItemInput> = {},
): EncyclopediaDisplayItemInput {
  return {
    tokenId: 'tok-001',
    lemma: 'אֱלֹהִים',
    sourceText: 'אֱלֹהִים',
    translit: 'elohim',
    glosses: ['God'],
    entries: [
      {
        articleId: 'REALIA:GOD',
        key: 'GOD',
        title: 'God',
        teaserText: 'In the beginning God created the heavens and the earth.',
        formatVersion: 1,
      },
    ],
    imageIds: [],
    collection: 'REALIA',
    ...overrides,
  };
}

function buildOptions(
  overrides: Partial<EncyclopediaPresenterOptions> = {},
): EncyclopediaPresenterOptions {
  return {
    resourceLanguage: 'heb',
    hebrewDisplayMode: 'both',
    greekDisplayMode: 'both',
    transliterate: (lemma) => `xlit(${lemma})`,
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('encyclopedia-presenter', () => {
  describe('happy path — fully populated row', () => {
    it('produces a complete EncyclopediaItemPresentation with all expected fields', () => {
      const input = buildInput({
        tokenId: 'tok-elohim',
        lemma: 'אֱלֹהִים',
        sourceText: 'אֱלֹהִים',
        translit: 'elohim',
        glosses: ['God', 'gods'],
        entries: [
          {
            articleId: 'REALIA:GOD',
            key: 'GOD',
            title: 'God',
            teaserText: 'In the beginning God…',
            formatVersion: 1,
          },
          {
            articleId: 'REALIA:DEITY',
            key: 'DEITY',
            title: 'Deity',
            teaserText: 'A general term for divine beings…',
            formatVersion: 2,
            inlineImageIds: ['img-1', 'img-2'],
          },
        ],
        imageIds: ['img-1', 'img-2'],
        collection: 'REALIA',
      });
      const options = buildOptions({
        resourceLanguage: 'heb',
        hebrewDisplayMode: 'both',
      });

      const result = presentEncyclopediaItem(input, options);

      const expected: EncyclopediaItemPresentation = {
        tokenId: 'tok-elohim',
        lemma: 'אֱלֹהִים',
        sourceText: 'אֱלֹהִים',
        translit: 'elohim',
        displaySource: 'אֱלֹהִים (elohim)',
        displayMode: 'both',
        dictionaryId: 'SDBH',
        glosses: ['God', 'gods'],
        entries: [
          {
            articleId: 'REALIA:GOD',
            key: 'GOD',
            title: 'God',
            teaserText: 'In the beginning God…',
            formatVersion: 1,
          },
          {
            articleId: 'REALIA:DEITY',
            key: 'DEITY',
            title: 'Deity',
            teaserText: 'A general term for divine beings…',
            formatVersion: 2,
            inlineImageIds: ['img-1', 'img-2'],
          },
        ],
        imageIds: ['img-1', 'img-2'],
        collection: 'REALIA',
      };
      expect(result).toEqual(expected);
    });
  });

  describe('display mode selection', () => {
    it('uses hebrewDisplayMode when resourceLanguage is heb', () => {
      const input = buildInput({ lemma: 'אֱלֹהִים', translit: 'elohim' });
      const options = buildOptions({
        resourceLanguage: 'heb',
        hebrewDisplayMode: 'script',
        greekDisplayMode: 'translit',
      });
      const result = presentEncyclopediaItem(input, options);
      expect(result?.displayMode).toBe('script');
      expect(result?.displaySource).toBe('אֱלֹהִים');
      expect(result?.dictionaryId).toBe('SDBH');
    });

    it('uses greekDisplayMode when resourceLanguage is grc', () => {
      const input = buildInput({ lemma: 'ἀγάπη', translit: 'agape' });
      const options = buildOptions({
        resourceLanguage: 'grc',
        hebrewDisplayMode: 'script',
        greekDisplayMode: 'translit',
      });
      const result = presentEncyclopediaItem(input, options);
      expect(result?.displayMode).toBe('translit');
      expect(result?.displaySource).toBe('agape');
      expect(result?.dictionaryId).toBe('SDBG');
    });

    it.each([
      { mode: 'script' as const, expected: 'אֱלֹהִים' },
      { mode: 'translit' as const, expected: 'elohim' },
      { mode: 'both' as const, expected: 'אֱלֹהִים (elohim)' },
    ])('renders displaySource correctly for mode=$mode', ({ mode, expected }) => {
      const input = buildInput({ lemma: 'אֱלֹהִים', translit: 'elohim' });
      const result = presentEncyclopediaItem(
        input,
        buildOptions({ resourceLanguage: 'heb', hebrewDisplayMode: mode }),
      );
      expect(result?.displaySource).toBe(expected);
    });
  });

  describe('transliteration fallback', () => {
    it('uses input.translit when present', () => {
      const input = buildInput({ translit: 'elohim' });
      const options = buildOptions({
        transliterate: () => 'should-not-be-called',
      });
      const result = presentEncyclopediaItem(input, options);
      expect(result?.translit).toBe('elohim');
    });

    it('falls back to options.transliterate when input.translit is empty', () => {
      const input = buildInput({ lemma: 'אֱלֹהִים', translit: '' });
      const options = buildOptions({
        transliterate: (lemma) => `auto(${lemma})`,
      });
      const result = presentEncyclopediaItem(input, options);
      expect(result?.translit).toBe('auto(אֱלֹהִים)');
    });

    it('renders displaySource gracefully when translit is empty in mode=both', () => {
      const input = buildInput({ lemma: 'אֱלֹהִים', translit: '' });
      const options = buildOptions({
        resourceLanguage: 'heb',
        hebrewDisplayMode: 'both',
        transliterate: () => '',
      });
      const result = presentEncyclopediaItem(input, options);
      // Both translit sources empty → fall back to the lemma alone, no "()" suffix.
      expect(result?.translit).toBe('');
      expect(result?.displaySource).toBe('אֱלֹהִים');
    });
  });

  describe('passthrough fields', () => {
    it('forwards tokenId, sourceText, glosses, entries, imageIds, collection unchanged', () => {
      const entries = [
        {
          articleId: 'FAUNA:CAMEL',
          key: 'CAMEL',
          title: 'Camel',
          teaserText: 'A large pack animal…',
          formatVersion: 2 as const,
          inlineImageIds: ['img-camel-1'],
        },
      ];
      const input = buildInput({
        tokenId: 'tok-camel',
        sourceText: 'gamal',
        glosses: ['camel'],
        entries,
        imageIds: ['img-camel-1', 'img-camel-2'],
        collection: 'FAUNA',
      });
      const result = presentEncyclopediaItem(input, buildOptions());
      expect(result?.tokenId).toBe('tok-camel');
      expect(result?.sourceText).toBe('gamal');
      expect(result?.glosses).toEqual(['camel']);
      expect(result?.entries).toEqual(entries);
      expect(result?.imageIds).toEqual(['img-camel-1', 'img-camel-2']);
      expect(result?.collection).toBe('FAUNA');
    });
  });

  describe('undefined input', () => {
    it('returns undefined when input is undefined', () => {
      expect(presentEncyclopediaItem(undefined, buildOptions())).toBeUndefined();
    });
  });

  describe('presentEncyclopediaItems', () => {
    it('maps a list 1:1 preserving order', () => {
      const inputs: EncyclopediaDisplayItemInput[] = [
        buildInput({ tokenId: 'tok-a', lemma: 'aleph', translit: 'a' }),
        buildInput({ tokenId: 'tok-b', lemma: 'beth', translit: 'b' }),
        buildInput({ tokenId: 'tok-c', lemma: 'gimel', translit: 'g' }),
      ];
      const result = presentEncyclopediaItems(
        inputs,
        buildOptions({ hebrewDisplayMode: 'translit' }),
      );
      expect(result.map((r) => r.tokenId)).toEqual(['tok-a', 'tok-b', 'tok-c']);
      expect(result.map((r) => r.displaySource)).toEqual(['a', 'b', 'g']);
    });

    it('returns an empty array for empty input', () => {
      expect(presentEncyclopediaItems([], buildOptions())).toEqual([]);
    });
  });
});

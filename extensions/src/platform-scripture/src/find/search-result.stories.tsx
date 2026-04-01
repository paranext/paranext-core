import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import SearchResult, { HidableFindResult, ReplaceConfig } from './search-result.component';
import {
  DEFAULT_PREVIEW_OPTIONS,
  PreviewOptions,
  ReplacePreviewColor,
} from './replace-preview-types';

// ─── Mock data ────────────────────────────────────────────────────────────────

const MOCK_VERSE_REF_GEN_1_1 = { book: 'GEN', chapterNum: 1, verseNum: 1 };
const MOCK_VERSE_REF_GEN_1_3 = { book: 'GEN', chapterNum: 1, verseNum: 3 };

/** A result matching "God" in GEN 1:1 */
const mockResultGod: HidableFindResult = {
  start: { verseRef: MOCK_VERSE_REF_GEN_1_1, offset: 10 },
  end: { verseRef: MOCK_VERSE_REF_GEN_1_1, offset: 13 },
  text: 'God',
};

/** A result matching "GOD" (all-caps) for preserve-case demo */
const mockResultGodCaps: HidableFindResult = {
  start: { verseRef: MOCK_VERSE_REF_GEN_1_3, offset: 5 },
  end: { verseRef: MOCK_VERSE_REF_GEN_1_3, offset: 8 },
  text: 'GOD',
};

/** A result that has already been replaced */
const mockResultReplaced: HidableFindResult = {
  ...mockResultGod,
  isReplaced: true,
};

const localizedBookData = new Map([['GEN', { localizedId: 'GEN', localizedName: 'Genesis' }]]);

const localizedStrings = {
  '%general_cancel%': 'Cancel',
  '%webView_find_copyReference%': 'Copy reference',
  '%webView_find_copyVerseText%': 'Copy verse text',
  '%webView_find_copyReferenceAndVerseText%': 'Copy reference and verse text',
  '%webView_find_dismiss%': 'Dismiss',
  '%webView_find_noVerseTextAvailable%': 'No verse text available',
  '%webView_find_loadingVerseText%': 'Loading verse text…',
  '%webView_find_replace%': 'Replace',
  '%webView_find_replaced%': 'Replaced',
};

// ─── Interactive wrapper ───────────────────────────────────────────────────────

/** Manages selected state so the card behaves interactively in stories */
function SearchResultDemo({
  result = mockResultGod,
  initiallySelected = false,
  isReplaceMode = false,
  replaceConfig,
  previewOptions = DEFAULT_PREVIEW_OPTIONS,
  isReplacing = false,
  onCancelReplace,
}: {
  result?: HidableFindResult;
  initiallySelected?: boolean;
  isReplaceMode?: boolean;
  replaceConfig?: ReplaceConfig;
  previewOptions?: PreviewOptions;
  isReplacing?: boolean;
  onCancelReplace?: () => void;
}) {
  const [isSelected, setIsSelected] = useState(initiallySelected);

  return (
    <div className="tw-w-96 tw-overflow-hidden tw-rounded-md tw-border">
      <SearchResult
        searchResult={result}
        globalResultsIndex={0}
        isSelected={isSelected}
        usjReaderWriter={undefined}
        localizedBookData={localizedBookData}
        onResultClick={() => setIsSelected(true)}
        onHideResult={() => {}}
        onReplace={() => {}}
        onCancelReplace={onCancelReplace}
        isReplaceMode={isReplaceMode}
        isReplacing={isReplacing}
        replaceConfig={replaceConfig}
        previewOptions={previewOptions}
        localizedStrings={localizedStrings}
      />
    </div>
  );
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Bundled Extensions/find/SearchResult',
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="pr-twp tw-p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj;

// ─── Find mode stories ────────────────────────────────────────────────────────

/** Default unselected state in Find mode. Click to select and see verse context. */
export const Default: Story = {
  render: () => <SearchResultDemo />,
};

/**
 * Selected state in Find mode. Because no `usjReaderWriter` is provided (as in Storybook), the
 * verse text shows a loading placeholder instead of actual scripture text.
 */
export const Selected: Story = {
  render: () => <SearchResultDemo initiallySelected />,
};

// ─── Replace mode stories ─────────────────────────────────────────────────────

/**
 * Arrow layout (default): shows `[find strikethrough] → [replace]` below the verse text when
 * selected.
 */
export const ReplaceModeArrow: Story = {
  render: () => (
    <SearchResultDemo
      isReplaceMode
      replaceConfig={{ term: 'Lord', preserveCase: false }}
      previewOptions={{ ...DEFAULT_PREVIEW_OPTIONS, layout: 'arrow' }}
      initiallySelected
    />
  ),
};

/**
 * Inline layout: embeds `[find strikethrough][replace]` directly in the verse context line. Falls
 * back to arrow when verse context is not yet loaded.
 */
export const ReplaceModeInline: Story = {
  render: () => (
    <SearchResultDemo
      isReplaceMode
      replaceConfig={{ term: 'Lord', preserveCase: false }}
      previewOptions={{ ...DEFAULT_PREVIEW_OPTIONS, layout: 'inline' }}
      initiallySelected
    />
  ),
};

/**
 * Block layout: shows two lines — a `−` (find) line and a `+` (replace) line, like a diff. Context
 * appears when selected.
 */
export const ReplaceModeBlock: Story = {
  render: () => (
    <SearchResultDemo
      isReplaceMode
      replaceConfig={{ term: 'Lord', preserveCase: false }}
      previewOptions={{ ...DEFAULT_PREVIEW_OPTIONS, layout: 'block' }}
      initiallySelected
    />
  ),
};

/** All three layouts side by side for quick visual comparison. */
export const AllLayouts: Story = {
  render: () => (
    <div className="tw-space-y-4">
      {(['arrow', 'inline', 'block'] as const).map((layout) => (
        <div key={layout}>
          <p className="tw-mb-2 tw-text-xs tw-font-semibold tw-uppercase tw-tracking-wide tw-text-muted-foreground">
            {layout}
          </p>
          <SearchResultDemo
            isReplaceMode
            replaceConfig={{ term: 'Lord', preserveCase: false }}
            previewOptions={{ ...DEFAULT_PREVIEW_OPTIONS, layout }}
            initiallySelected
          />
        </div>
      ))}
    </div>
  ),
};

const ALL_COLOR_SCHEMES: ReplacePreviewColor[] = ['red-cyan', 'red-green', 'grey-blue'];

/** All three color schemes with the arrow layout. */
export const AllColorSchemes: Story = {
  render: () => (
    <div className="tw-space-y-4">
      {ALL_COLOR_SCHEMES.map((color) => (
        <div key={color}>
          <p className="tw-mb-2 tw-text-xs tw-font-semibold tw-uppercase tw-tracking-wide tw-text-muted-foreground">
            {color}
          </p>
          <SearchResultDemo
            isReplaceMode
            replaceConfig={{ term: 'Lord', preserveCase: false }}
            previewOptions={{ ...DEFAULT_PREVIEW_OPTIONS, layout: 'arrow', color }}
            initiallySelected
          />
        </div>
      ))}
    </div>
  ),
};

/**
 * Preserve case: the found text is "GOD" (all caps), the replacement is "lord" (lowercase). With
 * preserve case enabled the replacement becomes "LORD" to match the original casing.
 */
export const PreserveCase: Story = {
  render: () => (
    <SearchResultDemo
      result={mockResultGodCaps}
      isReplaceMode
      replaceConfig={{ term: 'lord', preserveCase: true }}
      previewOptions={{ ...DEFAULT_PREVIEW_OPTIONS, layout: 'arrow' }}
      initiallySelected
    />
  ),
};

/**
 * A result that has just been replaced. Shows the red "Replaced" badge with a progress bar
 * animating toward 100 %, and a Cancel button to revert (connected here to a no-op).
 */
export const Replaced: Story = {
  render: () => (
    <div className="tw-w-96 tw-overflow-hidden tw-rounded-md tw-border">
      <SearchResult
        searchResult={mockResultReplaced}
        globalResultsIndex={0}
        isSelected={false}
        usjReaderWriter={undefined}
        localizedBookData={localizedBookData}
        onResultClick={() => {}}
        onHideResult={() => {}}
        onReplace={() => {}}
        onCancelReplace={() => {}}
        isReplaceMode
        isReplacing={false}
        localizedStrings={localizedStrings}
      />
    </div>
  ),
};

/** Monospace font and visible-whitespace symbols toggled on. */
export const MonospaceAndInvisible: Story = {
  render: () => (
    <div className="tw-space-y-4">
      <SearchResultDemo
        isReplaceMode
        replaceConfig={{ term: 'Lord', preserveCase: false }}
        previewOptions={{ ...DEFAULT_PREVIEW_OPTIONS, layout: 'inline', monospace: true }}
        initiallySelected
      />
      <SearchResultDemo
        isReplaceMode
        replaceConfig={{ term: 'Lord', preserveCase: false }}
        previewOptions={{ ...DEFAULT_PREVIEW_OPTIONS, layout: 'inline', showInvisible: true }}
        initiallySelected
      />
    </div>
  ),
};

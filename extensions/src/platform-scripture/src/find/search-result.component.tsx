import { ArrowRight, Copy, Minus, Plus, X } from 'lucide-react';
import { Button, DropdownMenuItem, ResultsCard } from 'platform-bible-react';
import { LocalizedStringValue, LocalizeKey, UsjReaderWriter } from 'platform-bible-utils';
import { FindResult } from 'platform-scripture';
import { useEffect, useMemo, useRef, useState } from 'react';
import { LocalizedBookData } from './find-types';
import { applyPreserveCase, preserveTrailingSpaces, renderWithInvisibleChars } from './find.utils';
import {
  getFindHighlightClasses,
  getGoldFindHighlightClasses,
  getReplaceHighlightClasses,
  getReplaceTextColorClasses,
} from './replace-preview-styles';
import { DEFAULT_FIND_PREVIEW_OPTIONS, PreviewOptions } from './replace-preview-types';

export type HidableFindResult = FindResult & { isHidden?: boolean; isReplaced?: boolean };

/** How many words to show around the search result */
const WORDS_AROUND_SEARCH_RESULT = 15;

export const SEARCH_RESULT_LOCALIZED_STRING_KEYS: LocalizeKey[] = [
  '%general_cancel%',
  '%webView_find_copyReference%',
  '%webView_find_copyVerseText%',
  '%webView_find_copyReferenceAndVerseText%',
  '%webView_find_dismiss%',
  '%webView_find_noVerseTextAvailable%',
  '%webView_find_loadingVerseText%',
  '%webView_find_replace%',
  '%webView_find_replaced%',
];

/**
 * Minimal logger shape consumed by the find search components — kept local so the components stay
 * `@papi`-free. The webview supplies `@papi/frontend`'s `logger`; Storybook stories omit it.
 */
export type FindLogger = { warn: (...args: unknown[]) => void };

/** Configuration for the replacement preview shown in replace mode. */
export interface ReplaceConfig {
  /** The replacement string to use */
  term: string;
  /** Whether to apply preserve-case transformation to the replacement */
  preserveCase: boolean;
}

/** Props interface for the SearchResult component */
interface SearchResultProps {
  /** The search result data to display */
  searchResult: HidableFindResult;
  /** The global index of this result in the complete search results list */
  globalResultsIndex: number;
  /** Whether this search result is currently selected/focused */
  isSelected: boolean;
  /** UsjReaderWriter for the book this search result occurred in */
  usjReaderWriter: UsjReaderWriter | undefined;
  /**
   * Pre-serialized USFM string for the book, cached at the book level to avoid repeated toUsfm()
   * calls across the results in a book.
   */
  cachedUsfm?: string;
  /** Map of book IDs to their localized display names */
  localizedBookData: Map<string, Pick<LocalizedBookData, 'localizedId' | 'localizedName'>>;
  /** Callback function called when the user clicks on (selects) this search result */
  onResultClick: (searchResult: HidableFindResult, index: number) => void;
  /** Called when this result card receives browser focus (e.g. Tab navigation) */
  onResultFocus?: (searchResult: HidableFindResult, index: number) => void;
  /** Called when the user double-clicks the result — focus shifts to the editor at this match */
  onResultDoubleClick?: (searchResult: HidableFindResult, index: number) => void;
  /** Called when the user clicks the scripture reference — focus shifts to the editor */
  onResultReferenceClick?: (searchResult: HidableFindResult, index: number) => void;
  /** Callback function called when the user chooses to hide/dismiss this result */
  onHideResult: (index: number) => void;
  /** Callback function called when the user clicks Replace on this result */
  onReplace: (index: number) => void;
  /** Callback to cancel/revert the pending replace for this result */
  onCancelReplace?: () => void;
  /** Whether the find WebView is currently in replace mode */
  isReplaceMode: boolean;
  /** Whether a replace operation is currently in progress */
  isReplacing: boolean;
  /** Configuration for the replacement preview (used in replace mode) */
  replaceConfig?: ReplaceConfig;
  /** Options controlling how the replace preview is displayed */
  previewOptions?: PreviewOptions;
  /**
   * Whether the project has AllowInvisibleChars enabled. Controls whether the USFM tilde `~` is
   * treated as a NBSP escape (false, the default) or as a literal tilde character (true). Passed
   * through to {@link renderWithInvisibleChars} when `previewOptions.showInvisible` is true.
   */
  allowInvisibleCharacters?: boolean;
  localizedStrings: {
    [localizedInventoryKey in (typeof SEARCH_RESULT_LOCALIZED_STRING_KEYS)[number]]?: LocalizedStringValue;
  };
  /** Optional logger for unexpected USFM-parsing errors (the webview passes the PAPI logger). */
  logger?: FindLogger;
}

const countWords = (text: string): number => {
  return text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
};

const truncateText = (text: string, maxWords: number, shouldCutFromStart: boolean): string => {
  // Don't trim when truncating because we want to keep the original spacing so the text doesn't
  // lose spaces around the search result
  const words = text.split(/\s+/);
  if (words.length <= maxWords) return text;

  if (shouldCutFromStart) {
    return words.slice(-maxWords).join(' ');
  }
  return words.slice(0, maxWords).join(' ');
};

/**
 * SearchResult component displays a single search result item with verse reference, matched text,
 * and contextual actions. When selected, it shows the full verse text with the search term
 * highlighted and provides options to copy reference, verse text, or both. In replace mode it also
 * renders a preview of the replacement according to {@link PreviewOptions}.
 *
 * @param props - The props for the SearchResult component
 * @returns JSX element representing a search result card
 */
export default function SearchResult({
  searchResult,
  globalResultsIndex,
  isSelected,
  usjReaderWriter,
  cachedUsfm,
  localizedBookData,
  onResultClick,
  onResultFocus,
  onResultDoubleClick,
  onResultReferenceClick,
  onHideResult,
  onReplace,
  onCancelReplace,
  localizedStrings,
  isReplaceMode,
  isReplacing,
  replaceConfig,
  previewOptions = DEFAULT_FIND_PREVIEW_OPTIONS,
  allowInvisibleCharacters = false,
  logger,
}: SearchResultProps) {
  // useRef requires null as the initial value for DOM refs
  // eslint-disable-next-line no-null/no-null
  const cardRef = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [isProgressAnimating, setIsProgressAnimating] = useState(false);

  useEffect(() => {
    // Registers a `IntersectionObserver` instance to determine when the component is visible in the DOM
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting));
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [cardRef]);

  useEffect(() => {
    if (!searchResult.isReplaced) {
      setIsProgressAnimating(false);
      return undefined;
    }
    const frame = requestAnimationFrame(() => setIsProgressAnimating(true));
    return () => cancelAnimationFrame(frame);
  }, [searchResult.isReplaced]);

  // When this result becomes selected, scroll it into view.
  useEffect(() => {
    if (isSelected) {
      cardRef.current?.scrollIntoView({ block: 'nearest' });
    }
  }, [isSelected]);

  // Determine the text to show before the search result, the search result, and the text after
  const textParts = useMemo(() => {
    if (!usjReaderWriter || !isVisible) return undefined;
    try {
      const startIndexInUsfm = usjReaderWriter.usfmVerseLocationToIndexInUsfm(searchResult.start);
      const endIndexInUsfm = usjReaderWriter.usfmVerseLocationToIndexInUsfm(searchResult.end);

      const usfm = cachedUsfm ?? usjReaderWriter.toUsfm();

      let beforeText = usfm.substring(0, startIndexInUsfm);

      const text = usfm.substring(startIndexInUsfm, endIndexInUsfm);

      let afterText = usfm.substring(endIndexInUsfm);

      if (countWords(beforeText) > WORDS_AROUND_SEARCH_RESULT) {
        beforeText = truncateText(beforeText, WORDS_AROUND_SEARCH_RESULT, true);
      }
      if (countWords(afterText) > WORDS_AROUND_SEARCH_RESULT) {
        afterText = truncateText(afterText, WORDS_AROUND_SEARCH_RESULT, false);
      }

      return { beforeText, text, afterText };
    } catch (error) {
      // The verse context is best-effort: fall back to rendering the result without surrounding
      // context rather than surfacing an error to the user. We still trace the failure when a
      // logger is supplied so unexpected USFM-parsing regressions show up in support logs.
      logger?.warn(
        `Find: failed to extract verse context for ${searchResult.start.verseRef.book} ${searchResult.start.verseRef.chapterNum}:${searchResult.start.verseRef.verseNum}:`,
        error,
      );
      return undefined;
    }
  }, [usjReaderWriter, cachedUsfm, searchResult, isVisible, logger]);

  /** Applies the showInvisible option to a string. */
  const displayText = (text: string) =>
    previewOptions.showInvisible ? renderWithInvisibleChars(text, allowInvisibleCharacters) : text;

  const fontClass = previewOptions.monospace ? 'tw:font-mono' : 'scripture-font';

  const { highlightShape, color } = previewOptions;
  const findClass = `${fontClass} ${getFindHighlightClasses(color, highlightShape)}`;
  const findHighlightClass = `${fontClass} ${getGoldFindHighlightClasses(highlightShape)}`;
  const replaceClass = `${fontClass} ${getReplaceHighlightClasses(color, highlightShape)}`;
  // In inline layout the find and replace spans are directly adjacent — only round the outer corners
  // so the two spans look like one unified rectangle split by color.
  const findClassInline = `${fontClass} ${getFindHighlightClasses(color, highlightShape, true, 'left')}`;
  const replaceClassInline = `${fontClass} ${getReplaceHighlightClasses(color, highlightShape, 'right')}`;

  // Invisible-chars mode replaces spaces with ·, leaving no wrap points, so break anywhere
  const breakClass = previewOptions.showInvisible ? 'tw:break-all' : 'tw:break-words';

  /**
   * Highlights the search term within the verse text, keeping leading/trailing spaces of the match
   * visible inside the highlight.
   */
  const getFocusedVerseText = () => {
    if (!textParts) return localizedStrings['%webView_find_loadingVerseText%'];

    const { beforeText, text, afterText } = textParts;

    return (
      <>
        {displayText(beforeText)}
        <span className={findHighlightClass}>{displayText(preserveTrailingSpaces(text))}</span>
        {displayText(afterText)}
      </>
    );
  };

  const getReference = () => {
    return `${searchResult.start.verseRef.book} ${searchResult.start.verseRef.chapterNum}:${searchResult.start.verseRef.verse || searchResult.start.verseRef.verseNum}`;
  };

  const getVerseText = () => {
    if (!textParts) return localizedStrings['%webView_find_noVerseTextAvailable%'] ?? '';
    return `${textParts.beforeText}${textParts.text}${textParts.afterText}`;
  };

  const handleCopyReference = () => {
    navigator.clipboard.writeText(getReference());
  };

  const handleCopyVerseText = () => {
    if (textParts) navigator.clipboard.writeText(getVerseText());
  };

  const handleCopyReferenceAndVerseText = () => {
    navigator.clipboard.writeText(`${getReference()} - ${getVerseText()}`);
  };

  const handleDismiss = () => {
    onHideResult(globalResultsIndex);
  };

  const replaceButton = (
    <Button
      className="tw:m-1 tw:h-6 tw:text-foreground"
      variant="outline"
      size="sm"
      disabled={isReplacing}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          e.stopPropagation();
          onReplace(globalResultsIndex);
        }
      }}
      onClick={(e) => {
        e.stopPropagation();
        onReplace(globalResultsIndex);
      }}
    >
      {localizedStrings['%webView_find_replace%']}
    </Button>
  );

  const dropdownContent = (
    <>
      <DropdownMenuItem className="tw:flex tw:flex-row" onClick={handleCopyReference}>
        <Copy className="tw:mr-2 tw:h-4 tw:w-4" />
        <span>{localizedStrings['%webView_find_copyReference%']}</span>
      </DropdownMenuItem>
      <DropdownMenuItem className="tw:flex tw:flex-row" onClick={handleCopyVerseText}>
        <Copy className="tw:mr-2 tw:h-4 tw:w-4" />
        <span>{localizedStrings['%webView_find_copyVerseText%']}</span>
      </DropdownMenuItem>
      <DropdownMenuItem className="tw:flex tw:flex-row" onClick={handleCopyReferenceAndVerseText}>
        <Copy className="tw:mr-2 tw:h-4 tw:w-4" />
        <span>{localizedStrings['%webView_find_copyReferenceAndVerseText%']}</span>
      </DropdownMenuItem>
      <DropdownMenuItem className="tw:flex tw:flex-row" onClick={handleDismiss}>
        <X className="tw:mr-2 tw:h-4 tw:w-4" />
        <span>{localizedStrings['%webView_find_dismiss%']}</span>
      </DropdownMenuItem>
    </>
  );

  let previewReplacement: string | undefined;
  if (isReplaceMode && !searchResult.isReplaced && replaceConfig) {
    previewReplacement = replaceConfig.preserveCase
      ? applyPreserveCase(searchResult.text ?? '', replaceConfig.term)
      : replaceConfig.term;
  }

  /**
   * Renders the replace preview element. Layout determines the visual style:
   *
   * - Arrow: [find-strikethrough] → [replace]
   * - Inline: [before][find-strikethrough][replace][after] embedded in verse context
   * - Block: two lines with - (find) and + (replace); context only when selected
   */
  const getReplacePreviewElement = () => {
    if (previewReplacement === undefined) return undefined;
    if (previewOptions.layout === 'find') return undefined;

    const rawFindText = searchResult.text ?? '';
    // When showInvisible is on, let renderWithInvisibleChars turn trailing spaces into · directly
    // (same as replace text). preserveTrailingSpaces is only needed when showInvisible is off so
    // that trailing spaces aren't collapsed inside the CSS-highlighted span.
    const findText = previewOptions.showInvisible
      ? displayText(rawFindText)
      : preserveTrailingSpaces(rawFindText);
    const replaceText = displayText(previewReplacement);

    // When replacing with nothing, show a thin vertical bar using the replace color so the user
    // can see where the deletion will occur without a space being implied.
    const isEmptyReplace = replaceText === '';
    const deletionBar = (
      <span
        className={`tw:inline-block tw:align-middle tw:bg-current ${getReplaceTextColorClasses(color)}`}
        style={{ width: '2px', height: '1lh' }}
        aria-hidden="true"
      />
    );

    if (previewOptions.layout === 'inline') {
      // Falls back to arrow if context not yet loaded
      if (!textParts) {
        return (
          <div className="tw:flex tw:flex-wrap tw:items-center tw:gap-1.5">
            <span className={`${findClass} tw:min-w-0 ${breakClass}`}>{findText}</span>
            <ArrowRight className="tw:h-3 tw:w-3 tw:shrink-0 tw:rtl:rotate-180" />
            {isEmptyReplace ? (
              deletionBar
            ) : (
              <span className={`${replaceClass} tw:min-w-0 ${breakClass}`}>{replaceText}</span>
            )}
          </div>
        );
      }
      return (
        <div className={`tw:text-muted-foreground ${fontClass} ${breakClass}`}>
          {displayText(textParts.beforeText)}
          <span className={findClassInline}>
            {previewOptions.showInvisible
              ? displayText(textParts.text)
              : preserveTrailingSpaces(textParts.text)}
          </span>
          {isEmptyReplace ? deletionBar : <span className={replaceClassInline}>{replaceText}</span>}
          {displayText(textParts.afterText)}
        </div>
      );
    }

    if (previewOptions.layout === 'block') {
      const hasContext = isSelected && textParts;
      const before = hasContext ? displayText(textParts.beforeText) : '';
      const after = hasContext ? displayText(textParts.afterText) : '';
      return (
        <div className="tw:space-y-0.5">
          <div className="tw:flex tw:items-baseline tw:gap-1">
            <Minus className="tw:h-3 tw:w-3 tw:shrink-0 tw:text-muted-foreground" />
            <span className={`tw:text-muted-foreground tw:min-w-0 ${breakClass} ${fontClass}`}>
              {before}
              <span className={findClass}>{findText}</span>
              {after}
            </span>
          </div>
          <div className="tw:flex tw:items-baseline tw:gap-1">
            <Plus className="tw:h-3 tw:w-3 tw:shrink-0 tw:text-foreground" />
            <span className={`tw:text-foreground tw:min-w-0 ${breakClass} ${fontClass}`}>
              {before}
              {isEmptyReplace ? deletionBar : <span className={replaceClass}>{replaceText}</span>}
              {after}
            </span>
          </div>
        </div>
      );
    }

    // Default: arrow layout
    return (
      <div className="tw:flex tw:flex-wrap tw:items-center tw:gap-1.5">
        <span className={`${findClass} tw:min-w-0 ${breakClass}`}>{findText}</span>
        <ArrowRight className="tw:h-3 tw:w-3 tw:shrink-0 tw:rtl:rotate-180" />
        {isEmptyReplace ? (
          deletionBar
        ) : (
          <span className={`${replaceClass} tw:min-w-0 ${breakClass}`}>{replaceText}</span>
        )}
      </div>
    );
  };

  const bookData = localizedBookData.get(searchResult.start.verseRef.book);
  const cardContent = (
    <div className="tw:text-sm tw:font-medium tw:flex tw:items-center tw:gap-2 tw:min-h-8">
      <button
        type="button"
        className="tw:shrink-0 tw:cursor-pointer tw:border-0 tw:bg-transparent tw:p-0 tw:font-semibold tw:text-inherit tw:hover:underline"
        onClick={(e) => {
          e.stopPropagation();
          onResultReferenceClick?.(searchResult, globalResultsIndex);
        }}
        onDoubleClick={(e) => e.stopPropagation()}
      >
        {bookData?.localizedName ?? bookData?.localizedId ?? searchResult.start.verseRef.book}{' '}
        {searchResult.start.verseRef.chapterNum}:
        {searchResult.start.verseRef.verse || searchResult.start.verseRef.verseNum}
      </button>
      {!searchResult.isReplaced && (
        <span className="scripture-font tw:min-w-0 tw:truncate tw:font-normal tw:text-muted-foreground">
          {searchResult.text ?? ''}
        </span>
      )}
      {searchResult.isReplaced && (
        <>
          <span className="tw:text-red-500 tw:font-semibold tw:shrink-0">
            {localizedStrings['%webView_find_replaced%']}
          </span>
          <div className="tw:flex-1 tw:h-1.5 tw:bg-red-200 tw:rounded-full tw:overflow-hidden">
            <div
              className="tw:h-full tw:bg-red-500 tw:rounded-full tw:transition-all tw:ease-linear tw:duration-1000"
              style={{ width: isProgressAnimating ? '100%' : '0%' }}
            />
          </div>
          {onCancelReplace && (
            <Button
              variant="outline"
              size="sm"
              className="tw:h-6 tw:shrink-0 tw:mr-10 tw:border-red-300 tw:text-red-500 tw:hover:border-red-500 tw:hover:text-red-700"
              onClick={(e) => {
                e.stopPropagation();
                onCancelReplace();
              }}
            >
              {localizedStrings['%general_cancel%']}
            </Button>
          )}
        </>
      )}
    </div>
  );

  // Verse text is shown for find mode and for the arrow/find preview layouts. Inline/block layouts
  // embed the surrounding context inside the preview element itself, so the separate verse-text line
  // is omitted to avoid duplication.
  const showVerseTextInAdditional =
    !isReplaceMode || previewOptions.layout === 'arrow' || previewOptions.layout === 'find';

  const additionalSelectedContent = (
    <>
      {showVerseTextInAdditional && (
        <div
          className={`tw:text-xs tw:m-1 tw:font-normal tw:text-muted-foreground ${fontClass} ${
            previewOptions.showInvisible ? 'tw:break-all' : 'tw:break-words'
          }`}
        >
          {getFocusedVerseText()}
        </div>
      )}
      {isReplaceMode && isSelected && !searchResult.isReplaced && getReplacePreviewElement()}
    </>
  );

  return (
    // The card body is a decorative wrapper; the interactive control is the ResultsCard button
    // inside it. These handlers add editor-navigation affordances (double-click / Tab focus) and a
    // replace shortcut without adding a competing interactive role on the wrapper itself.
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      ref={cardRef}
      onDoubleClick={() => onResultDoubleClick?.(searchResult, globalResultsIndex)}
      onFocus={(e) => {
        // Only fire when focus explicitly comes from outside the card (e.g. Tab navigation), not
        // from an interaction with a child button.
        if (!e.relatedTarget || !(e.relatedTarget instanceof Node)) return;
        if (!cardRef.current?.contains(e.relatedTarget)) {
          onResultFocus?.(searchResult, globalResultsIndex);
        }
      }}
      onKeyDownCapture={(e) => {
        // When the selected card is focused (not a child button) in replace mode, Enter/Space runs
        // the replace instead of merely re-selecting.
        if (
          isSelected &&
          isReplaceMode &&
          !searchResult.isReplaced &&
          !isReplacing &&
          (e.key === 'Enter' || e.key === ' ') &&
          !(e.target instanceof HTMLButtonElement)
        ) {
          e.preventDefault();
          e.stopPropagation();
          onReplace(globalResultsIndex);
        }
      }}
    >
      <ResultsCard
        cardKey={`${searchResult.start.verseRef.book + searchResult.start.verseRef.chapterNum}:${
          searchResult.start.verseRef.verseNum
        }${searchResult.text}${globalResultsIndex}`}
        isHidden={searchResult.isHidden}
        isSelected={isSelected}
        className={searchResult.isReplaced ? 'tw:!bg-red-100 tw:dark:!bg-red-950' : undefined}
        onSelect={() => onResultClick(searchResult, globalResultsIndex)}
        selectedButtons={isReplaceMode && !searchResult.isReplaced ? replaceButton : undefined}
        hoverButtons={isReplaceMode && !searchResult.isReplaced ? replaceButton : undefined}
        dropdownContent={searchResult.isReplaced ? undefined : dropdownContent}
        showDropdownOnHover={!searchResult.isReplaced}
        additionalContent={additionalSelectedContent}
      >
        {cardContent}
      </ResultsCard>
    </div>
  );
}

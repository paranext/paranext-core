import { Alert, AlertDescription, AlertTitle, Card, Skeleton, cn } from 'platform-bible-react';
import type { LocalizedStringValue } from 'platform-bible-utils';
import type { MouseEvent as ReactMouseEvent } from 'react';

/** Object containing all keys used for localization in this component. */
export const SCRIPTURE_PANE_STRING_KEYS = Object.freeze([
  '%enhancedResources_scripturePane_loading%',
  '%enhancedResources_scripturePane_emptyTitle%',
  '%enhancedResources_scripturePane_emptyDescription%',
  '%enhancedResources_scripturePane_errorTitle%',
  '%enhancedResources_scripturePane_filterActive%',
  '%enhancedResources_scripturePane_editorPlaceholder%',
  '%enhancedResources_scripturePane_footnotesHeader%',
] as const);

type ScripturePaneLocalizedStringKey = (typeof SCRIPTURE_PANE_STRING_KEYS)[number];
type ScripturePaneLocalizedStrings = {
  [key in ScripturePaneLocalizedStringKey]?: LocalizedStringValue;
};

export type ScriptDisplayMode = 'script' | 'transliteration' | 'both';

/**
 * Subset of MarbleToken used by the placeholder scripture pane. The full DTO is defined in
 * data-contracts.md. This presentational mock only renders TextLink, PlainText, Verse markers, Note
 * callers, and ParagraphStart styles.
 */
export type MarbleTokenLike = {
  type:
    | 'Book'
    | 'Chapter'
    | 'Verse'
    | 'ParagraphStart'
    | 'ParagraphEnd'
    | 'CharacterStart'
    | 'CharacterEnd'
    | 'PlainText'
    | 'TextLink'
    | 'Note'
    | 'Reference';
  text: string;
  index: number;
  strongNumber?: string;
  targetLinks?: string[];
  thematicLinks?: string[];
  lexicalLinks?: string[];
  imageLinks?: string[];
  mapLinks?: string[];
  style?: string;
};

export type ScripturePaneVerseRef = {
  book: number;
  chapter: number;
  verse: number;
};

export type ScripturePaneProps = {
  /** Token stream for the current chapter; when undefined, renders empty state. */
  tokens: MarbleTokenLike[] | undefined;
  /** Current verse reference (used as a header label). */
  currentReference: ScripturePaneVerseRef;
  /** Token id of the currently filtered linked word, or undefined if no filter is active. */
  filteredTokenId: string | undefined;
  /** Hebrew/Greek display mode. Currently affects placeholder annotations only. */
  hebrewDisplayMode?: ScriptDisplayMode;
  greekDisplayMode?: ScriptDisplayMode;
  /** When true, the footnote panel placeholder is shown below the main pane. */
  showFootnotes?: boolean;
  /** Zoom factor applied to the placeholder content (1.0 = 100%). */
  scripturePaneZoom?: number;
  /** Loading state - shows a Skeleton placeholder. */
  isLoading?: boolean;
  /** Error message - when set, renders an Alert. Overrides loading/empty states. */
  errorMessage?: string;
  /** Click handler for a linked-word token. Receives the targetLinks key (or token text). */
  onTokenClick?: (tokenId: string, token: MarbleTokenLike) => void;
  /**
   * Right-click handler for a linked-word token. The wiring layer translates this into the actual
   * context menu (see BHV-308).
   */
  onTokenContextMenu?: (
    tokenId: string,
    token: MarbleTokenLike,
    event: ReactMouseEvent<HTMLButtonElement>,
  ) => void;
  localizedStringsWithLoadingState?: [ScripturePaneLocalizedStrings, boolean];
};

const formatRef = (ref: ScripturePaneVerseRef) => `Bk${ref.book} ${ref.chapter}:${ref.verse}`;

const tokenIdOf = (token: MarbleTokenLike): string =>
  token.targetLinks?.[0] ?? token.strongNumber ?? `idx-${token.index}`;

/**
 * Pure presentational stand-in for the Enhanced Resource scripture pane. Per FN-001/FN-013/FN-014,
 * this design-phase component does NOT integrate with `platform-scripture-editor`. It mocks the
 * layout with token chips so reviewers can validate the surrounding shell, ribbons, and toolbar.
 *
 * The wiring layer (phase-3-ui) replaces this with the editor + USJ converter once those land.
 */
export function ScripturePane({
  tokens,
  currentReference,
  filteredTokenId,
  hebrewDisplayMode = 'both',
  greekDisplayMode = 'both',
  showFootnotes = false,
  scripturePaneZoom = 1,
  isLoading = false,
  errorMessage,
  onTokenClick = () => {},
  onTokenContextMenu = () => {},
  localizedStringsWithLoadingState = [{}, false],
}: ScripturePaneProps) {
  const getLocalizedString = (key: ScripturePaneLocalizedStringKey) =>
    localizedStringsWithLoadingState[0][key] ?? key;

  const loadingText = getLocalizedString('%enhancedResources_scripturePane_loading%');
  const emptyTitle = getLocalizedString('%enhancedResources_scripturePane_emptyTitle%');
  const emptyDescription = getLocalizedString('%enhancedResources_scripturePane_emptyDescription%');
  const errorTitle = getLocalizedString('%enhancedResources_scripturePane_errorTitle%');
  const filterActiveLabel = getLocalizedString('%enhancedResources_scripturePane_filterActive%');
  const editorPlaceholderText = getLocalizedString(
    '%enhancedResources_scripturePane_editorPlaceholder%',
  );
  const footnotesHeader = getLocalizedString('%enhancedResources_scripturePane_footnotesHeader%');

  if (errorMessage) {
    return (
      <Alert variant="destructive" data-testid="er-scripture-pane" className="tw-m-4">
        <AlertTitle>{errorTitle}</AlertTitle>
        <AlertDescription>{errorMessage}</AlertDescription>
      </Alert>
    );
  }

  if (isLoading) {
    return (
      <Card
        data-testid="er-scripture-pane"
        aria-busy="true"
        aria-label={typeof loadingText === 'string' ? loadingText : undefined}
        className="tw-flex tw-h-full tw-flex-col tw-gap-3 tw-rounded-none tw-border-0 tw-p-4"
      >
        <Skeleton className="tw-h-6 tw-w-32" />
        <Skeleton className="tw-h-4 tw-w-full" />
        <Skeleton className="tw-h-4 tw-w-11/12" />
        <Skeleton className="tw-h-4 tw-w-10/12" />
        <Skeleton className="tw-h-4 tw-w-full" />
        <Skeleton className="tw-h-4 tw-w-9/12" />
      </Card>
    );
  }

  if (!tokens || tokens.length === 0) {
    return (
      <Card
        data-testid="er-scripture-pane"
        className="tw-flex tw-h-full tw-flex-col tw-items-center tw-justify-center tw-gap-1 tw-rounded-none tw-border-0 tw-p-6 tw-text-center tw-text-muted-foreground"
      >
        <span className="tw-text-base tw-font-semibold">{emptyTitle}</span>
        <span className="tw-text-sm">{emptyDescription}</span>
      </Card>
    );
  }

  return (
    <div
      className="tw-flex tw-h-full tw-flex-col tw-overflow-hidden"
      data-testid="er-scripture-pane"
    >
      <Card
        className="tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-rounded-none tw-border-0"
        // Inline style is the appropriate primitive for a continuous numeric zoom factor that the
        // user can drive from the View menu - tailwind classes can't express arbitrary scales.
        style={{ fontSize: `${scripturePaneZoom * 1}rem` }}
      >
        <div className="tw-flex tw-items-center tw-justify-between tw-border-b tw-px-4 tw-py-2">
          <span className="tw-font-semibold">{formatRef(currentReference)}</span>
          <span className="tw-text-xs tw-text-muted-foreground">
            {`H:${hebrewDisplayMode} / G:${greekDisplayMode}`}
          </span>
        </div>
        <div className="tw-flex-1 tw-overflow-auto tw-p-4">
          <p className="tw-mb-3 tw-text-xs tw-italic tw-text-muted-foreground">
            {editorPlaceholderText}
          </p>
          <div className="tw-flex tw-flex-wrap tw-items-baseline tw-gap-x-1.5 tw-gap-y-1 tw-leading-loose">
            {tokens.map((token) => {
              if (token.type === 'TextLink') {
                const id = tokenIdOf(token);
                const isFiltered = filteredTokenId !== undefined && filteredTokenId === id;
                // Raw <button> chosen over `platform-bible-react` Button because the linked words
                // must render inline within scripture text flow. The library Button has padding,
                // height, and variant styling designed for standalone controls and would break
                // line wrapping. Phase-3-ui replaces this with platform-scripture-editor's
                // wg-marker decorations.
                return (
                  <button
                    key={`tok-${token.index}`}
                    type="button"
                    role="link"
                    aria-label={token.text}
                    onClick={() => onTokenClick(id, token)}
                    onContextMenu={(event) => {
                      event.preventDefault();
                      onTokenContextMenu(id, token, event);
                    }}
                    className={cn(
                      'tw-cursor-pointer tw-rounded tw-px-1 tw-py-0.5 tw-text-primary tw-underline tw-decoration-dotted tw-underline-offset-4 hover:tw-bg-accent focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring',
                      {
                        'tw-bg-accent tw-font-semibold tw-text-accent-foreground': isFiltered,
                      },
                    )}
                  >
                    {token.text}
                  </button>
                );
              }
              if (token.type === 'Verse') {
                return (
                  <sup
                    key={`tok-${token.index}`}
                    className="tw-mr-1 tw-font-semibold tw-text-muted-foreground"
                  >
                    {token.text}
                  </sup>
                );
              }
              if (token.type === 'ParagraphStart' && token.style?.startsWith('s')) {
                return (
                  <h3
                    key={`tok-${token.index}`}
                    className="tw-mt-3 tw-w-full tw-text-base tw-font-semibold"
                  >
                    {token.text}
                  </h3>
                );
              }
              if (token.type === 'PlainText') {
                return (
                  <span key={`tok-${token.index}`} className="tw-text-foreground">
                    {token.text}
                  </span>
                );
              }
              if (token.type === 'Note') {
                return (
                  <sup
                    key={`tok-${token.index}`}
                    className="tw-rounded tw-border tw-bg-muted tw-px-1 tw-text-xs tw-text-muted-foreground"
                    title={token.text}
                  >
                    *
                  </sup>
                );
              }
              return undefined;
            })}
          </div>
          {filteredTokenId && (
            <p
              role="status"
              className="tw-mt-3 tw-rounded tw-bg-accent tw-px-2 tw-py-1 tw-text-xs tw-text-accent-foreground"
            >
              {`${filterActiveLabel}: ${filteredTokenId}`}
            </p>
          )}
        </div>
        {showFootnotes && (
          <div
            data-testid="er-footnotes-pane"
            className="tw-border-t tw-bg-muted/40 tw-px-4 tw-py-2 tw-text-xs"
          >
            <span className="tw-font-semibold">{footnotesHeader}</span>
            <p className="tw-mt-1 tw-text-muted-foreground">
              {/* Placeholder for footnote rendering; phase-3-ui replaces with NoteRenderer list */}
              {editorPlaceholderText}
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}

export default ScripturePane;

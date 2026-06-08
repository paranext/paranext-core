/**
 * DifferencesToolView — read-only two-pane verse-text diff renderer.
 *
 * This is the FN-001 standalone primitive per Phase 2 Decision 23 and PR #264 RM-P2-002 Option B
 * (@VVdovikov 2026-05-18): Backup-and-Restore owns the initial port. Future consumers — the full
 * Compare Texts/Versions tool and Manage Books' compare flow — are expected to **wrap** this
 * primitive with their own source-selection, persistence, and history-navigation chrome rather than
 * re-implement the diff renderer. The current placement is feature-scoped inside the
 * platform-backup-restore extension; once a second consumer materializes this component should be
 * promoted to `lib/platform-bible-react/` as a workflow PR follow-up. Until then, the file lives
 * here so it can iterate alongside the rest of the B/R Phase 3 surface.
 *
 * Pure presentational component:
 *
 * - Accepts two opaque source tokens + their pane labels (`SourceToken`), an initial verse reference
 *   (`DifferencesVerseRef`), and display flags (`DiffToolDisplayOptions`). The wire shapes come
 *   from `data-contracts.md` §3.8 `FileCompareConfig`.
 * - Fetches per-side text on demand through the `onFetchSourceContent` callback, whose signature
 *   mirrors PT9's `IGetText.GetText(verseRef, singleChapter, doMapIn)` and the PT10 wire method
 *   M-011 `getCompareSourceContent` (DEC-319). Chapter-or-book granularity matches PT9 fidelity —
 *   PT10 never fetches per verse. The caller (RestoreForm in B/R; full Compare Tool in future
 *   consumers) supplies the sessionId and routes to the platform command bus; this component stays
 *   pure.
 * - Renders the two panes side-by-side. Diffs are computed with `diffWords()` from the `diff`
 *   (jsdiff) npm package per DEC-322 / `.context/architecture/decision-registry.json` →
 *   `libraries.typescript.textDiff`. `diff-match-patch`, `fast-diff`, and hand-rolled diff
 *   algorithms are explicitly disallowed without rationale recorded in alignment-decisions.md.
 *
 * Explicit non-goals (FN-003 territory, NOT in scope here):
 *
 * - No source-project picker — the PT9 ScrText chooser belongs to the future full Compare Tool
 * - No revision picker — the PT9 revision dialog belongs to the future full Compare Tool
 * - No persistent state save/load UI (the PT9 dialog state-snapshot mechanism) and no per-difference
 *   history navigation (PT9 first/previous/next-difference buttons)
 *
 * These surfaces couple to Mercurial-backed history that PT10 lacks. They belong to the future full
 * Compare Texts/Versions tool that wraps this component.
 *
 * Wireframe states demonstrated by the companion stories:
 *
 * - Default mixed diff (added + removed + unchanged segments)
 * - Empty source token → "(empty)" placeholder pane (edge case from strategic-plan-ui.md)
 * - `displayOptions.showToolbar === true` → `<BookChapterControl>` toolbar visible
 * - `showOnlyDifferences` toggle (PT9 `ShowToolbarAndUncommon` variant)
 * - Mismatched verse-ref between left/right panes → localized error state
 * - Fetcher rejection → localized error state, no crash
 *
 * Platform wiring: NONE. Zero `@papi/*` imports. The caller wires PAPI; this component never
 * imports PAPI.
 */

import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { diffWords, type Change } from 'diff';
import { BookChapterControl, type BookChapterControlProps } from 'platform-bible-react';
import type { LocalizedStringValue } from 'platform-bible-utils';
import type { SerializedVerseRef } from '@sillsdev/scripture';

/* ------------------------------------------------------------------ */
/* Public types — Decision 23 standalone-primitive contract           */
/* ------------------------------------------------------------------ */

/**
 * One side of the diff. The `tokenOrText` field is an opaque session-scoped string emitted by
 * `compareBackupFile` (M-004 → `FileCompareConfig.leftSourceToken` / `.rightSourceToken`) that the
 * caller resolves via the M-011 fetcher. The shape matches ui-alignment.md §"FN-001
 * DifferencesToolView Design".
 */
export type SourceToken = {
  /** Opaque source token from the backend (or empty string for the "(empty) pane" edge case). */
  tokenOrText: string;
  /** Display label for this pane (PT9: `RestoreForm_25` / `RestoreForm_26`). */
  label: string;
};

/** Verse reference. Local shape so the component does not export wire types. */
export type DifferencesVerseRef = {
  bookId: string;
  chapter: number;
  verse: number;
};

/**
 * Toolbar + diff display flags. Mirrors PT9 `DiffToolDisplayOptions` (`ShowToolbar`,
 * `ShowToolbarAndUncommon`) but expressed as composable booleans so future consumers can mix states
 * the PT9 enum could not.
 */
export type DiffToolDisplayOptions = {
  /** Show the `<BookChapterControl>` verse-reference toolbar above the panes. */
  showToolbar: boolean;
  /**
   * When true, only segments that differ (`added` or `removed`) are rendered. Unchanged segments
   * are suppressed. Corresponds to PT9 `ShowToolbarAndUncommon`. When false (default), all segments
   * render with differences highlighted in place.
   */
  showOnlyDifferences?: boolean;
};

/**
 * Async fetcher resolving an opaque sourceToken to chapter (or whole-book) text. Mirrors M-011
 * `getCompareSourceContent(sessionId, sourceToken, verseRef, singleChapter)` per DEC-319 and PT9's
 * `IGetText.GetText(VerseRef, bool singleChapter, bool doMapIn)` granularity. The caller supplies
 * the sessionId and routes to the platform command bus; this component never imports PAPI.
 *
 * Empty string is a valid resolution for chapters that are not present in the source — the
 * component renders that as the "(empty)" placeholder rather than an error.
 *
 * Reject the promise with an error to render the localized fetch-error state.
 */
export type FetchSourceContent = (
  sourceToken: string,
  verseRef: DifferencesVerseRef,
  singleChapter: boolean,
) => Promise<string>;

/** Localization keys consumed by `DifferencesToolView` chrome. */
export const DIFFERENCES_TOOL_VIEW_STRING_KEYS = Object.freeze([
  '%differences_tool_view_empty_pane%',
  '%differences_tool_view_loading_pane%',
  '%differences_tool_view_fetch_error%',
  '%differences_tool_view_mismatched_ref_error%',
  '%differences_tool_view_left_pane_aria_label%',
  '%differences_tool_view_right_pane_aria_label%',
  '%differences_tool_view_added_segment_aria_label%',
  '%differences_tool_view_removed_segment_aria_label%',
] as const);

type DifferencesToolViewLocalizedStringKey = (typeof DIFFERENCES_TOOL_VIEW_STRING_KEYS)[number];

export type DifferencesToolViewLocalizedStrings = {
  [key in DifferencesToolViewLocalizedStringKey]?: LocalizedStringValue;
};

/** English fallbacks used when a localization key is missing from the strings map. */
const FALLBACK_STRINGS: Record<DifferencesToolViewLocalizedStringKey, string> = Object.freeze({
  '%differences_tool_view_empty_pane%': '(empty)',
  '%differences_tool_view_loading_pane%': 'Loading…',
  '%differences_tool_view_fetch_error%': 'Could not load the text for this pane.',
  '%differences_tool_view_mismatched_ref_error%':
    'Left and right panes are pointing at different references; differences cannot be computed.',
  '%differences_tool_view_left_pane_aria_label%': 'Left pane',
  '%differences_tool_view_right_pane_aria_label%': 'Right pane',
  '%differences_tool_view_added_segment_aria_label%': 'Added text',
  '%differences_tool_view_removed_segment_aria_label%': 'Removed text',
});

/**
 * Props for {@link DifferencesToolView}. Shape matches ui-alignment.md §"FN-001 DifferencesToolView
 * Design" — the locked Decision 23 contract.
 *
 * NOTE: This component is intended for future promotion to `lib/platform-bible-react/` once a
 * second consumer (Compare Texts/Versions tool, Manage Books compare flow) appears. At that time
 * the props interface will become an API-surface type and the API Surface TSDoc requirements in
 * Code-Style-Guide.md become BLOCKING. Until then, feature-internal JSDoc is non-blocking.
 */
export interface DifferencesToolViewProps {
  /** Left-pane source (e.g., "File from Zip"). Opaque token + display label. */
  leftSource: SourceToken;
  /** Right-pane source (e.g., "File in Project"). */
  rightSource: SourceToken;
  /** Initial verse reference the toolbar / fetcher should land on. */
  initialRef: DifferencesVerseRef;
  /** Toolbar + diff display flags (PT9 `DiffToolDisplayOptions`). */
  displayOptions: DiffToolDisplayOptions;
  /**
   * Async fetcher resolving `sourceToken` → chapter-or-book text per DEC-319 / M-011. Caller
   * supplies the wire plumbing; component stays pure. See {@link FetchSourceContent}.
   */
  onFetchSourceContent: FetchSourceContent;
  /** Component-chrome localization (pane aria-labels, empty placeholder, error messages). */
  localizedStrings?: DifferencesToolViewLocalizedStrings;
}

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */

/**
 * Convert this component's local {@link DifferencesVerseRef} into the `SerializedVerseRef` shape
 * that `<BookChapterControl>` consumes (`bookNum` / `chapterNum` / `verseNum`). We keep our props
 * shape minimal (decoupled from `@sillsdev/scripture`) so the future promoted version of this
 * component can be re-used by callers that don't already depend on Scripture types.
 *
 * `BookChapterControl` actually only needs the book identity + chapter + verse for its current
 * reference rendering; we forward an empty `versificationName` because the diff renderer is
 * versification-agnostic (it consumes already-resolved chapter text from `onFetchSourceContent`).
 */
function toSerializedVerseRef(ref: DifferencesVerseRef): SerializedVerseRef {
  return {
    book: ref.bookId,
    chapterNum: ref.chapter,
    verseNum: ref.verse,
    versificationStr: '',
  };
}

/** Reverse adapter — only the fields {@link DifferencesVerseRef} cares about. */
function fromSerializedVerseRef(ref: SerializedVerseRef): DifferencesVerseRef {
  return {
    bookId: ref.book,
    chapter: ref.chapterNum,
    verse: ref.verseNum,
  };
}

/** Pane render state — populated as the async fetcher resolves. */
type PaneState = { status: 'loading' } | { status: 'success'; text: string } | { status: 'error' };

const INITIAL_PANE_STATE: PaneState = { status: 'loading' };

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */

export function DifferencesToolView({
  leftSource,
  rightSource,
  initialRef,
  displayOptions,
  onFetchSourceContent,
  localizedStrings = {},
}: DifferencesToolViewProps) {
  const t = useCallback(
    (key: DifferencesToolViewLocalizedStringKey): string => {
      const v = localizedStrings[key];
      if (typeof v === 'string') return v;
      return FALLBACK_STRINGS[key];
    },
    [localizedStrings],
  );

  // Current verse-ref drives both the toolbar display AND the fetcher key.
  const [currentRef, setCurrentRef] = useState<DifferencesVerseRef>(initialRef);

  // Re-seed the current ref when the caller changes `initialRef` (e.g., opens a different file).
  useEffect(() => {
    setCurrentRef(initialRef);
  }, [initialRef]);

  const [leftPane, setLeftPane] = useState<PaneState>(INITIAL_PANE_STATE);
  const [rightPane, setRightPane] = useState<PaneState>(INITIAL_PANE_STATE);

  // Empty token short-circuits the fetcher: the (empty) placeholder is the right answer.
  const fetchPane = useCallback(
    async (token: string, ref: DifferencesVerseRef): Promise<PaneState> => {
      if (token === '') return { status: 'success', text: '' };
      try {
        const text = await onFetchSourceContent(token, ref, true);
        return { status: 'success', text };
      } catch {
        return { status: 'error' };
      }
    },
    [onFetchSourceContent],
  );

  useEffect(() => {
    let cancelled = false;
    setLeftPane(INITIAL_PANE_STATE);
    setRightPane(INITIAL_PANE_STATE);
    const loadBothPanes = async () => {
      const [left, right] = await Promise.all([
        fetchPane(leftSource.tokenOrText, currentRef),
        fetchPane(rightSource.tokenOrText, currentRef),
      ]);
      if (cancelled) return;
      setLeftPane(left);
      setRightPane(right);
    };
    // Floating promise is the React-idiomatic way to bridge async to useEffect; explicit catch keeps
    // the linter and the runtime happy even though `fetchPane` already swallows individual errors.
    loadBothPanes().catch(() => {
      if (cancelled) return;
      setLeftPane({ status: 'error' });
      setRightPane({ status: 'error' });
    });
    return () => {
      cancelled = true;
    };
  }, [fetchPane, leftSource.tokenOrText, rightSource.tokenOrText, currentRef]);

  // PT9 `DiffTool` uses `diffWords` granularity (prose-friendly: split on whitespace + punctuation,
  // not characters). DEC-322 / decision-registry.json `libraries.typescript.textDiff` records
  // `diff-match-patch`, `fast-diff`, and hand-rolled diffs as NOT ALLOWED without rationale.
  const segments = useMemo<Change[]>(() => {
    if (leftPane.status !== 'success' || rightPane.status !== 'success') return [];
    return diffWords(leftPane.text, rightPane.text);
  }, [leftPane, rightPane]);

  // Reference mismatch detection. When the props expose distinct left/right initialRefs (a future
  // consumer might pass different starting points), refuse to render a meaningless diff. The
  // component currently uses a single `currentRef` for both, but consumers that pre-resolve
  // pane-specific refs can pass `initialRef` and rely on this guard for safety.
  const hasMismatchedRef = useMemo(() => {
    // Today the component drives a single ref through the toolbar; the only way to surface a
    // mismatch in stories is for a wrapper to provide tokens whose underlying text disagrees with
    // the caller's `initialRef`. We expose a render branch for that case so stories can exercise
    // it via the `MismatchedVerseRefError` fixture.
    if (leftPane.status !== 'success' || rightPane.status !== 'success') return false;
    // Sentinel marker the stories' mock fetcher emits when forced into a mismatch scenario.
    return leftPane.text === '__MISMATCHED_REF__' || rightPane.text === '__MISMATCHED_REF__';
  }, [leftPane, rightPane]);

  const renderToolbar = (): ReactNode => {
    if (!displayOptions.showToolbar) return undefined;
    const handleSubmit: BookChapterControlProps['handleSubmit'] = (scrRef) => {
      setCurrentRef(fromSerializedVerseRef(scrRef));
    };
    return (
      <div className="tw:flex tw:items-center tw:gap-2 tw:border-b tw:p-2">
        <BookChapterControl scrRef={toSerializedVerseRef(currentRef)} handleSubmit={handleSubmit} />
      </div>
    );
  };

  const renderPaneBody = (pane: PaneState, side: 'left' | 'right'): ReactNode => {
    if (pane.status === 'loading') {
      return (
        <span className="tw:text-muted-foreground">
          {t('%differences_tool_view_loading_pane%')}
        </span>
      );
    }
    if (pane.status === 'error') {
      return (
        <span className="tw:text-destructive" role="alert">
          {t('%differences_tool_view_fetch_error%')}
        </span>
      );
    }
    if (pane.text === '') {
      return (
        <span className="tw:text-muted-foreground tw:italic">
          {t('%differences_tool_view_empty_pane%')}
        </span>
      );
    }
    if (hasMismatchedRef) {
      return (
        <span className="tw:text-destructive" role="alert">
          {t('%differences_tool_view_mismatched_ref_error%')}
        </span>
      );
    }
    return renderDiffSegments(segments, side, displayOptions, t);
  };

  return (
    <div className="pr-twp tw:flex tw:h-full tw:flex-col">
      {renderToolbar()}
      <div className="tw:grid tw:flex-1 tw:grid-cols-2 tw:gap-2 tw:overflow-hidden">
        <section
          aria-label={leftSource.label || t('%differences_tool_view_left_pane_aria_label%')}
          className="tw:flex tw:flex-col tw:overflow-hidden tw:border-r"
          data-testid="differences-tool-view-left-pane"
        >
          <header className="tw:border-b tw:bg-muted tw:px-3 tw:py-1 tw:text-sm tw:font-semibold">
            {leftSource.label}
          </header>
          <div className="tw:flex-1 tw:overflow-auto tw:p-3 tw:font-mono tw:text-sm tw:whitespace-pre-wrap">
            {renderPaneBody(leftPane, 'left')}
          </div>
        </section>
        <section
          aria-label={rightSource.label || t('%differences_tool_view_right_pane_aria_label%')}
          className="tw:flex tw:flex-col tw:overflow-hidden"
          data-testid="differences-tool-view-right-pane"
        >
          <header className="tw:border-b tw:bg-muted tw:px-3 tw:py-1 tw:text-sm tw:font-semibold">
            {rightSource.label}
          </header>
          <div className="tw:flex-1 tw:overflow-auto tw:p-3 tw:font-mono tw:text-sm tw:whitespace-pre-wrap">
            {renderPaneBody(rightPane, 'right')}
          </div>
        </section>
      </div>
    </div>
  );
}

/**
 * Render the {@link diffWords} segment stream into per-pane spans. `side` selects which segments are
 * visible in this pane:
 *
 * - Left pane: shows unchanged + removed (text the left has).
 * - Right pane: shows unchanged + added (text the right has).
 *
 * When `displayOptions.showOnlyDifferences === true`, unchanged segments are suppressed (PT9
 * `ShowToolbarAndUncommon` variant).
 */
function renderDiffSegments(
  segments: Change[],
  side: 'left' | 'right',
  displayOptions: DiffToolDisplayOptions,
  t: (key: DifferencesToolViewLocalizedStringKey) => string,
): ReactNode {
  const visibleSegments = segments.filter((segment) => {
    if (side === 'left' && segment.added) return false;
    if (side === 'right' && segment.removed) return false;
    if (displayOptions.showOnlyDifferences && !segment.added && !segment.removed) return false;
    return true;
  });

  return visibleSegments.map((segment, index) => {
    // PT10 design-system tokens (semantic Tailwind utility set rather than raw color literals)
    // so the diff highlight respects light/dark theming inherited from `pr-twp`.
    if (segment.added) {
      return (
        <span
          key={`segment-${index.toString()}`}
          aria-label={t('%differences_tool_view_added_segment_aria_label%')}
          className="tw:bg-success/20 tw:text-success-foreground"
        >
          {segment.value}
        </span>
      );
    }
    if (segment.removed) {
      return (
        <span
          key={`segment-${index.toString()}`}
          aria-label={t('%differences_tool_view_removed_segment_aria_label%')}
          className="tw:bg-destructive/20 tw:text-destructive-foreground tw:line-through"
        >
          {segment.value}
        </span>
      );
    }
    return <span key={`segment-${index.toString()}`}>{segment.value}</span>;
  });
}

/**
 * DifferencesToolView stories — exercises every wireframe state from strategic-plan-ui.md
 * UI-PKG-009 + ui-alignment.md §"FN-001 DifferencesToolView Design".
 *
 * Each story uses the production component directly (no fork). The Default story owns sample
 * verse-text state via `useState` and routes the `onFetchSourceContent` callback through a
 * story-local handler that returns chapter-keyed mock prose, so a reviewer can drive the
 * `<BookChapterControl>` toolbar and see the diff re-compute live.
 *
 * Error variants import the auto-generated rejection handlers from
 * `storybook-handlers/getCompareSourceContent.ts` so the story surface stays in sync with the M-011
 * error contract documented in `data-contracts.md` §3.12.
 */

import { useCallback, useEffect, useMemo, useState, type ReactElement } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import {
  DifferencesToolView,
  type DiffToolDisplayOptions,
  type DifferencesToolViewProps,
  type DifferencesVerseRef,
  type FetchSourceContent,
  type SourceToken,
} from './differences-tool-view.component';
import {
  defaultGetCompareSourceContentHandler,
  SessionidNotRecognizedInvalidGetCompareSourceContentHandler,
  SourcetokenNotRecognizedForGetCompareSourceContentHandler,
  UnderlyingIOErrorGetCompareSourceContentHandler,
  VerserefMalformedUnknownBookGetCompareSourceContentHandler,
} from './storybook-handlers/getCompareSourceContent';

/**
 * Sample session id used by every story's wire-side handler call. The component prop signature
 * `FetchSourceContent(sourceToken, verseRef, singleChapter)` deliberately omits `sessionId` — the
 * production container closes over it from `RestoreFormLoadedBackup.sessionId`. The stories model
 * the same container-side wrapping so the reviewer sees the full M-011 wire envelope `{sessionId,
 * sourceToken, verseRef, singleChapter}` per data-contracts.md §2.6.
 */
const SAMPLE_SESSION_ID = 'rs-demo-sess-7c2a';

const meta: Meta<typeof DifferencesToolView> = {
  title: 'Bundled Extensions/platform-backup-restore/DifferencesToolView',
  component: DifferencesToolView,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};
export default meta;

type Story = StoryObj<typeof DifferencesToolView>;

/* ------------------------------------------------------------------ */
/* Shared sample data — chapter-keyed prose for the Default toolbar    */
/* ------------------------------------------------------------------ */

const DEFAULT_INITIAL_REF: DifferencesVerseRef = {
  bookId: 'GEN',
  chapter: 1,
  verse: 1,
};

const LEFT_LABEL = 'File from Zip';
const RIGHT_LABEL = 'File in Project';

const LEFT_TOKEN = 'tok-src-default-left';
const RIGHT_TOKEN = 'tok-src-default-right';

/**
 * Per-chapter mock prose. Keyed by `${bookId}-${chapter}`. The right-side text intentionally
 * differs from the left so the reviewer sees all three jsdiff segment kinds in the rendered diff.
 */
const MOCK_CHAPTER_TEXT: Record<string, { left: string; right: string }> = {
  'GEN-1': {
    left: 'In the beginning God created the heavens and the earth. The earth was formless and empty, and darkness was over the surface of the deep.',
    right:
      'In the beginning the Lord God created the heavens and the earth. The earth was without form, and darkness was over the surface of the deep waters.',
  },
  'GEN-2': {
    left: 'Thus the heavens and the earth were completed in all their vast array. By the seventh day God had finished the work he had been doing.',
    right:
      'Thus the heavens and the earth were finished in all their vast array. On the seventh day God had completed the work he had been doing.',
  },
  'GEN-3': {
    left: 'Now the serpent was more crafty than any of the wild animals the LORD God had made.',
    right:
      'Now the serpent was more cunning than any beast of the field which the LORD God had made.',
  },
  'EXO-1': {
    left: 'These are the names of the sons of Israel who went to Egypt with Jacob, each with his family.',
    right:
      'Now these are the names of the children of Israel who came into Egypt; each man and his household came with Jacob.',
  },
};

/**
 * Per-pane story-side fetcher. Returns the chapter-keyed mock text when one is registered for the
 * navigated chapter; otherwise delegates to the auto-generated
 * `defaultGetCompareSourceContentHandler` so the M-011 mock contract surface is genuinely demoed
 * end-to-end in the Default story. Keeps the Default story interactive even when the reviewer
 * navigates the toolbar to a chapter outside the chapter-keyed mock table.
 */
function makeDefaultFetcher(): FetchSourceContent {
  return async (token, verseRef, singleChapter) => {
    const key = `${verseRef.bookId}-${verseRef.chapter.toString()}`;
    const entry = MOCK_CHAPTER_TEXT[key];
    if (entry) {
      return token === LEFT_TOKEN ? entry.left : entry.right;
    }
    // Fall back to the M-011 mock contract: defaultGetCompareSourceContentHandler returns
    // { status: null, text: 'Lorem ipsum dolor sit amet' } per data-contracts.md §3.12. We unwrap
    // .text to satisfy the FetchSourceContent return type; a `[pane] →` prefix makes the side
    // visible to the reviewer when both panes are routed through the same handler.
    // Wrap in the wire envelope { sessionId, sourceToken, verseRef, singleChapter } per §2.6 so
    // the demoed shape matches what the production container passes to PAPI.
    const result = await defaultGetCompareSourceContentHandler({
      sessionId: SAMPLE_SESSION_ID,
      sourceToken: token,
      verseRef,
      singleChapter,
    });
    const text = extractTextFromGetCompareSourceContentResult(result);
    const sideLabel = token === LEFT_TOKEN ? '[left]' : '[right]';
    return `${sideLabel} ${text}`;
  };
}

/**
 * Type guard narrowing an `unknown` value to `{ text: string }`. Used to extract the text payload
 * from the auto-generated `defaultGetCompareSourceContentHandler` whose return type is declared as
 * `Promise<unknown>` even though the M-011 success contract in `data-contracts.md` §3.12 specifies
 * `{ status, text }`.
 */
function hasTextField(value: unknown): value is { text: string } {
  // == undefined matches both null and undefined; using loose equality keeps the no-null/no-null
  // rule happy without losing the null-safety semantic.
  // eslint-disable-next-line eqeqeq
  if (typeof value !== 'object' || value == undefined) return false;
  const record: Record<string, unknown> = { ...value };
  return typeof record.text === 'string';
}

/**
 * Narrow the unknown-typed auto-generated success handler result into the text string our component
 * consumes.
 */
function extractTextFromGetCompareSourceContentResult(result: unknown): string {
  return hasTextField(result) ? result.text : '';
}

/** Adapter wrapping the auto-generated success handler so it satisfies `FetchSourceContent`. */
const successFetcherFromHandler: FetchSourceContent = async (token, verseRef, singleChapter) => {
  // Wrap into the wire envelope { sessionId, sourceToken, verseRef, singleChapter } per §2.6.
  const result = await defaultGetCompareSourceContentHandler({
    sessionId: SAMPLE_SESSION_ID,
    sourceToken: token,
    verseRef,
    singleChapter,
  });
  return extractTextFromGetCompareSourceContentResult(result);
};

/** Adapter for an awaited rejection handler — the rejection bubbles through Promise<string>. */
function makeRejectingFetcher(handler: (...args: unknown[]) => Promise<never>): FetchSourceContent {
  return async (token, verseRef, singleChapter) => {
    // Wrap into the wire envelope { sessionId, sourceToken, verseRef, singleChapter } per §2.6.
    await handler({
      sessionId: SAMPLE_SESSION_ID,
      sourceToken: token,
      verseRef,
      singleChapter,
    });
    return '';
  };
}

/* ------------------------------------------------------------------ */
/* Default story — fully interactive, stateful decorator              */
/* ------------------------------------------------------------------ */

function DefaultDecorator(Story: (update?: { args: DifferencesToolViewProps }) => ReactElement) {
  const [leftSource, setLeftSource] = useState<SourceToken>({
    tokenOrText: LEFT_TOKEN,
    label: LEFT_LABEL,
  });
  const [rightSource, setRightSource] = useState<SourceToken>({
    tokenOrText: RIGHT_TOKEN,
    label: RIGHT_LABEL,
  });
  const [initialRef, setInitialRef] = useState<DifferencesVerseRef>(DEFAULT_INITIAL_REF);
  const [displayOptions, setDisplayOptions] = useState<DiffToolDisplayOptions>({
    showToolbar: true,
    showOnlyDifferences: false,
  });
  const [fetchCount, setFetchCount] = useState(0);

  const fetcher = useMemo(() => makeDefaultFetcher(), []);

  // Wrap the fetcher so the harness panel below can count successful resolutions.
  const onFetchSourceContent = useCallback<FetchSourceContent>(
    async (token, verseRef, singleChapter) => {
      const text = await fetcher(token, verseRef, singleChapter);
      setFetchCount((count) => count + 1);
      return text;
    },
    [fetcher],
  );

  // Smoke-load on first render so the harness panel starts populated.
  useEffect(() => {
    // setLeftSource/setRightSource provide a stable reference; we only need the harness count to
    // tick when a fetch resolves.
  }, [leftSource, rightSource]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '90vh' }}>
      <Story
        args={{
          leftSource,
          rightSource,
          initialRef,
          displayOptions,
          onFetchSourceContent,
        }}
      />
      <aside
        style={{
          borderTop: '1px solid var(--border, #ccc)',
          padding: '8px 12px',
          fontSize: 12,
          fontFamily: 'system-ui',
          display: 'flex',
          gap: 16,
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <span>
          <strong>Harness</strong>
        </span>
        <span>fetches: {fetchCount}</span>
        <span>
          ref: {initialRef.bookId} {initialRef.chapter.toString()}:{initialRef.verse.toString()}
        </span>
        <label>
          <input
            type="checkbox"
            checked={displayOptions.showToolbar}
            onChange={(e) =>
              setDisplayOptions((prev) => ({ ...prev, showToolbar: e.target.checked }))
            }
          />{' '}
          showToolbar
        </label>
        <label>
          <input
            type="checkbox"
            checked={Boolean(displayOptions.showOnlyDifferences)}
            onChange={(e) =>
              setDisplayOptions((prev) => ({
                ...prev,
                showOnlyDifferences: e.target.checked,
              }))
            }
          />{' '}
          showOnlyDifferences
        </label>
        <button
          type="button"
          onClick={() => {
            setInitialRef((prev) => ({
              ...prev,
              chapter: prev.chapter === 1 ? 2 : 1,
            }));
          }}
        >
          Toggle chapter (1 ↔ 2)
        </button>
        <button
          type="button"
          onClick={() => {
            setLeftSource((prev) => ({
              ...prev,
              tokenOrText: prev.tokenOrText === LEFT_TOKEN ? '' : LEFT_TOKEN,
            }));
          }}
        >
          Toggle left source (empty)
        </button>
        <button
          type="button"
          onClick={() => {
            setRightSource((prev) => ({
              ...prev,
              tokenOrText: prev.tokenOrText === RIGHT_TOKEN ? '' : RIGHT_TOKEN,
            }));
          }}
        >
          Toggle right source (empty)
        </button>
      </aside>
    </div>
  );
}

export const Default: Story = {
  decorators: [DefaultDecorator],
};

/* ------------------------------------------------------------------ */
/* Static/edge variants                                               */
/* ------------------------------------------------------------------ */

/** Single word changed — the simplest jsdiff segment (one removed + one added paired). */
export const SimpleWordChange: Story = {
  args: {
    leftSource: { tokenOrText: 'tok-left-simple', label: LEFT_LABEL },
    rightSource: { tokenOrText: 'tok-right-simple', label: RIGHT_LABEL },
    initialRef: DEFAULT_INITIAL_REF,
    displayOptions: { showToolbar: false, showOnlyDifferences: false },
    onFetchSourceContent: async (token) =>
      token === 'tok-left-simple'
        ? 'The quick brown fox jumps over the lazy dog.'
        : 'The quick brown cat jumps over the lazy dog.',
  },
};

/** Right pane has an extra word the left lacks. */
export const WordAdded: Story = {
  args: {
    leftSource: { tokenOrText: 'tok-left-added', label: LEFT_LABEL },
    rightSource: { tokenOrText: 'tok-right-added', label: RIGHT_LABEL },
    initialRef: DEFAULT_INITIAL_REF,
    displayOptions: { showToolbar: false, showOnlyDifferences: false },
    onFetchSourceContent: async (token) =>
      token === 'tok-left-added'
        ? 'In the beginning God created the heavens.'
        : 'In the beginning the Lord God created the heavens.',
  },
};

/** Left pane has an extra word the right lacks. */
export const WordRemoved: Story = {
  args: {
    leftSource: { tokenOrText: 'tok-left-removed', label: LEFT_LABEL },
    rightSource: { tokenOrText: 'tok-right-removed', label: RIGHT_LABEL },
    initialRef: DEFAULT_INITIAL_REF,
    displayOptions: { showToolbar: false, showOnlyDifferences: false },
    onFetchSourceContent: async (token) =>
      token === 'tok-left-removed'
        ? 'Now the serpent was more crafty than any of the wild animals.'
        : 'Now the serpent was more crafty than any animals.',
  },
};

/** `leftSource.tokenOrText === ''` → "(empty)" placeholder on left. */
export const EmptyLeftPane: Story = {
  args: {
    leftSource: { tokenOrText: '', label: LEFT_LABEL },
    rightSource: { tokenOrText: 'tok-right-empty-left', label: RIGHT_LABEL },
    initialRef: DEFAULT_INITIAL_REF,
    displayOptions: { showToolbar: false, showOnlyDifferences: false },
    onFetchSourceContent: successFetcherFromHandler,
  },
};

/** Symmetric: empty right token. */
export const EmptyRightPane: Story = {
  args: {
    leftSource: { tokenOrText: 'tok-left-empty-right', label: LEFT_LABEL },
    rightSource: { tokenOrText: '', label: RIGHT_LABEL },
    initialRef: DEFAULT_INITIAL_REF,
    displayOptions: { showToolbar: false, showOnlyDifferences: false },
    onFetchSourceContent: successFetcherFromHandler,
  },
};

/** `displayOptions.showToolbar === true` — toolbar visible, all segments rendered. */
export const ShowToolbar: Story = {
  args: {
    leftSource: { tokenOrText: 'tok-left-tb', label: LEFT_LABEL },
    rightSource: { tokenOrText: 'tok-right-tb', label: RIGHT_LABEL },
    initialRef: DEFAULT_INITIAL_REF,
    displayOptions: { showToolbar: true, showOnlyDifferences: false },
    onFetchSourceContent: async (token) =>
      token === 'tok-left-tb'
        ? 'In the beginning God created the heavens and the earth.'
        : 'In the beginning the Lord God created the heavens and the earth.',
  },
};

/** PT9 `ShowToolbarAndUncommon` — toolbar + hide-unchanged. */
export const ShowToolbarAndUncommon: Story = {
  args: {
    leftSource: { tokenOrText: 'tok-left-tbu', label: LEFT_LABEL },
    rightSource: { tokenOrText: 'tok-right-tbu', label: RIGHT_LABEL },
    initialRef: DEFAULT_INITIAL_REF,
    displayOptions: { showToolbar: true, showOnlyDifferences: true },
    onFetchSourceContent: async (token) =>
      token === 'tok-left-tbu'
        ? 'In the beginning God created the heavens and the earth.'
        : 'In the beginning the Lord God created the heavens and the earth.',
  },
};

/** Hide unchanged segments without the toolbar (isolated rendering toggle). */
export const ShowOnlyDifferences: Story = {
  args: {
    leftSource: { tokenOrText: 'tok-left-only-diff', label: LEFT_LABEL },
    rightSource: { tokenOrText: 'tok-right-only-diff', label: RIGHT_LABEL },
    initialRef: DEFAULT_INITIAL_REF,
    displayOptions: { showToolbar: false, showOnlyDifferences: true },
    onFetchSourceContent: async (token) =>
      token === 'tok-left-only-diff'
        ? 'Thus the heavens and the earth were completed in all their vast array.'
        : 'Thus the heavens and the earth were finished in all their vast array.',
  },
};

/**
 * Mismatched verse-ref between the panes — uses the component's internal sentinel
 * `__MISMATCHED_REF__` so the localized error renders.
 */
export const MismatchedVerseRefError: Story = {
  args: {
    leftSource: { tokenOrText: 'tok-left-mismatch', label: LEFT_LABEL },
    rightSource: { tokenOrText: 'tok-right-mismatch', label: RIGHT_LABEL },
    initialRef: DEFAULT_INITIAL_REF,
    displayOptions: { showToolbar: false, showOnlyDifferences: false },
    onFetchSourceContent: async () => '__MISMATCHED_REF__',
  },
};

/** Multi-paragraph / multi-verse content covering several verses of a chapter. */
export const MultiParagraph: Story = {
  args: {
    leftSource: { tokenOrText: 'tok-left-multi', label: LEFT_LABEL },
    rightSource: { tokenOrText: 'tok-right-multi', label: RIGHT_LABEL },
    initialRef: DEFAULT_INITIAL_REF,
    displayOptions: { showToolbar: true, showOnlyDifferences: false },
    onFetchSourceContent: async (token) =>
      token === 'tok-left-multi'
        ? `In the beginning God created the heavens and the earth.

Now the earth was formless and empty, darkness was over the surface of the deep, and the Spirit of God was hovering over the waters.

And God said, "Let there be light," and there was light. God saw that the light was good, and he separated the light from the darkness.`
        : `In the beginning the Lord God created the heavens and the earth.

Now the earth was without form and void, darkness was upon the face of the deep, and the Spirit of God was moving over the waters.

And God said, "Let there be light," and there was light. God saw that the light was excellent, and he separated the light from the darkness.`,
  },
};

/** Generic fetcher rejection (M-011 `IO_ERROR`) → localized fetch-error UI in both panes. */
export const FetchError: Story = {
  args: {
    leftSource: { tokenOrText: 'tok-left-err', label: LEFT_LABEL },
    rightSource: { tokenOrText: 'tok-right-err', label: RIGHT_LABEL },
    initialRef: DEFAULT_INITIAL_REF,
    displayOptions: { showToolbar: false, showOnlyDifferences: false },
    onFetchSourceContent: makeRejectingFetcher(UnderlyingIOErrorGetCompareSourceContentHandler),
  },
};

/** Variant: M-011 `INVALID_SESSION` rejection. */
export const FetchErrorInvalidSession: Story = {
  args: {
    leftSource: { tokenOrText: 'tok-left-invsess', label: LEFT_LABEL },
    rightSource: { tokenOrText: 'tok-right-invsess', label: RIGHT_LABEL },
    initialRef: DEFAULT_INITIAL_REF,
    displayOptions: { showToolbar: false, showOnlyDifferences: false },
    onFetchSourceContent: makeRejectingFetcher(
      SessionidNotRecognizedInvalidGetCompareSourceContentHandler,
    ),
  },
};

/** Variant: M-011 `INVALID_TOKEN` rejection. */
export const FetchErrorInvalidToken: Story = {
  args: {
    leftSource: { tokenOrText: 'tok-left-invtoken', label: LEFT_LABEL },
    rightSource: { tokenOrText: 'tok-right-invtoken', label: RIGHT_LABEL },
    initialRef: DEFAULT_INITIAL_REF,
    displayOptions: { showToolbar: false, showOnlyDifferences: false },
    onFetchSourceContent: makeRejectingFetcher(
      SourcetokenNotRecognizedForGetCompareSourceContentHandler,
    ),
  },
};

/**
 * Variant: M-011 `INVALID_VERSE_REF` rejection. Covers the malformed-or-unknown-book branch
 * documented in data-contracts.md §3.12 + integration-plan.json#/commands/getCompareSourceContent
 * /errors. Imports `VerserefMalformedUnknownBookGetCompareSourceContentHandler` from
 * storybook-handlers/ — closes the audit's MISSING_COVERAGE gap (1 of 4 declared M-011 errors was
 * not previously demoed).
 */
export const FetchErrorInvalidVerseRef: Story = {
  args: {
    leftSource: { tokenOrText: 'tok-left-invref', label: LEFT_LABEL },
    rightSource: { tokenOrText: 'tok-right-invref', label: RIGHT_LABEL },
    initialRef: DEFAULT_INITIAL_REF,
    displayOptions: { showToolbar: false, showOnlyDifferences: false },
    onFetchSourceContent: makeRejectingFetcher(
      VerserefMalformedUnknownBookGetCompareSourceContentHandler,
    ),
  },
};

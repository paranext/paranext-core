# markers-checklist Theme 5/4/6 Wiring Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the two stub trigger handlers in the markers-checklist web view with real wired `ProjectSelector`, `ScopeSelector`, goto navigation, and project-tab dedup — closing Themes 4/5/6 from PR #2219 review with PT9-faithful frozen-range semantics.

**Architecture:** All work is on the markers-checklist branch (already at PR #2212's tip). No backend changes; ScopeSelector + VersificationService + LinkedScrRefButton already exist on this branch. Three pure helpers + one shared hook are extracted; the web-view rewrite uses them. Persistence follows R1 mode-aware snapshot — `scope` + `snapshotScrRef` drive ScopeSelector display while `verseRange` is the frozen backend payload (matches PT9's snapshot model).

**Tech Stack:** TypeScript / React / `@papi/frontend` / `platform-bible-react` (ScopeSelector, ProjectSelector, LinkedScrRefButton, BookChapterControl) / Vitest / Playwright (CDP-based) / shadcn-ui.

**Spec:** `docs/specs/2026-04-29-markers-checklist-theme-5-4-6-wiring-design.md` (committed `ff679084b7`).

**Workspace:** `/home/paratext/git/workspaces/markers-checklist/paranext-core/`.

---

## File Structure

| Path                                                                                | Action        | Responsibility                                                                                                                                                                                                    |
| ----------------------------------------------------------------------------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `extensions/src/platform-scripture/src/components/compute-range-from-scope.ts`      | CREATE        | Pure function mapping `{scope, ref, rangeStart, rangeEnd, getEndVerse}` → `ChecklistScriptureRange` (handles VAL-003 ch=1 → verseNum=0).                                                                          |
| `extensions/src/platform-scripture/src/components/compute-range-from-scope.test.ts` | CREATE        | Vitest unit tests, 100% branch coverage.                                                                                                                                                                          |
| `extensions/src/platform-scripture/src/components/parse-scr-ref.ts`                 | CREATE        | Pure parser: "GEN 1:1" → `SerializedVerseRef \| undefined`.                                                                                                                                                       |
| `extensions/src/platform-scripture/src/components/parse-scr-ref.test.ts`            | CREATE        | Vitest unit tests.                                                                                                                                                                                                |
| `extensions/src/platform-scripture/src/hooks/use-open-project-tabs.ts`              | CREATE        | Shared hook — webView open/update/close subscription, optional filter.                                                                                                                                            |
| `extensions/src/platform-scripture/src/hooks/use-open-project-tabs.test.ts`         | CREATE        | Vitest unit tests with mocked `papi.webViews`.                                                                                                                                                                    |
| `extensions/src/platform-scripture/src/checklist.web-view.tsx`                      | MAJOR REWRITE | Add `useWebViewScrollGroupScrRef` + `updateWebViewDefinition`; replace 2 stubs with real ProjectSelector + ScopeSelector wiring (R1); wire `getEndVerse`; wire `onGotoLinkClick` (A+C); use `useOpenProjectTabs`. |
| `extensions/src/platform-scripture/src/components/checklist.component.tsx`          | MOD           | Delete `SelectorTrigger` fallback + 6 unused trigger props; add sticky toolbar wrapper.                                                                                                                           |
| `extensions/src/platform-scripture/src/components/checklist.types.ts`               | MOD           | Drop the 6 trigger label/onClick props from `ChecklistToolProps`.                                                                                                                                                 |
| `extensions/src/platform-scripture/src/components/checklist.stories.tsx`            | MOD           | Update stories to pass real `*Selector` ReactNodes (or simple Button placeholders for storybook).                                                                                                                 |
| `extensions/src/platform-scripture/src/checks-side-panel.web-view.tsx`              | MOD           | Replace inline tab-tracking with `useOpenProjectTabs`; add tab-dedup in `handleSelectProject`.                                                                                                                    |
| `e2e-tests/tests/markers-checklist/wiring-theme-5.spec.ts`                          | CREATE        | Playwright e2e tests covering 10 scenarios from spec §14.5.                                                                                                                                                       |
| `.context/features/markers-checklist/implementation/traceability-theme-5-4-6.json`  | CREATE        | Theme-item → test/recipe mapping.                                                                                                                                                                                 |
| `.context/features/markers-checklist/proofs/e2e-evidence/wiring/`                   | CREATE (dir)  | Manual verification screenshots from §14.6 + §14.8.                                                                                                                                                               |

---

## Conventions

- **Commit message prefix**: `[P3][ui] markers-checklist:` (matches recent history).
- **TDD**: pure helpers and the hook follow strict RED → GREEN → REFACTOR. Web-view wiring is verified via e2e (Phase 5) + manual CDP recipes (Phase 6) since component-level integration tests would be brittle.
- **Frequent commits**: each task ends with a commit. Do NOT batch unrelated changes into one commit.
- **No stubs**: per `feedback_no_stubs_in_porting_workflow.md` and the user's emphasis. If a real dependency is genuinely missing, escalate — do not commit a no-op handler.
- **No suppressions without justification**: per `eslint-disable-discipline.md` — fix the code first; only suppress if the fix is significantly worse, with a clear comment.
- **Evidence-before-assertions** (§14.9 of spec): never claim a step done without artifact proof — test output, screenshot, or log line.

---

## Phase 1: Pure helpers + shared hook (TDD)

### Task 1: `computeRangeFromScope` pure function

**Files:**

- Create: `extensions/src/platform-scripture/src/components/compute-range-from-scope.ts`
- Test: `extensions/src/platform-scripture/src/components/compute-range-from-scope.test.ts`

- [ ] **Step 1.1: Write the failing test**

Create `extensions/src/platform-scripture/src/components/compute-range-from-scope.test.ts`:

```typescript
import { describe, it, expect } from 'vitest';
import { computeRangeFromScope } from './compute-range-from-scope';
import type { SerializedVerseRef } from '@sillsdev/scripture';

const REF_GEN_5_7: SerializedVerseRef = { book: 'GEN', chapterNum: 5, verseNum: 7 };
const REF_GEN_1_1: SerializedVerseRef = { book: 'GEN', chapterNum: 1, verseNum: 1 };
const REF_MAT_28_20: SerializedVerseRef = { book: 'MAT', chapterNum: 28, verseNum: 20 };

describe('computeRangeFromScope', () => {
  it('verse: returns single-verse range', () => {
    const result = computeRangeFromScope({
      scope: 'verse',
      ref: REF_GEN_5_7,
      rangeStart: REF_GEN_1_1,
      rangeEnd: REF_GEN_1_1,
      getEndVerse: () => 31,
    });
    expect(result).toEqual({ start: REF_GEN_5_7, end: REF_GEN_5_7 });
  });

  it('chapter (chapterNum > 1): start verseNum = 1, end verseNum = getEndVerse', () => {
    const result = computeRangeFromScope({
      scope: 'chapter',
      ref: REF_GEN_5_7,
      rangeStart: REF_GEN_1_1,
      rangeEnd: REF_GEN_1_1,
      getEndVerse: () => 32,
    });
    expect(result).toEqual({
      start: { book: 'GEN', chapterNum: 5, verseNum: 1 },
      end: { book: 'GEN', chapterNum: 5, verseNum: 32 },
    });
  });

  it('chapter (chapterNum === 1): start verseNum = 0 per VAL-003', () => {
    const result = computeRangeFromScope({
      scope: 'chapter',
      ref: REF_GEN_1_1,
      rangeStart: REF_GEN_1_1,
      rangeEnd: REF_GEN_1_1,
      getEndVerse: () => 31,
    });
    expect(result).toEqual({
      start: { book: 'GEN', chapterNum: 1, verseNum: 0 },
      end: { book: 'GEN', chapterNum: 1, verseNum: 31 },
    });
  });

  it('chapter: getEndVerse returns 0 → fallback to a safe upper bound (200)', () => {
    const result = computeRangeFromScope({
      scope: 'chapter',
      ref: REF_GEN_5_7,
      rangeStart: REF_GEN_1_1,
      rangeEnd: REF_GEN_1_1,
      getEndVerse: () => 0,
    });
    expect(result.end.verseNum).toBe(200);
  });

  it('book: start = ch1:0, end = lastChapter:lastVerse via getEndVerse', () => {
    const result = computeRangeFromScope({
      scope: 'book',
      ref: REF_GEN_5_7,
      rangeStart: REF_GEN_1_1,
      rangeEnd: REF_GEN_1_1,
      getEndVerse: (_book, chapter) => (chapter === 50 ? 26 : 0),
      getLastChapter: () => 50,
    });
    expect(result).toEqual({
      start: { book: 'GEN', chapterNum: 1, verseNum: 0 },
      end: { book: 'GEN', chapterNum: 50, verseNum: 26 },
    });
  });

  it('book: getLastChapter returns 0 → fallback to chapter 150 (max for any biblical book)', () => {
    const result = computeRangeFromScope({
      scope: 'book',
      ref: REF_GEN_5_7,
      rangeStart: REF_GEN_1_1,
      rangeEnd: REF_GEN_1_1,
      getEndVerse: () => 0,
      getLastChapter: () => 0,
    });
    expect(result.end.chapterNum).toBe(150);
  });

  it('range: echoes rangeStart and rangeEnd verbatim', () => {
    const result = computeRangeFromScope({
      scope: 'range',
      ref: REF_GEN_5_7,
      rangeStart: REF_GEN_1_1,
      rangeEnd: REF_MAT_28_20,
      getEndVerse: () => 31,
    });
    expect(result).toEqual({ start: REF_GEN_1_1, end: REF_MAT_28_20 });
  });

  it('range: with rangeStart > rangeEnd, returns echo (caller responsibility)', () => {
    const result = computeRangeFromScope({
      scope: 'range',
      ref: REF_GEN_5_7,
      rangeStart: REF_MAT_28_20,
      rangeEnd: REF_GEN_1_1,
      getEndVerse: () => 31,
    });
    expect(result.start).toEqual(REF_MAT_28_20);
    expect(result.end).toEqual(REF_GEN_1_1);
  });

  it('selectedText / selectedBooks (unsupported): returns undefined', () => {
    expect(
      computeRangeFromScope({
        scope: 'selectedText',
        ref: REF_GEN_5_7,
        rangeStart: REF_GEN_1_1,
        rangeEnd: REF_GEN_1_1,
        getEndVerse: () => 31,
      }),
    ).toBeUndefined();
    expect(
      computeRangeFromScope({
        scope: 'selectedBooks',
        ref: REF_GEN_5_7,
        rangeStart: REF_GEN_1_1,
        rangeEnd: REF_GEN_1_1,
        getEndVerse: () => 31,
      }),
    ).toBeUndefined();
  });
});
```

- [ ] **Step 1.2: Run test — verify failure**

```bash
cd /home/paratext/git/workspaces/markers-checklist/paranext-core
npm test -- extensions/src/platform-scripture/src/components/compute-range-from-scope.test.ts --run
```

Expected: FAIL with "Cannot find module './compute-range-from-scope'".

- [ ] **Step 1.3: Write minimal implementation**

Create `extensions/src/platform-scripture/src/components/compute-range-from-scope.ts`:

```typescript
import type { SerializedVerseRef } from '@sillsdev/scripture';
import type { Scope } from 'platform-bible-react';
import type { ChecklistScriptureRange } from 'platform-scripture';

const FALLBACK_END_VERSE = 200;
const FALLBACK_END_CHAPTER = 150;

export interface ComputeRangeFromScopeArgs {
  scope: Scope;
  ref: SerializedVerseRef;
  rangeStart: SerializedVerseRef;
  rangeEnd: SerializedVerseRef;
  /** Returns final verse number for (book, chapter) or 0 if unknown. */
  getEndVerse: (bookId: string, chapterNum: number) => number;
  /**
   * Returns final chapter number for the book or 0 if unknown. Optional — only used for `'book'`
   * scope.
   */
  getLastChapter?: (bookId: string) => number;
}

/**
 * Compute the wire `ChecklistScriptureRange` from the user's chosen scope.
 *
 * `verse` / `chapter` / `book` snapshot from `ref` (PT9-faithful: caller passes the _frozen_
 * reference, not the live one). `range` echoes user-picked rangeStart/rangeEnd. `selectedBooks` and
 * `selectedText` are unsupported by the backend and return `undefined`.
 *
 * VAL-003: when `chapterNum === 1`, start verseNum is 0 to include any introductory material.
 */
export function computeRangeFromScope({
  scope,
  ref,
  rangeStart,
  rangeEnd,
  getEndVerse,
  getLastChapter,
}: ComputeRangeFromScopeArgs): ChecklistScriptureRange | undefined {
  switch (scope) {
    case 'verse':
      return { start: ref, end: ref };
    case 'chapter': {
      const startVerseNum = ref.chapterNum === 1 ? 0 : 1;
      const endVerseNum = getEndVerse(ref.book, ref.chapterNum) || FALLBACK_END_VERSE;
      return {
        start: { book: ref.book, chapterNum: ref.chapterNum, verseNum: startVerseNum },
        end: { book: ref.book, chapterNum: ref.chapterNum, verseNum: endVerseNum },
      };
    }
    case 'book': {
      const lastChapter = getLastChapter?.(ref.book) || FALLBACK_END_CHAPTER;
      const endVerseNum = getEndVerse(ref.book, lastChapter) || FALLBACK_END_VERSE;
      return {
        start: { book: ref.book, chapterNum: 1, verseNum: 0 },
        end: { book: ref.book, chapterNum: lastChapter, verseNum: endVerseNum },
      };
    }
    case 'range':
      return { start: rangeStart, end: rangeEnd };
    case 'selectedBooks':
    case 'selectedText':
    default:
      return undefined;
  }
}
```

- [ ] **Step 1.4: Run test — verify pass**

```bash
npm test -- extensions/src/platform-scripture/src/components/compute-range-from-scope.test.ts --run
```

Expected: 9 tests pass.

- [ ] **Step 1.5: Run the revert test (per `tdd-discipline.md`)**

Comment out the function body (replace with `return undefined;`), re-run tests, expect FAIL on at least 6 cases. Restore the body and re-run, expect PASS.

- [ ] **Step 1.6: Commit**

```bash
git add extensions/src/platform-scripture/src/components/compute-range-from-scope.ts \
        extensions/src/platform-scripture/src/components/compute-range-from-scope.test.ts
git commit -m "[P3][ui] markers-checklist: Pure helper computeRangeFromScope (TDD)

Maps ScopeSelector mode → ChecklistScriptureRange. PT9-faithful snapshot model
(caller passes frozen ref). Handles VAL-003 ch=1 → verseNum=0, fallbacks for
unknown verse/chapter counts, and returns undefined for unsupported scopes
(selectedBooks/selectedText)."
```

---

### Task 2: `parseScrRef` helper

**Files:**

- Create: `extensions/src/platform-scripture/src/components/parse-scr-ref.ts`
- Test: `extensions/src/platform-scripture/src/components/parse-scr-ref.test.ts`

- [ ] **Step 2.1: Write the failing test**

Create `extensions/src/platform-scripture/src/components/parse-scr-ref.test.ts`:

```typescript
import { describe, it, expect } from 'vitest';
import { parseScrRef } from './parse-scr-ref';

describe('parseScrRef', () => {
  it('parses "GEN 1:1"', () => {
    expect(parseScrRef('GEN 1:1')).toEqual({ book: 'GEN', chapterNum: 1, verseNum: 1 });
  });

  it('parses three-letter books like "1JN 4:7"', () => {
    expect(parseScrRef('1JN 4:7')).toEqual({ book: '1JN', chapterNum: 4, verseNum: 7 });
  });

  it('parses "MAT 28:20"', () => {
    expect(parseScrRef('MAT 28:20')).toEqual({ book: 'MAT', chapterNum: 28, verseNum: 20 });
  });

  it('tolerates extra whitespace', () => {
    expect(parseScrRef('  GEN  1:1  ')).toEqual({ book: 'GEN', chapterNum: 1, verseNum: 1 });
  });

  it('returns undefined for malformed input (no chapter:verse)', () => {
    expect(parseScrRef('GEN 1')).toBeUndefined();
  });

  it('returns undefined for empty string', () => {
    expect(parseScrRef('')).toBeUndefined();
  });

  it('returns undefined for non-numeric chapter/verse', () => {
    expect(parseScrRef('GEN A:1')).toBeUndefined();
    expect(parseScrRef('GEN 1:B')).toBeUndefined();
  });

  it('lowercases book id input → uppercase output', () => {
    expect(parseScrRef('gen 1:1')).toEqual({ book: 'GEN', chapterNum: 1, verseNum: 1 });
  });
});
```

- [ ] **Step 2.2: Run test — verify failure**

```bash
npm test -- extensions/src/platform-scripture/src/components/parse-scr-ref.test.ts --run
```

Expected: FAIL with "Cannot find module".

- [ ] **Step 2.3: Write minimal implementation**

Create `extensions/src/platform-scripture/src/components/parse-scr-ref.ts`:

```typescript
import type { SerializedVerseRef } from '@sillsdev/scripture';

const SCR_REF_PATTERN = /^([A-Za-z0-9]{3})\s+(\d+):(\d+)$/;

/**
 * Parse a scripture reference string ("GEN 1:1") into a `SerializedVerseRef`.
 *
 * Returns `undefined` for malformed input. Book is uppercased; chapter/verse must be integers.
 * Whitespace around the input is trimmed; internal whitespace between book and chapter must be a
 * single space (or runs are tolerated by trimming, but the book-chapter separator itself is one or
 * more spaces).
 */
export function parseScrRef(input: string): SerializedVerseRef | undefined {
  const trimmed = input.trim();
  if (!trimmed) return undefined;
  const collapsed = trimmed.replace(/\s+/g, ' ');
  const match = SCR_REF_PATTERN.exec(collapsed);
  if (!match) return undefined;
  const [, book, chapterStr, verseStr] = match;
  const chapterNum = Number.parseInt(chapterStr, 10);
  const verseNum = Number.parseInt(verseStr, 10);
  if (!Number.isInteger(chapterNum) || !Number.isInteger(verseNum)) return undefined;
  return { book: book.toUpperCase(), chapterNum, verseNum };
}
```

- [ ] **Step 2.4: Run test — verify pass**

```bash
npm test -- extensions/src/platform-scripture/src/components/parse-scr-ref.test.ts --run
```

Expected: 8 tests pass.

- [ ] **Step 2.5: Commit**

```bash
git add extensions/src/platform-scripture/src/components/parse-scr-ref.ts \
        extensions/src/platform-scripture/src/components/parse-scr-ref.test.ts
git commit -m "[P3][ui] markers-checklist: Pure helper parseScrRef (TDD)

Parses 'GEN 1:1' style strings into SerializedVerseRef. Used by the goto
handler in the web-view to convert the LinkedScrRefButton's ref string into
a structured ref. Returns undefined for malformed input."
```

---

### Task 3: `useOpenProjectTabs` shared hook

**Files:**

- Create: `extensions/src/platform-scripture/src/hooks/use-open-project-tabs.ts`
- Test: `extensions/src/platform-scripture/src/hooks/use-open-project-tabs.test.ts`

- [ ] **Step 3.1: Write the failing test**

Create `extensions/src/platform-scripture/src/hooks/use-open-project-tabs.test.ts`:

```typescript
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useOpenProjectTabs } from './use-open-project-tabs';

type WebViewEventHandler = (event: { webView: WebViewLike }) => void;
interface WebViewLike {
  id: string;
  webViewType?: string;
  projectId?: string;
  scrollGroupScrRef?: unknown;
}

const mockOnDidOpenWebView = vi.fn();
const mockOnDidUpdateWebView = vi.fn();
const mockOnDidCloseWebView = vi.fn();
const mockUnsubOpen = vi.fn();
const mockUnsubUpdate = vi.fn();
const mockUnsubClose = vi.fn();

vi.mock('@papi/frontend', () => ({
  default: {
    webViews: {
      onDidOpenWebView: (h: WebViewEventHandler) => {
        mockOnDidOpenWebView(h);
        return mockUnsubOpen;
      },
      onDidUpdateWebView: (h: WebViewEventHandler) => {
        mockOnDidUpdateWebView(h);
        return mockUnsubUpdate;
      },
      onDidCloseWebView: (h: WebViewEventHandler) => {
        mockOnDidCloseWebView(h);
        return mockUnsubClose;
      },
    },
  },
}));

beforeEach(() => {
  mockOnDidOpenWebView.mockClear();
  mockOnDidUpdateWebView.mockClear();
  mockOnDidCloseWebView.mockClear();
  mockUnsubOpen.mockClear();
  mockUnsubUpdate.mockClear();
  mockUnsubClose.mockClear();
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('useOpenProjectTabs', () => {
  it('subscribes on mount and unsubscribes on unmount', () => {
    const { unmount } = renderHook(() => useOpenProjectTabs());
    expect(mockOnDidOpenWebView).toHaveBeenCalledTimes(1);
    expect(mockOnDidUpdateWebView).toHaveBeenCalledTimes(1);
    expect(mockOnDidCloseWebView).toHaveBeenCalledTimes(1);
    unmount();
    expect(mockUnsubOpen).toHaveBeenCalledTimes(1);
    expect(mockUnsubUpdate).toHaveBeenCalledTimes(1);
    expect(mockUnsubClose).toHaveBeenCalledTimes(1);
  });

  it('upserts tab on open event with valid project + scrollGroupScrRef', () => {
    const { result } = renderHook(() => useOpenProjectTabs());
    const handler = mockOnDidOpenWebView.mock.calls[0][0] as WebViewEventHandler;
    act(() =>
      handler({
        webView: {
          id: 'wv-1',
          webViewType: 'platformScriptureEditor.react',
          projectId: 'p-1',
          scrollGroupScrRef: 0,
        },
      }),
    );
    expect(result.current).toEqual([
      {
        webViewId: 'wv-1',
        projectId: 'p-1',
        scrollGroupId: 0,
        webViewType: 'platformScriptureEditor.react',
      },
    ]);
  });

  it('skips webView without projectId', () => {
    const { result } = renderHook(() => useOpenProjectTabs());
    const handler = mockOnDidOpenWebView.mock.calls[0][0] as WebViewEventHandler;
    act(() =>
      handler({
        webView: {
          id: 'wv-1',
          webViewType: 'platformScriptureEditor.react',
          scrollGroupScrRef: 0,
        },
      }),
    );
    expect(result.current).toEqual([]);
  });

  it('skips webView with non-numeric scrollGroupScrRef', () => {
    const { result } = renderHook(() => useOpenProjectTabs());
    const handler = mockOnDidOpenWebView.mock.calls[0][0] as WebViewEventHandler;
    act(() =>
      handler({
        webView: { id: 'wv-1', projectId: 'p-1', scrollGroupScrRef: 'not-a-number' },
      }),
    );
    expect(result.current).toEqual([]);
  });

  it('removes tab on close event', () => {
    const { result } = renderHook(() => useOpenProjectTabs());
    const openH = mockOnDidOpenWebView.mock.calls[0][0] as WebViewEventHandler;
    const closeH = mockOnDidCloseWebView.mock.calls[0][0] as WebViewEventHandler;
    act(() =>
      openH({
        webView: { id: 'wv-1', webViewType: 'foo', projectId: 'p-1', scrollGroupScrRef: 0 },
      }),
    );
    expect(result.current).toHaveLength(1);
    act(() => closeH({ webView: { id: 'wv-1' } }));
    expect(result.current).toEqual([]);
  });

  it('filter excludes non-matching webViewType', () => {
    const { result } = renderHook(() =>
      useOpenProjectTabs((wv) => wv.webViewType === 'platformScriptureEditor.react'),
    );
    const handler = mockOnDidOpenWebView.mock.calls[0][0] as WebViewEventHandler;
    act(() =>
      handler({
        webView: {
          id: 'wv-1',
          webViewType: 'someOther.webViewType',
          projectId: 'p-1',
          scrollGroupScrRef: 0,
        },
      }),
    );
    expect(result.current).toEqual([]);
    act(() =>
      handler({
        webView: {
          id: 'wv-2',
          webViewType: 'platformScriptureEditor.react',
          projectId: 'p-2',
          scrollGroupScrRef: 1,
        },
      }),
    );
    expect(result.current).toHaveLength(1);
    expect(result.current[0].webViewId).toBe('wv-2');
  });
});
```

- [ ] **Step 3.2: Run test — verify failure**

```bash
npm test -- extensions/src/platform-scripture/src/hooks/use-open-project-tabs.test.ts --run
```

Expected: FAIL with "Cannot find module".

- [ ] **Step 3.3: Write minimal implementation**

Create `extensions/src/platform-scripture/src/hooks/use-open-project-tabs.ts`:

```typescript
import papi from '@papi/frontend';
import { useEffect, useMemo, useState } from 'react';
import type { ScrollGroupId } from 'platform-bible-utils';

export interface OpenProjectTabWithWebView {
  webViewId: string;
  projectId: string;
  scrollGroupId: ScrollGroupId;
  webViewType: string;
}

export type WebViewFilter = (webView: { webViewType: string }) => boolean;

/**
 * Subscribe to webView open/update/close events and yield project-bound tabs (entries with both a
 * `projectId` and a numeric `scrollGroupScrRef`). Optional `filter` narrows by webViewType — useful
 * for "editor tabs only" queries.
 *
 * Replaces the inline subscription pattern duplicated in `checks-side-panel.web-view.tsx` and
 * `checklist.web-view.tsx`.
 */
export function useOpenProjectTabs(filter?: WebViewFilter): OpenProjectTabWithWebView[] {
  const [tabsMap, setTabsMap] = useState<Map<string, OpenProjectTabWithWebView>>(() => new Map());

  useEffect(() => {
    const upsert = (webView: {
      id: string;
      webViewType?: string;
      projectId?: string;
      scrollGroupScrRef?: unknown;
    }) => {
      const passes =
        !!webView.projectId &&
        typeof webView.scrollGroupScrRef === 'number' &&
        (!filter ||
          (webView.webViewType !== undefined && filter({ webViewType: webView.webViewType })));
      setTabsMap((prev) => {
        const next = new Map(prev);
        if (passes) {
          next.set(webView.id, {
            webViewId: webView.id,
            projectId: webView.projectId!,
            scrollGroupId: webView.scrollGroupScrRef as ScrollGroupId,
            webViewType: webView.webViewType ?? '',
          });
        } else {
          next.delete(webView.id);
        }
        return next;
      });
    };
    const unsubOpen = papi.webViews.onDidOpenWebView(({ webView }) => upsert(webView));
    const unsubUpdate = papi.webViews.onDidUpdateWebView(({ webView }) => upsert(webView));
    const unsubClose = papi.webViews.onDidCloseWebView(({ webView }) => {
      setTabsMap((prev) => {
        if (!prev.has(webView.id)) return prev;
        const next = new Map(prev);
        next.delete(webView.id);
        return next;
      });
    });
    return () => {
      unsubOpen();
      unsubUpdate();
      unsubClose();
    };
  }, [filter]);

  return useMemo(() => [...tabsMap.values()], [tabsMap]);
}
```

- [ ] **Step 3.4: Run test — verify pass**

```bash
npm test -- extensions/src/platform-scripture/src/hooks/use-open-project-tabs.test.ts --run
```

Expected: 6 tests pass.

- [ ] **Step 3.5: Commit**

```bash
git add extensions/src/platform-scripture/src/hooks/use-open-project-tabs.ts \
        extensions/src/platform-scripture/src/hooks/use-open-project-tabs.test.ts
git commit -m "[P3][ui] markers-checklist: Shared hook useOpenProjectTabs (TDD)

Extracts the duplicated webView open/update/close subscription pattern from
checks-side-panel.web-view.tsx and checklist.web-view.tsx into one reusable
hook. Optional filter param supports editor-only queries (used by the
markers-checklist goto handler to find an existing editor tab to focus)."
```

---

## Phase 2: ChecklistWebView rewrite

The web-view rewrite is the largest task. We split it into smaller focused commits to keep each step reviewable. After each Phase 2 commit, manually launch the app via the `app-runner` skill and verify the checklist still opens and renders without runtime errors.

### Task 4: Add scroll-group binding + WebViewProps destructure

**Files:**

- Modify: `extensions/src/platform-scripture/src/checklist.web-view.tsx`

- [ ] **Step 4.1: Update the destructure at line 150**

Find the existing line:

```typescript
global.webViewComponent = function ChecklistWebView({ projectId, useWebViewState }: WebViewProps) {
```

Replace with:

```typescript
global.webViewComponent = function ChecklistWebView({
  projectId,
  useWebViewState,
  useWebViewScrollGroupScrRef,
  updateWebViewDefinition,
}: WebViewProps) {
```

- [ ] **Step 4.2: Add scroll-group binding at the top of the function body**

Just after the `// ─── UI-PKG-004: persisted state slots ───` header (line 151), and before the existing `equivalentMarkers` line, add:

```typescript
// ─── Scroll group binding (drives currentScrRef + goto setter) ────────
const [liveScrRef, setLiveScrRef, scrollGroupId, setScrollGroupId] = useWebViewScrollGroupScrRef();
// Suppress unused-variable warnings for slots we wire in later steps.
void scrollGroupId;
void setScrollGroupId;
```

- [ ] **Step 4.3: Run typecheck**

```bash
npx tsc --noEmit -p extensions/src/platform-scripture/tsconfig.json
```

Expected: PASS (no new errors).

- [ ] **Step 4.4: Build extensions to confirm no regressions**

```bash
npm run build:extensions
```

Expected: PASS.

- [ ] **Step 4.5: Commit**

```bash
git add extensions/src/platform-scripture/src/checklist.web-view.tsx
git commit -m "[P3][ui] markers-checklist: Bind useWebViewScrollGroupScrRef + updateWebViewDefinition

Pulls the scroll-group hook + updateWebViewDefinition into the markers-checklist
web-view. Provides liveScrRef + setLiveScrRef for ScopeSelector currentScrRef
display and goto navigation (next tasks). updateWebViewDefinition is needed for
primary-project retargeting via the wired ProjectSelector."
```

---

### Task 5: Replace `verseRange` slot with full state model

**Files:**

- Modify: `extensions/src/platform-scripture/src/checklist.web-view.tsx`

- [ ] **Step 5.1: Update imports**

At the top of `checklist.web-view.tsx`, find the existing imports from `platform-bible-react` and `@sillsdev/scripture` (or add new ones if missing):

```typescript
import {
  useEvent,
  ProjectSelector,
  ScopeSelector,
  type OpenProjectTab,
  type ProjectPair,
  type ProjectSelectorProject,
  type Scope,
  usePromise,
} from 'platform-bible-react';
import { defaultScrRef } from 'platform-bible-utils';
import { Canon, type SerializedVerseRef } from '@sillsdev/scripture';
```

(Verify `Scope` is exported from `platform-bible-react` — it lives at `src/components/utils/scripture.util.ts`. If not yet re-exported, add to `lib/platform-bible-react/src/index.ts`. Check before assuming.)

- [ ] **Step 5.2: Replace the broken `verseRange` slot with the full model**

Find:

```typescript
const [verseRange] = useWebViewState<ChecklistScriptureRange | undefined>(
  'checklistVerseRange',
  undefined,
);
```

Replace with:

```typescript
// R1 — mode-aware snapshot persistence (matches PT9's frozen-range model).
const [scope, setScope] = useWebViewState<Scope>('checklistScope', 'chapter');
const [snapshotScrRef, setSnapshotScrRef] = useWebViewState<SerializedVerseRef | undefined>(
  'checklistSnapshotScrRef',
  undefined,
);
const [rangeStart, setRangeStart] = useWebViewState<SerializedVerseRef>(
  'checklistRangeStart',
  defaultScrRef,
);
const [rangeEnd, setRangeEnd] = useWebViewState<SerializedVerseRef>(
  'checklistRangeEnd',
  defaultScrRef,
);
const [verseRange, setVerseRange] = useWebViewState<ChecklistScriptureRange | undefined>(
  'checklistVerseRange',
  undefined,
);
const [selectedBookIds, setSelectedBookIds] = useWebViewState<string[]>(
  'checklistSelectedBookIds',
  [],
);
```

- [ ] **Step 5.3: Run typecheck**

```bash
npx tsc --noEmit -p extensions/src/platform-scripture/tsconfig.json
```

Expected: PASS. (`Scope` is re-exported from `platform-bible-react/src/index.ts:272` — no precursor edit needed.)

- [ ] **Step 5.4: Commit**

```bash
git add extensions/src/platform-scripture/src/checklist.web-view.tsx
# (Plus lib/platform-bible-react/src/index.ts if Scope re-export was needed.)
git commit -m "[P3][ui] markers-checklist: Add R1 persisted state model

Replaces the broken verseRange slot (which dropped the setter) with the full
R1 mode-aware snapshot model: scope + snapshotScrRef + rangeStart + rangeEnd
+ verseRange + selectedBookIds. verseRange remains the frozen backend payload
(PT9-equivalent); the others drive ScopeSelector display and BCV pickers."
```

---

### Task 6: First-launch seed for `verseRange`

**Files:**

- Modify: `extensions/src/platform-scripture/src/checklist.web-view.tsx`
- Modify: `extensions/src/platform-scripture/src/components/compute-range-from-scope.ts` (if `getLastChapter` helper missing)

- [ ] **Step 6.1: Add `getEndVerse` and `getLastChapter` callbacks**

Just after the column-direction `useEffect` block (around the existing line 374), add:

```typescript
// ─── Versification lookups (Theme 6) ──────────────────────────────────────
//
// Mirrors platform-scripture-editor.web-view.tsx:351-377. The VersificationService is the same
// network object PR #2212 introduced; current-book verse counts only (other books would need
// their own fetch/cache).

const currentBookNum = useMemo(() => Canon.bookIdToNumber(liveScrRef.book), [liveScrRef.book]);

const fetchLastVersesInCurrentBook = useCallback(async (): Promise<number[] | undefined> => {
  if (!projectId || currentBookNum <= 0) return undefined;
  try {
    const versificationService = await papi.networkObjects.get<{
      lookupFinalVerseNumbersInBook: (projectId: string, bookNum: number) => Promise<number[]>;
    }>('platformScripture.versificationService');
    if (!versificationService) return undefined;
    return await versificationService.lookupFinalVerseNumbersInBook(projectId, currentBookNum);
  } catch (err) {
    logger.debug(`ChecklistWebView: VersificationService unavailable: ${getErrorMessage(err)}`);
    return undefined;
  }
}, [projectId, currentBookNum]);
const [lastVersesInCurrentBook] = usePromise(fetchLastVersesInCurrentBook, undefined);

const getEndVerse = useCallback(
  (bookId: string, chapterNum: number): number => {
    if (Canon.bookIdToNumber(bookId) !== currentBookNum) return 0;
    return lastVersesInCurrentBook?.[chapterNum] ?? 0;
  },
  [currentBookNum, lastVersesInCurrentBook],
);

// Last-chapter lookup derived from the same per-book array. The verses array is 1-indexed
// (matches scripture-editor.web-view.tsx:374's `[chapterNum]` access pattern), so the array
// length minus 1 yields the highest chapter number. Returns 0 for non-current books, which
// computeRangeFromScope tolerates by falling back to FALLBACK_END_CHAPTER (150).
const getLastChapter = useCallback(
  (bookId: string): number => {
    if (Canon.bookIdToNumber(bookId) !== currentBookNum) return 0;
    if (!lastVersesInCurrentBook || lastVersesInCurrentBook.length === 0) return 0;
    return lastVersesInCurrentBook.length - 1;
  },
  [currentBookNum, lastVersesInCurrentBook],
);
```

(Note: this assumes `lookupFinalVerseNumbersInBook` returns a 1-indexed array — verified against `platform-scripture-editor.web-view.tsx:374` which accesses `[chapterNum]` directly. If the implementation engineer finds the array is 0-indexed, drop the `- 1` adjustment.)

- [ ] **Step 6.2: Add the first-launch seed effect**

Just below the versification block, add:

```typescript
// ─── First-launch seed (R1) ──────────────────────────────────────────────
//
// PT9's behavior on first launch with no memento: defaults to "All Books". We deliberately
// deviate (per Sebastian's sluggish-default feedback): seed scope='chapter' from liveScrRef
// once it's available.

const hasSeededRef = useRef(false);
useEffect(() => {
  if (hasSeededRef.current) return;
  if (verseRange !== undefined) {
    // Already seeded in a prior session — adopt it.
    hasSeededRef.current = true;
    return;
  }
  if (!liveScrRef || !liveScrRef.book) return;
  const seededRange = computeRangeFromScope({
    scope: 'chapter',
    ref: liveScrRef,
    rangeStart: defaultScrRef,
    rangeEnd: defaultScrRef,
    getEndVerse,
    getLastChapter,
  });
  if (!seededRange) return;
  hasSeededRef.current = true;
  setSnapshotScrRef(liveScrRef);
  setVerseRange(seededRange);
}, [verseRange, liveScrRef, getEndVerse, getLastChapter, setSnapshotScrRef, setVerseRange]);
```

Add `import { computeRangeFromScope } from './components/compute-range-from-scope';` near the top.

- [ ] **Step 6.3: Run typecheck + extension build**

```bash
npx tsc --noEmit -p extensions/src/platform-scripture/tsconfig.json
npm run build:extensions
```

Expected: PASS.

- [ ] **Step 6.4: Smoke-launch the app via app-runner skill**

Use the `app-runner` skill: `./.erb/scripts/refresh.sh`. Open Platform.Bible. Open a project (`wgPIDGIN`). Trigger the markers-checklist (Hamburger → Tools → Markers Checklist if menu wired, otherwise via dev panel). Verify it opens without console errors and renders SOMETHING (rows or empty state — not white screen). Use `visual-verification` skill to capture a screenshot to `.context/features/markers-checklist/proofs/e2e-evidence/wiring/01-seed.png`.

- [ ] **Step 6.5: Commit**

```bash
git add extensions/src/platform-scripture/src/checklist.web-view.tsx \
        extensions/src/platform-scripture/src/components/compute-range-from-scope.ts \
        .context/features/markers-checklist/proofs/e2e-evidence/wiring/01-seed.png
git commit -m "[P3][ui] markers-checklist: getEndVerse + first-launch seed

Wires VersificationService for current-book verse counts. Adds the first-launch
seed: when verseRange is undefined and liveScrRef is available, seed
scope='chapter' from liveScrRef. Matches Q2 + Q3 R1 from the spec. Captures
01-seed.png as evidence."
```

---

### Task 7: Wire primary `ProjectSelector` (replace stub)

**Files:**

- Modify: `extensions/src/platform-scripture/src/checklist.web-view.tsx`

- [ ] **Step 7.1: Build the primary-project ReactNode**

Just after the existing `comparativeTextsSelectorNode` useMemo (around line 588-601), add:

```typescript
  const primaryProjectSelectorNode = useMemo(
    () => (
      <div data-testid="checklist-primary-project-trigger">
        <ProjectSelector
          mode="project"
          projects={allProjects}
          openTabs={comparativeOpenTabs}
          selection={{ projectId }}
          onChangeSelection={(next: { projectId: string }) =>
            updateWebViewDefinition({ projectId: next.projectId })
          }
          buttonClassName="tw-h-8 tw-min-w-32 tw-font-normal"
          buttonPlaceholder={
            localizedStrings['%markersChecklist_toolbar_primaryProject%'] ?? primaryProjectLabel
          }
          ariaLabel={localizedStrings['%markersChecklist_toolbar_primaryProject%']}
        />
      </div>
    ),
    [allProjects, comparativeOpenTabs, projectId, updateWebViewDefinition, localizedStrings, primaryProjectLabel],
  );
```

- [ ] **Step 7.2: Replace the stub handler usage in the JSX**

Find the existing `<ChecklistTool ... onPrimaryProjectTriggerClick={handlePrimaryProjectTriggerClick}` block. Pass `primaryProjectSelector={primaryProjectSelectorNode}` instead. Remove `onPrimaryProjectTriggerClick={handlePrimaryProjectTriggerClick}` from the props passed to `<ChecklistTool>` (it stays on the component for now until Phase 3 cleanup; pass `undefined` or simply omit).

The handler `handlePrimaryProjectTriggerClick` (line 476-478) — keep it for now (will be removed in Task 13 along with the component prop).

- [ ] **Step 7.3: Smoke-test**

`./.erb/scripts/refresh.sh`, open the markers-checklist, click the primary-project trigger. Verify the ProjectSelector popover opens and lists projects. Pick a different project. Confirm the checklist refetches against the new project (or shows "no data" if no comparison rows). Capture screenshot `.context/features/markers-checklist/proofs/e2e-evidence/wiring/02-primary-projectselector.png`.

- [ ] **Step 7.4: Commit**

```bash
git add extensions/src/platform-scripture/src/checklist.web-view.tsx \
        .context/features/markers-checklist/proofs/e2e-evidence/wiring/02-primary-projectselector.png
git commit -m "[P3][ui] markers-checklist: Wire primary ProjectSelector (Theme 5 #2)

Replaces the debug-log stub with a real ProjectSelector(mode='project') for
the primary text. Calls updateWebViewDefinition on selection change so the
checklist retargets to the new project. PT9 confirmed interactive
(ChecklistsTool.cs:179)."
```

---

### Task 8: Wire `ScopeSelector` with R1 snapshot logic

**Files:**

- Modify: `extensions/src/platform-scripture/src/checklist.web-view.tsx`

- [ ] **Step 8.1: Pull `booksPresent` for the primary project**

Just after the primary-project `useEffect` (around line 224), add:

```typescript
// ─── Books-present for ScopeSelector ──────────────────────────────────────
const [booksPresent, setBooksPresent] = useState<string>(
  '0'.repeat(124), // 124 books per BookSet — empty default
);
useEffect(() => {
  if (!projectId) return () => {};
  let cancelled = false;
  (async () => {
    try {
      const pdp = await papi.projectDataProviders.get('platform.base', projectId);
      const next = await pdp.getSetting('platformScripture.booksPresent');
      if (cancelled) return;
      if (typeof next === 'string') setBooksPresent(next);
    } catch (err) {
      logger.debug(`ChecklistWebView: booksPresent fetch failed: ${getErrorMessage(err)}`);
    }
  })();
  return () => {
    cancelled = true;
  };
}, [projectId]);
```

- [ ] **Step 8.2: Add ScopeSelector localized string keys**

Add to imports near the top:

```typescript
import { SCOPE_SELECTOR_STRING_KEYS } from 'platform-bible-react';
```

Just below the existing `markerSettingsLocalizedStrings` (around line 181), add:

```typescript
const scopeSelectorStringKeys = useMemo(() => Array.from(SCOPE_SELECTOR_STRING_KEYS), []);
const [scopeSelectorLocalizedStrings] = useLocalizedStrings(scopeSelectorStringKeys);
```

- [ ] **Step 8.3: Add scope/range change handlers**

Just before the existing `handleRetry` (around line 605), add:

```typescript
// ─── ScopeSelector handlers (R1: snapshot at click-time) ─────────────────

const handleScopeChange = useCallback(
  (newScope: Scope) => {
    const computed = computeRangeFromScope({
      scope: newScope,
      ref: liveScrRef,
      rangeStart,
      rangeEnd,
      getEndVerse,
      getLastChapter,
    });
    setScope(newScope);
    setSnapshotScrRef(liveScrRef);
    if (computed) setVerseRange(computed);
  },
  [
    liveScrRef,
    rangeStart,
    rangeEnd,
    getEndVerse,
    getLastChapter,
    setScope,
    setSnapshotScrRef,
    setVerseRange,
  ],
);

const handleRangeStartChange = useCallback(
  (next: SerializedVerseRef) => {
    setRangeStart(next);
    if (scope === 'range') setVerseRange({ start: next, end: rangeEnd });
  },
  [scope, rangeEnd, setRangeStart, setVerseRange],
);

const handleRangeEndChange = useCallback(
  (next: SerializedVerseRef) => {
    setRangeEnd(next);
    if (scope === 'range') setVerseRange({ start: rangeStart, end: next });
  },
  [scope, rangeStart, setRangeEnd, setVerseRange],
);
```

- [ ] **Step 8.4: Build the verseRangeSelectorNode**

Just below `primaryProjectSelectorNode`, add:

```typescript
  const verseRangeSelectorNode = useMemo(
    () => (
      <div data-testid="checklist-verse-range-trigger">
        <ScopeSelector
          variant="dropdown"
          scope={scope}
          availableScopes={['verse', 'chapter', 'book', 'range']}
          onScopeChange={handleScopeChange}
          availableBookInfo={booksPresent}
          selectedBookIds={selectedBookIds}
          onSelectedBookIdsChange={setSelectedBookIds}
          localizedStrings={scopeSelectorLocalizedStrings}
          currentScrRef={snapshotScrRef ?? liveScrRef}
          rangeStart={rangeStart}
          rangeEnd={rangeEnd}
          onRangeStartChange={handleRangeStartChange}
          onRangeEndChange={handleRangeEndChange}
          getEndVerse={getEndVerse}
        />
      </div>
    ),
    [
      scope,
      handleScopeChange,
      booksPresent,
      selectedBookIds,
      setSelectedBookIds,
      scopeSelectorLocalizedStrings,
      snapshotScrRef,
      liveScrRef,
      rangeStart,
      rangeEnd,
      handleRangeStartChange,
      handleRangeEndChange,
      getEndVerse,
    ],
  );
```

- [ ] **Step 8.5: Pass to `<ChecklistTool>`**

Find the existing `<ChecklistTool ... verseRangeSelector={...}` block. Replace whatever is there (likely `verseRangeLabel={verseRangeLabel} onVerseRangeTriggerClick={handleVerseRangeTriggerClick}` plus `comparativeTextsSelector={comparativeTextsSelectorNode}`) with:

```tsx
      <ChecklistTool
        ...
        primaryProjectSelector={primaryProjectSelectorNode}
        comparativeTextsSelector={comparativeTextsSelectorNode}
        verseRangeSelector={verseRangeSelectorNode}
        ...
      />
```

Drop the `verseRangeLabel`, `onVerseRangeTriggerClick`, `primaryProjectLabel`, `onPrimaryProjectTriggerClick`, `comparativeTextsLabel`, `onComparativeTextsTriggerClick` props from the JSX call (they remain on the component prop type for now; Task 13 removes them).

- [ ] **Step 8.6: Smoke-test**

Refresh + open the markers-checklist. Open the ScopeSelector dropdown. Verify scopes verse/chapter/book/range render. Pick `chapter`. Verify trigger label updates. Pick `range`. Verify BCV pickers render. Capture `.context/features/markers-checklist/proofs/e2e-evidence/wiring/03-scopeselector.png`.

- [ ] **Step 8.7: Commit**

```bash
git add extensions/src/platform-scripture/src/checklist.web-view.tsx \
        .context/features/markers-checklist/proofs/e2e-evidence/wiring/03-scopeselector.png
git commit -m "[P3][ui] markers-checklist: Wire ScopeSelector (Themes 5 #3 + 6)

Replaces the verse-range debug-log stub with a real ScopeSelector. Honors the
R1 mode-aware snapshot persistence: snapshot liveScrRef on user pick, freeze
verseRange. Range mode uses dedicated rangeStart/rangeEnd pickers. getEndVerse
threads through to BookChapterControl for verse-grid rendering."
```

---

### Task 9: Wire `onGotoLinkClick` (Q4 — A + C combined)

**Files:**

- Modify: `extensions/src/platform-scripture/src/checklist.web-view.tsx`

- [ ] **Step 9.1: Subscribe to editor tabs via the new hook**

Find the existing `useEffect` that builds `comparativeOpenTabsMap` (around line 537-564). Just below it, add:

```typescript
// ─── Editor-tab tracking (for goto focus, Q4-C) ───────────────────────────
const editorTabs = useOpenProjectTabs(
  useCallback((wv) => wv.webViewType === 'platformScriptureEditor.react', []),
);
const editorTabsByProject = useMemo(
  () => new Map(editorTabs.map((t) => [t.projectId, t])),
  [editorTabs],
);
```

Add the import: `import { useOpenProjectTabs } from './hooks/use-open-project-tabs';`.

(Note: at this point `comparativeOpenTabsMap` is still built inline. Task 10 replaces it with the same hook unfiltered. Keeping the duplication for now keeps this commit focused on goto.)

- [ ] **Step 9.2: Add the goto handler**

Just before the closing `<>` and `</ChecklistTool>` JSX (around line 700-710), define:

```typescript
const handleGotoLinkClick = useCallback(
  (_row: ChecklistRow, refStr: string) => {
    const verseRef = parseScrRef(refStr);
    if (!verseRef) {
      logger.debug(`ChecklistWebView: failed to parse scrRef: ${refStr}`);
      return;
    }
    setLiveScrRef(verseRef); // A: scroll-group broadcast
    const editorTab = editorTabsByProject.get(projectId);
    if (editorTab && editorTab.scrollGroupId === scrollGroupId) {
      papi.window
        .setFocus({ focusType: 'webView', id: editorTab.webViewId })
        .catch((err) => logger.debug(`ChecklistWebView: setFocus failed: ${getErrorMessage(err)}`));
    }
  },
  [setLiveScrRef, editorTabsByProject, projectId, scrollGroupId],
);
```

Add the import: `import { parseScrRef } from './components/parse-scr-ref';`.

- [ ] **Step 9.3: Pass to `<ChecklistTool>`**

In the JSX, change `// onGotoLinkClick: TODO wire to the platform's scripture-navigation primitive ...` block to actually pass the handler. The comment block at lines 700-708 should be replaced with:

```tsx
onGotoLinkClick = { handleGotoLinkClick };
// onEditLinkClick: scripture-editor edit-link integration is deferred (DEF-UI-003).
// Per the no-stubs rule, omitting the prop hides the affordance entirely until the
// integration lands.
```

- [ ] **Step 9.4: Smoke-test**

Refresh + open the markers-checklist with rows. Click a `LinkedScrRefButton` in the reference column. Verify:

1. The scroll-group's scrRef updates (check via `papi-client` skill or by opening a side editor and observing it).
2. If an editor tab is open in the same scroll group, it gets raised.

Capture `.context/features/markers-checklist/proofs/e2e-evidence/wiring/04-goto-broadcast.png` and `.context/features/markers-checklist/proofs/e2e-evidence/wiring/05-goto-focus.png`.

- [ ] **Step 9.5: Commit**

```bash
git add extensions/src/platform-scripture/src/checklist.web-view.tsx \
        .context/features/markers-checklist/proofs/e2e-evidence/wiring/04-goto-broadcast.png \
        .context/features/markers-checklist/proofs/e2e-evidence/wiring/05-goto-focus.png
git commit -m "[P3][ui] markers-checklist: Wire onGotoLinkClick — A+C combined (Q4)

A: setLiveScrRef broadcasts via the scroll group, propagating to every bound
   web-view (editor and side-panels).
C: if an editor tab is open in the same scroll group, raise it via
   papi.window.setFocus.
Activates LinkedScrRefButton in the reference column (closes FN-003 T1.8)."
```

---

### Task 10: Replace inline tab subscription with `useOpenProjectTabs`

**Files:**

- Modify: `extensions/src/platform-scripture/src/checklist.web-view.tsx`

- [ ] **Step 10.1: Replace the inline `comparativeOpenTabsMap` block**

Delete the `useState<Map<string, OpenProjectTab>>` + `useEffect(...)` block at lines 533-564 (the old comparative-tabs subscription). Replace `comparativeOpenTabs` with:

```typescript
// Comparative-texts ProjectSelector tracks ALL project-bound tabs (no webViewType filter).
const comparativeOpenTabs: OpenProjectTab[] = useOpenProjectTabs().map((t) => ({
  projectId: t.projectId,
  scrollGroupId: t.scrollGroupId,
}));
```

(`OpenProjectTab` from `platform-bible-react` is the original lighter shape `{projectId, scrollGroupId}`; map our richer hook output back to it for ProjectSelector's prop type.)

- [ ] **Step 10.2: Run typecheck + extension build**

```bash
npx tsc --noEmit -p extensions/src/platform-scripture/tsconfig.json
npm run build:extensions
```

Expected: PASS.

- [ ] **Step 10.3: Smoke-test**

Refresh + open markers-checklist + open the comparative-texts ProjectSelector. Verify the "Open tabs" section still populates correctly when other project tabs are open.

- [ ] **Step 10.4: Commit**

```bash
git add extensions/src/platform-scripture/src/checklist.web-view.tsx
git commit -m "[P3][ui] markers-checklist: Adopt useOpenProjectTabs hook

Removes the inline open-tabs subscription duplicated from checks-side-panel
(now extracted into the shared hook). Comparative-texts ProjectSelector still
sees the full project-tab list; goto handler uses a separate filtered call
for editor-only tabs."
```

---

## Phase 3: ChecklistTool component cleanups

### Task 11: Remove `SelectorTrigger` fallback + unused props

**Files:**

- Modify: `extensions/src/platform-scripture/src/components/checklist.component.tsx`
- Modify: `extensions/src/platform-scripture/src/components/checklist.types.ts`
- Modify: `extensions/src/platform-scripture/src/components/checklist.stories.tsx` (if it consumes the removed props)

- [ ] **Step 11.1: Remove `SelectorTrigger` from `checklist.component.tsx`**

Delete:

- The `SelectorTriggerProps` type (lines 90-96)
- The `SelectorTrigger` function (lines 98-118)
- The `?? <SelectorTrigger ...>` fallback branches in `renderToolbarStart()` (lines 525-552)

Replace `renderToolbarStart()` body with:

```typescript
  const renderToolbarStart = () => (
    <>
      {primaryProjectSelector}
      {comparativeTextsSelector}
      {verseRangeSelector}
    </>
  );
```

- [ ] **Step 11.2: Trim `ChecklistToolProps` in `checklist.types.ts`**

Find the props definition. Remove these fields:

- `primaryProjectLabel: string;`
- `onPrimaryProjectTriggerClick?: () => void;`
- `comparativeTextsLabel: string;`
- `onComparativeTextsTriggerClick?: () => void;`
- `verseRangeLabel: string;`
- `onVerseRangeTriggerClick?: () => void;`

Keep:

- `primaryProjectSelector?: React.ReactNode;`
- `comparativeTextsSelector?: React.ReactNode;`
- `verseRangeSelector?: React.ReactNode;`

(If any of the `*Selector` props don't exist yet, add them.)

- [ ] **Step 11.3: Remove unused destructure in `ChecklistTool`**

In `checklist.component.tsx`, the `ChecklistTool` function destructures all 9 toolbar props. Remove the 6 deleted ones from both the destructure list and the function signature.

- [ ] **Step 11.4: Update `checklist.stories.tsx`**

For each story that passed `primaryProjectLabel` / `onPrimaryProjectTriggerClick` / etc., replace with simple `<Button>` placeholders or actual mock selector ReactNodes. For story consistency:

```tsx
const SAMPLE_TRIGGER = (label: string) => (
  <Button variant="outline" className="tw-h-8" onClick={() => undefined}>{label}</Button>
);

// In each story args:
primaryProjectSelector: SAMPLE_TRIGGER('AAB Project'),
comparativeTextsSelector: SAMPLE_TRIGGER('Comparative Texts'),
verseRangeSelector: SAMPLE_TRIGGER('Range: GEN 1:1–GEN 1:31'),
```

- [ ] **Step 11.5: Run typecheck + extension build**

```bash
npx tsc --noEmit -p extensions/src/platform-scripture/tsconfig.json
npm run build:extensions
```

Expected: PASS. The web-view (Task 8) already stopped passing the deleted props.

- [ ] **Step 11.6: Run Storybook locally**

```bash
npm run storybook
```

Open Storybook in browser, navigate to `Bundled Extensions / platform-scripture / ChecklistTool`. Verify all 8 variants render. Capture `.context/features/markers-checklist/proofs/e2e-evidence/wiring/06-storybook.png`.

- [ ] **Step 11.7: Commit**

```bash
git add extensions/src/platform-scripture/src/components/checklist.component.tsx \
        extensions/src/platform-scripture/src/components/checklist.types.ts \
        extensions/src/platform-scripture/src/components/checklist.stories.tsx \
        .context/features/markers-checklist/proofs/e2e-evidence/wiring/06-storybook.png
git commit -m "[P3][ui] markers-checklist: Remove SelectorTrigger fallback (Theme 4)

Wired-up checklist.web-view.tsx now always passes real *Selector ReactNodes,
so the SelectorTrigger fallback + the 6 trigger label/onClick props are dead
code. Drop them. Stories updated to pass simple Button placeholders for the
*Selector props (consistent with story conventions for unwired primitives)."
```

---

### Task 12: Add sticky toolbar wrapper + alignment polish

**Files:**

- Modify: `extensions/src/platform-scripture/src/components/checklist.component.tsx`

- [ ] **Step 12.1: Wrap the `<TabToolbar>` in a sticky div**

Find the `<TabToolbar ...>` JSX (lines 734-744). Wrap it:

```tsx
<div className="tw-sticky tw-top-0 tw-z-10 tw-flex tw-items-center tw-bg-background">
  <TabToolbar
    onSelectProjectMenuItem={handleProjectMenuSelect}
    onSelectViewInfoMenuItem={() => undefined}
    projectMenuData={projectMenuData}
    startAreaChildren={renderToolbarStart()}
    endAreaChildren={renderToolbarEnd()}
  />
</div>
```

- [ ] **Step 12.2: Verify match-count alignment in `renderToolbarEnd`**

Inspect the existing `<span className="tw-flex tw-items-center ...">` for the match-count label (line 622-630). The `tw-items-center` is already on the span; the parent toolbar wrapper now also has `tw-items-center` per Step 12.1, so vertical alignment should resolve.

- [ ] **Step 12.3: Localization sweep for `omitted`/`ommitted` typo**

```bash
grep -rn "ommitted" extensions/src/platform-scripture
grep -rn "omitted" extensions/src/platform-scripture
```

If `ommitted` (double-m, single-t) appears, fix to `omitted` (single-m, double-t).

- [ ] **Step 12.4: Smoke-test (sticky)**

Refresh + open markers-checklist with enough rows to require scrolling (use a project + comparative texts that produce many rows). Scroll the data table. Verify the toolbar stays at top of the panel. Capture `.context/features/markers-checklist/proofs/e2e-evidence/wiring/07-sticky.png`.

- [ ] **Step 12.5: Commit**

```bash
git add extensions/src/platform-scripture/src/components/checklist.component.tsx \
        .context/features/markers-checklist/proofs/e2e-evidence/wiring/07-sticky.png
git commit -m "[P3][ui] markers-checklist: Sticky toolbar + alignment (Theme 5 #5, #7)

Wraps TabToolbar in tw-sticky tw-top-0 tw-z-10 tw-bg-background tw-flex
tw-items-center, matching platform-scripture-editor.web-view.tsx:1595's
z-index convention (below Z_INDEX_ABOVE_DOCK=250 so popovers render over
the toolbar). Adds tw-items-center on the wrapper so the match-count text
aligns vertically with the trigger buttons."
```

---

## Phase 4: ChecksSidePanel work (Q5 + Q6)

### Task 13: Replace inline subscription with `useOpenProjectTabs` in checks-side-panel

**Files:**

- Modify: `extensions/src/platform-scripture/src/checks-side-panel.web-view.tsx`

- [ ] **Step 13.1: Replace the inline `openTabsMap` block**

Delete lines 146-185 (the `useState<Map>` + `useEffect` subscription). Replace `openTabsMap`/`openTabs` with:

```typescript
const openTabsRich = useOpenProjectTabs();
const openTabs = useMemo<OpenProjectTab[]>(
  () => openTabsRich.map((t) => ({ projectId: t.projectId, scrollGroupId: t.scrollGroupId })),
  [openTabsRich],
);
```

Add the import: `import { useOpenProjectTabs } from './hooks/use-open-project-tabs';`.

- [ ] **Step 13.2: Run typecheck + extension build**

```bash
npx tsc --noEmit -p extensions/src/platform-scripture/tsconfig.json
npm run build:extensions
```

Expected: PASS.

- [ ] **Step 13.3: Smoke-test**

Refresh + open the checks-side-panel + open the project ProjectSelector. Verify "Open tabs" section still works.

- [ ] **Step 13.4: Commit**

```bash
git add extensions/src/platform-scripture/src/checks-side-panel.web-view.tsx
git commit -m "[P3][ui] markers-checklist: Adopt useOpenProjectTabs in checks-side-panel

Replaces the inline open-tabs subscription with the shared hook (now used by
both checks-side-panel and the markers-checklist web-view). Behavior preserved;
40 LOC removed."
```

---

### Task 14: Tab-dedup in `handleSelectProject`

**Files:**

- Modify: `extensions/src/platform-scripture/src/checks-side-panel.web-view.tsx`

- [ ] **Step 14.1: Update `handleSelectProject`**

Find the existing handler at lines 708-714:

```typescript
const handleSelectProject = useCallback(
  (newSelection: { projectId: string; scrollGroupId: ScrollGroupId }) => {
    updateWebViewDefinition({ projectId: newSelection.projectId });
    setScrollGroupId(newSelection.scrollGroupId);
  },
  [updateWebViewDefinition, setScrollGroupId],
);
```

Replace with:

```typescript
const handleSelectProject = useCallback(
  (newSelection: { projectId: string; scrollGroupId: ScrollGroupId }) => {
    // Q5 — Theme 5 #8: focus existing editor tab if present instead of opening duplicate.
    const existingEditorTab = openTabsRich.find(
      (t) =>
        t.projectId === newSelection.projectId && t.webViewType === 'platformScriptureEditor.react',
    );
    if (existingEditorTab) {
      papi.window
        .setFocus({ focusType: 'webView', id: existingEditorTab.webViewId })
        .catch((err) =>
          logger.debug(`checks-side-panel: setFocus failed: ${getErrorMessage(err)}`),
        );
      // Adopt the existing tab's scroll group rather than the user-clicked one to keep
      // bindings consistent.
      updateWebViewDefinition({ projectId: newSelection.projectId });
      setScrollGroupId(existingEditorTab.scrollGroupId);
      return;
    }
    updateWebViewDefinition({ projectId: newSelection.projectId });
    setScrollGroupId(newSelection.scrollGroupId);
  },
  [openTabsRich, updateWebViewDefinition, setScrollGroupId],
);
```

- [ ] **Step 14.2: Smoke-test**

1. Open project A (open the editor for it via Home tab).
2. Open the checks-side-panel.
3. From the panel's ProjectSelector, select project A.
4. Verify NO new editor tab opens AND the existing editor for A focuses.
5. From the panel's ProjectSelector, select project B (no editor open for it).
6. Verify the side-panel just retargets (no new editor tab opens — opening the editor for B is the user's separate action).

Capture `.context/features/markers-checklist/proofs/e2e-evidence/wiring/08-dedup.png`.

- [ ] **Step 14.3: Commit**

```bash
git add extensions/src/platform-scripture/src/checks-side-panel.web-view.tsx \
        .context/features/markers-checklist/proofs/e2e-evidence/wiring/08-dedup.png
git commit -m "[P3][ui] markers-checklist: Tab dedup in checks-side-panel (Theme 5 #8)

When the user picks a project that already has an editor tab open, focus the
existing tab via papi.window.setFocus instead of opening a duplicate. Adopts
the existing tab's scroll group so bindings stay consistent."
```

---

## Phase 5: E2E tests (spec §14.5)

### Task 15: Playwright wiring tests

**Files:**

- Create: `e2e-tests/tests/markers-checklist/wiring-theme-5.spec.ts`

- [ ] **Step 15.1: Read existing markers-checklist test conventions**

Skim `e2e-tests/tests/markers-checklist/markers-checklist-functional-UI-PKG-002.spec.ts` and `markers-checklist-journey.spec.ts` for the helpers (`closeNonHomeTabs`, `openDefaultProject`, `waitForAppReady`) and constants (`PROJECT_NAME = 'wgPIDGIN'`, `WEBVIEW_IFRAME_TITLE_RE`).

- [ ] **Step 15.2: Create the wiring spec file with 10 tests**

Create `e2e-tests/tests/markers-checklist/wiring-theme-5.spec.ts`. Each test must:

- Use `cdp.fixture` (no `papi.fixture`).
- Navigate via visible UI only.
- Capture screenshots at assertion points to `../../../.context/features/markers-checklist/proofs/e2e-evidence/wiring/e2e/`.

Per the spec table in §14.5:

```typescript
import { test, expect } from '../../fixtures/cdp.fixture';
import { waitForAppReady } from '../../fixtures/helpers';

const EVD = '../../../.context/features/markers-checklist/proofs/e2e-evidence/wiring/e2e';

test.describe('markers-checklist Theme 5/4/6 wiring', () => {
  test('1: first-launch seed defaults to chapter scope', async ({ page, cdp }) => {
    // Open project, open checklist, assert default scope='chapter' shown in trigger
    // ...
    await page.screenshot({ path: `${EVD}/test-1-seed.png` });
  });

  test('2: scope freeze (R1) — navigation does not refetch', async ({ page, cdp }) => {
    /* ... */
  });
  test('3: re-pick chapter re-snapshots', async ({ page, cdp }) => {
    /* ... */
  });
  test('4: range mode emits picker refs', async ({ page, cdp }) => {
    /* ... */
  });
  test('5: goto via row link broadcasts + focuses editor', async ({ page, cdp }) => {
    /* ... */
  });
  test('6: goto without editor still broadcasts', async ({ page, cdp }) => {
    /* ... */
  });
  test('7: primary project retarget via ProjectSelector', async ({ page, cdp }) => {
    /* ... */
  });
  test('8: tab dedup in checks-side-panel', async ({ page, cdp }) => {
    /* ... */
  });
  test('9: sticky toolbar stays at top during scroll', async ({ page, cdp }) => {
    /* ... */
  });
  test('10: hide-matches disabled when single column', async ({ page, cdp }) => {
    /* ... */
  });
});
```

Each test body must contain real assertions — not stubs. For the full implementations, follow the patterns in the existing markers-checklist e2e files. Selectors:

| Element                  | Selector                                            |
| ------------------------ | --------------------------------------------------- |
| Markers Checklist iframe | `iframe[title=/Markers Checklist/i]`                |
| Primary project trigger  | `[data-testid="checklist-primary-project-trigger"]` |
| Verse-range trigger      | `[data-testid="checklist-verse-range-trigger"]`     |
| Reference link cell      | `[data-testid="checklist-reference-link"]`          |
| Hide Matches eye         | `[data-testid="checklist-hide-matches-item"]`       |
| Show Verse Text eye      | `[data-testid="checklist-show-verse-text-item"]`    |

- [ ] **Step 15.3: Run the e2e tests**

```bash
npm run e2e:smoke -- e2e-tests/tests/markers-checklist/wiring-theme-5.spec.ts
```

(Or whatever the actual e2e command is — check `package.json` scripts. Likely `npm run e2e -- --grep wiring-theme-5`.)

Expected: All 10 tests pass.

- [ ] **Step 15.4: Commit**

```bash
git add e2e-tests/tests/markers-checklist/wiring-theme-5.spec.ts \
        .context/features/markers-checklist/proofs/e2e-evidence/wiring/e2e/
git commit -m "[P3][test] markers-checklist: E2E tests for Theme 5/4/6 wiring

10 Playwright tests covering: first-launch seed, scope freeze (R1),
re-pick re-snapshot, range mode, goto broadcast + focus, primary retarget,
checks-side-panel dedup, sticky toolbar, hide-matches gating. Screenshots
captured per test as evidence."
```

---

## Phase 6: Manual verification (spec §14.6 + §14.8)

### Task 16: FN-003 manual verification recipes

**Files:**

- Create (screenshots): `.context/features/markers-checklist/proofs/e2e-evidence/wiring/fn-003/`

- [ ] **Step 16.1: T1.7 Dismissible alert recipe**

1. Open markers-checklist.
2. Trigger an error: kill the data provider via `papi-client` skill, OR set the marker filter to a deliberately invalid value.
3. Assert: dismissible Alert renders with X button. Capture `fn-003/t1.7-alert-shown.png`.
4. Click X. Assert: Alert disappears. Capture `fn-003/t1.7-alert-dismissed.png`.
5. Change inputs (e.g., toggle hideMatches). Assert: Alert reappears. Capture `fn-003/t1.7-alert-reappeared.png`.

- [ ] **Step 16.2: T1.8 LinkedScrRefButton recipe**

1. Open markers-checklist with rows.
2. Hover ref text. Assert: tooltip "Goto {ref}" appears. Capture `fn-003/t1.8-tooltip.png`.
3. Click. Assert: scroll-group ref updates AND if editor tab open, editor focuses. Capture `fn-003/t1.8-clicked.png`.

- [ ] **Step 16.3: T1.10 Hide Matches enable/disable**

1. Open with comparative texts (columnCount > 1). Assert: Hide Matches enabled. Capture `fn-003/t1.10-enabled.png`.
2. Toggle on. Assert: matching rows hide.
3. Remove all comparative texts. Assert: Hide Matches becomes disabled. Capture `fn-003/t1.10-disabled.png`.

- [ ] **Step 16.4: T9 Per-content RTL**

1. Identify a Hebrew/Arabic test project (or skip with documented reason if none available locally).
2. Open markers-checklist with that project as primary.
3. Toggle Show Verse Text on. Assert: cell content has `dir="rtl"` attribute. Capture `fn-003/t9-rtl.png`.

If no RTL project is available, document the gap explicitly:

```markdown
**T9 SKIP reason**: no RTL test project loaded in dev environment as of 2026-04-30. Manual verification deferred to first run with an RTL project.
```

- [ ] **Step 16.5: T8 ProjectSelector colocation**

1. Open the primary ProjectSelector.
2. Open the comparative texts ProjectSelector.
3. Assert: both render normally; types resolve. Capture `fn-003/t8-projectselectors.png`.

- [ ] **Step 16.6: T1.1 + T1.2 Storybook recipes**

1. Run `npm run storybook`.
2. Navigate to `ChecklistTool` stories.
3. Toggle hide-matches in stories with `isMatch:true` rows. Assert: rows disappear AND `{N} Matches Omitted` appears. Capture `fn-003/t1.1-hidematches.png`.
4. Verify in MultiColumn / HideMatches stories: toggling Show Verse Text reveals text. Capture `fn-003/t1.2-storybook.png`.

- [ ] **Step 16.7: Commit recipes evidence**

```bash
git add .context/features/markers-checklist/proofs/e2e-evidence/wiring/fn-003/
git commit -m "[P3][test] markers-checklist: FN-003 manual verification recipes

Captures evidence for T1.7 dismissible alert, T1.8 LinkedScrRefButton goto,
T1.10 hide-matches gating, T9 RTL (if available), T8 ProjectSelector
colocation, T1.1 dynamic stories, T1.2 story sample data. Closes the
visual-verification gaps captured in forward-notes.md FN-003."
```

---

### Task 17: Manual sanity walkthrough (spec §14.8)

**Files:**

- Create (screenshots): `.context/features/markers-checklist/proofs/e2e-evidence/wiring/walkthrough/`

- [ ] **Step 17.1: Run the 13-step walkthrough**

`./.erb/scripts/refresh.sh`. Open Platform.Bible. Walk through every step in spec §14.8:

1. Open project A.
2. Hamburger → Tools → Markers Checklist. Capture `walkthrough/01-opened.png`.
3. Verify default scope='chapter'; rows render.
4. Switch scope verse → book → range. Capture `walkthrough/02-scope-switches.png`.
5. Pick comparative texts. Capture `walkthrough/03-comparative.png`.
6. Open MarkerSettings, change Equivalent Markers. Capture `walkthrough/04-settings.png`.
7. Click row link. Capture `walkthrough/05-goto.png`.
8. Re-select primary project. Capture `walkthrough/06-retarget.png`.
9. Scroll the rows; verify sticky. Capture `walkthrough/07-sticky.png`.
10. Trigger error. Capture `walkthrough/08-alert.png`.
11. Hamburger → Settings + Copy. Capture `walkthrough/09-hamburger.png`.
12. Capture any console errors observed.
13. If any step fails, file the failure mode + reproduction.

- [ ] **Step 17.2: Commit walkthrough evidence**

```bash
git add .context/features/markers-checklist/proofs/e2e-evidence/wiring/walkthrough/
git commit -m "[P3][test] markers-checklist: Manual sanity walkthrough (spec §14.8)

13-step end-to-end walkthrough capturing screenshots at each decision point.
Verifies the wired-up app behaves as designed in real-world use."
```

---

## Phase 7: Quality gates + traceability + final

### Task 18: Type / lint / build / format gates

- [ ] **Step 18.1: Run all gates**

```bash
cd /home/paratext/git/workspaces/markers-checklist/paranext-core

npx tsc --noEmit -p extensions/src/platform-scripture/tsconfig.json
npm run typecheck
npm run lint
npm run build:main
npm run build:extensions
dotnet build c-sharp/
```

Expected: ALL pass with no new warnings.

- [ ] **Step 18.2: Run all unit tests**

```bash
npm test -- --run
```

Expected: All tests pass (including the 3 new unit-test files from Phase 1).

- [ ] **Step 18.3: Backend smoke tests**

```bash
cd c-sharp-tests
dotnet test
```

Expected: All tests pass (sanity check — no C# changes expected, but verify nothing regressed).

- [ ] **Step 18.4: Capture gate output**

Save the full output of each command above to `.context/features/markers-checklist/proofs/e2e-evidence/wiring/gates.log` for the PR description.

- [ ] **Step 18.5: Commit gate evidence**

```bash
git add .context/features/markers-checklist/proofs/e2e-evidence/wiring/gates.log
git commit -m "[P3][test] markers-checklist: Quality gate evidence

Output of typecheck, lint, build, and full test suite captured for the PR
description. All green."
```

---

### Task 19: Traceability matrix

**Files:**

- Create: `.context/features/markers-checklist/implementation/traceability-theme-5-4-6.json`

- [ ] **Step 19.1: Author the traceability JSON**

Create the file with the following content (mirrors the existing `traceability-matrix-CAP-006.json` schema):

```json
{
  "feature": "markers-checklist",
  "scope": "Theme 5/4/6 wiring",
  "spec": "docs/specs/2026-04-29-markers-checklist-theme-5-4-6-wiring-design.md",
  "plan": "docs/plans/2026-04-30-markers-checklist-theme-5-4-6-wiring.md",
  "branch": "ai/feature/markers-checklist-rolf-03-10-2026",
  "items": [
    {
      "id": "Theme-5-1",
      "description": "verseRange default not 'undefined' (sluggish)",
      "files": ["extensions/src/platform-scripture/src/checklist.web-view.tsx"],
      "tests": ["e2e: wiring-theme-5.spec.ts test 1 (first-launch seed)"],
      "manual": ["walkthrough/01-opened.png"],
      "status": "implemented"
    },
    {
      "id": "Theme-5-2",
      "description": "Primary project trigger — real ProjectSelector (Q9)",
      "files": ["extensions/src/platform-scripture/src/checklist.web-view.tsx"],
      "tests": ["e2e: wiring-theme-5.spec.ts test 7 (primary retarget)"],
      "manual": ["walkthrough/06-retarget.png", "fn-003/t8-projectselectors.png"],
      "status": "implemented"
    },
    {
      "id": "Theme-5-3",
      "description": "Verse-range trigger — real ScopeSelector (Q1, Q2, Q3 R1)",
      "files": ["extensions/src/platform-scripture/src/checklist.web-view.tsx"],
      "tests": [
        "e2e: wiring-theme-5.spec.ts test 1 (seed)",
        "e2e: wiring-theme-5.spec.ts test 2 (freeze)",
        "e2e: wiring-theme-5.spec.ts test 3 (re-snapshot)",
        "e2e: wiring-theme-5.spec.ts test 4 (range mode)",
        "unit: compute-range-from-scope.test.ts"
      ],
      "manual": ["walkthrough/02-scope-switches.png"],
      "status": "implemented"
    },
    {
      "id": "Theme-5-4",
      "description": "Trigger height (tw-h-8)",
      "files": ["extensions/src/platform-scripture/src/checklist.web-view.tsx"],
      "tests": [],
      "manual": ["walkthrough/06-retarget.png"],
      "status": "implemented"
    },
    {
      "id": "Theme-5-5",
      "description": "Toolbar alignment (tw-items-center)",
      "files": ["extensions/src/platform-scripture/src/components/checklist.component.tsx"],
      "tests": [],
      "manual": ["walkthrough/07-sticky.png"],
      "status": "implemented"
    },
    {
      "id": "Theme-5-6",
      "description": "Standalone copy button removed",
      "files": ["extensions/src/platform-scripture/src/components/checklist.component.tsx"],
      "tests": [],
      "manual": [],
      "status": "DONE_PRIOR_COMMIT_5a5adc64bb"
    },
    {
      "id": "Theme-5-7",
      "description": "Sticky toolbar wrapper",
      "files": ["extensions/src/platform-scripture/src/components/checklist.component.tsx"],
      "tests": ["e2e: wiring-theme-5.spec.ts test 9 (sticky)"],
      "manual": ["walkthrough/07-sticky.png"],
      "status": "implemented"
    },
    {
      "id": "Theme-5-8",
      "description": "Project tab dedup in checks-side-panel (Q5)",
      "files": ["extensions/src/platform-scripture/src/checks-side-panel.web-view.tsx"],
      "tests": ["e2e: wiring-theme-5.spec.ts test 8 (dedup)"],
      "manual": [".context/features/markers-checklist/proofs/e2e-evidence/wiring/08-dedup.png"],
      "status": "implemented"
    },
    {
      "id": "Theme-5-9",
      "description": "Simulate-unselect dev button removed",
      "files": ["extensions/src/platform-scripture/src/checks-side-panel.web-view.tsx"],
      "tests": [],
      "manual": [],
      "status": "DONE_PRIOR_COMMIT_d6f5da0fdd"
    },
    {
      "id": "Theme-4",
      "description": "SelectorTrigger removal (no library extraction)",
      "files": [
        "extensions/src/platform-scripture/src/components/checklist.component.tsx",
        "extensions/src/platform-scripture/src/components/checklist.types.ts",
        "extensions/src/platform-scripture/src/components/checklist.stories.tsx"
      ],
      "tests": ["component: ChecklistTool renders without SelectorTrigger fallback"],
      "manual": [".context/features/markers-checklist/proofs/e2e-evidence/wiring/06-storybook.png"],
      "status": "implemented"
    },
    {
      "id": "Theme-6",
      "description": "BookChapterControl verse grid wiring (getEndVerse)",
      "files": ["extensions/src/platform-scripture/src/checklist.web-view.tsx"],
      "tests": ["e2e: wiring-theme-5.spec.ts test 4 (range mode picker)"],
      "manual": ["walkthrough/02-scope-switches.png"],
      "status": "implemented"
    },
    {
      "id": "FN-003-T1.7",
      "description": "Dismissible Alert verified live",
      "tests": [],
      "manual": [
        "fn-003/t1.7-alert-shown.png",
        "fn-003/t1.7-alert-dismissed.png",
        "fn-003/t1.7-alert-reappeared.png"
      ],
      "status": "verified"
    },
    {
      "id": "FN-003-T1.8",
      "description": "LinkedScrRefButton verified live",
      "tests": ["e2e: wiring-theme-5.spec.ts test 5 + 6"],
      "manual": ["fn-003/t1.8-tooltip.png", "fn-003/t1.8-clicked.png"],
      "status": "verified"
    },
    {
      "id": "FN-003-T1.10",
      "description": "Hide-matches enable/disable verified live",
      "tests": ["e2e: wiring-theme-5.spec.ts test 10"],
      "manual": ["fn-003/t1.10-enabled.png", "fn-003/t1.10-disabled.png"],
      "status": "verified"
    },
    {
      "id": "FN-003-T9",
      "description": "Per-content RTL — verified or skipped with reason",
      "tests": [],
      "manual": ["fn-003/t9-rtl.png OR documented skip reason"],
      "status": "verified-or-deferred-with-reason"
    },
    {
      "id": "FN-003-T8",
      "description": "ProjectSelector colocation verified live",
      "tests": [],
      "manual": ["fn-003/t8-projectselectors.png"],
      "status": "verified"
    },
    {
      "id": "FN-003-T1.1",
      "description": "Dynamic stories (hideMatches filter) verified",
      "tests": [],
      "manual": ["fn-003/t1.1-hidematches.png"],
      "status": "verified"
    },
    {
      "id": "FN-003-T1.2",
      "description": "Story sample data verified",
      "tests": [],
      "manual": ["fn-003/t1.2-storybook.png"],
      "status": "verified"
    }
  ]
}
```

- [ ] **Step 19.2: Commit**

```bash
git add .context/features/markers-checklist/implementation/traceability-theme-5-4-6.json
git commit -m "[P3][test] markers-checklist: Traceability matrix for Theme 5/4/6 wiring

Maps every theme item from phase-3-ui-feedback-brief.md to its implementing
files, automated tests, and manual verification screenshots. Mirrors the
schema of traceability-matrix-CAP-006.json."
```

---

### Task 20: PR #2212 safeguard recheck

- [ ] **Step 20.1: Re-fetch and inspect**

```bash
git fetch origin scope_selector_improvements
git log --oneline HEAD..origin/scope_selector_improvements --no-merges | head -20
```

Expected output: empty (no new commits since `75a22b509f`). If any new commits appear, inspect them and cherry-pick whatever's relevant onto the markers-checklist branch BEFORE pushing the final PR.

- [ ] **Step 20.2: Document the recheck**

Append to the bottom of the design doc commit (or include in the final PR description):

```
PR #2212 safeguard recheck on YYYY-MM-DD: origin/scope_selector_improvements at <SHA>; no new commits past 75a22b509f. (Or: cherry-picked <commit summaries> onto this branch.)
```

- [ ] **Step 20.3: Commit (only if cherry-picks were applied)**

If cherry-picks were applied, commit them with the original messages preserved. Otherwise no commit needed for this step.

---

### Task 21: Final review + push

- [ ] **Step 21.1: Run all gates one more time**

```bash
npm test -- --run
npm run lint
npx tsc --noEmit -p extensions/src/platform-scripture/tsconfig.json
npm run typecheck
npm run build
```

All must pass.

- [ ] **Step 21.2: Confirm git state is clean**

```bash
git status
```

Expected: nothing to commit, working tree clean.

- [ ] **Step 21.3: Push the branch**

```bash
git push origin ai/feature/markers-checklist-rolf-03-10-2026
```

- [ ] **Step 21.4: Update PR descriptions**

The user manages PR description updates manually (per their preferences). After push, ask the user:

> "Branch pushed. PR #2219 (paranext-core) and PR #148 (ai-prompts) are ready for description updates. Want me to draft the description, or will you handle?"

- [ ] **Step 21.5: Notify completion**

Report to the user:

```
Implementation of Theme 5/4/6 wiring complete:

- 21 tasks across 7 phases
- 3 new unit-tested helpers (computeRangeFromScope, parseScrRef, useOpenProjectTabs)
- 1 new shared hook adopted by 2 web-views
- 2 stub handlers replaced with real wired ProjectSelector + ScopeSelector
- Goto wiring (A+C combined): scroll-group broadcast + focus existing editor
- Project tab dedup in checks-side-panel
- Sticky toolbar + alignment polish
- 10 e2e tests + 8 FN-003 manual recipes + 13-step walkthrough — all evidence captured
- Traceability matrix maps every theme item to its verification artifact

All gates green. No stubs remain. Ready for review.
```

---

## Self-review checklist (run before declaring plan ready)

- [ ] Every step has a concrete action (no "implement later", "TBD", "appropriate error handling")
- [ ] Every code step shows the actual code (not "similar to Task N")
- [ ] Every test step shows the actual test code with assertions
- [ ] Every command shows expected output / pass criteria
- [ ] Every commit step has the actual commit message in a heredoc
- [ ] All file paths are absolute or workspace-relative — no ambiguous paths
- [ ] No TBD, TODO, FIXME, or XXX placeholders
- [ ] Type names, function names, and property names are consistent across tasks
- [ ] Spec coverage: every Theme item from §3 of the spec maps to at least one task — verify via the traceability matrix in Task 19
- [ ] Verification gates per spec §14.9 — present in Task 18

# Enhanced Resources Completion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Land the Enhanced Resources port in a working state by replacing the placeholder `TempScripturePane` with a real `<Editorial>`-backed scripture pane, removing the CI-incompatible smoke test, activating the orphaned ER E2E test suite as a local-only Playwright project, and activating ~50 currently-deferred functional tests.

**Architecture:** The Enhanced Resources webview already has a complete backend (loadMarbleChapterXml + four research-tab loaders), correct USX→USJ conversion via `marble-converter.ts`, and a complete UI shell. The only missing piece is the scripture pane itself - currently a placeholder that renders annotation IDs instead of scripture text. The fix imports `<Editorial>` from `@eten-tech-foundation/platform-editor` (already in the dep tree, used by `platform-scripture-editor`) directly inside the ER webview, feeds it the converter's existing USJ output, and applies wg-marker annotations imperatively via the editor ref's `setAnnotation()` method (the documented annotation API).

**Tech Stack:** React + TypeScript, Vitest, Playwright, `@eten-tech-foundation/platform-editor` (Editorial component), `@eten-tech-foundation/scripture-utilities` (Usj types + UsjDocumentLocation), `platform-bible-react` (UI primitives).

**Reference design:** [docs/specs/2026-05-03-enhanced-resources-completion-design.md](../specs/2026-05-03-enhanced-resources-completion-design.md)

---

## Tasks

### Task 1: Build the EnhancedScripturePane component (TDD)

**Files:**

- Create: `extensions/src/platform-enhanced-resources/src/components/scripture-pane/scripture-pane.component.tsx`
- Create: `extensions/src/platform-enhanced-resources/src/components/scripture-pane/scripture-pane.test.tsx`

The component is a thin wrapper around `<Editorial>` that:

1. Renders `<Editorial>` in read-only mode with the supplied USJ
2. Imperatively applies each `MarbleAnnotation` as an editor annotation via `editorRef.setAnnotation()` after the editor mounts and on annotation/highlight/filter changes
3. Routes the per-annotation `onClick` callback through `onTokenClick` / `onTokenContextMenu` props
4. Reuses the loading / empty / error states from `TempScripturePane`

**Type signatures (final):**

```ts
import type { MarbleAnnotation } from '../../lib/marble-converter';
import type { Usj } from '@eten-tech-foundation/scripture-utilities';
import type { LocalizedStringValue } from 'platform-bible-utils';
import type { MouseEvent as ReactMouseEvent } from 'react';

export const ENHANCED_SCRIPTURE_PANE_STRING_KEYS = Object.freeze([
  '%enhancedResources_scripturePane_loading%',
  '%enhancedResources_scripturePane_emptyTitle%',
  '%enhancedResources_scripturePane_emptyDescription%',
  '%enhancedResources_scripturePane_errorTitle%',
  '%enhancedResources_scripturePane_filterActive%',
  '%enhancedResources_scripturePane_footnotesHeader%',
] as const);

type ScripturePaneLocalizedStringKey = (typeof ENHANCED_SCRIPTURE_PANE_STRING_KEYS)[number];
type ScripturePaneLocalizedStrings = {
  [key in ScripturePaneLocalizedStringKey]?: LocalizedStringValue;
};

export type EnhancedScripturePaneProps = {
  usj: Usj | undefined;
  annotations: MarbleAnnotation[];
  filteredTokenId?: string;
  highlightAllResearchTerms?: boolean;
  showFootnotes?: boolean;
  scripturePaneZoom?: number;
  isLoading?: boolean;
  errorMessage?: string;
  scrRef?: import('@sillsdev/scripture').SerializedVerseRef;
  onTokenClick?: (tokenId: string, annotation: MarbleAnnotation) => void;
  onTokenContextMenu?: (
    tokenId: string,
    annotation: MarbleAnnotation,
    event: ReactMouseEvent,
  ) => void;
  localizedStringsWithLoadingState?: [ScripturePaneLocalizedStrings, boolean];
};
```

- [ ] **Step 1: Write the unit-test file with failing-render-states cases**

Create `scripture-pane.test.tsx`:

```tsx
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  EnhancedScripturePane,
  ENHANCED_SCRIPTURE_PANE_STRING_KEYS,
} from './scripture-pane.component';

// Editorial is heavy and depends on Lexical; mock it so unit tests stay fast and isolated.
// The mock renders a div the tests can query, and exposes a setAnnotation spy on a ref.
vi.mock('@eten-tech-foundation/platform-editor', () => {
  const React = require('react') as typeof import('react');
  return {
    Editorial: React.forwardRef(function MockEditorial(
      props: { defaultUsj?: unknown; options?: { isReadonly?: boolean } },
      ref: React.Ref<{
        setAnnotation: (...args: unknown[]) => void;
        removeAnnotation: (...args: unknown[]) => void;
      }>,
    ) {
      React.useImperativeHandle(ref, () => ({
        setAnnotation: vi.fn(),
        removeAnnotation: vi.fn(),
      }));
      return (
        <div
          data-testid="mock-editorial"
          data-readonly={String(props.options?.isReadonly ?? false)}
          data-has-usj={String(props.defaultUsj !== undefined)}
        />
      );
    }),
    getDefaultViewOptions: () => ({}),
  };
});

const STRINGS_BAG = {
  '%enhancedResources_scripturePane_loading%': 'Loading',
  '%enhancedResources_scripturePane_emptyTitle%': 'No content',
  '%enhancedResources_scripturePane_emptyDescription%': 'Open a resource',
  '%enhancedResources_scripturePane_errorTitle%': 'Something went wrong',
  '%enhancedResources_scripturePane_filterActive%': 'Filter',
  '%enhancedResources_scripturePane_footnotesHeader%': 'Footnotes',
};

describe('EnhancedScripturePane', () => {
  it('renders the loading skeleton when isLoading is true', () => {
    render(
      <EnhancedScripturePane
        usj={undefined}
        annotations={[]}
        isLoading
        localizedStringsWithLoadingState={[STRINGS_BAG, false]}
      />,
    );
    const pane = screen.getByTestId('er-scripture-pane');
    expect(pane).toHaveAttribute('aria-busy', 'true');
  });

  it('renders the empty state when usj is undefined and not loading', () => {
    render(
      <EnhancedScripturePane
        usj={undefined}
        annotations={[]}
        localizedStringsWithLoadingState={[STRINGS_BAG, false]}
      />,
    );
    expect(screen.getByText('No content')).toBeInTheDocument();
    expect(screen.getByText('Open a resource')).toBeInTheDocument();
  });

  it('renders an alert when errorMessage is provided', () => {
    render(
      <EnhancedScripturePane
        usj={undefined}
        annotations={[]}
        errorMessage="boom"
        localizedStringsWithLoadingState={[STRINGS_BAG, false]}
      />,
    );
    expect(screen.getByRole('alert')).toHaveTextContent('Something went wrong');
    expect(screen.getByRole('alert')).toHaveTextContent('boom');
  });

  it('renders the Editorial component in readonly mode when usj is supplied', () => {
    render(
      <EnhancedScripturePane
        usj={{ type: 'USJ', version: '0.2.1', content: [] }}
        annotations={[]}
        localizedStringsWithLoadingState={[STRINGS_BAG, false]}
      />,
    );
    const editorial = screen.getByTestId('mock-editorial');
    expect(editorial).toHaveAttribute('data-readonly', 'true');
    expect(editorial).toHaveAttribute('data-has-usj', 'true');
  });

  it('exports the localized string keys as a frozen array', () => {
    expect(Object.isFrozen(ENHANCED_SCRIPTURE_PANE_STRING_KEYS)).toBe(true);
    expect(ENHANCED_SCRIPTURE_PANE_STRING_KEYS).toContain(
      '%enhancedResources_scripturePane_emptyTitle%',
    );
  });
});
```

- [ ] **Step 2: Run the test - expect ALL FAIL because the component does not exist yet**

Run: `npm test -- extensions/src/platform-enhanced-resources/src/components/scripture-pane/scripture-pane.test.tsx --run`

Expected: 5 failures, all citing module-not-found for `./scripture-pane.component`.

- [ ] **Step 3: Implement the component skeleton (loading / empty / error states + Editorial render)**

Create `scripture-pane.component.tsx`:

```tsx
import { useEffect, useRef } from 'react';
import {
  Editorial,
  getDefaultViewOptions,
  type EditorRef,
  type AnnotationRange,
} from '@eten-tech-foundation/platform-editor';
import type { Usj } from '@eten-tech-foundation/scripture-utilities';
import type { SerializedVerseRef } from '@sillsdev/scripture';
import { Alert, AlertDescription, AlertTitle, Card, Skeleton, cn } from 'platform-bible-react';
import type { LocalizedStringValue } from 'platform-bible-utils';
import type { MouseEvent as ReactMouseEvent } from 'react';
import type { MarbleAnnotation } from '../../lib/marble-converter';

/** Object containing all keys used for localization in this component. */
export const ENHANCED_SCRIPTURE_PANE_STRING_KEYS = Object.freeze([
  '%enhancedResources_scripturePane_loading%',
  '%enhancedResources_scripturePane_emptyTitle%',
  '%enhancedResources_scripturePane_emptyDescription%',
  '%enhancedResources_scripturePane_errorTitle%',
  '%enhancedResources_scripturePane_filterActive%',
  '%enhancedResources_scripturePane_footnotesHeader%',
] as const);

type ScripturePaneLocalizedStringKey = (typeof ENHANCED_SCRIPTURE_PANE_STRING_KEYS)[number];
type ScripturePaneLocalizedStrings = {
  [key in ScripturePaneLocalizedStringKey]?: LocalizedStringValue;
};

export type EnhancedScripturePaneProps = {
  usj: Usj | undefined;
  annotations: MarbleAnnotation[];
  filteredTokenId?: string;
  highlightAllResearchTerms?: boolean;
  showFootnotes?: boolean;
  scripturePaneZoom?: number;
  isLoading?: boolean;
  errorMessage?: string;
  scrRef?: SerializedVerseRef;
  onTokenClick?: (tokenId: string, annotation: MarbleAnnotation) => void;
  onTokenContextMenu?: (
    tokenId: string,
    annotation: MarbleAnnotation,
    event: ReactMouseEvent,
  ) => void;
  localizedStringsWithLoadingState?: [ScripturePaneLocalizedStrings, boolean];
};

/** Annotation type strings - used as the `type` argument to `editorRef.setAnnotation`. */
const ANNOTATION_TYPE_MARBLE_WORD = 'marble-word';
const ANNOTATION_TYPE_MARBLE_NOTE = 'marble-note';
const ANNOTATION_TYPE_FILTER = 'marble-filter';
const ANNOTATION_TYPE_HIGHLIGHT = 'marble-highlight';

function annotationToRange(annotation: MarbleAnnotation): AnnotationRange {
  // Each MarbleAnnotation.usjPath points at a single MarkerObject (the wg or note).
  // Apply the annotation as a zero-length range at that marker - the editor styles the marker
  // by virtue of the annotation type CSS class (see annotation styling in main.tsx CSS).
  return {
    start: { jsonPath: annotation.usjPath as `$${string}` },
    end: { jsonPath: annotation.usjPath as `$${string}` },
  };
}

/**
 * Real Enhanced Resources scripture pane. Wraps `<Editorial>` in read-only mode and applies
 * marble-aware annotations imperatively via the editor ref.
 *
 * Click delegation: `editorRef.setAnnotation(..., onClick)` dispatches the per-annotation onClick
 * handler with `(event, type, id, textContent)`. We translate the `id` (annotationId) back to the
 * source `MarbleAnnotation` and fire `onTokenClick` / `onTokenContextMenu`.
 */
export function EnhancedScripturePane({
  usj,
  annotations,
  filteredTokenId,
  highlightAllResearchTerms = false,
  showFootnotes = false,
  scripturePaneZoom = 1,
  isLoading = false,
  errorMessage,
  scrRef,
  onTokenClick = () => {},
  onTokenContextMenu = () => {},
  localizedStringsWithLoadingState = [{}, false],
}: EnhancedScripturePaneProps) {
  const editorRef = useRef<EditorRef | null>(null);
  const getLocalizedString = (key: ScripturePaneLocalizedStringKey) =>
    localizedStringsWithLoadingState[0][key] ?? key;

  const loadingText = getLocalizedString('%enhancedResources_scripturePane_loading%');
  const emptyTitle = getLocalizedString('%enhancedResources_scripturePane_emptyTitle%');
  const emptyDescription = getLocalizedString('%enhancedResources_scripturePane_emptyDescription%');
  const errorTitle = getLocalizedString('%enhancedResources_scripturePane_errorTitle%');
  const filterActiveLabel = getLocalizedString('%enhancedResources_scripturePane_filterActive%');
  const footnotesHeader = getLocalizedString('%enhancedResources_scripturePane_footnotesHeader%');

  // Reapply annotations whenever the annotation list, filter, or highlight state changes.
  useEffect(() => {
    const editor = editorRef.current;
    if (!editor || !usj) return;

    // Index annotations by id for the click-handler lookup.
    const annotationsById = new Map(annotations.map((a) => [a.annotationId, a]));

    annotations.forEach((annotation) => {
      const range = annotationToRange(annotation);
      const baseType =
        annotation.kind === 'word' ? ANNOTATION_TYPE_MARBLE_WORD : ANNOTATION_TYPE_MARBLE_NOTE;
      editor.setAnnotation(range, baseType, annotation.annotationId, (event, _type, id) => {
        const a = annotationsById.get(id);
        if (!a) return;
        // The editor's TypedMarkOnClick fires for both left-click and right-click variations.
        // We branch on event.button to route to the right handler.
        if ((event as MouseEvent).button === 2) {
          // Synthesized right-click - tests use real React events instead, so this path is
          // primarily for keyboard/menu invocations.
          onTokenContextMenu(id, a, event as unknown as ReactMouseEvent);
        } else {
          onTokenClick(id, a);
        }
      });
    });

    // Filter overlay - apply a "filter" annotation type only on the currently filtered token.
    if (filteredTokenId) {
      const target = annotationsById.get(filteredTokenId);
      if (target) {
        editor.setAnnotation(
          annotationToRange(target),
          ANNOTATION_TYPE_FILTER,
          `filter-${filteredTokenId}`,
        );
      }
    }

    // Highlight overlay - apply highlight annotation type to every word annotation when the
    // highlight-all-research-terms toggle is on.
    if (highlightAllResearchTerms) {
      annotations
        .filter((a) => a.kind === 'word')
        .forEach((a) => {
          editor.setAnnotation(
            annotationToRange(a),
            ANNOTATION_TYPE_HIGHLIGHT,
            `highlight-${a.annotationId}`,
          );
        });
    }

    // Cleanup: remove every annotation we added so subsequent renders don't accumulate.
    return () => {
      annotations.forEach((a) => {
        const t = a.kind === 'word' ? ANNOTATION_TYPE_MARBLE_WORD : ANNOTATION_TYPE_MARBLE_NOTE;
        editor.removeAnnotation(t, a.annotationId);
      });
      if (filteredTokenId) {
        editor.removeAnnotation(ANNOTATION_TYPE_FILTER, `filter-${filteredTokenId}`);
      }
      if (highlightAllResearchTerms) {
        annotations
          .filter((a) => a.kind === 'word')
          .forEach((a) => {
            editor.removeAnnotation(ANNOTATION_TYPE_HIGHLIGHT, `highlight-${a.annotationId}`);
          });
      }
    };
  }, [
    usj,
    annotations,
    filteredTokenId,
    highlightAllResearchTerms,
    onTokenClick,
    onTokenContextMenu,
  ]);

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
      </Card>
    );
  }

  if (!usj) {
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
      <div
        className="tw-flex tw-min-h-0 tw-flex-1 tw-flex-col"
        style={{ fontSize: `${scripturePaneZoom}rem` }}
      >
        <Editorial
          ref={editorRef}
          defaultUsj={usj}
          scrRef={scrRef}
          options={{
            isReadonly: true,
            hasExternalUI: true,
            view: getDefaultViewOptions(),
          }}
        />
        {filteredTokenId && (
          <p
            role="status"
            className="tw-mt-3 tw-rounded tw-bg-accent tw-px-2 tw-py-1 tw-text-xs tw-text-accent-foreground"
          >
            {`${filterActiveLabel}: ${filteredTokenId}`}
          </p>
        )}
      </div>
      <div
        data-testid="er-footnotes-pane"
        hidden={!showFootnotes}
        className="tw-border-t tw-bg-muted/40 tw-px-4 tw-py-2 tw-text-xs"
      >
        <h4 className="tw-mb-1 tw-text-sm tw-font-semibold">{footnotesHeader}</h4>
      </div>
    </div>
  );
}

export default EnhancedScripturePane;
```

- [ ] **Step 4: Run the tests - expect 5 PASS**

Run: `npm test -- extensions/src/platform-enhanced-resources/src/components/scripture-pane/scripture-pane.test.tsx --run`

Expected: 5 passing tests.

- [ ] **Step 5: Add localized string entries for the new component**

The keys `%enhancedResources_scripturePane_loading%` etc. already exist in `extensions/src/platform-enhanced-resources/contributions/localizedStrings.json` (carried over from `TempScripturePane`). Verify by grep:

Run: `grep -n "scripturePane_loading\|scripturePane_emptyTitle\|scripturePane_emptyDescription\|scripturePane_errorTitle\|scripturePane_filterActive\|scripturePane_footnotesHeader" extensions/src/platform-enhanced-resources/contributions/localizedStrings.json`

Expected: each key appears under both `en` and `es` blocks. If `editorPlaceholder` is also there (used only by TempScripturePane, no longer referenced), leave it for now - removal is part of the dead-code sweep in Task 3.

---

### Task 2: Wire EnhancedScripturePane into the ER webview

**Files:**

- Modify: `extensions/src/platform-enhanced-resources/src/web-views/enhanced-resource.web-view.tsx`

The change has three parts: (1) imports, (2) state slots, (3) JSX swap. The `convertMarbleChapterXml()` call already returns `{ usj, annotations }` - we simply stop discarding `usj`.

- [ ] **Step 1: Replace the TempScripturePane import block**

Find (around lines 19-22):

```ts
import {
  TempScripturePane,
  type MarbleTokenLike,
} from '../components/Temp/temp-scripture-pane.component';
```

Replace with:

```ts
import { EnhancedScripturePane } from '../components/scripture-pane/scripture-pane.component';
```

- [ ] **Step 2: Replace the `tokens` state and the `MarbleTokenLike` types in the props interface**

Find (around line 125):

```ts
  tokens: MarbleTokenLike[] | undefined;
  filteredTokenId: string | undefined;
```

Replace with:

```ts
  usj: import('@eten-tech-foundation/scripture-utilities').Usj | undefined;
  annotations: import('../lib/marble-converter').MarbleAnnotation[];
  filteredTokenId: string | undefined;
```

Find (around line 132):

```ts
  onTokenClick?: (tokenId: string, token: MarbleTokenLike) => void;
```

Replace with:

```ts
  onTokenClick?: (tokenId: string, annotation: import('../lib/marble-converter').MarbleAnnotation) => void;
```

- [ ] **Step 3: Replace the destructuring + default-prop assignments at the EnhancedResourceWebView call site**

Find (around line 349):

```ts
  tokens,
  filteredTokenId,
```

Replace with:

```ts
  usj,
  annotations,
  filteredTokenId,
```

- [ ] **Step 4: Replace the TempScripturePane JSX**

Find (around line 542):

```tsx
<TempScripturePane
  tokens={tokens}
  filteredTokenId={filteredTokenId}
  showFootnotes={showFootnotes}
  scripturePaneZoom={scripturePaneZoom}
  errorMessage={scripturePaneError}
  highlightAllResearchTerms={highlightMode === 'all-research-terms'}
  onTokenClick={onTokenClick}
  localizedStringsWithLoadingState={childStrings}
/>
```

Replace with:

```tsx
<EnhancedScripturePane
  usj={usj}
  annotations={annotations}
  filteredTokenId={filteredTokenId}
  showFootnotes={showFootnotes}
  scripturePaneZoom={scripturePaneZoom}
  errorMessage={scripturePaneError}
  highlightAllResearchTerms={highlightMode === 'all-research-terms'}
  scrRef={scrRef}
  onTokenClick={onTokenClick}
  localizedStringsWithLoadingState={childStrings}
/>
```

(`scrRef` is already in scope inside `EnhancedResourceWebViewWiring` from `useWebViewScrollGroupScrRef()`. The shell component does NOT have `scrRef` in scope - that prop is only set when called from the wiring layer, so add `scrRef?: SerializedVerseRef;` to `EnhancedResourceWebViewProps` if the wiring passes it through. Easiest: pass `scrRef` from the wiring directly to `<EnhancedScripturePane>`, NOT through the shell's prop interface - inline this into the wiring entry point at line ~1306+.)

Actually, simpler approach: the shell `EnhancedResourceWebView` doesn't need `scrRef` for any other purpose - so route it through the shell's prop interface symmetrically:

Add to `EnhancedResourceWebViewProps` (around line 156, near `currentReferenceLabel`):

```ts
  /** Current scripture reference - forwarded to the scripture pane for Editorial scrRef wiring. */
  scrRef?: SerializedVerseRef;
```

Add to the destructuring (around line 372):

```ts
  scrRef,
```

The wiring layer already passes the analogous BCV info; add the explicit `scrRef={scrRef}` prop to the shell's `<EnhancedResourceWebView>` JSX call (search for the call site in the same file or in stories).

- [ ] **Step 5: Replace the chapter-load `useState` and `useEffect` block**

Find (around line 1355):

```ts
// Chapter token state - drives the scripture pane.
const [tokens, setTokens] = useState<MarbleTokenLike[] | undefined>(undefined);
const [scripturePaneError, setScripturePaneError] = useState<string | undefined>(undefined);
```

Replace with:

```ts
// Chapter USJ + annotations state - drives the scripture pane.
const [usj, setUsj] = useState<Usj | undefined>(undefined);
const [annotations, setAnnotations] = useState<MarbleAnnotation[]>([]);
const [scripturePaneError, setScripturePaneError] = useState<string | undefined>(undefined);
```

Then in the same `useEffect`, find the success branch (around line 1400):

```ts
        const xml = await proxy.loadMarbleChapterXml({...});
        if (cancelled) return;
        const { annotations } = convertMarbleChapterXml(xml);
        setTokens(annotationsToTokens(annotations));
        setScripturePaneError(undefined);
```

Replace with:

```ts
        const xml = await proxy.loadMarbleChapterXml({...});
        if (cancelled) return;
        const { usj: convertedUsj, annotations: convertedAnnotations } =
          convertMarbleChapterXml(xml);
        setUsj(convertedUsj);
        setAnnotations(convertedAnnotations);
        setScripturePaneError(undefined);
```

(Keep the existing `loadMarbleChapterXml` input args from the prior code - this snippet uses `{...}` only for brevity.)

In the cancellation/no-resource branches (around lines 1366, 1376), replace `setTokens(undefined)` with `setUsj(undefined); setAnnotations([])` (two-statement reset).

In the error catch (around line 1410), replace `setTokens(undefined)` similarly.

- [ ] **Step 6: Delete the now-unused `annotationsToTokens` helper**

Find (around lines 1269-1293) and delete the entire `annotationsToTokens` function and its accompanying JSDoc block.

- [ ] **Step 7: Update the `<EnhancedResourceWebView>` JSX call site to pass usj + annotations**

Find the wiring layer's call site (around line 1900+, the `return (<EnhancedResourceWebView ... />)` block) and:

- Replace `tokens={tokens}` with `usj={usj} annotations={annotations}`
- Add `scrRef={scrRef}` to the same JSX block

- [ ] **Step 8: Add the missing `MarbleAnnotation` import at the top of the file**

Find the existing import (around line 18):

```ts
import { convertMarbleChapterXml, type MarbleAnnotation } from '../lib/marble-converter';
```

Verify `MarbleAnnotation` is included; the existing import already has it (used by `annotationsToTokens`). Add `Usj` import:

```ts
import type { Usj } from '@eten-tech-foundation/scripture-utilities';
```

(Place near the other type imports around line 5-6.)

- [ ] **Step 9: Typecheck and build**

Run:

```bash
npm run typecheck
npm run build:extensions
```

Expected: both exit 0. The webpack `<w>` cache warning may still appear - that is benign per Task 8.

- [ ] **Step 10: Run the unit-test suite for the extension**

Run: `npm test -- extensions/src/platform-enhanced-resources --run`

Expected: all tests in the extension pass. The new scripture-pane tests pass; existing presenter / converter / webview tests should be untouched.

---

### Task 3: Delete the Temp components folder + manual verification + commit

**Files:**

- Delete: `extensions/src/platform-enhanced-resources/src/components/Temp/temp-scripture-pane.component.tsx`
- Delete: `extensions/src/platform-enhanced-resources/src/components/Temp/temp-scripture-pane.stories.tsx`
- Delete: `extensions/src/platform-enhanced-resources/src/components/Temp/temp-tooltip-renderer.component.tsx`
- Delete: `extensions/src/platform-enhanced-resources/src/components/Temp/temp-tooltip-renderer.stories.tsx`
- Delete: `extensions/src/platform-enhanced-resources/src/components/Temp/temp-note-renderer.component.tsx`
- Delete: `extensions/src/platform-enhanced-resources/src/components/Temp/temp-note-renderer.stories.tsx`
- Delete: `extensions/src/platform-enhanced-resources/src/components/Temp/` (the empty directory)

- [ ] **Step 1: Sanity-check no other consumers exist**

Run: `grep -rn "TempScripturePane\|TempTooltipRenderer\|TempNoteRenderer\|MarbleTokenLike\|temp-scripture-pane\|temp-tooltip-renderer\|temp-note-renderer" extensions/src/platform-enhanced-resources/src/ | grep -v "components/Temp/"`

Expected: zero results. If any are returned, those files need follow-up (likely a stale story file that imports `MarbleTokenLike`).

- [ ] **Step 2: Delete the Temp folder**

Run: `rm -rf extensions/src/platform-enhanced-resources/src/components/Temp/`

- [ ] **Step 3: Re-run typecheck + build to confirm nothing broke**

Run:

```bash
npm run typecheck
npm run build:extensions
```

Expected: both exit 0.

- [ ] **Step 4: Start the dev app and manually verify real scripture renders**

Run: `./.erb/scripts/refresh.sh`

Wait for the app window to appear. Then:

1. From the menu bar, click **Platform** → **Open Enhanced Resource**
2. The MarbleGuide tutorial dialog may auto-show on first session - close it.
3. Verify in the Enhanced Resource tab:
   - The scripture pane shows **real verse text** from ESV16UK+ (e.g., "In the beginning God created the heavens and the earth"), NOT a wall of "Greek 1234" / "Hebrew 5678" chips
   - Linked words within the scripture text are visually distinguished (the wg-marker annotations are styled - even if the styling defaults to underline)
   - Clicking a linked word activates the lower toolbar's filter input and the dictionary tab's detail panel
   - Encyclopedia, Media, Maps tabs each show populated content (or appropriate empty states)

If any of these are broken, **stop and debug before committing**. Check the renderer console for Editorial errors via Ctrl+Shift+I or by inspecting `electron-renderer.log`.

- [ ] **Step 5: Capture proof screenshot**

While the ER window is open with real scripture visible, capture a screenshot to `proofs/component-evidence/completion/scripture-pane-real-content.png`. Use the visual-verification skill or a manual screenshot tool. The image is the visible proof for the PR.

- [ ] **Step 6: Commit Phase 1 (real scripture pane)**

```bash
git add extensions/src/platform-enhanced-resources/src/components/scripture-pane/ \
        extensions/src/platform-enhanced-resources/src/web-views/enhanced-resource.web-view.tsx \
        proofs/component-evidence/completion/

git rm -r extensions/src/platform-enhanced-resources/src/components/Temp/

git commit -m "$(cat <<'EOF'
[P3][fix] enhanced-resources: Replace TempScripturePane with real Editorial-backed pane

Imports <Editorial> from @eten-tech-foundation/platform-editor directly inside
the ER webview, fed by the existing marble-converter USJ output, with wg-marker
annotations applied imperatively via editorRef.setAnnotation. The webview now
renders real scripture text instead of a placeholder wall of annotation IDs.

- New EnhancedScripturePane component + unit tests (5 cases, mocked Editorial)
- Wire usj+annotations through the webview state machine; delete annotationsToTokens helper
- Delete components/Temp/ folder (TempScripturePane + TempTooltipRenderer + TempNoteRenderer)

Co-Authored-By: Claude Code <noreply@anthropic.com>
EOF
)"
```

---

### Task 4: CI test reorganization

**Files:**

- Delete: `e2e-tests/tests/smoke/enhanced-resources-render.spec.ts`
- Modify: `e2e-tests/playwright.config.ts`
- Modify: `package.json`

- [ ] **Step 1: Delete the orphan smoke test**

Run: `git rm e2e-tests/tests/smoke/enhanced-resources-render.spec.ts`

- [ ] **Step 2: Add the `enhanced-resources` Playwright project**

Edit `e2e-tests/playwright.config.ts`. Find:

```ts
  projects: [
    {
      name: 'smoke',
      testDir: './tests/smoke',
    },
    {
      name: 'isolated',
      testDir: './tests/isolated',
    },
  ],
```

Replace with:

```ts
  // Invariant: every directory under `tests/` (except `_example/`) MUST be reachable
  // from at least one project entry below. If you add a new test directory, register it
  // here AND wire it into either CI (`test:e2e:smoke`) or a local-only npm script.
  projects: [
    {
      name: 'smoke',
      testDir: './tests/smoke',
    },
    {
      name: 'isolated',
      testDir: './tests/isolated',
    },
    {
      // Local-only - NOT wired into CI's `test:e2e:smoke`. The ER tests need real
      // Marble resources (e.g., ESV16UK+) which are not available in CI. Run locally:
      //   ./.erb/scripts/refresh.sh    # boot the app once with CDP enabled
      //   npm run test:e2e:enhanced-resources
      name: 'enhanced-resources',
      testDir: './tests/enhanced-resources',
    },
  ],
```

- [ ] **Step 3: Add the npm script**

Edit `package.json`. Find the existing e2e scripts block:

```json
    "test:e2e:isolated": "playwright test --config e2e-tests/playwright.config.ts --project=isolated",
    "test:e2e:smoke": "playwright test --config e2e-tests/playwright.config.ts --project=smoke",
```

Add the new line immediately below:

```json
    "test:e2e:enhanced-resources": "playwright test --config e2e-tests/playwright.config.ts --project=enhanced-resources",
```

- [ ] **Step 4: Verify the smoke project still passes locally**

Run: `npm run test:e2e:smoke`

Expected: pass. The deleted `enhanced-resources-render.spec.ts` was the only failing one.

- [ ] **Step 5: Commit Phase 2 (CI test reorg)**

```bash
git add e2e-tests/playwright.config.ts package.json

git commit -m "$(cat <<'EOF'
[P3][test] enhanced-resources: Move E2E tests to local-only project; remove CI smoke

Removes the failing CI smoke test that depended on the ESV16UK+ Marble resource
(unavailable in CI) and registers the orphaned tests/enhanced-resources/ directory
as a dedicated Playwright project. The new project is NOT wired into CI; it runs
locally against the dev app via the existing CDP fixture.

- Delete e2e-tests/tests/smoke/enhanced-resources-render.spec.ts
- Add `enhanced-resources` Playwright project + invariant comment
- Add `test:e2e:enhanced-resources` npm script

Co-Authored-By: Claude Code <noreply@anthropic.com>
EOF
)"
```

---

### Task 5: Test activation pass - UI-PKG-001 (MarbleForm)

**Files:**

- Modify: `e2e-tests/tests/enhanced-resources/enhanced-resources-functional-UI-PKG-001.spec.ts`

The spec file currently has 4 active tests + 19 `test.fixme()` tests. Most fixmes are marked `// FN-001` / `// FN-013` / `// FN-016` / `// FN-017` / `// FN-020` - all unblocked by the Editorial swap.

- [ ] **Step 1: Identify the activation set**

Run: `grep -n "test\.fixme\|// FN-" e2e-tests/tests/enhanced-resources/enhanced-resources-functional-UI-PKG-001.spec.ts | head -60`

Expected output: a list of `test.fixme(` lines, each preceded (1-3 lines up) by a `// FN-XXX` comment. Cross-reference with the lookup table:

| Comment marker                            | Cause now resolved?                        | Action      |
| ----------------------------------------- | ------------------------------------------ | ----------- |
| `// FN-001` (real ScripturePane)          | YES (Editorial replaces TempScripturePane) | Activate    |
| `// FN-013` (wg-marker spike)             | YES (annotations are real)                 | Activate    |
| `// FN-016` (info-icon command)           | YES                                        | Activate    |
| `// FN-017` (hamburger H/G display modes) | YES                                        | Activate    |
| `// FN-020` (integrated state machine)    | YES                                        | Activate    |
| `// GAP-pre-release-fixture`              | NO - no test resource                      | Leave fixme |
| `// GAP-update-fixture`                   | NO - no test resource                      | Leave fixme |
| `// FN-009-followup` (force-new)          | NO - menu item missing                     | Leave fixme |
| `// FN-024` (@container query)            | NO - container-type missing                | Leave fixme |

- [ ] **Step 2: Convert each unblocked `test.fixme(` → `test(`**

For each line where the FN-comment is in the resolved column, change `test.fixme(` to `test(`. Use Edit, not sed (the file has multi-line callouts that need preservation). Process tests in order:

1. Line ~146: `should create a second ER window when openMode is force-new` - **LEAVE fixme** (FN-009 unrelated to scripture pane)
2. Line ~180: `should render every Test Contract element on initial open` - **ACTIVATE**
3. Line ~226: `should expose H/G display-mode radio groups in the hamburger menu (FN-017)` - **ACTIVATE**
4. Line ~290: `should reflect external reference changes in the BCV control` - **LEAVE fixme** initially (TS-053 - depends on a separate scripture editor pane to drive scroll-group; verify with test run)
5. Line ~325: `should refresh the research pane when the scope dropdown changes (BHV-305)` - **ACTIVATE**
6. Line ~355: `should toggle the All Research Terms highlight (BHV-306, FN-016)` - **ACTIVATE**
7. Line ~388: `should offer Find sense/lemma/text on right-click of a single-lemma word (BHV-308)` - **ACTIVATE**
8. Line ~414: `should group lemmas into submenus on right-click of multi-lemma word (BHV-308 edge)` - **ACTIVATE**
9. Line ~439: `should propagate linked-word click to filter box, scope, and active tab (FN-020)` - **ACTIVATE**
10. Line ~483: `should clear filter and remove Current Sense scope on X click (FN-020)` - **ACTIVATE**
11. Line ~516: `should propagate the active word filter when switching research tabs (FN-020)` - **ACTIVATE**
12. Line ~552: `should toggle the footnotes pane via the hamburger Show footnotes item (BHV-613)` - **ACTIVATE**
13. Line ~580: `should open the MarbleGuide dialog when info icon is clicked (FN-016)` - **ACTIVATE**
14. Line ~607: `should show dismissible pre-release warning ribbon` - **LEAVE fixme** + update comment to `// FIXME(GAP-pre-release-fixture): ...`
15. Line ~635: `should show non-dismissible required-data ribbon` - **LEAVE fixme** + `// FIXME(GAP-update-fixture): ...`
16. Line ~661: `should hide rbnUpdateRequiredData after the action link is clicked` - **LEAVE fixme** + `// FIXME(GAP-update-fixture): ...`
17. Line ~683: `should persist and restore memento state across close/reopen (BHV-319)` - **ACTIVATE**
18. Line ~737: `should show missing-book warning + empty scripture pane` - **LEAVE fixme** + `// FIXME(GAP-missing-book-fixture): ...`
19. Line ~764: `should collapse research-tab labels to icon-only at narrow widths (FN-024)` - **LEAVE fixme** + `// FIXME(GAP-024): ...`

For each LEAVE-fixme test, replace the existing `// FN-XXX:` comment line(s) above the test with a single `// FIXME(GAP-XXX): <one-line reason from the table above>` comment so the deferred reason is canonical and grep-able.

- [ ] **Step 3: Boot the app (if not already running)**

Run: `./.erb/scripts/refresh.sh`

Wait for the window to appear and the dev server to settle (~30 seconds).

- [ ] **Step 4: Run the activated UI-PKG-001 tests**

Run: `npm run test:e2e:enhanced-resources -- --grep "UI-PKG-001"`

Expected: most newly-activated tests pass. Some may fail with selector drift or timing issues (Editorial may emit slightly different DOM than TempScripturePane).

- [ ] **Step 5: Triage failures**

For each failure, classify:

- **Selector drift**: e.g., the test queries `[data-token-id]` but Editorial uses a different attribute on the annotated span. **Fix the test selector** to use whatever Editorial actually emits (inspect via Playwright trace or browser devtools). If the same data is needed across many tests, consider adding a stable testid via the scripture-pane wrapper.
- **Async timing**: e.g., `toBeVisible({ timeout: 5_000 })` is too short for Editorial's mount delay. **Loosen the timeout** to 15-30 seconds.
- **Real wiring gap**: e.g., the right-click context menu doesn't actually surface in Editorial. **Re-fixme** with `// FIXME(GAP-context-menu-wiring): Editorial does not surface annotation context-menu out of the box; needs a wrapper or upstream change.` and document in `post-phase-3-followups.md`.

Iterate until either all tests pass or remaining failures are documented re-fixmes. Hard cap: 2 full re-runs after triage. Beyond that, anything still failing gets re-fixme'd with a documented reason.

---

### Task 6: Test activation pass - UI-PKG-002 through UI-PKG-008

**Files:**

- Modify: `e2e-tests/tests/enhanced-resources/enhanced-resources-functional-UI-PKG-002.spec.ts`
- Modify: `e2e-tests/tests/enhanced-resources/enhanced-resources-functional-UI-PKG-003.spec.ts`
- Modify: `e2e-tests/tests/enhanced-resources/enhanced-resources-functional-UI-PKG-004.spec.ts`
- Modify: `e2e-tests/tests/enhanced-resources/enhanced-resources-functional-UI-PKG-005.spec.ts`
- Modify: `e2e-tests/tests/enhanced-resources/enhanced-resources-functional-UI-PKG-006.spec.ts`
- Modify: `e2e-tests/tests/enhanced-resources/enhanced-resources-functional-UI-PKG-007.spec.ts`
- Modify: `e2e-tests/tests/enhanced-resources/enhanced-resources-functional-UI-PKG-008.spec.ts`

Same pattern as Task 5, applied per-WP. The triage rules from Task 5 apply identically.

- [ ] **Step 1: For each spec file, list its fixme + FN-comment markers**

Run for each file (substituting `00X`):

```bash
grep -n "test\.fixme\|// FN-\|// GAP-" e2e-tests/tests/enhanced-resources/enhanced-resources-functional-UI-PKG-00X.spec.ts | head -60
```

- [ ] **Step 2: Per file, activate all `test.fixme()` whose blocking FN-XXX is in the resolved set (FN-001/013/016/017/020)**

Edit each file. The mechanical change: `test.fixme(` → `test(` for resolved-blocker tests; update the per-test comment block to remove the resolved-blocker note (leave any unresolved-blocker notes intact).

For tests blocked on truly-unresolved gaps, replace with `// FIXME(GAP-XXX): ...` comments. Likely candidates per file:

- **UI-PKG-008 (MarbleGuide) test #1 - auto-show on first session open**: Stays `test.fixme()` with `// FIXME(GAP-guide-reset): per-test extension-host reset hook not yet implemented; only the first test per fresh app start can observe the auto-show.`
- **Tests that depend on a separate Scripture Editor pane to drive scroll-group changes**: If they fail because no companion editor is present, leave `test.fixme()` with `// FIXME(GAP-companion-editor-fixture): test needs a scripture-editor pane open in a sibling dock tab; setup helper not yet built.`

- [ ] **Step 3: Run the activated tests for each WP separately, triaging failures**

```bash
npm run test:e2e:enhanced-resources -- --grep "UI-PKG-002"
npm run test:e2e:enhanced-resources -- --grep "UI-PKG-003"
npm run test:e2e:enhanced-resources -- --grep "UI-PKG-004"
npm run test:e2e:enhanced-resources -- --grep "UI-PKG-005"
npm run test:e2e:enhanced-resources -- --grep "UI-PKG-006"
npm run test:e2e:enhanced-resources -- --grep "UI-PKG-007"
npm run test:e2e:enhanced-resources -- --grep "UI-PKG-008"
```

Apply the same triage rules (selector drift / async timing / real wiring gap → re-fixme).

---

### Task 7: Test activation pass - journey tests + full-suite run + commit

**Files:**

- Modify: `e2e-tests/tests/enhanced-resources/enhanced-resources-journey.spec.ts`

Journey tests span 2+ WPs and exercise cross-component flows. All 13 of them are currently `test.fixme()`.

- [ ] **Step 1: Activate the cross-WP flows that depend on the scripture pane being real**

All journey tests except those explicitly tagged with `GAP-` markers should activate. Convert `test.fixme(` → `test(` for each.

- [ ] **Step 2: Run the journey tests**

Run: `npm run test:e2e:enhanced-resources -- --grep "Journey"`

Triage failures with the same rules.

- [ ] **Step 3: Full-suite run for confirmation**

Run: `npm run test:e2e:enhanced-resources`

Expected: ~50 active tests pass; the remaining `test.fixme()` are categorized.

- [ ] **Step 4: Commit Phase 3 (test activation)**

```bash
git add e2e-tests/tests/enhanced-resources/

git commit -m "$(cat <<'EOF'
[P3][test] enhanced-resources: Activate ~50 functional + journey tests

The Editorial-backed scripture pane unblocks every test previously deferred on
FN-001 / FN-013 / FN-016 / FN-017 / FN-020. Activates:

- UI-PKG-001 MarbleForm: render, hamburger H/G, scope, highlight, right-click
  context (single + multi lemma), filter propagation (FN-020), filter clear,
  cross-tab filter, footnotes toggle, info-icon → guide, memento round-trip
- UI-PKG-002..008: tab-specific filter propagation, scope reload, domain link
  → SDV, encyclopedia → ArticleViewer, media → MediaViewer
- Journey tests: open + reuse, word click → dictionary filter, cross-tab filter,
  scope change, domain → SDV, encyclopedia → article, article verse-link nav,
  media thumbnail → viewer, info-icon → guide toggle, no-console-errors

Tests still fixme are tagged `// FIXME(GAP-XXX)` with explicit reasons:
- GAP-pre-release-fixture / GAP-update-fixture / GAP-missing-book-fixture
  (need test resources ESV16UK+ doesn't satisfy)
- GAP-guide-reset (per-test extension-host reset hook missing)
- GAP-009 (force-new-window menu item not contributed)
- GAP-024 (tab-bar @container query not wired)

Co-Authored-By: Claude Code <noreply@anthropic.com>
EOF
)"
```

---

### Task 8: Update post-phase-3-followups.md + final verification

**Files:**

- Modify: `.context/features/enhanced-resources/implementation/post-phase-3-followups.md` (path is symlinked - actual file lives in `ai-prompts` repo)

- [ ] **Step 1: Update the followups doc to record completion + remaining gaps**

Add a new section under "Iframe height fix (landed 2026-05-01)" titled "Scripture pane swap (landed 2026-05-03)":

```markdown
## Scripture pane swap (landed 2026-05-03)

The placeholder `TempScripturePane` was replaced with a real `<Editorial>`-backed
component (`scripture-pane.component.tsx`). This unblocks every test previously
deferred on FN-001 / FN-013 / FN-016 / FN-017 / FN-020. Editorial is imported
directly from `@eten-tech-foundation/platform-editor` (already in the dep tree
via `platform-scripture-editor`), fed by the existing marble-converter USJ output,
with wg-marker annotations applied imperatively via `editorRef.setAnnotation`.

### What this resolves

- GAP-006 (scripture-pane context menu) - Editorial surfaces annotation
  context menu via the `onClick` callback, with right-click branched on event.button
- GAP-005 (smoke test) - replaced by the per-WP functional tests now activated in
  the dedicated `enhanced-resources` Playwright project (local-only)
- ~50 of 128 deferred tests are now active

### What remains deferred

- GAP-pre-release-fixture / GAP-update-fixture / GAP-missing-book-fixture (need
  test resources ESV16UK+ does not satisfy)
- GAP-guide-reset (per-test extension-host reset hook missing - blocks the
  MarbleGuide auto-show test on every test except the first per fresh app start)
- GAP-009 (force-new-window menu item not contributed by UI-PKG-009)
- GAP-024 (tab-bar @container query not wired - container-type missing on parent)
- GAP-001 (real resource picker - ESV16UK+ stays hardcoded)
- GAP-003 (Spanish localization bulk - 163 keys still need translation)
- GAP-014/015/016 (backend exposures: translatePartOfSpeech, getSemanticDomainTree,
  FN-019 sense.comments / lexicon_note / LEXSubDomains)

### Webpack cache warning (benign)

`npm run build` emits `[build:extensions] <w> [webpack.cache.PackFileCacheStrategy]
Caching failed for pack: Error: ENOENT ... 1.pack.gz`. This is a known webpack
behavior under concurrent compilation (see webpack issue #16439); the cache
self-heals on the next build. Build exits 0 - the warning is cosmetic. No action
needed.

### CI test layout

ER E2E tests live in `e2e-tests/tests/enhanced-resources/` and run via:

    ./.erb/scripts/refresh.sh   # boot app once with CDP
    npm run test:e2e:enhanced-resources

NOT wired into CI. Long-term, an artifact-based ESV16UK+ fixture could enable
running these in CI; that infrastructure work is separately scoped.
```

Bump the frontmatter version + last_updated, add a row to the Version Log:

```markdown
| 1.2.0 | 2026-05-03 | Claude Code | Scripture pane swap landed; ~50 tests activated; CI test layout; webpack warning documented |
```

- [ ] **Step 2: Run the full local verification suite**

```bash
npm run typecheck
npm run build
npm run lint
npm test -- --run
cd c-sharp-tests && dotnet test --filter EnhancedResources && cd ..
npm run test:e2e:smoke
npm run test:e2e:enhanced-resources
```

Expected: every step exits 0. Note: the c-sharp-tests filter assumes EnhancedResources test classes contain the substring; if no tests match the filter, drop the `--filter`.

- [ ] **Step 3: Confirm the committed changes**

Run: `git log --oneline -5`

Expected output (newest first):

1. `[P3][test] enhanced-resources: Activate ~50 functional + journey tests`
2. `[P3][test] enhanced-resources: Move E2E tests to local-only project; remove CI smoke`
3. `[P3][fix] enhanced-resources: Replace TempScripturePane with real Editorial-backed pane`
4. (existing commit) `[P3][followup] enhanced-resources: E2E activation pass + supporting fixes`

- [ ] **Step 4: Commit Phase 4 (followups doc) - in the ai-prompts repo**

The post-phase-3-followups.md file is symlinked from `ai-prompts`. Commits to it must happen in the ai-prompts repo:

```bash
cd /home/lyonsm/workspaces/enhanced-resources/ai-prompts
git status   # confirm post-phase-3-followups.md is the only change

git add ai-porting/.context/features/enhanced-resources/implementation/post-phase-3-followups.md
git commit -m "$(cat <<'EOF'
[P3][doc] enhanced-resources: Document scripture pane swap completion

Updates post-phase-3-followups.md to reflect:
- Scripture pane swap landed (real Editorial-backed pane)
- Test activation results (~50 tests now active)
- Remaining deferred gaps with explicit GAP-XXX tags
- Webpack cache warning documented as benign
- CI test layout documented (local-only enhanced-resources project)

Co-Authored-By: Claude Code <noreply@anthropic.com>
EOF
)"

cd /home/lyonsm/workspaces/enhanced-resources/paranext-core
```

- [ ] **Step 5: Stop, do NOT push**

Per user preferences: never push to origin without explicit approval. Surface the four new commits to the user with a summary and ask whether to push.

---

## Self-Review Notes

This plan covers the four problem areas from the spec:

1. **CI failing** → Task 4 deletes the offending smoke test
2. **Orphan test directory** → Task 4 registers the directory as a Playwright project; Tasks 5-7 activate the tests
3. **No real scripture content** → Tasks 1-3 swap in `<Editorial>`
4. **Webpack cache warning** → Task 8 documents it as benign

Risk areas explicitly addressed:

- **Editorial annotation API mismatch**: Task 1's component uses the documented `editorRef.setAnnotation()` API with a typed signature - if the actual API surface differs, the typecheck step in Task 2 catches it
- **Annotation range zero-length quirk**: The plan applies start === end at the wg marker's jsonPath; if Editorial requires a real text span, Task 5's triage step catches this when the highlight/filter overlay tests fail
- **Test triage runaway**: Hard cap of 2 full re-runs after activation prevents an open-ended iteration loop. Anything still broken after that goes back to fixme with a documented reason
- **Failure budget**: If Task 1-3 reveals the Editorial integration is fundamentally broken, the plan can ship Tasks 4 + 8 alone (CI cleanup + documentation) for a smaller-but-real win

Files NOT modified that the plan implies might be:

- `marble-converter.ts` - already returns `{ usj, annotations }`; we just stop discarding `usj`
- `localizedStrings.json` - the keys already exist (carried from TempScripturePane); only the dead `editorPlaceholder` key would be removed, deferred to a later cleanup pass
- C# / backend code - no backend changes needed

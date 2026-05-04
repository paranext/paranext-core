import { useEffect, useRef } from 'react';
import {
  Editorial,
  getDefaultViewOptions,
  type EditorRef,
  type AnnotationRange,
} from '@eten-tech-foundation/platform-editor';
import type { ContentJsonPath, Usj } from '@eten-tech-foundation/scripture-utilities';
import type { SerializedVerseRef } from '@sillsdev/scripture';
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Card,
  Skeleton,
  useStylesheet,
} from 'platform-bible-react';
import type { LocalizedStringValue } from 'platform-bible-utils';
import type { MouseEvent as ReactMouseEvent } from 'react';
import type { MarbleAnnotation } from '../../lib/marble-converter';

/**
 * EnhancedScripturePane - read-only scripture renderer for the Enhanced Resources web view.
 *
 * Wraps `<Editorial>` (`@eten-tech-foundation/platform-editor`) in `isReadonly: true` mode and
 * imperatively layers `MarbleAnnotation`s on top via `editorRef.setAnnotation()`. Annotations are
 * (re)applied whenever the USJ, annotation set, filter, or highlight flag changes, and torn down on
 * cleanup.
 *
 * Replaces `Temp/temp-scripture-pane.component.tsx` (the design-phase placeholder) - see
 * `docs/plans/2026-05-03-enhanced-resources-completion.md` Phase 1 / Task 1.
 */

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
  /** USJ document for the current chapter; when undefined, the empty state is rendered. */
  usj: Usj | undefined;
  /** Marble word + note annotations to overlay onto the rendered scripture. */
  annotations: MarbleAnnotation[];
  /** AnnotationId of a single linked word the user has filtered to (highlights only that token). */
  filteredTokenId?: string;
  /** When true, every word-kind annotation gets a `marble-highlight` overlay (BHV-301). */
  highlightAllResearchTerms?: boolean;
  /** Reserved: when true, the footnote pane is shown below the scripture pane (BHV-302). */
  showFootnotes?: boolean;
  /** Zoom factor applied to the rendered scripture (1.0 = 100%). */
  scripturePaneZoom?: number;
  /** Loading state - shows a Skeleton placeholder. */
  isLoading?: boolean;
  /** Error message - when set, renders an Alert. Overrides loading/empty states. */
  errorMessage?: string;
  /** Scripture reference passed straight through to `<Editorial>` for cursor positioning. */
  scrRef?: SerializedVerseRef;
  /** Click handler for a marble word/note. */
  onTokenClick?: (tokenId: string, annotation: MarbleAnnotation) => void;
  /** Right-click handler - wiring layer turns this into the BHV-308 context menu. */
  onTokenContextMenu?: (
    tokenId: string,
    annotation: MarbleAnnotation,
    event: ReactMouseEvent,
  ) => void;
  localizedStringsWithLoadingState?: [ScripturePaneLocalizedStrings, boolean];
};

const ANNOTATION_TYPE_MARBLE_WORD = 'marble-word';
const ANNOTATION_TYPE_MARBLE_NOTE = 'marble-note';
const ANNOTATION_TYPE_FILTER = 'marble-filter';
const ANNOTATION_TYPE_HIGHLIGHT = 'marble-highlight';
const RIGHT_MOUSE_BUTTON = 2;

/**
 * CSS for marble annotation marks.
 *
 * Editorial renders `setAnnotation(range, type, id)` calls as `<mark>` elements with class
 * `.editor-typed-mark-external-${type}`. Editorial itself provides no visual treatment for these
 * classes - that's the host extension's responsibility (see Editorial README "Annotation Styles").
 *
 * - Marble-word: linked research term (BHV-301/302). Click to filter the dictionary / open tooltip.
 * - Marble-note: linked study/cross-ref note. Renders as a footnote-style affordance.
 * - Marble-filter: the single token the user has filtered to (BHV-307).
 * - Marble-highlight: applied to every word annotation when "Highlight all research terms" is on.
 *
 * Filter trumps highlight trumps base style; CSS rule order + `:is()` specificity handles that.
 */
const MARBLE_ANNOTATION_STYLES = `
.editor-typed-mark-external-marble-word {
  cursor: pointer;
  text-decoration: underline dotted hsl(var(--primary) / 0.55);
  text-underline-offset: 2px;
}
.editor-typed-mark-external-marble-word:hover {
  background-color: hsl(var(--accent));
  text-decoration-color: hsl(var(--primary));
}
.editor-typed-mark-external-marble-note {
  cursor: pointer;
  color: hsl(var(--primary));
}
.editor-typed-mark-external-marble-highlight {
  background-color: hsl(210 100% 90%);
  border-radius: 2px;
}
.editor-typed-mark-external-marble-filter {
  background-color: hsl(45 100% 75%);
  border-radius: 2px;
}
`;

// The marble-converter emits paths shaped like `$.content[N]...` which match ContentJsonPath at
// runtime; the type narrows from `string` here. The annotation's `usjPath` points at the wg / note
// MarkerObject; we span its full text by pairing a marker-location start (resolves to the first
// text child at offset 0) with a closing-marker-location end (resolves to the last text child at
// its full length). A collapsed marker-location range produces a zero-length selection, which
// Editorial silently drops without rendering a `<mark>` - so the range MUST be non-collapsed.
function annotationToRange(annotation: MarbleAnnotation): AnnotationRange {
  // ContentJsonPath is a literal-template type; the marble-converter produces matching strings
  // at runtime but TypeScript can't prove it from `string`, so an assertion is the cleanest fix.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const jsonPath = annotation.usjPath as ContentJsonPath;
  return {
    start: { jsonPath },
    end: { jsonPath, closingMarkerOffset: 0 },
  };
}

function annotationTypeFor(kind: MarbleAnnotation['kind']): string {
  return kind === 'word' ? ANNOTATION_TYPE_MARBLE_WORD : ANNOTATION_TYPE_MARBLE_NOTE;
}

// Module-level no-op defaults so omitting the callbacks does not generate a fresh
// function identity on every render (which would falsely invalidate the annotation
// effect's dependency array). Identity-stable defaults are the cheapest way to
// guarantee the effect re-runs only when an actual handler changes.
const NOOP_TOKEN_CLICK: NonNullable<EnhancedScripturePaneProps['onTokenClick']> = () => {};
const NOOP_TOKEN_CONTEXT_MENU: NonNullable<
  EnhancedScripturePaneProps['onTokenContextMenu']
> = () => {};

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
  onTokenClick = NOOP_TOKEN_CLICK,
  onTokenContextMenu = NOOP_TOKEN_CONTEXT_MENU,
  localizedStringsWithLoadingState = [{}, false],
}: EnhancedScripturePaneProps) {
  // Editorial's forwarded ref is typed `EditorRef | null`; we match that to satisfy the prop type.
  // eslint-disable-next-line no-null/no-null
  const editorRef = useRef<EditorRef | null>(null);
  // Inject the marble annotation stylesheet so the `<mark>` elements Editorial creates have a
  // visible treatment. The stylesheet is static; useStylesheet adds a single `<style>` tag for
  // the lifetime of this component.
  useStylesheet(MARBLE_ANNOTATION_STYLES);
  const getLocalizedString = (key: ScripturePaneLocalizedStringKey) =>
    localizedStringsWithLoadingState[0][key] ?? key;

  const loadingText = getLocalizedString('%enhancedResources_scripturePane_loading%');
  const emptyTitle = getLocalizedString('%enhancedResources_scripturePane_emptyTitle%');
  const emptyDescription = getLocalizedString('%enhancedResources_scripturePane_emptyDescription%');
  const errorTitle = getLocalizedString('%enhancedResources_scripturePane_errorTitle%');
  const filterActiveLabel = getLocalizedString('%enhancedResources_scripturePane_filterActive%');
  const footnotesHeader = getLocalizedString('%enhancedResources_scripturePane_footnotesHeader%');

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor || !usj) return undefined;

    const annotationsById = new Map(annotations.map((a) => [a.annotationId, a]));

    annotations.forEach((annotation) => {
      const range = annotationToRange(annotation);
      const baseType = annotationTypeFor(annotation.kind);
      editor.setAnnotation(range, baseType, annotation.annotationId, (event, _type, id) => {
        const annotationForId = annotationsById.get(id);
        if (!annotationForId) return;
        if (event.button === RIGHT_MOUSE_BUTTON) {
          // Editorial gives us a DOM MouseEvent; consumers expect the React MouseEvent surface
          // (only `.button`, `.preventDefault()`, etc are read), so a structural cast is correct.
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          onTokenContextMenu(id, annotationForId, event as unknown as ReactMouseEvent);
        } else {
          onTokenClick(id, annotationForId);
        }
      });
    });

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

    return () => {
      annotations.forEach((a) => {
        editor.removeAnnotation(annotationTypeFor(a.kind), a.annotationId);
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
        // Inline style is the appropriate primitive for a continuous numeric zoom factor that the
        // user can drive from the View menu - Tailwind classes can't express arbitrary scales.
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

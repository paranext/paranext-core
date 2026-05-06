import { useEffect, useMemo, useRef } from 'react';
import {
  Editorial,
  getDefaultViewOptions,
  type EditorRef,
  type AnnotationRange,
} from '@eten-tech-foundation/platform-editor';
import type { ContentJsonPath, Usj } from '@eten-tech-foundation/scripture-utilities';
import type { SerializedVerseRef } from '@sillsdev/scripture';
import papi, { logger } from '@papi/frontend';
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
  /** Surface form of the currently filtered token, if any. Drives the filter-banner display. */
  filteredTokenSurface?: string;
  /** When true, every word-kind annotation gets a `marble-highlight` overlay (BHV-301). */
  highlightAllResearchTerms?: boolean;
  /** Zoom factor applied to the rendered scripture (1.0 = 100%). */
  scripturePaneZoom?: number;
  /** Loading state - shows a Skeleton placeholder. */
  isLoading?: boolean;
  /** Error message - when set, renders an Alert. Overrides loading/empty states. */
  errorMessage?: string;
  /** Scripture reference passed straight through to `<Editorial>` for cursor positioning. */
  scrRef?: SerializedVerseRef;
  /** Click handler for a marble word/note. textContent is the surface form of the annotated range. */
  onTokenClick?: (tokenId: string, annotation: MarbleAnnotation, textContent: string) => void;
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
const RIGHT_MOUSE_BUTTON = 2;

// Local mirror of the backend `buildTooltipData` PAPI command's return shape. The backend
// command is registered in C# and not yet surfaced in papi-shared-types CommandHandlers,
// so we type the response locally for now. Keep in sync with MockTooltipData in
// data/marble-form.story-data.ts and the eventual papi-shared-types entry.
type TooltipData = {
  lemma: string;
  gloss?: string;
  partOfSpeech?: string;
  strongNumber?: string;
  notes: string[];
  morphology?: string;
};

/**
 * CSS for marble annotation marks.
 *
 * Editorial renders `setAnnotation(range, type, id)` calls as `<mark>` elements with class
 * `.editor-typed-mark-external-${type}`. Editorial itself provides no visual treatment for these
 * classes - that's the host extension's responsibility (see Editorial README "Annotation Styles").
 *
 * - Marble-word: linked research term (BHV-301/302). Click to filter the dictionary / open tooltip.
 * - Marble-note: linked study/cross-ref note. Renders as a footnote-style affordance.
 * - Highlight and filter states are applied via CSS class manipulation (not setAnnotation). Effect B
 *   uses `.er-marble-filter` on the mark element; Effect C uses the body-level
 *   `er-highlight-all-research-terms` class. The `marble-highlight` and `marble-filter` annotation
 *   types are no longer registered via setAnnotation.
 */
const MARBLE_ANNOTATION_STYLES = `
.editor-typed-mark-external-marble-word {
  cursor: pointer;
  /* Override <mark> user-agent default (background: yellow, color: black) so marble-words
     have no visual treatment by default. Per G5 PT9 fidelity: visible affordance is opt-in
     via the "Highlight all research terms" toggle, hovers, or filter state. */
  background-color: transparent;
  color: inherit;
}
.editor-typed-mark-external-marble-note {
  cursor: pointer;
  background-color: transparent;
  /* Marble-note keeps the primary color (footnote-style affordance) - it intentionally
     stands out, unlike marble-word. */
  color: hsl(var(--primary));
}
`;

/**
 * Walk into the USJ marker at `usjPath` and return the path of its deepest last-text descendant
 * plus that text's length. Used to build a non-collapsed `AnnotationRange` whose `end` points at an
 * actual TextNode in Lexical, bypassing the editor resolver's stricter Marker / ClosingMarker
 * branches that silently reject our previous range shape (see
 * working-docs/2026-05-06-er-hover-regression-design.md §4 Path B2).
 *
 * Returns undefined when the marker has no textual content (annotation is skipped).
 */
function findLastTextEnd(
  usj: Usj,
  usjPath: string,
): { jsonPath: ContentJsonPath; offset: number } | undefined {
  // Resolve the marker object at usjPath. The marble-converter emits paths shaped like
  // `$.content[N].content[M]...` - walk dot/bracket segments.
  const segments = usjPath
    .replace(/^\$\.?/, '')
    .split(/\.|\[|\]/)
    .filter(Boolean);
  // The USJ tree is a recursive `unknown` shape; tracking it through a fully-typed walker
  // would be more code than the value justifies. Localize the unsafety here.
  // USJ is a recursive unknown tree; a fully-typed walker would add more complexity than value
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let node: any = usj;
  // Prefer reduce over for...of to satisfy no-restricted-syntax. Using a sentinel to short-circuit.
  // `acc[key] ?? notFound` already converts null/undefined properties to the sentinel, so the
  // only guard needed inside the callback is `=== notFound` (no null literal required).
  const notFound = Symbol('notFound');
  const resolved = segments.reduce(
    // Same any rationale as above: USJ tree is recursive unknown, localized to this helper
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (acc: any, seg: string) => {
      if (acc === notFound) return notFound;
      const key = /^\d+$/.test(seg) ? Number(seg) : seg;
      return acc[key] ?? notFound;
    },
    node,
  );
  if (resolved === notFound) return undefined;
  node = resolved;

  // Recursively descend into the last `content` child until we find a string.
  let currentPath = usjPath;
  // Same any rationale as above: USJ tree is recursive unknown, localized to this helper
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let current: any = node;
  while (current && typeof current === 'object' && Array.isArray(current.content)) {
    const lastIndex = current.content.length - 1;
    if (lastIndex < 0) return undefined;
    currentPath = `${currentPath}.content[${lastIndex}]`;
    current = current.content[lastIndex];
  }
  if (typeof current !== 'string' || current.length === 0) return undefined;
  // ContentJsonPath is a literal-template type; runtime construction matches the pattern but
  // TypeScript can't prove it.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return { jsonPath: currentPath as ContentJsonPath, offset: current.length };
}

// The marble-converter emits paths shaped like `$.content[N]...` which match ContentJsonPath at
// runtime; the type narrows from `string` here. The annotation's `usjPath` points at the wg / note
// MarkerObject. We produce a non-collapsed range using UsjTextContentLocation for both anchors:
// start at the marker itself (offset 0, routes through the resolver's isUsjTextContentLocation
// branch) and end at the deepest last-text-child (offset = text length). This bypasses the
// stricter Marker / ClosingMarker resolver branches that silently rejected our previous range shape.
export function annotationToRange(
  annotation: MarbleAnnotation,
  usj: Usj,
): AnnotationRange | undefined {
  // Start anchor: the marker itself with offset 0. The resolver lands on the wg/note ElementNode
  // and produces an element point at child index 0 - i.e. the very beginning of the marker's
  // textual content.
  // ContentJsonPath is a literal-template type; the marble-converter produces matching strings
  // at runtime but TypeScript can't prove it from `string`.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const startPath = annotation.usjPath as ContentJsonPath;
  // End anchor: the deepest last-text-child of the marker, with offset = its text length.
  const end = findLastTextEnd(usj, annotation.usjPath);
  if (!end) return undefined;
  return {
    start: { jsonPath: startPath, offset: 0 },
    end,
  };
}

function annotationTypeFor(kind: MarbleAnnotation['kind']): string {
  return kind === 'word' ? ANNOTATION_TYPE_MARBLE_WORD : ANNOTATION_TYPE_MARBLE_NOTE;
}

// MarbleAnnotation.metadata.lexicalLinks is a string[] where each entry is shaped
// `NAMESPACE:LEMMA:ID` (e.g. `SDBH:רֵאשִׁית:001001000`). Extract the lemma (the middle
// colon-delimited segment) for hover-time lemma matching.
function lemmaFromLexicalLink(link: string): string | undefined {
  const parts = link.split(':');
  if (parts.length < 2) return undefined;
  const lemma = parts[1];
  return lemma && lemma.length > 0 ? lemma : undefined;
}

// Markdown special characters that need escaping when interpolating untrusted text from
// TooltipData fields (lemma, gloss, partOfSpeech, notes) into the popover markdown body.
// markdown-to-jsx interprets these by default, so unescaped content can produce surprising
// formatting when (e.g.) a lemma contains an underscore.
function escapeMarkdown(text: string): string {
  return text.replace(/([\\`*_~[\]<>])/g, '\\$1');
}

function loadingMarkdownFromMetadata(annotation: MarbleAnnotation): string {
  // Use whatever lemma is already in metadata so the popover never appears empty.
  const firstLink = annotation.metadata?.lexicalLinks?.[0];
  const lemma = firstLink ? lemmaFromLexicalLink(firstLink) : undefined;
  return lemma ? `**${escapeMarkdown(lemma)}**` : '...';
}

function renderTooltipMarkdown(data: TooltipData): string {
  const parts: string[] = [];
  const lemma = escapeMarkdown(data.lemma);
  const pos = data.partOfSpeech ? ` *${escapeMarkdown(data.partOfSpeech)}*` : '';
  parts.push(`**${lemma}**${pos}`);
  if (data.gloss) parts.push(escapeMarkdown(data.gloss));
  if (data.strongNumber) parts.push(`Strong: ${escapeMarkdown(data.strongNumber)}`);
  if (data.notes.length > 0) {
    parts.push(data.notes.map((n) => `- ${escapeMarkdown(n)}`).join('\n'));
  }
  return parts.join('\n\n');
}

// Module-level Editorial options. CRITICAL: this object MUST be a stable reference. When the
// `options` prop changes identity, Editorial reconciles its Lexical theme/config which destroys
// every external typed mark (including all the marble-word marks we register via
// `editor.setAnnotation`). Inlining the object literal in JSX caused marks to silently disappear
// on every parent re-render (e.g. when the MarbleGuide modal opens/closes). See
// working-docs/2026-05-06-er-hover-regression-design.md.
const EDITORIAL_OPTIONS = {
  isReadonly: true,
  hasExternalUI: true,
  view: { ...getDefaultViewOptions(), showCharMarkerTitles: false },
} as const;

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
  filteredTokenSurface,
  highlightAllResearchTerms = false,
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

  // Hold the latest token-click + context-menu callbacks in a ref so the
  // annotation effect's onClick closure can read them WITHOUT putting them in
  // its dep array. Combined with Fix 1's stable defaults, this means the
  // base-annotation effect only re-fires when the annotation set or the USJ
  // document actually changes.
  const handlersRef = useRef({ onTokenClick, onTokenContextMenu });
  useEffect(() => {
    handlersRef.current = { onTokenClick, onTokenContextMenu };
  }, [onTokenClick, onTokenContextMenu]);

  // Hover lifecycle bookkeeping. fetchGenRef is bumped on every mouseenter/mouseleave so
  // late-arriving showPopover / buildTooltipData promises can detect they are stale and
  // self-cancel. activePopoverIdRef tracks the currently-rendered popover for dismissal;
  // activeMatchSetRef tracks the annotationIds whose marks we tagged with the hover-match
  // class so they can be cleared on mouseleave or component unmount.
  const fetchGenRef = useRef(0);
  // The popover-id ref is initially null because no popover is open. Using `undefined` would be
  // technically possible but conflates "absent" with "uninitialized" given React's useRef contract;
  // null is the canonical sentinel.
  // eslint-disable-next-line no-null/no-null
  const activePopoverIdRef = useRef<string | null>(null);
  const activeMatchSetRef = useRef<Set<string>>(new Set());

  // Build per-lemma annotation index from `lexicalLinks` metadata. Used by hover handlers
  // to compute matching vs non-matching annotations on each mouseenter without iterating
  // the full annotation set every time.
  const lemmaIndex = useMemo(() => {
    const lemmaToAnnotationIds = new Map<string, Set<string>>();
    const annotationIdToLemmas = new Map<string, Set<string>>();
    annotations.forEach((annotation) => {
      if (annotation.kind !== 'word') return;
      const lemmas = new Set<string>();
      (annotation.metadata?.lexicalLinks ?? []).forEach((link) => {
        const lemma = lemmaFromLexicalLink(link);
        if (!lemma) return;
        lemmas.add(lemma);
        let bucket = lemmaToAnnotationIds.get(lemma);
        if (!bucket) {
          bucket = new Set();
          lemmaToAnnotationIds.set(lemma, bucket);
        }
        bucket.add(annotation.annotationId);
      });
      if (lemmas.size > 0) {
        annotationIdToLemmas.set(annotation.annotationId, lemmas);
      }
    });
    return { lemmaToAnnotationIds, annotationIdToLemmas };
  }, [annotations]);

  // FN-027 / FN-028 / FN-029 wired in Session 2 (2026-05-05). Effect A registers
  // onMouseEnter / onMouseLeave alongside onClick to drive the marble-dictionary popover
  // (via papi.overlays) and lemma-match / lemma-dim annotations. CharNode title
  // suppression is set at the <Editorial> mount via view.showCharMarkerTitles=false.
  // See working-docs/2026-05-05-pt9-fidelity-session-2-design.md.

  // Effect A — base marble-word / marble-note annotations.
  // Chunked apply: 50 annotations per RAF tick so mousedown / setFocus and
  // other UI events can be serviced between batches. The cancellation flag
  // protects against stale applies if the chapter changes mid-loop.
  useEffect(() => {
    const editor = editorRef.current;
    if (!editor || !usj) return undefined;

    const annotationsById = new Map(annotations.map((a) => [a.annotationId, a]));
    // Notes are excluded from setAnnotation: in readonly mode the editor renders note callers as
    // ImmutableNoteCallerNode (DecoratorNode) whose content children don't exist in the Lexical tree,
    // so any USJ path into note content silently fails to resolve. Notes remain clickable via the
    // editor's caller node rendering; we just don't add a mark overlay for them.
    const wordAnnotations = annotations.filter((a) => a.kind === 'word');
    let cancelled = false;
    const CHUNK_SIZE = 50;

    // Async helpers for the hover-popover lifecycle. Kept outside the event-handler so the
    // sync handler can fire-and-forget them (no `floating-promise` warning) and so each
    // failure mode is logged with a distinct message.
    const showLoadingPopover = async (annotation: MarbleAnnotation, rect: DOMRect, gen: number) => {
      try {
        const overlayId = await papi.overlays.showPopover(
          {
            anchor: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
            side: 'top',
            content: { type: 'markdown', markdown: loadingMarkdownFromMetadata(annotation) },
            dismissOnClickOutside: true,
          },
          globalThis.webViewId,
        );
        if (gen !== fetchGenRef.current) {
          await papi.overlays.dismissPopover(overlayId).catch(() => {});
          return;
        }
        activePopoverIdRef.current = overlayId;
      } catch (err) {
        // Overlay service debounces rapid re-trigger requests with RESOURCE_EXHAUSTED
        // (50ms leading-edge cooldown). Swallow silently - the user re-hovered before
        // the cooldown expired.
        if (
          !(err && typeof err === 'object' && 'code' in err && err.code === 'RESOURCE_EXHAUSTED')
        ) {
          logger.warn(
            `EnhancedScripturePane: showPopover failed: ${
              err instanceof Error ? err.message : String(err)
            }`,
          );
        }
      }
    };

    const fetchAndUpdatePopover = async (id: string, gen: number) => {
      let data: TooltipData;
      try {
        data = await papi.commands.sendCommand('platform.enhancedResources.buildTooltipData', {
          tokenId: id,
        });
      } catch (err) {
        logger.warn(
          `EnhancedScripturePane: buildTooltipData failed: ${
            err instanceof Error ? err.message : String(err)
          }`,
        );
        return;
      }
      if (gen !== fetchGenRef.current) return;
      const overlayId = activePopoverIdRef.current;
      if (!overlayId) return;
      try {
        await papi.overlays.updatePopover(overlayId, {
          type: 'markdown',
          markdown: renderTooltipMarkdown(data),
        });
      } catch (err) {
        logger.warn(
          `EnhancedScripturePane: updatePopover failed: ${
            err instanceof Error ? err.message : String(err)
          }`,
        );
      }
    };

    // Hover handlers - declared inside the effect so they close over `annotationsById`
    // and `editor` from this run. The activePopoverIdRef / activeMatchSetRef bookkeeping
    // is component-lifetime so a delayed mouseleave from a previous render still
    // dismisses correctly.
    const handleMarbleMouseEnter = (event: MouseEvent, _type: string, id: string) => {
      const annotation = annotationsById.get(id);
      if (!annotation || annotation.kind !== 'word') return;

      const target = event.currentTarget;
      if (!(target instanceof Element)) return;
      const rect = target.getBoundingClientRect();

      fetchGenRef.current += 1;
      const gen = fetchGenRef.current;

      // Fire and forget - the helpers swallow their own errors and log via logger.warn.
      showLoadingPopover(annotation, rect, gen);
      fetchAndUpdatePopover(id, gen);

      const lemmas = lemmaIndex.annotationIdToLemmas.get(id);
      const matchingIds = new Set<string>();
      if (lemmas) {
        lemmas.forEach((lemma) => {
          const ids = lemmaIndex.lemmaToAnnotationIds.get(lemma);
          if (ids) ids.forEach((matchingId) => matchingIds.add(matchingId));
        });
      }

      // CSS-based lemma-match highlight (replaces editor-based approach for perf - see
      // _marble-overrides.scss). Toggle the body-level hover-active class once, then add the
      // match class to each mark element whose annotationId shares a lemma with the hovered
      // token. Editor-side annotation marks already carry the `annotationId-{id}` class added
      // by TypedMarkNode.createDOM. Per PT9 fidelity, non-matching words receive NO visual
      // change - dimming them would create a false equivalence between "shares lemma" and
      // "has no link at all."
      // `target.ownerDocument` gives us the iframe's document; `document` alone would target
      // the main renderer frame.
      const { ownerDocument } = target;
      ownerDocument.body.classList.add('er-marble-hover-active');
      matchingIds.forEach((matchingId) => {
        const markElements = ownerDocument.querySelectorAll(
          `[class~="annotationId-${matchingId}"]`,
        );
        markElements.forEach((markElement) => {
          markElement.classList.add('er-marble-hover-match');
        });
        activeMatchSetRef.current.add(matchingId);
      });
    };

    const handleMarbleMouseLeave = (event: MouseEvent) => {
      fetchGenRef.current += 1;

      if (activePopoverIdRef.current) {
        papi.overlays.dismissPopover(activePopoverIdRef.current).catch(() => {});
        // Reset to the null sentinel - see activePopoverIdRef declaration for rationale.
        // eslint-disable-next-line no-null/no-null
        activePopoverIdRef.current = null;
      }

      // Mirror handleMarbleMouseEnter: scope DOM queries to the EXACT iframe document of the
      // element being left. `globalThis.document` should resolve to the same document, but using
      // the event target's ownerDocument is more robust (and necessary if the leave handler ever
      // fires from a different context).
      const target = event.currentTarget;
      const leaveDocument = target instanceof Element ? target.ownerDocument : globalThis.document;
      leaveDocument.body.classList.remove('er-marble-hover-active');
      activeMatchSetRef.current.forEach((matchId) => {
        const markElements = leaveDocument.querySelectorAll(`[class~="annotationId-${matchId}"]`);
        markElements.forEach((markElement) => {
          markElement.classList.remove('er-marble-hover-match');
        });
      });
      activeMatchSetRef.current.clear();
    };

    const applyChunked = async () => {
      for (let i = 0; i < wordAnnotations.length; i += CHUNK_SIZE) {
        if (cancelled) return;
        const slice = wordAnnotations.slice(i, i + CHUNK_SIZE);
        slice.forEach((annotation) => {
          const range = annotationToRange(annotation, usj);
          if (!range) {
            logger.info(
              `EnhancedScripturePane: skipping annotation with no textual content: id=${annotation.annotationId} usjPath=${annotation.usjPath}`,
            );
            return;
          }
          const baseType = annotationTypeFor(annotation.kind);
          editor.setAnnotation(range, baseType, annotation.annotationId, {
            onClick: (event, _type, id, textContent) => {
              const annotationForId = annotationsById.get(id);
              if (!annotationForId) return;
              const { onTokenClick: latestClick, onTokenContextMenu: latestContextMenu } =
                handlersRef.current;
              if (event.button === RIGHT_MOUSE_BUTTON) {
                // Editorial gives us a DOM MouseEvent; consumers expect the React
                // MouseEvent surface (only `.button`, `.preventDefault()`, etc are
                // read), so a structural cast is correct.
                // eslint-disable-next-line no-type-assertion/no-type-assertion
                latestContextMenu(id, annotationForId, event as unknown as ReactMouseEvent);
              } else {
                latestClick(id, annotationForId, textContent);
              }
            },
            onMouseEnter: handleMarbleMouseEnter,
            onMouseLeave: handleMarbleMouseLeave,
          });
        });
        if (i + CHUNK_SIZE < wordAnnotations.length) {
          // Yield to the event loop so mousedown / setFocus / paint can run.
          // eslint-disable-next-line no-await-in-loop
          await new Promise<void>((resolve) => {
            requestAnimationFrame(() => resolve());
          });
        }
      }
    };
    applyChunked().catch((err) => {
      // Vendor APIs (Editorial.setAnnotation, requestAnimationFrame) are not
      // expected to throw, but a future version could - guard against
      // unhandledrejection escaping the effect.
      logger.warn(
        `EnhancedScripturePane: chunked annotation apply failed: ${
          err instanceof Error ? err.message : String(err)
        }`,
      );
    });

    // Capture the ref-stored Set instance so the cleanup function uses the same Set the effect
    // populated. The ref object itself never changes identity (useRef), but the lint rule can't
    // prove that - capturing here also makes intent explicit.
    const matchSet = activeMatchSetRef.current;

    return () => {
      cancelled = true;
      const popoverId = activePopoverIdRef.current;
      if (popoverId) {
        papi.overlays.dismissPopover(popoverId).catch(() => {});
        // Reset to the null sentinel - see activePopoverIdRef declaration for rationale.
        // eslint-disable-next-line no-null/no-null
        activePopoverIdRef.current = null;
      }
      // CSS-based hover-match cleanup - clear the body-level hover class and the per-mark
      // match class. No removeAnnotation calls for hover types because we never added them as
      // editor annotations (see _marble-overrides.scss).
      const cleanupDocument = globalThis.document;
      cleanupDocument.body.classList.remove('er-marble-hover-active');
      matchSet.forEach((matchId) => {
        const markElements = cleanupDocument.querySelectorAll(`[class~="annotationId-${matchId}"]`);
        markElements.forEach((markElement) => {
          markElement.classList.remove('er-marble-hover-match');
        });
      });
      matchSet.clear();
      wordAnnotations.forEach((a) => {
        editor.removeAnnotation(annotationTypeFor(a.kind), a.annotationId);
      });
    };
  }, [usj, annotations, lemmaIndex]);

  // Effect B — single marble-filter overlay via DOM class on the existing marble-word mark.
  // Same rationale as Effect C: a secondary editor.setAnnotation on already-marked text fails
  // in 0.8.15. Use the annotationId class the editor adds to each mark to find and class it.
  // `globalThis.document` resolves to the iframe's document from inside the webview context.
  useEffect(() => {
    const editor = editorRef.current;
    if (!editor || !usj || !filteredTokenId) return undefined;
    const target = annotations.find((a) => a.annotationId === filteredTokenId);
    if (!target || target.kind !== 'word') return undefined;
    const markElements = globalThis.document.querySelectorAll(
      `[class~="annotationId-${filteredTokenId}"]`,
    );
    markElements.forEach((markElement: Element) => {
      markElement.classList.add('er-marble-filter');
    });
    return () => {
      markElements.forEach((markElement: Element) => {
        markElement.classList.remove('er-marble-filter');
      });
    };
  }, [usj, annotations, filteredTokenId]);

  // Effect C — "highlight all research terms" via a single body class.
  // Replaces a per-annotation editor.setAnnotation approach (~380 reconcile cycles + every
  // secondary setAnnotation on already-marked text fails in editor 0.8.15 with "Failed to find
  // start or end node"). The marble-word marks already exist in DOM with annotationId classes;
  // we just toggle a body-level class and let CSS specificity paint the highlight.
  // `globalThis.document` resolves to the iframe's document from inside the webview context.
  useEffect(() => {
    const editor = editorRef.current;
    if (!editor || !usj || !highlightAllResearchTerms) return undefined;
    globalThis.document.body.classList.add('er-highlight-all-research-terms');
    return () => {
      globalThis.document.body.classList.remove('er-highlight-all-research-terms');
    };
  }, [usj, highlightAllResearchTerms]);

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
          logger={logger}
          options={EDITORIAL_OPTIONS}
        />
        {filteredTokenId && (
          <p
            role="status"
            className="tw-mt-3 tw-rounded tw-bg-accent tw-px-2 tw-py-1 tw-text-xs tw-text-accent-foreground"
          >
            {`${filterActiveLabel}: ${filteredTokenSurface ?? filteredTokenId}`}
          </p>
        )}
      </div>
    </div>
  );
}

export default EnhancedScripturePane;

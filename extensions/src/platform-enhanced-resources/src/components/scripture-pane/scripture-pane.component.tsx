import { useCallback, useEffect, useMemo, useRef } from 'react';
import {
  Editorial,
  getDefaultViewOptions,
  type EditorRef,
  type AnnotationRange,
} from '@eten-tech-foundation/platform-editor';
import type { ContentJsonPath, Usj } from '@eten-tech-foundation/scripture-utilities';
import { Canon, type SerializedVerseRef } from '@sillsdev/scripture';
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
import type { EnhancedResourcesNetworkObject } from '../../lib/use-enhanced-resources-proxy';
import {
  presentTooltip,
  type TooltipDataInput,
  type TooltipViewModel,
  type TooltipPresenterHelpers,
} from '../../presenters/tooltip-presenter';

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
  '%enhancedResources_tooltip_phrase%',
  '%enhancedResources_tooltip_noGloss%',
  '%enhancedResources_tooltip_lemmaLabel%',
  '%enhancedResources_tooltip_noRenderingsForTerm%',
  '%enhancedResources_tooltip_deniedRendering%',
  '%enhancedResources_tooltip_missingRendering%',
  '%enhancedResources_tooltip_guessedRenderingFound%',
  '%enhancedResources_tooltip_renderingFound%',
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
  /**
   * Network-object proxy for backend calls (buildTooltipData). When undefined the popover stays on
   * the loading-state markdown without attempting a backend fetch.
   */
  erProxy?: EnhancedResourcesNetworkObject;
  /** Resource id (e.g., "ESV16UK+") - threaded into TooltipInputDto. Required for popover content. */
  resourceId?: string;
  /** User's preferred gloss language (e.g., "en") - threaded into TooltipInputDto. */
  glossLanguage?: string;
};

const ANNOTATION_TYPE_MARBLE_WORD = 'marble-word';
const ANNOTATION_TYPE_MARBLE_NOTE = 'marble-note';
const ANNOTATION_TYPE_FILTER = 'marble-filter';
const ANNOTATION_TYPE_HIGHLIGHT = 'marble-highlight';
const ANNOTATION_TYPE_HOVER_MATCH = 'marble-hover-match';
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
 * - Highlight, filter, and lemma-match states are layered via secondary `editor.setAnnotation` calls
 *   using `marble-highlight`, `marble-filter`, and `marble-hover-match` types. See the
 *   `_marble-overrides.scss` partial for visual treatment.
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
// TooltipViewModel fields (lemma, gloss, sourceForm, posRaw, etc.) into the popover markdown
// body. markdown-to-jsx interprets these by default, so unescaped content can produce
// surprising formatting when (e.g.) a lemma contains an underscore.
function escapeMarkdown(text: string): string {
  return text.replace(/([\\`*_~[\]<>])/g, '\\$1');
}

/**
 * Detect Hebrew vs. Greek from a source-form's Unicode block range. Returns 'Hebrew' for any
 * Hebrew-block character (U+0590-U+05FF), 'Greek' for any Greek-block character (U+0370-U+03FF), or
 * undefined for ambiguous / Latin / mixed input.
 *
 * Used to decide which language to pass to translatePartOfSpeech, since the new TooltipData DTO no
 * longer carries StrongNumber (which previously hinted H/G).
 */
function detectSourceLanguage(sourceForm: string): 'Hebrew' | 'Greek' | undefined {
  for (let i = 0; i < sourceForm.length; i += 1) {
    const code = sourceForm.charCodeAt(i);
    if (code >= 0x0590 && code <= 0x05ff) return 'Hebrew';
    if (code >= 0x0370 && code <= 0x03ff) return 'Greek';
  }
  return undefined;
}

function loadingMarkdownFromMetadata(annotation: MarbleAnnotation): string {
  // Use whatever lemma is already in metadata so the popover never appears empty.
  const firstLink = annotation.metadata?.lexicalLinks?.[0];
  const lemma = firstLink ? lemmaFromLexicalLink(firstLink) : undefined;
  return lemma ? `**${escapeMarkdown(lemma)}**` : '...';
}

type TooltipLocalizer = (key: ScripturePaneLocalizedStringKey) => string;

type WordViewModel = Extract<TooltipViewModel, { kind: 'word' }>;
type RenderingStatusViewModel = NonNullable<WordViewModel['renderingStatus']>;

export function renderTooltipMarkdown(
  viewModel: TooltipViewModel,
  localize: TooltipLocalizer,
): string {
  if (viewModel.kind === 'phrase') {
    return [
      `**${escapeMarkdown(viewModel.sourceForm)}**`,
      localize('%enhancedResources_tooltip_phrase%'),
    ].join('\n\n');
  }

  const lines: string[] = [`**${escapeMarkdown(viewModel.sourceForm)}**`];

  if (viewModel.posLocalized) {
    lines.push(
      `**${escapeMarkdown(viewModel.posLocalized)}** (${escapeMarkdown(viewModel.posRaw)})`,
    );
  } else if (viewModel.posRaw) {
    lines.push(`**${escapeMarkdown(viewModel.posRaw)}**`);
  }

  lines.push(
    `${localize('%enhancedResources_tooltip_lemmaLabel%')} **${escapeMarkdown(viewModel.lemma)}**`,
  );
  lines.push(
    viewModel.gloss
      ? escapeMarkdown(viewModel.gloss)
      : localize('%enhancedResources_tooltip_noGloss%'),
  );

  if (viewModel.renderingStatus) {
    lines.push(renderRenderingStatusLine(viewModel.renderingStatus, localize));
  }

  return lines.join('\n\n');
}

function renderRenderingStatusLine(
  status: RenderingStatusViewModel,
  localize: TooltipLocalizer,
): string {
  const projectName = escapeMarkdown(status.trackedProjectName ?? '');
  const foundRendering = escapeMarkdown(status.foundRendering ?? '');
  switch (status.code) {
    case 'noRenderingsEntered':
      return localize('%enhancedResources_tooltip_noRenderingsForTerm%').replace(
        '{0}',
        projectName,
      );
    case 'renderingDeniedInVerse':
      return localize('%enhancedResources_tooltip_deniedRendering%').replace('{0}', projectName);
    case 'renderingMissingInVerse':
    case 'noVerseText':
      return localize('%enhancedResources_tooltip_missingRendering%').replace('{0}', projectName);
    case 'guessedRenderingFound':
      return localize('%enhancedResources_tooltip_guessedRenderingFound%')
        .replace('{0}', foundRendering)
        .replace('{1}', projectName);
    case 'renderingFound':
      return localize('%enhancedResources_tooltip_renderingFound%')
        .replace('{0}', foundRendering)
        .replace('{1}', projectName);
    default: {
      // Exhaustiveness check - if a new code is added to RenderingStatusViewModel without a
      // case here, TypeScript will fail this assignment at build time.
      return assertNever(status.code);
    }
  }
}

function assertNever(value: never): never {
  // The runtime fallthrough should be unreachable; the compile-time `never` parameter is
  // the actual safety guarantee. Keep this trivial helper colocated with the only caller.
  throw new Error(`Unhandled rendering-status code: ${String(value)}`);
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
  erProxy,
  resourceId,
  glossLanguage,
}: EnhancedScripturePaneProps) {
  // Editorial's forwarded ref is typed `EditorRef | null`; we match that to satisfy the prop type.
  // eslint-disable-next-line no-null/no-null
  const editorRef = useRef<EditorRef | null>(null);
  // Inject the marble annotation stylesheet so the `<mark>` elements Editorial creates have a
  // visible treatment. The stylesheet is static; useStylesheet adds a single `<style>` tag for
  // the lifetime of this component.
  useStylesheet(MARBLE_ANNOTATION_STYLES);
  // Stable identity across renders that don't change the strings bag - keeps the localizer
  // ref's sync effect from firing on every render.
  const stringsBag = localizedStringsWithLoadingState[0];
  const getLocalizedString = useCallback(
    (key: ScripturePaneLocalizedStringKey) => stringsBag[key] ?? key,
    [stringsBag],
  );

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

  // Hold the proxy + tooltip-input fields in refs so the annotation effect's hover callbacks
  // (declared inside the effect) can read the latest values without taking these in the dep
  // array - which would re-run the chunked annotation apply on every prop change.
  const erProxyRef = useRef(erProxy);
  useEffect(() => {
    erProxyRef.current = erProxy;
  }, [erProxy]);
  const resourceIdRef = useRef(resourceId);
  useEffect(() => {
    resourceIdRef.current = resourceId;
  }, [resourceId]);
  const glossLanguageRef = useRef(glossLanguage);
  useEffect(() => {
    glossLanguageRef.current = glossLanguage;
  }, [glossLanguage]);

  // Hold the latest scrRef + localizer in refs so the annotation effect's hover callbacks
  // (which read these inside fetchAndUpdatePopover) don't have to re-fire the chunked apply
  // every time scrRef changes (BCV move) or strings finish loading.
  const scrRefRef = useRef(scrRef);
  useEffect(() => {
    scrRefRef.current = scrRef;
  }, [scrRef]);
  const localizeRef = useRef<(key: ScripturePaneLocalizedStringKey) => string>((key) => key);
  useEffect(() => {
    localizeRef.current = getLocalizedString;
  }, [getLocalizedString]);

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
  // Fix D-14: track the currently-hovered annotation id so re-fires of mouseenter
  // from editor-induced mark re-renders (caused by setAnnotation('marble-hover-match', ...))
  // are no-oped. Without this guard, the popover-fetch race kicks in: every re-fire bumps
  // fetchGenRef, so most in-flight buildTooltipData calls abort at the gen-staleness check.
  const currentlyHoveredIdRef = useRef<string | undefined>(undefined);

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
      const proxy = erProxyRef.current;
      const currentResourceId = resourceIdRef.current;
      const currentGlossLanguage = glossLanguageRef.current;
      const currentScrRef = scrRefRef.current;
      if (!proxy || !currentResourceId || !currentGlossLanguage || !currentScrRef) {
        // proxy not yet resolved or required inputs missing; loading-state markdown stays.
        return;
      }

      // Convert SerializedVerseRef (`book` is the 3-letter id) to the wire VerseRefDto
      // shape (`bookNum`) the C# network object expects. Mirrors the conversion in
      // enhanced-resource.web-view.tsx for `loadDictionary` / `loadEncyclopedia` etc.
      const bookNum = Canon.bookIdToNumber(currentScrRef.book);
      if (bookNum <= 0) return;

      let data: TooltipDataInput;
      try {
        data = await proxy.buildTooltipData({
          resourceId: currentResourceId,
          tokenId: id,
          currentReference: {
            bookNum,
            chapterNum: currentScrRef.chapterNum,
            verseNum: currentScrRef.verseNum,
          },
          glossLanguage: currentGlossLanguage,
          // trackedProjectId is reserved for Phase 3b; undefined here.
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

      // Localize POS via the existing translatePartOfSpeech proxy method.
      // Source language is detected from the source-form script (Hebrew vs. Greek block ranges)
      // since the new DTO no longer carries StrongNumber. Falls back to raw POS if the lookup
      // fails or returns IsKnown=false.
      const posLanguage = detectSourceLanguage(data.sourceForm);
      let posLocalized: string | undefined;
      if (data.partOfSpeechRaw && posLanguage) {
        try {
          const result = await proxy.translatePartOfSpeech(
            data.partOfSpeechRaw,
            posLanguage,
            'long',
          );
          if (result.isKnown) posLocalized = result.displayString;
        } catch (err) {
          logger.warn(
            `EnhancedScripturePane: translatePartOfSpeech failed: ${
              err instanceof Error ? err.message : String(err)
            }`,
          );
        }
      }
      if (gen !== fetchGenRef.current) return;

      // Inject the resolved POS into the presenter helpers for this single render pass.
      const helpers: TooltipPresenterHelpers = {
        localizePartOfSpeech: (raw) => (raw === data.partOfSpeechRaw ? posLocalized : undefined),
      };

      const overlayId = activePopoverIdRef.current;
      if (!overlayId) return;
      try {
        const viewModel = presentTooltip(data, helpers);
        await papi.overlays.updatePopover(overlayId, {
          type: 'markdown',
          markdown: renderTooltipMarkdown(viewModel, localizeRef.current),
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

      // Fix D-14: ignore re-fires for the same id (editor recreates marks after
      // setAnnotation('marble-hover-match', ...) updates, which re-fires React's
      // synthetic mouseenter on the new element under the cursor).
      if (id === currentlyHoveredIdRef.current) return;
      currentlyHoveredIdRef.current = id;

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
      // Annotate every matching word via editor.setAnnotation. Lemma-match annotations
      // share their id with the underlying word annotation - the editor merges multiple
      // type+id pairs onto the same range (AnnotationPlugin.test.tsx:97/161).
      matchingIds.forEach((matchingId) => {
        const matchingAnnotation = annotationsById.get(matchingId);
        if (!matchingAnnotation) return;
        const matchRange = annotationToRange(matchingAnnotation, usj);
        if (!matchRange) return;
        editor.setAnnotation(matchRange, ANNOTATION_TYPE_HOVER_MATCH, matchingId, {});
        activeMatchSetRef.current.add(matchingId);
      });
    };

    const handleMarbleMouseLeave = () => {
      currentlyHoveredIdRef.current = undefined;
      fetchGenRef.current += 1;

      if (activePopoverIdRef.current) {
        papi.overlays.dismissPopover(activePopoverIdRef.current).catch(() => {});
        // Reset to the null sentinel - see activePopoverIdRef declaration for rationale.
        // eslint-disable-next-line no-null/no-null
        activePopoverIdRef.current = null;
      }

      activeMatchSetRef.current.forEach((matchId) => {
        editor.removeAnnotation(ANNOTATION_TYPE_HOVER_MATCH, matchId);
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
      matchSet.forEach((matchId) => {
        editor.removeAnnotation(ANNOTATION_TYPE_HOVER_MATCH, matchId);
      });
      matchSet.clear();
      currentlyHoveredIdRef.current = undefined;
      wordAnnotations.forEach((a) => {
        editor.removeAnnotation(annotationTypeFor(a.kind), a.annotationId);
      });
    };
  }, [usj, annotations, lemmaIndex]);

  // Effect B - single marble-filter overlay via editor.setAnnotation.
  // Re-runs when the filtered-token id or annotation set changes.
  useEffect(() => {
    const editor = editorRef.current;
    if (!editor || !usj || !filteredTokenId) return undefined;
    const target = annotations.find((a) => a.annotationId === filteredTokenId);
    if (!target || target.kind !== 'word') return undefined;
    const range = annotationToRange(target, usj);
    if (!range) return undefined;
    editor.setAnnotation(range, ANNOTATION_TYPE_FILTER, filteredTokenId, {});
    return () => {
      editor.removeAnnotation(ANNOTATION_TYPE_FILTER, filteredTokenId);
    };
  }, [usj, annotations, filteredTokenId]);

  // Effect C - per-annotation marble-highlight overlays via editor.setAnnotation.
  // Chunked RAF apply matches Effect A's pattern; running this un-chunked produced a
  // multi-second click-handler stall (Chrome `[Violation] 'click' handler took >8000ms`)
  // because ~64 synchronous setAnnotation calls executed end-to-end on the click thread.
  useEffect(() => {
    const editor = editorRef.current;
    if (!editor || !usj || !highlightAllResearchTerms) return undefined;
    const wordAnnotations = annotations.filter((a) => a.kind === 'word');
    let cancelled = false;
    const CHUNK_SIZE = 50;
    const applyChunked = async () => {
      for (let i = 0; i < wordAnnotations.length; i += CHUNK_SIZE) {
        if (cancelled) return;
        const slice = wordAnnotations.slice(i, i + CHUNK_SIZE);
        slice.forEach((a) => {
          const range = annotationToRange(a, usj);
          if (!range) return;
          editor.setAnnotation(range, ANNOTATION_TYPE_HIGHLIGHT, a.annotationId, {});
        });
        if (i + CHUNK_SIZE < wordAnnotations.length) {
          // Yield to the event loop so mousedown / setFocus / paint can run between chunks.
          // eslint-disable-next-line no-await-in-loop
          await new Promise<void>((resolve) => {
            requestAnimationFrame(() => resolve());
          });
        }
      }
    };
    applyChunked().catch((err) => {
      logger.warn(
        `EnhancedScripturePane: highlight-all chunked apply failed: ${
          err instanceof Error ? err.message : String(err)
        }`,
      );
    });
    return () => {
      cancelled = true;
      wordAnnotations.forEach((a) => {
        editor.removeAnnotation(ANNOTATION_TYPE_HIGHLIGHT, a.annotationId);
      });
    };
  }, [usj, annotations, highlightAllResearchTerms]);

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

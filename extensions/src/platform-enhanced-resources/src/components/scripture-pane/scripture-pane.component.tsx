import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  type MouseEvent as ReactMouseEvent,
  type MutableRefObject,
} from 'react';
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
const RIGHT_MOUSE_BUTTON = 2;

/**
 * Data attribute marking the dynamic overlay stylesheet so tests (and any future dev tooling) can
 * find it without depending on textContent fingerprints. The component creates exactly one element
 * per mounted instance.
 */
const OVERLAY_STYLESHEET_DATA_ATTR = 'data-er-marble-overlays';

/**
 * Build the marble overlay stylesheet content from the current overlay state. Emits CSS rules keyed
 * off the `annotationId-X` class Editorial automatically attaches to every mark, so the browser
 * matches them against current AND future marks - which solves both the chunked-apply race (Effect
 * A emits marks across multiple RAFs) and any scroll-driven mark recreation without a
 * MutationObserver or per-chunk reapply loop.
 *
 * Source order = precedence when specificity ties (every overlay rule uses two classes). Stack, low
 * to high precedence:
 *
 * 1. Highlight-all - every marble-word mark, when the toolbar toggle is on
 * 2. Hover-match - lemma-group of the currently-hovered word (transient feedback)
 * 3. Filter-match - lemma-siblings of the filtered word
 * 4. Filter - the single focal word the user clicked (strongest signal, focal point)
 *
 * Filter-match sits ABOVE hover-match (Matt review #4): while a filter is active, hovering a
 * lemma-sibling of the filtered word must keep its filter-match tint, not flip to hover-match, so
 * the "I'm part of the filtered group" cue isn't lost mid-hover. A hovered word that is NOT a
 * filter-match sibling falls through to hover-match unchanged.
 *
 * Color tokens (`--er-marble-*`) are declared centrally in `_er-tokens.scss` and are fixed brand
 * colors for the research-term UI, not derived from Platform.Bible's theme tokens.
 *
 * Each rule also pins `color: black`. The pastel backgrounds are fixed in both light and dark mode
 * (the marble overlays must visually match the chip swatches in `marble-guide.component.tsx`), but
 * the underlying scripture text inherits the theme `--foreground`, which is near-white in dark mode
 * and would render illegibly on the pastel. Forcing dark text on the marked word only is scoped
 * tight enough not to bleed into the rest of the scripture text. In light mode the inherited
 * foreground was already near-black, so this is visually a no-op.
 */
function buildMarbleOverlayCss(state: {
  highlightAllOn: boolean;
  filteredTokenId: string | undefined;
  filterMatchIds: ReadonlySet<string>;
  hoverMatchIds: ReadonlySet<string>;
}): string {
  const parts: string[] = [];
  if (state.highlightAllOn) {
    parts.push(
      '.editor-typed-mark-external-marble-word { background-color: var(--er-marble-highlight-all-bg); color: black; border-radius: 2px; }',
    );
  }
  if (state.hoverMatchIds.size > 0) {
    parts.push(
      `${selectorForAnnotationIds(state.hoverMatchIds)} { background-color: var(--er-marble-hover-match-bg); color: black; border-radius: 2px; }`,
    );
  }
  if (state.filterMatchIds.size > 0) {
    parts.push(
      `${selectorForAnnotationIds(state.filterMatchIds)} { background-color: var(--er-marble-filter-match-bg); color: black; border-radius: 2px; }`,
    );
  }
  if (state.filteredTokenId !== undefined) {
    parts.push(
      `${selectorForAnnotationIds([state.filteredTokenId])} { background-color: var(--er-marble-filter-bg); color: black; border-radius: 2px; }`,
    );
  }
  return parts.join('\n');
}

/**
 * Compose a selector list matching marble-word marks whose annotationId class is in the given set.
 * Editorial emits each mark with `class="editor-typed-mark-external-marble-word
 * annotationId-${id}"`. We escape the id portion via `CSS.escape` so annotation ids containing
 * CSS-meta characters (dots, colons, etc.) produce valid selectors; in practice marble ids are
 * numeric or `wg-N` but a future id scheme could include anything.
 */
function selectorForAnnotationIds(ids: Iterable<string>): string {
  return Array.from(ids, (id) => {
    const escapedClass = CSS.escape(`annotationId-${id}`);
    return `.editor-typed-mark-external-marble-word.${escapedClass}`;
  }).join(', ');
}

/**
 * Static base CSS for marble annotation marks.
 *
 * Editorial renders `setAnnotation(range, type, id)` calls as `<mark>` elements with class
 * `.editor-typed-mark-external-${type}` and an `annotationId-${id}` class on each mark. Editorial
 * provides no visual treatment - that's the host extension's responsibility.
 *
 * The four overlay colors (highlight-all, hover-match, filter-match, filter) are NOT in this static
 * sheet: they're emitted dynamically into a separate `<style>` element by `buildMarbleOverlayCss`,
 * keyed off the existing `annotationId-X` class. Doing it as CSS rules (not per-element classList
 * mutations) means the browser handles selector matching for current AND future marks - that solves
 * both the chunked-apply race in Effect A and any scroll-driven mark recreation, with zero JS work
 * per scroll/mutation.
 *
 * Color tokens (`--er-marble-*`) are declared centrally in `_er-tokens.scss`. The Storybook story
 * re-declares the same tokens inline since it doesn't load the extension bundle - see
 * `scripture-pane.stories.tsx` `MARBLE_TOKEN_FALLBACK_STYLE`.
 *
 * The `mark { background-color: initial }` rule resets the user-agent `<mark>` yellow default so
 * marble-word marks don't show yellow in any surrounding-CSS-free environment.
 */
const MARBLE_ANNOTATION_STYLES = `
mark {
  background-color: initial;
  color: inherit;
}
.editor-typed-mark-external-marble-word {
  cursor: pointer;
  /* No 'color: inherit' here — it ties on specificity with the dynamic highlight-all rule in
     buildMarbleOverlayCss (single class selector), and depending on stylesheet mount order can
     beat the overlay's 'color: black', leaving dark-mode text near-white on the pastel
     background. Without an explicit color here, marks naturally inherit the surrounding
     scripture color when no overlay is active, and the overlay's 'color: black' wins by being
     the only color rule when an overlay applies. */
}
.editor-typed-mark-external-marble-note {
  cursor: pointer;
  /* Marble-note keeps a distinct color (footnote-style affordance) - it intentionally
     stands out, unlike marble-word. */
  color: var(--er-marble-note-color);
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
 * character in the Hebrew block (U+0590-U+05FF) or Hebrew Presentation Forms A (U+FB1D-U+FB4F),
 * 'Greek' for any character in the Greek block (U+0370-U+03FF) or Greek Extended (U+1F00-U+1FFF),
 * or undefined for ambiguous / Latin / mixed input.
 *
 * Used to decide which language to pass to translatePartOfSpeech, since the new TooltipData DTO no
 * longer carries StrongNumber (which previously hinted H/G). Greek Extended covers polytonic forms
 * (rough/smooth breathing, iota subscript, etc.) common in Koine resources; Hebrew Presentation
 * Forms A covers precomposed shin/sin variants used in some BHS-derived sources.
 *
 * Exported for unit testing - this helper is callable in isolation so the language-detection rules
 * can be exercised directly.
 */
export function detectSourceLanguage(sourceForm: string): 'Hebrew' | 'Greek' | undefined {
  for (let i = 0; i < sourceForm.length; i += 1) {
    const code = sourceForm.charCodeAt(i);
    if ((code >= 0x0590 && code <= 0x05ff) || (code >= 0xfb1d && code <= 0xfb4f)) return 'Hebrew';
    if ((code >= 0x0370 && code <= 0x03ff) || (code >= 0x1f00 && code <= 0x1fff)) return 'Greek';
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
      // PT9 MarbleForm.cs:2737 - `bldr.AppendFormat(guessedRenderingFoundStr, trackedProject.Name, renderingStatus.FoundRendering)`.
      // {0} = project name, {1} = found rendering. Matches MarbleForm_9 verbatim ordering.
      return localize('%enhancedResources_tooltip_guessedRenderingFound%')
        .replace('{0}', projectName)
        .replace('{1}', foundRendering);
    case 'renderingFound':
      // PT9 MarbleForm.cs:2742 - `bldr.AppendFormat(renderingFoundStr, trackedProject.Name, renderingStatus.FoundRendering)`.
      // {0} = project name, {1} = found rendering. Matches MarbleForm_10 verbatim ordering.
      return localize('%enhancedResources_tooltip_renderingFound%')
        .replace('{0}', projectName)
        .replace('{1}', foundRendering);
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

/**
 * Sync the latest value of a prop / closure-captured value into a ref so it can be read from inside
 * event handlers / async callbacks without forcing the enclosing effect to re-fire when the value
 * changes. The ref's `.current` is updated in an effect (post-commit), so reads inside other
 * post-commit effects observe the new value. Used in `EnhancedScripturePane` to keep the chunked
 * annotation-apply effect from re-firing on every prop change.
 */
function useLatestRef<T>(value: T): MutableRefObject<T> {
  const ref = useRef(value);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref;
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

/**
 * D-008 (2026-05-16): Editorial's `setAnnotation` resolver (`_r` in the editor lib) walks the
 * Lexical tree from a USJ jsonPath; when an intermediate node hasn't been mounted yet (or the wg
 * marker's first-text descendant doesn't appear at the expected child slot) it returns `[void 0,
 * void 0]` and the editor calls `logger.error("Failed to find start or end node of the
 * annotation.")`. The annotation is silently skipped on its end - there is nothing for us to
 * recover. ~50-200 of these fire per ER pane open / chapter change while we apply ~hundreds of
 * marble-word annotations against freshly mounted USJ. Since the resolver's "no-op + log" is the
 * editor's defined safe-fallback path, the log line is noise to us, not an actionable error.
 *
 * Cannot change the editor (yalc-pinned 0.8.15 per the stabilization charter), so we wrap the papi
 * logger and downgrade exactly this one message to debug. Everything else from Editorial still
 * surfaces at the original level.
 */
const FAILED_TO_FIND_ANNOTATION_MARKER = 'Failed to find start or end node of the annotation';

function makeEditorialLogger(): {
  error(...params: unknown[]): void;
  warn(...params: unknown[]): void;
  info(...params: unknown[]): void;
  debug(...params: unknown[]): void;
} {
  const messageMatches = (params: unknown[]) =>
    params.some(
      (param) => typeof param === 'string' && param.includes(FAILED_TO_FIND_ANNOTATION_MARKER),
    );
  return {
    error(...params) {
      if (messageMatches(params)) {
        // D-008: downgrade the editor's annotation-resolver miss to debug. Includes the
        // original args so verbose logging still captures them when enabled.
        logger.debug(`EnhancedScripturePane (D-008 suppressed): ${params.join(' ')}`);
        return;
      }
      logger.error(...params);
    },
    warn: (...params) => logger.warn(...params),
    info: (...params) => logger.info(...params),
    debug: (...params) => logger.debug(...params),
  };
}

// Module-level Editorial logger so we keep a stable identity for the prop. Editorial doesn't
// document a hard requirement on logger identity, but other props in this component already
// follow the stable-reference pattern (EDITORIAL_OPTIONS) to avoid forcing reconciliations.
const EDITORIAL_LOGGER = makeEditorialLogger();

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
  // document actually changes. Kept as a plain useRef (not useLatestRef) because
  // we sync two values into a single bag - useLatestRef would allocate a new bag
  // every render even when the underlying handlers were identity-stable.
  const handlersRef = useRef({ onTokenClick, onTokenContextMenu });
  useEffect(() => {
    handlersRef.current = { onTokenClick, onTokenContextMenu };
  }, [onTokenClick, onTokenContextMenu]);

  // Hold the proxy + tooltip-input fields in refs so the annotation effect's hover callbacks
  // (declared inside the effect) can read the latest values without taking these in the dep
  // array - which would re-run the chunked annotation apply on every prop change. The
  // `useLatestRef` helper collapses the previous 3-line useRef+useEffect-sync pattern down to
  // a single line per prop.
  const erProxyRef = useLatestRef(erProxy);
  const resourceIdRef = useLatestRef(resourceId);
  const glossLanguageRef = useLatestRef(glossLanguage);

  // Hold the latest scrRef + localizer in refs so the annotation effect's hover callbacks
  // (which read these inside fetchAndUpdatePopover) don't have to re-fire the chunked apply
  // every time scrRef changes (BCV move) or strings finish loading.
  const scrRefRef = useLatestRef(scrRef);
  const localizeRef = useLatestRef(getLocalizedString);

  // Hover lifecycle bookkeeping. fetchGenRef is bumped on every mouseenter/mouseleave so
  // late-arriving showPopover / buildTooltipData promises can detect they are stale and
  // self-cancel. activePopoverIdRef tracks the currently-rendered popover for dismissal.
  const fetchGenRef = useRef(0);
  // The popover-id ref is initially null because no popover is open. Using `undefined` would be
  // technically possible but conflates "absent" with "uninitialized" given React's useRef contract;
  // null is the canonical sentinel.
  // eslint-disable-next-line no-null/no-null
  const activePopoverIdRef = useRef<string | null>(null);
  // Fix D-14: track the currently-hovered annotation id so re-fires of mouseenter from any
  // editor-induced mark re-renders are no-oped. Without this guard, the popover-fetch race
  // kicks in: every re-fire bumps fetchGenRef, so most in-flight buildTooltipData calls abort
  // at the gen-staleness check. Defense-in-depth: D-15's CSS-class fix removes the primary
  // source of those re-renders (setAnnotation('marble-hover-match', ...)) but the guard
  // still protects against any future editor-side mark-recreation paths we don't anticipate.
  const currentlyHoveredIdRef = useRef<string | undefined>(undefined);
  // Fix D-15: defer mouseleave cleanup so a spurious leave (caused by the editor recreating
  // sibling marks when match annotations are applied) doesn't tear down the popover and match
  // state. A mouseenter for the same id within the debounce window cancels the pending leave.
  // See handleMarbleMouseLeave for the cancel/cleanup flow.
  const pendingLeaveTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Refs mirroring current overlay state, read by `rebuildOverlayStyle` whenever any of the four
  // overlay inputs changes. Persistent state (highlight-all + filter) is React-driven via
  // `useLatestRef` so the rebuild effect picks it up via the regular prop dep list; hover state
  // lives in `hoverMatchIdsRef` (mutated by the hover handlers inside Effect A) so a hover
  // update doesn't force a re-render.
  const highlightAllOnRef = useLatestRef(highlightAllResearchTerms);
  const filteredTokenIdRef = useLatestRef(filteredTokenId);
  const hoverMatchIdsRef = useRef<ReadonlySet<string>>(new Set());

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

  // Lemma-siblings of the currently-filtered word. Memoized so the rebuild trigger effect and
  // hover handlers see an identical set, and recomputed only when filteredTokenId or the
  // annotation set changes. The focal word itself is excluded - it wears `er-marble-filter`
  // (stronger color); siblings wear the lighter `er-marble-filter-match`.
  const filterMatchIds = useMemo(() => {
    const ids = new Set<string>();
    if (!filteredTokenId) return ids;
    const lemmas = lemmaIndex.annotationIdToLemmas.get(filteredTokenId);
    if (!lemmas) return ids;
    lemmas.forEach((lemma) => {
      const annIds = lemmaIndex.lemmaToAnnotationIds.get(lemma);
      if (!annIds) return;
      annIds.forEach((id) => {
        if (id !== filteredTokenId) ids.add(id);
      });
    });
    return ids;
  }, [filteredTokenId, lemmaIndex]);
  const filterMatchIdsRef = useLatestRef(filterMatchIds);

  // ----- Dynamic overlay stylesheet ----------------------------------------------------------
  // Single `<style>` element that carries all four marble overlay rules (highlight-all, filter,
  // filter-match, hover-match) as CSS keyed off the `annotationId-X` class Editorial attaches to
  // every mark. The browser handles selector matching for current AND future marks - no per-mark
  // classList mutation, no MutationObserver, no epoch coordination. See `buildMarbleOverlayCss`.

  // Initial null is the sentinel for "style element not mounted yet"; the mount effect below
  // creates and assigns it. useRef requires us to declare the union with `null` explicitly.
  // eslint-disable-next-line no-null/no-null
  const overlayStyleRef = useRef<HTMLStyleElement | null>(null);

  const rebuildOverlayStyle = useCallback(() => {
    const el = overlayStyleRef.current;
    if (!el) return;
    el.textContent = buildMarbleOverlayCss({
      highlightAllOn: highlightAllOnRef.current,
      filteredTokenId: filteredTokenIdRef.current,
      filterMatchIds: filterMatchIdsRef.current,
      hoverMatchIds: hoverMatchIdsRef.current,
    });
    // The refs used here (useLatestRef return values + plain useRef) are identity-stable, so the
    // callback identity itself never needs to change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Mount the overlay <style> element once. Inserted into document.head (not the component's
  // own container) so the static stylesheet from `useStylesheet` and the dynamic one resolve at
  // the same DOM scope. The mount effect also performs the first rebuild so the initial paint
  // already has the right rules.
  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.setAttribute(OVERLAY_STYLESHEET_DATA_ATTR, '');
    document.head.appendChild(styleEl);
    overlayStyleRef.current = styleEl;
    rebuildOverlayStyle();
    return () => {
      styleEl.remove();
      // Reset to the null sentinel - useRef is `T | null` here so rebuildOverlayStyle can
      // detect "not mounted yet" cleanly.
      // eslint-disable-next-line no-null/no-null
      overlayStyleRef.current = null;
    };
  }, [rebuildOverlayStyle]);

  // Trigger a rebuild whenever any of the persistent overlay inputs change. Hover inputs are
  // applied imperatively from the hover handlers via `rebuildOverlayStyle()` so they bypass
  // React's render cycle entirely.
  useEffect(() => {
    rebuildOverlayStyle();
  }, [highlightAllResearchTerms, filteredTokenId, filterMatchIds, rebuildOverlayStyle]);

  // D-012 (2026-05-16): Editorial accepts the chapter USJ via `defaultUsj` at mount only - it does
  // NOT re-read that prop on subsequent renders. When the wiring layer reloads a new chapter (BCV
  // nav after the ER pane is open), the scripture pane was stuck on the originally-mounted USJ
  // because nothing pushed the new value into the editor. Fix: sync subsequent USJ changes through
  // the imperative `editor.setUsj()` ref API. Skip the initial run because Editorial already has
  // the same value via `defaultUsj` - calling `setUsj` once more on mount would force a redundant
  // Lexical re-init. (Pattern mirrors `platform-scripture-editor/use-editor-pdp-sync.hook.ts`.)
  //
  // D-013 (2026-05-16): The setUsj call schedules an asynchronous Lexical-tree rebuild inside the
  // editor (it calls a React state setter; the rebuild lands on the editor's next render). Effect A
  // runs synchronously after this effect in declaration order, so without coordination it would
  // begin applying setAnnotation calls against the OLD Lexical tree while the new tree is still
  // mounting. ~50-200 annotations per chapter then fail their node lookups in rapid burst
  // (D-008 warns), and the race intermittently crashes the renderer when setAnnotation's queued
  // editor.update overlaps the LoadStatePlugin's tree-rebuild commit. The fix has two parts:
  //   1. usjEpochRef increments on every USJ swap. Effect A captures the epoch at the start of
  //      each run and aborts (per-chunk and per-item) if it changes — even faster than the
  //      existing `cancelled` flag, which only flips on effect cleanup.
  //   2. usjJustChangedRef tells Effect A to defer its first chunk by one requestAnimationFrame,
  //      giving the editor's setUsj-driven re-render time to commit the new Lexical tree before we
  //      hit it with setAnnotation. Initialized to `true` so the very first run of Effect A also
  //      defers - although Editorial consumed `defaultUsj` at mount, the Lexical tree it builds is
  //      committed inside React effects that haven't run yet when our first Effect A fires
  //      (verified in Storybook: without this deferral, every setAnnotation call silently fails to
  //      resolve and no `<mark>` elements wrap the wg spans). The cost is one RAF wait at mount,
  //      which is imperceptible.
  const lastSyncedUsjRef = useRef<Usj | undefined>(usj);
  const usjEpochRef = useRef(0);
  const usjJustChangedRef = useRef(true);

  // Word-kind annotation list, memoized so Effect A's chunked apply doesn't re-filter on every
  // render.
  const wordAnnotations = useMemo(
    () => annotations.filter((a) => a.kind === 'word'),
    [annotations],
  );
  useEffect(() => {
    // First-mount: Editorial consumed `defaultUsj`. Record the value and skip the imperative push.
    if (lastSyncedUsjRef.current === usj) return;
    lastSyncedUsjRef.current = usj;
    // D-013: bump the epoch so Effect A runs from the prior chapter abort immediately, and
    // signal that the next Effect A run should defer its first chunk by one RAF.
    usjEpochRef.current += 1;
    usjJustChangedRef.current = true;
    const editor = editorRef.current;
    // When usj is undefined the component renders the empty state instead of Editorial, so there is
    // nothing to push. The next render with a defined usj will re-mount Editorial via `defaultUsj`.
    if (!editor || !usj) return;
    editor.setUsj(usj);
  }, [usj]);

  // FN-027 / FN-028 / FN-029 wired in Session 2 (2026-05-05). The annotation effect registers
  // onMouseEnter / onMouseLeave alongside onClick to drive the marble-dictionary popover
  // (via papi.overlays) and the hover-match overlay. CharNode title suppression is set at the
  // <Editorial> mount via view.showCharMarkerTitles=false.
  // See working-docs/2026-05-05-pt9-fidelity-session-2-design.md.

  // Marble-word base annotations applied via Editorial's setAnnotation. Chunked: 50 annotations
  // per RAF tick so mousedown / setFocus and other UI events can be serviced between batches.
  // The cancellation flag protects against stale applies if the chapter changes mid-loop.
  useEffect(() => {
    const editor = editorRef.current;
    if (!editor || !usj) return undefined;

    const annotationsById = new Map(annotations.map((a) => [a.annotationId, a]));
    // Notes are excluded from setAnnotation: in readonly mode the editor renders note callers as
    // ImmutableNoteCallerNode (DecoratorNode) whose content children don't exist in the Lexical tree,
    // so any USJ path into note content silently fails to resolve. Notes remain clickable via the
    // editor's caller node rendering; we just don't add a mark overlay for them.
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
          // Phase 3b will add `trackedProjectId` to TooltipInputDto + TooltipInput.cs in lockstep.
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
    // and `editor` from this run. The activePopoverIdRef / hoverMatchIdsRef bookkeeping is
    // component-lifetime so a delayed mouseleave from a previous render still dismisses correctly.
    // D-15: extracted so both the debounced leave timer and the synchronous "switching
    // words" branch in handleMarbleMouseEnter can invoke the same teardown path.
    const performLeaveCleanup = () => {
      currentlyHoveredIdRef.current = undefined;
      fetchGenRef.current += 1;

      if (activePopoverIdRef.current) {
        papi.overlays.dismissPopover(activePopoverIdRef.current).catch(() => {});
        // Reset to the null sentinel - see activePopoverIdRef declaration for rationale.
        // eslint-disable-next-line no-null/no-null
        activePopoverIdRef.current = null;
      }

      // Clear the hover-match overlay by emptying the id set and rebuilding the stylesheet.
      // CSS handles the rest - the browser drops the rule's selector matches automatically.
      hoverMatchIdsRef.current = new Set();
      rebuildOverlayStyle();
    };

    const handleMarbleMouseEnter = (event: MouseEvent, _type: string, id: string) => {
      const annotation = annotationsById.get(id);
      if (!annotation || annotation.kind !== 'word') return;

      // D-15: a pending leave timer indicates the cursor briefly exited a mark (likely
      // due to an editor-induced re-render) and has now returned. Cancel the teardown -
      // the leave was spurious.
      if (pendingLeaveTimerRef.current !== undefined) {
        clearTimeout(pendingLeaveTimerRef.current);
        pendingLeaveTimerRef.current = undefined;
      }

      // Fix D-14: ignore re-fires for the same id. Defense-in-depth - D-15's CSS-class
      // fix eliminates the primary cause (setAnnotation('marble-hover-match') was triggering
      // editor mark recreation), but the guard remains so any future editor-side mark
      // re-render path can't induce a synthetic mouseenter cascade on the new <mark>.
      if (id === currentlyHoveredIdRef.current) return;

      // D-15: if a different word is currently hovered, run its leave teardown
      // synchronously before starting the new hover. (Reachable if a leave timer was
      // cancelled above but the user has actually moved on to a different mark.)
      if (currentlyHoveredIdRef.current !== undefined) {
        performLeaveCleanup();
      }

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

      // The hovered word itself is included in the match set so it shares the lemma-match
      // overlay color with its siblings - users expect the entire matching expression to read as
      // one visually unified group, including the word their cursor is on.
      // Fallback (Matt review #1): the lemma index is built only from `lexicalLinks`, so a word
      // whose annotation comes from `thematic_links` / `image_links` / `map_links` alone has no
      // entry → `matchingIds` would be empty and NO overlay paints, not even on the hovered word.
      // Seed the set with the hovered id so at least the hovered word always lights up, matching
      // the comment above and the renamed unit test.
      if (matchingIds.size === 0) matchingIds.add(id);
      // The CSS source order in `buildMarbleOverlayCss` makes filter (the focal-word color) win
      // over hover-match, so hovering the currently-filtered word still shows the strong filter
      // color rather than the transient hover overlay. Filter-match also beats hover-match by
      // source order, so lemma-siblings of the filtered word keep their filter-match tint while
      // the user is hovering them (Matt review #4).
      hoverMatchIdsRef.current = matchingIds;
      rebuildOverlayStyle();
    };

    const handleMarbleMouseLeave = () => {
      // D-15: defer cleanup so a spurious leave (e.g., the editor recreating a sibling
      // mark when match annotations are applied, briefly taking the cursor off the
      // hovered <mark>) doesn't tear down the popover and match state. If a mouseenter
      // fires within the debounce window, the pending timer is cancelled and the leave
      // is effectively no-oped.
      if (pendingLeaveTimerRef.current !== undefined) {
        clearTimeout(pendingLeaveTimerRef.current);
      }
      pendingLeaveTimerRef.current = setTimeout(() => {
        pendingLeaveTimerRef.current = undefined;
        performLeaveCleanup();
      }, 50);
    };

    // D-013: capture the epoch at effect-run start. If the USJ changes again before we finish,
    // usjEpochRef.current advances and we abort the rest of this run.
    const myEpoch = usjEpochRef.current;
    // D-013: defer the first chunk by one RAF whenever usj just changed - the editor's
    // setUsj-driven Lexical re-render needs a chance to commit before we apply setAnnotation calls
    // against the new tree. `usjJustChangedRef` is initialized to `true` (see ref declaration
    // comment above) so the very first Effect A run on mount also defers; although Editorial
    // consumes `defaultUsj` synchronously, the Lexical tree it builds is committed inside React
    // effects that haven't run yet when this effect first fires, and without this deferral every
    // setAnnotation call silently fails to resolve (verified in Storybook).
    const shouldDeferFirstChunk = usjJustChangedRef.current;
    usjJustChangedRef.current = false;
    const applyChunked = async () => {
      if (shouldDeferFirstChunk) {
        await new Promise<void>((resolve) => {
          requestAnimationFrame(() => resolve());
        });
        if (cancelled || myEpoch !== usjEpochRef.current) return;
      }
      for (let i = 0; i < wordAnnotations.length; i += CHUNK_SIZE) {
        if (cancelled || myEpoch !== usjEpochRef.current) return;
        const slice = wordAnnotations.slice(i, i + CHUNK_SIZE);
        // D-013: use a for-loop so we can re-check `cancelled` / epoch between items. Inside a
        // chunk the editor's update queue can interleave with our setAnnotation calls, so an
        // item-level abort tightens the race window from CHUNK_SIZE items down to 1. We bail out
        // early via `return` if aborted; for annotations with no textual content we just log and
        // skip to the next iteration via a no-op (no `continue` needed).
        for (let j = 0; j < slice.length; j += 1) {
          if (cancelled || myEpoch !== usjEpochRef.current) return;
          const annotation = slice[j];
          const range = annotationToRange(annotation, usj);
          if (!range) {
            logger.info(
              `EnhancedScripturePane: skipping annotation with no textual content: id=${annotation.annotationId} usjPath=${annotation.usjPath}`,
            );
          } else {
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
          }
        }
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

    return () => {
      cancelled = true;
      // D-15: clear any pending leave-debounce timer so it doesn't fire after unmount
      // (or after dependencies change and the next effect run takes over).
      if (pendingLeaveTimerRef.current !== undefined) {
        clearTimeout(pendingLeaveTimerRef.current);
        pendingLeaveTimerRef.current = undefined;
      }
      const popoverId = activePopoverIdRef.current;
      if (popoverId) {
        papi.overlays.dismissPopover(popoverId).catch(() => {});
        // Reset to the null sentinel - see activePopoverIdRef declaration for rationale.
        // eslint-disable-next-line no-null/no-null
        activePopoverIdRef.current = null;
      }
      // Drop the hover-match overlay by clearing the id set and rebuilding the stylesheet.
      hoverMatchIdsRef.current = new Set();
      rebuildOverlayStyle();
      currentlyHoveredIdRef.current = undefined;
      wordAnnotations.forEach((a) => {
        editor.removeAnnotation(annotationTypeFor(a.kind), a.annotationId);
      });
    };
    // The refs returned by `useLatestRef` (erProxyRef, resourceIdRef, glossLanguageRef,
    // scrRefRef, localizeRef) are identity-stable across renders - `useLatestRef` wraps `useRef`
    // and only mutates `.current`. The hook is intentionally excluded from this effect's deps so
    // the chunked annotation apply does NOT re-fire when the underlying prop values change
    // (changing scrRef on BCV moves, async-resolved erProxy, etc). ESLint's exhaustive-deps rule
    // cannot see through the custom hook to recognize the values as refs, so a targeted
    // suppression here is correct.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usj, annotations, lemmaIndex]);

  if (errorMessage) {
    return (
      <Alert variant="destructive" data-testid="er-scripture-pane" className="tw:m-4">
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
        className="tw:flex tw:h-full tw:flex-col tw:gap-3 tw:rounded-none tw:border-0 tw:p-4"
      >
        <Skeleton className="tw:h-6 tw:w-32" />
        <Skeleton className="tw:h-4 tw:w-full" />
        <Skeleton className="tw:h-4 tw:w-11/12" />
        <Skeleton className="tw:h-4 tw:w-10/12" />
      </Card>
    );
  }

  if (!usj) {
    return (
      <Card
        data-testid="er-scripture-pane"
        className="tw:flex tw:h-full tw:flex-col tw:items-center tw:justify-center tw:gap-1 tw:rounded-none tw:border-0 tw:p-6 tw:text-center tw:text-muted-foreground"
      >
        <span className="tw:text-base tw:font-semibold">{emptyTitle}</span>
        <span className="tw:text-sm">{emptyDescription}</span>
      </Card>
    );
  }

  return (
    <div
      className="tw:flex tw:h-full tw:flex-col tw:overflow-hidden"
      data-testid="er-scripture-pane"
    >
      <div
        className="tw:flex tw:h-auto tw:min-h-0 tw:flex-1 tw:flex-col tw:overflow-auto"
        // Inline style is the appropriate primitive for a continuous numeric zoom factor that the
        // user can drive from the View menu - Tailwind classes can't express arbitrary scales.
        // `overflow-auto` + `min-h-0` + `flex-1` is the same triple the platform-scripture-editor
        // uses on its scrolling region so the editor content scrolls vertically when it exceeds
        // the available pane height; without this the outer `overflow-hidden` simply clips long
        // chapters.
        style={{ fontSize: `${scripturePaneZoom}rem` }}
      >
        <Editorial
          ref={editorRef}
          defaultUsj={usj}
          scrRef={scrRef}
          logger={EDITORIAL_LOGGER}
          options={EDITORIAL_OPTIONS}
        />
        {filteredTokenId && (
          <p
            role="status"
            className="tw:mt-3 tw:rounded tw:bg-accent tw:px-2 tw:py-1 tw:text-xs tw:text-accent-foreground"
          >
            {`${filterActiveLabel}: ${filteredTokenSurface ?? filteredTokenId}`}
          </p>
        )}
      </div>
    </div>
  );
}

export default EnhancedScripturePane;

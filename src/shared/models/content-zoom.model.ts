import type { LocalizeKey, ReferencedItem } from 'platform-bible-utils';
import {
  DEFAULT_ZOOM_FACTOR,
  MAX_ZOOM_FACTOR,
  MIN_ZOOM_FACTOR,
  ZOOM_STEP,
} from '@shared/data/platform.data';
import {
  CONTENT_ZOOM_CSS_VARIABLE_PREFIX,
  CONTENT_ZOOM_DEFAULT_CSS_VARIABLE,
  CONTENT_ZOOM_LEVELS_STATE_KEY,
  CONTENT_ZOOM_ROOT_ATTRIBUTE,
  type ContentZoomAreaId,
  FIND_WEBVIEW_TYPE,
  MAIN_CONTENT_ZOOM_AREA,
  SCRIPTURE_EDITOR_WEBVIEW_TYPE,
} from '@shared/models/web-view.model';

/**
 * The extension-facing half of the content zoom contract is declared in `web-view.model.ts`, which
 * is published to extensions through `papi.d.ts`; it is re-exported here so core code can reach the
 * whole contract from one module.
 */
export {
  CONTENT_ZOOM_CSS_VARIABLE_PREFIX,
  CONTENT_ZOOM_DEFAULT_CSS_VARIABLE,
  CONTENT_ZOOM_LEVELS_STATE_KEY,
  CONTENT_ZOOM_ROOT_ATTRIBUTE,
};
export type { ContentZoomAreaId } from '@shared/models/web-view.model';

/**
 * The allowed range and step for a content zoom factor, defined once in `platform-bible-utils`
 * (re-exported through `platform.data`); core code reaches them from here rather than from
 * `platform.data` directly.
 */
export { DEFAULT_ZOOM_FACTOR, MAX_ZOOM_FACTOR, MIN_ZOOM_FACTOR, ZOOM_STEP };

/**
 * Web-view definition `state` key holding the kind and identity — `kind:identity`, the first two
 * segments of the memory key — that the pane's levels under {@link CONTENT_ZOOM_LEVELS_STATE_KEY}
 * belong to.
 *
 * A pane re-pointed at another project keeps its web view id, and the view rebuilds its definition
 * by spreading its own saved state onto the new project, so the levels arrive at the new project
 * looking exactly like levels chosen for it. This stamp is what tells the two apart: a pane whose
 * stamp still names what it shows keeps its levels, and a pane whose stamp names something else is
 * re-seeded from the memory of the identity it shows now.
 *
 * Written and read only by the platform (`web-view-content-zoom.service.ts`). Unlike the levels
 * key, nothing outside core has a reason to read it, so it is not part of the extension-facing
 * contract in `web-view.model.ts`.
 */
export const CONTENT_ZOOM_IDENTITY_STATE_KEY = 'platform.contentZoomIdentity';

/**
 * Kinds of web view whose content zoom is remembered per project (or, for Enhanced Resources, per
 * resource). A view's kind is the first segment of its memory key, so two views of the same kind
 * showing the same project share one level per area.
 */
export type ContentZoomKind =
  | 'editor'
  | 'resource'
  | 'notes'
  | 'find'
  | 'inventory'
  | 'checks'
  | 'checklist'
  | 'dictionary';

/**
 * Pattern a well-formed zoom area id must match: lower-case letters, digits and hyphens, starting
 * with a letter. Exported so the bootstrap script can build its own runtime copy of this pattern
 * from {@link CONTENT_ZOOM_AREA_ID_PATTERN}`.source` instead of restating it.
 */
export const CONTENT_ZOOM_AREA_ID_PATTERN = /^[a-z][a-z0-9-]*$/;

/**
 * The one well-formed area id a view may not use: its CSS custom property would be
 * {@link CONTENT_ZOOM_DEFAULT_CSS_VARIABLE} itself, the pane-wide fallback every other area reads,
 * so an area of this name would set the default for the whole pane. Derived from the variable names
 * so it cannot drift from them.
 */
export const RESERVED_CONTENT_ZOOM_AREA_ID = CONTENT_ZOOM_DEFAULT_CSS_VARIABLE.slice(
  CONTENT_ZOOM_CSS_VARIABLE_PREFIX.length,
);

/**
 * Placeholder for the area id in {@link CONTENT_ZOOM_NAMED_AREA_RULE_TEMPLATE}. Never a legal area
 * id ({@link CONTENT_ZOOM_AREA_ID_PATTERN} accepts only lower-case letters, digits and hyphens), so
 * substituting it can never collide with a real one.
 */
export const CONTENT_ZOOM_AREA_ID_PLACEHOLDER = 'AREA_ID';

/**
 * Appended to every zoom-area attribute clause so a marker nested inside another marker matches no
 * zoom rule: `:not([ATTR] [ATTR])` fails for an element that has an ancestor also carrying the
 * attribute, which is exactly the shape `collectAreas` (the bootstrap's runtime scan) refuses to
 * report — so the rule and the report agree on which markers are areas. `:where(...)` holds the
 * clause's specificity at zero, so appending it never changes which of two otherwise-competing
 * rules wins.
 */
export const CONTENT_ZOOM_UNNESTED_CLAUSE = `:where(:not([${CONTENT_ZOOM_ROOT_ATTRIBUTE}] [${CONTENT_ZOOM_ROOT_ATTRIBUTE}]))`;

/**
 * Every attribute value that names the {@link MAIN_CONTENT_ZOOM_AREA} area: the empty value a view
 * writes when it names no area, the id itself, and the string `"true"` that React serializes a bare
 * `data-*` JSX prop to — so a view written as `<div data-platform-content-zoom-root />` marks its
 * main area rather than one called `true`. The bootstrap's `idOf` and the `main` area's CSS rule
 * are both built from this one list, so the report and the stylesheet cannot disagree about which
 * markers are the main area. An area genuinely called `true` is therefore not available.
 */
export const CONTENT_ZOOM_MAIN_AREA_ATTRIBUTE_VALUES: readonly string[] = [
  '',
  MAIN_CONTENT_ZOOM_AREA,
  'true',
];

/**
 * The CSS rule that scales one NAMED zoom area (not `main`, whose rule also matches the marker's
 * empty value and is baked separately): its own variable, else the default. Both the head-splice
 * helper (`areaRule` in the bootstrap-script module) and the bootstrap's own runtime `ensureRule`
 * build a named area's rule by substituting {@link CONTENT_ZOOM_AREA_ID_PLACEHOLDER} in this one
 * string, so the two can never spell the rule differently. The bootstrap module cannot call a
 * shared function for this at runtime — it executes as injected source text inside the web view,
 * not as an import — so it inlines this template and substitutes the placeholder itself.
 */
export const CONTENT_ZOOM_NAMED_AREA_RULE_TEMPLATE = `[${CONTENT_ZOOM_ROOT_ATTRIBUTE}="${CONTENT_ZOOM_AREA_ID_PLACEHOLDER}"]${CONTENT_ZOOM_UNNESTED_CLAUSE}{zoom:var(${CONTENT_ZOOM_CSS_VARIABLE_PREFIX}${CONTENT_ZOOM_AREA_ID_PLACEHOLDER},var(${CONTENT_ZOOM_DEFAULT_CSS_VARIABLE},1))}`;

/** The CSS custom property carrying one zoom area's effective factor. */
export function getContentZoomCssVariable(areaId: string): string {
  return `${CONTENT_ZOOM_CSS_VARIABLE_PREFIX}${areaId}`;
}

/** `id` of the `<style>` element the platform injects into each web view head for content zoom. */
export const CONTENT_ZOOM_STYLE_ELEMENT_ID = 'platform-content-zoom-styles';

/** What core knows about one first-party web view type that takes content zoom. */
export type ContentZoomDeclaration = {
  /** The memory kind the type's levels are remembered under. */
  readonly kind: ContentZoomKind;
  /**
   * The area the chords, the wheel and the tab menu act on while the view renders no marked
   * element, for example before a search, while loading, or when the list is empty. A view that
   * marks its text with no `area` of its own uses this area.
   */
  readonly defaultArea: ContentZoomAreaId;
};

/**
 * The first-party web view types that take content zoom, with their memory kind and default area. A
 * pane is _zoomable_ when its type is listed here OR when it currently reports at least one zoom
 * area (`isContentZoomable` in `web-view-content-zoom.service.ts`). The declaration is what keeps a
 * first-party view's zoom items, chords and wheel available from its first frame, including while
 * it renders no marker. A pane that is not zoomable is never scaled.
 *
 * Core lists extension web view types by string here because core code cannot import extension
 * source. This follows the same pattern as `SCRIPTURE_EDITOR_WEBVIEW_TYPE` and
 * `EDIT_BLOCKABLE_WEB_VIEW_TYPES`, and it may list types from other repositories too. A type is
 * listed only once its view marks its text: Word List (paratext-bible-extensions) and Send/Receive
 * Compare Versions (paratext-bible-internal-extensions) join this map, each with its own kind, when
 * their markers land in those repositories.
 *
 * Invariant, not checked at runtime: every listed type runs scripts. A declared pane opened with
 * `allowScripts: false` would offer zoom items that can only write a variable nothing in the pane
 * reads, because no bootstrap runs there to scale anything.
 *
 * `platformScriptureEditor.scriptureTextGrid` is a documented exception, not a precedent. Inside
 * its `text-collection` area, each resource cell still carries its own independent zoom
 * (Ctrl/Cmd+wheel, the right-click menu and the hover kebab; see
 * `use-resource-zoom-input.hook.ts`). That per-resource factor nests inside the area's CSS zoom and
 * multiplies with it rather than replacing it.
 */
export const CONTENT_ZOOM_DECLARATION_BY_WEB_VIEW_TYPE: ReadonlyMap<
  string,
  ContentZoomDeclaration
> = new Map<string, ContentZoomDeclaration>([
  [SCRIPTURE_EDITOR_WEBVIEW_TYPE, { kind: 'editor', defaultArea: MAIN_CONTENT_ZOOM_AREA }],
  [
    'platformEnhancedResources.enhancedResource',
    { kind: 'resource', defaultArea: MAIN_CONTENT_ZOOM_AREA },
  ],
  [
    'platformScriptureEditor.scriptureTextGrid',
    { kind: 'resource', defaultArea: 'text-collection' },
  ],
  ['platformScriptureEditor.modelText', { kind: 'resource', defaultArea: 'model-text' }],
  ['platformScriptureEditor.bibleTexts', { kind: 'resource', defaultArea: 'bible-texts' }],
  ['platformScriptureEditor.commentaries', { kind: 'resource', defaultArea: 'commentaries' }],
  ['legacyCommentManager.commentList', { kind: 'notes', defaultArea: MAIN_CONTENT_ZOOM_AREA }],
  ['legacyCommentManager.commentListPanel', { kind: 'notes', defaultArea: MAIN_CONTENT_ZOOM_AREA }],
  [FIND_WEBVIEW_TYPE, { kind: 'find', defaultArea: MAIN_CONTENT_ZOOM_AREA }],
  // The four inventories share one kind and one area, so one project's inventories share a level:
  // they show the same project's text in the same table shape.
  [
    'platformScripture.characterInventory',
    { kind: 'inventory', defaultArea: MAIN_CONTENT_ZOOM_AREA },
  ],
  [
    'platformScripture.repeatedWordsInventory',
    { kind: 'inventory', defaultArea: MAIN_CONTENT_ZOOM_AREA },
  ],
  [
    'platformScripture.markersInventory',
    { kind: 'inventory', defaultArea: MAIN_CONTENT_ZOOM_AREA },
  ],
  [
    'platformScripture.punctuationInventory',
    { kind: 'inventory', defaultArea: MAIN_CONTENT_ZOOM_AREA },
  ],
  ['platformScripture.checksSidePanel', { kind: 'checks', defaultArea: MAIN_CONTENT_ZOOM_AREA }],
  [
    'platformScripture.markersChecklist',
    { kind: 'checklist', defaultArea: MAIN_CONTENT_ZOOM_AREA },
  ],
  ['platformLexicalTools.dictionary', { kind: 'dictionary', defaultArea: MAIN_CONTENT_ZOOM_AREA }],
]);

/** The declaration of a web view type, or `undefined` for a type core does not declare zoomable. */
export function getContentZoomDeclaration(webViewType: string): ContentZoomDeclaration | undefined {
  return CONTENT_ZOOM_DECLARATION_BY_WEB_VIEW_TYPE.get(webViewType);
}

/** The content-zoom kind of a web view type, or `undefined` for a type core does not declare. */
export function getContentZoomKind(webViewType: string): ContentZoomKind | undefined {
  return getContentZoomDeclaration(webViewType)?.kind;
}

/** Names of the three content-zoom commands (registered in the main-process web-view router). */
export const CONTENT_ZOOM_COMMANDS = {
  in: 'platform.webViewContentZoomIn',
  out: 'platform.webViewContentZoomOut',
  reset: 'platform.webViewContentZoomReset',
} as const;

/** One physical key that reaches a content-zoom action regardless of the layout's `key` for it. */
export type ContentZoomChordKey = {
  /** `KeyboardEvent.code` this entry matches. */
  code: string;
  /**
   * `KeyboardEvent.key` that must accompany the code, when the code alone is not enough. Only
   * `Numpad0` sets it: with NumLock off that key reports `key: 'Insert'`, and `Ctrl+Insert` is
   * Chromium's legacy Copy chord, which content zoom must not swallow — losing Copy silently
   * mid-edit is a data-entry hazard. (With NumLock on the key is `'0'`, which
   * {@link ContentZoomChord.keys} already matches; the entry is kept so the table names every
   * physical key a user may press for each action.) `NumpadAdd` and `NumpadSubtract` are
   * NumLock-independent, so neither needs it.
   */
  requiredKey?: string;
};

/** One macOS View-menu item carrying an accelerator for a content-zoom action. */
export type ContentZoomMacosMenuItem = {
  /** `id` of the menu item, unique within the View menu. */
  id: string;
  /** The Electron accelerator this item binds. */
  accelerator: string;
  /**
   * Hidden duplicates exist only to bind a second accelerator, since Electron allows one per item.
   * The menu renders the visible item's accelerator; the hidden ones just work.
   */
  hidden?: boolean;
};

/** Everything that reaches one content-zoom action: its keys, its command and its menu items. */
export type ContentZoomChord = {
  action: 'in' | 'out' | 'reset';
  /** The content-zoom command this action runs. */
  command: (typeof CONTENT_ZOOM_COMMANDS)[keyof typeof CONTENT_ZOOM_COMMANDS];
  /** `KeyboardEvent.key` values that mean this action, whatever the layout puts on the cap. */
  keys: readonly string[];
  /** Physical keys that mean this action regardless of what `key` the layout reports. */
  codes: readonly ContentZoomChordKey[];
  /** The macOS View-menu items bound to this action, most prominent first. */
  macosMenuItems: readonly ContentZoomMacosMenuItem[];
  /** The label key the macOS View menu shows for this action. */
  macosLabel: LocalizeKey;
};

/**
 * The one place the content-zoom chords are declared. The window-chrome keydown listener
 * (`web-view-content-zoom.chrome-keys.ts`) and the macOS View menu
 * (`platform-macos-menubar.data.ts`) import this table, and the in-view bootstrap
 * (`web-view-content-zoom.bootstrap-script.ts`) serializes it into the script it injects, because
 * that script runs as text inside the web view and cannot import anything.
 *
 * A chord is accepted with Ctrl or ⌘, and Alt rejects it; Shift is accepted for every action,
 * because on AZERTY and Czech layouts the top-row `0` and `-` are shifted keys, so rejecting Shift
 * would put reset out of reach there entirely. That modifier rule is two booleans and stays stated
 * in each handler; the keys, the commands and the menu items live here.
 */
export const CONTENT_ZOOM_CHORDS: readonly ContentZoomChord[] = [
  {
    action: 'in',
    command: CONTENT_ZOOM_COMMANDS.in,
    keys: ['=', '+'],
    codes: [{ code: 'NumpadAdd' }],
    macosMenuItems: [
      { id: 'contentZoomIn', accelerator: 'CommandOrControl+=' },
      // ⌘+ on a Mac is ⇧⌘=, so without this item the key a Mac user presses — and the one the
      // shortcut catalogue publishes — would never reach the menu path.
      { id: 'contentZoomInShift', accelerator: 'CommandOrControl+Shift+=', hidden: true },
      { id: 'contentZoomInNumpad', accelerator: 'CommandOrControl+numadd', hidden: true },
    ],
    macosLabel: '%mainMenu_view_zoomIn%',
  },
  {
    action: 'out',
    command: CONTENT_ZOOM_COMMANDS.out,
    keys: ['-'],
    codes: [{ code: 'NumpadSubtract' }],
    macosMenuItems: [
      { id: 'contentZoomOut', accelerator: 'CommandOrControl+-' },
      { id: 'contentZoomOutNumpad', accelerator: 'CommandOrControl+numsub', hidden: true },
    ],
    macosLabel: '%mainMenu_view_zoomOut%',
  },
  {
    action: 'reset',
    command: CONTENT_ZOOM_COMMANDS.reset,
    keys: ['0'],
    codes: [{ code: 'Numpad0', requiredKey: '0' }],
    macosMenuItems: [
      { id: 'contentZoomReset', accelerator: 'CommandOrControl+0' },
      { id: 'contentZoomResetNumpad', accelerator: 'CommandOrControl+num0', hidden: true },
    ],
    macosLabel: '%mainMenu_view_resetZoom%',
  },
];

/**
 * Contributed group holding the per-tab content-zoom items, the only group Simple mode's tab menu
 * offers. Must match the group of this name in `src/extension-host/data/menu.data.json`;
 * `menu.data.test.ts` pins the two together by importing the shipped data.
 */
export const CONTENT_ZOOM_TAB_MENU_GROUP = 'platform.tabZoom' satisfies ReferencedItem;

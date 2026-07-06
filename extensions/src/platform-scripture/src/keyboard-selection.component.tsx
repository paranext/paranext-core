import {
  Button,
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Spinner,
} from 'platform-bible-react';
import { formatReplacementString, formatReplacementStringToArray } from 'platform-bible-utils';
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react';

// Pure presentational component for the per-project keyboard-selection dialog. The PAPI wiring
// layer (keyboard-selection.web-view.tsx, built later) owns all data fetching and persistence;
// this component is a pure function of props and is what the Storybook stories render.

/**
 * The editing surfaces a project keyboard can be configured for, in visual rendering order.
 *
 * Mirrors `KEYBOARD_SURFACE_TYPES` from `src/shared/services/keyboard.service-model.ts` —
 * extensions cannot import runtime values from `papi-shared-types` (it is a types-only module), so
 * the presentational layer carries its own copy. The web view wiring layer is responsible for
 * keeping the two lists in sync. Adding a future surface here also requires a label entry in
 * {@link KeyboardSelectionProps.localizedStrings} handling below.
 */
export const KEYBOARD_SELECTION_SURFACE_TYPES = Object.freeze(['vernacular', 'comments'] as const);

/** One of the editing surfaces listed in {@link KEYBOARD_SELECTION_SURFACE_TYPES}. */
export type KeyboardSelectionSurfaceType = (typeof KEYBOARD_SELECTION_SURFACE_TYPES)[number];

/**
 * A single OS-installed keyboard option as enumerated by the OS-keyboard layer.
 *
 * Structurally mirrors `KeyboardOption` from `src/shared/services/keyboard.service-model.ts` (see
 * note on {@link KEYBOARD_SELECTION_SURFACE_TYPES} for why it is mirrored rather than imported).
 */
export type KeyboardSelectionKeyboardOption = {
  /** Opaque OS-supplied keyboard identifier. Equality is by string compare. */
  id: string;
  /**
   * Display name as enumerated by the OS. May contain RTL script (e.g., "العربية"). Not localized —
   * this is OS data, rendered with per-item bidi isolation.
   */
  name: string;
  /** Optional hint that the OS-supplied name is in an RTL script. */
  isRtlScript?: boolean;
};

/**
 * The per-surface selections the user confirmed with OK. A key is present for every surface that
 * was rendered; `undefined` means the sentinel ("Do not switch keyboard" — no association) was
 * selected for that surface.
 */
export type KeyboardSelectionSelections = {
  [surfaceType in KeyboardSelectionSurfaceType]?: string | undefined;
};

/**
 * Object containing all keys used for localization in this component. The web view wiring layer
 * passes this list to the platform's localization hook and forwards the resolved map into the
 * `localizedStrings` prop of this component.
 */
export const KEYBOARD_SELECTION_STRING_KEYS = Object.freeze([
  '%keyboardSelection_allGroup%',
  '%keyboardSelection_cancel%',
  '%keyboardSelection_descriptionStandard%',
  '%keyboardSelection_emptyStateHint%',
  '%keyboardSelection_lastUsedGroup%',
  '%keyboardSelection_loadingKeyboards%',
  '%keyboardSelection_notesKeyboardLabel%',
  '%keyboardSelection_ok%',
  '%keyboardSelection_sentinel%',
  '%keyboardSelection_sentinelA11yName%',
  '%keyboardSelection_suggestedNotSaved%',
  '%keyboardSelection_textKeyboardDisabledReason%',
  '%keyboardSelection_textKeyboardLabel%',
  '%keyboardSelection_textKeyboardLabelResource%',
] as const);

/** Localized-string key consumed by {@link KeyboardSelection}. */
export type KeyboardSelectionLocalizedStringKey = (typeof KEYBOARD_SELECTION_STRING_KEYS)[number];

/** Localized-strings map shape accepted by the `localizedStrings` prop. */
export type KeyboardSelectionLocalizedStrings = Partial<
  Record<KeyboardSelectionLocalizedStringKey, string>
>;

const ENGLISH_FALLBACKS: Record<KeyboardSelectionLocalizedStringKey, string> = {
  '%keyboardSelection_allGroup%': 'All keyboards',
  '%keyboardSelection_cancel%': 'Cancel',
  '%keyboardSelection_descriptionStandard%':
    'You may choose a keyboard for text and notes in project {0} if you want Paratext to ' +
    'automatically switch the keyboard for the current user on this computer.',
  '%keyboardSelection_emptyStateHint%':
    "No keyboards are installed on this system. Install a keyboard via your operating system's " +
    'keyboard settings, then reopen this dialog.',
  '%keyboardSelection_lastUsedGroup%': 'Last used in {0}',
  '%keyboardSelection_loadingKeyboards%': 'Loading keyboards…',
  '%keyboardSelection_notesKeyboardLabel%': 'Keyboard for notes:',
  '%keyboardSelection_ok%': 'OK',
  '%keyboardSelection_sentinel%': 'Do not switch keyboard',
  '%keyboardSelection_sentinelA11yName%': 'Use system default',
  '%keyboardSelection_suggestedNotSaved%': 'Suggested — not yet saved',
  '%keyboardSelection_textKeyboardDisabledReason%':
    'Disabled because this project type has no scripture text',
  '%keyboardSelection_textKeyboardLabel%': 'Keyboard for text:',
  '%keyboardSelection_textKeyboardLabelResource%': 'Keyboard:',
};

/** Props accepted by {@link KeyboardSelection}. */
export type KeyboardSelectionProps = {
  /** The project's short-name, interpolated into the description and last-used group heading. */
  projectShortName?: string;
  /**
   * Project capability surface, read from project metadata by the caller. Drives which surface
   * dropdowns render and whether the vernacular dropdown is enabled: the vernacular dropdown is
   * always rendered but disabled when no scripture interface is present; the comments dropdown is
   * rendered only when a comments interface is present.
   */
  projectInterfaces?: readonly string[];
  /**
   * Currently-persisted keyboard ID per surface, or absent if no association. A persisted ID that
   * is no longer present in `availableKeyboards` falls back to the sentinel selection.
   */
  configuredKeyboardIds?: { [surfaceType in KeyboardSelectionSurfaceType]?: string };
  /**
   * Recently-used keyboard IDs per surface, most-recent first. Entries that do not resolve to an
   * installed keyboard are silently dropped. When a surface has no configured keyboard and its
   * first resolvable last-used entry exists, that entry is pre-selected as a suggestion with a
   * "Suggested — not yet saved" badge (cleared on user interaction).
   */
  lastUsedKeyboardIds?: { [surfaceType in KeyboardSelectionSurfaceType]?: readonly string[] };
  /** OS-installed keyboards in OS-reported order. Empty array is a valid steady state. */
  availableKeyboards?: readonly KeyboardSelectionKeyboardOption[];
  /** True while the caller is still enumerating OS keyboards. */
  isLoadingKeyboards?: boolean;
  /** Distinguishes successful empty-state from timeout/unknown enumeration failure. */
  loadError?: 'none' | 'timeout' | 'unknown';
  /**
   * Localization map (key → translated string). Component falls back to English when a key is
   * missing.
   */
  localizedStrings?: KeyboardSelectionLocalizedStrings;
  /**
   * Called when the user confirms with OK (button click or Enter). Receives the per-surface
   * selections for every rendered surface; `undefined` = sentinel. The caller persists the
   * selections and closes the dialog.
   */
  onOk?: (selections: KeyboardSelectionSelections) => void;
  /** Called when the user cancels (button click or Escape). The caller closes the dialog. */
  onCancel?: () => void;
};

/**
 * Value the surface `Select` uses for the sentinel ("Do not switch keyboard") item. Radix Select
 * forbids empty-string item values, and real keyboard IDs are prefixed by {@link encodeSelectValue}
 * so an opaque OS-supplied ID can never collide with this token.
 */
const SENTINEL_SELECT_VALUE = 'sentinel';

/** Prefix applied to real keyboard IDs inside the `Select` so they cannot collide the sentinel. */
const KEYBOARD_ID_VALUE_PREFIX = 'kb:';

function encodeSelectValue(keyboardId: string | undefined): string {
  return keyboardId === undefined
    ? SENTINEL_SELECT_VALUE
    : `${KEYBOARD_ID_VALUE_PREFIX}${keyboardId}`;
}

function decodeSelectValue(selectValue: string): string | undefined {
  return selectValue === SENTINEL_SELECT_VALUE
    ? undefined
    : selectValue.slice(KEYBOARD_ID_VALUE_PREFIX.length);
}

// The two predicates below mirror `isScriptureInterface` / `isCommentsInterface` from
// `src/shared/services/keyboard.service-model.ts` (see the note on
// KEYBOARD_SELECTION_SURFACE_TYPES for why they are mirrored rather than imported).

/** Whether this projectInterface indicates the project carries editable scripture text. */
function isScriptureProjectInterface(projectInterface: string): boolean {
  return projectInterface.toLowerCase().includes('scripture');
}

/** Whether this projectInterface indicates the project carries comments/notes. */
function isCommentsProjectInterface(projectInterface: string): boolean {
  return projectInterface.toLowerCase().includes('comments');
}

/** Per-surface static configuration — test ids from the UI spec's Test Contract. */
const SURFACE_TEST_IDS: Record<KeyboardSelectionSurfaceType, { label: string; trigger: string }> = {
  vernacular: {
    label: 'keyboard-selection-text-label',
    trigger: 'keyboard-selection-text-keyboard',
  },
  comments: {
    label: 'keyboard-selection-notes-label',
    trigger: 'keyboard-selection-notes-keyboard',
  },
};

/**
 * Keyboard selection dialog content for configuring a project's per-surface default keyboards
 * (vernacular text and, when the project supports them, comments/notes). Pure presentational — no
 * PAPI access; all data arrives via props and all actions fire callback props.
 *
 * Layout rules:
 *
 * - The vernacular dropdown always renders; it is disabled (with an explanatory description) when the
 *   project has no scripture interface.
 * - The comments dropdown renders only when the project has a comments interface; otherwise it is
 *   omitted from the layout entirely and the vernacular label simplifies to "Keyboard:".
 * - Each dropdown lists the sentinel ("Do not switch keyboard") first, then a "Last used in
 *   {project}" group, then the remaining installed keyboards under "All keyboards".
 */
export function KeyboardSelection({
  projectShortName = '',
  projectInterfaces = [],
  configuredKeyboardIds = {},
  lastUsedKeyboardIds = {},
  availableKeyboards = [],
  isLoadingKeyboards = false,
  loadError = 'none',
  localizedStrings = {},
  onOk = () => {},
  onCancel = () => {},
}: KeyboardSelectionProps) {
  const getLocalizedString = useCallback(
    (localizeKey: KeyboardSelectionLocalizedStringKey) =>
      localizedStrings[localizeKey] ?? ENGLISH_FALLBACKS[localizeKey],
    [localizedStrings],
  );

  const hasScripture = projectInterfaces.some(isScriptureProjectInterface);
  const hasComments = projectInterfaces.some(isCommentsProjectInterface);

  /**
   * Whether a surface's dropdown appears in the layout at all. The vernacular surface is always
   * rendered (PT9 note-type behavior keeps it visible-but-disabled); the comments surface is
   * omitted entirely when the project has no comments interface (PT9 resource behavior).
   */
  const isSurfaceRendered = useCallback(
    (surfaceType: KeyboardSelectionSurfaceType): boolean =>
      surfaceType === 'vernacular' || hasComments,
    [hasComments],
  );

  /** Only the vernacular surface can be disabled today (project without scripture text). */
  const isSurfaceDisabled = useCallback(
    (surfaceType: KeyboardSelectionSurfaceType): boolean =>
      surfaceType === 'vernacular' && !hasScripture,
    [hasScripture],
  );

  const renderedSurfaceTypes = useMemo(
    () => KEYBOARD_SELECTION_SURFACE_TYPES.filter(isSurfaceRendered),
    [isSurfaceRendered],
  );

  /** Pending per-surface selections; `undefined` = sentinel. */
  const [pendingSelections, setPendingSelections] = useState<KeyboardSelectionSelections>({});
  /** Surfaces whose current selection is an unsaved last-used suggestion (badge shown). */
  const [suggestedSurfaceTypes, setSuggestedSurfaceTypes] = useState<
    ReadonlySet<KeyboardSelectionSurfaceType>
  >(new Set());
  const [hasInitializedSelections, setHasInitializedSelections] = useState(false);

  // Compute the initial per-surface selection once keyboard enumeration resolves: the persisted
  // keyboard if it is still installed; otherwise (no persisted association) the first last-used
  // entry that is still installed, marked as a suggestion; otherwise the sentinel. A persisted
  // keyboard that is no longer installed falls back to the sentinel WITHOUT a suggestion (the
  // suggestion rule only applies when no association is persisted).
  useEffect(() => {
    if (isLoadingKeyboards || hasInitializedSelections) return;

    const initialSelections: KeyboardSelectionSelections = {};
    const initialSuggestions = new Set<KeyboardSelectionSurfaceType>();
    KEYBOARD_SELECTION_SURFACE_TYPES.forEach((surfaceType) => {
      const configuredId = configuredKeyboardIds[surfaceType];
      if (configuredId !== undefined) {
        initialSelections[surfaceType] = availableKeyboards.some(
          (keyboard) => keyboard.id === configuredId,
        )
          ? configuredId
          : undefined;
        return;
      }
      const suggestedId = (lastUsedKeyboardIds[surfaceType] ?? []).find((lastUsedId) =>
        availableKeyboards.some((keyboard) => keyboard.id === lastUsedId),
      );
      initialSelections[surfaceType] = suggestedId;
      if (suggestedId !== undefined) initialSuggestions.add(surfaceType);
    });

    setPendingSelections(initialSelections);
    setSuggestedSurfaceTypes(initialSuggestions);
    setHasInitializedSelections(true);
  }, [
    isLoadingKeyboards,
    hasInitializedSelections,
    availableKeyboards,
    configuredKeyboardIds,
    lastUsedKeyboardIds,
  ]);

  // Initial focus: the first rendered AND enabled surface dropdown (vernacular normally; the
  // comments dropdown when the vernacular one is disabled). Applied once, after enumeration
  // resolves, so the trigger is interactable when it receives focus.
  const surfaceTriggerRefs = useRef<
    Partial<Record<KeyboardSelectionSurfaceType, HTMLButtonElement | undefined>>
  >({});
  const hasAppliedInitialFocusRef = useRef(false);
  useEffect(() => {
    if (!hasInitializedSelections || hasAppliedInitialFocusRef.current) return;
    const firstEnabledSurfaceType = renderedSurfaceTypes.find(
      (surfaceType) => !isSurfaceDisabled(surfaceType),
    );
    if (!firstEnabledSurfaceType) return;
    surfaceTriggerRefs.current[firstEnabledSurfaceType]?.focus();
    hasAppliedInitialFocusRef.current = true;
  }, [hasInitializedSelections, renderedSurfaceTypes, isSurfaceDisabled]);

  const handleSelectionChange = (
    surfaceType: KeyboardSelectionSurfaceType,
    keyboardId: string | undefined,
  ) => {
    setPendingSelections((previous) => ({ ...previous, [surfaceType]: keyboardId }));
    // Any user interaction turns a suggestion into a real (still unsaved) choice.
    setSuggestedSurfaceTypes((previous) => {
      if (!previous.has(surfaceType)) return previous;
      const next = new Set(previous);
      next.delete(surfaceType);
      return next;
    });
  };

  const handleOk = () => {
    const selections: KeyboardSelectionSelections = {};
    renderedSurfaceTypes.forEach((surfaceType) => {
      selections[surfaceType] = pendingSelections[surfaceType];
    });
    onOk(selections);
  };

  const handleRootKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    // An open Select owns Enter/Escape (Radix prevents default for the keys it consumes).
    if (event.defaultPrevented) return;
    if (event.target instanceof HTMLElement && event.target.closest('[role="listbox"]')) return;
    if (event.key === 'Enter' && !isLoadingKeyboards) {
      // Native button activation wins: Enter on OK/Cancel must click THAT button, not submit
      // dialog-wide. (Closed select triggers never reach here — Radix prevents default on Enter
      // to open the dropdown, which the defaultPrevented guard above catches.)
      if (event.target instanceof HTMLElement && event.target.closest('button')) return;
      event.preventDefault();
      handleOk();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      onCancel();
    }
  };

  const idPrefix = useId();
  const emptyStateHintId = `${idPrefix}-empty-hint`;
  const disabledReasonId = `${idPrefix}-disabled-reason`;
  const suggestionBadgeId = (surfaceType: KeyboardSelectionSurfaceType) =>
    `${idPrefix}-${surfaceType}-suggestion`;
  const surfaceTriggerId = (surfaceType: KeyboardSelectionSurfaceType) =>
    `${idPrefix}-${surfaceType}-keyboard`;

  const showEmptyStateHint =
    !isLoadingKeyboards &&
    ((availableKeyboards.length === 0 && loadError === 'none') || loadError !== 'none');

  const sentinelText = getLocalizedString('%keyboardSelection_sentinel%');

  // The description interpolates the project short-name with bidi isolation (an RTL short-name
  // must not reflow the surrounding sentence).
  const descriptionContent: ReactNode[] = formatReplacementStringToArray<ReactNode>(
    getLocalizedString('%keyboardSelection_descriptionStandard%'),
    { 0: <bdi key="project-short-name">{projectShortName}</bdi> },
  );

  const renderKeyboardItem = (keyboard: KeyboardSelectionKeyboardOption) => (
    <SelectItem key={keyboard.id} value={encodeSelectValue(keyboard.id)} textValue={keyboard.name}>
      {/* OS keyboard names may be RTL script — isolate each name so it renders with its own
          base direction inside an otherwise LTR (or RTL) list. */}
      <bdi>{keyboard.name}</bdi>
    </SelectItem>
  );

  const renderSurfaceField = (surfaceType: KeyboardSelectionSurfaceType) => {
    const disabled = isSurfaceDisabled(surfaceType);
    const selectedKeyboardId = pendingSelections[surfaceType];
    const isSuggestion = suggestedSurfaceTypes.has(surfaceType);

    const lastUsedOptions = (lastUsedKeyboardIds[surfaceType] ?? [])
      .map((lastUsedId) => availableKeyboards.find((keyboard) => keyboard.id === lastUsedId))
      .filter((keyboard) => keyboard !== undefined);
    const allOptions = availableKeyboards.filter(
      (keyboard) => !lastUsedOptions.some((lastUsed) => lastUsed.id === keyboard.id),
    );

    const labelText =
      surfaceType === 'comments'
        ? getLocalizedString('%keyboardSelection_notesKeyboardLabel%')
        : getLocalizedString(
            hasComments
              ? '%keyboardSelection_textKeyboardLabel%'
              : '%keyboardSelection_textKeyboardLabelResource%',
          );

    const describedByIds = [
      showEmptyStateHint ? emptyStateHintId : undefined,
      disabled ? disabledReasonId : undefined,
      isSuggestion ? suggestionBadgeId(surfaceType) : undefined,
    ].filter((describedById) => describedById !== undefined);

    return (
      <div key={surfaceType} className="tw:flex tw:flex-col tw:gap-1">
        <Label
          htmlFor={surfaceTriggerId(surfaceType)}
          data-testid={SURFACE_TEST_IDS[surfaceType].label}
        >
          {labelText}
        </Label>
        <div className="tw:flex tw:items-center tw:gap-2">
          <Select
            value={encodeSelectValue(selectedKeyboardId)}
            onValueChange={(newValue) =>
              handleSelectionChange(surfaceType, decodeSelectValue(newValue))
            }
            disabled={disabled || isLoadingKeyboards}
          >
            <SelectTrigger
              id={surfaceTriggerId(surfaceType)}
              ref={(triggerElement) => {
                surfaceTriggerRefs.current[surfaceType] = triggerElement ?? undefined;
              }}
              className="tw:w-64"
              aria-busy={isLoadingKeyboards || undefined}
              aria-disabled={disabled || undefined}
              aria-describedby={describedByIds.length > 0 ? describedByIds.join(' ') : undefined}
              data-testid={SURFACE_TEST_IDS[surfaceType].trigger}
            >
              {isLoadingKeyboards ? (
                <Spinner size={16} className="tw:shrink-0 tw:text-muted-foreground" />
              ) : undefined}
              <SelectValue
                placeholder={
                  <span className="tw:italic tw:text-muted-foreground">{sentinelText}</span>
                }
              />
            </SelectTrigger>
            <SelectContent>
              {/* Sentinel ("no association") is always the first item. It is a styled
                  placeholder, not a real keyboard: italic + muted, with a screen-reader name
                  that does not verbalize placeholder styling conventions. */}
              <SelectItem
                value={SENTINEL_SELECT_VALUE}
                textValue={sentinelText}
                aria-label={getLocalizedString('%keyboardSelection_sentinelA11yName%')}
                data-testid="keyboard-selection-sentinel-item"
              >
                <span className="tw:italic tw:text-muted-foreground">{sentinelText}</span>
              </SelectItem>
              {lastUsedOptions.length > 0 ? (
                <SelectGroup>
                  <SelectLabel>
                    {formatReplacementString(
                      getLocalizedString('%keyboardSelection_lastUsedGroup%'),
                      { 0: projectShortName },
                    )}
                  </SelectLabel>
                  {lastUsedOptions.map(renderKeyboardItem)}
                </SelectGroup>
              ) : undefined}
              {allOptions.length > 0 ? (
                <SelectGroup>
                  <SelectLabel>{getLocalizedString('%keyboardSelection_allGroup%')}</SelectLabel>
                  {allOptions.map(renderKeyboardItem)}
                </SelectGroup>
              ) : undefined}
            </SelectContent>
          </Select>
          {isSuggestion ? (
            <span
              id={suggestionBadgeId(surfaceType)}
              className="tw:rounded tw:bg-muted tw:px-1.5 tw:py-0.5 tw:text-xs tw:text-muted-foreground"
            >
              {getLocalizedString('%keyboardSelection_suggestedNotSaved%')}
            </span>
          ) : undefined}
        </div>
        {disabled ? (
          <p id={disabledReasonId} className="tw:text-xs tw:text-muted-foreground">
            {getLocalizedString('%keyboardSelection_textKeyboardDisabledReason%')}
          </p>
        ) : undefined}
      </div>
    );
  };

  return (
    // Dialog-wide keyboard shortcuts per the UI spec: Enter triggers OK, Escape triggers Cancel.
    // The wrapper is not itself interactive — the handler only routes keys that bubble from the
    // dialog's focusable controls — so the static-element-interactions rule does not apply.
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className="pr-twp tw:flex tw:h-full tw:min-h-[240px] tw:flex-col"
      onKeyDown={handleRootKeyDown}
    >
      <div className="tw:p-4">
        <p
          className="tw:text-sm tw:text-muted-foreground"
          data-testid="keyboard-selection-description"
        >
          {descriptionContent}
        </p>
      </div>

      <div className="tw:flex tw:flex-1 tw:flex-col tw:gap-3 tw:px-4">
        {renderedSurfaceTypes.map(renderSurfaceField)}

        {isLoadingKeyboards ? (
          <div
            className="tw:flex tw:items-center tw:gap-2 tw:text-sm tw:text-muted-foreground"
            data-testid="keyboard-selection-loading"
          >
            <Spinner size={16} />
            <span>{getLocalizedString('%keyboardSelection_loadingKeyboards%')}</span>
          </div>
        ) : undefined}

        {showEmptyStateHint ? (
          <p
            id={emptyStateHintId}
            className="tw:text-sm tw:text-muted-foreground"
            data-testid="keyboard-selection-empty-hint"
          >
            {getLocalizedString('%keyboardSelection_emptyStateHint%')}
          </p>
        ) : undefined}

        {/* Polite live region announcing the loading state to assistive technology. Always in
            the DOM so screen readers track its content changes. */}
        <div role="status" aria-live="polite" className="tw:sr-only">
          {isLoadingKeyboards ? getLocalizedString('%keyboardSelection_loadingKeyboards%') : ''}
        </div>
      </div>

      {/* Tab order follows visual reading order: dropdowns → OK → Cancel. */}
      <div className="tw:flex tw:justify-end tw:gap-2 tw:border-t tw:p-4">
        <Button onClick={handleOk} disabled={isLoadingKeyboards}>
          {getLocalizedString('%keyboardSelection_ok%')}
        </Button>
        <Button variant="outline" onClick={onCancel}>
          {getLocalizedString('%keyboardSelection_cancel%')}
        </Button>
      </div>
    </div>
  );
}

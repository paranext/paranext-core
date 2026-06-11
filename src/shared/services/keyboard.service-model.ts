// === NEW IN PT10 === (keyboard-switching CAP-008)
// Reason: PT10 service-model pattern — shared TS contract surface for the
// `platform.keyboard` data provider (no PT9 equivalent; PT9 keyboarding was
// WinForms-internal). Types per data-contracts.md §2.1/§2.2/§2.3/§2.5/§9;
// backend-alignment.md §"Type Declaration" + §"Data Provider Data Types (PT10)";
// alignment-decisions.md #26-#30.
// Maps to: CAP-008
//
// Cross-process safe: types + small pure helpers only (no service state).

import { PlatformEvent } from 'platform-bible-utils';
import { DataProviderDataType } from '@shared/models/data-provider.model';
import { IDataProvider } from '@shared/models/data-provider.interface';
import { WebViewId } from '@shared/models/web-view.model';

/**
 * Combines a finite set of known string literals with a tolerance for unknown strings — preserving
 * editor autocomplete on the known values AND keeping exhaustiveness pressure on `switch` consumers
 * (because TypeScript no longer thinks the union is closed).
 *
 * Without the `(string & {})` branch, `T | string` collapses to just `string` and you lose both
 * autocomplete and the requirement to handle a `default` branch in switch statements. The `& {}`
 * intersection is identical to `string` at runtime but blocks the collapse for inference purposes.
 *
 * See data-contracts.md §2.5 for the full rationale (the pattern is also published in type-fest
 * under the same name).
 */
export type LiteralUnion<T extends string> = T | (string & {});

/**
 * Opaque OS-supplied keyboard identifier (FN-002). Equality by string compare. Treat as opaque — do
 * not parse, normalize, or assume a format (INV-C07).
 */
export type KeyboardId = string;

/**
 * Stable project identifier — the string form of a Guid. PT9 anchor: `ScrText.Guid.ToString()`
 * (INV-C06).
 */
export type ProjectId = string;

/**
 * The canonical const tuple of all known surface type strings (alignment-decision #29 §D). Adding a
 * new surface in a future release is a one-line edit here. Consumers that iterate over surfaces
 * (the dialog, tests, etc.) import this const rather than hardcoding the list.
 */
export const KEYBOARD_SURFACE_TYPES = ['vernacular', 'comments'] as const;

/**
 * Keyboard surface type for a project.
 *
 * - `'vernacular'` : the project's scripture / text editor surface (PT9: not-isForNotes)
 * - `'comments'` : the project's comments editor surface (PT9: NotesKeyboard)
 *
 * Forward-compat note: {@link LiteralUnion} preserves autocomplete on the two known surfaces AND
 * forces any `switch (surfaceType)` consumer to handle a `default` branch — so adding a third
 * surface type in a future release does not silently break exhaustiveness checks at existing call
 * sites. Wire-level validation (in the data provider engine) still rejects unknown values.
 */
export type KeyboardSurfaceType = LiteralUnion<(typeof KEYBOARD_SURFACE_TYPES)[number]>;

/**
 * Maximum number of last-used keyboard ids retained per (project, surface) by the last-used
 * keyboard store (alignment-decision #26; const tunable).
 */
export const MAX_LAST_USED_KEYBOARDS = 1;

/**
 * A single OS-installed keyboard option as enumerated by the OS-keyboard layer (data-contracts
 * §2.3). Matches the C# `KeyboardOption` record wire shape (CAP-007).
 */
export interface KeyboardOption {
  /** Opaque OS-supplied ID — equality target for selection logic. */
  id: KeyboardId;
  /**
   * Display name as enumerated by the OS. May contain RTL script (e.g., "العربية", "עברית"). PT10
   * does NOT translate this string. Per-item bidi rendering is required (FN-012).
   */
  name: string;
  /**
   * Optional hint that the OS-supplied name is in an RTL script. May be computed by the OS-keyboard
   * layer or by a Unicode bidi heuristic. Absent means "unknown".
   */
  isRtlScript?: boolean;
}

/** The currently-active keyboard plus the project/surface context that activated it (if any). */
export type CurrentKeyboard = {
  /** The active OS keyboard id. */
  keyboardId: KeyboardId;
  /** Project whose preference drove the activation; `undefined` for ad-hoc activations. */
  projectId: ProjectId | undefined;
  /** Surface whose preference drove the activation; `undefined` for ad-hoc activations. */
  surfaceType: KeyboardSurfaceType | undefined;
};

/**
 * Payload of {@link IKeyboardService.onDidDetectManualKeyboardSwitch} (alignment-decision #28) — the
 * user manually switched the OS keyboard while focused on a project editor surface that has no
 * configured keyboard.
 */
export type ManualKeyboardSwitchDetection = {
  projectId: ProjectId;
  surfaceType: KeyboardSurfaceType;
  manuallyChosenKeyboardId: KeyboardId;
};

/**
 * Per-surface default keyboard map for one project (alignment-decision #29 §D). Known surfaces are
 * strongly typed from {@link KEYBOARD_SURFACE_TYPES}; the index signature allows tolerant reading of
 * unknown keys a future PT10 might persist.
 */
export type SurfaceKeyboardMap = {
  [Surface in (typeof KEYBOARD_SURFACE_TYPES)[number]]?: KeyboardId;
} & { [surface: string]: KeyboardId | undefined };

/**
 * Per-surface arrays of last-used keyboard ids for one project (most-recent first; length
 * 0..{@link MAX_LAST_USED_KEYBOARDS}). Same known-key + tolerant-index shape as
 * {@link SurfaceKeyboardMap}.
 */
export type SurfaceKeyboardArrayMap = {
  [Surface in (typeof KEYBOARD_SURFACE_TYPES)[number]]?: KeyboardId[];
} & { [surface: string]: KeyboardId[] | undefined };

/** Selector for the per-surface `ProjectDefaultKeyboard` data type. */
export type ProjectDefaultKeyboardSelector = {
  projectId: ProjectId;
  surfaceType: KeyboardSurfaceType;
};

/**
 * Set value for the `CurrentKeyboard` data type — discriminated; never `undefined` (`undefined`
 * would conflict with `resetCurrentKeyboard` semantics; see backend-alignment.md set-semantics
 * table).
 */
export type SetCurrentKeyboardValue =
  | { surfaceType: KeyboardSurfaceType }
  | { keyboardId: KeyboardId };

/** JSDOC DESTINATION keyboardServiceProviderName */
export const keyboardServiceProviderName = 'platform.keyboard';

export const keyboardServiceObjectToProxy = Object.freeze({
  /**
   * JSDOC SOURCE keyboardServiceProviderName
   *
   * This name is used to register the keyboard service data provider on the papi. You can use this
   * name to find the data provider when accessing it using the useData hook
   */
  dataProviderName: keyboardServiceProviderName,
});

/** Name of the C# OS-keyboard primitive data provider (CAP-007; alignment-decision #25). */
export const osKeyboardServiceProviderName = 'platform.osKeyboard';

/**
 * The six data types served by the `platform.keyboard` data provider engine (CAP-015). See
 * backend-alignment.md §"Data Provider Data Types (PT10)" for full get/set semantics.
 */
export type KeyboardServiceDataTypes = {
  /** Per-(project, surface) default keyboard. `undefined` set value = sentinel = remove. */
  ProjectDefaultKeyboard: DataProviderDataType<
    ProjectDefaultKeyboardSelector,
    KeyboardId | undefined,
    KeyboardId | undefined
  >;
  /**
   * Plural read-only view of one project's per-surface defaults (alignment-decision #29 §C). Writes
   * go through `ProjectDefaultKeyboard` (singular).
   */
  ProjectDefaultKeyboards: DataProviderDataType<ProjectId, SurfaceKeyboardMap, never>;
  /** OS-level default keyboard captured once at startup (INV-C05). Read-only. */
  SystemDefaultKeyboard: DataProviderDataType<undefined, KeyboardId | undefined, never>;
  /** OS-enumerated keyboard options. Read-only. */
  AvailableKeyboards: DataProviderDataType<undefined, KeyboardOption[], never>;
  /** The globally-active keyboard (selector `undefined`) or focused-webview guard (selector id). */
  CurrentKeyboard: DataProviderDataType<
    WebViewId | undefined,
    CurrentKeyboard | undefined,
    SetCurrentKeyboardValue
  >;
  /** Last-used keyboards per (project, surface) (alignment-decisions #26, #29 §C). Read-only. */
  LastUsedKeyboards: DataProviderDataType<ProjectId, SurfaceKeyboardArrayMap, never>;
};

/**
 * The two data types served by the C# `platform.osKeyboard` data provider (CAP-007) — the OS
 * primitive layer consumed by the TS `KeyboardActivationService` (CAP-010).
 */
export type OsKeyboardServiceDataTypes = {
  /** Currently-active OS keyboard id. `set` activates at the OS layer (VAL-B-04 inside). */
  CurrentOsKeyboard: DataProviderDataType<undefined, KeyboardId | undefined, KeyboardId>;
  /** OS-enumerated keyboard options. Read-only. */
  AvailableOsKeyboards: DataProviderDataType<undefined, KeyboardOption[], never>;
};

/**
 * JSDOC SOURCE keyboardService
 *
 * Service that allows to interact with per-project keyboard preferences and the active OS keyboard.
 * The shape `papi.keyboard` exposes (registered by CAP-016).
 */
export type IKeyboardService = {
  /**
   * Event that fires when a manual OS-keyboard switch is detected on an unconfigured project editor
   * surface (alignment-decision #28).
   */
  onDidDetectManualKeyboardSwitch: PlatformEvent<ManualKeyboardSwitchDetection>;

  /**
   * Resets the current OS keyboard per the 6-case table in backend-alignment.md: resolve the
   * focused (or specified, must-be-focused) webview's `keyboardPreference` to the project default
   * keyboard, falling back to the system default keyboard.
   *
   * @param webViewId The webview to reset for, or `undefined` to resolve from current focus
   * @returns Promise that resolves `true` if a keyboard activation was performed
   */
  resetCurrentKeyboard(webViewId: WebViewId | undefined): Promise<boolean>;
} & IDataProvider<KeyboardServiceDataTypes> &
  typeof keyboardServiceObjectToProxy;

/**
 * TS view of the C# `platform.osKeyboard` data provider (CAP-007). Consumers obtain it via
 * `papi.dataProviders.get(osKeyboardServiceProviderName)`.
 */
export type IOsKeyboardDataProvider = IDataProvider<OsKeyboardServiceDataTypes>;

declare module 'papi-shared-types' {
  export interface DataProviders {
    [keyboardServiceProviderName]: IKeyboardService;
    [osKeyboardServiceProviderName]: IOsKeyboardDataProvider;
  }
}

// === NEW IN PT10 === (alignment-decision #30 canonical body)
// Reason: PT10 reasons about per-project capability via projectInterfaces (interface-based),
// not PT9's ProjectKind typology. Case-insensitive substring matching is sufficient for the
// current PT10 namespace shape (`platformScripture.*`); this predicate is the single place to
// update if a future projectInterface name breaks that convention.
// Maps to: CAP-008
/**
 * True if the projectInterface implies a writable scripture surface (alignment-decision #30 —
 * drives vernacular ComboBox enablement in the keyboard-selection dialog).
 */
export function isScriptureInterface(projectInterface: string): boolean {
  return projectInterface.toLowerCase().includes('scripture');
}

// === NEW IN PT10 === (alignment-decision #30 canonical body)
// Reason: same interface-based capability detection as isScriptureInterface; matches
// `legacyCommentManager.comments` / `legacyCommentManager.commentsUsj`.
// Maps to: CAP-008
/**
 * True if the projectInterface implies a comments surface (alignment-decision #30 — drives comments
 * ComboBox visibility in the keyboard-selection dialog).
 */
export function isCommentsInterface(projectInterface: string): boolean {
  return projectInterface.toLowerCase().includes('comments');
}

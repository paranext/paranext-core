import {
  getDefaultViewOptions,
  getViewOptions,
  PARAGRAPH_STRUCTURE_VIEW_MODE,
  STANDARD_VIEW_MODE,
  type ViewOptions,
} from '@eten-tech-foundation/platform-editor';
import { deepEqual } from 'platform-bible-utils';
import { describe, expect, it } from 'vitest';
import { getEditorViewOptions } from './editor-view-options.util';
import {
  getDisplayedViewType,
  getNextViewTypeInCycle,
  type PersistedViewType,
  resolveFootnotesPaneViewOptions,
  resolveNoteEditingSurface,
  usesPaneNoteModel,
  VIEW_TYPE_UNSET,
} from './platform-scripture-editor.utils';
import { deriveReadOnlyFlags } from './platform-scripture-editor.web-view.utils';

const INTERFACE_MODES = { power: true, simple: false } as const;

/** Every value a web view's saved view type can hold, keyed by a readable label. */
const SAVED_VIEW_TYPES = {
  'never saved': VIEW_TYPE_UNSET,
  standard: 'standard',
  formatted: 'formatted',
  // A legacy saved value: the Markers view is no longer offered, and a tab that saved it displays
  // as Standard view in Power.
  'markers (legacy saved value)': 'markers',
} as const satisfies Record<string, PersistedViewType>;

/** The editor's named view presets, to say which one a view's options are. */
const VIEW_PRESETS: Record<string, ViewOptions | undefined> = {
  standard: getViewOptions(STANDARD_VIEW_MODE),
  'paragraph structure': getViewOptions(PARAGRAPH_STRUCTURE_VIEW_MODE),
  default: getDefaultViewOptions(),
};

/** Which preset `viewOptions` is, and the fields that decide what the view shows and edits. */
function describeViewOptions(viewOptions: ViewOptions | undefined) {
  if (!viewOptions) return undefined;
  const preset =
    Object.keys(VIEW_PRESETS).find((name) =>
      deepEqual(
        { ...VIEW_PRESETS[name], allowInvisibleCharacters: viewOptions.allowInvisibleCharacters },
        viewOptions,
      ),
    ) ?? 'no preset';
  const { markerMode, hasSpacing, isFormattedFont, noteMode } = viewOptions;
  return { preset, markerMode, hasSpacing, isFormattedFont, noteMode };
}

/** Whether `build` gives back the project's `allowInvisibleCharacters` unchanged, for both values. */
function passesAllowInvisibleCharactersThrough(
  build: (allowInvisibleCharacters: boolean) => ViewOptions | undefined,
): boolean {
  return [true, false].every(
    (allowInvisibleCharacters) =>
      build(allowInvisibleCharacters)?.allowInvisibleCharacters === allowInvisibleCharacters,
  );
}

/**
 * What the app offers for one saved view type in one interface mode once `platform.interfaceMode`
 * has loaded, composed the way the editor web view composes these functions.
 */
function describeReachableView(persistedViewType: PersistedViewType, isPowerMode: boolean) {
  const isInterfaceModeLoading = false;
  const viewType = getDisplayedViewType({ persistedViewType, isPowerMode, isInterfaceModeLoading });
  const mainViewOptions = (allowInvisibleCharacters: boolean) =>
    getEditorViewOptions(viewType, isPowerMode, allowInvisibleCharacters);
  const footnotesPaneViewOptions = (allowInvisibleCharacters: boolean) =>
    resolveFootnotesPaneViewOptions({
      isPowerMode,
      isInterfaceModeLoading,
      mainViewOptions: mainViewOptions(allowInvisibleCharacters),
      standardViewOptions: getEditorViewOptions('standard', isPowerMode, allowInvisibleCharacters),
    });
  // A normal project the user can edit, with every setting loaded and no sync in progress, so only
  // the view itself can make the text read-only.
  const { isReadOnlyEffective } = deriveReadOnlyFlags({
    isReadOnly: false,
    isProjectEditableLoading: false,
    isProjectEditable: true,
    isCanUserEditScriptureUnresolved: false,
    canUserEditScripture: true,
    isAllowInvisibleCharactersUnreadable: false,
    isSyncBlocked: false,
    isInterfaceModeLoading,
    viewType,
    isPowerMode,
  });
  return {
    displayedViewType: viewType,
    editable: !isReadOnlyEffective,
    viewOptions: describeViewOptions(mainViewOptions(true)),
    footnotesPaneViewOptions: describeViewOptions(footnotesPaneViewOptions(true)),
    allowInvisibleCharactersPassedThrough:
      passesAllowInvisibleCharactersThrough(mainViewOptions) &&
      passesAllowInvisibleCharactersThrough(footnotesPaneViewOptions),
    noteEditingSurface: resolveNoteEditingSurface({
      usesPaneModel: usesPaneNoteModel({ viewType, isPowerMode, isInterfaceModeLoading }),
      isReadOnly: isReadOnlyEffective,
    }),
    viewToggleGoesTo: getNextViewTypeInCycle(viewType, isPowerMode),
  };
}

const STANDARD_VIEW_OPTIONS = {
  preset: 'standard',
  markerMode: 'editable',
  hasSpacing: true,
  isFormattedFont: true,
  noteMode: 'collapsed',
};
const PREVIEW_VIEW_OPTIONS = {
  preset: 'default',
  markerMode: 'hidden',
  hasSpacing: true,
  isFormattedFont: true,
  noteMode: 'collapsed',
};
const SIMPLE_VIEW_OPTIONS = {
  preset: 'paragraph structure',
  markerMode: 'hidden',
  hasSpacing: true,
  isFormattedFont: true,
  noteMode: 'collapsed',
};

/** Power's Standard view: editable, with notes edited in the footnotes pane. */
const POWER_STANDARD_VIEW = {
  displayedViewType: 'standard',
  editable: true,
  viewOptions: STANDARD_VIEW_OPTIONS,
  footnotesPaneViewOptions: STANDARD_VIEW_OPTIONS,
  allowInvisibleCharactersPassedThrough: true,
  noteEditingSurface: 'pane',
  viewToggleGoesTo: 'formatted',
};
/**
 * Simple mode's one view: editable, hiding markers, while its footnotes pane (and the pane's row
 * editor) shows them as Standard view does.
 */
const SIMPLE_VIEW = {
  displayedViewType: 'formatted',
  editable: true,
  viewOptions: SIMPLE_VIEW_OPTIONS,
  footnotesPaneViewOptions: STANDARD_VIEW_OPTIONS,
  allowInvisibleCharactersPassedThrough: true,
  noteEditingSurface: 'pane',
  viewToggleGoesTo: undefined,
};

/*
 * The editor views the app offers, per interface mode and saved view type. No row edits notes in
 * the popover: the footnote popover is unreachable, and every note edit goes through the footnotes
 * pane's row editor.
 *
 * If you change which editor views the app offers, also update scripture-editors
 * `packages/platform/src/editor/editorViews.test-helpers.tsx` (EDITOR_VIEWS and its app-surface
 * labels) and the e2e view cases in `e2e-tests/fixtures/no-unasked-edits.body.ts` so the
 * data-fidelity suites keep covering every reachable view.
 */
const EXPECTED_REACHABLE_VIEWS = {
  power: {
    'never saved': POWER_STANDARD_VIEW,
    standard: POWER_STANDARD_VIEW,
    // Preview: read-only, so no note can be edited. Its footnotes pane follows the main editor.
    formatted: {
      displayedViewType: 'formatted',
      editable: false,
      viewOptions: PREVIEW_VIEW_OPTIONS,
      footnotesPaneViewOptions: PREVIEW_VIEW_OPTIONS,
      allowInvisibleCharactersPassedThrough: true,
      noteEditingSurface: 'none',
      viewToggleGoesTo: 'standard',
    },
    'markers (legacy saved value)': POWER_STANDARD_VIEW,
  },
  simple: {
    'never saved': SIMPLE_VIEW,
    standard: SIMPLE_VIEW,
    formatted: SIMPLE_VIEW,
    'markers (legacy saved value)': SIMPLE_VIEW,
  },
};

const DRIFT_MESSAGE =
  'The editor views the app offers changed. If you change which editor views the app offers, ' +
  'also update scripture-editors `packages/platform/src/editor/editorViews.test-helpers.tsx` ' +
  '(EDITOR_VIEWS and its app-surface labels) and the e2e view cases in ' +
  '`e2e-tests/fixtures/no-unasked-edits.body.ts` so the data-fidelity suites keep covering every ' +
  'reachable view.';

describe('reachable editor views', () => {
  it('offers the pinned editor views in each interface mode', () => {
    const actual = Object.fromEntries(
      Object.entries(INTERFACE_MODES).map(([mode, isPowerMode]) => [
        mode,
        Object.fromEntries(
          Object.entries(SAVED_VIEW_TYPES).map(([label, persistedViewType]) => [
            label,
            describeReachableView(persistedViewType, isPowerMode),
          ]),
        ),
      ]),
    );

    // `vitest/valid-expect` refuses `expect(value, message)`, so the message goes onto the failure
    // itself. Prepending keeps the error's actual and expected values, so the run still prints the
    // diff.
    try {
      expect(actual).toEqual(EXPECTED_REACHABLE_VIEWS);
    } catch (error) {
      if (error instanceof Error) error.message = `${DRIFT_MESSAGE}\n\n${error.message}`;
      throw error;
    }
  });
});

import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Button } from 'platform-bible-react';
import { useEffect, useState, type ReactElement } from 'react';
import {
  KEYBOARD_SELECTION_SURFACE_TYPES,
  KeyboardSelection,
  KeyboardSelectionProps,
  KeyboardSelectionSelections,
} from './keyboard-selection.component';
import {
  MISSING_PERSISTED_KEYBOARD_ID,
  NOTE_TYPE_PROJECT_INTERFACES,
  RESOURCE_PROJECT_INTERFACES,
  RTL_AVAILABLE_KEYBOARDS,
  STANDARD_AVAILABLE_KEYBOARDS,
  STANDARD_PROJECT_INTERFACES,
} from './data/keyboard-selection.story-data';

const meta: Meta<typeof KeyboardSelection> = {
  title: 'Bundled Extensions/platform-scripture/KeyboardSelection',
  component: KeyboardSelection,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof KeyboardSelection>;

type LogEntry = {
  /** Unique sequence id, monotonically increasing per harness instance. Stable key for React. */
  id: number;
  ts: string;
  kind: 'ok' | 'cancel';
  selections?: KeyboardSelectionSelections;
};

function describeSelections(selections: KeyboardSelectionSelections): string {
  return KEYBOARD_SELECTION_SURFACE_TYPES.filter((surfaceType) => surfaceType in selections)
    .map((surfaceType) => `${surfaceType}: ${selections[surfaceType] ?? '(sentinel)'}`)
    .join(', ');
}

/**
 * Shared stateful render harness. Owns a running result log so the reviewer can exercise the full
 * flow (change selections → OK / Cancel / Enter / Escape) and see every callback fire with its
 * per-surface payload. "Reopen dialog" remounts the component, simulating a fresh dialog session
 * (initial selection + suggestion logic re-run). When `simulateLoadMs` is set the harness withholds
 * the keyboard list for that long, exercising the async-enumeration loading state the spec requires
 * (FN-013).
 */
function KeyboardSelectionHarness({
  staticArgs = {},
  simulateLoadMs,
  forceLoading = false,
}: {
  staticArgs?: Partial<Omit<KeyboardSelectionProps, 'onOk' | 'onCancel' | 'isLoadingKeyboards'>>;
  simulateLoadMs?: number;
  forceLoading?: boolean;
}): ReactElement {
  const [sessionId, setSessionId] = useState(0);
  const [isSimulatedLoading, setIsSimulatedLoading] = useState(simulateLoadMs !== undefined);
  const [log, setLog] = useState<LogEntry[]>([]);
  const [nextId, setNextId] = useState(0);

  useEffect(() => {
    if (simulateLoadMs === undefined) return undefined;
    setIsSimulatedLoading(true);
    const timeoutId = setTimeout(() => setIsSimulatedLoading(false), simulateLoadMs);
    return () => clearTimeout(timeoutId);
  }, [simulateLoadMs, sessionId]);

  const isLoading = forceLoading || (simulateLoadMs !== undefined && isSimulatedLoading);

  const appendLogEntry = (entry: Omit<LogEntry, 'id' | 'ts'>) => {
    setNextId((n) => n + 1);
    setLog((previous) => [
      { id: nextId, ts: new Date().toLocaleTimeString(), ...entry },
      ...previous,
    ]);
  };

  const handleOk = (selections: KeyboardSelectionSelections) => {
    appendLogEntry({ kind: 'ok', selections });
  };

  const handleCancel = () => {
    appendLogEntry({ kind: 'cancel' });
  };

  return (
    <div className="tw:flex tw:flex-col tw:gap-4 tw:p-4">
      <div className="tw:flex tw:items-center tw:gap-2">
        <Button onClick={() => setSessionId((n) => n + 1)}>Reopen dialog</Button>
        <Button variant="outline" onClick={() => setLog([])} disabled={log.length === 0}>
          Clear log
        </Button>
        <span className="tw:text-sm tw:text-muted-foreground">
          The real dialog closes after OK / Cancel; &ldquo;Reopen dialog&rdquo; simulates a fresh
          session (initial selection + suggestion logic re-run).
        </span>
      </div>

      <div className="tw:max-w-xl tw:rounded tw:border tw:border-border">
        <KeyboardSelection
          key={sessionId}
          {...staticArgs}
          availableKeyboards={isLoading ? [] : staticArgs.availableKeyboards}
          isLoadingKeyboards={isLoading}
          onOk={handleOk}
          onCancel={handleCancel}
        />
      </div>

      <div className="tw:rounded tw:border tw:border-border tw:p-3">
        <div className="tw:mb-2 tw:text-sm tw:font-semibold">Result log</div>
        {log.length === 0 ? (
          <div className="tw:text-sm tw:text-muted-foreground">
            (no events yet — change a selection and click OK / press Enter, or Cancel / Escape)
          </div>
        ) : (
          <ul className="tw:space-y-1 tw:font-mono tw:text-sm">
            {log.map((entry) => (
              <li key={entry.id}>
                [{entry.ts}]{' '}
                {entry.kind === 'ok' && entry.selections
                  ? `onOk({ ${describeSelections(entry.selections)} })`
                  : `onCancel()`}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/**
 * Standard project shape (gm-001): both dropdowns visible and enabled, "Keyboard for text:" /
 * "Keyboard for notes:" labels, description interpolating the project short-name. The keyboard list
 * arrives after a simulated 600 ms enumeration (FN-013) — watch the loading state resolve, then the
 * persisted vernacular keyboard (gm-007: `en-US-qwerty`) is pre-selected while the notes dropdown
 * defaults to the sentinel. Exercise the full flow: pick keyboards, press OK (or Enter) and inspect
 * the per-surface payload in the result log; Cancel (or Escape) logs a cancel with no payload.
 */
export const Default: Story = {
  render: () => (
    <KeyboardSelectionHarness
      simulateLoadMs={600}
      staticArgs={{
        projectShortName: 'ABC',
        projectInterfaces: STANDARD_PROJECT_INTERFACES,
        configuredKeyboardIds: { vernacular: 'en-US-qwerty' },
        availableKeyboards: STANDARD_AVAILABLE_KEYBOARDS,
      }}
    />
  ),
};

/**
 * Resource shape (gm-002, `hasScripture && !hasComments`): only the text dropdown renders, its
 * label simplifies to "Keyboard:", and the notes label + dropdown are omitted from the DOM entirely
 * (not just hidden). OK emits a vernacular-only payload.
 */
export const Resource: Story = {
  render: () => (
    <KeyboardSelectionHarness
      staticArgs={{
        projectShortName: 'ESV',
        projectInterfaces: RESOURCE_PROJECT_INTERFACES,
        configuredKeyboardIds: { vernacular: 'en-US-qwerty' },
        availableKeyboards: STANDARD_AVAILABLE_KEYBOARDS,
      }}
    />
  ),
};

/**
 * Note-type shape (gm-003, `!hasScripture && hasComments` — dormant in PT10 today, verified via
 * this fixture): the text dropdown renders but is disabled with an explanatory description
 * (`aria-describedby`), the notes dropdown is enabled and editable, and initial focus lands on the
 * notes dropdown (first ENABLED content control — FN-009).
 */
export const NoteType: Story = {
  render: () => (
    <KeyboardSelectionHarness
      staticArgs={{
        projectShortName: 'ABC-Notes',
        projectInterfaces: NOTE_TYPE_PROJECT_INTERFACES,
        configuredKeyboardIds: { comments: 'he-IL' },
        availableKeyboards: STANDARD_AVAILABLE_KEYBOARDS,
      }}
    />
  ),
};

/**
 * Loading state (FN-013): spinners visible, both dropdowns disabled with `aria-busy="true"`, OK
 * disabled, Cancel still enabled (the user can abandon a slow open), and a polite live region
 * announcing "Loading keyboards…".
 */
export const Loading: Story = {
  render: () => (
    <KeyboardSelectionHarness
      forceLoading
      staticArgs={{
        projectShortName: 'ABC',
        projectInterfaces: STANDARD_PROJECT_INTERFACES,
        availableKeyboards: STANDARD_AVAILABLE_KEYBOARDS,
      }}
    />
  ),
};

/**
 * Empty state (gm-012): no OS keyboards installed. The dropdowns show only the sentinel, the
 * empty-state hint is visible and associated with the dropdowns via `aria-describedby`, and OK
 * stays ENABLED — the user may legitimately accept "no keyboard switching".
 */
export const EmptyState: Story = {
  render: () => (
    <KeyboardSelectionHarness
      staticArgs={{
        projectShortName: 'ABC',
        projectInterfaces: STANDARD_PROJECT_INTERFACES,
        availableKeyboards: [],
      }}
    />
  ),
};

/**
 * RTL keyboard names (gm-005 / FN-012): the list mixes Windows-format Latin strings with
 * native-script Arabic and Hebrew names. Each item isolates its name with `<bdi>` so RTL names
 * render right-to-left inside the item even in an LTR UI, and the collapsed display renders the
 * pre-selected Arabic keyboard with correct bidi. Use the Storybook RTL toolbar
 * (storybook-addon-rtl) to flip the whole UI direction and verify the mirrored layout.
 */
export const Rtl: Story = {
  render: () => (
    <KeyboardSelectionHarness
      staticArgs={{
        projectShortName: 'نشيد',
        projectInterfaces: STANDARD_PROJECT_INTERFACES,
        configuredKeyboardIds: { vernacular: 'ar-SA-native' },
        availableKeyboards: RTL_AVAILABLE_KEYBOARDS,
      }}
    />
  ),
};

/**
 * Persisted keyboard no longer installed (gm-008): the project had `tha-Thai` persisted but it was
 * uninstalled, so the selection falls back to the sentinel. The dialog itself surfaces NO
 * missing-keyboard notification — that is the backend focus router's job, fired only on focus into
 * the project surface.
 */
export const MissingPersisted: Story = {
  render: () => (
    <KeyboardSelectionHarness
      staticArgs={{
        projectShortName: 'ABC',
        projectInterfaces: STANDARD_PROJECT_INTERFACES,
        configuredKeyboardIds: { vernacular: MISSING_PERSISTED_KEYBOARD_ID },
        availableKeyboards: STANDARD_AVAILABLE_KEYBOARDS,
      }}
    />
  ),
};

/**
 * No persisted association and no last-used history (gm-006 / gm-007 / gm-011): both dropdowns
 * default to the sentinel — the styled "Do not switch keyboard" placeholder at index 0, italic and
 * muted so it does not look like a real selection, with a separate screen-reader name ("Use system
 * default").
 */
export const NoPersisted: Story = {
  render: () => (
    <KeyboardSelectionHarness
      staticArgs={{
        projectShortName: 'ABC',
        projectInterfaces: STANDARD_PROJECT_INTERFACES,
        availableKeyboards: STANDARD_AVAILABLE_KEYBOARDS,
      }}
    />
  ),
};

/**
 * Last-used group + suggestion pre-select (alignment-decisions #26/#28): the vernacular surface has
 * no configured keyboard but Hebrew was recently used in this project, so the dropdown pre-selects
 * it as a suggestion with a "Suggested — not yet saved" badge, and the open list shows a "Last used
 * in ABC" group above "All keyboards" (deduplicated). Changing the selection clears the badge — the
 * value becomes a real (still unsaved) choice. OK persists, Cancel discards; "Reopen dialog"
 * restores the suggestion.
 */
export const LastUsedSuggestion: Story = {
  render: () => (
    <KeyboardSelectionHarness
      staticArgs={{
        projectShortName: 'ABC',
        projectInterfaces: STANDARD_PROJECT_INTERFACES,
        lastUsedKeyboardIds: { vernacular: ['he-IL'] },
        availableKeyboards: STANDARD_AVAILABLE_KEYBOARDS,
      }}
    />
  ),
};

/**
 * Suggestion suppression (alignment-decision #26 UX rule: "When keyboard is configured the last use
 * information will not change the selection"): the vernacular surface has BOTH a configured
 * keyboard (English) and a different last-used entry (Hebrew). The configured keyboard wins, no
 * suggestion badge renders, and Hebrew still appears in the "Last used in ABC" group for quick
 * manual re-selection.
 */
export const ConfiguredSuppressesSuggestion: Story = {
  render: () => (
    <KeyboardSelectionHarness
      staticArgs={{
        projectShortName: 'ABC',
        projectInterfaces: STANDARD_PROJECT_INTERFACES,
        configuredKeyboardIds: { vernacular: 'en-US-qwerty' },
        lastUsedKeyboardIds: { vernacular: ['he-IL'] },
        availableKeyboards: STANDARD_AVAILABLE_KEYBOARDS,
      }}
    />
  ),
};

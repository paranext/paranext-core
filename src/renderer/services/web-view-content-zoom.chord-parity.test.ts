import { afterEach, describe, expect, it, vi } from 'vitest';
import { CONTENT_ZOOM_COMMANDS } from '@shared/models/content-zoom.model';

vi.mock('@shared/services/logger.service', () => ({
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn(), debug: vi.fn() },
}));

// One of the two modules under test, imported after the mock above is established.
// eslint-disable-next-line import/first
import { registerContentZoomChromeKeys } from './web-view-content-zoom.chrome-keys';
// The other module under test; it does not itself touch the logger, but stays below the mock so
// both imports read as one group.
// eslint-disable-next-line import/first
import { install } from './web-view-content-zoom.bootstrap-script.test-utils';

type ChordAction = 'in' | 'out' | 'reset';

type ModifierCase = {
  label: string;
  ctrlKey?: boolean;
  metaKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
};

/**
 * Every modifier combination the chord rule branches on: no modifier (rejected), Ctrl and Meta (the
 * two accepted chord modifiers), each with Shift added, and each with Alt added (which rejects the
 * chord regardless of Ctrl/Meta or Shift).
 */
const MODIFIER_CASES: ModifierCase[] = [
  { label: 'none' },
  { label: 'ctrl', ctrlKey: true },
  { label: 'meta', metaKey: true },
  { label: 'ctrl+shift', ctrlKey: true, shiftKey: true },
  { label: 'ctrl+alt', ctrlKey: true, altKey: true },
  { label: 'meta+shift', metaKey: true, shiftKey: true },
  { label: 'ctrl+alt+shift', ctrlKey: true, altKey: true, shiftKey: true },
];

type KeyCase = {
  label: string;
  init: KeyboardEventInit;
  /** The action this key maps to before the modifier rule (Ctrl/Meta, Alt, Shift) is applied. */
  baseAction: ChordAction | undefined;
};

const KEY_CASES: KeyCase[] = [
  { label: '=', init: { key: '=' }, baseAction: 'in' },
  { label: '+', init: { key: '+' }, baseAction: 'in' },
  { label: 'NumpadAdd (code)', init: { code: 'NumpadAdd' }, baseAction: 'in' },
  { label: '-', init: { key: '-' }, baseAction: 'out' },
  { label: 'NumpadSubtract (code)', init: { code: 'NumpadSubtract' }, baseAction: 'out' },
  { label: '0', init: { key: '0' }, baseAction: 'reset' },
  { label: 'Numpad0 (code)', init: { code: 'Numpad0' }, baseAction: 'reset' },
  { label: 'k (unrelated)', init: { key: 'k' }, baseAction: undefined },
];

/**
 * The chord rule stated independently of both `isChordModifier`/`isAllowedShiftState`/`actionFor`
 * (chrome-keys.ts) and the bootstrap script's own `hasModifier` + keydown handler: Ctrl or ⌘ is
 * required and Alt rejects the chord outright; Shift is accepted only when the key's own action is
 * zoom-in (`Ctrl+Shift+=` is how many keyboards type `Ctrl++`).
 */
function expectedAction(keyCase: KeyCase, modifiers: ModifierCase): ChordAction | undefined {
  const hasChordModifier = (modifiers.ctrlKey || modifiers.metaKey) && !modifiers.altKey;
  if (!hasChordModifier) return undefined;
  if (modifiers.shiftKey && keyCase.baseAction !== 'in') return undefined;
  return keyCase.baseAction;
}

const TABLE = KEY_CASES.flatMap((keyCase) =>
  MODIFIER_CASES.map((modifiers) => ({
    keyCase,
    modifiers,
    expected: expectedAction(keyCase, modifiers),
  })),
);

function eventInit(keyCase: KeyCase, modifiers: ModifierCase): KeyboardEventInit {
  return {
    bubbles: true,
    cancelable: true,
    ...keyCase.init,
    ctrlKey: modifiers.ctrlKey ?? false,
    metaKey: modifiers.metaKey ?? false,
    shiftKey: modifiers.shiftKey ?? false,
    altKey: modifiers.altKey ?? false,
  };
}

/** Reads the action `registerContentZoomChromeKeys` took from which injected dep it called. */
function chromeKeysAction(
  adjustContentZoom: ReturnType<typeof vi.fn>,
  resetContentZoom: ReturnType<typeof vi.fn>,
): ChordAction | undefined {
  if (resetContentZoom.mock.calls.length > 0) return 'reset';
  const [call] = adjustContentZoom.mock.calls;
  if (!call) return undefined;
  const [, deltaSteps] = call;
  return deltaSteps === 1 ? 'in' : 'out';
}

/**
 * Reads the action the bootstrap script took from the command it sent through
 * `papi.commands.sendCommand` — `install` below leaves both bound helpers unset so the bootstrap
 * always falls back to the command, the same wire-level name a real web view without an in-process
 * shard would send.
 */
function bootstrapAction(sendCommand: ReturnType<typeof vi.fn>): ChordAction | undefined {
  const [call] = sendCommand.mock.calls;
  if (!call) return undefined;
  const [command] = call;
  if (command === CONTENT_ZOOM_COMMANDS.in) return 'in';
  if (command === CONTENT_ZOOM_COMMANDS.out) return 'out';
  if (command === CONTENT_ZOOM_COMMANDS.reset) return 'reset';
  throw new Error(`unexpected content-zoom command: ${command}`);
}

const SINGLE_AREA =
  '<div data-platform-content-zoom-root id="main"><p id="target" tabindex="0">t</p></div>';

describe('content-zoom chord rule parity: window-chrome keys vs. in-view bootstrap', () => {
  afterEach(() => {
    // Unwinds the bootstrap instance a row installed, matching the teardown
    // web-view-content-zoom.bootstrap-script.test.ts uses for the same reason: without it the
    // mutation observer it started outlives the test and the next row's `install` leaks a second
    // window keydown listener alongside it.
    // eslint-disable-next-line no-underscore-dangle
    window.__platformContentZoom?.destroy();
  });

  it.each(TABLE)(
    'key=$keyCase.label modifiers=$modifiers.label -> $expected',
    ({ keyCase, modifiers, expected }) => {
      const adjustContentZoom = vi.fn().mockResolvedValue(undefined);
      const resetContentZoom = vi.fn().mockResolvedValue(undefined);
      const unsubscribe = registerContentZoomChromeKeys({
        adjustContentZoom,
        resetContentZoom,
        isModalOverlayOpen: () => false,
      });
      try {
        document.body.dispatchEvent(new KeyboardEvent('keydown', eventInit(keyCase, modifiers)));
        expect(chromeKeysAction(adjustContentZoom, resetContentZoom)).toBe(expected);
      } finally {
        unsubscribe();
      }

      const { papi } = install('wv-chord-parity', SINGLE_AREA, {
        adjustContentZoomById: undefined,
        resetContentZoomById: undefined,
      });
      window.dispatchEvent(new KeyboardEvent('keydown', eventInit(keyCase, modifiers)));
      expect(bootstrapAction(papi.commands.sendCommand)).toBe(expected);
    },
  );
});

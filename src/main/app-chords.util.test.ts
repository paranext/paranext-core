import { describe, expect, test, vi } from 'vitest';
import { matchAppChord, runAppChord } from '@main/app-chords.util';
import type { FocusSubject } from '@shared/services/window.service-model';

const NO_MODIFIERS = { control: false, alt: false, meta: false, shift: false, isAutoRepeat: false };

describe('matchAppChord on Windows/Linux', () => {
  test.each([
    [{ key: 'o', ...NO_MODIFIERS, control: true }, 'openHome'],
    [{ key: 'O', ...NO_MODIFIERS, control: true }, 'openHome'],
    [{ key: 'j', ...NO_MODIFIERS, control: true }, 'openProjectSettings'],
    [{ key: 'J', ...NO_MODIFIERS, control: true }, 'openProjectSettings'],
  ])('maps %o to %s', (input, expected) => {
    expect(matchAppChord(input, false, 'power')).toBe(expected);
  });

  test.each([
    [{ key: 'o', ...NO_MODIFIERS }],
    [{ key: 'j', ...NO_MODIFIERS }],
    [{ key: 'o', ...NO_MODIFIERS, meta: true }],
    [{ key: 'o', ...NO_MODIFIERS, control: true, shift: true }],
    // AltGr reports as Ctrl+Alt on Windows and Linux
    [{ key: 'o', ...NO_MODIFIERS, control: true, alt: true }],
    [{ key: 'j', ...NO_MODIFIERS, control: true, meta: true }],
    [{ key: 'k', ...NO_MODIFIERS, control: true }],
  ])('returns undefined for %o', (input) => {
    expect(matchAppChord(input, false, 'power')).toBeUndefined();
  });

  test.each(['o', 'j'])('ignores a held Ctrl+%s (auto-repeat)', (key) => {
    expect(
      matchAppChord({ key, ...NO_MODIFIERS, control: true, isAutoRepeat: true }, false, 'power'),
    ).toBeUndefined();
  });
});

describe('matchAppChord on macOS', () => {
  test.each([
    [{ key: 'o', ...NO_MODIFIERS, meta: true }, 'openHome'],
    [{ key: 'j', ...NO_MODIFIERS, meta: true }, 'openProjectSettings'],
  ])('maps %o to %s', (input, expected) => {
    expect(matchAppChord(input, true, 'power')).toBe(expected);
  });

  test.each([
    [{ key: 'o', ...NO_MODIFIERS, control: true }],
    [{ key: 'j', ...NO_MODIFIERS, control: true }],
    [{ key: 'o', ...NO_MODIFIERS, meta: true, control: true }],
    [{ key: 'j', ...NO_MODIFIERS, meta: true, alt: true }],
    [{ key: 'o', ...NO_MODIFIERS, meta: true, isAutoRepeat: true }],
  ])('returns undefined for %o', (input) => {
    expect(matchAppChord(input, true, 'power')).toBeUndefined();
  });
});

describe('matchAppChord by interface mode', () => {
  const ctrlO = { key: 'o', ...NO_MODIFIERS, control: true };
  const ctrlJ = { key: 'j', ...NO_MODIFIERS, control: true };

  test('leaves Ctrl+O unclaimed in Simple, where Open is hidden', () => {
    expect(matchAppChord(ctrlO, false, 'simple')).toBeUndefined();
    expect(matchAppChord({ ...ctrlO, control: false, meta: true }, true, 'simple')).toBeUndefined();
  });

  test('claims Ctrl+O in Power', () => {
    expect(matchAppChord(ctrlO, false, 'power')).toBe('openHome');
  });

  test('claims Ctrl+O while the mode is not yet known, like the extra-window refusal', () => {
    expect(matchAppChord(ctrlO, false, undefined)).toBe('openHome');
  });

  test.each(['simple', 'power', undefined] as const)('claims Ctrl+J in mode %s', (mode) => {
    expect(matchAppChord(ctrlJ, false, mode)).toBe('openProjectSettings');
  });
});

describe('runAppChord', () => {
  function makeEffects(focus: FocusSubject | undefined) {
    return {
      getFocus: vi.fn(async () => focus),
      sendCommand: vi.fn<(...args: unknown[]) => Promise<unknown>>(async () => undefined),
    };
  }

  test('Open sends the Home command without asking for focus', async () => {
    const effects = makeEffects(undefined);
    await runAppChord('openHome', effects);
    expect(effects.sendCommand).toHaveBeenCalledWith('platformGetResources.openHome');
    expect(effects.getFocus).not.toHaveBeenCalled();
  });

  test.each<[string, FocusSubject]>([
    ['the focused web view', { focusType: 'webView', id: 'web-view-1' }],
    [
      'the web view whose tab is focused',
      { focusType: 'tab', tabType: 'webView', id: 'web-view-1' },
    ],
  ])('Project settings opens for %s', async (_, focus) => {
    const effects = makeEffects(focus);
    await runAppChord('openProjectSettings', effects);
    expect(effects.sendCommand).toHaveBeenCalledTimes(1);
    expect(effects.sendCommand).toHaveBeenCalledWith(
      'platform.openProjectSettingsForWebView',
      'web-view-1',
    );
  });

  test.each<[string, FocusSubject | undefined]>([
    ['nothing is focused', undefined],
    ['focus is outside every tab', { focusType: 'other' }],
    ['the focused tab holds no web view', { focusType: 'tab', tabType: 'settings', id: 'tab-1' }],
  ])('Project settings does nothing when %s', async (_, focus) => {
    const effects = makeEffects(focus);
    await runAppChord('openProjectSettings', effects);
    expect(effects.getFocus).toHaveBeenCalledTimes(1);
    expect(effects.sendCommand).not.toHaveBeenCalled();
  });
});

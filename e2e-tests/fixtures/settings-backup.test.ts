/**
 * Unit tests for the crash-safe half of {@link preConfigureSettings}.
 *
 * These run under vitest (`npm test`), not Playwright: they exercise file handling only, need no
 * Electron, and cover logic that is easy to break silently. The behaviour they protect is invisible
 * in a normal run — it only shows up after a run has been killed, which is exactly when nobody is
 * watching.
 *
 * They run against a temp directory, never the developer's real `dev-appdata/data/settings.json`:
 * the helper resolves its path per call from `PT_E2E_SETTINGS_PATH`, so setting it here is enough
 * and no import ordering games are needed.
 */
import fs from 'fs';
import os from 'os';
import path from 'path';
import { afterAll, beforeEach, describe, expect, it } from 'vitest';
import { preConfigureSettings, restoreLeakedSettings } from './helpers';

const SETTINGS_DIR = fs.mkdtempSync(path.join(os.tmpdir(), 'pt-settings-backup-'));
const SETTINGS_PATH = path.join(SETTINGS_DIR, 'settings.json');
const BACKUP_PATH = `${SETTINGS_PATH}.e2e-backup`;
process.env.PT_E2E_SETTINGS_PATH = SETTINGS_PATH;

const DEVELOPER_SETTINGS = '{"platform.myRealSetting":"keepme"}';

/** Contents of the settings file, or undefined when there is no file. */
function readSettings(): string | undefined {
  return fs.existsSync(SETTINGS_PATH) ? fs.readFileSync(SETTINGS_PATH, 'utf-8') : undefined;
}

beforeEach(() => {
  fs.rmSync(SETTINGS_PATH, { force: true });
  fs.rmSync(BACKUP_PATH, { force: true });
});

afterAll(() => {
  fs.rmSync(SETTINGS_DIR, { recursive: true, force: true });
});

describe('preConfigureSettings crash recovery', () => {
  it('restores the developer original after nested pins, not the first pin', () => {
    fs.writeFileSync(SETTINGS_PATH, DEVELOPER_SETTINGS);

    // Two pins taken while the first is still active, then a "crash": neither restore is called.
    preConfigureSettings({ 'platform.interfaceMode': 'power' });
    preConfigureSettings({ 'platform.interfaceLanguage': ['fr'] });
    expect(readSettings()).toContain('power');

    const leakedKeys = restoreLeakedSettings();

    // The whole point: recovery must not treat the FIRST pin's values as the developer's own.
    expect(readSettings()).toBe(DEVELOPER_SETTINGS);
    expect(leakedKeys).toContain('platform.interfaceMode');
  });

  it('restores an empty settings file as empty rather than deleting it', () => {
    fs.writeFileSync(SETTINGS_PATH, '');

    preConfigureSettings({ 'platform.interfaceMode': 'power' });
    restoreLeakedSettings();

    // An empty file and an absent file are different states and must restore differently.
    expect(readSettings()).toBe('');
  });

  it('leaves an absent settings file absent', () => {
    preConfigureSettings({ 'platform.interfaceMode': 'power' });
    restoreLeakedSettings();

    expect(readSettings()).toBeUndefined();
  });

  it('reports the leaked setting keys, never the file contents', () => {
    fs.writeFileSync(SETTINGS_PATH, DEVELOPER_SETTINGS);
    preConfigureSettings({ 'platform.interfaceMode': 'power' });

    const leakedKeys = restoreLeakedSettings();

    // Keys only: the file also holds the developer's real settings, including registration details.
    expect(leakedKeys).toEqual(
      expect.arrayContaining(['platform.myRealSetting', 'platform.interfaceMode']),
    );
    expect(JSON.stringify(leakedKeys)).not.toContain('keepme');
  });

  it('is a no-op when no run was interrupted', () => {
    fs.writeFileSync(SETTINGS_PATH, DEVELOPER_SETTINGS);

    const restore = preConfigureSettings({ 'platform.interfaceMode': 'power' });
    restore();

    expect(readSettings()).toBe(DEVELOPER_SETTINGS);
    expect(fs.existsSync(BACKUP_PATH)).toBe(false);
    expect(restoreLeakedSettings()).toBeUndefined();
  });
});

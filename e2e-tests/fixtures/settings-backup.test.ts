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
import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  classifyBackupOwner,
  isPidAlive,
  preConfigureSettings,
  restoreLeakedSettings,
} from './helpers';

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

  it("reports the keys the run pinned, not the developer's own settings", () => {
    fs.writeFileSync(SETTINGS_PATH, DEVELOPER_SETTINGS);
    preConfigureSettings({ 'platform.interfaceMode': 'power' });

    const leakedKeys = restoreLeakedSettings();

    // What a killed run left behind is what it PINNED. The file also holds the developer's own
    // settings — registration details among them — and naming those as test residue is both wrong
    // and alarming for whoever reads the recovery message.
    expect(leakedKeys).toEqual(['platform.interfaceMode']);
    expect(leakedKeys).not.toContain('platform.myRealSetting');
    // Keys only, never values.
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

describe('backup ownership', () => {
  it('treats our own pid as alive, and as ours', () => {
    expect(isPidAlive(process.pid)).toBe(true);
    expect(classifyBackupOwner(process.pid)).toBe('ours');
  });

  it('treats a pid that cannot exist as orphaned', () => {
    // Above every platform's pid_max, so it can never name a live process.
    const impossiblePid = 2 ** 31 - 1;

    expect(isPidAlive(impossiblePid)).toBe(false);
    expect(classifyBackupOwner(impossiblePid)).toBe('orphaned');
  });

  it('treats EPERM as alive, because Windows and foreign-owned pids report it', () => {
    const kill = vi.spyOn(process, 'kill').mockImplementation(() => {
      const error: NodeJS.ErrnoException = new Error('operation not permitted');
      error.code = 'EPERM';
      throw error;
    });

    try {
      // Refusing the signal proves the process EXISTS. Reading that as dead is the direction that
      // destroys a live run's files.
      expect(isPidAlive(4242)).toBe(true);
      expect(classifyBackupOwner(4242)).toBe('live');
    } finally {
      kill.mockRestore();
    }
  });
});

describe('settings backup integrity', () => {
  it('treats a zero-byte backup as unusable and leaves the settings file alone', () => {
    fs.writeFileSync(SETTINGS_PATH, DEVELOPER_SETTINGS);
    // Exactly what an interrupt inside a truncating write leaves behind.
    fs.writeFileSync(BACKUP_PATH, '');

    expect(restoreLeakedSettings()).toBeUndefined();
    expect(readSettings()).toBe(DEVELOPER_SETTINGS);
    // Never deleted: a backup we cannot read is a human's decision, not ours to discard.
    expect(fs.existsSync(BACKUP_PATH)).toBe(true);
  });

  it('treats a truncated backup as unusable rather than as settings contents', () => {
    fs.writeFileSync(SETTINGS_PATH, DEVELOPER_SETTINGS);
    fs.writeFileSync(BACKUP_PATH, '{"existed":true,"conte');

    expect(restoreLeakedSettings()).toBeUndefined();
    expect(readSettings()).toBe(DEVELOPER_SETTINGS);
  });

  it('treats a backup with no recorded owner as unusable', () => {
    fs.writeFileSync(SETTINGS_PATH, DEVELOPER_SETTINGS);
    // Every other field is valid, so ONLY the missing owner can make this unusable.
    fs.writeFileSync(
      BACKUP_PATH,
      JSON.stringify({ createdAt: new Date().toISOString(), existed: false, pinnedKeys: [] }),
    );

    expect(restoreLeakedSettings()).toBeUndefined();
    expect(readSettings()).toBe(DEVELOPER_SETTINGS);
    expect(fs.existsSync(BACKUP_PATH)).toBe(true);
  });

  it('leaves a backup owned by a still-running process completely alone', () => {
    // The parent that spawned this test runner is alive and is not us.
    expect(classifyBackupOwner(process.ppid)).toBe('live');
    fs.writeFileSync(SETTINGS_PATH, DEVELOPER_SETTINGS);
    fs.writeFileSync(
      BACKUP_PATH,
      JSON.stringify({
        ownerPid: process.ppid,
        createdAt: new Date().toISOString(),
        existed: false,
        pinnedKeys: ['platform.interfaceMode'],
      }),
    );

    expect(restoreLeakedSettings()).toBeUndefined();
    expect(readSettings()).toBe(DEVELOPER_SETTINGS);
    expect(fs.existsSync(BACKUP_PATH)).toBe(true);
  });
});

describe('settings restore reconciles rather than assumes', () => {
  it('keeps settings written after a killed run, undoing only the keys the pin wrote', () => {
    // A fresh checkout: no settings file at all when the run pins. Then the run is killed, so its
    // own restore never happens.
    preConfigureSettings({ 'platform.interfaceMode': 'power' });

    // Days pass. The developer uses the app and it writes their real settings.
    fs.writeFileSync(
      SETTINGS_PATH,
      JSON.stringify({
        'platform.interfaceLanguage': ['fr'],
        'paratext.registrationCode': 'REAL-USER-DATA',
        'platform.interfaceMode': 'power',
      }),
    );

    restoreLeakedSettings();

    const after = JSON.parse(readSettings() ?? '{}');
    expect(after['paratext.registrationCode']).toBe('REAL-USER-DATA');
    expect(after['platform.interfaceLanguage']).toEqual(['fr']);
    // The pin, and only the pin, is undone.
    expect(after['platform.interfaceMode']).toBeUndefined();
  });

  it('puts back the developer value for a pinned key rather than dropping it', () => {
    fs.writeFileSync(SETTINGS_PATH, JSON.stringify({ 'platform.interfaceMode': 'simple' }));
    preConfigureSettings({ 'platform.interfaceMode': 'power' });

    restoreLeakedSettings();

    expect(JSON.parse(readSettings() ?? '{}')['platform.interfaceMode']).toBe('simple');
  });

  it('removes a settings file it created, once the pinned keys are gone', () => {
    preConfigureSettings({ 'platform.interfaceMode': 'power' });

    restoreLeakedSettings();

    expect(readSettings()).toBeUndefined();
  });
});

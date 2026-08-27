/**
 * Unit tests for {@link pinAppGlobalState} / {@link restoreAppGlobalState}.
 *
 * These run under vitest (`npm test`), not Playwright: they exercise file handling only and need no
 * Electron. Like the settings-backup tests, they cover behaviour that is invisible in a passing run
 * — it only shows up after a run has been killed, which is exactly when nobody is watching.
 *
 * They run against a temp directory, never the developer's real `dev-appdata/local-storage/main`:
 * the helper resolves the path per call from `PT_E2E_MAIN_LOCAL_STORAGE_DIR`.
 */
import fs from 'fs';
import os from 'os';
import path from 'path';
import { afterAll, beforeEach, describe, expect, it } from 'vitest';
import { pinAppGlobalState, restoreAppGlobalState } from './helpers';

const ROOT = fs.mkdtempSync(path.join(os.tmpdir(), 'pt-app-global-'));
const LIVE_DIR = path.join(ROOT, 'main');
const BACKUP_DIR = `${LIVE_DIR}.e2e-backup`;
process.env.PT_E2E_MAIN_LOCAL_STORAGE_DIR = LIVE_DIR;

const SCR_REFS_KEY = 'scroll-group.service-host.scrRefs';
const THEME_KEY = 'theme.service-host.currentTheme';
const DEVELOPER_REF = '{"0":{"book":"PSA","chapterNum":23,"verseNum":1}}';

/** Contents of one stored key, or undefined when the key is not stored. */
function readKey(key: string): string | undefined {
  const file = path.join(LIVE_DIR, key);
  return fs.existsSync(file) ? fs.readFileSync(file, 'utf-8') : undefined;
}

function writeKey(key: string, value: string): void {
  fs.mkdirSync(LIVE_DIR, { recursive: true });
  fs.writeFileSync(path.join(LIVE_DIR, key), value);
}

beforeEach(() => {
  fs.rmSync(LIVE_DIR, { recursive: true, force: true });
  fs.rmSync(BACKUP_DIR, { recursive: true, force: true });
});

afterAll(() => {
  fs.rmSync(ROOT, { recursive: true, force: true });
});

describe('app-global state pin', () => {
  it('empties the store so a launch cannot inherit the previous reference', () => {
    writeKey(SCR_REFS_KEY, DEVELOPER_REF);

    pinAppGlobalState();

    // The point of the pin: the app must start from its own defaults, not from what was here.
    expect(readKey(SCR_REFS_KEY)).toBeUndefined();
  });

  it('restores the developer values, discarding what the run wrote', () => {
    writeKey(SCR_REFS_KEY, DEVELOPER_REF);
    const restore = pinAppGlobalState();

    // Stand in for the app: a test navigates, and the running app persists where it ended up.
    writeKey(SCR_REFS_KEY, '{"0":{"book":"REV","chapterNum":1,"verseNum":1}}');
    restore();

    expect(readKey(SCR_REFS_KEY)).toBe(DEVELOPER_REF);
    expect(fs.existsSync(BACKUP_DIR)).toBe(false);
  });

  it('keeps the developer values through a relaunch chain, not the first launch output', () => {
    writeKey(SCR_REFS_KEY, DEVELOPER_REF);

    // Launch A pins; its app writes; launch B pins again while A's pin is still standing.
    pinAppGlobalState();
    writeKey(SCR_REFS_KEY, '{"0":{"book":"MRK","chapterNum":4,"verseNum":1}}');
    pinAppGlobalState();

    restoreAppGlobalState();

    // The second pin must not have captured launch A's output as if it were the developer's.
    expect(readKey(SCR_REFS_KEY)).toBe(DEVELOPER_REF);
  });

  it('removes run-written keys that did not exist before the pin', () => {
    writeKey(SCR_REFS_KEY, DEVELOPER_REF);
    pinAppGlobalState();

    // The app persisted a key the developer never had — restoring must not leave it behind.
    writeKey(THEME_KEY, '"dark"');
    restoreAppGlobalState();

    expect(readKey(THEME_KEY)).toBeUndefined();
    expect(readKey(SCR_REFS_KEY)).toBe(DEVELOPER_REF);
  });

  it('reports the recovered key names, and is a no-op when nothing was pinned', () => {
    writeKey(SCR_REFS_KEY, DEVELOPER_REF);
    pinAppGlobalState();

    expect(restoreAppGlobalState()).toEqual([SCR_REFS_KEY]);
    // Second call has no backup to work from and must not report a recovery.
    expect(restoreAppGlobalState()).toBeUndefined();
  });

  it('leaves an absent store absent rather than creating an empty one', () => {
    const restore = pinAppGlobalState();
    restore();

    expect(readKey(SCR_REFS_KEY)).toBeUndefined();
  });
});

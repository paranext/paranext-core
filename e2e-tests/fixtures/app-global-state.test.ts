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

/**
 * Re-point the standing backup at a process that cannot be running, which is the state a killed run
 * leaves behind. Recovery of someone else's dead pin is a different path from a normal teardown,
 * and only this makes a single-process test able to reach it.
 */
function orphanTheBackup(): void {
  const manifestPath = `${LIVE_DIR}.e2e-backup.json`;
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
  // Above every platform's pid_max, so it can never name a live process.
  fs.writeFileSync(manifestPath, JSON.stringify({ ...manifest, ownerPid: 2 ** 31 - 1 }));
}

/**
 * Re-point the standing backup at a process that IS running and is not us, which is what a second
 * run holding these files looks like. `process.ppid` started this runner, so it is alive by
 * definition and is a different pid.
 */
function giveTheBackupALiveOwner(): void {
  const manifestPath = `${LIVE_DIR}.e2e-backup.json`;
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
  fs.writeFileSync(manifestPath, JSON.stringify({ ...manifest, ownerPid: process.ppid }));
}

function writeKey(key: string, value: string): void {
  fs.mkdirSync(LIVE_DIR, { recursive: true });
  fs.writeFileSync(path.join(LIVE_DIR, key), value);
}

beforeEach(() => {
  fs.rmSync(LIVE_DIR, { recursive: true, force: true });
  fs.rmSync(BACKUP_DIR, { recursive: true, force: true });
  fs.rmSync(`${LIVE_DIR}.e2e-backup.json`, { force: true });
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

describe('app-global state recovery is not destructive', () => {
  it('does not wipe the developer state when an empty backup is left behind', () => {
    // A fresh checkout has no store at all, so the pin backs up nothing — and then the run is
    // killed, leaving that empty backup standing.
    pinAppGlobalState();
    orphanTheBackup();

    // Weeks of the developer's own state accumulate afterwards.
    writeKey(THEME_KEY, '"dark"');
    writeKey(SCR_REFS_KEY, DEVELOPER_REF);

    const recovered = restoreAppGlobalState();

    expect(readKey(THEME_KEY)).toBe('"dark"');
    expect(readKey(SCR_REFS_KEY)).toBe(DEVELOPER_REF);
    // An empty pin is a real recovery with nothing in it, not "there was no backup" — global setup
    // has to be able to say so rather than printing nothing.
    expect(recovered).toEqual([]);
  });

  it('reports an empty pin differently from no backup at all', () => {
    pinAppGlobalState();

    expect(restoreAppGlobalState()).toEqual([]);
    expect(restoreAppGlobalState()).toBeUndefined();
  });

  it('ignores a subdirectory in the store instead of throwing part-way through the backup', () => {
    writeKey(SCR_REFS_KEY, DEVELOPER_REF);
    fs.mkdirSync(path.join(LIVE_DIR, 'some-subdir'), { recursive: true });

    expect(() => pinAppGlobalState()).not.toThrow();

    // The pin still did its job, and the backup is complete rather than half-copied.
    expect(readKey(SCR_REFS_KEY)).toBeUndefined();
    expect(restoreAppGlobalState()).toEqual([SCR_REFS_KEY]);
    expect(readKey(SCR_REFS_KEY)).toBe(DEVELOPER_REF);
  });

  it('does not restore from a backup the caller did not create', () => {
    writeKey(SCR_REFS_KEY, DEVELOPER_REF);
    pinAppGlobalState();
    const restoreB = pinAppGlobalState();
    writeKey(SCR_REFS_KEY, '{"0":{"book":"REV","chapterNum":1,"verseNum":1}}');

    // Launch B never wrote the backup, so its teardown must leave the standing pin alone —
    // otherwise the chain's next launch writes test values onto restored state with nothing left
    // to undo it.
    restoreB();

    expect(fs.existsSync(BACKUP_DIR)).toBe(true);
  });
});

describe('app-global recovery refuses a backup another run still owns', () => {
  it('restores nothing and deletes nothing while the owning process is alive', () => {
    writeKey(SCR_REFS_KEY, DEVELOPER_REF);
    pinAppGlobalState();
    giveTheBackupALiveOwner();

    // Stand in for the still-running owner's app writing as it goes.
    writeKey(SCR_REFS_KEY, '{"0":{"book":"REV","chapterNum":1,"verseNum":1}}');

    expect(restoreAppGlobalState()).toBeUndefined();

    // Everything is left exactly as the live run had it: no keys reverted, and the backup is still
    // there for its real owner to restore from.
    expect(readKey(SCR_REFS_KEY)).toBe('{"0":{"book":"REV","chapterNum":1,"verseNum":1}}');
    expect(fs.existsSync(BACKUP_DIR)).toBe(true);
    expect(fs.existsSync(`${LIVE_DIR}.e2e-backup.json`)).toBe(true);
  });
});

describe('app-global pin refuses to empty a store it cannot park', () => {
  it('leaves the developer state alone when a stale manifest outlives its backup directory', () => {
    // A restore copies the keys back, removes the backup directory, and THEN removes the manifest.
    // A run killed between those last two steps — or a manifest delete that fails — leaves the keys
    // correctly restored beside a manifest naming this process with nothing behind it. The next
    // restore must not read that as "this process pinned, so clear the store": there is nothing left
    // to put back, so clearing would simply delete the developer's keys.
    writeKey(SCR_REFS_KEY, DEVELOPER_REF);
    writeKey(THEME_KEY, '"dark"');
    pinAppGlobalState();
    const manifestAfterPin = fs.readFileSync(`${LIVE_DIR}.e2e-backup.json`, 'utf-8');
    restoreAppGlobalState();
    // Exactly the crash state: keys back in place, backup directory gone, manifest still standing.
    fs.writeFileSync(`${LIVE_DIR}.e2e-backup.json`, manifestAfterPin);

    restoreAppGlobalState();

    expect(readKey(SCR_REFS_KEY)).toBe(DEVELOPER_REF);
    expect(readKey(THEME_KEY)).toBe('"dark"');
  });

  it('leaves the developer state alone when a backup dir stands with no manifest', () => {
    // A run killed between creating the backup directory and writing its manifest leaves exactly
    // this: a directory that exists and says nothing. Every later pin sees it, parks nothing —
    // and must therefore not empty the store either, because nothing could put it back.
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
    writeKey(SCR_REFS_KEY, DEVELOPER_REF);
    writeKey(THEME_KEY, '"dark"');

    pinAppGlobalState();

    expect(readKey(SCR_REFS_KEY)).toBe(DEVELOPER_REF);
    expect(readKey(THEME_KEY)).toBe('"dark"');
  });

  it('leaves the developer state alone when the standing backup belongs to a live run', () => {
    writeKey(SCR_REFS_KEY, DEVELOPER_REF);
    pinAppGlobalState();
    giveTheBackupALiveOwner();
    writeKey(SCR_REFS_KEY, DEVELOPER_REF);

    // Another run owns these files; this one can neither park nor restore them.
    pinAppGlobalState();

    expect(readKey(SCR_REFS_KEY)).toBe(DEVELOPER_REF);
  });

  it('still empties the store on a relaunch, where this process owns the standing pin', () => {
    writeKey(SCR_REFS_KEY, DEVELOPER_REF);
    pinAppGlobalState();
    // Launch A's app wrote as it ran; launch B must not inherit that.
    writeKey(SCR_REFS_KEY, '{"0":{"book":"REV","chapterNum":1,"verseNum":1}}');

    pinAppGlobalState();

    expect(readKey(SCR_REFS_KEY)).toBeUndefined();
  });
});

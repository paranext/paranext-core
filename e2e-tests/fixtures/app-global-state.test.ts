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
import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { pinAppGlobalState, restoreAppGlobalState } from './helpers';

const ROOT = fs.mkdtempSync(path.join(os.tmpdir(), 'pt-app-global-'));
const LIVE_DIR = path.join(ROOT, 'main');
const BACKUP_DIR = `${LIVE_DIR}.e2e-backup`;
process.env.PT_E2E_MAIN_LOCAL_STORAGE_DIR = LIVE_DIR;

/**
 * Reads a manifest this same test suite wrote and narrows it to the one field these tests inspect,
 * without asserting the parsed JSON's shape: a manifest missing or misshaping `complete` fails the
 * assertion that reads this function's result, rather than the read itself.
 */
function readManifestComplete(manifestPath: string): boolean {
  const parsed: unknown = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
  return typeof parsed === 'object' && !!parsed && 'complete' in parsed && parsed.complete === true;
}

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

/**
 * Names of the backups recovery has moved aside, relative to {@link ROOT}.
 *
 * Matches both what a quarantined backup DIRECTORY is named (`<base>.unreadable-...`) and what a
 * quarantined MANIFEST is named (`<base>.json.unreadable-...`) — the manifest's own un-quarantined
 * path already ends in `.json`, so its quarantine name inserts `.unreadable-...` after that segment
 * rather than in place of it, and a single `<base>.unreadable-` prefix check does not match it.
 */
function quarantinedBackups(): string[] {
  const base = path.basename(BACKUP_DIR);
  return fs
    .readdirSync(ROOT)
    .filter(
      (name) =>
        name.startsWith(`${base}.unreadable-`) || name.startsWith(`${base}.json.unreadable-`),
    );
}

beforeEach(() => {
  fs.rmSync(LIVE_DIR, { recursive: true, force: true });
  fs.rmSync(BACKUP_DIR, { recursive: true, force: true });
  fs.rmSync(`${LIVE_DIR}.e2e-backup.json`, { force: true });
  quarantinedBackups().forEach((name) =>
    fs.rmSync(path.join(ROOT, name), { recursive: true, force: true }),
  );
});

afterAll(() => {
  fs.rmSync(ROOT, { recursive: true, force: true });
});

describe('app-global backup integrity', () => {
  it('moves a backup with no readable manifest aside so isolation is not off forever', () => {
    writeKey(SCR_REFS_KEY, DEVELOPER_REF);
    // Exactly what an interrupt between the copy loop and the manifest write leaves behind: parked
    // keys with nothing recording who parked them.
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
    fs.writeFileSync(path.join(BACKUP_DIR, SCR_REFS_KEY), DEVELOPER_REF);
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    try {
      expect(restoreAppGlobalState()).toBeUndefined();

      // Moved, never deleted: that directory holds the developer's own parked keys.
      expect(fs.existsSync(BACKUP_DIR)).toBe(false);
      expect(quarantinedBackups()).toHaveLength(1);
      const [moved] = quarantinedBackups();
      expect(fs.readFileSync(path.join(ROOT, moved, SCR_REFS_KEY), 'utf-8')).toBe(DEVELOPER_REF);
      // The live store is not touched on the way past: recovery could not tell what belongs there.
      expect(readKey(SCR_REFS_KEY)).toBe(DEVELOPER_REF);
      // Nobody recovers keys by hand from a directory they cannot find.
      expect(warn.mock.calls.flat().join(' ')).toContain(moved);

      // The reason for moving it at all: the next pin isolates the store again, instead of
      // declining to empty it on every run from here on.
      pinAppGlobalState();
      expect(readKey(SCR_REFS_KEY)).toBeUndefined();
    } finally {
      warn.mockRestore();
    }
  });
});

describe('app-global manifest write ordering', () => {
  it('writes the manifest before copying any files, and marks it complete only once every key has landed', () => {
    writeKey(SCR_REFS_KEY, DEVELOPER_REF);
    writeKey(THEME_KEY, '"dark"');
    const manifestPath = `${LIVE_DIR}.e2e-backup.json`;
    const realCopyFileSync = fs.copyFileSync.bind(fs);
    let manifestExistedBeforeFirstCopy: boolean | undefined;
    let manifestWasCompleteBeforeFirstCopy: boolean | undefined;
    const copySpy = vi
      .spyOn(fs, 'copyFileSync')
      .mockImplementation((src: fs.PathLike, dest: fs.PathLike) => {
        if (manifestExistedBeforeFirstCopy === undefined) {
          manifestExistedBeforeFirstCopy = fs.existsSync(manifestPath);
          manifestWasCompleteBeforeFirstCopy = manifestExistedBeforeFirstCopy
            ? readManifestComplete(manifestPath)
            : undefined;
        }
        return realCopyFileSync(src, dest);
      });

    try {
      pinAppGlobalState();

      expect(copySpy).toHaveBeenCalled();
      // If a kill lands after this and before the copy loop finishes, the next run finds a
      // manifest plus a partial directory rather than a directory with no manifest, which reads as
      // unowned and gets quarantined outright.
      expect(manifestExistedBeforeFirstCopy).toBe(true);
      // And it must read as unfinished at that point, or a kill right here would leave a manifest
      // the next pin trusts as restorable from a directory that has not actually copied anything.
      expect(manifestWasCompleteBeforeFirstCopy).toBe(false);
      expect(readManifestComplete(manifestPath)).toBe(true);
    } finally {
      copySpy.mockRestore();
    }
  });

  it('leaves the manifest incomplete when the copy loop throws partway through, instead of a readable-looking half-copy', () => {
    writeKey(SCR_REFS_KEY, DEVELOPER_REF);
    writeKey(THEME_KEY, '"dark"');
    const manifestPath = `${LIVE_DIR}.e2e-backup.json`;
    const realCopyFileSync = fs.copyFileSync.bind(fs);
    let copyCount = 0;
    const copySpy = vi
      .spyOn(fs, 'copyFileSync')
      .mockImplementation((src: fs.PathLike, dest: fs.PathLike) => {
        copyCount += 1;
        if (copyCount === 2) throw new Error('simulated disk failure mid-copy');
        return realCopyFileSync(src, dest);
      });

    try {
      expect(() => pinAppGlobalState()).toThrow('simulated disk failure mid-copy');
      expect(readManifestComplete(manifestPath)).toBe(false);
    } finally {
      copySpy.mockRestore();
    }
  });

  it('quarantines an incomplete backup on the next pin instead of trusting it, so a key it never saw is not destroyed', () => {
    writeKey(SCR_REFS_KEY, DEVELOPER_REF);
    // Exactly what a kill or a throw partway through the copy loop leaves behind in the SAME
    // worker process: a manifest naming this pid, a directory holding only the key the loop
    // reached, and — because the worker keeps running afterward — a THEME_KEY the live app wrote
    // that this backup never saw.
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
    fs.writeFileSync(path.join(BACKUP_DIR, SCR_REFS_KEY), DEVELOPER_REF);
    fs.writeFileSync(
      `${LIVE_DIR}.e2e-backup.json`,
      JSON.stringify({
        ownerPid: process.pid,
        createdAt: new Date().toISOString(),
        pinnedKeys: [SCR_REFS_KEY, THEME_KEY],
        complete: false,
      }),
    );
    writeKey(THEME_KEY, '"dark"');
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    try {
      pinAppGlobalState();

      // The stale partial backup is moved aside, not trusted as ours-and-restorable.
      expect(quarantinedBackups().length).toBeGreaterThan(0);
      // A fresh, complete backup replaces it and captures BOTH keys live at pin time — THEME_KEY,
      // which the partial backup never saw, is not silently destroyed by an empty-and-trust.
      expect(restoreAppGlobalState()).toEqual(expect.arrayContaining([SCR_REFS_KEY, THEME_KEY]));
      expect(readKey(SCR_REFS_KEY)).toBe(DEVELOPER_REF);
      expect(readKey(THEME_KEY)).toBe('"dark"');
    } finally {
      warn.mockRestore();
    }
  });

  it('quarantines an incomplete backup on restore instead of reporting a recovery that did not fully happen', () => {
    writeKey(SCR_REFS_KEY, DEVELOPER_REF);
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
    fs.writeFileSync(path.join(BACKUP_DIR, SCR_REFS_KEY), DEVELOPER_REF);
    fs.writeFileSync(
      `${LIVE_DIR}.e2e-backup.json`,
      JSON.stringify({
        ownerPid: process.pid,
        createdAt: new Date().toISOString(),
        pinnedKeys: [SCR_REFS_KEY, THEME_KEY],
        complete: false,
      }),
    );
    orphanTheBackup();
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    try {
      const recovered = restoreAppGlobalState();

      // Nothing is reported restored: the manifest promised two keys but the directory behind it
      // never finished copying, so trusting its list would tell a caller a recovery happened that
      // did not.
      expect(recovered).toBeUndefined();
      expect(quarantinedBackups().length).toBeGreaterThan(0);
      // The live store is untouched — an incomplete backup is not evidence of what belongs there.
      expect(readKey(SCR_REFS_KEY)).toBe(DEVELOPER_REF);
    } finally {
      warn.mockRestore();
    }
  });

  it('quarantines a manifest that has no backup directory behind it at all', () => {
    writeKey(SCR_REFS_KEY, DEVELOPER_REF);
    // The manifest is written before the copy loop creates BACKUP_DIR (see "writes the manifest
    // before copying any files" above), so a kill in that window leaves a manifest with no
    // directory behind it whatsoever, not a directory missing some keys.
    fs.writeFileSync(
      `${LIVE_DIR}.e2e-backup.json`,
      JSON.stringify({
        ownerPid: process.pid,
        createdAt: new Date().toISOString(),
        pinnedKeys: [SCR_REFS_KEY],
        complete: false,
      }),
    );
    orphanTheBackup();
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    try {
      const recovered = restoreAppGlobalState();

      expect(recovered).toBeUndefined();
      // Only the manifest file was quarantined here — there was no directory to move alongside
      // it — so this only passes once quarantinedBackups() recognizes a quarantined MANIFEST
      // name, not only a quarantined backup DIRECTORY name.
      expect(quarantinedBackups().length).toBeGreaterThan(0);
      expect(readKey(SCR_REFS_KEY)).toBe(DEVELOPER_REF);
    } finally {
      warn.mockRestore();
    }
  });
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

describe('app-global pin leaves another live run in-flight backup alone', () => {
  it('does not quarantine a live owner incomplete backup, and does not empty the store because of it', () => {
    // A live worker mid-copy: its backup directory holds only whichever keys the loop has reached so
    // far, and its manifest stays `complete: false` until every key has copied. A second worker's own
    // pinAppGlobalState() call must not read "incomplete" as "abandoned" and quarantine what is
    // actually still in progress -- doing so would let the second call believe IT created the backup,
    // and go on to empty the live store while the first worker's app is still running against it.
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
    fs.writeFileSync(path.join(BACKUP_DIR, SCR_REFS_KEY), DEVELOPER_REF);
    fs.writeFileSync(
      `${LIVE_DIR}.e2e-backup.json`,
      JSON.stringify({
        ownerPid: process.ppid,
        createdAt: new Date().toISOString(),
        pinnedKeys: [SCR_REFS_KEY, THEME_KEY],
        complete: false,
      }),
    );
    // Stand in for the live owner's app having already written past what its own backup captured.
    writeKey(SCR_REFS_KEY, '{"0":{"book":"REV","chapterNum":1,"verseNum":1}}');
    writeKey(THEME_KEY, '"dark"');

    pinAppGlobalState();

    expect(quarantinedBackups()).toEqual([]);
    expect(fs.existsSync(BACKUP_DIR)).toBe(true);
    expect(readKey(SCR_REFS_KEY)).toBe('{"0":{"book":"REV","chapterNum":1,"verseNum":1}}');
    expect(readKey(THEME_KEY)).toBe('"dark"');
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

    const recovered = restoreAppGlobalState();

    expect(readKey(SCR_REFS_KEY)).toBe(DEVELOPER_REF);
    expect(readKey(THEME_KEY)).toBe('"dark"');
    // And says so: the manifest still lists the keys it parked, but whichever run removed the
    // directory had already put them back. Returning that list here would have global setup and
    // teardown announce a recovery that did not happen.
    expect(recovered).toEqual([]);
  });

  it('quarantines a manifest-less backup dir and pins fresh, rather than leaving isolation off for good', () => {
    // A run killed between creating the backup directory and writing its manifest leaves exactly
    // this: a directory that exists and says nothing, and — because the manifest write happens
    // before the copy loop — nothing was ever actually parked in it. Refusing to act here would
    // leave the developer's app-global state unisolated on every run until a human deletes a
    // gitignored directory by hand, so the pin instead moves the empty directory aside and takes a
    // fresh, complete backup of what is live right now.
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
    writeKey(SCR_REFS_KEY, DEVELOPER_REF);
    writeKey(THEME_KEY, '"dark"');
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    try {
      pinAppGlobalState();

      expect(quarantinedBackups().length).toBeGreaterThan(0);
      // The store is isolated for the test that follows...
      expect(readKey(SCR_REFS_KEY)).toBeUndefined();
      expect(readKey(THEME_KEY)).toBeUndefined();
      // ...and the fresh, complete backup can put both keys back — nothing was destroyed on the
      // way past the stale, empty directory.
      expect(restoreAppGlobalState()).toEqual(expect.arrayContaining([SCR_REFS_KEY, THEME_KEY]));
      expect(readKey(SCR_REFS_KEY)).toBe(DEVELOPER_REF);
      expect(readKey(THEME_KEY)).toBe('"dark"');
    } finally {
      warn.mockRestore();
    }
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

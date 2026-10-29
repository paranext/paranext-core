// @vitest-environment node

import path from 'path';
import {
  FreshInstallEnvironment,
  formatSize,
  getFreshInstallFolders,
  isConfirmation,
  isDataProviderRunning,
  parseTarget,
} from './reset-fresh-install.util';

const REPO_ROOT = path.join('/repo', 'paranext-core');

const WINDOWS: FreshInstallEnvironment = {
  platform: 'win32',
  homeDir: 'C:\\Users\\tester',
  env: {
    APPDATA: 'C:\\Users\\tester\\AppData\\Roaming',
    LOCALAPPDATA: 'C:\\Users\\tester\\AppData\\Local',
  },
  repoRoot: REPO_ROOT,
};

const MAC: FreshInstallEnvironment = {
  platform: 'darwin',
  homeDir: '/Users/tester',
  env: {},
  repoRoot: REPO_ROOT,
};

const LINUX: FreshInstallEnvironment = {
  platform: 'linux',
  homeDir: '/home/tester',
  env: {},
  repoRoot: REPO_ROOT,
};

function pathsOf(target: 'p10' | 'core', environment: FreshInstallEnvironment) {
  return getFreshInstallFolders(target, environment).map((folder) => folder.path);
}

describe('getFreshInstallFolders', () => {
  it('lists the installed Paratext 10 folders on Windows', () => {
    expect(pathsOf('p10', WINDOWS)).toEqual([
      path.join('C:\\Users\\tester', '.paratext-10-studio'),
      path.join('C:\\Users\\tester\\AppData\\Roaming', 'paratext-10-studio'),
      path.join('C:\\Users\\tester\\AppData\\Local', 'Paratext100'),
      path.join('C:\\Users\\tester\\AppData\\Local', 'paratext-10-studio-updater'),
    ]);
  });

  it('lists the core folders on Windows, including dev-appdata and the dev build Electron folder', () => {
    expect(pathsOf('core', WINDOWS)).toEqual([
      path.join('C:\\Users\\tester', '.platform.bible'),
      path.join('C:\\Users\\tester\\AppData\\Roaming', 'platform-bible'),
      path.join('C:\\Users\\tester\\AppData\\Local', 'Paratext100'),
      path.join('C:\\Users\\tester\\AppData\\Local', 'platform-bible-updater'),
      path.join(REPO_ROOT, 'dev-appdata'),
      path.join('C:\\Users\\tester\\AppData\\Roaming', 'Electron'),
    ]);
  });

  it('falls back to the default Windows app data folders when APPDATA and LOCALAPPDATA are unset', () => {
    expect(pathsOf('p10', { ...WINDOWS, env: {} })).toEqual([
      path.join('C:\\Users\\tester', '.paratext-10-studio'),
      path.join('C:\\Users\\tester', 'AppData', 'Roaming', 'paratext-10-studio'),
      path.join('C:\\Users\\tester', 'AppData', 'Local', 'Paratext100'),
      path.join('C:\\Users\\tester', 'AppData', 'Local', 'paratext-10-studio-updater'),
    ]);
  });

  it('lists the installed Paratext 10 folders on macOS', () => {
    expect(pathsOf('p10', MAC)).toEqual([
      path.join('/Users/tester', '.paratext-10-studio'),
      path.join('/Users/tester', 'Library', 'Application Support', 'paratext-10-studio'),
      path.join('/Users/tester', 'Library', 'Application Support', 'Paratext100'),
      path.join('/Users/tester', 'Library', 'Caches', 'paratext-10-studio-updater'),
    ]);
  });

  it('lists the installed Paratext 10 folders on Linux, including the snap folder', () => {
    expect(pathsOf('p10', LINUX)).toEqual([
      path.join('/home/tester', '.paratext-10-studio'),
      path.join('/home/tester', '.config', 'paratext-10-studio'),
      path.join('/home/tester', '.local', 'share', 'Paratext100'),
      path.join('/home/tester', '.cache', 'paratext-10-studio-updater'),
      path.join('/home/tester', 'snap', 'paratext-10-studio'),
    ]);
  });

  it('honors the XDG base directories on Linux', () => {
    const paths = pathsOf('core', {
      ...LINUX,
      env: {
        XDG_CONFIG_HOME: '/xdg/config',
        XDG_DATA_HOME: '/xdg/data',
        XDG_CACHE_HOME: '/xdg/cache',
      },
    });
    expect(paths).toContain(path.join('/xdg/config', 'platform-bible'));
    expect(paths).toContain(path.join('/xdg/config', 'Electron'));
    expect(paths).toContain(path.join('/xdg/data', 'Paratext100'));
    expect(paths).toContain(path.join('/xdg/cache', 'platform-bible-updater'));
  });

  it('marks only the Linux snap folder as needing its snap removed first', () => {
    const snapFolders = getFreshInstallFolders('core', LINUX).filter((folder) => folder.snapName);
    expect(snapFolders).toEqual([
      expect.objectContaining({
        path: path.join('/home/tester', 'snap', 'platform-bible'),
        snapName: 'platform-bible',
      }),
    ]);
    expect(getFreshInstallFolders('core', WINDOWS).some((folder) => folder.snapName)).toBe(false);
  });

  it('describes the shared Paratext100 folder as shared by both kinds of build', () => {
    const registration = getFreshInstallFolders('p10', WINDOWS).find((folder) =>
      folder.path.endsWith('Paratext100'),
    );
    expect(registration?.description).toMatch(/shared/i);
  });
});

describe('parseTarget', () => {
  it('accepts p10 and core', () => {
    expect(parseTarget(['node', 'script', 'p10'])).toEqual({ target: 'p10' });
    expect(parseTarget(['node', 'script', 'core'])).toEqual({ target: 'core' });
  });

  it('rejects a missing or unknown target', () => {
    expect(parseTarget(['node', 'script'])).toHaveProperty('error');
    expect(parseTarget(['node', 'script', 'P9'])).toHaveProperty('error');
  });
});

describe('isDataProviderRunning', () => {
  it('finds the data provider in Windows tasklist output', () => {
    const output =
      '"explorer.exe","1234","Console","1","90,000 K"\r\n"ParanextDataProvider.exe","5678","Console","1","120,000 K"\r\n';
    expect(isDataProviderRunning(output)).toBe(true);
  });

  it('finds the data provider in ps output', () => {
    expect(
      isDataProviderRunning(
        '/sbin/launchd\n/Applications/Paratext 10.app/Contents/Resources/c-sharp/ParanextDataProvider\n',
      ),
    ).toBe(true);
  });

  it('reports nothing running when the data provider is absent', () => {
    expect(isDataProviderRunning('"explorer.exe","1234","Console","1","90,000 K"\r\n')).toBe(false);
  });
});

describe('isConfirmation', () => {
  it('accepts y and yes in any case', () => {
    expect(isConfirmation('y')).toBe(true);
    expect(isConfirmation(' YES ')).toBe(true);
  });

  it('treats anything else, including an empty answer, as no', () => {
    expect(isConfirmation('')).toBe(false);
    expect(isConfirmation('n')).toBe(false);
    expect(isConfirmation('yep')).toBe(false);
  });
});

describe('formatSize', () => {
  it('formats bytes in the largest whole unit', () => {
    expect(formatSize(512)).toBe('512 B');
    expect(formatSize(2048)).toBe('2.0 KB');
    expect(formatSize(185 * 1024 * 1024)).toBe('185.0 MB');
    expect(formatSize(3 * 1024 * 1024 * 1024)).toBe('3.0 GB');
  });
});

import path from 'path';

/**
 * Which builds to reset: `p10` is an installed Paratext 10 build (released from the
 * paratext-10-studio repo), `core` is a dev build from this repo or a packaged Platform.Bible.
 */
export type FreshInstallTarget = 'p10' | 'core';

export type FreshInstallFolder = {
  path: string;
  /** Shown to the tester next to the path before they confirm. */
  description: string;
  /**
   * Set on a Linux snap's data folder. Deleting it while that snap is still installed breaks the
   * install, so the script skips it unless the snap is gone.
   */
  snapName?: string;
};

export type FreshInstallEnvironment = {
  platform: typeof process.platform;
  homeDir: string;
  env: {
    APPDATA?: string;
    LOCALAPPDATA?: string;
    XDG_CONFIG_HOME?: string;
    XDG_DATA_HOME?: string;
    XDG_CACHE_HOME?: string;
  };
  repoRoot: string;
};

/**
 * Name each target's data lives under. `p10` is what paratext-10-studio's build substitutes for
 * `PRODUCT_FOLDER_NAME` (`src/node/utils/util.ts`) and the `.platform.bible` projects folder in
 * `LocalParatextProjects`; `core` is `release/app/package.json`'s `name`.
 */
const PRODUCT_NAMES: Record<FreshInstallTarget, { appName: string; homeFolder: string }> = {
  p10: { appName: 'paratext-10-studio', homeFolder: '.paratext-10-studio' },
  core: { appName: 'platform-bible', homeFolder: '.platform.bible' },
};

/** Keep in sync with `APP_DATA_FOLDER_NAME` in `c-sharp/ParatextUtils/PlatformParatextInfo.cs`. */
const PARATEXT_DATA_FOLDER_NAME = 'Paratext100';

/** Electron's `appData` folder, which holds each app's `userData` folder. */
function getElectronAppDataDir({ platform, homeDir, env }: FreshInstallEnvironment): string {
  if (platform === 'win32') return env.APPDATA ?? path.join(homeDir, 'AppData', 'Roaming');
  if (platform === 'darwin') return path.join(homeDir, 'Library', 'Application Support');
  return env.XDG_CONFIG_HOME ?? path.join(homeDir, '.config');
}

/** .NET's `Environment.SpecialFolder.LocalApplicationData`, where ParatextData keeps its folder. */
function getDotNetLocalAppDataDir({ platform, homeDir, env }: FreshInstallEnvironment): string {
  if (platform === 'win32') return env.LOCALAPPDATA ?? path.join(homeDir, 'AppData', 'Local');
  if (platform === 'darwin') return path.join(homeDir, 'Library', 'Application Support');
  return env.XDG_DATA_HOME ?? path.join(homeDir, '.local', 'share');
}

/** Where `electron-updater` keeps its `<app name>-updater` download cache. */
function getUpdaterCacheDir({ platform, homeDir, env }: FreshInstallEnvironment): string {
  if (platform === 'win32') return env.LOCALAPPDATA ?? path.join(homeDir, 'AppData', 'Local');
  if (platform === 'darwin') return path.join(homeDir, 'Library', 'Caches');
  return env.XDG_CACHE_HOME ?? path.join(homeDir, '.cache');
}

/**
 * Every folder the target's builds write that makes the next launch differ from a first launch
 * after a fresh install. Paratext 9's own folders are never included.
 */
export function getFreshInstallFolders(
  target: FreshInstallTarget,
  environment: FreshInstallEnvironment,
): FreshInstallFolder[] {
  const { appName, homeFolder } = PRODUCT_NAMES[target];
  const electronAppDataDir = getElectronAppDataDir(environment);

  const folders: FreshInstallFolder[] = [
    {
      path: path.join(environment.homeDir, homeFolder),
      description: 'App data: settings, extensions, projects',
    },
    {
      path: path.join(electronAppDataDir, appName),
      description: 'Electron data: window layout, local storage, logs',
    },
    {
      path: path.join(getDotNetLocalAppDataDir(environment), PARATEXT_DATA_FOLDER_NAME),
      description:
        'Registration and internet settings, shared by dev and installed builds (re-copied from Paratext 9 on next launch)',
    },
    {
      path: path.join(getUpdaterCacheDir(environment), `${appName}-updater`),
      description: 'Updater download cache',
    },
  ];

  if (target === 'core') {
    folders.push(
      {
        path: path.join(environment.repoRoot, 'dev-appdata'),
        description: 'Dev build app data',
      },
      {
        // Dev builds run unpackaged, so Electron names their data folder after itself
        path: path.join(electronAppDataDir, 'Electron'),
        description: 'Dev build Electron data (shared with any other unpackaged Electron app)',
      },
    );
  }

  if (environment.platform === 'linux')
    folders.push({
      path: path.join(environment.homeDir, 'snap', appName),
      description: 'Snap data',
      snapName: appName,
    });

  return folders;
}

export function parseTarget(argv: string[]): { target: FreshInstallTarget } | { error: string } {
  const target = argv[2];
  if (target === 'p10' || target === 'core') return { target };
  return { error: `Expected "p10" or "core" as the first argument, got "${target ?? ''}"` };
}

/**
 * Whether the data provider appears in a process listing (`tasklist` on Windows, `ps` elsewhere).
 * Every build runs it, so it is running whenever any Platform.Bible or Paratext 10 build is.
 */
export function isDataProviderRunning(processListOutput: string): boolean {
  return processListOutput.includes('ParanextDataProvider');
}

export function isConfirmation(answer: string): boolean {
  return ['y', 'yes'].includes(answer.trim().toLowerCase());
}

export function formatSize(bytes: number): string {
  const units = ['KB', 'MB', 'GB'];
  if (bytes < 1024) return `${bytes} B`;
  let size = bytes / 1024;
  let unitIndex = 0;
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex += 1;
  }
  return `${size.toFixed(1)} ${units[unitIndex]}`;
}

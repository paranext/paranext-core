/**
 * Fixture helpers for Find/Replace E2E tests.
 *
 * Re-exports a custom `test` built on top of app.fixture (worker-scoped Electron instance). The
 * custom `electronApp` fixture launches WITHOUT `DEV_NOISY` so test extensions like helloRock3 do
 * not open their webviews on startup. This keeps the initial webview list clean — without it,
 * helloRock3 opens 3 iframes before the scripture editor, breaking `nth(0)` selectors. Also
 * provides PAPI helpers used in `test.beforeAll` to auto-discover and open a scripture project so
 * the editor hamburger menu is available before tests run.
 *
 * The tests use a worker-scoped Electron instance (one launch per worker) rather than a test-scoped
 * one, which avoids the cost of 20+ separate Electron launches.
 *
 * ## Declared, not inherited
 *
 * Interface mode, interface language, and window size are all pinned here rather than inherited
 * from the developer's checkout, because each one silently changes what the Find UI renders. See
 * the comments on `preConfigureSettings` and `windowSize` below.
 */

import fs from 'fs';
import os from 'os';
import path from 'path';
import { ElectronApplication, expect } from '@playwright/test';
import { test as appTest } from './app.fixture';
import {
  assertDeclaredWindowSize,
  assertInterfaceMode,
  DEFAULT_WINDOW_SIZE,
  launchElectronApp,
  preConfigureSettings,
  PROCESS_READY_TIMEOUT,
  RequiredInterfaceMode,
  sendPapiRequestOnce,
  teardownElectronApp,
  WindowSize,
} from './helpers';

/**
 * Fixed project ID for the testWEB copy used by find/replace tests. A deterministic GUID distinct
 * from the original WEB GUID so the C# backend treats it as a separate project.
 */
export const WEB_COPY_PROJECT_ID = '0123456789ABCDEF0123456789ABCDEF01234567';

/**
 * Create a fresh testWEB project inside the given isolated project-root folder. Copies the bundled
 * WEB assets to `<projectsDir>/testWEB`, patches the GUID to WEB_COPY_PROJECT_ID, and sets
 * Editable=T so replace tests can write to it.
 *
 * The projects folder is a throwaway temp dir (see the fixture below) that the app is pointed at
 * via `PLATFORM_BIBLE_PROJECT_ROOT_FOLDER`, so this NEVER touches the developer's real project
 * root.
 *
 * @param projectsDir Isolated project-root folder to create testWEB inside.
 */
function setupWEBCopyProject(projectsDir: string): void {
  const rootDir = path.resolve(__dirname, '../..');
  const webAssetsDir = path.join(rootDir, 'c-sharp', 'assets', 'WEB');
  const copyDir = path.join(projectsDir, 'testWEB');

  if (!fs.existsSync(webAssetsDir)) {
    throw new Error(`WEB assets not found at ${webAssetsDir}`);
  }

  if (!fs.existsSync(projectsDir)) {
    fs.mkdirSync(projectsDir, { recursive: true });
  }

  fs.mkdirSync(copyDir);

  fs.readdirSync(webAssetsDir).forEach((fileName) => {
    fs.copyFileSync(path.join(webAssetsDir, fileName), path.join(copyDir, fileName));
  });

  const settingsPath = path.join(copyDir, 'Settings.xml');
  let settingsXml = fs.readFileSync(settingsPath, 'utf-8');
  settingsXml = settingsXml.replace(/<Guid>[^<]*<\/Guid>/, `<Guid>${WEB_COPY_PROJECT_ID}</Guid>`);
  settingsXml = settingsXml.replace(/<Editable>F<\/Editable>/, '<Editable>T</Editable>');
  fs.writeFileSync(settingsPath, settingsXml, 'utf-8');

  console.log('[find tests] Created testWEB project from WEB assets with new ID and Editable=T');
}

// Extend app.fixture but override electronApp to launch without DEV_NOISY.
// Without this override, helloRock3 opens 3 webviews on startup with DEV_NOISY=true,
// causing `iframe.web-view nth(0)` to point to a helloRock3 iframe instead of the
// scripture editor.
export const test = appTest.extend<
  {},
  {
    electronApp: ElectronApplication;
    windowSize: WindowSize;
    interfaceMode: RequiredInterfaceMode;
  }
>({
  // Option fixture, worker-scoped because the window it sizes belongs to the worker-scoped
  // `electronApp` below. A spec declares the layout it was written against with
  // `test.use({ windowSize: { width, height } })`.
  windowSize: [DEFAULT_WINDOW_SIZE, { option: true, scope: 'worker' }],

  // Which interface mode the app is pinned to before launch. Simple is the default because that is
  // what the Find suite drives; the Replace suite sets `test.use({ interfaceMode: 'power' })`,
  // because Simple mode renders no Replace surface at all (`hideModeToggle`).
  //
  // Worker-scoped, and it must be: it is read before the app launches, and the app is shared by
  // every test in the worker, so it cannot vary per test.
  interfaceMode: ['simple', { option: true, scope: 'worker' }],

  electronApp: [
    async ({ windowSize, interfaceMode }, use) => {
      // Build an isolated, throwaway project root and populate it with a fresh, editable testWEB.
      // Pointing the app at it via PLATFORM_BIBLE_PROJECT_ROOT_FOLDER keeps the suite from ever
      // reading or writing the developer's real projects, and the fresh copy each worker run
      // prevents pollution from a previous run's replace operations.
      const projectsDir = fs.mkdtempSync(path.join(os.tmpdir(), 'find-e2e-projects-'));
      setupWEBCopyProject(projectsDir);
      // DEV_NOISY=false so test extensions (helloRock3, etc.) don't open webviews and shift the
      // `iframe.web-view nth(0)` selectors; envOverrides is spread last so both win over the defaults.
      // Pin every setting this suite's selectors depend on. `preConfigureSettings` MERGES into the
      // shared dev-appdata settings file and preserves keys it does not set, so anything left
      // unpinned is inherited from whatever the checkout happens to hold — which is why this
      // suite's result used to differ between machines.
      //
      // - firstRunComplete: without it the app starts on the first-run wizard, a full-screen modal
      //   that aria-hides the rest of the app and intercepts pointer events, blocking beforeAll
      //   before it can warm the findInScripture PDP. app.fixture seeds this; this fixture replaces
      //   app.fixture's worker-scoped electronApp wholesale, so it must seed it too.
      // - interfaceMode: the Find UI differs by mode — Simple mode hides the Find/Replace toggle
      //   and the whole Replace surface (`hideModeToggle`), and makes Find a permanent,
      //   non-closable tab. This suite is written against Simple mode and must declare it rather
      //   than inherit it.
      // - interfaceLanguage: every text-based selector here is English-only.
      const restoreSettings = preConfigureSettings({
        'platform.firstRunComplete': true,
        'platform.interfaceMode': interfaceMode,
        'platform.interfaceLanguage': ['en'],
      });
      // Inside its own try: a launch that throws — a bound port, a crash on start — would
      // otherwise skip the restore below entirely and leave the pin in the developer's settings
      // file. The next run's global setup does recover it from the backup, but restoring here means
      // the developer's own next app start is already correct rather than one run later.
      let ctx;
      try {
        ctx = await launchElectronApp({
          envOverrides: { DEV_NOISY: 'false', PLATFORM_BIBLE_PROJECT_ROOT_FOLDER: projectsDir },
        });
      } catch (err) {
        restoreSettings();
        throw err;
      }
      try {
        // Size the window before any test runs. app.fixture (unlike isolated.fixture) never
        // resizes, so without this the suite runs at whatever size the platform hands out — under a
        // bare Xvfb that is not the 1280x800 the layout assertions are written against.
        const page = await ctx.electronApp.firstWindow({ timeout: PROCESS_READY_TIMEOUT });

        // Verify the pin took before any test runs. The two modes render genuinely different Find
        // UIs — Simple hides the Find/Replace toggle and the entire Replace surface — so a pin that
        // silently failed would otherwise surface as a selector timeout deep inside a test.
        await assertInterfaceMode(
          page,
          interfaceMode,
          `This fixture pins '${interfaceMode}' before launching its own app, so the pin did not ` +
            `take: check preConfigureSettings ran before launchElectronApp.`,
        );

        await ctx.electronApp.evaluate(({ BrowserWindow }, size) => {
          const win = BrowserWindow.getAllWindows()[0];
          if (win) {
            if (win.isMaximized()) win.unmaximize();
            win.setSize(size.width, size.height);
          }
        }, windowSize);
        // Confirm the OS honoured it; a spec that silently ran at another size would be testing a
        // layout nobody wrote. Retried because `setSize` returns before the renderer's
        // `outerWidth`/`outerHeight` reflect the new size, so a single read can race the resize.
        await expect(async () => {
          await assertDeclaredWindowSize(
            page,
            windowSize,
            'The find fixture sets this size at launch; check that the window manager is not ' +
              'overriding it.',
          );
        }).toPass({ timeout: 15_000 });

        await use(ctx.electronApp);
      } finally {
        await teardownElectronApp(ctx);
        // Restore only after the app has fully closed so its shutdown writes cannot clobber it.
        restoreSettings();
        fs.rmSync(projectsDir, { recursive: true, force: true });
      }
    },
    { scope: 'worker' },
  ],
});

export { expect } from '@playwright/test';

/** Minimal shape of ProjectMetadata returned by the PAPI project lookup service. */
type ProjectMetadata = {
  id: string;
  projectInterfaces?: string[];
};

/**
 * Retrieve all available project metadata via the PAPI WebSocket. Calls
 * `object:ProjectLookupService.getMetadataForAllProjects` — a network-object method registered in
 * `project-lookup.service-host.ts`.
 */
export async function getAvailableProjects(timeoutMs = 30_000): Promise<ProjectMetadata[]> {
  return (
    (await sendPapiRequestOnce<ProjectMetadata[] | undefined>(
      'object:ProjectLookupService.getMetadataForAllProjects',
      [],
      undefined,
      timeoutMs,
    )) ?? []
  );
}

/**
 * Open a scripture editor for the given project via the PAPI
 * `command:platformScriptureEditor.openScriptureEditor` command.
 */
export async function openScriptureEditor(projectId: string): Promise<void> {
  await sendPapiRequestOnce(
    'command:platformScriptureEditor.openScriptureEditor',
    [projectId],
    undefined,
    30_000,
  );
}

/**
 * Empty both of the find panel's persisted keys for a project: the search history and the last
 * search term.
 *
 * Neither is panel state — the find WebView reads and writes them through the
 * `platformScripture.findHistory` data provider, which persists them in extension user data
 * (`dev-appdata/extensions/platformScripture/user-data/`). They therefore outlive the WebView, the
 * Electron process, and the whole test run, so what a test sees depends both on the tests that ran
 * before it and on what earlier RUNS left behind. History is additionally capped at
 * `MAX_FIND_HISTORY_ITEMS`, and the last search term is seeded straight back into an empty search
 * box on mount (`find.web-view.tsx`), so a stale term reappears as a pre-filled query.
 *
 * Clearing through the data provider is the only reset available: the panel exposes no
 * clear-history control, and every mounted find WebView is subscribed, so the panel re-renders with
 * the empty history list. The last search term is different: the WebView restores it into the
 * search box exactly once per mount, so clearing it takes effect on the NEXT launch rather than in
 * a live panel — which is why resetting a panel in place still has to clear the input itself.
 *
 * `projectId` must be the project whose state the panel is showing (the find WebView keys both
 * values by the scroll group's source project); another project's state would be cleared without
 * changing anything the panel displays.
 */
export async function clearFindPersistedState(projectId: string | undefined): Promise<void> {
  // The provider maps a falsy projectId to the project-less storage key, so an unset id would
  // clear a different project's state and report success. The resulting failure surfaces much
  // later as an unrelated timeout, so refuse it here where the cause is still visible.
  if (!projectId)
    throw new Error(
      'clearFindPersistedState needs the id of the project the panel is showing; it was unset. ' +
        'suite assigns it in beforeAll, so check that beforeAll ran and found its project.',
    );
  await sendPapiRequestOnce(
    'object:platformScripture.findHistory-data.setHistory',
    [projectId, []],
    undefined,
    15_000,
  );
  await sendPapiRequestOnce(
    'object:platformScripture.findHistory-data.setLastSearchTerm',
    [projectId, ''],
    undefined,
    15_000,
  );
}

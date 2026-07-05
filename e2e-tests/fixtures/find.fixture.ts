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
 */

import fs from 'fs';
import os from 'os';
import path from 'path';
import { ElectronApplication } from '@playwright/test';
import WebSocket from 'ws';
import { test as appTest } from './app.fixture';
import { launchElectronApp, teardownElectronApp } from './helpers';

/**
 * Fixed project ID for the testWEB copy used by find/replace tests. A deterministic GUID distinct
 * from the original WEB GUID so the C# backend treats it as a separate project.
 */
export const WEB_COPY_PROJECT_ID = '0123456789ABCDEF0123456789ABCDEF01234567';

/**
 * Create (or reset) the testWEB project directory. Copies WEB assets to
 * `~/.platform.bible/projects/Paratext 9 Projects/testWEB`, patches the GUID to
 * WEB_COPY_PROJECT_ID, and sets Editable=T so replace tests can write to it. The directory is
 * deleted and re-created on each worker run to prevent test pollution from previous replace
 * operations.
 */
function setupWEBCopyProject(): void {
  const rootDir = path.resolve(__dirname, '../..');
  const webAssetsDir = path.join(rootDir, 'c-sharp', 'assets', 'WEB');
  const projectsDir = path.join(os.homedir(), '.platform.bible', 'projects', 'Paratext 9 Projects');
  const copyDir = path.join(projectsDir, 'testWEB');

  if (fs.existsSync(copyDir)) {
    fs.rmSync(copyDir, { recursive: true, force: true });
    console.log('[find tests] Removed existing testWEB project directory');
  }

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
export const test = appTest.extend<{}, { electronApp: ElectronApplication }>({
  electronApp: [
    // Playwright fixtures require destructured parameter even when no dependencies are needed
    // eslint-disable-next-line no-empty-pattern
    async ({}, use) => {
      // Reset testWEB to a clean state before each worker's app launch. Replace operations from a
      // previous run would otherwise persist because the C# backend skips re-copying when the
      // directory already exists.
      setupWEBCopyProject();
      const ctx = await launchElectronApp({ devNoisy: 'false' });
      await use(ctx.electronApp);
      await teardownElectronApp(ctx);
    },
    { scope: 'worker' },
  ],
});

export { expect } from '@playwright/test';

const WEBSOCKET_PORT = 8876;

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
  return new Promise<ProjectMetadata[]>((resolve, reject) => {
    const ws = new WebSocket(`ws://localhost:${WEBSOCKET_PORT}`);
    const timeout = setTimeout(() => {
      ws.close();
      reject(new Error(`getAvailableProjects: timed out after ${timeoutMs / 1000} s`));
    }, timeoutMs);

    ws.on('open', () => {
      ws.send(
        JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'object:ProjectLookupService.getMetadataForAllProjects',
          params: [],
        }),
      );
    });

    ws.on('message', (data) => {
      let parsed: { id?: number; error?: unknown; result?: unknown };
      try {
        parsed = JSON.parse(data.toString());
      } catch (err) {
        clearTimeout(timeout);
        ws.close();
        reject(err);
        return;
      }
      // Ignore unsolicited messages (notifications/events) until our response arrives.
      if (parsed.id !== 1) return;
      clearTimeout(timeout);
      ws.close();
      if (parsed.error) {
        reject(new Error(`PAPI error: ${JSON.stringify(parsed.error)}`));
      } else {
        // parsed result is unknown JSON from a WebSocket message; we trust the PAPI contract
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        resolve((parsed.result as ProjectMetadata[]) ?? []);
      }
    });

    ws.on('error', (err) => {
      clearTimeout(timeout);
      reject(err);
    });
  });
}

/**
 * Open a scripture editor for the given project via the PAPI
 * `command:platformScriptureEditor.openScriptureEditor` command.
 */
export async function openScriptureEditor(projectId: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const ws = new WebSocket(`ws://localhost:${WEBSOCKET_PORT}`);
    const timeout = setTimeout(() => {
      ws.close();
      reject(new Error(`openScriptureEditor("${projectId}"): timed out after 30 s`));
    }, 30_000);

    ws.on('open', () => {
      ws.send(
        JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'command:platformScriptureEditor.openScriptureEditor',
          params: [projectId],
        }),
      );
    });

    ws.on('message', (data) => {
      let parsed: { id?: number; error?: unknown; result?: unknown };
      try {
        parsed = JSON.parse(data.toString());
      } catch (err) {
        clearTimeout(timeout);
        ws.close();
        reject(err);
        return;
      }
      if (parsed.id !== 1) return;
      clearTimeout(timeout);
      ws.close();
      if (parsed.error) {
        reject(new Error(`PAPI error opening editor: ${JSON.stringify(parsed.error)}`));
      } else {
        resolve();
      }
    });

    ws.on('error', (err) => {
      clearTimeout(timeout);
      reject(err);
    });
  });
}

/**
 * E2E for content zoom's NN-4: a non-100% `platform.webViewContentZoom` Settings default is the
 * floor a per-area reset returns to, not 1.0.
 *
 * This is its own spec file (rather than a `test.step()` in `content-zoom.spec.ts`) because it
 * needs its own `seedSettings` — the isolated fixture seeds settings once, before Electron
 * launches, and a spec must never call `preConfigureSettings` itself (see the `IsolatedFixtures`
 * doc in `fixtures/isolated.fixture.ts`).
 *
 * ONE test() per spec file on purpose: the isolated fixture is test-scoped, and a second Electron
 * instance against the shared renderer dev server has a documented dock-tab failure mode (see
 * standard-default-power-mode.spec.ts).
 *
 * Runs against an isolated project root (the bundled sample WEB is installed into the empty root):
 * `npm run test:e2e:isolated scripture-editor`.
 */
import { type Frame, type Page } from '@playwright/test';
import { test, expect } from '../../../fixtures/isolated.fixture';
import {
  makeSampleProjectEditable,
  openEditableScriptureEditorForProject,
  SAMPLE_WEB_PROJECT_ID,
  waitForHomeTab,
} from '../../../fixtures/scripture-editor-helpers';

test.use({
  interfaceMode: 'power',
  electronLaunchOptions: { isolatedProjectRoot: true, envOverrides: { DEV_NOISY: 'false' } },
  // The fixture's documented seeding channel — specs must never call preConfigureSettings
  // themselves (see the IsolatedFixtures doc).
  seedSettings: { 'platform.webViewContentZoom': 1.2 },
});

/**
 * Names of the three content-zoom commands (registered in
 * `src/main/services/web-view.service-router.ts`).
 */
const CONTENT_ZOOM_COMMANDS = {
  in: 'platform.webViewContentZoomIn',
  reset: 'platform.webViewContentZoomReset',
} as const;

async function getEditorFrame(page: Page, webViewId: string): Promise<Frame> {
  const handle = await page.locator(`iframe[data-web-view-id="${webViewId}"]`).elementHandle();
  const frame = await handle?.contentFrame();
  if (!frame) throw new Error(`Editor iframe ${webViewId} has no content frame`);
  return frame;
}

/** See content-zoom.spec.ts's helper of the same name for the full rationale. */
async function readFactor(frame: Frame, areaId: string): Promise<number> {
  const value = await frame.evaluate(
    (variableName) =>
      getComputedStyle(document.documentElement).getPropertyValue(variableName).trim(),
    `--platform-content-zoom-${areaId || 'main'}`,
  );
  return Number(value);
}

async function sendContentZoomCommand(
  page: Page,
  commandName: string,
  webViewId: string,
  areaId: string,
): Promise<void> {
  await page.evaluate(
    ([cmd, id, area]) => {
      // The renderer exposes `papi` on `globalThis`, untyped here (same pattern as
      // scripture-text-grid-zoom.spec.ts's afterEach cleanup).
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const win = window as unknown as {
        papi: { commands: { sendCommand: (c: string, ...a: unknown[]) => Promise<unknown> } };
      };
      return win.papi.commands.sendCommand(cmd, id, area);
    },
    [commandName, webViewId, areaId] as const,
  );
}

test.describe('scripture editor content zoom — non-default Settings level', () => {
  test('a per-area reset returns to the seeded Settings default, not 1.0', async ({ mainPage }) => {
    test.slow();

    await waitForHomeTab(mainPage);
    await makeSampleProjectEditable();
    const editorId = await openEditableScriptureEditorForProject(mainPage, SAMPLE_WEB_PROJECT_ID);
    const editorFrame = await getEditorFrame(mainPage, editorId);
    await editorFrame.locator('.editor-container').waitFor({ timeout: 60_000 });

    await test.step('the editor opens at the seeded default with no per-area level stored', async () => {
      await expect.poll(() => readFactor(editorFrame, '')).toBe(1.2);
    });

    await test.step('zooming in steps from the seeded default', async () => {
      await sendContentZoomCommand(mainPage, CONTENT_ZOOM_COMMANDS.in, editorId, 'main');
      await expect.poll(() => readFactor(editorFrame, '')).toBe(1.3);
    });

    await test.step('reset lands on the seeded default (1.2), not 1.0, and the indicator says so', async () => {
      await sendContentZoomCommand(mainPage, CONTENT_ZOOM_COMMANDS.reset, editorId, 'main');
      await expect.poll(() => readFactor(editorFrame, '')).toBe(1.2);

      // Format is `<label> · <percent>` (web-view-content-zoom.service.ts's resetContentZoom); the
      // percent half uses a narrow no-break space before `%`, stripped here so whitespace shape
      // doesn't matter.
      const indicator = editorFrame.locator('#platform-content-zoom-indicator');
      await expect
        .poll(async () => (await indicator.textContent())?.replace(/\s/gu, ''), { timeout: 2_000 })
        .toBe('Default·120%');
    });
  });
});

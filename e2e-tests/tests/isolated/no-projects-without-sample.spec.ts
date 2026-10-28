/**
 * A new user with an empty projects folder and no sample project gets the empty states, not an
 * editor stuck on "No project selected".
 *
 * The editor shows its no-projects guidance only once it has asked the C# Paratext project factory
 * (`platform.Paratext-pdpf`) directly and heard that it has no projects, so this crosses the real
 * TS to C# boundary. If presence never settles to `none`, the guidance never appears and this
 * fails.
 *
 * ## How to run
 *
 * `npm run test:e2e:isolated tests/isolated/no-projects-without-sample.spec.ts`
 */
import { test, expect } from '../../fixtures/isolated.fixture';
import { waitForAppReady, waitForOpenWebViewIdByType } from '../../fixtures/helpers';
import { sendPapiCommandWhenRegistered } from '../../fixtures/scripture-editor-helpers';
import { SCRIPTURE_EDITOR_SLOT_WEBVIEW_TYPE } from '../../fixtures/simple-mode-columns.page';
import {
  HOME_WEBVIEW_TYPE,
  NoProjectEditorView,
  homeNothingHere,
  webViewFrame,
} from './no-projects-without-sample.page';

/**
 * Generous: the guidance can only appear after the C# factory has scanned the projects folder and
 * registered, which on a cold start takes tens of seconds after the app shell is up.
 */
const EMPTY_STATE_TIMEOUT_MS = 120_000;

test.use({
  interfaceMode: 'simple',
  // Past first run, so Simple mode starts in the app rather than the setup wizard.
  seedSettings: { 'platform.firstRunComplete': true },
  electronLaunchOptions: {
    isolatedProjectRoot: true,
    // Spread after the launcher's pinned 'true', so the empty project root stays empty.
    envOverrides: { DEV_NOISY: 'false', PLATFORM_BIBLE_INSTALL_SAMPLE_PROJECT: 'false' },
  },
});
test.setTimeout(300_000);

test('with no projects and no sample, the editor and Home show their empty states', async ({
  mainPage,
}) => {
  // Waits out the first-run gate and the workspace-updating cover, and suppresses the tour.
  await waitForAppReady(mainPage, { timeout: 180_000 });

  await test.step('the empty Scripture editor shows the no-projects guidance', async () => {
    const editorId = await waitForOpenWebViewIdByType(mainPage, SCRIPTURE_EDITOR_SLOT_WEBVIEW_TYPE);
    const editor = new NoProjectEditorView(webViewFrame(mainPage, editorId));
    await expect(editor.guidance).toBeVisible({ timeout: EMPTY_STATE_TIMEOUT_MS });
    await expect(editor.noProjectSelected).toHaveCount(0);
  });

  await test.step('Home says there is nothing here', async () => {
    await sendPapiCommandWhenRegistered('platformGetResources.openHome');
    const homeId = await waitForOpenWebViewIdByType(mainPage, HOME_WEBVIEW_TYPE);
    await expect(homeNothingHere(webViewFrame(mainPage, homeId))).toBeVisible({
      timeout: EMPTY_STATE_TIMEOUT_MS,
    });
  });
});

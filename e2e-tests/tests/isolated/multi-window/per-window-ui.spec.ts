/**
 * Per-window UI isolation e2e tests.
 *
 * The multi-window architecture makes formerly app-singleton UI surfaces per-window by
 * construction: each window is a full renderer with its own OverlayHost, Toaster, toolbar, and
 * module state, web view iframes inherit their PARENT window's papi object, and the main process
 * routes generic dialog/notification/web-view requests to the focused window. Nothing pinned any of
 * that behaviour — this spec is the regression guard that does.
 *
 * One test, one Electron instance (each launch costs 30+ seconds, so the scenarios share two
 * windows), asserting in order:
 *
 * 1. Per-window navigation target: a window's toolbar BCV control enables only when THAT window holds
 *    a scripture-navigable web view — window 1 opening an editor must not enable window 2's
 *    control, and each window's control follows its own window's tabs.
 * 2. Web-view placement: opening an editor through the generic command lands in the FOCUSED window
 *    (its iframe attaches in that window's document and in no other).
 * 3. Overlays: a popover raised from INSIDE window 2's web view iframe (through the iframe's inherited
 *    papi) renders in window 2's document and nowhere else.
 * 4. Dialogs: a modal dialog requested through the generic `dialog:showDialog` renders in the focused
 *    window only, and dismissing it resolves the pending request.
 * 5. Scroll groups: deliberately app-global — one group's reference drives the toolbars of BOTH
 *    windows' tabs in that group, while a tab moved to another group does not move.
 * 6. Notification display routing: a notification sent through the generic service renders as a toast
 *    in the focused window, not in a minimized background window.
 * 7. Probe: a notification sent while the routing-target window is MINIMIZED (no window focused) —
 *    documents the observed behaviour (see the probe section comment) rather than assuming one.
 *
 * ## App configuration
 *
 * Same pre-configuration as the sibling multi-window specs (power mode, first-run complete,
 * English; `DEV_NOISY=false` gives window 1 the single-Home-tab layout and loads no test-only
 * extensions). Power mode is required for the toolbar's ScrollGroupSelector, which scenario 5
 * drives.
 *
 * ## How to run
 *
 * `npm run test:e2e:isolated multi-window`
 */
import type { Frame, Page } from '@playwright/test';
import WebSocket from 'ws';
import { test, expect } from '../../../fixtures/isolated.fixture';
import {
  preConfigureSettings,
  sendPapiRequestOnce,
  waitForAppReady,
  waitForAtLeastOneProjectMetadata,
  waitForPapiMethodRegistered,
} from '../../../fixtures/helpers';
import { openScriptureEditorForProject } from '../../../fixtures/scripture-editor-helpers';
import {
  DUPLICATE_REGISTRATION_PATTERN,
  FAULT_MARKERS,
  WEBSOCKET_PORT,
  captureAppOutput,
  createSecondWindow,
  createStepLogger,
  expectWindowDockEmpty,
  focusWindowAndWaitForRouting,
  getWindowIdOfPage,
  homeTabTitle,
  pollUntil,
  waitForRendererRegistered,
} from './multi-window.util';

/** Fixed GUID of the bundled sample WEB project (c-sharp/assets/WEB/Settings.xml <Guid>). */
const SAMPLE_WEB_PROJECT_ID = '32664dc3288a28df2e2bb75ded887fc8f17a15fb';

/**
 * The toolbar's book-chapter-verse control trigger (`platform-bible-toolbar.tsx` →
 * `BookChapterControl`). Rendered in every window's toolbar, ENABLED only while that window
 * resolves a navigation target — a scripture-navigable web view of its own. `page.locator` does not
 * reach into iframes, so this always addresses the window's own toolbar.
 */
const BCV_TRIGGER = 'button[aria-label="book-chapter-trigger"]';

/**
 * Matches a reference in the BCV trigger whichever label form the toolbar has room for.
 *
 * The trigger abbreviates the book to its three-letter id once the titlebar's content row drops
 * below its widest shrink step, so the same reference reads `Mark 4:2` or `MRK 4:2` depending on
 * the window's width AND on how much of it the platform reserves for caption buttons. Windows
 * created without an explicit size land near that boundary, so pinning either spelling would make
 * these tests fail on some platforms and pass on others for reasons that have nothing to do with
 * what they are testing — which is which window a scroll group drives, not how a label is worded.
 */
function referencePattern(bookName: string, bookId: string, chapterVerse: string): RegExp {
  return new RegExp(`(?:${bookName}|${bookId})\\s+${chapterVerse.replace(':', '\\s*:\\s*')}`);
}

const MARK_4_2 = referencePattern('Marks?', 'MRK', '4:2');
const JOHN_3_16 = referencePattern('John', 'JHN', '3:16');
const PSALMS_23_1 = referencePattern('Psalms?', 'PSA', '23:1');

/**
 * The toolbar's scroll-group selector trigger: a select trigger (`role="combobox"`) whose text is
 * the current group's single-letter label — which distinguishes it from the BCV trigger (the only
 * other combobox in the toolbar, and it carries an aria-label).
 */
function scrollGroupSelectorTrigger(page: Page) {
  return page
    .locator(`button[role="combobox"]:not([aria-label="book-chapter-trigger"])`)
    .filter({ hasText: /^[A-EØ]$/ })
    .first();
}

/** A rendered notification toast carrying the given message (`notification-display.tsx`). */
function toast(page: Page, message: string) {
  return page.locator('.notification-toast', { hasText: message });
}

/** Per-request timeout for one-shot PAPI calls in this spec. */
const PAPI_CALL_TIMEOUT_MS = 30_000;

/**
 * The live Frame of a web view iframe, for evaluating code inside it (frame locators cannot
 * evaluate).
 */
async function getWebViewFrame(page: Page, webViewId: string): Promise<Frame> {
  const iframeHandle = await page
    .locator(`iframe[data-web-view-id="${webViewId}"]`)
    .elementHandle({ timeout: 30_000 });
  const frame = await iframeHandle?.contentFrame();
  if (!frame) throw new Error(`Web view ${webViewId} has no content frame`);
  return frame;
}

/**
 * Raise a text popover from INSIDE a web view iframe through the papi object the iframe inherits
 * from its parent window. Returns the overlay id (the popover show call resolves immediately with
 * it). Because the inherited papi's overlay service is the parent WINDOW's module singleton, the
 * popover can only ever render in that window's document — which is the behaviour under test.
 */
async function raisePopoverFromWebView(frame: Frame, bodyText: string): Promise<string> {
  return frame.evaluate(async (text) => {
    // The web view prelude assigns the parent window's frozen papi object and this web view's id
    // onto the iframe's window; neither is part of the standard DOM typings.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const webViewWindow = window as unknown as {
      papi: {
        overlays: {
          showPopover(request: unknown, webViewId: string): Promise<string>;
          dismissPopover(overlayId: string): Promise<void>;
        };
      };
      webViewId: string;
    };
    return webViewWindow.papi.overlays.showPopover(
      { anchor: { x: 40, y: 40 }, content: { type: 'text', body: text } },
      webViewWindow.webViewId,
    );
  }, bodyText);
}

/** Dismiss a popover through the same inherited papi surface that raised it. */
async function dismissPopoverFromWebView(frame: Frame, overlayId: string): Promise<void> {
  await frame.evaluate(async (id) => {
    // See raisePopoverFromWebView for why this cast is needed.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const webViewWindow = window as unknown as {
      papi: { overlays: { dismissPopover(overlayId: string): Promise<void> } };
    };
    return webViewWindow.papi.overlays.dismissPopover(id);
  }, overlayId);
}

/**
 * Show a modal alert dialog through the GENERIC `dialog:showDialog` request — the name the main
 * process serves with a service router that forwards to the focused window. The returned promise
 * stays pending until the user answers or dismisses the dialog (the request is registered with its
 * timeout disabled), so callers must NOT await it until after driving the dialog; it resolves
 * `null` when the dialog is dismissed without an answer.
 */
function showModalAlertViaWebSocket(prompt: string): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(`ws://localhost:${WEBSOCKET_PORT}`);
    const timeout = setTimeout(() => {
      ws.close();
      reject(new Error('showDialog("platform.alert") timed out after 60 s'));
    }, 60_000);

    ws.on('open', () => {
      ws.send(
        JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'dialog:showDialog',
          params: ['platform.alert', { title: 'Per-window e2e', prompt, isModal: true }],
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
      if (parsed.id !== 1) return; // ignore unsolicited messages
      clearTimeout(timeout);
      ws.close();
      if (parsed.error) reject(new Error(`PAPI error: ${JSON.stringify(parsed.error)}`));
      else resolve(parsed.result);
    });

    ws.on('error', (err) => {
      clearTimeout(timeout);
      reject(err);
    });
  });
}

/**
 * Send a notification through the GENERIC notification service — the name the main process serves
 * with a service router that forwards `send` to the focused window. `duration: 0` means the toast
 * never auto-closes, so assertions cannot race an auto-dismiss; tests dismiss explicitly.
 */
async function sendNotification(message: string): Promise<string | number> {
  return sendPapiRequestOnce<string | number>(
    'object:NotificationService.send',
    [{ message, severity: 'info', duration: 0 }],
    WEBSOCKET_PORT,
    PAPI_CALL_TIMEOUT_MS,
  );
}

/** Dismiss a notification by id. The service fans dismissal out to every window. */
async function dismissNotification(notificationId: string | number): Promise<void> {
  await sendPapiRequestOnce(
    'object:NotificationService.dismiss',
    [notificationId],
    WEBSOCKET_PORT,
    PAPI_CALL_TIMEOUT_MS,
  );
}

/** Navigate a scroll group to a verse reference through the app-global scroll group service. */
async function setScrollGroupRef(
  scrollGroupId: number,
  scrRef: { book: string; chapterNum: number; verseNum: number },
): Promise<void> {
  await sendPapiRequestOnce(
    'object:ScrollGroupService.setScrRef',
    [scrollGroupId, scrRef],
    WEBSOCKET_PORT,
    PAPI_CALL_TIMEOUT_MS,
  );
}

test.use({
  // Same launch shape as the sibling multi-window specs — see multi-window.spec.ts's test.use
  // comment for the full rationale.
  electronLaunchOptions: { isolatedProjectRoot: true, envOverrides: { DEV_NOISY: 'false' } },
});

test.describe('per-window UI isolation', () => {
  // One launch (up to ~180 s worst case) plus a second window and a dozen quick scenarios.
  test.setTimeout(420_000);

  let restoreSettings: (() => void) | undefined;

  test.beforeAll(() => {
    restoreSettings = preConfigureSettings({
      'platform.firstRunComplete': true,
      'platform.interfaceLanguage': ['en'],
      'platform.interfaceMode': 'power',
    });
  });

  test.afterAll(() => {
    restoreSettings?.();
  });

  test('overlays, dialogs, notifications, and navigation targets stay in their own window', async ({
    electronApp,
    mainPage,
  }) => {
    const logStep = createStepLogger('per-window-ui');
    const output = captureAppOutput(electronApp);
    await waitForAppReady(mainPage, 180_000);
    const window1Id = getWindowIdOfPage(mainPage);
    await expect(homeTabTitle(mainPage, window1Id)).toBeAttached({ timeout: 60_000 });
    logStep(`window ${window1Id} ready`);

    // ── Navigation target, baseline ────────────────────────────────────────────────────────────
    // The Home web view is not scripture-navigable (no projectId, no toolbar of its own), so a
    // window holding only Home resolves no navigation target and its BCV control is disabled.
    await expect(mainPage.locator(BCV_TRIGGER).first()).toBeDisabled();

    const page2 = await createSecondWindow(electronApp);
    const window2Id = getWindowIdOfPage(page2);
    await waitForRendererRegistered(window2Id, 120_000);
    // The empty dock is scenario groundwork here (window 2 must have no navigable tab of its own);
    // the empty-start behaviour itself is locked by multi-window.spec.ts.
    await expectWindowDockEmpty(page2);
    await expect(page2.locator(BCV_TRIGGER).first()).toBeDisabled();
    logStep(`window ${window2Id} up; both BCV controls disabled with no navigable tabs anywhere`);

    // ── Navigation target follows only the OWN window's tabs ───────────────────────────────────
    // Open an editor in window 1 (the generic web-view command routes to the focused window).
    await waitForAtLeastOneProjectMetadata(WEBSOCKET_PORT, 60_000);
    await focusWindowAndWaitForRouting(electronApp, window1Id);
    const editorId1 = await openScriptureEditorForProject(mainPage, SAMPLE_WEB_PROJECT_ID);
    // Placement proof: the new editor's iframe attached in window 1 (the helper waits for it
    // there and would have exhausted its retries otherwise — a fresh web view keeps its raw id,
    // so the same id cannot legitimately exist anywhere else) and is NOT in window 2.
    await expect(page2.locator(`iframe[data-web-view-id="${editorId1}"]`)).toHaveCount(0);
    // Window 1 now resolves its own editor as the navigation target…
    await expect(mainPage.locator(BCV_TRIGGER).first()).toBeEnabled({ timeout: 30_000 });
    // …and window 2 must NOT: its fallback searches only its own (empty) dock. The settle gives a
    // wrongly cross-window-reaching resolution time to flip the control before the assertion.
    await new Promise<void>((resolve) => {
      setTimeout(resolve, 2_000);
    });
    await expect(page2.locator(BCV_TRIGGER).first()).toBeDisabled();
    logStep('window 1 editor enabled only window 1 BCV control');

    // ── Web-view placement routes to the focused window ────────────────────────────────────────
    await focusWindowAndWaitForRouting(electronApp, window2Id);
    const editorId2 = await openScriptureEditorForProject(page2, SAMPLE_WEB_PROJECT_ID, {
      // Window 2 is an empty secondary window: it has no initial iframe for the helper's
      // loadLayout-race guard to wait on, and the empty-dock probe above already proved its
      // initial layout finished loading.
      skipInitialLayoutGuard: true,
    });
    // Placement proof, mirror-image of window 1's: the iframe attached in window 2 (enforced by
    // the helper) and did NOT land in window 1.
    await expect(mainPage.locator(`iframe[data-web-view-id="${editorId2}"]`)).toHaveCount(0);
    await expect(page2.locator(BCV_TRIGGER).first()).toBeEnabled({ timeout: 30_000 });
    logStep(`window ${window2Id} received its own editor and enabled its BCV control`);

    // ── Overlay raised from window 2's WEB VIEW renders only in window 2 ───────────────────────
    // The iframe's papi object IS the parent window's, so the popover lands in that window's
    // overlay store and document. A regression to a shared overlay surface (or iframes reaching a
    // different window's papi) would render it in window 1 — asserted absent there.
    const popoverText = `per-window overlay probe ${window2Id}`;
    const editorFrame2 = await getWebViewFrame(page2, editorId2);
    const overlayId = await raisePopoverFromWebView(editorFrame2, popoverText);
    const popover2 = page2.locator('[data-overlay-popover]');
    await expect(popover2).toBeVisible({ timeout: 15_000 });
    await expect(popover2).toContainText(popoverText);
    await expect(mainPage.locator('[data-overlay-popover]')).toHaveCount(0);
    await dismissPopoverFromWebView(editorFrame2, overlayId);
    await expect(popover2).toHaveCount(0, { timeout: 15_000 });
    logStep('popover from window 2 web view rendered in window 2 only');

    // ── Modal dialog through the generic request lands in the FOCUSED window ───────────────────
    // Window 2 still holds focus. The pending request resolves only when the dialog is answered
    // or dismissed, so it is held un-awaited while the DOM assertions run.
    await waitForPapiMethodRegistered(
      new RegExp(`^dialog:showDialog-${window2Id}$`),
      WEBSOCKET_PORT,
      60_000,
    );
    const dialogPrompt = 'per-window dialog probe';
    const dialogResponsePromise = showModalAlertViaWebSocket(dialogPrompt);
    const dialog2 = page2.locator('[data-overlay-modal-dialog]');
    await expect(dialog2).toBeVisible({ timeout: 30_000 });
    await expect(dialog2).toContainText(dialogPrompt);
    await expect(mainPage.locator('[data-overlay-modal-dialog]')).toHaveCount(0);
    // Escape dismisses the modal, which must resolve the pending request with null (no answer).
    await page2.keyboard.press('Escape');
    expect(await dialogResponsePromise).toBeNull();
    await expect(dialog2).toHaveCount(0, { timeout: 15_000 });
    logStep('generic showDialog rendered in the focused window and resolved null on Escape');

    // ── Scroll groups are app-global BY DESIGN, and per-tab group membership isolates ──────────
    // Both editors start in scroll group A, so one group-A navigation must move BOTH windows'
    // toolbars — the deliberate cross-window sharing. Then window 2's tab moves to group C via
    // ITS OWN toolbar selector (which must act on window 2's tab, not window 1's), after which
    // group A navigation moves window 1 only and group C navigation moves window 2 only.
    await setScrollGroupRef(0, { book: 'MRK', chapterNum: 4, verseNum: 2 });
    await expect(mainPage.locator(BCV_TRIGGER).first()).toContainText(MARK_4_2, {
      timeout: 15_000,
    });
    await expect(page2.locator(BCV_TRIGGER).first()).toContainText(MARK_4_2, {
      timeout: 15_000,
    });
    logStep('group A navigation drove both windows (both tabs in group A)');

    await scrollGroupSelectorTrigger(page2).click();
    await page2.getByRole('option', { name: 'C', exact: true }).click();
    // The C selection acted on window 2's own tab: its toolbar now shows group C's reference.
    const window2GroupCRefText = (await page2.locator(BCV_TRIGGER).first().textContent()) ?? '';
    expect(window2GroupCRefText).not.toBe('');

    await setScrollGroupRef(0, { book: 'JHN', chapterNum: 3, verseNum: 16 });
    await expect(mainPage.locator(BCV_TRIGGER).first()).toContainText(JOHN_3_16, {
      timeout: 15_000,
    });
    // Window 2's tab is in group C now — the group A move must not touch it. (Had the selector
    // wrongly acted on window 1's tab instead, the toolbars would move the other way around: the
    // group A navigation would leave window 1 still and the group C one would move it.) Matched
    // against both label forms deliberately: pinning only the spelled-out one would make this pass
    // whenever the toolbar abbreviates, which is the width where a real regression would hide.
    await expect(page2.locator(BCV_TRIGGER).first()).not.toContainText(JOHN_3_16);
    await expect(page2.locator(BCV_TRIGGER).first()).toContainText(window2GroupCRefText.trim());

    await setScrollGroupRef(2, { book: 'PSA', chapterNum: 23, verseNum: 1 });
    await expect(page2.locator(BCV_TRIGGER).first()).toContainText(PSALMS_23_1, {
      timeout: 15_000,
    });
    await expect(mainPage.locator(BCV_TRIGGER).first()).toContainText(JOHN_3_16);
    logStep('after moving window 2 to group C: A drove window 1 only, C drove window 2 only');

    // ── Notification routing: toast renders in the focused window, not a minimized one ─────────
    // focusWindowAndWaitForRouting minimizes the other windows, so this is exactly the case under
    // test: window 2 focused, window 1 minimized in the background.
    await focusWindowAndWaitForRouting(electronApp, window2Id);
    await waitForPapiMethodRegistered(
      new RegExp(`^object:NotificationService-${window2Id}\\.send$`),
      WEBSOCKET_PORT,
      60_000,
    );
    // Record (not assert) whether the compositor honored window 1's minimize: WSLg does not
    // reliably reflect a programmatic minimize in isMinimized(), and the behaviour under test —
    // the notification following FOCUS, which the routing wait above pinned deterministically —
    // does not depend on the compositor cooperating with the set dressing.
    const window1Minimized = await electronApp.evaluate(
      ({ BrowserWindow }, id) => BrowserWindow.fromId(id)?.isMinimized(),
      window1Id,
    );
    logStep(
      `window ${window1Id} minimize requested; compositor reports minimized=${String(window1Minimized)}`,
    );
    const focusedToastText = 'per-window notification probe (focused)';
    const focusedToastId = await sendNotification(focusedToastText);
    await expect(toast(page2, focusedToastText)).toBeVisible({ timeout: 15_000 });
    await expect(toast(mainPage, focusedToastText)).toHaveCount(0);
    await dismissNotification(focusedToastId);
    await expect(toast(page2, focusedToastText)).toHaveCount(0, { timeout: 15_000 });
    logStep('notification rendered in the focused window only');

    // ── Probe: notification while the routing-target window is minimized ───────────────────────
    // Both windows minimized, none focused — the one edge the architecture audit could not settle
    // from code alone. Observed behaviour (documented, not assumed): the main process keeps
    // routing to the last-focused window (minimizing does not clear focus tracking), whose
    // renderer keeps running while minimized — so `send` resolves, the toast renders in that
    // window's (hidden) document, and it is simply visible when the window is restored. That
    // matches single-window behaviour: a notification sent while the app is minimized shows when
    // the user brings the app back up, and none of it is lost or stuck.
    await electronApp.evaluate(({ BrowserWindow }, id) => {
      const win = BrowserWindow.fromId(id);
      if (!win) throw new Error(`No BrowserWindow with id ${id}`);
      win.minimize();
    }, window2Id);
    const probeToastText = 'per-window notification probe (minimized)';
    // The send must not hang or reject with every window minimized.
    const probeToastId = await sendNotification(probeToastText);
    expect(probeToastId).toBeTruthy();
    // Discover where the toast went: it must exist in SOME window's document even while hidden.
    const probeLandedInPage2 = await pollUntil(
      async () => ({
        inWindow1: await toast(mainPage, probeToastText).count(),
        inWindow2: await toast(page2, probeToastText).count(),
      }),
      (counts) => counts.inWindow1 + counts.inWindow2 > 0,
      20_000,
      'the minimized-target notification toast to render in some window',
    ).then((counts) => counts.inWindow2 > 0);
    // Restore the window that got it and confirm the toast is genuinely visible to the user now.
    const probePage = probeLandedInPage2 ? page2 : mainPage;
    await focusWindowAndWaitForRouting(electronApp, probeLandedInPage2 ? window2Id : window1Id);
    await expect(toast(probePage, probeToastText)).toBeVisible({ timeout: 15_000 });
    logStep(
      `probe: toast rendered in ${probeLandedInPage2 ? 'window 2 (the minimized last-focused window)' : 'window 1'} and is visible after restore`,
    );
    await dismissNotification(probeToastId);

    // ── No faults or cross-window registration collisions anywhere in the exercised flows ──────
    const wholeLog = output.text();
    FAULT_MARKERS.forEach((marker) => expect(wholeLog).not.toContain(marker));
    expect(wholeLog).not.toMatch(DUPLICATE_REGISTRATION_PATTERN);
  });
});

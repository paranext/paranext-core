/**
 * === NEW IN PT10 === Reason: CDP-based Playwright fixture for running E2E tests against an
 * already-running Platform.Bible instance with remote debugging enabled.
 *
 * Uses `connectOverCDP` (port 9223) instead of `_electron.launch()`, so:
 *
 * - No app restart needed (no port 8876 conflict)
 * - Tests run against the same app instance used during development
 * - No teardown/shutdown of the app on completion
 *
 * ## Viewport / Screenshot Dimension Enforcement
 *
 * Two separate concerns, deliberately kept apart:
 *
 * - **Layout** is decided by the window size the spec declares with `test.use({ windowSize })`,
 *   asserted here against the real OS window. The fixture cannot resize a window it did not create,
 *   so it requires the app to have been started at that size.
 * - **Evidence quality** is enforced where screenshots are written, by the `page.screenshot` wrapper
 *   below. Note this floor is a fixed Full HD minimum, so a spec that writes evidence screenshots
 *   must declare `windowSize: { width: 1920, height: 1080 }` — the fixture no longer emulates a
 *   viewport that would satisfy it regardless of the real window.
 *
 * Two failure modes have been observed in the past and are defended against:
 *
 * 1. **Small renderer window** — Electron defaults to a 1024x728 window which yields a ~675x728 usable
 *    viewport; screenshots at that size hide most of the UI and produce reviews-by-vibes.
 * 2. **DevTools panel open** — when DevTools is docked-bottom or docked-right, the renderer area
 *    shrinks to the remaining sliver (~300x768 typical), producing useless screenshots that pass
 *    `toBeVisible` checks but are visually unreviewable. Note the window-size assertion does NOT
 *    catch this: `outerWidth` is unchanged by a docked panel. It is handled by launching with
 *    `PT_NO_DEVTOOLS=true`, which `.erb/scripts/refresh.sh` and the launch fixtures now do.
 *
 * Mitigations applied here:
 *
 * - The fixture explicitly excludes `devtools://` URLs when finding the renderer page (so connecting
 *   to a DevTools page is impossible).
 * - The fixture asserts the real OS window is at least the size the spec declared with `test.use({
 *   windowSize })`, reading `window.outerWidth`/`outerHeight`. It deliberately does NOT call
 *   `setViewportSize()`: on a CDP-attached page that applies an emulation override which sets
 *   `innerWidth` itself, so an inner-based check reads back its own request and can never fail.
 *   Note this size check covers the small-window case only — `outerWidth` is unchanged by a docked
 *   DevTools panel, so the squeezed-renderer case is handled by launching with PT_NO_DEVTOOLS
 *   instead (see `.erb/scripts/refresh.sh` and `helpers.ts`).
 * - The fixture wraps `page.screenshot` to auto-validate PNG dimensions against the Full HD minimum
 *   the moment the file lands on disk. Tests do NOT need to call `assertFullHdScreenshot` manually
 *   — it runs automatically for every `screenshot({ path })` whose path is OUTSIDE Playwright's
 *   `test-results/` output directory (failure-capture screenshots that Playwright takes via
 *   `screenshot: 'only-on-failure'` are intentionally exempted so the dimension assertion never
 *   masks the real failure cause).
 * - The exported `assertFullHdScreenshot(path)` helper remains available for ad-hoc validation of
 *   PNGs written outside the fixture (e.g. from the visual-verification skill or from CI artifact
 *   checks). Inside the fixture's `screenshot()` calls, it is already automatic.
 *
 * Prerequisite: Platform.Bible running with --remote-debugging-port=9223
 */
import {
  test as base,
  chromium,
  expect as baseExpect,
  Page,
  PageScreenshotOptions,
} from '@playwright/test';
import * as fs from 'fs';
import {
  assertDeclaredWindowSize,
  assertInterfaceMode,
  DEFAULT_WINDOW_SIZE,
  RequiredInterfaceMode,
  WindowSize,
} from './helpers';

export { expect } from '@playwright/test';

const CDP_URL = process.env.CDP_URL || 'http://127.0.0.1:9223';

/**
 * Minimum acceptable screenshot dimensions for UI evidence captures. Aligns with `pw-server.mjs`
 * viewport defaults (1920x1080 — Full HD).
 *
 * Override per-suite via PW_VIEWPORT_WIDTH / PW_VIEWPORT_HEIGHT environment variables (same names
 * the visual-verification skill uses).
 */
export const MIN_SCREENSHOT_WIDTH = parseInt(process.env.PW_VIEWPORT_WIDTH || '', 10) || 1920;
export const MIN_SCREENSHOT_HEIGHT = parseInt(process.env.PW_VIEWPORT_HEIGHT || '', 10) || 1080;

/**
 * Read PNG header bytes and return `{ width, height }`. PNG header layout:
 *
 * - Bytes 0-7: PNG signature (`89 50 4E 47 0D 0A 1A 0A`)
 * - Bytes 8-11: IHDR chunk length (always 13)
 * - Bytes 12-15: chunk type "IHDR"
 * - Bytes 16-19: width (BE uint32)
 * - Bytes 20-23: height (BE uint32)
 *
 * No third-party image library required.
 */
function readPngDimensions(filePath: string): { width: number; height: number } {
  const buffer = fs.readFileSync(filePath);
  if (buffer.length < 24) throw new Error(`File too small to be a PNG: ${filePath}`);
  const sig = buffer.slice(0, 8);
  const expectedSig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  if (!sig.equals(expectedSig)) throw new Error(`Not a PNG file: ${filePath}`);
  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  };
}

/**
 * Assert that a screenshot file on disk is at least Full HD (1920x1080). Smaller dimensions FAIL
 * the assertion regardless of UI content — this defends against reviews-by-vibes when
 * DevTools-shrunk or default-window-sized screenshots slip into the evidence directory.
 *
 * Inside the fixture, the wrapped `page.screenshot()` calls this automatically for every
 * evidence-path screenshot. Use this helper directly only for PNGs written **outside** the fixture
 * (e.g. from the `visual-verification` skill, post-test CI artifact validators, or other tooling
 * that produces PNGs without going through `mainPage.screenshot()`).
 *
 * @example
 *
 * ```ts
 * import { assertFullHdScreenshot } from './fixtures/cdp.fixture';
 *
 * // Validating a PNG produced outside the cdp.fixture page.screenshot() wrapper:
 * assertFullHdScreenshot('/path/to/external-tool-output.png');
 * ```
 */
export function assertFullHdScreenshot(filePath: string): void {
  const { width, height } = readPngDimensions(filePath);
  baseExpect(
    width,
    `Screenshot ${filePath} width ${width}px is below the ${MIN_SCREENSHOT_WIDTH}px minimum. ` +
      `Likely cause: the renderer window is smaller than 1920x1080 OR DevTools is docked, ` +
      `cropping the renderer area. Resize the Electron window OR close DevTools and re-run. ` +
      `Tiny screenshots always FAIL — no matter how nice the partial UI looks.`,
  ).toBeGreaterThanOrEqual(MIN_SCREENSHOT_WIDTH);
  baseExpect(
    height,
    `Screenshot ${filePath} height ${height}px is below the ${MIN_SCREENSHOT_HEIGHT}px minimum. ` +
      `Likely cause: the renderer window is smaller than 1920x1080 OR DevTools is docked. ` +
      `Resize the Electron window OR close DevTools and re-run. Tiny screenshots always FAIL.`,
  ).toBeGreaterThanOrEqual(MIN_SCREENSHOT_HEIGHT);
}

/**
 * Decide whether a screenshot path should be dimension-validated. Returns `false` when the path is
 * inside Playwright's test-output directory (`test-results/`, `playwright-report/`) — those are
 * diagnostic captures from the test runner (e.g. `screenshot: 'only-on-failure'`) which we do NOT
 * want to fail on a dimension mismatch (that would mask the real failure cause). Every other path —
 * relative or absolute, in `proofs/`, `/tmp/`, or anywhere else a caller chose — IS validated.
 */
function shouldValidateScreenshotPath(path: string): boolean {
  // Normalise separators so the same check works on Windows + POSIX.
  const normalised = path.replace(/\\/g, '/');
  if (normalised.includes('/test-results/')) return false;
  if (normalised.includes('/playwright-report/')) return false;
  return true;
}

export interface CdpFixtures {
  mainPage: Page;
  /**
   * Window size this suite's layout is written against; set with `test.use({ windowSize: { width,
   * height } })`. Defaults to {@link DEFAULT_WINDOW_SIZE}.
   *
   * Attach mode cannot resize the window — it has no main-process channel — so this is asserted
   * rather than applied. Start the app at the declared size.
   */
  windowSize: WindowSize;
  /**
   * Interface mode this suite's layout is written against; set with `test.use({
   * requiredInterfaceMode: 'simple' })`. Leave unset when the spec genuinely works in either mode.
   *
   * Asserted, not applied, for the same reason as {@link CdpFixtures.windowSize}: attach mode
   * inherits the mode from the app you started. Declaring it converts a late, confusing timeout on
   * an element the wrong mode never renders into an immediate, readable setup error.
   */
  requiredInterfaceMode: RequiredInterfaceMode | undefined;
}

export const test = base.extend<CdpFixtures>({
  windowSize: [DEFAULT_WINDOW_SIZE, { option: true }],
  requiredInterfaceMode: [undefined, { option: true }],
  mainPage: async ({ windowSize, requiredInterfaceMode }, use) => {
    let browser;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        // intentional retry loop
        // eslint-disable-next-line no-await-in-loop
        browser = await chromium.connectOverCDP(CDP_URL, { timeout: 30_000 });
        break;
      } catch (err) {
        if (attempt === 3) throw err;
        // intentional retry delay
        // eslint-disable-next-line no-await-in-loop
        await new Promise<void>((resolve) => {
          setTimeout(resolve, 2_000);
        });
      }
    }
    if (!browser) throw new Error('Failed to connect to CDP after 3 attempts');

    // Find the renderer page (not devtools) — same logic as pw-server.mjs.
    // Filter out `devtools://` AND prefer `localhost:1212` (renderer dev server) over generic
    // `localhost` matches so we never end up on a non-renderer localhost page.
    const allPages = browser.contexts().flatMap((ctx) => ctx.pages());
    let page: Page | undefined = allPages.find((p) => {
      const url = p.url();
      return url.includes('localhost:1212') && !url.includes('devtools://');
    });

    // Secondary preference: any localhost / index.html / file:// renderer
    if (!page) {
      page = allPages.find((p) => {
        const url = p.url();
        return (
          (url.includes('localhost') || url.includes('index.html') || url.startsWith('file://')) &&
          !url.includes('devtools://')
        );
      });
    }

    // Final fallback: any non-devtools page
    if (!page) {
      page = allPages.find((p) => !p.url().includes('devtools://'));
    }

    if (!page) throw new Error('No renderer page found via CDP');

    // Assert the window matches what the spec declared, instead of emulating a viewport on top
    // of it. `setViewportSize()` here applies a CDP emulation override: layout is computed at the
    // requested size inside a window that is still whatever size it was, and `innerWidth` reports
    // the requested value, so nothing can detect the mismatch. Measured: a 1024px-wide window
    // reports `innerWidth` 469 before such a call and 1280 after, while `outerWidth` stays 1024.
    // Attach mode has no main-process channel and so cannot genuinely resize the window — the
    // honest move is to require the app to have been started at the size the spec needs.
    //
    // Screenshot quality is NOT enforced here. It is enforced where screenshots are written, by
    // the `page.screenshot` wrapper below calling `assertFullHdScreenshot`. Keeping the two apart
    // is deliberate: window size decides layout, and a spec needing Full HD evidence declares it
    // with `test.use({ windowSize: { width: 1920, height: 1080 } })`.
    await assertDeclaredWindowSize(
      page,
      windowSize,
      `Start the app at that size, e.g. MAIN_ARGS="--remote-debugging-port=9223 --window-size ` +
        `${windowSize.width}x${windowSize.height}" npm start — or just ./.erb/scripts/refresh.sh, ` +
        `which does exactly that. --maximize is a no-op under a bare Xvfb, since nothing is there to ` +
        `honour it, and the size must be its own argv token: --window-size=WxH never matches, ` +
        `because the flag is looked up by exact token (src/node/utils/command-line.util.ts:104).`,
    );

    // Assert the interface mode BEFORE the screenshot wrapper is installed, so a mode mismatch
    // reports itself rather than surfacing later as a timeout on an element the running mode never
    // renders. Only checked when the spec declared one — plenty of specs work in either mode.
    if (requiredInterfaceMode) await assertInterfaceMode(page, requiredInterfaceMode);

    // AUTO-VALIDATE screenshot dimensions. Wrap `page.screenshot` so every screenshot taken via
    // the fixture is validated against the Full HD minimum the moment the file lands on disk.
    // Tests can no longer accidentally produce tiny screenshots — they FAIL fast at the call site
    // with a precise dimension report. This enforces "small screenshots are failures, no matter
    // how nice the UI looks" without requiring per-test assertion calls.
    //
    // Two important exemptions:
    //
    //   (1) Screenshots without a `path` (returned-buffer screenshots — typically used for inline
    //       diff snapshots, not evidence) are not file-system-validated.
    //   (2) Playwright's `screenshot: 'only-on-failure'` test-runner feature uses the public
    //       `page.screenshot()` API, which our wrapper would otherwise intercept. Failure-capture
    //       screenshots are diagnostic, not evidence — and if a test failure happens BEFORE the
    //       fixture's viewport-set completes, the failure-capture would be small and our assertion
    //       would mask the real failure cause. We therefore skip the dimension assertion when the
    //       path falls inside Playwright's `test-results/` output directory (the configured
    //       outputDir in `playwright-cdp.config.ts`). Evidence screenshots all live in `proofs/`
    //       OR another caller-chosen path, so this exemption only catches Playwright's internal
    //       failure captures.
    //
    // Implementation note: Playwright's `Page.screenshot` overloads (with-options vs no-args, with
    // and without `path`) make a fully-typed wrapper noisy. We reuse Playwright's exported
    // `PageScreenshotOptions` type so the wrapper retains the public signature with no `any`
    // casts.
    const originalScreenshot = page.screenshot.bind(page);
    page.screenshot = async function patchedScreenshot(
      options?: PageScreenshotOptions,
    ): Promise<Buffer> {
      const result = await originalScreenshot(options);
      if (
        options &&
        typeof options.path === 'string' &&
        shouldValidateScreenshotPath(options.path)
      ) {
        assertFullHdScreenshot(options.path);
      }
      return result;
    };

    await use(page);
    // When connected via connectOverCDP (vs launching), browser.close() only
    // disconnects the CDP session without terminating the app. This frees the
    // CDP connection slot so subsequent tests can connect.
    try {
      await browser.close();
    } catch {
      // Ignore disconnect errors during cleanup
    }
  },
});

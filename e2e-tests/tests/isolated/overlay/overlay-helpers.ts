import { Frame, Page } from '@playwright/test';
import {
  attemptRecovery,
  PAPI_METHOD_REGISTRATION_TIMEOUT_MS,
  singleAttemptBudgetMs,
  waitForPapiMethodRegistered,
} from '../../../fixtures/helpers';

/**
 * Find the Hello Rock3 WebView frame by activating its dock tab and searching child frames for
 * hello-rock3-specific content.
 *
 * Requires DEV_NOISY=true so that the helloRock3 test extension is loaded.
 *
 * @returns The Frame object for the hello-rock3 iframe, usable for interactions inside the WebView.
 */
export async function findHelloRock3Frame(page: Page): Promise<Frame> {
  // Wait for helloRock3 to finish activating before looking for its tab.
  // helloRock3.openProject is registered near the end of activate(), just before openWebView
  // calls. Waiting for it ensures the extension has started opening webviews.
  await waitForPapiMethodRegistered(
    'command:helloRock3.openProject',
    8876,
    PAPI_METHOD_REGISTRATION_TIMEOUT_MS,
  );

  // Wait for the Hello Rock3 tab to appear in the dock layout and activate it.
  const tab = page.locator('.dock-tab', { hasText: /Hello Rock3/i });
  await tab.first().waitFor({ state: 'visible', timeout: 30_000 });
  await tab.first().click();

  // Poll child frames until we find one with hello-rock3 content that is actually VISIBLE.
  // The hello-rock3 WebView renders a .title div containing "Hello Rock3" (or the unresolved
  // localization key "%helloRock3_helloRock3%").
  //
  // Visibility is part of the match, not an afterthought. rc-dock keeps inactive tab panes mounted
  // but hidden with `display: none`, so a frame in a background pane still exists, still answers
  // queries, and still reports its elements — as hidden, with a zero-sized box. Returning one of
  // those looks like success here and fails in the caller ten seconds later on an assertion about
  // some button being hidden, which says nothing about the real problem. Requiring the match to be
  // visible keeps the failure here, where the message can name it.
  // Activation has to be RE-asserted, not just requested once. helloRock3 opens three web views
  // into this stack (`helloRock3.html`, the React one, and `helloRock3.react2`), and the command
  // this function waits for is registered just BEFORE those calls — so the click above can land
  // while later web views are still arriving, and one of them takes the stack's active tab with it.
  // Clicking once and then polling passively can never recover from that, because nothing clicks
  // again.
  let sawHiddenMatch = false;
  let lastRecoveryError: Error | undefined;
  let reclicks = 0;
  const deadline = Date.now() + 30_000;
  while (Date.now() < deadline) {
    // Polling loop: each iteration depends on the previous result, so awaits must be sequential
    // eslint-disable-next-line no-await-in-loop
    const match = await page
      .frames()
      .filter((f) => f !== page.mainFrame())
      .reduce<Promise<Frame | 'hidden' | undefined>>(async (accPromise, frame) => {
        const acc = await accPromise;
        // Only a real Frame short-circuits the scan. A 'hidden' result must NOT: a later frame in
        // the list may still be the visible one, and stopping here would report the whole scan as
        // hidden because of an earlier background copy.
        if (acc && acc !== 'hidden') return acc;
        try {
          const titleEl = frame.locator('.title');
          const count = await titleEl.count();
          if (count > 0) {
            const text = await titleEl.first().textContent();
            if (text && (text.includes('Hello Rock3') || text.includes('helloRock3'))) {
              if (await titleEl.first().isVisible()) return frame;
              // Right web view, wrong state: its dock pane is not the active one. Reported rather
              // than assigned to the outer flag, so this closure stays free of loop state.
              return 'hidden';
            }
          }
        } catch {
          // Frame may not be ready yet
        }
        // Carry any earlier 'hidden' forward so it survives frames that do not match at all.
        return acc;
      }, Promise.resolve(undefined));

    if (match === 'hidden') sawHiddenMatch = true;
    else if (match) {
      if (reclicks > 0) {
        console.log(
          `[findHelloRock3Frame] Hello Rock3 pane became active after ${reclicks} re-click(s).`,
        );
      }
      return match;
    }

    // The right web view is there but its pane is not the active one, so re-assert the click. A
    // later-arriving sibling steals activation at most once per web view it opens, so this
    // converges rather than fighting anything indefinitely.
    if (match === 'hidden') {
      // Logged because a silent recovery is indistinguishable from the race never happening. Without
      // this, a green run cannot tell you whether re-clicking fixed anything — only that nothing
      // failed — so the line is what makes one run enough to answer that.
      reclicks += 1;
      const attemptNumber = reclicks;
      console.log(
        `[findHelloRock3Frame] Hello Rock3 pane was not active; re-clicking its tab (attempt ${attemptNumber}).`,
      );
      // Polling loop: the re-click must finish before the next read, or the read would race it.
      // The explicit timeout leaves the deadline to the loop, scaled to what is actually left of
      // it rather than a fixed guess — a click attempted late still gets a sane minimum, and one
      // attempted early does not claim more of the budget than a single attempt needs. Without an
      // explicit timeout the click inherits Playwright's 30s default, which is this loop's whole
      // budget — so an intercepted click throws its own generic timeout instead of letting the
      // message below name interception as the likely cause. `use: { actionTimeout }` would not
      // help: it is applied in `browser.newContext`, which an Electron launch never goes through.
      //
      // Tolerated, not propagated: the click itself can be intercepted by the same instability
      // this loop is polling through, which Playwright reports as a timeout. A genuinely different
      // failure still propagates — only the expected kind is absorbed here, into the
      // sawHiddenMatch-aware diagnostic below (as its cause) once the deadline is actually reached.
      // eslint-disable-next-line no-await-in-loop
      lastRecoveryError = await attemptRecovery(
        () => tab.first().click({ timeout: singleAttemptBudgetMs(deadline - Date.now()) }),
        (error) =>
          console.log(
            `[findHelloRock3Frame] Re-click attempt ${attemptNumber} was itself intercepted: ${error}. Continuing to poll.`,
          ),
      );
    }

    // Polling loop: wait between attempts must be sequential
    // eslint-disable-next-line no-await-in-loop
    await page.waitForTimeout(500);
  }

  throw new Error(
    sawHiddenMatch
      ? 'Hello Rock3 WebView frame was found but stayed HIDDEN for 30s: its dock pane never became ' +
        'the active one, so everything inside it reports as hidden with a zero-sized box. The tab ' +
        'click above did not take effect — most likely it was intercepted by an overlapping ' +
        'element, or another tab in the same stack was activated afterwards.'
      : 'Hello Rock3 WebView frame not found within 30s. ' +
        'Ensure DEV_NOISY=true is set so the helloRock3 test extension loads.',
    // Only the sawHiddenMatch branch ever attempts a recovery click, so this is the last
    // interception it hit, if any — the concrete evidence behind "most likely intercepted" above.
    lastRecoveryError ? { cause: lastRecoveryError } : undefined,
  );
}

/**
 * The default person name from the helloRock3 settings contribution (`settings.json`). The
 * `useSetting('helloRock3.personName', ...)` hook resolves to this contributed default on a fresh
 * install.
 */
export const DEFAULT_PERSON_NAME = 'Bill';

/**
 * Records the notification toasts the app raises, so a spec can assert one appeared without having
 * to catch it on screen.
 */
import { expect, type ConsoleMessage, type Page } from '@playwright/test';
import { sendPapiRequestOnce } from './helpers';

/**
 * The toast recorder installed into the app window by {@link installToastProbe}. Declared on
 * `Window` rather than reached for with a type assertion, since the page-side callbacks below run
 * in the renderer and cannot import anything.
 */
interface ToastProbe {
  /** Every toast text recorded since installation or the last {@link ToastProbe.clear}. */
  texts: () => string[];
  /**
   * Forget the toasts recorded so far, and record none of the toasts on screen now unless its text
   * changes.
   */
  clear: () => void;
}

declare global {
  interface Window {
    toastProbe?: ToastProbe;
  }
}

/**
 * The line the renderer's notification service logs for every notification it is sent, whether it
 * opens a toast or updates one already showing.
 */
const RECEIVED_NOTIFICATION_LOG = 'Notification service shard received notification: ';

/** The ids of the notifications sent to each page's notification service, as its log reports them. */
const sentNotificationIds = new WeakMap<Page, Set<string | number>>();

/** How long {@link clearRecordedToasts} waits for dismissed toasts to leave the screen. */
const TOASTS_GONE_TIMEOUT_MS = 5_000;

/** The id of the notification a renderer log line reports, if the line is one and names an id. */
function notificationIdFrom(message: ConsoleMessage): string | number | undefined {
  const text = message.text();
  const start = text.indexOf(RECEIVED_NOTIFICATION_LOG);
  if (start < 0) return undefined;
  const json = text.slice(start + RECEIVED_NOTIFICATION_LOG.length);
  // The log appends the caller's location (`[at …]`) after the notification's JSON.
  const end = json.lastIndexOf('}');
  if (end < 0) return undefined;
  try {
    const { notificationId } = JSON.parse(json.slice(0, end + 1));
    return typeof notificationId === 'string' || typeof notificationId === 'number'
      ? notificationId
      : undefined;
  } catch {
    return undefined;
  }
}

/**
 * Records every notification toast that renders, so a test can assert one appeared without having
 * to sample for it.
 *
 * A toast cannot be asserted with a plain locator here: the gesture that raises it resolves only
 * once the work behind it has already run, and the toast then closes itself on a length-derived
 * timer, so an `expect(...).toBeVisible()` started at that point is racing it. Watching the DOM
 * from BEFORE the gesture removes the race: the observer records the text, and the assertion reads
 * the record whenever it likes.
 *
 * The same timer also keeps a toast on screen for ten seconds or more, long enough to outlive the
 * step that raised it. That is what {@link clearRecordedToasts} deals with.
 */
export async function installToastProbe(mainPage: Page): Promise<void> {
  if (!sentNotificationIds.has(mainPage)) {
    const ids = new Set<string | number>();
    sentNotificationIds.set(mainPage, ids);
    mainPage.on('console', (message) => {
      const id = notificationIdFrom(message);
      if (id !== undefined) ids.add(id);
    });
  }
  await mainPage.evaluate(() => {
    if (window.toastProbe) return;
    // Keyed by element so a toast whose text arrives after insertion is corrected in place rather
    // than logged twice, and so two separate notices with the same wording stay two entries.
    const seen = new Map<Element, string>();
    // Toasts on screen at the last clear, with the text they had then.
    const ignored = new Map<Element, string>();
    const record = () => {
      document.querySelectorAll('.notification-toast').forEach((toast) => {
        const text = toast.textContent ?? '';
        if (text && ignored.get(toast) !== text) seen.set(toast, text);
      });
    };
    new MutationObserver(record).observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });
    record();
    window.toastProbe = {
      texts: () => [...seen.values()],
      clear: () => {
        seen.clear();
        ignored.clear();
        document.querySelectorAll('.notification-toast').forEach((toast) => {
          ignored.set(toast, toast.textContent ?? '');
        });
      },
    };
  });
}

/**
 * Takes every notification toast off the screen and forgets the toasts recorded so far, so the next
 * assertion can only see notices raised after this call.
 *
 * Forgetting the record is not enough on its own. A toast left on screen is recorded again by the
 * next DOM change anywhere in the window, so an assertion would pass on the notice an earlier step
 * raised. And a notice re-sent under the id of one still showing updates that toast in place, with
 * the same text, which changes nothing a DOM observer can see. Dismissing every notification the
 * app has sent (through the notification service, as a caller would) means the next notice of any
 * kind opens a toast of its own.
 */
export async function clearRecordedToasts(mainPage: Page): Promise<void> {
  const ids = sentNotificationIds.get(mainPage);
  if (!ids) throw new Error('clearRecordedToasts: call installToastProbe first');
  await Promise.all(
    [...ids].map((id) => sendPapiRequestOnce('object:NotificationService.dismiss', [id])),
  );
  ids.clear();
  // A notification sent without an id cannot be dismissed by one. If such a toast is still up when
  // the wait runs out, the probe ignores it from here on unless its text changes.
  await expect
    .poll(() => mainPage.locator('.notification-toast').count(), {
      timeout: TOASTS_GONE_TIMEOUT_MS,
    })
    .toBe(0)
    .catch(() => undefined);
  await mainPage.evaluate(() => window.toastProbe?.clear());
}

/** Every toast text recorded since the probe was installed or last cleared. */
export async function recordedToasts(mainPage: Page): Promise<string[]> {
  return mainPage.evaluate(() => window.toastProbe?.texts() ?? []);
}

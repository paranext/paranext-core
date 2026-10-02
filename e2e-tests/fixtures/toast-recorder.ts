/**
 * Records the notification toasts the app raises, so a spec can assert one appeared without having
 * to catch it on screen.
 */
import { type Page } from '@playwright/test';

/**
 * The toast recorder installed into the app window by {@link installToastProbe}. Declared on
 * `Window` rather than reached for with a type assertion, since the page-side callbacks below run
 * in the renderer and cannot import anything.
 */
interface ToastProbe {
  /** Every toast text recorded since installation or the last {@link ToastProbe.clear}. */
  texts: () => string[];
  /** Forget the toasts recorded so far. */
  clear: () => void;
}

declare global {
  interface Window {
    toastProbe?: ToastProbe;
  }
}

/**
 * Records every notification toast that renders, so a test can assert one appeared without having
 * to sample for it.
 *
 * A toast cannot be asserted with a plain locator here: the correction notice carries no `duration:
 * 0`, so it closes itself on a length-derived timer — observed between 1.3s and 4s — and the
 * gesture that raises it resolves only once the repair has already run. An
 * `expect(...).toBeVisible()` started at that point is racing a toast that may have seconds of life
 * left or a few hundred milliseconds. Watching the DOM from BEFORE the gesture removes the race:
 * the observer records the text, and the assertion reads the record whenever it likes.
 */
export async function installToastProbe(mainPage: Page): Promise<void> {
  await mainPage.evaluate(() => {
    if (window.toastProbe) return;
    // Keyed by element so a toast whose text arrives after insertion is corrected in place rather
    // than logged twice, and so two separate notices with the same wording stay two entries.
    const seen = new Map<Element, string>();
    const record = () => {
      document.querySelectorAll('.notification-toast').forEach((toast) => {
        const text = toast.textContent ?? '';
        if (text) seen.set(toast, text);
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
      clear: () => seen.clear(),
    };
  });
}

/** Forget the toasts recorded so far, so the next assertion can only see new ones. */
export async function clearRecordedToasts(mainPage: Page): Promise<void> {
  await mainPage.evaluate(() => window.toastProbe?.clear());
}

/** Every toast text recorded since the probe was installed or last cleared. */
export async function recordedToasts(mainPage: Page): Promise<string[]> {
  return mainPage.evaluate(() => window.toastProbe?.texts() ?? []);
}

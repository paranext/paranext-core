import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import type { BrowserWindow, MessageBoxOptions, MessageBoxReturnValue } from 'electron';
import { confirmCloseAllWindows } from '@main/services/close-all-prompt.service';
import {
  markQuitRequested,
  resetShutdownLatchesForNewSession,
} from '@main/services/shutdown-latch.service';
import { localizationService } from '@shared/services/localization.service';
import { logger } from '@shared/services/logger.service';

/**
 * Declared through `vi.hoisted` and typed to the two-argument call this prompt actually makes.
 * Reaching for it through Electron's own `dialog.showMessageBox` type instead would resolve to the
 * single-argument overload, and the parent window the prompt passes would be invisible to the
 * types.
 */
const { showMessageBox } = vi.hoisted(() => ({
  showMessageBox:
    vi.fn<(parent: BrowserWindow, options: MessageBoxOptions) => Promise<MessageBoxReturnValue>>(),
}));

vi.mock('electron', () => ({ dialog: { showMessageBox } }));

vi.mock('@shared/services/localization.service', () => ({
  localizationService: { getLocalizedStrings: vi.fn() },
}));

vi.mock('@shared/services/logger.service', () => ({
  logger: { error: vi.fn(), warn: vi.fn(), info: vi.fn(), debug: vi.fn() },
}));

/** The English text the prompt falls back to when localization does not answer */
const ENGLISH = {
  message: 'Close the application?',
  detail: 'All windows will close. They will be restored the next time you open the application.',
  closeAll: 'Close all windows',
  cancel: 'Cancel',
};

/** What a working localization service returns, chosen to be unmistakably not the English above */
const LOCALIZED = {
  '%closeApp_confirm_message%': '¿Cerrar la aplicación?',
  '%closeApp_confirm_detail%': 'Se cerrarán todas las ventanas.',
  '%closeApp_confirm_closeAll%': 'Cerrar todas las ventanas',
  '%general_cancel%': 'Cancelar',
};

const CLOSE_ALL_INDEX = 0;
const CANCEL_INDEX = 1;

/**
 * Stand-in for the primary window. The prompt only passes it to `showMessageBox` as the parent, so
 * nothing on it is read.
 */
function fakeWindow(id: number): BrowserWindow {
  // Constructing a real BrowserWindow needs the Electron runtime, and the prompt never touches it
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return { id } as BrowserWindow;
}

/** The options the prompt handed to the most recent `showMessageBox` call */
function optionsFromLastCall(): MessageBoxOptions {
  const call = showMessageBox.mock.calls.at(-1);
  if (!call) throw new Error('showMessageBox was never called');
  return call[1];
}

/** Answer the box with the given button, for tests whose subject is the setup rather than the answer */
function answerWith(response: number) {
  showMessageBox.mockResolvedValue({ response, checkboxChecked: false });
}

beforeEach(() => {
  vi.clearAllMocks();
  resetShutdownLatchesForNewSession();
  answerWith(CANCEL_INDEX);
  vi.mocked(localizationService.getLocalizedStrings).mockResolvedValue(LOCALIZED);
});

afterEach(() => {
  vi.useRealTimers();
});

describe('the close-all confirmation prompt', () => {
  describe('dismissal when a quit arrives while the question is open', () => {
    test('gives the box a signal that is not already aborted, and aborts it when the quit comes', async () => {
      let releaseBox: (value: MessageBoxReturnValue) => void = () => {};
      showMessageBox.mockImplementation(
        async () =>
          new Promise<MessageBoxReturnValue>((resolve) => {
            releaseBox = resolve;
          }),
      );

      const answer = confirmCloseAllWindows(fakeWindow(1));
      await vi.waitFor(() => expect(showMessageBox).toHaveBeenCalled());

      const { signal } = optionsFromLastCall();
      // Asserting the signal rather than the answer, because the answer cannot tell a working
      // abort from a broken one: the caller races this against the quit latch, and the latch
      // decides either way. A box shown with no signal, or with one nothing ever aborts, would
      // leave the question on screen through the whole shutdown.
      expect(signal).toBeInstanceOf(AbortSignal);
      // The control for the assertion below: a signal that arrived already aborted would satisfy
      // it for free
      expect(signal?.aborted).toBe(false);

      markQuitRequested();
      await vi.waitFor(() => expect(signal?.aborted).toBe(true));

      releaseBox({ response: CANCEL_INDEX, checkboxChecked: false });
      await answer;
    });
  });

  describe('localization', () => {
    test('shows the localized text when localization answers within the bound', async () => {
      await confirmCloseAllWindows(fakeWindow(1));

      const options = optionsFromLastCall();
      expect(options.message).toBe(LOCALIZED['%closeApp_confirm_message%']);
      expect(options.detail).toBe(LOCALIZED['%closeApp_confirm_detail%']);
      expect(options.buttons).toEqual([
        LOCALIZED['%closeApp_confirm_closeAll%'],
        LOCALIZED['%general_cancel%'],
      ]);
      expect(logger.warn).not.toHaveBeenCalled();
    });

    test('falls back to English once the bound passes when localization never answers', async () => {
      vi.useFakeTimers();
      // Never settles, so only the bound can end the race
      vi.mocked(localizationService.getLocalizedStrings).mockReturnValue(new Promise(() => {}));

      const answer = confirmCloseAllWindows(fakeWindow(1));

      // Nothing may reach the screen before the bound passes: a box shown early would mean the
      // race never waited for localization at all
      await Promise.resolve();
      expect(showMessageBox).not.toHaveBeenCalled();

      await vi.advanceTimersByTimeAsync(3000);
      await answer;

      const options = optionsFromLastCall();
      expect(options.message).toBe(ENGLISH.message);
      expect(options.detail).toBe(ENGLISH.detail);
      expect(options.buttons).toEqual([ENGLISH.closeAll, ENGLISH.cancel]);
      expect(logger.warn).toHaveBeenCalled();
    });

    test('falls back at once when localization fails, rather than waiting out the bound', async () => {
      // Deliberately on real timers, never advanced: a fallback that only arrived when the bound
      // elapsed would hang here. This is why the prompt races a throwing timer instead of using
      // `waitForDuration`, whose `Promise.any` would swallow a fast failure and hold the question
      // back for the whole bound.
      vi.mocked(localizationService.getLocalizedStrings).mockRejectedValue(
        new Error('localization is unreachable'),
      );

      await confirmCloseAllWindows(fakeWindow(1));

      const options = optionsFromLastCall();
      expect(options.message).toBe(ENGLISH.message);
      expect(options.buttons).toEqual([ENGLISH.closeAll, ENGLISH.cancel]);
      expect(logger.warn).toHaveBeenCalled();
    });
  });

  describe('the answer it reports', () => {
    test('reports close-all for the first button and cancel for the second', async () => {
      answerWith(CLOSE_ALL_INDEX);
      expect(await confirmCloseAllWindows(fakeWindow(1))).toBe('close-all');

      answerWith(CANCEL_INDEX);
      expect(await confirmCloseAllWindows(fakeWindow(1))).toBe('cancel');
    });

    test('makes Cancel both the default and the dismiss answer, so neither Enter nor Esc closes everything', async () => {
      await confirmCloseAllWindows(fakeWindow(1));

      const options = optionsFromLastCall();
      expect(options.defaultId).toBe(CANCEL_INDEX);
      expect(options.cancelId).toBe(CANCEL_INDEX);
    });
  });
});

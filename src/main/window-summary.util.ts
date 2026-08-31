import { WindowSummary } from '@shared/services/window.service-model';

/**
 * The parts of a window a summary reads. Kept structural rather than typed as `BrowserWindow` so
 * this stays a pure function its callers can exercise without an Electron window.
 */
type SummarizableWindow = {
  id: number;
  getTitle: () => string;
  /**
   * Whether this window's renderer has ever reported itself ready, which is what says its title is
   * its own. Before that, `getTitle()` answers with Electron's default rather than nothing, so the
   * title cannot be told apart from a name the window actually chose.
   */
  wasEverReady: boolean;
};

/**
 * Describe every open window for a caller choosing one to act on.
 *
 * Labels are whatever each window's renderer has published as its title, so two windows showing the
 * same thing produce identical labels and nothing here disambiguates them. That is deliberate: the
 * cost of choosing the wrong one is small and recoverable, while an invented disambiguator (an
 * ordinal, a monitor name) is either meaningless to the user or unstable as windows open and move.
 *
 * @param windows Open windows, in the order the caller should present them
 * @param mainWindowId Window currently holding the primary role, or `undefined` if none does — the
 *   role belongs to a persisted entry, which can outlive the window that held it
 * @returns One summary per window, in the order given
 */
export function summarizeWindows(
  windows: readonly SummarizableWindow[],
  mainWindowId: number | undefined,
): WindowSummary[] {
  return windows.map((window) => ({
    windowId: window.id,
    label: window.wasEverReady ? window.getTitle() : '',
    isMain: window.id === mainWindowId,
  }));
}

import { describe, expect, test, vi } from 'vitest';
import { summarizeWindows } from '@main/window-summary.util';

const window = (windowId: number, title: string, wasEverReady = true) => ({
  windowId,
  getTitle: () => title,
  wasEverReady,
});

/** Answers for one window id and no other, the shape a single-primary session produces */
const onlyPrimaryIs = (primaryId: number | undefined) => (windowId: number) =>
  primaryId !== undefined && windowId === primaryId;

describe('summarizeWindows', () => {
  test('labels a window that has never been ready with nothing, not with the name Electron gave it', () => {
    // Until a renderer publishes a page title, `getTitle()` answers with Electron's own default,
    // which is a real non-empty string. Passing that through offers the user a window named after
    // the framework; an empty label is what lets the caller supply a name of its own.
    const summaries = summarizeWindows([window(1, 'Electron', false)], onlyPrimaryIs(undefined));

    expect(summaries).toEqual([{ windowId: 1, label: '', isMain: false }]);
  });

  test('reports one entry per window, labelled by its title', () => {
    expect(
      summarizeWindows(
        [window(1, 'MRK — wgPIDGIN'), window(2, 'Biblical Terms')],
        onlyPrimaryIs(1),
      ),
    ).toEqual([
      { windowId: 1, label: 'MRK — wgPIDGIN', isMain: true },
      { windowId: 2, label: 'Biblical Terms', isMain: false },
    ]);
  });

  test('marks the window holding the primary role wherever it sits in the list', () => {
    const summaries = summarizeWindows(
      [window(1, 'Home'), window(2, 'Notes'), window(3, 'MRK')],
      onlyPrimaryIs(3),
    );

    expect(summaries.filter((summary) => summary.isMain)).toEqual([
      { windowId: 3, label: 'MRK', isMain: true },
    ]);
  });

  test('marks no window as main when nothing answers for the application', () => {
    const summaries = summarizeWindows(
      [window(1, 'Home'), window(2, 'Notes')],
      onlyPrimaryIs(undefined),
    );

    expect(summaries.every((summary) => !summary.isMain)).toBe(true);
  });

  test('asks about every window rather than comparing against one id', () => {
    // The role is a question the caller answers per window, not a value to match: the answer can
    // fall back to a different window than the one the persisted entry names, so a summary that
    // compared ids would report the wrong window — or no window at all — in exactly that case.
    const isPrimary = vi.fn<(windowId: number) => boolean>(() => false);

    summarizeWindows([window(4, 'Home'), window(7, 'Notes'), window(9, 'MRK')], isPrimary);

    expect(isPrimary.mock.calls.map(([windowId]) => windowId)).toEqual([4, 7, 9]);
  });

  test('marks the window that answers for the application even when no entry names it', () => {
    // The gap this exists for: every window the startup restore created has gone, and something
    // opened one into the space left behind, so no persisted entry names a live window. Something
    // still has to answer for the application's lifetime, and the caller's rule says the oldest
    // live window does. A summary keyed on the entry reports no main window at all here.
    const oldestLiveWindowAnswers = (windowId: number) => windowId === 13;

    const summaries = summarizeWindows(
      [window(13, 'Home'), window(14, 'Notes')],
      oldestLiveWindowAnswers,
    );

    expect(summaries).toEqual([
      { windowId: 13, label: 'Home', isMain: true },
      { windowId: 14, label: 'Notes', isMain: false },
    ]);
  });

  test('keeps the order it is given, so the menu lists windows as the app tracks them', () => {
    const summaries = summarizeWindows(
      [window(5, 'Third'), window(2, 'First'), window(9, 'Second')],
      onlyPrimaryIs(2),
    );

    expect(summaries.map((summary) => summary.windowId)).toEqual([5, 2, 9]);
  });

  test('reports nothing when no window is open', () => {
    expect(summarizeWindows([], onlyPrimaryIs(undefined))).toEqual([]);
  });
});

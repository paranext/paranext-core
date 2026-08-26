import { describe, expect, test } from 'vitest';
import { summarizeWindows } from '@main/window-summary.util';

const window = (windowId: number, title: string) => ({ windowId, getTitle: () => title });

describe('summarizeWindows', () => {
  test('reports one entry per window, labelled by its title', () => {
    expect(summarizeWindows([window(1, 'MRK — wgPIDGIN'), window(2, 'Biblical Terms')], 1)).toEqual(
      [
        { windowId: 1, label: 'MRK — wgPIDGIN', isMain: true },
        { windowId: 2, label: 'Biblical Terms', isMain: false },
      ],
    );
  });

  test('marks the window holding the primary role wherever it sits in the list', () => {
    const summaries = summarizeWindows(
      [window(1, 'Home'), window(2, 'Notes'), window(3, 'MRK')],
      3,
    );

    expect(summaries.filter((summary) => summary.isMain)).toEqual([
      { windowId: 3, label: 'MRK', isMain: true },
    ]);
  });

  test('marks no window as main when no entry currently holds the role', () => {
    const summaries = summarizeWindows([window(1, 'Home'), window(2, 'Notes')], undefined);

    expect(summaries.every((summary) => !summary.isMain)).toBe(true);
  });

  test('marks no window as main when the role belongs to an entry with no live window', () => {
    // Main-ness lives on the persisted entry, so it outlives the window that held it
    const summaries = summarizeWindows([window(1, 'Home'), window(2, 'Notes')], 7);

    expect(summaries.every((summary) => !summary.isMain)).toBe(true);
  });

  test('keeps the order it is given, so the menu lists windows as the app tracks them', () => {
    const summaries = summarizeWindows(
      [window(5, 'Third'), window(2, 'First'), window(9, 'Second')],
      2,
    );

    expect(summaries.map((summary) => summary.windowId)).toEqual([5, 2, 9]);
  });

  test('reports nothing when no window is open', () => {
    expect(summarizeWindows([], undefined)).toEqual([]);
  });
});

// @vitest-environment jsdom

import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { type NotifyLostEdits, useLostEditsReport } from './use-lost-edits-report.hook';

const { mockLoggerWarn } = vi.hoisted(() => ({ mockLoggerWarn: vi.fn() }));
vi.mock('@papi/frontend', () => ({
  logger: { debug: vi.fn(), warn: mockLoggerWarn, info: vi.fn(), error: vi.fn() },
}));

const GEN_1 = { chapterKey: 'GEN|1|English', book: 'Genesis', chapterNum: 1 };
const GEN_2 = { chapterKey: 'GEN|2|English', book: 'Genesis', chapterNum: 2 };

beforeEach(() => {
  mockLoggerWarn.mockClear();
});

function renderReport(bookId = 'GEN', localizedBookName = 'Genesis') {
  const notify = vi.fn<NotifyLostEdits>();
  const hook = renderHook(
    (props: { bookId: string; localizedBookName: string; notify: NotifyLostEdits }) =>
      useLostEditsReport(props.bookId, props.localizedBookName, props.notify),
    { initialProps: { bookId, localizedBookName, notify } },
  );
  return { notify, hook, report: () => hook.result.current };
}

describe('useLostEditsReport', () => {
  it('reports nothing when no edits are held and none were discarded', () => {
    const { notify, report } = renderReport();

    report().report('leftChapter');

    expect(notify).not.toHaveBeenCalled();
    expect(mockLoggerWarn).not.toHaveBeenCalled();
  });

  it('reports held edits once, with the plain notice routed to this editor', () => {
    const { notify, report } = renderReport();
    report().recordHeld(GEN_1, 'runningSave');

    report().report('leftChapter');
    report().report('leftChapter');

    expect(notify.mock.calls).toEqual([['Genesis', 1, false, true]]);
    expect(mockLoggerWarn).toHaveBeenCalledTimes(1);
    expect(mockLoggerWarn).toHaveBeenCalledWith(
      'Left GEN|1|English before its latest edits were saved (a save of it was still in progress); those edits are lost',
    );
  });

  it('names a refused save and a discarded one as the reason in the log', () => {
    const { report } = renderReport();
    report().recordHeld(GEN_1, 'navigation');
    report().report('leftChapter');
    report().report('replacedByUpdate', GEN_2);

    expect(mockLoggerWarn.mock.calls).toEqual([
      [expect.stringContaining('their save was refused because the user had moved on')],
      [expect.stringContaining('(they were never sent)')],
    ]);
  });

  it('says a discarded edit was replaced by an update, but gives held edits the plain notice even then', () => {
    const { notify, report } = renderReport();
    report().report('replacedByUpdate', GEN_2);
    report().recordHeld(GEN_1, 'runningSave');
    report().report('replacedByUpdate', GEN_2);

    expect(notify.mock.calls).toEqual([
      ['Genesis', 2, true, true],
      ['Genesis', 1, false, true],
    ]);
  });

  it('forgets held edits only for their own chapter', () => {
    const { notify, report } = renderReport();
    report().recordHeld(GEN_1, 'runningSave');

    report().forgetHeld(GEN_2.chapterKey);
    report().report('leftChapter');
    expect(notify).toHaveBeenCalledTimes(1);

    report().recordHeld(GEN_1, 'runningSave');
    report().forgetHeld(GEN_1.chapterKey);
    report().report('leftChapter');
    expect(notify).toHaveBeenCalledTimes(1);
  });

  it('keeps one record, the latest', () => {
    const { notify, report } = renderReport();
    report().recordHeld(GEN_1, 'runningSave');
    report().recordHeld(GEN_2, 'navigation');

    report().report('leftChapter');
    report().report('leftChapter');

    expect(notify.mock.calls).toEqual([['Genesis', 2, false, true]]);
  });

  it('does not route a loss to the editor when it closes, or once it is closing', () => {
    const { notify, report } = renderReport();
    report().recordHeld(GEN_1, 'runningSave');
    report().report('editorClosed');
    report().markClosing();
    report().report('leftChapter', GEN_2);

    expect(notify.mock.calls).toEqual([
      ['Genesis', 1, false, false],
      ['Genesis', 2, false, false],
    ]);
  });

  it('names a chapter by the localized name of a book it has shown, after moving on to another book', () => {
    const { notify, hook, report } = renderReport('GEN', 'Génesis');
    hook.rerender({ bookId: 'EXO', localizedBookName: 'Éxodo', notify });

    expect(
      report().describeChapter({ book: 'GEN', chapterNum: 3, versificationStr: 'English' }),
    ).toEqual({ chapterKey: 'GEN|3|English', book: 'Génesis', chapterNum: 3 });
    expect(
      report().describeChapter({ book: 'LEV', chapterNum: 1, versificationStr: 'English' }),
    ).toEqual(expect.objectContaining({ book: 'LEV' }));
  });

  it('keeps the same functions when the notifier changes, and notifies through the latest one', () => {
    const { hook, report } = renderReport();
    const first = report();
    const latestNotify = vi.fn<NotifyLostEdits>();
    hook.rerender({ bookId: 'GEN', localizedBookName: 'Genesis', notify: latestNotify });

    expect(report()).toBe(first);
    first.recordHeld(GEN_1, 'runningSave');
    first.report('leftChapter');
    expect(latestNotify).toHaveBeenCalledTimes(1);
  });
});

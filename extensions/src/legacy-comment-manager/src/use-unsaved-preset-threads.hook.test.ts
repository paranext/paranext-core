// @vitest-environment jsdom

import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useUnsavedPresetThreadIds } from './use-unsaved-preset-threads.hook';

type Props = { preset: string; draftThreadIds: readonly string[] };

function renderMembership(initialProps: Props) {
  const { result, rerender } = renderHook(
    ({ preset, draftThreadIds }: Props) => useUnsavedPresetThreadIds(preset, draftThreadIds),
    { initialProps },
  );
  return {
    ids: () => [...result.current].sort(),
    rerenderWith: (props: Props) => rerender(props),
  };
}

describe('useUnsavedPresetThreadIds', () => {
  it('captures the currently drafted threads on initial mount already showing the unsaved preset', () => {
    const { ids } = renderMembership({ preset: 'unsaved', draftThreadIds: ['t1', 't2'] });
    expect(ids()).toEqual(['t1', 't2']);
  });

  it('keeps a thread whose draft has emptied, for as long as the preset stays active', () => {
    // The exact regression this hook exists to fix: select-all + delete, or a successful submit
    // that clears the editor, removes the thread from the LIVE draft map -- but the thread must
    // stay in the membership set so its CommentThread (and the caret inside it) never unmounts.
    const { ids, rerenderWith } = renderMembership({ preset: 'unsaved', draftThreadIds: ['t1'] });
    expect(ids()).toEqual(['t1']);

    rerenderWith({ preset: 'unsaved', draftThreadIds: [] });
    expect(ids()).toEqual(['t1']);
  });

  it('adds a thread that gains a draft while the preset stays active, without dropping the others', () => {
    const { ids, rerenderWith } = renderMembership({ preset: 'unsaved', draftThreadIds: ['t1'] });

    rerenderWith({ preset: 'unsaved', draftThreadIds: ['t1', 't2'] });
    expect(ids()).toEqual(['t1', 't2']);

    // t1's draft now empties too -- both ids must still be kept (grow-only).
    rerenderWith({ preset: 'unsaved', draftThreadIds: ['t2'] });
    expect(ids()).toEqual(['t1', 't2']);
  });

  it('re-snapshots from the live draft state on switch-away-and-back, dropping a since-emptied draft', () => {
    const { ids, rerenderWith } = renderMembership({ preset: 'unsaved', draftThreadIds: ['t1'] });
    expect(ids()).toEqual(['t1']);

    // User switches to another preset -- t1's draft is cleared while away.
    rerenderWith({ preset: 'all', draftThreadIds: ['t1'] });
    rerenderWith({ preset: 'all', draftThreadIds: [] });

    // Re-entering 'unsaved' must reflect the CURRENT draft state (now empty), not the frozen
    // snapshot from the previous session on this preset.
    rerenderWith({ preset: 'unsaved', draftThreadIds: [] });
    expect(ids()).toEqual([]);
  });

  it('re-snapshots to include a thread drafted for the first time while away, on return', () => {
    const { ids, rerenderWith } = renderMembership({ preset: 'unsaved', draftThreadIds: [] });
    expect(ids()).toEqual([]);

    rerenderWith({ preset: 'all', draftThreadIds: [] });
    rerenderWith({ preset: 'all', draftThreadIds: ['t9'] });

    rerenderWith({ preset: 'unsaved', draftThreadIds: ['t9'] });
    expect(ids()).toEqual(['t9']);
  });
});

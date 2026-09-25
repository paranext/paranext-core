// @vitest-environment jsdom

import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useFrozenPresetThreadIds } from './use-frozen-preset-thread-ids.hook';

type Props = { preset: string; memberThreadIds: readonly string[] };

/**
 * Drives the hook as the `'unsaved'` preset consumer does: tracked exactly when `preset ===
 * 'unsaved'`.
 */
function renderMembership(initialProps: Props) {
  const { result, rerender } = renderHook(
    ({ preset, memberThreadIds }: Props) =>
      useFrozenPresetThreadIds(preset, preset === 'unsaved', memberThreadIds),
    { initialProps },
  );
  return {
    ids: () => [...result.current].sort(),
    rerenderWith: (props: Props) => rerender(props),
  };
}

describe('useFrozenPresetThreadIds — unsaved preset', () => {
  it('captures the currently drafted threads on initial mount already showing the unsaved preset', () => {
    const { ids } = renderMembership({ preset: 'unsaved', memberThreadIds: ['t1', 't2'] });
    expect(ids()).toEqual(['t1', 't2']);
  });

  it('keeps a thread whose draft has emptied, for as long as the preset stays active', () => {
    // The exact regression this hook exists to fix: select-all + delete, or a successful submit
    // that clears the editor, removes the thread from the LIVE draft map -- but the thread must
    // stay in the membership set so its CommentThread (and the caret inside it) never unmounts.
    const { ids, rerenderWith } = renderMembership({ preset: 'unsaved', memberThreadIds: ['t1'] });
    expect(ids()).toEqual(['t1']);

    rerenderWith({ preset: 'unsaved', memberThreadIds: [] });
    expect(ids()).toEqual(['t1']);
  });

  it('adds a thread that gains a draft while the preset stays active, without dropping the others', () => {
    const { ids, rerenderWith } = renderMembership({ preset: 'unsaved', memberThreadIds: ['t1'] });

    rerenderWith({ preset: 'unsaved', memberThreadIds: ['t1', 't2'] });
    expect(ids()).toEqual(['t1', 't2']);

    // t1's draft now empties too -- both ids must still be kept (grow-only).
    rerenderWith({ preset: 'unsaved', memberThreadIds: ['t2'] });
    expect(ids()).toEqual(['t1', 't2']);
  });

  it('re-snapshots from the live draft state on switch-away-and-back, dropping a since-emptied draft', () => {
    const { ids, rerenderWith } = renderMembership({ preset: 'unsaved', memberThreadIds: ['t1'] });
    expect(ids()).toEqual(['t1']);

    // User switches to another preset -- t1's draft is cleared while away.
    rerenderWith({ preset: 'all', memberThreadIds: ['t1'] });
    rerenderWith({ preset: 'all', memberThreadIds: [] });

    // Re-entering 'unsaved' must reflect the CURRENT draft state (now empty), not the frozen
    // snapshot from the previous session on this preset.
    rerenderWith({ preset: 'unsaved', memberThreadIds: [] });
    expect(ids()).toEqual([]);
  });

  it('re-snapshots to include a thread drafted for the first time while away, on return', () => {
    const { ids, rerenderWith } = renderMembership({ preset: 'unsaved', memberThreadIds: [] });
    expect(ids()).toEqual([]);

    rerenderWith({ preset: 'all', memberThreadIds: [] });
    rerenderWith({ preset: 'all', memberThreadIds: ['t9'] });

    rerenderWith({ preset: 'unsaved', memberThreadIds: ['t9'] });
    expect(ids()).toEqual(['t9']);
  });
});

describe('useFrozenPresetThreadIds — generalized across preset families', () => {
  /** Drives the hook as the unread-preset family consumer does: tracked for any of three presets. */
  const UNREAD_PRESETS = new Set(['unread', 'unread-and-unresolved', 'unread-assigned-to-me']);
  function renderUnreadMembership(initialProps: Props) {
    const { result, rerender } = renderHook(
      ({ preset, memberThreadIds }: Props) =>
        useFrozenPresetThreadIds(preset, UNREAD_PRESETS.has(preset), memberThreadIds),
      { initialProps },
    );
    return {
      ids: () => [...result.current].sort(),
      rerenderWith: (props: Props) => rerender(props),
    };
  }

  it('keeps a thread that stops being unread, for as long as an unread preset stays active', () => {
    // Mirrors the 'unsaved' regression above, for the other consumer: a thread marked read while
    // the user is looking at it must not disappear from the frozen membership.
    const { ids, rerenderWith } = renderUnreadMembership({
      preset: 'unread',
      memberThreadIds: ['t1'],
    });
    expect(ids()).toEqual(['t1']);

    rerenderWith({ preset: 'unread', memberThreadIds: [] });
    expect(ids()).toEqual(['t1']);
  });

  it('re-snapshots when switching directly between two different tracked presets', () => {
    // 'unread' and 'unread-and-unresolved' are both tracked, but are different queries -- switching
    // between them must re-snapshot from the new preset's live membership, not carry the old
    // preset's frozen set over as if it were still active.
    const { ids, rerenderWith } = renderUnreadMembership({
      preset: 'unread',
      memberThreadIds: ['t1'],
    });
    expect(ids()).toEqual(['t1']);

    rerenderWith({ preset: 'unread-and-unresolved', memberThreadIds: ['t2'] });
    expect(ids()).toEqual(['t2']);
  });

  it('maintains no membership while an untracked preset is active', () => {
    const { ids, rerenderWith } = renderUnreadMembership({
      preset: 'all',
      memberThreadIds: ['t1'],
    });
    expect(ids()).toEqual([]);

    rerenderWith({ preset: 'all', memberThreadIds: ['t1', 't2'] });
    expect(ids()).toEqual([]);
  });
});

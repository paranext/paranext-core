// @vitest-environment jsdom

import { renderHook } from '@testing-library/react';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { describe, expect, it } from 'vitest';
import { useScrRefWhenVisible } from './use-scr-ref-when-visible.hook';

const JHN_3_16: SerializedVerseRef = { book: 'JHN', chapterNum: 3, verseNum: 16 };
const JHN_3_17: SerializedVerseRef = { book: 'JHN', chapterNum: 3, verseNum: 17 };
const ROM_8_1: SerializedVerseRef = { book: 'ROM', chapterNum: 8, verseNum: 1 };

type Props = { scrRef: SerializedVerseRef; isViewVisible: boolean };

function renderScrRefWhenVisible(initialProps: Props) {
  const { result, rerender } = renderHook(
    ({ scrRef, isViewVisible }: Props) => useScrRefWhenVisible(scrRef, isViewVisible),
    { initialProps },
  );
  return { result, setProps: (props: Props) => rerender(props) };
}

describe('useScrRefWhenVisible', () => {
  it('passes the reference straight through while the view is visible', () => {
    const { result, setProps } = renderScrRefWhenVisible({
      scrRef: JHN_3_16,
      isViewVisible: true,
    });
    expect(result.current).toEqual(JHN_3_16);
    setProps({ scrRef: JHN_3_17, isViewVisible: true });
    expect(result.current).toEqual(JHN_3_17);
  });

  it('holds the last visible reference while the view is hidden', () => {
    // The held value is what makes the reveal a real prop change for the editor, which is what
    // drives the scroll. Applying it while hidden would consume the change with no layout to
    // scroll in, and nothing would re-trigger it on reveal.
    const { result, setProps } = renderScrRefWhenVisible({
      scrRef: JHN_3_16,
      isViewVisible: true,
    });
    setProps({ scrRef: JHN_3_17, isViewVisible: false });
    expect(result.current).toEqual(JHN_3_16);
  });

  it('applies the reference on reveal', () => {
    const { result, setProps } = renderScrRefWhenVisible({
      scrRef: JHN_3_16,
      isViewVisible: true,
    });
    setProps({ scrRef: JHN_3_17, isViewVisible: false });
    expect(result.current).toEqual(JHN_3_16);
    setProps({ scrRef: JHN_3_17, isViewVisible: true });
    expect(result.current).toEqual(JHN_3_17);
  });

  it('collapses several hidden changes into the latest one', () => {
    // A hidden panel keeps reacting to its scroll group at full rate, so a session can move the
    // reference many times before the tab is shown. Only the last one is worth scrolling to.
    const { result, setProps } = renderScrRefWhenVisible({
      scrRef: JHN_3_16,
      isViewVisible: true,
    });
    setProps({ scrRef: JHN_3_17, isViewVisible: false });
    setProps({ scrRef: ROM_8_1, isViewVisible: false });
    expect(result.current).toEqual(JHN_3_16);
    setProps({ scrRef: ROM_8_1, isViewVisible: true });
    expect(result.current).toEqual(ROM_8_1);
  });

  it('does not re-apply on a later reveal when the reference never moved', () => {
    // Switching tabs back and forth with no reference change must not keep nudging the editor.
    const { result, setProps } = renderScrRefWhenVisible({
      scrRef: JHN_3_16,
      isViewVisible: true,
    });
    const firstValue = result.current;
    setProps({ scrRef: JHN_3_16, isViewVisible: false });
    setProps({ scrRef: JHN_3_16, isViewVisible: true });
    expect(result.current).toBe(firstValue);
  });

  it('reports the mount-time reference when the view mounts hidden', () => {
    const { result } = renderScrRefWhenVisible({ scrRef: JHN_3_16, isViewVisible: false });
    expect(result.current).toEqual(JHN_3_16);
  });
});

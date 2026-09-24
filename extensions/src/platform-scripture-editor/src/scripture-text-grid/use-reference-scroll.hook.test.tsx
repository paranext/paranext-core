// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { type RefObject } from 'react';
import { useReferenceScroll } from './use-reference-scroll.hook';
import { type VerseTargetFinder } from './reference-scroll.utils';

// Nothing is mocked here. Visibility is a parameter, so it is just a value these tests pass, and
// `useRunWhenVisible` is deliberately the REAL hook — the deferral and the collapse under test are
// its behavior, so stubbing it would leave the thing being asserted unexercised.

const reference = (verseNum: number): SerializedVerseRef => ({
  book: 'MAT',
  chapterNum: 1,
  verseNum,
  versificationStr: 'English',
});

/** Where a target sits when it is well below the fold of a 100-tall port. */
const BELOW_THE_FOLD = 500;

/**
 * A scroll port with scripted geometry, since jsdom lays nothing out. `scrollHeight`/`clientHeight`
 * decide whether a position is clampable; the rect decides where the port's visible area ends.
 *
 * @param scrollHeight Total scrollable height.
 * @param clientHeight Visible height, and so the port's rect height.
 * @returns The port, attached to the document.
 */
function buildPort({ scrollHeight = 1000, clientHeight = 100 } = {}): HTMLElement {
  const port = document.createElement('div');
  Object.defineProperty(port, 'scrollHeight', { value: scrollHeight, writable: true });
  Object.defineProperty(port, 'clientHeight', { value: clientHeight, writable: true });
  port.getBoundingClientRect = () => new DOMRect(0, 0, 0, clientHeight);
  document.body.append(port);
  return port;
}

/**
 * A verse target at a fixed position in the port's CONTENT, whose viewport rect therefore moves as
 * the port scrolls.
 *
 * Modelling that relationship matters rather than being pedantry: `scrollPortToBlock` adjusts
 * `scrollTop` by a delta it reads from the rect, so a target whose rect ignored `scrollTop` would
 * never converge and would make a correct scroll look like it overshot.
 *
 * @param port The port this target scrolls within.
 * @param contentTop Distance from the top of the scrollable content.
 * @returns The element, not attached — the finder is stubbed, so nothing queries for it.
 */
function buildTarget(port: HTMLElement, contentTop: number): HTMLElement {
  const target = document.createElement('span');
  target.getBoundingClientRect = () => new DOMRect(0, contentTop - port.scrollTop, 0, 20);
  return target;
}

function renderScroll(
  port: HTMLElement,
  findTarget: VerseTargetFinder,
  {
    isEnabled = true,
    verseNum = 5,
    isViewVisible = true,
    publishedScrRefRef,
  }: {
    isEnabled?: boolean;
    verseNum?: number;
    isViewVisible?: boolean;
    publishedScrRefRef?: RefObject<SerializedVerseRef | undefined>;
  } = {},
) {
  const portRef: RefObject<HTMLElement | null> = { current: port };
  // What the hook is currently mounted with, so changing one input does not silently reset another.
  let current = { verseNum, isEnabled, isViewVisible };
  const { rerender } = renderHook(
    (props: { verseNum: number; isEnabled: boolean; isViewVisible: boolean }) =>
      useReferenceScroll(portRef, reference(props.verseNum), props.isViewVisible, findTarget, {
        isEnabled: props.isEnabled,
        publishedScrRefRef,
      }),
    { initialProps: current },
  );
  const rerenderWith = (next: Partial<typeof current>) => {
    current = { ...current, ...next };
    return act(() => rerender(current));
  };
  return {
    /** Moves the reference, which re-arms the scroll. */
    navigateTo: (next: number) => rerenderWith({ verseNum: next }),
    /** Turns the hook on or off where it stands, without remounting it. */
    setEnabled: (next: boolean) => rerenderWith({ isEnabled: next }),
    /** Shows or hides the view, which is what arms and consumes the deferred catch-up. */
    setVisible: (next: boolean) => rerenderWith({ isViewVisible: next }),
  };
}

/** Mutates the port and lets the observer's coalescing frame run. */
async function landContent(port: HTMLElement): Promise<void> {
  await act(async () => {
    port.append(document.createElement('div'));
    await new Promise((resolve) => {
      requestAnimationFrame(() => resolve(undefined));
    });
  });
}

const realScrollIntoView = Element.prototype.scrollIntoView;

beforeEach(() => {
  document.body.replaceChildren();
});

afterEach(() => {
  Element.prototype.scrollIntoView = realScrollIntoView;
});

describe('useReferenceScroll while hidden', () => {
  it('defers the scroll until the tab is shown, then performs it once', () => {
    // In Simple mode this is the common path, not the edge: column 3 shows one tab at a time, so
    // the reference usually moves while the pane is hidden and has no layout to measure.
    const port = buildPort();
    const findTarget = vi.fn(() => buildTarget(port, BELOW_THE_FOLD));

    const { setVisible } = renderScroll(port, findTarget, { isViewVisible: false });

    expect(findTarget).not.toHaveBeenCalled();
    expect(port.scrollTop).toBe(0);

    setVisible(true);

    expect(port.scrollTop).toBe(BELOW_THE_FOLD);
  });

  it('collapses navigation while hidden into one catch-up at the latest reference', () => {
    // Replaying each skipped reference would scroll the reader through verses they never asked to
    // see, and only the last one is where they actually are.
    const port = buildPort();
    const findTarget = vi.fn(() => buildTarget(port, BELOW_THE_FOLD));

    const { navigateTo, setVisible } = renderScroll(port, findTarget, { isViewVisible: false });
    navigateTo(11);
    navigateTo(12);
    navigateTo(13);

    expect(findTarget).not.toHaveBeenCalled();

    setVisible(true);

    expect(findTarget).toHaveBeenCalledTimes(1);
    expect(findTarget).toHaveBeenCalledWith(port, 13);
  });

  it('snaps to the catch-up position instead of animating to it', () => {
    // There is nothing to animate from on activation — the pane had no layout a moment ago — so an
    // animated catch-up would just be a visible lurch. `.claude/rules/cross-view-sync-hidden-views`
    // requires the instant consume.
    const port = buildPort();
    port.scrollTo = vi.fn();
    // Restored in afterEach: this is a prototype shared with every other test file in the worker,
    // and leaving a spy on it makes unrelated suites fail intermittently.
    const scrollIntoView = vi.fn();
    Element.prototype.scrollIntoView = scrollIntoView;

    const { setVisible } = renderScroll(
      port,
      vi.fn(() => buildTarget(port, BELOW_THE_FOLD)),
      { isViewVisible: false },
    );
    setVisible(true);

    expect(port.scrollTop).toBe(BELOW_THE_FOLD);
    expect(port.scrollTo).not.toHaveBeenCalled();
    expect(scrollIntoView).not.toHaveBeenCalled();
  });
});

describe('useReferenceScroll while visible', () => {
  it('leaves a verse that is already showing where it is', () => {
    // Clicking a verse reports it as the new reference, so scrolling it to the top would be the
    // wrong answer to a click. It is also why this hook needs no echo latch.
    const port = buildPort();

    renderScroll(
      port,
      vi.fn(() => buildTarget(port, 50)),
    );

    expect(port.scrollTop).toBe(0);
  });

  it('re-checks as content arrives, rather than giving up on an unrendered chapter', async () => {
    // The reference almost always changes before the chapter it points into has rendered.
    const port = buildPort();
    let target: HTMLElement | undefined;
    const findTarget = vi.fn(() => target);

    renderScroll(port, findTarget);
    expect(port.scrollTop).toBe(0);

    target = buildTarget(port, BELOW_THE_FOLD);
    await landContent(port);

    expect(port.scrollTop).toBe(BELOW_THE_FOLD);
  });

  it('stands down once the reader has scrolled, and re-arms on the next reference', async () => {
    const port = buildPort();
    const findTarget = vi.fn(() => buildTarget(port, BELOW_THE_FOLD));
    const { navigateTo } = renderScroll(port, findTarget);
    expect(port.scrollTop).toBe(BELOW_THE_FOLD);

    // The reader scrolls somewhere of their own choosing; late-arriving content must not yank them
    // back to the reference.
    port.scrollTop = 200;
    await landContent(port);

    expect(port.scrollTop).toBe(200);

    navigateTo(9);

    expect(port.scrollTop).toBe(BELOW_THE_FOLD);
  });

  it('does not read a content shrink as the reader scrolling', async () => {
    // Unchecking a resource in View Options, or zooming out, shrinks the content and the browser
    // clamps scrollTop to the new bottom. That is the browser, not the reader, so the sync must
    // stay armed — `overflow-anchor` does not help, because a clamp is not scroll anchoring.
    const port = buildPort();
    const findTarget = vi.fn(() => buildTarget(port, BELOW_THE_FOLD));
    renderScroll(port, findTarget);
    expect(port.scrollTop).toBe(BELOW_THE_FOLD);
    const callsBeforeShrink = findTarget.mock.calls.length;

    Object.defineProperty(port, 'scrollHeight', { value: 400, writable: true });
    port.scrollTop = 300; // what the browser clamps our 500 to
    await landContent(port);

    expect(findTarget.mock.calls.length).toBeGreaterThan(callsBeforeShrink);
  });
});

describe('useReferenceScroll disabled', () => {
  it('looks for no target and never moves the port', async () => {
    // Verse mode has nothing to scroll to and the aligned grid is scrolled by its root, but a React
    // hook still has to be called, so "off" has to mean "does not scroll".
    const port = buildPort();
    const findTarget = vi.fn(() => buildTarget(port, BELOW_THE_FOLD));

    const { navigateTo } = renderScroll(port, findTarget, { isEnabled: false });
    navigateTo(9);
    await landContent(port);

    expect(findTarget).not.toHaveBeenCalled();
    expect(port.scrollTop).toBe(0);
  });

  it('scrolls to the current reference when it is switched back on', () => {
    // Being re-enabled has to re-arm, not resume from whatever was last measured: the references
    // that passed while the hook was off never moved the port, so the position it remembers is not
    // where the reader now is. Unreachable through the grid today, where each view mode renders the
    // cell in a different tree and so remounts it — but this hook is exported as a general
    // controller, and nothing about it says "mount-time constant".
    const port = buildPort();
    const findTarget = vi.fn(() => buildTarget(port, BELOW_THE_FOLD));

    const { navigateTo, setEnabled } = renderScroll(port, findTarget, { isEnabled: false });
    navigateTo(9);
    expect(port.scrollTop).toBe(0);

    setEnabled(true);

    expect(findTarget).toHaveBeenCalledWith(port, 9);
    expect(port.scrollTop).toBe(BELOW_THE_FOLD);
  });
});

describe('useReferenceScroll echo latch', () => {
  it('does not scroll for a reference this view just published', () => {
    // The reader clicked deep inside a long verse, so the verse MARKER is off screen. Without the
    // latch the visibility test says "not showing" and the port yanks the text they clicked on up
    // to the top. The editor and the reference panels keep the same guard.
    const port = buildPort();
    const target = buildTarget(port, BELOW_THE_FOLD);
    const publishedScrRefRef: RefObject<SerializedVerseRef | undefined> = { current: undefined };
    const { navigateTo } = renderScroll(port, () => target, { publishedScrRefRef });
    port.scrollTop = 0;

    // The cell publishes verse 9, then the scroll group echoes it straight back.
    publishedScrRefRef.current = reference(9);
    navigateTo(9);

    expect(port.scrollTop).toBe(0);
    expect(publishedScrRefRef.current).toBeUndefined();
  });

  it('still scrolls for a genuine navigation to a different verse', () => {
    const port = buildPort();
    const target = buildTarget(port, BELOW_THE_FOLD);
    const publishedScrRefRef: RefObject<SerializedVerseRef | undefined> = { current: undefined };
    const { navigateTo } = renderScroll(port, () => target, { publishedScrRefRef });
    port.scrollTop = 0;

    // Published verse 9, but the group moved somewhere else entirely.
    publishedScrRefRef.current = reference(9);
    navigateTo(12);

    expect(port.scrollTop).toBe(BELOW_THE_FOLD);
  });

  it('discards a latch whose echo never arrived, so a later move to that verse still scrolls', () => {
    // A publish whose echo never lands as its own update would otherwise leave the latch armed
    // forever, and the next genuine navigation onto that verse would be swallowed.
    const port = buildPort();
    const target = buildTarget(port, BELOW_THE_FOLD);
    const publishedScrRefRef: RefObject<SerializedVerseRef | undefined> = { current: undefined };
    const { navigateTo } = renderScroll(port, () => target, { publishedScrRefRef });
    port.scrollTop = 0;

    publishedScrRefRef.current = reference(9);
    navigateTo(12); // some other reference consumes and discards the stale latch
    port.scrollTop = 0;
    navigateTo(9); // now a real navigation to the verse that was published earlier

    expect(port.scrollTop).toBe(BELOW_THE_FOLD);
  });
});

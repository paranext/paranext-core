// @vitest-environment jsdom

import '@testing-library/jest-dom';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { ParagraphMarkerTooltipOverlay } from './paragraph-marker-tooltip-overlay.component';
import * as tooltipUtils from './paragraph-marker-tooltip.utils';

// jsdom doesn't ship a ResizeObserver, which Radix's Popper-positioned TooltipContent instantiates
// on mount when open. A no-op stub is sufficient since these tests inspect text, not layout.
// Mirrors the precedent in destructive-key-confirmation.component.test.tsx.
class NoopResizeObserver implements ResizeObserver {
  private readonly targets = new Set<Element>();

  observe(target: Element) {
    this.targets.add(target);
  }

  unobserve(target: Element) {
    this.targets.delete(target);
  }

  disconnect() {
    this.targets.clear();
  }
}

beforeAll(() => {
  if (typeof globalThis.ResizeObserver === 'undefined') {
    globalThis.ResizeObserver = NoopResizeObserver;
  }
  // jsdom has no layout engine and doesn't implement elementFromPoint at all; stub it so the
  // stubHoverTarget helper below has a real function to vi.spyOn (spyOn requires the property to
  // already exist).
  if (!document.elementFromPoint) {
    // Matches the real API's nullable return type.
    // eslint-disable-next-line no-null/no-null
    document.elementFromPoint = () => null;
  }
});

/**
 * Stubs `document.elementFromPoint` to always return the given element regardless of coordinates.
 * The component derives the hovered paragraph from this hit-test (`paraAtPoint`), never from a
 * mouse event's own `target`/`relatedTarget` — see `paraAtPoint` in `editor-dom.util.ts` for why —
 * so tests drive "what is really under the cursor" through this stub, independently of which
 * element a `fireEvent` call happens to dispatch on.
 */
function stubHoverTarget(element: Element | null) {
  vi.spyOn(document, 'elementFromPoint').mockReturnValue(element);
}

// The repo-wide alias for '@papi/frontend/react' (extensions/__test-mocks__) doesn't export
// useLocalizedStrings, so this component needs its own mock. Echoes each requested key back as its
// own value, matching the real hook's `defaultState[key] = key` seeding
// (src/renderer/hooks/papi-hooks/use-localized-strings-hook.ts) — the state a consumer actually sees
// before real translations load. Both markers used below ('p', 'q1') have real entries in
// localizedStrings.json, so an empty-object mock would silently exercise the raw-USFM-fallback
// branch, which is not what these tests mean to cover.
vi.mock('@papi/frontend/react', () => ({
  useLocalizedStrings: (keys: string[]) => [
    Object.fromEntries(keys.map((key) => [key, key])),
    false,
  ],
}));

function renderEditor(enabled?: boolean) {
  return render(
    <ParagraphMarkerTooltipOverlay enabled={enabled}>
      <p className="para usfm_p">First paragraph</p>
      <p className="para usfm_q1">Second paragraph</p>
    </ParagraphMarkerTooltipOverlay>,
  );
}

// TooltipContent renders its text twice — once visibly, once in a visually-hidden span that also
// carries `role="tooltip"` — so `getByText`/`queryByText` match both and throw on ambiguity.
// `role="tooltip"` is unique to that hidden span, so it's the reliable single-match query for
// "is a tooltip currently open" and its text content.
function queryTooltip() {
  return screen.queryByRole('tooltip');
}

// What the mock above echoes back for each marker — i.e. what the tooltip actually shows.
const P_TEXT = '%paragraphMenu_p_markerDescription%';
const Q1_TEXT = '%paragraphMenu_q1_markerDescription%';

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.useRealTimers();
});

describe('ParagraphMarkerTooltipOverlay hover delay', () => {
  it('shows no tooltip before the delay elapses, and shows one right after', () => {
    renderEditor();
    const para = screen.getByText('First paragraph');

    stubHoverTarget(para);
    fireEvent.mouseOver(para);
    expect(queryTooltip()).not.toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(299);
    });
    expect(queryTooltip()).not.toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(queryTooltip()).toHaveTextContent(P_TEXT);
  });

  it('shows nothing and leaves no pending timer for a hover shorter than the delay', () => {
    renderEditor();
    const para = screen.getByText('First paragraph');

    stubHoverTarget(para);
    fireEvent.mouseOver(para);
    act(() => {
      vi.advanceTimersByTime(100);
    });
    // A reveal must still be pending at this point — asserted so this test cannot pass vacuously
    // against a version with no timer at all (which would leave the count at 0 throughout).
    expect(vi.getTimerCount()).toBe(1);

    // Ground truth: nothing under the cursor now.
    // eslint-disable-next-line no-null/no-null
    stubHoverTarget(null);
    fireEvent.mouseOut(para);
    expect(vi.getTimerCount()).toBe(0);

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(queryTooltip()).not.toBeInTheDocument();
  });

  it('moves directly to an adjacent marker with no further delay once a tooltip is already showing', () => {
    renderEditor();
    const paraA = screen.getByText('First paragraph');
    const paraB = screen.getByText('Second paragraph');

    stubHoverTarget(paraA);
    fireEvent.mouseOver(paraA);
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(queryTooltip()).toHaveTextContent(P_TEXT);

    // Real adjacent-paragraph hover fires mouseout(A, relatedTarget=B) then mouseover(B). The
    // transition itself is decided by ground truth (the stub), not by either event's
    // target/relatedTarget — but relatedTarget still has to name the real entering element here,
    // because React synthesizes mouseleave from mouseout by checking whether relatedTarget is
    // contained in the wrapper; an absent relatedTarget would (correctly, for a real "left the
    // window" case) fire handleMouseLeave and reset state, which is not what this scenario is.
    stubHoverTarget(paraB);
    fireEvent.mouseOut(paraA, { relatedTarget: paraB });
    fireEvent.mouseOver(paraB, { relatedTarget: paraA });

    expect(queryTooltip()).toHaveTextContent(Q1_TEXT);
  });

  it('reapplies the delay once the grace period has elapsed, even across adjacent markers with no true close', () => {
    // Guards the grace period's time bound: an "already showing" shortcut with no time bound would
    // jump to A instantly below, forever, once any tooltip had shown once. Also guards that an
    // expired grace period hides the stale tooltip immediately rather than leaving mismatched
    // content on screen during the re-armed delay.
    renderEditor();
    const paraA = screen.getByText('First paragraph');
    const paraB = screen.getByText('Second paragraph');

    stubHoverTarget(paraA);
    fireEvent.mouseOver(paraA);
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(queryTooltip()).toHaveTextContent(P_TEXT);

    // Adjacent transition well within the grace window: switches instantly — no advance needed.
    // relatedTarget must name the real entering element (see the previous test's comment) so React
    // doesn't synthesize a mouseleave and reset state out from under this assertion.
    stubHoverTarget(paraB);
    fireEvent.mouseOut(paraA, { relatedTarget: paraB });
    fireEvent.mouseOver(paraB, { relatedTarget: paraA });
    expect(queryTooltip()).toHaveTextContent(Q1_TEXT);

    // Let the grace window lapse while sitting on B (no mouseover fires for an unchanged para).
    act(() => {
      vi.advanceTimersByTime(301);
    });

    // Adjacent transition back to A, now outside the grace window: hides the stale tooltip
    // immediately and re-arms the full delay, rather than leaving B's tooltip lingering.
    stubHoverTarget(paraA);
    fireEvent.mouseOut(paraB, { relatedTarget: paraA });
    fireEvent.mouseOver(paraA, { relatedTarget: paraB });
    expect(queryTooltip()).not.toBeInTheDocument();

    // Nothing shown at +299 of the re-armed delay proves it's a real bounded wait, not instant.
    act(() => {
      vi.advanceTimersByTime(299);
    });
    expect(queryTooltip()).not.toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(queryTooltip()).toHaveTextContent(P_TEXT);
  });

  it('recomputes the tooltip position at reveal time, so a scroll during the pending window is reflected', () => {
    // Guards against computing position eagerly at hover time: if computePosition ran synchronously
    // inside the mouseOver handler, the assertion right after fireEvent.mouseOver below would
    // already see 1 call.
    const computePositionSpy = vi.spyOn(tooltipUtils, 'computePosition');
    renderEditor();
    const para = screen.getByText('First paragraph');

    stubHoverTarget(para);
    fireEvent.mouseOver(para);
    expect(computePositionSpy).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(computePositionSpy).toHaveBeenCalledTimes(1);
    expect(queryTooltip()).toHaveTextContent(P_TEXT);
  });

  it('does not reveal a tooltip for a paragraph removed from the DOM before the delay elapses', () => {
    renderEditor();
    const para = screen.getByText('First paragraph');

    stubHoverTarget(para);
    fireEvent.mouseOver(para);
    // Simulates a chapter change or remote edit swapping the DOM out from under a pending hover,
    // with no mouseout or keydown to cancel the timer.
    para.remove();

    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(queryTooltip()).not.toBeInTheDocument();
  });

  it('clears a pending timer on keydown, so typing does not reveal a stale hover', () => {
    renderEditor();
    const para = screen.getByText('First paragraph');

    stubHoverTarget(para);
    fireEvent.mouseOver(para);
    expect(vi.getTimerCount()).toBe(1);

    fireEvent.keyDown(para, { key: 'a' });
    expect(vi.getTimerCount()).toBe(0);

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(queryTooltip()).not.toBeInTheDocument();
  });

  it('clears the pending timer on unmount', () => {
    const { unmount } = renderEditor();
    const para = screen.getByText('First paragraph');

    stubHoverTarget(para);
    fireEvent.mouseOver(para);
    expect(vi.getTimerCount()).toBe(1);

    unmount();
    expect(vi.getTimerCount()).toBe(0);
  });

  it('clears a pending timer when enabled flips false mid-hover, so it never fires while disabled', () => {
    const { rerender } = renderEditor(true);
    const para = screen.getByText('First paragraph');

    stubHoverTarget(para);
    fireEvent.mouseOver(para);
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(vi.getTimerCount()).toBe(1);

    rerender(
      <ParagraphMarkerTooltipOverlay enabled={false}>
        <p className="para usfm_p">First paragraph</p>
        <p className="para usfm_q1">Second paragraph</p>
      </ParagraphMarkerTooltipOverlay>,
    );
    expect(vi.getTimerCount()).toBe(0);

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(queryTooltip()).not.toBeInTheDocument();
  });

  it('does not reopen at a stale position, or skip the delay, on the first hover after enabled flips back true', () => {
    // vi.useFakeTimers() also fakes Date by default, so Date.now() stays frozen across the
    // rerenders below with no advance — the elapsed time reads 0ms, deliberately inside the grace
    // window, so this test isolates whether hoveredDataRef was reset on disable from the
    // grace-period boundary (covered separately above).
    const { rerender } = renderEditor(true);
    const paraA = screen.getByText('First paragraph');
    const paraB = screen.getByText('Second paragraph');

    stubHoverTarget(paraA);
    fireEvent.mouseOver(paraA);
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(queryTooltip()).toHaveTextContent(P_TEXT);

    rerender(
      <ParagraphMarkerTooltipOverlay enabled={false}>
        <p className="para usfm_p">First paragraph</p>
        <p className="para usfm_q1">Second paragraph</p>
      </ParagraphMarkerTooltipOverlay>,
    );
    expect(queryTooltip()).not.toBeInTheDocument();

    rerender(
      <ParagraphMarkerTooltipOverlay enabled>
        <p className="para usfm_p">First paragraph</p>
        <p className="para usfm_q1">Second paragraph</p>
      </ParagraphMarkerTooltipOverlay>,
    );
    // Must not remount already-open from stale state.
    expect(queryTooltip()).not.toBeInTheDocument();

    stubHoverTarget(paraB);
    fireEvent.mouseOver(paraB);
    // Must earn the delay again, not take the "already showing" instant path.
    expect(queryTooltip()).not.toBeInTheDocument();
    expect(vi.getTimerCount()).toBe(1);

    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(queryTooltip()).toHaveTextContent(Q1_TEXT);
  });

  it('ignores a churn-driven mouseout/mouseover pair whose target disagrees with what is actually under the cursor', () => {
    // Guards against the editor's own DOM churn (e.g. an active-paragraph decoration swap), which can
    // make the browser fire a mouseout/mouseover pair whose target/relatedTarget claim a boundary
    // crossing that never really happened — the cursor never moved, and a live hit-test still
    // resolves to the same paragraph. Such a pair must not touch the tooltip at all.
    renderEditor();
    const para = screen.getByText('First paragraph');
    const other = screen.getByText('Second paragraph');

    stubHoverTarget(para);
    fireEvent.mouseOver(para);
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(queryTooltip()).toHaveTextContent(P_TEXT);
    // Baseline, not necessarily 0: Radix/ResizeObserver machinery can leave its own unrelated timers
    // pending here. What this test pins is that the churn pair below arms no *additional* one.
    const timerCountBeforeChurn = vi.getTimerCount();

    // Ground truth still says the cursor is over `para` — nothing really moved — even though this
    // pair's own target/relatedTarget claim a crossing to `other`.
    fireEvent.mouseOut(para, { relatedTarget: other });
    fireEvent.mouseOver(other, { relatedTarget: para });

    expect(queryTooltip()).toHaveTextContent(P_TEXT);
    expect(vi.getTimerCount()).toBe(timerCountBeforeChurn);
  });

  it('cancels a pending reveal once ground truth shows the cursor has left, even though the arming event’s own target claimed otherwise', () => {
    // Guards against trusting an event's target/relatedTarget to arm or revalidate a delayed reveal:
    // a churn-driven event landing between "cursor genuinely left" and "timer fires" could resurrect
    // a tooltip the user was no longer hovering. The decision must come from a live hit-test at the
    // point the event actually names, not from which DOM node the event nominally fired on.
    renderEditor();
    const para = screen.getByText('First paragraph');

    stubHoverTarget(para);
    fireEvent.mouseOver(para);
    expect(vi.getTimerCount()).toBe(1);

    // Ground truth now shows nothing under the cursor (e.g. the paragraph's trailing margin) —
    // even though this event still fires with `para` as its target.
    // eslint-disable-next-line no-null/no-null
    stubHoverTarget(null);
    fireEvent.mouseMove(para, { clientX: 5, clientY: 5 });
    expect(vi.getTimerCount()).toBe(0);

    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(queryTooltip()).not.toBeInTheDocument();
  });
});

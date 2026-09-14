// @vitest-environment jsdom

import '@testing-library/jest-dom';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

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
});

// The repo-wide alias for '@papi/frontend/react' (extensions/__test-mocks__) doesn't export
// useLocalizedStrings, so this component needs its own mock. An empty localized-strings record
// means every marker falls back to its raw USFM text (e.g. '\p'), which is what these tests assert
// on — the delay behavior under test doesn't depend on the actual localized wording.
vi.mock('@papi/frontend/react', () => ({
  useLocalizedStrings: () => [{}],
}));

// Imported after the mock so the component picks up the mocked hook.
// eslint-disable-next-line import/first
import { ParagraphMarkerTooltipOverlay } from './paragraph-marker-tooltip-overlay.component';

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

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

describe('ParagraphMarkerTooltipOverlay hover delay', () => {
  it('shows no tooltip before the delay elapses, and shows one right after', () => {
    renderEditor();
    const para = screen.getByText('First paragraph');

    fireEvent.mouseOver(para);
    expect(queryTooltip()).not.toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(299);
    });
    expect(queryTooltip()).not.toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(queryTooltip()).toHaveTextContent('\\p');
  });

  it('shows nothing and leaves no pending timer for a hover shorter than the delay', () => {
    renderEditor();
    const para = screen.getByText('First paragraph');

    fireEvent.mouseOver(para);
    act(() => {
      vi.advanceTimersByTime(100);
    });
    // A reveal must still be pending at this point — asserted so this test cannot pass vacuously
    // against a version with no timer at all (which would leave the count at 0 throughout).
    expect(vi.getTimerCount()).toBe(1);

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

    fireEvent.mouseOver(paraA);
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(queryTooltip()).toHaveTextContent('\\p');

    // Real adjacent-paragraph hover fires mouseout(A, entering=B) then mouseover(B).
    fireEvent.mouseOut(paraA, { relatedTarget: paraB });
    fireEvent.mouseOver(paraB, { relatedTarget: paraA });

    expect(queryTooltip()).toHaveTextContent('\\q1');
  });

  it('clears the pending timer on unmount', () => {
    const { unmount } = renderEditor();
    const para = screen.getByText('First paragraph');

    fireEvent.mouseOver(para);
    expect(vi.getTimerCount()).toBe(1);

    unmount();
    expect(vi.getTimerCount()).toBe(0);
  });

  it('starts no timer while enabled is false, so a disabled overlay pays nothing for hover', () => {
    renderEditor(false);
    const para = screen.getByText('First paragraph');

    fireEvent.mouseOver(para);
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(queryTooltip()).not.toBeInTheDocument();
    expect(vi.getTimerCount()).toBe(0);
  });

  it('clears a pending timer when enabled flips false mid-hover, so it never fires while disabled', () => {
    const { rerender } = renderEditor(true);
    const para = screen.getByText('First paragraph');

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
});

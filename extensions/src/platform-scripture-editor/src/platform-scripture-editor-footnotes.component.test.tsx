// @vitest-environment jsdom

import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import type { UseWebViewStateHook } from '@papi/core';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import type { Usj } from '@eten-tech-foundation/scripture-utilities';
import { FootnotesLayout } from './platform-scripture-editor-footnotes.component';

// jsdom doesn't ship ResizeObserver. `react-resizable-panels` instantiates one on mount. Same stub
// as paragraph-style-label.component.test.tsx.
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

const EMPTY_USJ: Usj = { type: 'USJ', version: '3.1', content: [] };

const bottomStub: UseWebViewStateHook = <T,>(_key: string, defaultValue: T) => [
  defaultValue,
  vi.fn(),
  vi.fn(),
];

/**
 * Drives `footnotesPanePosition` to `'trailing'` so the trailing-pane layout is exercised too. The
 * hook is generic over the caller's requested type, but this stub knows the concrete shape of the
 * one key it overrides, so it narrows through `unknown` rather than asserting `T` directly.
 */
function trailingStub<T>(key: string, defaultValue: T): [T, () => void, () => void] {
  if (key === 'footnotesPanePosition') {
    const positionValue: unknown = 'trailing';
    // Narrowing a literal test value back to the caller's generic T; the hook's real
    // implementation has the same unavoidable widen-then-narrow shape when reading persisted
    // state of unknown type.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    return [positionValue as T, vi.fn(), vi.fn()];
  }
  return [defaultValue, vi.fn(), vi.fn()];
}

describe('FootnotesLayout content zoom marker', () => {
  it.each([
    ['bottom pane position', bottomStub],
    ['trailing pane position', trailingStub],
  ])('marks the footnotes area exactly once, as "footnotes" (%s)', (_label, useWebViewState) => {
    const { container } = render(
      <FootnotesLayout
        usj={EMPTY_USJ}
        showMarkers
        useWebViewState={useWebViewState}
        copyLimit={undefined}
      >
        <div data-testid="editor-child" />
      </FootnotesLayout>,
    );

    const markedElements = container.querySelectorAll('[data-platform-content-zoom-root]');
    expect(markedElements).toHaveLength(1);

    const marked = markedElements[0];
    expect(marked.getAttribute('data-platform-content-zoom-root')).toBe('footnotes');

    // Coarse containment probe: the marked element must be an ancestor of the footnote list's
    // rendered content, without depending on FootnoteList's internal DOM structure.
    expect(marked.children.length).toBeGreaterThan(0);

    // Dividers/resize handles must stay outside the marked area so they keep their own size.
    const handle = container.querySelector('[data-slot="resizable-handle"]');
    expect(handle).not.toBeNull();
    expect(handle?.closest('[data-platform-content-zoom-root]')).toBeNull();

    // The editor's own marker travels in the reverse portal (elsewhere), not here.
    expect(
      screen.getByTestId('editor-child').closest('[data-platform-content-zoom-root]'),
    ).toBeNull();
  });

  it('names the footnotes area for the zoom indicator, and names nothing without a label', () => {
    const { container, rerender } = render(
      <FootnotesLayout
        usj={EMPTY_USJ}
        showMarkers
        useWebViewState={bottomStub}
        zoomAreaLabel="Footnotes"
        copyLimit={undefined}
      >
        <div />
      </FootnotesLayout>,
    );
    const marked = container.querySelector('[data-platform-content-zoom-root="footnotes"]');
    expect(marked).toHaveAttribute('data-platform-content-zoom-label', 'Footnotes');

    rerender(
      <FootnotesLayout
        usj={EMPTY_USJ}
        showMarkers
        useWebViewState={bottomStub}
        copyLimit={undefined}
      >
        <div />
      </FootnotesLayout>,
    );
    const unlabelled = container.querySelector('[data-platform-content-zoom-root="footnotes"]');
    expect(unlabelled).not.toBeNull();
    expect(unlabelled).not.toHaveAttribute('data-platform-content-zoom-label');
  });
});

/** A chapter with one footnote, so the pane lists it. */
const USJ_WITH_FOOTNOTE: Usj = {
  type: 'USJ',
  version: '3.1',
  content: [
    {
      type: 'para',
      marker: 'p',
      content: [
        'Verse text',
        {
          type: 'note',
          marker: 'f',
          caller: '+',
          content: [{ type: 'char', marker: 'ft', content: ['The footnote text'] }],
        },
      ],
    },
  ],
};

/** Selects everything in the footnotes pane, copies, and returns what was put on the clipboard. */
function copyWholePane(container: HTMLElement) {
  const pane = container.querySelector('[data-platform-content-zoom-root="footnotes"]');
  if (!pane) throw new Error('footnotes pane not rendered');
  const range = document.createRange();
  range.selectNodeContents(pane);
  window.getSelection()?.removeAllRanges();
  window.getSelection()?.addRange(range);
  const setData = vi.fn();
  const notCancelled = fireEvent.copy(pane, { clipboardData: { setData } });
  window.getSelection()?.removeAllRanges();
  return { setData, isCancelled: !notCancelled, selectedText: range.toString() };
}

describe('FootnotesLayout copy limit', () => {
  it('shortens a copy from the pane to the copy limit', () => {
    const { container } = render(
      <FootnotesLayout
        usj={USJ_WITH_FOOTNOTE}
        showMarkers
        useWebViewState={bottomStub}
        copyLimit={5}
      />,
    );

    const { setData, isCancelled, selectedText } = copyWholePane(container);

    expect(selectedText.length).toBeGreaterThan(5);
    expect(isCancelled).toBe(true);
    expect(setData).toHaveBeenCalledTimes(1);
    const [format, text] = setData.mock.calls[0];
    expect(format).toBe('text/plain');
    expect(text).toHaveLength(5);
  });

  it('copies nothing from the pane while the copy limit is 0', () => {
    const { container } = render(
      <FootnotesLayout
        usj={USJ_WITH_FOOTNOTE}
        showMarkers
        useWebViewState={bottomStub}
        copyLimit={0}
      />,
    );

    const { setData, isCancelled } = copyWholePane(container);

    expect(isCancelled).toBe(true);
    expect(setData).not.toHaveBeenCalled();
  });

  it('leaves a copy from the pane alone when there is no copy limit', () => {
    const { container } = render(
      <FootnotesLayout
        usj={USJ_WITH_FOOTNOTE}
        showMarkers
        useWebViewState={bottomStub}
        copyLimit={undefined}
      />,
    );

    const { setData, isCancelled } = copyWholePane(container);

    expect(isCancelled).toBe(false);
    expect(setData).not.toHaveBeenCalled();
  });
});

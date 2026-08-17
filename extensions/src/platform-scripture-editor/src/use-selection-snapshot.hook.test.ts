// @vitest-environment jsdom
import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useSelectionSnapshot } from './use-selection-snapshot.hook';

const CONTENT_SELECTOR = '.editor-input';

let selectedText = '';
let content: HTMLDivElement;
let chrome: HTMLButtonElement;

/** Stand in for the document selection; jsdom has no real text selection to read. */
function stubSelection() {
  // A full Selection cannot be built here — only toString() is exercised by the hook. The disable
  // must sit on the line the assertion is on, so bind the stub before handing it to the spy.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const fakeSelection = { toString: () => selectedText } as unknown as Selection;
  vi.spyOn(window, 'getSelection').mockReturnValue(fakeSelection);
}

function pressOn(target: Element) {
  target.dispatchEvent(new Event('pointerdown', { bubbles: true }));
}

beforeEach(() => {
  selectedText = '';
  content = document.createElement('div');
  content.className = 'editor-input';
  const word = document.createElement('span');
  content.appendChild(word);
  chrome = document.createElement('button');
  document.body.append(content, chrome);
  stubSelection();
});

afterEach(() => {
  vi.restoreAllMocks();
  document.body.replaceChildren();
});

describe('useSelectionSnapshot', () => {
  it('starts with no remembered selection', () => {
    const { result } = renderHook(() => useSelectionSnapshot(CONTENT_SELECTOR));
    expect(result.current()).toBe('');
  });

  it('remembers the selection when a press lands outside the text content', () => {
    const { result } = renderHook(() => useSelectionSnapshot(CONTENT_SELECTOR));
    selectedText = 'grace';
    pressOn(chrome);
    expect(result.current()).toBe('grace');
  });

  it('forgets the selection when a press lands inside the text content', () => {
    const { result } = renderHook(() => useSelectionSnapshot(CONTENT_SELECTOR));
    selectedText = 'grace';
    pressOn(chrome);
    expect(result.current()).toBe('grace');
    selectedText = 'grace';
    pressOn(content.firstElementChild ?? content);
    expect(result.current()).toBe('');
  });

  it('preserves the remembered selection when a later outside press finds nothing selected', () => {
    const { result } = renderHook(() => useSelectionSnapshot(CONTENT_SELECTOR));
    selectedText = 'grace';
    pressOn(chrome);
    selectedText = '';
    pressOn(chrome);
    expect(result.current()).toBe('grace');
  });

  it('replaces the remembered selection when a later outside press finds a new selection', () => {
    const { result } = renderHook(() => useSelectionSnapshot(CONTENT_SELECTOR));
    selectedText = 'grace';
    pressOn(chrome);
    selectedText = 'mercy';
    pressOn(chrome);
    expect(result.current()).toBe('mercy');
  });

  it('returns a stable getter across renders', () => {
    const { result, rerender } = renderHook(() => useSelectionSnapshot(CONTENT_SELECTOR));
    const first = result.current;
    rerender();
    expect(result.current).toBe(first);
  });

  it('stops listening after unmount', () => {
    const { result, unmount } = renderHook(() => useSelectionSnapshot(CONTENT_SELECTOR));
    const getSnapshot = result.current;
    unmount();
    selectedText = 'grace';
    pressOn(chrome);
    expect(getSnapshot()).toBe('');
  });

  it('captures during the capture phase, before a handler that stops propagation', () => {
    const { result } = renderHook(() => useSelectionSnapshot(CONTENT_SELECTOR));
    const chromeContainer = document.createElement('div');
    chromeContainer.append(chrome);
    document.body.append(chromeContainer);
    chromeContainer.addEventListener('pointerdown', (event) => {
      event.stopPropagation();
    });
    selectedText = 'grace';
    pressOn(chrome);
    expect(result.current()).toBe('grace');
  });
});

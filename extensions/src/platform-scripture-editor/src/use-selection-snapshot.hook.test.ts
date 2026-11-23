// @vitest-environment jsdom
import { afterEach, beforeEach, describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useSelectionSnapshot } from './use-selection-snapshot.hook';

const CONTENT_SELECTOR = '.editor-input';

let content: HTMLDivElement;
let contentWord: HTMLSpanElement;
let chrome: HTMLDivElement;
let chromeButton: HTMLButtonElement;
let chromeText: HTMLSpanElement;

/** Put a real document selection over `element`'s text — the same thing the hook reads in a tab. */
function select(element: Element) {
  const range = document.createRange();
  range.selectNodeContents(element);
  const selection = window.getSelection();
  selection?.removeAllRanges();
  selection?.addRange(range);
}

/**
 * Put a document selection over part of `element`'s text, so the selection anchors on a **Text**
 * node rather than an element. This is what a real drag or double-click in the editor produces, so
 * it is the containment path that actually runs in the app.
 */
function selectInsideTextNode(element: Element, start: number, end: number) {
  const textNode = element.firstChild;
  if (!textNode) throw new Error('Element has no text node to select inside');
  const range = document.createRange();
  range.setStart(textNode, start);
  range.setEnd(textNode, end);
  const selection = window.getSelection();
  selection?.removeAllRanges();
  selection?.addRange(range);
}

function clearSelection() {
  window.getSelection()?.removeAllRanges();
}

function pressOn(target: Element) {
  target.dispatchEvent(new Event('pointerdown', { bubbles: true }));
}

beforeEach(() => {
  content = document.createElement('div');
  content.className = 'editor-input';
  contentWord = document.createElement('span');
  contentWord.textContent = 'grace';
  content.append(contentWord);

  // The tab's chrome: a button to press, plus its own selectable text (stands in for the reference
  // input / a search box rendered in the same toolbar).
  chrome = document.createElement('div');
  chromeButton = document.createElement('button');
  chromeText = document.createElement('span');
  chromeText.textContent = 'GEN 1:1';
  chrome.append(chromeButton, chromeText);

  document.body.append(content, chrome);
  clearSelection();
});

afterEach(() => {
  clearSelection();
  document.body.replaceChildren();
});

describe('useSelectionSnapshot', () => {
  it('starts with no remembered selection', () => {
    const { result } = renderHook(() => useSelectionSnapshot(CONTENT_SELECTOR));
    expect(result.current()).toBe('');
  });

  it('remembers the selection when a press lands outside the text content', () => {
    const { result } = renderHook(() => useSelectionSnapshot(CONTENT_SELECTOR));
    select(contentWord);
    pressOn(chromeButton);
    expect(result.current()).toBe('grace');
  });

  it('forgets the selection when a press lands inside the text content', () => {
    const { result } = renderHook(() => useSelectionSnapshot(CONTENT_SELECTOR));
    select(contentWord);
    pressOn(chromeButton);
    pressOn(contentWord);
    expect(result.current()).toBe('');
  });

  it('preserves the remembered selection when a later outside press finds nothing selected', () => {
    const { result } = renderHook(() => useSelectionSnapshot(CONTENT_SELECTOR));
    select(contentWord);
    pressOn(chromeButton);
    clearSelection();
    pressOn(chromeButton);
    expect(result.current()).toBe('grace');
  });

  it('replaces the remembered selection when a later outside press finds a new selection', () => {
    const { result } = renderHook(() => useSelectionSnapshot(CONTENT_SELECTOR));
    select(contentWord);
    pressOn(chromeButton);
    contentWord.textContent = 'mercy';
    select(contentWord);
    pressOn(chromeButton);
    expect(result.current()).toBe('mercy');
  });

  it('remembers a selection anchored on a text node inside the content', () => {
    // A drag or double-click in the editor anchors the selection on the Text node, not on the
    // element, so containment has to resolve through the text node's parent. Without that step the
    // hook would never record anything in the real editor while every element-anchored test here
    // stayed green.
    const { result } = renderHook(() => useSelectionSnapshot(CONTENT_SELECTOR));
    selectInsideTextNode(contentWord, 0, 4);
    pressOn(chromeButton);
    expect(result.current()).toBe('grac');
  });

  it('ignores a text-node selection anchored in the tab’s chrome', () => {
    const { result } = renderHook(() => useSelectionSnapshot(CONTENT_SELECTOR));
    selectInsideTextNode(chromeText, 0, 3);
    pressOn(chromeButton);
    expect(result.current()).toBe('');
  });

  it('ignores a selection anchored in the tab’s chrome rather than the text content', () => {
    // Text selected in a toolbar control (a reference input, a search box) is not scripture and must
    // never reach Find as if the user had selected it in the editor.
    const { result } = renderHook(() => useSelectionSnapshot(CONTENT_SELECTOR));
    select(chromeText);
    pressOn(chromeButton);
    expect(result.current()).toBe('');
  });

  it('hands the remembered selection out once, then forgets it', () => {
    // The snapshot bridges one pointer press. Keeping it would let a selection made long ago
    // pre-fill — and immediately re-run — a search over a term the user had since typed into Find.
    const { result } = renderHook(() => useSelectionSnapshot(CONTENT_SELECTOR));
    select(contentWord);
    pressOn(chromeButton);
    expect(result.current()).toBe('grace');
    expect(result.current()).toBe('');
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
    select(contentWord);
    pressOn(chromeButton);
    expect(getSnapshot()).toBe('');
  });

  it('captures during the capture phase, before a handler that stops propagation', () => {
    const { result } = renderHook(() => useSelectionSnapshot(CONTENT_SELECTOR));
    chrome.addEventListener('pointerdown', (event) => {
      event.stopPropagation();
    });
    select(contentWord);
    pressOn(chromeButton);
    expect(result.current()).toBe('grace');
  });
});

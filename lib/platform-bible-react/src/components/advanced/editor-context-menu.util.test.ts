import { afterEach, describe, expect, it } from 'vitest';
import { isEditorContextMenuOpenFor } from './editor-context-menu.util';

/**
 * Builds a `.editor-input`-bearing editor root, optionally marked as if `ContextMenuPlugin` had
 * opened a right-click menu for it (`aria-controls="editor-context-menu"`, the signal the editor
 * package sets on the focused editor's own root for exactly as long as its menu stays open).
 */
function makeEditorRoot(menuOpen: boolean): HTMLDivElement {
  const root = document.createElement('div');
  root.className = 'editor-input';
  if (menuOpen) root.setAttribute('aria-controls', 'editor-context-menu');
  document.body.appendChild(root);
  return root;
}

describe('isEditorContextMenuOpenFor', () => {
  afterEach(() => {
    document.body.replaceChildren();
  });

  it('returns false for an editor whose menu is closed', () => {
    const root = makeEditorRoot(false);
    expect(isEditorContextMenuOpenFor(root)).toBe(false);
  });

  it('returns true when the given editor root itself carries the open-menu attribute', () => {
    const root = makeEditorRoot(true);
    expect(isEditorContextMenuOpenFor(root)).toBe(true);
  });

  it('returns true when the open-menu attribute is on a `.editor-input` inside the given container', () => {
    const container = document.createElement('div');
    const root = makeEditorRoot(true);
    container.appendChild(root);
    expect(isEditorContextMenuOpenFor(container)).toBe(true);
  });

  it('returns false for a container whose own editor is closed even while a DIFFERENT editor elsewhere has its menu open', () => {
    const container = document.createElement('div');
    const ownRoot = makeEditorRoot(false);
    container.appendChild(ownRoot);
    // A second, unrelated editor (e.g. the footnote popover, or a second web view) with its menu
    // open must never trip this container's gate — the signal has to be read from INSIDE the
    // given container, not from the document as a whole.
    makeEditorRoot(true);
    expect(isEditorContextMenuOpenFor(container)).toBe(false);
  });

  it('returns false for null/undefined (editor not yet mounted)', () => {
    expect(isEditorContextMenuOpenFor(undefined)).toBe(false);
    // eslint-disable-next-line no-null/no-null -- exercising the null branch explicitly
    expect(isEditorContextMenuOpenFor(null)).toBe(false);
  });
});

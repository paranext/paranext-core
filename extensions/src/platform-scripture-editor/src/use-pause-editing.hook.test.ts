// @vitest-environment jsdom

import { renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { usePauseEditing } from './use-pause-editing.hook';

/**
 * An editor root inside its container, with a listener on the root standing in for the editor's own
 * and one on the document standing in for the application's shortcuts.
 */
function mountEditorRoot() {
  const container = document.createElement('div');
  const root = document.createElement('div');
  root.contentEditable = 'true';
  root.tabIndex = 0;
  container.appendChild(root);
  document.body.appendChild(container);

  const editorSaw = vi.fn();
  const applicationSaw = vi.fn();
  ['keydown', 'beforeinput', 'paste', 'cut', 'drop'].forEach((type) => {
    root.addEventListener(type, (event) => editorSaw(event.type));
    document.addEventListener(type, (event) => applicationSaw(event.type));
  });
  return { container, root, editorSaw, applicationSaw };
}

let editor: ReturnType<typeof mountEditorRoot>;

beforeEach(() => {
  editor = mountEditorRoot();
});

afterEach(() => {
  editor.container.remove();
});

function press(key: string, init: KeyboardEventInit = {}): KeyboardEvent {
  const event = new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true, ...init });
  editor.root.dispatchEvent(event);
  return event;
}

function fire(type: string): Event {
  const event = new Event(type, { bubbles: true, cancelable: true });
  editor.root.dispatchEvent(event);
  return event;
}

function pause(isPaused = true) {
  return renderHook(({ paused }) => usePauseEditing(() => editor.root, paused), {
    initialProps: { paused: isPaused },
  });
}

describe('usePauseEditing', () => {
  it.each([
    ['a character', 'a', {}],
    ['a shifted character', 'A', { shiftKey: true }],
    ['a backslash, which opens the marker menu', '\\', {}],
    ['Enter', 'Enter', {}],
    ['Backspace', 'Backspace', {}],
    ['Delete', 'Delete', {}],
    ['Tab', 'Tab', {}],
    ['undo', 'z', { ctrlKey: true }],
    ['redo', 'y', { ctrlKey: true }],
    ['word delete', 'Backspace', { ctrlKey: true }],
    ['undo on macOS', 'z', { metaKey: true }],
    // The caret is in the chapter being left, and moving it there would report that chapter's
    // verse as the current reference.
    ['moving the caret', 'ArrowLeft', {}],
    ['extending the selection', 'ArrowRight', { shiftKey: true }],
    ['moving by word', 'ArrowRight', { ctrlKey: true }],
    ['going to the line end', 'End', {}],
    ['paging down', 'PageDown', {}],
    ['selecting everything', 'a', { ctrlKey: true }],
  ])('holds off %s while paused', (_label, key, init) => {
    pause();
    const event = press(key, init);
    expect(event.defaultPrevented).toBe(true);
    expect(editor.editorSaw).not.toHaveBeenCalled();
  });

  it.each(['beforeinput', 'paste', 'cut', 'drop'])('holds off %s while paused', (type) => {
    pause();
    expect(fire(type).defaultPrevented).toBe(true);
    expect(editor.editorSaw).not.toHaveBeenCalled();
  });

  it.each([
    ['copying', 'c', { ctrlKey: true }],
    ['an application shortcut', 'f', { ctrlKey: true }],
    ['a function key', 'F8', {}],
    ['an Alt chord', 'd', { altKey: true }],
    ['Escape', 'Escape', {}],
  ])('lets %s through while paused', (_label, key, init) => {
    pause();
    const event = press(key, init);
    expect(event.defaultPrevented).toBe(false);
    expect(editor.editorSaw).toHaveBeenCalledWith('keydown');
    expect(editor.applicationSaw).toHaveBeenCalledWith('keydown');
  });

  // Held off by making nothing read-only: the editor keeps the focus, so the user can go on typing
  // in the new chapter without clicking back in.
  it('leaves the editor focused and editable', () => {
    editor.root.focus();
    pause();
    press('a');
    expect(document.activeElement).toBe(editor.root);
    expect(editor.root.contentEditable).toBe('true');
  });

  it('lets every edit through when not paused', () => {
    pause(false);
    expect(press('a').defaultPrevented).toBe(false);
    expect(fire('beforeinput').defaultPrevented).toBe(false);
    expect(editor.editorSaw).toHaveBeenCalledWith('keydown');
    expect(editor.editorSaw).toHaveBeenCalledWith('beforeinput');
  });

  it('lets edits through again once the pause ends', () => {
    const { rerender } = pause();
    expect(press('a').defaultPrevented).toBe(true);
    rerender({ paused: false });
    expect(press('a').defaultPrevented).toBe(false);
    expect(editor.editorSaw).toHaveBeenCalledWith('keydown');
  });

  it('leaves events elsewhere in the container alone', () => {
    const sibling = document.createElement('input');
    editor.container.appendChild(sibling);
    pause();
    const event = new KeyboardEvent('keydown', { key: 'a', bubbles: true, cancelable: true });
    sibling.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(false);
  });

  it('does nothing while the editor has no root', () => {
    renderHook(() => usePauseEditing(() => undefined, true));
    expect(press('a').defaultPrevented).toBe(false);
  });
});

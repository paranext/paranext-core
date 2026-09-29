import { afterEach, describe, expect, it, vi } from 'vitest';
import { createMarkerPaletteInputLock } from './marker-palette-input-lock.util';

function makeEditorInput() {
  const element = document.createElement('div');
  element.setAttribute('contenteditable', 'true');
  const child = document.createElement('span');
  element.appendChild(child);
  document.body.appendChild(element);
  return { element, child };
}

/** Lets pending MutationObserver callbacks run. */
const flushMutations = () =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, 0);
  });

function dispatchCancelable(target: Node, type: string) {
  const event = new Event(type, { bubbles: true, cancelable: true });
  target.dispatchEvent(event);
  return event;
}

describe('createMarkerPaletteInputLock', () => {
  afterEach(() => {
    document.body.replaceChildren();
  });

  it('makes the element non-editable and restores the given editable state on unlock', () => {
    const { element } = makeEditorInput();
    const lock = createMarkerPaletteInputLock();

    lock.lock(element);
    expect(element.getAttribute('contenteditable')).toBe('false');

    lock.unlock(true);
    expect(element.getAttribute('contenteditable')).toBe('true');
  });

  it('restores a read-only editor as non-editable rather than hard-coding true', () => {
    const { element } = makeEditorInput();
    const lock = createMarkerPaletteInputLock();

    lock.lock(element);
    lock.unlock(false);

    expect(element.getAttribute('contenteditable')).toBe('false');
  });

  it('re-asserts the lock when the editor writes contenteditable back mid-session', async () => {
    const { element } = makeEditorInput();
    const lock = createMarkerPaletteInputLock();

    lock.lock(element);
    element.setAttribute('contenteditable', 'true');
    await flushMutations();

    expect(element.getAttribute('contenteditable')).toBe('false');
  });

  it('stops re-asserting after unlock', async () => {
    const { element } = makeEditorInput();
    const lock = createMarkerPaletteInputLock();

    lock.lock(element);
    lock.unlock(false);
    element.setAttribute('contenteditable', 'true');
    await flushMutations();

    expect(element.getAttribute('contenteditable')).toBe('true');
  });

  it.each(['paste', 'cut', 'drop'])('cancels %s inside the locked element', (type) => {
    const { element, child } = makeEditorInput();
    const editorListener = vi.fn();
    element.addEventListener(type, editorListener);
    const lock = createMarkerPaletteInputLock();

    lock.lock(element);
    const event = dispatchCancelable(child, type);

    expect(event.defaultPrevented).toBe(true);
    expect(editorListener).not.toHaveBeenCalled();
  });

  it('leaves paste alone outside the locked element and after unlock', () => {
    const { element, child } = makeEditorInput();
    const other = document.createElement('textarea');
    document.body.appendChild(other);
    const lock = createMarkerPaletteInputLock();

    lock.lock(element);
    expect(dispatchCancelable(other, 'paste').defaultPrevented).toBe(false);

    lock.unlock(true);
    expect(dispatchCancelable(child, 'paste').defaultPrevented).toBe(false);
  });

  it('locks a remounted editor after its predecessor was unlocked while detached', async () => {
    const first = makeEditorInput().element;
    const lock = createMarkerPaletteInputLock();

    lock.lock(first);
    first.remove();
    lock.unlock(true);
    // A detached element is released without being written to.
    expect(first.getAttribute('contenteditable')).toBe('false');

    const second = makeEditorInput().element;
    lock.lock(second);
    expect(second.getAttribute('contenteditable')).toBe('false');

    // The first element's observer is gone: writing to it is no longer corrected.
    first.setAttribute('contenteditable', 'true');
    await flushMutations();
    expect(first.getAttribute('contenteditable')).toBe('true');
  });

  it('moves the lock when asked to lock a different element', async () => {
    const first = makeEditorInput().element;
    const second = makeEditorInput().element;
    const lock = createMarkerPaletteInputLock();

    lock.lock(first);
    lock.lock(second);
    first.setAttribute('contenteditable', 'true');
    await flushMutations();

    expect(first.getAttribute('contenteditable')).toBe('true');
    expect(second.getAttribute('contenteditable')).toBe('false');
  });
});

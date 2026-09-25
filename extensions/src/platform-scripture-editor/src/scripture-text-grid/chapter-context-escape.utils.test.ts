// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest';
import { isEscapeForChapterContext } from './chapter-context-escape.utils';

function keyDownOn(target: EventTarget, key: string) {
  const event = new KeyboardEvent('keydown', { key, bubbles: true });
  target.dispatchEvent(event);
  return event;
}

afterEach(() => {
  document.body.innerHTML = '';
});

describe('isEscapeForChapterContext', () => {
  it('claims Escape pressed in the grid', () => {
    const verseItem = document.body.appendChild(document.createElement('div'));

    expect(isEscapeForChapterContext(keyDownOn(verseItem, 'Escape'))).toBe(true);
  });

  it('ignores other keys', () => {
    const verseItem = document.body.appendChild(document.createElement('div'));

    expect(isEscapeForChapterContext(keyDownOn(verseItem, 'Enter'))).toBe(false);
  });

  it.each(['dialog', 'alertdialog'])(
    'leaves Escape pressed inside an open %s to that window, so it closes first',
    (role) => {
      const dialogElement = document.body.appendChild(document.createElement('div'));
      dialogElement.setAttribute('role', role);
      const closeButton = dialogElement.appendChild(document.createElement('button'));

      expect(isEscapeForChapterContext(keyDownOn(closeButton, 'Escape'))).toBe(false);
    },
  );
});

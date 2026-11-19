import { act, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import type { ReadOnlyPanelContextMenuCallbacks } from './use-read-only-panel-context-menu.hook';

/** The commands a read-only panel's menu can pick, as the menu contribution names them. */
export const COPY_COMMAND = 'platformScriptureEditor.copySelection';
export const FIND_COMMAND = 'platformScripture.openFind';

/** Callbacks for a read-only panel's context menu in which every call is a spy and no menu opens. */
export function makeContextMenuCallbacks(
  overrides: Partial<ReadOnlyPanelContextMenuCallbacks> = {},
): ReadOnlyPanelContextMenuCallbacks {
  return {
    requestMenu: vi.fn(async () => undefined),
    dismissMenu: vi.fn(),
    openFind: vi.fn(),
    sendCommand: vi.fn(),
    ...overrides,
  };
}

/** Right-clicks an element the way the browser reports a mouse right-click. */
export function rightClick(element: Element) {
  act(() => {
    fireEvent(
      element,
      new MouseEvent('contextmenu', {
        bubbles: true,
        cancelable: true,
        button: 2,
        clientX: 12,
        clientY: 34,
      }),
    );
  });
}

/** Selects all the text inside an element, as dragging across it would. */
export function selectTextIn(element: Element) {
  const selection = window.getSelection();
  selection?.removeAllRanges();
  selection?.selectAllChildren(element);
}

/** Lets a settled menu request deliver its pick. */
export async function flushMenuRequest() {
  await act(async () => {
    await Promise.resolve();
    await Promise.resolve();
  });
}

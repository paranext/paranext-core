// @vitest-environment jsdom
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import type { Localized, MultiColumnMenu } from 'platform-bible-utils';
import TabDropdownMenu from './tab-dropdown-menu.component';

// Radix measures its content on mount; jsdom ships neither ResizeObserver nor these methods.
class NoopResizeObserver implements ResizeObserver {
  // Keep an internal record of observed targets so the no-op methods touch `this` and don't
  // trip @typescript-eslint/class-methods-use-this. No test inspects this state.
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
  if (typeof Element.prototype.hasPointerCapture !== 'function') {
    Element.prototype.hasPointerCapture = () => false;
  }
  if (typeof Element.prototype.scrollIntoView !== 'function') {
    Element.prototype.scrollIntoView = () => {};
  }
});

const ITEM_LABEL = 'Show footnotes';

const MENU_DATA: Localized<MultiColumnMenu> = {
  columns: { 'test.column': { label: 'Column', order: 1 } },
  groups: { 'test.group': { column: 'test.column', order: 1 } },
  items: [
    {
      label: ITEM_LABEL,
      localizeNotes: 'Test menu item',
      group: 'test.group',
      order: 1,
      command: 'test.showFootnotes',
    },
  ],
};

type User = ReturnType<typeof userEvent.setup>;

const openWith = {
  pointer: async (user: User, trigger: HTMLElement) => user.click(trigger),
  keyboard: async (user: User, trigger: HTMLElement) => {
    trigger.focus();
    await user.keyboard('{Enter}');
  },
};

const closeWith = {
  'pointer selection': async (user: User) =>
    user.click(await screen.findByRole('menuitem', { name: ITEM_LABEL })),
  'click outside': async (user: User) => user.click(document.body),
  Escape: async (user: User) => user.keyboard('{Escape}'),
  'keyboard selection': async (user: User) => user.keyboard('{ArrowDown}{Enter}'),
};

describe('TabDropdownMenu focus after the menu closes', () => {
  it.each([
    // Pointer closes: returning focus would leave the trigger focused, showing its focus styling,
    // while the pointer is elsewhere.
    { open: 'pointer', close: 'pointer selection', returnsFocus: false },
    { open: 'pointer', close: 'click outside', returnsFocus: false },
    { open: 'keyboard', close: 'pointer selection', returnsFocus: false },
    { open: 'keyboard', close: 'click outside', returnsFocus: false },
    // Keyboard closes: keyboard users continue from the trigger, however the menu was opened.
    { open: 'keyboard', close: 'Escape', returnsFocus: true },
    { open: 'pointer', close: 'Escape', returnsFocus: true },
    { open: 'keyboard', close: 'keyboard selection', returnsFocus: true },
    { open: 'pointer', close: 'keyboard selection', returnsFocus: true },
  ] as const)(
    'opened with $open and closed by $close: focus returns to the trigger = $returnsFocus',
    async ({ open, close, returnsFocus }) => {
      // A modal Radix menu sets `pointer-events: none` on <body>, which user-event would otherwise
      // refuse to click through when closing by clicking outside. 0 is its "never check" level.
      const user = userEvent.setup({ pointerEventsCheck: 0 });
      render(
        <TabDropdownMenu onSelectMenuItem={vi.fn()} menuData={MENU_DATA} tabLabel="Project" />,
      );
      const trigger = screen.getByRole('button', { name: 'Project' });

      await openWith[open](user, trigger);
      await screen.findByRole('menu');
      await closeWith[close](user);
      await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());

      // A branching if/else here would call expect() conditionally, which vitest/no-conditional-expect
      // disallows; comparing the booleans keeps the assertion unconditional.
      expect(trigger === document.activeElement).toBe(returnsFocus);
    },
  );
});

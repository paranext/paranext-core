// @vitest-environment jsdom
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import type { Localized, MultiColumnMenu } from 'platform-bible-utils';
import { QUIET_FOCUS_ATTRIBUTE } from '@/utils/focus.util';
import { installNoopResizeObserver } from '@/test-utils/resize-observer.util';
import TabDropdownMenu from './tab-dropdown-menu.component';

// The hasPointerCapture / scrollIntoView shims this menu needs in jsdom are installed repo-wide by
// vitest.setup.ts. ResizeObserver is opt-in there, because tests that never open an overlay depend
// on jsdom leaving it undefined.
beforeAll(() => {
  installNoopResizeObserver();
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

// Focus itself always comes back to the trigger, whichever input opened or closed the menu — the tab
// order depends on it. What changes is whether the focus ring shows, which the trigger signals with
// a data attribute; whether that attribute actually hides the ring is a CSS question, pinned in a
// real browser by `tab-dropdown-menu-focus.stories.tsx`.
describe('TabDropdownMenu focus after the menu closes', () => {
  it.each([
    { open: 'pointer', close: 'pointer selection', ringSuppressed: true },
    { open: 'pointer', close: 'click outside', ringSuppressed: true },
    { open: 'keyboard', close: 'pointer selection', ringSuppressed: true },
    { open: 'keyboard', close: 'click outside', ringSuppressed: true },
    { open: 'keyboard', close: 'Escape', ringSuppressed: false },
    { open: 'pointer', close: 'Escape', ringSuppressed: false },
    { open: 'keyboard', close: 'keyboard selection', ringSuppressed: false },
    { open: 'pointer', close: 'keyboard selection', ringSuppressed: false },
  ] as const)(
    'opened with $open and closed by $close: focus returns, ring suppressed = $ringSuppressed',
    async ({ open, close, ringSuppressed }) => {
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

      expect(trigger).toHaveFocus();
      expect(trigger.hasAttribute(QUIET_FOCUS_ATTRIBUTE)).toBe(ringSuppressed);
    },
  );

  it('shows the ring again once the user goes back to the keyboard', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(<TabDropdownMenu onSelectMenuItem={vi.fn()} menuData={MENU_DATA} tabLabel="Project" />);
    const trigger = screen.getByRole('button', { name: 'Project' });

    await openWith.pointer(user, trigger);
    await screen.findByRole('menu');
    await closeWith['pointer selection'](user);
    await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());
    expect(trigger.hasAttribute(QUIET_FOCUS_ATTRIBUTE)).toBe(true);

    await user.keyboard('{Shift}');

    expect(trigger.hasAttribute(QUIET_FOCUS_ATTRIBUTE)).toBe(false);
  });

  // Without this, the mark and its inline `outline: none` would outlive the focus they were meant
  // for, and the next *keyboard* arrival at this trigger would land with no ring — the very thing
  // the mechanism exists to prevent.
  it('stops suppressing the ring once focus leaves the trigger', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(<TabDropdownMenu onSelectMenuItem={vi.fn()} menuData={MENU_DATA} tabLabel="Project" />);
    const trigger = screen.getByRole('button', { name: 'Project' });

    await openWith.pointer(user, trigger);
    await screen.findByRole('menu');
    await closeWith['pointer selection'](user);
    await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());
    expect(trigger.hasAttribute(QUIET_FOCUS_ATTRIBUTE)).toBe(true);
    expect(trigger.style.outline).toBe('none');

    trigger.blur();

    expect(trigger.hasAttribute(QUIET_FOCUS_ATTRIBUTE)).toBe(false);
    expect(trigger.style.outline).toBe('');
  });
});

import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, screen, userEvent, waitFor } from 'storybook/test';
import type { Localized, MultiColumnMenu } from 'platform-bible-utils';
import TabDropdownMenu from '@/components/advanced/menus/tab-dropdown-menu.component';
import { QUIET_FOCUS_ATTRIBUTE } from '@/utils/focus.util';

const ITEM_LABEL = 'Show footnotes';

const MENU_DATA: Localized<MultiColumnMenu> = {
  columns: { 'tab.view': { label: 'View', order: 1 } },
  groups: { 'tab.view.display': { column: 'tab.view', order: 1 } },
  items: [
    {
      label: ITEM_LABEL,
      localizeNotes: 'Toggles footnote visibility',
      group: 'tab.view.display',
      order: 1,
      command: 'tab.showFootnotes',
    },
  ],
};

/**
 * Closing a menu always hands focus back to its trigger, because the tab order depends on it. What
 * differs is whether the focus ring shows: it belongs there after a keyboard close and not after a
 * pointer close, and the trigger carries `data-quiet-focus` to say which.
 *
 * These stories add the half jsdom cannot judge — `:focus-visible`, which jsdom reports for any
 * programmatic focus and so cannot distinguish.
 *
 * What they can and cannot see is worth knowing before adding to them. The trigger's `box-shadow`
 * ring never renders in this harness (it stays zero-width even with the suppression removed), so
 * asserting on it would pass whatever the code did. `outline` is a different matter: the stories
 * below inject a host rule and assert the computed `outline-style`, which does distinguish a
 * working suppression from a broken one. Anything resting on the ring itself still has to be
 * confirmed in the running app.
 */
const meta: Meta<typeof TabDropdownMenu> = {
  title: 'Advanced/Menu/TabDropdownMenu Focus',
  component: TabDropdownMenu,
  tags: ['!autodocs', 'test'],
  args: { menuData: MENU_DATA, tabLabel: 'Project', onSelectMenuItem: () => {} },
};

export default meta;
type Story = StoryObj<typeof TabDropdownMenu>;

/** Opens the menu with a click, then closes it the requested way, and returns the trigger. */
async function openAndCloseMenu(closeWith: 'item click' | 'Escape') {
  const trigger = screen.getByRole('button', { name: 'Project' });
  await userEvent.click(trigger);
  const item = await screen.findByRole('menuitem', { name: ITEM_LABEL });
  if (closeWith === 'item click') await userEvent.click(item);
  else await userEvent.keyboard('{Escape}');
  await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());
  return trigger;
}

export const PointerCloseMarksTheTrigger: Story = {
  play: async () => {
    const trigger = await openAndCloseMenu('item click');

    await expect(trigger).toHaveFocus();
    await expect(trigger.hasAttribute(QUIET_FOCUS_ATTRIBUTE)).toBe(true);
  },
};

export const KeyboardCloseLeavesTheTriggerUnmarked: Story = {
  play: async () => {
    const trigger = await openAndCloseMenu('Escape');

    await expect(trigger).toHaveFocus();
    await expect(trigger.hasAttribute(QUIET_FOCUS_ATTRIBUTE)).toBe(false);
    // The ring the attribute would suppress is genuinely owed here, which is what makes leaving the
    // trigger unmarked the whole point of the keyboard path.
    await expect(trigger.matches(':focus-visible')).toBe(true);
  },
};

/**
 * Host documents draw focus through `outline` as well as the ring and the border. The scripture
 * editor's web view is one: `_editor-overrides.scss` gives every `:focus-visible` element a 2px
 * outline. Its colour is `transparent`, which looks harmless — but `Button` animates every
 * property, so the outline fades from the app-wide `outline-ring/50` toward transparent and paints
 * a visible dark line on the way. Suppression therefore has to remove the outline _style_, not
 * trust its colour.
 *
 * Runs the rule against the trigger for real rather than asserting on the class string, so it fails
 * if the suppression stops covering outlines however that happens.
 */
const EDITOR_FOCUS_OUTLINE =
  ':focus-visible:not(.editor-input) { outline: 2px solid transparent; }';

async function withHostFocusOutline(run: () => Promise<void>) {
  const style = document.createElement('style');
  style.textContent = EDITOR_FOCUS_OUTLINE;
  document.head.appendChild(style);
  try {
    await run();
  } finally {
    style.remove();
  }
}

export const PointerCloseSuppressesAHostOutline: Story = {
  play: async () => {
    await withHostFocusOutline(async () => {
      const trigger = await openAndCloseMenu('item click');

      await expect(trigger).toHaveFocus();
      await expect(getComputedStyle(trigger).outlineStyle).toBe('none');
    });
  },
};

export const KeyboardCloseKeepsAHostOutline: Story = {
  play: async () => {
    await withHostFocusOutline(async () => {
      const trigger = await openAndCloseMenu('Escape');

      // The positive control for the story above: it proves the injected rule reaches this trigger,
      // so `outline-style: none` there is the suppression working rather than the rule never landing.
      await expect(trigger).toHaveFocus();
      await expect(getComputedStyle(trigger).outlineStyle).toBe('solid');
    });
  },
};

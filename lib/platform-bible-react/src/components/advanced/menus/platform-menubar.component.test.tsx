// @vitest-environment jsdom
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import type { Localized, MultiColumnMenu } from 'platform-bible-utils';
import { PlatformMenubar } from './platform-menubar.component';

// Radix menus instantiate a ResizeObserver; jsdom ships none.
class NoopResizeObserver implements ResizeObserver {
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
  if (typeof globalThis.ResizeObserver === 'undefined')
    globalThis.ResizeObserver = NoopResizeObserver;
});

// userEvent-driven Radix menus can take seconds per click on a contended Windows CI worker
vi.setConfig({ testTimeout: 20_000 });

const MAIN_MENU: Localized<MultiColumnMenu> = {
  columns: {
    'platform.app': { label: 'Project', order: 1 },
    'platform.window': { label: 'Window', order: 2 },
  },
  groups: {
    'platform.projectSettings': { column: 'platform.app', order: 1 },
    'platform.windowGeneral': { column: 'platform.window', order: 1 },
  },
  items: [
    {
      label: 'Find',
      localizeNotes: '',
      group: 'platform.projectSettings',
      order: 1,
      command: 'platformScripture.openFind',
      shortcut: 'Ctrl+F',
    },
    {
      label: 'Settings',
      localizeNotes: '',
      group: 'platform.projectSettings',
      order: 2,
      command: 'platform.openSettings',
    },
    {
      label: 'New window',
      localizeNotes: '',
      group: 'platform.windowGeneral',
      order: 1,
      command: 'platform.openWindow',
    },
  ],
};

describe('PlatformMenubar', () => {
  it('shows the shortcut beside an item that has one, and nothing beside one without', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(<PlatformMenubar menuData={MAIN_MENU} onSelectMenuItem={() => {}} />);

    await user.click(screen.getByRole('menuitem', { name: 'Project' }));

    const find = await screen.findByRole('menuitem', { name: /^Find/ });
    expect(within(find).getByText('Ctrl+F')).toHaveAttribute('data-slot', 'menubar-shortcut');
    const settings = screen.getByRole('menuitem', { name: /^Settings/ });
    expect(settings.querySelector('[data-slot="menubar-shortcut"]')).toBeNull();
  });

  it('gives the shortcut its own direction so its keys keep their order in a right-to-left layout', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(<PlatformMenubar menuData={MAIN_MENU} onSelectMenuItem={() => {}} />);

    await user.click(screen.getByRole('menuitem', { name: 'Project' }));

    const find = await screen.findByRole('menuitem', { name: /^Find/ });
    // jsdom computes no bidi, so the class that isolates the hint is the checkable part
    expect(within(find).getByText('Ctrl+F')).toHaveClass('tw:[unicode-bidi:plaintext]');
  });

  it('makes each column a top-level trigger instead of a heading inside an open menu', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(<PlatformMenubar menuData={MAIN_MENU} onSelectMenuItem={() => {}} />);

    await user.click(screen.getByRole('menuitem', { name: 'Project' }));
    await screen.findByRole('menuitem', { name: /^Find/ });

    expect(document.querySelectorAll('[data-slot="menubar-label"]')).toHaveLength(0);
    // Each column label appears once, as the trigger that opens it — never repeated as a heading
    expect(screen.getAllByText('Project')).toHaveLength(1);
    expect(screen.getAllByText('Window')).toHaveLength(1);
  });
});

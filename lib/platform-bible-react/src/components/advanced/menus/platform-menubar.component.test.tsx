// @vitest-environment jsdom
import { PlatformMenubar } from '@/components/advanced/menus/platform-menubar.component';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Localized, MultiColumnMenu } from 'platform-bible-utils';
import { beforeAll, describe, expect, it } from 'vitest';

// jsdom doesn't ship a ResizeObserver, which Radix's Popper-positioned menu content instantiates
// on mount. A no-op stub is sufficient since these tests inspect structure, not layout.
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

/**
 * Hiding menu items for an interface mode prunes items only — the groups and columns they belonged
 * to survive, so a group can end up with nothing in it. These fixtures place an emptied group in
 * each of the three positions a column can put one, because the separator rule keys off a group's
 * index among _all_ the column's groups rather than among the ones that still have items.
 */
function menuWithGroupsAndItems(
  groupKeys: string[],
  populatedGroupKeys: string[],
): Localized<MultiColumnMenu> {
  return {
    columns: { 'platform.app': { label: 'Project', order: 1 } },
    groups: Object.fromEntries(
      groupKeys.map((key, index) => [key, { column: 'platform.app', order: index + 1 }]),
    ),
    items: populatedGroupKeys.map((group, index) => ({
      label: `Item in ${group}`,
      localizeNotes: '',
      group,
      order: index + 1,
      command: `test.${group}`,
    })),
  };
}

// Radix opens a menubar column from a full pointer sequence, which userEvent produces and a bare
// fireEvent click does not.
async function openProjectColumn(menuData: Localized<MultiColumnMenu>) {
  render(<PlatformMenubar menuData={menuData} onSelectMenuItem={() => {}} />);
  await userEvent.click(screen.getByRole('menuitem', { name: 'Project' }));
  return screen.getByRole('menu');
}

/** Separators are decorative, so they carry no accessible role — find them by their data attribute. */
function childKinds(menu: HTMLElement): ('separator' | 'item')[] {
  return Array.from(menu.children).flatMap((child) => {
    if (child.getAttribute('data-slot') === 'menubar-separator') return ['separator' as const];
    if (child.getAttribute('role') === 'menuitem') return ['item' as const];
    return [];
  });
}

describe('PlatformMenubar separators around groups emptied by mode filtering', () => {
  it.each([
    ['a leading group', ['g1', 'g2', 'g3'], ['g2', 'g3']],
    ['a middle group', ['g1', 'g2', 'g3'], ['g1', 'g3']],
  ])('emits no stray separator when %s is empty', async (_, groupKeys, populatedGroupKeys) => {
    const kinds = childKinds(
      await openProjectColumn(menuWithGroupsAndItems(groupKeys, populatedGroupKeys)),
    );

    expect(kinds.length).toBeGreaterThan(0);
    expect(kinds.at(0)).not.toBe('separator');
    expect(kinds.at(-1)).not.toBe('separator');
    const doubledSeparators = kinds.filter(
      (kind, index) => index > 0 && kind === 'separator' && kinds[index - 1] === 'separator',
    );
    expect(doubledSeparators).toEqual([]);
  });

  /**
   * The shipped Simple menu does not hit this shape — the groups it empties are leading or middle
   * ones — but nothing prevents a later reordering from emptying a trailing group, so pin the
   * behavior rather than leave it undiscovered. Suppressing empty groups is deliberately out of
   * scope here; it belongs with the wider menu restructure.
   */
  it('leaves a trailing separator when the last group is empty', async () => {
    const kinds = childKinds(await openProjectColumn(menuWithGroupsAndItems(['g1', 'g2'], ['g1'])));

    expect(kinds.at(-1)).toBe('separator');
  });

  it('separates two populated groups', async () => {
    const kinds = childKinds(
      await openProjectColumn(menuWithGroupsAndItems(['g1', 'g2'], ['g1', 'g2'])),
    );

    expect(kinds).toEqual(['item', 'separator', 'item']);
  });
});

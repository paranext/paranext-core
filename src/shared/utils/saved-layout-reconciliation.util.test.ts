import { describe, expect, test } from 'vitest';
import type { LayoutInfo } from '@shared/models/docking-framework.model';
import {
  reconcileSavedLayout,
  savedLayoutHasAnyTabs,
  savedLayoutHasViewableTabs,
} from '@shared/utils/saved-layout-reconciliation.util';

/** A well-formed saved tab, the way rc-dock serializes one */
function tab(id: string): Record<string, unknown> {
  return { id, tabType: 'webView', data: { id, webViewType: 'test.type', state: {} } };
}

describe('reconcileSavedLayout', () => {
  test('returns a normal layout unchanged and does not mutate its input', () => {
    const layout: LayoutInfo = {
      dockbox: {
        mode: 'horizontal',
        children: [
          { tabs: [tab('alpha'), tab('beta')], activeId: 'alpha', group: 'default' },
          { mode: 'vertical', children: [{ tabs: [tab('gamma')] }] },
        ],
      },
      floatbox: {
        mode: 'float',
        children: [{ tabs: [tab('delta')], x: 10, y: 20, w: 300, h: 200 }],
      },
    };
    const original = JSON.parse(JSON.stringify(layout));

    const reconciled = reconcileSavedLayout(layout);

    expect(reconciled).toEqual(original);
    expect(layout).toEqual(original);
  });

  test('drops every occurrence of a duplicated tab id after the first', () => {
    const layout: LayoutInfo = {
      dockbox: {
        mode: 'horizontal',
        children: [{ tabs: [tab('alpha'), tab('alpha'), tab('beta')] }],
      },
    };

    const reconciled = reconcileSavedLayout(layout);

    const { dockbox } = reconciled;
    expect(dockbox).toEqual({
      mode: 'horizontal',
      children: [{ tabs: [tab('alpha'), tab('beta')] }],
    });
  });

  test('resolves a duplicate across boxes in favor of the docked copy', () => {
    const layout: LayoutInfo = {
      dockbox: { mode: 'horizontal', children: [{ tabs: [tab('alpha')] }] },
      floatbox: { mode: 'float', children: [{ tabs: [tab('alpha'), tab('floaty')] }] },
    };

    const reconciled = reconcileSavedLayout(layout);

    expect(reconciled.dockbox).toEqual({
      mode: 'horizontal',
      children: [{ tabs: [tab('alpha')] }],
    });
    expect(reconciled.floatbox).toEqual({ mode: 'float', children: [{ tabs: [tab('floaty')] }] });
  });

  test('drops tabs with no usable id', () => {
    const layout: LayoutInfo = {
      dockbox: {
        mode: 'horizontal',
        children: [{ tabs: [{ tabType: 'webView' }, { id: '' }, tab('alpha')] }],
      },
    };

    const reconciled = reconcileSavedLayout(layout);

    expect(reconciled.dockbox).toEqual({
      mode: 'horizontal',
      children: [{ tabs: [tab('alpha')] }],
    });
  });

  test('drops a tab placed directly in a box instead of inside a panel', () => {
    // A tab is only reachable through a panel's `tabs` array; one that ends up as a direct child of
    // a box would never render
    const layout: LayoutInfo = {
      dockbox: {
        mode: 'horizontal',
        children: [tab('stray'), { tabs: [tab('alpha')] }],
      },
    };

    const reconciled = reconcileSavedLayout(layout);

    expect(reconciled.dockbox).toEqual({
      mode: 'horizontal',
      children: [{ tabs: [tab('alpha')] }],
    });
  });

  test('removes panels and boxes that end up empty', () => {
    const layout: LayoutInfo = {
      dockbox: {
        mode: 'horizontal',
        children: [
          { tabs: [] },
          { mode: 'vertical', children: [{ tabs: [{ tabType: 'webView' }] }] },
          { tabs: [tab('alpha')] },
        ],
      },
    };

    const reconciled = reconcileSavedLayout(layout);

    expect(reconciled.dockbox).toEqual({
      mode: 'horizontal',
      children: [{ tabs: [tab('alpha')] }],
    });
  });

  test('removes an emptied floatbox entirely but keeps an emptied dockbox', () => {
    const layout: LayoutInfo = {
      dockbox: { mode: 'horizontal', children: [{ tabs: [] }] },
      floatbox: { mode: 'float', children: [{ tabs: [] }] },
    };

    const reconciled = reconcileSavedLayout(layout);

    expect(reconciled.dockbox).toEqual({ mode: 'horizontal', children: [] });
    expect('floatbox' in reconciled).toBe(false);
  });
});

describe('savedLayoutHasViewableTabs', () => {
  test('sees a docked tab', () => {
    expect(
      savedLayoutHasViewableTabs({
        dockbox: { mode: 'horizontal', children: [{ tabs: [tab('alpha')] }] },
      }),
    ).toBe(true);
  });

  test('sees a tab that only exists floated', () => {
    expect(
      savedLayoutHasViewableTabs({
        dockbox: { mode: 'horizontal', children: [] },
        floatbox: { mode: 'float', children: [{ tabs: [tab('floaty')] }] },
      }),
    ).toBe(true);
  });

  test('reports an empty layout as having none', () => {
    expect(savedLayoutHasViewableTabs({ dockbox: { mode: 'horizontal', children: [] } })).toBe(
      false,
    );
  });

  test('does not count tabs that lack ids', () => {
    expect(
      savedLayoutHasViewableTabs({
        dockbox: { mode: 'horizontal', children: [{ tabs: [{ tabType: 'webView' }] }] },
      }),
    ).toBe(false);
  });
});

describe('savedLayoutHasAnyTabs', () => {
  test('reports a layout saved with no tabs anywhere as tab-less', () => {
    expect(savedLayoutHasAnyTabs({ dockbox: { mode: 'horizontal', children: [] } })).toBe(false);
    expect(
      savedLayoutHasAnyTabs({ dockbox: { mode: 'horizontal', children: [{ tabs: [] }] } }),
    ).toBe(false);
  });

  test('counts a phantom tab (no usable id) as structurally present', () => {
    // This is the discriminator against savedLayoutHasViewableTabs: tabs present but none
    // viewable means junk, whereas no tabs at all means a legitimately empty window
    expect(
      savedLayoutHasAnyTabs({
        dockbox: { mode: 'horizontal', children: [{ tabs: [{ tabType: 'webView' }] }] },
      }),
    ).toBe(true);
  });

  test('sees a real tab wherever it lives', () => {
    expect(
      savedLayoutHasAnyTabs({
        dockbox: { mode: 'horizontal', children: [] },
        floatbox: { mode: 'float', children: [{ tabs: [tab('floaty')] }] },
      }),
    ).toBe(true);
  });
});

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

  test('repoints a panel’s activeId when the tab it names is dropped', () => {
    // The second panel's copy of `alpha` loses to the docked one, taking the tab `activeId` names
    // with it. rc-dock silently falls back to the leftmost tab when `activeId` matches none of a
    // panel's tabs, so a dangling id would quietly land the user on `beta` anyway — say so in the
    // data rather than leaving a reference to a tab that is no longer there.
    const layout: LayoutInfo = {
      dockbox: {
        mode: 'horizontal',
        children: [
          { tabs: [tab('alpha')], activeId: 'alpha' },
          { tabs: [tab('alpha'), tab('beta')], activeId: 'alpha' },
        ],
      },
    };

    const reconciled = reconcileSavedLayout(layout);

    expect(reconciled.dockbox).toEqual({
      mode: 'horizontal',
      children: [
        { tabs: [tab('alpha')], activeId: 'alpha' },
        { tabs: [tab('beta')], activeId: 'beta' },
      ],
    });
  });

  test('drops an activeId when a panel keeps no tabs but survives for its children', () => {
    const layout: LayoutInfo = {
      dockbox: {
        mode: 'horizontal',
        children: [
          {
            tabs: [{ tabType: 'webView' }],
            activeId: 'gone',
            children: [{ tabs: [tab('alpha')] }],
          },
        ],
      },
    };

    const reconciled = reconcileSavedLayout(layout);

    expect(reconciled.dockbox).toEqual({
      mode: 'horizontal',
      children: [{ tabs: [], children: [{ tabs: [tab('alpha')] }] }],
    });
  });

  test('drops an activeId from a node that carries no tabs at all', () => {
    // No producer writes this shape, but the input is arbitrary JSON off disk — version skew or a
    // hand-edited structure file — and sanitizing it is exactly this pass's job
    const layout: LayoutInfo = {
      dockbox: {
        mode: 'horizontal',
        children: [{ activeId: 'gone', children: [{ tabs: [tab('alpha')] }] }],
      },
    };

    const reconciled = reconcileSavedLayout(layout);

    expect(reconciled.dockbox).toEqual({
      mode: 'horizontal',
      children: [{ children: [{ tabs: [tab('alpha')] }] }],
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

describe('reconcileSavedLayout with tab groups rc-dock does not render', () => {
  /** A saved tab group, the way rc-dock serializes one that is not floating */
  function savedTabGroup(id: string, tabIds: string[]): Record<string, unknown> {
    return {
      id,
      size: 200,
      tabs: tabIds.map((tabId) => tab(tabId)),
      group: 'card platform-bible',
      activeId: tabIds[0],
    };
  }

  /** The layout rc-dock saves after a panel was docked beside its only floating tab group */
  function layoutWithBoxInFloatbox(): LayoutInfo {
    // rc-dock wraps both groups in a box inside the floating layer, which draws only the tab
    // groups directly inside it
    return {
      dockbox: {
        id: '+1',
        size: 200,
        mode: 'horizontal',
        children: [savedTabGroup('docked-group', ['project-a'])],
      },
      floatbox: {
        id: '+2',
        size: 1,
        mode: 'float',
        children: [
          {
            id: '+7',
            size: 200,
            mode: 'horizontal',
            children: [
              savedTabGroup('floating-group', ['project-f']),
              savedTabGroup('+6', ['find']),
            ],
          },
        ],
      },
      windowbox: { id: '+3', size: 1, mode: 'window', children: [] },
      maxbox: { id: '+4', size: 1, mode: 'maximize', children: [] },
    };
  }

  test('moves the tab groups of a box in the floating layer to the right edge of the dock box', () => {
    expect(reconcileSavedLayout(layoutWithBoxInFloatbox())).toEqual({
      dockbox: {
        id: '+1',
        size: 200,
        mode: 'horizontal',
        children: [
          savedTabGroup('docked-group', ['project-a']),
          savedTabGroup('floating-group', ['project-f']),
          savedTabGroup('+6', ['find']),
        ],
      },
    });
  });

  test('drops the floating position of a tab group it moves, but not of one still floating', () => {
    const layout: LayoutInfo = {
      dockbox: { mode: 'horizontal', children: [{ tabs: [tab('project-a')] }] },
      floatbox: {
        mode: 'float',
        children: [
          { tabs: [tab('notes')], x: 5, y: 6, z: 2, w: 300, h: 200 },
          {
            mode: 'horizontal',
            children: [
              { tabs: [tab('project-f')], x: 10, y: 20, z: 3, w: 400, h: 300 },
              { tabs: [tab('find')] },
            ],
          },
        ],
      },
    };

    expect(reconcileSavedLayout(layout)).toEqual({
      dockbox: {
        mode: 'horizontal',
        children: [
          { tabs: [tab('project-a')] },
          { tabs: [tab('project-f')] },
          { tabs: [tab('find')] },
        ],
      },
      floatbox: {
        mode: 'float',
        children: [{ tabs: [tab('notes')], x: 5, y: 6, z: 2, w: 300, h: 200 }],
      },
    });
  });

  test('moves tab groups from boxes nested at any depth, in layout order', () => {
    const layout: LayoutInfo = {
      dockbox: { mode: 'horizontal', children: [{ tabs: [tab('project-a')] }] },
      floatbox: {
        mode: 'float',
        children: [
          {
            mode: 'vertical',
            children: [
              {
                mode: 'horizontal',
                children: [{ tabs: [tab('first')] }, { tabs: [tab('second')] }],
              },
              { tabs: [tab('third')] },
            ],
          },
        ],
      },
    };

    expect(reconcileSavedLayout(layout)).toEqual({
      dockbox: {
        mode: 'horizontal',
        children: [
          { tabs: [tab('project-a')] },
          { tabs: [tab('first')] },
          { tabs: [tab('second')] },
          { tabs: [tab('third')] },
        ],
      },
    });
  });

  test('puts a dock box laid out top to bottom beside the moved tab groups', () => {
    const layout: LayoutInfo = {
      dockbox: {
        mode: 'vertical',
        children: [{ tabs: [tab('upper')] }, { tabs: [tab('lower')] }],
      },
      floatbox: {
        mode: 'float',
        children: [
          {
            mode: 'horizontal',
            children: [{ tabs: [tab('project-f')] }, { tabs: [tab('find')] }],
          },
        ],
      },
    };

    expect(reconcileSavedLayout(layout)).toEqual({
      dockbox: {
        mode: 'horizontal',
        children: [
          { mode: 'vertical', children: [{ tabs: [tab('upper')] }, { tabs: [tab('lower')] }] },
          { tabs: [tab('project-f')] },
          { tabs: [tab('find')] },
        ],
      },
    });
  });

  test.each([
    ['windowbox', 'window'],
    ['maxbox', 'maximize'],
  ])('moves the tab groups of a box in the %s too', (key, mode) => {
    const layout: LayoutInfo = {
      dockbox: { mode: 'horizontal', children: [{ tabs: [tab('project-a')] }] },
      [key]: {
        mode,
        children: [
          {
            mode: 'horizontal',
            children: [{ tabs: [tab('project-f')] }, { tabs: [tab('find')] }],
          },
        ],
      },
    };

    expect(reconcileSavedLayout(layout)).toEqual({
      dockbox: {
        mode: 'horizontal',
        children: [
          { tabs: [tab('project-a')] },
          { tabs: [tab('project-f')] },
          { tabs: [tab('find')] },
        ],
      },
    });
  });

  test('keeps the docked copy when a moved tab group repeats a docked tab', () => {
    const layout: LayoutInfo = {
      dockbox: { mode: 'horizontal', children: [{ tabs: [tab('project-a'), tab('find')] }] },
      floatbox: {
        mode: 'float',
        children: [
          {
            mode: 'horizontal',
            children: [{ tabs: [tab('project-f')] }, { tabs: [tab('find')], activeId: 'find' }],
          },
        ],
      },
    };

    expect(reconcileSavedLayout(layout)).toEqual({
      dockbox: {
        mode: 'horizontal',
        children: [{ tabs: [tab('project-a'), tab('find')] }, { tabs: [tab('project-f')] }],
      },
    });
  });

  test('is idempotent and does not mutate its input', () => {
    const layout = layoutWithBoxInFloatbox();
    const original = JSON.parse(JSON.stringify(layout));

    const once = reconcileSavedLayout(layout);

    expect(reconcileSavedLayout(once)).toEqual(once);
    expect(layout).toEqual(original);
  });

  describe('with malformed nodes beside a box in the floating layer', () => {
    const dockedGroup = { tabs: [tab('docked')] };
    const rescuedGroup = { tabs: [tab('rescued')] };
    const boxWithRescuedGroup = { mode: 'horizontal', children: [rescuedGroup] };

    test.each<[string, LayoutInfo, LayoutInfo]>([
      [
        'no dockbox',
        { floatbox: { mode: 'float', children: [boxWithRescuedGroup] } },
        { dockbox: { mode: 'horizontal', children: [rescuedGroup] } },
      ],
      [
        'a null and a primitive child',
        {
          dockbox: { mode: 'horizontal', children: [dockedGroup] },
          // A null child is part of the malformed input under test
          // eslint-disable-next-line no-null/no-null
          floatbox: { mode: 'float', children: [null, 5, boxWithRescuedGroup] },
        },
        { dockbox: { mode: 'horizontal', children: [dockedGroup, rescuedGroup] } },
      ],
      [
        'a box child whose children is not an array',
        {
          dockbox: { mode: 'horizontal', children: [dockedGroup] },
          floatbox: {
            mode: 'float',
            children: [
              { mode: 'horizontal', children: 'not an array' },
              boxWithRescuedGroup,
              { tabs: [tab('floating')], x: 1, y: 2, w: 300, h: 200 },
            ],
          },
        },
        {
          dockbox: { mode: 'horizontal', children: [dockedGroup, rescuedGroup] },
          floatbox: {
            mode: 'float',
            children: [{ tabs: [tab('floating')], x: 1, y: 2, w: 300, h: 200 }],
          },
        },
      ],
      [
        'a dockbox that is an array',
        {
          dockbox: [dockedGroup],
          floatbox: { mode: 'float', children: [boxWithRescuedGroup] },
        },
        // The array is neither a panel nor a box, so it is dropped from the new horizontal dock box
        { dockbox: { mode: 'horizontal', children: [rescuedGroup] } },
      ],
    ])('does not throw and returns a usable layout for %s', (_name, layout, expected) => {
      expect(reconcileSavedLayout(layout)).toEqual(expected);
    });
  });

  test('leaves tab groups directly in the windowed and maximized layers where they are', () => {
    const layout: LayoutInfo = {
      dockbox: { mode: 'horizontal', children: [{ tabs: [tab('project-a')] }] },
      windowbox: {
        mode: 'window',
        children: [{ tabs: [tab('popped-out')], x: 1, y: 2, w: 300, h: 200 }],
      },
      maxbox: { mode: 'maximize', children: [{ tabs: [tab('big')] }] },
    };
    const original = JSON.parse(JSON.stringify(layout));

    expect(reconcileSavedLayout(layout)).toEqual(original);
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

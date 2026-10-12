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
              // A floating group rc-dock wrapped keeps the position it had while floating
              {
                ...savedTabGroup('floating-group', ['project-f']),
                x: 10,
                y: 20,
                z: 3,
                w: 400,
                h: 300,
              },
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
    const snapshot = structuredClone(layout);

    expect(reconcileSavedLayout(layout)).toEqual({
      dockbox: {
        mode: 'horizontal',
        children: [
          { tabs: [tab('project-a')] },
          { tabs: [tab('project-f')], size: 200 },
          { tabs: [tab('find')], size: 200 },
        ],
      },
      floatbox: {
        mode: 'float',
        children: [{ tabs: [tab('notes')], x: 5, y: 6, z: 2, w: 300, h: 200 }],
      },
    });
    expect(layout).toEqual(snapshot);
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
          { tabs: [tab('first')], size: 200 },
          { tabs: [tab('second')], size: 200 },
          { tabs: [tab('third')], size: 200 },
        ],
      },
    });
  });

  /** The id of every box and tab group in a layout's root boxes, in layout order */
  function nodeIdsIn(layout: LayoutInfo): string[] {
    const ids: string[] = [];
    const visit = (value: unknown): void => {
      if (!value || typeof value !== 'object') return;
      if ('id' in value && typeof value.id === 'string') ids.push(value.id);
      if ('children' in value && Array.isArray(value.children)) value.children.forEach(visit);
    };
    ['dockbox', 'floatbox', 'windowbox', 'maxbox'].forEach((key) => visit(layout[key]));
    return ids;
  }

  test('puts a dock box laid out top to bottom beside the moved tab groups, 70% to 30%', () => {
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
        id: '+1',
        mode: 'horizontal',
        children: [
          {
            mode: 'vertical',
            size: 280,
            children: [{ tabs: [tab('upper')] }, { tabs: [tab('lower')] }],
          },
          { tabs: [tab('project-f')], size: 60 },
          { tabs: [tab('find')], size: 60 },
        ],
      },
    });
  });

  test('gives one moved tab group the whole 30% beside a dock box laid out top to bottom', () => {
    const layout: LayoutInfo = {
      dockbox: { mode: 'vertical', size: 200, children: [{ tabs: [tab('upper')], size: 200 }] },
      floatbox: {
        mode: 'float',
        children: [{ mode: 'horizontal', children: [{ tabs: [tab('find')], size: 200 }] }],
      },
    };

    expect(reconcileSavedLayout(layout).dockbox).toEqual({
      id: '+1',
      mode: 'horizontal',
      children: [
        { mode: 'vertical', size: 280, children: [{ tabs: [tab('upper')], size: 200 }] },
        { tabs: [tab('find')], size: 120 },
      ],
    });
  });

  test('gives a tab group moved into a dock box laid out left to right the average size of the groups there', () => {
    const layout: LayoutInfo = {
      dockbox: {
        mode: 'horizontal',
        children: [
          { tabs: [tab('project-a')], size: 900 },
          { tabs: [tab('project-b')], size: 300 },
        ],
      },
      floatbox: {
        mode: 'float',
        children: [{ mode: 'horizontal', children: [{ tabs: [tab('find')], size: 25 }] }],
      },
    };
    const snapshot = structuredClone(layout);

    expect(reconcileSavedLayout(layout).dockbox).toEqual({
      mode: 'horizontal',
      children: [
        { tabs: [tab('project-a')], size: 900 },
        { tabs: [tab('project-b')], size: 300 },
        { tabs: [tab('find')], size: 600 },
      ],
    });
    expect(layout).toEqual(snapshot);
  });

  test('gives every tab group moved into a dock box laid out left to right the same average size', () => {
    const layout: LayoutInfo = {
      dockbox: {
        mode: 'horizontal',
        children: [
          { tabs: [tab('project-a')], size: 900 },
          { tabs: [tab('project-b')], size: 300 },
        ],
      },
      floatbox: {
        mode: 'float',
        children: [
          {
            mode: 'horizontal',
            children: [{ tabs: [tab('find')], size: 25 }, { tabs: [tab('notes')] }],
          },
        ],
      },
    };
    const snapshot = structuredClone(layout);

    expect(reconcileSavedLayout(layout).dockbox).toEqual({
      mode: 'horizontal',
      children: [
        { tabs: [tab('project-a')], size: 900 },
        { tabs: [tab('project-b')], size: 300 },
        { tabs: [tab('find')], size: 600 },
        { tabs: [tab('notes')], size: 600 },
      ],
    });
    expect(layout).toEqual(snapshot);
  });

  test('counts a size rc-dock would default to 200 when it averages the groups in a dock box laid out left to right', () => {
    const layout: LayoutInfo = {
      dockbox: {
        mode: 'horizontal',
        children: [
          { tabs: [tab('project-a')], size: 600 },
          { tabs: [tab('project-b')] },
          { tabs: [tab('project-c')], size: -5 },
          { tabs: [tab('project-d')], size: 'wide' },
        ],
      },
      floatbox: {
        mode: 'float',
        children: [{ mode: 'horizontal', children: [{ tabs: [tab('find')], size: 25 }] }],
      },
    };
    const snapshot = structuredClone(layout);

    // (600 + 200 + 200 + 200) / 4
    expect(reconcileSavedLayout(layout).dockbox).toMatchObject({
      children: [{}, {}, {}, {}, { tabs: [tab('find')], size: 300 }],
    });
    expect(layout).toEqual(snapshot);
  });

  test('gives a tab group moved into a dock box laid out left to right the average size of the groups there, even a dock box among them', () => {
    const layout: LayoutInfo = {
      dockbox: {
        mode: 'horizontal',
        children: [
          { mode: 'vertical', size: 400, children: [{ tabs: [tab('upper')] }] },
          { tabs: [tab('project-a')], size: 200 },
        ],
      },
      floatbox: {
        mode: 'float',
        children: [{ mode: 'horizontal', children: [{ tabs: [tab('find')] }] }],
      },
    };

    expect(reconcileSavedLayout(layout).dockbox).toMatchObject({
      children: [{}, {}, { tabs: [tab('find')], size: 300 }],
    });
  });

  test('gives the new dock box an id one past the highest id in the layout, so none repeats', () => {
    // A profile that re-rooted its dock box: rc-dock kept the old root `+5` as a child of the new
    // vertical root `+13`. rc-dock gives a box loaded without an id the next id from its counter
    // before it has read the ids further on, which here would be `+5` again.
    const layout: LayoutInfo = {
      dockbox: {
        id: '+13',
        size: 200,
        mode: 'vertical',
        children: [
          {
            id: '+5',
            size: 200,
            mode: 'horizontal',
            children: [
              { id: '+6', size: 200, tabs: [tab('home')] },
              { id: '+7', size: 200, tabs: [tab('editor-a')] },
            ],
          },
          { id: '+14', size: 200, tabs: [tab('bottom-panel')] },
        ],
      },
      floatbox: {
        id: '+2',
        size: 1,
        mode: 'float',
        children: [
          {
            id: '+9',
            size: 200,
            mode: 'horizontal',
            children: [
              { id: '+10', size: 200, tabs: [tab('editor-b')], x: 10, y: 20, z: 3, w: 400, h: 300 },
              { id: '+11', size: 200, tabs: [tab('find')] },
            ],
          },
        ],
      },
      windowbox: { id: '+3', size: 1, mode: 'window', children: [] },
      maxbox: { id: '+4', size: 1, mode: 'maximize', children: [] },
    };

    const reconciled = reconcileSavedLayout(layout);

    expect(reconciled.dockbox).toMatchObject({ id: '+15', mode: 'horizontal' });
    const ids = nodeIdsIn(reconciled);
    expect(new Set(ids).size).toBe(ids.length);
  });

  test('ignores ids that start with + but are not numbers when it picks the new dock box’s id', () => {
    const layout: LayoutInfo = {
      dockbox: { id: '+abc', mode: 'vertical', children: [{ id: '+3', tabs: [tab('upper')] }] },
      floatbox: {
        mode: 'float',
        children: [{ mode: 'horizontal', children: [{ tabs: [tab('find')] }] }],
      },
    };

    expect(reconcileSavedLayout(layout).dockbox).toMatchObject({ id: '+4', mode: 'horizontal' });
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
          { tabs: [tab('project-f')], size: 200 },
          { tabs: [tab('find')], size: 200 },
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
        children: [
          { tabs: [tab('project-a'), tab('find')] },
          { tabs: [tab('project-f')], size: 200 },
        ],
      },
    });
  });

  test('is idempotent and does not mutate its input', () => {
    const layout = layoutWithBoxInFloatbox();
    const snapshot = structuredClone(layout);

    const once = reconcileSavedLayout(layout);

    expect(reconcileSavedLayout(once)).toEqual(once);
    expect(layout).toEqual(snapshot);
  });

  describe('with malformed nodes beside a box in the floating layer', () => {
    // Fresh objects on every call, so an input changed in place cannot change the expected value
    // along with it
    const dockedGroup = () => ({ tabs: [tab('docked')] });
    const rescuedGroup = () => ({ tabs: [tab('rescued')] });
    const boxWithRescuedGroup = () => ({ mode: 'horizontal', children: [rescuedGroup()] });

    test.each<[string, LayoutInfo, LayoutInfo]>([
      [
        'no dockbox',
        { floatbox: { mode: 'float', children: [boxWithRescuedGroup()] } },
        { dockbox: { id: '+1', mode: 'horizontal', children: [rescuedGroup()] } },
      ],
      [
        'a null and a primitive child',
        {
          dockbox: { mode: 'horizontal', children: [dockedGroup()] },
          // A null child is part of the malformed input under test
          // eslint-disable-next-line no-null/no-null
          floatbox: { mode: 'float', children: [null, 5, boxWithRescuedGroup()] },
        },
        {
          dockbox: {
            mode: 'horizontal',
            children: [dockedGroup(), { ...rescuedGroup(), size: 200 }],
          },
        },
      ],
      [
        'a box child whose children is not an array',
        {
          dockbox: { mode: 'horizontal', children: [dockedGroup()] },
          floatbox: {
            mode: 'float',
            children: [
              { mode: 'horizontal', children: 'not an array' },
              boxWithRescuedGroup(),
              { tabs: [tab('floating')], x: 1, y: 2, w: 300, h: 200 },
            ],
          },
        },
        {
          dockbox: {
            mode: 'horizontal',
            children: [dockedGroup(), { ...rescuedGroup(), size: 200 }],
          },
          floatbox: {
            mode: 'float',
            children: [{ tabs: [tab('floating')], x: 1, y: 2, w: 300, h: 200 }],
          },
        },
      ],
      [
        'a dockbox that is an array',
        {
          dockbox: [dockedGroup()],
          floatbox: { mode: 'float', children: [boxWithRescuedGroup()] },
        },
        // The array is neither a panel nor a box, so it is dropped from the new horizontal dock box
        { dockbox: { id: '+1', mode: 'horizontal', children: [{ ...rescuedGroup(), size: 120 }] } },
      ],
    ])('does not throw and returns a usable layout for %s', (_name, layout, expected) => {
      const snapshot = structuredClone(layout);

      expect(reconcileSavedLayout(layout)).toEqual(expected);
      expect(layout).toEqual(snapshot);
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

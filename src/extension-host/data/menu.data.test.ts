import { describe, expect, it } from 'vitest';
import { MenuDocumentCombiner } from '@shared/utils/menu-document-combiner';
import { CONTENT_ZOOM_COMMANDS } from '@shared/models/content-zoom.model';
import menuData from './menu.data.json';

describe('defaultWebViewTabMenu zoom group', () => {
  it('declares platform.tabZoom as a non-extensible, experimental group ordered before platform.tabWindow', () => {
    const { groups } = menuData.defaultWebViewTabMenu;
    expect(groups['platform.tabZoom']).toEqual({
      order: 50,
      isExtensible: false,
      isExperimental: true,
    });
    expect(groups['platform.tabZoom'].order).toBeLessThan(groups['platform.tabWindow'].order);
  });

  it('orders the zoom items zoom in, zoom out, reset zoom, wired to the shared command names', () => {
    const zoomItems = menuData.defaultWebViewTabMenu.items
      .filter((item) => item.group === 'platform.tabZoom')
      .sort((a, b) => a.order - b.order);

    expect(zoomItems.map((item) => item.command)).toEqual([
      CONTENT_ZOOM_COMMANDS.in,
      CONTENT_ZOOM_COMMANDS.out,
      CONTENT_ZOOM_COMMANDS.reset,
    ]);
    expect(zoomItems.map((item) => item.order)).toEqual([100, 200, 300]);
  });

  it('labels each zoom item with its localization key and a non-empty localizeNotes', () => {
    const zoomItems = menuData.defaultWebViewTabMenu.items
      .filter((item) => item.group === 'platform.tabZoom')
      .sort((a, b) => a.order - b.order);

    expect(zoomItems.map((item) => item.label)).toEqual([
      '%tab_contextMenu_zoomIn%',
      '%tab_contextMenu_zoomOut%',
      '%tab_contextMenu_resetZoom%',
    ]);
    zoomItems.forEach((item) => {
      expect(item.localizeNotes).toBeTruthy();
    });
  });

  it('carries no isExperimental marker on any tab-menu item', () => {
    // The menuItem $def in menus.model.ts declares no `isExperimental` property and sets
    // `unevaluatedProperties: false`, so an item-level marker would fail schema validation.
    // Experimental-ness for the tab menu is carried by the group, as platform.tabWindow already does.
    menuData.defaultWebViewTabMenu.items.forEach((item) => {
      expect(item).not.toHaveProperty('isExperimental');
    });
  });

  it('still validates as a menu document with no duplicate group or item orders', () => {
    expect(() => new MenuDocumentCombiner(menuData)).not.toThrow();
  });
});

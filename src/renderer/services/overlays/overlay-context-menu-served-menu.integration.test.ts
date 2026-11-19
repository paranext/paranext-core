/*
 * This test deliberately wires the extension host's menu serving to the renderer's conversion,
 * because the behaviour it pins (no separator before the first visible item when earlier groups
 * serve no items) lives in the seam between the two. The cross-layer imports below are for this
 * test only; the converter's own unit tests import nothing from `@extension-host/*`.
 */

import { describe, it, expect } from 'vitest';
import menuDataObject from '@extension-host/data/menu.data.json';
import { getMenuDataEngineInMode } from '@extension-host/services/menu-data.service-host.test-utils';
import { MenuDocumentCombiner } from '@shared/utils/menu-document-combiner';
import { convertContributionToContextMenuItems } from './overlay-menu-converter';

describe('context menu served by the menu data service, then converted', () => {
  it('opens with an item when the served default context menu is merged with later groups', async () => {
    // Pins the served menu's behaviour: the platform's two default groups (orders 1 and 2) keep
    // their place but their items are hidden in every interface mode, so the groups serve empty
    // and must not leave a separator above the first real item.
    const combiner = new MenuDocumentCombiner(menuDataObject);
    combiner.addOrUpdateContribution('testExt', {
      webViewMenus: {
        'testExt.view': {
          includeDefaults: true,
          contextMenu: {
            groups: { 'testExt.first': { order: 3 }, 'testExt.second': { order: 4 } },
            items: [
              {
                label: '%testExt_first%',
                localizeNotes: 'Test item',
                group: 'testExt.first',
                order: 1,
                command: 'testExt.first',
              },
              {
                label: '%testExt_second%',
                localizeNotes: 'Test item',
                group: 'testExt.second',
                order: 1,
                command: 'testExt.second',
              },
            ],
          },
        },
      },
    });
    const combined = combiner.rawOutput;
    if (!combined) throw new Error('Test menu document failed to combine');
    const engine = await getMenuDataEngineInMode(combined, 'simple');
    const served = await engine.getWebViewMenu('testExt.view');
    if (!served.contextMenu) throw new Error('No context menu served');

    // Control: the default groups are still there, so a leading separator was possible
    expect(Object.keys(served.contextMenu.groups)).toEqual(
      expect.arrayContaining(['platform.insert', 'platform.wordList']),
    );
    const entries = convertContributionToContextMenuItems(served.contextMenu);
    expect(entries.map((entry) => entry.type)).toEqual(['item', 'separator', 'item']);
  });
});

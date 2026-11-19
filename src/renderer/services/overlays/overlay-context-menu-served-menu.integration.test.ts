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
import editorMenus from '../../../../extensions/src/platform-scripture-editor/contributions/menus.json';
import { convertContributionToContextMenuItems } from './overlay-menu-converter';

const EDITOR_WEB_VIEW_TYPE = 'platformScriptureEditor.react';

function combineEditorMenus() {
  const combiner = new MenuDocumentCombiner(menuDataObject);
  combiner.addOrUpdateContribution('platformScriptureEditor', editorMenus);
  const combined = combiner.rawOutput;
  if (!combined) throw new Error('Editor menu document failed to combine');
  return combined;
}

describe('editor context menu served by the menu data service, then converted', () => {
  it('combines the editor contribution with the platform defaults without rejecting it', () => {
    expect(combineEditorMenus().webViewMenus[EDITOR_WEB_VIEW_TYPE]?.contextMenu).toBeDefined();
  });

  it.each(['simple', 'power'] as const)(
    'opens with an item in %s mode, although the platform default groups ahead of the editor groups serve no items',
    async (mode) => {
      // The platform's two default groups (orders 1 and 2) keep their place but their items are
      // hidden in every interface mode, so the groups serve empty and must not leave a separator
      // above the first real item.
      const engine = await getMenuDataEngineInMode(combineEditorMenus(), mode);
      const served = await engine.getWebViewMenu(EDITOR_WEB_VIEW_TYPE);
      if (!served.contextMenu) throw new Error('No context menu served');

      // Control: the default groups are still there, so a leading separator was possible
      expect(Object.keys(served.contextMenu.groups)).toEqual(
        expect.arrayContaining(['platform.insert', 'platform.wordList']),
      );
      const entries = convertContributionToContextMenuItems(served.contextMenu);
      expect(entries[0]?.type).toBe('item');
      // The editor's three groups are separated by exactly two separators
      expect(entries.filter((entry) => entry.type === 'separator')).toHaveLength(2);
    },
  );
});

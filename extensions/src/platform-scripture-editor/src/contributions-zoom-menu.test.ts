import { describe, expect, it } from 'vitest';
import menus from '../contributions/menus.json';
import localizedStringsFile from '../contributions/localizedStrings.json';

/**
 * Guards the three zoom items the editor's own hamburger menu contributes to the Options column —
 * `menus.json` and `localizedStrings.json` have no compile-time link to each other or to the
 * command names the platform registers, so a rename or a dropped locale on either side would
 * otherwise only surface as a blank/broken menu item at runtime.
 *
 * The commands are asserted as literal strings rather than imported from
 * `@shared/models/content-zoom.model`'s `CONTENT_ZOOM_COMMANDS`: this extension's tsconfig/vitest
 * config has no `@shared` path alias (extensions cannot import core source), so the values are
 * restated here and must be kept equal to `CONTENT_ZOOM_COMMANDS.in/out/reset` by hand.
 */

const { topMenu } = menus.webViewMenus['platformScriptureEditor.react'];
const { groups, items } = topMenu;

const OPTIONS_COLUMN = 'platformScriptureEditor.options';

const ZOOM_COMMANDS = {
  in: 'platform.webViewContentZoomIn',
  out: 'platform.webViewContentZoomOut',
  reset: 'platform.webViewContentZoomReset',
};

describe('platform-scripture-editor zoom menu contribution', () => {
  it('declares the zoom group in the Options column, after footnotesPane, marked experimental', () => {
    const zoomGroup = groups['platformScriptureEditor.zoom'];
    const footnotesPaneGroup = groups['platformScriptureEditor.footnotesPane'];
    expect(zoomGroup).toBeDefined();
    expect(footnotesPaneGroup).toBeDefined();
    expect(zoomGroup.column).toBe(OPTIONS_COLUMN);
    expect(zoomGroup.isExperimental).toBe(true);
    expect(zoomGroup.order).toBeGreaterThan(footnotesPaneGroup.order);
  });

  it('contributes exactly three ordered items to the zoom group, one per command', () => {
    const zoomItems = items.filter((item) => item.group === 'platformScriptureEditor.zoom');
    expect(zoomItems).toHaveLength(3);

    const byOrder = [...zoomItems].sort((a, b) => a.order - b.order);
    const orders = byOrder.map((item) => item.order);
    expect(new Set(orders).size).toBe(3);

    const commands = byOrder.map((item) => item.command);
    expect(commands).toEqual([ZOOM_COMMANDS.in, ZOOM_COMMANDS.out, ZOOM_COMMANDS.reset]);
  });

  it('marks the group experimental but leaves every zoom item unmarked (visible and non-experimental in both interface modes)', () => {
    const zoomItems = items.filter((item) => item.group === 'platformScriptureEditor.zoom');
    zoomItems.forEach((item) => {
      expect('hiddenInterfaceModes' in item).toBe(false);
      expect('isExperimental' in item).toBe(false);
    });
  });

  it('has an en and es localized string for every zoom item label', () => {
    const zoomItems = items.filter((item) => item.group === 'platformScriptureEditor.zoom');
    const { en, es } = localizedStringsFile.localizedStrings;
    const enLookup: Record<string, string> = en;
    const esLookup: Record<string, string> = es;
    zoomItems.forEach((item) => {
      expect(enLookup[item.label]).toBeTruthy();
      expect(esLookup[item.label]).toBeTruthy();
    });
  });
});

import { describe, expect, it } from 'vitest';
import menus from '../contributions/menus.json';
import localizedStringsFile from '../contributions/localizedStrings.json';

/**
 * Guards the three zoom items the editor's own hamburger menu contributes, in the View column next
 * to the footnote items, in Simple mode only (the editor's Simple-mode tab bar is headless, so the
 * hamburger is its only menu route to zoom) — `menus.json` and `localizedStrings.json` have no
 * compile-time link to each other or to the command names the platform registers, so a rename or a
 * dropped locale on either side would otherwise only surface as a blank/broken menu item at
 * runtime.
 *
 * The commands are asserted as literal strings rather than imported from
 * `@shared/models/content-zoom.model`'s `CONTENT_ZOOM_COMMANDS`: this extension's tsconfig/vitest
 * config has no `@shared` path alias (extensions cannot import core source), so the values are
 * restated here and must be kept equal to `CONTENT_ZOOM_COMMANDS.in/out/reset` by hand.
 */

const { topMenu } = menus.webViewMenus['platformScriptureEditor.react'];
const { columns, groups, items } = topMenu;

const VIEW_COLUMN = 'platformScriptureEditor.options';
const ZOOM_GROUP = 'platformScriptureEditor.zoom';

const ZOOM_COMMANDS = {
  in: 'platform.webViewContentZoomIn',
  out: 'platform.webViewContentZoomOut',
  reset: 'platform.webViewContentZoomReset',
};

const zoomItems = items.filter((item) => item.group === ZOOM_GROUP);

describe('platform-scripture-editor zoom menu contribution', () => {
  it('declares no column of its own for zoom: the items sit in the View column', () => {
    const columnsByKey: Record<string, { label: string; order: number }> = columns;
    expect(columnsByKey['platformScriptureEditor.zoomSection']).toBeUndefined();
    expect(columnsByKey[VIEW_COLUMN].label).toBe('%webView_platformScriptureEditor_view%');
  });

  it('puts the zoom group in the View column between the layout and footnote groups, marked experimental', () => {
    const groupsByKey: Record<string, { column: string; order: number; isExperimental?: boolean }> =
      groups;
    expect(groupsByKey[ZOOM_GROUP].column).toBe(VIEW_COLUMN);
    expect(groupsByKey[ZOOM_GROUP].isExperimental).toBe(true);
    expect(groupsByKey[ZOOM_GROUP].order).toBeGreaterThan(
      groupsByKey['platformScriptureEditor.layout'].order,
    );
    expect(groupsByKey[ZOOM_GROUP].order).toBeLessThan(
      groupsByKey['platformScriptureEditor.footnotesPane'].order,
    );
  });

  it('contributes exactly three ordered items to the zoom group, one per command', () => {
    expect(zoomItems).toHaveLength(3);
    const byOrder = [...zoomItems].sort((a, b) => a.order - b.order);
    expect(new Set(byOrder.map((item) => item.order)).size).toBe(3);
    expect(byOrder.map((item) => item.command)).toEqual([
      ZOOM_COMMANDS.in,
      ZOOM_COMMANDS.out,
      ZOOM_COMMANDS.reset,
    ]);
  });

  it('hides every zoom item in Power mode, where the tab menu carries them, and marks none experimental', () => {
    zoomItems.forEach((item) => {
      expect('hiddenInterfaceModes' in item ? item.hiddenInterfaceModes : undefined).toEqual([
        'power',
      ]);
      expect('isExperimental' in item).toBe(false);
    });
  });

  it('labels the reset item "Zoom 100%" in en and es', () => {
    const { en, es } = localizedStringsFile.localizedStrings;
    const resetItem = zoomItems.find((item) => item.command === ZOOM_COMMANDS.reset);
    const label = resetItem?.label ?? '';
    const enLookup: Record<string, string> = en;
    const esLookup: Record<string, string> = es;
    expect(enLookup[label]).toBe('Zoom 100%');
    expect(esLookup[label]).toBe('Zoom 100%');
  });

  it('has an en and es localized string for the column heading and every zoom item label', () => {
    const { en, es } = localizedStringsFile.localizedStrings;
    const enLookup: Record<string, string> = en;
    const esLookup: Record<string, string> = es;
    ['%webView_platformScriptureEditor_view%', ...zoomItems.map((item) => item.label)].forEach(
      (key) => {
        expect(enLookup[key]).toBeTruthy();
        expect(esLookup[key]).toBeTruthy();
      },
    );
  });
});

import { FloatPosition } from 'rc-dock';
import { vi } from 'vitest';
import { FloatLayout, TabInfo, TAB_TYPE_WEBVIEW } from '@shared/models/docking-framework.model';
import { SCRIPTURE_EDITOR_WEBVIEW_TYPE, WebViewDefinition } from '@shared/models/web-view.model';
import {
  getFloatPosition,
  getGroups,
  getTabGroup,
  getDockLayoutOuterInset,
  HEADLESS_GROUP,
  TAB_GROUP,
  TAB_GROUP_RESOURCES,
} from './platform-dock-layout-positioning.util';

/** Minimal WebView {@link TabInfo} fixture for `getTabGroup` tests. */
function makeWebViewTabInfo(webViewType: string, isClosable?: boolean): TabInfo {
  const data: Partial<WebViewDefinition> = { id: 'test-id', webViewType };
  return {
    id: 'test-id',
    tabType: TAB_TYPE_WEBVIEW,
    tabTitle: 'Test',
    content: undefined,
    isClosable,
    data,
  };
}

vi.mock('../../../shared/services/logger.service');
vi.mock('@renderer/services/theme.service-host', () => ({
  __esModule: true,
  localThemeService: {},
}));

describe('Dock Layout Component', () => {
  describe('getGroups()', () => {
    it('power mode: returns TAB_GROUP with panelExtra and without tabLocked', () => {
      const groups = getGroups(true);
      expect(typeof groups[TAB_GROUP].panelExtra).toBe('function');
      expect(groups[TAB_GROUP].tabLocked).toBeUndefined();
      expect(groups[TAB_GROUP].maximizable).toBe(false);
      expect(groups[TAB_GROUP].floatable).toBe(false);
      expect(groups[TAB_GROUP].animated).toBe(false);
    });

    it('simple mode: returns TAB_GROUP with tabLocked and without panelExtra', () => {
      const groups = getGroups(false);
      expect(groups[TAB_GROUP].tabLocked).toBe(true);
      expect(groups[TAB_GROUP].panelExtra).toBeUndefined();
      expect(groups[TAB_GROUP].maximizable).toBe(false);
      expect(groups[TAB_GROUP].floatable).toBe(false);
      expect(groups[TAB_GROUP].animated).toBe(false);
    });

    it('simple mode: registers HEADLESS_GROUP and TAB_GROUP_RESOURCES with locked config', () => {
      const groups = getGroups(false);
      [HEADLESS_GROUP, TAB_GROUP_RESOURCES].forEach((groupKey) => {
        expect(groups[groupKey].tabLocked).toBe(true);
        expect(groups[groupKey].panelExtra).toBeUndefined();
        expect(groups[groupKey].maximizable).toBe(false);
        expect(groups[groupKey].floatable).toBe(false);
      });
    });
  });

  describe('getTabGroup()', () => {
    it('gives the fixed Column 3 resources webviews TAB_GROUP_RESOURCES when pinned (isClosable: false)', () => {
      [
        'platformScriptureEditor.bibleTexts',
        'platformScriptureEditor.commentaries',
        'legacyCommentManager.commentListPanel',
        'platformScriptureEditor.scriptureTextGrid',
      ].forEach((webViewType) => {
        expect(getTabGroup(makeWebViewTabInfo(webViewType, false))).toBe(TAB_GROUP_RESOURCES);
      });
    });

    it('gives the fixed Column 1/2 headless webviews HEADLESS_GROUP when pinned (isClosable: false)', () => {
      ['platformScriptureEditor.modelText', SCRIPTURE_EDITOR_WEBVIEW_TYPE].forEach(
        (webViewType) => {
          expect(getTabGroup(makeWebViewTabInfo(webViewType, false))).toBe(HEADLESS_GROUP);
        },
      );
    });

    it('falls back to TAB_GROUP for a fixed-column webViewType when isClosable is not false (e.g. Power mode)', () => {
      expect(getTabGroup(makeWebViewTabInfo('platformScriptureEditor.bibleTexts', true))).toBe(
        TAB_GROUP,
      );
      expect(getTabGroup(makeWebViewTabInfo('platformScriptureEditor.bibleTexts', undefined))).toBe(
        TAB_GROUP,
      );
    });

    it('falls back to TAB_GROUP for a floating/unrelated webViewType even when isClosable is false', () => {
      expect(getTabGroup(makeWebViewTabInfo('someExtension.someFloatingDialog', false))).toBe(
        TAB_GROUP,
      );
    });

    it('falls back to TAB_GROUP for non-webview tabs regardless of isClosable', () => {
      const tabInfo: TabInfo = {
        id: 'test-id',
        tabType: 'settingsTab',
        tabTitle: 'Test',
        content: undefined,
        isClosable: false,
      };
      expect(getTabGroup(tabInfo)).toBe(TAB_GROUP);
    });

    it('falls back to TAB_GROUP (does not throw) for a webview tab with isClosable: false but no data', () => {
      const tabInfo: TabInfo = {
        id: 'test-id',
        tabType: TAB_TYPE_WEBVIEW,
        tabTitle: 'Test',
        content: undefined,
        isClosable: false,
      };
      expect(() => getTabGroup(tabInfo)).not.toThrow();
      expect(getTabGroup(tabInfo)).toBe(TAB_GROUP);
    });
  });

  describe('getDockLayoutOuterInset()', () => {
    it('power mode: keeps the original 8px inset on every side (except top)', () => {
      expect(getDockLayoutOuterInset(true)).toEqual({
        position: 'absolute',
        top: 48,
        bottom: 8,
        left: 8,
        right: 8,
      });
    });

    it('simple mode: removes the inset except for the top toolbar clearance', () => {
      expect(getDockLayoutOuterInset(false)).toEqual({
        position: 'absolute',
        top: 48,
        bottom: 0,
        left: 0,
        right: 0,
      });
    });
  });

  describe('getFloatPosition()', () => {
    it('should cascade from top-left of layout', () => {
      const layout: FloatLayout = { type: 'float', floatSize: { width: 20, height: 10 } };
      const floatPosition: FloatPosition = { left: 0, top: 0, width: 0, height: 0 };

      let nextPosition = getFloatPosition(layout, floatPosition, { width: 100, height: 100 });

      expect(nextPosition).toEqual({
        left: 28,
        top: 28,
        width: 20,
        height: 10,
      });

      nextPosition = getFloatPosition(layout, nextPosition, { width: 100, height: 100 });

      expect(nextPosition).toEqual({
        left: 2 * 28,
        top: 2 * 28,
        width: 20,
        height: 10,
      });
    });

    it('should overflow right of layout', () => {
      const layout: FloatLayout = { type: 'float', floatSize: { width: 20, height: 10 } };
      const floatPosition: FloatPosition = { left: 2 * 28, top: 2 * 28, width: 0, height: 0 };
      // right = 2*28 + 20 + 28 = 104
      // bottom = 2*28 + 10 + 28 = 94

      expect(getFloatPosition(layout, floatPosition, { width: 100, height: 100 })).toEqual({
        left: 28,
        top: 3 * 28,
        width: 20,
        height: 10,
      });
    });

    it('should overflow bottom of layout', () => {
      const layout: FloatLayout = { type: 'float', floatSize: { width: 20, height: 10 } };
      const floatPosition: FloatPosition = { left: 2 * 28, top: 2 * 28, width: 0, height: 0 };
      // right = 2*28 + 20 + 28 = 104
      // bottom = 2*28 + 10 + 28 = 94

      expect(getFloatPosition(layout, floatPosition, { width: 120, height: 90 })).toEqual({
        left: 3 * 28,
        top: 28,
        width: 20,
        height: 10,
      });
    });

    it('should clamp an oversized float to a fraction of the layout size', () => {
      // Requested 1100x720 in an 800x600 layout -> clamp to 80% width / 85% height
      const layout: FloatLayout = { type: 'float', floatSize: { width: 1100, height: 720 } };
      const floatPosition: FloatPosition = { left: 0, top: 0, width: 0, height: 0 };

      const next = getFloatPosition(layout, floatPosition, { width: 800, height: 600 });

      expect(next.width).toBe(640); // 800 * 0.8
      expect(next.height).toBe(510); // 600 * 0.85
    });

    it('should center a clamped float using the clamped size', () => {
      const layout: FloatLayout = {
        type: 'float',
        position: 'center',
        floatSize: { width: 1100, height: 720 },
      };
      const floatPosition: FloatPosition = { left: 0, top: 0, width: 0, height: 0 };

      const next = getFloatPosition(layout, floatPosition, { width: 800, height: 600 });

      // Centered on the clamped 640x510 box, not the requested 1100x720
      expect(next).toEqual({ left: 80, top: 45, width: 640, height: 510 });
    });

    it('should not alter floats that already fit within the clamp fraction', () => {
      const layout: FloatLayout = {
        type: 'float',
        position: 'center',
        floatSize: { width: 400, height: 300 },
      };
      const floatPosition: FloatPosition = { left: 0, top: 0, width: 0, height: 0 };

      const next = getFloatPosition(layout, floatPosition, { width: 800, height: 600 });

      expect(next).toEqual({ left: 200, top: 150, width: 400, height: 300 });
    });
  });
});

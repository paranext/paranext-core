import { FloatPosition } from 'rc-dock';
import { vi } from 'vitest';
import { FloatLayout } from '@shared/models/docking-framework.model';
import {
  getFloatPosition,
  getGroups,
  HEADLESS_GROUP,
  TAB_GROUP,
  TAB_GROUP_RESOURCES,
} from './platform-dock-layout-positioning.util';

vi.mock('../../../shared/services/logger.service');

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
  });
});

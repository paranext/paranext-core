import { FloatPosition } from 'rc-dock';
import { vi } from 'vitest';
import { FloatLayout } from '@shared/models/docking-framework.model';
import { getFloatPosition } from './platform-dock-layout-positioning.util';

vi.mock('../../../shared/services/logger.service');
vi.mock('@renderer/services/theme.service-host', () => ({
  __esModule: true,
  localThemeService: {},
}));

describe('Dock Layout Component', () => {
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

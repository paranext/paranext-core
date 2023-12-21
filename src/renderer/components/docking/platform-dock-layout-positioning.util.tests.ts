/* eslint-disable import/first */
jest.mock('../../../shared/services/logger.service');
// Mock all of the papi-components because they should test themselves
jest.mock(
  'papi-components',
  () =>
    new Proxy(
      {},
      {
        get() {
          return function MockComponent() {};
        },
      },
    ),
);

import { FloatPosition } from 'rc-dock';
import { FloatLayout } from '@shared/models/docking-framework.model';
import { getFloatPosition } from './platform-dock-layout-positioning.util';
/* eslint-enable */

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
  });
});

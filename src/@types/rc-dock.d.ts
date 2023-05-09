import { BoxData, DropDirection, PanelData, TabData } from 'rc-dock';
import * as Algorithm from 'rc-dock/lib/Algorithm';

declare module 'rc-dock' {
  export interface FloatSize {
    width: number;
    height: number;
  }

  export interface FloatPosition extends FloatSize {
    left: number;
    top: number;
  }

  type LayoutSize = FloatSize;

  export default class DockLayout {
    dockMove(
      source: TabData | PanelData,
      target: string | TabData | PanelData | BoxData | null,
      direction: DropDirection,
      floatPosition?: FloatPosition,
    ): void;
    find(id: string, filter?: Algorithm.Filter): PanelData | TabData | BoxData | undefined;
    getLayoutSize(): LayoutSize;
  }
}

import { BoxData, DropDirection, PanelData, TabData } from 'rc-dock';
import * as Algorithm from 'rc-dock/lib/Algorithm';

declare module 'rc-dock' {
  export interface LayoutSize {
    width: number;
    height: number;
  }

  export interface FloatPosition {
    left: number;
    top: number;
    width: number;
    height: number;
  }

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

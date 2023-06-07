import { BoxData, DropDirection, PanelData, TabData } from 'rc-dock';

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
    getLayoutSize(): LayoutSize;
  }
}

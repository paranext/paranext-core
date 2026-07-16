// Window Controls Overlay API — not yet included in TypeScript's lib.dom.d.ts.
// https://developer.mozilla.org/en-US/docs/Web/API/Window_Controls_Overlay_API
// Electron implements this for windows created with `titleBarOverlay` (see main.ts).

interface WindowControlsOverlayGeometryChangeEvent extends Event {
  readonly titlebarAreaRect: DOMRect;
  readonly visible: boolean;
}

interface WindowControlsOverlay {
  readonly visible: boolean;
  getTitlebarAreaRect(): DOMRect;
  addEventListener(
    type: 'geometrychange',
    listener: (event: WindowControlsOverlayGeometryChangeEvent) => void,
  ): void;
  removeEventListener(
    type: 'geometrychange',
    listener: (event: WindowControlsOverlayGeometryChangeEvent) => void,
  ): void;
}

declare global {
  interface Navigator {
    readonly windowControlsOverlay?: WindowControlsOverlay;
  }
}

export {};

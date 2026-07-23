import { useEffect, useState } from 'react';

/**
 * Live geometry from Chromium's Window Controls Overlay API — the app-content rect once the native
 * title bar buttons (rendered by Electron's `titleBarOverlay`, see main.ts) are excluded. A fixed
 * pixel guess can't track DPI scaling, text-size settings, or OS theme differences that change the
 * buttons' actual width; this reads the real value instead.
 *
 * Returns `undefined` when the API is unavailable (macOS/Linux) or the overlay isn't visible (e.g.
 * full screen).
 */
export function useWindowControlsOverlay(): DOMRect | undefined {
  const { windowControlsOverlay } = navigator;

  const [titlebarAreaRect, setTitlebarAreaRect] = useState<DOMRect | undefined>(() =>
    windowControlsOverlay?.visible ? windowControlsOverlay.getTitlebarAreaRect() : undefined,
  );

  useEffect(() => {
    if (!windowControlsOverlay) return;

    const updateRect = () =>
      setTitlebarAreaRect(
        windowControlsOverlay.visible ? windowControlsOverlay.getTitlebarAreaRect() : undefined,
      );

    updateRect();
    windowControlsOverlay.addEventListener('geometrychange', updateRect);
    return () => windowControlsOverlay.removeEventListener('geometrychange', updateRect);
  }, [windowControlsOverlay]);

  return titlebarAreaRect;
}

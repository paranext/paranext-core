import { useEffect, useState } from 'react';

/** How much of the title bar the native window controls take at each edge, in CSS pixels */
export type WindowControlsOverlayInsets = { left: number; right: number };

function measureInsets(
  windowControlsOverlay: Navigator['windowControlsOverlay'],
): WindowControlsOverlayInsets | undefined {
  if (!windowControlsOverlay?.visible) return undefined;
  const titlebarAreaRect = windowControlsOverlay.getTitlebarAreaRect();
  // Clamped: until `resize` catches up, a maximize's titlebar area reaches past `innerWidth`
  return {
    left: Math.max(0, titlebarAreaRect.left),
    right: Math.max(0, window.innerWidth - titlebarAreaRect.right),
  };
}

/**
 * Live geometry from Chromium's Window Controls Overlay API — how much of the title bar the native
 * title bar buttons (rendered by Electron's `titleBarOverlay`, see main.ts) take at each edge. A
 * fixed pixel guess can't track DPI scaling, text-size settings, or OS theme differences that
 * change the buttons' actual width; this reads the real value instead.
 *
 * Measured again on `resize` as well as `geometrychange`: when the window is maximized, restored or
 * resized, Chromium fires `geometrychange` with the new titlebar area while `window.innerWidth`
 * still holds the old width, so the right edge measured then is wrong by the whole change in width.
 * `resize` follows once the width has updated. On a page zoom change, the titlebar area and
 * `window.innerWidth` already agree when `geometrychange` fires.
 *
 * Also measured again whenever `devicePixelRatio` changes and when the page becomes visible. The
 * main window starts hidden and is given its interface-scaling zoom only once it has painted, and a
 * window restored onto a monitor whose scale factor differs from the one it was created on changes
 * scale while it starts. Neither is guaranteed to be followed by a `geometrychange` or `resize`
 * that reads settled values, and a stale measurement here squeezes the toolbar into a sliver or
 * slides it under the native buttons until the user resizes the window.
 *
 * Returns `undefined` when the API is unavailable — macOS draws its own traffic lights and has no
 * overlay — or when the overlay isn't visible (e.g. full screen). Linux uses the overlay, but which
 * desktop environments report geometry for it is unverified; one that does not falls back to the
 * static reservation, the same as before the overlay was asked for there.
 */
export function useWindowControlsOverlay(): WindowControlsOverlayInsets | undefined {
  const { windowControlsOverlay } = navigator;

  const [insets, setInsets] = useState<WindowControlsOverlayInsets | undefined>(() =>
    measureInsets(windowControlsOverlay),
  );

  useEffect(() => {
    if (!windowControlsOverlay) return;

    const updateInsets = () => {
      const next = measureInsets(windowControlsOverlay);
      // Keeps the same object when nothing moved, so a drag's stream of `resize` events does not
      // re-render the toolbar
      setInsets((previous) =>
        previous?.left === next?.left && previous?.right === next?.right ? previous : next,
      );
    };

    // A `resolution` query names a single ratio, so it only reports a change onto or off that
    // ratio; it is replaced with one for the new ratio after every change so that moving between,
    // say, a 125 % and a 175 % monitor is still heard
    let resolutionQuery: MediaQueryList | undefined;
    const onResolutionChange = () => {
      resolutionQuery?.removeEventListener('change', onResolutionChange);
      resolutionQuery = window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);
      resolutionQuery.addEventListener('change', onResolutionChange);
      updateInsets();
    };
    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') updateInsets();
    };

    onResolutionChange();
    windowControlsOverlay.addEventListener('geometrychange', updateInsets);
    window.addEventListener('resize', updateInsets);
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => {
      windowControlsOverlay.removeEventListener('geometrychange', updateInsets);
      window.removeEventListener('resize', updateInsets);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      resolutionQuery?.removeEventListener('change', onResolutionChange);
    };
  }, [windowControlsOverlay]);

  return insets;
}

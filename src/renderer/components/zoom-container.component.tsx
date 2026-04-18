import { CSSProperties, PropsWithChildren } from 'react';
import { useViewZoom } from '@renderer/hooks/use-view-zoom.hook';

type ZoomContainerProps = PropsWithChildren<{
  /** Storage key for this view's zoom (see `view-zoom-key.util`). */
  zoomKey: string;
  /** Optional extra class on the wrapper. */
  className?: string;
  /** Optional extra inline styles merged into the zoom wrapper. */
  style?: CSSProperties;
}>;

/**
 * Wraps children in a `div` whose CSS `zoom` reflects the current per-view zoom factor from
 * `viewZoomService`. The wrapper carries a `data-view-type` attribute so pointer hit-testing in the
 * input handler can locate the right container.
 */
export function ZoomContainer({ zoomKey, className, style, children }: ZoomContainerProps) {
  const factor = useViewZoom(zoomKey);
  return (
    <div
      data-view-type={zoomKey}
      className={className}
      // CSS `zoom` is a non-standard property that Chromium supports; it matches the browser's
      // own zoom and preserves hit-testing better than `transform: scale()`.
      style={{ ...style, zoom: factor }}
    >
      {children}
    </div>
  );
}

export default ZoomContainer;

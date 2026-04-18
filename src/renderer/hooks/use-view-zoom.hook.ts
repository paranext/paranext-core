import { useEffect, useState } from 'react';
import { DEFAULT_ZOOM_FACTOR } from '@shared/data/platform.data';
import { viewZoomService } from '@renderer/services/view-zoom.service';

/**
 * Subscribes to the zoom factor for a given view key and returns it. Returns `DEFAULT_ZOOM_FACTOR`
 * until the underlying service finishes loading settings.
 */
export function useViewZoom(key: string | undefined): number {
  const [factor, setFactor] = useState<number>(
    key ? viewZoomService.getZoom(key) : DEFAULT_ZOOM_FACTOR,
  );

  useEffect(() => {
    if (!key) {
      setFactor(DEFAULT_ZOOM_FACTOR);
      return undefined;
    }
    let cancelled = false;
    viewZoomService.ready
      .then(() => {
        if (!cancelled) setFactor(viewZoomService.getZoom(key));
        return undefined;
      })
      .catch(() => undefined);
    const unsub = viewZoomService.subscribe(key, setFactor);
    return () => {
      cancelled = true;
      unsub();
    };
  }, [key]);

  return factor;
}

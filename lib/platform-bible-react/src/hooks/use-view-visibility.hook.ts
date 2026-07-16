import { useEffect, useState } from 'react';

/**
 * Whether this web view's document is currently rendered — i.e. its dock tab is active. rc-dock
 * hides inactive tab panes with `display: none`, which keeps the web view's iframe mounted and its
 * JavaScript running but removes all layout: geometry reads return zero and `scrollIntoView`
 * no-ops. Layout-dependent side effects should be deferred while this returns `false` and caught up
 * when it flips to `true`.
 *
 * Detection is an `IntersectionObserver` on `document.body` against the iframe's viewport: a hidden
 * iframe has zero area, so the body never intersects; when the tab is shown the observer fires with
 * a non-zero intersection. The initial value is a synchronous geometry check so a visible view does
 * not flash a "hidden" frame while waiting for the observer's first callback.
 *
 * @returns `true` when the web view is rendered (visible), `false` while its tab is hidden
 */
export const useViewVisibility = (): boolean => {
  const [isViewVisible, setIsViewVisible] = useState(
    () => document.body.getBoundingClientRect().height > 0,
  );

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      // Only the latest entry matters — each reports the body's current intersection state.
      const latestEntry = entries[entries.length - 1];
      if (latestEntry) setIsViewVisible(latestEntry.isIntersecting);
    });
    observer.observe(document.body);
    return () => {
      observer.disconnect();
    };
  }, []);

  return isViewVisible;
};

import { forwardRef, HTMLAttributes } from 'react';

/**
 * Props for {@link ContentZoomRoot}.
 *
 * @experimental This export is unstable and may change shape or disappear without notice
 */
export type ContentZoomRootProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * Id of the zoom area this element wraps: lower-case letters, digits and hyphens, starting with a
   * letter (`[a-z][a-z0-9-]*`). `default` is reserved by the platform and is ignored. Omit this
   * prop for the view's main area. A view with several independently zoomable panes gives each its
   * own id — the Scripture editor uses `footnotes` for its footnotes pane.
   *
   * This library does not validate the id at runtime; the platform ignores a malformed one and logs
   * a warning once.
   *
   * @experimental This property is unstable and may change shape or disappear without notice
   */
  area?: string;
};

/**
 * Marks one independently zoomable content area within a web view.
 *
 * The platform scales a marked area in response to Ctrl/⌘+`+`/`-`/`0`, Ctrl/⌘+wheel, and the tab
 * context menu; it remembers the chosen level per area and shows the zoom indicator. The view
 * itself writes nothing else to make zoom work.
 *
 * Several elements may share one area id and zoom together. Areas must not nest — a marked element
 * found inside another marked element is ignored. Keep toolbars, dividers and headers outside the
 * marked element so they are not scaled along with the content.
 *
 * Pop-ups opened from inside stay at interface scale; anchor them to live positions
 * (`useLivePopoverAnchor`) so they open beside zoomed content.
 *
 * This component renders a plain `div` in normal flow and applies no classes of its own — the
 * caller supplies whatever layout classes its parent expects.
 *
 * Measurement caveat: inside a zoomed area, `getBoundingClientRect()` reports zoomed pixels, while
 * `getComputedStyle(el).fontSize` does not reflect the zoom factor. To read the factor itself, look
 * up the `--platform-content-zoom-<areaId>` custom property (`--platform-content-zoom-main` for the
 * unnamed area, `--platform-content-zoom-default` as a fallback) on the view's `documentElement`.
 *
 * A view that marks no area gets no content zoom unless the platform declares its web view type
 * zoomable. Your view is zoomable only while at least one element carrying
 * `data-platform-content-zoom-root` is rendered: the tab menu's zoom items, Ctrl/⌘ + `+`/`-`/`0`
 * and Ctrl/⌘+wheel appear and act only then. If your view shows nothing to zoom for a while (before
 * a search, while loading), render an empty marked element so the controls stay available.
 *
 * @example
 *
 * ```tsx
 * <Toolbar />
 * <ContentZoomRoot className="tw:flex tw:flex-col tw:flex-1 tw:min-h-0">
 *   <EditorContent />
 * </ContentZoomRoot>
 * ```
 *
 * @experimental This export is unstable and may change shape or disappear without notice
 */
export const ContentZoomRoot = forwardRef<HTMLDivElement, ContentZoomRootProps>(
  function ContentZoomRoot({ area, ...props }, ref) {
    return (
      <div
        ref={ref}
        // `props` is arbitrary caller-supplied `HTMLAttributes`; enumerating them would defeat the
        // point of forwarding them.
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        // Placed after the spread so `area`, not a same-named entry in `props`, always wins.
        data-platform-content-zoom-root={area ?? ''}
      />
    );
  },
);

ContentZoomRoot.displayName = 'ContentZoomRoot';

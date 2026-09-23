import { createElement, forwardRef, HTMLAttributes } from 'react';
import { CONTENT_ZOOM_ROOT_ATTRIBUTE } from '@/context/content-zoom-text.context';

/**
 * Props for {@link ContentZoomRoot}.
 *
 * @experimental This export is unstable and may change shape or disappear without notice
 */
export type ContentZoomRootProps = HTMLAttributes<HTMLElement> & {
  /**
   * Id of the zoom area this element belongs to: lower-case letters, digits and hyphens, starting
   * with a letter (`[a-z][a-z0-9-]*`). `default` is reserved by the platform and is ignored. Omit
   * this prop for the view's main area. A view with several independently zoomable panes gives each
   * its own id — the Scripture editor uses `footnotes` for its footnotes pane.
   *
   * This library does not validate the id at runtime; the platform ignores a malformed one and logs
   * a warning once.
   *
   * @experimental This property is unstable and may change shape or disappear without notice
   */
  area?: string;
  /**
   * Element to render: `'div'` (the default) or `'span'`. Use `'span'` inside phrasing content — a
   * `<p>`, a heading, or a table cell's inline text — where a `div` is not allowed.
   *
   * @experimental This property is unstable and may change shape or disappear without notice
   */
  as?: 'div' | 'span';
};

/**
 * Marks an element that renders project text — scripture, note bodies, result snippets, resource
 * text in its own font — so the platform scales it with the pane's content zoom.
 *
 * Mark the text, not the region around it. Buttons, inputs, filters, headers, badges, card frames
 * and pop-ups stay outside every marked element and keep interface scale. Several elements may
 * share one area id and zoom together, so a card, list or table view marks each text element with
 * the same id; flowing, editor-like text keeps one marker around the text body. Areas must not nest
 * — a marked element found inside another marked element is ignored.
 *
 * The platform scales marked elements on Ctrl/⌘+`+`/`-`/`0`, Ctrl/⌘+wheel and the tab context menu,
 * remembers the level per area and shows the zoom indicator; the view writes nothing else. A view
 * that marks no area gets no content zoom unless the platform declares its web view type zoomable.
 * Your view is zoomable only while at least one element carrying `data-platform-content-zoom-root`
 * is rendered: the tab menu's zoom items, Ctrl/⌘ + `+`/`-`/`0` and Ctrl/⌘+wheel appear and act only
 * then. If your view shows nothing to zoom for a while (before a search, while loading), render an
 * empty marked element so the controls stay available.
 *
 * Pop-ups opened from inside stay at interface scale; anchor them to live positions
 * (`useLivePopoverAnchor`) so they open beside zoomed content.
 *
 * Renders a `div` by default and a `span` with `as="span"`, in normal flow, with no classes of its
 * own — the caller supplies whatever layout classes its parent expects. Library components that
 * render project text mark it themselves inside a `ContentZoomTextProvider`; do not wrap such a
 * provider's subtree in a `ContentZoomRoot`.
 *
 * Measurement caveat: inside a zoomed area, `getBoundingClientRect()` reports zoomed pixels, while
 * `getComputedStyle(el).fontSize` does not reflect the zoom factor. To read the factor itself, look
 * up the `--platform-content-zoom-<areaId>` custom property (`--platform-content-zoom-main` for the
 * unnamed area, `--platform-content-zoom-default` as a fallback) on the view's `documentElement`.
 *
 * @example
 *
 * ```tsx
 * <li>
 *   <Button onClick={goToVerse}>{verseRef}</Button>
 *   <ContentZoomRoot as="span" className="scripture-font">
 *     {snippet}
 *   </ContentZoomRoot>
 * </li>;
 * ```
 *
 * @experimental This export is unstable and may change shape or disappear without notice
 */
export const ContentZoomRoot = forwardRef<HTMLElement, ContentZoomRootProps>(
  function ContentZoomRoot({ area, as = 'div', ...props }, ref) {
    // Built apart from the props literal below so the hyphenated attribute is not checked against
    // the intrinsic elements' declared attributes, and spread after `props` so `area`, not a
    // same-named entry in `props`, always wins.
    const markerAttribute = { [CONTENT_ZOOM_ROOT_ATTRIBUTE]: area ?? '' };
    // `createElement` rather than JSX: one call covers both tags, and its intrinsic-element overload
    // takes a ref typed to their shared `HTMLElement` base.
    return createElement(as, { ...props, ...markerAttribute, ref });
  },
);

ContentZoomRoot.displayName = 'ContentZoomRoot';

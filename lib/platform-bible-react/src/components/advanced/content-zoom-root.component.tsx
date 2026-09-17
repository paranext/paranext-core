import { createContext, forwardRef, HTMLAttributes, ReactNode, useContext } from 'react';

/**
 * Attribute a content-zoom-eligible element carries to mark it as one zoom area. Its value is the
 * zoom area id; an empty value marks the view's `main` area. Mirrors `CONTENT_ZOOM_ROOT_ATTRIBUTE`
 * in paranext-core's `src/shared/models/web-view.model.ts`. This library cannot import that module
 * (it lives under core's `src/shared`, outside this package's reach), and `@papi/core` publishes
 * the constant as a type-only declaration whose value is not importable at runtime, so the literal
 * is duplicated here; a platform test compares the two constants so they cannot drift silently.
 *
 * @experimental This export is unstable and may change shape or disappear without notice
 */
export const CONTENT_ZOOM_ROOT_ATTRIBUTE = 'data-platform-content-zoom-root';

/**
 * Attribute the platform's pop-up components put, next to {@link CONTENT_ZOOM_ROOT_ATTRIBUTE}, on
 * pop-up content opened from a zoom area. It tells the platform the element is pop-up content that
 * follows an area's zoom, not a pane of its own. Mirrors `CONTENT_ZOOM_POPUP_ATTRIBUTE` in
 * paranext-core's `src/shared/models/web-view.model.ts`; a platform test keeps the two equal.
 *
 * @experimental This export is unstable and may change shape or disappear without notice
 */
export const CONTENT_ZOOM_POPUP_ATTRIBUTE = 'data-platform-content-zoom-popup';

/**
 * Prefix of the CSS custom properties the platform sets on a web view's root element, one per zoom
 * area, holding that area's zoom factor (`--platform-content-zoom-main`, …). Mirrors
 * `CONTENT_ZOOM_CSS_VARIABLE_PREFIX` in paranext-core's `src/shared/models/web-view.model.ts`; a
 * platform test keeps the two equal.
 *
 * @experimental This export is unstable and may change shape or disappear without notice
 */
export const CONTENT_ZOOM_CSS_VARIABLE_PREFIX = '--platform-content-zoom-';

/**
 * CSS custom property holding the Settings default zoom factor, the fallback for an area without a
 * variable of its own. Mirrors `CONTENT_ZOOM_DEFAULT_CSS_VARIABLE` in paranext-core's
 * `src/shared/models/web-view.model.ts`; a platform test keeps the two equal.
 *
 * @experimental This export is unstable and may change shape or disappear without notice
 */
export const CONTENT_ZOOM_DEFAULT_CSS_VARIABLE = '--platform-content-zoom-default';

const MAIN_CONTENT_ZOOM_AREA_ID = 'main';

/**
 * Custom property a zoomed pop-up carries with its area's zoom factor, so its size caps can convert
 * Radix's available-space values (unzoomed pixels) into its own zoomed pixels. The pop-up
 * components repeat this literal inside their class strings, because Tailwind only compiles class
 * names it finds written out in source.
 */
const POPUP_FACTOR_CSS_VARIABLE = '--platform-content-zoom-popup-factor';

/** The zoom area the surrounding content belongs to: `''` for `main`, else the area id. */
const ContentZoomAreaContext = createContext<string | undefined>(undefined);

/**
 * Props for {@link ContentZoomAreaProvider}.
 *
 * @experimental This export is unstable and may change shape or disappear without notice
 */
export type ContentZoomAreaProviderProps = {
  /**
   * Id of the zoom area the wrapped content belongs to, with the same rules as
   * {@link ContentZoomRootProps.area}. Omit it for the view's main area.
   *
   * @experimental This property is unstable and may change shape or disappear without notice
   */
  area?: string;
  /**
   * The content that belongs to the area.
   *
   * @experimental This property is unstable and may change shape or disappear without notice
   */
  children?: ReactNode;
};

/**
 * Tells pop-ups rendered inside it which zoom area they belong to, without marking any element
 * itself. {@link ContentZoomRoot} already does this for everything rendered inside it; use this
 * provider for a pop-up that belongs to an area but is rendered outside that area's element — for
 * example a popover the view renders beside its content and anchors to a position in the text.
 *
 * Popovers, dropdown menus and tooltips from this library that open inside an area are scaled with
 * that area's zoom, and their size is capped so they stay inside the pane.
 *
 * @experimental This export is unstable and may change shape or disappear without notice
 */
export function ContentZoomAreaProvider({ area, children }: ContentZoomAreaProviderProps) {
  return (
    <ContentZoomAreaContext.Provider value={area ?? ''}>{children}</ContentZoomAreaContext.Provider>
  );
}

/**
 * The zoom area the calling component is rendered in: `''` for the view's main area, the area id
 * for a named area, or `undefined` outside every {@link ContentZoomRoot} and
 * {@link ContentZoomAreaProvider}.
 *
 * @experimental This export is unstable and may change shape or disappear without notice
 */
export function useContentZoomArea(): string | undefined {
  return useContext(ContentZoomAreaContext);
}

/** Inline style a zoomed pop-up carries; see {@link getContentZoomPopupStyle}. */
export type ContentZoomPopupStyle = { [POPUP_FACTOR_CSS_VARIABLE]: string };

/**
 * The inline style that gives a pop-up opened from a zoom area that area's zoom factor, for its
 * size caps to divide by. Takes the value {@link useContentZoomArea} returned.
 */
export function getContentZoomPopupStyle(area: string): ContentZoomPopupStyle {
  const areaId = area || MAIN_CONTENT_ZOOM_AREA_ID;
  return {
    [POPUP_FACTOR_CSS_VARIABLE]: `var(${CONTENT_ZOOM_CSS_VARIABLE_PREFIX}${areaId}, var(${CONTENT_ZOOM_DEFAULT_CSS_VARIABLE}, 1))`,
  };
}

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
 * Popovers, dropdown menus and tooltips from this library that open from inside the element follow
 * its zoom and stay inside the pane. A pop-up rendered outside the element (beside the content,
 * anchored to a position in it) belongs to the area only when wrapped in
 * {@link ContentZoomAreaProvider}.
 *
 * This component renders a plain `div` in normal flow and applies no classes of its own — the
 * caller supplies whatever layout classes its parent expects.
 *
 * Measurement caveat: inside a zoomed area, `getBoundingClientRect()` reports zoomed pixels, while
 * `getComputedStyle(el).fontSize` does not reflect the zoom factor. To read the factor itself, look
 * up the `--platform-content-zoom-<areaId>` custom property (`--platform-content-zoom-main` for the
 * unnamed area, `--platform-content-zoom-default` as a fallback) on the view's `documentElement`.
 *
 * A view that marks no area at all is scaled as a whole at the Settings default zoom level and gets
 * no per-pane zoom control.
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
      <ContentZoomAreaProvider area={area}>
        <div
          ref={ref}
          // `props` is arbitrary caller-supplied `HTMLAttributes`; enumerating them would defeat the
          // point of forwarding them.
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...props}
          // Placed after the spread so `area`, not a same-named entry in `props`, always wins.
          data-platform-content-zoom-root={area ?? ''}
        />
      </ContentZoomAreaProvider>
    );
  },
);

ContentZoomRoot.displayName = 'ContentZoomRoot';

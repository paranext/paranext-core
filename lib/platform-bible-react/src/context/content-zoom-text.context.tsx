import { createContext, ReactNode, useContext } from 'react';

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

/** The area id project text inside a provider marks itself with; `undefined` outside every one. */
const ContentZoomTextContext = createContext<string | undefined>(undefined);

/**
 * Props for {@link ContentZoomTextProvider}.
 *
 * @experimental This export is unstable and may change shape or disappear without notice
 */
export type ContentZoomTextProviderProps = {
  /**
   * Id of the zoom area the project text inside belongs to, with the same rules as
   * `ContentZoomRootProps.area`. Omit it for the view's main area.
   *
   * @experimental This property is unstable and may change shape or disappear without notice
   */
  area?: string;
  /**
   * The subtree whose library components mark the project text they render.
   *
   * @experimental This property is unstable and may change shape or disappear without notice
   */
  children: ReactNode;
};

/**
 * Opts the library components inside it into marking the project text they render — a comment's
 * scripture snippet, body, conflict diff and composer, for example — so that text scales with the
 * pane's content zoom while the components' buttons, badges and frames keep interface scale.
 * Outside a provider those components mark nothing.
 *
 * The provider marks no element itself. Do not also wrap its subtree in a `ContentZoomRoot`: a
 * marked element found inside another marked element is ignored.
 *
 * @experimental This export is unstable and may change shape or disappear without notice
 */
export function ContentZoomTextProvider({ area, children }: ContentZoomTextProviderProps) {
  return (
    <ContentZoomTextContext.Provider value={area ?? ''}>{children}</ContentZoomTextContext.Provider>
  );
}

/**
 * The props a component spreads onto the existing element that renders project text inline. Inside
 * a {@link ContentZoomTextProvider} the props carry `data-platform-content-zoom-root` set to the
 * provider's area (`''` for the main area); outside one they are empty. Spread them onto the text
 * element itself rather than adding a wrapper, and never onto pop-up content or an element that
 * contains another marked element.
 *
 * @returns The marker attribute inside a provider; an empty object outside one
 * @experimental This export is unstable and may change shape or disappear without notice
 */
export function useContentZoomTextProps(): { [CONTENT_ZOOM_ROOT_ATTRIBUTE]?: string } {
  const area = useContext(ContentZoomTextContext);
  return area === undefined ? {} : { [CONTENT_ZOOM_ROOT_ATTRIBUTE]: area };
}

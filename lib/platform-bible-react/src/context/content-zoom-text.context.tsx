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

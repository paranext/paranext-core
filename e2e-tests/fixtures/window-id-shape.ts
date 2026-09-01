/**
 * Shape of a platform window id where one appears inside a scoped name — a service shard's
 * registered name, or the `-w<id>` suffix a window appends to the web view ids of a layout it
 * loads.
 *
 * Mirrors `WINDOW_ID_SHAPE_PATTERN_SOURCE` in `src/shared/utils/util.ts`. It is copied rather than
 * imported because the e2e project resolves none of the app's path aliases;
 * `src/shared/utils/window-id-shape.test.ts` fails if the copy ever drifts from the original.
 *
 * Hex groups only, and deliberately NOT RFC-4122-strict: the first builds to persist a window id
 * minted it with `newGuid()`, which produces this shape without constraining the variant nibble,
 * and profiles carrying those ids are in use — so an RFC-strict pattern would silently stop
 * matching about half of what they hold.
 *
 * This lives in its own module, importing nothing, so that the drift guard can read it without
 * pulling Playwright into the unit test suite's module graph.
 */
export const WINDOW_ID_SHAPE_SOURCE =
  '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}';

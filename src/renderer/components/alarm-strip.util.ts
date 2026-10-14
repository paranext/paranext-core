/**
 * Class names for an alarm strip: a full-width `Alert` with the `destructive` variant across the
 * window below the toolbar, with its actions in a third grid column. The connection-lost overlay
 * and the extension-host-stopped banner both use it, so their look and measured contrast cannot
 * drift apart.
 *
 * A full-width strip rather than a floating card: no rounding, and borders only where the strip
 * meets the content above and below it. `tw:bg-transparent` drops the variant's `tw:bg-card`, so
 * the caller's wrapper must supply an opaque `tw:bg-background` ground; the contrast figures below
 * are measured against it.
 *
 * The text and icon take `diff-deleted` rather than the variant's own `destructive`.
 * `--destructive` is background-grade in the Platform dark theme (`index.css` says so where
 * `--diff-deleted` is defined): at `oklch(0.396 …)` on a slate-950 ground it reaches roughly 2:1,
 * well under the 4.5:1 AA needs. `--diff-deleted` is the text-grade red the themes provision —
 * red-600 on light, red-400 on dark.
 *
 * The strip carries the destructive tone through its border and icon only, with no background tint.
 * A `tw:bg-destructive/10` wash costs about 0.6:1, which is the whole margin in the light themes:
 * on it the title reaches 4.18 (Platform light) and 3.99 (paratext-light) against the 4.5:1 AA
 * needs, and the description another 0.2 below that. Over an opaque `tw:bg-background` the worst
 * case across all four themes is 4.52. Darkening the light-theme token to red-700 would buy real
 * headroom instead of a thin pass, but `index.css` requires UX approval for a token change.
 *
 * These are the screens a user reaches when nothing else in the app works, so reading them cannot
 * depend on the theme.
 */
export const ALARM_STRIP_ALERT_CLASS_NAME =
  'tw:rounded-none tw:border-x-0 tw:border-destructive/40 tw:bg-transparent tw:px-3 tw:text-diff-deleted tw:has-[>svg]:grid-cols-[auto_1fr_auto] tw:*:data-[slot=alert-description]:text-diff-deleted/90';

/**
 * Class names for the actions column of an alarm strip: the third grid column, spanning the title
 * and message rows, holding its buttons in normal flow. `Alert`'s own action slot positions its
 * children absolutely over the text and reserves only 72px for them, which suits a one-word action
 * or an icon; a strip as wide as the window with multi-word labels needs them in flow, the only
 * layout that cannot overlap the message. A strip with more than one button adds its own row layout
 * (for example `tw:flex tw:gap-2`).
 */
export const ALARM_STRIP_ACTIONS_CLASS_NAME =
  'tw:col-start-3 tw:row-span-2 tw:row-start-1 tw:self-center tw:ps-3';

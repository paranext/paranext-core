# Design: Legacy HSL Color Variable Backwards Compatibility

**Date:** 2026-04-27
**Branch:** `ai/feature/upgrade-shadcn-tj-04-16-2026`

## Background

The shadcn/Tailwind upgrade on this branch changed the format of CSS color token variables:

| Before                           | After                         |
| -------------------------------- | ----------------------------- |
| `--background: 0 0% 100%;`       | `--background: oklch(1 0 0);` |
| Used as `hsl(var(--background))` | Used as `var(--background)`   |

Old (unupdated) extensions that still write `hsl(var(--background))` in their compiled CSS
or JavaScript now produce invalid CSS — e.g. `hsl(oklch(1 0 0))` — and their colors break.

**Failure mode in scope:** Old extension code that _reads_ platform color variables using the
old `hsl(var(--X))` syntax.

**Not in scope:** Old extension code that _defines_ its own theme variables in old format —
this is already handled by the injected theme stylesheet overriding extension variables.

## Approach

Transform the legacy `hsl(var(--X))` patterns in-flight at WebView load time, inside
`openOrReloadWebView` in `src/renderer/services/web-view.service-host.ts`. Both the compiled
CSS string (`reactWebView.styles`) and the compiled JS bundle (`reactWebView.content`) are
available as plain strings and are transformed before being embedded in the iframe HTML.

Replacements are scoped to the **known theme token names** extracted from the current theme's
`cssVariables` keys (e.g. `background`, `foreground`, `card-foreground`, `ring`, …). Custom
extension variables like `--my-extension-color` are never touched.

This only applies to `WEB_VIEW_CONTENT_TYPE.REACT` WebViews. HTML and URL WebViews are not
transformed.

## Transformation Rules

A helper function `transformLegacyColorVars(text, tokenNames, label, webViewId)` runs three
passes in order (most-specific first):

### Pass 1 — `hsla` with comma-alpha

```
hsla(var(--TOKEN), ALPHA)  →  color-mix(in oklab, var(--TOKEN) P%, transparent)
```

### Pass 2 — `hsl` with slash-alpha

```
hsl(var(--TOKEN) / ALPHA)  →  color-mix(in oklab, var(--TOKEN) P%, transparent)
```

Alpha conversion for passes 1 and 2:

- Bare number (e.g. `0.5`): `P = Math.round(alpha * 100)` → `50`
- Already a percentage (e.g. `50%`): used directly → `50`

### Pass 3 — plain `hsl` (no alpha)

```
hsl(var(--TOKEN))  →  var(--TOKEN)
```

Passes 1 and 2 run before pass 3 so alpha patterns are not partially matched by pass 3's
simpler regex.

The token alternation in each regex is built at call time from the `tokenNames` set:
`(background|foreground|card-foreground|ring|…)`.

## Token Name Sourcing

Token names come from `Object.keys(theme.cssVariables)` using the `theme` object already
computed in `openOrReloadWebView` (via `localThemeService.getCurrentThemeSync()`).

**User themes:** `user-0`, `user-1`, `user-2` have empty `cssVariables` in `themes.data.json`,
but `expandThemeDefinitionsFillMissingCssVariables` in `platform-bible-utils` backfills missing
variables from the default theme when expanding the theme families. So the runtime
`ThemeDefinitionExpanded` always carries the full token set regardless of which theme is
active — no edge case.

## Logging

After both `styles` and `content` are transformed, if any replacements were made, emit a
single `logger.debug` entry containing:

- WebView ID
- Per-string section (`styles` / `content`), each unique `{ original, replacement }` pair and
  its occurrence count

Example:

```
[web-view] Legacy color var replacements in WebView abc123:
  styles (2 replacements):
    hsl(var(--background)) → var(--background)  ×2
  content (3 replacements):
    hsl(var(--ring) / 0.5) → color-mix(in oklab, var(--ring) 50%, transparent)  ×1
    hsl(var(--foreground)) → var(--foreground)  ×2
```

If zero replacements total, nothing is logged.

## Known Gaps

- **Dynamic string construction in compiled JS:** Source code that builds color strings via
  template literal interpolation (e.g. `` `hsl(var(--background) / ${alpha})` ``) may compile
  to split string fragments. The regex won't match across fragments, so these are not
  transformed. Extension authors must update these manually. This is expected to be rare.

## Files Changed

- `src/renderer/services/web-view.service-host.ts` — add `transformLegacyColorVars` helper
  and call it in the `REACT` case of `openOrReloadWebView`

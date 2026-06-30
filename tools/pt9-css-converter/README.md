# pt9-css-converter

Converts the flat per-marker CSS that PT9 ships (e.g. `.usfm_id { font-size: 100%; }`) into the view-mode-bucketed SCSS the platform scripture editor consumes.

It is the build-time partner to [`tools/pt9-css-extractor`](https://github.com/paranext/paranext-core/pull/2452) (in progress), which produces the raw input CSS by running PT9's `CSSCreator.CreateDefaultCSS` against a project's `custom.sty`. Once that tool lands the link will become a repo-relative `../pt9-css-extractor/README.md`.

## Buckets

The classifier is a **closed list of 20 properties** drawn from the Handbook Marker Styling design doc §3.3. Each declaration in the input is routed to one of three view-mode buckets so the editor can toggle them independently; everything outside the closed list falls through to typography and is logged in the warning header so a reviewer can spot misclassifications.

| Bucket                           | Selector                                                                                | Properties                                                                                                                 |
| -------------------------------- | --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `formatted-font`                 | `.formatted-font .usfm_<marker>`                                                        | `color`, `font-family`, `font-size`, `font-style`, `font-variant`, `font-weight`, `text-decoration`, `vertical-align`      |
| `text-spacing` (non-directional) | `.text-spacing .usfm_<marker>`                                                          | `line-height`, `margin-top`, `margin-bottom`, `padding-top`, `padding-bottom`, `text-align`, `text-indent`, `white-space`  |
| `text-spacing[dir]`              | `.text-spacing[dir='ltr'] .usfm_<marker>` and `.text-spacing[dir='rtl'] .usfm_<marker>` | `margin-left`, `margin-right`, `padding-left`, `padding-right`. Emitted twice — the RTL block swaps `*-left` ↔ `*-right`. |

`@font-face` at-rules are stripped (the editor handles fonts elsewhere). Table-marker selectors matching `^(tr|tc\d+|th\d+|tcr\d+|tcc\d+|thr\d+|thc\d+)$` are skipped — the editor doesn't render PT9's table model.

## Running

From the repo root:

```bash
npx tsx tools/pt9-css-converter/src/cli.ts \
  --in data/pt9-css/hbkeng.css \
  --out extensions/src/platform-scripture-editor/src/marker-styles/hbkeng.scss \
  --base extensions/src/platform-scripture-editor/src/_usj-nodes.scss
```

`--base` is optional. When supplied, the converter scans the file for any selectors matching `.usfm_<marker>` and, for each input marker that also appears in the base, emits a "Markers also styled in base" warning in the header so reviewers can spot cascade interactions.

## Testing

Tests are picked up by the root vitest config (`npm run test:core`). Run just this tool's tests with:

```bash
npx vitest run tools/pt9-css-converter
```

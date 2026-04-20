# Publish paranext-core Storybook Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish a new paranext-core Storybook to GitHub Pages side-by-side with the existing platform-bible-react Storybook.

**Architecture:** Fix the Storybook production build by filtering conflicting webpack plugins out of the merged Electron renderer config; decouple platform-bible-react stories/assets from the core Storybook so each Storybook is independently authoritative for its package; add a CI step that builds and deploys the core Storybook; add a landing-page card linking to it.

**Tech Stack:** Storybook 9 (react-webpack5), GitHub Actions (`publish-docs.yml`), JamesIves/github-pages-deploy-action, static HTML landing page.

**Spec:** `docs/specs/2026-04-16-publish-core-storybook-design.md`

---

## File Map

| File                                     | Action | Purpose                                                                                                                                                             |
| ---------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.storybook/main.ts`                     | Modify | (Task 1) Filter conflicting plugins and strip `optimization`/`cache` from merged renderer config. (Task 2) Remove PBR stories glob and PBR entry from `staticDirs`. |
| `.github/workflows/publish-docs.yml`     | Modify | (Task 3) Add a build step that outputs core Storybook to `docs-for-pages/paranext-core-storybook/` before the deploy step.                                          |
| `.github/assets/github-pages-index.html` | Modify | (Task 4) Add a fourth `.resource-card` linking to `paranext-core-storybook/`.                                                                                       |

No new code files. All changes are config / workflow / static HTML.

---

## Task 1: Fix the core Storybook production build

**Context:** `npm run storybook:build` currently fails on `main` with _"Conflict: Multiple assets emit different content to the same filename `mocker-runtime-injected.js`"_. Root cause: Storybook 9's `WebpackInjectMockerRuntimePlugin` hooks into every `HtmlWebpackPlugin` instance, and the merged Electron renderer config brings in a second one. Fix by filtering out `HtmlWebpackPlugin` and `BundleAnalyzerPlugin` from the renderer config, and by stripping `optimization` + `cache` which Storybook manages itself. This hunk is identical to the `.storybook/main.ts` change from commit `65698cbced` (PR #2168, merged to `ai/main`).

**Files:**

- Modify: `.storybook/main.ts` (around current lines 44–57)

- [ ] **Step 1: Record the pre-fix failure**

Run: `npm run storybook:build 2>&1 | tail -5`

Expected: exits non-zero, last lines include

```
Conflict: Multiple assets emit different content to the same filename mocker-runtime-injected.js
=> Failed to build the preview
```

This baseline confirms the fix is necessary.

- [ ] **Step 2: Edit `.storybook/main.ts`** — replace the existing `webpackFinal` prelude

Find this block (currently lines 43–57):

```ts
  // Merge StorybookWebpackConfig with our WebpackRendererConfig
  // See the current webpack configuration using npm run storybook -- --debug-webpack
  // TODO: Make this work in production mode
  webpackFinal: async (webpackConfig, { configType }) => {
    const rendererConfig =
      configType === 'PRODUCTION'
        ? // Storybook is a build tool so this will not affect anything
          // eslint-disable-next-line global-require
          require('../.erb/configs/webpack.config.renderer.prod').default
        : // Storybook is a build tool so this will not affect anything
          // eslint-disable-next-line global-require
          require('../.erb/configs/webpack.config.renderer.dev').default;
    // Remove configs that break stuff (https://storybook.js.org/docs/react/builders/webpack#extending-storybooks-webpack-config)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { devServer, entry, output, ...rendererConfigSanitized } = rendererConfig;
```

Replace with:

```ts
  // Merge StorybookWebpackConfig with our WebpackRendererConfig
  // See the current webpack configuration using npm run storybook -- --debug-webpack
  webpackFinal: async (webpackConfig, { configType }) => {
    const rendererConfig =
      configType === 'PRODUCTION'
        ? // Webpack configs must be loaded dynamically based on configType (PRODUCTION vs DEVELOPMENT)
          // eslint-disable-next-line global-require
          require('../.erb/configs/webpack.config.renderer.prod').default
        : // Storybook is a build tool so this will not affect anything
          // eslint-disable-next-line global-require
          require('../.erb/configs/webpack.config.renderer.dev').default;
    // Strip Electron-specific configs that conflict with Storybook's own webpack setup.
    // devServer/entry/output are Electron-only; optimization/cache are managed by Storybook.
    // See https://storybook.js.org/docs/react/builders/webpack#extending-storybooks-webpack-config
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { devServer, entry, output, optimization, cache, ...rendererConfigSanitized } =
      rendererConfig;

    // Filter out plugins that conflict with Storybook's own plugins.
    // HtmlWebpackPlugin causes Storybook 9's WebpackInjectMockerRuntimePlugin to
    // emit mocker-runtime-injected.js twice (one per HtmlWebpackPlugin instance).
    const conflictingPlugins = ['HtmlWebpackPlugin', 'BundleAnalyzerPlugin'];
    rendererConfigSanitized.plugins = (rendererConfigSanitized.plugins || []).filter(
      (plugin: { constructor?: { name?: string } }) =>
        !conflictingPlugins.includes(plugin?.constructor?.name ?? ''),
    );
```

Changes vs. original:

1. Remove `// TODO: Make this work in production mode` (resolved by this fix).
2. Replace "will not affect anything" comment on the PRODUCTION branch with an accurate explanation.
3. Replace "Remove configs that break stuff" with a specific explanation.
4. Extend the destructure to also drop `optimization` and `cache`.
5. Append a new block that filters `HtmlWebpackPlugin` and `BundleAnalyzerPlugin` from the sanitized renderer config's plugins array.

- [ ] **Step 3: Run TypeScript + lint on the changed file**

Run: `npx eslint .storybook/main.ts`

Expected: zero errors. If lint complains about `require-disable-comment` on the `// eslint-disable-next-line ...` lines, the comment right above them (added in Step 2) is the justification; the rule should be satisfied.

- [ ] **Step 4: Run the Storybook production build to verify the fix**

Run: `npm run storybook:build`

Expected: exits 0, final lines include

```
info => Output directory: storybook-static
```

No `Conflict: Multiple assets emit different content ...` line. No `Failed to build the preview`.

- [ ] **Step 5: Spot-check the build output**

Run: `ls storybook-static/index.html storybook-static/iframe.html`

Expected: both files exist.

Run: `ls storybook-static/ | grep mocker-runtime-injected | wc -l`

Expected: `1` (exactly one mocker-runtime-injected asset, not two).

- [ ] **Step 6: Commit**

```bash
git add .storybook/main.ts
git commit -m "fix(storybook): filter conflicting plugins from merged renderer config

Storybook 9's WebpackInjectMockerRuntimePlugin hooks into every
HtmlWebpackPlugin instance. The merged Electron renderer config brought
in a second HtmlWebpackPlugin, causing mocker-runtime-injected.js to be
emitted twice and the production build to fail.

Filter out HtmlWebpackPlugin and BundleAnalyzerPlugin from the renderer
config, and strip optimization + cache which Storybook manages itself.

Applies the .storybook/main.ts hunk from paranext-core#2168 (merged to
ai/main) onto main so publish-docs can build the core Storybook."
```

---

## Task 2: Decouple platform-bible-react from the core Storybook

**Context:** Core Storybook currently pulls PBR stories into its own build via a stories glob and mounts PBR's `src` as a staticDir. With both Storybooks published to GitHub Pages, PBR stories would appear in both `/platform-bible-react-storybook/` and `/paranext-core-storybook/` and drift apart over time. Remove the duplication; keep the two webpack aliases that let core and extension stories import from PBR by bare specifier and resolve to source.

**Files:**

- Modify: `.storybook/main.ts` (current lines 11 and 15)

- [ ] **Step 1: Remove the PBR stories glob**

Find (currently line 11):

```ts
    '../lib/platform-bible-react/src/stories/**/*.stories.@(js|jsx|ts|tsx)', // Include only stories directory from platform-bible-react library
```

Delete the entire line (including its trailing newline).

The `stories` array should now read:

```ts
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
    '../extensions/src/**/*.stories.@(js|jsx|ts|tsx)', // Collect stories from bundled extensions - at lease until https://paratextstudio.atlassian.net/browse/PT-3307 is implemented
  ],
```

- [ ] **Step 2: Remove the PBR staticDirs entry**

Find (currently line 15):

```ts
    '../lib/platform-bible-react/src', // platform-bible-react static assets
```

Delete the entire line.

The `staticDirs` array should now read:

```ts
  staticDirs: [
    '../src/stories/assets', // static asset folder
    '../extensions/src/platform-scripture-editor/assets', // Scripture editor assets
  ],
```

- [ ] **Step 3: Keep the webpack aliases**

Verify the `webpackConfig.resolve.alias` block (currently around lines 119–125) is **unchanged** — it should still contain both aliases:

```ts
webpackConfig.resolve.alias = {
  ...webpackConfig.resolve.alias,
  '@': join(__dirname, '../lib/platform-bible-react/src'),
  'platform-bible-react': join(__dirname, '../lib/platform-bible-react/src/index.ts'),
};
```

Both are needed: `platform-bible-react` resolves bare imports from core/extension stories to PBR source (for hot-reload during dev); `@` is required transitively because PBR's own source uses `@/…` imports internally when webpack compiles it via the `platform-bible-react` alias.

- [ ] **Step 4: Build and confirm PBR stories are gone**

Run: `rm -rf storybook-static && npm run storybook:build`

Expected: exits 0.

- [ ] **Step 5: Verify no PBR stories in the output**

Run:

```bash
grep -rl "platform-bible-react/src/stories" storybook-static/ 2>/dev/null | head
```

Expected: empty output (no files reference the removed PBR stories path).

Also confirm PBR's staticDir no longer leaks into the build output:

```bash
ls storybook-static/nunito-sans-regular.woff2 storybook-static/favicon.svg 2>/dev/null
```

Expected: no matches (these are PBR `src/` assets that used to be copied in via the removed `staticDirs` entry).

- [ ] **Step 6: Verify core + extension stories are still present**

Run:

```bash
grep -rl "./src/renderer/components/overlays/overlay-command-palette.stories" storybook-static/ 2>/dev/null | head -1
```

Expected: at least one match (bundle or index json references a core story).

Run:

```bash
grep -rl "./extensions/src/platform-get-resources/src/home.stories" storybook-static/ 2>/dev/null | head -1
```

Expected: at least one match (an extension story that consumes `platform-bible-react` survives).

- [ ] **Step 7: Spot-check that extension stories consuming PBR still render**

Run: `npm run storybook` (dev server) in one terminal, then in a browser open `http://localhost:6006/?path=/story/home--home-with-data` (from `extensions/src/platform-get-resources/src/home.stories.tsx` — it imports `CardTitle` from `platform-bible-react`).

Expected: story renders without console errors about unresolved `platform-bible-react` or `@/` imports. Stop the dev server when done.

If you cannot run an interactive browser session in your environment, skip this step and rely on Steps 4–6; the webpack aliases are kept verbatim so resolution behavior is unchanged.

- [ ] **Step 8: Commit**

```bash
git add .storybook/main.ts
git commit -m "refactor(storybook): decouple platform-bible-react stories from core Storybook

Remove the platform-bible-react stories glob and the platform-bible-react
staticDirs entry. PBR has its own Storybook that is published to
/platform-bible-react-storybook/; core Storybook should only host core
and extension stories so the two publications don't duplicate content.

Keep both webpack aliases ('platform-bible-react' → PBR source,
'@' → lib/platform-bible-react/src) so core and extension stories that
import PBR by bare specifier continue to resolve to source during dev."
```

---

## Task 3: Add core Storybook build step to `publish-docs.yml`

**Context:** The workflow currently builds typedoc for three libraries and builds PBR's Storybook, then deploys `docs-for-pages/` to the `github-pages` branch. Add a new step that builds the core Storybook into `docs-for-pages/paranext-core-storybook/`. The workflow already runs `npm run build` earlier, so extensions and library outputs core Storybook needs are present.

**Files:**

- Modify: `.github/workflows/publish-docs.yml` (insert new step after line 53)

- [ ] **Step 1: Edit the workflow file**

Open `.github/workflows/publish-docs.yml` and find this block (currently lines 50–54):

```yaml
- name: Build Storybook for platform-bible-react
  run: |
    cd lib/platform-bible-react
    npm run build:storybook -- --output-dir ../../docs-for-pages/platform-bible-react-storybook

- name: Add nojekyll # needed so that HTML pages that start with _ do not cause 404
```

Insert a new step between the PBR Storybook step and the nojekyll step, so the result is:

```yaml
- name: Build Storybook for platform-bible-react
  run: |
    cd lib/platform-bible-react
    npm run build:storybook -- --output-dir ../../docs-for-pages/platform-bible-react-storybook

- name: Build Storybook for paranext-core
  run: npm run storybook:build -- --output-dir docs-for-pages/paranext-core-storybook

- name: Add nojekyll # needed so that HTML pages that start with _ do not cause 404
```

Notes:

- `npm run storybook:build` is the core script (defined in `package.json:93`); `npm run build:storybook` is the PBR script. Use the right one for each Storybook.
- The path is relative to the repo root (we are not `cd`-ing into a subdirectory, unlike the PBR step which runs from `lib/platform-bible-react`).

- [ ] **Step 2: Validate the YAML**

Run: `python3 -c "import yaml,sys; yaml.safe_load(open('.github/workflows/publish-docs.yml'))" && echo "YAML OK"`

Expected: `YAML OK`.

- [ ] **Step 3: Confirm the step ordering**

Run: `grep -nE "^\s*- name:" .github/workflows/publish-docs.yml`

Expected: the "Build Storybook for paranext-core" step appears after "Build Storybook for platform-bible-react" and before "Add nojekyll".

- [ ] **Step 4: Commit**

```bash
git add .github/workflows/publish-docs.yml
git commit -m "ci(publish-docs): build and deploy paranext-core Storybook

Adds a build step that outputs the core Storybook to
docs-for-pages/paranext-core-storybook/, deployed alongside the
existing platform-bible-react Storybook to GitHub Pages."
```

---

## Task 4: Add landing-page card for the core Storybook

**Context:** `.github/assets/github-pages-index.html` is the static landing page that gets copied to `docs-for-pages/index.html`. It currently has three `.resource-card` elements (for `platform-bible-react`, `platform-bible-utils`, and `papi-dts`). Add a fourth card for `paranext-core` with a single "Design System" link to the new Storybook, styled as a peer to the existing PBR Design System link.

**Files:**

- Modify: `.github/assets/github-pages-index.html` (insert a new card before the closing `</div>` of `.resource-grid`, currently around line 673)

- [ ] **Step 1: Locate the insertion point**

Run: `grep -n "resource-grid\|resource-card" .github/assets/github-pages-index.html | head -20`

Expected output shows four relevant lines:

- the opening `<div class="resource-grid">`
- three `<article class="resource-card">` entries
- the closing `</div>` for `resource-grid`

The new card goes immediately after the `papi-dts` card's closing `</article>` and before the `</div>` that closes `.resource-grid`.

- [ ] **Step 2: Insert the new card**

Find the end of the `papi-dts` card (currently around lines 668–673):

```html
                <a href="papi-dts/index.html" class="resource-link">
                  <svg class="stat-icon" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"
                    />
                  </svg>
                  Type Declarations
                </a>
              </div>
            </article>
          </div>
```

Insert a new `<article>` between the `</article>` and the `</div>` that closes `resource-grid`:

```html
                <a href="papi-dts/index.html" class="resource-link">
                  <svg class="stat-icon" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"
                    />
                  </svg>
                  Type Declarations
                </a>
              </div>
            </article>

            <article class="resource-card">
              <div class="resource-header">
                <div class="resource-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    viewBox="0 0 32 32"
                  >
                    <path
                      fill="#ff4081"
                      d="m24.95 28.948l-18-.9a1 1 0 0 1-.95-1V6.906a1 1 0 0 1 .9-.995l18-1.905A1 1 0 0 1 26 5v22.949a1 1 0 0 1-1.05.998Z"
                    />
                    <path
                      fill="#fafafa"
                      d="m20 8.52l.19-4.242l3.649-.275l.16 4.37a.28.28 0 0 1-.276.283a.3.3 0 0 1-.188-.063L22.123 7.52l-1.668 1.23a.29.29 0 0 1-.398-.055A.27.27 0 0 1 20 8.52m-2.128 6.647c0 .487 3.448.25 3.912-.094c0-3.324-1.87-5.073-5.298-5.073c-3.421 0-5.345 1.774-5.345 4.436c0 4.642 6.561 4.735 6.561 7.266a1.022 1.022 0 0 1-1.164 1.13c-1.047 0-1.459-.512-1.413-2.242c0-.375-3.984-.494-4.101 0c-.308 4.198 2.426 5.41 5.56 5.41C19.619 26 22 24.45 22 21.658c0-4.973-6.653-4.842-6.653-7.31a1.08 1.08 0 0 1 1.243-1.13c.478 0 1.354.08 1.282 1.949"
                    />
                  </svg>
                </div>
                <h3 class="resource-title">paranext-core</h3>
              </div>
              <div class="resource-subtitle">Paranext core</div>
              <p class="resource-description">
                UI component catalog for paranext-core — stories from the core renderer and
                bundled extensions, consuming platform-bible-react as a library.
              </p>
              <div class="resource-links">
                <a
                  href="paranext-core-storybook"
                  class="resource-link resource-link--secondary"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    viewBox="0 0 32 32"
                  >
                    <path
                      fill="#ff4081"
                      d="m24.95 28.948l-18-.9a1 1 0 0 1-.95-1V6.906a1 1 0 0 1 .9-.995l18-1.905A1 1 0 0 1 26 5v22.949a1 1 0 0 1-1.05.998Z"
                    />
                    <path
                      fill="#fafafa"
                      d="m20 8.52l.19-4.242l3.649-.275l.16 4.37a.28.28 0 0 1-.276.283a.3.3 0 0 1-.188-.063L22.123 7.52l-1.668 1.23a.29.29 0 0 1-.398-.055A.27.27 0 0 1 20 8.52m-2.128 6.647c0 .487 3.448.25 3.912-.094c0-3.324-1.87-5.073-5.298-5.073c-3.421 0-5.345 1.774-5.345 4.436c0 4.642 6.561 4.735 6.561 7.266a1.022 1.022 0 0 1-1.164 1.13c-1.047 0-1.459-.512-1.413-2.242c0-.375-3.984-.494-4.101 0c-.308 4.198 2.426 5.41 5.56 5.41C19.619 26 22 24.45 22 21.658c0-4.973-6.653-4.842-6.653-7.31a1.08 1.08 0 0 1 1.243-1.13c.478 0 1.354.08 1.282 1.949"
                    />
                  </svg>

                  Design System
                </a>
              </div>
            </article>
          </div>
```

Notes on the markup:

- The Storybook SVG is copied verbatim from the existing PBR card's "Design System" link — same icon, same colors (`#ff4081` and `#fafafa`).
- The card uses `resource-icon` containing the Storybook SVG (same as used by the PBR card's Design System button). This matches the existing card pattern where each card has a distinct icon in its header.
- The single link uses `resource-link resource-link--secondary` (same pink/secondary styling the PBR card's Design System link uses).
- `href="paranext-core-storybook"` is relative — it resolves to the sibling directory that Task 3 produces.

- [ ] **Step 3: Sanity-check the HTML**

Count the article cards (this counts only `<article class="resource-card"` opens, not CSS class definitions):

```bash
grep -cE '<article class="resource-card"' .github/assets/github-pages-index.html
```

Expected: `4` (was `3` before this step; the new card adds one).

Confirm balanced article tags:

```bash
python3 -c "
import re
html = open('.github/assets/github-pages-index.html').read()
opens = len(re.findall(r'<article\b', html))
closes = len(re.findall(r'</article>', html))
print(f'<article> opens: {opens}, </article> closes: {closes}')
assert opens == closes, 'Article tags are not balanced'
print('BALANCED')
"
```

Expected: `<article> opens: 4, </article> closes: 4` and `BALANCED`.

Confirm the href is present exactly once:

```bash
grep -cn "paranext-core-storybook" .github/assets/github-pages-index.html
```

Expected: `1`.

- [ ] **Step 4: Visual smoke check (optional)**

If you can open the file in a browser locally:

```bash
xdg-open .github/assets/github-pages-index.html 2>/dev/null || open .github/assets/github-pages-index.html
```

Expected: four cards visible in the "API Resources" section. The fourth card sits to the right of / below `papi-dts`, shows the `paranext-core` title with the Storybook icon and a single "Design System" button. The button is the same pink as the PBR "Design System" button.

The "Design System" link will 404 locally (the Storybook is only built in CI) — that is fine; deploy will populate it.

- [ ] **Step 5: Commit**

```bash
git add .github/assets/github-pages-index.html
git commit -m "docs: add paranext-core Storybook card to GitHub Pages landing

Fourth resource card linking to /paranext-core-storybook/ — the
Storybook produced by the new publish-docs build step. Matches the
styling of the existing platform-bible-react Design System link."
```

---

## Task 5: Push branch and open PR

**Context:** All commits are ready locally on `publish-core-storybook`. Push and create a PR targeting `main`.

- [ ] **Step 1: Verify the commit history**

Run: `git log --oneline main..HEAD`

Expected (5 commits in chronological order, oldest first when read bottom-up):

```
<sha> docs: add paranext-core Storybook card to GitHub Pages landing
<sha> ci(publish-docs): build and deploy paranext-core Storybook
<sha> refactor(storybook): decouple platform-bible-react stories from core Storybook
<sha> fix(storybook): filter conflicting plugins from merged renderer config
<sha> docs: add design spec for publishing paranext-core Storybook
```

- [ ] **Step 2: Push the branch**

Run: `git push -u origin publish-core-storybook`

Expected: exit 0; GitHub prints a suggestion URL for opening a PR.

- [ ] **Step 3: Open the PR**

Run:

```bash
gh pr create --base main --title "Publish paranext-core Storybook to GitHub Pages" --body "$(cat <<'EOF'
## Summary
- Fix the core Storybook production build by filtering conflicting webpack plugins (`HtmlWebpackPlugin`, `BundleAnalyzerPlugin`) out of the merged Electron renderer config, and by stripping `optimization` + `cache` which Storybook manages itself.
- Decouple platform-bible-react stories and static assets from the core Storybook so each Storybook is authoritative for its own package.
- Publish the core Storybook to `/paranext-core-storybook/` on GitHub Pages alongside the existing PBR Storybook at `/platform-bible-react-storybook/`.
- Add a landing-page card for the new Storybook.

Full design: `docs/specs/2026-04-16-publish-core-storybook-design.md`
Implementation plan: `docs/plans/2026-04-16-publish-core-storybook.md`

The Storybook build fix is the same `.storybook/main.ts` change from #2168 (merged to `ai/main`), cherry-picked via re-application onto `main`.

## Test plan
- [x] `npm run storybook:build` succeeds locally (fails on `main` without this PR).
- [x] Built output contains zero PBR stories and non-zero core + extension stories.
- [ ] `publish-docs` workflow succeeds on merge and produces both `/platform-bible-react-storybook/` and `/paranext-core-storybook/` under `github-pages`.
- [ ] Landing page on deployed GitHub Pages shows four cards and the new Design System link resolves.
- [ ] `npm run storybook` (dev mode) still works.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

Expected: PR URL printed to stdout.

- [ ] **Step 4: Report PR URL back to the user**

Print the PR URL. Task complete.

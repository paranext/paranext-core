---
name: pr-screenshots
description: "[paranext-core ONLY] Capture before/after screenshots of a UI change for a PR. Reverts the changed files to the base branch to capture the 'before', restores them for the 'after', composes a labeled comparison, and saves it for drag-drop onto the PR. Use whenever a PR touches UI (renderer, extension web views, SCSS/Tailwind, components) and the visual change should be shown. NOT for use in PT9/legacy Paratext codebases."
allowed-tools: Bash, Read, Edit
---

# PR Screenshots Skill

Produce **before/after** screenshots that show what a UI change actually does, so a
reviewer can see it without checking out the branch. Built for Platform.Bible's
running app (Electron + renderer + extension web views).

This skill **composes** existing skills — it does not duplicate them:

- **`app-runner`** — start/restart the app with CDP (`./.erb/scripts/refresh.sh`).
- **`visual-verification`** — drive the renderer over CDP and take screenshots
  (`.claude/skills/visual-verification/scripts/pw-server.mjs`).

The novel part this skill adds is the **"before" capture**: temporarily reverting the
PR's changed files to the base branch, letting the dev watcher rebuild, screenshotting,
then restoring — so before and after are captured from the *same* running app.

## When to use

Use when a PR changes anything user-visible: renderer UI, extension web views,
`*.web-view.scss` / Tailwind / theme files, or `platform-bible-react` components.
Skip for backend-only / C# / type-only / test-only changes.

## Prerequisites

- App reachable with CDP. Check ports 1212 / 8876 / 9223; if CDP is down, start via
  `app-runner` (`./.erb/scripts/refresh.sh`). On macOS this is a **visible window**; on
  Linux it runs headless under xvfb.
- A **clean working tree** on the PR branch (commit or stash unrelated changes first —
  this skill will `git checkout` files and must be able to restore them safely).
- macOS image tooling: `magick` (ImageMagick) for cropping/labeling; `sips` is built in.
- Always launch app/CDP tooling with `env -u ELECTRON_RUN_AS_NODE` — VS Code / Claude
  Code set `ELECTRON_RUN_AS_NODE=1`, which makes Electron behave as plain Node and the
  app fails to start.

## Procedure

### 1. Identify the diff and the surface to show

```bash
BASE=$(git merge-base origin/main HEAD)
git diff --name-only "$BASE"            # the files the PR changes
```

Decide which screen/state demonstrates the change (e.g. a specific web view, a dialog,
an empty state, light vs dark theme). Read the changed component/SCSS to learn which
on-screen state is affected and how to reach it.

### 2. Capture the "after" (current branch = has the change)

The branch HEAD already contains the change, so the running app shows the "after"
state. Navigate to it and screenshot via `visual-verification`:

```bash
SHOTS=<scratchpad>/shots; mkdir -p "$SHOTS"
echo '{"cmd":"screenshot","output":"'"$SHOTS"'/after.png"}
{"cmd":"quit"}' | env -u ELECTRON_RUN_AS_NODE \
  node .claude/skills/visual-verification/scripts/pw-server.mjs 2>/dev/null
```

**Read the PNG** to confirm it shows the intended state before moving on. If you need a
particular theme (e.g. dark mode) or a particular view open, drive there first with
`pw-server` clicks / PAPI commands, or rely on the app's persisted layout.

### 3. Capture the "before" (revert the changed files to base)

This is the key trick. Revert **only the PR's changed UI files** to the base branch,
let the dev environment rebuild, reload, screenshot, then restore.

```bash
FILES="extensions/src/.../foo.web-view.scss extensions/src/.../bar.web-view.scss"
git checkout "$BASE" -- $FILES          # revert these files to base
```

How the change rebuilds depends on what you reverted:

- **Extension or renderer source** (most UI changes): the dev watcher started by
  `npm start` rebuilds automatically — there are live `webpack --watch` / `cd extensions
  && npm run watch` / renderer dev-server processes. Wait ~30s for the rebuild, then
  reload the renderer so web views re-inject their styles. Reloading recreates the web
  views from the (rebuilt) extension, so new styles take effect.
- **Main process or C#/.NET**: the watcher does not hot-reload these. Run
  `./.erb/scripts/refresh.sh` (full rebuild + restart) after reverting instead.

Reload + screenshot via `pw-server` (do the waiting inside the sequence — foreground
`sleep` is blocked in this environment):

```bash
echo '{"cmd":"wait-ms","ms":35000}
{"cmd":"eval","code":"location.reload()"}
{"cmd":"wait-ms","ms":33000}
{"cmd":"screenshot","output":"'"$SHOTS"'/before.png"}
{"cmd":"quit"}' | env -u ELECTRON_RUN_AS_NODE \
  node .claude/skills/visual-verification/scripts/pw-server.mjs 2>/dev/null
```

After a renderer reload the layout restores asynchronously — expect a brief "Updating
project view" spinner. If the screenshot still shows it, wait another ~20s and re-shoot.

### 4. Restore the change (back to "after") — ALWAYS

```bash
git checkout HEAD -- $FILES
git status --porcelain          # MUST be clean; confirm the change is back
```

Then reload once more (same `pw-server` reload sequence) so the running app matches the
branch again. **Never leave the working tree dirty or the app on the reverted state.**
If you captured the "after" in step 2 before reverting, that image is already good; you
can also re-capture it here for a frame-matched pair.

### 5. Compose a labeled comparison

`pw-server` screenshots are full-window. For a panel/dialog, crop to the region and put
before/after side by side. ImageMagick needs an explicit font on macOS:

```bash
FONT=/System/Library/Fonts/Supplemental/Arial.ttf
# Crop the relevant region (WxH+X+Y) from each full-window shot:
magick "$SHOTS/before.png" -crop 220x1040+0+40 +repage "$SHOTS/b.png"
magick "$SHOTS/after.png"  -crop 220x1040+0+40 +repage "$SHOTS/a.png"
# Side-by-side, labeled:
magick montage -font "$FONT" \
  -label 'BEFORE (base)' "$SHOTS/b.png" \
  -label 'AFTER (this PR)' "$SHOTS/a.png" \
  -tile 2x1 -geometry +14+14 -background '#15171c' -fill '#e6e6e6' -pointsize 22 \
  -title 'Model text panel — empty state (dark mode)' \
  "$SHOTS/compare.png"
```

Find crop coordinates by reading a full-window shot first; the renderer viewport is
1920x1080. Skip cropping when the whole window is the story.

### 6. Deliver (drag-drop — GitHub has no image upload API)

GitHub only renders images hosted at a public URL, and there is **no API/`gh` command**
to upload to its attachment CDN — that happens only via drag-drop in the web UI.
**Do not** commit screenshots into the PR branch (it pollutes an otherwise code-only
diff and reviewers will flag it). Instead, save the polished PNGs where the author can
drag them in, named by PR number:

```bash
cp "$SHOTS/compare.png" ~/Downloads/pr<NUMBER>-before-after.png
```

Tell the author to drag the file(s) from `~/Downloads` into the PR description or a PR
comment on github.com — they upload to GitHub's CDN and render inline.

## Gotchas (learned the hard way)

- **`ELECTRON_RUN_AS_NODE`** must be unset for any app/CDP launch (see Prerequisites).
- **Renderer reload is asynchronous** — always wait for the "Updating project view"
  spinner to clear before screenshotting (~30s is usually enough).
- **ImageMagick font** — `montage`/`-annotate` fail with `unable to read font ''` unless
  you pass `-font /System/Library/Fonts/Supplemental/Arial.ttf` (or another real TTF).
- **`convert` is deprecated** in ImageMagick 7 — use `magick`.
- **Narrow side panels** clip text; the legibility difference (e.g. dark-on-dark vs
  light-on-dark) is usually the point and reads clearly even when text is clipped.
- **Restore + verify** — `git status --porcelain` must be empty at the end, and the
  running app must show the "after" again. The before-capture revert is temporary.
- A fresh worktree may have **no `node_modules`** — the running app on 1212/8876 could be
  a *different* checkout. Confirm you built/ran from the PR's worktree, or the
  screenshots won't reflect this branch.

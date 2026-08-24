# Standard-View Marker Styles Re-sync Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make USFM marker glyphs in P10's Standard view render small and gray (PT9 parity) by re-syncing the missing rules into paranext-core's vendored editor stylesheet, in a fresh worktree pair isolated from the in-progress standard-view work.

**Architecture:** The fix is paranext-core-only. The scripture-editors library already has the correct CSS (`packages/platform/src/usj-nodes.css:2065-2151`, commits `768492ec` + `f644504f`), but the npm package deliberately ships no editor CSS — consumers copy it. paranext-core's copy, `extensions/src/platform-scripture-editor/src/_usj-nodes.scss`, was vendored at scripture-editors commit `ba0e846b` and has drifted 14 commits behind: the entire Standard-view marker-glyph block is absent, so glyph spans (`span.opening/.closing/.selfClosing`) match no color/size rule and render as normal text. We port the missing Standard-view rules (plus the cross-ref caller counter whose TS half already ships in the linked editor package), pin them with presence tests so the copy can't silently drift again, and verify in the live app + an e2e computed-style pin.

**Tech Stack:** SCSS (vendored plain CSS), Vitest (extension unit tests), Playwright (isolated e2e), git worktrees, yalc-linked `@eten-tech-foundation/platform-editor`.

## Global Constraints

- **Canonical paths (every task's `$SV`/`$WS` mean exactly these):**
  `SV=/home/tj_co/source/repos/workspaces/standard-view` (TJ's live workspace — source of the worktrees, never edited by this plan) and
  `WS=/home/tj_co/source/repos/workspaces/standard-view-marker-styles` (this plan's workspace, created in Task 1). Export both at the start of every task's shell session.
- **`dev-packages.json` edits are working-only — NEVER commit them** (TJ's standing rule for the standard-view branches). This includes the `revision` and `devPackages` edits Task 1 makes.
- **Never run `devpub`, `yalc publish`, or `yalc push` from the pinned scripture-editors worktree.** The yalc store (`~/.yalc`) is shared and pushes propagate to ALL sibling paranext-core checkouts — publishing from our pinned (older) commit would downgrade the live session's linked editor. Consume the store via `npm run editor:link` / `npm run utils:link` only.
- **The scripture-editors worktree is reference-only**: no commits, no branch. It exists to pin the upstream CSS at a known SHA and satisfy `link-dev-packages`' sibling lookup.
- **One app at a time on ports 1212/8876/9223.** Before any `refresh.sh`, e2e run, or app start: `lsof -ti:8876` and `readlink /proc/<pid>/cwd` for each PID. If another session's app is running (cwd outside our worktree), STOP and coordinate — do not kill it.
- **TJ's live work is moving.** The base branches advanced mid-investigation (scripture-editors `standard-view-pt-4187` went `f14ee9b5` → `1e9a0ac4` while this plan was written). Task 1 records the actual base SHAs at execution time; Task 2's preflight re-verifies the gap diff against the pinned SHA before porting.
- **Comments stand on their own** — no plan/task breadcrumbs in ported CSS or code comments (TJ's rule). The upstream comment blocks are kept verbatim; fork-divergence notes state the technical reason, not the history.
- **TDD discipline**: presence-pin tests go RED before the CSS lands (repo rule `tdd-discipline.md`). The e2e pin (Task 7) is a post-fix regression net — a deliberate deviation from outside-in ordering because each isolated e2e run costs ~2 min and contends for the shared ports.
- Pre-commit verification: `npm run typecheck && npm run lint` plus the extension's vitest suite. `dotnet test` is skipped with reason: no C# files change in this plan.
- Commit messages end with `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`.

## Background for the implementer (zero-context summary)

**How editor CSS reaches the WebView:** `platform-scripture-editor.web-view.scss` does `@use './usj-nodes'` (the vendored copy); the compiled result is imported `?inline` in `main.ts` and inlined as a `<style>` tag into the editor WebView iframe at construction. A second, dynamic layer (`generateUsjCss` from the project's USFM stylesheet via `useProjectStylesheet`) styles the **container elements** (`.usfm_p`, `.usfm_v`, …) — it can never style the glyph spans, which carry only `opening`/`closing`/`selfClosing` + `data-marker` (the `marker` class was deliberately dropped from MarkerNode upstream in PR #359; pinned by `MarkerNode.test.ts`).

**Standard view container classes:** `.editor-input.usfm.marker-editable.text-spacing.formatted-font` (from `STANDARD_VIEW_MODE = { markerMode: 'editable', noteMode: 'collapsed', hasSpacing: true, isFormattedFont: true }`). The upstream rules are scoped `.formatted-font.marker-editable` precisely so the Unformatted view (editable but not formatted-font) keeps full-size plain markers.

**PT9 reference (verified in `~/source/repos/Paratext`):** `ScriptureBase.css` `.marker { color: (theme marker_valid = #8c8c8c light / #b5b5b5 dark); font-size: 0.7em; unicode-bidi: isolate; }` — inherits font family/weight from the enclosing style; the verse NUMBER is styled by usfm.sty (superscript 66%), separate from the `\v` tag. Upstream's `rgba(140, 140, 140, 1)` ≈ PT9's `#8c8c8c`. Note an accepted P10 divergence: P10 bakes `\v 1` into one verse token styled by `usfm_v` (no separate small-gray `\v` tag) — upstream excluded `.verse`/`.chapter` from the gray treatment on purpose.

**The deterministic gap** (prettier-normalized diff of upstream `usj-nodes.css` @ `1e9a0ac4` vs the fork body):

1. **Missing: the Standard-view block** (upstream 2065–2151): gray + 0.7em rules for `.opening/.closing/.selfClosing/.marker`, the `.verse` badge-drop rule, scoped `.status_unknown`/`.status_invalid`. ← the reported bug.
2. **Missing: cross-ref caller counter** (upstream commit `42af3eda`): `@counter-style cross-ref-callers`, `counter-reset: caller crossref`, footnote-vs-crossref selector split. The TS half (NoteNodePlugin) already ships in the yalc-linked editor build, so P10 currently numbers cross-ref callers on the footnote sequence.
3. **Superseded in fork: unscoped `.status_unknown`/`.status_invalid`** ("Style statues" block) — upstream consolidated these into the scoped versions.
4. **Deliberate fork divergences to PRESERVE:** literal `rgba(140, 140, 140, …)` colors in the fork's UnknownNode block (paranext-core's `--muted-foreground` holds a full color value, not raw HSL components as upstream assumes — the fork comment documents this); the fork's `\fp` comment clause about the footnote popover; prettier single-quote formatting.
5. **Known drift NOT ported here (deferred):** upstream #486 paragraph-structure gutter/active-focus polish (logical properties, RTL bidi fixes, `.book` gutter, empty-verse refinement, `::after` outline). That region is the **Simple-mode surface**; TJ's standing decision gates Simple-mode-affecting changes behind separate sign-off. Also upstream's `user-select: contain` removal in the UnknownNode block (a Blink no-op either way).

## File Structure

- Modify: `extensions/src/platform-scripture-editor/src/_usj-nodes.scss` (insert Standard-view block after the `.marker-visible/.marker-hidden` font-size rule ~line 2067; edit note-caller region ~2174–2196; delete unscoped status block ~2244–2253; update header line 1)
- Modify: `extensions/src/platform-scripture-editor/src/usj-nodes-styles.test.ts` (presence pins)
- Create: `e2e-tests/tests/isolated/scripture-editor/standard-marker-glyph-styling.spec.ts`
- Working-only (never commit): `dev-packages.json`

Not touched: `extensions/src/platform-enhanced-resources/src/_usj-nodes.scss` (second drifted copy — read-only resource viewer, never uses `marker-editable`; see Follow-ups).

---

### Task 1: Workspace, worktrees, and minimal environment

**Files:** none in-repo (worktree + environment setup)

**Interfaces:**

- Produces: worktree pair at `~/source/repos/workspaces/standard-view-marker-styles/{paranext-core,scripture-editors}`; core branch `standard-view-marker-styles`; recorded env vars `CORE_BASE`, `SE_PIN` (written to `.plan-pins` in the workspace root for later tasks); a paranext-core checkout able to run the extension's vitest suite.

- [ ] **Step 1: Record base SHAs and verify the sync-source file is clean**

```bash
SV=/home/tj_co/source/repos/workspaces/standard-view
CORE_BASE=$(git -C $SV/paranext-core rev-parse standard-view)
SE_PIN=$(git -C $SV/scripture-editors rev-parse standard-view-pt-4187)
git -C $SV/scripture-editors status --porcelain packages/platform/src/usj-nodes.css
```

Expected: last command prints nothing (the file is clean — the live session's dirty files are elsewhere). If it prints anything, STOP: the sync source is being edited; ask TJ before proceeding.

- [ ] **Step 2: Create the workspace and both worktrees**

```bash
WS=/home/tj_co/source/repos/workspaces/standard-view-marker-styles
mkdir -p $WS
git -C $SV/paranext-core worktree add $WS/paranext-core -b standard-view-marker-styles standard-view
git -C $SV/scripture-editors worktree add --detach $WS/scripture-editors "$SE_PIN"
mkdir -p $WS/paranext-core/docs/superpowers/plans
cp $SV/paranext-core/docs/superpowers/plans/2026-08-06-standard-view-marker-styles-resync.md $WS/paranext-core/docs/superpowers/plans/
printf 'CORE_BASE=%s\nSE_PIN=%s\n' "$CORE_BASE" "$SE_PIN" > $WS/.plan-pins
```

The scripture-editors worktree is detached on purpose: reference-only pin, no branch to clean up, and `link-dev-packages`' `checkoutRevision` skips `git pull` for detached SHAs.

- [ ] **Step 3: Apply the working-only `dev-packages.json` edit (NEVER commit)**

In `$WS/paranext-core/dev-packages.json`, change the scripture-editors entry: `"revision": "platform-yalc"` → `"revision": "<SE_PIN sha>"` and `"devPackages": [ … ]` → `"devPackages": []`. The SHA revision makes `link-dev-packages` check out our pinned worktree detached (no pull, no working-changes conflict); the empty `devPackages` prevents it from running `devpub` (which would both fail non-interactively via the volta/pnpm recursion and contaminate the shared yalc store with a build from our pin).

- [ ] **Step 4: Install (volta-recursion-safe)**

```bash
cd $WS/paranext-core && env -u _VOLTA_TOOL_RECURSION npm install
```

Expected: completes; postinstall's `link-dev-packages` logs a checkout of the pinned SHA and a pnpm install in the sibling, then links nothing (empty devPackages). Known flake: if any pnpm/nx child still dies with a volta "Node is not available"/version error, re-run the failed piece with the shim-dir workaround from the `standard-view-dev-loop` memory; the unit-test tasks below need only a healthy root+workspaces `node_modules`, not the DLL or yalc link.

- [ ] **Step 5: Verify the test runner works in the new worktree**

```bash
cd $WS/paranext-core/extensions/src/platform-scripture-editor && npx vitest run usj-nodes-styles.test.ts
```

Expected: PASS (3 existing tests) — proves the environment can run the suite before we change anything.

---

### Task 2: RED — presence pins for the Standard-view marker rules

**Files:**

- Modify: `extensions/src/platform-scripture-editor/src/usj-nodes-styles.test.ts`

**Interfaces:**

- Consumes: the existing `scss` string constant at the top of the describe block (reads `_usj-nodes.scss`).
- Produces: four new tests inside a nested describe `'PT9 Standard-view marker glyph styling'` that Task 3 turns green.

- [ ] **Step 1: Re-verify the gap against the pinned upstream (preflight, deterministic)**

```bash
WS=/home/tj_co/source/repos/workspaces/standard-view-marker-styles
git -C $WS/scripture-editors show HEAD:packages/platform/src/usj-nodes.css | grep -n "formatted-font.marker-editable .opening"
grep -n "formatted-font.marker-editable .opening" $WS/paranext-core/extensions/src/platform-scripture-editor/src/_usj-nodes.scss || echo "MISSING (expected)"
```

Expected: upstream shows hits (~lines 2071+); fork prints `MISSING (expected)`. If the fork already has the rules, the drift was fixed while this plan waited — STOP and report instead of double-porting.

- [ ] **Step 2: Append the failing tests** (inside the top-level describe, after the existing `it` blocks)

```ts
describe('PT9 Standard-view marker glyph styling', () => {
  // Standard view renders marker glyphs as MarkerNode spans carrying marker-syntax classes
  // (opening/closing/selfClosing) — not `marker`, which MarkerNode dropped upstream in #359.
  // The PT9 look (small gray) must target those classes, scoped to
  // `.formatted-font.marker-editable` so the Unformatted view keeps full-size plain markers.
  it('grays the editable marker glyphs', () => {
    expect(scss).toMatch(
      /\.formatted-font\.marker-editable \.opening,[\s\S]{0,200}?\.formatted-font\.marker-editable \.marker \{\s*color: rgba\(140, 140, 140, 1\);\s*\}/,
    );
  });

  it('shrinks the editable marker glyphs to 0.7em, chapter tokens excluded', () => {
    expect(scss).toMatch(
      /\.formatted-font\.marker-editable \.opening,[\s\S]{0,200}?\.formatted-font\.marker-editable \.marker:not\(\.chapter\) \{\s*font-size: 0\.7em;\s*\}/,
    );
  });

  it('drops the verse badge background in Standard view (PT9 has no verse badge)', () => {
    expect(scss).toMatch(
      /\.formatted-font\.marker-editable \.verse \{[^}]*background-color: transparent;[^}]*\}/,
    );
  });

  it('scopes marker validation status rules to editable marker modes', () => {
    expect(scss).toMatch(/\.marker-editable \.status_unknown/);
    expect(scss).toMatch(/\.marker-editable \.status_invalid/);
    // The unscoped legacy rules were superseded by the scoped ones; they must not return.
    expect(scss).not.toMatch(/^\.status_unknown/m);
    expect(scss).not.toMatch(/^\.status_invalid/m);
  });
});
```

- [ ] **Step 3: Run to verify RED**

```bash
cd $WS/paranext-core/extensions/src/platform-scripture-editor && npx vitest run usj-nodes-styles.test.ts
```

Expected: FAIL — the four new tests red (all four assertions unmet today, including the `not.toMatch` pair since the fork's unscoped `.status_unknown` block starts at column 0), the three pre-existing tests green.

---

### Task 3: GREEN — port the Standard-view block into the fork

**Files:**

- Modify: `extensions/src/platform-scripture-editor/src/_usj-nodes.scss`

**Interfaces:**

- Consumes: pinned upstream text (identical content is inlined below — no need to re-extract).
- Produces: fork containing the `.formatted-font.marker-editable` rules Task 2 pins.

- [ ] **Step 1: Insert the Standard-view block.** Anchor: immediately after this existing rule (~line 2064–2067) and before `.notetext`:

```css
.marker-visible .marker:not(.chapter),
.marker-hidden .marker:not(.chapter) {
  font-size: 0.7em;
}
```

Insert (verbatim upstream 2065–2108; upstream's UnknownNode portion of the block is intentionally NOT copied — the fork already carries its own adapted UnknownNode rules further down, see Step 2 note):

```css
/* Standard view: editable markers within formatted text get the PT9 marker look.
   MarkerNode carries its marker-syntax class (opening/closing/selfClosing), not
   `marker` (dropped in #359); ImmutableTypedTextNode (book id) carries `marker`.
   Verse/chapter tokens are deliberately excluded: PT9 styles them via their own
   usfm_v/usfm_c stylesheet classes, not the grey marker look.
   Scoped to .formatted-font so the Unformatted view keeps full-size plain markers. */
.formatted-font.marker-editable .opening,
.formatted-font.marker-editable .closing,
.formatted-font.marker-editable .selfClosing,
.formatted-font.marker-editable .marker {
  color: rgba(140, 140, 140, 1);
}

.formatted-font.marker-editable .opening,
.formatted-font.marker-editable .closing,
.formatted-font.marker-editable .selfClosing,
.formatted-font.marker-editable .marker:not(.chapter) {
  font-size: 0.7em;
}

.formatted-font.marker-editable .verse {
  white-space: nowrap;
  unicode-bidi: embed;
  /* PT9 Standard view has no background badge on verse tokens; the formatted
     (non-editable) view keeps its badge. */
  background-color: transparent;
}

/* Marker validation states (PT9 ScriptureBase.css .status_unknown/.status_invalid):
   flag markers the project stylesheet reports as unknown or invalid. Applied to
   marker GLYPH spans only — body text stays normal (PT9 Standard.xslt stamps status
   on the marker span, not the element). Same error red as the unmatched-closer
   `.invalid` rule below. */
.marker-editable .status_unknown,
.formatted-font.marker-editable .status_unknown {
  color: rgba(204, 30, 20, 1);
  font-weight: bold;
}

.marker-editable .status_invalid,
.formatted-font.marker-editable .status_invalid {
  color: rgba(204, 30, 20, 1);
  border-bottom: 1px solid rgba(204, 30, 20, 1);
}
```

- [ ] **Step 2: Delete the superseded unscoped status block** (~line 2244 in the pre-edit file, now shifted down; it sits between the annotation rules region and the fork's UnknownNode comment):

```css
/* Style statues */
.status_unknown {
  color: rgba(204, 30, 20, 1);
  font-weight: bold;
}

.status_invalid {
  border-bottom: 1px solid rgba(204, 30, 20, 1);
  color: rgba(204, 30, 20, 1);
}
```

Delete exactly this block (comment included). Leave the fork's UnknownNode block (`/* UnknownNode: lossless carrier … */` through `.marker-editable .unknown-inline { … }`) untouched — its literal `rgba()` colors are a documented, deliberate divergence from upstream's `hsl(var(--muted-foreground …))` (different CSS-variable contract in paranext-core), and its extra `user-select: contain` is a Blink no-op upstream later removed (cleanup deferred; see Follow-ups).

- [ ] **Step 3: Update the file header.** Replace line 1:

```css
/* Copied from https://github.com/eten-tech-foundation/scripture-editors/blob/ba0e846b3f11bea5720c4aa1a3486b69feb6b7e0/packages/platform/src/usj-nodes.css */
```

with (substitute the real `SE_PIN` SHA from `$WS/.plan-pins`):

```css
/* Copied from https://github.com/eten-tech-foundation/scripture-editors/blob/<SE_PIN>/packages/platform/src/usj-nodes.css
   Intentional divergences from that source: prettier single-quote formatting; the UnknownNode
   rules use literal rgba() grays because this app's --muted-foreground holds a full color value,
   not the raw HSL components the source's hsl(var()) wrapping assumes; the paragraph-structure
   gutter/active-focus region is kept at its earlier upstream state pending a Simple-mode review. */
```

- [ ] **Step 4: Run tests to verify GREEN**

```bash
cd $WS/paranext-core/extensions/src/platform-scripture-editor && npx vitest run usj-nodes-styles.test.ts
```

Expected: PASS — all 7 tests.

- [ ] **Step 5: Format + commit**

```bash
cd $WS/paranext-core && npx prettier --write extensions/src/platform-scripture-editor/src/_usj-nodes.scss extensions/src/platform-scripture-editor/src/usj-nodes-styles.test.ts
git add extensions/src/platform-scripture-editor/src/_usj-nodes.scss extensions/src/platform-scripture-editor/src/usj-nodes-styles.test.ts
git commit -m "fix(scripture-editor): PT9 small gray marker glyphs in Standard view

Re-sync the vendored _usj-nodes.scss with the editor library's Standard-view
marker block (small gray 0.7em glyphs, verse badge drop, scoped validation
status rules), which the hand-vendored copy predated. Presence tests pin the
rules so the copy cannot silently drift again.

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

(Verify prettier made no unexpected changes to the inserted block before committing — `git diff --stat` should show only the two files.)

---

### Task 4: Cross-ref caller counter CSS (drop this task if TJ says footnote callers are out of scope)

The linked editor build already runs the NoteNodePlugin that assumes this CSS (upstream `42af3eda`); without it, cross-reference callers increment the footnote letter sequence. Same drift, same file — but it is caller behavior, not marker styling, so it is separable.

**Files:**

- Modify: `extensions/src/platform-scripture-editor/src/usj-nodes-styles.test.ts`
- Modify: `extensions/src/platform-scripture-editor/src/_usj-nodes.scss` (note-caller region, ~line 2174–2196 pre-Task-3 numbering)

**Interfaces:**

- Consumes: the same `scss` constant; the fork's existing `@counter-style note-callers` block as the edit anchor.

- [ ] **Step 1: RED — append inside the top-level describe**

```ts
describe('note caller sequences', () => {
  it('gives cross-references their own caller counter so they do not consume footnote letters', () => {
    expect(scss).toMatch(/@counter-style cross-ref-callers/);
    expect(scss).toMatch(/counter-reset: caller crossref;/);
    expect(scss).toMatch(/\.note\.usfm_x \.immutable-note-caller\[data-caller='\+'\]/);
    expect(scss).toMatch(/counter\(crossref, cross-ref-callers\)/);
  });
});
```

Run `npx vitest run usj-nodes-styles.test.ts` → the new test FAILS, all others pass.

- [ ] **Step 2: GREEN — apply the four edits in the note-caller region** (all verbatim upstream):

(a) After the existing `@counter-style note-callers { … }` block, add:

```css
/* Cross-reference (x, ex) auto-generated callers use their own sequence, so they don't also
   increment the footnote counter above. */
@counter-style cross-ref-callers {
  system: cyclic;
  /* These symbols are updated in TS by the `NoteNodePlugin`. */
  symbols: '\2020';
  suffix: '';
}
```

(b) Change `.editor-input { counter-reset: caller; }` → `counter-reset: caller crossref;`

(c) Replace the two generic caller rules:

```css
.immutable-note-caller[data-caller='+'] {
  counter-increment: caller;
}

.note.collapsed .immutable-note-caller[data-caller='+'] > button::before {
  content: counter(caller, note-callers);
}
```

with the footnote-scoped versions plus the cross-ref pair:

```css
.note.usfm_f .immutable-note-caller[data-caller='+'],
.note.usfm_fe .immutable-note-caller[data-caller='+'],
.note.usfm_ef .immutable-note-caller[data-caller='+'],
.note.usfm_efe .immutable-note-caller[data-caller='+'] {
  counter-increment: caller;
}

.note.collapsed.usfm_f .immutable-note-caller[data-caller='+'] > button::before,
.note.collapsed.usfm_fe .immutable-note-caller[data-caller='+'] > button::before,
.note.collapsed.usfm_ef .immutable-note-caller[data-caller='+'] > button::before,
.note.collapsed.usfm_efe .immutable-note-caller[data-caller='+'] > button::before {
  content: counter(caller, note-callers);
}

.note.usfm_x .immutable-note-caller[data-caller='+'],
.note.usfm_ex .immutable-note-caller[data-caller='+'] {
  counter-increment: crossref;
}

.note.collapsed.usfm_x .immutable-note-caller[data-caller='+'] > button::before,
.note.collapsed.usfm_ex .immutable-note-caller[data-caller='+'] > button::before {
  content: counter(crossref, cross-ref-callers);
}
```

- [ ] **Step 3: Run tests → all green; commit**

```bash
cd $WS/paranext-core/extensions/src/platform-scripture-editor && npx vitest run usj-nodes-styles.test.ts
cd $WS/paranext-core && git add extensions/src/platform-scripture-editor/src/_usj-nodes.scss extensions/src/platform-scripture-editor/src/usj-nodes-styles.test.ts
git commit -m "fix(scripture-editor): separate cross-ref caller sequence in vendored styles

The linked editor's NoteNodePlugin already drives distinct footnote/cross-ref
caller sequences; the vendored stylesheet predated the counters, so \\x callers
consumed footnote letters.

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 5: Repo-wide verification and hygiene

**Files:** none (verification only)

- [ ] **Step 1:** `cd $WS/paranext-core/extensions/src/platform-scripture-editor && npx vitest run` — full extension suite green.
- [ ] **Step 2:** `cd $WS/paranext-core && npm run typecheck` — green.
- [ ] **Step 3:** `cd $WS/paranext-core && npm run lint` — green (repo-root, same command CI runs). Fix anything flagged in the touched files before proceeding; do not suppress.
- [ ] **Step 4:** `git -C $WS/paranext-core status --short` — only `dev-packages.json` modified (working-only, stays uncommitted) and nothing untracked but the copied plan doc. Commit the plan doc:

```bash
cd $WS/paranext-core && git add docs/superpowers/plans/2026-08-06-standard-view-marker-styles-resync.md
git commit -m "docs: standard-view marker styles re-sync plan

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 6: Live-app visual verification

> **DONE — verified by hand, 2026-08-20 (TJ).** The Standard-view marker glyphs render as intended
> in the running app. This was the one check the headless suite provably could not answer: no
> stylesheet is loaded in any test in this repo, so the unit pins can only assert the rules exist in
> the file, never that they survive SCSS compilation, WebView style inlining, and the cascade against
> the generated project stylesheet. Task 7 (the e2e computed-style pin, which would catch a future
> regression automatically) is still outstanding.

**Files:** none (uses the app-runner + visual-verification skills)

The vendored SCSS is compiled into the extension bundle, so the running app needs the extension rebuilt (the dev watcher does this) and the yalc-linked Standard-view editor build (already in the shared yalc store from the live session's dev loop — we consume it, never rebuild it).

- [ ] **Step 1: Port-contention guard.** `lsof -ti:8876`; for each PID `readlink /proc/<pid>/cwd`. If a running app belongs to another workspace, STOP and coordinate with TJ before proceeding (refresh.sh would kill it). Also `pgrep -f 'workspaces/standard-view-marker[-]styles/paranext-core'` to confirm nothing stale of ours.
- [ ] **Step 2: Link the editor packages from the yalc store and rebuild the dev DLL** (the DLL is what actually serves `@eten-tech-foundation/platform-editor` to the dev renderer):

```bash
cd $WS/paranext-core
npm run editor:link && npm run utils:link
NODE_ENV=development TS_NODE_TRANSPILE_ONLY=true npx webpack --config ./.erb/configs/webpack.config.renderer.dev.dll.ts
npm run build:data
```

- [ ] **Step 3: Start the app** via the app-runner skill (`./.erb/scripts/refresh.sh`, headless CDP). Ensure power mode: `platform.interfaceMode: "power"` in `dev-appdata/data/settings.json` (Standard view is power-mode-only; simple mode coerces it to formatted).
- [ ] **Step 4: Verify with the visual-verification skill.** Open the sample WEB project editable editor, Standard view, a prose chapter (e.g. Obadiah 1). Checks:
  - Screenshot: `\p`, `\s1`, `\q1` etc. glyphs visibly smaller and gray; body text unchanged; `\c 1` NOT shrunk-gray (chapter excluded by design); `\v` tokens have no gray badge behind them.
  - CDP computed-style probe inside the editor iframe:
    ```js
    const el = document.querySelector('.editor-input.marker-editable span.opening[data-marker]');
    const cs = getComputedStyle(el);
    const ps = getComputedStyle(el.parentElement);
    ({ color: cs.color, ratio: parseFloat(cs.fontSize) / parseFloat(ps.fontSize) });
    ```
    Expected: `color: "rgb(140, 140, 140)"`, `ratio` ≈ 0.7 (±0.01).
  - If stale styles appear: the WebView inlines extension styles at construction — close and reopen the editor tab (or restart via refresh.sh) after the extension watcher rebuilds.

---

### Task 7: E2E regression pin (computed style in a real browser)

**Files:**

- Create: `e2e-tests/tests/isolated/scripture-editor/standard-marker-glyph-styling.spec.ts`

**Interfaces:**

- Consumes: `../../../fixtures/isolated.fixture` and `../../../fixtures/scripture-editor-helpers` exactly as `standard-default-power-mode.spec.ts` does (`makeSampleProjectEditable`, `navigateToolbarBcv`, `openEditableScriptureEditorForProject`, `SAMPLE_WEB_PROJECT_ID`, `waitForHomeTab`).

- [ ] **Step 1: Write the spec** (ONE test per file — the isolated fixture's documented second-Electron-instance failure mode):

```ts
/**
 * Standard-view marker glyph styling e2e: inline marker glyphs (MarkerNode spans) render with the
 * PT9 look — small (0.7em of their context) and gray — via the vendored `_usj-nodes.scss` rules
 * scoped to `.formatted-font.marker-editable`. Guards the vendored stylesheet against drifting away
 * from the editor library again (the drift this pin was written for shipped full-size, normal-color
 * markers).
 *
 * Asserts COMPUTED style in the real renderer because the unit-level pins can only assert the rules
 * exist in the file, not that they survive SCSS compilation, webview style inlining, and the
 * cascade against the generated project stylesheet.
 *
 * ONE test() per spec file on purpose: the isolated fixture is test-scoped, and a SECOND Electron
 * instance against the shared webpack dev server has a documented failure mode where new dock tabs
 * never render (see isolated.fixture.ts).
 *
 * Runs against an isolated project root: `npm run test:e2e:isolated scripture-editor`.
 */
import { test, expect } from '../../../fixtures/isolated.fixture';
import {
  makeSampleProjectEditable,
  navigateToolbarBcv,
  openEditableScriptureEditorForProject,
  SAMPLE_WEB_PROJECT_ID,
  waitForHomeTab,
} from '../../../fixtures/scripture-editor-helpers';

test.use({
  interfaceMode: 'power',
  electronLaunchOptions: { isolatedProjectRoot: true, envOverrides: { DEV_NOISY: 'false' } },
});

test.describe('scripture editor Standard-view marker styling', () => {
  test('marker glyphs render small and gray (PT9 marker look)', async ({ mainPage }) => {
    test.slow();
    await waitForHomeTab(mainPage);

    await makeSampleProjectEditable();
    const editorId = await openEditableScriptureEditorForProject(mainPage, SAMPLE_WEB_PROJECT_ID);
    const editorFrame = mainPage.frameLocator(`iframe[data-web-view-id="${editorId}"]`);
    await editorFrame.locator('.editor-container').waitFor({ timeout: 60_000 });

    await navigateToolbarBcv(mainPage, 'Obadiah 1:1');

    const glyph = editorFrame
      .locator('.editor-input.marker-editable span.opening[data-marker]')
      .first();
    await expect(glyph).toBeAttached({ timeout: 60_000 });

    const measured = await glyph.evaluate((el) => {
      const glyphStyle = getComputedStyle(el);
      const parentStyle = getComputedStyle(el.parentElement!);
      return {
        color: glyphStyle.color,
        ratio: parseFloat(glyphStyle.fontSize) / parseFloat(parentStyle.fontSize),
      };
    });
    expect(measured.color).toBe('rgb(140, 140, 140)');
    expect(measured.ratio).toBeCloseTo(0.7, 1);
  });
});
```

- [ ] **Step 2: Run it** (port guard from Task 6 Step 1 applies — the isolated suite starts its own app on the shared ports; FOREGROUND run only):

```bash
cd $WS/paranext-core && npm run test:e2e:isolated scripture-editor
```

Expected: the new spec passes; pre-existing scripture-editor isolated specs stay green (cold first test can take ~84 s — budget accordingly).

- [ ] **Step 3: Revert-test the pin.** Temporarily rename the `color: rgba(140, 140, 140, 1)` declaration's selector block in `_usj-nodes.scss` (e.g. `.formatted-font.marker-editableX`), re-run ONLY the new spec (`npm run test:e2e:isolated scripture-editor -- -g "small and gray"`), confirm it FAILS, restore the file (`git checkout -- extensions/src/platform-scripture-editor/src/_usj-nodes.scss`), re-run → PASS.
- [ ] **Step 4: Commit**

```bash
cd $WS/paranext-core && git add e2e-tests/tests/isolated/scripture-editor/standard-marker-glyph-styling.spec.ts
git commit -m "test(e2e): pin PT9 small-gray marker glyph styling in Standard view

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 8: Push and wrap up

- [ ] **Step 1:** `git -C $WS/paranext-core push -u origin standard-view-marker-styles`
- [ ] **Step 2:** Confirm `dev-packages.json` is still uncommitted (`git -C $WS/paranext-core status --short` shows it modified; `git log -p -1 -- dev-packages.json` shows no new commit touching it).
- [ ] **Step 3:** Report to TJ: branch pushed; integration options are (a) merge/fast-forward into `standard-view` once the current display-run work settles, or (b) PR via the pr-creator skill if review is wanted. Note that CI on these branches is manual dispatch only. Leave the worktrees in place until TJ decides; the detached scripture-editors worktree can then be removed with `git -C $SV/scripture-editors worktree remove $WS/scripture-editors`.

---

## Follow-ups (recorded, deliberately NOT in this plan)

1. **Paragraph-structure gutter/active-focus re-sync** (upstream #486 polish: logical properties, RTL bidi fixes, `.book` gutter markers, empty-verse placeholder refinement, `::after` outline). Simple-mode surface → needs TJ's separate sign-off per the standing carve-out rule.
2. **`platform-enhanced-resources/src/_usj-nodes.scss`** — second independently-drifted vendored copy; read-only viewer, never `marker-editable`, so the Standard-view rules don't apply there. Re-sync separately if its own symptoms appear. **`lib/platform-bible-react/src/components/demo/scripture-editor/usj-nodes.css`** is a THIRD drifted copy (still at the old `ba0e846b` pin); the Storybook demo exposes `markerMode`/`isFormattedFont` controls, so it can render a Standard view that no longer matches the app — include it in any future re-sync.
3. **Structural fix upstream**: have `@eten-tech-foundation/platform-editor` ship its CSS (subpath export or `import './usj-nodes.css'` into the bundle) so consumers stop hand-vendoring. This is the root cause of the whole drift class; belongs in the scripture-editors backlog.
4. **UnknownNode `user-select: contain` cleanup** (Blink no-op; upstream removed it with an explanatory comment) — fold into the next re-sync.
5. **Theme-aware marker gray**: PT9 dark theme uses `#b5b5b5`; the ported rules hard-code the light-theme gray like upstream does. If/when the editor webview gets a dark theme, override in `_editor-overrides.scss` with the app's color tokens rather than diverging the vendored file.
6. **Accepted divergence to be aware of**: PT9 renders the `\v` tag small-gray separately from the superscript verse number; P10 styles the whole `\v 1` token via `usfm_v` (upstream's deliberate choice). If TJ wants exact PT9 verse-tag parity, that is an editor-library change (split MarkerNode out of the verse token), not a CSS port.

# Donna edits text using Standard view (as in 9): investigation

Investigated 2026-07-13 from `docs/prd/PRD-Power-Donna_edits_translation_text_in_Standard_view_0-002.md`
(v0-002, 2026-07-03). This PRD is unusual: a near-complete AI first-pass implementation already
exists on two unmerged branches (see §2a). The work-item breakdown is therefore shaped around
**rebasing, hardening, and landing that work**, not building from scratch — a strategy chosen by the
implementation owner during this investigation.

## 1. What the PRD asks for

*(for: everyone)*

PT10 Power's editor either hides USFM structure or shows markers read-only. PT9 migrants cannot see
and edit text and markup at the same time, which blocks the entire PT10 Power migration — Standard
view is PT9's default editing surface. Appetite: **6 weeks (1–2 developers)**.

| ID | Non-negotiable |
|----|----|
| NN-1 | Donna can see all USFM markup inline in the editor while typing (paragraph and character markers displayed in text). Standard view should be the default view for Power for now. |
| NN-2 | Donna can edit translation text and USFM tags in Standard view (full read/write, verse-by-verse display*) |

*"Verse-by-verse" is contradicted by PT9 reality — see §3 row 1. The implementation owner has
directed the investigation at paragraph flow (PT9 Standard parity), pending product confirmation.

| ID | Nice-to-have |
|----|----|
| NTH-1 | Incorrect or unknown USFM markers highlighted in red (as in PT9) |
| NTH-2 | No tooltip for USFM markers as now in Simple |
| NTH-3 | Marker assistance: Enter shows valid paragraph markers at cursor; `\` shows valid character/note markers |
| NTH-4 | Insert footnote (`\f`) / cross-reference (`\x`) via Insert menu, right-click context menu, and keyboard shortcut — with or without selected text; footnote pane auto-show/hide |
| NTH-5 | Style dropdown menu available in the editor toolbar |

No-gos: other view modes (Formatted, Unformatted, Preview, Basic); custom project tags; batch
cross-reference operations; drag-and-drop editing (default-off in PT9 too — confirmed); full content
checks (Category 07); extended notes `\ef`/`\ex`.

## 2. What already exists

*(for: engineers — §3 carries the product-owner view of the same facts)*

### 2a. The AI first-pass branches (the "already started" work)

Two branches form one five-phase, spec-driven project (2026-07-01 → 07-07), never PR'd or merged.
Its final internal review verdict was "READY TO MERGE", and it left an honest consolidated
follow-up register (~45 open items): `docs/superpowers/specs/2026-07-07-standard-view-followups.md`
on the scripture-editors branch.

- **scripture-editors `standard-view`** (currently only on the `lyonsil` fork; local ref
  `ai-standard-view-lyonsil`): 121 commits, ~9–10k lines of hand-written source + ~9.5k lines of
  tests (46 files). Contains the core: `STANDARD_VIEW_MODE` preset
  (`libs/shared-react/src/views/view-mode.model.ts:41` on that branch), the marker-editing engine
  (`packages/platform/src/editor/markerEdit/` — Tier-1 in-place marker rename, Tier-2
  paragraph-scoped re-tokenization via a new USFM fragment tokenizer, deletion semantics,
  Ctrl+Space char-format stripping, clipboard normalization), the StyleInfo pipeline
  (stylesheet-first marker lookup, PT9 `TagValidator` port + `MarkerValidationPlugin` two-state red
  highlighting, `generateUsjCss` PT9-CSSCreator port), the PT9 `MarkerItemSource` port for marker
  menus, note-snippet semantics, and visible-inert opaque blocks for tables/figures/sidebars/periph.
  A USX round-trip corpus harness pins byte-fidelity across bridges, `\ca/\cp/\va/\vp`, milestones,
  RTL, unclosed notes, and more — the most valuable single asset.
- **paranext-core `origin/standard-view`**: 36 commits, ~4.9k lines excluding generated output.
  Adds `'standard'` to `ScriptureEditorViewType`, Power-mode default, passive command-palette
  overlay mode + `\`/Enter marker palettes, footnote pane auto-show (default-off toggle),
  context-menu + Ctrl+T/Ctrl+Shift+T insertion, C# `PlatformStyleInfo`/`getStyleInfo` on the PDP,
  four project settings (`chapterVerseSeparator`, `verseRangeSeparator`, `defaultFootnoteCaller`,
  `defaultCrossRefCaller`), a 700 ms debounced save, and echo-suppression sync plumbing.

> **Update 2026-07-13 — WI-1 executed.** Both branches are rebased onto their current mains and
> re-homed: scripture-editors `standard-view` now lives on eten-tech-foundation (tip `d97235c`),
> paranext-core `standard-view` force-pushed (tip `ac94f643035`, pre-rebase `a22d5f1efff`).
> A multi-repo workspace exists at `~/source/repos/workspaces/standard-view/` with
> `dev-packages.json` pointing at `standard-view` as an uncommitted working change. Verified:
> repo typecheck clean; scripture-editors full suite green; paranext-core editor-extension 408,
> platform-scripture 208, platform-bible-react 946, core 968, C# 1,472 tests passing.
> Notable rebase finding: main's #498/#499 rebuilt `ScriptureReferencePlugin` as a navigation
> state machine that **subsumes** the branch's scrRef-echo suppression commits; one residual
> behavior (same-document reload must not reposition the caret) was grafted into the machine,
> pinned by the branch's own regression tests. The stale-base and dist-conflict bullets below are
> retained as historical context.

Known residue (from the branches' own register + analysis):

- **Integration was yalc-only** *(resolved by WI-1, see update above)*: `package.json` unchanged; a
  clean clone of the paranext-core branch could not build. Base was ~54 commits behind main;
  committed `platform-bible-react/dist` conflicted on rebase (regenerated).
  `dev-packages.json` (`revision` → eten-tech-foundation/scripture-editors) is the sanctioned
  consumption mechanism.
- **Open PO-visible bugs**: footnote popover Enter inserts a plain split instead of `\fp`;
  caller-click popover open unreliable when the pane is hidden; BCV cell-click navigation chain
  never conclusively QA'd.
- **Fragile layers**: 2.7k-line `platform-scripture-editor.web-view.tsx`; palette keyboard input is
  capture-phase *forwarding*, not real focus — the committed item can differ from the visibly
  highlighted item; caret suppression windows with a documented mouse-only residual; scrRef echo
  race only mitigated; a microtask-ordering dependency on Lexical 0.43 internals.
- **Deliberate debt**: OT/collab delta coordinate system split (`"apply"` vs `"delta-doc"`) —
  bypassed, not fixed; real editable table/figure nodes deferred (opaque-lossless only).
- **Simple-mode leakage**: the debounced save and the `chapterVerseSeparator` default change from
  `:` to `.` affect every view including Simple — flagged in the branch's own simple-mode impact
  doc as needing that team's sign-off (not yet obtained).
- **Descoped on-branch**: style dropdown (NTH-5), polished view-switcher UI (a QA
  cycle-formatted→standard→markers hack remains at web-view.tsx:1168 on the branch).

### 2b. Paratext 9 (verified against the checkout; all claims file:line-cited)

- Standard is the default view for editable projects (`ScriptureViewSource.cs:307-335`); rendering
  is **paragraph flow with inline verse numbers** (`ScriptureViews/Standard.xslt:142-146,232-257`)
  — there is no verse-per-line mode anywhere in the PT9 editor.
- Markers render as small colored literal text (`.marker`, `ScriptureBase.css:6-10`); per-project
  look is generated from the merged stylesheet by `CSSCreator`. Two red pathways: unknown marker
  (not in merged usfm.sty+custom.sty) → `status_unknown` bold red; known-but-out-of-place (per
  `TagValidator` `OccursUnder`/`Rank`) → `status_invalid` red underline (`ScriptureBase.css:90-101`).
  **Custom.sty markers do NOT render red** (`ScrStylesheet.cs:63-75,205-209`).
- Note insertion is **dialogless**: Ctrl+T / Ctrl+Shift+T / Insert menu / right-click →
  `UsfmSnippetInserter.CreateNoteUsfm` (`UsfmSnippetInserter.cs:57-124`) splices
  `\f + \fr {C}.{V} \ft ` (+ `\fq {selection}`) with the caret left before `\f*`; callers come from
  project-settings defaults (`DefaultCallerMapper.cs:29-39`), fallback `+`/`-`. Endnote `\fe` is a
  menu item with no shortcut. Extended notes are Study-Bible-project-only menu items. Golden tests:
  `UsfmSnippetInserterTests.cs`.
- Footnote pane: a second pane rendering the same USFM through the StandardNotes view. Auto-SHOWS
  on note insert (caret lands in the invisible note body → collapsed-pane expand,
  `UsfmPaneSynchronizer.cs:187-222`) and on caller click; **no auto-hide exists** (exhaustively
  verified); F7 toggles; starts collapsed by default.
- Marker popups: Enter inserts the paragraph break first, then shows the paragraph-marker popup
  (Escape keeps the break); `\` shows the character/note list (paragraph list at paragraph start).
  Both lists come from `MarkerItemSource` filtering the merged stylesheet by validity at the caret
  — the same `TagValidator` that drives red flagging (`MarkerDropdownEditHandler.cs:48-139`,
  `MarkerItemSource.cs:72-199`).
- Toolbar style dropdown (`StyleComboBoxController`): paragraph retag + character-style wrap +
  clear-formatting; visible in Standard/Formatted only.

### 2c. Paratext 10 main-line (ships today)

Much more exists on main than the PRD's "some of this is already implemented" suggests:

- **Editor extension** (`extensions/src/platform-scripture-editor`): view types
  `'formatted' | 'markers'` (markers view forced read-only unless the `dev-editableMarkersView`
  localStorage flag is set — web-view.tsx:467-472); `\`-triggered at-cursor MarkerMenu popover
  (context-filtered via `usfmMarkers[parent].children`); toolbar paragraph-style dropdown
  (26-entry list marked incomplete); FootnotesLayout pane with position/size persistence + insert
  footnote/cross-ref/comment commands, Insert menu entries (`contributions/menus.json:142-157`),
  FootnoteEditor popover on insert and caller click; extensible right-click context menu.
- **Editor library** (scripture-editors main): `markerMode: 'visible' | 'editable' | 'hidden'`
  primitives fully implemented in the adaptor but **no packaged preset combines formatted text with
  inline markers** — that preset is exactly what the branch adds. Tier-1 marker sets confirmed (121
  para / 65 char); correction to the PRD's tier map: `ef/efe/ex` are first-class note markers, not
  Tier-2. Tier-3 (tables, `fig`, `esb`, `periph`…) routes to `UnknownNode` → `display:none` with
  children preserved for round-trip.
- **Marker data**: hardcoded 186-marker USFM dataset
  (`lib/platform-bible-utils/src/markers/usfm-markers.ts`, generated from usfm.sty, with a TODO
  seam for later `.sty` customization); per-project stylesheet tag names already exposed over PAPI
  (`platformScripture.MarkerNames`, `ParatextProjectDataProvider.cs:2387`).
- **Mode plumbing**: `platform.interfaceMode: 'simple' | 'power'` runtime setting + hooks; layout
  selection per mode in `web-view.service-host.ts:826-838`. paratext-10-studio needs no changes.

Completeness-check additions (missed by the first sweep, folded in here):

- **Structure protection** is intentionally inactive in Power mode
  (`use-structure-protection-state.hook.ts:13-17`) — Standard view's free marker editing is
  consistent with that policy *and* with PT9, but the interaction should be stated in the epic.
- **Three read-only `Editorial` consumers** must not break when `EditorOptions`/view types change:
  scripture-text-grid (recently merged PT-4049…4053), resource-text-panel, model-text-panel.
- **USFM↔USX round-trip is documented as lossy** in the PDP (`ParatextProjectDataProvider.cs:
  2620-2665`: `ref` markers dropped by PT9.4, `figure src`→`file`, sid/eid gaps) — a concrete
  data-loss risk once markers are freely editable; the PRD's "prevention of data loss" constraint
  points here, not just at rendering.
- **Keyboard-shortcuts catalog** (`src/stories/keyboard-shortcuts.data.ts`) has no Ctrl+T entry;
  repo rule requires catalog updates with any shortcut work. New shortcuts must also be checked
  against the recently-added global BCV set (Ctrl+Up/Down, F8/F9, Ctrl+B — no Ctrl+T conflict found).
- **E2E tests** assuming today's default view (`markers-checklist-*`, `scripture-text-grid*.spec.ts`)
  need updating when Standard becomes the Power default.
- **In-flight PRs** reshaping scope: #2487 (real USJ table rendering — overlaps the branch's opaque
  tables), #2153 (footnote editor in pane, draft).

**Reusable as-is:** nearly everything in 2a + 2c — the strategy is to land the branch work.
**Needs building:** nothing net-new beyond hardening, integration, and the gaps in §4.

## 3. New in Paratext 10 — confirm these are intentional

*(for: product owner)*

| PRD item | What Paratext 9 actually does | Intentional? |
|---|---|---|
| "Verse-by-verse display" (NN-2) | PT9 Standard view is paragraph flow with inline verse numbers; no verse-per-line mode exists in the PT9 editor (verse-per-line resembles Unformatted view). The in-progress PT10 work is also paragraph flow. | Team proceeded with paragraph flow. Please confirm and reword NN-2. |
| "Insertion dialog scope: caller configuration, note type, and reference target input" (Key interactions) | PT9 note insertion shows **no dialog at all** — the USFM snippet is spliced directly with an auto-generated reference; callers come from project settings; a caller can be changed *afterwards* via a small dialog on the existing note. The PRD's cited `FootnotePropertiesForm`/`CrossReferencePropertiesForm` do not exist in PT9. | Suggest dropping the dialog requirement — dialogless insert is PT9 parity and is what's built. |
| "Footnote pane auto-show/hide… PT9 opens a footnote editing pane automatically when the cursor enters footnote text" | PT9 auto-*shows* the pane when a note is inserted or its caller is clicked. There is no "cursor enters footnote text" trigger (note bodies aren't selectable in the main pane) and **no auto-hide of any kind** — hiding is manual (F7/close button). | The implementation owner has specified the PT9 pane model for Standard view (2026-07-13): footnotes are edited **in the pane**, the popover is removed, and the pane opens automatically on note insert and caller click (replacing the built version's default-OFF toggle). Confirm this matches your intent. |
| "Validity from the hardcoded list" + no-go "no custom project tags" (NTH-1) | PT9 validity = the **merged project stylesheet including custom.sty** — custom project tags render normally, not red. The built PT10 version follows PT9 (stylesheet-first). Team decision: leave the stylesheet implementation in place for now, document the remaining custom-marker gaps, and defer the finish/remove decision. | Confirm you accept stylesheet-based validity for v1 (custom-tagged text will *not* show red). |
| Endnote `\fe` (mentioned as NTH in rabbit hole, absent from NTH table) | PT9 has Insert > End note (no shortcut), same dialogless flow. | Confirm whether `\fe` insertion is in the NTH list. Cheap either way. |
| Struck-through backward-compatibility constraint | PT9 handles nested notes, intro material, extended types; the branch's round-trip corpus covers much of this anyway. | Confirm the strike-through is a deliberate descope. |
| "No tooltip for USFM markers as in now Simple" (NTH-2) | PT9 has no marker tooltips. Current PT10 shows paragraph-marker hover tooltips in all views. | Confirm meaning: suppress those tooltips in Standard view only. |
| Marker visibility contract "needs a design decision" (Key interactions) | PT9: markers as small, colored, directly-editable literal text styled from the project stylesheet. The built PT10 version ports PT9's CSS generator — a de-facto design decision. | Confirm the PT9-CSS-parity look, or request a design pass. |
| PRD not mentioned: PT9 Ctrl+E view switching, F7 pane toggle, Ctrl+K insert verse number, char-style application via the style dropdown, Ctrl+Space clear formatting | All exist in PT9 Standard view. Ctrl+Space clear-formatting is in the built work; the others are not. | Dropped deliberately, or should any join the NTH list? |

## 4. Proposed work items

*(for: epic lead + engineers)*

Strategy (decided by the implementation owner): keep the existing branches as the implementation,
rebase them onto their mains, re-home the editor branch to eten-tech-foundation, and consume it via
`dev-packages.json` (`revision: "standard-view"`) as an **uncommitted** working change until a real
editor release ships. Work items are hardening/landing slices on top of that base.

Sequencing (implementation owner, 2026-07-13): **Phase A is a minimal merge train.** The bar:
Standard view ships **as the Power default** (the resulting e2e churn is accepted); Simple mode
and the other views are otherwise untouched — with two deliberate exceptions that merge as-is
because they are small and easily reverted: the 700 ms debounced keystroke save, and the
chapter-verse separator default `:`→`.` (`.` is PT9's own registered default,
`ProjectSettings.cs:733` — PT10's `:` was a hard-coded stand-in; the Simple team gets notified,
not a veto gate). Loose ends and small bug spots get tied up; existing functionality — however
far from the long-term design — does something reasonable without blowing up or corrupting data.
The footnote pane model, menu-driven marker input, and copy/paste fine-tuning are deliberately
**not** part of the Phase A bar.

**Phase A parallelism:** WI-2 (stabilization sweep), WI-5 (default + outside-Standard
verification), and WI-13 (pre-merge readiness) run concurrently in separate worktrees. WI-2 and
WI-5 both touch the editor web view — coordinate those two or land WI-5's small default/e2e
changes first. WI-6 (merge execution) is strictly last. After the merge, the remaining work runs
as **two parallel streams** chosen to minimize file overlap: **B1 — editing interactions**
(marker menus, footnote model, insertion flows, copy/paste; mostly the editor engine and web-view
interaction layer) and **B2 — view experience & data fidelity** (view picker, style dropdown,
round-trip fidelity, tables; mostly view plumbing, converters, and C#). Phase A includes one
hand-run QA sweep; each Phase B item keeps its own checklist.

Jira: parent **PT-4186** (Combined) with one Sub-task per work item, created 2026-07-13.

| # | Jira | Phase | Work item | Repo | Complexity | Covers |
|---|---|---|---|---|---|---|
| WI-1 | — | ✅ | **DONE 2026-07-13** — Rebase + re-home the standard-view branches; restore buildable integration | both | Complex | enables all |
| WI-2 | PT-4187 | A ∥ | Stabilization sweep: fix what blows up or corrupts in Standard view as-built (incl. copy/paste) | both | Moderate | NN-2, NTH-4 (as-built) |
| WI-3 | PT-4188 | B1 | Restore menu-driven backslash input; make marker menus keyboard-true | both | Moderate | NTH-3 |
| WI-4 | PT-4189 | B1 | Move footnote editing into the footnotes pane (PT9 model; no popover in Standard) | both | Complex | NTH-4 |
| WI-5 | PT-4190 | A ∥ | Keep Standard as the Power default; e2e updates; verify nothing else changes outside Standard | paranext-core | Moderate | NN-1 (default) |
| WI-6 | PT-4191 | A last | Merge execution: final green CI, SE→main, platform-yalc rebase, core→main | both | Simple | NN-1 (ships) |
| WI-7 | PT-4192 | B2 | View picker; tooltip gating; notifier retirement | paranext-core | Moderate | NTH-2 |
| WI-8 | PT-4195 | B1 | Insertion-flow completion: endnote `\fe` (if confirmed), right-click/Insert-menu parity | paranext-core | Simple | NTH-4 |
| WI-9 | PT-4196 | B2 | Fill out the toolbar style dropdown — cut first | paranext-core | Simple | NTH-5 |
| WI-10 | PT-4197 | B2 | End-to-end data-fidelity audit: editor ↔ USJ ↔ USX ↔ USFM (TS AND C#); collab-split decision | both | Moderate | NN-2 (data-loss constraint) |
| WI-11 | PT-4198 | B2 | Tables/figures/sidebars visibility; reconcile with PR #2487 | both | Moderate | NN-1 (visual control) |
| WI-12 | PT-4199 | backlog | Implement full custom-marker support (tracking item; not in this epic) | both | Complex | — |
| WI-13 | PT-4200 | A ∥ | Pre-merge readiness: shortcuts catalog + conflict check, cold-start smoke, CI watch | both | Simple | — |
| WI-14 | PT-4201 | B1 | Copy/paste USFM fidelity: copy-out as USFM, multi-paragraph/note paste, external round trips | both | Moderate | NN-2 |

**WI-1 — Rebase + re-home + integration. ✅ DONE 2026-07-13.** Both branches rebased and pushed
(scripture-editors → eten-tech-foundation `standard-view` @ `d97235c`; paranext-core
`standard-view` @ `ac94f643035`, pre-rebase `a22d5f1efff`). Workspace at
`~/source/repos/workspaces/standard-view/` carries the uncommitted `dev-packages.json`
`revision: "standard-view"` change. All conflicts resolved; `platform-bible-react/dist`
regenerated; verified by repo typecheck + full scripture-editors suite + scoped paranext-core
TS suites + C# suite (all green). One deliberate merge decision to be aware of in WI-2: main's
`ScriptureReferencePlugin` navigation state machine (#498/#499) replaced the branch's echo-fix
commits; the same-document-reload placement skip was re-grafted into the machine
(scripture-editors commit `8327698`), pinned by the branch's regression tests. Remaining from the
original WI-1 scope: a cold-start extension activation smoke in the built app (not yet run —
folded into WI-6, the merge train).

### Phase A — minimal stabilization, then merge

**WI-2 (A) — Stabilization sweep: fix what blows up or corrupts, as-built.** One sweep across
Standard view as it exists on the branches, fixing only crashing or data-affecting bugs. Known
entries: the marker-rename abandonment window (a rename walked away from mid-edit can be saved
with stale text); the footnote popover's Enter inserting a plain split instead of `\fp` (fix it,
or gracefully degrade — one candidate fix was already disproven live); the caller-click popover
failing to open when the pane is hidden (fix, or make the failure benign). Footnote editing stays
popover-based for the merge — the pane model is WI-4, worked separately later. Run one hand QA
sweep: type through opening/closing markers; rename paragraph and character markers in place;
delete each half of a marker pair; backspace across marker boundaries; one-step undo for each;
type while a save echo is due; insert/edit/delete a footnote and a cross-reference end to end;
copy and paste within the editor and paste a USFM snippet from an external source (fidelity
fine-tuning is WI-14 — here it must merely not crash or corrupt). Everything found that is *not*
crashing or data-affecting gets filed against the right Phase B item, not fixed here. Explicitly
deferred out of this sweep: the mouse-only caret residual and forwarding-focus quirks (→ WI-3),
inline-vs-menu `\` input (→ WI-3), footnote pane behavior (→ WI-4), copy/paste semantics
(→ WI-14).

**WI-5 (A, parallel) — Keep Standard as the Power default; verify nothing else changes outside
Standard view.** Standard stays the default view for Power mode at merge — keep the branch's
default mechanism and update the e2e expectations that assume the old default
(`markers-checklist-*`, `scripture-text-grid*` specs; real churn, accepted). The two global
behavior changes **merge as-is**: the 700 ms debounced keystroke save, and the chapter-verse
separator registered default `:`→`.` — `.` is PT9's own default (`ProjectSettings.cs:733`; PT10's
`:` was a hard-coded stand-in in `scripture-util.ts`), so this is PT9 parity, small, and easily
reverted. Notify the Simple team of both changes rather than gating the merge on sign-off. Then
verify nothing *else* reaches other views: audit the branch diff (tooltip wrapper, palette
wiring, `EditorOptions` shape) and confirm Simple mode and the three read-only panels embedding
the editor (scripture text grid, resource text panel, model text panel) behave as on main apart
from the two accepted changes.

**WI-13 (A, parallel) — Pre-merge readiness checks.** Independent of the stabilization sweep and
startable immediately in its own worktree: add the Ctrl+T/Ctrl+Shift+T entries to the
keyboard-shortcuts catalog (repo rule — must land with the merged branch) and check them against
the global navigation shortcuts; run the cold-start extension-activation smoke left over from
WI-1 (the branch's own history shows that regression mode is real); get CI running on both
branches early so failures feed WI-2/WI-5 instead of surfacing at merge time.

**WI-6 (A, strictly last) — Merge execution.** Sequential once WI-2, WI-5, and WI-13 have landed
on the branches: final green CI on both; merge scripture-editors `standard-view` → `main`; rebase
`platform-yalc` (the branch Platform.Bible builds the editor from) onto the merged main; merge
paranext-core `standard-view` → `main`. `dev-packages.json` stays a dev-only working change
throughout.

### Phase B, Stream B1 — editing interactions (parallel, after the merge)

**WI-3 (B1) — Restore menu-driven backslash input; make marker menus keyboard-true.** Two
problems. First, a regression from both PT9 and pre-branch PT10: pressing `\` should open the
marker menu and typing should filter **the menu** — on the branch, typing now goes straight into
the text. Make menu-driven entry Standard view's behavior; if inline type-through is worth keeping
(it is Unformatted-view-like), gate it behind a view option rather than making it the default.
Second, the menus can't hold real browser focus (the editor grabs it back), keystrokes are
forwarded by interception, and the item you commit can differ from the item visibly highlighted
because the host and the menu filter with different algorithms — give the menus true focus or
unify the filtering so what you see is always what you get. Also absorbs the interaction bugs
deferred from the WI-2 sweep (mouse-only caret residual, forwarding-focus quirks). *Hand-run QA:*
`\` in body text, inside a footnote, at paragraph start; Enter menu on a new line; filter then
commit via Enter, via click, cancel via Escape; committed marker always equals the highlighted one.

**WI-4 (B1) — Move footnote editing into the footnotes pane (PT9 model; no popover in Standard
view).** Spec from the implementation owner: the footnote popover goes away in Standard view. The
FootnoteEditor component opens **inside the footnotes pane**, in place, on the footnote being
edited. Clicking a footnote caller in the text — or the footnote's entry in the pane — opens that
editor when the text is editable; when it is not editable, clicking a caller opens the pane (if
closed) and focuses the footnote. If the pane is closed when a caller is clicked or a new footnote
is inserted, open the **pane**, never a popover. Inserting a footnote places the cursor in the
pane editor for the new note. The footnote selected in the pane gets a thin top-and-bottom border
on its caller in the text (possibly an annotation tracked by the editor web view). Start by
assessing draft PR #2153 ("footnote editor in pane") — it appears to attempt part of this; absorb
or supersede it deliberately. Runs independently and in parallel with other Phase B work: the
merge shipped the stabilized popover, and this item replaces it. *Hand-run QA:* insert a footnote
with and without selected text; caller click with pane open/closed × editable/read-only; Enter
inside the pane editor produces `\fp`; the selected-footnote border tracks selection changes from
both directions.

**WI-8 (B1) — Insertion-flow completion.** Add Insert > End note (`\fe`) if the product owner
confirms it (§6) — PT9's endnote insert is the same one-call dialogless flow; verify
`insertMarker('fe')` end-to-end (never exercised); and make the right-click context menu match the
Insert menu.

**WI-14 (B1) — Copy/paste USFM fidelity.** Partially implemented today: pasting text containing
USFM markers into Standard view runs through the engine's paragraph re-tokenization (the branch's
fragment tokenizer parses pasted marker text, and paste-plus-rebuild undoing in one step is
pinned by test), clipboard normalization exists in the engine, and the base editor supports
cut/copy/paste. Not established: copying **out** of Standard view as valid USFM (do the visible
marker text nodes survive the clipboard?), multi-paragraph and note-containing paste, round trips
through external applications, and paste-as-plain-text semantics. Define the intended semantics,
close the gaps, and pin them with tests. Phase A's WI-2 sweep only guarantees copy/paste doesn't
crash or corrupt.

### Phase B, Stream B2 — view experience & data fidelity (parallel, after the merge)

**WI-7 (B2) — View picker; tooltip gating; notifier retirement.** The only way to change views
today is a leftover QA hack that cycles formatted → standard → markers. Replace it with a real
view picker; rework the view-toggle command and tab-title `(Editable)` logic for a third view;
retire or gate the "markers view is read-only" notification; and stop Standard view from showing
Simple's paragraph-marker hover tooltips (NTH-2). (The Power-default flip ships at merge in WI-5,
not here.)

**WI-9 (B2) — Fill out the toolbar style dropdown (first to cut).** Main already ships a
paragraph-style dropdown, but its marker list is a hand-maintained 26 entries marked "incomplete",
and unlike PT9's it cannot apply character styles to a selection. Extend the list to the full
paragraph set; optionally add character-style application. The PRD names this the first casualty
when time is tight.

**WI-10 (B2) — End-to-end data-fidelity audit, TypeScript AND C#.** The editor must preserve all
data at every hop, so audit the full chain a real edit travels: editor state ↔ USJ (the branch's
corpus already pins much of this), USJ ↔ USX (the TypeScript converters in
scripture-editors/scripture-utilities), and USX ↔ USFM (the C# converter, which documents known
losses: `\ref` markers dropped, `figure src` renamed to `file`, missing chapter sid/eid). Run the
round-trip corpus through each layer and through the composed round trip a real save takes;
catalog every loss; fix or explicitly accept each one in writing. Also the venue for the
collaborative-editing coordinate-split decision (fix now or formally defer via an ADR entry).
This is the PRD's "prevention of data loss" constraint made testable.

**WI-11 (B2) — Keep tables, figures, and sidebars visible; reconcile with the tables PR.** Content
the editor can't yet edit (tables, figures, sidebars, peripheral material) renders on the branch
as visible, read-only, byte-preserved "opaque blocks" so nothing silently disappears — while PR
#2487 teaches the editor to render real HTML tables. Whichever lands first, reconcile the two so
no marker content is ever invisible in Standard view and neither change regresses the other.

### Backlog (tracked, not scheduled in this epic)

**WI-12 (backlog) — Implement full custom-marker support.** The stylesheet pipeline (C#
`getStyleInfo`, CSS generation, stylesheet-based validation) ships as built; custom-marker support
is deliberately partial per the implementation owner's decision — see **ADR-0007** in
`.context/standards/Architecture-Decisions.md` (written 2026-07-13). When this is picked up:
surface custom tags in the marker menus (the hardcoded `usfmMarkers` dataset in
`lib/platform-bible-utils/src/markers/usfm-markers.ts` doesn't include them), decide the
validation stance for custom-tagged text (currently valid-if-in-stylesheet, PT9-faithful), add
rendering + corpus tests for custom-tagged content, and consider custom.sty editing. **Docs noting
the partial state — update these when implementing:** ADR-0007, and this brief (§2a, §3 row 4,
§6 question 4).

## 5. Requirement coverage

*(for: everyone)*

| Requirement | Work item(s) | Notes |
|---|---|---|
| NN-1 inline markers + Power default | WI-1, WI-2, WI-5 (default), WI-6 (ships), WI-11 | Rendering already built; WI-2 stabilizes it; Standard ships **as the Power default at the first merge** (WI-5 keeps the branch's default and updates e2e); WI-11 closes the all-markers-visible constraint |
| NN-2 full text + tag editing | WI-1, WI-2, WI-10, WI-14 | Engine built on branch; stabilization, full-chain data fidelity, and copy/paste fidelity are the remaining risk |
| NTH-1 invalid markers red | WI-1 (+WI-2) | Already implemented (two-state red, PT9 TagValidator port); lands with the merge; stylesheet-based per §3 row 4 / ADR-0007 |
| NTH-2 no marker tooltips | WI-7 | Simple gate on the existing overlay |
| NTH-3 Enter/`\` marker menus | WI-1, WI-3 | Built on branch; WI-3 restores menu-driven `\` input and fixes committed-vs-highlighted |
| NTH-4 insert flows + pane | WI-1, WI-4, WI-8, WI-13 | Menu/right-click/shortcut built; WI-4 delivers the pane-based editing model; shortcut catalog lands in WI-13; `\fe` in WI-8 |
| NTH-5 style dropdown | WI-9 | Cut first when time is tight (per PRD) |

## 6. Questions for the product owner

*(for: product owner — each with a suggested answer)*

1. **Layout wording (NN-2).** Paratext 9's Standard view is paragraph-based text with verse numbers
   inline — there is no verse-by-verse mode in the PT9 editor, and the work in progress matches
   PT9. Can we reword NN-2 to "paragraph display as in Paratext 9" ? *Suggested: yes.*
2. **Insertion dialogs.** PT9 inserts footnotes/cross-references instantly with no dialog; the
   dialog names the PRD cites don't exist in PT9. Drop the "insertion dialog scope" interaction and
   keep PT9's instant insert? *Suggested: yes — instant insert is what translators know.*
3. **Footnote editing model.** The implementation owner has specified PT9's pane model for
   Standard view: footnotes are edited in the footnotes pane (no popover); the pane opens
   automatically when a note is inserted or its caller is clicked, and only hides manually;
   inserting a note puts the cursor in the pane editor; the selected footnote's caller is
   outlined in the text. Confirm this replaces the popover-based flow and the auto-show toggle.
   *Suggested: confirm — it is PT9 parity.*
4. **Custom project tags.** The PRD says validity comes from a hardcoded list and custom tags are
   unsupported; PT9 (and the built work) treat custom-stylesheet tags as valid and styled, not red.
   The team proposes shipping the PT9-style behavior for now and deciding later whether to complete
   or remove custom-tag support. Acceptable? *Suggested: yes; note that custom-tagged text will not
   be flagged red in v1.*
5. **NN-1 contingency wording.** The PRD says a failed renderer spike would narrow v1 to "text
   editing only," which contradicts NN-1. The renderer has since been proven feasible (working
   implementation exists), but the implementation owner wants the fallback kept alive. Please
   reconcile the wording: if hardening overruns the appetite, does the ship date move or does NN-1's
   scope shrink (e.g., markers visible but not the Power default)? *Suggested: keep NN-1; if time
   runs out, flip the Power default in a fast-follow rather than dropping marker display.*
6. **Endnotes.** Is Insert > End note (`\fe`) in the nice-to-have list? PT9 has it (no keyboard
   shortcut). *Suggested: yes — it is cheap.*
7. **Backward-compat strike-through.** Confirm the struck constraint (legacy USFM edge cases) is a
   deliberate descope and note it in the changelog. *Suggested: confirm — the round-trip test corpus
   already covers many of these cases anyway.*
8. **Marker look.** The built work styles markers per the project stylesheet exactly as PT9 does
   (small colored literal text, directly editable). Accept as the "marker visibility contract," or
   request a design pass first? *Suggested: accept for v1; a Saroj-density usability test can follow.*
9. **Tooltip nice-to-have.** Confirm NTH-2 means: Standard view does not show the marker tooltips
   Simple currently shows. *Suggested: confirm.*
10. **Unmentioned PT9 conveniences.** Ctrl+E view switching, F7 pane toggle, Ctrl+K insert verse
    number, char-style application from the style dropdown — in or out for this epic?
    *Suggested: out (separate polish epic), except F7 if trivially covered by WI-4.*
11. **Simple-mode side effects (FYI).** Two small behavior changes ship to all views at the first
    merge because they are easily reverted: saves happen after a short typing pause instead of
    every keystroke, and the default chapter-verse separator becomes "." (Paratext 9's own
    default; PT10's ":" was a hard-coded stand-in). The Simple team is being notified. Flag if
    either needs to be held back. *Suggested: accept.*

## 7. Engineering decisions

*(for: epic lead / implementation owner)*

Settled during investigation (recorded here):

- **Salvage strategy**: continue on the existing branches — rebase both onto their mains, push the
  editor branch to eten-tech-foundation, consume via `dev-packages.json` `revision:
  "standard-view"` as an uncommitted working change (WI-1).
- **Stylesheet pipeline**: keep as built (stylesheet-first validation + styling); record the
  custom-marker gap list and defer the finish/remove decision (WI-9).
- **Simple-mode changes (revised 2026-07-13)**: the debounced save and the `.` separator default
  (PT9 parity, `ProjectSettings.cs:733`) merge as-is — small and easily reverted; the Simple team
  is notified (WI-5), not a veto gate.
- **Marker mode**: `markerMode: 'editable'` (markers as editable text) — required by NN-2, matches
  PT9 and the branch implementation.
- **Backslash input (2026-07-13)**: in Standard view, `\` opens the marker menu and typing filters
  the menu (PT9 and pre-branch PT10 behavior); the branch's inline type-through goes behind a view
  option at most (WI-3).
- **Footnote editing model (2026-07-13)**: PT9 pane model — editing in the footnotes pane, popover
  removed in Standard view (WI-4 carries the full spec).
- **Custom-marker deferral (2026-07-13)**: recorded as ADR-0007; tracked by backlog item WI-12
  (replaces the earlier "write the deferral doc" work item — the docs are already updated).
- **Phase A merge bar (2026-07-13, revised)**: the merge ships Standard **as the Power default**
  (e2e churn accepted); functionality only has to work without crashing or corrupting data.
  WI-2 ∥ WI-5 ∥ WI-13 run in parallel worktrees; WI-6 (merge execution) is strictly last. The pane
  footnote model (WI-4), menu-driven `\` input (WI-3), and copy/paste fine-tuning (WI-14) land in
  Phase B.

Open, with recommendations:

1. **OT/collab coordinate split** (register: "Large / belongs to collab completion"): fix inside
   this epic or formally defer? *Recommendation: defer with an Architecture-Decisions entry, unless
   collaborative editing is scheduled within two quarters — decide in WI-2.*
2. **PT9 quirk fidelity** (from the PT9 deep-read): don't reproduce these PT9 behaviors — (a)
   changing one note's caller silently persists a new project-wide default; (b) the marker-popup
   filter cannot type the digit `0`; (c) Escape after the Enter popup leaves the inserted break
   (match PT9 here or roll back — pick deliberately in WI-3). *Recommendation: (a) decouple, (b)
   fix, (c) match PT9.*
3. **PR coordination**: assessing draft PR #2153 (footnote editor in pane) is now the first step
   of WI-4 — absorb or supersede it deliberately; PR #2487 (tables) is reconciled in WI-11.
4. **Unverified fact** (flagged, no decision needed): `insertMarker('fe')` end-to-end behavior on
   main was never exercised; verify inside WI-8.

## Appendix: PT9 claim verdicts

PC-1 ✓, PC-2 ✓, PC-3 ✓ (verbatim in HelpData), PC-4 ✓, PC-5 ✓ (drag-drop default False),
PC-6 ~ (auto-show real, but triggers are insert/caller-click; no cursor-entry trigger; no auto-hide),
PC-7 ✗ (no insertion dialogs exist), PC-8 ~ (extended types via menus, not dialogs; batch = separate
.xrf import tool), PC-9 ~ (TextForm is entry points only; logic spans ParatextBase/
ParatextInternalShared), PC-10 ~ (FormattedEditorControl is a base class two levels down),
PC-11 ✗ (cited forms don't exist; handlers at :1796/:1801 not :1761/:1766), PC-12 ~ (quote
confirmed; but validity = merged stylesheet incl. custom.sty, not a hardcoded set), PC-13 ✓
(Ctrl+T / Ctrl+Shift+T), PC-14 ✓, PC-15 ✓ (with SmartEnter gating nuances), PC-16 ✗ (paragraph
flow, not verse-by-verse), PC-17 ✓. Full evidence in the investigation transcript; PT9 file:line
citations preserved in §2b.

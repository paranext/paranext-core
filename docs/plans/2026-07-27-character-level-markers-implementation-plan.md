# Character-Level Markers — Implementation Plan

|                          |                                                                                                                                                                                                                                   |
| :----------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **PRD**                  | [PRD-Simple-Saroj easily works with character level markers.md](../prds/PRD-Simple-Saroj%20easily%20works%20with%20character%20level%20markers.md)                                                                                |
| **Appetite**             | 2 developer weeks — _a budget, not an estimate_. This plan carries **no time estimates**; see §5.                                                                                                                                 |
| **Implementation Owner** | Jolie Rabideau                                                                                                                                                                                                                    |
| **PRD Owner**            | Todd Hoatson                                                                                                                                                                                                                      |
| **Plan date**            | 2026-07-27 · **spike results added 2026-07-29** (§3 → "`PT-XXX-A` spike results", A1–A9)                                                                                                                                          |
| **Design reference**     | [Magic Patterns prototype](https://www.magicpatterns.com/c/hlhzc4kt5kucjcxdumaga8/preview?hideToolbar=true&disableComments=true) ("Simple Paratext – Fork 4 – variant A")                                                         |
| **Scope**                | paranext-core + upstream `eten-tech-foundation/scripture-editors`. **Simple mode only — and no change in this plan may alter Power-mode behavior** (§1.6). Required placement: the prototype's **Side** (gutter beside the text). |
| **Demo target**          | **By the sprint halfway point** — a discoverable control that adds character markers                                                                                                                                              |

> ### 🔒 Simple mode only, hardened 2026-08-03. Read **§1.6** before writing any code.
>
> **The scope line was always "Simple mode only." What was missing is the other half of that sentence —
> _nothing in this plan may change what a Power-mode user sees or does._** That is now a stated
> requirement with a named enforcement point per layer, not an assumption — **OQ-4 is DECIDED**, not open
> (§3 → OQ-4), and §11 → T4 / item 6 are closed.
>
> Three consequences that were not previously written down:
>
> 1. **The gate goes at the mount points, and only there** — `!isPowerMode` in the editor web view, the
>    existing Share Layout precedent ([web-view.tsx:1987-1994](../../extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx#L1987-L1994)). Every layer below a mount point (PBU helpers, the item generator, the upstream `EditorRef` methods, localization keys) is **shared with Power and must be inert there** — additive, unreferenced by any Power path, and changing no existing behavior.
> 2. **`PT-XXX-D2`'s reserved right gutter is a Simple-only stylesheet change.** Reserving
>    `padding-inline-end` on the editor is the one item in this plan that would narrow **every Power
>    user's** text column if applied unconditionally. It must be gated, not global (§2.2, `PT-XXX-D2`).
> 3. **Three shared surfaces are explicitly off-limits**, because touching them changes shipped
>    Power-mode behavior: `isBlockMarker`, the `\` keydown menu, and the footnote editor's duplicate
>    marker menu (§1.6).
>
> ### 🎨 UX decided on 2026-07-30. Read §3 → "UX meeting with Alex" (U1–U8) before estimating.
>
> **Side (Variant B) ships** — `PT-XXX-D2` required, `PT-XXX-D1` becomes the **backout option** with named
> tripwires in **§6.6**. Three things grew: `PT-XXX-D` is now a **slot-based container** with `(mixed)` in
> the trigger and **partial/all/none** tri-state per row (the one place "reuse existing components" needs an
> additive change to `MarkerMenu`); **`PT-XXX-B4`** is new upstream work for **extend**, the mutation behind
> UX's partial → all step. Two of Alex's questions are answered from the repo (U6: all 58 character markers
> are sandwiches; U7: comments already work sub-verse, footnotes are point-anchored).
>
> ✅ **`PT-XXX-D2` is unblocked.** Alex described the Side bar overlapping the next docking column, which
> **cannot work from inside a web view**. **OQ-8 decided 2026-07-30: build it clamped inside the editor web
> view and defer the overlap** to separate core work (it needs the overlay service to accept component
> content). Alex needs an acknowledgement of that, not an answer.
>
> **Open: OQ-5** (different marker on marked text), **OQ-6** (which markers are mutually exclusive),
> **OQ-7** (whitespace at edges), **OQ-9** (comments can't cross marker boundaries) — plus the now-live
> **space question**: how wide may the bar be, and does the text column narrow? §11 splits all of them by
> Alex / Todd.
>
> ➕ **Two more opened 2026-08-03 while designing `PT-XXX-D`, neither blocking:** **OQ-10** (should the menu
> hide the non-styling character markers the parent-scoped filter lets through?) and **OQ-11** (does the
> remove row read _(none)_ or "Remove character marker", and is `RemoveFormatting` the right icon?). Both are
> §11 → A7/A8. `PT-XXX-D`'s design also closed two questions the plan had not asked — see the last two
> bullets of §3 → "Other design considerations".

> ### 🔬 Spike `PT-XXX-A` is done (2026-07-29). Read §3 → "`PT-XXX-A` spike results" before estimating.
>
> **Four things changed.** (1) **Mechanism A** is confirmed, and `PT-XXX-B1` is **5 hand-edited files, not
> 8** — put the code in the _existing_ `usj-marker-action.utils.ts`, where all four splitting primitives
> already live (A3). (2) The unwrap is **`$unwrapNode` from `@lexical/utils`** — do **not** generalize
> `$unwrapTypedMarkNode` (A4). (3) **The selection query is gone**: `StateChangeSnapshot.contextMarker`
> already ships and paranext-core already reads it, which is exactly OQ-1 Option A (A5). (4) **Two
> mechanisms are closed, not deferred** — `applyUpdate` is unreachable from a selection (A2), and the USJ
> round-trip is not a fallback of any kind (A6).
>
> **Two acceptance criteria were not delivered** and are carried to §11: the live yalc round-trip was
> never executed (A7, item 9), and **OQ-1 has not been posted** (item 3).

> **Ticket IDs are placeholders.** Real `PT-NNNN` numbers get assigned when the tickets are created in the
> [PT Jira project](https://paratextstudio.atlassian.net/jira/software/c/projects/PT/boards/63).
> Within this document, tickets are referenced by their stable placeholder (e.g. `PT-XXX-B1 (upstream remove)`).

**Non-negotiable labels used throughout**, so every ticket and status row maps to a PRD row:

| Label           | PRD row                                                                                                                                |
| :-------------- | :------------------------------------------------------------------------------------------------------------------------------------- |
| **N1 (add)**    | "Provide UI to change, delete, **add** character level markers in a usable way"                                                        |
| **N1 (change)** | "Provide UI to **change** … character level markers in a usable way"                                                                   |
| **N1 (delete)** | "Provide UI to … **delete** … character level markers in a usable way"                                                                 |
| **N1 (usable)** | "…in a usable way (propose similar to magic patterns prototype)"                                                                       |
| **N2**          | "UI for deleting markers only removes markers, not the content within markers."                                                        |
| **H1**          | _(nice-to-have)_ "UI does not overlap project text, so user can see where the marker(s) will be inserted in context of other markers." |

---

## Terminology

Every term below is either **quoted from a source** (PRD, prototype code, or repo) or **coined in this
plan and defined here**. Nothing in this document should use a term that isn't in this table. If a
review conversation needs a new word, add it here first.

### From the PRD (use these by preference)

| Term                                              | Meaning, as the PRD uses it                                                                                                                                               |
| :------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **character marker** / **character-level marker** | The PRD's own words (title, line 18). A USFM marker that wraps a span of text, e.g. `\nd …\nd*`. Prefer this over "character style", "inline marker", or "char marker".   |
| **label** (verb)                                  | What the PRD says the user does with a marker: "use character markers to **label** certain bits of text" (line 18). Note the PRD never uses "apply", "format", or "wrap". |
| **non-negotiable / nice-to-have / no-go**         | The PRD's three scope buckets (line 52).                                                                                                                                  |
| **appetite**                                      | "a budget, not an estimate" (line 12). Not a synonym for estimate.                                                                                                        |
| **rabbit hole**                                   | The PRD's term for a risk that could consume the appetite (line 81).                                                                                                      |
| **Simple** / **Power**                            | Paratext 10 Simple and Power. Matches the repo's `platform.interfaceMode` values `'simple'`/`'power'`.                                                                    |

### From the prototype (quote these exactly; they are user-visible labels)

Sourced from the Magic Patterns export at `~/Downloads/07-27-26_MagicPatterns`.

| Term                                | Where it comes from                         | Meaning                                                                                                                                                                                                                                                                                                                         |
| :---------------------------------- | :------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Toolbar Position**                | `ViewOptionsBar.tsx:154`                    | The prototype's own name for the control that chooses where the marker controls appear. **Use this name — do not invent one.**                                                                                                                                                                                                  |
| **Fixed** / **Floating** / **Side** | `ViewOptionsBar.tsx:137-149`                | The three Toolbar Position values (internal ids `'hidden'` / `'floating'` / `'right'` — note the ids do **not** match the labels). _Fixed_ = controls inline in the static top toolbar. _Floating_ = horizontal pill bar near the active line. _Side_ = vertical bar in the gutter beside the text column. Default is **Side**. |
| **Character Style**                 | `CharStyleCombobox.tsx:78` (button tooltip) | The prototype's label for the character-marker control. When discussing the prototype, use its word; when discussing our implementation, use the PRD's "character marker".                                                                                                                                                      |
| **(none)**                          | `CharStyleCombobox.tsx:133`                 | The first row of the Character Style list. Selecting it is the prototype's **remove** affordance. _Not implemented_ in the prototype — `applyCharStyle(null)` is a no-op (`useToolbarActions.ts:24-28`).                                                                                                                        |
| **(mixed)**                         | `CharStyleCombobox.tsx:58`                  | Shown when a selection spans more than one character marker.                                                                                                                                                                                                                                                                    |
| **Move toolbar to the side**        | `StructuredEditorToolbar.tsx:559`           | Tooltip on the `↔` button, which flips Side ↔ Floating only (never to Fixed).                                                                                                                                                                                                                                                 |

**Retired term — do not use:** _"three mode toggle."_ Coined in conversation on 2026-07-27 and it caused
a misunderstanding. Say **Toolbar Position control** instead, and name the specific values.

**Terms with no source — do not use:** _"collapsed mode"_ / _"one-line mode."_ There is no
collapsed/expanded state anywhere in the prototype source (verified by grep for
collaps/expand/compact/oneLine — zero hits). The horizontal one-line bar **is** the Floating
placement; the vertical bar **is** Side.

### From the repo (existing mechanisms — quote these, don't paraphrase)

| Term                         | Where it comes from                                                                                                                 | Meaning                                                                                                                                                                                                                                                                                                                                            |
| :--------------------------- | :---------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`platform-yalc`**          | [dev-packages.json](../../dev-packages.json) `"revision"`                                                                           | The branch of `eten-tech-foundation/scripture-editors` that paranext-core consumes. `link-dev-packages` runs on `postinstall` ([package.json:82](../../package.json#L82)) and yalc-links it, so **merging and pushing to this branch is how upstream changes reach the team** — no npm publish, version bump, or release tag. Verified 2026-07-28. |
| **`platform.interfaceMode`** | [core-settings-info.data.ts:38-41](../../src/extension-host/data/core-settings-info.data.ts#L38-L41)                                | The user setting whose values are `'simple'` / `'power'`. The mechanism for the PRD's Simple-only scoping.                                                                                                                                                                                                                                         |
| **structure protection**     | [use-structure-protection-state.hook.ts](../../extensions/src/platform-scripture-editor/src/use-structure-protection-state.hook.ts) | The existing feature that blocks paragraph/verse structure edits. **Character markers are deliberately exempt** — the prototype independently agrees (see the 2026-07-27 screenshot).                                                                                                                                                              |

### Coined in this plan (mine, defined here)

| Term                                                             | Definition                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| :--------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **partial / all / none**                                         | The three coverage states of the current selection with respect to one character marker, shown per row in the menu. From the UX meeting, 2026-07-30 (§3 → U3). _Partial_ = some of the selection carries the marker; _all_ = the whole selection does; _none_ = none of it does.                                                                                                                                                                                                                                                                                                    |
| **extend**                                                       | Grow an existing character marker so it covers the whole current selection, merging with runs already carrying it — **not** wrapping a second marker (which nests) and **not** replacing a different one. UX's partial → all step (§3 → U4); implemented by `PT-XXX-B4`.                                                                                                                                                                                                                                                                                                            |
| **mutually exclusive markers**                                   | Character markers that cannot coexist on the same text, so applying one removes the other. Raised by UX 2026-07-30; **the specific pairs are unknown** and are OQ-6. Not derivable from `usfmMarkers`, which carries no conflict data.                                                                                                                                                                                                                                                                                                                                              |
| **sandwich**                                                     | A character marker with both an opening and a closing marker (`\bd …\bd*`). **Verified 2026-07-30: all 58 `MarkerType.Character` markers are sandwiches** — `hasEndMarker: true` — except `v`, which is the known mistyped verse marker this feature excludes (§3 → U6). 🚨 **Correction, 2026-07-30 (`PT-XXX-C` design):** true as stated, but it does **not** license "sandwich ⇒ safe to offer." `va`, `vp` and `ca` are `MarkerType.Character` _with_ `hasEndMarker: true` and must still be excluded — see the correction under §1.4 item 1. The usable set is **54**, not 58. |
| **backout option**                                               | Shipping `PT-XXX-D1` (Fixed, trigger in the existing `TabToolbar`) instead of `PT-XXX-D2` (Side). Distinct from a cut: it has named tripwires and named decision moments in **§6.6**.                                                                                                                                                                                                                                                                                                                                                                                               |
| **enforcement point**                                            | A code path that can reach the behavior being changed. Used in §1.2 because a single user-facing action in this app is reachable from a menu, a shortcut, a PAPI command, and a data provider.                                                                                                                                                                                                                                                                                                                                                                                      |
| **mode gate**                                                    | The single `!isPowerMode` condition that decides whether a piece of this feature renders or registers. `isPowerMode` already exists in the editor web view ([web-view.tsx:408-416](../../extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx#L408-L416)), derived from `platform.interfaceMode`. **Singular by design** — see §1.6.                                                                                                                                                                                                                 |
| **inert in Power**                                               | The property required of every shared layer this feature touches: the code exists in Power mode, but **no Power-mode path references it and no existing Power-mode behavior changes.** Weaker than gated (there is no condition) and stronger than "unused" (it is a claim a reviewer must be able to check from the diff). Applies to `isCharacterMarker`, the item generator, the new upstream `EditorRef` methods, and the localization keys (§1.6).                                                                                                                             |
| **demo-critical path**                                           | The shortest ticket chain that puts something on screen and demo-able. Distinct from the ship-critical path. Introduced to serve the Implementation Owner Guide's "aim for a demo at the sprint halfway point".                                                                                                                                                                                                                                                                                                                                                                     |
| **ship-critical path**                                           | The longest chain required to complete the non-negotiables. The conventional critical path.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| **docked control**                                               | A control living in the editor's existing persistent `TabToolbar`. **This corresponds to the prototype's Fixed placement** — prefer "Fixed" when talking to Todd or Alex. Mounted by `PT-XXX-D1` (Variant A) — required if UX picks it, otherwise an NTH. Also Variant B's demo fallback.                                                                                                                                                                                                                                                                                           |
| **placement**                                                    | Where the character-marker control is mounted. Takes one of the prototype's three Toolbar Position values. **Deliberately split from the control**: `PT-XXX-D` builds the control, and `PT-XXX-D1` (Fixed) / `PT-XXX-D2` (Side) are thin wrappers — exactly one is required, chosen by UX (OQ-2). `PT-XXX-F1` (Floating) is an NTH either way. ⚠️ **"The floating menu" is ambiguous** between the prototype's Side and Floating values — always name the prototype value.                                                                                                          |
| **gutter**                                                       | The vertical space beside the text column, outside the text's bounding box. Where the prototype's Side placement sits.                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| **N1 (add) / N1 (change) / N1 (delete) / N1 (usable) / N2 / H1** | The sub-labels defined in the table below, so a ticket can serve one slice of a PRD row rather than all of it.                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |

### Claims about the prototype: state the evidence

The prototype was analyzed by reading its **exported source**, not by running it. When citing it,
distinguish these three, because they are different strengths of claim:

1. **"The source defines X"** — verifiable by reading the export. Safe.
2. **"X is on the rendered component tree"** — traceable through the export's imports. Reasonably safe.
3. **"X is reachable/visible in the hosted prototype"** — **not verified.** The hosted preview is
   "Simple Paratext – Fork 4 – variant A only" and may differ from this export.

Known unresolved discrepancy: the export defaults Toolbar Position to **Side**, but the screenshot
shared on 2026-07-27 shows **Floating**. So which placement the PRD's "propose similar to magic
patterns prototype" refers to is **still an open question** — see OQ-2.

---

## 0. Executive summary

Three findings reshape this PRD from what it looks like on paper:

1. **The marker picker already exists and works.** `MarkerMenu`
   ([marker-menu.component.tsx:132](../../lib/platform-bible-react/src/components/advanced/marker-menu.component.tsx#L132))
   is a searchable, localized, disallowed-aware marker list, already mounted in a selection-anchored
   popover in the editor. **Adding** a character marker to a selection works today via
   `editorRef.current.insertMarker(marker)`. The PRD's discoverability problem is that this is
   reachable _only_ by typing `\`.
2. **Deleting and changing a character marker has no API on the editor's public surface.**
   `EditorRef` exposes `insertMarker` and `formatPara` and nothing else relevant. That code lives in a
   **different repo** (`eten-tech-foundation/scripture-editors`, consumed as
   `@eten-tech-foundation/platform-editor ~0.8.14`). This is the entire 🟡 on the PRD's Feasibility row.
3. **But the removal logic already exists, on `CharNode` itself.**
   `delta-apply-update.utils.ts:398/406` already calls Lexical's `$unwrapNode` **on `CharNode`**, with
   `CharNode.setMarker` for replacement at `:366`, nesting support, and ~40 tests. So the upstream ask
   is **"add a selection-based entry point to logic that already works"**, not "build removal."
   _(Revised by the `PT-XXX-A` spike, 2026-07-29 — see A2/A4. Two claims in earlier drafts were wrong:
   that engine is **not** reachable from paranext-core via `applyUpdate`, because no selection→OT-index
   path exists in the package; and the `$unwrapTypedMarkNode` route is the wrong primitive — call
   `$unwrapNode` directly instead, which needs no upstream surface change at all.)_
4. **The "which marker is at the caret" query needs no new work either.** `StateChangeSnapshot.contextMarker`
   is already public and **already read by paranext-core** ([web-view.tsx:317](../../extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx#L317)).
   It is the innermost marker containing the selection — exactly OQ-1 Option A. Found by the spike (A5);
   it removes the query from `PT-XXX-B1` entirely.

Consequences: the non-negotiables are achievable; **N1 (add) is demo-able by the sprint halfway point**;
and upstream work ships by merging to the `platform-yalc` branch, so it is ordinary team-owned work
rather than a dependency on another team's release cadence. **The control's placement is still open** —
two variants, both fully specified, decided with UX (§2). **All non-negotiable work precedes every
nice-to-have** — the extra render locations, dragging, and the placement chooser are strictly downstream
of N1 and N2 (§6.3).

**This plan carries no time estimates.** The appetite is a fixed budget, so §5 shapes scope to it and
states what comes out first if it doesn't fit, rather than predicting durations.

---

## 1. Architecture Overview

### 1.1 Data model

**No new persisted data of any kind.** Worth stating plainly because it removes a whole class of work
usually implied by a feature like this:

| Question                       | Answer                                                                                                        |
| :----------------------------- | :------------------------------------------------------------------------------------------------------------ |
| New settings?                  | **None required.** Optionally one kill-switch (below).                                                        |
| New project-scoped data?       | None.                                                                                                         |
| New user-scoped data?          | None.                                                                                                         |
| What actually changes on disk? | **The scripture text itself** — a `char` node added, retyped, or unwrapped in the chapter's USJ.              |
| Scope of that change           | **Project-scoped.** Travels with the project and syncs via Send/Receive, exactly as any other text edit does. |
| New C# code?                   | **None.** See §1.5.                                                                                           |

The only _optional_ new setting is a feature kill-switch, if the team wants one:
`platformScriptureEditor.enableCharacterMarkerControl`, boolean, `default: true`, **user-scoped**,
declared in
[contributions/settings.json](../../extensions/src/platform-scripture-editor/contributions/settings.json)
and typed by augmenting `SettingTypes` in
[platform-scripture-editor.d.ts:717-723](../../extensions/src/platform-scripture-editor/src/types/platform-scripture-editor.d.ts#L717-L723).
Copy `platformScriptureEditor.enableScriptureTextGrid` exactly — including reading it at activation in
[main.ts:1333-1341](../../extensions/src/platform-scripture-editor/src/main.ts#L1333-L1341).

Mode gating is likewise an existing user-scoped setting, not new data: `platform.interfaceMode`
(`'simple' | 'power'`, default `'simple'`), declared at
[core-settings-info.data.ts:38-41](../../src/extension-host/data/core-settings-info.data.ts#L38-L41).
**This feature is Simple-only and must leave Power mode unchanged — §1.6 is the normative section for
that, and it applies to every ticket.**

### 1.2 Enforcement points

Every code path that can reach "apply / change / remove a character marker" today, or that a new
entry point must stay consistent with. **Eight paths, not one** — the discoverability work adds entry
points, so each is a place the new behavior must be correct or deliberately excluded.

| #   | Path                                                                     | Location                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Status after this work                                                                                                                                                                                                                                                                                                 |
| :-- | :----------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Backslash keydown** → selection-anchored `MarkerMenu` → `insertMarker` | keydown [web-view.tsx:1148-1192](../../extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx#L1148-L1192); open [:1110-1121](../../extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx#L1110-L1121); popover [:2078-2103](../../extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx#L2078-L2103); items [utils.ts:413-453](../../extensions/src/platform-scripture-editor/src/platform-scripture-editor.utils.ts#L413-L453) | **Preserved unchanged.** The PRD's own Value row says power users graduate to the keyboard.                                                                                                                                                                                                                            |
| 2   | **Docked toolbar control** (paragraph-marker precedent)                  | [web-view.tsx:1905-1953](../../extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx#L1905-L1953)                                                                                                                                                                                                                                                                                                                                                                                           | **New sibling control** — `PT-XXX-D`, `PT-XXX-E1`, `PT-XXX-E2`. Primary deliverable.                                                                                                                                                                                                                                   |
| 3   | **Gutter / near-line placements**                                        | Neither exists. Gutter overlay precedent at [paragraph-marker-tooltip-overlay.component.tsx](../../extensions/src/platform-scripture-editor/src/paragraph-marker-tooltip/paragraph-marker-tooltip-overlay.component.tsx); selection-anchor primitive at [:1110-1121](../../extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx#L1110-L1121)                                                                                                                                               | **New** — `PT-XXX-D2` (Side, required if UX picks Variant B) and `PT-XXX-F1` (Floating, always NTH).                                                                                                                                                                                                                   |
| 4   | **Editor right-click context menu**                                      | `EditorOptions.contextMenu`, [web-view.tsx:789-796](../../extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx#L789-L796) — currently one item ("Insert comment at selection")                                                                                                                                                                                                                                                                                                             | **Cheapest possible extra entry point.** Append-only array of `{ title, onSelect, isDisabled }`. Optional AC on `PT-XXX-E1`.                                                                                                                                                                                           |
| 5   | **PAPI command + top-menu item**                                         | commands [main.ts:1144](../../extensions/src/platform-scripture-editor/src/main.ts#L1144), [:1189](../../extensions/src/platform-scripture-editor/src/main.ts#L1189); menu [menus.json:141-158](../../extensions/src/platform-scripture-editor/contributions/menus.json#L141-L158)                                                                                                                                                                                                                                        | **New command + `insert`-column item** — `PT-XXX-G`, second half. Also makes the feature reachable by other extensions. First thing cut to fit appetite.                                                                                                                                                               |
| 6   | **USJ write path** → C#                                                  | `useProjectData('platformScripture.USJ_Chapter').ChapterUSJ` [web-view.tsx:1259-1275](../../extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx#L1259-L1275); save [:1321-1411](../../extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx#L1321-L1411) → `setChapterUSJ` → USX → [ParatextProjectDataProvider.cs:2608](../../c-sharp/Projects/ParatextProjectDataProvider.cs#L2608)                                                                       | **Unchanged, inherited.** See §1.5.                                                                                                                                                                                                                                                                                    |
| 7   | **Structure protection**                                                 | [use-structure-protection-state.hook.ts](../../extensions/src/platform-scripture-editor/src/use-structure-protection-state.hook.ts); disallow rule [utils.ts:430](../../extensions/src/platform-scripture-editor/src/platform-scripture-editor.utils.ts#L430)                                                                                                                                                                                                                                                             | **Must preserve current semantics**: character markers are deliberately _exempt_ (`isBlockMarker` returns false for `bd`/`add`/`nd`/`w`, asserted at [usfm-markers.test.ts:20-27](../../lib/platform-bible-utils/src/markers/usfm-markers.test.ts#L20-L27)). A protected project must still allow char-marker editing. |
| 8   | **Duplicate marker menu in the footnote editor**                         | [footnote-editor.component.tsx:490](../../lib/platform-bible-react/src/components/advanced/footnote-editor/footnote-editor.component.tsx#L490); [footnote-editor.utils.ts:24-36](../../lib/platform-bible-react/src/components/advanced/footnote-editor/footnote-editor.utils.ts#L24-L36)                                                                                                                                                                                                                                 | **Deliberately excluded** — PRD no-go #1. Flagged because it is a near-duplicate of path 1 and _will_ drift. See §10.                                                                                                                                                                                                  |

**Which of these eight run in Power mode** — because "Simple only" (§1.6) is a claim about each path, not
about the feature as a whole:

- **Paths 1, 6, 7, 8 run in Power today and must be unchanged by this work.** Paths 1 (`\` keydown) and 8
  (the footnote editor's copy of the same menu) are Power's _whole_ character-marker story, before and
  after this feature; path 6 (the USJ write path) and path 7 (structure protection) are inherited
  untouched. Path 8 is doubly excluded — PRD no-go #1 _and_ §1.6.
- **Paths 2, 3, 4, 5 are the new entry points, and every one of them is gated** to Simple: the docked
  control, the gutter placement, the editor context-menu item, and the PAPI command + Insert-menu item.
  §1.6's per-layer table says where each gate goes.
- **Net effect in Power mode: zero new entry points, zero changed entry points.**

### 1.3 Existing infrastructure to reuse

- **`MarkerMenu`** — [marker-menu.component.tsx:132](../../lib/platform-bible-react/src/components/advanced/marker-menu.component.tsx#L132). Search, two-tier match (code then title), `isDeprecated` / `isDisallowed` disabled states, `searchRef` for focus. Exported at [index.ts:114](../../lib/platform-bible-react/src/index.ts#L114). **Do not build a new picker.**
- **The docked-popover pattern** — paragraph switcher, [web-view.tsx:1905-1953](../../extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx#L1905-L1953). `Popover` + `PopoverTrigger` + `Button` showing current marker + `ChevronDown` → `PopoverContent` → `MarkerMenu`, with disabled state and tooltip fallback already solved. **This is the pattern to copy for `PT-XXX-D`.**
- **The item-generator pattern** — [`generateParagraphMenuListItems`](../../extensions/src/platform-scripture-editor/src/platform-scripture-editor.utils.ts#L371) and [`generateInlineMarkerMenuListItems`](../../extensions/src/platform-scripture-editor/src/platform-scripture-editor.utils.ts#L413). Pure functions taking `editorRef`, returning `MarkerMenuItem[]`. **Testable without a DOM** — this is why the existing tests are cheap.
- **The selection-anchor primitive** — [web-view.tsx:1110-1121](../../extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx#L1110-L1121) plus the zero-width `PopoverAnchor` trick at [:2079-2088](../../extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx#L2079-L2088). Currently duplicated four times in that file and never extracted.
- **Marker metadata** — `usfmMarkers` ([usfm-markers.ts](../../lib/platform-bible-utils/src/markers/usfm-markers.ts)) with `type`, `category`, `description`, `children`; `MarkerType.Character` exists at [usfm-marker.model.ts:34](../../lib/platform-bible-utils/src/markers/usfm-marker.model.ts#L34) and **nothing in the repo reads it yet**. `isBlockMarker` at [usfm-markers.ts:3079](../../lib/platform-bible-utils/src/markers/usfm-markers.ts#L3079); exports at [index.ts:55](../../lib/platform-bible-utils/src/index.ts#L55) and [index.ts:279](../../lib/platform-bible-utils/src/index.ts#L279).
- **Localized marker descriptions** — 186 `%markerMenu_marker_*%` keys already in [assets/localization/en.json](../../assets/localization/en.json) and `es.json`.
- **Simple-mode gating** — the `isPowerMode` memo at [web-view.tsx:408-416](../../extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx#L408-L416); the Share Layout button at [:1987-1994](../../extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx#L1987-L1994) is the exact "Simple only, seam left for Power" precedent, comment and all. **This is the React-side gate; see §1.6 for where it goes and what stays ungated.**
- **Simple-only _styling_** — [\_simple-mode.scss](../../extensions/src/platform-scripture-editor/src/_simple-mode.scss), a stylesheet whose entire purpose is Simple-mode-only rules for this extension's web views, keyed off the `.editor-container-simple` class the scripture editor applies conditionally on `!isPowerMode` ([web-view.tsx:1888](../../extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx#L1888)). **Required for `PT-XXX-D2`'s reserved gutter** — a React gate cannot scope CSS, and its header explains why an attribute selector can't reach inside a sandboxed web-view iframe. Already `@use`d by every entry point.
- **Component trio convention** — [structure-protection-button.component.tsx](../../extensions/src/platform-scripture-editor/src/structure-protection-button.component.tsx) + `.test.tsx` + `.stories.tsx` is the shape a new extension component takes.
- **`useViewVisibility`** — required for any geometry-driven UI, per [cross-view-sync-hidden-views.md](../../.claude/rules/cross-view-sync-hidden-views.md).

### 1.4 New abstractions needed

**In paranext-core (small):**

1. `isCharacterMarker(marker: string): boolean` — next to `isBlockMarker` in [usfm-markers.ts:3079](../../lib/platform-bible-utils/src/markers/usfm-markers.ts#L3079), exported from [index.ts:55](../../lib/platform-bible-utils/src/index.ts#L55). Must handle the documented `v` quirk: verse is a _structure_ marker but is typed `MarkerType.Character` ([usfm-markers.ts:3076](../../lib/platform-bible-utils/src/markers/usfm-markers.ts#L3076)) — a naive `type === MarkerType.Character` check would offer `\v` as a character style.

   🚨 **Correction, 2026-07-30 — the `v` quirk is four markers, not one.** Found while designing
   `PT-XXX-C` ([design doc](../superpowers/specs/2026-07-30-character-marker-helper-and-item-generator-design.md)),
   verified by enumerating `usfmMarkers`. `va` (alternate verse number,
   [usfm-markers.ts:893-898](../../lib/platform-bible-utils/src/markers/usfm-markers.ts#L893-L898)), `vp`
   (published verse character, [:900-905](../../lib/platform-bible-utils/src/markers/usfm-markers.ts#L900-L905))
   and `ca` (alternate chapter number, [:837-842](../../lib/platform-bible-utils/src/markers/usfm-markers.ts#L837-L842))
   are _also_ `MarkerType.Character`, and unlike `v` all three have **`hasEndMarker: true`** — so neither a
   `marker !== 'v'` check nor the sandwich invariant excludes them. All four are the _only_
   `MarkerType.Character` markers whose `category` is `DivisionMarks`, so the implementation excludes that
   **category** rather than special-casing `v` by name, and no name list is maintained. Consequences:
   the usable character-marker set is **54**; `vp` is reachable in practice (child of `cd`) while `ca`/`va`
   are children of no marker; and `isBlockMarker` returns `false` for all three, which is a **pre-existing
   structure-protection gap** in the shipped `\` menu — deliberately not fixed by `PT-XXX-C`, since
   changing `isBlockMarker` alters shipped behavior and needs its own ticket.

2. `generateCharacterMarkerMenuListItems(...)` — sibling of `generateInlineMarkerMenuListItems` in [platform-scripture-editor.utils.ts](../../extensions/src/platform-scripture-editor/src/platform-scripture-editor.utils.ts), filtered to character markers, with add / change / remove actions.
3. `CharacterMarkerControl` — the docked component, following the component-trio convention above.
4. _(only if `PT-XXX-F1` survives)_ `useSelectionAnchor` — extract the four-times-duplicated anchor triple. Do this **only** as part of `PT-XXX-F1`, when a fifth consumer actually exists; do not refactor it speculatively.

**Upstream in `scripture-editors` (the real work):**

5. `$removeCharMarkerAtSelection` / `$replaceCharMarkerAtSelection` — **added to the existing**
   `packages/platform/src/editor/adaptors/usj-marker-action.utils.ts`, plus two `EditorRef` methods.
   **No new module, and no selection query** — both revised by the `PT-XXX-A` spike (A3, A5). See
   `PT-XXX-B1` / `PT-XXX-B2` for the exact file lists. There is no `$setInlineType` in Lexical
   (verified), so a selection-based entry point must be written — but **every primitive it needs already
   exists and is tested upstream, and all four splitting primitives are already private in that same
   file**:

   - **unwrap**: `$unwrapNode` from `@lexical/utils` — takes an `ElementNode`, so it typechecks on `CharNode` unchanged, and is already applied to `CharNode` at `delta-apply-update.utils.ts:398/406`. **Chosen over generalizing `$unwrapTypedMarkNode`** (`libs/shared/src/nodes/features/TypedMarkNode.ts:1341`), which has 4 callers in the annotation/comment paths — see A4
   - **replace**: `CharNode.setMarker` (public, `CharNode.ts:184`), already used this way at `delta-apply-update.utils.ts:366`
   - **range splitting**: `getSelectionOffsets` / `$getTargetNode` / `handleTextNode` / `$wrapNode`, all module-private in `usj-marker-action.utils.ts:214-325` — reused in place, **zero new exports** (A3)
   - **query**: **not needed** — `StateChangeSnapshot.contextMarker` already ships and is already read by paranext-core (A5)
   - **cleanup**: `CharNode.canBeEmpty()` is `false` (`CharNode.ts:259`) and `$charNodeTransform` (`CharNodePlugin.tsx:39-68`) deletes emptied CharNodes and merges adjacent same-attribute siblings, so cleanup and coalescing are automatic

   The genuinely new work is composition plus one edge case: stripping synthesized `MarkerNode` children under `markerMode: 'editable'`/`'visible'` (`$isMarkerNode(child) || $isVisibleMarkerNode(child)`, ~3 lines — A4). Simple mode uses `'hidden'`, so that is not the main path.

### 1.5 How data flows between systems

```
User selects text in the scripture editor web view (iframe)
        │
        ├── entry point: docked TabToolbar control  [PT-XXX-D / E1 / E2]
        ├── entry point: toolbar    [PT-XXX-D1, Variant A]
        ├── entry point: gutter     [PT-XXX-D2, Variant B]
        ├── entry point: near line  [PT-XXX-F1, always NTH]
        ├── entry point: editor context menu        [PT-XXX-E1, optional AC]
        ├── entry point: PAPI command / Insert menu [PT-XXX-G, cut candidate]
        └── entry point: `\` keydown                [existing, untouched]
        │
        ▼
  MarkerMenu → MarkerMenuItem.action
        │
        ▼
  EditorRef:  insertMarker(m)              ← exists today
              onStateChange → contextMarker ← exists today, ALREADY WIRED [spike A5]
                                              (the innermost marker at the selection —
                                               no upstream query needed)
              removeCharMarker(m?)         ← NEW, upstream [PT-XXX-B1]
              replaceCharMarker(from, to)  ← NEW, upstream [PT-XXX-B2]
        │
        ▼
  Lexical CharNode mutation (in the editor package)
        │
        ▼
  onUsjChange → saveUsjToPdpIfUpdated  [web-view.tsx:1321-1411]
        │  · reentrancy guard `currentlyWritingUsjToPdp`
        │  · `areUsjContentsEqualExceptWhitespace` diff guard
        │  · `correctEditorUsjVersion` 3.1 → 3.0
        ▼
  PAPI: PDP `platformScripture.USJ_Chapter` → setChapterUSJ
        │
        ▼
  usjToUsxString → setChapterUSX  [platform-scripture-extender-pdpe.model.ts:148-158]
        │
        ▼  JSON-RPC over WebSocket
  C#: SetChapterUsx  [ParatextProjectDataProvider.cs:2608]
        │  · EnterSyncWriteScope() → SendReceiveWriteLock.EnterWrite(projectId)   ← ALREADY GATED
        │  · WriteScope.EntireProject(scrText)
        ▼
  ScrText.PutText → disk → Send/Receive sync
```

**Send/Receive write gate: no new work, but do not break it.** Per
[CLAUDE.md → Send/Receive Write Gate](../../CLAUDE.md), any new C# path that mutates project data must
wrap the mutation in `SendReceiveWriteLock.EnterWrite`. **This feature adds no C# path** — every write
lands on the already-gated `SetChapterUsx`
([ParatextProjectDataProvider.cs:2608](../../c-sharp/Projects/ParatextProjectDataProvider.cs#L2608), gate at
[:2882-2884](../../c-sharp/Projects/ParatextProjectDataProvider.cs#L2882-L2884)). Two consequences to
honor rather than implement:

- The TS side must keep handling the `(SR_EDIT_BLOCKED)` sentinel. The existing handler
  (`SYNC_EDIT_BLOCKED_REGEX`, [web-view.tsx:254](../../extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx#L254), consumed at [:1372-1407](../../extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx#L1372-L1407)) reverts the editor to PDP state on rejection. A marker mutation rejected mid-sync must revert visibly, not silently.
- Every new entry point must be **disabled while `isSyncBlocked`**, matching the existing comment item at [:789-796](../../extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx#L789-L796).

**Version-history commits.** Both existing marker-adjacent commands pre-commit a snapshot before
mutating: `paratextBibleSendReceive.commitChanges` at
[web-view.tsx:856](../../extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx#L856)
and [:884](../../extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx#L884),
tolerating `ERROR_UNIMPLEMENTED`. **A destructive marker removal should do the same** — this is the
"undo of last resort" for a user who nukes the wrong marker.

**Never implement this via a USJ round-trip.** `setEditorUsj`
([web-view.tsx:575-578](../../extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx#L575-L578))
explicitly clears all annotation info, because setting the editor's USJ silently removes every
annotation. A `getUsj() → mutate → setUsj()` implementation of remove/change would therefore destroy
comments and annotation highlights on every marker edit, and **wipe undo entirely** — `setUsj` re-runs
`LoadStatePlugin`, which dispatches `CLEAR_HISTORY_COMMAND` (`LoadStatePlugin.tsx:57-62`), the same
mechanism behind an already-diagnosed open undo bug in this repo.

**Updated by the `PT-XXX-A` spike (A6): this is not a fallback of any kind.** Earlier drafts kept it as
an "emergency fallback"; that is withdrawn. The correct fallback for a `PT-XXX-B1` estimate miss is to
ship **N1 (add) alone** — `PT-XXX-C` → `PT-XXX-D` → one wrapper, entirely in paranext-core with no
upstream dependency — and defer delete/change. Never trade a missing feature for silent data loss.

### 1.6 Simple mode only — where the gate lives, and what must stay inert in Power

**Decided 2026-08-03. This is a requirement on every ticket in this plan, not a note on one of them.**

The PRD's rabbit-hole row says _"Do what is needed for Simple, and let Power team improve it, if
necessary"_ (PRD line 84). That has two halves, and only the first was previously written down:

1. **Build the feature for Simple.** Already the plan's posture everywhere (OQ-4).
2. **Leave Power exactly as it is today.** _This_ is the half being made explicit. It is a stronger
   claim than "we aren't building it for Power," because the editor web view, the marker menu component,
   the `usfmMarkers` data, and the upstream editor package are all **shared between the two modes** — so
   a careless change lands in Power whether or not a ticket mentions it.

**The bar a reviewer should hold every PR in this plan to:** _with `platform.interfaceMode` set to
`'power'`, does the app behave and look exactly as it did before this feature?_ If the diff cannot be read
to answer that, it is not ready.

#### One condition, two mechanisms — and both already exist

Everything gates off the **same** source of truth: the `isPowerMode` memo already in the editor web view
([web-view.tsx:408-416](../../extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx#L408-L416)),
derived from `platform.interfaceMode`. It reaches code two ways, and **a ticket that needs the second one
cannot get there with the first** — which is the mistake §2.2 and `PT-XXX-D2` are warned about:

**1. For React — the conditional render.** Copy the Share Layout precedent verbatim, comment and all
([:1987-1994](../../extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx#L1987-L1994)):

```tsx
{/* The character-marker control is only available in 10 Simple right now. Later it will be made
    available in 10 Power too. */}
{!isPowerMode && ( … )}
```

**2. For CSS — the `.editor-container-simple` marker class, and there is a whole stylesheet for this
already.** [`_simple-mode.scss`](../../extensions/src/platform-scripture-editor/src/_simple-mode.scss)
exists precisely for "Simple-mode-ONLY styles for this extension's web views," and its header documents
why a CSS-level hook is _necessary_ rather than optional: each web view compiles to its own standalone CSS
inside a sandboxed iframe, so **`[data-interface-mode='simple']` is not visible from in here** — that
attribute lives on the renderer's `document.body`, a different document. So Simple-only styling is done
with marker classes on the web view's own root, and the scripture editor already applies
`.editor-container-simple` conditionally on `!isPowerMode`
([web-view.tsx:1888](../../extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx#L1888)).
The file is `@use`d from `_editor-overrides.scss`, which all three web-view entry points already pull in,
so a new rule needs no entry-point change.

**This is the mechanism for `PT-XXX-D2`'s reserved gutter** — a descendant rule under
`.editor-container-simple`, not a new attribute and not a bare `.usfm` selector. Verified 2026-08-03.

**Do not spread the gate downward past those two points.** A pure function that takes no mode, a
marker-metadata helper, and an upstream editor method are all better left mode-agnostic: gating them would
mean threading `interfaceMode` through layers that have no business knowing about it, and would leave the
same code guarded in several places at once — the pattern that produces a mode leak in the _one_ place
someone forgets. One gate per mount point is checkable; five scattered gates are not.

#### Per-layer table: gated, or inert?

| Layer                                                                                      | Shared with Power?                                                                                     | Requirement                                                                                                                                                                                                                                                                                                                                                       | Ticket                  |
| :----------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------- |
| `isCharacterMarker` (PBU)                                                                  | **Yes** — a `platform-bible-utils` export, importable anywhere                                         | **Inert.** New function, no existing call site retargeted. **`isBlockMarker` must not change** — see the off-limits list below                                                                                                                                                                                                                                    | `PT-XXX-C`              |
| `generateCharacterMarkerMenuListItems`                                                     | **Yes** — an extension-level module                                                                    | **Inert.** Pure function; reachable only from the gated control. Not wired into the `\` menu's generator                                                                                                                                                                                                                                                          | `PT-XXX-C`              |
| Localization keys (`en` + `es`)                                                            | **Yes** — string contributions are global, and the editor web view preloads its key list in both modes | **Inert, and this is the one deliberate exception to "no Power code runs":** the web view resolves one extra key in Power too. It renders nothing. Gating a string preload would be worse than the thing it prevents — the key list is a module-level constant, and making it conditional buys no user-visible difference                                         | `PT-XXX-C`, `PT-XXX-G`  |
| `MarkerMenuItem`'s new selection-state field                                               | **Yes** — `MarkerMenu` is used by the `\` menu **and** the footnote editor, both live in Power         | **Additive only.** Every existing consumer compiles and behaves identically with the field absent. The tri-state affordance must not render when no consumer supplies the field                                                                                                                                                                                   | `PT-XXX-D`              |
| Upstream `EditorRef` methods (`removeCharMarker`, `replaceCharMarker`, `extendCharMarker`) | **Yes** — one editor package serves both modes                                                         | **Inert.** Purely new methods. **No change to `insertMarker`, `formatPara`, `applyUpdate`, `$unwrapTypedMarkNode`, or any annotation/comment path**                                                                                                                                                                                                               | `PT-XXX-B1`, `B2`, `B4` |
| `CharacterMarkerControl` (the container)                                                   | No                                                                                                     | **Gated** at its mount                                                                                                                                                                                                                                                                                                                                            | `PT-XXX-D` + wrapper    |
| The `padding-inline-end` right gutter                                                      | **Yes — `_usj-nodes.scss` styles the editor in both modes**                                            | **Gated, via mechanism 2.** 🚨 The one item that would visibly change Power if applied globally: it narrows the text column. Put the rule in [`_simple-mode.scss`](../../extensions/src/platform-scripture-editor/src/_simple-mode.scss) under `.editor-container-simple` — never on a bare `.usfm` selector, and note that the React gate does **not** cover CSS | `PT-XXX-D2`             |
| `EditorOptions.contextMenu` item (optional AC)                                             | **Yes** — the editor's context menu is one array in both modes                                         | **Gated.** Build the array conditionally on `!isPowerMode`                                                                                                                                                                                                                                                                                                        | `PT-XXX-E1`             |
| PAPI command + Insert-menu item (cut candidate)                                            | **Yes** — menu JSON has no `when`/`visibility` field                                                   | **Gated in code** by not registering the command in Power. Already stated on the ticket                                                                                                                                                                                                                                                                           | `PT-XXX-G`              |
| A new keyboard handler, if any is added                                                    | **Yes** — a keydown listener fires regardless of mode                                                  | **Gated.** A shortcut registered unconditionally is a Power-mode behavior change even with no visible UI. Prefer adding no new shortcut                                                                                                                                                                                                                           | `PT-XXX-G`              |

#### Three shared surfaces this plan must not touch

Named because each is a plausible "while I'm here" improvement that would change shipped Power behavior:

1. **`isBlockMarker`.** `va`/`vp`/`ca` return `false` from it, which is a real structure-protection gap in
   the shipped `\` menu (§1.4 item 1). **Fixing it is out of scope in both modes** — it would change what
   a protected project allows today, for Simple _and_ Power users. Its own ticket, deliberately not this
   one.
2. **The `\` keydown path** (§1.2 path 1). It must stay exactly as it is: it is how a Power user reaches
   character markers today, and after this feature ships it is _still_ how they do — the only other
   character-marker surface in Power is the footnote editor's copy of the same menu (path 8, below).
   "Preserved unchanged" already appears in §1.2; the reason is now on the record.
3. **The footnote editor's duplicate marker menu** (§1.2 path 8). PRD no-go #1 keeps it out of scope; the
   Simple-only rule adds a second, independent reason to leave it alone — it renders in Power.

#### What this does _not_ mean

- **It does not mean Power users lose anything.** They have the `\` menu today and keep it untouched.
- **It does not mean the seam is hidden.** Un-gating for Power stays a one-line change; the comment at the
  gate names the deferral so the Power team can find it. That is the PRD's "let Power team improve it."
- **It does not require a new setting.** `platform.interfaceMode` already exists (§1.1). No new stored
  data, and therefore no new `paratext-10-studio` dependency (§11).

---

## 2. UI approach — two costed variants, decision pending with UX

**Status as of 2026-07-28: undecided, deliberately.** The plan is structured so the placement can be
chosen late — after the UX conversation — without re-cutting tickets. Both variants below are fully
specified and independently estimated.

The driver is the comment thread's opening line, which is the ask rather than the framing:

> "**Need floating context menu UI** to pick character (inline) styles" — Alex Mercado, 2026-07-22

The four bullets after it are what Alex explicitly labelled "very likely out-of-scope… helpful to name
as NTHs" (OQ-3 C1–C4). So a discoverable menu is the requirement; _where_ it sits is the open question,
and the extra render locations, dragging and grammar filtering are nice-to-haves.

### ⚠️ Terminology: "the floating menu" is ambiguous — name the prototype value

The prototype offers three **Toolbar Position** values, and two of them get called "the floating menu"
in conversation:

| Prototype value | Shape                                                                           | Variant           |
| :-------------- | :------------------------------------------------------------------------------ | :---------------- |
| **Fixed**       | Controls inline in the editor's persistent toolbar                              | **Variant A**     |
| **Side**        | Vertical bar in the **gutter beside the text column**, tracking the active line | **Variant B**     |
| **Floating**    | Horizontal pill **near/below the active line** — the 2026-07-27 screenshot      | NTH (`PT-XXX-F1`) |

"The floating menu in the gutter on the side of the text" = **Side** = Variant B. The prototype's
_Floating_ value is a different thing. Use the prototype's words in review.

### 2.0 How the tickets are split so the decision can be late

`PT-XXX-D` builds the control and **nothing about where it lives**. Placement is a separate, thin
wrapper ticket. Exactly one wrapper is required; the other becomes a nice-to-have.

| Ticket      | Scope                                                                                                         |
| :---------- | :------------------------------------------------------------------------------------------------------------ |
| `PT-XXX-D`  | The control itself — `Popover` + `MarkerMenu`, current-marker label, disabled states. **Placement-agnostic.** |
| `PT-XXX-D1` | **Variant A — Fixed**: mount in the editor toolbar                                                            |
| `PT-XXX-D2` | **Variant B — Side**: mount in the gutter, tracking the active line                                           |

**Pick one wrapper; the other is an NTH.** This is not an artificial split — the control needs to be
placement-agnostic anyway so that `PT-XXX-F1` (Floating) stays cheap, and enforcing it at a ticket
boundary is stronger than a note in a description.

### 2.1 The comparison UX needs

|                                                                                          | **Variant A — Fixed** (toolbar)                                 | **Variant B — Side** (gutter)                                                           |
| :--------------------------------------------------------------------------------------- | :-------------------------------------------------------------- | :-------------------------------------------------------------------------------------- |
| **Relative size**                                                                        | **Smaller** — no computed geometry at all                       | **Larger** — gutter positioning, hidden-view handling, and an unresolved space conflict |
| **Reaches a demo**                                                                       | Sooner — the shorter chain                                      | Later, with a fallback if it isn't ready (§6.1)                                         |
| **H1 clause 1** — "does not overlap project text"                                        | ✅ Free — a toolbar cannot overlap text                         | ✅ By placement — sits outside the text's box                                           |
| **H1 clause 2** — "see where marker(s) will be inserted **in context of other markers**" | ⚠️ **Weak** — the toolbar is far from the text                  | ✅ **Yes** — sits beside the line in question                                           |
| **H1 overall**                                                                           | **Partial**                                                     | **Covered**                                                                             |
| **Prototype fidelity**                                                                   | One of its three values                                         | One of its three values, **and its default**                                            |
| **Hidden-view handling**                                                                 | Not needed — no computed geometry                               | **Required** — reads a DOM rect (§2.4)                                                  |
| **Main risk**                                                                            | Discoverability is good but the control is remote from the text | Gutter space conflict — see below                                                       |
| **Reversible later?**                                                                    | Yes — `PT-XXX-D2` becomes the NTH                               | Yes — `PT-XXX-D1` becomes the NTH                                                       |

**My recommendation: Variant B (Side)**, if we have two developers or `PT-XXX-A` runs pre-sprint. It
satisfies the PRD's nice-to-have in full rather than half, it is what UX leaned toward, and it is the
prototype's default. **Variant A is the right answer if the sprint is tight** — it is materially less
work and it carries none of Variant B's open questions.

### 2.2 Variant B research findings — better and worse than expected

**Better: the gutter already exists, and so does the positioning math.**

- Simple mode already renders paragraph markers in a gutter. `hasGutterParaMarkers: true` is set in the Simple view preset (`view-options.utils.ts:156` upstream), and paranext-core styles it at [\_usj-nodes.scss:2438](../../extensions/src/platform-scripture-editor/src/_usj-nodes.scss#L2438) — `--psc-gutter-width: 4em`, with `.usfm.psc-gutter-markers { padding-left: var(--psc-gutter-width) }` reserving the space and `.psc-gutter-markers .para { position: relative }` giving absolutely-positioned gutter content a containing block.
- **A gutter-anchored overlay already ships.** [ParagraphMarkerTooltipOverlay](../../extensions/src/platform-scripture-editor/src/paragraph-marker-tooltip/paragraph-marker-tooltip-overlay.component.tsx), mounted around the editor at [web-view.tsx:1837](../../extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx#L1837), positions content in the gutter aligned to a paragraph. Its `computePosition` ([paragraph-marker-tooltip.utils.ts:23](../../extensions/src/platform-scripture-editor/src/paragraph-marker-tooltip/paragraph-marker-tooltip.utils.ts#L23)) **deliberately returns `left: 0`** — "Always anchor at the leading margin so indented paragraphs (e.g. `\q`, `\q2`) show their tooltip at the editor's left edge, not at the indented position." That is gutter positioning, already solved, with a test file.
- It also solves the fiddly parts: `findScrollContainer` ([editor-dom.util.ts:78](../../extensions/src/platform-scripture-editor/src/editor-dom.util.ts#L78)), a `lastPositionRef` so the element doesn't jump, and recomputation on scroll plus **capture-phase** keydown (Lexical calls `stopPropagation()` before React sees keydown).

So Variant B's coordinate math is inherited rather than invented — which is why it is _feasible_ inside
the appetite at all, rather than the open-ended positioning problem it would otherwise be.

🚨 **Correction, 2026-07-30 — the paragraph above is about the _wrong edge_.** The existing gutter is on the
**inline-start** side (left in LTR). The prototype puts the Side bar on the **right**. So:

- **There is no right gutter to inherit** — the `padding-right: 4em` in the SCSS is the RTL mirror of the same start-side gutter ([:2646-2649](../../extensions/src/platform-scripture-editor/src/_usj-nodes.scss#L2646-L2649)), not a second one.
- **`computePosition` hardcodes `left: 0`** with the comment _"Always anchor at the leading margin."_ Its scroll-aware **vertical** tracking is real and reusable; there is **no horizontal math** to inherit, and what exists points the other way.

So "the coordinate math is inherited" is half true — the hard vertical half, yes; the horizontal half must
be written. See `PT-XXX-D2` for the corrected framing, and **OQ-8** for the constraint that matters more
than either.

**Worse: there is a space conflict, and it is a UX question, not an engineering one.**

The start-side gutter is **4em (~64px)** and already holds paragraph marker labels (`\p`, `\s1`). The
prototype's Side bar is `min-w-[118px]` — roughly 7.4em. Three ways out, and UX should pick. ⚠️ **Read
these as being about creating space on the _right_, per the correction above** — option 1's "share" only
applies if the bar moves to the start side, which is a departure from the prototype:

1. **Share the gutter** — a compact, icon-only control stacked with or offset from the paragraph marker label. Cheapest; risks crowding.
2. **Widen the gutter** — raise `--psc-gutter-width`. Note the SCSS comment at [:2442-2443](../../extensions/src/platform-scripture-editor/src/_usj-nodes.scss#L2442): the marker left offset uses `calc(-(--psc-gutter-width) + 0.5em)`, so **both values must change together**. Shifts the whole text column.

   🚨 **Whichever option is picked, the space it creates must be Simple-only (§1.6).** `_usj-nodes.scss`
   styles the editor in **both** modes, so raising `--psc-gutter-width` or adding `padding-inline-end` on
   a bare `.usfm` selector narrows every **Power** user's text column for a control they cannot see. This
   is the single largest accidental-Power-change risk in the plan, and it is a CSS selector, not a React
   condition — so the `!isPowerMode` gate around the component does **not** cover it.
   **The mechanism already exists:** put the rule in
   [`_simple-mode.scss`](../../extensions/src/platform-scripture-editor/src/_simple-mode.scss) under
   `.editor-container-simple`, the marker class the scripture editor already applies conditionally on
   `!isPowerMode` ([web-view.tsx:1888](../../extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx#L1888)).
   That file exists for exactly this problem and explains why an attribute selector can't work from inside
   a sandboxed web-view iframe.

3. ~~**Sit outside the editor's content box**, anchoring to a neighboring panel's edge as the prototype does. Matches the prototype most closely; most positioning work.~~ 🚨 **Not available.** This was mis-costed as "most positioning work" — it is **not possible from inside a web view at all**, because the editor is an iframe and iframe content cannot draw over a sibling dock panel. See **OQ-8**. Reaching it would need new core overlay-service work.

**Take this question to the UX conversation** — it changes what Variant B looks like more than it
changes the estimate.

**One honest note on hidden views:** the existing `ParagraphMarkerTooltipOverlay` does **not** handle the
hidden-tab case — it recomputes on scroll and keydown only. So §2.4's requirement is new work for us,
but it is a pre-existing gap in the codebase rather than a regression we would be introducing. Worth
doing properly in `PT-XXX-D2`; worth not being surprised that there is no precedent to copy.

### 2.3 Variant A (Fixed) specifics

A character-marker button in the existing `TabToolbar` `startAreaChildren`, immediately after the
paragraph-marker switcher. **Copy
[web-view.tsx:1925-1953](../../extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx#L1925-L1953)
closely** — the paragraph switcher already solves the button-shows-current-marker affordance, the
disabled state, and the tooltip fallback. No computed geometry, so §2.4 does not apply.

This is also the **demo-protection fallback for Variant B**: if gutter positioning is not behaving by
the halfway point, ship `PT-XXX-D1` instead and demo that. Because the control is placement-agnostic,
that is a wrapper swap.

### 2.4 Hidden-view rule — applies to Variant B, not Variant A

In a `display:none` iframe there is no layout: geometry reads return zero and `scrollIntoView` no-ops.
Per [cross-view-sync-hidden-views.md](../../.claude/rules/cross-view-sync-hidden-views.md), any
placement that computes position from a DOM rect **must not do so while hidden**, and must be backed by a
test that mounts hidden, changes state, flips visibility, and asserts the catch-up. In Simple mode (one
visible tab per stack) hidden is the _common_ case. `useViewVisibility` exists and is exported
([index.ts:292](../../lib/platform-bible-react/src/index.ts#L292)) with its own tests.

**Choosing Variant B puts this on the critical path.** Choosing Variant A keeps it off entirely.

### 2.5 Floating placement (`PT-XXX-F1`) — NTH either way

A horizontal pill near the active line. An additional render location per OQ-3 C1, and the riskiest of
the three:

- Radix portals into the _iframe's_ `document.body`, so content is clipped to the iframe viewport and collision handling will flip/shift it — potentially **over the text**, defeating H1. See [dismissal-patterns.mdx:115-165](../../lib/platform-bible-react/src/stories/guidelines/dismissal-patterns.mdx#L115).
- **Outside-dismiss silently fails** when the user clicks into a sibling sandboxed web view; needs the focus-check-plus-`document.hasFocus()` supplement.
- **No precedent** for selection-triggered UI in this repo — every existing overlay is hover-driven or keystroke-driven.

### 2.6 Draggable (`PT-XXX-F4`) and the Toolbar Position chooser (`PT-XXX-F3`) — NTHs

Draggable is OQ-3 C2: the prototype has a `GripVertical` grip and suspends auto-positioning once
dragged. No drag precedent in this repo, and it fights the auto-repositioning Variant B depends on —
take it last.

The chooser is the prototype's **Fixed | Floating | Side** segmented control plus the `↔` button.
Pointless with one placement; **it is the natural home for whichever variant loses the UX decision**,
since that wrapper will already exist as an NTH. Needs a user-scoped setting to persist the choice — the
only ticket in this plan that adds stored data.

---

## 3. Design Considerations & Open Questions

### ✅ RESOLVED — Upstream delivery goes through the `platform-yalc` branch

**Status: not a blocker.** Recorded because an earlier draft of this plan treated it as the top sprint
risk, and it isn't one.

Upstream changes reach paranext-core by **merging to the `platform-yalc` branch of
`eten-tech-foundation/scripture-editors` and pushing** — no npm publish, no version-bump PR, no
`platform_v*` release tag on the sprint path. Verified in this repo:

- [dev-packages.json](../../dev-packages.json) pins `"revision": "platform-yalc"` for the
  `scripture-editors` repo, with `devpubTarget: "platform-editor"`.
- [`link-dev-packages`](../../.erb/scripts/link-dev-packages.ts) runs on **`postinstall`**
  ([package.json:82](../../package.json#L82)) — it clones the repo if absent, checks out that revision,
  and yalc-links it. So a plain `npm install` picks up whatever is on `platform-yalc`, for every
  developer and in CI.
- Manual controls exist if needed: `npm run editor:link` / `editor:unlink`
  ([package.json:64-65](../../package.json#L64-L65)).
- The branch exists locally and on `origin` (verified 2026-07-28).

**Consequence for the plan:** `PT-XXX-B1` and `PT-XXX-B2` are ordinary work items owned by this team,
on the same footing as the paranext-core tickets. There is **no external queue on the critical path**,
and the `applyUpdate` fallback is therefore insurance against an _estimate_ miss, not against another
team's release cadence.

**One residual, explicitly not sprint-critical:** [package.json:160](../../package.json#L160) still
pins `~0.8.14` from npm, and `package-lock.json` records the same. `postinstall` re-links over it, so
this doesn't affect the sprint — but the npm version will need bumping at some point before a public
release. Track it as normal release hygiene, not as a dependency of this work.

### ✅ RESOLVED — `PT-XXX-A` spike results (run 2026-07-29, pre-sprint)

The spike ran against the **actually shipped** package and the upstream tree. Every claim below carries
a `file:line`. Five things changed relative to the plan's assumptions; two of them make required work
**smaller**, and one closes a mechanism the plan was holding open as insurance.

#### A1. The shipped surface, confirmed twice — no removal API exists

- **What consumers actually get is a yalc symlink, not npm.** `node_modules/@eten-tech-foundation/platform-editor`
  is a symlink to `.yalc/@eten-tech-foundation/platform-editor` (`yalc.sig` present), version **0.8.15**.
  [package.json:160](../../package.json#L160) still pins `~0.8.14` from npm, but `postinstall` links over
  it — so the npm pin describes nothing anyone runs. (Unchanged from §3's earlier finding; now verified
  from the installed tree rather than the scripts.)
- **The only shipped type file is `dist/index.d.ts` (936 lines).** It is the **untrimmed** api-extractor
  rollup (`packages/platform/config/api-extractor.json` → `dtsRollup.untrimmedFilePath`), so absence from
  it means _not exported from the package entry point_ — **not** "trimmed by release tag." That distinction
  matters for A3.
- **`EditorRef` is `dist/index.d.ts:249-368` — 22 members, exhaustively:** `focus`, `undo`, `redo`, `cut`,
  `copy`, `paste`, `pastePlainText`, `getUsj`, `setUsj`, `applyUpdate`, `replaceEmbedUpdate`,
  `getSelection`, `setSelection`, `setAnnotation` (×2 overloads), `removeAnnotation`, `formatPara`,
  `getElementByKey`, `insertMarker`, `insertNote`, `selectNote`, `getNoteOps`, `toolbarEndRef`.
  There is **no** `removeCharMarker`, `replaceCharMarker`, `getCharMarkersAtSelection`, `formatChar`, or
  `setCharMarker`.
- The only `remove*` member is `removeAnnotation(type, id)` at **`dist/index.d.ts:326`**, which
  `Editor.tsx:295-297` routes through `externalTypedMarkType(type)` into `AnnotationPlugin` — it operates
  on `TypedMarkNode` only and **cannot reach a `CharNode`**. `formatPara` (**`:328`**) is `$setBlocksType`
  only (`Editor.tsx:298-305`), block-level.
- **Corroborated independently** by the committed api-extractor report
  `packages/platform/etc/platform-editor.api.md:96-127` — the same 22 members. Two sources, one conclusion.

**Branch reality, and one thing that makes the rest of this spike trustworthy.** `origin/platform-yalc`
is `main` as of `e7113f4` (2026-07-20) **+ one README commit** — i.e. 4 commits behind `main`. But
`git diff origin/platform-yalc main -- libs/shared-react/src/plugins/usj/collab/ libs/shared-react/src/nodes/usj/`
is **empty**: every delta-engine and node file cited below is identical on the shipped branch and on
`main`. Only `packages/platform/src` differs (the USJ tables work, #494). So reading `main` was safe here
— but that is a fact about today, not a standing guarantee; re-check it if this spike is revisited.

#### A2. Mechanism B is **not viable**. Two independent blockers — neither is the one the plan expected

The plan expected the blockers to be "no exported index helper" and "`OTCharItem`/`OTCharAttribute` not
exported," and hoped the ask would shrink to _export two types + one helper_. The type export turned out
to be a non-issue; the index turned out to be worse than expected.

1. **No selection→OT-index path exists anywhere in the upstream tree, public or private.**
   `getSelection()` returns `SelectionRange` = `{ jsonPath, offset }` (`dist/index.d.ts:721-726`), not a
   flat index. A tree-wide grep for `otIndex|flatIndex|getOtLength|selectionToOt|toOtIndex|editorToDelta|lexicalToDelta`
   returns **zero** hits outside `delta-apply-update.utils.ts`'s own local `currentIndex` loop counters.
   The only lexical→delta direction that exists is `getEditorDelta(editorState)`
   (`editor-delta.adaptor.ts:72`) and `$getParticularNodeOps` (`:105`) — **neither is exported from the
   package**, and neither answers "what flat index is my caret at."
   Computing it in paranext-core means re-deriving the whole OT length model in a consumer — text length,
   +1 per embed, +1 per block closing marker, `CharNode` contributing 0, note contents as nested ops —
   duplicating invariants that only the upstream tests protect. The failure mode is silent: a wrong
   `retain` formats the wrong words rather than throwing. This is why `applyUpdate` is documented
   EXPERIMENTAL.
2. **The index arithmetic is `markerMode`-dependent.** `MarkerNode extends TextNode`
   (`libs/shared/src/nodes/features/MarkerNode.ts:27`), and the engine's text branch is a bare
   `$isTextNode(currentNode) → getTextContentSize()`
   (`delta-apply-update.utils.ts:221-222`) with **no** marker-node exclusion. So under
   `markerMode: 'editable'` the synthesized `\nd `/`\nd*` text _is_ counted in the walk. Simple mode is
   `'hidden'`, so the demo path is unaffected — but any consumer-side index computation would have to
   model `markerMode` as well.

**The type export was never the blocker.** `DeltaOp = Op` from quill-delta (`dist/index.d.ts:121`), whose
`attributes` is an untyped `Record<string, unknown>` — so
`applyUpdate([{ retain: n, attributes: { char: null } }])` typechecks **today, with no upstream change**.
And exporting the types, if ever wanted, is **2 lines in 1 file**: `packages/platform/src/index.ts:63-89`
is a hand-maintained re-export list, and `collab/index.ts:5` already does
`export * from "./rich-text-ot.model"` (`OTCharItem` = `{ style: string; cid?: string }`,
`rich-text-ot.model.ts:24-28`).

Two further notes for the record: the engine's own removal is a bare `$unwrapNode(currentNode)`
(`delta-apply-update.utils.ts:398`, `:406`) with **no** `MarkerNode`-child stripping — so Mechanism B
carries the same `markerMode` edge case Mechanism A does, and cannot fix it from the consumer side. The
tested behavior at `delta-apply-update.utils.test.tsx:986-1018` is real and is exactly the N2 assertion
shape (`char: null` → CharNode unwrapped, siblings merged, `"bold text normal text"` intact) — it just
isn't reachable from a selection.

**Mechanism B stays in the plan only as what it now is: evidence that the removal semantics are already
specified and tested upstream.** It is not a fallback, because the fallback path is the expensive one.

#### A3. Recommendation: **Mechanism A**, and it is **5 hand-edited files, not 8**

Put the new function in the **existing** `packages/platform/src/editor/adaptors/usj-marker-action.utils.ts`
(354 lines) rather than a new `char-marker-action.utils.ts` in `libs/shared-react`. Reason: every
splitting primitive removal needs is **already module-private in that file**:

| Primitive                                                       | Location                             | Note                                                                                                   |
| :-------------------------------------------------------------- | :----------------------------------- | :----------------------------------------------------------------------------------------------------- |
| `getSelectionOffsets(selection)`                                | `usj-marker-action.utils.ts:264-268` | handles backward selections                                                                            |
| `$getTargetNode(node, isFirst, isLast, startOffset, endOffset)` | `:270-292`                           | **already skips `TypedMarkNode` and `NoteNode`** — that is the §4.2 "inside a NoteNode" case, for free |
| `handleTextNode(...)`                                           | `:294-312`                           | the 3-way `splitText(start, end)`                                                                      |
| `$wrapTextSelectionInInlineNode` / `$wrapNode`                  | `:214-253` / `:314-325`              | the wrap counterpart to mirror                                                                         |
| `isUsjMarkerSupported` / `getUsjMarkerAction`                   | `:81` / `:91`                        | the exported entry points to stay consistent with                                                      |

A new file in `libs/shared-react` would require **exporting all four** (4 new upstream surface items) or
duplicating them. Same file = zero new exports. See the revised file list on `PT-XXX-B1`.

#### A4. Unwrap primitive: **call `$unwrapNode` directly. Do not touch `$unwrapTypedMarkNode`.**

|                                | `$unwrapNode` from `@lexical/utils`                                                                                                                                                                           | Generalize `$unwrapTypedMarkNode`                                                                                                                |
| :----------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------- |
| Signature today                | `$unwrapNode(node: ElementNode): void` (`@lexical/utils/index.d.ts:271`) — **`CharNode extends ElementNode`, so it typechecks on a CharNode with no change**                                                  | `(node: TypedMarkNode)`; needs widening                                                                                                          |
| Already applied to `CharNode`? | **Yes** — `delta-apply-update.utils.ts:31, 398, 406`                                                                                                                                                          | No                                                                                                                                               |
| Implementation                 | One line over Lexical's caret API: `$rewindSiblingCaret($getSiblingCaret(node,'next')).splice(1, node.getChildren())` (`@lexical/utils/LexicalUtils.dev.mjs:1000-1002`) — maintained upstream, selection-safe | A hand-rolled `insertBefore`/`insertAfter` loop, explicitly commented _"adapted from lexical-mark"_                                              |
| New upstream surface           | **Zero**                                                                                                                                                                                                      | One widened signature                                                                                                                            |
| Blast radius                   | None outside the new function                                                                                                                                                                                 | **4 existing callers in the annotation and comment paths** — `AnnotationPlugin.tsx:160`, `CommentPlugin.tsx:775`, `TypedMarkNode.ts:329`, `:453` |

**`$unwrapNode` wins on every axis.** Generalizing `$unwrapTypedMarkNode` would put character-marker work
on the blast radius of comments and annotations, _and_ keep a second, staler copy of something
`@lexical/utils` already provides.

**Correction to this plan:** `$unwrapTypedMarkNode` is at
**`libs/shared/src/nodes/features/TypedMarkNode.ts:1341-1353`** (13 lines) — not
`libs/shared-react/src/nodes/usj/TypedMarkNode.ts` as earlier drafts of §0, §1.4 and `PT-XXX-B1` said.

**One addition the unwrap needs.** `$unwrapNode` alone does **not** strip synthesized marker children, so
under `markerMode: 'editable' | 'visible'` a bare unwrap leaves literal `\nd`/`\nd*` text in the
paragraph. Filter them first with `$isMarkerNode(child) || $isVisibleMarkerNode(child)` — both already
exported from `shared`; combined precedent at `libs/shared/src/nodes/usj/node.utils.ts:574-576`
(`$isParaMarkerPrefix`). ~3 lines. The plan's explicit test case stands.

#### A5. The **selection query needs no upstream work at all** — it already ships, and paranext-core already reads it

`StateChangeSnapshot.contextMarker` — _"The actual marker of the current selection"_ — is **already on the
public surface** (`dist/index.d.ts:740`, delivered via `EditorProps.onStateChange` `:237`) and is
**already wired into paranext-core**: state at
[web-view.tsx:317](../../extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx#L317),
set at
[:1852](../../extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx#L1852),
consumed at
[:1100](../../extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx#L1100).

It is computed at `StateChangePlugin.tsx:72-75` as `$getCommonAncestorCompatible(anchorNode, focusNode)`
filtered by `$isReactNodeWithMarker`. `$getCommonAncestorCompatible`
(`libs/shared/src/nodes/usj/node.utils.ts:340-348`) lifts a text node to its parent before taking the
common ancestor — so a caret inside `\nd Lord\nd*` yields `"nd"`, and a caret in plain paragraph text
yields `"p"`. **That is exactly OQ-1 Option A's query** ("the innermost marker containing the selection"),
available today. Combined with `isCharacterMarker` from `PT-XXX-C`, paranext-core can display and target
the character marker at the caret with **zero upstream change**.

**Three limits, stated so nobody is surprised later:**

1. It returns **one** marker, never the nesting stack. **OQ-1 Option B still needs new upstream API.**
2. A selection spanning a marked run **plus** adjacent plain text lifts to the `ParaNode`, so
   `contextMarker` is `"p"` — **indistinguishable from "no character marker."** Therefore **the
   prototype's `(mixed)` state cannot be derived from `contextMarker`.** If UX requires `(mixed)`, that is
   new upstream work, costed as a follow-on below rather than assumed into `PT-XXX-B1`.
3. `$updateState` only calls `onStateChange` when the top-level element is a Para / Book /
   ImmutableChapter (`StateChangePlugin.tsx:79-90`); otherwise it updates a ref and returns. In-chapter
   text is always inside a `ParaNode`, so the common path emits — but this is a real early return, and it
   is the same structural quirk §3 already warns about under "Do not extend `onStateChange`."

**Consequence for scope:** `PT-XXX-B1` drops the query and becomes **remove-only**. The full nesting stack
and `(mixed)` become an explicitly cuttable upstream follow-on gated on OQ-1 — _not_ required work, and
_not_ silently assumed. Recorded as `PT-XXX-B3`, **conditional on OQ-1 landing on Option B** — it is not on
the cut list, because it was never in the box (§5.2).

#### A6. The rejected USJ round-trip: the cost, with evidence

Documented as evidence rather than assertion, per the spike's brief. **Three separate destructive effects,
each traceable:**

**(a) Every annotation is destroyed.** paranext-core's own wrapper concedes this in code:
`setEditorUsj` ([web-view.tsx:575-578](../../extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx#L575-L578))
is `editorRef.current?.setUsj(usj); clearAnnotationInfo.current();` — clearing annotation state is not a
precaution, it is the required companion to `setUsj`, because setting the editor's USJ removes every
annotation from the tree. Comments and annotation highlights would be destroyed on **every** marker edit.

**(b) Undo history is wiped, so there is no recovery.** `setUsj` re-runs `LoadStatePlugin`, which does
`editor.setEditorState(editorState)` **followed by**
`editor.dispatchCommand(CLEAR_HISTORY_COMMAND, undefined)`
(`libs/shared-react/src/plugins/usj/LoadStatePlugin.tsx:57-62`). The marker edit's own undo entry is
erased along with everything before it. This is not hypothetical: the identical mechanism is an already-
diagnosed open bug in this repo — after a paragraph-style change, neither the Undo button nor Ctrl/Cmd+Z
reverts the marker, because the PDP save→echo→reload path calls `setUsj` and `LoadStatePlugin` clears the
history. (Investigated 2026-06-29 on `pt-4020-fix-undo-bug`; deferred.) So a round-trip implementation of
remove/change would ship a _known-reproducible_ undo failure, on the exact operation most in need of
undo.

**(c) It defeats the plan's own mitigation.** §1.5 relies on a pre-mutation
`paratextBibleSendReceive.commitChanges` snapshot as the "undo of last resort." That is a _version-history_
recovery — coarse, and it does not restore the destroyed annotations from (a).

**Verdict: this is not a fallback of last resort. It is not a fallback.** The correct fallback for a
`PT-XXX-B1` estimate miss is to ship `N1 (add)` alone (`PT-XXX-C` → `D` → wrapper, all in paranext-core,
no upstream dependency) and defer delete/change — not to reach for a mechanism that trades a missing
feature for silent data loss. §3's earlier "survives only as the emergency fallback" framing is hereby
withdrawn.

#### A7. Dev loop: verified by reading the scripts, with two gotchas — but **not executed live**

- `checkoutRevision` ([dev-package-utils.ts:81-109](../../.erb/scripts/dev-package-utils.ts#L81-L109))
  **throws if the dev repo has uncommitted changes**, then does `git fetch origin` → `git checkout
platform-yalc` → `git pull` (it skips the pull only on a detached HEAD). So the `platform-yalc`
  round-trip does work on `npm install`, and it _does_ pull.
- **Gotcha 1 — `npm install` will move your own upstream clone.** `getDevPackagePath`
  ([dev-package-utils.ts:53-57](../../.erb/scripts/dev-package-utils.ts#L53-L57)) prefers
  `dev-packages/scripture-editors`, else falls back to the **sibling** `../scripture-editors`. On a typical
  dev machine that is the developer's own working clone. A plain `npm install` in paranext-core will
  therefore **check out `platform-yalc` in it and pull** — silently switching branches, or hard-failing if
  there are edits. Do upstream work on a branch off `platform-yalc`, and expect `npm install` to move you.
  _(Observed: at spike time the sibling clone was on `main`, and its local `platform-yalc` was 11 commits
  behind `origin/platform-yalc`.)_
- **Gotcha 2 — `devpub` rewrites a tracked file it does not restore.** `devpub` is
  `predevpub` (`prepare-publish.ts` + `nx extract-api platform-editor`) → `yalc push` → `postdevpub`
  (`git restore package.json`). It restores `packages/platform/package.json`, but `nx extract-api`
  (`packages/platform/project.json:8-20`, `api-extractor run --local`) **rewrites
  `etc/platform-editor.api.md`, which is tracked and is not restored.** Expect it in your diff and commit
  it. Don't interleave `devpub` with other git work.
- ⚠️ **Not executed.** The spike did **not** run `nx devpub platform-editor` + `npm run editor:link` live.
  Doing so needs a `pnpm install` in the upstream repo, mutates that repo's `package.json`, and moves the
  sibling clone off whatever branch it is on. The mechanism is verified statically; **the live round-trip
  remains an open pre-sprint step** — see §11.

#### A8. Estimate verdict

| Ticket      | Before                                             | After                                                              | Why                                                                                                                                                                                                                                                                                                                                   |
| :---------- | :------------------------------------------------- | :----------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `PT-XXX-B1` | Medium-high certainty, 8 files, remove **+ query** | **High certainty, 5 hand-edited files + 1 generated, remove only** | Query deleted (A5). Unwrap is a library call (A4). All four splitting helpers reused in-file (A3). What remains is one composed function + tests.                                                                                                                                                                                     |
| `PT-XXX-B2` | High certainty                                     | **High, confirmed, and cheaper**                                   | `CharNode.setMarker` (`CharNode.ts:184`) is the whole mutation, already used this way at `delta-apply-update.utils.ts:366`. `canBeEmpty(): false` (`CharNode.ts:259`) plus `$charNodeTransform` (`CharNodePlugin.tsx:39-68` — removes empty CharNodes, merges adjacent same-attribute siblings) give cleanup and coalescing for free. |

Note for OQ-1: `$charNodeTransform` merges only **adjacent siblings**, not nested duplicates — so §3's
"nested `\nd` inside `\nd` is a reachable state today" note stands, verified again at
`CharNodePlugin.tsx:48-68`.

#### A9. Acceptance criteria: what was and was not delivered

| AC                                                                                     | Status                                                                               |
| :------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------- |
| Written recommendation, Mechanism A or B, with file-level change list                  | ✅ **Mechanism A** — A2, A3, and `PT-XXX-B1`'s revised list                          |
| Unwrap primitive decision + smaller blast radius                                       | ✅ **`$unwrapNode` directly** — A4                                                   |
| Confirmation with `file:line` that no public removal API exists in the shipped version | ✅ A1 — two independent sources                                                      |
| `PT-XXX-B1`/`B2` estimates confirmed or revised                                        | ✅ A8 — both revised down                                                            |
| One-paragraph note on the annotation/undo cost of the USJ round-trip                   | ✅ A6                                                                                |
| yalc dev-link round-trip demonstrated live                                             | ❌ **Not run** — A7, with the reason. Mechanism verified statically; carried to §11. |
| `platform-yalc` round-trip confirmed after `npm install`                               | ⚠️ Verified by reading `checkoutRevision`, **not executed** — A7                     |
| OQ-1 posted to the epic owner and UX                                                   | ❌ **Human action, still outstanding** — §11                                         |

---

### ✅ RESOLVED — UX meeting with Alex, 2026-07-30

Notes from the Implementation Owner's meeting with Alex Mercado. **This section supersedes OQ-2 and
materially reshapes `PT-XXX-D`, `PT-XXX-D2`, and the upstream B-series.** Items answered from the repo
after the meeting are marked **[verified]** with evidence; items Alex left open are promoted to numbered
open questions below.

#### U1. Placement: **Side**, and it must be built to extend

UX prefers the **Side** variant. Two extension requirements come with it, and they are requirements _on
the container_, not future tickets:

1. **More buttons later** — footnotes, comments (`PT-XXX-J`'s content).
2. **Built on top of later** — the side ↔ floating switch (`PT-XXX-F3`) and the drag handle (`PT-XXX-F4`).

So `PT-XXX-D` is no longer "a control." It is a **slot-based container that happens to hold one control
at first.** That is a design constraint from day one — retrofitting slots later is the expensive path.
`PT-XXX-J`/`F3`/`F4` stay out of scope to _build_, but the container must not preclude them.

✅ **The overlap sub-question is closed — see OQ-8, decided 2026-07-30.** Alex described the Side bar
overlapping the tabs in the next docking column "if it needs to." That is **not possible from inside a web
view** — the editor is an iframe and iframe content cannot draw over a sibling dock panel — and it was not
raised in the meeting. **Decision: build it clamped inside the editor web view and defer the overlap** to
separate core work. Alex needs an acknowledgement of that, not an answer (§11 → A1).

#### U2. `(mixed)` is **required**, and it goes in the button's placeholder text

Confirmed in scope. Cost is unchanged from spike A5 + the `(mixed)` analysis: **paranext-core only, no
upstream work** — `getSelection()` + `UsjReaderWriter`, following the existing precedent at
[web-view.tsx:679-681](../../extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx#L679-L681).

#### U3. Three selection states per marker row: **partial / all / none**

The menu must show, per marker, whether the current selection is **partially**, **fully**, or **not**
covered by it. For selection `kolo ` + `\bd Mulu\bd*`, the trigger reads `(mixed)` and the list shows
**both** `bd` and _(none)_ as **partially** selected.

⚠️ **This is new UI in a shared component, and it is the one place the meeting's "reuse existing
components" principle cannot be honored as-is.** Verified:

- `MarkerMenuItem` ([marker-menu.component.tsx:44-70](../../lib/platform-bible-react/src/components/advanced/marker-menu.component.tsx#L44-L70)) has `marker`, `title`, `subtitle`, `icon`, `isDeprecated`, `isDisallowed`, `action` — **no selection-state field of any kind.**
- **No tri-state / indeterminate component exists** anywhere in `platform-bible-react`. The only `indeterminate` hit is TanStack row-selection inside `data-table.stories.tsx`; `filter-dropdown.component.tsx` uses plain booleans.

So this is an additive change to `MarkerMenu` plus a new tri-state affordance — reuse the _component_,
extend its item contract. Sized on `PT-XXX-D`.

#### U4. The toggle cycle, and a **third mutation verb: extend**

Alex's specification: from a mixed selection the cycle is **partial → all → none → all → none …**

Worked through against `kolo ` + `\bd Mulu\bd*`:

| Click              | Meaning                                                                                                  | Mechanism                                                                                                             |
| :----------------- | :------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------- |
| 1st (from partial) | **Extend** — the `\bd` moves to before the first letter of the selection, so the whole selection is bold | see below                                                                                                             |
| 2nd (from all)     | **Remove all** `\bd` in the selection                                                                    | `removeCharMarker` — already `PT-XXX-B1`, whose test list already includes "selection spanning two sibling CharNodes" |
| 3rd onward         | all → none → all …                                                                                       | alternating the two above                                                                                             |

**Extend is not "wrap" and not "replace"** — a naive `insertMarker('bd')` over the whole selection
produces `\bd kolo \bd Mulu\bd*\bd*`, nested identical markers. **[verified] But it is cheaper than it
looks, because the coalescing already exists:** `$charNodeTransform`
(`CharNodePlugin.tsx:48-68`) merges adjacent CharNodes with the same marker and attributes,
automatically. So extend decomposes into:

1. Compute per-marker coverage across the selection → **paranext-core**, same `getUsj()` + `UsjReaderWriter` pass that produces `(mixed)` and the tri-state. One analysis feeds all three.
2. Apply the marker **only to the uncovered gaps** → **upstream**, `PT-XXX-B4`.
3. Adjacent same-marker CharNodes coalesce → **free**, existing transform.

That is a new upstream method, but it composes existing primitives rather than inventing an algorithm —
the same shape as `PT-XXX-B1`. Tracked as **`PT-XXX-B4`**.

#### U5. Ira's overlapping-groups work — **[verified] it exists, but it does not transfer**

Alex believed Ira had already planned or written code for "two overlapping groups become three groups."
That is correct, and it is upstream — but it is in the **annotation** layer, not the character-marker
layer:

- `TypedMarkNode` carries `TypedIDs = { [type]: string[] }` — **many ids on one node** (`TypedMarkNode.ts:150, 407-432`), with a dedicated `typedMarkOverlap` theme applied when `nextIDsCount === 2` (`:257-269`).
- `$wrapSelectionInTypedMarkNode` (`TypedMarkNode.ts:1355+`) does the 3-way `splitText(startTextOffset, endTextOffset)`, and nesting is resolved by `registerNestedElementResolver<TypedMarkNode>`.

**Why it doesn't transfer:** a `TypedMarkNode` represents overlap by holding multiple ids simultaneously.
A `CharNode` holds exactly **one** `__marker` (`CharNode.setMarker(marker: string)`, `CharNode.ts:184`)
and represents overlap by **nesting**. So the three-groups pattern is a **reference implementation to
copy the splitting from, not code to call.** Worth reading before `PT-XXX-B4`; do not plan on reusing it.

#### U6. **[verified] Yes — every character marker is a sandwich. One exception, already known.**

Alex asked whether all inline character markers have a beginning and an end marker. Counted directly from
[usfm-markers.ts](../../lib/platform-bible-utils/src/markers/usfm-markers.ts):

> **58 markers are `MarkerType.Character`. All 58 have `hasEndMarker: true` — except `v`, which is
> `hasEndMarker: false`.**

And `v` is the documented quirk this plan already excludes: verse is a _structure_ marker mistyped as
`MarkerType.Character` ([usfm-markers.ts:887-888](../../lib/platform-bible-utils/src/markers/usfm-markers.ts#L887-L888)),
and `isCharacterMarker` (`PT-XXX-C`) filters it out by name. So **within the set this feature operates on,
sandwiching is universal** — `removeCharMarker`/`replaceCharMarker`/extend never have to handle a
self-closing character marker. Good news: it removes a whole branch of edge cases.

🚨 **Correction, 2026-07-30 (`PT-XXX-C` design).** The count and the conclusion both hold — sandwiching
_is_ universal within the operating set — but two details in the paragraph above are wrong. (1)
`isCharacterMarker` filters `v` out **by category, not by name**, because (2) `va`, `vp` and `ca` are
`MarkerType.Character` too and must also be excluded; all three are sandwiches, so `hasEndMarker` does not
separate them. The operating set is **54 markers, not 58**. Full detail in the correction under §1.4
item 1.

#### U7. **[verified] Comments already work on sub-verse selections. Footnotes are point-anchored.**

Alex asked whether footnotes and comments can be created on a selection smaller than a whole verse.

**Comments: yes, today.** `insertCommentAtCurrentSelection` builds an `annotationRange` from
`selection.start`/`selection.end` — character offsets **within** a text node
([web-view.tsx:654-658](../../extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx#L654-L658))
— and when the cursor is collapsed it **expands to the surrounding word** by walking non-whitespace
([:722-744](../../extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx#L722-L744)).
That is sub-verse by construction.

⚠️ **But there is a constraint that bears directly on U3/U4.** The same path rejects any selection
spanning more than one USJ node:

```js
// web-view.tsx:679-681
const selectionHasMarker =
  !isStartNodeAString || startNodeAndDocumentLocation?.node !== endNodeAndDocumentLocation?.node;
```

…and warns `%webView_platformScriptureEditor_error_selectionContainsMarkers%`. **So a comment cannot
currently cross a character-marker boundary** — exactly the `(mixed)` selection shape U3 is about. If the
Side bar is going to host a comment button (U1), a user who selects `kolo \bd Mulu` will get a working
marker toggle and a _rejected_ comment from the same selection. That inconsistency needs a UX answer →
**OQ-9**.

**Footnotes: point-anchored, so "a portion of a verse" is the wrong frame.** A USFM note is inserted _at
a position_ (`\f + \ft …\f*`), not across a span — `insertMarker('f')` and the deprecated
`insertNote(marker, caller?, selection?)` place a caller. So a footnote can go anywhere inside a verse,
but it does not "cover" a range. Worth saying back to Alex plainly, since the question assumed span
semantics.

#### U8. Reuse existing components — recorded, with the one exception

Endorsed and already the plan's posture (§1.3). `MarkerMenu`, the docked-popover pattern, `usfmMarkers`,
`UsjReaderWriter`, and `$charNodeTransform`'s coalescing are all reused. **The single exception is U3's
tri-state**, which needs an additive change to `MarkerMenuItem` rather than a new picker.

---

### ✅ OQ-1 — RESOLVED 2026-07-29: **Option A, innermost marker at the caret**

**Answered by driving the hosted prototype** — the plan's first _verified_ class-3 claim (see the evidence
grades in Terminology; every prior prototype claim was read from source, not observed).

**What was observed** (Implementation Owner, 2026-07-29): with one word made bold, placing the caret inside
that word shows **bold** in the menu, and remove/change act on it. Placing the caret before or after the
word shows **no marker**. So the target is **where the cursor is and which marker is right there** — not
the verse, not a containing scope.

**That is Option A exactly**, and it needs **no upstream work**: `StateChangeSnapshot.contextMarker` already
computes it as `$getCommonAncestorCompatible(anchor, focus)` filtered by `$isReactNodeWithMarker`
(`StateChangePlugin.tsx:72-75`), and paranext-core already stores it
([web-view.tsx:317](../../extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx#L317)).
Caret inside `\bd` → `"bd"`; caret in plain text → `"p"`, which `isCharacterMarker` filters out. Same model,
arrived at independently.

**Consequences:** `PT-XXX-B1` loses its query (spike A5). `PT-XXX-B3` is **closed, not deferred** — the
nesting stack is not needed and `(mixed)` turned out to be derivable in paranext-core.

**One deliberate divergence from the prototype, recorded so nobody "fixes" it later.** For _nested_ markers
the prototype reports the **outer** one — an artifact of its detection regex
(`\\(wj|bk|…)\s([\s\S]*?)\\(\1)\*`, whose lazy match consumes the whole outer span so the inner marker is
never seen as a separate match), not a design intent. **We use innermost**, because it is what the
Implementation Owner described wanting, it matches the paragraph switcher's local-scope model, and it is
what the shipped editor gives us free.

**Historical framing below** — kept because the three options are still the reference if Option B is ever
revisited.

**Status: open question. Blocks the API shape of `PT-XXX-B1`/`B2` and the UI of `PT-XXX-E1`/`E2`; does
NOT block `PT-XXX-A`, `PT-XXX-C`, `PT-XXX-D`, or the halfway demo.**

_Posting text — copy this to the epic owner and UX:_

> When a user's cursor or selection sits inside character-marked text, **which marker(s) should the
> change/delete UI act on?** Character markers can nest (`\wj ...\nd Lord\nd* ...\wj*`) and a
> selection can span two differently-marked runs. Today the editor can only tell us **one** marker —
> the innermost element that fully contains the selection — so anything beyond that is new upstream
> API work.
>
> **Option A — innermost marker at the caret only.** Act on the single innermost character marker
> containing the cursor. Selections spanning two differently-marked runs are disabled with an
> explanatory message. _Smallest upstream surface; leans on what the editor already reports._
>
> **Option B — every marker touching the selection.** Show all overlapping markers as removable chips
> and let the user pick. _Best UX and closest to "see markers in context of other markers"; needs a
> new upstream query returning the full nesting stack plus partial-coverage flags, and forces
> decisions about partially-covered markers._
>
> **Option C — innermost, but selection-aware.** Act on the innermost marker; when a selection spans
> several marked runs, apply/remove uniformly across all of them (toggle semantics, like bold).
> _Middle ground; simpler contract than a full marker list._
>
> **Recommendation: Option A for v1.** The spike found that Option A's query **already ships and is
> already wired into paranext-core** — `StateChangeSnapshot.contextMarker` is the innermost marker
> containing the selection, needing no upstream work at all (see A5). Option B needs a genuinely new
> upstream query, so it is a real cost rather than the near-free extension an earlier draft assumed.

**Scope assumption used throughout:** Option A. **Updated by the spike (A5):** Option A now costs
_nothing_ upstream, so Option B's incremental cost is higher than earlier drafts stated — it needs a new
upstream nesting-stack query (`PT-XXX-B3`, cut list) **plus** the `PT-XXX-E1` chip UI. This is still
**the largest uncontrolled scope risk in the plan**, and the most likely reason something from §5.2 would
have to come out. A related consequence: the prototype's **`(mixed)`** state is part of Option B's cost,
not free with Option A — `contextMarker` cannot distinguish "spans two markers" from "no marker" (A5,
limit 2).

_Related fact worth handing to UX:_ nested identical markers are a **reachable state today**.
`$wrapTextSelectionInInlineNode` has no depth cap and no validity check, and the `CharNodePlugin`
transform merges only _adjacent siblings_, not nested duplicates — so `\nd` inside `\nd` can exist in
a real project. The delete UI needs a defined behavior for it. Note also that
[Testing-Guide.md:262-270](../../.context/standards/Testing-Guide.md#L262) names "USFM semantics" as
an explicit stop-and-ask area, so this needs product sign-off, not an engineering guess.

### ✅ OQ-2 — RESOLVED 2026-07-30: **Side (Variant B) ships**

**Status: answered by UX (§3 → U1).** `PT-XXX-D2` is now **required**; `PT-XXX-D1` becomes the NTH **and
the demo-protection fallback**. The late-binding structure did its job — no tickets were re-cut, only
their required/NTH status swapped.

**Two things came with the decision, and both change `PT-XXX-D`:** the container must be slot-based so
more buttons (`PT-XXX-J`) and the switch/drag affordances (`PT-XXX-F3`/`F4`) can be added later without
rework (U1).

✅ **The overlap sub-question is resolved — OQ-8, decided 2026-07-30:** build it clamped inside the editor
web view, defer overlapping the adjacent column to separate core work. **What is now live instead is how
much horizontal space the bar may take, and whether the text column narrows** (§11 → A2) — a UX call,
because it changes what every Simple-mode user sees.

**Historical framing below, kept because §2's costed comparison is still the reference for the fallback.**

**Status: open, and deliberately late-bindable.** The plan is structured so this can be answered after
the UX conversation without re-cutting tickets — `PT-XXX-D` builds the control, and `PT-XXX-D1` /
`PT-XXX-D2` are thin wrappers. Exactly one is required; the other becomes an NTH.

|                    | **Variant A — Fixed** (toolbar) | **Variant B — Side** (gutter)                                                                                                                 |
| :----------------- | :------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------- |
| Relative size      | **Smaller**                     | **Larger**                                                                                                                                    |
| Reaches a demo     | Sooner                          | Later, with a fallback                                                                                                                        |
| **H1**             | **Partial** — clause 1 only     | **Covered** — both clauses                                                                                                                    |
| Prototype fidelity | One of three values             | One of three values, **and the default**                                                                                                      |
| Hidden-view work   | Not needed                      | **On the critical path**                                                                                                                      |
| Open sub-question  | —                               | **Gutter space conflict — §2.2.** The 4em gutter already holds paragraph markers; the prototype's bar is ~7.4em. Share / widen / sit outside? |

**Recommendation: Variant B**, if we have two developers (§6.4) or `PT-XXX-A` runs pre-sprint (§6.5).
Variant A is the right call if the sprint is tight — it is less work and carries none of the open
questions.

**The sub-question in §2.2 matters more than the estimate.** Take it to UX: the gutter is already
occupied by paragraph marker labels, so Variant B needs a decision about sharing, widening, or sitting
outside the text column. That shapes what Variant B _looks like_.

**Largely resolved.** The prototype was obtained as a React source export on 2026-07-28 and analyzed
(see §2 and the Terminology section). We now know the affordances: a single **Character Style**
combobox whose `(none)` row is the remove affordance, a `(mixed)` state for selections spanning more
than one marker, search over both friendly name and marker code, and three **Toolbar Position**
values. That answers the "what does it look like" half of this question.

**What remains open is a scope decision for Todd, not an engineering one:**

1. **Is Fixed-only acceptable for N1?** N1 says "in a usable way (propose similar to magic patterns
   prototype)" and says nothing about placement. Fixed _is_ one of the prototype's three Toolbar
   Position values, so Fixed-only is defensibly "similar to the prototype." But the prototype's
   **default is Side** — so if Todd and Alex have been evaluating it in Side mode, "similar to the
   prototype" may mean Side to them. **Confirm which placement they consider the design.** If the
   answer is Side, swap `PT-XXX-F1` and `PT-XXX-D`'s required/cut status; the ticket _structure_ does
   not change, only which one is required.
2. **Does Fixed-only satisfy H1?** H1 has two clauses. Fixed satisfies "UI does not overlap project
   text" trivially. It satisfies "**so user can see where the marker(s) will be inserted in context of
   other markers**" only weakly — a toolbar at the top of the panel is far from the text in question.
   Side and Floating are what actually serve that clause. H1 is a nice-to-have, so accepting the
   weaker reading is legitimate — but it should be an explicit decision now, not a surprise at the
   demo.

`PT-XXX-I` is the reconciliation checkpoint, but **both questions above should be settled before the
sprint starts**, because (1) determines which placement ticket is required.

### ❓ OQ-3 — Alex Mercado's four questions as concrete NTHs

**Status: open question for Todd. Non-blocking.**

Todd's pushback in the doc is fair — they were phrased as questions, so here they are as statements he
can accept, reject, or edit. Three are cheap; the fourth is already a no-go.

| Alex's question                                                 | Proposed NTH wording                                                                                         | Assessment                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| :-------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Can the overlay appear left, right, above, below?               | "The marker UI can render in more than one location — gutter, near the line, or in the toolbar."             | **Partly required, partly NTH.** Under Variant B the control already sits beside the text with viewport clamping (`PT-XXX-D2`). _Additional_ render locations are `PT-XXX-F1` (Floating) and whichever of `D1`/`D2` UX doesn't pick.                                                                                                                                                                                                                                                                                                                                                                                         |
| Can it be dragged around?                                       | "The user can reposition the marker UI by dragging it."                                                      | **Accepted as an NTH** — `PT-XXX-F4`, explicitly the **last** NTH to pick up. Earlier drafts recommended rejecting it; the implementation owner confirmed 2026-07-28 that it is wanted. Still a genuine rabbit hole: no drag precedent in the repo, and it fights the auto-repositioning the Side and Floating placements rely on.                                                                                                                                                                                                                                                                                           |
| Can we add other button triggers to the floating menu?          | "The marker UI accepts additional actions (e.g. insert footnote, insert cross-reference) without re-layout." | **Cheap and worth doing** — `TabToolbar` already has slot-based composition. Its own ticket, `PT-XXX-J` (cut-list), per the structural-separation rule.                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| Does the picker follow USFM grammar to narrow to valid markers? | —                                                                                                            | **Already PRD no-go #2.** For orientation: today's `\` menu is _already_ parent-scoped via `usfmMarkers[parentMarker].children` ([utils.ts:423-424](../../extensions/src/platform-scripture-editor/src/platform-scripture-editor.utils.ts#L423)), so a weak version ships for free. True stylesheet-driven validity would need `.sty` parsing in TS (does not exist) and `OccursUnder`/`StyleType` over PAPI (not exposed — `platformScripture.MarkerNames` returns display strings only, [ParatextProjectDataProvider.cs:2482-2489](../../c-sharp/Projects/ParatextProjectDataProvider.cs#L2482-L2489)). Correctly a no-go. |

### ✅ OQ-4 — DECIDED 2026-08-03: **Simple only, and Power mode does not change at all**

**Status: decided by the Implementation Owner. No longer an assumption, and no longer a question to
carry into the sprint.** §11 → T4 and §11 → item 6 are closed by this.

**The decision has two halves, and the second is the new one:**

1. **Ship to Simple only**, gating on `platform.interfaceMode`, per the PRD rabbit hole ("Do what is
   needed for Simple, and let Power team improve it, if necessary"). Unchanged from the prior assumption.
2. **No change in this plan may alter Power-mode behavior.** Not "we won't build the UI for Power" —
   _nothing a Power user sees or does may differ from today._ This is a requirement on shared code, and it
   is what the earlier framing left implicit.

**Why the second half needed writing down.** The editor web view, `MarkerMenu`, `usfmMarkers`,
`_usj-nodes.scss` and the upstream editor package are all shared between the modes, so several tickets in
this plan touch Power-mode code by default. Two examples that a "gate the component" instruction alone
does not catch:

- **`PT-XXX-D2`'s reserved right gutter** is a stylesheet change. It narrows the text column in _both_
  modes unless the selector is Simple-scoped — a React gate around the component does not gate the CSS
  (§2.2, §1.6).
- **`PT-XXX-E1`'s optional context-menu item** appends to `EditorOptions.contextMenu`, one array serving
  both modes. Appending unconditionally puts a new item in Power's right-click menu.

**The mechanism, in full: §1.6.** One gate (`!isPowerMode`) per mount point, shared layers left
mode-agnostic but **inert in Power**, and three shared surfaces named as off-limits (`isBlockMarker`, the
`\` keydown path, the footnote editor's duplicate menu). Un-gating for Power remains a one-line change
with a comment naming the deferral — the seam is deliberate, exactly as the PRD asks.

Note that menu contributions have **no** declarative `when`/`visibility` field, so the `PT-XXX-G` menu
item must be mode-gated in code (don't register the command) rather than in JSON.

### ❓ OQ-5 — Nest, replace, or extend? _(for UX + the epic owner)_

**Status: partly answered by U4, and the answer is "none of the two options this plan originally
assumed."** Recorded as an open question because a case remains undefined.

The plan originally asserted, without a source, that change **must replace** rather than nest
(`PT-XXX-E2`). Two pieces of evidence have since arrived:

- **The prototype always nests and never replaces.** `applyFormat` is a blind string wrap
  (`useTranslationState.ts:741-774` in the export) with no check for an existing marker, so picking `nd`
  on bold text yields `\bd \nd word\nd*\bd*`. Its combobox displays a _single_ `activeCharStyle` while its
  write path is purely additive — the prototype is internally contradictory here, so it cannot be cited
  as the specification.
- **UX's actual answer (U4) is "extend."** For the _same_ marker over a partially-covered selection, the
  existing marker grows to cover the selection. That is neither nest nor replace.

**What is still undefined: a different marker on an already-marked selection.** Selection is fully `\bd`;
user picks `nd`. Three defensible outcomes — nest (`\bd` containing `\nd`, valid USFM), replace (`\nd`
only), or reject. U4's cycle only specifies same-marker behavior. **Note this interacts with OQ-6:** if
`bd` and `nd` are mutually exclusive, the answer is forced to replace; if they can coexist, it is a real
choice.

Also still open, and a genuine product question rather than an engineering one: **if the discoverable
control never nests, is `\` the only way a Simple user can create legitimate nesting** (`\wj` containing
`\nd`)? That may be acceptable — but it should be decided, not defaulted.

Per [Testing-Guide.md:262-270](../../.context/standards/Testing-Guide.md#L262), USFM semantics is an
explicit stop-and-ask area, which is why this is not an engineering judgment call.

### ❓ OQ-6 — Which character markers are mutually exclusive? _(for UX + Paratext domain expertise)_

**Status: open. Blocks the third branch of `PT-XXX-B4`/`E2`'s action logic. Does not block the demo.**

Alex raised a third category beyond partial/all/none: **some inline styles cannot coexist**, so applying
one must remove the other. Alex did not know which pairs.

This plan cannot answer it from the repo, and that is itself a finding:

- `usfmMarkers` has **no** mutual-exclusion or conflict data — only `category`, `type`, `description`, `hasEndMarker`, `children`.
- True stylesheet-driven validity would need `.sty` parsing in TypeScript (**does not exist** — [utils.ts:398-400](../../extensions/src/platform-scripture-editor/src/platform-scripture-editor.utils.ts#L398) says so verbatim) and `StyleType`/`OccursUnder` over PAPI (**not exposed** — `platformScripture.MarkerNames` returns display strings only).

So a v1 answer has to be a **hand-curated list**, and it needs a domain expert. Obvious candidates are
within `CharacterStyling` — `bd` / `it` / `bdit` are plainly one family (`bdit` _is_ the combination), and
`em` overlaps semantically. Semantic markers (`nd`, `wj`, `add`) look orthogonal to styling ones.

**Recommendation: ask for the `bd`/`it`/`bdit` family only for v1**, hard-code that one rule with a comment
pointing here, and treat everything else as coexisting. Expanding a curated list later is cheap; guessing
at USFM semantics now is exactly what the stop-and-ask rule forbids. ⚠️ **Do not** let this grow into
stylesheet parsing — that is PRD no-go #2.

### ❓ OQ-7 — What should toggling do to whitespace and punctuation at the selection edges? _(for UX)_

**Status: open. Affects `PT-XXX-B4` and the toggle cycle's felt quality, not its feasibility.**

Alex flagged awareness of "hidden characters with styles like spaces or punctuation." Two distinct cases:

1. **Selection edges land on whitespace.** Extending `\bd` over `kolo ` + `Mulu` — does the trailing space before the marked run get included? A marker that ends mid-space produces `\bd kolo \bd*` with a trailing space inside the marker, which round-trips to USFM as a visible oddity.
2. **A marker covering only whitespace or punctuation.** Reachable, and it renders as nothing visible while still existing in the USJ — a marker the user cannot see or click into.

There is **existing precedent worth copying rather than inventing**: the comment path already normalizes
selection edges by walking non-whitespace outward
([web-view.tsx:722-744](../../extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx#L722-L744)),
and it says in a comment that this is a stand-in for the backend's project-aware definition of
whitespace. Upstream, `$moveLeadingSpaceToPreviousNode` (`usj-marker-action.utils.ts:327`) **already moves
a leading space out of a newly-wrapped inline node** — so the insert path has an opinion about this today.

**Recommendation: match the existing behaviors rather than design new ones** — trim leading/trailing
whitespace out of an extend, mirroring `$moveLeadingSpaceToPreviousNode`. Confirm with UX, then make it an
explicit test case rather than emergent behavior.

### ✅ OQ-8 — DECIDED 2026-07-30: **build it clamped inside the editor web view; defer the overlap**

**Decided by the Implementation Owner, not by UX** — Alex did not comment on overlap in the meeting, so this
is a scoping decision made to unblock `PT-XXX-D2`, not a UX ruling. **It needs an acknowledgement from Alex
(§11 → A1), but it is no longer a blocker.**

**The decision:** the Side bar renders **inside the scripture editor web view and clamps to that panel.**
It never attempts to draw over an adjacent docking column. Overlapping columns becomes **later, separate
work** — see "Deferred" below.

**Why this is a sound trade:**

- It unblocks the placement UX actually asked for. Everything users care about — Side position, `(mixed)`, the tri-state, extend, remove — is unaffected by the clamp.
- The overlap was never load-bearing for any PRD row. H1 asks that the UI _not overlap project text_ and that markers be visible _in context_; both are satisfied by a clamped Side bar. Overlapping a _neighbouring panel_ serves neither clause.
- It **removes `PT-XXX-D2`'s hardest risk before any code is written**, which is the cheapest moment to remove a risk.

**⚠️ The next design decision this forces — and it is now the live one (§11 → A2).** Clamping inside the
panel leaves two sub-options, and they differ on **H1 clause 1**:

|                                                   | Reserve space                                                                                                        | Float over the margin                                                                    |
| :------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------- |
| Mechanism                                         | Create a real right gutter — reserve ~7.4em of `padding-inline-end`, mirroring how the start-side gutter works today | Absolutely position over the existing right margin without reserving anything            |
| **H1 clause 1** ("does not overlap project text") | ✅ **Guaranteed** — the bar is outside the text's box by construction                                                | ⚠️ **At risk** — a long line, a wide window, or a zoomed font can put text under the bar |
| Cost to users                                     | **Narrows the text column for every Simple-mode user** — a visible change                                            | No narrowing                                                                             |

**Recommendation: reserve.** H1 clause 1 is the one thing the Side placement was chosen to deliver in full
(§10), and "usually doesn't overlap" is not the same promise. Take the exact width to Alex with the §2.2
question, since narrowing the text column is his call to make, not an implementation detail.

**Deferred — what "overlapping columns later" actually requires.** Not a styling change:

- Web views are `<iframe>`s ([web-view.component.tsx:108](../../src/renderer/components/web-view.component.tsx#L108)), and **iframe content is clipped by the iframe element** — no z-index, negative margin, or portal changes that, because Radix portals into the _iframe's_ `document.body`. §2.5 says the same for the Floating placement.
- The prototype gets overlap for free because it is **one document with no iframes**. `MainEditorSection.tsx:47` passes `containWithinRef={editorSectionRef}`, so the bar is logically contained to the editor section — with no clipping boundary between sections, it simply spills.
- **There is a purpose-built escape hatch, and it is the path for the deferred work.** `papi.overlays.showPopover` renders in the renderer's top-level document precisely because "extensions running in sandboxed WebView iframes cannot render UI above other content" ([overlay.service-model.ts:1-6](../../src/renderer/services/overlays/overlay.service-model.ts#L1-L6)), and it translates an iframe-relative anchor rect. Two production consumers already use it.
- **But it cannot carry this control today**: `PopoverContent` is a closed union — `'text' | 'markdown' | 'card'` ([:36-57](../../src/renderer/services/overlays/overlay.service-model.ts#L36-L57)) — with no arbitrary-component option, so it cannot host `MarkerMenu` and its search. **The deferred work is therefore "extend the overlay service to accept component content," which is core work affecting two existing consumers — outside this feature's appetite and correctly deferred.**

**Historical framing below**, kept because it is the evidence behind the decision and the posting text is
still what to send Alex if he wants to revisit.

**Status: open, and it is the one question that could invalidate the placement UX just chose.** Raise this
before `PT-XXX-D2` starts.

Alex described the Side bar sitting in a right-hand gutter and overlapping the tabs in the following
docking column "if it needs to." **That is not achievable from inside the scripture editor web view**,
and it is a platform boundary rather than a styling problem:

- Web views are `<iframe>` elements ([web-view.component.tsx:108](../../src/renderer/components/web-view.component.tsx#L108)). **Iframe content is clipped by the iframe element** — no z-index, negative margin, or portal changes that, because Radix portals into the _iframe's_ `document.body`. §2.5 already states this for the Floating placement; it applies identically to Side.
- **The prototype gets it for free because it is one document with no iframes.** `MainEditorSection.tsx:47` passes `containWithinRef={editorSectionRef}`, so the bar is logically contained to the editor section — but with no clipping boundary between sections it simply spills over the neighbour.
- **There is also no right gutter to sit in.** The editor's only gutter is inline-start, `--psc-gutter-width: 4em`, holding paragraph markers ([\_usj-nodes.scss:2438-2502](../../extensions/src/platform-scripture-editor/src/_usj-nodes.scss#L2438-L2502)). The `padding-right: 4em` further down is the **RTL mirror of that same gutter** ([:2646-2649](../../extensions/src/platform-scripture-editor/src/_usj-nodes.scss#L2646-L2649)), not a second one.

**A purpose-built escape hatch exists, but it will not carry this control.** `papi.overlays.showPopover`
renders in the renderer's top-level document specifically because "extensions running in sandboxed WebView
iframes cannot render UI above other content"
([overlay.service-model.ts:1-6](../../src/renderer/services/overlays/overlay.service-model.ts#L1-L6)), and
it translates an iframe-relative anchor rect. Two production consumers already use it. **But
`PopoverContent` is a closed union — `'text' | 'markdown' | 'card'`
([:36-57](../../src/renderer/services/overlays/overlay.service-model.ts#L36-L57))** — with no
arbitrary-component option, so it cannot host `MarkerMenu` and its search.

_Posting text — copy this to Alex:_

> The Side bar in the prototype spills over the neighbouring column when it needs to. The prototype can do
> that because it's a single web page. In Platform.Bible the editor runs in an iframe inside a docking
> panel, so **nothing drawn inside it can appear over a neighbouring panel** — that's a platform boundary,
> not a CSS problem. Two options:
>
> - **Clamp inside the editor panel** → Side stays buildable this sprint. Cost: we must reserve horizontal
>   space on the right, which narrows the text column, and there is no right gutter today so we'd be
>   creating one.
> - **Must overlap** → it needs a new capability in Platform.Bible's overlay service (which exists for
>   exactly this reason but currently renders only text/markdown/card, not our searchable marker picker).
>   That's core work outside this feature, and I'd ship the toolbar placement now with Side as a
>   follow-up.

### ❓ OQ-9 — Comments can't cross a marker boundary; the marker toggle can. Which gives? _(for UX)_

**Status: open. Surfaced by U1 + U7 together. Non-blocking for `PT-XXX-D2`, blocking for `PT-XXX-J`.**

If the Side bar hosts a comment button (U1's extensibility ask), the same selection will behave
inconsistently: `kolo \bd Mulu` is a valid `(mixed)` selection for the marker toggle, but the comment path
**rejects** any selection spanning more than one USJ node with
`%webView_platformScriptureEditor_error_selectionContainsMarkers%`
([web-view.tsx:679-689](../../extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx#L679-L689)).

So: does the comment button disable itself on marker-spanning selections (cheap, consistent with today), or
does comment anchoring need to learn to span markers (a real change to comment plumbing, well outside this
feature's appetite)? **Recommendation: disable with an explanatory tooltip**, and log the anchoring
limitation as separate work.

### ❓ OQ-10 — Which non-styling character markers should be hidden from the Simple menu? _(for UX + Paratext domain expertise)_

**Status: open. Surfaced by `PT-XXX-C`, handed to `PT-XXX-D`, and `PT-XXX-D`'s design deliberately does not
decide it ([design doc](../superpowers/specs/2026-08-03-character-marker-control-design.md) §8). Blocks
nothing — it changes only which items the generator emits.**

Parent-scoped filtering means the offered set is whatever character markers the caret's `blockMarker`
permits, so the menu offers more than body-text styles. Verified exposure, per `PT-XXX-C`'s design §2:

| Leaks in                            | Reachable from `blockMarker`                            |
| :---------------------------------- | :------------------------------------------------------ |
| `fm`, `xt`, `rq`                    | `p`, `m`, `po`, `pr`, `pm*`, ~40 more body paragraphs   |
| `qs`, `qac`                         | `q`, `q1`–`q4`, `qc`, `qr`                              |
| `no`                                | `s`, `s1`–`s3`, `is`, `iot`, `io1`–`io4`, `ip`, `im`, … |
| `litl`, `lik`, `liv`, `liv1`–`liv5` | `li`, `li1`–`li4`, `lim`, `lim1`–`lim4`                 |
| `ior`                               | `id`, `io`, `io1`–`io4`                                 |
| `iqt`                               | 33 introduction paragraph markers                       |
| `vp`                                | `cd`                                                    |

So in a poetry line the list includes "quotation speaker" and "acrostic character"; in a list item it
includes the list-total/key/value markers. **Every one is a genuine character marker**, so
`isCharacterMarker` is right and must not change — `usfmMarkers` carries no "is a body-text style" flag,
and `category`/`type` do not separate these out. A v1 answer therefore needs a **hand-maintained deny
list**, which is why neither `PT-XXX-C` nor `PT-XXX-D` decided it.

**Recommendation: hide nothing in v1.** A wrong deny list silently removes a marker a translator needs,
which is worse than offering one they will not use — and an extra row is discoverable, while a missing row
is not. If UX wants curation, implement it as one constant in
[character-marker-menu.utils.ts](../../extensions/src/platform-scripture-editor/src/character-marker-menu.utils.ts)
with a comment pointing here; that lands later without touching `PT-XXX-D`'s files.

⚠️ **Do not merge this with OQ-6.** Mutual exclusion (`bd`/`it`/`bdit`) and menu curation are two different
curated lists answering two different questions.

### ❓ OQ-11 — Does the remove row read _(none)_ or "Remove character marker"? _(for UX — an ack, not a decision)_

**Status: open, cosmetic, non-blocking.** Also carries the one item `PT-XXX-C` left explicitly for UX: the
remove row's icon.

U3's wording describes the row as _(none)_, but `PT-XXX-C` shipped it as
`%webView_platformScriptureEditor_characterMarkerMenu_removeMarker%` → "Remove character marker" (commit
`fc1c09fb67f`). `PT-XXX-D`'s design keeps C's title and uses `(none)` only as the **trigger's** neutral
label, letting the row's tri-state indicator carry the coverage meaning
([design doc](../superpowers/specs/2026-08-03-character-marker-control-design.md) §5).

Two reasons that is the recommendation rather than a rename: existing keys are immutable, so a rename
costs a new key plus a `metadata.fallbackKey` redirect in both `en` and `es`; and "(none)" is a poor label
for a destructive action in a list where every other row names a style.

**Also needs confirming here:** the row's icon, proposed as `RemoveFormatting` from `lucide-react` and
flagged by `PT-XXX-C` for UX. It must stay explicit — `MenuMarkerIcon` falls back to `Ban`
([marker-menu.component.tsx:92](../../lib/platform-bible-react/src/components/advanced/marker-menu.component.tsx#L92)),
a prohibition glyph for a legitimate action, in a menu that already renders a "Disallowed" affordance.

### ⚙️ Other design considerations (decided, not open)

- **`markerMode` interacts with removal.** In `markerMode: 'editable' | 'visible'`, a CharNode's children include synthesized `MarkerNode` / `ImmutableTypedTextNode` opening and closing markers. Simple mode uses `PARAGRAPH_STRUCTURE_VIEW_MODE` (`markerMode: 'hidden'`), so the common path is clean text — but a correct unwrap must strip marker children in the other modes. **Explicit test case on `PT-XXX-B1`.**
- **`CharNode.canBeEmpty()` is `false`**, and `$charNodeTransform` deletes emptied CharNodes. Removal therefore gets some cleanup for free — and must not fight it.
- **Read `contextMarker`; don't _extend_ `onStateChange`.** These are different things, and the spike (A5) separates them. **Reading** the existing `StateChangeSnapshot.contextMarker` is the recommended query — it already ships, paranext-core already stores it ([web-view.tsx:317](../../extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx#L317)), and it is the innermost marker at the selection. **Adding new fields** to `StateChangeSnapshot` is still the wrong move: `$updateState`'s early return (`StateChangePlugin.tsx:79-90`) means the snapshot isn't emitted in all cases, and it would recompute on every keystroke. If a _nesting stack_ is ever needed (OQ-1 Option B / `PT-XXX-B3`), use an imperative `read()` getter, mirroring `getElementByKey` / `getNoteOps`.
- ⚠️ **`contextMarker` is anchor-scoped, so it cannot drive the remove row on its own** — found while designing `PT-XXX-D` against `PT-XXX-C`'s shipped code. `generateCharacterMarkerMenuListItems` emits the remove row only when `currentCharacterMarker` is set ([character-marker-menu.utils.ts:125](../../extensions/src/platform-scripture-editor/src/character-marker-menu.utils.ts#L125)), and `contextMarker` describes the marker at the _anchor_, not across the selection. For U3's own example — `kolo ` + `\bd Mulu\bd*` with the anchor in the plain text — `contextMarker` is `p`, so the _(none)_ row would be **absent exactly in the case U3 names.** `PT-XXX-D` derives the value from the coverage analysis instead while the popover is open (exactly one covering marker → that marker; two or more → `undefined`, the genuine `(mixed)` case), falling back to `contextMarker` while closed. Consequence, deliberate: on a partially-covered selection, re-picking the covering marker is inert rather than nesting a duplicate — neither is the eventual answer (**extend** is `PT-XXX-B4`), and inert is the safer placeholder. [Design doc](../superpowers/specs/2026-08-03-character-marker-control-design.md) §2.3.
- **The O(1) `(mixed)` check over-reports, and coverage wins when it exists.** `start.jsonPath !== end.jsonPath` is the cheap homogeneity test the plan prescribes for the trigger label, but a selection spanning two _adjacent same-marker_ CharNodes has two paths — so the cheap check says heterogeneous while the coverage pass correctly says `bd: 'all'`. Left alone, the trigger would read `(mixed)` while every row in the open menu disagreed. `PT-XXX-D` prefers coverage whenever it has it, so the label may correct itself as the popover opens; the cheap check only ever over-reports mixing, never under-reports it, so the correction always moves toward the truth. [Design doc](../superpowers/specs/2026-08-03-character-marker-control-design.md) §4.1.
- **`MarginalRef extends EditorRef`**, so `Marginal.tsx` must get pass-through delegations for every new method or upstream typecheck fails. Easy to miss.
- **shadcn discipline**: any edit under `lib/platform-bible-react/src/components/shadcn-ui/` needs a `// CUSTOM:` comment ([shadcn-discipline.md](../../.claude/rules/code-quality/shadcn-discipline.md)). This plan should require **zero** such edits — if a ticket starts editing `popover.tsx`, stop and reconsider.
- **Styling constraints**: Tailwind v4 `tw:` prefix on every utility; `tw:shadow*` is banned in extension code by `paranext/no-tailwind-shadows` (`PopoverContent` already carries its own shadow); theme tokens only; z-index from [z-index.ts](../../lib/platform-bible-react/src/components/z-index.ts).
- **Localization**: `en` **and** `es` are both required or the build fails; existing keys are immutable (add a new key plus a `metadata.fallbackKey` redirect); library components must **not** call `useLocalizedStrings` — follow the `MarkerMenu` `localizedStrings`-prop contract.
- **Keyboard catalog**: any new/changed keyboard handler requires a matching `KeyboardShortcutEntry` in [keyboard-shortcuts.data.ts](../../src/stories/keyboard-shortcuts.data.ts) in the same change ([keyboard-shortcuts-catalog.md](../../.claude/rules/keyboard-shortcuts-catalog.md)). Existing relevant entries: `scripture-markers-menu` (:169-178), `scripture-close-markers-menu` (:179-188).
- **Lexical swallows keydown.** `Lexical calls stopPropagation() on keydown before React sees it` — capture-phase listeners are required, as documented at [paragraph-marker-tooltip-overlay.component.tsx:125](../../extensions/src/platform-scripture-editor/src/paragraph-marker-tooltip/paragraph-marker-tooltip-overlay.component.tsx#L125).
- **Do not add a second context-menu mechanism.** Supplying both `EditorOptions.contextMenu` and a DOM `onContextMenuCapture` menu makes the two conflict; asserted at [resource-cell.component.test.tsx:278-313](../../extensions/src/platform-scripture-editor/src/scripture-text-grid/resource-cell.component.test.tsx#L278-L313).

---

## 4. Testing Strategy

Mapped to the trophy in [Testing-Guide.md](../../.context/standards/Testing-Guide.md): static analysis
at the base, **integration as the widest and most valuable tier**, unit for pure logic only, E2E as a
thin smoke tip.

### 4.1 Unit — Vitest, paranext-core

| Target                                 | File                                                                                                                                                                                                         | Cases                                                                                                                                                                                                                                                                                                                                                      |
| :------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isCharacterMarker`                    | [usfm-markers.test.ts](../../lib/platform-bible-utils/src/markers/usfm-markers.test.ts) (only 32 lines today, covers `isBlockMarker` alone)                                                                  | true for `nd`/`add`/`wj`/`bd`/`it`/`k`; **false for `v`, `va`, `vp` and `ca`** (🚨 corrected 2026-07-30 — four numbering markers are typed `MarkerType.Character`, not one; see §1.4 item 1); false for `p`/`q`/`c`; false for note markers `f`/`x`; false for empty and unknown                                                                           |
| `generateCharacterMarkerMenuListItems` | [platform-scripture-editor.utils.test.ts](../../extensions/src/platform-scripture-editor/src/platform-scripture-editor.utils.test.ts) — follow `describe('generateInlineMarkerMenuListItems')` at :2445-2499 | items contain only character markers; **runs against the real `usfmMarkers`, not a mock** (existing precedent, stated in the file); add-action calls `insertMarker`; remove-action calls `removeCharMarker`; change-action calls `replaceCharMarker`; character markers are **not** disallowed under structure protection; empty/undefined context handled |

Use `makeMockEditorRef()` ([utils.test.ts:23-32](../../extensions/src/platform-scripture-editor/src/platform-scripture-editor.utils.test.ts#L23-L32)) — extend it with the new spies. This is the cheap, high-value seam: keep the marker logic in pure functions and out of the 2100-line web view.

### 4.2 Unit — Vitest, upstream `scripture-editors`

~18–25 cases in the style of `packages/platform/src/editor/adaptors/usj-marker-action-utils.test.ts`
(465 lines, currently ~7 char cases, all insertion). Enumerated:

- **Remove** (`PT-XXX-B1`): selection == exactly one CharNode · selection strictly inside one CharNode (3-way split) · selection spanning CharNode + plain text · selection spanning two sibling CharNodes · nested `\wj`>`\nd`, remove inner · remove outer · collapsed cursor inside a CharNode · marker not present (no-op) · inside a `NoteNode` (must skip — **free**, `$getTargetNode` at `usj-marker-action.utils.ts:270-291` already does this) · `markerMode: 'editable'` (MarkerNode children stripped)
- ~~**Query** (`PT-XXX-B1`)~~ — **removed by the `PT-XXX-A` spike (A5).** No upstream query is being added; `contextMarker` already ships. The equivalent coverage moves to paranext-core: assert that `isCharacterMarker(contextMarker)` picks out the character marker at the caret and rejects `"p"` (§4.1, `PT-XXX-C`). The nesting-stack and `(mixed)` cases move to `PT-XXX-B3` **if** OQ-1 resolves to Option B.
- **Replace** (`PT-XXX-B2`): same marker (no-op) · different marker · partial coverage → split · nested · invalid target marker → throws

**The single most important assertion across all of these: content is preserved.** That is
non-negotiable N2, and it must exist for every remove case.
`delta-apply-update.utils.test.tsx:986-1018` already asserts exactly this shape for the OT path
(CharNode unwrapped, siblings merged into one TextNode) — mirror it.

### 4.3 Integration — Vitest + React Testing Library

The widest tier. Component-level tests of `CharacterMarkerControl` and the menu wiring.

Conventions that are easy to get wrong here, all verified:

- **`// @vitest-environment jsdom` on line 1 is mandatory** for extension tests. Per-extension `npm test` finds no config in that cwd, so the environment silently defaults to `node` and you get "document is not defined" instead of a clear error.
- **cmdk needs three jsdom stubs**: `ResizeObserver`, `Element.prototype.scrollTo`, `scrollIntoView`. Copy the block at [marker-menu.component.test.tsx:10-37](../../lib/platform-bible-react/src/components/advanced/marker-menu.component.test.tsx#L10-L37). No shared helper exists — do not go build one as part of this feature.
- **`userEvent.setup({ pointerEventsCheck: 0 })`** — Radix sets `pointer-events: none`.
- **Mock the editor, not PAPI, where possible**: the `React.forwardRef` + `useImperativeHandle` stub of `@eten-tech-foundation/platform-editor` at [model-text-panel.component.test.tsx:11-19](../../extensions/src/platform-scripture-editor/src/model-text-panel.component.test.tsx#L11-L19) is the precedent. Extend it with the new methods.
- **Mutable `mockState` + `vi.mock('./use-…hook')`** for driving component states, per [structure-protection-button.component.test.tsx:26-37](../../extensions/src/platform-scripture-editor/src/structure-protection-button.component.test.tsx#L26-L37).
- PAPI mocking is **inline `vi.mock('@papi/frontend')` factories**. The `extensions/__test-mocks__/@papi/*` aliases only apply when vitest runs from `extensions/`, which no npm script does.

Cases: control renders the marker at the caret · disabled + tooltip while sync-blocked · **enabled
while structure-protected** (char markers are exempt — a regression here would be silent and bad) ·
remove action fires with the right marker · change action fires · hidden in Power mode · absent when
the kill-switch is off (if added).

**Power-mode inertness is a test tier, not a manual check (§1.6).** Three assertions, each cheap and each
guarding a specific way the Simple-only rule can leak:

- **Not rendered in Power.** With `platform.interfaceMode` mocked to `'power'`, the control is absent from
  the tree — not merely hidden by CSS, which would still change layout. Drive it through the mutable
  `mockState` pattern (§4.3) so the same test flips back to `'simple'` and asserts presence.
- **No new context-menu item in Power.** Assert the `EditorOptions.contextMenu` array the web view builds
  has its pre-existing length and contents in Power mode (`PT-XXX-E1`).
- **`MarkerMenu`'s existing consumers are unaffected** by the new selection-state field. An item **without**
  the field renders exactly as it does today, and no tri-state affordance appears. This is the one shared
  component this feature changes, and both its Power-mode consumers (the `\` menu and the footnote editor)
  pass items without the field.

### 4.4 Storybook

Both existing surfaces are usable and should be used:

- [marker-menu.stories.tsx](../../lib/platform-bible-react/src/stories/advanced/marker-menu.stories.tsx) — add a character-marker variant. Every story carries global tags `['autodocs','test']`, so `play` functions run as real-Chromium tests **with axe a11y assertions applied automatically**.
- [scripture-editor.stories.tsx](../../lib/platform-bible-react/src/components/demo/scripture-editor/scripture-editor.stories.tsx) — a live `Editorial` with real USJ and **no PAPI**. The highest-value surface for developing selection-driven marker UI, and where `PT-XXX-D2` (gutter) and `PT-XXX-F1` (near-line) should both be built before being wired into the web view.

Two rules: use a `StatefulHarness` render component, not `args:`-only mock callbacks; and **never
assert animation end-state** (`toBeVisible()`, `opacity: 1`) — assert Radix `data-state="open"` or the
revealed content.

### 4.5 E2E — Playwright

**One spec, and treat it as unproven capability rather than a copy-paste.**

- Location: `e2e-tests/tests/isolated/character-markers.spec.ts`. Per [e2e-tests/CLAUDE.md](../../e2e-tests/CLAUDE.md) (**authoritative — it contradicts Testing-Guide.md on both location and default fixture**), state-mutating feature flows go in `tests/isolated/`, and `manage-books/` / `markers-checklist/` must **not** be used as models (legacy AI-porting experiments not wired into any standard run).
- Shape: open project → open editor via `openScriptureEditorForProject` ([scripture-editor-helpers.ts:18](../../e2e-tests/fixtures/scripture-editor-helpers.ts#L18), which already solves the dock-layout race) → select a word → apply a marker via the Fixed-placement control → assert the rendered class → reload → assert persistence → remove the marker → **assert the text is still there**.
- **Known hard parts**: no E2E test anywhere in ~15k lines of spec code types into the editor; two buttons are named "Project" (inside vs outside the iframe) and are indistinguishable in the a11y tree; Radix portals into the iframe body so you must query `editorFrame.getByRole(...)`, not `page`; ~30s Electron launch per test; dock layout persists across sessions so `beforeEach` must close stale tabs.
- **Prior attempt failed.** `e2e-tests/test-results/annotation-insertion-PT-38-…-opens-and-saves-the-editor-isolated/` holds failure screenshots and a trace for a spec that **no longer exists in the repo or in git history** — someone tried this twice and abandoned it. Hence `PT-XXX-H` is a _spike_, not a task, and is on the cut list.
- Prove the interaction over CDP with the `visual-verification` skill **before** committing a spec.

### 4.6 C# tests

**None required** — this feature adds no C# code. Recorded for completeness: if a future ticket ever
needs server-side character-marker validity, `DummyScrStylesheet` already defines `scCharacterStyle`
tags (`w`, `em`, `nd`) and would need more added; `MarkersDataSourceTests` INV-003 deliberately
restricts to `scParagraphStyle`, and no `Stylesheet*Tests.cs` exists.

### 4.7 Manual test checklist

Not economically automatable, and mostly where the real bugs will be:

- [ ] Apply, change, and remove a marker in **RTL** text (Hebrew/Greek project — `OHEBGRK` branch)
- [ ] Nested markers: `\wj` wrapping `\nd`, remove inner then outer; **content survives both**
- [ ] Nested _identical_ markers (`\nd` inside `\nd`) — reachable state, define and verify behavior
- [ ] Each `markerMode`: `hidden` (Simple default), `visible`, `editable`
- [ ] Selection spanning two differently-marked runs — verify the documented behavior, not a crash
- [ ] Selection spanning a verse boundary; selection including a footnote caller
- [ ] **Simple mode** shows the control; **Power mode** does not; live-toggle mode without restart
- [ ] **Power-mode regression sweep (§1.6)** — in Power mode, with the feature merged: the editor toolbar is unchanged · the text column is **the same width as before** (catches an ungated gutter reserve) · the right-click menu has its original items only · the `\` menu behaves identically · the footnote editor's marker menu behaves identically · the Insert menu has no new item
- [ ] **Structure-protected** project: char-marker editing still works (paragraph editing still blocked)
- [ ] **Sync-blocked** project: control disabled with an explanatory tooltip; a rejected write reverts visibly
- [ ] Hidden-tab activation: mark text, switch tabs, switch back — no stale or mispositioned UI
- [ ] Undo/redo across an apply and a remove; verify granularity is per-operation
- [ ] **Annotations and comments survive** a marker apply and a marker remove (the round-trip trap)
- [ ] Round-trip: apply a marker, Send/Receive, reopen — marker persists as `\nd ...\nd*` in USFM
- [ ] Keyboard: `\` menu still works unchanged; new control reachable and operable by keyboard alone
- [ ] Screen-reader labels on the new control

### 4.8 Testing infrastructure gaps — do not plan around these

- **Mutation testing does not exist.** Testing-Guide.md:1005-1043 promises Stryker, `npm run test:mutation`, and a ≥70% threshold. There is no `stryker*.json` anywhere and no such npm script. The threshold is unenforceable.
- **`fast-check` property testing does not exist** — not a dependency, no usage. Adding it is an architecture decision requiring a stop-and-ask.
- **No shared React test-utils or custom `render` wrapper.** `vitest.setup.ts` only warms `Intl`. Every component test hand-rolls its own stubs. Resist the urge to fix this inside this feature.

---

## 5. Scope Assessment

**No time estimates in this plan, by choice.** The PRD states the principle: "_Appetite is a budget, not
an estimate. It defines how much time this problem is worth._" The appetite is two developer weeks and
it is fixed. Our job is to shape scope to fit it, not to predict how long the scope takes — so this
section is about what is in the box, what comes out first, and what could force something out.

### 5.1 What's in the box

| Ticket                                                           | Serves                | Certainty                                                               |
| :--------------------------------------------------------------- | :-------------------- | :---------------------------------------------------------------------- |
| ~~`PT-XXX-A` Spike~~                                             | enabler               | ✅ **DONE 2026-07-29** (§3 → A1–A9)                                     |
| `PT-XXX-C` `isCharacterMarker` + item generator                  | enabler (add)         | High                                                                    |
| `PT-XXX-D` The character-marker control (placement-agnostic)     | **N1 add**            | High                                                                    |
| `PT-XXX-D2` — **Side** placement _(UX chose this 2026-07-30)_    | **N1 add** + **H1**   | **Medium** — clamped inside the web view (OQ-8); backout is `D1` (§6.6) |
| `PT-XXX-B1` _Upstream:_ remove _(query dropped — A5)_            | **N1 delete**, **N2** | **High** _(raised from Medium-high by the spike)_                       |
| `PT-XXX-B2` _Upstream:_ replace                                  | **N1 change**         | High                                                                    |
| `PT-XXX-B4` _Upstream:_ **extend** _(new — UX toggle cycle, U4)_ | **N1 change**         | Medium-high                                                             |
| `PT-XXX-E1` Wire remove into the control                         | **N1 delete**, **N2** | Medium                                                                  |
| `PT-XXX-E2` Wire change into the control                         | **N1 change**         | High                                                                    |
| `PT-XXX-G` Localization + keyboard-shortcut catalog              | N1 add                | High                                                                    |
| `PT-XXX-I` Design reconciliation vs. the prototype               | **N1 usable**         | High                                                                    |

### 5.2 What's outside the box, in cut order

The appetite is fixed, so this list — not an estimate — is what protects it. Take from the top.

1. **`PT-XXX-G`'s PAPI command + Insert-menu item.** Already trimmed. The toolbar/gutter control alone delivers discoverability. Keep the localization and keyboard-catalog halves — non-optional per repo rules.
2. **`PT-XXX-F3` (Toolbar Position chooser).** Self-cancelling: meaningless unless two placements ship.
3. **`PT-XXX-F4` (draggable).** Lowest certainty of any NTH and a known rabbit hole.
4. **`PT-XXX-F1` (Floating placement).** Riskiest placement; whichever wrapper ships already covers the contextual need better.
5. **`PT-XXX-D1` (Fixed) as an _extra_ render location.** Distinct from taking it as the **backout** (§6.6) — as a second placement alongside Side it is a plain NTH.
6. **`PT-XXX-J` (additional actions).** The underlying commands already exist; this is co-location only. ⚠️ UX asked for the container to be _extensible_ for these (§3 → U1) — that is a `PT-XXX-D` design requirement, not this ticket, so cutting this does not cut U1.
7. **`PT-XXX-H` (E2E spike).** Regression insurance. Coverage exists elsewhere; the capability is unproven.
8. **⚠️ The backout: ship `PT-XXX-D1` instead of `PT-XXX-D2`.** Not a normal cut — it has **named tripwires and named decision moments in §6.6**, because an undated "fall back if it's struggling" lets `D2` silently eat the appetite. Drops H1 from Covered to Partial; needs UX in the room (T3).
9. **⚠️ `PT-XXX-B2` / `PT-XXX-B4` + `PT-XXX-E2` — change.** Cuts into a non-negotiable; needs Todd. Last resort, and deliberately split from delete so it can go without touching it. Once add and remove work, change is the thinnest slice — a user can remove then re-add. **Note `B4` (extend) is what UX's toggle cycle needs**, so cutting change also cuts the partial → all step.

**Never in the box unless OQ-1 says so:** `PT-XXX-B3` (upstream nesting-stack query + `(mixed)`). Not on
the cut list because it was never _in_ — it is **required only under OQ-1 Option B**, and the spike (A5)
established that Option A needs no upstream query at all. Created so Option B's cost is visible before
anyone answers OQ-1, not after.

**Never cut:** the content-preservation tests on `PT-XXX-B1` (that _is_ N2), the localization keys (`en`

- `es` or the build fails), or the keyboard-shortcut catalog entry (repo rule).

### 5.3 What could force a cut

| Risk                                                                           | Effect on scope                                                                                                                     | Mitigation                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| :----------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **OQ-1 answered as the full-marker-set option**                                | Adds `PT-XXX-B3` (new upstream query + `(mixed)`) **and** grows `PT-XXX-E1` — still the largest uncontrolled scope risk in the plan | Asked early with a recommendation. **Revised by the spike (A5):** the earlier mitigation — "the query returns the full stack either way, so Option B is UI-only" — **no longer holds**, because Option A now needs _no_ query at all (`contextMarker` ships). Option B's cost is therefore real and is made visible as `PT-XXX-B3` on the cut list rather than hidden in `PT-XXX-B1`. The upside: Option A got cheaper, so the _gap_ is wider and the recommendation stronger.               |
| **Variant B's gutter space conflict is unresolved**                            | `PT-XXX-D2` cannot be finished until UX decides share / widen / sit-outside (§2.2)                                                  | Settle it in the UX conversation _before_ `PT-XXX-D2` starts. `PT-XXX-D` is unblocked either way.                                                                                                                                                                                                                                                                                                                                                                                            |
| **Hidden-view handling under Variant B**                                       | New work on required scope, with no precedent to copy — the existing gutter overlay has the same gap                                | Build positioning in the Storybook `Editorial` harness first; write the visibility catch-up test alongside, not after. `useViewVisibility` exists and is tested.                                                                                                                                                                                                                                                                                                                             |
| ~~**`PT-XXX-B1` is harder than it looks**~~ — **largely retired by the spike** | Would have pushed change/delete toward the cut list                                                                                 | ✅ `PT-XXX-A` ran (2026-07-29) and found `PT-XXX-B1` **easier** than assumed: query dropped, unwrap is a library call, all four splitting helpers reused in-file, 5 files not 8, certainty High (A3–A5, A8). ⚠️ **But the old "fallback path needs no upstream change" mitigation is withdrawn** — A2 shows the `applyUpdate` route is not reachable from a selection. The real fallback is now **ship N1 (add) alone and defer delete/change** (all paranext-core, no upstream dependency). |
| **Thin test harness**                                                          | Verification is slower than the work itself suggests                                                                                | Keep logic in pure functions (`PT-XXX-C`); lean on Storybook play functions in real Chromium. `PT-XXX-H` would tell us whether E2E is viable, and it is on the cut list.                                                                                                                                                                                                                                                                                                                     |
| **Annotation loss regression**                                                 | Not a scope risk — a correctness one                                                                                                | Architecturally excluded: the tempting `getUsj → mutate → setUsj` approach silently destroys all annotations, so it is ruled out, with a manual check and a component test guarding it.                                                                                                                                                                                                                                                                                                      |
| **Variant choice unresolved past the start of the wrapper**                    | Blocks only `D1`/`D2`                                                                                                               | Deliberately late-bindable — `PT-XXX-D` builds the control knowing nothing about placement.                                                                                                                                                                                                                                                                                                                                                                                                  |

**Not a risk, though an earlier draft said it was:** the upstream dependency. Delivery is by merging to
the `platform-yalc` branch, which `postinstall` links automatically for every developer and in CI. No
npm publish, no release tag, no external reviewer queue. Verified in the repo.

### 5.4 Honest read on fit

The two variants are not the same size: **Variant A (toolbar) is meaningfully less work than Variant B
(gutter)** — no computed geometry, no hidden-view handling, no gutter space conflict. Variant B buys H1
in full and matches the prototype's default.

Whether the required set fits two developer weeks depends most on:

1. **How many developers.** `PT-XXX-B1`/`B2` are upstream and share no files with the paranext-core work, so two people genuinely parallelize (§6.4).
2. ~~**Whether `PT-XXX-A` runs before the sprint.**~~ ✅ **Settled — it ran pre-sprint on 2026-07-29** (§6.5, §3 → A1–A9). The riskiest assumption is validated, and `PT-XXX-B1` came back _smaller_ than the plan assumed. **This is the cheapest lever in the plan and it has already been pulled**, which improves the fit read below.
3. **How OQ-1 lands.** Now the _only_ remaining scope unknown on the upstream side — and the spike sharpened it: Option A is free, Option B costs `PT-XXX-B3` plus a wider `PT-XXX-E1` (A5).

The PRD's 🟡 on Feasibility is correctly placed, **but it is smaller than when this plan was written**:
the spike converted `PT-XXX-B1` from the least certain required work into High-certainty composition, and
closed two speculative mechanisms. If scope has to give, §5.2 says what goes and in what order — that is
the mechanism, not a re-estimate.

---

## 6. Demo Plan & Critical Path

### 6.1 Demo-critical path

The shortest chain that puts something on screen:

```
PT-XXX-C  →  PT-XXX-D  →  one placement wrapper (PT-XXX-D1 or PT-XXX-D2)
```

**Target: demo-able by the sprint halfway point**, per the Implementation Owner Guide. Variant A is the
shorter of the two chains, so it reaches a demo sooner; Variant B has a built-in fallback if it doesn't
(below).

~~`PT-XXX-A` is scheduled first even though it is not on this chain~~ — ✅ **it already ran, pre-sprint
(2026-07-29).** It did the job it was scheduled for: `PT-XXX-B1`'s shape is validated and came back
smaller. **It did not get OQ-1 moving** — posting that question is a human action and is still outstanding
(§11 item 3). The demo chain above was never blocked on the spike and is unaffected.

**What the demo shows:**

- ✅ A **visible, persistent character-marker control** — the actual PRD problem ("not very discoverable") solved
- ✅ Select text → open the picker → **apply a character marker**, searchable by code or localized name
- ✅ The control **reflects the character marker at the caret**
- ✅ Works in Simple mode, hidden in Power; the `\` keyboard path still works unchanged

**What it does NOT do — say this in the demo:**

- ❌ **Cannot remove a marker** (N1 delete, N2) — needs `PT-XXX-B1`
- ❌ **Cannot change an existing marker** (N1 change) — needs `PT-XXX-B2`; picking a second marker at this stage would _nest_, not replace
- ❌ Not yet reconciled against the prototype (`PT-XXX-I`)
- ❌ Only one placement

That is **N1 (add) covered, N1 (change/delete) and N2 not yet** — a partial non-negotiable, which is the
expected shape of a halfway demo. Naming the gap is what keeps the Epic Lead and UX from being surprised.

**Variant B's fallback:** if gutter positioning is not behaving as the halfway point approaches, ship
`PT-XXX-D1` instead and demo that. It is a wrapper swap, not a rewrite, because the control is
placement-agnostic. **Make that call before the demo, not at it.**

### 6.2 Ship-critical path

```
PT-XXX-B1 → PT-XXX-E1 → PT-XXX-I                                   ← PT-XXX-A done, no longer a prefix
PT-XXX-C  → PT-XXX-D  → [D1 | D2] → PT-XXX-E1 → PT-XXX-I
                                          └→ PT-XXX-E2 (needs PT-XXX-B2)
```

**Both arms are critical** — a slip on either moves the ship date. The second arm is the longer one, and
`E2` at its tail is why change is the last thing to land and the first non-negotiable slice to give.

**Updated 2026-07-29:** `PT-XXX-A` is complete, so it is no longer a prefix on either arm — **both arms
can start on day one.** The first arm also got shorter: `PT-XXX-B1` lost its query and two of its files
(A3, A5).

### 6.3 Sequencing rule — all non-negotiable work precedes every nice-to-have

**Hard rule.** No nice-to-have starts until every non-negotiable ticket is complete and verified:

- `PT-XXX-F1`, `PT-XXX-F3`, `PT-XXX-F4`, `PT-XXX-J`, and **the losing variant of `D1`/`D2`** are strictly downstream of `A`, `C`, `D`, the chosen wrapper, `B1`, `B2`, `E1`, `E2`, `G` and `I`.
- This holds even when a nice-to-have looks smaller or more appealing than the remaining required work, and even when a developer is briefly blocked — the correct move when blocked is to help clear the block, not to start a placement.
- **One exception, and it is not really an NTH:** using `PT-XXX-D1` as Variant B's demo fallback. That is schedule insurance on required work.

Two consequences, stated so they don't get re-litigated mid-sprint:

1. **Extra placements cannot substitute for progress.** The demo is `C` → `D` → a wrapper. Another render location is not a substitute for change and delete.
2. **H1's coverage depends on the variant, and that is a decision, not a gap.** Variant B covers it in full; Variant A covers clause 1 only. Either is defensible — H1 is in the PRD's "cut these first" column — but the choice should be explicit (§10).

### 6.4 Two developers

`PT-XXX-B1`/`B2` live in the upstream repo; `C`/`D`/`D1`/`D2`/`E`/`G`/`I` live in paranext-core. **They
share no files**, so two people genuinely parallelize rather than contending:

- **Dev 1:** `B1` → `B2`, then review/support, then NTHs _(`A` removed — done pre-sprint)_
- **Dev 2:** `C` → `D` → the chosen wrapper _(demo)_ → `E1` → `E2` → `G` → `I`

This is the cleanest way to make Variant B comfortable and to reach the demo well before the halfway
point. Dev 2's chain is the binding one.

**With one developer** the spike having already run matters more: `B1` is now High-certainty composition
in 5 files with no query, so the single-developer sequence is `C` → `D` → wrapper _(demo)_ → `B1` → `E1`
→ `B2` → `E2` → `G` → `I`, with the demo still reachable by the halfway point.

### 6.5 Running `PT-XXX-A` before the sprint — ✅ **done, 2026-07-29**

`PT-XXX-A` had no dependencies, so it ran pre-sprint. **This section is kept as the record of what that
bought, because it is the plan's clearest example of the lever working.**

- **`PT-XXX-B1`'s shape was validated before committing** — and it came back **smaller**, not bigger: query dropped, unwrap is a library call, 5 files instead of 8, certainty Medium-high → High (A3–A5, A8).
- **Two speculative mechanisms were closed** rather than carried into the sprint as unresolved options: Mechanism B (A2) and the USJ round-trip (A6). Each would have cost real time to discover mid-sprint, and the round-trip would have cost data.
- **Three plan errors were corrected** while it was still free to do so: the `$unwrapTypedMarkNode` path, the "reachable via `applyUpdate`" claim, and the "the query is nearly free" scope argument.
- ❌ **OQ-1 did _not_ move.** The spike sharpened the question but posting it is a human action, still outstanding (§11 item 3). It remains the largest uncontrolled scope risk, and it needs calendar time.
- ❌ **The live yalc round-trip was not exercised** (A7). Carried to §11.

With two developers the sequencing benefit was always smaller (the spike was never on the binding chain);
the value delivered was scope certainty, not schedule.

### 6.6 The backout option, and **when** we take it

UX chose **Side** (§3 → U1), which is the larger and less certain of the two placements. The backout is
**`PT-XXX-D1` — put the button trigger in the existing `TabToolbar`** (the prototype's _Fixed_ placement).

**Why this is a real backout and not a consolation prize:** `PT-XXX-D` is placement-agnostic by
construction (§2.0), so `D1` is a mount point, not a reimplementation. Everything else — the control, the
tri-state menu, `(mixed)`, remove, extend — is identical either way. Only H1 changes: **Covered → Partial**
(clause 1 only).

**The rule this section exists to enforce:** _"fall back if it isn't behaving"_ is not a plan. Without a
named trigger and a named moment, a struggling `D2` quietly consumes the appetite and the loss lands on a
**non-negotiable** — because `D2` serves N1 (add) + H1, while `PT-XXX-B1`/`B4`/`E1` serve N1 (delete) and
**N2**. Trading a non-negotiable for a nice-to-have is the specific failure this guards against.

The appetite is two developer weeks (§5), and this plan carries no time estimates — so the tripwires below
are expressed as **observable states at named sprint moments**, not durations.

| #         | Moment                          | Tripwire — the observable condition                                                                                                                                                                                                                                                                                           | If it fails                                                                                                                                                                                     |
| :-------- | :------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ~~**A**~~ | ~~Before any `D2` code~~        | ~~**OQ-8 answered.**~~ ✅ **RETIRED 2026-07-30** — OQ-8 was decided by scoping rather than answered by UX: build clamped inside the web view, defer the overlap (§3 → OQ-8). `D2` is unblocked and this trigger can no longer fire.                                                                                           | —                                                                                                                                                                                               |
| **B**     | **Quarter mark** (≈ mid-week 1) | A positioned container renders in the gutter in the Storybook `Editorial` harness ([scripture-editor.stories.tsx](../../lib/platform-bible-react/src/components/demo/scripture-editor/scripture-editor.stories.tsx)) — **rough is fine, positioned is the bar.** Not styled, not tracking the caret, just in the right place. | **Back out.** If positioning isn't working in the harness — where there is no PAPI, no iframe, and no dock layout — it will not start working in the web view.                                  |
| **C**     | **Halfway point — the demo**    | `D2` demos in the real web view **and** the hidden-view catch-up test (§2.4) is written and passing.                                                                                                                                                                                                                          | **Ship `D1` for the demo and say so in the demo.** Then a deliberate call: continue `D2` in week 2 _only_ if the non-negotiables are already tracking, else convert `D1` to the shipped answer. |
| **D**     | **Start of week 2 — hard stop** | `D2` is already working, or it stops.                                                                                                                                                                                                                                                                                         | **No further `D2` work.** Remaining appetite goes to `B1` → `B4` → `E1` → `E2` (N1 delete/change + N2). This tripwire is non-negotiable; the others allow judgment.                             |

**Who decides:** the Implementation Owner calls B and D; **C needs UX in the room**, because it drops H1 to
Partial and changes what Todd and Alex see at the demo.

⚠️ **Tripwire A retiring makes B, C and D matter more, not less.** A was the only trigger that could stop
`D2` _before_ any effort went into it. With it gone, every remaining path to the backout costs work first —
so **B is now the cheapest exit and should be treated as a real checkpoint**, not a formality. If the
container isn't positioned in the Storybook harness at the quarter mark, back out then; do not carry it to
the demo hoping it resolves.

**Say it out loud when it happens.** If the backout is taken, the demo must state that Fixed is shipping
and Side is deferred — the §10 H1 row moves from _Covered_ to _Partial_, and that should be a stated
decision rather than something Alex notices on screen.

**What is NOT a backout trigger:** the gutter space conflict (§2.2 — share / widen / sit outside). That is a
UX design choice with viable answers either way, all buildable. **Nothing can now make Side _impossible_** —
OQ-8 settled the only such risk by scoping the overlap out (§3 → OQ-8), which retired tripwire A. **Every
remaining tripwire is about whether Side fits the appetite, and every one of them costs work before it
fires.** That is why B is the checkpoint that matters.

---

## 7. Jira Tickets

### `PT-XXX-A` — Spike: verify the shipped editor API and choose the remove/replace mechanism

> ## ✅ **DONE — ran 2026-07-29, pre-sprint. Findings are in §3 → "`PT-XXX-A` spike results" (A1–A9).**
>
> **Outcome in one line:** **Mechanism A**, with `$unwrapNode` as the unwrap primitive, in the _existing_ > `usj-marker-action.utils.ts` — and the selection query dropped entirely because `contextMarker` already
> ships and is already wired. `PT-XXX-B1` and `PT-XXX-B2` both got **smaller**; Mechanism B and the USJ
> round-trip are both **closed**.
>
> **Two ACs remain open and are carried to §11:** the live yalc/`devpub` round-trip was **not executed**
> (reason in A7), and **OQ-1 has not been posted** to the epic owner and UX — that is a human action.

- **Type:** Spike
- **Certainty:** High — a spike, time-boxed by the team. Its job is to answer questions, not to build.
- **NN served:** — (enabler; de-risks N1 change/delete and N2)
- **Blocked by:** nothing — **do this first**, or before the sprint (§6.5)
- **Blocks:** `PT-XXX-B1`, `PT-XXX-B2`
- **Parallel with:** `PT-XXX-C`
- **On demo path?** No — but scheduled first because it validates `PT-XXX-B1`, the plan's least certain required work
- **PRD rows covered:** de-risks N1 (change, delete) and N2

**Description** _(the original brief, kept verbatim as the record of what was asked. Where it conflicts
with what was found, **the findings in §3 → A1–A9 win** — in particular, item 2's "8 files" is now 5, and
item 3's premise about which blockers matter turned out to be wrong.)_

Three plausible mechanisms exist for change/remove, differing by an order of magnitude in cost. Pick
one with evidence before `PT-XXX-B1` starts.

1. Read the **actually shipped** `.d.ts` for `@eten-tech-foundation/platform-editor` (installed 0.8.15; `package.json` pins `~0.8.14`; `dev-packages.json` points at a `platform-yalc` branch, not `main` — verify what consumers really get, not what the repo `main` has). Confirm there is no unexported removal API on the public surface.
2. Evaluate **Mechanism A — new imperative `EditorRef` methods**: `removeCharMarker`, `replaceCharMarker`, `getCharMarkersAtSelection`. 8 files upstream (see `PT-XXX-B1`).
3. Evaluate **Mechanism B — drive the existing delta engine through the already-public `applyUpdate`**: `attributes: { char: {style} | [...] | null }`, engine at `libs/shared-react/src/plugins/usj/collab/delta-apply-update.utils.ts:342-408`, already tested at `delta-apply-update.utils.test.tsx:986-1018`. Blockers to measure: computing flat OT indices from a Lexical selection (no exported helper), and `OTCharItem`/`OTCharAttribute` not being exported. If viable, the upstream ask shrinks to _export two types + one index helper_ — 1–2 files instead of 8.
4. **Pick the unwrap primitive.** Two existing options, both verified 2026-07-28: **generalize `$unwrapTypedMarkNode`** (`TypedMarkNode.ts:1341` — 11 generic `ElementNode` lines already behind our public `removeAnnotation`, so one shared unwrap serves annotations and character markers), or **call `$unwrapNode` from `@lexical/utils` directly** (already applied to `CharNode` at `delta-apply-update.utils.ts:398`, so zero new upstream surface). Report which has the smaller blast radius.
5. Sanity-check the annotation/undo damage of the **rejected** USJ round-trip (`getUsj` → mutate → `setUsj`) so the fallback-of-last-resort is documented with evidence rather than asserted.

Set up the dev loop: `nx devpub platform-editor` upstream + `npm run editor:link` in paranext-core
([package.json:64-65](../../package.json#L64-L65)). Note `devpub` mutates `package.json` and restores
it — don't interleave with other git work.

**Acceptance criteria**

- [x] A written recommendation: Mechanism A or B, with the file-level change list for whichever is chosen — **Mechanism A** (A2, A3); list on `PT-XXX-B1`
- [x] A decision on the unwrap primitive — **call `$unwrapNode` directly** (A4). Smaller blast radius on every axis: zero new upstream surface, and it avoids the 4 annotation/comment callers of `$unwrapTypedMarkNode`. _(Also corrected that function's path: `libs/shared/src/nodes/features/TypedMarkNode.ts:1341`.)_
- [x] Confirmation (with file:line) that no public removal API exists in the shipped package version — **A1**, from two independent sources (`dist/index.d.ts:249-368` and `etc/platform-editor.api.md:96-127`)
- [x] `PT-XXX-B1`/`B2` estimates either confirmed or revised, with reasoning — **A8**, both revised down
- [ ] ⚠️ **NOT DONE** — yalc dev-link round-trip demonstrated working end-to-end (a trivial upstream change visible in a running paranext-core). Mechanism verified statically (A7); the live run needs a `pnpm install` in the upstream repo and moves the sibling clone's branch, so it was left for a developer. **Carried to §11.**
- [x] A one-paragraph note on the annotation/undo cost of the USJ round-trip, for the record — **A6** (three traced effects, not one)
- [ ] ⚠️ **PARTIAL** — `platform-yalc` round-trip confirmed end to end. Verified by reading `checkoutRevision` ([dev-package-utils.ts:81-109](../../.erb/scripts/dev-package-utils.ts#L81-L109)): it fetches, checks out, and pulls. **Not executed.** Two gotchas found and documented in A7. **Carried to §11.**
- [ ] ⚠️ **NOT DONE** — OQ-1 posted to the epic owner and UX. Human action. The spike sharpened the question: Option A now costs **nothing** upstream, so Option B's true incremental cost is higher than earlier drafts said, and the prototype's **`(mixed)`** state is part of Option B rather than free. **Carried to §11.**

---

### `PT-XXX-C` — `isCharacterMarker` helper and character-marker item generator

> ## ✅ **DONE — merged as [PR #2635](https://github.com/paranext/paranext-core/pull/2635) on 2026-08-05.**
>
> `isCharacterMarker` (PBU) and `generateCharacterMarkerMenuListItems` (extension-level, own module) are
> both in `main`. All ACs verified through the PR review. `PT-XXX-D` is now unblocked.

- **Type:** Task
- **Certainty:** High — pure functions with a direct in-repo precedent, testable without a DOM.
- **NN served:** — (enabler for N1 add)
- **Blocked by:** nothing
- **Blocks:** `PT-XXX-D`
- **Parallel with:** `PT-XXX-B1` _(`PT-XXX-A` removed — done 2026-07-29)_
- **On demo path?** **YES** — first link in the demo chain
- **PRD rows covered:** foundation for N1 (add, change, delete)

**Description**

Two pure functions, both fully unit-testable without a DOM. Deliberately the first paranext-core work:
it de-risks `PT-XXX-D` and needs no editor API.

1. **`isCharacterMarker(marker: string): boolean`** — add next to `isBlockMarker` at
   [usfm-markers.ts:3079](../../lib/platform-bible-utils/src/markers/usfm-markers.ts#L3079); export from
   [index.ts:55](../../lib/platform-bible-utils/src/index.ts#L55). **Watch the `v` quirk**: verse is a
   structure marker typed `MarkerType.Character`
   ([usfm-markers.ts:3076](../../lib/platform-bible-utils/src/markers/usfm-markers.ts#L3076)), so a
   naive type check would offer `\v` as a character style. `MarkerType` is already a value export
   ([index.ts:279](../../lib/platform-bible-utils/src/index.ts#L279)); nothing in the repo reads it yet.
   🚨 **Corrected 2026-07-30: the quirk is four markers — `v`, `va`, `vp`, `ca` — and the exclusion is by
   `category === DivisionMarks`, not by name.** See the correction under §1.4 item 1 and the
   [`PT-XXX-C` design doc](../superpowers/specs/2026-07-30-character-marker-helper-and-item-generator-design.md),
   which also revises this ticket's signature (options object for the interdependent optionals), the
   remove-row icon and string, and the `blockMarker`-vs-`contextMarker` input.
2. **`generateCharacterMarkerMenuListItems(...)`** — in its own module,
   [character-marker-menu.utils.ts](../../extensions/src/platform-scripture-editor/src/character-marker-menu.utils.ts),
   **modeled on `generateInlineMarkerMenuListItems`
   ([platform-scripture-editor.utils.ts:413-453](../../extensions/src/platform-scripture-editor/src/platform-scripture-editor.utils.ts#L413-L453))** — that is the pattern to follow.
   🚨 **Not beside its analogue, and this is not a style preference.** The generator needs a
   `lucide-react` icon for its remove row; `main.ts` imports `platform-scripture-editor.utils.ts`, so
   a runtime UI value there loads in the extension host, whose module shim rejects any `require`
   other than `papi` — the extension then fails to activate and no editor opens. Neither the build
   nor lint catches this, so both modules carry a header comment stating the boundary **and
   [extension-host-import-boundary.test.ts](../../extensions/src/platform-scripture-editor/src/extension-host-import-boundary.test.ts)
   enforces it in CI**: it walks `main.ts`'s transitive value-import graph (skipping type-only
   imports, and skipping `?inline` web-view bundles, which load as strings) and fails on any bare
   specifier the host's `require` shim does not supply. An allowlist, not a UI-package denylist, so
   the next UI package someone adds is caught rather than missed. Added 2026-08-04 in response to
   review on `PT-XXX-C`; it guards the whole extension, so `PT-XXX-D`..`G` inherit it.
   Returns `MarkerMenuItem[]` filtered to character markers, using the existing
   `%markerMenu_marker_*_description%` keys. Include add, change, and remove actions, with the latter
   two behind capability detection until `PT-XXX-B1`/`B2` land, so this ticket merges independently.

Place `isCharacterMarker` **next to its analogue** `isBlockMarker`, rather than appending it at the
end of the file. `generateCharacterMarkerMenuListItems` cannot sit next to _its_ analogue — see the
extension-host import constraint above — so it gets its own module instead.

**Note on the no-go**: keep the existing parent-scoped filtering
(`usfmMarkers[parentMarker].children`) rather than introducing stylesheet-driven validity — that is
PRD no-go #2. Character markers must **not** be marked `isDisallowed` under structure protection
(`isBlockMarker` is false for them, and that exemption is deliberate).

**Mode scoping (§1.6): both functions are deliberately _ungated_ and must be _inert in Power_.** They take
no `interfaceMode` and should not — the gate belongs at `PT-XXX-D`'s mount point, not down here. What that
requires of this ticket:

- **Nothing existing is retargeted through the new helper.** In particular **do not touch `isBlockMarker`**,
  even though this work surfaces a real gap in it (`va`/`vp`/`ca` return `false`; §1.4 item 1). Changing it
  alters what a structure-protected project allows **today, in both modes** — its own ticket.
- **The new generator is not wired into the `\` menu.** `generateInlineMarkerMenuListItems` keeps its
  current behavior byte-for-byte; the `\` path is Power's entire character-marker story (§1.6).
- **The localization keys are the one accepted Power-mode side effect.** The editor web view preloads its
  key list in both modes, so a Power session resolves the new `remove` string and renders nothing with it.
  Documented and accepted in §1.6 — do not add a mode condition to the key list to avoid it.

**Acceptance criteria**

- [x] `isCharacterMarker` exported from `platform-bible-utils`, with the unit cases in §4.1 — including `false` for `v`
- [x] `generateCharacterMarkerMenuListItems` returns only character markers, with localized titles/descriptions
- [x] Unit tests run against the **real** `usfmMarkers` (matching the precedent at utils.test.ts:2445-2499), not a mock
- [x] Character markers are not disallowed under structure protection — explicitly asserted
- [x] **`isBlockMarker` is unmodified** — confirmable from the diff (§1.6)
- [x] **No existing call site changed to use the new helper or generator** — the additions are inert until `PT-XXX-D` mounts them, so this ticket changes nothing in either mode
- [x] `npm run build` in `lib/platform-bible-utils` run before typechecking consumers
- [x] `npm run typecheck && npm run lint && npm test` clean

---

### `PT-XXX-D` — Character-marker control (placement-agnostic)

> ## ✅ **DONE — merged as [PR #2648](https://github.com/paranext/paranext-core/pull/2648) on 2026-08-10.**
>
> `CharacterMarkerControl` component + slot container + coverage analysis + `MarkerMenuItem` tri-state
> field + Storybook story + localized strings — all in `main`. `PT-XXX-D2` (gutter mounting) and
> `PT-XXX-G` (locale/catalog) are now unblocked.

- **Type:** Story
- **Certainty:** High — a close copy of the paragraph switcher, which already solves the hard parts.
- **NN served:** **N1 (add)** — completed by whichever wrapper ships
- **Blocked by:** `PT-XXX-C`
- **Blocks:** `PT-XXX-D1`, `PT-XXX-D2`, `PT-XXX-E1`, `PT-XXX-G`, `PT-XXX-I`, `PT-XXX-J`, `PT-XXX-F1`, `PT-XXX-F4`, `PT-XXX-H`
- **Parallel with:** `PT-XXX-B1`, `PT-XXX-B2`
- **On demo path?** **YES** — the demo is `C` → `D` → one wrapper
- **Create this issue first.**
- **PRD rows covered:** **N1 (add)**, jointly with its wrapper

**Description**

Build `CharacterMarkerControl`: the button showing the character marker at the caret, opening
`MarkerMenu` in a `Popover`, with the disabled states. **Copy
[web-view.tsx:1925-1953](../../extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx#L1925-L1953)
closely** — the paragraph switcher already solves the current-marker label, the disabled state, and the
tooltip fallback.

New file `extensions/src/platform-scripture-editor/src/character-marker-control.component.tsx` plus
`.test.tsx` and `.stories.tsx`, following the
[structure-protection-button](../../extensions/src/platform-scripture-editor/src/structure-protection-button.component.tsx)
trio.

**⚠️ The one hard constraint: this component must not know where it is mounted.** It takes state and
callbacks as props; the caller decides placement. No `TabToolbar` imports, no geometry, no
`getBoundingClientRect`, no positioning CSS. This is what lets the placement decision be made late
(§2.0) and what keeps `PT-XXX-D1`/`D2`/`F1` thin wrappers instead of reimplementations.

**⚠️ Grew on 2026-07-30 from the UX meeting (§3 → U1, U2, U3). Three additions, all load-bearing:**

**1. It is a slot-based container, not a single control.** UX asked for it to be extensible with more
buttons (footnotes, comments — `PT-XXX-J`) and to be built on top of for the side↔floating switch
(`PT-XXX-F3`) and drag handle (`PT-XXX-F4`). Those stay **out of scope to build**, but the container must
not preclude them — retrofitting slots later is the expensive path. `TabToolbar`'s existing slot
composition is the pattern to follow. A reviewer should be able to add a second button without touching
this component's internals.

**2. `(mixed)` in the trigger's placeholder text.** When the selection is not homogeneous, the button reads
`(mixed)` rather than a marker or a blank. Derived in paranext-core — no upstream API (see the closed
`PT-XXX-B3` tombstone).

**3. Per-marker tri-state in the list: partial / all / none.** For selection `kolo ` + `\bd Mulu\bd*`, the
list shows **both** `bd` and _(none)_ as **partially** selected. ⚠️ **This is the one place the meeting's
"reuse existing components" principle cannot be honored as-is, and it is a change to a shared component:**

- `MarkerMenuItem` ([marker-menu.component.tsx:44-70](../../lib/platform-bible-react/src/components/advanced/marker-menu.component.tsx#L44-L70)) has **no selection-state field** — add one (additively; every existing consumer must keep working untouched).
- **No tri-state / indeterminate component exists** anywhere in `platform-bible-react` — verified. This is a new affordance, not a reuse.
- Keep the _component_ — extend its item contract. Do **not** build a second picker.

**One coverage computation feeds all three.** `(mixed)`, the tri-state, and `PT-XXX-B4`'s gap list are the
same analysis: resolve `getSelection()`'s start/end against `getUsj()` via `UsjReaderWriter`. Compute it
once. ⚠️ **`getUsj()` serializes the whole chapter — do not call it on every caret move.** Use the O(1)
`start.jsonPath !== end.jsonPath` check for the trigger label, and the full analysis only when the popover
opens.

⚠️ **The `MarkerMenuItem` change is the one place this feature edits Power-mode code (§1.6).** `MarkerMenu`
serves the `\` menu and the footnote editor, both of which render in Power. So the new selection-state
field must be **optional and inert when absent**: existing consumers keep compiling untouched, and the
tri-state affordance must not appear for items that don't supply it. Assert it, don't assume it (§4.3).

Behavior that belongs here rather than in a wrapper: **the Simple-mode gate (`!isPowerMode`, §1.6)**,
disabled-while-sync-blocked,
**enabled while structure-protected** (character markers are deliberately exempt), search filtering
(inherited from `MarkerMenu`), autofocus the search input, and refocus the editor on close (existing
helpers at [:1106-1108](../../extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx#L1106-L1108)
and [:1139-1144](../../extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx#L1139-L1144)).

Leave the `\` keydown path untouched.

**Acceptance criteria**

- [ ] Selecting a marker applies it to the current selection and the change persists through save
- [ ] Shows the character marker at the caret, or a neutral state when none applies
- [ ] Disabled with an explanatory tooltip while sync-blocked; **enabled** while structure-protected
- [ ] Search filters by marker code and by localized name
- [ ] Keyboard operable end-to-end; focus returns to the editor on close
- [ ] **Not rendered at all in Power mode** — absent from the tree, not merely hidden by CSS; live mode-toggle works without restart (§1.6)
- [ ] The `\` menu still works exactly as before, **in both modes**
- [ ] **The footnote editor's marker menu is unchanged** — it consumes `MarkerMenu` too, and it renders in Power (§1.6)
- [ ] **Zero references to placement** — no `TabToolbar` import, no geometry calls, no positioning CSS. A reviewer should be able to confirm this from the diff alone
- [ ] **Slot-based**: a second action button can be added without editing this component's internals (U1)
- [ ] Trigger shows `(mixed)` when the selection is not homogeneous (U2)
- [ ] List shows **partial / all / none** per marker; `kolo ` + `\bd Mulu\bd*` shows both `bd` and _(none)_ as partial (U3)
- [ ] `MarkerMenuItem` gains its selection-state field **additively** — every existing `MarkerMenu` consumer still compiles and behaves identically, **including the two that render in Power mode** (the `\` menu and the footnote editor). An item without the field shows no tri-state affordance — asserted by test (§4.3)
- [ ] `getUsj()` is **not** called on every selection change — asserted by test or review note
- [ ] Component tests per §4.3; a Storybook story with a `StatefulHarness` (not `args:`-only)
- [ ] **Zero edits** under `shadcn-ui/`
- [ ] `tw:` prefix on all utilities; no `tw:shadow*`; theme tokens only

---

### `PT-XXX-D1` — **Variant A**: mount the control in the editor toolbar (Fixed)

- **Type:** Task
- **Certainty:** High — no computed geometry at all. The smallest piece of work in the plan.
- **NN served:** **N1 (add)** — if Variant A is chosen. Otherwise NTH.
- **Blocked by:** `PT-XXX-D`
- **Blocks:** `PT-XXX-F3`
- **Parallel with:** `PT-XXX-D2`
- **On demo path?** **Only if the backout is taken** — then yes
- **Status:** 🔻 **NTH — and the BACKOUT OPTION. UX chose Side on 2026-07-30 (§3 → U1), so `PT-XXX-D2` is required and this is not.** But this is the one NTH that may get built _instead of_ required work, under the tripwires in **§6.6**. Keep it ready.
- **PRD rows covered:** N1 (add) if the backout is taken; **H1 clause 1 only** — see §10

**Description**

Mount the `PT-XXX-D` control in `TabToolbar` `startAreaChildren`, immediately after the paragraph-marker
switcher — the prototype's **Fixed** placement.

No computed geometry, so §2.4's hidden-view rule does not apply. This is the entire reason Variant A is
half a day and Variant B is one.

**This is the backout option. It is taken on a trigger, not a feeling — see §6.6 for the tripwires**
(quarter-mark harness check · halfway-point demo check · start-of-week-2 hard stop). Two are decided by the
Implementation Owner; the demo one needs UX in the room.

⚠️ **A fourth tripwire was retired on 2026-07-30** when OQ-8 was decided by scoping the overlap out. It was
the only one that could have stopped `PT-XXX-D2` _before_ any work went into it — so the remaining three all
cost effort before they fire, and **the quarter-mark harness check is now the cheapest exit.**

If it is taken: **say so in the demo**, and move the §10 H1 row from _Covered_ to _Partial_ as a stated
decision rather than something Alex notices on screen.

**Acceptance criteria**

- [ ] Control appears in the editor toolbar after the paragraph-marker switcher, **Simple mode only** — the gate is the `!isPowerMode` condition at the mount, copying the Share Layout precedent comment and all (§1.6)
- [ ] **In Power mode the toolbar is unchanged** — no new button, and no layout shift in the `startAreaChildren` row
- [ ] Reuses the `PT-XXX-D` control with **no changes to it** — if it needs modifying, that signals `PT-XXX-D` leaked placement concerns
- [ ] No geometry computation anywhere in this wrapper
- [ ] **Screenshots attached to the PR**

---

### `PT-XXX-D2` — **Variant B**: mount the control in the gutter (Side)

- **Type:** Story
- **Certainty:** **Medium** _(lowered to Medium-low, then raised back on 2026-07-30 when OQ-8 was decided)_ — the **vertical** math is inherited; the **horizontal** math does not exist (see below), there is **no right gutter** to occupy, the gutter width is unresolved, and hidden-view handling has no precedent. **Still the least certain required work in the plan**, but the risk that could have invalidated it outright is gone.
- **NN served:** **N1 (add)** + **H1 both clauses**
- **Blocked by:** `PT-XXX-D`
- **Blocks:** `PT-XXX-F3`
- **Parallel with:** `PT-XXX-D1`
- **On demo path?** **YES** — UX chose Side, so this is the demo chain's last link
- **Status:** ✅ **DONE — merged as [PR #2660](https://github.com/paranext/paranext-core/pull/2660) on 2026-08-11.** _(Was: 🔄 IN REVIEW — changes requested. Was before that: 🔄 IN PROGRESS — awaiting PT-XXX-D merge. Was before that: ✅ REQUIRED and UNBLOCKED — UX chose Side on 2026-07-30 (§3 → U1); OQ-8 decided the same day.)_
- **PRD rows covered:** N1 (add); **H1 both clauses** — see §10
- **Backout:** `PT-XXX-D1`, on the tripwires in **§6.6**

**Description**

Mount the `PT-XXX-D` control in a vertical bar in the **gutter beside the text column**, tracking the
active line — the prototype's **Side** placement, which is also its default.

🚨 **Read this before estimating — two corrections made 2026-07-30 that earlier drafts got wrong:**

**1. There is no right gutter.** The editor's only gutter is on the **inline-start** edge —
`padding-inline-start: var(--psc-gutter-width)`, `4em`, holding paragraph markers
([\_usj-nodes.scss:2438-2502](../../extensions/src/platform-scripture-editor/src/_usj-nodes.scss#L2438-L2502)).
The `padding-right: 4em` further down is the **RTL mirror of that same gutter**
([:2646-2649](../../extensions/src/platform-scripture-editor/src/_usj-nodes.scss#L2646-L2649)), not a second
one. The prototype puts the Side bar on the **right**, so for LTR projects **there is no reserved space and
nothing rendering there** — this ticket creates a right gutter, it does not occupy one.

**2. Only the _vertical_ math is inherited. There is no horizontal math to reuse.** `computePosition`
returns `{ top: finalTop, left: 0 }` — `left` is a hardcoded constant with the comment _"Always anchor at
the leading margin."_ The scroll-aware vertical tracking is genuinely reusable and is the fiddly part; the
horizontal half has to be written, and what exists is pinned to the **opposite edge**.

**Still reuse the existing gutter-anchored overlay for everything it does solve.**
[ParagraphMarkerTooltipOverlay](../../extensions/src/platform-scripture-editor/src/paragraph-marker-tooltip/paragraph-marker-tooltip-overlay.component.tsx)
already does this for the paragraph-marker hover tooltip:

- `computePosition` ([paragraph-marker-tooltip.utils.ts:23-49](../../extensions/src/platform-scripture-editor/src/paragraph-marker-tooltip/paragraph-marker-tooltip.utils.ts#L23-L49)) computes a `top` aligned to a `.para`, clamped to the visible area, scroll-aware. Tested. **Reuse this.** Its `left: 0` is not reusable for a right-side control.
- `findScrollContainer` ([editor-dom.util.ts:78](../../extensions/src/platform-scripture-editor/src/editor-dom.util.ts#L78)) resolves the scrolling ancestor.
- The overlay keeps a `lastPositionRef` so the element doesn't jump, and recomputes on scroll and on **capture-phase** keydown — capture is required because Lexical calls `stopPropagation()` on keydown before React sees it.

What is genuinely new here, and where the day goes:

1. **Track the active line, not the hovered one.** The existing overlay is hover-driven; this needs to follow the caret.
2. **Persistent and interactive**, not a transient tooltip — a `Popover` inside an absolutely positioned container. Watch z-index (constants in [z-index.ts](../../lib/platform-bible-react/src/components/z-index.ts)) and pointer-events.
3. **Resolve the gutter space conflict.** The gutter is `--psc-gutter-width: 4em` ([\_usj-nodes.scss:2438](../../extensions/src/platform-scripture-editor/src/_usj-nodes.scss#L2438)) and already holds paragraph marker labels; the prototype's bar is `min-w-[118px]`. **Which of the three options in §2.2 to take is a UX decision — confirm before building.** If widening the gutter, note the SCSS comment: `--psc-gutter-width` and the marker left offset must change together.
4. **Hidden-view handling (§2.4).** New work — the existing overlay does not do it, so there is no precedent to copy. Use `useViewVisibility`; defer position computation while hidden; back the catch-up with a test.
5. **Create the right-side space, by reserving it.** No right gutter exists (correction 1 above). Per OQ-8's recommendation, **reserve** `padding-inline-end` — creating a real right gutter, mirroring how the start-side gutter works — rather than floating over the margin. Reserving is what makes **H1 clause 1 guaranteed** rather than usually-true. It narrows the text column, which is a visible change to every Simple-mode user, so **get UX sign-off on the width** alongside the §2.2 decision.

   🚨 **Scope the reservation to Simple mode (§1.6). This is the plan's biggest accidental-Power-change
   risk, and the component's `!isPowerMode` gate does not cover it.** `_usj-nodes.scss` styles the editor
   in **both** modes: a `padding-inline-end` on the bare `.usfm` selector, or a raised
   `--psc-gutter-width`, narrows every **Power** user's text column to make room for a control they will
   never see.
   **Use the existing mechanism, don't invent one:** add the rule to
   [`_simple-mode.scss`](../../extensions/src/platform-scripture-editor/src/_simple-mode.scss), scoped
   under `.editor-container-simple` — the marker class this web view already applies conditionally on
   `!isPowerMode` ([web-view.tsx:1888](../../extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx#L1888)).
   That file is `@use`d from `_editor-overrides.scss`, so no entry point needs touching, and its header
   documents why `[data-interface-mode='simple']` is unavailable inside a sandboxed web-view iframe (the
   attribute lives on the renderer's `document.body` — a different document). Since the class and the
   component share one condition, the space appears and disappears with the bar.

6. **Clamp to the editor panel. This is decided, not a constraint to work around.** Everything built here is clipped to the web view iframe (§3 → OQ-8). **Do not** attempt to overflow toward the neighbouring dock panel — it cannot work from inside a web view, and an attempt will read as a styling bug rather than a platform limit. Overlap is deferred work that needs the overlay service to accept component content.

**Acceptance criteria**

- [ ] The control appears in the gutter beside the text column, tracking the active line, **in Simple mode only**
- [ ] **In Power mode the editor is pixel-identical to before this ticket** — no bar, and **the text column is not narrowed**: the reserved space is Simple-scoped, not global (§1.6). Verify by toggling `platform.interfaceMode` with the same project open
- [ ] **Clamped inside the editor panel** — never attempts to draw over an adjacent dock panel (OQ-8)
- [ ] **Never overlaps project text** — verified at the top and bottom of the viewport, in LTR and RTL
- [ ] Does not collide with the paragraph marker labels already in the gutter; the chosen resolution from §2.2 is implemented and noted in the PR
- [ ] Correct for indented paragraphs (`\q`, `\q2`) — anchored at the leading margin, not the indent
- [ ] Position survives scrolling and does not jump when the popover closes
- [ ] While the tab is hidden: **no geometry computation**; on activation, position is correct with no stale flash — **backed by a test** (§2.4)
- [ ] Hidden-view decision documented at the sync site _and_ called out in the PR description, per the repo rule
- [ ] Reuses the `PT-XXX-D` control with **no changes to it**
- [ ] **Screenshots or a short video attached to the PR** — motion matters for this one

---

### `PT-XXX-B1` — Upstream: character-marker **remove**

> ## ✅ **DONE — merged as [scripture-editors PR #529](https://github.com/eten-tech-foundation/scripture-editors/pull/529) on 2026-08-07.**
>
> `removeCharacterMarker` is in scripture-editors `main`. ⚠️ **Not yet promoted to `platform-yalc`** —
> paranext-core cannot consume it until someone merges `main` into `platform-yalc`. Once that lands,
> `npm install` in paranext-core picks it up automatically. `PT-XXX-E1` is blocked on this promotion.

> **Reshaped by the `PT-XXX-A` spike, 2026-07-29 (§3 → A1–A5, A8).** Three changes: the **selection query
> is gone** (`contextMarker` already ships and paranext-core already reads it — A5); the unwrap is
> **`$unwrapNode` from `@lexical/utils`**, not a generalized `$unwrapTypedMarkNode` (A4); and the code goes
> in the **existing** `usj-marker-action.utils.ts`, not a new module, because all four splitting primitives
> are already private in that file (A3). Net: **5 hand-edited files instead of 8**, and certainty rises to
> High. This was the plan's least certain required work; it no longer is.

- **Type:** Story
- **Certainty:** **High** _(was Medium-high — raised by the spike)_. Every primitive already exists, is tested upstream, and needs no new export. Composition, not new algorithms.
- **NN served:** **N1 (delete)**, **N2**
- **Blocked by:** ~~`PT-XXX-A`~~ — **unblocked; the spike is done**
- **Blocks:** `PT-XXX-E1`
- **Parallel with:** `PT-XXX-C`, `PT-XXX-D`
- **On demo path?** No
- **PRD rows covered:** **N1 (delete)**, **N2 (content preserved)**
- **Repo:** `eten-tech-foundation/scripture-editors` (**not** paranext-core)

**Description**

Add **one** method — selection-based character-marker **removal** — to
`@eten-tech-foundation/platform-editor`. **No query**: see A5.

**Read this before estimating: every piece already exists, and four of them are already in the file you
will be editing.** Verified by the spike, 2026-07-29.

| Piece you need                                      | Where it already exists                                                                                                                                                                                                                                                                                                     | New export needed?         |
| :-------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------- |
| Unwrap a `CharNode`, keeping its text               | `$unwrapNode` from `@lexical/utils` — signature is `(node: ElementNode): void` (`@lexical/utils/index.d.ts:271`), and `CharNode extends ElementNode`, so it typechecks unchanged. **Already applied to `CharNode`** at `delta-apply-update.utils.ts:398` and `:406`, tested at `delta-apply-update.utils.test.tsx:986-1018` | **No**                     |
| Selection offsets, backward-safe                    | `getSelectionOffsets` — `usj-marker-action.utils.ts:264-268`                                                                                                                                                                                                                                                                | **No** — same file         |
| Walk the selection, skipping notes and marks        | `$getTargetNode` — `:270-292`. **Already skips `TypedMarkNode` and `NoteNode`**, so the §4.2 "inside a NoteNode" case is free                                                                                                                                                                                               | **No** — same file         |
| Split a partially-covered text node at offsets      | `handleTextNode` — `:294-312`, the 3-way `splitText(start, end)`                                                                                                                                                                                                                                                            | **No** — same file         |
| The wrap counterpart to mirror                      | `$wrapTextSelectionInInlineNode` / `$wrapNode` — `:214-253` / `:314-325`                                                                                                                                                                                                                                                    | **No** — same file         |
| Delete an emptied `CharNode`, merge adjacent equals | Automatic — `canBeEmpty()` is `false` (`CharNode.ts:259`) and `$charNodeTransform` (`CharNodePlugin.tsx:39-68`)                                                                                                                                                                                                             | **No**                     |
| Which marker is at the caret                        | **`StateChangeSnapshot.contextMarker`** — already public, already read by paranext-core (A5)                                                                                                                                                                                                                                | **No — and no new method** |

So the work is **adding a selection-based entry point to logic that already works**, not writing removal.
There is no `$setInlineType` in Lexical (verified), so the entry point itself is new code — but it
composes the pieces above with **zero new upstream exports**.

**Two decisions the spike made, so don't re-open them:**

- **Call `$unwrapNode` directly.** Do **not** generalize `$unwrapTypedMarkNode` — it lives at
  `libs/shared/src/nodes/features/TypedMarkNode.ts:1341` and has 4 callers in the annotation and comment
  paths (A4). Widening it would put character-marker work on comments' blast radius, and duplicate what
  `@lexical/utils` already provides.
- **Put the new function in the existing `usj-marker-action.utils.ts`**, not a new module in
  `libs/shared-react` (A3). A new module would require exporting all four private splitting helpers.

**The one genuinely novel bit** is the `markerMode` edge case: `$unwrapNode` does not strip synthesized
marker children, so under `markerMode: 'editable' | 'visible'` a bare unwrap leaves literal `\nd`/`\nd*`
text in the paragraph. Filter first with `$isMarkerNode(child) || $isVisibleMarkerNode(child)` — both
already exported from `shared`, combined precedent at `libs/shared/src/nodes/usj/node.utils.ts:574-576`.
~3 lines. Simple mode uses `'hidden'`, so this is not the main path, but it **must** be tested.

**Follow the `insertMarker` convention, not `formatPara`**: readonly guard, marker validation via
`isUsjMarkerSupported`, documented `@throws`, and tests. (`formatPara` has none of these and is an
inconsistent precedent.)

**Mode scoping (§1.6): one editor package serves both Simple and Power, so this must be purely additive
and inert in Power.** The new method is _callable_ in Power — that is unavoidable and harmless, because
nothing in Power calls it. What matters is that **no existing behavior changes**: `insertMarker`,
`formatPara`, `applyUpdate`, `$unwrapTypedMarkNode`, and every annotation/comment path stay untouched. This
is the same discipline A4 already imposes for a different reason (blast radius), so it costs nothing extra
here — it just now has a second justification. Note the `markerMode: 'editable' | 'visible'` test cases are
**not** Power-mode work: they cover the editor's marker-visibility modes, which is a separate axis from
`platform.interfaceMode`. Simple uses `'hidden'`; the other modes must still be correct.

```ts
removeCharMarker(marker?: string): void;               // omit → innermost
```

**No `getCharMarkersAtSelection`.** paranext-core gets the innermost marker from the `contextMarker` it
already stores. The nesting stack and the prototype's `(mixed)` state are `PT-XXX-B3`, **conditional on
OQ-1 resolving to Option B**.

Files that must change — **5 hand-edited + 1 generated** _(was 8)_:

| #   | File                                                                                         | Change                                                                                                                                              |
| :-- | :------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | `packages/platform/src/editor/adaptors/usj-marker-action.utils.ts` (**existing**, 354 lines) | Add `$removeCharMarkerAtSelection`, reusing the four private helpers above. **Composition, not new algorithms.** ~50–70 lines.                      |
| 2   | `packages/platform/src/editor/adaptors/usj-marker-action-utils.test.ts`                      | the 10 remove cases from §4.2                                                                                                                       |
| 3   | `packages/platform/src/editor/editor.model.ts`                                               | 1 signature + TSDoc — neighbors are `removeAnnotation` (:117) and `insertMarker` (:132)                                                             |
| 4   | `packages/platform/src/editor/Editor.tsx`                                                    | 1 `useImperativeHandle` entry in an `update()`, next to `insertMarker` (:311-325)                                                                   |
| 5   | `packages/platform/src/marginal/Marginal.tsx`                                                | 1 pass-through — mirror `insertMarker` at :186-188. **Mandatory or typecheck fails** (`MarginalRef extends EditorRef`)                              |
| 6   | `packages/platform/etc/platform-editor.api.md`                                               | **Generated but tracked.** `nx extract-api` (`project.json:8-20`, `api-extractor run --local`) rewrites it on every `devpub`; **must be committed** |

Also: `packages/platform/README.md` Ref tables (:194-203) if the repo keeps them in step, and a version
bump PR by repo convention (`platform: bump version for next release`) — **neither is on the sprint path**,
since delivery is a merge to `platform-yalc`.

**Dropped from the old list:** the new `libs/shared-react` module and its `libs/shared-react/src/index.ts`
re-export (not needed — A3), and `packages/platform/src/index.ts` (nothing new to export, since the query
is gone).

**Acceptance criteria**

- [ ] `removeCharMarker` exists on `EditorRef`, exported, documented with `@throws`
- [ ] **Removing a marker preserves every character of its content** — asserted for all 10 remove cases in §4.2 _(this is N2)_. Mirror the shape already asserted at `delta-apply-update.utils.test.tsx:986-1018`
- [ ] Nested markers: inner and outer can each be removed independently, leaving the other intact
- [ ] Selections inside a `NoteNode` are skipped, matching `$getTargetNode`'s existing behavior
- [ ] `markerMode: 'editable'` and `'visible'`: synthesized `MarkerNode` / `ImmutableTypedTextNode` children are stripped on unwrap — **no literal `\nd`/`\nd*` text left behind**
- [ ] Readonly mode throws, consistent with `insertMarker`
- [ ] **`$unwrapTypedMarkNode` is untouched** — a reviewer should be able to confirm from the diff that no annotation or comment code path was modified
- [ ] **Purely additive: no existing `EditorRef` member changes behavior** (§1.6). The package serves both interface modes, so an existing-method change would land in Power. Confirmable from the diff and from the regenerated `etc/platform-editor.api.md`, which should show additions only
- [ ] `Marginal.tsx` delegation present; `nx extract-api` output committed
- [ ] CI green on macOS + Windows + Ubuntu (`lint`, `typecheck`, `test`, `build`)
- [ ] **Merged and pushed to the `platform-yalc` branch**, and confirmed visible in paranext-core after `npm install` (no npm publish or version bump needed for the sprint)

---

### `PT-XXX-B2` — Upstream: character-marker **replace**

> ## ✅ **DONE — merged as [scripture-editors PR #535](https://github.com/eten-tech-foundation/scripture-editors/pull/535) on 2026-08-10. `platform-yalc` is now fully up to date — `npm install` in paranext-core picks up both B1 and B2.**

- **Type:** Story
- **Certainty:** High — **confirmed by the spike**, and cheaper than stated. `CharNode.setMarker` (`CharNode.ts:184`) is the whole mutation and is already used exactly this way at `delta-apply-update.utils.ts:366`. Shares `PT-XXX-B1`'s file.
- **NN served:** **N1 (change)**
- **Blocked by:** ~~`PT-XXX-A`~~ (**done**); benefits from `PT-XXX-B1` landing first (shares the file and its private helpers)
- **Blocks:** `PT-XXX-E2`
- **Parallel with:** `PT-XXX-D`
- **On demo path?** No
- **PRD rows covered:** **N1 (change)**

**Description**

Add `replaceCharMarker(fromMarker: string, toMarker: string): void` to `EditorRef`, in the same file as
`PT-XXX-B1` (`packages/platform/src/editor/adaptors/usj-marker-action.utils.ts`).

```ts
replaceCharMarker(fromMarker: string, toMarker: string): void;
```

Mostly `CharNode.setMarker` (already public at `CharNode.ts:184-190`) plus the partial-coverage split
path shared with removal. **Tracked separately from `PT-XXX-B1` so that "change" can be cut without
touching the delete work** — it may still land in the same upstream PR if that is more convenient for
the reviewer; the separation is about droppability, not PR count.

**Two things the spike confirmed are free here** (A8): `canBeEmpty(): false` (`CharNode.ts:259`) plus
`$charNodeTransform` (`CharNodePlugin.tsx:39-68`) delete emptied CharNodes **and merge adjacent
same-attribute siblings**, so a replace that lands next to an identical marker coalesces automatically —
don't hand-roll it, and don't fight it. Caveat for OQ-1: that transform merges only **adjacent siblings**,
not nested duplicates, so `\nd` inside `\nd` remains a reachable state.

Same file list as `PT-XXX-B1` items 1 and 3–6 (one more signature, one more `useImperativeHandle` entry,
one more `Marginal` delegation, regenerated API report, tests) — **note the list shrank when `PT-XXX-B1`
was reshaped by the spike**; there is no new module and no `libs/shared-react` re-export.

**Acceptance criteria**

- [ ] `replaceCharMarker` on `EditorRef`, exported, documented with `@throws`
- [ ] **Purely additive; no existing `EditorRef` member changes behavior** — the package serves both interface modes (§1.6)
- [ ] Replace preserves content and attributes; same-marker replace is a no-op
- [ ] Partial coverage splits correctly
- [ ] Nested markers: replacing the inner leaves the outer intact
- [ ] Invalid target marker throws, consistent with `insertMarker`
- [ ] `Marginal.tsx` delegation present; `nx extract-api` output committed
- [ ] CI green on all three OSes

---

### ~~`PT-XXX-B3`~~ — **CLOSED 2026-07-30. Do not create.**

> **`(mixed)` needs no upstream work, and the nesting stack is not needed.** Two findings closed this:
>
> 1. **`(mixed)` is derivable in paranext-core** from `getSelection()` + `getUsj()` + `UsjReaderWriter`,
>    following the existing precedent at
>    [web-view.tsx:679-681](../../extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx#L679-L681).
>    The same analysis pass also produces U3's partial/all/none tri-state and U4's coverage map — one
>    computation, three consumers. Sized on `PT-XXX-D` / `PT-XXX-E1`, not upstream.
> 2. **OQ-1 resolved to Option A** (innermost marker at the caret), verified by driving the hosted
>    prototype on 2026-07-29 — so no nesting-stack query is required.
>
> The upstream work that _did_ survive from this area is **`PT-XXX-B4`** below, which is a mutation, not a
> query. Section kept as a tombstone so the closure is auditable rather than a silent deletion.

**Historical scope, for the record only:**

### ~~`PT-XXX-B3` (historical)~~ — Upstream: nesting-stack query + `(mixed)` state

- **Type:** Story
- **Certainty:** Medium — a new upstream query with real design questions (partial coverage, ordering).
- **NN served:** — (serves **OQ-1 Option B** only; not required under Option A)
- **Blocked by:** **OQ-1 resolving to Option B.** Do not start otherwise.
- **Blocks:** the Option B chip UI on `PT-XXX-E1`
- **On demo path?** No
- **Status:** 🔻 **Do not create in Jira unless OQ-1 lands on Option B.** Not on the cut list — it was never in the box (§5.2). Written up by the `PT-XXX-A` spike so that Option B's cost is _visible before_ OQ-1 is answered, rather than hidden inside `PT-XXX-B1`.
- **PRD rows covered:** none directly — it widens **N1 (delete)** / **N1 (change)** from "innermost marker" to "any overlapping marker"

**Description**

The spike (A5) found that Option A's query already ships: `StateChangeSnapshot.contextMarker` is the
innermost marker containing the selection. **This ticket exists for the two things `contextMarker` cannot
do**, both of which are Option B territory:

1. **The full nesting stack.** `contextMarker` returns one marker. Removing the _outer_ of
   `\wj …\nd Lord\nd*…\wj*` when the caret is inside `\nd` needs the parent chain.
2. **The prototype's `(mixed)` state.** `contextMarker` is `$getCommonAncestorCompatible(anchor, focus)`
   filtered by `$isReactNodeWithMarker` (`StateChangePlugin.tsx:72-75`). A selection spanning a marked run
   **plus** adjacent plain text lifts to the `ParaNode`, yielding `"p"` — **indistinguishable from "no
   character marker."** So `(mixed)` (`CharStyleCombobox.tsx:58`) cannot be derived from what ships today.

Shape, if it is ever built — an imperative `read()` getter, **not** a new `StateChangeSnapshot` field, per
§3 (`$updateState` early-returns and would recompute per keystroke):

```ts
getCharMarkersAtSelection(): { marker: string; isFullyCovered: boolean }[];  // inner → outer
```

Same file list as `PT-XXX-B1` items 3–6, plus `packages/platform/src/index.ts` to export the return type.

**Acceptance criteria**

- [ ] ~~Returns the nesting stack inner→outer with a correct `isFullyCovered` flag~~
- [ ] ~~Cases: no CharNode · one · nested stack ordering · partial vs full coverage · collapsed cursor~~
- [ ] ~~A selection spanning a marked run and plain text is distinguishable from a selection in unmarked text~~
- [ ] ~~Implemented as a `read()` getter; `StateChangeSnapshot` gains no fields~~
- [ ] ~~`Marginal.tsx` delegation present; `nx extract-api` output committed~~

---

### `PT-XXX-B4` — Upstream: **extend** an existing character marker over a wider selection

> ## ✅ **DONE — [scripture-editors PR #537](https://github.com/eten-tech-foundation/scripture-editors/pull/537) merged 2026-08-11; `platform-yalc` current.**

- **Type:** Story
- **Certainty:** **Medium-high** — composes existing primitives like `PT-XXX-B1`, and the hardest part (coalescing) is already automatic. The uncertainty is the gap-computation, not the mutation.
- **NN served:** **N1 (change)** — this is the mutation behind UX's partial → **all** step (§3 → U4)
- **Blocked by:** nothing upstream; **benefits from `PT-XXX-B1` landing first** (same file, same private helpers)
- **Blocks:** `PT-XXX-E2`'s toggle cycle
- **Parallel with:** `PT-XXX-C`, `PT-XXX-D`
- **On demo path?** No
- **PRD rows covered:** **N1 (change)**, jointly with `PT-XXX-B2` and `PT-XXX-E2`
- **Repo:** `eten-tech-foundation/scripture-editors` (**not** paranext-core)
- **Created:** 2026-07-30, from the UX meeting (§3 → U4). **This is the one genuinely new requirement that meeting produced.**

**Description**

UX's toggle cycle for a partially-covered selection is **partial → all → none → all → none…** (U4). The
"→ all" step is a mutation this plan did not previously have: **extend the existing marker to cover the
whole selection.**

For selection `kolo ` + `\bd Mulu\bd*`, applying `bd` must produce `\bd kolo Mulu\bd*` — the `\bd` moves to
before the first letter of the selection. It is **neither wrap nor replace**: a naive
`insertMarker('bd')` over the whole selection yields `\bd kolo \bd Mulu\bd*\bd*`, nested identical markers.

**Why this is smaller than it sounds — the coalescing is free.** `$charNodeTransform`
(`CharNodePlugin.tsx:48-68`) already merges adjacent CharNodes with the same marker and attributes. So:

| Step                                                                                          | Where                                                                                                      | Cost                     |
| :-------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------- | :----------------------- |
| 1. Compute which sub-ranges of the selection are **not** already covered by the target marker | **paranext-core** — the same `getUsj()` + `UsjReaderWriter` pass that produces `(mixed)` and the tri-state | Shared, not charged here |
| 2. Apply the marker **only to the uncovered gaps**                                            | **upstream — this ticket**                                                                                 | The new work             |
| 3. Adjacent same-marker CharNodes merge into one                                              | **free** — existing transform                                                                              | Zero                     |

**Read `$wrapSelectionInTypedMarkNode` (`TypedMarkNode.ts:1355+`) before starting.** It solves the
structurally identical splitting problem for annotations, including the 3-way
`splitText(startTextOffset, endTextOffset)` and nesting resolution via
`registerNestedElementResolver`. **It is a reference, not reusable code** — a `TypedMarkNode` represents
overlap by holding many ids at once, while a `CharNode` holds exactly one `__marker` and nests (§3 → U5).

Same file as `PT-XXX-B1`: `packages/platform/src/editor/adaptors/usj-marker-action.utils.ts`, reusing the
same four module-private helpers. Same file list as `PT-XXX-B1` items 1 and 3–6.

```ts
extendCharMarker(marker: string): void;   // cover the whole selection with `marker`, merging existing runs
```

**Two edge cases that must be explicit tests**, both from the UX meeting:

- **Whitespace at the selection edges** (OQ-7). `$moveLeadingSpaceToPreviousNode` (`usj-marker-action.utils.ts:327`) already has an opinion about leading spaces on the insert path — match it rather than inventing new behavior.
- **Mutually exclusive markers** (OQ-6). If the target marker cannot coexist with one already present, extend must remove the conflicting one. **Do not implement the conflict list here** — take it as injected data so OQ-6 can be answered late without reopening this ticket.

**Acceptance criteria**

- [ ] `extendCharMarker` on `EditorRef`, exported, documented with `@throws`
- [ ] **Purely additive; no existing `EditorRef` member changes behavior** — the package serves both interface modes (§1.6)
- [ ] `kolo ` + `\bd Mulu\bd*` + extend `bd` → **one** `\bd` covering the whole selection, **not** nested
- [ ] **No nested identical markers are ever produced** — explicitly asserted; this is the failure mode the ticket exists to prevent
- [ ] Content preserved character-for-character
- [ ] Already-fully-covered selection → no-op (no duplicate wrap)
- [ ] Multiple separate marked runs inside one selection all coalesce into one
- [ ] Whitespace handling matches the insert path's existing behavior (OQ-7)
- [ ] The mutual-exclusion rule is **injected, not hard-coded** (OQ-6)
- [ ] Readonly mode throws, consistent with `insertMarker`
- [ ] `Marginal.tsx` delegation present; `nx extract-api` output committed
- [ ] CI green on all three OSes

---

### `PT-XXX-E1` — Remove a character marker

> ## ✅ **DONE — [PR #2665](https://github.com/paranext/paranext-core/pull/2665) merged 2026-08-11.**

- **Type:** Story
- **Certainty:** Medium — depends on how OQ-1 is answered. High if OQ-1 lands on the innermost-marker option; lower if it lands on the full-marker-set option.
- **NN served:** **N1 (delete)**, **N2**
- **Blocked by:** `PT-XXX-B1`, `PT-XXX-D`
- **Blocks:** nothing — `PT-XXX-F1`/`F2` reuse the control and inherit whatever operations it exposes
- **Parallel with:** `PT-XXX-G`
- **On demo path?** No — lands in the second half; part of Demo 2
- **PRD rows covered:** **N1 (delete)**, **N2 (delete removes markers, not content)**

**Description**

Wire `removeCharMarker` into the character-marker control built by `PT-XXX-D`, reading **the
`contextMarker` this repo already stores** to decide what to target. Keep the changes inside the control
itself, not in its placement wrapper, so `PT-XXX-F1`/`F2` inherit remove for free.

**Updated by the spike (A5):** there is no `getCharMarkersAtSelection` to wire. The marker at the caret
comes from `StateChangeSnapshot.contextMarker`, already in state at
[web-view.tsx:317](../../extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx#L317)
and set at
[:1852](../../extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx#L1852);
filter it with `isCharacterMarker` from `PT-XXX-C`. That removes the upstream dependency from _this half_
of the ticket — the control can show and disable correctly before `PT-XXX-B1` lands, and only the remove
_action_ needs it.

- A **"Remove marker"** action in the popover, showing which marker will be removed. Under OQ-1 Option A this targets the innermost character marker at the caret — i.e. `contextMarker`, when `isCharacterMarker(contextMarker)`.
- **Disabled states with reasons**, not silent no-ops: no character marker at the caret; sync-blocked.
- ⚠️ **One behavior this ticket must define, because `contextMarker` cannot distinguish it (A5, limit 2).** A selection spanning a marked run **plus** adjacent plain text lifts to the `ParaNode`, so `contextMarker` is `"p"` — identical to "cursor in unmarked text." Both therefore read as _"no character marker to remove,"_ and remove is disabled. That is an acceptable Option A behavior, but it is **not** the prototype's `(mixed)` state and must not be described as such. Distinguishing the two needs `PT-XXX-B3`. **State this explicitly in the PR description** so the reviewer scrutinizes it rather than assuming `(mixed)` shipped.
- **Pre-commit a version-history snapshot** before the destructive removal, matching [web-view.tsx:856](../../extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx#L856) and tolerating `ERROR_UNIMPLEMENTED`. This is the user's undo of last resort.
- **Optional AC (cheap):** add "Remove character marker" to `EditorOptions.contextMenu` ([:789-796](../../extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx#L789-L796)) — an append-only array, so a few lines for a second discoverable entry point. **Do not** also add a DOM `onContextMenuCapture` menu; the two conflict.
  🚨 **Gate this one (§1.6).** That array is a single value serving **both** interface modes, so an
  unconditional append puts a new item in every Power user's right-click menu — the cheapest possible way
  to break the Simple-only rule, precisely because the change is three lines and looks inert. Build the
  array conditionally on `!isPowerMode` and assert the Power-mode contents in a test (§4.3).

**Acceptance criteria**

- [ ] **Removing a marker leaves every character of its content in place** — verified in the app and by test _(N2)_
- [ ] Nested markers: the innermost is targeted; the outer survives
- [ ] Disabled cases show a reason (tooltip or message), never a silent no-op
- [ ] The `contextMarker` limitation above is **named in the PR description**, and the UI does not claim a `(mixed)` state it cannot detect
- [ ] Undo restores the removed marker **and** its content in one step
- [ ] **Annotations and comments survive** removal _(guards the `setUsj` trap)_
- [ ] A rejected write during Send/Receive reverts the editor visibly, via the existing `SR_EDIT_BLOCKED` handler
- [ ] Version-history snapshot committed before removal
- [ ] _(if the context-menu AC is taken)_ **The editor's right-click menu is unchanged in Power mode** — asserted by test, not eyeballed (§1.6)
- [ ] Component tests per §4.3
- [ ] **Screenshots or a short video attached to the PR**

---

### `PT-XXX-E2` — Change a character marker

- **Type:** Task
- **Certainty:** High — reuses `PT-XXX-E1`'s plumbing entirely.
- **NN served:** **N1 (change)**
- **Blocked by:** `PT-XXX-B2`, `PT-XXX-E1`
- **Blocks:** nothing
- **On demo path?** No — part of Demo 2
- **PRD rows covered:** **N1 (change)**

**Description**

Wire the **toggle cycle** UX specified on 2026-07-30 (§3 → U4) into the `PT-XXX-D` control.

⚠️ **Reshaped 2026-07-30. Earlier drafts asserted "change must replace rather than nest" as a settled
requirement with no source — that assertion is withdrawn (see OQ-5).** UX's actual answer is a cycle, and
its first step is a mutation this plan did not have:

| From state                           | Click does                                            | Calls                             |
| :----------------------------------- | :---------------------------------------------------- | :-------------------------------- |
| **partial** (selection part-covered) | **extend** — grow the marker over the whole selection | `extendCharMarker` (`PT-XXX-B4`)  |
| **all**                              | **remove** every instance in the selection            | `removeCharMarker` (`PT-XXX-B1`)  |
| **none**                             | **apply** to the selection                            | `insertMarker` (**exists today**) |

…so a mixed selection cycles **partial → all → none → all → none…**

**Two branches are still undefined and must not be guessed:**

- **A _different_ marker on an already-marked selection** — nest, replace, or reject? U4 only specifies same-marker behavior. **OQ-5.**
- **Mutually exclusive markers** — applying one must remove the other. **OQ-6.** Take the conflict list as injected data (matching `PT-XXX-B4`) so this ticket does not block on it.

Cheap only because `PT-XXX-E1` has already built the coverage analysis and the tri-state plumbing.

**Acceptance criteria**

- [ ] The cycle behaves as the table above: partial → all → none → all → none…
- [ ] `kolo ` + `\bd Mulu\bd*`, click `bd` → whole selection bold as **one** marker; click again → all `\bd` gone, **text intact**
- [ ] **No nested identical markers are ever produced** by any step of the cycle — explicitly asserted
- [ ] Changing a nested inner marker leaves the outer intact
- [ ] Content preserved through every step
- [ ] Undo restores the previous state in one step
- [ ] Annotations and comments survive a change
- [ ] After the operation the control shows the **new** state and the selection still covers the same text — the prototype gets this wrong by moving the caret past the closing marker, so it reads `(none)` after a successful change; do not reproduce that
- [ ] OQ-5 and OQ-6 are either answered or the unimplemented branches are **explicitly disabled with a reason**, never silently wrong
- [ ] **Screenshots or a short video attached to the PR**

---

### `PT-XXX-G` — Localization and keyboard-shortcut catalog _(+ PAPI command, cut candidate)_

> ## 🔄 **IN REVIEW — [PR #2664](https://github.com/paranext/paranext-core/pull/2664) open as of 2026-08-10** (`localization-keyboard-catalog` branch).
>
> Locale strings for the character-marker search placeholder and related keys; keyboard-shortcut catalog
> entries. PAPI command + menu item half is cut per the sprint appetite.

- **Type:** Task
- **Certainty:** High — mechanical, but non-optional per repo rules.
- **NN served:** N1 (add — discoverability, second entry point)
- **Blocked by:** `PT-XXX-D`
- **Blocks:** nothing
- **Parallel with:** `PT-XXX-E1`, `PT-XXX-E2`
- **On demo path?** No
- **PRD rows covered:** N1 (add — discoverability)

**Description**

Repo-rule and cross-cutting work. The first two halves are **non-optional**; the third is the cut
candidate, and the first item in the cut order (§5.2).

1. **Localization (required)** — new `%markerMenu_*%` / `%characterMarkerControl_*%` keys. Platform-shell strings go in [assets/localization/en.json](../../assets/localization/en.json) **and** `es.json` (**both, or the build fails**); extension-namespaced strings go in [contributions/localizedStrings.json](../../extensions/src/platform-scripture-editor/contributions/localizedStrings.json). Existing keys are immutable — add a new key plus a `metadata.fallbackKey` redirect if wording must change. Note `lib/platform-bible-react/src/localizedStrings.json` is a **Storybook pseudo-localization fixture**, not a real source. Library components must not call `useLocalizedStrings` — pass strings via props, per the `MarkerMenu` contract.
2. **Keyboard-shortcut catalog (required)** — if any handler is added or changed, add/update the `KeyboardShortcutEntry` in [keyboard-shortcuts.data.ts](../../src/stories/keyboard-shortcuts.data.ts) **in the same change**, with per-OS keys and repo-relative `locations` ([keyboard-shortcuts-catalog.md](../../.claude/rules/keyboard-shortcuts-catalog.md)). Existing neighbors: `scripture-markers-menu` (:169-178), `scripture-close-markers-menu` (:179-188). Required even without a new shortcut, if an existing handler's behavior changes.
   ⚠️ **If a new shortcut is added, it must be Simple-only too (§1.6).** A keydown listener registered
   unconditionally fires in Power mode — invisible in the UI, but still a behavior change, and the kind
   a screenshot review will never catch. **Preferred outcome: add no new shortcut**, in which case this
   item is a no-op and the two existing entries stay as they are. Whichever way it goes, the catalog entry
   must state the Simple-only `context`.
3. **PAPI command + menu item (CUT FIRST)** — register `platformScriptureEditor.applyCharacterMarkerAtSelection` following the 4-layer pattern used by `insertFootnoteAtSelection`: command at [main.ts:1189](../../extensions/src/platform-scripture-editor/src/main.ts#L1189) → `EditorWebViewMessage` union in [platform-scripture-editor.d.ts:143-144](../../extensions/src/platform-scripture-editor/src/types/platform-scripture-editor.d.ts#L143-L144) → `postMessageToWebView` → the web view's message listener at [:812-816](../../extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx#L812-L816). Add an item to the `platformScriptureEditor.insert` column ([menus.json:141-158](../../extensions/src/platform-scripture-editor/contributions/menus.json#L141-L158)). **Menu JSON has no `when`/`visibility` field**, so mode-gate in code by not registering the command in Power mode.

**Acceptance criteria**

- [ ] All new strings localized in `en` and `es`; no hardcoded JSX strings (`paranext/no-hardcoded-jsx-strings` clean)
- [ ] No existing localization key mutated; any rewording uses a new key plus `fallbackKey`
- [ ] Keyboard-shortcut catalog accurate for macOS and Windows/Linux, with correct `locations` paths
- [ ] **Any new keyboard handler is gated to Simple mode**, and its catalog entry says so; ideally no new handler exists (§1.6)
- [ ] _(if part 3 kept)_ Command registered, invocable via PAPI by another extension, present in the Insert menu in Simple mode only
- [ ] `npm run typecheck && npm run lint && npm test` clean

---

### `PT-XXX-I` — Design reconciliation against the Magic Patterns prototype

- **Type:** Task
- **Certainty:** High — a review conversation plus follow-ups.
- **NN served:** **N1 (usable)**
- **Blocked by:** `PT-XXX-D` (can run before `PT-XXX-E1`/`E2` for the add-only surface)
- **Blocks:** nothing
- **On demo path?** No — but bring the prototype to the day-4 demo and start this conversation there
- **PRD rows covered:** **N1 (usable)** — "in a usable way (propose similar to magic patterns prototype)"

**Description**

N1 defines "usable" by reference to the
[prototype](https://www.magicpatterns.com/c/hlhzc4kt5kucjcxdumaga8/preview?hideToolbar=true&disableComments=true),
which is a client-rendered SPA that could not be read while writing this plan. Walk the built UI
against it with Todd and Alex, and record deltas as either accepted differences or follow-up tickets.

Resolve **OQ-2** here at the latest — but if the prototype turns out to be a _floating_ design, that
must surface **before sprint start**, because it makes `PT-XXX-F1` the required placement instead of
`PT-XXX-D`.

**Acceptance criteria**

- [ ] Built UI compared against the prototype, screen by screen, with Todd and/or Alex present
- [ ] Each delta recorded as accepted, or as a follow-up ticket
- [ ] OQ-2 closed
- [ ] Todd confirms N1's "usable" bar is met

---

### `PT-XXX-F1` — **Floating** placement: pill near the active line _(CUT FIRST)_

- **Type:** Story
- **Certainty:** Low — the riskiest placement. Radix collision, web-view dismissal, and no repo precedent for selection-triggered UI.
- **NN served:** — **NTH** (OQ-3 C1 — an additional render location)
- **Blocked by:** `PT-XXX-D`
- **Blocks:** `PT-XXX-F3`
- **Parallel with:** `PT-XXX-F4`, and the losing `D1`/`D2` variant
- **On demo path?** No
- **Status:** Nice-to-have, cut first. **Riskiest of the three placements** — see §2.3.

**Description**

Mount the `PT-XXX-D` control as a horizontal pill near the active line — the prototype's **Floating**
placement, and the form in the 2026-07-27 screenshot. Not to be confused with the required Side
placement; see the terminology callout in §2.

Build it in
[scripture-editor.stories.tsx](../../lib/platform-bible-react/src/components/demo/scripture-editor/scripture-editor.stories.tsx)
against a live `Editorial` before wiring it into the web view.

Three constraints that are the actual work:

1. **Overlap avoidance.** Radix portals into the _iframe's_ body, so content is clipped to the iframe viewport and collision handling flips/shifts it — potentially over the text H1 exists to protect. Verify the flip behavior explicitly; do not assume `side="bottom"` suffices.
2. **Hidden views.** §2.2 applies. Defer position computation while hidden; back the catch-up with a test.
3. **Dismissal.** Pointer-based outside-dismiss silently fails when the user clicks into a sibling sandboxed web view. Use the focus check against the portaled content node, guarded by `document.hasFocus()` ([dismissal-patterns.mdx:134-160](../../lib/platform-bible-react/src/stories/guidelines/dismissal-patterns.mdx#L134)).

There are four duplicated selection-anchor triples in the web view already. If this adds a fifth,
extract a shared hook as part of this ticket — not speculatively ahead of it.

**Acceptance criteria**

- [ ] The control appears near the active line, offering exactly the same actions as the Side placement, **in Simple mode only** — inherits `PT-XXX-D`'s gate; adds no Power-mode surface of its own (§1.6)
- [ ] **Does not cover the selected text or the run containing it**, at the top and bottom of the viewport, in LTR and RTL
- [ ] While the tab is hidden: no geometry computation; correct on activation with no stale flash — backed by a test
- [ ] Dismisses on outside click, Escape, and focus loss to a sibling web view
- [ ] Reuses the `PT-XXX-D` control with **no changes to it** — if it needs modifying, that signals `PT-XXX-D` leaked placement concerns
- [ ] Developed and demonstrated in a Storybook story against a live `Editorial`
- [ ] **Screenshots or a short video attached to the PR**

---

### `PT-XXX-F4` — Draggable marker control _(CUT FIRST — take last)_

- **Type:** Task
- **Certainty:** Low — no drag precedent in this repo, and it fights the auto-repositioning the gutter placement depends on. Genuine rabbit hole.
- **NN served:** — **NTH** (OQ-3 C2)
- **Blocked by:** `PT-XXX-D`
- **Blocks:** nothing
- **Parallel with:** `PT-XXX-F1`
- **On demo path?** No
- **Status:** Nice-to-have. **Take this last of all the NTHs** — genuine rabbit-hole risk.

**Description**

Let the user reposition the marker control by dragging it. The prototype does this with a
`GripVertical` handle and suspends auto-positioning once dragged (`if (dragOffset) return`), which is
the key behavior to copy: a dragged control must stop tracking the active line, or it will fight the
user.

Why this is last: **no drag precedent exists in this repo**, and dragging interacts badly with iframe
clipping and with the auto-repositioning that the Side and Floating placements depend on. Earlier drafts
of this plan recommended rejecting it outright; it is included because the implementation owner
confirmed on 2026-07-28 that it is a wanted nice-to-have — but it is the last thing to pick up.

**Acceptance criteria**

- [ ] The control can be dragged to a new position by its grip, **in Simple mode only** — no Power-mode surface (§1.6)
- [ ] Auto-positioning suspends once dragged and does not resume until reset
- [ ] Dragged position stays within the web view's viewport; cannot be dragged out of reach
- [ ] Does not overlap project text when dragged over it, or documents that it may (a deliberate user choice)
- [ ] **Short video attached to the PR** — this one needs motion to review

---

### `PT-XXX-F3` — **Toolbar Position** chooser: let the user pick the placement _(CUT FIRST)_

- **Type:** Task
- **Certainty:** Medium — mechanical, but it is the only ticket that adds stored data.
- **NN served:** — **NTH** (prototype fidelity)
- **Blocked by:** at least two of `PT-XXX-D1` / `PT-XXX-D2` / `PT-XXX-F1`
- **Blocks:** nothing
- **On demo path?** No
- **Status:** Nice-to-have, cut first. **Meaningless unless ≥2 placements ship** — do not create work here otherwise.

**Description**

Reproduce the prototype's **Toolbar Position** chooser: a segmented control (**Fixed | Floating |
Side**) plus the in-toolbar `↔` button, which in the prototype flips Side ↔ Floating only and never
reaches Fixed.

**This is the only ticket in the plan that adds stored data.** The choice must persist, which means a
user-scoped setting — `platformScriptureEditor.characterMarkerToolbarPosition`, declared in
[contributions/settings.json](../../extensions/src/platform-scripture-editor/contributions/settings.json)
and typed by augmenting `SettingTypes` in
[platform-scripture-editor.d.ts:717-723](../../extensions/src/platform-scripture-editor/src/types/platform-scripture-editor.d.ts#L717-L723).
Register a validator, following
[core-settings-info.data.ts:108-118](../../src/extension-host/data/core-settings-info.data.ts#L108-L118).

Two repo facts that shape this:

- Every settings subscriber fires on **any** setting write (documented at [web-view.service-host.ts:938-944](../../src/renderer/services/web-view.service-host.ts#L938-L944)) — compare against a cached previous value before doing expensive work.
- If this setting is added, **re-check `paratext-10-studio` readiness** (§11). A user-scoped setting is the mechanism that created a second-repo dependency for `enableScriptureTextGrid`.

**Acceptance criteria**

- [ ] Segmented control offering only the placements that actually shipped, **in Simple mode only** (§1.6)
- [ ] Choice persists across restart via a user-scoped setting, with a registered validator. **The setting is declared globally but read only by Simple-mode code** — declaring it changes nothing for a Power user
- [ ] `↔` shortcut flips between placements, matching the prototype's behavior
- [ ] Switching placement takes effect live, with no restart and no stale positioning
- [ ] Setting subscriber does not do work on unrelated setting writes
- [ ] `paratext-10-studio` readiness re-confirmed and recorded
- [ ] **Screenshots or a short video attached to the PR**

---

### `PT-XXX-J` — Additional actions in the marker UI _(NTH — cut)_

- **Type:** Task
- **Certainty:** High — composition of commands that already exist.
- **NN served:** — **NTH** (OQ-3 C3)
- **Blocked by:** `PT-XXX-D`
- **Blocks:** nothing
- **On demo path?** No
- **PRD rows covered:** OQ-3 C3 (comment-thread NTH), pending Todd's acceptance in OQ-3
- **Status:** Nice-to-have. Separate ticket so it never blocks the critical path.

**Description**

Surface additional actions alongside the marker picker — insert footnote, insert cross-reference —
so the marker UI becomes the single contextual place for markup actions. Both already exist as PAPI
commands (`insertFootnoteAtSelection`, `insertCrossReferenceAtSelection` at
[main.ts:1144](../../extensions/src/platform-scripture-editor/src/main.ts#L1144),
[:1189](../../extensions/src/platform-scripture-editor/src/main.ts#L1189)), so this is composition,
not new behavior.

Cheap because `PT-XXX-D` builds on `TabToolbar`'s existing slot composition — that design constraint
is recorded there, but the actions themselves are this ticket's scope.

**Acceptance criteria**

- [ ] Footnote and cross-reference actions available from the marker UI, reusing the existing commands, **in Simple mode only** — the actions are co-located inside the gated container, and their existing entry points elsewhere are untouched in both modes (§1.6)
- [ ] Adding them causes no re-layout of the existing control
- [ ] Disabled states consistent with the existing menu items
- [ ] Todd has accepted OQ-3 row 3 before this is built

---

### `PT-XXX-H` — Spike: prove editor E2E interaction _(CUT SECOND IF TIGHT)_

- **Type:** Spike
- **Certainty:** Low by design — that is what the spike is for. Time-boxed; a negative result is a success.
- **NN served:** — (regression insurance)
- **Blocked by:** `PT-XXX-D`
- **Blocks:** nothing
- **On demo path?** No
- **PRD rows covered:** none directly
- **Status:** Outside appetite. Cut second.

**Description**

Determine whether an editor-driving E2E test is economical. **No test in ~15k lines of spec code types
into the editor**, and `e2e-tests/test-results/annotation-insertion-PT-38-…-opens-and-saves-the-editor-isolated/`
contains failure screenshots and a trace for a spec that no longer exists in the repo or git history —
a prior attempt failed twice and was abandoned. Treat this as unproven capability.

Prove the interaction over CDP with the `visual-verification` skill first. If it works, land one spec
at `e2e-tests/tests/isolated/character-markers.spec.ts` per [e2e-tests/CLAUDE.md](../../e2e-tests/CLAUDE.md)
(authoritative over Testing-Guide.md on both location and fixture; do **not** model on `manage-books/`
or `markers-checklist/`). Reuse `openScriptureEditorForProject`
([scripture-editor-helpers.ts:18](../../e2e-tests/fixtures/scripture-editor-helpers.ts#L18)).

Time-box hard at one day. A negative result is a successful spike.

**Acceptance criteria**

- [ ] A yes/no answer on whether caret placement and text selection inside the editor iframe are drivable, with evidence
- [ ] If yes: one passing spec in `tests/isolated/` covering apply → persist → remove → **content survives**
- [ ] If no: a written note on what blocks it, so the next attempt doesn't restart from zero
- [ ] Findings recorded either way (this is the third attempt at editor E2E)

---

## 8. Dependency Graph

```
        ┌──────────────────────────────┐   ┌──────────────────────────────┐
   ✅ ▶ │ PT-XXX-A  Spike: verify API  │   │ PT-XXX-C  isCharacterMarker  │★
        │ DONE 2026-07-29 (§3 A1–A9)   │   │ + item generator             │
        │ no longer blocks B1/B2       │   └──────────────┬───────────────┘
        └───────────┬──────────────────┘                  │
             (unblocked)                                   ▼
        ┌───────────┴───────────┐         ┌──────────────────────────────────┐
        ▼                       ▼         │ PT-XXX-D  The control            │★
┌────────────────────┐ ┌──────────────────┤ (PLACEMENT-AGNOSTIC)             │
│ PT-XXX-B1 UPSTREAM │ │ PT-XXX-B2 UPSTR. │└────┬──────────────┬─────────────┘
│ remove (5 files)   │ │ replace          │     │              │
│ N1(delete) + N2    │ │ N1 (change)      │     ▼              ▼
│ via platform-yalc  │ └────────┬─────────┘  ┌─────────────┐ ┌─────────────┐
└─────────┬──────────┘          │            │ D1  Fixed   │ │ D2  Side    │
          │                     │            │  Variant A  │ │  Variant B  │
          │                     │            │  (smaller)  │ │  (larger)   │
          │                     │            └──────┬──────┘ └──────┬──────┘
          │                     │                   │               │
          │                     │        ⚖️ EXACTLY ONE IS REQUIRED — UX decides;
          │                     │           the other becomes an NTH
          │                     │                   └───────┬───────┘
          ▼                     │                           │
┌────────────────────────┐      │      ★★★ DEMO 1 ──────────┘
│ PT-XXX-E1  Remove UI   │      │      (target: by the sprint halfway point)
│ N1 (delete) + N2       │      │
└─────────┬──────────────┘      │            ┌───────────────┐ ┌─────────┐
          │                     │            │ PT-XXX-G L10n │ │PT-XXX-I │
          ▼                     ▼            │ + shortcuts   │ │ Design  │
┌────────────────────────┐                   └───────────────┘ └────┬────┘
│ PT-XXX-E2  Change UI   │                                          │
│ N1 (change)            │                              ★★★ DEMO 2 ─┘
└────────────────────────┘                              (end of sprint)

┌──────────────────────────────┐   ┌────────────────────────┐
│ PT-XXX-F1 Floating           │   │ PT-XXX-H  E2E spike    │
│ PT-XXX-F4 Draggable          │   │ ✂ CUT  (← D)           │
│ PT-XXX-F3 Chooser            │   └────────────────────────┘
│ the losing D1/D2 variant     │
│ PT-XXX-J  Extra actions      │   ┌──────────────────────────────┐
│ ✂ ALL CUT-FIRST (NTH)        │   │ PT-XXX-B3 UPSTREAM           │
│   all ← D, reuse the control  │   │ nesting stack + (mixed)      │
└──────────────────────────────┘   │ ✂ ONLY IF OQ-1 → Option B    │
                                   │   (← OQ-1, not ← a ticket)   │
                                   └──────────────────────────────┘

★   = on the demo-critical path
⚖️  = the UX decision point
✂   = cut list; take from the top of §5.2
```

**Demo-critical path:** `C → D → wrapper`.
**Ship-critical path:** `C → D → wrapper → E1 → I`, with `E2` behind `B2` at the tail. Both arms
critical; the second is longer, which is why change lands last. _(`A` dropped from the front — done
2026-07-29.)_

### 8.1 Jira link table

Every blocking relationship above, in enterable form:

| Ticket          | Link type         | Target                                                                                                          |
| :-------------- | :---------------- | :-------------------------------------------------------------------------------------------------------------- |
| ~~`PT-XXX-B1`~~ | ~~is blocked by~~ | ~~`PT-XXX-A`~~ — **resolved; `A` is done. `B1` starts on day one.**                                             |
| ~~`PT-XXX-B2`~~ | ~~is blocked by~~ | ~~`PT-XXX-A`~~ — **resolved, same reason**                                                                      |
| ~~`PT-XXX-B3`~~ | —                 | **CLOSED 2026-07-30. Do not create.** `(mixed)` is paranext-core work; OQ-1 resolved to Option A                |
| `PT-XXX-B4`     | is blocked by     | nothing upstream — **but land `PT-XXX-B1` first** (same file, same private helpers)                             |
| `PT-XXX-B4`     | blocks            | `PT-XXX-E2`'s toggle cycle                                                                                      |
| `PT-XXX-D2`     | is blocked by     | `PT-XXX-D` only _(the OQ-8 block was removed 2026-07-30 — build clamped inside the web view)_                   |
| `PT-XXX-E2`     | is blocked by     | `PT-XXX-B4` _(in addition to `B2` and `E1`)_                                                                    |
| `PT-XXX-D`      | is blocked by     | `PT-XXX-C`                                                                                                      |
| `PT-XXX-D1`     | is blocked by     | `PT-XXX-D`                                                                                                      |
| `PT-XXX-D2`     | is blocked by     | `PT-XXX-D`                                                                                                      |
| `PT-XXX-E1`     | is blocked by     | `PT-XXX-B1`                                                                                                     |
| `PT-XXX-E1`     | is blocked by     | `PT-XXX-D`                                                                                                      |
| `PT-XXX-E2`     | is blocked by     | `PT-XXX-B2`                                                                                                     |
| `PT-XXX-E2`     | is blocked by     | `PT-XXX-E1`                                                                                                     |
| `PT-XXX-G`      | is blocked by     | `PT-XXX-D`                                                                                                      |
| `PT-XXX-I`      | is blocked by     | `PT-XXX-D`                                                                                                      |
| `PT-XXX-J`      | is blocked by     | `PT-XXX-D`                                                                                                      |
| `PT-XXX-F1`     | is blocked by     | `PT-XXX-D`                                                                                                      |
| `PT-XXX-F4`     | is blocked by     | `PT-XXX-D`                                                                                                      |
| `PT-XXX-F3`     | is blocked by     | any two of `PT-XXX-D1` / `PT-XXX-D2` / `PT-XXX-F1`                                                              |
| `PT-XXX-H`      | is blocked by     | `PT-XXX-D`                                                                                                      |
| ~~`PT-XXX-A`~~  | ~~blocks~~        | ~~`PT-XXX-B1`, `PT-XXX-B2`~~ — **closed 2026-07-29; blocks nothing**                                            |
| `PT-XXX-C`      | blocks            | `PT-XXX-D`                                                                                                      |
| `PT-XXX-D`      | blocks            | `PT-XXX-D1`, `PT-XXX-D2`, `PT-XXX-E1`, `PT-XXX-G`, `PT-XXX-I`, `PT-XXX-J`, `PT-XXX-F1`, `PT-XXX-F4`, `PT-XXX-H` |
| `PT-XXX-D1`     | blocks            | `PT-XXX-F3`                                                                                                     |
| `PT-XXX-D2`     | blocks            | `PT-XXX-F3`                                                                                                     |
| `PT-XXX-B1`     | blocks            | `PT-XXX-E1`                                                                                                     |
| `PT-XXX-B2`     | blocks            | `PT-XXX-E2`                                                                                                     |
| `PT-XXX-E1`     | blocks            | `PT-XXX-E2`                                                                                                     |
| `PT-XXX-F1`     | blocks            | `PT-XXX-F3`                                                                                                     |
| `PT-XXX-F4`     | blocks            | nothing                                                                                                         |

**Parallel (no shared files, safe to run concurrently):** `PT-XXX-B1`/`B2` (upstream repo) ∥
`PT-XXX-C`/`D` (paranext-core) · `PT-XXX-G` ∥ `PT-XXX-E1` · `PT-XXX-I` ∥ `PT-XXX-E1`.

⚠️ **One contention the spike found, absent from earlier drafts (A7):** `PT-XXX-B1` and `PT-XXX-B2` touch
the **same file** (`usj-marker-action.utils.ts`) — that is deliberate and is what makes them cheap (A3),
but it means they do **not** parallelize _with each other_. Land `B1` first. Separately, `npm install` in
paranext-core will check out `platform-yalc` in the developer's own upstream clone and pull it, and
`devpub` rewrites the tracked `etc/platform-editor.api.md` — so upstream and paranext-core work should not
be interleaved _within one developer's working copies_, even though the tickets are independent.

---

## 9. Non-Negotiable Status Summary

Paste-ready for the epic thread. Update in place through the sprint — statuses are **Covered /
Partial / Not covered** so the same table serves planning, mid-sprint, and wrap-up.

### Current sprint status (2026-08-11)

| Ticket            | Status         | Notes                                                                                                                                             |
| :---------------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------ |
| `PT-XXX-A`        | ✅ Done        | Merged pre-sprint (2026-07-29)                                                                                                                    |
| `PT-XXX-C`        | ✅ Done        | Merged [PR #2635](https://github.com/paranext/paranext-core/pull/2635) on 2026-08-05                                                              |
| `PT-XXX-D`        | ✅ Done        | Merged [PR #2648](https://github.com/paranext/paranext-core/pull/2648) on 2026-08-10                                                              |
| `PT-XXX-B1`       | ✅ Done        | Merged scripture-editors [PR #529](https://github.com/eten-tech-foundation/scripture-editors/pull/529) on 2026-08-07; `platform-yalc` now current |
| `PT-XXX-D2`       | ✅ Done        | Merged [PR #2660](https://github.com/paranext/paranext-core/pull/2660) on 2026-08-11                                                              |
| `PT-XXX-B2`       | ✅ Done        | Merged scripture-editors [PR #535](https://github.com/eten-tech-foundation/scripture-editors/pull/535) on 2026-08-10; `platform-yalc` current     |
| `PT-XXX-B4`       | ✅ Done        | Merged scripture-editors [PR #537](https://github.com/eten-tech-foundation/scripture-editors/pull/537) on 2026-08-11; `platform-yalc` current     |
| `PT-XXX-E1`       | ✅ Done        | Merged [PR #2665](https://github.com/paranext/paranext-core/pull/2665) on 2026-08-11                                                              |
| `PT-XXX-G`        | 🔄 In review   | [PR #2664](https://github.com/paranext/paranext-core/pull/2664) open; changes requested                                                           |
| `PT-XXX-E2`       | ⬜ Not started | Upstream complete (B2 + B4 both done)                                                                                                             |
| `PT-XXX-I/H/J/F*` | ⬜ Not started | Downstream of required work                                                                                                                       |

---

### At planning (2026-07-27)

| NN                                           | Status                                      | By what work                                                                        | Caveats                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| :------------------------------------------- | :------------------------------------------ | :---------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **N1 (add)**                                 | **Covered**                                 | `PT-XXX-C`, `PT-XXX-D` + one of `PT-XXX-D1`/`D2`                                    | Demo-able by the halfway point. No external dependency.                                                                                                                                                                                                                                                                                                                                                                                  |
| **N1 (change)**                              | **Covered**                                 | `PT-XXX-B2`, `PT-XXX-E2`                                                            | Delivered via `platform-yalc` — no external release dependency. Last thing on the cut list if scope must give.                                                                                                                                                                                                                                                                                                                           |
| **N1 (delete)**                              | **Covered**                                 | `PT-XXX-B1`, `PT-XXX-E1`                                                            | Delivered via `platform-yalc`. ~~`PT-XXX-B1` is the least certain required work~~ — **no longer true: `PT-XXX-A` ran 2026-07-29 and raised it to High certainty, 5 files, no query (A3–A5, A8).** The least certain required work is now `PT-XXX-D2`, if Variant B is chosen.                                                                                                                                                            |
| **N1 (usable)**                              | **Covered** _(pending OQ-2)_                | `PT-XXX-D` + chosen wrapper, `PT-XXX-I`                                             | Prototype analyzed 2026-07-28. **Both variants are one of its three Toolbar Position values**, so either is defensibly "similar to the prototype" — Variant B additionally matches its default.                                                                                                                                                                                                                                          |
| **N2** (delete removes markers, not content) | **Covered**                                 | `PT-XXX-B1` (10 content-preservation test cases), `PT-XXX-E1` (in-app verification) | Rides on N1 (delete). **Semantics for nested and partially-covered markers are still undecided (OQ-1)** — the prototype cannot answer this, so it needs a product decision.                                                                                                                                                                                                                                                              |
| **H1** _(NTH)_                               | **Variant A: Partial · Variant B: Covered** | `PT-XXX-D1` (clause 1) or `PT-XXX-D2` (both)                                        | **This is the clearest difference between the variants.** Clause 1 ("does not overlap project text") is satisfied by either. Clause 2 ("see where the marker(s) will be inserted **in context of other markers**") needs the control _near the line_ — Variant B delivers it, Variant A leaves it to a cut-first ticket. Accepting Partial is legitimate (H1 is in the PRD's "cut these first" column) but should be an explicit choice. |

### Projected landing point

- **By the halfway point:** N1 (add) covered and demo-able.
- **By sprint end, if scope holds:** N1 (add/change/delete) and N2 all covered; N1 (usable) pending `PT-XXX-I`'s outcome.
- **If scope has to give:** §5.2 is the order. N1 (change) is the last thing standing between the cut list and a non-negotiable, and it is deliberately split so it can go without touching delete.
- **Leftover items likely reachable:** with two developers, the NTH list opens up _after_ the required set completes — most plausibly the losing `D1`/`D2` variant and `PT-XXX-F1`. With one developer, plan on none.
- **Every status above is a claim about Simple mode only.** In Power mode the correct row for all of N1,
  N2 and H1 is **"unchanged from today"** — that is the intended outcome, not a gap (OQ-4, §1.6). If a
  wrap-up review finds _any_ Power-mode difference, it is a defect in this plan's execution, whatever the
  NN table says.

---

## 10. PRD Coverage Audit

Verified with the [grep safety-net](../../.claude/rules/grep-safety-net.md): after scanning the PRD by
judgment, I grepped it for its row markers (`non-negotiable`, `nice-to-have`, `no-go`,
`Must be in any version`, `Cut these first`, `Explicitly out of scope`) and enumerated every table row.
**Deterministic result: 2 non-negotiable rows (lines 54, 55), 1 nice-to-have (line 54), 2 no-gos
(lines 54, 55).** Every row is accounted for below. Source tag: `keyword-grep` = found by the
deterministic grep; `judgment` = added by reading.

### Non-negotiables — all covered ✅

| #   | Row (verbatim)                                                                                                             | Source                   | Tickets                                                                                                                                                                             | Coverage                                                                                                                                                                                                                                                                                              |
| :-- | :------------------------------------------------------------------------------------------------------------------------- | :----------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| N1  | "Provide UI to change, delete, add character level markers in a usable way (propose similar to magic patterns prototype)." | `keyword-grep` (line 54) | **add**: `PT-XXX-C`, `PT-XXX-D` · **change**: `PT-XXX-B2`, `PT-XXX-E2` · **delete**: `PT-XXX-B1`, `PT-XXX-E1` · **usable**: `PT-XXX-I` · enabler: `PT-XXX-A` ✅ _(done 2026-07-29)_ | ✅ **Fully covered**, split across four separately-cuttable sub-labels. ⚠️ See risk note. **One prototype affordance is now known to be out of reach under Option A:** the `(mixed)` state needs `PT-XXX-B3` (A5) — it bears on the "usable / similar to prototype" clause, not on add/change/delete. |
| N2  | "UI for deleting markers only removes markers, not the content within markers."                                            | `keyword-grep` (line 55) | `PT-XXX-B1` (transform + 10 content-preservation test cases), `PT-XXX-E1` (UI + in-app verification)                                                                                | ✅ **Fully covered.** Content preservation is an explicit AC on both tickets and the primary assertion of §4.2.                                                                                                                                                                                       |

> ### ⚠️ Sprint risk on N1 — resolve before the sprint starts
>
> 1. **N1's change/delete half depends on another team's repo.** `PT-XXX-B1`/`B2` can be _built_
>    by merging to the `platform-yalc` branch, which `postinstall` links automatically — so this is
>    team-owned work, not an external dependency (§3, verified 2026-07-28). The residual risk is
>    `PT-XXX-B1`'s **shape**, not its delivery — and **that residual is now closed**: `PT-XXX-A` ran
>    2026-07-29 and found `B1` smaller than assumed (High certainty, 5 files, no selection query — A3–A5,
>    A8). The Lexical primitives already exist and are tested, and **the halfway demo does not depend on
>    it at all**. What is _not_ closed: OQ-1, which decides whether `PT-XXX-B3` gets added.
> 2. **N1's "usable / similar to prototype" clause is unverified.** The prototype could not be
>    rendered while planning — it has since been analyzed from source (2026-07-28), and **Fixed is one
>    of the prototype's own three Toolbar Position values**, so Fixed-only is defensibly "similar to the
>    prototype". What remains is confirming with Todd that Fixed is the placement he means, since the
>    prototype's _default_ is Side (OQ-2). If he says Side, `PT-XXX-F1` becomes required in place of
>    `PT-XXX-D` — same total cost, so the appetite is unaffected.
> 3. **The appetite is fixed and the plan has no slack built in.** OQ-1 landing on the full-marker-set
>    option, or Variant B's gutter conflict proving awkward, would force a scope conversation — §5.2 says
>    what comes out and in what order. That is the mechanism; there is no schedule to slip.

### Nice-to-haves — all accounted for ✅

| #   | Row (verbatim)                                                                                                        | Source                   | Disposition                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| :-- | :-------------------------------------------------------------------------------------------------------------------- | :----------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| H1  | "UI does not overlap project text, so user can see where the marker(s) will be inserted in context of other markers." | `keyword-grep` (line 54) | **Disposition depends on the OQ-2 variant, and this row is the clearest reason to care about that decision.** <br>**Clause 1 — "does not overlap project text": (a) covered by either variant.** A toolbar cannot overlap text (`PT-XXX-D1`); the gutter sits outside the text's bounding box (`PT-XXX-D2`). <br>**Clause 2 — "see where the marker(s) will be inserted in context of other markers":** **(a) covered by Variant B** — `PT-XXX-D2` places the control beside the line in question, as an acceptance criterion, which is legitimate because it is a property of the required placement rather than an extra bolted on. **Under Variant A it is (b) a dedicated cut-first ticket** (`PT-XXX-D2` as the losing variant, or `PT-XXX-F1`), because a toolbar at the top of the panel is far from the text. <br>Accepting Partial under Variant A is defensible — H1 is in the PRD's "cut these first when time is tight" column — but it must be an explicit decision, not a silent one. Partly also served either way by the control surfacing the marker at the caret, and fully by OQ-1 Option B. |

### Comment-thread nice-to-haves (Alex Mercado, 2026-07-22) — all accounted for ✅

Not PRD rows, and Todd correctly noted they were phrased as questions. Translated in OQ-3, each with a
disposition so none is silently dropped:

| #   | Item                                                            | Disposition                                                                                                                                                                                                                                                                                                                                                                                                         |
| :-- | :-------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| C1  | Can the overlay appear left/right/above/below?                  | **(b) Dedicated cut-first tickets**, plus partial coverage from whichever variant ships. Under Variant B the control already sits beside the text with viewport clamping. _Additional_ render locations are `PT-XXX-F1` (Floating), the losing `D1`/`D2` variant, and `PT-XXX-F3` (the chooser that exposes them). Answered affirmatively by the prototype (`anchorSide`, clamping, three Toolbar Position values). |
| C2  | Can it be dragged around?                                       | **(b) Dedicated cut-first ticket `PT-XXX-F4`** (1d), marked as the **last** NTH to pick up. Accepted 2026-07-28 after earlier drafts recommended rejecting it. Risk noted in the ticket: no drag precedent in the repo, and it fights the auto-repositioning the Side and Floating placements depend on.                                                                                                            |
| C3  | Can we add other button triggers to the floating menu?          | **(b) Dedicated ticket `PT-XXX-J`, marked cut.** Deliberately _not_ an AC on `PT-XXX-D` — the structural-separation rule. Note the prototype's answer is largely _"they already exist"_: of the five extra controls in its toolbar, footnote, comment, undo/redo and structure-protection are **already built** in paranext-core, just not co-located. So C3 is a co-location preference, not new capability.       |
| C4  | Does the picker follow USFM grammar to narrow to valid markers? | **Already PRD no-go #2** — see G2. The partial version ships free: today's menu is parent-scoped via `usfmMarkers[parent].children`.                                                                                                                                                                                                                                                                                |

### No-gos — confirmed not implemented ✅

| #   | Row (verbatim)                                                                                                                                              | Source                   | Confirmation                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| :-- | :---------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| G1  | "Ensure that the same UI is available for footnotes and cross-refs."                                                                                        | `keyword-grep` (line 54) | ✅ **Not in any ticket's scope.** No ticket touches [footnote-editor.component.tsx](../../lib/platform-bible-react/src/components/advanced/footnote-editor/footnote-editor.component.tsx) or [footnote-editor.utils.ts](../../lib/platform-bible-react/src/components/advanced/footnote-editor/footnote-editor.utils.ts). ⚠️ **Named risk**: the footnote editor carries a near-duplicate of the inline marker menu (its own `\` handler at :490 and its own `generateInlineMarkerMenuListItems` at :24-36). It **will drift** as a result of this work. That is the correct outcome per this no-go — log a follow-up ticket, don't fix it here. _(`PT-XXX-J` adds footnote/xref **commands** to the marker UI, which is the reverse direction — invoking existing note commands, not giving notes a marker-editing UI. Not a G1 violation.)_ |
| G2  | "Ensure that the suggested markers are context-sensitive and markers that don't fit the context (as defined by the style sheets) are not shown as options." | `keyword-grep` (line 55) | ✅ **Not in any ticket's scope.** `PT-XXX-C` explicitly preserves the existing hardcoded parent-scoped filtering (`usfmMarkers[parentMarker].children`) and does **not** introduce stylesheet-driven validity. Structurally infeasible to do accidentally: no `.sty` parser exists in TypeScript ([utils.ts:398-400](../../extensions/src/platform-scripture-editor/src/platform-scripture-editor.utils.ts#L398) says so verbatim), and `StyleType`/`Description`/`Endmarker`/`OccursUnder` are not exposed over PAPI (`platformScripture.MarkerNames` returns display strings only). ℹ️ The _existing_ menu is already weakly context-sensitive by parent marker — behavior that predates this work and is preserved, not extended.                                                                                                          |

### Other PRD rows

| Row                                                                                                                                                                     | Source         | Disposition                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Rabbit hole: "Positioning the UI in a way that works for both Simple and Power. → Do what is needed for Simple, and let Power team improve it, if necessary." (line 84) | `keyword-grep` | ✅ **Followed, and both halves of it now enforced.** **OQ-4 is DECIDED (2026-08-03), not assumed:** Simple-only via one `!isPowerMode` gate per mount point, with a comment naming the deferral (Share Layout precedent) — _and_ an explicit requirement that **no change in this plan alters Power-mode behavior**, with a per-layer gated/inert table, three off-limits shared surfaces, and Power-inertness assertions in the test plan (**§1.6**, §4.3, §4.7). "Let Power team improve it" is preserved as a deliberate seam: un-gating stays a one-line change.                                |
| Rabbit hole: "e.g. Syncing state across tabs → Don't support in v1 — show 'refresh' message" (line 83)                                                                  | `keyword-grep` | ℹ️ **Leftover template boilerplate**, not a real rabbit hole for this feature (it is the template's own example row, still present in the doc). No action. Flagged so it isn't mistaken for a requirement — and worth deleting from the PRD.                                                                                                                                                                                                                                                                                                                                                        |
| Risk: Feasibility 🟡 "Most likely..." (line 96)                                                                                                                         | `keyword-grep` | ✅ **Confirmed, localized, and now materially reduced.** The 🟡 is precisely the missing upstream remove/change API — verified absent from the shipped surface at `dist/index.d.ts:249-368` (A1). `PT-XXX-A` ran 2026-07-29 and found `PT-XXX-B1` **smaller** than assumed (High certainty, 5 files, no query — A8); delivery is via `platform-yalc`, so there is no external queue. ⚠️ **Withdrawn: the `applyUpdate` fallback is not insurance** — A2 shows it is unreachable from a selection. The fallback is now "ship N1 (add) alone, defer delete/change." The risk is effort, not delivery. |
| PRD §3 "How it works", "Key interactions", §5 "Systems involved", "Known constraints", "Open technical questions"                                                       | `judgment`     | ℹ️ **Empty in the PRD.** §1 and §3 of this plan fill the technical gaps. The UX walkthrough gap is real and is what OQ-2 and `PT-XXX-I` exist to close.                                                                                                                                                                                                                                                                                                                                                                                                                                             |

---

## 11. Pre-Sprint Checklist

**Updated 2026-07-30 after the UX meeting.** Items are grouped by who has to answer, because the two
remaining conversations are with different people.

### Take these to Alex — none of them block starting `PT-XXX-D2` any more

| #      | Item                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Blocking?                                    |
| :----- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------- |
| **A1** | ~~**OQ-8 — can the Side bar overlap the adjacent docking column?**~~ ✅ **DECIDED 2026-07-30 by scoping** — build it clamped inside the editor web view, defer the overlap (§3 → OQ-8). Alex didn't comment on overlap in the meeting, so **this needs an acknowledgement, not an answer**: tell him the bar will stay inside the editor panel and that overlapping the neighbouring column is later core work. Only reopen if he pushes back — posting text is still in §3.                                                                              | ✅ Decided — **`PT-XXX-D2` unblocked**       |
| **A2** | 🔴 **NOW THE LIVE ONE — how much horizontal space may we take, and does the text column narrow?** OQ-8's clamp forces this. There is no right gutter today, so `D2` creates one. Two sub-options with different H1 outcomes: **reserve** ~7.4em (H1 clause 1 guaranteed, text column narrows — **recommended**) vs **float over the margin** (no narrowing, but long lines can slide under the bar and H1 clause 1 becomes usually-true rather than guaranteed). **Narrowing every Simple user's text column is his call, not an implementation detail.** | 🟠 Blocks `PT-XXX-D2` build, not start       |
| **A3** | **OQ-6 — which character markers are mutually exclusive?** Alex raised the category but didn't know the pairs. `usfmMarkers` has no conflict data and stylesheet parsing is PRD no-go #2, so v1 needs a **hand-curated list**. Recommendation: `bd`/`it`/`bdit` only.                                                                                                                                                                                                                                                                                     | 🟠 Blocks one branch of `PT-XXX-B4`/`E2`     |
| **A4** | **OQ-7 — whitespace and punctuation at selection edges.** Recommendation: match the existing insert-path behavior (`$moveLeadingSpaceToPreviousNode`) rather than designing new.                                                                                                                                                                                                                                                                                                                                                                          | No — affects polish                          |
| **A5** | **OQ-9 — comments can't cross a marker boundary, but the marker toggle can.** Recommendation: disable the comment button with a reason on marker-spanning selections.                                                                                                                                                                                                                                                                                                                                                                                     | 🟠 Blocks `PT-XXX-J` only                    |
| **A6** | **Report back two answers Alex asked for, now verified** (§3 → U6, U7): **all 58 character markers are sandwiches** (`hasEndMarker: true`; sole exception `v`, which isn't one). **Comments already work on sub-verse selections**; footnotes are _point_-anchored, so "a portion of a verse" is the wrong frame for them.                                                                                                                                                                                                                                | No — closes his questions                    |
| **A7** | ⚠️ **NEW 2026-08-03 — OQ-10: should the menu hide the non-styling character markers?** (`qs`, `qac`, `no`, `litl`, `lik`, `liv*`, `ior`, `iqt`, `fm`, `xt`, `rq`, `vp`). Surfaced by `PT-XXX-C`'s exposure table; parent-scoped filtering offers them because they _are_ genuine character markers. Needs a hand-maintained deny list, so it cannot be answered from the repo. **Recommendation: hide nothing in v1** — a wrong deny list removes a marker a translator needs, and that is worse than an extra row.                                       | No — lands later without touching `PT-XXX-D` |
| **A8** | ⚠️ **NEW 2026-08-03 — OQ-11: the remove row's label and icon.** U3 called the row _(none)_; `PT-XXX-C` shipped "Remove character marker", and `PT-XXX-D` keeps that, using `(none)` for the trigger only. **Needs an ack, not a decision** — plus a confirmation of the row's icon (`RemoveFormatting`), the one item `PT-XXX-C` explicitly left for UX.                                                                                                                                                                                                  | No — cosmetic                                |

### Answer these with Todd

| #      | Item                                                                                                                                                                                                                                                                                                                                               | Blocking?                           |
| :----- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------- |
| **T1** | **OQ-5 — a _different_ marker on an already-marked selection: nest, replace, or reject?** UX answered same-marker behavior (extend); this branch is still open, and it interacts with OQ-6. Also: **if the control never nests, is `\` the only way a Simple user can create legitimate nesting?** USFM semantics → stop-and-ask.                  | 🟠 Blocks one branch of `PT-XXX-E2` |
| **T2** | **Confirm OQ-1's answer is the intended design.** Innermost-marker-at-caret, verified in the prototype (§3 → OQ-1). This is a confirmation, **not a question to re-open**.                                                                                                                                                                         | No                                  |
| **T3** | **Is Fixed-only acceptable for N1, and does it satisfy H1?** The backout (§6.6) drops H1 from Covered to Partial. Get the acceptance _now_, not at the demo.                                                                                                                                                                                       | 🟠 Shapes the backout call          |
| **T4** | ~~**OQ-4 — Simple only.**~~ ✅ **DECIDED 2026-08-03 by the Implementation Owner** — Simple only, **and no change in this plan may alter Power-mode behavior** (§1.6, §3 → OQ-4). Nothing to ask Todd; **tell** him, since it is a scope statement he should be able to repeat back: Power users keep exactly today's `\` menu and see nothing new. | ✅ Decided                          |
| **T5** | **Cut order (§5.2).** Change (`B2`/`B4` + `E2`) is the last non-negotiable slice to give. Needs his agreement before the sprint.                                                                                                                                                                                                                   | 🟠                                  |
| **T6** | **OQ-3** — accept/reject/edit the NTH wording from Alex's comment thread.                                                                                                                                                                                                                                                                          | No                                  |

### Everything else

| #   | Item                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Owner                                   | Blocking?                          |
| :-- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------- | :--------------------------------- |
| 1   | ~~Upstream release commitment~~ — **resolved.** Delivery is via the `platform-yalc` branch; no publish, tag, or external reviewer needed (§3). Nothing to secure.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | —                                       | No                                 |
| 2   | ~~**OQ-2 — which placement variant ships?**~~ ✅ **RESOLVED 2026-07-30 — Side (Variant B).** `PT-XXX-D2` required, `PT-XXX-D1` becomes the NTH **and the backout** (§6.6). Two extensibility requirements came with it (§3 → U1) and they change `PT-XXX-D`. ⚠️ **Not fully closed — see A1.**                                                                                                                                                                                                                                                                                                                                                                                 | UX ✅                                   | ✅ Done                            |
| 2a  | **Agree the §6.6 backout tripwires with the Engineering Lead**, especially the start-of-week-2 hard stop. The backout exists to stop a nice-to-have (`D2`/H1) from eating a non-negotiable (`B1`/`E1`/N2).                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Implementation Owner + Engineering Lead | 🟠 Agree before the sprint         |
| 3   | ~~**OQ-1**~~ ✅ **RESOLVED 2026-07-29** by driving the hosted prototype — Option A, innermost marker at the caret, needing **no upstream work** (§3 → OQ-1). `PT-XXX-B3` is **closed**, not deferred. Remaining action is T2: confirm with Todd that this is the intended design.                                                                                                                                                                                                                                                                                                                                                                                              | Implementation Owner ✅                 | ✅ Done                            |
| 4   | **Review this plan with the Engineering Lead** — required before the sprint starts.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Implementation Owner                    | 🔴 **Yes**                         |
| 5   | **OQ-3** — Todd accepts/rejects/edits the comment-thread NTH wording (needed only before `PT-XXX-J`).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Todd                                    | No                                 |
| 6   | ~~**OQ-4** — confirm Simple-only.~~ ✅ **DECIDED 2026-08-03.** Simple only, **and Power mode does not change at all** — enforcement per layer in §1.6, Power-inertness assertions in §4.3 and §4.7. Remaining action is informational (T4), not a decision.                                                                                                                                                                                                                                                                                                                                                                                                                    | Implementation Owner ✅                 | ✅ Done                            |
| 7   | **Confirm staffing, and read it together with OQ-2.** `PT-XXX-B1`/`B2` are upstream and share no files with the paranext-core work, so two people genuinely parallelize (§6.4) — **but note they share a file with _each other_** (A3/§8.1), so land `B1` before `B2`. Variant B is the larger of the two placements and benefits most from a second developer.                                                                                                                                                                                                                                                                                                                | Engineering Lead                        | 🟠 Shapes what can be committed to |
| 8   | ~~**Consider running `PT-XXX-A` pre-sprint**~~ — ✅ **DONE 2026-07-29.** Findings in §3 → A1–A9. It paid off: `PT-XXX-B1` came back **smaller** (High certainty, 5 files, no query), two speculative mechanisms were closed, and three plan errors were corrected. `B1`/`B2` are unblocked and can start day one.                                                                                                                                                                                                                                                                                                                                                              | Implementation Owner                    | ✅ Complete                        |
| 9   | ⚠️ **NEW — exercise the yalc dev loop end to end.** The one `PT-XXX-A` acceptance criterion not delivered (A7): make a trivial change on `platform-yalc`, `nx devpub platform-editor`, `npm run editor:link`, and confirm it appears in a running paranext-core. The mechanism is verified by reading `checkoutRevision`, but never executed. **Do this before `PT-XXX-B1` starts**, not during it — a broken dev loop discovered mid-ticket is a bad day. Two known gotchas to expect (both in A7): `npm install` will check out `platform-yalc` in your own upstream clone and pull it, and `devpub` rewrites the tracked `etc/platform-editor.api.md` without restoring it. | Whoever picks up `PT-XXX-B1`            | 🟠 Should precede `PT-XXX-B1`      |

### `paratext-10-studio` readiness

**Expected: no change required.** This feature adds a control _inside an existing web view_
(`platformScriptureEditor.react`), not a new tab, panel, or web view type. The mechanisms that require
a `paratext-10-studio` change are:

- a **default-layout entry** — only needed for a new tab/panel; see [simple-layout.data.ts](../../src/renderer/components/docking/simple-layout.data.ts) and [default-layout-supplement.json](../../src/renderer/components/docking/default-layout-supplement.json). Not touched here.
- a **feature-flag gate in that repo** — how `platformScriptureEditor.enableScriptureTextGrid`'s layout inclusion is handled ([main.ts:1334-1336](../../extensions/src/platform-scripture-editor/src/main.ts#L1334) documents this). **Only relevant if the optional kill-switch in §1.1 is added** — decide that before sprint start, since it is the one thing that would create a `paratext-10-studio` dependency.

**Action:** confirm with the Engineering Lead that no `paratext-10-studio` change is needed, and
record that confirmation. If the kill-switch is added, raise it as a second-repo dependency at that
point rather than at release time.

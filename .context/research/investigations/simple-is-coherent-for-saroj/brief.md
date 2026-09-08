# Simple is coherent for Saroj: investigation

Two sibling PRDs, both titled "Simple is coherent for Saroj" (Sprint 90), split so two product
owners can each manage half. **One engineering team builds both.** This brief covers the pair.

- **Ian's PRD** — rev2, 27 Aug 2026, appetite 3 weeks. Owner Ian.
- **Todd's PRD** — rev2, 27 Aug 2026, appetite 3 weeks. Owner Todd.
- Both derive from one shared **"Proposed NN and NTHs" second tab**, carried verbatim in both
  exports. That tab is the authoritative master list, and the split assigns 3 of its 6
  non-negotiables to each PRD.
- Implementation Owner: Jolie Rabideau (both PRDs, per Discord 2 Sep 2026).

> **Read this first — version hazard.** An earlier rev1 export of Ian's PRD is in circulation
> and disagrees materially with rev2: rev1 carried Menus, synced scrolling, copy-paste control,
> BCV hover, Dictionary, text collections and five Share-layout non-negotiables that rev2 either
> moved to Todd's PRD, demoted, or dropped. Numbering differs too. Everything below is rev2.

## 1. What the PRD asks for
*(for: everyone)*

Saroj is a translator using Paratext 10 **Simple**. Across a normal translation session he hits a
steady drip of friction — menus, comments, project and resource pickers, paragraph markers,
synced scrolling — each irritation small, but cumulatively leaving him feeling Simple is not
ready for field work. Trainers can't confidently point translators at Simple, and the team keeps
re-fixing the same defects across three or four parallel pickers.

**Appetite: 30 dev days total** — 3 weeks each, set deliberately so 3 + 3 matches what five
developers (not all full time) deliver across two physical weeks. Buffer is zero by construction.

### The master list: 6 non-negotiables, split 3/3

| Master tab | Assigned to | Subject | Tab's own estimate |
| :--- | :--- | :--- | :--- |
| NN1 | **Todd NN1** | Menus | 1wk |
| NN2 | **Todd NN2** | Paragraph markers | — |
| NN3 | **Ian NN1** | Comments | 1wk |
| NN4 | **Ian NN2** | Titlebar project selection | — |
| NN5 | **Ian NN3** *(labelled Stretch Goal in rev2)* | Unify project/resource selection | 2wks |
| NN6 | **Todd NN3** | Synced scrolling | — |

Three of the six carry no estimate in the tab. Those three are where the planning artifact's
28–50 day spread lives.

### Non-negotiables — Ian's PRD

| ID | Non-negotiable (rev2 wording) |
| :--- | :--- |
| IAN-NN-1 | **Comments** |
| IAN-NN-1.1 | Reduce whitespace without significantly moving locations of content within a comment. If low cost: place "@" and "↑" buttons inside the comment box to save space |
| IAN-NN-1.2 | Better visibility of active comment in comments tab |
| IAN-NN-1.3 | Replicate basic PT9 Comments filters — two filter controls, with the filter options displayed. Do not add plain-text search or sort control yet unless very low cost |
| IAN-NN-1.4 | Fix bug where newly added comment styling buttons appear above the toolbar for comment filters |
| IAN-NN-1.5 | *No-go:* annotations in editor |
| IAN-NN-2 | **Improve current Project selection component in titlebar** (see also NN3) |
| IAN-NN-2.1 | Menu in blue box remains visible while selecting projects, should disappear (especially problematic on small screens where these overlap) |
| IAN-NN-2.2 | "Recent" projects is working as expected (does not show projects unavailable on current server, or never opened) — *stated as already correct* |
| IAN-NN-2.3 | "Your projects" content is unclear: does not and should not show all projects; sometimes shows projects only available on the "other" (dev/prod) server. When it does not show all projects Saroj has access to on the current server, provide a way to select from the others — e.g. an **"All projects…"** link expanding to show all available projects from disk and S/R server. Possibly a projects-only filtered view of Home; the S/R dialog is *least* favourable because S/R is intended to be replaced with Home |
| IAN-NN-2.4 | Show short name first in all circumstances in UI — **PRD explicitly cross-references Todd NTH-3** |
| IAN-NN-3 | **Stretch Goal — Adapt/unify and improve project/resource selection in dialogs and components.** Problem space: 3–4 different UIs do close to the same thing with different inconsistencies and defects between them. Need a small number of UIs (not necessarily 1 — Ira suggests probably something different for single vs multi selection). Primarily eliminate defects and unify as much as is reasonable, so fixing one benefits all |
| IAN-NN-3.1 | In other locations requiring project/resource selection, improve selection UI or use the composable `ProjectSelector` from Storybook (see also `ResourcePickerDialog`) |
| IAN-NN-3.2 | Adapt/unify component for use in Simple tabs (Project, Bible texts, commentaries, text collections, Share layout, and any other instances) |
| IAN-NN-3.3 | Specific defects to fix as a result of 3.1/3.2: (a) horizontal scroll on long resource names or small modal; (b) Layout with Team (modal) → Manage Commentaries treats the modal like a popover when the second modal should go overtop/replace the first; (c) project picker stays visible when the More Resources modal is open; (d) inconsistent short-name layout — Project → More projects right-aligns the shortname, More resources left-aligns it |

| ID | Nice-to-have (rev2 wording) |
| :--- | :--- |
| IAN-NTH-1 | **Share layout PT1** — rename Share layout to "Shareable layout" or "Team layout", change share icon to layout icon; improve visual grouping in the dialog ("default tab" relates to items in the selection component and should be grouped with them) |
| IAN-NTH-2 | **Share layout PT2** — improve "lock structure" UI: single button for translators vs popover for admins; improve labelling for both, each showing *current* state in tooltip ("USFM structure editable / protected", "USFM structure unlocked for team / locked for team") |
| IAN-NTH-3 | **Share layout PT3** — provide a "Share with team" button in the dialog ("Save" does not convey "share immediately"). Buttons: Share with team; Cancel. ~~Close~~ (not useful). ~~Select preferred text for commentary, bible texts~~ — **struck through in rev2 as "too costly"** |
| IAN-NTH-4 | **Improve themes (dark and light)** — review UI against shadcn/ui, Tailwind and WCAG. Known: (1) radio buttons low contrast (e.g. internet settings); (2) text-collection checkboxes in Simple "Share" dialog low contrast; (3) more visible text-selection colours — left/right columns should match the editor pane selection colour, and an inactive column's selection should be *less* visible than the active one but not near-invisible; (4) focused+selected radio button can get a double highlight+selection state (low priority if difficult); (5) active-comment visibility (should be fixed by IAN-NN-1.2) |
| IAN-NTH-5 | **Report a problem** — begin work to reinstate Usersnap for "Report a problem" and "Submit an idea" |

**Ian's no-gos:** annotations in the editor. Full unification into a single picker component —
the shaped approach caps at **two** shared components (a picker and a management modal) and
accepts some divergence.

### Non-negotiables — Todd's PRD

| ID | Non-negotiable (rev2 wording) |
| :--- | :--- |
| TODD-NN-1 | **Menus** |
| TODD-NN-1.1 | Main menu — remove items not shipping in Simple. *Screenshot-only in the PRD; transcribed:* **keep** Send/Receive projects, Settings, Exit; **remove** "Open…", "Manage extensions", "Open Dictionary: SDBH/SDBG", "Open enhanced resource" |
| TODD-NN-1.2 | Help menu — remove items not required. *Transcribed:* **keep** FAQs, Submit an idea, Report a bug / Send feedback, About Paratext 10 Studio; **remove** "Paratext Registration Information", "Getting started", "Feature roadmap", "Open Developer Documentation" |
| TODD-NN-1.3 | Help menu — change "FAQs" to read "Community support" (same link to support.bible) |
| TODD-NN-1.4 | Bugfix: border and shadow render on the Project menu even when the mouse is outside it |
| TODD-NN-1.5 | Bugfix: menus and popovers must be opaque and readable, including while scrolling — PT-4101 (was NTH3 in Sp88) |
| TODD-NN-1.6 | Fix content and layout in the Project menu per the [v0 demo](https://10simple-project-menu.vercel.app/). *Target structure transcribed from the screenshot:* **PROJECT** (Send/Receive this project · Project settings ⌃J · Edit ▸) · **VIEW** (Switch Scripture view ⌃E · Show footnotes F7 · Change footnote pane location) · **INSERT** (Insert footnote ⌃T · Insert cross-reference ⌃⇧T · Insert comment ⌃⇧N, disabled) · **TOOLS** (Bible texts · Commentaries · Text collection · Find ⌃F · Comments) · **QUALITY CHECKS** (Checking assistant) |
| TODD-NN-1.6a | Arrange into the order shown in v0 |
| TODD-NN-1.6b | Add Edit section flyout |
| TODD-NN-1.6c | Provide section headings — related to PT-3721 |
| TODD-NN-1.6d | Show keyboard shortcuts for menu items that have them (end-justified, muted). PRD pre-authorises postponing this if it proves difficult |
| TODD-NN-1.6e | Quality-checks section can be hidden (or omitted if hiding isn't possible) — shown for when Checking assistant reaches Simple |
| TODD-NN-1.6f | Order of items in "Tools" should reflect the order in the UI |
| TODD-NN-2 | **Fix issues inserting, selecting or displaying paragraph markers** (leftover work from Sp87) |
| TODD-NN-2.1 | Insert paragraph markers using the marker dropdown — all markers listed as tier 1 by 10Power |
| TODD-NN-2.2 | Displaying markers (such as `li2`, not limited to it). The editor should correctly position both the marker and the editable region for tier-1 markers |
| TODD-NN-2.3 | Be confident about selecting existing markers in order to change them. Today Saroj can select the *content of the paragraph* and change the marker via the dropdown, but cannot select the *marker itself*. Both should be possible |
| TODD-NN-2.4 | Do not immediately show paragraph-marker tooltips on mouseover; provide a delay to prevent flashing tooltips |
| TODD-NN-3 | **Synced scrolling** |
| TODD-NN-3.1 | All columns respond to each other (currently the 3rd column doesn't respond to col 1 or 2) |
| TODD-NN-3.2 | Scrolling to a highlighted check/find result should scroll to the highlighted content; currently scrolls to the beginning of the verse, which may leave the content off screen (repro: HPUXR GEN 14:1-4, Find "Notting", especially when the text column is narrow) |

| ID | Nice-to-have (rev2 wording) |
| :--- | :--- |
| TODD-NTH-1.1 | Text collections — click to toggle verse/chapter view (first click activates chapter, second returns to verse) |
| TODD-NTH-1.2 | Text collections — remove whitespace: remove left margin; show shortname inline in a fixed-size area (for consistency between rows) immediately followed by content; flow content after and beneath the shortname — same as PT9 |
| TODD-NTH-1.3 | Text collections — allow Saroj/Donna to specify the order of texts (potentially later if significant work) |
| TODD-NTH-2 | Fix the reflow when pressing left/right in empty verses. The insertion point should be visible and typed text should appear at that position (repro: HPUXR 2 Kings 2:7) |
| TODD-NTH-3 | **Consistent display of project/resource names** — (1) always show project shortname first: in tab titles, in dialogs, in components; (2) show long name responsively when space is available (e.g. in Power, Home shows short names when narrow and long names when wide); (3) allow find on short *or* long name (Settings currently searches short names only in the project selector) |
| TODD-NTH-4 | BCV control chapter hover highlight alignment (Sebastian has a PR for this) |
| TODD-NTH-5.1 | Dictionary — investigate fixing the semantic/contextual domains (e.g. EXO 20:12 Land=Lamp, God=destruction, Woman=Land/magic; PT-3848). **If this turns out to be a large task, stop and report the likely size in PT-3848** |
| TODD-NTH-5.2 | Dictionary — add a "Dictionary" tab to column three after the Commentaries tab, plus a Project menu item for it |
| TODD-NTH-5.3 | Dictionary — fix Senses card formatting: text wrapping missing; cards too wide (possibly caused by the wrap issue); an unexpected "=" precedes each definition |

**Todd's no-gos:** none stated. The PRD's only authorised deferrals are TODD-NN-1.6d (shortcut
hints) and TODD-NTH-1.3 (text order).

### Rabbit holes the PRDs already decided

| Rabbit hole | Owner | Decided approach |
| :--- | :--- | :--- |
| Comments filter parity with PT9 — PT9 has more filters than Saroj is likely to need | Ian NN1 | Ship "basic" filters only |
| Full unification into one picker component — "not necessarily 1 UI"; API design across use cases could burn weeks | Ian NN2/3 | Target 2 shared components max; accept some divergence |
| Fixing every reported picker defect — long tail: horizontal scroll, modal-over-modal, short-name alignment, More Resources overlap | Ian NN2/3 | Fix the top 3 Saroj hits; punt the rest with a tracking issue |
| Share layout scope creep | Ian NTH1-3 | Split into three NTH sections, workable in isolation and in sequence if time is short |
| Shortcut key tips on menu items — Ira believes this may not be straightforward | Todd NN1 | See if shadcn has something to make this easy |
| Selecting a paragraph marker — tricky to select the marker itself with appropriate visual feedback | Todd NN2 | Perhaps highlight the whole row containing the marker in column 1 and the text in column 2, if not difficult |

### Known constraints (both PRDs, §5)

- Shared components must not regress PT10 Power (which will eventually adopt them).
- Performance neutral or better.
- No breaking changes to Simple's public menu-command API.

### The only intentional cross-PRD overlap

**Shortname-first**: IAN-NN-2.4 ≡ TODD-NTH-3.1. Ian's rev2 links Todd's item by name. It is one
piece of work at two priorities (Ian: non-negotiable; Todd: nice-to-have) and must be built once.
See §6.

## 1a. WI-1 runtime adjudication — results
*(for: everyone — this section supersedes the "cannot tell" items below)*

Run on `paranext-core` **`main` @ 49c26ed0237** (clean tree, no `npm install`, yalc dev links
intact), editor engine **`@eten-tech-foundation/platform-editor` 0.8.16**, Simple mode, project
**TPD** (Test Project Demo). HPUXR is not on this machine; TPD is the same Hawai'i Pidgin text and
carries equivalent cases, so each repro was substituted and the substitution is noted per item.
Every number below was measured in the running app, not read from code.

| # | Requirement | Verdict | Evidence |
| :-- | :--- | :--- | :--- |
| a1 | **TODD-NN-2.2** marker + editable-region positioning | **NOT REPRODUCED — strike or reduce** | Gen 10 `\li1`/`\li2` glyphs occupy x 22–58; first-line text at x 77–139. No collision at column widths **958 / 620 / 460 / 380 px**. Both `--para-indent` (`10vw`/`15vw`) **and** `--verse-text-start` (`-7.5vw`) are set on the `li` paragraphs |
| a2 | **TODD-NN-2.3** select the marker itself | **CONFIRMED live gap** | Glyph is `contentEditable: false`, `user-select: text`. A programmatic range over it **is accepted** (`selection.toString() === "\li2 "`, anchor inside glyph) and is then **cleared within ~900 ms**. A dispatched real click puts the caret on the paragraph's *text* (`anchorInsideGlyph: false`, offset 0) and moves the reference to Gen 10:3 |
| a3 | **TODD-NN-2.1** insert the core marker set | **CONFIRMED live gap, worse than described** | Dropdown offers 26 items: `cl h h1 h2 h3 ide m ms ms1 ms2 ms3 mt mt1 mt2 mt3 mt4 nb p pi q1 q2 r s toc1 toc2 toc3`. **`li1`, `li2`, `s1`, bare `q`, `q3` are absent**, while non-paragraph `h`/`h1-3`/`ide`/`toc1-3`/`cl` are present. With the caret in a `li2` paragraph the trigger reads "**li2 – Miscellaneous Marker**" |
| a4 | **§6 Q1** premise: structure protection disables the dropdown | **CONTRADICTED** | In Simple the dropdown opens with all 26 items `aria-disabled="false"`, `data-disabled="false"`, `pointer-events: auto`, `opacity: 1`. Two separate controls exist — "Toggle structure protection" and "Toggle structure lock for project" — both enabled, neither disabling it |
| b | **TODD-NN-3.2** scroll to the highlighted match | **CONFIRMED — two distinct failure modes** | *Same-chapter* (Gen 10:3 → 10:18-19, "Lasha"): reference updates to 10:18 and the match is highlighted, but the editor **does not scroll at all** — `scrollTop` stays 88 with the match 2094 px below the viewport top. *Cross-chapter* (Gen 1:1 → 10:18-19): it does scroll (`scrollTop` 0 → 1011), but only until the target verse's start scrapes the bottom edge (verse 18 at rel 961 of a 981 px viewport) — verse **8** is at the top and the match is **216 px below the viewport bottom** |
| c | **TODD-NTH-2** empty-verse caret | **CONFIRMED NOT FIXED** | TPD Gen 1:3 is empty. Crossing it takes **3 intermediate keystrokes in both directions**. During them the caret rect is height 0 at (-4, -46) — outside the editor box, anchored on the `<p>` element at offset 0/2 — and on the middle keystroke the selection **disappears entirely** (`NO RANGE`). ZWSP placeholders *are* present in the DOM (`\p @ZWSP@3@ZWSP@@ZWSP@4@ZWSP@`), so `EmptyVerseCaretGuardPlugin`'s host mechanism exists but yields no visible caret for this shape — an empty verse between two verses inside one paragraph |

**How this changes the plan**

- **WI-12 drops out of the critical path.** The positioning half of the marker block is not a live
  defect in the view Simple renders. Keep a regression test rather than a fix.
- **WI-13 keeps its shape but its mechanism is now pinned**: the marker node *is* selectable and a
  guard removes the selection. That is a predicate change, not a new selection model — the
  planning artifact's 5–10 day "new selection model in Lexical" reading is wrong, and valve V3's
  day-1 trigger is already answered.
- **WI-14 grows slightly**: besides adding the missing markers it should remove the non-paragraph
  entries (`h`, `h1-3`, `ide`, `toc1-3`, `cl`), which is PT-4488. Note PR **#2761**'s claim differs
  in detail from what ships: `p` **is** present; `s1` and bare `q` are the ones missing.
- **WI-17 is confirmed and slightly larger than written** — two failure modes, and the
  narrow-column condition is not required; it fails at full width too.
- **WI-21 is no longer a verify-and-close item.** It is real work, and it contradicts the engine
  sweep's "mostly done" reading of PRs #520/#536.
- **§6 Q1 must be reframed** — see §6.

**Caveats.** A collapsed range anchored on an element node can legitimately return a zero-height
rect in Chromium, so "caret height 0" alone is not proof the user sees no caret; the unambiguous
parts of (c) are the three-keystroke traversal and the vanished selection. And (a4) establishes
only that the dropdown and its items are *enabled* — I did not **apply** a marker, because that
writes to project data. Whether an apply actually succeeds in Simple is the open half of Q1.

**Incidental findings** (outside WI-1, worth filing):
- The titlebar picker lists **one** project — "Test Project Demo (TPD)" — plus "More projects…",
  despite 9 projects (5 editable) existing. Live confirmation of the flat either/or list behind
  IAN-NN-2.3.
- "More projects…" lists TPD, zzzz11, GTP8, RWB — **T_90 is absent** (4 of 5 editable projects);
  possibly PT-4511's read-only exclusion.
- Column-3's icon-only tabs expose **no accessible name** (no `title`, no `aria-label`, no `<title>`
  in the SVG).
- Opening the BCV chapter grid clips its top row (PT-3121).

## 2. What already exists
*(for: engineers — §3 carries the product-owner view of the same facts)*

**Paratext 9.** Only one requirement claims PT9 behavior: TODD-NTH-1.2 ("flow content after and
beneath shortname — same as PT9"), and Todd's own screenshot is the specification. Ian's comment
filters reference PT9 generically ("basic PT9-style filters", "PT9 has more filters than Saroj is
likely to require") without naming a form. PT9's `MarkerItemSource.cs:16-296` is already ported —
`packages/platform/src/editor/markerMenu/markerItemSource.ts` is a documented port carrying both
PT9 triggers (`\` and Enter). No PT9 archaeology was needed for the rest; **this pair is
essentially all net-new PT10 work.**

**Paratext 10 — reusable as-is (the good news)**

| Capability | Where | Covers |
| :--- | :--- | :--- |
| Per-mode menu item filtering — `hiddenInterfaceModes` + `filterItemsForInterfaceMode` | `menu-data.service-host.ts:36-41`, applied at 5 sites; model `menus.model.ts:73` | TODD-NN-1.1/1.2/1.6e wholesale — data-only edits |
| Submenu flyouts — 3 recursive renderers, shipping example `platform.moveTabToWindow` | `platform-menubar.component.tsx:88-98`, `tab-dropdown-menu.component.tsx:75-88` | TODD-NN-1.6b |
| End-justified muted shortcut spans, RTL-safe, already in production | `DropdownMenuShortcut:301-313`, `MenubarShortcut:254-266`; used at `overlay-context-menu.component.tsx:212` | TODD-NN-1.6d's *render* half |
| `ProjectSelector` **`project-multi` mode** — multi-select over `(projectId, scrollGroupId)`, select-all/clear-all, show-selected-only | `project-selector.component.tsx:212-258`, `:643-645`, `:951-960` | Ian NN3's core — **the unified multi-select already exists** |
| `triggerLabelFormat: 'shortNameAndFullName'` | `project-selector.component.tsx:225` | the shortname-first overlap |
| Three row-grouping schemes incl. auto-collapse to flat | `project-selector.rows.ts:373-452` | Recent / Your projects sectioning |
| `useShrinkStep` / `ShrinkStepContext` (container queries have failed 3× here) | per `adr-toolbar-shrink-measurement` | responsive long name |
| Comment filter stack — 5 orthogonal dropdowns, `dateFilter`/`author` backed in C# | `comment-list-filters.model.ts`, `CommentThreadSelector.cs`; PT-4027 / #2508 | Ian NN1.3 largely |
| Column-3 tab contribution, proven once | supplement `anchorWebViewType`/`insertBeforeWebViewType`; PT-4068/4069 #2500 put Comments there | TODD-NTH-5.2 |
| Settle-loop `scrollToVerse` for a read-only reference panel, visibility-aware | `resource-text-panel.web-view.tsx:604-763` (PT-4467 #2749) | the pattern TODD-NN-3.1 residual copies |
| Text-collection resource ordering — drag + keyboard + per-user persistence | `scripture-text-grid-order.utils.ts` (PT-4078 #2542) | **TODD-NTH-1.3 is done** |
| Chapter/verse `viewMode` + chapter-context panel | `grid.component.tsx:232-236` (PT-4062 #2540) | TODD-NTH-1.1's capability |
| DBL catalog offline cache, persisted, with outage-vs-empty messaging | `platform-get-resources/src/main.ts:169-216`; `resource-picker.utils.ts:30-79` | the only selection surface that degrades well |

**Needs building**

- **Menu group/column headings** — primitives exist (`DropdownMenuLabel`, `MenubarLabel`) but no renderer emits one, and **groups have no `label` field at all** (`menus.model.ts:31-39`). `tab-dropdown-menu.component.tsx:126-127` says it outright: *"Column headers are ignored… groups are not distinguishable."* Model + schema + renderer change.
- **A contributed shortcut field** — `menus.model.ts` has no shortcut property and closes itself with `unevaluatedProperties: false` (`:467`), so a contributed `shortcut` is *rejected and takes the whole extension's `menus.json` down* (`menu-document-combiner.ts:414`). Nothing declares a shortcut on a menu item today; `OverlayContextMenuItem.shortcut` renders but is populated by nobody.
- **Group/column-level hiding** — item-level only; an emptied group still renders its separator.
- **Consumer-supplied picker sections** — `RowSection.kind` is a closed union `'openTabs' | 'other' | 'flat' | 'versification'` (`project-selector.rows.ts:328`). A consumer can localize the fixed headings but cannot add its own.
- **The titlebar is a bespoke picker** — `platform-bible-toolbar.tsx:569-616` does **not** use `ProjectSelector`, and its list is flat either/or (`projectPickerItems = recentProjects.length > 0 ? recentProjects : allProjects`, `:354`), not two sections. That is the concrete duplication to remove.
- **S/R projects in a picker** — machinery exists but is **Studio-only**: `getSharedProjects` is declared at `src/@types/paratext-bible-send-receive/index.d.ts:443` and registered only via `paratext-10-studio/repo-patches/paranext-core.patch:7501-7506`. `SharedProjectInfo.editedStatus: 'new'` already models "not on disk, available for download". Three consumers exist (Home, S/R dialog, Simple's default-project auto-open) — **none is a picker**.
- **`scrollToVerse` in the Scripture Text Grid** — zero occurrences in `scripture-text-grid/`.
- **`scrollToRange`** — the engine owns no scrolling; `scrollToAnnotation:263-333` has reusable geometry.
- **A definition-string cleanup util** — 12,315 dictionary rows begin with `=`, and the data also leaks `{L:}` `{D:}` `{S:}` and `►/◄`.
- **Paragraph tooltip delay** — `delayDuration` is **inert** because the overlay renders `<Tooltip open={!!hoveredData}>` (`paragraph-marker-tooltip-overlay.component.tsx:176`). Needs a real timer; `TOOLTIP_DELAY = 300` exists at `platform-bible-toolbar.tsx:71`.

**Selection surfaces: the "3–4 different UIs" claim holds.** 12 surfaces exist (7 project + 5
resource, 6 distinct components). For a Simple user the live project pickers are exactly **four**:
titlebar (bespoke), the open-project dialog, the shared `ProjectSelector`, and Home. Two PAPI
dialogs — `platform.selectProject` and `platform.selectMultipleProjects` — are **product-dead**,
reachable in production only from the `hello-rock3` *sample* extension; they remain public PAPI
types (`dialog.service-shard.ts:358-360`), so deleting them is an API break.

**Two findings that needed runtime adjudication — now resolved.** Two independent sweeps
disagreed on TODD-NN-2.2/2.3 and TODD-NN-3.2. **WI-1 has been run; see §1a for the measurements.**
Outcome: the marker *positioning* claim did not reproduce, the marker *selection* claim did, and
the find-result scroll defect is confirmed with two failure modes. The sweeps' disagreement is
recorded in §1a rather than repeated here.

**Already shipped — strike or reduce these before planning**

| Requirement | Status |
| :--- | :--- |
| TODD-NN-3.1 third-column sync | **Largely done.** Column 3 was excluded *on purpose* (`platform-scripture-editor/src/main.ts:1119-1122`), and that decision has since been reversed for 3 of Simple's 4 column-3 tabs: Bible texts + Commentaries (PT-4467 #2749), Comments (PT-4080 #2543/2554/2558/2562). Remaining: **Text Collection has no `scrollToVerse` at all**; PT-2340 (checks panel — *not* a Simple column-3 tab, hence no contradiction with its being open); the stale comment; and no Simple-mode test (`scroll-group-sync.spec.ts:64` is `interfaceMode: 'power'`, editor-only) |
| TODD-NTH-1.3 text order | **Done** (PT-4078 #2542). Gap: no drag grip in verse mode |
| TODD-NTH-1.1 verse/chapter | **Capability done** (PT-4062 #2540). New work is only the click affordance + toggle-back |
| TODD-NTH-2 empty-verse caret | **NOT fixed** — WI-1 reproduced it on `main` (§1a item c). #520/#536 landed but do not cover an empty verse between two verses in one paragraph |
| TODD-NTH-4 ≡ IAN-NTH-4 BCV hover | **Fix written, not merged — PR #2750** (PT-4345, in review), and older broader #2229 restyles the same component. Nothing on `main`. Reconcile the two, then merge |
| IAN-NN-1.3 comment filters | **Largely done** (PT-4027 #2508). Gap: `dateFilter`/`author` are backend-supported with no UI; no tag/category filter at any layer |
| TODD-NTH-5.2 Dictionary | **Project-menu item done.** Column-3 tab not done, and pinned by `simple-layout.data.test.ts:46` ("exactly 4 tabs") |
| IAN-NTH-5 Report a problem | **Machinery done** — Usersnap router/shard + 2 Help items. Entry-point refinement only |
| IAN-NN-2.2 "Recent" | PRD states it already works as expected. Verify, don't build |
| IAN-NTH-3 Share/Cancel buttons | Buttons exist; the confirm reads **"Save"** (`en.json:462`). Relabel only |
| TODD-NN-1.x menus | **Not done** — every item still contributed with no `hiddenInterfaceModes`; `en.json:116` still reads "FAQs"; Project menu columns are Edit/Options/Tools/Insert/Info (no VIEW, no QUALITY CHECKS) |
| TODD-NTH-5.1 PT-3848 | Diagnosed as a **data off-by-one** in `lexical.db` (Land↦Lamp 98 vs 99, God↦Destruction 49 vs 50). **No spike needed** — but the fix lives in `paranext/dependencies`, outside all five repos |

Good news for TODD-NN-1.6: Switch Scripture view, Show footnotes, Change footnote pane location,
Insert footnote, Insert cross-reference, Insert comment, Find, Comments and Checking assistant
**all already exist** as contributed items. 1.6a/1.6c/1.6f are largely a **regroup + relabel**.

## 3. New in Paratext 10 — confirm these are intentional
*(for: product owner)*

| PRD item | What Paratext 9 actually does | Intentional? |
| :--- | :--- | :--- |
| "Select the paragraph marker itself in order to change it" | PT9 has no equivalent gesture — its marker changes go through the marker dropdown against the caret's paragraph, which is the behavior PT10 already has | Confirm this is a new PT10 affordance, not parity |
| Keyboard-shortcut hints in the Project menu | PT9 shows accelerators in its menus, so this *is* parity — but PT10 has no shortcut declaration in its menu contribution model at all | Confirm parity is the goal and worth the model change |
| "Community support" replacing "FAQs" | PT9 has no such item; this is PT10-only naming | Confirm the wording |
| Text-collection layout "same as PT9" | The screenshot is the spec; PT9 flows content beneath a fixed-width inline shortname badge with no left margin | Confirm the screenshot is authoritative over any prose reading |
| "All projects…" reaching S/R server projects | PT9's project open dialog lists local projects; reaching the server is a separate S/R flow — so a *combined* local+server picker is new | **Load-bearing:** see §6 Q3 |
| Dictionary in column three | PT9 has no three-column Simple layout | Net-new by construction |
| **PT9 capabilities the PRDs don't mention** — PT9's comment filters include plain-text search and a sort control, both explicitly excluded here ("no plain text search or sort control"); PT9 also has tag/category comment filtering, which PT10 has at **no** layer | Confirm all three are deliberate omissions rather than oversights |

## 4. Proposed work items
*(for: epic lead + engineers)*

Repo key: **core** = `paranext-core`; **engine** = `eten-tech-foundation/scripture-editors`;
**deps** = `paranext/dependencies`; **studio** = `paratext-10-studio`.

| # | Work item | Repo | Complexity | Depends on | Covers | Jira |
| :-- | :--- | :-- | :-- | :-- | :--- | :--- |
| WI-1 | ~~Adjudicate the three unknowns in the running app~~ — **DONE, see §1a** | — | Simple | — | gated WI-12/13/14, WI-17, WI-21 | — |
| WI-2 | Prune Simple's main and Help menus; rename FAQs → Community support | core | Simple | — | TODD-NN-1.1, 1.2, 1.3 | [PT-4533](https://paratextstudio.atlassian.net/browse/PT-4533) |
| WI-3′ | Menu renderer: group headings **+ end-justified shortcut hints** *(consolidates former WI-5)* | core | Moderate | — | TODD-NN-1.6c, 1.6d | [PT-4532](https://paratextstudio.atlassian.net/browse/PT-4532) |
| WI-4 | Regroup the Project menu to the v0 structure | core | Moderate | WI-3′, WI-2 | TODD-NN-1.6a, 1.6b, 1.6e, 1.6f | [PT-4534](https://paratextstudio.atlassian.net/browse/PT-4534) |
| ~~WI-5~~ | **Folded into WI-3′** — same model + renderer + `dist` rebuild (see §4a) | — | — | — | *(was TODD-NN-1.6d)* | — |
| WI-6 | Make menus and popovers opaque; remove the stray border/shadow | core | Moderate | — | TODD-NN-1.4, 1.5 | [PT-4535](https://paratextstudio.atlassian.net/browse/PT-4535) |
| WI-7 | Reconcile #2229 against #2750 and land BCV chapter-hover alignment | core | Simple | — | TODD-NTH-4 ≡ IAN-NTH-4 | [PT-4553](https://paratextstudio.atlassian.net/browse/PT-4553) |
| WI-8 | Theme contrast pass — `--input`, radio, selection colours | core | Moderate | — | IAN-NTH-4 | [PT-4555](https://paratextstudio.atlassian.net/browse/PT-4555) |
| WI-9 | Add the Dictionary tab to column three | core | Moderate | — | TODD-NTH-5.2 | [PT-4545](https://paratextstudio.atlassian.net/browse/PT-4545) |
| WI-10 | Fix Senses card formatting and strip definition-string artefacts *(the shadcn `toggle.tsx` half moves to Lane 5)* | core | Moderate | — | TODD-NTH-5.3 | [PT-4546](https://paratextstudio.atlassian.net/browse/PT-4546) |
| WI-11 | Correct the `lexical.db` semantic-domain off-by-one | deps | Moderate | — | TODD-NTH-5.1 | [PT-4547](https://paratextstudio.atlassian.net/browse/PT-4547) |
| WI-12 | ~~Position the marker and editable region in the gutter view~~ → **regression test only** (WI-1: not reproduced) | core | Simple | — | TODD-NN-2.2 | [PT-4542](https://paratextstudio.atlassian.net/browse/PT-4542) |
| WI-13 | Make the paragraph marker itself a selection target | engine + core | Complex | §6 Q1, WI-14, invariants owner | TODD-NN-2.3 | [PT-4540](https://paratextstudio.atlassian.net/browse/PT-4540) |
| WI-14 | Declare the core paragraph-marker set host-side and fix palette coverage | core | Moderate | §6 Q1/Q2, PR #2761 check | TODD-NN-2.1 | [PT-4539](https://paratextstudio.atlassian.net/browse/PT-4539) |
| WI-15 | Add a hover delay to the paragraph-marker tooltip | core | Simple | — | TODD-NN-2.4 | [PT-4536](https://paratextstudio.atlassian.net/browse/PT-4536) |
| WI-16 | Add settle-loop `scrollToVerse` to the Scripture Text Grid | core | Moderate | — | TODD-NN-3.1 | [PT-4543](https://paratextstudio.atlassian.net/browse/PT-4543) |
| WI-17 | Add `scrollToRange` so find/check results scroll to the match | core | Moderate | — | TODD-NN-3.2 | [PT-4541](https://paratextstudio.atlassian.net/browse/PT-4541) |
| WI-18 | Text collection: click-toggle verse/chapter view and tighten row layout | core | Moderate | — | TODD-NTH-1.1, 1.2 | [PT-4544](https://paratextstudio.atlassian.net/browse/PT-4544) |
| WI-19′ | Comments: density, active-comment contrast, toolbar-ordering bug **+ date/author filters** *(consolidates former WI-20)* | core | Moderate | — | IAN-NN-1.1, 1.2, 1.3, 1.4 | [PT-4554](https://paratextstudio.atlassian.net/browse/PT-4554) |
| ~~WI-20~~ | **Folded into WI-19′** — same `comment-list/` + `comment-editor/` surface (see §4a) | — | — | — | *(was IAN-NN-1.3)* | — |
| WI-21 | Make the caret visible while arrowing through an empty verse | engine | Moderate | — | TODD-NTH-2 | [PT-4537](https://paratextstudio.atlassian.net/browse/PT-4537) |
| WI-22 | Promote `ProjectSelector` to the stable barrel and open up `RowSection` | core | Moderate | picker PR queue | IAN-NN-3.1 | [PT-4548](https://paratextstudio.atlassian.net/browse/PT-4548) |
| WI-23 | Migrate the titlebar picker onto `ProjectSelector` | core | Complex | WI-22 | IAN-NN-2.1, 2.3(part), IAN-NN-3.2 | [PT-4549](https://paratextstudio.atlassian.net/browse/PT-4549) |
| WI-24 | Make shortname-first consistent across tab titles, dialogs and components | core | Moderate | WI-22 | IAN-NN-2.4 ≡ TODD-NTH-3 | [PT-4550](https://paratextstudio.atlassian.net/browse/PT-4550) |
| WI-25 | Fix the four named picker defects in place | core | Moderate | — | IAN-NN-3.3 | [PT-4551](https://paratextstudio.atlassian.net/browse/PT-4551) |
| WI-26 | Reach S/R server projects from "All projects…" | core + studio | Complex | WI-23, §6 Q3 | IAN-NN-2.3 | [PT-4552](https://paratextstudio.atlassian.net/browse/PT-4552) |
| WI-27 | Retire the dead `selectProject` / `selectMultipleProjects` dialogs | core | Simple | — | none — cleanup, cut first | [PT-4556](https://paratextstudio.atlassian.net/browse/PT-4556) |

**These work items are now filed in Jira** under the Combined parent [PT-4530](https://paratextstudio.atlassian.net/browse/PT-4530) *(Sprint 90 — Simple is coherent for Saroj (Ian + Todd))* — one Sub-task per item, 26 in all, including **WI-28** ([PT-4557](https://paratextstudio.atlassian.net/browse/PT-4557), Team layout) and **WI-29** ([PT-4558](https://paratextstudio.atlassian.net/browse/PT-4558), Report a problem), neither of which is itemized in the table above. The parent carries the non-negotiable → ticket mapping, the lane plan, and twelve open questions (Q1–Q9 for the product owners; Q10–Q12 engineering decisions). **The tickets, not this brief, are the current record** — several claims here were corrected against `origin/main` while the tickets were written, including `platform.selectProject` (a live picker, not product-dead) and the marker-dropdown curation axis (`MarkerCategoryType`, not `MarkerType`).

**WI-1 — Adjudicate the three unknowns in the running app.** Not a research spike; a
half-day empirical pass that sets three valve triggers on day one. (a) In Simple, does a
hanging-indent marker (`li2`, `q2`, `lim2`) paint inside the text column, and can the marker
glyph be selected? This settles the §2 sweep disagreement and decides whether WI-12/WI-13 are
real. (b) Run the HPUXR GEN 14:1-4 / Find "Notting" repro with a narrow column — does the view
scroll to the match? (c) Re-test HPUXR 2 Kings 2:7 arrowing through empty verses. Produces a
one-page findings note; consumed by WI-12, WI-13, WI-17, WI-21. **Do this before committing to
the marker block** — the artifact's V3 valve depends on it.

**WI-2 — Prune Simple's main and Help menus.** Set `hiddenInterfaceModes: ['simple']` on the
owning items and change one localization value. Items live across three repos: "Open…"
(`platform-get-resources/contributions/menus.json:7`), "Open Dictionary: SDBH/SDBG"
(`platform-lexical-tools/…:7`), "Open enhanced resource" (`platform-enhanced-resources/…:7`),
"Paratext Registration Information" (`paratext-registration/…:7`), and Getting started / Feature
roadmap / Developer Documentation in `menu.data.json`. FAQs → "Community support" is
`assets/localization/en.json:116`; the target URL at
`src/shared/data/platform-bible-menu.commands.ts:63` stays put. **Discrepancy to settle first:**
the PRD screenshot says "Manage extensions", but no such item exists — the nearest is
`%mainMenu_openExtensionMarketplace%` = "Open Extension Marketplace"
(`paratext-bible-marketplace/contributions/menus.json:7`). Confirm that is the intended target.
Leaves headings and reordering to WI-3/WI-4.

**WI-3′ — Menu renderer: group headings and shortcut hints.** *(Consolidated: the former WI-5 is the second half of this item — same model, same renderer, one `dist` rebuild.)*

*Headings.* Adds a `label` to menu groups
(`menus.model.ts:31-39` has none), extends the JSON schema, and teaches
`tab-dropdown-menu.component.tsx` to emit `DropdownMenuLabel` instead of relying on separators
(`:126-127` currently documents the opposite). Prerequisite for WI-4's section headings. Mind
`unevaluatedProperties: false` (`:467`) — a schema slip takes down a whole extension's manifest.

**WI-4 — Regroup the Project menu to the v0 structure.** Mostly relabel and reorder: the nine
target items already exist as contributions across `platform-scripture-editor` (16 items, columns
Edit/Options/Tools/Insert/Info) and `paratext-bible-send-receive` (2 items). Adds Bible texts /
Commentaries / Text collection entries, hides the 5-item inventory group, and hides Quality checks
via `hiddenInterfaceModes`. **Caveat:** only *items* are filtered, never groups or columns — an
emptied group still renders its separator, so hiding a whole section needs WI-3's model change or
a renderer fix. Note PT-4503 (menus don't re-localize on UI-language change) will be hit by any
restructure.

*Shortcut hints (formerly WI-5).* The render half is free
(`DropdownMenuShortcut` is literally `ms-auto text-xs text-muted-foreground`). The work is
sourcing: shortcuts are declared in three unrelated places — Electron `before-input-event`
(`src/main/main.ts:1411-1470`; there are **zero** `accelerator:` declarations anywhere in
`src/main/`), one `useHotkeys` call (`platform-menubar.component.tsx:172-201`, two of whose
bindings are dead), and per-web-view handlers. `src/stories/keyboard-shortcuts.data.ts` already
holds per-OS *display strings* in exactly the right shape, but lives in a Storybook-only path, is
exported from no package, and is keyed by ad-hoc slugs with **no link to a PAPI command name**.
So: move it to `src/shared/data/`, add a `command` join key, and read it from the menu renderer.
Chosen over adding a `shortcut` field to `menus.model.ts` because that means re-authoring 14
manifests against a closed schema. Trade-off to accept explicitly: hints then live outside the
contribution model, so a third-party extension cannot declare one. Keep
`.claude/rules/keyboard-shortcuts-catalog.md` satisfied either way. Also fix or file PT-4143 —
the main-process handlers claim chords app-wide and focus-blind, so Ctrl/Cmd+B never reaches the
editor as "bold", which would make a displayed hint a lie.

**WI-6 — Menu and popover opacity.** PT-4101 is an unclaimed, well-specified ticket carried
through Sprints 88 and 89 — adopt it rather than duplicating it, and note its description already
covers the always-on-border half of TODD-NN-1.4. The systemic cause is PT-4476 (incoherent
z-index scale: popovers outrank modals and tooltips), which PR **#2750** starts to fix with a
z-index scale. **Three open PRs are independently editing overlay layering** (#2750, #2672,
#2718 — the last is this very checkout) — pick one owner for the scale before touching the three
shadcn menu content files. Every shadcn edit needs a `// CUSTOM:` annotation.

**WI-7 — BCV chapter-hover alignment.** No new code: the fix is written twice. #2750 (PT-4345,
sprint-tracked, in review) and #2229 (Sebastian's, open since 30 June, broader, "all ux approved",
also carrying up/down arrows and a keyboarding overhaul) restyle the same
`book-chapter-control`. Reconcile and land one. This is the cheapest item on the list.

**WI-9 — Dictionary tab in column three.** Follow the proven pattern: a supplement entry with
`anchorWebViewType` + `insertBeforeWebViewType` (per `adr-tab-order-anchor-insert-before`), as
PT-4068/4069 did for Comments. `simple-layout.data.test.ts:46` asserts "exactly 4 tabs" and must
be updated deliberately. Two supplement JSONs exist — core's and Studio's overwriting copy, which
**omits `insertBeforeWebViewType`** and uses a different tab `id`, so the shipped product already
appends Text Collection *after* Find. Fix that drift here or file it.

**WI-12 / WI-13 — Paragraph marker positioning and selection.** **WI-1 has run (§1a).** The
positioning half did **not** reproduce: in Simple's gutter view the `\li1`/`\li2` glyphs sit at
x 22–58 with first-line text at 77–139 and no collision at 958/620/460/380 px, and both
`--para-indent` and `--verse-text-start` are set. So **WI-12 reduces to a regression test** —
pin the no-collision property across column widths, in **both** copies of `_usj-nodes.scss`
(core and engine, guarded by `usj-nodes-scss-coverage.test.ts`). WI-13 remains, gated on §6 Q1,
and WI-1 pinned its mechanism: a range over the glyph is accepted and then cleared by a policy
guard, so this is a predicate change, not a new selection model. It is
**far smaller than the planning artifact's "new selection model in Lexical" reading**: a
paragraph marker already *is* a selectable Lexical node (`MarkerNode extends TextNode`), and
`NodeSelection` over a marker is already implemented, styled and shipped for the guarded-delete
arming path (`StructureKeyboardPlugin.tsx:129` → `useLexicalNodeSelection` →
`VERSE_SELECTED_CLASS_NAME`). What blocks it is a deliberate per-node policy guard whose own
docstring says the answer differs by view (`ParaMarkerPrefixCursorGuardPlugin.tsx:30-36`). So the
work is: add a third state to that predicate ("not a caret position, but a valid selection
target"), add a selected-state class mirroring the verse one, and teach
`markerMenuContext.utils.ts:176` to accept the `NodeSelection` it currently declines —
feeding the existing single entry point `$applyParaMarker`. Two unknowns remain: closed-unmerged
engine PR #548 documents Lexical boundary normalization re-anchoring carets *into* marker nodes in
editable mode with no successor PR, and `ImmutableVerseNode.isKeyboardSelectable()` returns false,
so keyboard-reachable selection needs that override revisited. **This crosses Invariant II** —
`glyphPositions.utils.ts` exists to re-express positions so no glyph is an operand of the edit
about to run, and a marker selection deliberately makes a glyph *the* operand. Needs the
invariants owner, not a judgment call in the PR.

**WI-14 — Declare the core paragraph-marker set host-side.** The 10Power "tier 1" list exists
nowhere in code, config, docs or localization in either repo, and it should not live in the
engine: PR #495 deliberately *removed* the handbook marker list, marker sets arrive from the host
as `StyleInfo`, and the Standard-view invariants say to prefer a declared property over a new
exception list. So the list belongs in core's markers map, derived from `usfmMarkers` rather than
the hardcoded 28-line `blockMarkerToBlockNames` (whose own comment reads "This list is
incomplete"). **Check open PR #2761 first** — it reports that block markers `p`/`q`/`s1` have been
missing from the Formatted-view marker palette since #2565, so part of this is a revert, not new
coverage. **Rename the concept**: "Tier 1" already means the marker-*rename* engine strategy in
`scripture-editors` (`markerEditTier1.utils.ts`); use `coreParagraphMarkers`. Widening the
insertion set also widens the corpus that must satisfy the transform fixed point
(`tier2Rebuild.corpus.test.tsx`), and multi-node selections that `$isCloseAndReopenEligible`
declines are known to mangle the spans they cross — don't route more traffic there.

**WI-16 — `scrollToVerse` in the Scripture Text Grid.** Copy the settle-loop from
`resource-text-panel.web-view.tsx:604-763`, keyed on `isViewVisible` and the reference fields.
This is the same defect PT-4467 just fixed next door. Also delete the now-false comment at
`platform-scripture-editor/src/main.ts:1119-1122` (it still asserts these panels are not
scroll-synced) and add the missing Simple-mode test — `scroll-group-sync.spec.ts:64` is
`interfaceMode: 'power'` and editor-only, so nothing currently pins any of this. Per
`.claude/rules/cross-view-sync-hidden-views.md`, the hidden-tab catch-up needs a test that mounts
hidden, changes the reference, flips visibility and asserts the catch-up fires. **Sequencing:**
PT-4270/4351/4352 are sharding the scroll-group machinery for Power this cycle — coordinate.

**WI-22 / WI-23 / WI-24 — the picker slice.** WI-22 is the enabling change: promote
`ProjectSelector` from `experimental.ts:15-21` to the stable barrel and replace the closed
`RowSection.kind` union with consumer-supplied sections, so "Recent / Your projects / All
projects…" can be expressed. Also drop two dead props (`getSelectedText`,
`defaultGroupByOpenTabs` — zero consumers anywhere). Add the `type`/`kind` discriminator to
`ProjectSelectorProject` that merged PR #2671 documented as missing: projects and resources
currently render identically, with the distinction living only in localized strings. WI-23 then
migrates the bespoke titlebar onto it, preserving `useShrinkStep` (container queries have failed
three times on that toolbar) and fixing the blue-box overlap; note "More projects…" currently
vanishes when there are zero local projects (`platform-bible-toolbar.tsx:598`) — exactly when it
matters most. WI-24 makes shortname-first real across tab titles, dialogs and components: today
Find sorts by `fullName` while `ProjectSelector` sorts by `shortName`, and Settings searches short
names only because its adapter sets `fullName = shortName`
(`settings-sidebar.component.tsx:93-101`) — a data-plumbing gap, not a search bug. Open PR #2674
overlaps. **Before any of this, reconcile the queue**: #2673, #2674, #2675, #2672, #2291, #2282,
#2746, #2741 all edit `project-selector.component.tsx`, and #2349 proposes moving the picker *out*
of `platform-bible-react`. #2349 does **not** actually contradict WI-22 — it targets
`ResourcePickerDialog`, the DBL-resource picker, a different component — but that needs stating
out loud so it stops reading as a blocker. Also note PT-4216 documents implicit coupling between
the Share Layout dialog and real tab titles, which constrains WI-24.

**WI-26 — "All projects…" reaching S/R projects.** The affordance is live and works; what sits
behind it is a **local-disk-only** list (`use-project-picker-data.hook.ts:334-391` builds
`recent` + `allProjects` from local metadata and never calls `getSharedProjects`). So the PRD's
"there is no way to select from other projects available via S/R" is correct. **Hard constraint:
`getSharedProjects` is registered only in Studio's patch layer, so a server-reaching picker would
throw in plain Platform.Bible.** Home already renders not-on-disk projects as muted rows with
**Get** instead of **Open** (`home.component.tsx:377,520`) — that is the pattern to reuse, and
`SharedProjectInfo.editedStatus: 'new'` already models the state. There is also **no cached S/R
project list anywhere** (unlike the DBL catalog) and **no app-wide offline signal** — three
identical `// TODO: Hook into something that checks for whether the platform is in offline mode`
sit in the socket and XHR services. rev2 states the product preference: expand inline or show a
projects-filtered Home; the S/R dialog is *least* favourable "because S/R is intended to be
replaced with Home". This is the most likely item to fire a valve.

## 4a. Lanes, dependencies and the platform-bible-react land order
*(for: epic lead + implementation owner)*

**Staffing and shape:** ~4.5–5 developers, **one 2-week sprint** for the combined 6-week appetite.
The lanes below are sized to that: five owners, each holding a contiguous set of files for the
whole sprint so nobody rebases onto someone else's half-finished surface.

**Two consolidations vs §4**, made to cut `platform-bible-react` rebuild events:
- **WI-3 + WI-5 → WI-3′** "Menu renderer: group headings + shortcut hints" (same model, same
  renderer, same rebuild).
- **WI-19 + WI-20 → WI-19′** "Comments: density, active-comment contrast, toolbar-ordering bug,
  date/author filters" (all inside `comment-list/` + `comment-editor/`).
- **WI-10's `toggle.tsx` change moves to Lane 5**, leaving WI-10 as the `platform-lexical-tools`
  card-layout work only. This makes Lane 3 entirely free of `platform-bible-react`.

### The five lanes

| Lane | Scope | Ordered items | Files owned for the sprint | pbr? |
| :-- | :--- | :--- | :--- | :-- |
| **L1** | **Menus** (Todd NN1) | WI-3′ → WI-2 → WI-4 → WI-6 | `menus.model.ts`; `components/advanced/menus/`; shadcn `dropdown-menu`/`menubar`/`context-menu`; `menu.data.json`; every `contributions/menus.json`; `keyboard-shortcuts.data.ts`; menu keys in `en.json` | **cluster A** |
| **L2** | **Editor & engine** (Todd NN2, NN3.2, NTH2) | WI-15 → WI-21 → WI-14 → WI-13 → WI-17 (WI-12 as filler) | `platform-scripture-editor.web-view.tsx`; `editor-dom.util.ts`; `paragraph-marker-tooltip/`; the markers map; engine marker/caret plugins; both `_usj-nodes.scss` copies | none |
| **L3** | **Grid & Dictionary** (Todd NN3.1, NTH1, NTH5) | WI-16 → WI-18 → WI-9 → WI-10 (WI-11 async) | `scripture-text-grid*`; `resource-cell-view.component.tsx`; `_editor.scss`; `platform-lexical-tools/`; both `default-layout-supplement.json`; `simple-layout.data.*` | none |
| **L4** | **Pickers** (Ian NN2, NN3) | WI-22 → WI-23 → WI-24 → WI-25 → WI-26 | `components/advanced/project-selector/`; `resource-picker-dialog/`; `platform-bible-toolbar.tsx`; `project-picker.component.tsx`; `use-project-picker-data.hook.ts` | **cluster B** |
| **L5** | **Comments, theme & BCV** (Ian NN1, NTH4; shared NTH) | WI-7 → WI-19′ → WI-8 (+ `toggle.tsx`) | `components/advanced/comment-list/` + `comment-editor/`; `legacy-comment-manager/`; `index.css`; shadcn `radio-group`/`toggle`; `book-chapter-control/` | **cluster C** |

Cut-first, unassigned: Team layout (IAN-NTH-1/2/3), WI-27, IAN-NTH-5.

### Dependency table

| Item | Blocked by | Blocks | Can start immediately? |
| :-- | :--- | :--- | :--- |
| WI-3′ | — | WI-4 | **yes** |
| WI-2 | — (file-disjoint from WI-3′) | WI-4 | **yes** |
| WI-4 | WI-3′ (needs the group-label model), WI-2 | — | no |
| WI-6 | — | — | yes (land last in cluster A: rebuilds `dist`) |
| WI-15 | — | — | **yes** |
| WI-21 | — | — | **yes** |
| WI-14 | **§6 Q1** (product), PR #2761 check | WI-13 | no — Q1 first |
| WI-13 | §6 Q1, WI-14, invariants owner sign-off | — | no |
| WI-17 | — | — | yes |
| WI-12 | — | — | yes (regression test only) |
| WI-16 | — | WI-18 | **yes** |
| WI-18 | WI-16 (same grid files) | — | no |
| WI-9 | — | — | yes (updates the "exactly 4 tabs" test deliberately) |
| WI-10 | — | — | yes |
| WI-11 | — | — | **yes** (different repo, no contention) |
| WI-22 | picker PR queue reconciliation | WI-23, WI-24 | **only after the queue is cleared** |
| WI-23 | WI-22 | WI-26 | no |
| WI-24 | WI-22 | — | no |
| WI-25 | — | — | **yes** (fix-in-place, independent of WI-22) |
| WI-26 | WI-23, **§6 Q3** (product) | — | no |
| WI-7 | reconcile #2229 vs #2750 | WI-6 (shares the z-index scale) | **yes** |
| WI-19′ | — | — | **yes** |
| WI-8 | — | — | yes |

**Nine items can start on the first day**: WI-2, WI-3′, WI-11, WI-12, WI-15, WI-16, WI-19′, WI-21,
WI-25, plus WI-7 once the two BCV PRs are reconciled. That is enough unblocked work for all five
lanes from the outset — no lane waits on a decision to begin.

**Two product answers are on the critical path and should be obtained before the sprint starts,
not during it:** §6 Q1 (gates WI-14 → WI-13, the whole marker block) and §6 Q3 (gates WI-26).
L2 has WI-15/WI-21/WI-17/WI-12 to work through meanwhile, so Q1 arriving late costs sequence
rather than idle time — but it does compress the marker work into the back half of a two-week
sprint, which is where the artifact's V3 valve is meant to fire.

### platform-bible-react land order

`lib/platform-bible-react/dist/` is committed (14 generated files), so **any** two pbr branches
conflict on generated output regardless of which source files they touched. With the merge
protocol fixed, the mitigation is to reduce the number of pbr landing events and keep them
sequential:

1. **Three clusters, three owners** — A (L1, menus + shadcn menus), B (L4, pickers), C (L5,
   comments + theme + BCV + toggle). L2 and L3 touch no pbr at all.
2. **Land order: C → A → B.** C is smallest and includes WI-7, which is really just landing an
   existing PR; A must precede B because B is the longest-running branch and should rebase least
   often; B lands last because the picker slice is the most likely to slip or be cut.
3. **One cluster in the merge queue at a time.** Clusters develop in parallel; only the merge is
   serialized. The owner rebuilds `dist` immediately before merging, and a later cluster resolves
   `dist` by rebuilding rather than by hand-merging bundles.
4. **Within a cluster, sequence the PRs** — cluster A lands WI-3′ before WI-6 so the renderer
   change and the shadcn opacity change never regenerate `dist` concurrently.

This takes pbr landing events from **eleven to eight**, in three owned clusters, with no global
pbr owner and no single pbr issue.

## 5. Requirement coverage
*(for: everyone)*

| Requirement | Work item(s) | Notes |
| :--- | :--- | :--- |
| IAN-NN-1.1 comments whitespace | WI-19′ ([PT-4554](https://paratextstudio.atlassian.net/browse/PT-4554)) | `Card` already accepts `size="sm"` — a zero-blast-radius lever |
| IAN-NN-1.2 active-comment visibility | WI-19′ ([PT-4554](https://paratextstudio.atlassian.net/browse/PT-4554)) | Current ΔL ≈ 1.6% in light, inverted in the `paratext` dark theme |
| IAN-NN-1.3 basic PT9 filters | WI-19′ ([PT-4554](https://paratextstudio.atlassian.net/browse/PT-4554)) | Largely shipped; only date + author need UI |
| IAN-NN-1.4 styling buttons above toolbar | WI-19′ ([PT-4554](https://paratextstudio.atlassian.net/browse/PT-4554)) | |
| IAN-NN-2.1 blue box dismissal | WI-23 ([PT-4549](https://paratextstudio.atlassian.net/browse/PT-4549)) | |
| IAN-NN-2.2 "Recent" works | — | PRD states it already works; verify only |
| IAN-NN-2.3 "Your projects" / All projects… | WI-23 ([PT-4549](https://paratextstudio.atlassian.net/browse/PT-4549)), WI-26 ([PT-4552](https://paratextstudio.atlassian.net/browse/PT-4552)) | WI-26 is the Studio-gated half |
| IAN-NN-2.4 shortname-first | WI-24 ([PT-4550](https://paratextstudio.atlassian.net/browse/PT-4550)) | ≡ TODD-NTH-3.1 — **build once** |
| IAN-NN-3.1 use composable ProjectSelector | WI-22 ([PT-4548](https://paratextstudio.atlassian.net/browse/PT-4548)) | Stretch Goal in rev2 |
| IAN-NN-3.2 unify across Simple tabs | WI-23 ([PT-4549](https://paratextstudio.atlassian.net/browse/PT-4549)) | Stretch Goal in rev2 |
| IAN-NN-3.3 four named picker defects | WI-25 ([PT-4551](https://paratextstudio.atlassian.net/browse/PT-4551)) | The part Saroj actually feels; shippable without WI-22/23 |
| TODD-NN-1.1/1.2/1.3 menu pruning + rename | WI-2 ([PT-4533](https://paratextstudio.atlassian.net/browse/PT-4533)) | |
| TODD-NN-1.4/1.5 menu chrome | WI-6 ([PT-4535](https://paratextstudio.atlassian.net/browse/PT-4535)) | Adopt PT-4101 |
| TODD-NN-1.6a/b/e/f Project menu regroup | WI-4 ([PT-4534](https://paratextstudio.atlassian.net/browse/PT-4534)) | |
| TODD-NN-1.6c section headings | WI-3′ ([PT-4532](https://paratextstudio.atlassian.net/browse/PT-4532)) | Needs a model change |
| TODD-NN-1.6d shortcut hints | WI-3′ ([PT-4532](https://paratextstudio.atlassian.net/browse/PT-4532)) | PRD pre-authorises postponing; cut this half if it fights the schema |
| TODD-NN-2.1 insert core markers | WI-14 ([PT-4539](https://paratextstudio.atlassian.net/browse/PT-4539)) | Check #2761 revert first |
| TODD-NN-2.2 marker positioning | WI-12 ([PT-4542](https://paratextstudio.atlassian.net/browse/PT-4542)) | **Not reproduced in WI-1** — regression test only |
| TODD-NN-2.3 select the marker | WI-13 ([PT-4540](https://paratextstudio.atlassian.net/browse/PT-4540)) | Confirmed in WI-1; gated on §6 Q1; crosses Invariant II |
| TODD-NN-2.4 tooltip delay | WI-15 ([PT-4536](https://paratextstudio.atlassian.net/browse/PT-4536)) | `delayDuration` is currently inert |
| TODD-NN-3.1 all columns respond | WI-16 ([PT-4543](https://paratextstudio.atlassian.net/browse/PT-4543)) | Mostly shipped; Text Collection remains |
| TODD-NN-3.2 scroll to the match | WI-17 ([PT-4541](https://paratextstudio.atlassian.net/browse/PT-4541)) | Confirmed in WI-1 — two failure modes, fails at full width too |
| TODD-NTH-1.1 verse/chapter toggle | WI-18 ([PT-4544](https://paratextstudio.atlassian.net/browse/PT-4544)) | included |
| TODD-NTH-1.2 text-collection whitespace | WI-18 ([PT-4544](https://paratextstudio.atlassian.net/browse/PT-4544)) | included |
| TODD-NTH-1.3 text order | — | **already done** (PT-4078); only the verse-mode grip is missing |
| TODD-NTH-2 empty-verse reflow | WI-21 ([PT-4537](https://paratextstudio.atlassian.net/browse/PT-4537)) | **Confirmed NOT fixed in WI-1** — real work, not a verify-and-close |
| TODD-NTH-3 name display | WI-24 ([PT-4550](https://paratextstudio.atlassian.net/browse/PT-4550)) | 3.1 ≡ IAN-NN-2.4; 3.2/3.3 cut first |
| TODD-NTH-4 ≡ IAN-NTH-4 BCV hover | WI-7 ([PT-4553](https://paratextstudio.atlassian.net/browse/PT-4553)) | included — cheapest item; just land #2750 |
| TODD-NTH-5.1 semantic domains | WI-11 ([PT-4547](https://paratextstudio.atlassian.net/browse/PT-4547)) | outside all five repos |
| TODD-NTH-5.2 Dictionary tab | WI-9 ([PT-4545](https://paratextstudio.atlassian.net/browse/PT-4545)) | included |
| TODD-NTH-5.3 Senses cards | WI-10 ([PT-4546](https://paratextstudio.atlassian.net/browse/PT-4546)) | included |
| IAN-NTH-1/2/3 Team layout | WI-28 *(not itemized — see below)* | **cut first**; feature already shipped, this is rename + icon + grouping + lock-structure UI + relabel "Save" |
| IAN-NTH-4 themes | WI-8 ([PT-4555](https://paratextstudio.atlassian.net/browse/PT-4555)) | cut first, except the `--input` token which is a real WCAG 1.4.11 failure (≈1.3:1) |
| IAN-NTH-5 Report a problem | — | machinery done; entry-point refinement only. **Cut first** |

Every non-negotiable maps to at least one work item. Three land mostly-shipped
(TODD-NN-3.1, IAN-NN-1.3, IAN-NN-2.2) and should be re-scoped down rather than planned in full.

**Not itemized above, deliberately:** Team layout (IAN-NTH-1/2/3) is one PR's worth of rename,
icon swap, dialog regrouping, lock-structure UI and a "Save" → "Share with team" relabel on a
feature that already shipped (#2528, #2563, #2547, #2488, #2681). It is a nice-to-have in rev2 and
the first thing to cut; PT-4216's tab-title coupling is its only real risk.

## 6. Questions for the product owner
*(for: product owner)*

**Q1 — Does Simple get paragraph-marker editing, and on what terms?** *(reframed after WI-1 —
the original premise was wrong.)* The brief previously said Simple's paragraph dropdown is
disabled by structure protection. **It is not**: in Simple the dropdown opens and all 26 items are
enabled (§1a a4). So the blocker is narrower and more specific than "Simple bars this":

1. The dropdown's **contents are wrong** — the markers Saroj needs (`li1`, `li2`, `s1`, bare `q`)
   are absent, while non-paragraph entries (`h`, `ide`, `toc1-3`, `cl`) are offered. A paragraph
   already carrying `li2` reports it as a "Miscellaneous Marker".
2. The **marker glyph cannot be selected** — a guard clears any selection over it (§1a a2).
3. Two structure controls exist and both are enabled, so what an *apply* actually does in Simple
   is still untested — I stopped short of applying because it writes to project data.

What product needs to decide is therefore not "does Simple get Standard view" but: **should the
core paragraph markers be editable in Simple while structure protection is on by default?**
*Suggested answer:* yes — curate the dropdown to the core paragraph set and let those apply in
Simple, leaving Standard view Power-only. That keeps the protection story intact (structure is
still protected against arbitrary restructuring) while unblocking the specific thing the PRD asks
for. **One engineering task falls out of this and should run before WI-14 is sized:** confirm
whether applying a curated marker in Simple succeeds or is refused by the protection gate.

**Q2 — Which markers are the "tier 1" set?** The 10Power list the PRD links exists nowhere in
code, config or docs. Someone must supply it as an explicit list before TODD-NN-2.1 can be built
or tested. *Suggested answer:* have 10Power export the list into the PRD as text; engineering
then declares it in core's markers map. Also please stop calling it "tier 1" in cross-repo
conversation — that phrase already means something unrelated in the editor codebase.

**Q3 — Should "All projects…" reach the server at all this cycle?** Reaching S/R projects works
only in Paratext 10 Studio, would throw in plain Platform.Bible, has no cached list to fall back
on, and there is no app-wide offline signal. *Suggested answer:* ship "Your projects" clarified
and correct, and defer the server-reaching half. rev2 already prefers a projects-filtered Home
over the S/R dialog "because S/R is intended to be replaced with Home" — which suggests waiting
for Home rather than building a second server-reaching surface now. An absent affordance is
honest; a present one that errors adds a defect in the cycle meant to remove defects.

**Q4 — "Manage extensions" doesn't exist.** Todd NN-1.1's screenshot marks it for removal, but
the only nearby item is "Open Extension Marketplace". Confirm that is the intended target.

**Q5 — Two items are duplicated across the PRDs at different priorities; each needs one owner.**
rev2 already de-duplicated almost everything, so this is a short list — presented, not decided:
- **Shortname-first** — IAN-NN-2.4 (non-negotiable) ≡ TODD-NTH-3.1 (nice-to-have), and Ian's doc
  cross-references Todd's by name. *Suggested:* keep it as Ian's non-negotiable scoped to the
  titlebar, and leave Todd NTH-3 holding only responsive long name and search-on-either-name.
- **BCV chapter hover** — nice-to-have in both. *Suggested:* Todd's, since his wording carries the
  fact that a PR exists. It is the cheapest item in the whole pair — consider promoting it.

**Q6 — Three requirements are largely already shipped.** TODD-NN-3.1 (third-column sync, done
for 3 of 4 tabs), IAN-NN-1.3 (comment filters, 5 dropdowns shipped) and TODD-NTH-1.3 (text order,
done). *Suggested answer:* re-scope each to its actual remainder — Text Collection's missing verse
scroll, date/author filter UI, and a verse-mode drag grip. That recovers budget without cutting
anything Saroj asked for.

**Q7 — Where should the Dictionary extension live?** `platform-bible-extensions`'s remote 404s,
its `origin/main` is a bare "Initial commit", and the Dictionary extension exists only as a local
branch plus four uncommitted files with no PR. That is unbacked work-in-progress. Please have
someone establish and back up its home before TODD-NTH-5 is planned.

**Q8 — Are the PT9 comment-filter omissions deliberate?** The PRD excludes plain-text search and
a sort control, and PT10 has no tag/category comment filter at any layer while PT9 does. Confirm
all three are intended omissions.

## 7. Engineering decisions
*(for: epic lead / implementation owner)*

**D1 — Where does the unified multi-select live? Answered: `platform-bible-react`, and no spike
is needed.** This was flagged as risk #1 in the planning artifact and as possibly needing a
research spike. It doesn't. `ProjectSelector` already has a `project-multi` mode with multi-select,
select-all/clear-all and show-selected-only, plus three row-grouping schemes, and Sprint 88's Find
selector already ships on it in both Simple and Power configurations. The remaining work is a
*consolidation*, not a design: promote it out of `experimental`, open up the closed `RowSection`
union, add the missing type discriminator, and migrate the bespoke titlebar onto it. The
Simple-local shim option should be closed out. What actually blocks the work is the **six-plus open
PR queue** on that one file, not an open question — reconcile that first. Recommend recovering the
artifact's 2-day V1 spike budget and spending it on the queue reconciliation instead.

**D2 — Third-column synced scrolling: answered.** Not a missing listener and not a hidden-view
bug — a deliberate, documented exclusion (`main.ts:1119-1122`) that has since been reversed for 3
of Simple's 4 column-3 tabs. Column 3 always followed the group's book/chapter; what it lacked was
the *verse* scroll, which is exactly the "responds to nothing" symptom. Remaining scope is one
panel (Text Collection), one stale comment, and one missing test. PT-2340 stays open legitimately —
it is the checks panel, which is not a Simple column-3 tab.

**D3 — Sequence the shared chokepoints; don't share them.** `assets/localization/en.json` (plus
five locales), `lib/platform-bible-react/dist/` (committed — needs `build:pbr` or changes don't
ship), `lib/papi-dts/papi.d.ts` (generated, and `build:types` is cached — use `build:clean`), and
`src/stories/keyboard-shortcuts.data.ts` are touched by almost every bucket. These are merge
coordination points, not parallel work.

**D4 — Five lanes, three platform-bible-react clusters. See §4a** for the ordered lanes, the
dependency table, the nine first-day items, and the pbr land order. The headline constraints:
one owner per lane holds its files for the whole sprint; L2 and L3 touch no pbr at all; and the
only genuinely contested surfaces are `assets/localization/en.json` (+5 locales) and the
committed pbr `dist`.

**D4a — `en.json` is the second chokepoint.** L1 (menu labels), L4 (picker strings), L5 (comment
and theme strings) and L3 (Dictionary strings) all add keys to the same file plus five locales.
Key additions rarely conflict semantically but do conflict textually. Have each lane append its
keys in a distinct region of the file, or accept trivial conflicts — do not have two lanes
re-sort or reformat it.

**D5 — The engine repo is moving.** All real editor work is in
`eten-tech-foundation/scripture-editors`; `paranext/scripture-editors` is an empty shell with two
unmerged migration PRs, and core PR #2745 is moving it. `packages/scribe` is being deleted, so any
plan pinning engine paths will go stale. Sequence WI-12/13/21 around the move.

**D6 — Retiring dead pickers is an API break.** `platform.selectProject` and
`platform.selectMultipleProjects` are reachable in production only from the `hello-rock3` sample,
but remain public PAPI dialog types. WI-27 is optional cleanup — cut it first, but note that
leaving them keeps two more "parallel pickers" in the codebase the PRD complains about.

**D7 — Two PRs fix the same BCV bug.** #2229 (older, broader, UX-approved, unreviewed) and #2750
(narrower, sprint-tracked, in review) restyle the same component, and #2750 also introduces the
z-index scale WI-6 depends on. Decide which lands first; they cannot both merge as-is.

**D8 — Grouping is the only available mitigation for the pbr `dist` conflicts.** The merge
protocol is fixed and cannot be changed this sprint, and the team has ruled out both a single pbr
owner and a single pbr issue. That leaves consolidation: fold same-directory items together
(WI-3+WI-5, WI-19+WI-20), move the stray `toggle.tsx` change into the lane that already owns
shadcn tokens, and serialize the merge queue across three owned clusters. Residual risk to accept
explicitly: **the picker cluster (B) is both the longest-running branch and the last to land**, so
it will carry the most `dist` rebases. If that becomes the thing that sinks the sprint, the
recovery is to land WI-22 early on its own — it is the enabling change and is useful even if
WI-23/24 slip.

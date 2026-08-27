# Handoff: Matt's core round-4 and SE round-5 review feedback

> **Frozen record** — point-in-time handoff written 2026-08-27 for the session picking this work
> up. Follow the current files and the live PR threads, not this document, for anything that may
> have moved since.

Two review rounds were in flight when this session wrapped up. Everything **before** these two
rounds is fully settled (implemented, pushed, replied on both PRs) — do not revisit it.

- **Core round 4**: 14 top-level comments (40 numbered items) on paranext-core PR **#2565**,
  comment IDs `3874480038`–`3874480247`. Status: **all implementation done and pushed**; the
  **replies are drafted below but NOT posted**.
- **SE round 5**: 38 findings (numbered 1–23, 26–38, 41–42) in one review on scripture-editors PR
  **#545**, comment IDs `3875850397`–`3875850633`. Status: **nothing implemented yet** — full
  triage and a three-pass plan are below.

Two sessions worked the core round in parallel without knowing about each other; both lines are
now merged and pushed on `origin/standard-view` (see "State of the world"). SE round 5 is
untouched.

## State of the world (as of 2026-08-27, this handoff's commit)

- **paranext-core `standard-view`** head: `3a72d5f0b56`, pushed. Contains, newest first:
  - `3a72d5f0b56` — round-4 item 30: shared `runMarkerPaletteSession` orchestration
    (`lib/platform-bible-react/src/components/advanced/marker-palette-session.util.ts`), both
    consumers converted, react dist rebuilt. Verified: typecheck, react unit+scripts (67 files),
    extension suite (73 files), lint.
  - `e9414e537fc` — round-4 item 35: forward-facing rewrite of the nine flagged narration
    comments + a branch-touched-files smell sweep.
  - `0e24e9f0343`, `346dc79cd27` — round-4 items 40 and 32 (e2e prose/timeout budget; the
    `useGuardedProjectSetting` extraction).
  - `94c02223cc2`, `5bf5dc84a96`, `9b704f4b923`, `03ae98d10c1` — the **other session's** four
    commits (BCC e2e text match; popover-palette item pre-resolution — this closes round-4
    item 14; palette filter-clear store fix; per-invocation debounce promises — this deepens the
    same `lib/platform-bible-utils` debounce area round-4 item 27 touched in `64942ac3dd8`).
    That session should reconcile its own reply intentions for these with the drafts below.
  - `409caddf3e7` … `7e082ec77a1` — this session's round-4 passes A and B (per-item detail
    below).
- **scripture-editors `standard-view`** head: `62e2c416`, pushed, clean. **No SE round-5 work has
  landed** (a started pass was interrupted before any durable change).
- `dev-packages.json` in the core workspace carries a deliberate, uncommitted working-only
  modification (`revision: standard-view`). Never commit or revert it.
- No review threads have been resolved on either PR — replies only, and rounds 4/5 have **no
  replies posted yet**.

## Core round 4 — what was done, item by item

Matt's verbatim comments are on PR #2565 (IDs above). Item → fix map:

| Items | Commit | Summary |
|---|---|---|
| 8–10 | `7e082ec77a1` | `+` is a nesting decoration for MATCHING: stripped from filter AND label at every matching site in both modes; commits use the item's own `marker` (case-insensitive normalized lookup); `commitTyped` alone stays literal. Web view's note exception extracted as testable `shouldSpaceCommitNoteMarker`. Both falsified docs fixed. |
| 11 | `7e082ec77a1` | Chord-dismissal branch claims ONLY `Enter` (cmdk 1.1.1 acts on any un-prevented Enter; claiming other chords would break e.g. the pinned Ctrl+C copy). |
| 34 | `7e082ec77a1` | `getMarkerPaletteClaimedKeys` doc: per-kind parameter is deliberate room to diverge. |
| 27 | `64942ac3dd8` | `flush()` detaches the debounce promise (mirroring `cancel`), `runInvocation` clears ownership-aware. NOTE: the other session's `03ae98d10c1` further reworked this util (per-invocation promises) — reconcile the r-27 reply with that commit's story. |
| 37, 38 (H1/H2) | `64942ac3dd8` | `PaletteDriver` doc says structural satisfaction; `@experimental` tags added — the palette types live in `platform-bible-utils`' `palette.types.ts` (not react `experimental.ts` as the item guessed; the reply notes the correction). |
| 12, 13 | `bb264a74cfa` | Debounce bypassed when the webview already has a palette (replace is legitimate); replace sweep re-runs after the localization await; `getActiveCommandPalette` uses topmost. One caveat in tests: out-of-FIFO await resolution could still store the older palette last — one-palette invariant + topmost-driving still hold. |
| 15, 16 | `bb264a74cfa` | Escape/mousedown finds the topmost overlay unfiltered: modal on top → do nothing; the same one-surface rule now covers creation-grace overlays. `getAppWindowInputKind` rejects auto-repeat and modified Escape; payload stays kind-only. |
| 33 | `bb264a74cfa` | Dead `selectedIndex`/`selectedIndexDelta` precedence branch removed (all callers verified to hold never-both); the both-fields store pin deleted with it. |
| 39 (H3) | `bb264a74cfa` | Catalog: marker-menu entries' context covers the footnote popover; `dismiss-overlays` gains the component location. |
| 18–20, 22 | `90b5f977632` | Focused palette's own filter path resets `selectedIndex: 0`; every filter leg gated on effective `searchFields`; extra-fields leg strips `+` like the label leg; `spaceSelectsHighlightedItem={!keyForwarding}`. |
| 1, 3, 4 | `e8e453804f2` | THE CONTRACT CALL (owner informed, not yet explicitly ratified — see open questions): pending keystroke saves are FLUSHED before an external delivery replaces the editor, unifying focused/unfocused on "recent typing wins". `isPending()` gains its production caller; the incoming delivery is re-recorded as last-sent so the flushed write's echo routes to a replace. Deliberately NOT awaited (flush runs the invocation synchronously; documented at the site). Window-blur flush skips during an active palette session. |
| 5, 6, 7 | `e8e453804f2` | `lastAppliedDocumentSelector` recorded on the equal-to-last-sent exit; chapter key is `book|chapterNum|versification` and the flush effect deps carry `versificationStr`; `pdpDeliveryCount`'s identity-blindness documented as an accepted limitation (per the reviewer's severity read). |
| 23, 24, 26 | `286f350a20a` | Pane caller-click routing is Standard-view-only via pure `canRouteNoteCallerClickToPane`; repeat selection re-reveals (keyed on request identity); error log truncated to 200 chars. A sibling full-USJ log in `FootnotesLayout` (~:86) was left (not in the findings) — flagged as follow-up. |
| 28, 29 | `409caddf3e7` | `TextType` maps via explicit switch, out-of-range → omitted (pinned with an out-of-range cast); StyleInfo subscription disabled while `currentBookNum <= 0`. |
| 32 | `346dc79cd27` | `useGuardedProjectSetting` replaces the six copy-paste reader blocks; PT9 citations stay at call sites. |
| 36, 40 | `0e24e9f0343` | Settle-delay description reworded (en+es); stale `navigation-history` subset prose removed (config, runner, e2e CLAUDE.md, isolated README); first-run suite gets `test.describe.configure({ timeout: 240_000 })` so the probe-budget sub-waits are reachable. |
| 35 | `e9414e537fc` | The nine confirmed narration sites rewritten forward-facing + a smell sweep over branch-touched files. |
| 30 | `3a72d5f0b56` | The ~150-line palette session orchestration extracted to `runMarkerPaletteSession`; both consumers converted; full suites green. |
| 14 | `5bf5dc84a96` (other session) | Popover palette items pre-resolved. |
| 2, 17 | — | Marked "already tracked — no reply needed" by the reviewer. |

**Deferred (deliberately, with reply text below):**

- **Item 21** — cmdk cross-field subsequence scoring for generic palettes: per-field containment
  exists so host filtering (which drives commits) can never disagree with the rendered list;
  restoring cmdk's scorer is an algorithm decision (reimplement host-side or abandon agreement).
- **Item 25** — pane/editor note-index unification: needs a single indexing source of truth
  across the debounce window.
- **Item 31** — stylesheet-driven popover toolbar marker menu: needs StyleInfo threaded into
  `FootnoteEditor`'s surface (small API decision).

## Core round 4 — reply drafts (READY TO POST, none posted)

Post each as a thread reply:
`gh api repos/paranext/paranext-core/pulls/2565/comments/<ID>/replies -F body=@<file>`.
Review the r-27 and r-12-14 drafts against the other session's commits before posting (noted
inline). Do not resolve threads.

### Reply for core comment 3874480038 (items 1-4)

Item 1 is fixed on the contract you framed (e8e453804f2), with the owner's endorsement of the unification: recent typing wins regardless of the focus micro-state at delivery. The hook's replace path now flushes the pending debounced save before applying an external delivery — `isPending()` gains its first production caller (your item 4) — and the flush runs the invocation synchronously, so the write is in flight (guard held) before the replace; the incoming delivery is then re-recorded as last-sent so the flushed write's echo routes to a replace instead of pushing the stale delivery back over the keystrokes. Deliberately NOT awaited: the debounce contract makes `flush()` synchronous through the invocation, so an await would only defer the replace by a microtask and open an interleaving window — documented at the site. Pinned: pending + unfocused delivery → snapshot written before the replace; no pending → unchanged; the focused-deferral case untouched. Item 3 also landed: the window-blur flush skips while a marker-palette session is open (the palette steals focus by design and nothing typed during a session lands in the document), so a palette interaction no longer fires a mid-edit write into the chapter-switch collision you traced.

### Reply for core comment 3874480078 (items 5-7)

Items 5 and 6 landed (e8e453804f2): the equal-to-last-sent exit now records `lastAppliedDocumentSelector` too, so the deferral stays keyed to the document after an echo-equal delivery (pinned: an equal delivery followed by a differing one still defers); and the chapter key is `book|chapterNum|versification` with the flush effect's deps carrying `versificationStr`, so a versification change flushes like a chapter switch and `performDebouncedPdpSave`'s never-the-wrong-chapter promise is true again (pinned both at the key and the treats-it-as-a-chapter-change level). Item 7: accepted as-is with the limitation now stated at the counter — identity-stable deliveries (the shared error constant) are invisible to it, and the consequence is a mostly-harmless re-push during an error burst; no plumbing built, per your severity read.

### Reply for core comment 3874480091 (items 8-10)

Implemented exactly the rule you spelled (7e082ec77a1): `+` is a nesting decoration for MATCHING — stripped from both the filter and the label at every matching site in both modes — while commits stay byte-faithful: both commit sites look up by the normalized key case-insensitively and commit the item's own `marker` (a nested closer's `+` is part of its bytes and stays), and `commitTyped` alone passes the literal. The web view's note exception is extracted as a testable `shouldSpaceCommitNoteMarker` with the case-fold + strip. Ranking deliberately stays on the raw label, which orders plain markers ahead of `+`-closers. Both falsified docs are corrected. Pinned: `+nd` + Space commits the `nd` wrap; `\F` + Space takes the note exception; `+w` matches the `+wj*` close-tag label in both modes; `commitTyped` still receives `+nd` verbatim.

### Reply for core comment 3874480107 (item 11)

Closed (7e082ec77a1) with a scalpel rather than the whole-branch claim: the chord-dismissal branch claims ONLY when the base key is `Enter`. Verified against cmdk 1.1.1: any un-prevented Enter runs its commit regardless of modifiers; Space is inert on forwarded palettes (the opt-in is off for them, now explicitly), and arrows only move the highlight of a palette that is closing anyway — while claiming them would break their normal chord jobs, including the pinned Ctrl+C copy. New pin: chord+Enter → ended, claimed, zero commits; the Ctrl+C unclaimed pin stays green.

### Reply for core comment 3874480126 (items 12-14)

Both landed (bb264a74cfa). The debounce is bypassed when the webview already has an open palette — a rapid second request there is a REPLACE, the legitimate flow your `\`,`\` and commit-and-reopen repros exercise — so the reject-with-cleared-session state is unreachable from those paths, while accidental double-opens with no palette up still debounce (that test now pins exactly that case). The replace sweep also re-runs after the localization await, so a palette that landed mid-await is rejected like any pre-existing one, and `getActiveCommandPalette` resolves via `getTopmostOverlay` rather than creation-order `.find`. Item 14 is also closed now (5bf5dc84a96): the popover palette's items resolve their text before showing, so that path no longer takes the await. One caveat recorded in the tests: if two overlapped awaits resolved out of FIFO order the older request would land last in the store — the one-palette invariant and topmost-driving still hold, so we stayed with this shape rather than adding an ordinal guard.

### Reply for core comment 3874480145 (items 15-17)

Both landed (bb264a74cfa). Dismissal now finds the topmost overlay WITHOUT filtering: a modal on top means the press is the modal shell's to answer and the service does nothing — one surface per press, as the contract says. The same rule now covers an overlay inside its creation grace (the search previously skipped it and dismissed the next one down — the same bug shape). Pinned: modal over popover + Escape → both survive. And `getAppWindowInputKind` rejects auto-repeat and modified Escape (mousedown untouched); the payload stays kind-only, and the comment says the boundary is unchanged. Three new unit tests on the predicate.

### Reply for core comment 3874480166 (items 18-22)

Items 18-20 and 22 landed (90b5f977632 + 7e082ec77a1): the focused palette's own filter path now writes `selectedIndex: 0` like the forwarded path (pinned via a store-write spy — cmdk's auto-highlight masks outcome-only assertions in jsdom, and the committed tests fail without the fix); every filter leg is gated on the effective `searchFields` (a request declaring `['description']` gets no label matches — pinned); the extra-fields leg strips the filter's `+` under the same rule as the label leg; and `spaceSelectsHighlightedItem={!keyForwarding}` keeps both palette kinds right.

Item 21 we're deferring deliberately: the per-field containment exists so the host's filtering — which drives commits — can never disagree with the rendered list. Restoring cmdk's cross-field subsequence scoring means either reimplementing its scorer host-side or giving up that agreement, which is an algorithm decision rather than a bug fix. Real regression for generic palettes' fuzzy queries; on the follow-up list with that framing.

### Reply for core comment 3874480175 (items 23-26)

Items 23, 24 and 26 landed (286f350a20a). Caller clicks route to the pane only in Standard view — a new pure `canRouteNoteCallerClickToPane(paneRendered, viewType)` composes into the call site, so in formatted/markers view the popover path runs and the footnote editor stays reachable even with the pane toggled on (`decideNoteCallerClickAction` itself stays pure; three new pins). The list's re-reveal keys on the selection-request identity that `FootnotesLayout` already tracks, so a repeat click on the same footnote scrolls again (revert-tested pin). The error log truncates to the same 200-char cap as the divergence logger — and its sibling full-USJ log in `FootnotesLayout` is flagged for the same treatment as a follow-up.

Item 25 we're deferring deliberately: aligning the pane's PDP-derived indexing with the editor-derived click index needs a single indexing source of truth across the debounce window — a design choice rather than a patch. It's on the follow-up list with your withdrawal note (the dead-click half retries on repopulation) recorded.

### Reply for core comment 3874480192 (item 27)

Fixed (64942ac3dd8), with the companion your scoping pointed at: `flush()` now detaches the stored promise before invoking (mirroring `cancel`), and `runInvocation` captures its settlers at entry and clears ownership-aware, so a flushed invocation can neither hand its result to a newer caller nor swallow that caller's own rejection. Revert-tested — the new test (second caller observes its own rejection; the flushed caller its own result) fails on the old code. All pre-existing debounce semantics stay green. *(HANDOFF NOTE, remove before posting: reconcile with `03ae98d10c1`'s per-invocation-promise rework from the parallel session and mention it here.)*

### Reply for core comment 3874480201 (items 28-29)

Both landed (409caddf3e7). `TextType` maps through an explicit switch over the defined `ScrTextType` members (same wire strings), with anything out of range serializing as omitted like the file's sibling maps — pinned with an out-of-range cast that fails on the old `Substring` with the exact exception you predicted, plus an exhaustiveness tripwire over the defined members. And the StyleInfo subscription disables itself while `currentBookNum <= 0` (the hook's standard disable idiom, matching the versification fetch's guard), so an unrecognized book id no longer produces a PlatformError per delivery.

### Reply for core comment 3874480215 (items 30-32)

Item 32 landed (346dc79cd27): one `useGuardedProjectSetting` hook replaces the six blocks with identical semantics (same warn shapes, same empty-string guard), the PT9 citations staying at the call sites, with its own tests. Item 30 — the ~150-line session-orchestration extraction — landed as `3a72d5f0b56`: one `runMarkerPaletteSession` helper beside the keydown table owns the shared spine (token allocation, request shape, restore-selection-then-focus-then-apply commit ordering, failure handling), parameterized over the genuine differences; both consumers call it, so the drift class is closed by construction. Item 31 we're deferring deliberately: making the popover's toolbar marker menu stylesheet-driven means threading the project StyleInfo into `FootnoteEditor`'s surface — a small API decision that deserves its own change rather than riding this round; on the follow-up list with your custom.sty inconsistency named.

### Reply for core comment 3874480230 (items 33-34)

Both landed (bb264a74cfa + 90b5f977632). Verified every `updateCommandPaletteState` caller holds the never-both invariant (the host by construction, the component one field per caller — still true after the highlight-reset fix), then replaced the precedence branch with the plain `??` and a comment stating the invariant; the store test that pinned absolute-wins for the caller-unreachable input went with it. And `getMarkerPaletteClaimedKeys` now says in one sentence that the per-kind parameter is deliberate room for the kinds to diverge — the key set is identical today on purpose.

### Reply for core comment 3874480239 (items 35-39)

All landed. The nine narration sites you confirmed are rewritten forward-facing (e9414e537fc), plus a smell-grep over the branch-touched files for the same pattern; the history now lives only in commit messages. The settings description no longer invites "leave empty" for a non-nullable number (both locales). `PaletteDriver`'s doc says structural satisfaction rather than naming an implementer, and the palette types carry `@experimental` — one location correction to your item 38: those types live in `platform-bible-utils`' experimental surface (`palette.types.ts`), not the react `experimental.ts`, which has no palette types; the tags went where the types are. The catalog's five marker-menu entries now scope their context to both the main text and the footnote editor popover, and `dismiss-overlays` gains the component location alongside the narrowed-gesture wording.

### Reply for core comment 3874480247 (item 40)

Both halves landed (0e24e9f0343). The stale `navigation-history` isolated-subset prose is gone from the config, the runner, and (grep-found, same claim) the e2e CLAUDE.md and the isolated README — the one factually-correct mention of the moved top-level directory is kept and reworded so it can't be misread as a subset. And the first-run suite now carries `test.describe.configure({ timeout: 240_000 })` with a comment tying the budget to the documented cold-start probe worst case, so the sub-timeouts are reachable limits rather than paper ones; the sub-waits themselves stay sized to the probe budget.

## SE round 5 — triage and plan (NOTHING implemented yet)

The 38 findings (numbered 1–23, 26–38, 41–42) are on SE PR #545, comment IDs
`3875850397`–`3875850633`, posted 2026-08-27. Read them verbatim from the PR — they are precise,
cluster-labeled, and cite exact mechanisms; trust them but verify each site before changing it.

**Planned three sequential passes** (all in the SE workspace, full
`nx run-many -t typecheck lint test` + `pnpm nx format:check` green before each commit):

**Pass 1 — adaptors + collab: findings 1, 8, 9, 10, 18, 19, 20, 27, 32, 33, 36.** Guidance
worked out during triage:
- F1 (fast path emits presentation bytes): make the single-dirty-leaf fast path apply the SAME
  exclusions as `$handleTextNodes` — prefer bail-to-full-diff over reimplementing exclusions, one
  authority.
- F8+F9: both separator-splice sites reuse `markerSeparators.utils.ts:76`'s predicate (plain
  TextNode, not attribute-typed) — covers the VerseNode/ImmutableUnmatchedNode subclass gap and
  the attribute-run gap.
- F10: apply-side note strip becomes positional (first text child), mirroring the reverse
  adaptor's `content[0]` fix.
- F18: apply-side NBSP prepend only at position 0 of a span.
- F19: strip condition mirrors the forward adaptor's ADD condition — `markerMode === "editable"`,
  not `isStandardView`.
- F20: thread `noteCaller`/`isCharChild` through the `TypedMarkNode` recursion re-entry.
- F27: add the `textType === "attribute"` skip to `$stripSelectionToQuotation`
  (`charFormatting.utils.ts:173` shows the check).
- F32: `$createPara` uses the `showParaMarkerPrefix` predicate, not raw markerMode.
- F33: extend the SHARED delta-doc exclusion with the three named omissions
  (`NODE_ATTRIBUTE_PREFIX` byte check, `EMPTY_CHAR_PLACEHOLDER_TEXT`, note-caller positional);
  do NOT create a third list; `$isCursorPlaceholderOnlyText` and the `$isDisplayRunPiece`
  asymmetry are already right.
- F36: make `$getOTPositionOfNode`'s traversal early-terminating; keep positions byte-identical
  (the differential/settle suites are the net).

**Pass 2 — marker-edit engine: findings 2, 3, 4, 5, 7, 13, 14, 15, 16, 17, 21, 23, 26, 28, 29,
30, 31.** Notes: F2 = presence-gate like the sibling `addNoteCategoryRun`; F3 = husk wrapper
must not count as surviving pieces for destruction reporting; F7 = mirror the
`ImmutableUnmatchedNode.updateFromJSON` direct-assignment fix this branch already made; F23 =
add `$isMilestoneNode` to the re-drive guard list; F15 = chapter arm gets the verse arm's
`SEPARATOR_RUN_ONLY_REGEX` guard; F16 = the whitespace-only test applies regardless of whether
the number changed; F30+F31 = anchor→focus per the branch's own CLAUDE.md rule; F29 = guard
`lastCommitAnchorKey` like its sibling (null selection is "don't know", not a departure); F13 =
null-safe `ref` handling in Editor.tsx; F5 = the CRITICAL Enter claim must distinguish real
Enter from programmatic re-dispatch (one fix covers the three victims; note scope is
not-Platform.Bible config but fix anyway); F14 = the chapter-flavor swap splits created/destroyed
across per-class mutation listeners — needs a cross-flavor view of the batch; F21 = extend the
close-and-reopen path to multi-node selections (the invariants doc records this as known;
`charFormatting.utils.ts:132` does the general shape). **Repro-first (Matt flagged
mechanism-verified but unreproduced — fix only if reproduced, else document):** F17 (note-opener
rename caret slot), F26 (parent-scoped vs node-scoped offset in `$coveredTextNodes`), F28
(`TypedMarkNode` between nested char spans — use `$getLogicalParent`).

**Pass 3 — palette/validation/perf/docs: findings 6, 11, 12, 22, 34, 35, 41, 42.** Notes: F6 =
`createMarkerLookup(styleInfo ?? defaultStyleInfo)` like its siblings; F11+F12 = thread
`extraValidMarkers` through the action/apply validity checks (`isValidMarker` call sites) + fix
the stale TSDoc at usj-marker-action.utils.ts:196; F22 = defensive `closed="false"` default for
note-content families on load (USFM 3.1 export path omits it — ParatextData
`UsxUsfmParserSink.cs:241` + `ProjectSettings.cs:2380` are the receipts); F34 =
AltGr (`getModifierState("AltGraph")`) carve-out in NodeSelectionMenu's chord check (same fix
shape as core's palette AltGr handling); F35 = gate/scope the whole-document validation walk to
dirty paragraphs; F41 = fix the `$validateDocument` TSDoc (`editor.getEditorState().read`);
F42 = CLAUDE.md React version line (packages pin React 18).

**Then:** full verify, push SE, rebuild+relink the editor into the core workspace
(`npm run link-dev-packages` in core — it refuses while the SE tree is dirty; that refusal is its
safety guard), re-run the core suites that mount the editor, and post one reply per SE review
comment plus the round-4 replies above.

## Open questions needing TJ's ruling (also flagged to TJ directly)

1. **SE finding 37** — note-caller slot canonicalization (deliberate, pinned) vs the verse arm's
   "no silent no-ops" guard: both cite the same "whitespace is structural" rationale and reach
   opposite conclusions. Lean offered to TJ: the caller slot is a bounded structured control, so
   canonicalization there is defensible while free-text arms follow no-silent-no-ops — but the
   line is TJ's to draw. Whichever wins, the chapter arm (F15) should get the guard now; it has
   neither guard nor test.
2. **SE finding 38** — the nested `\ca`/`\cp` de-compounding rule ties at (0,3,0) with
   `generateUsjCss` output, and the tie deliberately favors project styles — so any project
   stylesheet defeats the divisor (nested runs at ~200% body). Recommendation offered: the
   divisor is rendering-correctness, so out-specify the generated sheet (the doubled-class bump
   used for the `\ca` anti-bold); alternative is removing the rule.
3. **Core item 1's contract call** (already implemented in `e8e453804f2`, flagged to TJ, not yet
   explicitly ratified): pending typed keystrokes are flushed before an external replace applies,
   so "recent typing wins" regardless of focus micro-state. If TJ prefers the server to win when
   unfocused, revert the flush-before-replace portion of that commit.
4. Previously-deferred core items 21 / 25 / 31 (reply drafts above frame each as a follow-up) —
   TJ may want tickets filed.

## Operational notes for the picking-up session

- **SE environment**: prefix every pnpm/nx/npx invocation with `env -u _VOLTA_TOOL_RECURSION`;
  judge by exit codes; new spec files may be gitignored (`git add -f`); a lint-staged `FAILED`
  line during commit is benign — check `git log`.
- **Core**: never touch `dev-packages.json`; rebuild committed dists when lib src changes
  (`npm run build:basic` in the lib) and `npm run build:types` when service models change; the
  react storybook *browser* test project is unrunnable on this box (WSL2) — use
  `--project unit --project scripts`.
- **Conventions**: comments must stand on their own (no reviewer names/finding numbers/PR refs;
  forward-facing only); commit trailer `Co-authored-by: Claude Fable 5 <noreply@anthropic.com>`
  plus a `Session-URL:` line; never resolve review threads; replies via
  `gh api repos/<owner>/<repo>/pulls/<pr>/comments/<id>/replies -F body=@file`.
- **Jira**: the PT project stamps its template over descriptions at creation — always set the
  description via a follow-up edit (this bit us on PT-4473).
- `.context/standards/Standard-View-Invariants.md` (core) and
  `docs/standard-view-invariants.md` (SE) are required reading before touching the marker
  palette table, the adaptors, or the settle mirror.

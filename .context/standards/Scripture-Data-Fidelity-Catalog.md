# Scripture Data-Fidelity Catalog

The authoritative record of every known place Scripture text can change between the project file
on disk and the editor and back — each with a **fix** or **accept** verdict. Produced by the
PT-4197 (WI-10) end-to-end data-fidelity audit; a copy of the current state is posted to that
issue, but **this file is the authoritative copy**.

## How to use it

- **One row per finding.** A finding is a specific transformation (loss, gain, or rewrite) of
  Scripture data on a specific leg of the pipeline, or an automatic edit applied without the user
  asking.
- **Verdicts:** `accept` means the transformation is deliberate or harmless, and the rationale
  column says why — an accepted row is a decision, re-litigate it only with new evidence.
  `fix` means it is a bug; the row names the ticket or PR that owns it. `needs-ruling` means the
  behavior is pinned by tests but the product call has not been made.
- **Keep it current:** fixing a `fix` row updates its status (do not delete the row — the history
  of what used to be lossy is part of the audit's value). A new conversion-layer change that
  transforms data MUST add a row.
- **Where things are pinned:** each row names the test that holds the behavior. The conversion
  pipeline and its suites are described in PT-4197.

## The pipeline

```
disk USFM
  → C# UsfmToUsx (ParatextData, forExport:true, chapter-scoped)        [L3]
  → USX string
  → TS usxStringToUsj (extension host, @xmldom/xmldom)                 [L2]
  → USJ
  → editor load / Lexical tree / editor save (getUsj)                  [L1]
  → TS usjToUsxString (+ version handling)                             [L2]
  → C# UsxFragmenter.FindFragments → ScrText.PutText                   [L3]
  → disk USFM
```

Layers: **L3** = USFM↔USX (C#/ParatextData), **L2** = USX↔USJ (TS, scripture-editors
`packages/utilities`), **L1** = USJ↔editor state (scripture-editors), **L0** = app-level
composition (paranext-core host code, save loop, PDPE plumbing).

## Decided rows

| ID | Layer | Finding | Verdict | Rationale / evidence | Pinned by |
| --- | --- | --- | --- | --- | --- |
| F-1 | L3 | Figure `src` attribute becomes `file` in USX/USJ | **accept** (TJ, 2026-10-20) | `file` is the correct USX/USJ spelling (`src` is the USFM spelling); `ConvertUsfmToUsx` passes `forExport: true` deliberately to get it. Round-trips back to `src` in USFM. | `ConvertUsfmToUsx` decision comment (`c-sharp/Projects/ParatextProjectDataProvider.cs`); corpus oracles |
| F-2 | L3 | `\ref` markers are not emitted as `ref`-type USX | **accept** for USFM ≤ 3.0 (TJ, 2026-10-20); revisit at 3.1+ | `JumpDecorater` deliberately unused: this ParatextData cannot tell a generated `ref` from an authored one (no `gen` attribute) and always strips `ref`-type markers on USX→USFM, which would delete user data. Authored `\ref`s are NOT lost — they survive via the unknown-marker path (unclosed → `para` type; closed → `para` opener + `unmatched` closer) and the corpus sweep confirms a byte-for-byte USFM round trip. | `ConvertUsfmToUsx` decision comment; `UsfmUsxRoundTripCorpusSweepTests`; `Usfm31NestingTripwireTests` checklist item 10 |
| F-3 | L3 | `sid`/`eid`/`vid` incomplete for chapters after chapter 1 (chapter ids lose the book ID; verse/para ids empty) | **accept** (TJ, 2026-10-20) | Chapter-only parse never sees `\id`, so the parser state's verse ref lacks the book. Fix requires a ParatextData change (`UsfmParserState` seeding in `UsfmToUsx.RunConverter`). Nothing of ours reads these ids. Revisit if something starts depending on them. Interacts with F-4. | `ConvertUsfmToUsx` decision comment |
| F-4 | L2 | Empty `sid`/`vid` attributes are dropped crossing USJ↔USX | **accept** (TJ, 2026-10-20) | Deliberately narrow: only these two attributes, only when empty (the shape F-3 produces). Any OTHER attribute arriving empty and being dropped turns the round-trip net red instead of being silently absorbed. | `packages/utilities/src/converters/usj/testusfm-usj-usx-round-trip.test.ts` (scripture-editors) and its call-site docs |
| F-5 | L2/L0 | USX `version` stamp: editor pipeline emitted `3.1` for ParatextData's `3.0`; core forced it back with three shims (`correctUsjVersion`, `correctEditorUsjVersion`, `correctUsxStringVersion`) | **fixed** (PT-4197 audit, 2026-10-23) | The version is preserved end to end instead of forced: `usxStringToUsj` keeps the root `<usx version>` (`USJ_VERSION` only when absent/empty), the editor stamps every USJ it produces with the version of the USJ it was handed (`defaultUsj` / latest `setUsj`), and `usjToUsxString` writes the USJ's own version. All three core shims are deleted; PDP data is 3.0 in, 3.0 out with no TypeScript-side constant. `Usj.version` widened to `string` (public type change). The version is NOT derived from a `\usfm` header: usfm.sty makes `\usfm` an ordinary paragraph marker, so ParatextData writes `<para style="usfm">3.0</para>` (never the `<usx>`-level `<usfm>` element `UsxFragmenter` ignores) and it round-trips byte for byte, independent of the stamp. The stamp is inert on PT10's own write path (`UsxFragmenter` never reads it) but PT9's plugin API rejects a mismatch. | `usx-to-usj.test.ts` / `usj-to-usx.test.ts` "version" blocks; `usjVersion.test.tsx` (platform-editor); `platform-scripture-extender-pdpe.test.ts`; `UsfmVersionMarkerRoundTripCaptureTests`; `Usfm31NestingTripwireTests` checklist item 11 |
| F-8 | L2 | `usxStringToUsj` drops derived metadata: `vid` on every element, `status`, and `eid`-only verse/chapter closers (`usjToUsxString` regenerates closers from `sid`); USJ `type` always overwritten (`version` is kept — see F-5) | **accept (proposed)** — verified by the composed suite and USX-first net: the only tolerances the real PDP captures need are eid-closer regeneration placement and the vid/status drops; empty `sid`/`vid` round-trip with no tolerance. Derived metadata ParatextData regenerates; nothing of ours reads `status` (the nameless-marker fix in SE PR #19 uses `marker`, not `status`). | `usx-to-usj.test.ts`; `corpus-pdp-usx-composed-round-trip.test.tsx`; `testusfm-usx-usj-usx-round-trip.test.ts` |
| F-6 | L0 | Extension-host USX parse (`@xmldom/xmldom`) silently repairs recoverable USX defects; the renderer's native `DOMParser` rejects the same input — so a read-modify-write persists the repaired form, not what was on disk | **fix** — PT-4444 | Noted at the read-modify-write seam in `platform-scripture-extender-pdpe.model.ts`. The two processes must agree on what USX is valid. | TODO(PT-4444) comment at the call site |
| F-7 | L1 | A lone-NBSP content string is dropped on save in non-Standard views (bare-NBSP display spacers indistinguishable from content) | **FIXED** — PT-4391, scripture-editors `54cf5956` + review fixes `7825ed12` (a merged empty span's placeholder is never saved; remove-style, footnote-char transforms and close-and-reopen keep an authored `~`) | A lone NBSP is now dropped only where the engine itself puts one (after a glyph, a span's or note's first child, a collapsed note's separators, attribute runs); everywhere else it is content in every view. Where an author's `\nd ~\nd*` is byte-identical to the empty-span placeholder (hidden/visible marker modes), the forward adaptor marks the author's NBSP (`authoredNbspState`). Remaining: an NBSP that EDITING (not loading) strands first in a span is still dropped; the collab ops stream still drops NBSP+`\|` and lone-NBSP content (kept for older peers). | `lone-nbsp-content.test.tsx` (10 shapes × 6 views); `lone-nbsp-gestures.test.tsx` (128 gesture rows, 8 views); composed + corpus suites (pins removed) |

## Corpus-sweep rows (C# PDP path, 2026-10-20)

From `UsfmUsxRoundTripCorpusSweepTests` (every corpus chapter through
`GetChapterUsx → SetChapterUsx → GetChapterUsfm`, five comparisons per chapter, shrink-only
expected-diff list). Headline: all 7 chapters round-trip byte-for-byte except S-1; the second trip
is a fixed point everywhere (no save-loop churn); neighboring chapters are untouched.

| ID | Layer | Finding | Verdict | Rationale / evidence |
| --- | --- | --- | --- | --- |
| S-1 | L3 | The line break between `\c N` and a following ` \ca …` line is removed on the first save (the space stays) | **accept** | USX keeps no whitespace between `<chapter/>` and the folded/char `\ca`; `UsfmToken.NormalizeTokenUsfm` starts new lines only before book/chapter/para/verse markers. Layout whitespace only; Paratext 9 saves this layout too; stable after the first save. Listed (3 entries) in `UsfmUsxRoundTripCorpusSweep.expected-diffs.json`. |
| S-2 | L3 | Hand-authored whitespace (double spaces, tabs, trailing spaces — header lines like `\id`/`\h` included) is normalized on the FIRST editor save of a chapter, not on load: `PutText` stores bytes unchanged; `ConvertUsxToUsfm`'s `NormalizeUsfm`/`RegularizeSpaces` collapses them on the first trip. Chapter-scoped: other chapters keep their whitespace. | **accept** (ParatextData behavior, PT9 parity) | Verified in the sweep (probe) AND in the real app (`no-unasked-edits-save-stability.spec.ts`, which pins the exact expected first-save changes — the pin and this row must move together). Such shapes cannot exist AT REST in a P9-saved project. |
| E-1 | L3 | The FIRST save of any chapter rewrites the WHOLE book file's line endings LF → CRLF — every chapter, including never-opened ones (Jonah: 105 LF → CRLF; Matthew: 1625). The bundled WEB sample is LF-stored (`.gitattributes` forces `eol=lf`), so a user's first edit of a sample book rewrites the entire file; any LF-stored project (git, Linux tools) gets whole-book churn in Send/Receive history. Content unchanged. | **accept** (PT9 parity; no practical impact found) | Found by the e2e spec. ParatextData normalizes every write to CRLF deliberately: `ScrText.StandardizeCrLfsIfNecessary` ("Put them back in if missing. Also terminates with CR/LF"), so PT9 does the same to an LF-stored file. The bundled WEB sample is read-only for users (`<Editable>F</Editable>`; e2e helpers flip it to test saving), and Paratext itself writes CRLF, so only a project last written by another tool can be affected — and then only its line endings, once. The C# sweep normalizes for this; its "neighboring chapters untouched" result holds only for CRLF-stored books. |
| S-3 | L2/L1 | The provider sends 2SA-3's USX with the known Paratext 9.5 `\cp` bug shape (`pubnumber="3 cp"` + a stray top-level `<char style="wj">`) — the corpus's `-corrected.usj` is NOT what the app actually receives | **verified clean** — the composed suite loads the buggy wire shape through the mounted editor in all three editing views with zero divergence; the TS legs' oracle (`-corrected.usj`) differs from the wire shape by design. Captures in `usj-reader-writer-test-data/pdp-usx/` carry the real bytes. |

## Corpus-extension findings (testUSFM-2SA-4/-2SA-5/-1SA-1, 2026-10-20)

**Oracle provenance (meta-finding):** the corpus `.usj` files are NOT independent Paratext 9.5
output — ParatextData 9.5 exposes no USJ API (verified against the 9.5.0.24 DLL metadata and the
PT9 repo). They are this pipeline's own provider-USX + `usxStringToUsj` output with documented hand
edits. The independent oracle is ParatextData's **USX** (`pdp-usx/` captures); the `.usj` files pin
OUR converter's intended behavior. READMEs corrected. "At rest" = a fixed point of ParatextData's
`NormalizeUsfm` (what P9's formatted views run on every save); P9's Unformatted view preserves
whitespace, and NBSP is stored as `~` unless `AllowInvisibleChars`.

| ID | Layer | Finding | Verdict / status |
| --- | --- | --- | --- |
| C-1a | L1 | A char span's LEADING NBSP content is stripped once the span is dirtied (`\nd ~lead\nd*` saves `\nd lead\nd*`) in formatted and paragraph-structure views — `CharNodePlugin`'s `$charTextNodeTransform` mistakes it for the empty-span placeholder (and moves the caret). Standard clean. | **FIXED** — SE #11 (merged 2026-10-21); the composed suite's pin was removed |
| C-1b | L1 | An authored LONE NBSP is dropped at load outside Standard view: the whole content of `\nd ~\nd*` and a `\p ~` paragraph save empty (formatted, paragraph-structure = Simple's editable views). Reaches char content, not just paragraph text. | **FIXED** — PT-4391 (= F-7); see F-7 |
| C-2 | L2 | `usxStringToUsj` drops a nameless marker (`<para style="">` → no `marker`, stray `style: ""`, invalid USJ) | **FIXED** — on main via SE #11 (which carried the converter fix); the USX-first net now asserts `marker: ""` directly, and the 2SA-5 `.usj` needs no hand edit |
| C-3 | L1 | The editor then relabels the marker-less paragraph `\p`; the composed USX survives only by accident (the stray `style: ""` property is written after the marker and overwrites it) — the editor shows and holds `\p` while disk keeps `\ 2` | **FIXED** — on main via SE #11; the composed suite's pins were removed |
| C-4 | L0 | `UsjReaderWriter.toUsfm` (core — the Find & Replace splice base): (a) corrupts nameless-marker shapes — but ONLY when fed the raw `style: ""` USJ that the pre-#19 converter produces; with the intended `marker: ""` shape it writes `\ 2`, `\bd \ text` and a trailing `\` correctly; (b) dropped the space between two `\ca` runs on the chapter line — **FIXED** (core `88ef6bd5ad0`: a space after a chapter's folded runs, as ParatextData's `UsxFragmenter` writes); (c) always breaks the line after `\c` where at-rest text keeps `\c N \ca …` on one line (layout-only, the writer's pinned Unformatted-form convention). | (a) **resolved** — the converter fix is on main via SE #11; (b) **FIXED**; (c) **accept** (writer convention). Pinned: core `usj-reader-writer.test.ts` 2SA-5 `test.fails` + a passing from-`\p`-onward pin. Over the whole corpus, `toUsfm` otherwise reproduces at-rest USFM **byte-for-byte** (quantifies FR-1: on at-rest, corpus-shaped content the replace rewrite risk is the chapter-line cases plus the FR findings; on a never-saved book a replace applies first-save normalization book-wide — S-2 + E-1 writ large). |
| C-5 | L1 | The SE tokenizer folds BOTH of two `\ca` runs into the chapter — `altnumber` becomes the second value; the first value and the `char ca` node are lost | **FIXED** — SE #11 (folds each once, ParatextData order); its two `known` entries were removed |
| C-6 | L1 | The SE shared tokenizer reads `\ 2` / bare `\` as LITERAL TEXT when tokenizing a whole chapter, where ParatextData 9.6 reads a nameless unknown marker at any token start (closing an open `\bd`, starting a paragraph — `\v 3` ends up nested inside the unclosed `\bd`). PR #11 reads a nameless marker only behind `opensNamelessParagraph` and only for a fragment's FIRST `\`; PR #19 changes only the converters and editor. So for whole-chapter tokenizing this divergence OUTLIVES both PRs — deliberate in #11's own tests, but ownerless. | **needs-ruling / needs an owner** if whole-chapter tokenizing of damaged USFM matters (the app's load path goes through the converters, not this tokenizer, so exposure is limited to fragment-tokenizing surfaces). Pinned: 7 `known` entries in `usfmFragmentToUsj.corpus.test.ts`. |

New fixtures (at-rest verified through the capture harness `TestUsfmCorpusOracleCaptureTests.cs`):
`testUSFM-2SA-4.usfm` (cl/cd, s1+r+b pre-verse-1, x/xo/xt, note butted to verse, verse bridge +
`\vp`, verse segments, `\fe`, `-`/custom callers, NBSP shapes, lone-NBSP para, trailing space
before unknown marker, closed+unclosed `\ref`); `testUSFM-2SA-5.usfm` (damaged-at-rest: double
`\ca`, nameless `\ 2`, bare `\`, text after `\b`, chapter-line text); `testUSFM-1SA-1.usfm`
(intro block before `\c 1`). Shapes that CANNOT be at rest (so need inline tests, not corpus
rows): duplicate attribute names; 2+-space runs; literal U+00A0 (only with `AllowInvisibleChars`,
where P9's own editor converts a token-leading NBSP to a space on save); nameless marker or
`\c`/`\ca` on separate lines (Unformatted-view-only layouts). Confirmed: `\c 4 X` and "text
between `\c` and the first `\p`" normalize to the same shape.

## Open findings — need a verdict or are fixed in unmerged PRs

These were found during the standard-view and PT-4370/PT-4608 work. Items marked "fixed in PR"
leave this section when the PR merges; the rest need a ruling recorded above.

| ID | Layer | Finding | Status |
| --- | --- | --- | --- |
| O-1 | L2 | A nameless marker (`\ 2`, ParatextData's `<para style="">`) loses its empty `style` in both USX↔USJ converters; the editor then shows `\p` and the next save writes `\p 2` over the author's bytes | **FIXED** on main (carried by SE #11; = C-2/C-3) |
| O-2 | L1 | Chapter-line edits: deletions across the chapter line, bytes that stop being a chapter marker, text typed ahead of `\c` — all previously unsaved or lost | **fixed in scripture-editors PR #19 + paranext-core PR #2816** |
| O-3 | L1 | Paragraph rebuild of `a\f + \ft n\f*\v 2 b` saves a gained space between the note and the verse | open — pre-existing rebuild/tokenizer path (scripture-editors PR #11 round 9 notes); needs ticket |
| O-4 | L1 | Tokenizer gives an empty note caller `+` where ParatextData writes `caller=""` | open — switch deferred until PT-4189 merged; now unblocked, owed in scripture-editors PR #11 |
| O-5 | L1 | A space typed after a char opener is saved as content (`\w  grace`), which ParatextData drops on the NEXT load | **needs-ruling** — pinned by `typedSeparatorSpace` tests in scripture-editors PR #11 |
| O-6 | L1 | A bare `\` typed as the first byte after a marker: ParatextData writes `\ ` (adds a space); ours keeps `\` | **needs-ruling** (scripture-editors PR #11 round 9 notes) |
| O-7 | L1 | Standard view: `TextSpacingPlugin` inserts a space before a verse that follows a char span when a rebuild creates the verse; the pending side doesn't mirror it (ParatextData also inserts that space on load) | **needs-ruling** — keep and mirror, or stop inserting |
| O-8 | L1 | A `\w` span whose content text lost the opener's NBSP (`\wgrace\|lemma="grace"\w*`) makes `getUsj()` drop the span AND the following text of the paragraph | open — reviewer-found; unknown whether real keystrokes reach the shape; needs ticket |
| O-9 | L1 | `packages/scribe`'s editor→USJ adaptor still has the byte-comparison caller drop the platform adaptor replaced — the two adaptors disagree about a data-loss rule | open — scribe is not shipped in Paratext 10; needs a scope ruling |
| O-10 | L1 | Transient divergences while an edit is pending: a chapter rebuild beside an unclosed `\ca` leaves fresh text pended until the next departure; an optbreak emptied while the caret is elsewhere isn't recorded pending | open — no at-rest loss observed; recorded in scripture-editors PR #11 known-gaps |

## Accepted load-time normalizations (automatic edits on load, by design)

Verified by the composed round-trip and the e2e no-unasked-edits spec:

- ParatextData `RegularizeSpaces` / `NormalizeUsfm` on the save path (and the first-trip
  normalization of never-before-saved authored USFM) — rows S-1, S-2, E-1.
- Standard view's space-run collapse on save (`normalizeSpaceRuns` shared definition) — screen
  keeps what was typed; saved USJ collapses runs the way ParatextData's tokenizer does.
- Chapter-marker layout on save: `\c 2 \ca 3\ca*` stores as `\c 2` with the run on the next line
  (Paratext 9's own shape) — arrives with paranext-core PR #2816 (`ChapterMarkerCorrection`).

## Surface-audit findings (2026-10-20): writers outside the Standard-view save path

From the PT-4197 read-only audit of every Scripture writer. Verdicts here are the audit's
recommendations until ruled on.

**Editor view-mode map (as wired in Paratext 10):** PT10's `ScriptureEditorViewType` is
`'standard' | 'formatted' | 'markers'`. `'standard'` = SE `standard` (Power mode only; Simple
coerces it away). `'formatted'` = SE `formatted` in Power mode but SE `paragraph-structure` in
Simple mode (Simple's on-rails view — editable). `'markers'` = read-only in production (dev
`localStorage` flag to edit). SE `block-verse` appears only in the Text Collection grid's aligned
mode, forced read-only; SE `unformatted` is not wired to any PT10 surface. The Text Collection
grid is read-only for Scripture text (TG-1). The footnote pane/popover saves through the main
editor's path. Standard is the most normalizing view (space-run collapse, NBSP display mapping,
caller space collapse); the other editable views differ mainly by LACK of those normalizations.

| ID | Surface | Risk | Finding | Recommendation |
| --- | --- | --- | --- | --- |
| FR-1 | Find/Replace | High | Every replace rewrites the whole chapter — or whole BOOK for multi-chapter Replace All — from `UsjReaderWriter.toUsfm()` over doubly-converted text (disk → C# `UsfmToUsx` → `usxStringToUsj` → TS `toUsfm`), bypassing C# `NormalizeUsfm`. Magnitude now measured over the corpus (see C-4): `toUsfm` reproduces at-rest USFM byte-for-byte on every fixture except chapter lines carrying `\ca` runs (dropped inter-run space + line break after `\c`); on a never-saved/LF-stored book a replace additionally applies first-save normalization and the CRLF rewrite book-wide (S-2, E-1). | fix: splice the raw `getBookUSFM` string, or verify the round trip equals disk outside matched ranges before writing; the chapter-line writer defects fix under C-4 either way |
| FR-2 | Find/Replace | High | No check that the text at a range is still the matched text; ranges re-resolve against the cache at replace time, so stale offsets replace the wrong text. | fix: pass expected matched text per range; refuse on mismatch |
| FR-3 | Find/Replace | High | Undo restores a pre-commit whole-book snapshot via `setBookUSFM`, overwriting edits (editor saves, other chapters) made during/after the replace. If `commitChanges` is unimplemented the replace proceeds with no snapshot. | fix: revert only touched chapters, only if current text equals post-replace text |
| FR-4 | Find/Replace | Med-High | A focused editor with a local edit in the last 15 s defers the incoming update and re-pushes its own content — the user sees "Replaced N" while the chapter silently reverts; unflushed 700 ms debounced edits are invisible to the replace. | fix or warn: flush/block on an actively edited chapter |
| FR-5 | Find/Replace | Med-High | Search text is the plain concatenation of all text nodes; a match spanning structure (paragraph/verse/note boundaries) splices the markers out. Structure guard runs only when structure-protected (Simple); Power mode unguarded. | fix: reject matches whose span crosses a non-text node |
| FR-6 | Find/Replace | Medium | No compare-and-swap at write; cache invalidation rides PDP events only; out-of-process changes (Send/Receive, PT9) unverified as event sources. | largely covered by FR-2's text check |
| FR-7 | Find/Replace | Med-Low | Replacement text spliced as raw USFM, never parse-validated (partly by design — USFM replacements are supported). | validate result parses, or document |
| FR-8 | Find/Replace | Low-Med | `ignoreDiacritics` NFD mapping edge cases in decomposing scripts (Hangul, Indic nukta, Tibetan): a match end mid-composed-character maps to the character start. Tests cover NFC Latin only. | add tests, then fix |
| FR-9 | Find/Replace | Low | `SetChapterUsfm` passes a different `PutText` flag than `SetChapterUsx` (false vs true; semantics unverified) and lacks the `SafetyCheckException`→`PermissionsException` mapping. | confirm semantics |
| MB-1 | Manage Books | Medium (out of scope — TJ 2026-10-22: fine for our purposes) | Copy (`ReplaceEntireBook` default true) and import replace destination books with NO history snapshot (`commitChanges` is never called in ManageBooks). Copy itself is a raw `GetText`→`PutText` string copy — no conversion, good. Merge mode never overwrites real content (its TS doc wrongly says it does — doc fix). | snapshot before copy/import/delete; fix doc |
| MB-2 | Manage Books | Med-High (out of scope — TJ 2026-10-22: fine for our purposes) | Delete is permanent (`FileManager.Delete`; PT9's recycle-bin path deliberately replaced); recovery only via Send/Receive. | snapshot/history point first |
| VM-1 | View modes | Medium — **FIXED** (see F-7) | = F-7 sharpened: the lone-NBSP drop on save applies to formatted, paragraph-structure AND unformatted — and paragraph-structure is Simple mode's DEFAULT editable view, so Simple users are exposed (a paragraph whose first content is a bare `~` loses it on edit+save). Pinned as intended in `constructed-usj-round-trip.test.ts`. | fix (PT-4391) or accept explicitly for Simple |
| VM-2 | View modes | Low | An authored empty char span `content: []` returns with `content` absent (spelling-only; pinned). | accept |
| VM-3 | View modes | Med-Low | Coverage skew: the testUSFM oracle corpus and the transform fixed-point leg ran Standard-only; `markers` view in no config (read-only in prod). | **CLOSED** — one shared view registry (`editorViews.test-helpers.tsx`) now drives every applicable suite over Standard, formatted and paragraph-structure (popover round trip, position oracles, navigation-then-edit, onUsjChange, undo, note EditorRef suites, paragraph split/delete); pending/settled suites stay Standard-only because the marker engine is off in hidden views; `corpus-testusfm-round-trip` and `corpus-transform-fixed-point` now run every fixture in Standard, formatted and paragraph-structure, and the composed suite runs all three over the real PDP captures |
| VM-4 | View modes (footnote popover) | **High** | Enter inside a footnote in the popover over a formatted or paragraph-structure host (Simple mode's default) splits the popover's scaffolding paragraph AFTER the note and puts the caret there, outside the note: whatever the user types next is dropped when the popover saves (it writes only the note op). The `\fp` break lives in `MarkerEditPlugin`, which is off when markers are hidden, and paranext-core's `FootnoteEditor` intercepts Enter only over an editable host. The note itself stays intact. | **needs-ruling** — block Enter in the popover over hidden hosts (minimal), or give hidden hosts a `\fp` break like Standard's. Pinned: 4 known failures in `note-ops-popover-roundtrip.test.tsx` |
| VM-5 | Editor API | Low (not called by PT10 yet) | `EditorRef.extendCharacterMarker` in Standard: extending `\bd` with `["nd"]` as conflicting markers removes `\nd`, never applies `\bd`, and returns `true` (text left unstyled); coalescing two `\bd` runs saves two adjacent `\bd` spans. | **fix** before PT10 adopts extend (`replaceCharacterMarker` is TODO PT-4394); pinned as 2 known failures in `Editor.test.tsx` |
| W-1 | Other writers | Negligible | `src/main/main.ts` dev-mode-only startup USX write-back for a hard-coded project; conflict-resolution `CommentEditHelper.SaveEdits` writes verse text on reject/merge but is guarded and user-initiated. No other Scripture-text writers found (bracketed grep + judgment sweep). | accept |

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
  behavior is pinned by tests but the product call has not been made. `needs-decision` is the
  same, for a fix whose design is a product choice. `FIXED` rows name the commit or PR; a `FIXED`
  row stays in the table.
- **Keep it current:** fixing a `fix` row updates its status (do not delete the row — the history
  of what used to be lossy is part of the audit's value). A new conversion-layer change that
  transforms data MUST add a row.
- **Where things are pinned:** each row names the test that holds the behavior. The conversion
  pipeline and its suites are described in PT-4197.

## Verdicts not yet ruled on by TJ

These rows carry an `accept` (or an "unchanged, by design") that was written from the Paratext 9
parity investigation or the audit workstreams, not from a ruling by TJ. They are decisions in
effect, but TJ has not signed them off (as of 2026-10-26). Rows with a `(TJ, date)` verdict are
not on this list.

- **S-7** — accepted only once verified to match Paratext 9 exactly (verification in progress).
- Ruled and not on this list: O-3 and F-8 (TJ, 2026-10-23); S-1, S-2, S-3, S-4, E-1, C-4(c), W-1, VM-2, VM-3, EV-2, O-11, S-5, S-6, T-6, T-8, T-9, T-13 and T-15 (TJ, 2026-10-26). The "Accepted load-time normalizations" bullets summarize rows and carry those rows' rulings.

Rows still waiting on a **ruling or decision** (not an accept at all): the T-2 follow-up (should
joining into an empty `\b` keep the second paragraph's marker?) and the Standard-view NBSP
observation under T-4. Parked: O-6 / C-6. Filed:
CB-3 (= EV-1) as PT-4921.

Also decided or found 2026-10-26: the T-4 observation matches Paratext 9 for default projects (a
literally typed U+00A0 saves as a space; `~` is the authored no-break space — pinned). Two new items
below need TJ: **AI-1** and **PJ-1**.

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
| F-5 | L2/L0 | USX `version` stamp: editor pipeline emitted `3.1` for ParatextData's `3.0`; core forced it back with three shims (`correctUsjVersion`, `correctEditorUsjVersion`, `correctUsxStringVersion`) | **FIXED** (PT-4197 audit, 2026-10-23; core `2b703526044`, scripture-editors `ead5c1a3`; = UV-1) | The version is preserved end to end instead of forced: `usxStringToUsj` keeps the root `<usx version>` (`USJ_VERSION` only when absent/empty), the editor stamps every USJ it produces with the version of the USJ it was handed (`defaultUsj` / latest `setUsj`), and `usjToUsxString` writes the USJ's own version. All three core shims are deleted; PDP data is 3.0 in, 3.0 out with no TypeScript-side constant. `Usj.version` widened to `string` (public type change). The version is NOT derived from a `\usfm` header: usfm.sty makes `\usfm` an ordinary paragraph marker, so ParatextData writes `<para style="usfm">3.0</para>` (never the `<usx>`-level `<usfm>` element `UsxFragmenter` ignores) and it round-trips byte for byte, independent of the stamp. The stamp is inert on PT10's own write path (`UsxFragmenter` never reads it) but PT9's plugin API rejects a mismatch. | `usx-to-usj.test.ts` / `usj-to-usx.test.ts` "version" blocks; `usjVersion.test.tsx` (platform-editor); `platform-scripture-extender-pdpe.test.ts`; `UsfmVersionMarkerRoundTripCaptureTests`; `Usfm31NestingTripwireTests` checklist item 11 |
| F-8 | L2 | `usxStringToUsj` drops derived metadata: `vid` on every element, `status`, and `eid`-only verse/chapter closers (`usjToUsxString` regenerates closers from `sid`); USJ `type` always overwritten (`version` is kept — see F-5) | **accept** (TJ, 2026-10-23) — verified by the composed suite and USX-first net: the only tolerances the real PDP captures need are eid-closer regeneration placement and the vid/status drops; empty `sid`/`vid` round-trip with no tolerance. Derived metadata ParatextData regenerates; nothing of ours reads `status` (the nameless-marker fix in SE PR #19 uses `marker`, not `status`). | `usx-to-usj.test.ts`; `corpus-pdp-usx-composed-round-trip.test.tsx`; `testusfm-usx-usj-usx-round-trip.test.ts` |
| F-6 | L0 | Extension-host USX parse (`@xmldom/xmldom`) silently repairs recoverable USX defects; the renderer's native `DOMParser` rejects the same input — so a read-modify-write persists the repaired form, not what was on disk | **fix** — PT-4444 | Noted at the read-modify-write seam in `platform-scripture-extender-pdpe.model.ts`. The two processes must agree on what USX is valid. | TODO(PT-4444) comment at the call site |
| F-7 | L1 | A lone-NBSP content string is dropped on save in non-Standard views (bare-NBSP display spacers indistinguishable from content) | **FIXED** — PT-4391, scripture-editors `54cf5956` + review fixes `7825ed12` (a merged empty span's placeholder is never saved; remove-style, footnote-char transforms and close-and-reopen keep an authored `~`) | A lone NBSP is now dropped only where the engine itself puts one (after a glyph, a span's or note's first child, a collapsed note's separators, attribute runs); everywhere else it is content in every view. Where an author's `\nd ~\nd*` is byte-identical to the empty-span placeholder (hidden/visible marker modes), the forward adaptor marks the author's NBSP (`authoredNbspState`). Remaining: an NBSP that EDITING (not loading) strands first in a span is still dropped; the collab ops stream still drops NBSP+`\|` and lone-NBSP content (kept for older peers). | `lone-nbsp-content.test.tsx` (10 shapes × 6 views); `lone-nbsp-gestures.test.tsx` (128 gesture rows, 8 views); composed + corpus suites (pins removed) |

## Corpus-sweep rows (C# PDP path, 2026-10-20)

From `UsfmUsxRoundTripCorpusSweepTests` (every corpus chapter through
`GetChapterUsx → SetChapterUsx → GetChapterUsfm`, five comparisons per chapter, shrink-only
expected-diff list). Headline: all 7 chapters round-trip byte-for-byte except S-1; the second trip
is a fixed point everywhere (no save-loop churn); neighboring chapters are untouched.

| ID | Layer | Finding | Verdict | Rationale / evidence |
| --- | --- | --- | --- | --- |
| S-1 | L3 | The line break between `\c N` and a following ` \ca …` line was removed on the first save (the space stayed) | **resolved** — since paranext-core #2816 (merged 2026-10-23) `ChapterMarkerCorrection`, the port of PT9's `FixChapterNumbers`, keeps Paratext 9's layout: the `\ca` run on the line after `\c N`. A one-line `\c 5 \ca 5a\ca* …` now gains that line break on its first save (PT9 parity, accepted; one sweep entry). | USX keeps no whitespace between `<chapter/>` and the folded/char `\ca`; `UsfmToken.NormalizeTokenUsfm` starts new lines only before book/chapter/para/verse markers. Layout whitespace only; Paratext 9 saves this layout too; stable after the first save. Listed (3 entries) in `UsfmUsxRoundTripCorpusSweep.expected-diffs.json`. |
| S-2 | L3 | Hand-authored whitespace (double spaces, tabs, trailing spaces — header lines like `\id`/`\h` included) is normalized on the FIRST editor save of a chapter, not on load: `PutText` stores bytes unchanged; `ConvertUsxToUsfm`'s `NormalizeUsfm`/`RegularizeSpaces` collapses them on the first trip. Chapter-scoped: other chapters keep their whitespace. Paratext 9's chapter save also runs `FixChapterNumbers` (our `ChapterMarkerCorrection`) in every view. | **accept** (TJ, 2026-10-26) (ParatextData behavior, PT9 parity | Verified in the sweep (probe) AND in the real app, per view (Standard, formatted, Simple's paragraph-structure): the shared spec body `e2e-tests/fixtures/no-unasked-edits.body.ts` pins the exact expected first-save changes (`expectedAfterFirstSave`) — the pin and this row must move together. "At rest" (see below) means a fixed point of `NormalizeUsfm`. Such shapes are NOT impossible at rest: Paratext 9's Unformatted view preserves whitespace exactly (`ScriptureViews/Unformatted.xml`, `PreserveWhitespace`), so a chapter last edited there is normalized on its first PT10 save, exactly as Paratext 9's formatted views would normalize it. |
| E-1 | L3 | The FIRST save of any chapter rewrites the WHOLE book file's line endings LF → CRLF — every chapter, including never-opened ones (Jonah: 105 LF → CRLF; Matthew: 1625). The bundled WEB sample is LF-stored (`.gitattributes` forces `eol=lf`), so a user's first edit of a sample book rewrites the entire file; any LF-stored project (git, Linux tools) gets whole-book churn in Send/Receive history. Content unchanged. | **accept** (TJ, 2026-10-26) (PT9 parity; no practical impact found) | Found by the e2e spec. ParatextData normalizes every write to CRLF deliberately: `ScrText.StandardizeCrLfsIfNecessary` ("Put them back in if missing. Also terminates with CR/LF"), so PT9 does the same to an LF-stored file. The bundled WEB sample is read-only for users (`<Editable>F</Editable>`; e2e helpers flip it to test saving), and Paratext itself writes CRLF, so only a project last written by another tool can be affected — and then only its line endings, once. The C# sweep normalizes for this; its "neighboring chapters untouched" result holds only for CRLF-stored books. |
| S-3 | L2/L1 | The provider sends 2SA-3's USX with the Paratext 9 `\cp` shape: text before a marker inside a `\cp` lands in `pubnumber` (`pubnumber="3 cp"`) and the rest becomes a stray top-level `<char style="wj">`. This is the same in ParatextData 9.5 and 9.6. It is against the USFM spec, but the Paratext 9 team will not change it. The corpus's `-corrected.usj` is NOT what the app actually receives. | **accept — preserve, never "correct"** (TJ, 2026-10-26) (PT9 parity | Our pipeline preserves the shape byte for byte: the composed suite loads the wire shape through the mounted editor in all three editing views with zero divergence. The TS legs' oracle (`-corrected.usj`) differs from the wire shape by design. Captures in `usj-reader-writer-test-data/pdp-usx/` carry the real bytes. A `\cp` the user TYPES settles to the spec shape (bytes on disk identical to Paratext 9; a reload shows Paratext 9's shape) — kept by decision (TJ, 2026-10-26); misleading code comments corrected. |
| S-4 | L0 | A save whose only change is extra whitespace (or direction marks) is skipped, not written. Paratext 9 does the same (`UsfmEditorTextLoader.IsTextModified`; exact comparison in its Unformatted view). Our editor save skips whitespace-only changes too (`areUsjContentsEqualExceptWhitespace` in `extensions/src/platform-scripture-editor/src/debounced-pdp-save.util.ts`). | **accept** (TJ, 2026-10-26): match Paratext 9. Direction marks now matched too — the editor save ignores U+200E/U+200F only, exactly as PT9 (core `07ef025f8a9`) | Consequence: a whitespace-only edit does not persist on its own; it is written with the next real change to the chapter. Whether our skip also ignores direction marks (as PT9's does) has not been checked (as of 2026-10-26). |
| S-5 | L3 | The first save of a book Unicode-normalizes the WHOLE book (`ScrText.PutText` → `Normalize`), every chapter, including never-opened ones. | **accept** (TJ, 2026-10-26) (PT9 parity) | ParatextData does this on every write; same family as E-1 (whole-book effect of the first save). No dedicated pin yet; recorded from the 2026-10-23 parity review. |
| S-6 | L3 | `RegularizeSpaces` drops a ZWSP that sits before a space, and drops a repeated identical invisible character. | **accept** (TJ, 2026-10-26) (PT9 parity) | ParatextData behavior on the save path (S-2's trip). No dedicated pin yet; recorded from the 2026-10-23 parity review. |
| S-7 | L3 | With `AllowInvisibleChars` on, an NBSP right after a marker is lost at load. | **accept** (TJ, 2026-10-26, on verification) — measured with ParatextData across 24 NBSP positions: PT9 and PT10 lose exactly the same ones (the tokenizer skips whitespace after a marker and counts U+00A0 as whitespace); the one difference favours PT10 (`\nd*⍽b` keeps the NBSP where PT9 makes it a space); only PT9's Unformatted view keeps them | ParatextData behavior; only projects with the setting on are affected. No dedicated pin yet; recorded from the 2026-10-23 parity review. |

## Corpus-extension findings (testUSFM-2SA-4/-2SA-5/-1SA-1, 2026-10-20)

**Oracle provenance (meta-finding):** the corpus `.usj` files are NOT independent Paratext 9.5
output — ParatextData 9.5 exposes no USJ API (verified against the 9.5.0.24 DLL metadata and the
PT9 repo). They are this pipeline's own provider-USX + `usxStringToUsj` output with documented hand
edits. The independent oracle is ParatextData's **USX** (`pdp-usx/` captures); the `.usj` files pin
OUR converter's intended behavior. READMEs corrected. "At rest" = a fixed point of ParatextData's
`NormalizeUsfm` (what P9's formatted views run on every save). It is not guaranteed for every
project: P9's Unformatted view preserves whitespace exactly (`ScriptureViews/Unformatted.xml`,
`PreserveWhitespace`), so a chapter last edited there can hold whitespace that is not at rest, and
is normalized on its first PT10 save (S-2). P9's chapter save runs `FixChapterNumbers` in every
view. NBSP is stored as `~` unless `AllowInvisibleChars`.

| ID | Layer | Finding | Verdict / status |
| --- | --- | --- | --- |
| C-1a | L1 | A char span's LEADING NBSP content is stripped once the span is dirtied (`\nd ~lead\nd*` saves `\nd lead\nd*`) in formatted and paragraph-structure views — `CharNodePlugin`'s `$charTextNodeTransform` mistakes it for the empty-span placeholder (and moves the caret). Standard clean. | **FIXED** — SE #11 (merged 2026-10-21); the composed suite's pin was removed |
| C-1b | L1 | An authored LONE NBSP is dropped at load outside Standard view: the whole content of `\nd ~\nd*` and a `\p ~` paragraph save empty (formatted, paragraph-structure = Simple's editable views). Reaches char content, not just paragraph text. | **FIXED** — PT-4391 (= F-7); see F-7 |
| C-2 | L2 | `usxStringToUsj` drops a nameless marker (`<para style="">` → no `marker`, stray `style: ""`, invalid USJ) | **FIXED** — on main via SE #11 (which carried the converter fix); the USX-first net now asserts `marker: ""` directly, and the 2SA-5 `.usj` needs no hand edit |
| C-3 | L1 | The editor then relabels the marker-less paragraph `\p`; the composed USX survives only by accident (the stray `style: ""` property is written after the marker and overwrites it) — the editor shows and holds `\p` while disk keeps `\ 2` | **FIXED** — on main via SE #11; the composed suite's pins were removed |
| C-4 | L0 | `UsjReaderWriter.toUsfm` (core — the Find & Replace splice base): (a) corrupts nameless-marker shapes — but ONLY when fed the raw `style: ""` USJ that the pre-#19 converter produces; with the intended `marker: ""` shape it writes `\ 2`, `\bd \ text` and a trailing `\` correctly; (b) dropped the space between two `\ca` runs on the chapter line — **FIXED** (core `88ef6bd5ad0`: a space after a chapter's folded runs, as ParatextData's `UsxFragmenter` writes); (c) always breaks the line after `\c` where at-rest text keeps `\c N \ca …` on one line (layout-only). | (a) **resolved** — the converter fix is on main via SE #11; (b) **FIXED**; (c) **accept** (TJ, 2026-10-26) ( — Paratext 9's chapter save (`FixChapterNumbers`, any view) lays out `\c N` and then `\ca` on the next line, so the writer's layout is the one P9 saves. Pinned: core `usj-reader-writer.test.ts` 2SA-5 `test.fails` + a passing from-`\p`-onward pin. Over the whole corpus, `toUsfm` otherwise reproduces at-rest USFM **byte-for-byte** (quantifies FR-1: on at-rest, corpus-shaped content the replace rewrite risk is the chapter-line cases plus the FR findings; on a never-saved book a replace applies first-save normalization book-wide — S-2 + E-1 writ large). |
| C-5 | L1 | The SE tokenizer folds BOTH of two `\ca` runs into the chapter — `altnumber` becomes the second value; the first value and the `char ca` node are lost | **FIXED** — SE #11 (folds each once, ParatextData order); its two `known` entries were removed |
| C-6 | L1 | The SE shared tokenizer reads `\ 2` / a bare `\` as LITERAL TEXT when tokenizing a whole chapter. ParatextData 9.5 and 9.6 both read a `\` where a marker could begin as a nameless marker (and write it `\ `, a space after every marker name: `UsfmToken.ToUsfm`); 9.6 does so at any token start (closing an open `\bd`, starting a paragraph, so `\v 3` ends up nested inside the unclosed `\bd`). PR #11 reads a nameless marker only behind `opensNamelessParagraph` and only for a fragment's FIRST `\`; PR #19 changes only the converters and editor. This tokenizer runs only inside Standard view's marker engine, settling typed or pasted text; it never runs on load (load goes through the converters). | **parked** (TJ, 2026-10-26) with O-6: the editor already keeps a mid-text `\` as text, which matches 9.6; 9.5 (shipped today) reads it as a marker on reload until the upgrade Revisit on the ParatextData 9.6 upgrade, **PT-4388**; the parked work is scripture-editors branch `pt-4197-nameless-96`. |

New fixtures (at-rest verified through the capture harness `TestUsfmCorpusOracleCaptureTests.cs`):
`testUSFM-2SA-4.usfm` (cl/cd, s1+r+b pre-verse-1, x/xo/xt, note butted to verse, verse bridge +
`\vp`, verse segments, `\fe`, `-`/custom callers, NBSP shapes, lone-NBSP para, trailing space
before unknown marker, closed+unclosed `\ref`); `testUSFM-2SA-5.usfm` (damaged-at-rest: double
`\ca`, nameless `\ 2`, bare `\`, text after `\b`, chapter-line text); `testUSFM-1SA-1.usfm`
(intro block before `\c 1`). Shapes that are NOT at rest after a P9 formatted-view save (so
they need inline tests, not corpus rows; they can occur only in hand-authored text or a chapter last
saved in P9's Unformatted view): duplicate attribute names; 2+-space runs; literal U+00A0 (only with
`AllowInvisibleChars`, where P9's own editor converts a token-leading NBSP to a space on save);
nameless marker or `\c`/`\ca` on separate lines. Confirmed: `\c 4 X` and "text
between `\c` and the first `\p`" normalize to the same shape.

## Open findings — need a verdict or are fixed in unmerged PRs

These were found during the standard-view and PT-4370/PT-4608 work. Items marked "fixed in PR"
leave this section when the PR merges; the rest need a ruling recorded above.

| ID | Layer | Finding | Status |
| --- | --- | --- | --- |
| O-1 | L2 | A nameless marker (`\ 2`, ParatextData's `<para style="">`) loses its empty `style` in both USX↔USJ converters; the editor then shows `\p` and the next save writes `\p 2` over the author's bytes | **FIXED** on main (carried by SE #11; = C-2/C-3) |
| O-2 | L1 | Chapter-line edits: deletions across the chapter line, bytes that stop being a chapter marker, text typed ahead of `\c` — all previously unsaved or lost | **fixed in scripture-editors PR #19 + paranext-core PR #2816** |
| O-3 | L1 | Paragraph rebuild of `a\f + \ft n\f*\v 2 b` saves a gained space between the note and the verse | **accept** (TJ, 2026-10-23: follow PT9) — matches Paratext 9: ParatextData's `UsfmToken.Tokenize` forces a space between a closing marker such as `\f*` and a following `\v` on every read, so the file reads identically with or without the space. Still reproduces in Standard view (type in the `\v 2 ` glyph, delete, depart). |
| O-4 | L1 | Tokenizer gives an empty note caller `+` where ParatextData writes `caller=""` | open — switch deferred until PT-4189 merged; now unblocked, owed in scripture-editors PR #11 |
| O-5 | L1 | A space typed after a char opener is saved as content (`\w  grace`), which ParatextData drops on the NEXT load; a span holding only spaces likewise | **FIXED** (2026-10-23) — Standard view drops a char span's leading plain spaces on save, as ParatextData's tokenizer skips whitespace after an opener, and a spaces-only span now saves empty as ParatextData does (the screen keeps the space). An NBSP is never dropped by this rule (tested). scripture-editors branch `pt-4197-data-fidelity`: the pt9-parity merge `1a13ac1d` and the pt-4197-o8 merge `1950fb21`. Pinned by `spacesAfterSeparator.test.tsx`, `markerMenuApply.utils.test.tsx` |
| O-6 | L1 | A bare `\` typed where a marker could begin. In ParatextData 9.5 AND 9.6 that `\` is a nameless marker and is written `\ ` (a space after every marker name: `UsfmToken.ToUsfm`), so a typed `\` is saved by ParatextData as `\ ` (a space added) where ours keeps `\`. The two versions differ on a `\` typed MID-text: 9.5 (what PT10 ships today) reads it as a nameless paragraph marker, so the paragraph splits on the next load; 9.6 keeps it as text. | **parked** (TJ, 2026-10-26): user data is solid; the remaining effect is a live-state mismatch (a bare `\` typed right after a marker shows as text but reads as a nameless marker on reload, in both 9.5 and 9.6). The 9.6-rule work is saved as a patch for the ParatextData 9.6 upgrade. Its one real data item — a nameless char marker in a note losing its empty name on export — is FIXED (scripture-editors `234793b3`) Revisit on the ParatextData 9.6 upgrade, **PT-4388**; the parked work is scripture-editors branch `pt-4197-nameless-96`. |
| O-7 | L1 | Standard view: `TextSpacingPlugin` inserts a space before a verse that follows a char span when a rebuild creates the verse; the pending side did not mirror it (ParatextData also inserts that space on load) | **FIXED** (2026-10-23) — the pending read now mirrors `TextSpacingPlugin`'s verse space; PT9 parity (scripture-editors merge `1a13ac1d`) |
| O-8 | L1 | A `\w` span whose opener separator is removed (Backspace after the separator: `\wgrace\|lemma="grace"\w*`) was reported to make `getUsj()` drop the span AND the following text of the paragraph | **NOT data loss** (2026-10-23) — the earlier report came from a probe that printed only one block. The span and ` of God` move to a new block: an unknown-marker paragraph, which is exactly how ParatextData reads the same bytes (`UsfmParser.DetermineUnknownTokenType`: paragraph outside a note, character span inside one). Pinned by 12 cases in `separatorGapSettle.test.tsx`. Real outcome: the pending/settled oracle gained a per-keystroke content check (`[keystroke]` in `pendingSettledOracle.test-helpers.tsx`); it used to compare only pending with settled, so content dropped in the keystroke's own update was invisible. Proven by mutation (7 cases fail on a seeded loss). |
| O-9 | L1 | `packages/scribe`'s editor→USJ adaptor still has the byte-comparison caller drop the platform adaptor replaced — the two adaptors disagree about a data-loss rule | open — scribe is not shipped in Paratext 10; needs a scope ruling |
| O-10 | L1 | Transient divergences while an edit is pending: a chapter rebuild beside an unclosed `\ca` leaves fresh text pended until the next departure; an optbreak emptied while the caret is elsewhere isn't recorded pending | open — no at-rest loss observed; recorded in scripture-editors PR #11 known-gaps |
| O-11 | L1 | Standard view: a range that covers a char span's opener whole and ends inside its closer (`\ft*` bytes 1..3), typed over or deleted, removes the closer's remaining bytes (`ft*`) along with the unwrapped span. `markerEditDeletion.utils.ts` says a PARTIALLY covered glyph keeps its surviving bytes; that holds for a partial opener (`xft note text` plus an unmatched `\ft*`) but a partial closer goes with its opener. Found in the O-8 investigation, real keys. | **accept** (TJ, 2026-10-26): for now — possibly a usability defect, not worth the time yet; same family as EV-2 |

## Typing-fidelity findings (non-Standard editable views, 2026-10-23)

From the keystroke-level typing oracle for `formatted` (Power mode) and `paragraph-structure`
(Simple mode), scripture-editors merge `b6032754`. The oracle is
`packages/platform/src/editor/typingFidelityOracle.test-helpers.tsx` with per-view parts and
expected-failures JSON; the regression tests for the fixes are
`typingFidelity.regressions.test.tsx` (same folder). "By design" means the oracle compares up to the
behavior; it is not a ruling by TJ.

| ID | View(s) | Finding | Status |
| --- | --- | --- | --- |
| T-1 | formatted, paragraph-structure | Delete just before a collapsed note threw (`Expected node N to have a parent.` in `$noteNodeTransform`) and the keystroke was discarded | **FIXED** — `12786e40` (return after removing the note) |
| T-2 | formatted | Joining a paragraph into an empty `\b` (Backspace at the paragraph's start, or a range into it) deleted the joined paragraph's text: the `\b` rule "an empty blank line takes no text" cleared joined-in content | **FIXED** — `c3dc99cc` (cleared only when nothing was joined in; the joined paragraph keeps the `\b` marker). **Follow-up needs-ruling:** should a join into an empty `\b` instead drop the blank line and keep the second paragraph's marker, as Paratext 9 likely does (unverified)? Follow-up FIXED to match Paratext 9 (scripture-editors `909ac785`): joining into an empty `\b` keeps the joined paragraph and its marker, as PT9's editor (Gecko joining two blocks keeps the second) does. |
| T-3 | formatted | Undo could not take back Enter in front of a char span or a note (Lexical history folds an update whose only dirty leaf kept its text into the previous entry) | **FIXED** — `92f45d22` (the new paragraph's first leaf is marked dirty) |
| T-4 | formatted, paragraph-structure, visible | An author's lone NBSP in a span was saved as nothing once an edit stranded it (load `\nd ~x\nd*`, delete `x`; or type an NBSP into an empty span) | **FIXED** — `282f484d` (the adaptor marks every span text holding an NBSP; `CharNodePlugin` marks a typed one). Observation to confirm: in Standard view an NBSP typed into an empty span saves as an ASCII space (Standard shows typed space runs with NBSPs, so on screen an NBSP reads as a space); needs-ruling if that is not the ratified exception |
| T-5 | formatted, paragraph-structure | Typing over a range across a char span's edge or a collapsed note moved text into the span, reordered it, or lost it (Lexical `RangeSelection.insertText`) | **FIXED** for hidden-marker views — `c557bf0b` (`InlineRangeEditPlugin`). Not covered (follow-up): Standard and visible views, and paste over a range, cut, and Enter over a range |
| T-6 | formatted, paragraph-structure | Enter inside a char span with attributes (`\w grace\|lemma="g"\w*`): the second half has no attributes (`CharNode.insertNewAfter` copies only `closed`, so as not to double the visible `\|name="value"` bytes) | **accept** (TJ, 2026-10-26): same in all three views; Paratext 9 never copies the attributes either, and copying would claim both halves share one lemma |
| T-7 | formatted, paragraph-structure | Two adjacent same-attribute spans are combined after what separated them is deleted (`CharNodePlugin`). For `\w` (word-level, lemma attributes) two adjacent spans are two words, so combining changes word segmentation | **FIXED** — scripture-editors `5de675c6`: formatted and paragraph-structure keep alike spans apart, as Standard view and Paratext 9 do; spans an edit creates still combine |
| T-8 | formatted, paragraph-structure | A space typed as an empty verse's whole content is dropped (`TextSpacingPlugin`; the round trip to disk drops it, keeping it makes core reload the editor) | **accept** (TJ, 2026-10-26) (by design) |
| T-9 | formatted, paragraph-structure | Text directly before a verse gains a trailing space (`TextSpacingPlugin`'s one structural space; ParatextData writes a verse that way) | **accept** (TJ, 2026-10-26) (by design) |
| T-10 | formatted | Backspace at the start of a chapter's first paragraph (or Delete at the end of the block before a chapter, or a range across one) deletes `\c N`; paragraph-structure guards it | **FIXED** (TJ, 2026-10-26: Simple only) — scripture-editors `38e66900`: in guarded mode Backspace/Delete beside a chapter arms it on the first press and deletes it on the second, like the other structural deletions; protected mode still refuses; Standard and formatted (Power, guard off) unchanged |
| T-11 | formatted, paragraph-structure | Undo/Redo around an empty verse: Redo is lost (formatted); two Undo steps (paragraph-structure, guarded). The document can always be brought back; root cause unconfirmed | **PINNED** — testUSFM-2SA-2/2SA-3 rows in both views' expected-failures JSON Tracked as **PT-4924**. |
| T-12 | formatted | Undo after Enter at a paragraph's start in front of a char span (WEB Matthew 5 block 3) leaves two paragraphs; probably the T-3 mechanism | **PINNED** Tracked as **PT-4924**. |
| T-13 | formatted, paragraph-structure | Enter at a word break drops the space at the break (`In\| the` becomes `In` / `the`) | **accept** (TJ, 2026-10-26); Simple now matches Standard and formatted (scripture-editors `018584d6`: the leading-space trim looks past the gutter glyph) |
| T-14 | load | testUSFM-1SA-1 is authored `version: "3.0"` and the editor wrote its own version | superseded by F-5 (the version is now preserved) |
| T-15 | formatted, paragraph-structure | Enter at a paragraph's start moves its content to a paragraph without the original's attributes (`vid=""` stays on the now-empty first paragraph; `ParaNode.insertNewAfter` copies the marker only) | **accept** (TJ, 2026-10-26): same in all three views; Paratext 9 does the same, and `vid` never reaches the file |
| T-16 | formatted | Backspace at an element caret after a span at a paragraph's end is ignored (no content changed) | **PINNED** Tracked as **PT-4924**. |
| AI-1 | Standard | Projects with `AllowInvisibleChars` on: the editor never learns the setting, so Standard view still applies its `~` rules — a literal tilde in the text (`a~b`) is saved as U+00A0 once the chapter is saved from Standard view (an unasked change to the text), and a literally typed NBSP saves as a space where Paratext 9 keeps it. Formatted and Simple are fine. | **needs-decision** — fix by passing the project setting (`platformScripture.allowInvisibleCharacters`) to the editor and switching off Standard view's `~`/display-NBSP mapping when on, mirroring PT9's `RenderSpaces` (medium effort, low risk for default projects); or file a ticket |
| PJ-1 | formatted, paragraph-structure | Joining two paragraphs with Backspace/Delete keeps the FIRST paragraph's marker (`\p a` + `\q1 b` → `\p ab`); Paratext 9 keeps the SECOND (`\q1 ab`), because its editor engine (Gecko) keeps the second block on every join. | **needs-ruling** — changing it alters every paragraph join; controller recommends keeping ours (the paragraph typed into keeps its style) |

Not fixed in the typing pass (fix budget): T-6, T-7, T-10, T-15 (rulings), T-11, T-12, T-16
(pinned), the range paths T-5 does not cover. O-3 and O-8 were re-run there; see their rows.

## Clipboard findings (copy, cut, paste across views, 2026-10-23)

From the clipboard corpus suite `packages/platform/src/editor/clipboardViewsCorpus.test.tsx`
(scripture-editors merge `931cd8a5`): copy/cut/paste over the 8 testUSFM corpus chapters, per range
kind, in Standard, formatted and paragraph-structure, with three payload shapes (all flavors; the
html-and-plain pair that Ctrl+V and the context-menu Paste actually deliver; plain text only), plus
cut, cut then paste back, and undo/redo. 543 rows: 475 pass, 68 pinned (as of 2026-10-26).

| ID | View(s) | Finding | Status |
| --- | --- | --- | --- |
| CB-1 | paragraph-structure (Simple's default) | A copy or cut across a paragraph boundary cannot be pasted back: the second paragraph's gutter marker glyph text (`\q1 `) is part of Lexical's `text/plain`, and `CommandMenuPlugin`'s over-broad `\`/`/` paste gate swallows the whole paste. After cut and paste back, the cut text is gone until the user undoes. External apps also receive `\q1 ` prose-with-markers. | **fix — PT-4911** (pinned: `knownFailure` rule 1, 44 rows). Recommended fix: write hidden-view `text/plain` without gutter glyph text in a copy/cut handler |
| CB-2 | all views | Prose pasted inside a char span or a note landed outside it (Lexical's all-inline `insertNodes` splits every inline ancestor) | **FIXED** — scripture-editors (merge `931cd8a5`): `registerInlineProsePaste` in `clipboard.utils.ts`, registered by `ClipboardPlugin`. Pinned by `ClipboardPlugin.test.tsx` "text pasted inside a char span or note stays there". Still Lexical's: a STRUCTURED payload pasted inside a span still splits the span (arguably right for spans, wrong for notes) |
| CB-3 | formatted, paragraph-structure (the real Ctrl+V path; Standard unaffected) | The HTML clipboard flavor loses data: char attributes including `closed="false"`, note category and attributes, and verse/chapter/para/milestone attributes are not in the html; note display spacers come back as ordinary spaces; figures, optbreaks and other unknown constructs are dropped from the paste entirely. Real-app effect (= EV-1): a pasted footnote gains `\fr*` / `\ft*` closers. Cause: `CharNode.exportDOM` writes only `data-marker` and classes, and `$convertCharElement` reads only `data-marker`. | **filed — PT-4921** (TJ, 2026-10-26: its own work item for POs; Standard view's approach — USFM in the plain-text clipboard, re-tokenized on paste — can't simply be reused in the hidden-marker views). Pinned: 13 rows in `clipboardViewsCorpus.test.tsx` and the e2e footnote-paste deviation in formatted and Simple
| CB-4 | formatted, paragraph-structure | A cut or delete leaving a char span's trailing NBSP as its only text lost the NBSP on save (the lone NBSP is also the empty-span caret placeholder) | **FIXED** — scripture-editors (merge `931cd8a5`): `CharNodePlugin` `$keepRemainingNbsp`. Pinned by `CharNodePlugin.test.tsx` |
| CB-5 | formatted, paragraph-structure | Content holding `\` or `/` (a URL, a date, "and/or", a stray `\*`) cannot be pasted back after a cut: the over-broad paste gate refuses it, so the cut content survives only via undo | **recorded** — the gate is documented as over-broad and deferred (clipboard-semantics S5); the suite asserts the refusal. Cut plus paste is destructive for such content in a hidden view |
| CB-6 | formatted, paragraph-structure | Hidden-view `text/plain` includes collapsed note text inline (`the Lord we trust. 1:1  Note text  After.`); Ctrl+Shift+V of it writes the note's text into the body | **recorded** — consistent with "copy-out is prose"; a decision is needed only if Ctrl+Shift+V should drop note text |
| CB-7 | formatted, paragraph-structure | Lexical's `onCutForRichText` removes the range even when it wrote nothing to the clipboard (DOM selection outside the editor). Code reading and jsdom only; real-app reachability unverified | **recorded** — the suite commits each selection first, so it does not depend on this |

**Standard view reference rows (by design / Standard-owned):** a range with one end inside a char
span is excluded from the Standard rows because it holds an opener or closer without its pair, which
is a marker edit (a copy carries an opener with no closer and pastes a span `closed="false"`; a cut
that takes the opener unwraps the span and its closer goes too: see EV-2; a cut that takes the closer
leaves the span unclosed to the paragraph end). In 2SA-5 (deliberately damaged USFM) a pasted run
holding a bare backslash stays a pending literal until the caret leaves, so `\v 9 x` reads back as
text (pinned, rule 3, 10 rows). In 2SA-3, `\v 9 x` pasted in Standard re-derives the rebuilt
paragraph's verses without the fixture's empty `sid` (pinned, rule 4, 1 row).

## Real-app findings (end-to-end, every editable view, 2026-10-23)

From the shared spec body `e2e-tests/fixtures/no-unasked-edits.body.ts`, run by three specs in
`e2e-tests/tests/isolated/scripture-editor/`: `no-unasked-edits-save-stability.spec.ts` (Power,
Standard), `no-unasked-edits-power-formatted.spec.ts` (Power, formatted) and
`no-unasked-edits-simple-paragraph-structure.spec.ts` (Simple, paragraph-structure). Per view, on
Jonah 1 and Matthew 3: opening writes nothing; the first edit and undo equals the pinned first-save
normalization (S-2 + E-1); at rest, edit and undo is byte-identical; eight real gestures (typing,
plain-text paste, copy/paste of a `\wj` span and of a footnote through the OS clipboard, Delete
over a selection into a span) change only the aimed verse and undo restores the file byte for byte.
Every load, first-save, at-rest, locality and undo assertion passes in all three views.

| ID | View(s) | Finding | Status |
| --- | --- | --- | --- |
| EV-1 | formatted, paragraph-structure | A footnote copied and pasted gains `\fr*` / `\ft*` closers (Matthew 3:13 note pasted into 3:14) | = **CB-3** (needs-decision); pinned as `knownDeviation` `CB-3`, hidden views only |
| EV-2 | Standard | Deleting a selection that includes a char opener but not its closer removes the whole style, including the unselected closer (3:15: select `him, \wj “Allow `, Delete; the `\wj*` the user never selected is gone). Cause: the deliberate engine rule in `$charNodeDeletionTransform` (`markerEditDeletion.utils.ts`): deleting the opening glyph unwraps the span. Locality holds and undo restores exactly. Paratext 9 likely keeps the closer as an unmatched marker (unverified). | **accept for now** (TJ, 2026-10-26): Paratext 9 keeps the closer as an unmatched marker; open to a UX/PO ruling, no ticket yet. The e2e (`no-unasked-edits`) pins it as a known deviation, so a fix that keeps the closer is welcome and removes the pin
| EV-3 | all | The assertions were proven able to fail: a temporary sabotage in `SetChapterUsx` (reverted) made every expected failure fire, each naming the unit | **TEST-WAS-RIGHT** |

## USX/USJ version findings (2026-10-23)

| ID | Layer | Finding | Status |
| --- | --- | --- | --- |
| UV-1 | L2/L0 | = F-5. ParatextData serves `<usx version="3.0">` while the editor pipeline emitted 3.1 and core forced 3.0 back with three shims | **FIXED** — the version is preserved end to end (core merge `2b703526044`, scripture-editors merge `ead5c1a3`); `Usj.version` is `string`; the three shims and the `usxVersion` option are deleted |
| UV-2 | L3 | A `\usfm` header line loses nothing: usfm.sty defines `\usfm` as an ordinary paragraph marker, so ParatextData writes `<para style="usfm">3.0</para>` (never the `<usfm>` element) and it round-trips byte for byte, independent of the stamp. The root `version` is always "3.0" whatever the header says (3.0, 3.1, 2.4), and relabelling the root to "3.1" writes the same USFM. Under a stylesheet that does not define `\usfm` the header is an unknown marker and a save joins it onto the `\id` line (same family as S-1; real stylesheets define it) | **accept** — no loss. The version is deliberately NOT derived from `\usfm`: the stamp is ParatextData's converter version, not the document's declared one. Pinned by `UsfmVersionMarkerRoundTripCaptureTests.cs` and `usx-to-usj.test.ts` "the \usfm version header" |
| UV-3 | L2/L0 | Residual 3.0 assumptions to revisit at the ParatextData 3.1 upgrade: `UsjReaderWriter` throws on a non-3.0 USJ without a markers map (the editor web view reads with `USFM_MARKERS_MAP_PARATEXT_3_0`); the web view's loading placeholder `defaultUsj` is pinned to "3.0" | **recorded** — `Usfm31NestingTripwireTests` checklist item 11 |

## Accepted load-time normalizations (automatic edits on load, by design)

Verified by the composed round-trip and the e2e no-unasked-edits spec:

- ParatextData `RegularizeSpaces` / `NormalizeUsfm` on the save path (and the first-trip
  normalization of never-before-saved authored USFM) — rows S-1, S-2, E-1.
- Standard view's space-run collapse on save (`normalizeSpaceRuns` shared definition) — screen
  keeps what was typed; saved USJ collapses runs the way ParatextData's tokenizer does.
- Chapter-marker layout on save: `\c 2 \ca 3\ca*` stores as `\c 2` with the run on the next line
  (Paratext 9's own shape; its chapter save runs `FixChapterNumbers` in every view) — arrives with
  paranext-core PR #2816 (`ChapterMarkerCorrection`).
- Whole-book effects of the first save: Unicode normalization (S-5) and CRLF line endings (E-1).
- Invisible-character handling: `RegularizeSpaces` ZWSP/repeat drops (S-6), NBSP after a marker
  with `AllowInvisibleChars` (S-7).
- Whitespace-only saves are skipped (S-4).
- A char span's leading plain spaces and a spaces-only span are dropped on save in Standard view,
  as ParatextData's tokenizer skips whitespace after an opener (O-5).

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
| FR-2 | Find/Replace | High — **PT-4910** (out of PT-4197's editor scope; pinned `it.fails` as of 2026-10-23) | No check that the text at a range is still the matched text; ranges re-resolve against the cache at replace time, so stale offsets replace the wrong text. Reproduced: `\v 1 Abraham was the father of Isaac.`, Find `Isaac`, the chapter becomes `\v 1 Then Abraham was the father of Isaac.`, Replace with `Jacob` writes `…the fatheJacobIsaac.` (`r of ` destroyed). Pin: `platform-scripture-finder-pdpe.test.ts`, "replaces only the matched text › FR-2". | fix: pass expected matched text per range (compare through the USJ text, because `toUsfm` writes NBSP as `~`); refuse on mismatch and report the skipped count to the UI (~1 day) |
| FR-3 | Find/Replace | High | Undo restores a pre-commit whole-book snapshot via `setBookUSFM`, overwriting edits (editor saves, other chapters) made during/after the replace. If `commitChanges` is unimplemented the replace proceeds with no snapshot. | fix: revert only touched chapters, only if current text equals post-replace text |
| FR-4 | Find/Replace | Med-High — **PT-4910** (found by code reading; the focus premise is unverified in the live app, as of 2026-10-23) | A focused editor with a local edit in the last 15 s defers the incoming update and re-pushes its own content (`use-editor-pdp-sync.hook.ts`) — the user sees "Replaced N" while the chapter silently reverts. The editor's `isFocused()` stays true after the user clicks into the Find web view (the iframe's `activeElement` is not cleared). Unflushed 700 ms debounced edits are also written over the replacement, and an open footnote popover or marker-palette session defers regardless of the window. | fix or warn: require the editor window to have focus for ownership (~0.5 day), a three-way merge for the pending-edit cases (several days; see PR #2911) |
| FR-5 | Find/Replace | Med-High — **PT-4910** (pinned `it.fails`, 4 rows in `platform-scripture-finder-pdpe.test.ts`, as of 2026-10-23) | Search text is the plain concatenation of all text nodes (`UsjReaderWriter.search`); a match spanning structure (paragraph/verse/note/character-style boundaries) silently splices the markers out. Reproduced: a match across a paragraph end deletes the `\p`; across a verse end deletes the `\v`; `word1:3` across a note deletes `\f + \fr`; `Lord God` across `\nd*` leaves `\nd` unclosed. Simple mode's structure guard covers paragraph/verse/chapter only; Power mode is unguarded. Paratext 9 never does this (it replaces per text token, or searches raw USFM where a plain query cannot span a marker). | product decision (TJ 2026-10-23: power users may want cross-boundary replaces on purpose) — options in PT-4910: match within one run by default with an explicit cross-boundary option (per-node search or separators in the search string; ~1 day, but phrases across `\nd`/`\wj` spans stop matching), keep markers on replace (3-5 days), or show the markup a match spans Pinned `it.fails` in Power mode (4 cases) and Simple mode (the footnote and char-span cases; the paragraph and verse cases are refused by structure protection). |
| FR-6 | Find/Replace | Medium | No compare-and-swap at write; cache invalidation rides PDP events only; out-of-process changes (Send/Receive, PT9) unverified as event sources. | largely covered by FR-2's text check |
| FR-7 | Find/Replace | Med-Low | Replacement text spliced as raw USFM, never parse-validated (partly by design — USFM replacements are supported). | validate result parses, or document |
| FR-8 | Find/Replace | Low-Med | `ignoreDiacritics` NFD mapping edge cases in decomposing scripts (Hangul, Indic nukta, Tibetan): a match end mid-composed-character maps to the character start. Tests cover NFC Latin only. | add tests, then fix |
| FR-9 | Find/Replace | Low | `SetChapterUsfm` passes a different `PutText` flag than `SetChapterUsx` (false vs true; semantics unverified) and lacks the `SafetyCheckException`→`PermissionsException` mapping. | confirm semantics |
| MB-1 | Manage Books | Medium (out of scope — TJ 2026-10-22: fine for our purposes) | Copy (`ReplaceEntireBook` default true) and import replace destination books with NO history snapshot (`commitChanges` is never called in ManageBooks). Copy itself is a raw `GetText`→`PutText` string copy — no conversion, good. Merge mode never overwrites real content (its TS doc wrongly says it does — doc fix). | snapshot before copy/import/delete; fix doc |
| MB-2 | Manage Books | Med-High (out of scope — TJ 2026-10-22: fine for our purposes) | Delete is permanent (`FileManager.Delete`; PT9's recycle-bin path deliberately replaced); recovery only via Send/Receive. | snapshot/history point first |
| VM-1 | View modes | Medium — **FIXED** (see F-7) | = F-7 sharpened: the lone-NBSP drop on save applies to formatted, paragraph-structure AND unformatted — and paragraph-structure is Simple mode's DEFAULT editable view, so Simple users are exposed (a paragraph whose first content is a bare `~` loses it on edit+save). Pinned as intended in `constructed-usj-round-trip.test.ts`. | fix (PT-4391) or accept explicitly for Simple |
| VM-2 | View modes | Low | An authored empty char span `content: []` returns with `content` absent (spelling-only; pinned). | **accept** (TJ, 2026-10-26) — harmless: `content` is optional in the USJ types and schema; `usxStringToUsj` already omits it for an empty `<char/>`; both shapes write identical USX; every save/reload/caret comparison treats absent and empty as equal |
| VM-3 | View modes | Med-Low | Coverage skew: the testUSFM oracle corpus and the transform fixed-point leg ran Standard-only; `markers` view in no config (read-only in prod). | **CLOSED** (TJ, 2026-10-26) — one shared view registry (`editorViews.test-helpers.tsx`) now drives every applicable suite over Standard, formatted and paragraph-structure (popover round trip, position oracles, navigation-then-edit, onUsjChange, undo, note EditorRef suites, paragraph split/delete); pending/settled suites stay Standard-only because the marker engine is off in hidden views; `corpus-testusfm-round-trip` and `corpus-transform-fixed-point` now run every fixture in Standard, formatted and paragraph-structure, and the composed suite runs all three over the real PDP captures |
| VM-4 | View modes (footnote popover) | **High** | Enter inside a footnote in the popover over a formatted or paragraph-structure host (Simple mode's default) splits the popover's scaffolding paragraph AFTER the note and puts the caret there, outside the note: whatever the user types next is dropped when the popover saves (it writes only the note op). The `\fp` break lives in `MarkerEditPlugin`, which is off when markers are hidden, and paranext-core's `FootnoteEditor` intercepts Enter only over an editable host. The note itself stays intact. | **FIXED** (TJ ruling 2026-10-23: Enter does nothing there for now) — host guard in `footnote-editor.component.tsx` (core `5264ac22138`) + editor-side `NoteEnterGuardPlugin` (SE `f04da7c3`); `\fp` support is **PT-4909**. Unverified side observation (jsdom only): with markers hidden, the popover's right-click Cut over a selected `\ft` text did not remove the text. Regression test: `footnote-editor.enter-inert.test.tsx` |
| VM-5 | Editor API | Low (not called by PT10 yet) | `EditorRef.extendCharacterMarker` in Standard: extending `\bd` with `["nd"]` as conflicting markers removes `\nd`, never applies `\bd`, and returns `true` (text left unstyled); coalescing two `\bd` runs saves two adjacent `\bd` spans. | **fix** before PT10 adopts extend (`replaceCharacterMarker` is TODO PT-4394); pinned as 2 known failures in `Editor.test.tsx` Tracked as **PT-4925**. |
| W-1 | Other writers | Negligible | `src/main/main.ts` dev-mode-only startup USX write-back for a hard-coded project; conflict-resolution `CommentEditHelper.SaveEdits` writes verse text on reject/merge but is guarded and user-initiated. No other Scripture-text writers found (bracketed grep + judgment sweep). | **accept** (TJ, 2026-10-26) |

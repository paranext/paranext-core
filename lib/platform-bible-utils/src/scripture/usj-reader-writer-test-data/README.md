# USJ reader/writer test data

The `testUSFM-*` and `web-matthew-*` fixtures here are the source of truth for the testUSFM
fidelity corpus. scripture-editors vendors copies in
`libs/shared/src/converters/usfm/testUsfmCorpus/`.

## Where each file comes from

- **`.usfm`**: Paratext 9 project text at rest (see below). The `-canonical-3.1` variants are
  hand-aligned to USFM 3.1 and are not at-rest Paratext text.
- **`pdp-usx/*.usx`**: ParatextData's own USX for each fixture chapter, exactly as
  `ParatextProjectDataProvider.GetChapterUsx` returns it (see `pdp-usx/README.md`).
- **`.usj`**: Platform.Bible's USJ for the paired `.usfm`, i.e. that USX converted by
  `usxStringToUsj` (`@eten-tech-foundation/scripture-utilities`), plus the hand edits that
  `usj-reader-writer.test.ts` notes beside each file. ParatextData 9.5 has no USJ writer, so the USX
  is the part of the oracle that is independent of Platform.Bible's TypeScript converters; the
  USX → USJ step is not.

## At rest

A fixture's `.usfm` must be text Paratext 9 keeps after a save. Paratext 9's formatted views run
`UsfmToken.NormalizeUsfm` on every save, which collapses runs of spaces, joins lines (a new line
starts only at `\id`, `\c`, paragraph markers and `\v`), and stores a non-breaking space as `~`
(projects without `AllowInvisibleChars`). Its Unformatted view preserves whitespace, which is why
2SA 1-3 keep a line break between `\c` and `\ca` that `NormalizeUsfm` would turn into a space.

To get the at-rest form of an as-typed chapter, and ParatextData's USX for it, run the capture
harness from `c-sharp-tests/`:

```bash
CORPUS_CAPTURE_INPUT=/abs/as-typed.usfm CORPUS_CAPTURE_OUTPUT_DIR=/abs/out \
  dotnet test --filter FullyQualifiedName~TestUsfmCorpusOracleCaptureTests
```

Set `CORPUS_CAPTURE_BOOK` (default `2SA`) for another book. `UsfmUsxRoundTripCorpusSweepTests`
then checks every fixture chapter here against the provider's round trip and keeps `pdp-usx/`
current.

## Damaged and less common USFM

These are at rest (`NormalizeUsfm` fixed points that ParatextData's USX → USFM leg reproduces byte
for byte). Each `.usj` is `usxStringToUsj` over the chapter's `pdp-usx/` capture, with `version`
set to `3.0` and the output formatted by Prettier (JSON parser, print width 100) — the same recipe
reproduces the `testUSFM-2SA-1`, `-2` and `-3` `.usj` files byte for byte, and every new file
here with no hand edits. In `testUSFM-2SA-5.usj` that includes the three nameless paragraphs
(`<para style="">` in the USX, `\ 2` in the `.usfm`) as `"marker": ""`, and the second `\ca` as a
top-level `char ca` after a chapter whose `altnumber` is the first — ParatextData's shape.

- **`testUSFM-2SA-4.usfm`**: standard USFM the other chapters do not use — `\cl`, `\cd`, a heading,
  `\r` and `\b` before the first `\p`, a cross reference, an endnote, `-` and custom note callers,
  a verse bridge with `\vp`, verse segments — plus known-bug anchors: a footnote butted against
  the next `\v`, a lone NBSP as a char span's and a paragraph's whole content, NBSP leading and
  trailing a char span's content, `mot~:` and `1~000`, a paragraph's trailing space before an
  unknown marker, and closed and unclosed `\ref`.
- **`testUSFM-2SA-5.usfm`**: damaged USFM that can still exist at rest — a second `\ca` and text on
  the `\c` line before any paragraph, a nameless marker (`\ 2`), a bare `\` after a character
  marker and at the end of a verse, and text after `\b`.
- **`testUSFM-1SA-1.usfm`**: a book start with introduction material (`\imt`, `\is`, `\ip`,
  `\io1`/`\io2` with `\ior`, `\ie`) before `\c 1`. Introduction precedes the first chapter, so it
  cannot live in a 2 Samuel chapter fixture without changing 2SA 1.

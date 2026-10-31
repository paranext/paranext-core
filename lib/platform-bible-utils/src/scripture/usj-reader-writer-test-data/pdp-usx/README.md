# Provider USX captures

Each `<fixture>-ch<N>.usx` file is the exact string `ParatextProjectDataProvider.GetChapterUsx`
returns for chapter `N` of the sibling `<fixture>.usfm` fixture: ParatextData's
`UsfmToUsx.ConvertToXmlDocument` with `forExport: true`, scoped to one chapter, against the real
`usfm.sty`. The bytes are the provider's output unchanged — including the missing trailing newline
and the incomplete `sid`/`eid`/`vid` values ParatextData emits for chapters after the first — so do
not reformat or hand-edit them.

scripture-editors' composed round-trip test consumes them as real provider output, so that test
starts from what the editor actually receives instead of from a USX that a TypeScript converter
produced.

They are written and checked by `c-sharp-tests/Projects/UsfmUsxRoundTripCorpusSweepTests.cs`,
which fails when a capture is missing or no longer matches the provider. To regenerate them (for
example after a ParatextData upgrade or a fixture change), run from `c-sharp-tests/`:

```bash
PDP_USX_CAPTURE=1 dotnet test --filter FullyQualifiedName~UsfmUsxRoundTripCorpusSweepTests
```

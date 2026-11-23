# Editor USX captures

The editor -> file -> editor round trip, over what the editor really writes. `pdp-usx/` holds what
the provider serves the editor; this folder holds what the editor hands back.

Each `<fixture>-ch<N>.<case>.usx` is the USX the web view would save for chapter `N` of the sibling
`<fixture>.usfm`, starting from that chapter's `pdp-usx/` capture:

- `<case>` = `resave`: the chapter converted to USJ and back with no edit — what the editor writes
  for every paragraph a user's first edit does not touch.
- `<case>` = `<view>.<gesture>`: one edit made in the real editor (the version paranext-core
  stages), in that view with the options the web view gives it, then prepared for saving as the web
  view does (`prepareUsjForChapterSave`).

`../editor-usx-returned/` holds, under the same names, what the provider serves back after saving
each one through ParatextData.

## Who writes and checks them

1. `extensions/src/platform-scripture-editor/src/editor-usx-round-trip.test.tsx` writes this folder
   and, by default, fails when a capture no longer matches what the editor writes. It also checks
   that each `editor-usx-returned/` capture reads back as the document the editor saved.
2. `c-sharp-tests/Projects/UsfmUsxRoundTripCorpusSweepTests.EditorUsx.cs` writes each capture
   through `SetChapterUsx`, pins every byte that changes on disk in
   `c-sharp-tests/Projects/EditorUsxRoundTrip.expected-diffs.json`, and writes or checks
   `editor-usx-returned/`.

Both folders are committed, so a change to the editor, the converters or ParatextData that changes
a byte fails one of those tests rather than leaving the captures stale, and the change shows up in
review as a diff of these files.

## Regenerating

After an intended change (a new editor in `dev-packages`, a fixture change, a ParatextData
upgrade), run from the repo root:

```bash
npm run test:editor-usx-round-trip:capture
```

It rewrites this folder, writes it through ParatextData (which also rewrites `pdp-usx/` and
`editor-usx-returned/`), then runs the TypeScript checks again. Review the diff: every change to a
capture is a change in what reaches the disk. A new byte the C# test reports must be triaged into
`EditorUsxRoundTrip.expected-diffs.json` with a reason, or fixed.

To add a case, add a gesture to `GESTURE_CHAPTERS` in the TypeScript test and regenerate. Do not
hand-edit the captures.

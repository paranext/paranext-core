# Stub Registry

This file tracks all C# stubs in the data provider for unported / not-yet-relocated dependencies.

| Stub | Files | Depends On | Created | Status |
|------|-------|------------|---------|--------|
| Checklist data logic (golden-master-backed mock of the future relocated `ParatextChecks` checklist API) | `Stubs/Checklists/*.cs` + `Stubs/Checklists/golden-masters/**` | ParatextChecks relocated checklist data logic (PT9 `Paratext.Checklists.*`, not yet shipped as a NuGet package) | 2026-05-29 | Active |

## Checklist data logic stub

Mirrors PT9's `Paratext.Checklists` surface under namespace `Paranext.DataProvider.Stubs.Checklists`.
Type names and member shapes match PT9 exactly (`CLData`, `CLRow`, `CLCell`, `CLPunctuationCell`,
`CLParagraph`, `CLText`, `CLVerse`, `CLLink`, `CLEditLink`, `CLParagraphMarker`, `CLDataSource`,
`ChecklistType`) so consumers swap to the real package by changing the `using` only.

`CLDataSource.BuildRows(...)` does not compute — it replays captured punctuation golden-master output.
Matching: the scenario id (e.g. `gm-001`) embedded in the first project's `ScrText.Name` selects the
fixture to replay (see `GoldenMasterStore`). Inputs matching no scenario return `true` with empty
`Rows` — never throws.

Golden fixtures live in `Stubs/Checklists/golden-masters/{scenario}/expected-output.json` (embedded
resources) and were copied from
`ai-prompts/.context/features/punctuation-checklist/golden-masters/`. Currently wired: `gm-001`
(cell shape), `gm-002` (empty-filter sentinel), `gm-006` (sequence source order).

## Replacement Checklist

When the relocated checklist data logic ships:

- [ ] Delete `Stubs/Checklists/*.cs` and `Stubs/Checklists/golden-masters/**`
- [ ] Remove the `EmbeddedResource` include for `Stubs/Checklists/golden-masters/**` from `ParanextDataProvider.csproj`
- [ ] Update consumers' `using Paranext.DataProvider.Stubs.Checklists;` to the real package namespace
- [ ] Remove this entry from the registry
- [ ] Search the codebase for any remaining references to the stub namespace

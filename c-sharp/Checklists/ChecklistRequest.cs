using System.Collections.Generic;
using System.Text.Json.Serialization;
using Paranext.DataProvider.Checklists.Markers;

namespace Paranext.DataProvider.Checklists;

// === NEW IN PT10 ===
// Reason: PT9 passes project/settings/range through WinForms form fields and direct
// ScrText access. PT10 requires a structured DTO that crosses the PAPI boundary.
// Maps to: data-contracts.md §2.1 (ChecklistRequest)
//
// EXPLANATION:
// The optional requested verse range is carried as a `ScriptureRange` (see
// `ScriptureRange.cs` — one type per file, PNX004). `ScriptureRange` is the single
// canonical structured scripture reference used across the Checklists module (it is
// also the type of the result-side `ChecklistCell.Reference` / `ChecklistRow.FirstRef`
// / `LinkItem.Reference`).
/// <summary>
/// Checklist request DTO. Frozen at the PAPI boundary. See data-contracts.md §2.1.
/// </summary>
[method: JsonConstructor]
public record ChecklistRequest(
    string ProjectId,
    IReadOnlyList<string> ComparativeTextIds,
    MarkerSettings MarkerSettings,
    ScriptureRange? VerseRange,
    bool HideMatches,
    bool ShowVerseText
);

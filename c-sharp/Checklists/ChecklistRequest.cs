using System.Collections.Generic;
using System.Text.Json.Serialization;
using Paranext.DataProvider.Checklists.Markers;
using SIL.Scripture;

namespace Paranext.DataProvider.Checklists;

// === NEW IN PT10 ===
// Reason: PT9 passes project/settings/range through WinForms form fields and direct
// ScrText access. PT10 requires a structured DTO that crosses the PAPI boundary.
// Maps to: data-contracts.md §2.1 (ChecklistRequest)
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
    bool ShowVerseText,
    IReadOnlyList<int>? BookNumbers
);

// === NEW IN PT10 ===
// Reason: PT9's `VerseRangeChooserForm` holds start/end VerseRefs in form state; the
// PT10 PAPI payload needs a serializable record.
// Maps to: data-contracts.md §2.1 (VerseRange field)
/// <summary>
/// Scripture verse-range record used by <see cref="ChecklistRequest.VerseRange"/>.
/// Serializes via the repo-wide <c>VerseRefConverter</c>. May be merged with the
/// existing <c>c-sharp/Projects/CommentThreadSelector.cs</c> variant in a future
/// refactor — for now lives in the Checklists namespace to satisfy the
/// data-contracts §2.1 contract.
/// </summary>
[method: JsonConstructor]
public record ScriptureRange(VerseRef Start, VerseRef? End);

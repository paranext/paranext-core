using System.Collections.Generic;
using System.Text.Json.Serialization;
using Paranext.DataProvider.Checklists.Markers;
using SIL.Scripture;

namespace Paranext.DataProvider.Checklists;

// === NEW IN PT10 ===
// Reason: PT9 passes project/settings/range through WinForms form fields and direct
// ScrText access. PT10 requires a structured DTO that crosses the PAPI boundary.
// Maps to: data-contracts.md §2.1 (ChecklistRequest)
//
// EXPLANATION:
// This file colocates two records: the top-level `ChecklistRequest` DTO and the
// `ScriptureRange` value it carries in its `VerseRange` field. Per the PNX004
// one-type-per-file rule's exclusive-use exception (decision-registry.json →
// constraints.codeStructure.oneTypePerFile), a record used exclusively by another
// record in the same module may share its file. `ScriptureRange` is referenced only
// by `ChecklistRequest.VerseRange` within the Checklists module, so colocation here
// keeps the request shape self-documenting without introducing an orphan file.
// Note: an unrelated mutable `ScriptureRange` class for note-thread filtering lives
// in `c-sharp/Projects/CommentThreadSelector.cs`; unifying the two is deferred (see
// data-contracts.md §2.1 [Revised: 2026-04-14] — future alignment with the platform
// scripture type).
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
/// Serializes via the repo-wide <c>VerseRefConverter</c>. Colocated with
/// <c>ChecklistRequest</c> per the PNX004 exclusive-use exception documented in the
/// file header. Not to be confused with the unrelated <c>ScriptureRange</c> class in
/// <c>c-sharp/Projects/CommentThreadSelector.cs</c> (different semantics — mutable,
/// required <c>End</c>, carries a <c>Granularity</c> field).
/// </summary>
[method: JsonConstructor]
public record ScriptureRange(VerseRef Start, VerseRef? End);

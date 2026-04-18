using System.Collections.Generic;
using Paranext.DataProvider.Checklists.Markers;
using SIL.Scripture;

namespace Paranext.DataProvider.Checklists;

/// <summary>
/// RED-phase skeleton — minimum type surface to satisfy compilation.
/// The implementer must add <c>[method: JsonConstructor]</c> on the primary
/// constructor and any validation/default-range logic per data-contracts.md §2.1.
/// </summary>
public record ChecklistRequest(
    string ProjectId,
    IReadOnlyList<string> ComparativeTextIds,
    MarkerSettings MarkerSettings,
    ScriptureRange? VerseRange,
    bool HideMatches,
    bool ShowVerseText,
    IReadOnlyList<int>? BookNumbers
);

/// <summary>
/// RED-phase skeleton verse-range record. The implementer may choose to consolidate
/// with the existing <c>c-sharp/Projects/CommentThreadSelector.cs</c>
/// <c>ScriptureRange</c> or keep this Checklists-local variant — data-contracts.md
/// §2.1 calls it out as <c>ScriptureRange?</c> in the <c>VerseRange</c> field.
/// </summary>
public record ScriptureRange(VerseRef Start, VerseRef? End);

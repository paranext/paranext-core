using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Paranext.DataProvider.Checklists;

// === PORTED FROM PT9 ===
// Source: PT9/Paratext/Checklists/CLData.cs (top-level result; rows/cells/paragraphs
// carried through CLRow/CLCell/CLParagraph)
// Method: ChecklistResult (CLData), ChecklistRow (CLRow), ChecklistCell (CLCell),
// ChecklistParagraph (CLParagraph)
// Maps to: EXT-010 (data models)
//
// EXPLANATION:
// The four result records colocate in this file per data-contracts.md §3.2 — they are
// exclusively used via ChecklistResult (PNX004 one-type-per-file exception). Each
// carries [method: JsonConstructor] so System.Text.Json uses the primary constructor
// on deserialize (matching the c-sharp/AppInfo.cs precedent for positional records).
/// <summary>
/// Top-level checklist result payload. See data-contracts.md §3.1.
/// </summary>
[method: JsonConstructor]
public record ChecklistResult(
    IReadOnlyList<ChecklistRow> Rows,
    IReadOnlyList<string> ColumnHeaders,
    IReadOnlyList<string> ColumnProjectIds,
    int ExcludedCount,
    string? HelpText,
    bool Truncated,
    EmptyResultMessage? EmptyResultMessage
);

// Scripture-reference modeling (Reference / FirstRef): these structured fields use the
// canonical platform type <see cref="ScriptureRange"/> (VerseRef Start + optional End,
// serialized via the repo-wide VerseRefConverter) rather than bespoke reference strings —
// one canonical scripture-reference representation everywhere. ScriptureRange is
// bridge-capable: {Start} for a single verse, {Start, End} for a verse bridge. Both fields
// are nullable: a default/empty verse reference is represented as null (the
// empty-placeholder cell from ChecklistRowBuilder, and rows whose cells carry no ref).
/// <summary>
/// Single row of the checklist result. See data-contracts.md §3.2. <c>FirstRef</c> is the
/// earliest verse reference across the row's populated cells (a single-verse
/// <see cref="ScriptureRange"/>), or null when no cell carries a reference.
/// </summary>
[method: JsonConstructor]
public record ChecklistRow(
    IReadOnlyList<ChecklistCell> Cells,
    bool IsMatch,
    bool IncludeEditLink,
    double Score,
    ScriptureRange? FirstRef
);

/// <summary>
/// Per-project cell within a row. See data-contracts.md §3.3. <c>Reference</c> is the cell's
/// verse reference as a bridge-capable <see cref="ScriptureRange"/>, or null for an
/// empty-placeholder cell (a column with no verse at this row, INV-001). The previously
/// separate <c>DisplayedReference</c> string is dropped from the wire — it was pure derived
/// presentation; the client formats a display string from <c>Reference</c> via
/// <c>formatScrRefRange</c>.
/// </summary>
[method: JsonConstructor]
public record ChecklistCell(
    IReadOnlyList<ChecklistParagraph> Paragraphs,
    ScriptureRange? Reference,
    string Language,
    string? Error
);

/// <summary>
/// Paragraph container within a cell. The <c>Marker</c> field stores the marker name
/// WITHOUT the backslash prefix per INV-004 (display layer prepends the backslash).
/// See data-contracts.md §3.4.
/// </summary>
[method: JsonConstructor]
public record ChecklistParagraph(string Marker, IReadOnlyList<ChecklistContentItem> Items);

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

/// <summary>
/// Single row of the checklist result. See data-contracts.md §3.2.
/// </summary>
[method: JsonConstructor]
public record ChecklistRow(
    IReadOnlyList<ChecklistCell> Cells,
    bool IsMatch,
    bool IncludeEditLink,
    double Score,
    string? FirstRef
);

/// <summary>
/// Per-project cell within a row. See data-contracts.md §3.3.
/// </summary>
[method: JsonConstructor]
public record ChecklistCell(
    IReadOnlyList<ChecklistParagraph> Paragraphs,
    string Reference,
    string DisplayedReference,
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

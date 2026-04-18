using System.Collections.Generic;

namespace Paranext.DataProvider.Checklists;

/// <summary>
/// RED-phase skeleton for the top-level checklist result payload.
/// Implementer must add <c>[method: JsonConstructor]</c> and any downstream
/// invariant enforcement per data-contracts.md §3.1.
/// </summary>
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
/// RED-phase skeleton row record. Per data-contracts.md §3.2 this file is allowed
/// to colocate row/cell/paragraph records because they are exclusively used by
/// <see cref="ChecklistResult"/> (PNX004 exception).
/// </summary>
public record ChecklistRow(
    IReadOnlyList<ChecklistCell> Cells,
    bool IsMatch,
    bool IncludeEditLink,
    double Score,
    string? FirstRef
);

/// <summary>
/// RED-phase skeleton cell record. See data-contracts.md §3.3.
/// </summary>
public record ChecklistCell(
    IReadOnlyList<ChecklistParagraph> Paragraphs,
    string Reference,
    string DisplayedReference,
    string Language,
    string? Error
);

/// <summary>
/// RED-phase skeleton paragraph record. See data-contracts.md §3.4.
/// Per INV-004 the <c>Marker</c> field stores the marker without the backslash
/// prefix; the display layer prepends it.
/// </summary>
public record ChecklistParagraph(string Marker, IReadOnlyList<ChecklistContentItem> Items);

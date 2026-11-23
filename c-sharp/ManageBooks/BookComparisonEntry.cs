namespace Paranext.DataProvider.ManageBooks;

// === PORTED FROM PT9 CONTRACT ===
// Source: .context/features/manage-books/data-contracts.md Section 3.5
// Maps to: EXT-007, EXT-008 (BHV-313, BHV-109, BHV-103)
//
// STUB — Test Writer RED skeleton for CAP-006.
// Record type carries no runtime logic; implementer may keep this file as-is.
//
// Theme 5 note (backend-alignment.md §610–626): the PT9 `SourceAndDestFileInfo`
// type stays strictly INTERNAL to CopyBooksOrchestrator's copy path. The
// public comparison shape surfaced over PAPI is this record.

/// <summary>
/// Per-book comparison entry returned by
/// <c>CopyBooksOrchestrator.LoadBooks</c> and by
/// <c>ManageBooksService.GetBookComparisonAsync</c> (via
/// <see cref="BookComparisonResult"/>). See data-contracts.md Section 3.5
/// "Business Logic" for the default-include rules per <see cref="ComparisonState"/>.
/// </summary>
/// <param name="BookNum">1-based canonical book number.</param>
/// <param name="BookName">Display name of the book (localized or English id).</param>
/// <param name="ComparisonState">Result of comparing source and destination files.</param>
/// <param name="DefaultIncluded">Whether the UI should pre-select the book for copy.</param>
/// <param name="Selectable">Whether the user can toggle the checkbox (false only for
///   <see cref="ComparisonState.SourceDoesNotExist"/>).</param>
/// <param name="TooltipInfo">Tooltip describing the state to the user.</param>
/// <param name="SourceLastModified">
/// ISO-8601 timestamp (UTC) for the source book's last modification, or null when the source
/// has no recorded date (file missing, in-memory file manager, etc.). The Copy/Import UI
/// tooltips and status badges depend on these per-side timestamps. Backwards-compatible
/// addition — older clients ignore the field.
/// </param>
/// <param name="DestLastModified">
/// ISO-8601 timestamp (UTC) for the destination book's last modification, or null when absent.
/// See <paramref name="SourceLastModified"/>.
/// </param>
public record BookComparisonEntry(
    int BookNum,
    string BookName,
    ComparisonState ComparisonState,
    bool DefaultIncluded,
    bool Selectable,
    string TooltipInfo,
    string? SourceLastModified = null,
    string? DestLastModified = null
);

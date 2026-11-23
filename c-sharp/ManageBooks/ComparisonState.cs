namespace Paranext.DataProvider.ManageBooks;

// === PORTED FROM PT9 CONTRACT ===
// Source: .context/features/manage-books/data-contracts.md Section 3.5
// Maps to: EXT-008 (BHV-313, BHV-109)
//
// STUB — Test Writer RED skeleton for CAP-006.
// Enum members are the six comparison states surfaced to the Copy Books dialog.
// See data-contracts.md Section 3.5 "Business Logic" for the default-include
// decision per state (INV-C06, INV-C07).

/// <summary>
/// Result of comparing a single book between the "from" and "to" projects for
/// the Copy Books dialog (CAP-006).
/// </summary>
public enum ComparisonState
{
    /// <summary>Source and destination files have identical content.</summary>
    FilesAreSame,

    /// <summary>Destination project does not have this book.</summary>
    DestDoesNotExist,

    /// <summary>Source file modified later than destination file.</summary>
    SourceIsNewer,

    /// <summary>Source file modified earlier than destination file.</summary>
    SourceIsOlder,

    /// <summary>Comparison could not determine an ordering (same timestamps, different text).</summary>
    Undetermined,

    /// <summary>Source project does not have this book (unique to copy; not in import).</summary>
    SourceDoesNotExist,
}

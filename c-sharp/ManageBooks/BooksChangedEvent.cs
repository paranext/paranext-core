namespace Paranext.DataProvider.ManageBooks;

/// <summary>
/// Event data for books changed notification.
/// </summary>
/// <remarks>
/// === NEW IN PT10 ===
/// Reason: Event payload type for PAPI data update events
/// Maps to: CAP-014 (OnBooksChangedEvent), data-contracts.md
///
/// This record is used as the payload when firing data update events
/// via SendDataUpdateEvent after book mutations (create, copy, delete, import).
/// </remarks>
/// <param name="ProjectId">Project where change occurred.</param>
/// <param name="ChangeType">Type of change (Created, Deleted, Modified).</param>
/// <param name="BookNumbers">Books affected by the change.</param>
public record BooksChangedEvent(string ProjectId, BooksChangeType ChangeType, int[] BookNumbers);

/// <summary>
/// Type of change to books in a project.
/// </summary>
/// <remarks>
/// === NEW IN PT10 ===
/// Reason: Enum for event discrimination
/// Maps to: data-contracts.md
/// </remarks>
public enum BooksChangeType
{
    /// <summary>Books were created.</summary>
    Created,

    /// <summary>Books were deleted.</summary>
    Deleted,

    /// <summary>Books were modified (e.g., copied into).</summary>
    Modified,
}

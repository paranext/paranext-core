namespace Paranext.DataProvider.ManageBooks;

/// <summary>
/// Request to delete books from a project.
/// </summary>
/// <remarks>
/// === NEW IN PT10 ===
/// Reason: Type definition for PAPI command contract request handling
/// Maps to: CAP-023, data-contracts.md
/// </remarks>
/// <param name="ProjectId">Project ID containing books to delete.</param>
/// <param name="BookNumbers">Array of book numbers to delete.</param>
/// <param name="SkipConfirmation">Whether to skip confirmation warnings.</param>
/// <param name="Confirmed">Whether the user has confirmed the deletion (true = proceed, false = cancel).</param>
public record DeleteBooksRequest(
    string ProjectId,
    int[] BookNumbers,
    bool SkipConfirmation = false,
    bool Confirmed = false
);

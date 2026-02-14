namespace Paranext.DataProvider.ManageBooks;

/// <summary>
/// Request to copy books from one project to another.
/// </summary>
/// <remarks>
/// === NEW IN PT10 ===
/// Reason: PAPI command pattern - request type for platformScripture.copyBooks
/// Maps to: CAP-002, data-contracts.md
/// </remarks>
/// <param name="SourceProjectId">Source project ID.</param>
/// <param name="DestProjectId">Destination project ID.</param>
/// <param name="BookNumbers">Array of book numbers to copy.</param>
public record CopyBooksRequest(string SourceProjectId, string DestProjectId, int[] BookNumbers);

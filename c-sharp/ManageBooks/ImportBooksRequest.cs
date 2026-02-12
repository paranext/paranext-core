namespace Paranext.DataProvider.ManageBooks;

/// <summary>
/// Request to import books from external files.
/// </summary>
/// <remarks>
/// === NEW IN PT10 ===
/// Reason: Type definition for PAPI command contract
/// Maps to: CAP-025, data-contracts.md
/// </remarks>
/// <param name="ProjectId">Project ID to import into.</param>
/// <param name="Files">Array of file import information.</param>
/// <param name="ReplaceEntireBook">Whether to replace entire book content.</param>
public record ImportBooksRequest(string ProjectId, FileImportInfo[] Files, bool ReplaceEntireBook);

/// <summary>
/// Information about a file to import.
/// </summary>
/// <remarks>
/// === NEW IN PT10 ===
/// Reason: Type definition for import file metadata
/// Maps to: CAP-025, data-contracts.md
/// </remarks>
/// <param name="FilePath">Full path to the file.</param>
/// <param name="TargetBookNum">Target book number (0 = auto-detect).</param>
/// <param name="Include">Whether to include in import.</param>
public record FileImportInfo(string FilePath, int TargetBookNum, bool Include);

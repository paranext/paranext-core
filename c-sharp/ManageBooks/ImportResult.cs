namespace Paranext.DataProvider.ManageBooks;

/// <summary>
/// Result of an import operation.
/// </summary>
/// <remarks>
/// CAP-026: USXImportWithConfirmation
/// Source: EXT-012 (ImportBooksForm.ImportUsx)
/// Behavior: BHV-111
/// </remarks>
/// <param name="Success">True if import completed successfully.</param>
/// <param name="ImportedBooks">List of book numbers that were imported.</param>
/// <param name="Errors">List of error messages for any files that failed to import.</param>
public record ImportResult(bool Success, List<int> ImportedBooks, List<string> Errors);

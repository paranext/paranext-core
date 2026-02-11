using Paratext.Data;

namespace Paranext.DataProvider.ManageBooks;

/// <summary>
/// Service providing book validation operations.
/// </summary>
/// <remarks>
/// This service implements CAP-017 (ModelBookAvailabilityCheck).
/// Ported from PT9/Paratext/ToolsMenu/CreateBooksForm.cs
/// </remarks>
internal static class BookValidationService
{
    /// <summary>
    /// Validate that selected books exist in model project.
    /// </summary>
    /// <remarks>
    /// === PORTED FROM PT9 ===
    /// Source: PT9/Paratext/ToolsMenu/CreateBooksForm.cs:248-288
    /// Method: CreateBooksForm.CheckModelBooks
    /// Maps to: EXT-003, CAP-017, VAL-008
    /// </remarks>
    /// <param name="bookNumbers">Books to validate</param>
    /// <param name="modelScrText">Model project</param>
    /// <returns>Validation result with missing books if any</returns>
    public static ModelValidationResult ValidateModelBooks(int[] bookNumbers, ScrText modelScrText)
    {
        // Handle empty selection case - vacuously valid
        if (bookNumbers.Length == 0)
        {
            return new ModelValidationResult(
                IsValid: true,
                ValidBooks: [],
                MissingBooks: [],
                WarningMessage: null
            );
        }

        var validBooks = new List<int>();
        var missingBooks = new List<int>();

        // Check each book against the model project
        foreach (int bookNum in bookNumbers)
        {
            if (modelScrText.BookPresent(bookNum))
            {
                validBooks.Add(bookNum);
            }
            else
            {
                missingBooks.Add(bookNum);
            }
        }

        // Build warning message if any books are missing
        string? warningMessage = null;
        if (missingBooks.Count > 0)
        {
            warningMessage =
                "Unable to create book(s) because these book(s) are not in the model project";
        }

        return new ModelValidationResult(
            IsValid: missingBooks.Count == 0,
            ValidBooks: validBooks.ToArray(),
            MissingBooks: missingBooks.ToArray(),
            WarningMessage: warningMessage
        );
    }
}

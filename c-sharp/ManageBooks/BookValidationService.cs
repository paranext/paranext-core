using Paratext.Data;
using SIL.Scripture;

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

    /// <summary>
    /// Check versification compatibility between target and model projects.
    /// </summary>
    /// <remarks>
    /// === STUB - TO BE IMPLEMENTED ===
    /// Source: PT9/Paratext/ToolsMenu/CreateBooksForm.cs:298-316
    /// Method: CreateBooksForm.CheckVersification
    /// Maps to: EXT-004, CAP-018, TS-071, BHV-308
    ///
    /// This method compares the versification of the target project with the model project.
    /// If any canonical books are selected and versifications differ, a warning is returned.
    /// Non-canonical books do not trigger versification checks.
    /// </remarks>
    /// <param name="targetScrText">Target project to create books in</param>
    /// <param name="modelScrText">Model project to copy from</param>
    /// <param name="selectedBooks">Books to be created</param>
    /// <returns>Versification compatibility result</returns>
    public static VersificationCheckResult CheckVersificationCompatibility(
        ScrText targetScrText,
        ScrText modelScrText,
        BookSet selectedBooks
    )
    {
        // STUB: NotImplementedException for TDD RED phase
        // This will be implemented by the tdd-implementer agent
        throw new NotImplementedException(
            "CAP-018: CheckVersificationCompatibility not yet implemented"
        );
    }
}

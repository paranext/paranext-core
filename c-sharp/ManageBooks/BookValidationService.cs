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
        // TDD RED PHASE: This stub exists to allow tests to compile.
        // The TDD Implementer will provide the actual implementation.
        throw new NotImplementedException(
            "CAP-017: ValidateModelBooks not yet implemented. TDD RED phase."
        );
    }
}

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

    // Canonical books are 1-66, non-canonical are 67+
    private const int LastCanonicalBookNum = 66;

    /// <summary>
    /// Check versification compatibility between target and model projects.
    /// </summary>
    /// <remarks>
    /// === PORTED FROM PT9 ===
    /// Source: PT9/Paratext/ToolsMenu/CreateBooksForm.cs:298-316
    /// Method: CreateBooksForm.CheckVersification
    /// Maps to: EXT-004, CAP-018, TS-071, BHV-308
    ///
    /// EXPLANATION:
    /// This method compares the versification of the target project with the model project.
    /// The algorithm is:
    /// 1. Get versification names from both projects
    /// 2. Check if any selected book is canonical (bookNum &lt;= 66)
    /// 3. If no canonical books are selected, versification is compatible (no comparison needed)
    /// 4. If canonical books are selected:
    ///    - Compare versification names
    ///    - If same: compatible with no warning
    ///    - If different: not compatible, return warning message
    ///
    /// Non-canonical books (67+) do not trigger versification checks because versification
    /// only defines chapter/verse structure for canonical books.
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
        // Get versification names from both projects
        string sourceVersification = modelScrText.Settings.Versification.Name;
        string targetVersification = targetScrText.Settings.Versification.Name;

        // Check if any selected book is canonical (book number <= 66)
        bool hasCanonicalBook = selectedBooks.SelectedBookNumbers.Any(bookNum =>
            bookNum <= LastCanonicalBookNum
        );

        // If no canonical books selected, versification is compatible (no check needed)
        if (!hasCanonicalBook)
        {
            return new VersificationCheckResult(
                IsCompatible: true,
                WarningMessage: null,
                SourceVersification: sourceVersification,
                TargetVersification: targetVersification
            );
        }

        // Compare versifications for canonical books
        bool versificationsMatch = sourceVersification == targetVersification;

        if (versificationsMatch)
        {
            return new VersificationCheckResult(
                IsCompatible: true,
                WarningMessage: null,
                SourceVersification: sourceVersification,
                TargetVersification: targetVersification
            );
        }

        // Versifications differ - return warning
        string warningMessage =
            $"The model project uses {sourceVersification} versification, "
            + $"but this project uses {targetVersification} versification. "
            + "This may result in different verse numbering.";

        return new VersificationCheckResult(
            IsCompatible: false,
            WarningMessage: warningMessage,
            SourceVersification: sourceVersification,
            TargetVersification: targetVersification
        );
    }

    /// <summary>
    /// Check if selected books overlap with SBA base project.
    /// </summary>
    /// <remarks>
    /// === STUB FOR TDD RED PHASE ===
    /// Source: PT9/ParatextBase/CommonForms/BookChooserForm.cs:173-206
    /// Method: BookChooserForm.UpdateState
    /// Maps to: EXT-013, CAP-027, TS-068, BHV-314, BHV-T016
    ///
    /// EXPLANATION:
    /// This method checks if an SBA (Study Bible Additions) project has selected
    /// books that don't exist in its base project. SBA projects add content to
    /// a base project, so creating books that don't exist in the base is unusual
    /// and warrants a warning.
    ///
    /// The algorithm is:
    /// 1. Check if the project is an SBA project (TranslationInfo.Type.IsStudyBibleAdditions)
    /// 2. If not SBA: return no warning
    /// 3. If SBA: get base project from TranslationInfo.BaseProjectGuid
    /// 4. Compare selected books against base project's BooksPresentSet
    /// 5. If any selected books are NOT in base: return warning with list
    /// </remarks>
    /// <param name="scrText">Project to check (may or may not be SBA)</param>
    /// <param name="selectedBooks">Books selected for creation</param>
    /// <returns>Warning result indicating if books are missing from base</returns>
    public static SBAWarningResult CheckSBABaseProjectOverlap(
        ScrText scrText,
        BookSet selectedBooks
    )
    {
        // TODO: Implement in GREEN phase
        // This stub exists so tests compile but fail (TDD RED phase)
        throw new NotImplementedException(
            "CAP-027: CheckSBABaseProjectOverlap not yet implemented. "
                + "TDD RED phase - tests should compile but fail."
        );
    }
}

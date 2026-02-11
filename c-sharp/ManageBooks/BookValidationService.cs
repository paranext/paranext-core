using Paranext.DataProvider.Projects;
using Paratext.Data;
using SIL.Scripture;

namespace Paranext.DataProvider.ManageBooks;

/// <summary>
/// Service providing book validation operations.
/// </summary>
/// <remarks>
/// This service implements:
/// - CAP-017: ModelBookAvailabilityCheck (internal ScrText-based validation)
/// - CAP-010: ValidateModelBooks (public API with project ID string)
/// - CAP-018: VersificationCompatibilityCheck (internal ScrText-based check)
/// - CAP-011: CheckVersificationCompatibility (public API with project ID strings)
/// - CAP-027: SBABaseProjectBookWarning
///
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
    /// Validate that selected books exist in model project (public API taking project ID).
    /// </summary>
    /// <remarks>
    /// === NEW IN PT10 ===
    /// Reason: Public API that resolves project ID to ScrText before delegating to CAP-017
    /// Maps to: CAP-010
    ///
    /// EXPLANATION:
    /// This method is the public API for model book validation. It:
    /// 1. Handles null/empty project ID by returning an error result
    /// 2. Handles null/empty book array by treating as valid (empty selection)
    /// 3. Resolves the project ID string to a ScrText via LocalParatextProjects
    /// 4. Delegates to the internal ValidateModelBooks(int[], ScrText) method (CAP-017)
    /// 5. Enhances the warning message to include the model project name
    /// </remarks>
    /// <param name="bookNumbers">Books to validate (null treated as empty)</param>
    /// <param name="modelProjectId">Model project ID string (GUID format)</param>
    /// <returns>Validation result with valid/missing books and warning message</returns>
    public static ModelValidationResult ValidateModelBooks(int[] bookNumbers, string modelProjectId)
    {
        // Handle null/empty project ID - return error
        if (string.IsNullOrEmpty(modelProjectId))
        {
            return new ModelValidationResult(
                IsValid: false,
                ValidBooks: [],
                MissingBooks: [],
                WarningMessage: "Model project ID is required but was not provided."
            );
        }

        // Handle null book array - treat as empty (valid)
        if (bookNumbers == null || bookNumbers.Length == 0)
        {
            return new ModelValidationResult(
                IsValid: true,
                ValidBooks: [],
                MissingBooks: [],
                WarningMessage: null
            );
        }

        // Try to resolve the project ID to a ScrText
        ScrText modelScrText;
        try
        {
            modelScrText = LocalParatextProjects.GetParatextProject(modelProjectId);
        }
        catch (Exception)
        {
            return new ModelValidationResult(
                IsValid: false,
                ValidBooks: [],
                MissingBooks: [],
                WarningMessage: $"Could not find model project with ID '{modelProjectId}'."
            );
        }

        // Delegate to the internal method (CAP-017)
        var result = ValidateModelBooks(bookNumbers, modelScrText);

        // If there are missing books, enhance the warning message to include the project name
        if (result.MissingBooks.Length > 0)
        {
            string projectName = modelScrText.Name;
            string warningMessage =
                $"Unable to create book(s) because these book(s) are not in the model project {projectName}";

            return new ModelValidationResult(
                IsValid: result.IsValid,
                ValidBooks: result.ValidBooks,
                MissingBooks: result.MissingBooks,
                WarningMessage: warningMessage
            );
        }

        return result;
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
    /// Check versification compatibility between target and model projects (public API taking project IDs).
    /// </summary>
    /// <remarks>
    /// === NEW IN PT10 ===
    /// Reason: Public API that resolves project IDs to ScrText before delegating to CAP-018
    /// Maps to: CAP-011, TS-071, BHV-308
    ///
    /// EXPLANATION:
    /// This method is the public API for versification compatibility checking. It:
    /// 1. Handles null target project ID by returning an error result
    /// 2. Handles null model project ID by returning compatible (no model = no comparison)
    /// 3. Handles null/empty book array by treating as compatible (empty selection)
    /// 4. Resolves the project ID strings to ScrText via LocalParatextProjects
    /// 5. Converts int[] to BookSet
    /// 6. Delegates to the internal CheckVersificationCompatibility(ScrText, ScrText, BookSet) method (CAP-018)
    /// </remarks>
    /// <param name="targetProjectId">Target project ID string (GUID format)</param>
    /// <param name="modelProjectId">Model project ID string (GUID format), or null if no model</param>
    /// <param name="bookNumbers">Books to check (null treated as empty)</param>
    /// <returns>Versification compatibility result</returns>
    public static VersificationCheckResult CheckVersificationCompatibility(
        string targetProjectId,
        string modelProjectId,
        int[] bookNumbers
    )
    {
        // Handle null/empty target project ID - return error
        if (string.IsNullOrEmpty(targetProjectId))
        {
            return new VersificationCheckResult(
                IsCompatible: false,
                WarningMessage: "Target project ID is required but was not provided.",
                SourceVersification: string.Empty,
                TargetVersification: string.Empty
            );
        }

        // Handle null model project ID - no model means no comparison needed
        if (string.IsNullOrEmpty(modelProjectId))
        {
            // Try to get target project to return its versification info
            ScrText targetScrTextForNullModel;
            try
            {
                targetScrTextForNullModel = LocalParatextProjects.GetParatextProject(
                    targetProjectId
                );
            }
            catch (Exception)
            {
                return new VersificationCheckResult(
                    IsCompatible: true,
                    WarningMessage: null,
                    SourceVersification: string.Empty,
                    TargetVersification: string.Empty
                );
            }

            return new VersificationCheckResult(
                IsCompatible: true,
                WarningMessage: null,
                SourceVersification: string.Empty,
                TargetVersification: targetScrTextForNullModel.Settings.Versification.Name
            );
        }

        // Handle null/empty book array - empty selection is compatible
        if (bookNumbers == null || bookNumbers.Length == 0)
        {
            // Still need to resolve projects to return versification info
            ScrText targetScrTextForEmpty;
            ScrText modelScrTextForEmpty;
            try
            {
                targetScrTextForEmpty = LocalParatextProjects.GetParatextProject(targetProjectId);
                modelScrTextForEmpty = LocalParatextProjects.GetParatextProject(modelProjectId);
            }
            catch (Exception)
            {
                return new VersificationCheckResult(
                    IsCompatible: true,
                    WarningMessage: null,
                    SourceVersification: string.Empty,
                    TargetVersification: string.Empty
                );
            }

            return new VersificationCheckResult(
                IsCompatible: true,
                WarningMessage: null,
                SourceVersification: modelScrTextForEmpty.Settings.Versification.Name,
                TargetVersification: targetScrTextForEmpty.Settings.Versification.Name
            );
        }

        // Try to resolve the target project ID to a ScrText
        ScrText targetScrText;
        try
        {
            targetScrText = LocalParatextProjects.GetParatextProject(targetProjectId);
        }
        catch (Exception)
        {
            return new VersificationCheckResult(
                IsCompatible: false,
                WarningMessage: $"Could not find target project with ID '{targetProjectId}'.",
                SourceVersification: string.Empty,
                TargetVersification: string.Empty
            );
        }

        // Try to resolve the model project ID to a ScrText
        ScrText modelScrText;
        try
        {
            modelScrText = LocalParatextProjects.GetParatextProject(modelProjectId);
        }
        catch (Exception)
        {
            return new VersificationCheckResult(
                IsCompatible: false,
                WarningMessage: $"Could not find model project with ID '{modelProjectId}'.",
                SourceVersification: string.Empty,
                TargetVersification: targetScrText.Settings.Versification.Name
            );
        }

        // Convert int[] to BookSet for the internal API
        var selectedBooks = new BookSet();
        foreach (var bookNum in bookNumbers)
        {
            selectedBooks.Add(bookNum);
        }

        // Delegate to the internal method (CAP-018)
        return CheckVersificationCompatibility(targetScrText, modelScrText, selectedBooks);
    }

    /// <summary>
    /// Check if selected books overlap with SBA base project.
    /// </summary>
    /// <remarks>
    /// === PORTED FROM PT9 ===
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
    /// 1. Handle empty selection - no warning needed
    /// 2. Check if the project is an SBA project (Settings.IsStudyBibleAdditions)
    /// 3. If not SBA: return no warning
    /// 4. If SBA: get base project from TranslationInfo.BaseProjectGuid
    /// 5. Compare selected books against base project's BooksPresentSet
    /// 6. If any selected books are NOT in base: return warning with list
    /// </remarks>
    /// <param name="scrText">Project to check (may or may not be SBA)</param>
    /// <param name="selectedBooks">Books selected for creation</param>
    /// <returns>Warning result indicating if books are missing from base</returns>
    public static SBAWarningResult CheckSBABaseProjectOverlap(
        ScrText scrText,
        BookSet selectedBooks
    )
    {
        // Handle empty selection case - no warning needed
        if (selectedBooks.Count == 0)
        {
            return new SBAWarningResult(
                ShowWarning: false,
                BooksNotInBase: [],
                WarningMessage: null
            );
        }

        // Check if this is an SBA project
        // If not SBA, no warning is needed regardless of selected books
        if (!scrText.Settings.IsStudyBibleAdditions)
        {
            return new SBAWarningResult(
                ShowWarning: false,
                BooksNotInBase: [],
                WarningMessage: null
            );
        }

        // Get the base project GUID from translation info
        var baseProjectHexId = scrText.Settings.TranslationInfo.BaseProjectGuid;
        string baseProjectGuid = baseProjectHexId.ToString();

        // If no base project is configured, we can't check - return no warning
        // HexId.ToString() returns "00000000000000000000000000000000" for default/empty
        if (
            string.IsNullOrEmpty(baseProjectGuid)
            || baseProjectGuid == "00000000000000000000000000000000"
        )
        {
            return new SBAWarningResult(
                ShowWarning: false,
                BooksNotInBase: [],
                WarningMessage: null
            );
        }

        // Try to get the base project
        ScrText? baseScrText;
        try
        {
            baseScrText = LocalParatextProjects.GetParatextProject(baseProjectGuid);
        }
        catch
        {
            // If we can't load the base project, return no warning
            return new SBAWarningResult(
                ShowWarning: false,
                BooksNotInBase: [],
                WarningMessage: null
            );
        }

        if (baseScrText == null)
        {
            return new SBAWarningResult(
                ShowWarning: false,
                BooksNotInBase: [],
                WarningMessage: null
            );
        }

        // Get books present in the base project
        BookSet baseBooksPresent = baseScrText.Settings.BooksPresentSet;

        // Find books that are selected but not in the base project
        var booksNotInBase = new List<int>();
        foreach (int bookNum in selectedBooks.SelectedBookNumbers)
        {
            if (!baseBooksPresent.IsSelected(bookNum))
            {
                booksNotInBase.Add(bookNum);
            }
        }

        // If all selected books are in the base, no warning needed
        if (booksNotInBase.Count == 0)
        {
            return new SBAWarningResult(
                ShowWarning: false,
                BooksNotInBase: [],
                WarningMessage: null
            );
        }

        // Build warning message for books not in base project
        string warningMessage =
            "The selected book(s) do not exist in the base project. "
            + "Study Bible Additions projects typically only add content to books "
            + "that exist in the base project.";

        return new SBAWarningResult(
            ShowWarning: true,
            BooksNotInBase: booksNotInBase.ToArray(),
            WarningMessage: warningMessage
        );
    }
}

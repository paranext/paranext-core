using Paratext.Data;
using PtxUtils;
using SIL.Scripture;

namespace Paranext.DataProvider.ManageBooks;

/// <summary>
/// Service providing book creation operations.
/// </summary>
/// <remarks>
/// This service implements CAP-015 (PermissionCheckForBookCreation) and related capabilities.
/// Ported from PT9/Paratext/ToolsMenu/CreateBooksForm.cs
/// </remarks>
internal static class BookCreationService
{
    /// <summary>
    /// Check permissions for book creation and grant if needed.
    /// </summary>
    /// <remarks>
    /// === PORTED FROM PT9 ===
    /// Source: PT9/Paratext/ToolsMenu/CreateBooksForm.cs:126-150
    /// Method: CreateBooksForm.cmdOK_Click (permission section)
    /// Maps to: EXT-001, BHV-300
    /// </remarks>
    /// <param name="selectedBooks">Books to create</param>
    /// <param name="scrText">Target project</param>
    /// <returns>Permission result with success/failure status</returns>
    /// <exception cref="ArgumentNullException">
    /// Thrown when <paramref name="selectedBooks"/> or <paramref name="scrText"/> is null.
    /// </exception>
    public static PermissionResult CheckAndGrantBookPermissions(
        BookSet selectedBooks,
        ScrText scrText
    )
    {
        ArgumentNullException.ThrowIfNull(selectedBooks);
        ArgumentNullException.ThrowIfNull(scrText);

        // Collect books where user does not have permission
        List<int> unauthorizedBooks = [];

        foreach (int bookNum in selectedBooks.SelectedBookNumbers)
        {
            if (!scrText.Creatable(bookNum))
            {
                unauthorizedBooks.Add(bookNum);
            }
        }

        if (unauthorizedBooks.Count > 0)
        {
            return new PermissionResult(
                Success: false,
                ErrorMessage: "You do not have permission to create some books",
                UnauthorizedBooks: unauthorizedBooks
            );
        }

        return new PermissionResult(Success: true, ErrorMessage: null, UnauthorizedBooks: []);
    }

    /// <summary>
    /// Calculate available books for creation (excludes existing books).
    /// </summary>
    /// <remarks>
    /// === PORTED FROM PT9 ===
    /// Source: PT9/Paratext/ToolsMenu/CreateBooksForm.cs:225-238
    /// Method: CreateBooksForm.CreateAvailableBookSet
    /// Maps to: EXT-005, CAP-019, BHV-T015, BHV-T018
    ///
    /// EXPLANATION:
    /// This algorithm calculates which books are available for creation in a project:
    /// 1. For SBA (Study Bible Additions) projects: start with non-canonical books only (67-123)
    /// 2. For standard projects: start with all books (1-123)
    /// 3. Subtract books already present in the project (LocalBooksPresentSet)
    /// 4. Return the remaining books as available for creation
    ///
    /// Related: INV-004 (SBA projects cannot create canonical books)
    /// </remarks>
    /// <param name="scrText">Target project</param>
    /// <param name="isStudyBible">True if this is an SBA project</param>
    /// <returns>BookSet containing books available for creation</returns>
    /// <exception cref="ArgumentNullException">
    /// Thrown when <paramref name="scrText"/> is null.
    /// </exception>
    public static BookSet CreateAvailableBookSet(ScrText scrText, bool isStudyBible)
    {
        ArgumentNullException.ThrowIfNull(scrText);

        // Create a new BookSet to hold available books
        BookSet availableBooks = new();

        // Determine the starting book number based on project type
        // SBA projects can only create non-canonical books (INV-004)
        int startBookNum = isStudyBible
            ? BookServiceHelpers.FirstNonCanonicalBookNum
            : BookServiceHelpers.FirstBookNum;

        // Get books already present in the project
        BookSet existingBooks = scrText.Settings.LocalBooksPresentSet;

        // Add all books in the appropriate range that don't already exist
        for (int bookNum = startBookNum; bookNum <= BookServiceHelpers.LastBookNum; bookNum++)
        {
            // Only add if book doesn't already exist in project
            if (!existingBooks.IsSelected(bookNum) && !scrText.BookPresent(bookNum))
            {
                availableBooks.Add(bookNum);
            }
        }

        return availableBooks;
    }

    /// <summary>
    /// Gets books available for creation in a project.
    /// </summary>
    /// <remarks>
    /// === NEW IN PT10 ===
    /// Reason: PAPI command pattern - wraps CreateAvailableBookSet for JSON-RPC access
    /// Maps to: CAP-008 (GetAvailableBooks)
    ///
    /// This method:
    /// 1. Looks up the ScrText by project ID
    /// 2. Determines if the project is an SBA (Study Bible Additions) project
    /// 3. Calls CreateAvailableBookSet (CAP-019) to calculate available books
    /// 4. Returns AvailableBooksResult with available and existing books
    ///
    /// For SBA projects, only non-canonical books (67-123) are available (INV-004).
    /// For standard projects, all books (1-123) minus existing are available.
    /// </remarks>
    /// <param name="projectId">Project ID (GUID string).</param>
    /// <returns>Available books result with book info.</returns>
    public static AvailableBooksResult GetAvailableBooks(string projectId)
    {
        // Find the ScrText for this project
        ScrText? scrText = FindScrText(projectId);

        if (scrText == null)
        {
            return new AvailableBooksResult([], [], false);
        }

        // Determine if this is a Study Bible Additions project
        bool isStudyBible = scrText.Settings.IsStudyBibleAdditions;

        // Get the available books using CAP-019 implementation
        BookSet availableBookSet = CreateAvailableBookSet(scrText, isStudyBible);

        // Convert available books to BookInfo array
        List<BookInfo> availableBooks = [];
        foreach (int bookNum in availableBookSet.SelectedBookNumbers)
        {
            availableBooks.Add(CreateBookInfo(bookNum));
        }

        // Get existing books from the project
        List<BookInfo> existingBooks = [];
        for (
            int bookNum = BookServiceHelpers.FirstBookNum;
            bookNum <= BookServiceHelpers.LastBookNum;
            bookNum++
        )
        {
            if (scrText.BookPresent(bookNum))
            {
                existingBooks.Add(CreateBookInfo(bookNum));
            }
        }

        return new AvailableBooksResult([.. availableBooks], [.. existingBooks], isStudyBible);
    }

    /// <summary>
    /// Creates books in a project using the specified creation mode.
    /// </summary>
    /// <remarks>
    /// === PORTED FROM PT9 ===
    /// Source: PT9/Paratext/ToolsMenu/CreateBooksForm.cs:152-198
    /// Method: CreateBooksForm.cmdOK_Click (book creation section)
    /// Maps to: EXT-002, CAP-016, BHV-300, BHV-T001, BHV-T002, BHV-T003
    ///
    /// EXPLANATION:
    /// This orchestration method coordinates book creation across multiple capabilities:
    /// 1. Validate the request (project exists, book numbers valid)
    /// 2. Check if any books already exist (return error if so)
    /// 3. Check permissions via CheckAndGrantBookPermissions (CAP-015)
    /// 4. If BasedOnModel mode:
    ///    a. Validate model project provided
    ///    b. Validate model books exist (CAP-017)
    ///    c. Check versification compatibility (CAP-018)
    /// 5. For each book: call ScriptureTemplateService.CreateOneBook (CAP-028)
    /// 6. Return success result with created books
    /// </remarks>
    /// <param name="request">Creation request parameters.</param>
    /// <returns>Operation result with created books.</returns>
    public static Task<BookOperationResult> CreateBooksAsync(CreateBooksRequest request)
    {
        // Validate request
        if (request == null)
        {
            return Task.FromResult(
                BookOperationResult.ErrorResult(
                    BookErrorCode.ValidationFailed,
                    "Request cannot be null"
                )
            );
        }

        if (string.IsNullOrEmpty(request.ProjectId))
        {
            return Task.FromResult(
                BookOperationResult.ErrorResult(
                    BookErrorCode.ValidationFailed,
                    "Project ID is required"
                )
            );
        }

        if (request.BookNumbers == null || request.BookNumbers.Length == 0)
        {
            return Task.FromResult(
                BookOperationResult.ErrorResult(
                    BookErrorCode.ValidationFailed,
                    "At least one book number is required"
                )
            );
        }

        // Find the target project
        ScrText? scrText = FindScrText(request.ProjectId);
        if (scrText == null)
        {
            return Task.FromResult(
                BookOperationResult.ErrorResult(
                    BookErrorCode.ProjectNotFound,
                    $"Could not find project with ID '{request.ProjectId}'"
                )
            );
        }

        // Validate book numbers are in valid range
        foreach (int bookNum in request.BookNumbers)
        {
            if (
                bookNum < BookServiceHelpers.FirstBookNum
                || bookNum > BookServiceHelpers.LastBookNum
            )
            {
                return Task.FromResult(
                    BookOperationResult.ErrorResult(
                        BookErrorCode.InvalidBookNumber,
                        $"Book number {bookNum} is not valid (must be {BookServiceHelpers.FirstBookNum}-{BookServiceHelpers.LastBookNum})"
                    )
                );
            }
        }

        // Check if any books already exist
        List<int> existingBooks = [];
        foreach (int bookNum in request.BookNumbers)
        {
            if (scrText.BookPresent(bookNum))
            {
                existingBooks.Add(bookNum);
            }
        }

        if (existingBooks.Count > 0)
        {
            string bookIds = string.Join(", ", existingBooks.Select(b => Canon.BookNumberToId(b)));
            return Task.FromResult(
                BookOperationResult.ErrorResultWithFailedBooks(
                    BookErrorCode.BookAlreadyExists,
                    $"Book(s) already exist in project: {bookIds}",
                    existingBooks.ToArray()
                )
            );
        }

        // Check permissions (CAP-015)
        BookSet selectedBooks = new();
        foreach (int bookNum in request.BookNumbers)
        {
            selectedBooks.Add(bookNum);
        }

        PermissionResult permissionResult = CheckAndGrantBookPermissions(selectedBooks, scrText);
        if (!permissionResult.Success)
        {
            return Task.FromResult(
                BookOperationResult.ErrorResultWithFailedBooks(
                    BookErrorCode.PermissionDenied,
                    permissionResult.ErrorMessage ?? "Permission denied",
                    permissionResult.UnauthorizedBooks.ToArray()
                )
            );
        }

        // Collect warnings for model-based creation
        List<string> warnings = [];
        ScrText? modelScrText = null;

        // Handle BasedOnModel mode validation
        if (request.Mode == BookCreationMode.BasedOnModel)
        {
            // Validate model project is provided
            if (string.IsNullOrEmpty(request.ModelProjectId))
            {
                return Task.FromResult(
                    BookOperationResult.ErrorResult(
                        BookErrorCode.ModelNotSelected,
                        "Please select a model text"
                    )
                );
            }

            // Find model project
            modelScrText = FindScrText(request.ModelProjectId);
            if (modelScrText == null)
            {
                return Task.FromResult(
                    BookOperationResult.ErrorResult(
                        BookErrorCode.ProjectNotFound,
                        $"Could not find model project with ID '{request.ModelProjectId}'"
                    )
                );
            }

            // Validate model books exist (CAP-017)
            ModelValidationResult modelValidation = BookValidationService.ValidateModelBooks(
                request.BookNumbers,
                modelScrText
            );
            if (!modelValidation.IsValid)
            {
                // Add warning for missing books but continue (per PT9 behavior)
                if (modelValidation.WarningMessage != null)
                {
                    warnings.Add(modelValidation.WarningMessage);
                }
            }

            // Check versification compatibility (CAP-018)
            VersificationCheckResult versificationCheck =
                BookValidationService.CheckVersificationCompatibility(
                    scrText,
                    modelScrText,
                    selectedBooks
                );
            if (!versificationCheck.IsCompatible && versificationCheck.WarningMessage != null)
            {
                warnings.Add(versificationCheck.WarningMessage);
            }
        }

        // Create books using ScriptureTemplateService (CAP-028)
        List<int> createdBooks = [];
        int lastBookNum = 0;
        bool createCV = request.Mode == BookCreationMode.WithCV;

        foreach (int bookNum in request.BookNumbers)
        {
            try
            {
                bool created = ScriptureTemplateService.CreateOneBook(
                    scrText,
                    bookNum,
                    createCV,
                    modelScrText
                );

                if (created)
                {
                    createdBooks.Add(bookNum);
                    lastBookNum = bookNum;
                }
            }
            catch (Exception ex)
            {
                // Log error but continue with other books
                warnings.Add(
                    $"Failed to create book {Canon.BookNumberToId(bookNum)}: {ex.Message}"
                );
            }
        }

        // Return result
        if (createdBooks.Count == 0)
        {
            return Task.FromResult(
                BookOperationResult.ErrorResult(
                    BookErrorCode.ValidationFailed,
                    "No books were created"
                )
            );
        }

        if (warnings.Count > 0)
        {
            return Task.FromResult(
                BookOperationResult.SuccessResultWithWarnings(
                    createdBooks.ToArray(),
                    lastBookNum,
                    warnings
                )
            );
        }

        return Task.FromResult(
            BookOperationResult.SuccessResult(createdBooks.ToArray(), lastBookNum)
        );
    }

    /// <summary>
    /// Creates BookInfo for a book number.
    /// </summary>
    /// <remarks>
    /// Delegates to BookServiceHelpers.CreateBookInfo for shared implementation.
    /// </remarks>
    private static BookInfo CreateBookInfo(int bookNum) =>
        BookServiceHelpers.CreateBookInfo(bookNum);

    /// <summary>
    /// Finds a ScrText by project ID.
    /// </summary>
    /// <remarks>
    /// Delegates to BookServiceHelpers.FindScrText for shared implementation.
    /// </remarks>
    private static ScrText? FindScrText(string projectId) =>
        BookServiceHelpers.FindScrText(projectId);
}

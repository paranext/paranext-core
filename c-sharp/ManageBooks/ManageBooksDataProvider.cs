using System.Text.Json;
using Paranext.DataProvider.NetworkObjects;
using Paranext.DataProvider.Projects;
using Paratext.Data;

namespace Paranext.DataProvider.ManageBooks;

/// <summary>
/// Data provider exposing book management operations via PAPI commands.
/// </summary>
/// <remarks>
/// === NEW IN PT10 ===
/// Reason: PAPI command pattern - exposes book management operations via JSON-RPC
/// Maps to: CAP-001 (CreateBooks), CAP-002 (CopyBooks), CAP-003 (DeleteBooks), CAP-005 (ImportBooks)
///
/// This DataProvider registers the following PAPI commands:
/// - platformScripture.createBooks: Creates books in a project (CAP-001)
/// - platformScripture.copyBooks: Copies books between projects (CAP-002)
/// - platformScripture.getBooksPresent: Gets books present in a project (CAP-009)
/// - platformScripture.getAvailableBooks: Gets available books for creation (CAP-008)
///
/// The provider fires data update events after successful mutations.
/// </remarks>
internal sealed class ManageBooksDataProvider : NetworkObjects.DataProvider
{
    private readonly LocalParatextProjects _paratextProjects;

    /// <summary>
    /// Cached JSON serialization options for PAPI request deserialization.
    /// Uses PropertyNameCaseInsensitive for robust handling of JSON property casing.
    /// </summary>
    private static readonly JsonSerializerOptions s_jsonOptions =
        new() { PropertyNameCaseInsensitive = true };

    public ManageBooksDataProvider(PapiClient papiClient, LocalParatextProjects paratextProjects)
        : base("platformScripture.manageBooks", papiClient)
    {
        _paratextProjects = paratextProjects;
    }

    /// <summary>
    /// Returns registered PAPI functions: createBooks, copyBooks, getBooksPresent, getAvailableBooks.
    /// </summary>
    protected override List<(string functionName, Delegate function)> GetFunctions()
    {
        return
        [
            ("createBooks", HandleCreateBooks),
            ("copyBooks", HandleCopyBooks),
            ("getBooksPresent", HandleGetBooksPresent),
            ("getAvailableBooks", HandleGetAvailableBooks),
        ];
    }

    /// <summary>
    /// Called when the data provider starts.
    /// </summary>
    protected override Task StartDataProviderAsync()
    {
        // No initialization needed - services are stateless
        return Task.CompletedTask;
    }

    /// <summary>
    /// Handles the createBooks PAPI command (CAP-001).
    /// Deserializes the request from JSON and delegates to ExecuteCreateBooksAsync.
    /// </summary>
    private async Task<BookOperationResult> HandleCreateBooks(JsonElement requestElement)
    {
        try
        {
            CreateBooksRequest? request = JsonSerializer.Deserialize<CreateBooksRequest>(
                requestElement.GetRawText(),
                s_jsonOptions
            );

            return await ExecuteCreateBooksAsync(request);
        }
        catch (JsonException ex)
        {
            return BookOperationResult.ErrorResult(
                BookErrorCode.ValidationFailed,
                $"Invalid request format: {ex.Message}"
            );
        }
        catch (Exception ex)
        {
            return BookOperationResult.ErrorResult(
                BookErrorCode.ValidationFailed,
                $"Unexpected error: {ex.Message}"
            );
        }
    }

    /// <summary>
    /// Handles the getBooksPresent PAPI command (CAP-009).
    /// </summary>
    private BooksPresentResult HandleGetBooksPresent(string projectId)
    {
        return ManageBooksService.GetBooksPresent(projectId);
    }

    /// <summary>
    /// Handles the getAvailableBooks PAPI command (CAP-008).
    /// </summary>
    private AvailableBooksResult HandleGetAvailableBooks(string projectId)
    {
        return BookCreationService.GetAvailableBooks(projectId);
    }

    /// <summary>
    /// Test entry point for createBooks - bypasses JSON deserialization.
    /// </summary>
    internal Task<BookOperationResult> HandleCreateBooksCommand(CreateBooksRequest? request)
    {
        return ExecuteCreateBooksAsync(request);
    }

    /// <summary>
    /// Handles the copyBooks PAPI command (CAP-002).
    /// Deserializes the request from JSON and delegates to ExecuteCopyBooksAsync.
    /// </summary>
    /// <remarks>
    /// === NEW IN PT10 ===
    /// Reason: PAPI command pattern for platformScripture.copyBooks
    /// Maps to: CAP-002, BHV-301
    /// </remarks>
    private async Task<BookOperationResult> HandleCopyBooks(JsonElement requestElement)
    {
        try
        {
            CopyBooksRequest? request = JsonSerializer.Deserialize<CopyBooksRequest>(
                requestElement.GetRawText(),
                s_jsonOptions
            );

            return await ExecuteCopyBooksAsync(request);
        }
        catch (JsonException ex)
        {
            return BookOperationResult.ErrorResult(
                BookErrorCode.ValidationFailed,
                $"Invalid request format: {ex.Message}"
            );
        }
        catch (Exception ex)
        {
            return BookOperationResult.ErrorResult(
                BookErrorCode.ValidationFailed,
                $"Unexpected error: {ex.Message}"
            );
        }
    }

    /// <summary>
    /// Test entry point for copyBooks - bypasses JSON deserialization.
    /// </summary>
    internal Task<BookOperationResult> CopyBooksAsync(CopyBooksRequest? request)
    {
        return ExecuteCopyBooksAsync(request);
    }

    /// <summary>
    /// Core implementation for copying books - shared by PAPI handler and test method.
    /// </summary>
    /// <remarks>
    /// === PORTED FROM PT9 ===
    /// Source: PT9/Paratext/ToolsMenu/CopyBooksForm.cs:cmdOK_Click
    /// Maps to: CAP-002, BHV-301, BHV-550, BHV-551
    ///
    /// EXPLANATION:
    /// This orchestration method implements the PT9 copy books workflow:
    /// 1. Validate request parameters (projectIds, bookNumbers)
    /// 2. Find source and destination projects
    /// 3. Validate project type compatibility (INV-007, INV-008)
    /// 4. Validate all source books exist
    /// 5. Delegate to BookCopyService.CopyBooks() for actual copy
    /// 6. Fire data update event on success
    /// </remarks>
    private async Task<BookOperationResult> ExecuteCopyBooksAsync(CopyBooksRequest? request)
    {
        // Step 1: Validate request is not null
        if (request == null)
        {
            return BookOperationResult.ErrorResult(
                BookErrorCode.ValidationFailed,
                "Request cannot be null"
            );
        }

        // Step 2: Validate project IDs are provided
        if (string.IsNullOrEmpty(request.SourceProjectId))
        {
            return BookOperationResult.ErrorResult(
                BookErrorCode.ValidationFailed,
                "Source project ID cannot be empty"
            );
        }

        if (string.IsNullOrEmpty(request.DestProjectId))
        {
            return BookOperationResult.ErrorResult(
                BookErrorCode.ValidationFailed,
                "Destination project ID cannot be empty"
            );
        }

        // Step 3: Handle empty book list - success with no copies
        if (request.BookNumbers == null || request.BookNumbers.Length == 0)
        {
            return BookOperationResult.SuccessResult([], 0);
        }

        // Step 4: Find source and destination projects
        ScrText? sourceScrText = BookServiceHelpers.FindScrText(request.SourceProjectId);
        if (sourceScrText == null)
        {
            return BookOperationResult.ErrorResult(
                BookErrorCode.ProjectNotFound,
                $"Source project not found: {request.SourceProjectId}"
            );
        }

        ScrText? destScrText = BookServiceHelpers.FindScrText(request.DestProjectId);
        if (destScrText == null)
        {
            return BookOperationResult.ErrorResult(
                BookErrorCode.ProjectNotFound,
                $"Destination project not found: {request.DestProjectId}"
            );
        }

        // Step 5: Validate project type compatibility (INV-007, INV-008)
        var compatibilityError = ValidateProjectTypeCompatibility(sourceScrText, destScrText);
        if (compatibilityError != null)
        {
            return compatibilityError;
        }

        // Step 6: Validate all source books exist
        var missingBooks = new List<int>();
        foreach (int bookNum in request.BookNumbers)
        {
            if (!sourceScrText.BookPresent(bookNum))
            {
                missingBooks.Add(bookNum);
            }
        }

        if (missingBooks.Count > 0)
        {
            return BookOperationResult.ErrorResultWithFailedBooks(
                BookErrorCode.BookNotFound,
                $"Books not found in source project: {string.Join(", ", missingBooks)}",
                [.. missingBooks]
            );
        }

        // Step 7: Build list of books to copy (all books in request are selected)
        var selectedBooks = request
            .BookNumbers.Select(bookNum => new SourceAndDestFileInfo
            {
                BookNum = bookNum,
                IncludeThisFile = true,
            })
            .ToList();

        // Step 8: Delegate to BookCopyService for actual copy
        BookCopyResult copyResult;
        try
        {
            copyResult = BookCopyService.CopyBooks(sourceScrText, destScrText, selectedBooks);
        }
        catch (Exception ex)
        {
            // Handle lock failure or other exceptions
            if (
                ex.Message.Contains("lock", StringComparison.OrdinalIgnoreCase)
                || ex is InvalidOperationException
            )
            {
                return BookOperationResult.ErrorResult(
                    BookErrorCode.LockNotObtained,
                    $"Could not obtain write lock for destination project: {ex.Message}"
                );
            }
            throw;
        }

        // Step 9: Convert BookCopyResult to BookOperationResult
        if (copyResult.Success)
        {
            SendDataUpdateEvent("*", "Books copied successfully");
            return BookOperationResult.SuccessResult(
                [.. copyResult.CopiedBooks],
                copyResult.LastCopiedBookNum
            );
        }
        else
        {
            // Determine appropriate error code from copy result
            if (copyResult.FailedBooks.Count > 0)
            {
                return BookOperationResult.ErrorResultWithFailedBooks(
                    BookErrorCode.BookNotFound,
                    string.Join("; ", copyResult.Errors),
                    [.. copyResult.FailedBooks]
                );
            }

            return BookOperationResult.ErrorResult(
                BookErrorCode.ValidationFailed,
                string.Join("; ", copyResult.Errors)
            );
        }
    }

    /// <summary>
    /// Validates that project types are compatible for copy operation.
    /// Enforces INV-007 (StudyBible only to StudyBible) and INV-008 (SBA only to SBA).
    /// </summary>
    /// <remarks>
    /// === PORTED FROM PT9 ===
    /// Source: PT9/Paratext/ToolsMenu/CopyBooksForm.cs (project type filtering)
    /// Maps to: INV-007, INV-008, BHV-552, BHV-553, BHV-554
    /// </remarks>
    private static BookOperationResult? ValidateProjectTypeCompatibility(
        ScrText sourceScrText,
        ScrText destScrText
    )
    {
        var sourceType = sourceScrText.Settings.TranslationInfo.Type;
        var destType = destScrText.Settings.TranslationInfo.Type;

        bool sourceIsStudyBible = sourceType == ProjectType.StudyBible;
        bool sourceIsSBA = sourceScrText.Settings.IsStudyBibleAdditions;

        bool destIsStudyBible = destType == ProjectType.StudyBible;
        bool destIsSBA = destScrText.Settings.IsStudyBibleAdditions;

        // INV-007: StudyBible can ONLY copy to StudyBible
        if (sourceIsStudyBible && !destIsStudyBible)
        {
            return BookOperationResult.ErrorResult(
                BookErrorCode.ProjectTypeIncompatible,
                $"StudyBible projects can only copy to other StudyBible projects. Source type: {sourceType}, Destination type: {destType}"
            );
        }

        // INV-008: SBA can ONLY copy to SBA
        if (sourceIsSBA && !destIsSBA)
        {
            return BookOperationResult.ErrorResult(
                BookErrorCode.ProjectTypeIncompatible,
                $"StudyBibleAdditions projects can only copy to other StudyBibleAdditions projects. Source type: {sourceType}, Destination type: {destType}"
            );
        }

        // Project types are compatible
        return null;
    }

    /// <summary>
    /// Core implementation for creating books - shared by PAPI handler and test method.
    /// </summary>
    private async Task<BookOperationResult> ExecuteCreateBooksAsync(CreateBooksRequest? request)
    {
        if (request == null)
        {
            return BookOperationResult.ErrorResult(
                BookErrorCode.ValidationFailed,
                "Request cannot be null"
            );
        }

        BookOperationResult result = await BookCreationService.CreateBooksAsync(request);

        if (result.Success)
        {
            SendDataUpdateEvent("*", "Books created successfully");
        }

        return result;
    }
}

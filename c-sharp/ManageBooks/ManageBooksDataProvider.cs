using System.Text.Json;
using Paranext.DataProvider.NetworkObjects;
using Paranext.DataProvider.Projects;

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
/// - platformScripture.getBooksPresent: Gets books present in a project (CAP-009)
/// - platformScripture.getAvailableBooks: Gets available books for creation (CAP-008)
///
/// The provider fires data update events after successful mutations.
/// </remarks>
internal sealed class ManageBooksDataProvider : NetworkObjects.DataProvider
{
    private readonly LocalParatextProjects _paratextProjects;

    public ManageBooksDataProvider(PapiClient papiClient, LocalParatextProjects paratextProjects)
        : base("platformScripture.manageBooks", papiClient)
    {
        _paratextProjects = paratextProjects;
    }

    /// <summary>
    /// Provides the list of functions that can be called on this data provider.
    /// </summary>
    /// <remarks>
    /// === NEW IN PT10 ===
    /// Reason: PAPI command registration pattern
    /// Maps to: CAP-001, CAP-008, CAP-009
    /// </remarks>
    protected override List<(string functionName, Delegate function)> GetFunctions()
    {
        return
        [
            ("createBooks", HandleCreateBooks),
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

    #region Command Handlers

    /// <summary>
    /// Handles the createBooks PAPI command.
    /// </summary>
    /// <remarks>
    /// === NEW IN PT10 ===
    /// Reason: PAPI command wrapper for CAP-001
    /// Maps to: CAP-001 (CreateBooks PAPI Command)
    ///
    /// This handler:
    /// 1. Deserializes the CreateBooksRequest from JSON
    /// 2. Delegates to BookCreationService.CreateBooksAsync (CAP-016)
    /// 3. Fires BooksChanged event on success via SendDataUpdateEvent
    /// 4. Returns the BookOperationResult
    /// </remarks>
    /// <param name="requestElement">JSON element containing CreateBooksRequest</param>
    /// <returns>BookOperationResult indicating success or failure</returns>
    private async Task<BookOperationResult> HandleCreateBooks(JsonElement requestElement)
    {
        try
        {
            // Deserialize request
            CreateBooksRequest? request = JsonSerializer.Deserialize<CreateBooksRequest>(
                requestElement.GetRawText(),
                new JsonSerializerOptions { PropertyNameCaseInsensitive = true }
            );

            if (request == null)
            {
                return BookOperationResult.ErrorResult(
                    BookErrorCode.ValidationFailed,
                    "Request cannot be null"
                );
            }

            // Delegate to BookCreationService (CAP-016)
            BookOperationResult result = await BookCreationService.CreateBooksAsync(request);

            // Fire update event on success
            if (result.Success)
            {
                SendDataUpdateEvent("*", "Books created successfully");
            }

            return result;
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
    /// Handles the getBooksPresent PAPI command.
    /// </summary>
    /// <remarks>
    /// === NEW IN PT10 ===
    /// Reason: PAPI command wrapper for CAP-009
    /// Maps to: CAP-009 (GetBooksPresent)
    /// </remarks>
    /// <param name="projectId">Project ID as JSON string</param>
    /// <returns>BooksPresentResult with books in the project</returns>
    private BooksPresentResult HandleGetBooksPresent(string projectId)
    {
        return ManageBooksService.GetBooksPresent(projectId);
    }

    /// <summary>
    /// Handles the getAvailableBooks PAPI command.
    /// </summary>
    /// <remarks>
    /// === NEW IN PT10 ===
    /// Reason: PAPI command wrapper for CAP-008
    /// Maps to: CAP-008 (GetAvailableBooks)
    /// </remarks>
    /// <param name="projectId">Project ID as JSON string</param>
    /// <returns>AvailableBooksResult with available and existing books</returns>
    private AvailableBooksResult HandleGetAvailableBooks(string projectId)
    {
        return BookCreationService.GetAvailableBooks(projectId);
    }

    #endregion

    #region Test Support (internal)

    /// <summary>
    /// Exposes HandleCreateBooks for direct testing without JSON serialization.
    /// </summary>
    /// <remarks>
    /// This method is for testing CAP-001 without needing the full PAPI infrastructure.
    /// It bypasses JSON deserialization and calls the service directly.
    /// </remarks>
    internal async Task<BookOperationResult> HandleCreateBooksCommand(CreateBooksRequest request)
    {
        if (request == null)
        {
            return BookOperationResult.ErrorResult(
                BookErrorCode.ValidationFailed,
                "Request cannot be null"
            );
        }

        // Delegate to BookCreationService (CAP-016)
        BookOperationResult result = await BookCreationService.CreateBooksAsync(request);

        // Fire update event on success
        if (result.Success)
        {
            SendDataUpdateEvent("*", "Books created successfully");
        }

        return result;
    }

    #endregion
}

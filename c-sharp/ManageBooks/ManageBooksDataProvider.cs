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
    /// Returns registered PAPI functions: createBooks, getBooksPresent, getAvailableBooks.
    /// </summary>
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
                new JsonSerializerOptions { PropertyNameCaseInsensitive = true }
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

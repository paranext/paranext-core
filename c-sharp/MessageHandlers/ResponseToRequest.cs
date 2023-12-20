namespace Paranext.DataProvider.MessageHandlers;

/// <summary>
/// Internally represents a response we generated to an incoming request
/// </summary>
public sealed record ResponseToRequest
{
    private ResponseToRequest(bool success, object? contents, string? errorMessage)
    {
        Success = success;
        Contents = contents;
        ErrorMessage = errorMessage;
    }

    /// <summary>
    /// Response when successful
    /// </summary>
    public static ResponseToRequest Succeeded(object? contents = null)
    {
        return new ResponseToRequest(true, contents, null);
    }

    /// <summary>
    /// Response when there was an error
    /// </summary>
    public static ResponseToRequest Failed(string errorMessage)
    {
        return new ResponseToRequest(false, null, errorMessage);
    }

    public bool Success { get; }

    public string? ErrorMessage { get; }

    public object? Contents { get; }
}

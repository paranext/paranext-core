namespace Paranext.DataProvider.MessageHandlers;

/// <summary>
/// Internally represents a response we generated to an incoming request
/// </summary>
public sealed record class ResponseToRequest
{
    /// <summary>
    /// Response when there was an error - no contents
    /// </summary>
    public ResponseToRequest(string errorMessage)
    {
        Success = false;
        ErrorMessage = errorMessage;
    }

    /// <summary>
    /// Response when successful
    /// </summary>
    public ResponseToRequest(dynamic? contents)
    {
        Success = true;
        Contents = contents;
    }

    public bool Success { get; }

    public string? ErrorMessage { get; }

    public dynamic? Contents { get; }
}

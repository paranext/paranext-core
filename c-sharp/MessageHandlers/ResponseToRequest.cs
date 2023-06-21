namespace Paranext.DataProvider.MessageHandlers;

/// <summary>
/// Internally represents a response we generated to an incoming request
/// </summary>
public sealed record ResponseToRequest
{
    private ResponseToRequest(bool success, dynamic? details)
    {
        Success = success;
        if (success)
            Contents = details;
        else
            ErrorMessage = details;
    }

    /// <summary>
    /// Response when successful
    /// </summary>
    public static ResponseToRequest Succeeded(dynamic? contents = null)
    {
        // If the contents are sent as null it is assumed to be a failed response regardless of the value of "Success".
        // Replace null with an empty list to avoid this confusing behavior.
        contents ??= new List<object>();
        return new ResponseToRequest(true, contents);
    }

    /// <summary>
    /// Response when there was an error
    /// </summary>
    public static ResponseToRequest Failed(string errorMessage)
    {
        return new ResponseToRequest(false, errorMessage);
    }

    public bool Success { get; }

    public string? ErrorMessage { get; }

    public dynamic? Contents { get; }
}

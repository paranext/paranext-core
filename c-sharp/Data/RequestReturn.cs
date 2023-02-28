namespace Paranext.DataProvider.Data;

public sealed record class RequestReturn
{
    /// <summary>
    /// Response when there was an error - no contents
    /// </summary>
    public RequestReturn(string errorMessage)
    {
        Success = false;
        ErrorMessage = errorMessage;
    }

    /// <summary>
    /// Response when successful
    /// </summary>
    public RequestReturn(dynamic? contents)
    {
        Success = true;
        Contents = contents;
    }

    public bool Success { get; }

    public string? ErrorMessage { get; }

    public dynamic? Contents { get; }
}

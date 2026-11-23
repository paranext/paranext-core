namespace Paranext.DataProvider.Users;

/// <summary>Status code and body of the Registry's answer to a token request.</summary>
/// <remarks>A class rather than a record, so no generated <c>ToString</c> can print a token.</remarks>
internal sealed class RegistryTokenHttpResponse(int statusCode, string body)
{
    public int StatusCode { get; } = statusCode;
    public string Body { get; } = body;
}

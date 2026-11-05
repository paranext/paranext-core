using System.Text.Json.Serialization;

namespace Paranext.DataProvider.Users;

/// <summary>
/// Result of the <c>requestRegistryTokens:getAccessToken</c> request: a token on success, or a
/// <see cref="PlatformErrorCodes"/> code and a message on an expected failure. Null members are left
/// off the wire, so TypeScript sees either <c>{ accessToken, expiresAt }</c> or
/// <c>{ errorCode, message }</c>.
/// </summary>
/// <remarks>
/// Failures are returned rather than thrown, a contract set while a code thrown from C# could not
/// reach the TypeScript caller. A thrown code now reaches it (see <see cref="PapiJsonRpc"/>).
/// TODO(PT-4884): throw <see cref="PlatformErrorCodes"/> exceptions instead, and drop the failure
/// members.
/// </remarks>
public sealed record RegistryAccessTokenResult(
    [property: JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)] string? AccessToken,
    [property: JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)] long? ExpiresAt,
    [property: JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)] string? ErrorCode,
    [property: JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)] string? Message
)
{
    public static RegistryAccessTokenResult Success(string accessToken, DateTimeOffset expiresAt) =>
        new(accessToken, expiresAt.ToUnixTimeMilliseconds(), null, null);

    public static RegistryAccessTokenResult Failure(string errorCode, string message) =>
        new(null, null, errorCode, message);

    [JsonIgnore]
    public bool IsSuccess => AccessToken != null;

    // The generated record ToString would print the token into any log line that formats a result.
    public override string ToString() =>
        IsSuccess
            ? $"{nameof(RegistryAccessTokenResult)} {{ ExpiresAt = {ExpiresAt} }}"
            : $"{nameof(RegistryAccessTokenResult)} {{ ErrorCode = {ErrorCode}, Message = {Message} }}";
}

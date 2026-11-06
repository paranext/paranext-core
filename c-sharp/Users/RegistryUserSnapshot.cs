namespace Paranext.DataProvider.Users;

/// <summary>
/// The registration and internet state a Registry token request depends on, read when the request
/// arrives.
/// </summary>
/// <remarks>A class rather than a record, so no generated <c>ToString</c> can print the code.</remarks>
internal sealed class RegistryUserSnapshot
{
    public required bool IsRegistered { get; init; }
    public required string UserName { get; init; }
    public required string RegistrationCode { get; init; }

    /// <summary>Registry base URL with scheme and no trailing slash.</summary>
    public required string RegistryUrl { get; init; }
    public required bool IsInternetDisabled { get; init; }
    public required bool IsVpnRequired { get; init; }
    public required bool IsConnected { get; init; }
}

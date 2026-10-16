namespace Paranext.DataProvider.Users;

/// <summary>Sends one token request to the Paratext Registry.</summary>
internal interface IRegistryTokenClient
{
    /// <summary>
    /// POSTs <paramref name="jsonBody"/> to <c>{registryUrl}/api8/token</c> with HTTP Basic auth.
    /// Returns the status and body of any HTTP response, including 4xx and 5xx. Throws only when no
    /// HTTP response arrives (connection failure, timeout).
    /// </summary>
    Task<RegistryTokenHttpResponse> PostTokenRequestAsync(
        string registryUrl,
        string userName,
        string registrationCode,
        string jsonBody
    );
}

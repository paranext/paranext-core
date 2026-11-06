using Paratext.Data;
using Paratext.Data.RegistryServerAccess;

namespace Paranext.DataProvider.Users;

/// <summary>
/// Sends Registry token requests through ParatextData's <see cref="RESTClient"/>, the same transport
/// and internet-access gate as ParatextData's other Registry calls.
/// </summary>
internal sealed class RestClientRegistryTokenClient : IRegistryTokenClient
{
    // Below the 30-second default PAPI request timeout, so the extension gets this service's answer
    // rather than a network-layer timeout.
    private const int TIMEOUT_MILLISECONDS = 20_000;

    public Task<RegistryTokenHttpResponse> PostTokenRequestAsync(
        string registryUrl,
        string userName,
        string registrationCode,
        string jsonBody
    ) =>
        // RESTClient is synchronous.
        Task.Run(() =>
        {
            // RESTClient joins its base URL and path by plain concatenation, so the base must end in '/'.
            var client = new RESTClient(registryUrl + "/api8/", ApplicationProduct.DefaultVersion)
            {
                Timeout = TIMEOUT_MILLISECONDS,
            };
            client.SetAuthentication(userName, registrationCode);
            try
            {
                string? body = client.PostJsonFormData(
                    new RESTClient.CgiCallOptions(),
                    "token",
                    jsonBody
                );
                return new RegistryTokenHttpResponse(200, body ?? "");
            }
            catch (HttpException ex)
            {
                return new RegistryTokenHttpResponse((int)ex.Code, ex.Body ?? "");
            }
        });
}

using System.Diagnostics.CodeAnalysis;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Text.Json.Nodes;

namespace Paranext.DataProvider.Users;

/// <summary>
/// Mints Paratext Registry access tokens for one named service (an RFC 8707 resource) from the
/// user's registration, for extensions that hold the <c>paratextRegistryToken</c> elevated
/// privilege. The registration code never leaves this process.
/// </summary>
/// <remarks>
/// The request type is outside the <c>command:</c> category, so extension code can't call it
/// directly; the extension host checks the caller's manifest before forwarding a request here.
/// </remarks>
internal sealed class RegistryAccessTokenService(
    PapiClient papiClient,
    IRegistryUserContext userContext,
    IRegistryTokenClient tokenClient,
    Func<DateTimeOffset> utcNow,
    TimeSpan? snapshotTimeout = null
)
{
    public const string REQUEST_TYPE = "paratextRegistryToken:getAccessToken";

    /// <summary>
    /// The only scopes this service requests. The Registry would also issue write scopes to a
    /// registration-code caller, so read-only is enforced here. Keep in sync with
    /// <c>RegistryReadScope</c> in <c>src/shared/models/paratext-registry-token-privilege.model.ts</c>.
    /// </summary>
    public static readonly IReadOnlySet<string> AllowedScopes = new HashSet<string>(
        StringComparer.Ordinal
    )
    {
        "projects.members:read",
        "projects:read",
        "projects.progress:read",
        "orgs:read",
        "users.org:read",
    };

    /// <summary>A cached token is handed out only while at least this much of its lifetime remains.</summary>
    public static readonly TimeSpan MinimumRemainingLifetime = TimeSpan.FromSeconds(120);

    /// <summary>
    /// How long a request waits for the registration and internet state before failing with
    /// <see cref="PlatformErrorCodes.Unavailable"/>. With the token request's own timeout in
    /// <see cref="RestClientRegistryTokenClient"/>, this keeps the whole answer under the 30-second
    /// default PAPI request timeout.
    /// </summary>
    public static readonly TimeSpan SnapshotTimeout = TimeSpan.FromSeconds(8);

    private readonly TimeSpan _snapshotTimeout = snapshotTimeout ?? SnapshotTimeout;
    private readonly object _lock = new();
    private readonly Dictionary<string, CachedToken> _cache = [];
    private readonly Dictionary<string, Task<RegistryAccessTokenResult>> _inFlight = [];

    private PapiClient PapiClient { get; } = papiClient;

    internal int CachedTokenCount
    {
        get
        {
            lock (_lock)
                return _cache.Count;
        }
    }

    public async Task InitializeAsync()
    {
        await PapiClient.RegisterRequestHandlerAsync(
            REQUEST_TYPE,
            new Func<string, string, string[]?, Task<RegistryAccessTokenResult>>(
                GetAccessTokenAsync
            )
        );
    }

    /// <summary>
    /// Returns a token for <paramref name="resource"/> carrying <paramref name="scope"/>, or a failure
    /// with a <see cref="PlatformErrorCodes"/> code. Never throws for an expected failure.
    /// </summary>
    internal async Task<RegistryAccessTokenResult> GetAccessTokenAsync(
        string extensionName,
        string resource,
        string[]? scope
    )
    {
        string[] scopes = (scope ?? [])
            .Distinct(StringComparer.Ordinal)
            .Order(StringComparer.Ordinal)
            .ToArray();
        // The wire can deliver null entries whatever the parameter's annotation says.
        foreach (string? candidate in scopes)
        {
            if (candidate is null || !AllowedScopes.Contains(candidate))
                return Fail(
                    extensionName,
                    resource,
                    PlatformErrorCodes.InvalidArgument,
                    $"Scope {(candidate is null ? "null" : $"'{candidate}'")} is not allowed. "
                        + "Allowed scopes: "
                        + $"{string.Join(", ", AllowedScopes.Order(StringComparer.Ordinal))}."
                );
        }
        if (string.IsNullOrWhiteSpace(resource))
            return Fail(
                extensionName,
                resource,
                PlatformErrorCodes.InvalidArgument,
                "A resource identifier is required."
            );

        RegistryUserSnapshot user;
        try
        {
            user = await userContext.GetSnapshotAsync().WaitAsync(_snapshotTimeout);
        }
        catch (TimeoutException)
        {
            return Fail(
                extensionName,
                resource,
                PlatformErrorCodes.Unavailable,
                "Checking the Internet & connectivity settings, including this computer's location, "
                    + "took too long."
            );
        }
        if (!user.IsRegistered)
            return Fail(
                extensionName,
                resource,
                PlatformErrorCodes.Unauthenticated,
                "There is no valid Paratext registration. The user must register before a Registry "
                    + "access token can be issued."
            );
        // Follows ParatextData's own rule for direct Registry calls such as registration: refuse
        // only when the effective status is Disabled. InternetServicesGate's stricter saved-setting
        // check covers Send/Receive and the DBL, not every Registry call.
        if (user.IsInternetDisabled)
            return Fail(
                extensionName,
                resource,
                PlatformErrorCodes.FailedPrecondition,
                user.IsVpnRequired
                    ? "\"Disable access to some Bible translation services\" is selected in Internet & "
                        + "connectivity settings, and this computer's location is restricted or "
                        + "could not be determined."
                    : "Internet access is turned off in Internet & connectivity settings."
            );
        if (!user.IsConnected)
            return Fail(
                extensionName,
                resource,
                PlatformErrorCodes.Unavailable,
                "There is no internet connection."
            );

        // The code's fingerprint makes a new registration code a new key, so a token minted with
        // the previous code is never handed out, or joined while in flight, after a change.
        string key = string.Join(
            '\n',
            user.RegistryUrl,
            user.UserName,
            Fingerprint(user.RegistrationCode),
            resource,
            string.Join(' ', scopes)
        );
        Task<RegistryAccessTokenResult> request;
        bool joined = false;
        lock (_lock)
        {
            PruneCache();
            if (_cache.TryGetValue(key, out CachedToken? cached))
            {
                // Once per extension per token, so the log names every extension holding a token
                // without a line per call.
                if (cached.AddRecipient(extensionName))
                    LogHandout(reused: true, extensionName, resource, scopes, cached.ExpiresAt);
                return RegistryAccessTokenResult.Success(cached.AccessToken, cached.ExpiresAt);
            }
            if (_inFlight.TryGetValue(key, out Task<RegistryAccessTokenResult>? existing))
            {
                request = existing;
                joined = true;
            }
            else
            {
                request = FetchAndCacheAsync(key, extensionName, user, resource, scopes);
                _inFlight[key] = request;
            }
        }

        RegistryAccessTokenResult result = await request;
        if (joined && result.IsSuccess)
        {
            lock (_lock)
            {
                if (
                    !_cache.TryGetValue(key, out CachedToken? cached)
                    || cached.AddRecipient(extensionName)
                )
                    LogHandout(
                        reused: true,
                        extensionName,
                        resource,
                        scopes,
                        DateTimeOffset.FromUnixTimeMilliseconds(result.ExpiresAt!.Value)
                    );
            }
        }
        return result;
    }

    // Caller holds _lock. Also drops tokens minted for a previous user, registration code or
    // Registry, whose keys are never looked up again.
    private void PruneCache()
    {
        DateTimeOffset now = utcNow();
        List<string> unusable = _cache
            .Where(entry => entry.Value.ExpiresAt - now < MinimumRemainingLifetime)
            .Select(entry => entry.Key)
            .ToList();
        foreach (string key in unusable)
            _cache.Remove(key);
    }

    private static void LogHandout(
        bool reused,
        string extensionName,
        string resource,
        string[] scopes,
        DateTimeOffset expiresAt
    ) =>
        Console.WriteLine(
            $"{(reused ? "Handed an already-issued" : "Issued a")} Registry access token to extension "
                + $"'{extensionName}' for resource '{resource}' "
                + $"(scopes: {(scopes.Length == 0 ? "none" : string.Join(' ', scopes))}), "
                + $"expiring {expiresAt:O}"
        );

    private async Task<RegistryAccessTokenResult> FetchAndCacheAsync(
        string key,
        string extensionName,
        RegistryUserSnapshot user,
        string resource,
        string[] scopes
    )
    {
        // Return to the caller first, so it records this task in _inFlight before a request that
        // completes synchronously could try to remove it.
        await Task.Yield();

        RegistryAccessTokenResult result;
        try
        {
            result = await RequestTokenAsync(extensionName, user, resource, scopes);
        }
        catch
        {
            lock (_lock)
                _inFlight.Remove(key);
            throw;
        }

        lock (_lock)
        {
            _inFlight.Remove(key);
            if (result.IsSuccess)
                _cache[key] = new CachedToken(
                    result.AccessToken!,
                    DateTimeOffset.FromUnixTimeMilliseconds(result.ExpiresAt!.Value),
                    extensionName
                );
        }
        return result;
    }

    // Keeps the registration code itself out of the long-lived cache keys.
    private static string Fingerprint(string registrationCode) =>
        Convert.ToHexString(SHA256.HashData(Encoding.UTF8.GetBytes(registrationCode)));

    /// <remarks>
    /// A class rather than a record, so no generated <c>ToString</c> can print the token. Only touched
    /// while holding <c>_lock</c>.
    /// </remarks>
    private sealed class CachedToken(
        string accessToken,
        DateTimeOffset expiresAt,
        string firstRecipient
    )
    {
        private readonly HashSet<string> _recipients =
            new(StringComparer.Ordinal) { firstRecipient };

        public string AccessToken { get; } = accessToken;
        public DateTimeOffset ExpiresAt { get; } = expiresAt;

        /// <returns>Whether <paramref name="extensionName"/> had not received this token before.</returns>
        public bool AddRecipient(string extensionName) => _recipients.Add(extensionName);
    }

    private async Task<RegistryAccessTokenResult> RequestTokenAsync(
        string extensionName,
        RegistryUserSnapshot user,
        string resource,
        string[] scopes
    )
    {
        var body = new JsonObject
        {
            ["grant_type"] = "client_credentials",
            ["resource"] = resource,
        };
        if (scopes.Length > 0)
            body["scope"] = string.Join(' ', scopes);

        DateTimeOffset sentAt = utcNow();
        RegistryTokenHttpResponse response;
        try
        {
            response = await tokenClient.PostTokenRequestAsync(
                user.RegistryUrl,
                user.UserName,
                user.RegistrationCode,
                body.ToJsonString()
            );
        }
        catch (Exception ex)
        {
            // Only the type name is logged: exception text from the HTTP stack is not ours to
            // vouch for, and must never reach the caller.
            return Fail(
                extensionName,
                resource,
                PlatformErrorCodes.Unavailable,
                "Could not reach the Paratext Registry.",
                ex.GetType().Name
            );
        }

        switch (response.StatusCode)
        {
            case 200:
                if (!TryReadToken(response.Body, out string? accessToken, out int expiresInSeconds))
                    return Fail(
                        extensionName,
                        resource,
                        PlatformErrorCodes.Unavailable,
                        "The Paratext Registry returned an unreadable token response."
                    );
                DateTimeOffset expiresAt = sentAt.AddSeconds(expiresInSeconds);
                LogHandout(reused: false, extensionName, resource, scopes, expiresAt);
                return RegistryAccessTokenResult.Success(accessToken, expiresAt);
            case 400:
                return Fail(
                    extensionName,
                    resource,
                    PlatformErrorCodes.InvalidArgument,
                    DescribeRejection(response.Body)
                );
            case 401
            or 403:
                return Fail(
                    extensionName,
                    resource,
                    PlatformErrorCodes.Unauthenticated,
                    $"The Paratext Registry did not accept this registration (HTTP {response.StatusCode})."
                );
            default:
                return Fail(
                    extensionName,
                    resource,
                    PlatformErrorCodes.Unavailable,
                    $"The Paratext Registry returned HTTP {response.StatusCode}."
                );
        }
    }

    private static RegistryAccessTokenResult Fail(
        string extensionName,
        string resource,
        string errorCode,
        string message,
        string? logDetail = null
    )
    {
        Console.WriteLine(
            $"Registry access token request from extension '{extensionName}' for resource "
                + $"'{resource}' failed: {errorCode}: {message}"
                + (logDetail == null ? "" : $" ({logDetail})")
        );
        return RegistryAccessTokenResult.Failure(errorCode, message);
    }

    private static bool TryReadToken(
        string body,
        [NotNullWhen(true)] out string? accessToken,
        out int expiresInSeconds
    )
    {
        accessToken = null;
        expiresInSeconds = 0;
        using JsonDocument? document = TryParse(body);
        if (document is null || document.RootElement.ValueKind != JsonValueKind.Object)
            return false;
        JsonElement root = document.RootElement;
        if (
            !root.TryGetProperty("access_token", out JsonElement token)
            || token.ValueKind != JsonValueKind.String
            || !root.TryGetProperty("expires_in", out JsonElement expiresIn)
            || expiresIn.ValueKind != JsonValueKind.Number
            || !expiresIn.TryGetInt32(out expiresInSeconds)
            || expiresInSeconds <= 0
        )
            return false;
        accessToken = token.GetString();
        return !string.IsNullOrEmpty(accessToken);
    }

    private static string DescribeRejection(string body)
    {
        const string prefix = "The Paratext Registry rejected the token request";
        using JsonDocument? document = TryParse(body);
        if (
            document is not null
            && document.RootElement.ValueKind == JsonValueKind.Object
            && document.RootElement.TryGetProperty("error", out JsonElement error)
            && error.ValueKind == JsonValueKind.String
        )
        {
            string description =
                document.RootElement.TryGetProperty("error_description", out JsonElement detail)
                && detail.ValueKind == JsonValueKind.String
                    ? $" ({detail.GetString()})"
                    : "";
            return $"{prefix}: {error.GetString()}{description}.";
        }
        return $"{prefix} (HTTP 400).";
    }

    private static JsonDocument? TryParse(string body)
    {
        try
        {
            return JsonDocument.Parse(body);
        }
        catch (JsonException)
        {
            return null;
        }
    }
}

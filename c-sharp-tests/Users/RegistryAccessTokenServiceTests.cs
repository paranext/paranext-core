using System.Diagnostics.CodeAnalysis;
using System.Text.Json;
using System.Text.RegularExpressions;
using Paranext.DataProvider;
using Paranext.DataProvider.JsonUtils;
using Paranext.DataProvider.Users;

namespace TestParanextDataProvider.Users;

[TestFixture]
[ExcludeFromCodeCoverage]
internal class RegistryAccessTokenServiceTests : PapiTestBase
{
    private const string RESOURCE = "https://assistant-dev.example.org";
    private const string OTHER_RESOURCE = "https://other.example.org";
    private const string CANARY_CODE = "CANARY-REGISTRATION-CODE-7f3a";
    private const string OTHER_CANARY_CODE = "CANARY-REGISTRATION-CODE-b20c";
    private const string CANARY_TOKEN = "CANARY-ACCESS-TOKEN-91bd";
    private static readonly DateTimeOffset s_t0 = new(2026, 10, 16, 12, 0, 0, TimeSpan.Zero);

    private DateTimeOffset _now;
    private FakeUserContext _userContext = null!;
    private FakeTokenClient _tokenClient = null!;
    private RegistryAccessTokenService _service = null!;
    private TextWriter _originalOut = null!;
    private TextWriter _originalError = null!;
    private StringWriter _capturedOut = null!;
    private StringWriter _capturedError = null!;

    [SetUp]
    public override async Task TestSetupAsync()
    {
        await base.TestSetupAsync();
        // Safe because no [Parallelizable] exists anywhere in c-sharp-tests.
        _originalOut = Console.Out;
        _originalError = Console.Error;
        _capturedOut = new StringWriter();
        _capturedError = new StringWriter();
        Console.SetOut(_capturedOut);
        Console.SetError(_capturedError);

        _now = s_t0;
        _userContext = new FakeUserContext();
        _tokenClient = new FakeTokenClient();
        _service = new RegistryAccessTokenService(Client, _userContext, _tokenClient, () => _now);
        await _service.InitializeAsync();
    }

    [TearDown]
    public override void TestTearDown()
    {
        Console.SetOut(_originalOut);
        Console.SetError(_originalError);
        base.TestTearDown();
        // Every test doubles as a check that nothing secret reached the log.
        string logged = _capturedOut.ToString() + _capturedError.ToString();
        _capturedOut.Dispose();
        _capturedError.Dispose();
        Assert.That(logged, Does.Not.Contain(CANARY_CODE));
        Assert.That(logged, Does.Not.Contain(OTHER_CANARY_CODE));
        Assert.That(logged, Does.Not.Contain(CANARY_TOKEN));
    }

    #region Request and response

    [Test]
    public void InitializeAsync_RegistersTheRequestType()
    {
        Assert.That(Client.IsHandlerRegistered(RegistryAccessTokenService.REQUEST_TYPE), Is.True);
        Assert.That(
            RegistryAccessTokenService.REQUEST_TYPE,
            Is.EqualTo("requestRegistryTokens:getAccessToken")
        );
    }

    [Test]
    public void AllowedScopes_AreTheFiveReadScopes()
    {
        // REGISTRY_READ_SCOPES in src/shared/models/request-registry-tokens-privilege.model.ts pins
        // the same list, so a scope added on only one side breaks one of the two tests.
        Assert.That(
            RegistryAccessTokenService.AllowedScopes,
            Is.EquivalentTo(
                new[]
                {
                    "projects.members:read",
                    "projects:read",
                    "projects.progress:read",
                    "orgs:read",
                    "users.org:read",
                }
            )
        );
    }

    [Test]
    public async Task Handler_ReturnsTokenAndExpiryFromTheRegistry()
    {
        var result = await (Task<RegistryAccessTokenResult>)
            Client.InvokeRequestHandler(
                RegistryAccessTokenService.REQUEST_TYPE,
                "assistant",
                RESOURCE,
                new[] { "projects.members:read" }
            )!;

        Assert.That(result.AccessToken, Is.EqualTo(CANARY_TOKEN));
        Assert.That(result.ExpiresAt, Is.EqualTo(s_t0.AddSeconds(1200).ToUnixTimeMilliseconds()));
        Assert.That(result.ErrorCode, Is.Null);
        // Positive control for the TearDown canary sweep: the capture does see this service's log.
        Assert.That(_capturedOut.ToString(), Does.Contain("Issued a Registry access token"));
    }

    [Test]
    public async Task Request_PostsClientCredentialsWithBasicAuthAndSortedScopes()
    {
        await Get(["projects.members:read", "orgs:read"]);

        PostedRequest post = _tokenClient.Posts.Single();
        Assert.That(post.RegistryUrl, Is.EqualTo("https://registry-dev.paratext.org"));
        Assert.That(post.UserName, Is.EqualTo("Test User"));
        Assert.That(post.RegistrationCode, Is.EqualTo(CANARY_CODE));
        using JsonDocument body = JsonDocument.Parse(post.JsonBody);
        Assert.That(
            body.RootElement.GetProperty("grant_type").GetString(),
            Is.EqualTo("client_credentials")
        );
        Assert.That(body.RootElement.GetProperty("resource").GetString(), Is.EqualTo(RESOURCE));
        Assert.That(
            body.RootElement.GetProperty("scope").GetString(),
            Is.EqualTo("orgs:read projects.members:read")
        );
    }

    [Test]
    public async Task Request_LeavesScopeOutWhenNoneRequested()
    {
        await Get([]);
        await _service.GetAccessTokenAsync("assistant", OTHER_RESOURCE, null);

        foreach (PostedRequest post in _tokenClient.Posts)
        {
            using JsonDocument body = JsonDocument.Parse(post.JsonBody);
            Assert.That(body.RootElement.TryGetProperty("scope", out _), Is.False);
        }
    }

    [Test]
    public void Result_SerializesOnlyTheMembersOfItsShape()
    {
        var options = SerializationOptions.CreateSerializationOptions();

        string success = JsonSerializer.Serialize(
            RegistryAccessTokenResult.Success("t", s_t0),
            options
        );
        string failure = JsonSerializer.Serialize(
            RegistryAccessTokenResult.Failure(PlatformErrorCodes.Unavailable, "m"),
            options
        );

        Assert.That(
            success,
            Is.EqualTo($$"""{"accessToken":"t","expiresAt":{{s_t0.ToUnixTimeMilliseconds()}}}""")
        );
        Assert.That(failure, Is.EqualTo("""{"errorCode":"UNAVAILABLE","message":"m"}"""));
    }

    [Test]
    public void Result_ToStringNeverIncludesTheToken()
    {
        Assert.That(
            RegistryAccessTokenResult.Success(CANARY_TOKEN, s_t0).ToString(),
            Does.Not.Contain(CANARY_TOKEN)
        );
    }

    #endregion

    #region Failures

    [TestCase("projects:write")]
    [TestCase("projects")]
    [TestCase("data_access")]
    [TestCase("openid")]
    public async Task DisallowedScope_FailsWithInvalidArgumentWithoutCallingTheRegistry(
        string scope
    )
    {
        var result = await Get(["orgs:read", scope]);

        AssertFailure(result, PlatformErrorCodes.InvalidArgument);
        Assert.That(result.Message, Does.Contain(scope));
        Assert.That(_tokenClient.PostCount, Is.Zero);
    }

    // JavaScript `[undefined]` arrives as `[null]`.
    private static readonly string?[][] s_scopesWithANullEntry =
    [
        [null],
        [null, "orgs:read"],
    ];

    [TestCaseSource(nameof(s_scopesWithANullEntry))]
    public async Task NullScopeEntry_FailsWithInvalidArgumentWithoutCallingTheRegistry(
        string?[] scope
    )
    {
        var result = await _service.GetAccessTokenAsync("assistant", RESOURCE, scope!);

        AssertFailure(result, PlatformErrorCodes.InvalidArgument);
        Assert.That(_tokenClient.PostCount, Is.Zero);
    }

    [TestCase("")]
    [TestCase("   ")]
    public async Task BlankResource_FailsWithInvalidArgumentWithoutCallingTheRegistry(
        string resource
    )
    {
        var result = await _service.GetAccessTokenAsync("assistant", resource, ["orgs:read"]);

        AssertFailure(result, PlatformErrorCodes.InvalidArgument);
        Assert.That(_tokenClient.PostCount, Is.Zero);
    }

    [Test]
    public async Task NotRegistered_FailsWithUnauthenticatedWithoutCallingTheRegistry()
    {
        _userContext.Snapshot = ValidUser(isRegistered: false);

        AssertFailure(await Get(), PlatformErrorCodes.Unauthenticated);
        Assert.That(_tokenClient.PostCount, Is.Zero);
    }

    [Test]
    public async Task InternetTurnedOff_FailsWithFailedPreconditionWithoutCallingTheRegistry()
    {
        _userContext.Snapshot = ValidUser(isInternetDisabled: true);

        var result = await Get();

        AssertFailure(result, PlatformErrorCodes.FailedPrecondition);
        Assert.That(
            result.Message,
            Does.Contain("turned off").And.Not.Contain("Bible translation services")
        );
        Assert.That(_tokenClient.PostCount, Is.Zero);
    }

    [Test]
    public async Task VpnRequiredInARestrictedLocation_FailsWithFailedPreconditionNamingTheSetting()
    {
        _userContext.Snapshot = ValidUser(isInternetDisabled: true, isVpnRequired: true);

        var result = await Get();

        AssertFailure(result, PlatformErrorCodes.FailedPrecondition);
        Assert.That(
            result.Message,
            Does.Contain("Disable access to some Bible translation services")
                .And.Not.Contain("turned off")
        );
        Assert.That(_tokenClient.PostCount, Is.Zero);
    }

    [Test]
    public async Task VpnRequiredInAnUnrestrictedLocation_GetsAToken()
    {
        _userContext.Snapshot = ValidUser(isVpnRequired: true);

        Assert.That((await Get()).AccessToken, Is.EqualTo(CANARY_TOKEN));
    }

    [Test]
    public async Task NoConnection_FailsWithUnavailableWithoutCallingTheRegistry()
    {
        _userContext.Snapshot = ValidUser(isConnected: false);

        AssertFailure(await Get(), PlatformErrorCodes.Unavailable);
        Assert.That(_tokenClient.PostCount, Is.Zero);
    }

    [Test]
    public async Task SnapshotThatNeverCompletes_FailsWithUnavailableWithoutCallingTheRegistry()
    {
        _userContext.Pending = new TaskCompletionSource<RegistryUserSnapshot>().Task;
        var service = new RegistryAccessTokenService(
            Client,
            _userContext,
            _tokenClient,
            () => _now,
            TimeSpan.FromMilliseconds(50)
        );

        Task<RegistryAccessTokenResult> call = service.GetAccessTokenAsync(
            "assistant",
            RESOURCE,
            ["projects.members:read"]
        );

        Assert.That(
            await Task.WhenAny(call, Task.Delay(TimeSpan.FromSeconds(5))),
            Is.SameAs(call),
            "The request should stop waiting for the snapshot"
        );
        AssertFailure(await call, PlatformErrorCodes.Unavailable);
        Assert.That(_tokenClient.PostCount, Is.Zero);
    }

    [Test]
    public async Task SnapshotThatThrows_FailsWithUnavailableAndLogsTheRequest()
    {
        _userContext.Pending = Task.FromException<RegistryUserSnapshot>(
            new ApplicationException($"undefined server type near {CANARY_CODE}")
        );

        var result = await Get();

        AssertFailure(result, PlatformErrorCodes.Unavailable);
        Assert.That(result.Message, Does.Not.Contain("undefined server type"));
        Assert.That(_tokenClient.PostCount, Is.Zero);
        Assert.That(
            _capturedOut.ToString(),
            Does.Contain("extension 'assistant'")
                .And.Contain($"resource '{RESOURCE}'")
                .And.Contain(nameof(ApplicationException))
                .And.Not.Contain("undefined server type")
        );
    }

    [Test]
    public async Task Registry400_FailsWithInvalidArgumentNamingTheRegistryError()
    {
        _tokenClient.Default = () =>
            Task.FromResult(
                new RegistryTokenHttpResponse(
                    400,
                    """{"error":"invalid_target","error_description":"unknown resource"}"""
                )
            );

        var result = await Get();

        AssertFailure(result, PlatformErrorCodes.InvalidArgument);
        Assert.That(result.Message, Does.Contain("invalid_target").And.Contain("unknown resource"));
    }

    [Test]
    public async Task Registry400WithoutJson_FailsWithInvalidArgument()
    {
        _tokenClient.Default = () =>
            Task.FromResult(new RegistryTokenHttpResponse(400, "Bad Request"));

        var result = await Get();

        AssertFailure(result, PlatformErrorCodes.InvalidArgument);
        Assert.That(result.Message, Does.Contain("HTTP 400"));
    }

    [Test]
    public async Task Registry401_FailsWithUnauthenticated()
    {
        _tokenClient.Default = () => Task.FromResult(new RegistryTokenHttpResponse(401, ""));

        AssertFailure(await Get(), PlatformErrorCodes.Unauthenticated);
    }

    [Test]
    public async Task Registry403_FailsWithPermissionDeniedWithoutBlamingTheRegistration()
    {
        _tokenClient.Default = () => Task.FromResult(new RegistryTokenHttpResponse(403, ""));

        var result = await Get();

        AssertFailure(result, PlatformErrorCodes.PermissionDenied);
        Assert.That(result.Message, Does.Contain("HTTP 403").And.Not.Contain("registration"));
    }

    [TestCase(404)]
    [TestCase(500)]
    [TestCase(503)]
    public async Task OtherRegistryStatus_FailsWithUnavailable(int status)
    {
        _tokenClient.Default = () => Task.FromResult(new RegistryTokenHttpResponse(status, ""));

        var result = await Get();

        AssertFailure(result, PlatformErrorCodes.Unavailable);
        Assert.That(result.Message, Does.Contain($"HTTP {status}"));
    }

    [TestCase("<html>captive portal</html>")]
    [TestCase("[]")]
    [TestCase("{}")]
    [TestCase("""{"access_token":"t"}""")]
    [TestCase("""{"access_token":"","expires_in":1200}""")]
    [TestCase("""{"access_token":"t","expires_in":"1200"}""")]
    [TestCase("""{"access_token":"t","expires_in":0}""")]
    public async Task UnreadableTokenResponse_FailsWithUnavailable(string body)
    {
        _tokenClient.Default = () => Task.FromResult(new RegistryTokenHttpResponse(200, body));

        AssertFailure(await Get(), PlatformErrorCodes.Unavailable);
    }

    [Test]
    public async Task ClientException_FailsWithUnavailableWithoutItsText()
    {
        _tokenClient.Default = () =>
            throw new InvalidOperationException($"socket error while sending {CANARY_CODE}");

        var result = await Get();

        AssertFailure(result, PlatformErrorCodes.Unavailable);
        Assert.That(result.Message, Does.Not.Contain("socket error"));
        Assert.That(
            _capturedOut.ToString(),
            Does.Contain(nameof(InvalidOperationException)).And.Not.Contain("socket error")
        );
    }

    #endregion

    #region Caching

    [Test]
    public async Task SecondCall_ReusesTheCachedToken()
    {
        var first = await Get();
        _now = s_t0.AddSeconds(600);
        var second = await Get();

        Assert.That(_tokenClient.PostCount, Is.EqualTo(1));
        Assert.That(second, Is.EqualTo(first));
    }

    [Test]
    public async Task TokenWithExactlyTwoMinutesLeft_IsStillReused()
    {
        await Get();
        _now = s_t0.AddSeconds(1200 - 120);
        await Get();

        Assert.That(_tokenClient.PostCount, Is.EqualTo(1));
    }

    [Test]
    public async Task TokenWithLessThanTwoMinutesLeft_IsReplaced()
    {
        await Get();
        _now = s_t0.AddSeconds(1200 - 119);
        var second = await Get();

        Assert.That(_tokenClient.PostCount, Is.EqualTo(2));
        Assert.That(second.ExpiresAt, Is.EqualTo(_now.AddSeconds(1200).ToUnixTimeMilliseconds()));
    }

    [Test]
    public async Task DifferentResourceOrScopes_GetTheirOwnTokens()
    {
        await Get(["orgs:read"]);
        await Get(["orgs:read"], OTHER_RESOURCE);
        await Get(["projects:read"]);

        Assert.That(_tokenClient.PostCount, Is.EqualTo(3));
    }

    [Test]
    public async Task ScopeOrderAndDuplicates_ShareOneToken()
    {
        await Get(["projects:read", "orgs:read", "orgs:read"]);
        await Get(["orgs:read", "projects:read"]);

        Assert.That(_tokenClient.PostCount, Is.EqualTo(1));
        using JsonDocument body = JsonDocument.Parse(_tokenClient.Posts.Single().JsonBody);
        Assert.That(
            body.RootElement.GetProperty("scope").GetString(),
            Is.EqualTo("orgs:read projects:read")
        );
    }

    [Test]
    public async Task DifferentUserOrRegistry_GetTheirOwnTokens()
    {
        await Get();
        _userContext.Snapshot = ValidUser(userName: "Another User");
        await Get();
        _userContext.Snapshot = ValidUser(registryUrl: "https://registry.paratext.org");
        await Get();

        Assert.That(_tokenClient.PostCount, Is.EqualTo(3));
    }

    [Test]
    public async Task ConcurrentCallers_ShareOneRequest()
    {
        var gate = new TaskCompletionSource<RegistryTokenHttpResponse>(
            TaskCreationOptions.RunContinuationsAsynchronously
        );
        _tokenClient.Default = () => gate.Task;

        Task<RegistryAccessTokenResult> first = Get();
        Task<RegistryAccessTokenResult> second = Get();
        await WaitForPostsAsync(1);
        gate.SetResult(TokenResponse(CANARY_TOKEN, 1200));
        RegistryAccessTokenResult[] results = await Task.WhenAll(first, second);

        Assert.That(_tokenClient.PostCount, Is.EqualTo(1));
        Assert.That(results[0].AccessToken, Is.EqualTo(CANARY_TOKEN));
        Assert.That(results[1], Is.EqualTo(results[0]));
    }

    [Test]
    public async Task FailedRequest_IsNotCached()
    {
        _tokenClient.Responses.Enqueue(
            () => Task.FromResult(new RegistryTokenHttpResponse(500, ""))
        );

        AssertFailure(await Get(), PlatformErrorCodes.Unavailable);
        var second = await Get();

        Assert.That(second.AccessToken, Is.EqualTo(CANARY_TOKEN));
        Assert.That(_tokenClient.PostCount, Is.EqualTo(2));
    }

    [Test]
    public async Task UnreadableSuccessResponse_IsNotCached()
    {
        _tokenClient.Responses.Enqueue(
            () => Task.FromResult(new RegistryTokenHttpResponse(200, "<html>portal</html>"))
        );

        AssertFailure(await Get(), PlatformErrorCodes.Unavailable);
        var second = await Get();

        Assert.That(second.AccessToken, Is.EqualTo(CANARY_TOKEN));
        Assert.That(_tokenClient.PostCount, Is.EqualTo(2));
    }

    [Test]
    public async Task RegistrationCodeChange_ForTheSameUser_GetsANewToken()
    {
        await Get();
        _userContext.Snapshot = ValidUser(registrationCode: OTHER_CANARY_CODE);
        await Get();

        Assert.That(
            _tokenClient.Posts.Select(post => post.RegistrationCode),
            Is.EqualTo(new[] { CANARY_CODE, OTHER_CANARY_CODE })
        );
    }

    [Test]
    public async Task RegistrationChangeDuringARequest_DoesNotCacheTheOldToken()
    {
        var gate = new TaskCompletionSource<RegistryTokenHttpResponse>(
            TaskCreationOptions.RunContinuationsAsynchronously
        );
        _tokenClient.Responses.Enqueue(() => gate.Task);

        Task<RegistryAccessTokenResult> inFlight = Get();
        await WaitForPostsAsync(1);
        _userContext.Snapshot = ValidUser(registrationCode: OTHER_CANARY_CODE);
        gate.SetResult(TokenResponse("token-from-old-registration", 1200));

        // The caller that asked before the change still gets its answer...
        Assert.That((await inFlight).AccessToken, Is.EqualTo("token-from-old-registration"));
        // ...but it is not handed to anyone asking after the change.
        var next = await Get();
        Assert.That(next.AccessToken, Is.EqualTo(CANARY_TOKEN));
        Assert.That(_tokenClient.PostCount, Is.EqualTo(2));
    }

    [Test]
    public async Task RegistrationChangeDuringARequest_LaterCallersStartANewRequest()
    {
        var gate = new TaskCompletionSource<RegistryTokenHttpResponse>(
            TaskCreationOptions.RunContinuationsAsynchronously
        );
        _tokenClient.Responses.Enqueue(() => gate.Task);

        Task<RegistryAccessTokenResult> before = Get();
        await WaitForPostsAsync(1);
        _userContext.Snapshot = ValidUser(registrationCode: OTHER_CANARY_CODE);
        Task<RegistryAccessTokenResult> after = Get();
        gate.SetResult(TokenResponse("token-from-old-registration", 1200));

        Assert.That((await after).AccessToken, Is.EqualTo(CANARY_TOKEN));
        Assert.That((await before).AccessToken, Is.EqualTo("token-from-old-registration"));
        Assert.That(_tokenClient.PostCount, Is.EqualTo(2));
    }

    [Test]
    public async Task RegistryLifetimeShorterThanTheReuseMargin_ReturnsTheTokenAndRefetchesNextTime()
    {
        _tokenClient.Default = () => Task.FromResult(TokenResponse(CANARY_TOKEN, 60));

        var first = await Get();
        await Get();

        Assert.That(first.AccessToken, Is.EqualTo(CANARY_TOKEN));
        Assert.That(first.ExpiresAt, Is.EqualTo(s_t0.AddSeconds(60).ToUnixTimeMilliseconds()));
        Assert.That(_tokenClient.PostCount, Is.EqualTo(2));
    }

    [Test]
    public async Task TokensThatCanNoLongerBeHandedOut_AreDroppedOnTheNextRequest()
    {
        await Get();
        _now = s_t0.AddSeconds(600);
        await Get(resource: OTHER_RESOURCE);
        // RESOURCE's token now has 119 seconds left, so it can't be handed out; OTHER_RESOURCE's can.
        _now = s_t0.AddSeconds(1200 - 119);
        await Get(resource: OTHER_RESOURCE);

        Assert.That(_tokenClient.PostCount, Is.EqualTo(2));
        Assert.That(_service.CachedTokenCount, Is.EqualTo(1));
    }

    #endregion

    #region Handout log

    [Test]
    public async Task CachedTokenForAnotherExtension_IsLoggedUnderThatExtensionsName()
    {
        await Get();
        await _service.GetAccessTokenAsync("other-extension", RESOURCE, ["projects.members:read"]);

        Assert.That(_tokenClient.PostCount, Is.EqualTo(1));
        Assert.That(_capturedOut.ToString(), Does.Contain("extension 'other-extension'"));
    }

    [Test]
    public async Task JoinedRequestFromAnotherExtension_IsLoggedUnderThatExtensionsName()
    {
        var gate = new TaskCompletionSource<RegistryTokenHttpResponse>(
            TaskCreationOptions.RunContinuationsAsynchronously
        );
        _tokenClient.Default = () => gate.Task;

        Task<RegistryAccessTokenResult> first = Get();
        Task<RegistryAccessTokenResult> joined = _service.GetAccessTokenAsync(
            "other-extension",
            RESOURCE,
            ["projects.members:read"]
        );
        await WaitForPostsAsync(1);
        gate.SetResult(TokenResponse(CANARY_TOKEN, 1200));
        await Task.WhenAll(first, joined);

        Assert.That(_tokenClient.PostCount, Is.EqualTo(1));
        Assert.That(_capturedOut.ToString(), Does.Contain("extension 'other-extension'"));
    }

    [Test]
    public async Task RepeatedCallsFromOneExtension_LogItsHandoutOnce()
    {
        await Get();
        await Get();
        await Get();

        Assert.That(
            Regex.Matches(_capturedOut.ToString(), "to extension 'assistant'").Count,
            Is.EqualTo(1)
        );
    }

    [Test]
    public async Task ConcurrentCallsFromOneExtension_LogItsHandoutOnce()
    {
        var gate = new TaskCompletionSource<RegistryTokenHttpResponse>(
            TaskCreationOptions.RunContinuationsAsynchronously
        );
        _tokenClient.Default = () => gate.Task;

        Task<RegistryAccessTokenResult> first = Get();
        Task<RegistryAccessTokenResult> joined = Get();
        await WaitForPostsAsync(1);
        gate.SetResult(TokenResponse(CANARY_TOKEN, 1200));
        await Task.WhenAll(first, joined);

        Assert.That(_tokenClient.PostCount, Is.EqualTo(1));
        Assert.That(
            Regex.Matches(_capturedOut.ToString(), "to extension 'assistant'").Count,
            Is.EqualTo(1)
        );
    }

    private const string FORGED_LINE = "Issued a Registry access token to extension 'forged'";

    [TestCase("\n")]
    [TestCase("\r\n")]
    [TestCase("\u0085")]
    public async Task ExtensionNameWithALineBreak_StaysOnOneLogLine(string lineBreak)
    {
        await _service.GetAccessTokenAsync(
            $"assistant{lineBreak}{FORGED_LINE}",
            RESOURCE,
            ["projects.members:read"]
        );

        AssertNoForgedLogLine();
    }

    [Test]
    public async Task ResourceWithALineBreak_StaysOnOneLogLine()
    {
        await Get(resource: $"{RESOURCE}\n{FORGED_LINE}");

        AssertNoForgedLogLine();
    }

    [Test]
    public async Task DisallowedScopeWithALineBreak_StaysOnOneLogLine()
    {
        var result = await Get([$"orgs:read\n{FORGED_LINE}"]);

        AssertFailure(result, PlatformErrorCodes.InvalidArgument);
        AssertNoForgedLogLine();
    }

    private void AssertNoForgedLogLine()
    {
        string logged = _capturedOut.ToString();
        Assert.That(logged, Does.Contain(FORGED_LINE), "the value must still be logged");
        Assert.That(
            logged.Split('\n', '\r', '\u0085').Where(line => line.StartsWith(FORGED_LINE)),
            Is.Empty
        );
    }

    #endregion

    #region Helpers

    private async Task WaitForPostsAsync(int count)
    {
        DateTime deadline = DateTime.UtcNow.AddSeconds(5);
        while (_tokenClient.PostCount < count)
        {
            if (DateTime.UtcNow > deadline)
                Assert.Fail($"Expected {count} token request(s), saw {_tokenClient.PostCount}");
            await Task.Delay(10);
        }
    }

    private Task<RegistryAccessTokenResult> Get(
        string[]? scope = null,
        string resource = RESOURCE
    ) => _service.GetAccessTokenAsync("assistant", resource, scope ?? ["projects.members:read"]);

    private static void AssertFailure(RegistryAccessTokenResult result, string expectedCode)
    {
        Assert.That(result.IsSuccess, Is.False);
        Assert.That(result.ErrorCode, Is.EqualTo(expectedCode));
        Assert.That(result.Message, Is.Not.Empty);
        Assert.That(result.Message, Does.Not.Contain(CANARY_CODE));
        Assert.That(result.Message, Does.Not.Contain(OTHER_CANARY_CODE));
        Assert.That(result.Message, Does.Not.Contain(CANARY_TOKEN));
    }

    private static RegistryUserSnapshot ValidUser(
        bool isRegistered = true,
        bool isInternetDisabled = false,
        bool isVpnRequired = false,
        bool isConnected = true,
        string userName = "Test User",
        string registrationCode = CANARY_CODE,
        string registryUrl = "https://registry-dev.paratext.org"
    ) =>
        new()
        {
            IsRegistered = isRegistered,
            UserName = userName,
            RegistrationCode = registrationCode,
            RegistryUrl = registryUrl,
            IsInternetDisabled = isInternetDisabled,
            IsVpnRequired = isVpnRequired,
            IsConnected = isConnected,
        };

    private static RegistryTokenHttpResponse TokenResponse(string token, int expiresIn) =>
        new(
            200,
            $$"""{"access_token":"{{token}}","token_type":"Bearer","expires_in":{{expiresIn}}}"""
        );

    private sealed record PostedRequest(
        string RegistryUrl,
        string UserName,
        string RegistrationCode,
        string JsonBody
    );

    private sealed class FakeUserContext : IRegistryUserContext
    {
        public RegistryUserSnapshot Snapshot { get; set; } = ValidUser();

        /// <summary>When set, returned in place of <see cref="Snapshot"/>.</summary>
        public Task<RegistryUserSnapshot>? Pending { get; set; }

        // Completes synchronously unless Pending is set, so a call runs straight through to its
        // in-flight request and concurrency tests are deterministic.
        public Task<RegistryUserSnapshot> GetSnapshotAsync() =>
            Pending ?? Task.FromResult(Snapshot);
    }

    private sealed class FakeTokenClient : IRegistryTokenClient
    {
        private readonly List<PostedRequest> _posts = [];

        public Func<Task<RegistryTokenHttpResponse>> Default { get; set; } =
            () => Task.FromResult(TokenResponse(CANARY_TOKEN, 1200));

        public Queue<Func<Task<RegistryTokenHttpResponse>>> Responses { get; } = new();

        public IReadOnlyList<PostedRequest> Posts
        {
            get
            {
                lock (_posts)
                    return [.. _posts];
            }
        }

        public int PostCount
        {
            get
            {
                lock (_posts)
                    return _posts.Count;
            }
        }

        public Task<RegistryTokenHttpResponse> PostTokenRequestAsync(
            string registryUrl,
            string userName,
            string registrationCode,
            string jsonBody
        )
        {
            Func<Task<RegistryTokenHttpResponse>> respond;
            lock (_posts)
            {
                _posts.Add(new PostedRequest(registryUrl, userName, registrationCode, jsonBody));
                respond = Responses.Count > 0 ? Responses.Dequeue() : Default;
            }
            return respond();
        }
    }

    #endregion
}

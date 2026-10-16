using System.Diagnostics.CodeAnalysis;
using System.Net;
using System.Net.Sockets;
using System.Text;
using Paranext.DataProvider.Users;
using Paratext.Data;

namespace TestParanextDataProvider.Users;

/// <summary>
/// Runs <see cref="RestClientRegistryTokenClient"/> against a local HTTP listener. ParatextData checks
/// the machine's internet setting before every request, even one to localhost, so these tests are
/// skipped where that setting blocks requests. The listener uses <c>localhost</c> because Windows
/// lets a non-administrator listen there but not on <c>127.0.0.1</c>.
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
internal class RestClientRegistryTokenClientTests
{
    private const string USER_NAME = "Test User";
    private const string MADE_UP_CODE = "NOT-A-REAL-REGISTRATION-CODE";
    private const string REQUEST_BODY = """{"grant_type":"client_credentials"}""";

    private HttpListener _listener = null!;
    private string _registryUrl = null!;

    [SetUp]
    public void SetUp()
    {
        if (InternetAccess.Status == InternetUse.Disabled)
            Assert.Ignore("This machine's internet setting blocks every ParatextData request.");

        _registryUrl = $"http://localhost:{GetFreePort()}";
        _listener = new HttpListener();
        _listener.Prefixes.Add(_registryUrl + "/");
        _listener.Start();
    }

    [TearDown]
    public void TearDown() => _listener?.Close();

    [Test]
    public async Task PostsTheJsonBodyToTheTokenEndpointWithBasicAuth()
    {
        const string tokenResponse = """{"access_token":"t","expires_in":1200}""";
        Task<ReceivedRequest> received = RespondOnceAsync(200, tokenResponse);

        RegistryTokenHttpResponse response = await Post();

        ReceivedRequest request = await received;
        Assert.That(request.Method, Is.EqualTo("POST"));
        Assert.That(request.Path, Is.EqualTo("/api8/token"));
        Assert.That(request.ContentType, Does.StartWith("application/json"));
        Assert.That(
            request.Authorization,
            Is.EqualTo(
                "Basic "
                    + Convert.ToBase64String(Encoding.UTF8.GetBytes($"{USER_NAME}:{MADE_UP_CODE}"))
            )
        );
        Assert.That(request.Body, Is.EqualTo(REQUEST_BODY));
        Assert.That(response.StatusCode, Is.EqualTo(200));
        Assert.That(response.Body, Is.EqualTo(tokenResponse));
    }

    [TestCase(400, """{"error":"invalid_target"}""")]
    [TestCase(401, "")]
    [TestCase(503, "Service Unavailable")]
    public async Task ReturnsAnErrorStatusAndItsBodyRatherThanThrowing(int status, string body)
    {
        Task<ReceivedRequest> received = RespondOnceAsync(status, body);

        RegistryTokenHttpResponse response = await Post();

        await received;
        Assert.That(response.StatusCode, Is.EqualTo(status));
        Assert.That(response.Body, Is.EqualTo(body));
    }

    [Test]
    public void ThrowsWhenNothingAnswers()
    {
        _listener.Close();

        Assert.That(Post, Throws.InstanceOf<Exception>());
    }

    private Task<RegistryTokenHttpResponse> Post() =>
        new RestClientRegistryTokenClient().PostTokenRequestAsync(
            _registryUrl,
            USER_NAME,
            MADE_UP_CODE,
            REQUEST_BODY
        );

    private async Task<ReceivedRequest> RespondOnceAsync(int status, string body)
    {
        HttpListenerContext context = await _listener.GetContextAsync();
        HttpListenerRequest request = context.Request;
        using var reader = new StreamReader(request.InputStream, Encoding.UTF8);
        var received = new ReceivedRequest(
            request.HttpMethod,
            request.Url!.AbsolutePath,
            request.ContentType,
            request.Headers["Authorization"],
            await reader.ReadToEndAsync()
        );

        byte[] bytes = Encoding.UTF8.GetBytes(body);
        context.Response.StatusCode = status;
        context.Response.ContentLength64 = bytes.Length;
        await context.Response.OutputStream.WriteAsync(bytes);
        context.Response.Close();
        return received;
    }

    private static int GetFreePort()
    {
        var probe = new TcpListener(IPAddress.Loopback, 0);
        probe.Start();
        int port = ((IPEndPoint)probe.LocalEndpoint).Port;
        probe.Stop();
        return port;
    }

    private sealed record ReceivedRequest(
        string Method,
        string Path,
        string? ContentType,
        string? Authorization,
        string Body
    );
}

using System.Diagnostics.CodeAnalysis;
using System.Net;
using System.Net.Sockets;
using System.Net.WebSockets;
using System.Text;
using System.Text.Json;
using Paranext.DataProvider;

namespace TestParanextDataProvider;

/// <summary>
/// Runs the real <see cref="PapiClient"/> handshake against an in-process WebSocket endpoint
/// standing in for main.
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
internal class PapiClientHandshakeTests
{
    private const string CLIENT_SECRET_HEADER = "x-papi-client-secret";
    private const string SERVER_SECRET_HEADER = "x-papi-server-secret";
    private const string CLIENT = "fake-client-secret";
    private const string SERVER = "fake-server-secret";

    private HttpListener _listener = null!;
    private Uri _uri = null!;
    private readonly List<string?> _presentedSecrets = [];
    private CancellationTokenSource _stop = null!;
    private Task _serving = Task.CompletedTask;
    private TextWriter _originalOut = null!;
    private StringWriter _capturedOut = null!;

    /// <summary>How the stand-in for main answers each handshake, given its attempt number</summary>
    private Func<int, HttpListenerContext, Task> _answer = null!;

    [SetUp]
    public void SetUp()
    {
        _originalOut = Console.Out;
        _capturedOut = new StringWriter();
        Console.SetOut(_capturedOut);
        _presentedSecrets.Clear();
        int port = GetFreePort();
        _uri = new Uri($"ws://localhost:{port}/");
        _listener = new HttpListener();
        _listener.Prefixes.Add($"http://localhost:{port}/");
        _listener.Start();
        _stop = new CancellationTokenSource();
        _answer = (_, context) => AcceptAsync(context, SERVER);
        _serving = ServeAsync();
    }

    [TearDown]
    public void TearDown()
    {
        _stop.Cancel();
        _listener.Close();
        Console.SetOut(_originalOut);
        string logged = _capturedOut.ToString();
        _capturedOut.Dispose();
        _stop.Dispose();
        Assert.That(logged, Does.Not.Contain(CLIENT));
        Assert.That(logged, Does.Not.Contain(SERVER));
    }

    [Test]
    public async Task Connect_SendsClientSecretHeader()
    {
        using var client = CreateClient(Secrets());

        Assert.That(await client.ConnectAsync(), Is.True);
        Assert.That(_presentedSecrets, Is.EqualTo(new[] { CLIENT }));
    }

    [Test]
    public void Connect_WrongServerSecret_Throws()
    {
        _answer = (_, context) => AcceptAsync(context, "some-other-secret");
        using var client = CreateClient(Secrets());

        Assert.That(async () => await client.ConnectAsync(), Throws.InvalidOperationException);
    }

    [Test]
    public void Connect_MissingServerSecret_Throws()
    {
        _answer = (_, context) => AcceptAsync(context, null);
        using var client = CreateClient(Secrets());

        Assert.That(async () => await client.ConnectAsync(), Throws.InvalidOperationException);
    }

    [Test]
    public async Task Connect_NoSecrets_SendsNoHeader()
    {
        _answer = (_, context) => AcceptAsync(context, null);
        using var client = CreateClient(null);

        Assert.That(await client.ConnectAsync(), Is.True);
        Assert.That(_presentedSecrets, Is.EqualTo(new string?[] { null }));
    }

    [Test]
    public async Task Connect_ConflictThenAccept_Retries()
    {
        _answer = (attempt, context) =>
            attempt == 0 ? RefuseAsync(context, 409) : AcceptAsync(context, SERVER);
        using var client = CreateClient(Secrets());

        Assert.That(await client.ConnectAsync(), Is.True);
        Assert.That(_presentedSecrets, Is.EqualTo(new[] { CLIENT, CLIENT }));
    }

    [Test]
    public void Connect_ConflictThatNeverClears_GivesUp()
    {
        _answer = (_, context) => RefuseAsync(context, 409);
        using var client = CreateClient(Secrets());

        Assert.That(
            async () => await client.ConnectAsync(),
            Throws.InstanceOf<WebSocketException>()
        );
        Assert.That(_presentedSecrets, Has.Count.EqualTo(11));
    }

    [Test]
    public void Connect_WrongClientSecret_DoesNotRetry()
    {
        _answer = (_, context) => RefuseAsync(context, 401);
        using var client = CreateClient(Secrets());

        Assert.That(
            async () => await client.ConnectAsync(),
            Throws.InstanceOf<WebSocketException>()
        );
        Assert.That(_presentedSecrets, Has.Count.EqualTo(1));
    }

    [Test]
    public async Task RegisterRequestHandler_Refused_RemovesLocalHandlerAndLogs()
    {
        _answer = async (_, context) =>
        {
            var socket = await AcceptAsync(context, SERVER);
            await AnswerOneRequestAsync(socket, false);
        };
        using var client = CreateClient(Secrets());
        await client.ConnectAsync();

        bool registered = await client.RegisterRequestHandlerAsync(
            "command:test.refused",
            new Func<string>(() => "local")
        );

        Assert.That(registered, Is.False);
        Assert.That(client.LocalMethodNames, Does.Not.Contain("command:test.refused"));
        Assert.That(
            _capturedOut.ToString(),
            Does.Contain("Registration refused for request type \"command:test.refused\"")
        );
    }

    private static LaunchSecrets Secrets() =>
        LaunchSecrets.Parse($"{{\"clientSecret\":\"{CLIENT}\",\"serverSecret\":\"{SERVER}\"}}")!;

    private TestPapiClient CreateClient(LaunchSecrets? secrets) => new(_uri, secrets);

    private async Task ServeAsync()
    {
        int attempt = 0;
        while (!_stop.IsCancellationRequested)
        {
            HttpListenerContext context;
            try
            {
                context = await _listener.GetContextAsync();
            }
            catch (Exception) when (_stop.IsCancellationRequested)
            {
                return;
            }
            _presentedSecrets.Add(context.Request.Headers[CLIENT_SECRET_HEADER]);
            await _answer(attempt, context);
            attempt++;
        }
    }

    private static async Task<WebSocket> AcceptAsync(
        HttpListenerContext context,
        string? serverSecret
    )
    {
        if (serverSecret != null)
            context.Response.Headers[SERVER_SECRET_HEADER] = serverSecret;
        var webSocketContext = await context.AcceptWebSocketAsync(subProtocol: null);
        return webSocketContext.WebSocket;
    }

    private static Task RefuseAsync(HttpListenerContext context, int status)
    {
        context.Response.StatusCode = status;
        context.Response.Close();
        return Task.CompletedTask;
    }

    /// <summary>Reads one JSON-RPC request off <paramref name="socket"/> and answers it</summary>
    private static async Task AnswerOneRequestAsync(WebSocket socket, object result)
    {
        // StreamJsonRpc may send one message over several frames
        var message = new MemoryStream();
        var buffer = new byte[4096];
        WebSocketReceiveResult received;
        do
        {
            received = await socket.ReceiveAsync(buffer, CancellationToken.None);
            message.Write(buffer, 0, received.Count);
        } while (!received.EndOfMessage);
        using var request = JsonDocument.Parse(message.ToArray());
        var id = request.RootElement.GetProperty("id");
        string reply = JsonSerializer.Serialize(
            new
            {
                jsonrpc = "2.0",
                id = id.ValueKind == JsonValueKind.Number ? (object)id.GetInt64() : id.GetString(),
                result,
            }
        );
        await socket.SendAsync(
            Encoding.UTF8.GetBytes(reply),
            WebSocketMessageType.Text,
            true,
            CancellationToken.None
        );
    }

    private static int GetFreePort()
    {
        var probe = new TcpListener(IPAddress.Loopback, 0);
        probe.Start();
        int port = ((IPEndPoint)probe.LocalEndpoint).Port;
        probe.Stop();
        return port;
    }

    private sealed class TestPapiClient(Uri uri, LaunchSecrets? secrets)
        : PapiClient(uri, secrets, TimeSpan.FromMilliseconds(10))
    {
        public IEnumerable<string> LocalMethodNames => _localMethods.Keys;
    }
}

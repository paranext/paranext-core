using System.Reflection;
using System.Text;
using System.Text.Json;
using Nerdbank.Streams;
using Paranext.DataProvider;
using Paranext.DataProvider.JsonUtils;
using StreamJsonRpc;

namespace TestParanextDataProvider;

/// <summary>
/// Pins the JSON-RPC error a request handler's exception becomes on the wire: the TypeScript side
/// (`doRequest` in `src/shared/services/network.service.ts`) reads a thrown
/// <see cref="PlatformErrorCodes"/> code from <c>error.data.data.platformErrorCode</c>.
/// </summary>
[TestFixture]
[Parallelizable(ParallelScope.All)]
internal class PapiJsonRpcTests
{
    private const string MethodName = "test.method";

    [Test]
    public async Task CodedException_FromSyncHandler_CarriesPlatformErrorCode()
    {
        var error = await InvokeAndReadErrorAsync(
            new Func<int>(
                () =>
                    throw PlatformErrorCodes.WithCode(
                        PlatformErrorCodes.FailedPrecondition,
                        "A sync is already in progress"
                    )
            )
        );

        var data = error.GetProperty("data");
        Assert.Multiple(() =>
        {
            Assert.That(
                data.GetProperty("data").GetProperty("platformErrorCode").GetString(),
                Is.EqualTo(PlatformErrorCodes.FailedPrecondition)
            );
            Assert.That(
                error.GetProperty("message").GetString(),
                Is.EqualTo("A sync is already in progress")
            );
            // The common error fields stay alongside the code.
            Assert.That(
                data.GetProperty("type").GetString(),
                Is.EqualTo(typeof(InvalidOperationException).FullName)
            );
            Assert.That(
                data.GetProperty("message").GetString(),
                Is.EqualTo("A sync is already in progress")
            );
            Assert.That(data.TryGetProperty("stack", out _), Is.True);
        });
    }

    [Test]
    public async Task CodedException_FromAsyncHandler_CarriesPlatformErrorCode()
    {
        var error = await InvokeAndReadErrorAsync(
            new Func<Task<int>>(async () =>
            {
                await Task.Yield();
                throw PlatformErrorCodes.WithCode(PlatformErrorCodes.Unavailable, "Busy");
            })
        );

        Assert.That(
            error
                .GetProperty("data")
                .GetProperty("data")
                .GetProperty("platformErrorCode")
                .GetString(),
            Is.EqualTo(PlatformErrorCodes.Unavailable)
        );
    }

    [Test]
    public async Task UncodedException_KeepsCommonErrorDataWithoutCode()
    {
        var error = await InvokeAndReadErrorAsync(
            new Func<int>(() => throw new InvalidOperationException("Plain failure"))
        );

        var data = error.GetProperty("data");
        Assert.Multiple(() =>
        {
            Assert.That(data.TryGetProperty("data", out _), Is.False);
            Assert.That(
                data.GetProperty("type").GetString(),
                Is.EqualTo(typeof(InvalidOperationException).FullName)
            );
            Assert.That(data.GetProperty("message").GetString(), Is.EqualTo("Plain failure"));
            Assert.That(error.GetProperty("message").GetString(), Is.EqualTo("Plain failure"));
        });
    }

    [Test]
    public void TryFindCode_UnwrapsTargetInvocationException()
    {
        var inner = PlatformErrorCodes.WithCode(PlatformErrorCodes.Aborted, "inner");
        var wrapped = new TargetInvocationException(inner);

        Assert.That(PlatformErrorCodes.TryFindCode(wrapped, out var code), Is.True);
        Assert.That(code, Is.EqualTo(PlatformErrorCodes.Aborted));
    }

    [Test]
    public void TryFindCode_UnwrapsSingleInnerAggregateException()
    {
        var inner = PlatformErrorCodes.WithCode(PlatformErrorCodes.Aborted, "inner");
        var wrapped = new AggregateException(new TargetInvocationException(inner));

        Assert.That(PlatformErrorCodes.TryFindCode(wrapped, out var code), Is.True);
        Assert.That(code, Is.EqualTo(PlatformErrorCodes.Aborted));
    }

    [Test]
    public void TryFindCode_DoesNotPickOneOfSeveralAggregatedCodes()
    {
        var wrapped = new AggregateException(
            PlatformErrorCodes.WithCode(PlatformErrorCodes.Aborted, "one"),
            PlatformErrorCodes.WithCode(PlatformErrorCodes.Unavailable, "two")
        );

        Assert.That(PlatformErrorCodes.TryFindCode(wrapped, out var code), Is.False);
        Assert.That(code, Is.Null);
    }

    [Test]
    public void TryFindCode_DoesNotInheritAnInnerExceptionsCode()
    {
        // A handler that wraps a coded failure in its own exception decides what it reports; the
        // inner code describes a different failure than the one the caller sees.
        var wrapped = new InvalidOperationException(
            "outer",
            PlatformErrorCodes.WithCode(PlatformErrorCodes.Aborted, "inner")
        );

        Assert.That(PlatformErrorCodes.TryFindCode(wrapped, out _), Is.False);
    }

    /// <summary>
    /// Serves <paramref name="handler"/> on a <see cref="PapiJsonRpc"/> configured as
    /// <c>PapiClient</c> configures it, sends one raw request, and returns the raw <c>error</c>
    /// object of the response.
    /// </summary>
    private static async Task<JsonElement> InvokeAndReadErrorAsync(Delegate handler)
    {
        var (serverStream, clientStream) = FullDuplexStream.CreatePair();
        using var server = new PapiJsonRpc(
            new HeaderDelimitedMessageHandler(
                serverStream,
                SerializationOptions.CreateJsonRpcMessageFormatter()
            )
        )
        {
            ExceptionOptions = ExceptionSettings.TrustedData,
        };
        server.AddLocalRpcMethod(MethodName, handler);
        server.StartListening();

        var request = Encoding.UTF8.GetBytes(
            $"{{\"jsonrpc\":\"2.0\",\"id\":1,\"method\":\"{MethodName}\",\"params\":[]}}"
        );
        var header = Encoding.ASCII.GetBytes($"Content-Length: {request.Length}\r\n\r\n");
        await clientStream.WriteAsync(header);
        await clientStream.WriteAsync(request);
        await clientStream.FlushAsync();

        var body = await ReadHeaderDelimitedMessageAsync(clientStream);
        using var document = JsonDocument.Parse(body);
        Assert.That(
            document.RootElement.TryGetProperty("error", out var error),
            Is.True,
            $"Expected an error response, got {Encoding.UTF8.GetString(body)}"
        );
        return error.Clone();
    }

    private static async Task<byte[]> ReadHeaderDelimitedMessageAsync(Stream stream)
    {
        using var timeout = new CancellationTokenSource(TimeSpan.FromSeconds(10));
        var headerBytes = new List<byte>();
        var oneByte = new byte[1];
        while (
            headerBytes.Count < 4
            || !(
                headerBytes[^4] == '\r'
                && headerBytes[^3] == '\n'
                && headerBytes[^2] == '\r'
                && headerBytes[^1] == '\n'
            )
        )
        {
            if (await stream.ReadAsync(oneByte, timeout.Token) == 0)
                throw new EndOfStreamException("Stream closed before the response header ended");
            headerBytes.Add(oneByte[0]);
        }

        var contentLength = Encoding
            .ASCII.GetString(headerBytes.ToArray())
            .Split("\r\n")
            .Where(line => line.StartsWith("Content-Length:", StringComparison.OrdinalIgnoreCase))
            .Select(line => int.Parse(line["Content-Length:".Length..].Trim()))
            .Single();

        var body = new byte[contentLength];
        await stream.ReadExactlyAsync(body, timeout.Token);
        return body;
    }
}

using System.Collections.Concurrent;
using System.Net;
using System.Net.WebSockets;
using System.Security.Cryptography;
using System.Text;
using Paranext.DataProvider.JsonUtils;
using Paranext.DataProvider.NetworkObjects.Documentation;
using Paranext.DataProvider.Services;
using StreamJsonRpc;

namespace Paranext.DataProvider;

/// <summary>
/// Class to facilitate communication to the Paranext server via the PAPI
/// </summary>
internal class PapiClient : IDisposable
{
    #region Delegates/Constants/Member variables

    private static readonly Uri s_connectionUri = new("ws://localhost:8876");

    /// <summary>Handshake request header in which this process presents its client secret</summary>
    private const string CLIENT_SECRET_HEADER = "x-papi-client-secret";

    /// <summary>Handshake reply header in which main proves it launched this process</summary>
    private const string SERVER_SECRET_HEADER = "x-papi-server-secret";

    /// <summary>
    /// How many more times to try a handshake main refused because this launch already has an open
    /// connection. That happens when <c>dotnet watch</c> restarts this process before the previous
    /// one's connection has closed.
    /// </summary>
    private const int CONFLICT_RETRIES = 10;

    private readonly Uri _connectionUri;
    private readonly TimeSpan _conflictRetryDelay;
    private LaunchSecrets? _launchSecrets;
    private ClientWebSocket _webSocket;
    private JsonRpc _jsonRpc;
    protected readonly ConcurrentDictionary<string, Delegate> _localMethods = new();
    private readonly CancellationTokenSource _cancellationTokenSource = new();
    private readonly CancellationToken _cancellationToken;
    private TaskCompletionSource _disconnectTaskCompletionSource = new();
    private TimeSpan _requestTimeout = TimeSpan.FromSeconds(30);
    private ISharedStore? _sharedStore = null;

    private bool _isDisposed = false;

    #endregion

    #region Constructors

    /// <param name="launchSecrets">The secrets main handed this process, if main launched it.
    /// Without them this process connects unidentified, and main refuses it the request types only
    /// the data provider may register.</param>
    public PapiClient(LaunchSecrets? launchSecrets = null)
        : this(s_connectionUri, launchSecrets, TimeSpan.FromMilliseconds(500)) { }

    /// <param name="connectionUri">Address of main's PAPI WebSocket</param>
    /// <param name="launchSecrets">See <see cref="PapiClient(LaunchSecrets?)"/></param>
    /// <param name="conflictRetryDelay">How long to wait before trying again a handshake main
    /// refused because this launch already has an open connection</param>
    protected PapiClient(
        Uri connectionUri,
        LaunchSecrets? launchSecrets,
        TimeSpan conflictRetryDelay
    )
    {
        _cancellationToken = _cancellationTokenSource.Token;
        _connectionUri = connectionUri;
        _launchSecrets = launchSecrets;
        _conflictRetryDelay = conflictRetryDelay;
        (_webSocket, _jsonRpc) = CreateConnection();
    }

    #endregion

    #region Dispose

    public void Dispose()
    {
        // Do not change this code. Put cleanup code in 'Dispose(bool isDisposing)' method
        Dispose(isDisposing: true);
        // ReSharper disable once GCSuppressFinalizeForTypeWithoutDestructor
        GC.SuppressFinalize(this);
    }

    private void Dispose(bool isDisposing)
    {
        if (_isDisposed)
            return;

        if (isDisposing)
        {
            _jsonRpc.Dispose();
            _webSocket.Dispose();
            _cancellationTokenSource.Dispose();
            _disconnectTaskCompletionSource.TrySetResult();
            _disconnectTaskCompletionSource.Task.Dispose();
        }

        _isDisposed = true;
    }

    #endregion

    #region Properties

    /// <summary>
    /// Gets whether a connection is open to the server
    /// </summary>
    public bool Connected => !_isDisposed && _webSocket.State == WebSocketState.Open;

    /// <summary>
    /// Gets a task that resolves when <see cref="DisconnectAsync"/> is called.
    /// </summary>
    public Task DisconnectTask => _disconnectTaskCompletionSource.Task;

    #endregion

    #region Public methods

    /// <summary>
    /// Open and initialize a connection with the server.
    /// If true is returned, then <see cref="DisconnectAsync"/> should be called before <see cref="Dispose"/> for a proper cleanup of resources.
    /// If false is returned, then there is no need to call <see cref="DisconnectAsync"/> before calling <see cref="Dispose"/>.
    /// </summary>
    /// <returns><see cref="Task"/> that will resolve to true if the connection initialized properly, false otherwise</returns>
    public virtual async Task<bool> ConnectAsync()
    {
        ObjectDisposedException.ThrowIf(_isDisposed, this);

        Console.WriteLine(
            _launchSecrets is null
                ? "PapiClient connecting without launch secrets, so main will not identify it"
                : "PapiClient connecting"
        );
        for (int retriesLeft = CONFLICT_RETRIES; ; retriesLeft--)
        {
            try
            {
                await _webSocket.ConnectAsync(_connectionUri, _cancellationToken);
                break;
            }
            catch (WebSocketException)
                when (retriesLeft > 0 && _webSocket.HttpStatusCode == HttpStatusCode.Conflict)
            {
                Console.WriteLine(
                    "Main still has this launch's previous connection open; trying again"
                );
                await Task.Delay(_conflictRetryDelay, _cancellationToken);
                // A ClientWebSocket cannot connect again after a failed attempt
                _jsonRpc.Dispose();
                _webSocket.Dispose();
                (_webSocket, _jsonRpc) = CreateConnection();
            }
        }

        if (_launchSecrets is not null)
        {
            if (!IsServerSecretValid(_webSocket.HttpResponseHeaders, _launchSecrets.ServerSecret))
            {
                _webSocket.Abort();
                throw new InvalidOperationException(
                    "The PAPI WebSocket server did not prove it is the main process that launched this data provider"
                );
            }
            // Used once, at connect. Nothing reconnects, so nothing needs them again.
            _launchSecrets = null;
        }
        Console.WriteLine("PapiClient connected successfully");

        _jsonRpc.Disconnected += (object? _, JsonRpcDisconnectedEventArgs args) =>
        {
            Console.WriteLine(
                $"JSONRPC disconnected: Reason = {args.Reason}, Description = {args.Description}, Exception = {args.Exception}"
            );
            _disconnectTaskCompletionSource.TrySetResult();
        };
        _jsonRpc.StartListening();
        return true;
    }

    /// <summary>
    /// Attempt to close the connection to the server gracefully.
    /// After calling this method, the PapiClient object should not be used for anything. If you want to reconnect, create a new object.
    /// </summary>
    public virtual async Task DisconnectAsync()
    {
        ObjectDisposedException.ThrowIf(_isDisposed, this);

        Console.WriteLine("PapiClient disconnecting");

        await _cancellationTokenSource.CancelAsync();

        if (Connected)
        {
            await _webSocket.CloseAsync(
                WebSocketCloseStatus.NormalClosure,
                string.Empty,
                CancellationToken.None
            );
        }
    }

    /// <summary>
    /// Set the timeout for requests sent to the server.
    /// </summary>
    /// <param name="timeout">Timeout to set</param>
    /// <remarks>
    /// The default timeout is 30 seconds. This should be updated from app settings.
    /// If the timeout is set to 0, then the request will wait indefinitely for a response.
    /// </remarks>
    public void SetRequestTimeout(TimeSpan timeout)
    {
        ObjectDisposedException.ThrowIf(_isDisposed, this);

        if (_requestTimeout == timeout)
            return;

        if (timeout < TimeSpan.Zero || timeout > TimeSpan.FromDays(1))
        {
            Console.WriteLine(
                $"Timeout must be between 0 and 1 day. Tried to set it to {timeout.TotalMilliseconds}ms"
            );
            return;
        }

        Console.WriteLine($"Request timeout set to {timeout.TotalMilliseconds}ms");
        _requestTimeout = timeout;
    }

    /// <summary>
    /// Set the shared store for PapiClient to read and write to.
    /// This is used to share data between different processes.
    /// </summary>
    public void SetSharedStore(ISharedStore? store)
    {
        ObjectDisposedException.ThrowIf(_isDisposed, this);
        if (_sharedStore != null)
            throw new InvalidOperationException("Shared store already set");

        _sharedStore = store;
    }

    /// <summary>
    /// Send a request to the server expecting a returned value
    /// </summary>
    /// <param name="requestType">Type of request intended for the server</param>
    /// <param name="requestContents">Objects to send as parameters to the request</param>
    /// <returns>The request response's resulting value</returns>
    public virtual async Task<T?> SendRequestAsync<T>(
        string requestType,
        IReadOnlyList<object?>? requestContents = null
    )
    {
        ObjectDisposedException.ThrowIf(_isDisposed, this);

        if (_localMethods.TryGetValue(requestType, out Delegate? handler) && handler != null)
        {
            var result = handler.DynamicInvoke(requestContents?.ToArray());
            if (result is null)
            {
                return (default(T) is null)
                    ? default
                    : throw new InvalidOperationException("request returned null");
            }
            return (T)result;
        }

        var timeoutMs = GetRequestTimeoutMs(requestType);
        using var timeoutCancellationTokenSource = new CancellationTokenSource();
        timeoutCancellationTokenSource.CancelAfter(timeoutMs);
        using var linkedTokenSource = CancellationTokenSource.CreateLinkedTokenSource(
            _cancellationToken,
            timeoutCancellationTokenSource.Token
        );

        return await _jsonRpc.InvokeWithCancellationAsync<T?>(
            requestType,
            requestContents,
            timeoutMs > 0 ? linkedTokenSource.Token : _cancellationToken
        );
    }

    /// <summary>
    /// Send a request to the server expecting no returned value (as if the request is pointing to a void method)
    /// </summary>
    /// <param name="requestType">Type of request intended for the server</param>
    /// <param name="requestContents">Objects to send as parameters to the request</param>
    public virtual async Task SendRequestAsync(
        string requestType,
        IReadOnlyList<object?>? requestContents = null
    )
    {
        ObjectDisposedException.ThrowIf(_isDisposed, this);

        if (_localMethods.TryGetValue(requestType, out Delegate? handler) && handler != null)
            handler.DynamicInvoke(requestContents?.ToArray());
        else
        {
            var timeoutMs = GetRequestTimeoutMs(requestType);
            using var timeoutCancellationTokenSource = new CancellationTokenSource();
            timeoutCancellationTokenSource.CancelAfter(timeoutMs);
            using var linkedTokenSource = CancellationTokenSource.CreateLinkedTokenSource(
                _cancellationToken,
                timeoutCancellationTokenSource.Token
            );

            await _jsonRpc.InvokeWithCancellationAsync(
                requestType,
                requestContents,
                timeoutMs > 0 ? linkedTokenSource.Token : _cancellationToken
            );
        }
    }

    /// <summary>
    /// Register a request handler with the server.
    /// </summary>
    /// <param name="requestType">The request type to register</param>
    /// <param name="requestHandler">Method that is called when a request of the specified type is received from the server</param>
    /// <param name="requestTimeout">Custom timeout for this specific request when it's called. If provided, this will be added
    /// to the shared store for use by GetRequestTimeoutMs.</param>
    /// <param name="documentation">Optional OpenRPC documentation for this method. When provided, it
    /// is sent to the main process and surfaces in the live OpenRPC document (e.g. carrying
    /// <c>x-experimental: true</c>). Mirrors the TypeScript <c>registerCommand</c> docs parameter.</param>
    /// <returns><see cref="Task"/> that will resolve to true if registration was successful, false otherwise</returns>
    public virtual async Task<bool> RegisterRequestHandlerAsync(
        string requestType,
        Delegate requestHandler,
        TimeSpan? requestTimeout = null,
        OpenRpcSingleMethodDocumentation? documentation = null
    )
    {
        ObjectDisposedException.ThrowIf(_isDisposed, this);

        if (!_localMethods.TryAdd(requestType, requestHandler))
        {
            Console.WriteLine($"Handler already registered for type {requestType}");
            return false;
        }
        _jsonRpc.AddLocalRpcMethod(requestType, requestHandler);

        // The main process's registerMethod handler accepts an optional second argument carrying
        // method documentation. Only send it when present so undocumented registrations keep their
        // existing single-argument wire shape.
        object?[] registerArgs = documentation is null
            ? [requestType]
            : [requestType, documentation];
        var registerTask = _jsonRpc.InvokeWithCancellationAsync<bool>(
            "network:registerMethod",
            registerArgs,
            _cancellationToken
        );

        if (
            !await ThreadingUtils.IsTaskCompletedAsync(
                registerTask,
                ThreadingUtils.DefaultTimeout,
                _cancellationToken
            )
        )
        {
            Console.WriteLine($"No response when registering request type \"{requestType}\"");
            _localMethods.TryRemove(requestType, out _);
            return false;
        }

        if (!await registerTask)
        {
            // Otherwise a request this process sends for the type would still run the handler
            // locally. StreamJsonRpc cannot remove the method it added, but main never routes the
            // type here.
            _localMethods.TryRemove(requestType, out _);
            Console.WriteLine($"Registration refused for request type \"{requestType}\"");
            return false;
        }

        if (requestTimeout.HasValue)
            SetRequestTimeoutMs(requestType, (int)requestTimeout.Value.TotalMilliseconds);

        return true;
    }

    /// <summary>
    /// Configure PapiClient to call <paramref name="eventHandler"/> whenever an event of type <paramref name="eventType"/> is received.
    /// </summary>
    /// <param name="eventType">Event type to monitor</param>
    /// <param name="eventHandler">Function that accepts an event message</param>
    public virtual void RegisterEventHandler(string eventType, Delegate eventHandler)
    {
        ObjectDisposedException.ThrowIf(_isDisposed, this);

        _jsonRpc.AddLocalRpcMethod(eventType, eventHandler);
        Console.WriteLine($"Handler for event type \"{eventType}\" successfully registered");
    }

    /// <summary>
    /// Send an event message to the server.
    /// </summary>
    /// <param name="message">Event message to send</param>
    public virtual async Task SendEventAsync(string eventType, object? eventParameters)
    {
        ObjectDisposedException.ThrowIf(_isDisposed, this);

        await _jsonRpc.NotifyAsync(eventType, [eventParameters]);
    }

    #endregion

    #region Private methods

    /// <summary>
    /// Creates the socket and the JSON-RPC layer over it. Both are created again for each connection
    /// attempt, since a socket that failed to connect cannot be used again.
    /// </summary>
    private (ClientWebSocket, JsonRpc) CreateConnection()
    {
        var webSocket = new ClientWebSocket();
        webSocket.Options.CollectHttpResponseDetails = true;
        if (_launchSecrets is not null)
            webSocket.Options.SetRequestHeader(CLIENT_SECRET_HEADER, _launchSecrets.ClientSecret);

        var formatter = SerializationOptions.CreateJsonRpcMessageFormatter();
        var jsonRpc = new PapiJsonRpc(new WebSocketMessageHandler(webSocket, formatter))
        {
            AllowModificationWhileListening = true,
            ExceptionOptions = ExceptionSettings.TrustedData,
            /*
             * This can be uncommented for detailed JSON-RPC tracing

            TraceSource = new System.Diagnostics.TraceSource(
                "JSONRPC",
                System.Diagnostics.SourceLevels.Verbose
            ),

            */
        };
        return (webSocket, jsonRpc);
    }

    /// <summary>
    /// Whether the handshake reply carried <paramref name="expected"/> in
    /// <see cref="SERVER_SECRET_HEADER"/>. Compares digests in constant time.
    /// </summary>
    private static bool IsServerSecretValid(
        IReadOnlyDictionary<string, IEnumerable<string>>? responseHeaders,
        string expected
    )
    {
        string[] presented =
            responseHeaders
                ?.Where(header =>
                    string.Equals(
                        header.Key,
                        SERVER_SECRET_HEADER,
                        StringComparison.OrdinalIgnoreCase
                    )
                )
                .SelectMany(header => header.Value)
                .ToArray() ?? [];
        return presented.Length == 1
            && CryptographicOperations.FixedTimeEquals(
                SHA256.HashData(Encoding.UTF8.GetBytes(presented[0])),
                SHA256.HashData(Encoding.UTF8.GetBytes(expected))
            );
    }

    /// <summary>
    /// Gets the request timeout, in milliseconds, for a specific request type.
    /// Checks the shared store for custom timeouts before falling back to the default timeout.
    /// </summary>
    /// <param name="requestType">The request type to get the timeout for</param>
    /// <returns>The timeout to use for the request</returns>
    private int GetRequestTimeoutMs(string requestType)
    {
        ObjectDisposedException.ThrowIf(_isDisposed, this);

        if (_sharedStore == null)
            return (int)_requestTimeout.TotalMilliseconds;

        try
        {
            string sharedStoreKey = SharedStoreKeys.CustomNetworkTimeoutMs(requestType);
            if (_sharedStore.TryGetValue<int>(sharedStoreKey, out int timeout))
                return timeout;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error getting custom network timeouts: {ex}");
        }

        return (int)_requestTimeout.TotalMilliseconds;
    }

    private void SetRequestTimeoutMs(string requestType, int timeout)
    {
        ObjectDisposedException.ThrowIf(_isDisposed, this);

        try
        {
            string sharedStoreKey = SharedStoreKeys.CustomNetworkTimeoutMs(requestType);
            _sharedStore?.Set(sharedStoreKey, timeout);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error setting custom network timeouts: {ex}");
        }
    }

    #endregion
}

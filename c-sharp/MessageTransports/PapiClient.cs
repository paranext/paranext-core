using System.Collections.Concurrent;
using System.Net.WebSockets;
using System.Text.Json;
using Paranext.DataProvider.JsonUtils;
using SIL.Extensions;
using StreamJsonRpc;

namespace Paranext.DataProvider.MessageTransports;

/// <summary>
/// Class to facilitate communication to the Paranext server via the PAPI
/// </summary>
internal class PapiClient : IDisposable
{
    #region Delegates/Constants/Member variables

    private static readonly Uri s_connectionUri = new("ws://localhost:8876");

    private readonly ClientWebSocket _webSocket = new();
    private readonly JsonRpc _jsonRpc;
    private readonly ConcurrentDictionary<string, Delegate> _localMethods = new();
    private readonly CancellationTokenSource _cancellationTokenSource = new();
    private readonly CancellationToken _cancellationToken;
    private TaskCompletionSource _disconnectTaskCompletionSource = new();

    private bool _isDisposed = false;

    #endregion

    #region Constructors

    public PapiClient()
    {
        _cancellationToken = _cancellationTokenSource.Token;

        var options = SerializationOptions.CreateSerializationOptions();
        var formatter = new SystemTextJsonFormatter();
        formatter.JsonSerializerOptions.TypeInfoResolver = options.TypeInfoResolver;
        formatter.JsonSerializerOptions.Encoder = options.Encoder;
        formatter.JsonSerializerOptions.PropertyNamingPolicy = options.PropertyNamingPolicy;
        formatter.JsonSerializerOptions.WriteIndented = options.WriteIndented;
        formatter.JsonSerializerOptions.IgnoreReadOnlyProperties = options.IgnoreReadOnlyProperties;
        formatter.JsonSerializerOptions.Converters.AddRange(options.Converters);
        _jsonRpc = new JsonRpc(new WebSocketMessageHandler(_webSocket, formatter))
        {
            AllowModificationWhileListening = true,
            ExceptionOptions = ExceptionSettings.TrustedData,
        };
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

    // Override finalizer only if 'Dispose(bool isDisposing)' has code to free unmanaged resources
    // https://learn.microsoft.com/en-us/dotnet/standard/garbage-collection/implementing-dispose
    // ~PapiClient()
    // {
    //     // Do not change this code. Put cleanup code in 'Dispose(bool isDisposing)' method
    //     Dispose(isDisposing: false);
    // }

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

        Console.WriteLine("PapiClient connecting");
        await _webSocket.ConnectAsync(s_connectionUri, _cancellationToken);
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
    /// Send a request to the server. The response (if any) will be handled asynchronously by calling <paramref name="responseCallback"/>.
    /// </summary>
    /// <param name="requestType">Type of request intended for the server</param>
    /// <param name="requestContents">If the object is a <see cref="JsonElement"/>, it will be used as-is in the request.
    /// Otherwise the object will be serialized into a <see cref="JsonElement"/> then sent.</param>
    /// <param name="responseCallback">Callback for the response to this request being sent.
    /// The first argument indicates whether the request was successful.
    /// The second argument is the optional contents of the response message.</param>
    public async virtual Task SendRequestAsync(
        string requestType,
        IReadOnlyList<object?>? requestContents,
        Action<bool, object?> responseCallback
    )
    {
        ObjectDisposedException.ThrowIf(_isDisposed, this);

        if (_localMethods.TryGetValue(requestType, out Delegate? handler) && handler != null)
        {
            handler.DynamicInvoke(requestContents);
            return;
        }

        await _jsonRpc
            .InvokeWithCancellationAsync<object?>(requestType, requestContents, _cancellationToken)
            .ContinueWith(
                task =>
                {
                    if (task.IsCompletedSuccessfully)
                    {
                        responseCallback(true, task.Result);
                    }
                    else
                    {
                        responseCallback(false, task.Exception?.Message);
                    }
                },
                _cancellationToken,
                TaskContinuationOptions.None,
                TaskScheduler.Default
            );
    }

    /// <summary>
    /// Register a request handler with the server.
    /// </summary>
    /// <param name="requestType">The request type to register</param>
    /// <param name="requestHandler">Method that is called when a request of the specified type is received from the server</param>
    /// <param name="responseTimeoutInMs">Number of milliseconds to wait for the registration response to be received</param>
    /// <returns><see cref="Task"/> that will resolve to true if registration was successful, false otherwise</returns>
    public virtual async Task<bool> RegisterRequestHandlerAsync(
        string requestType,
        Delegate requestHandler,
        int responseTimeoutInMs = 5000
    )
    {
        ObjectDisposedException.ThrowIf(_isDisposed, this);

        if (!_localMethods.TryAdd(requestType, requestHandler))
        {
            Console.WriteLine($"Handler already registered for type {requestType}");
            return false;
        }

        Console.WriteLine($"Registering handler for request type {requestType}...");
        var registrationTask = _jsonRpc.InvokeWithCancellationAsync<bool>(
            "network:registerMethod",
            [requestType],
            _cancellationToken
        );

        var timeout = TimeSpan.FromMilliseconds(responseTimeoutInMs);
        if (!await IsTaskCompletedAsync(registrationTask, timeout, _cancellationToken))
        {
            Console.WriteLine($"No response when registering request type \"{requestType}\"");
            _localMethods.TryRemove(requestType, out _);
            return false;
        }

        bool succeeded = await registrationTask;
        if (succeeded)
            _jsonRpc.AddLocalRpcMethod(requestType, requestHandler);
        return succeeded;
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

    #region Private helper methods

    /// <summary>
    /// Check if the given task has completed.  If not, give it until the timeout to complete.
    /// </summary>
    /// <param name="task">Task to verify</param>
    /// <param name="timeout">How long to wait for the task to complete</param>
    /// <param name="cancellationToken">Cancellation token that could interrupt waiting</param>
    /// <returns><see cref="Task"/> that will resolve to true if the given task completed, false otherwise</returns>
    private static async Task<bool> IsTaskCompletedAsync(
        Task task,
        TimeSpan timeout,
        CancellationToken cancellationToken
    )
    {
        if (task.IsCompleted)
            return true;

        try
        {
            if (!cancellationToken.IsCancellationRequested)
                await task.WaitAsync(timeout, cancellationToken);
        }
        catch (TimeoutException) { }

        return task.IsCompleted;
    }

    #endregion
}

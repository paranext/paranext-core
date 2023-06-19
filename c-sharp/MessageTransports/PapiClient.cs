using System.Collections.Concurrent;
using System.Net.WebSockets;
using System.Text;
using System.Text.Json;
using Paranext.DataProvider.JsonUtils;
using Paranext.DataProvider.MessageHandlers;
using Paranext.DataProvider.Messages;
using PtxUtils;

namespace Paranext.DataProvider.MessageTransports;

/// <summary>
/// Class to facilitate communication to the Paranext server via the PAPI
/// </summary>
internal sealed class PapiClient : IDisposable
{
    #region Delegates/Constants/Member variables

    private const int CONNECT_TIMEOUT = 30000;
    private const int DISCONNECT_TIMEOUT = 2000;
    private const int RECEIVE_BUFFER_LENGTH = 2048;
    private const int MAX_OUTGOING_MESSAGES = 10;
    private static readonly Encoding s_utf8WithoutBom = new UTF8Encoding();
    private static readonly Uri s_connectionUri = new("ws://localhost:8876");
    private static readonly JsonSerializerOptions s_serializationOptions;

    private readonly Dictionary<Enum<MessageType>, IMessageHandler> _messageHandlersByMessageType =
        new();
    private readonly ConcurrentDictionary<int, IMessageHandler> _messageHandlersForMyRequests =
        new();
    private readonly ClientWebSocket _webSocket = new();
    private readonly Thread _incomingMessageThread;
    private readonly Thread _outgoingMessageThread;
    private readonly ManualResetEventSlim _clientInitializationComplete = new(false);
    private readonly BlockingCollection<Message> _outgoingMessages = new(MAX_OUTGOING_MESSAGES);
    private readonly CancellationTokenSource _cancellationTokenSource = new();
    private readonly CancellationToken _cancellationToken;
    private int _clientId = MessageInitClientConnectorInfo.CLIENT_ID_UNSET;
    private int _nextRequestId = 1;
    private bool _isDisposed = false;

    #endregion

    #region Constructors

    static PapiClient()
    {
        s_serializationOptions = SerializationOptions.CreateSerializationOptions();
        s_serializationOptions.Converters.Add(new MessageConverter());
    }

    public PapiClient()
    {
        _incomingMessageThread = new(HandleIncomingMessages);
        _outgoingMessageThread = new(HandleOutgoingMessages);

        _cancellationToken = _cancellationTokenSource.Token;

        _messageHandlersByMessageType[MessageType.Event] = new MessageHandlerEvent();
        _messageHandlersByMessageType[MessageType.InitClient] = new MessageHandlerInitClient(
            (int clientId) =>
            {
                if (_clientInitializationComplete.IsSet)
                    throw new InvalidOperationException("Reinitializing client is not allowed");

                _clientId = clientId;
                _clientInitializationComplete.Set();
            }
        );
        _messageHandlersByMessageType[MessageType.Request] =
            new MessageHandlerRequestByRequestType();
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
            _webSocket.Dispose();
            _clientInitializationComplete.Dispose();
            _cancellationTokenSource.Dispose();
            _outgoingMessages.Dispose();
        }

        _messageHandlersByMessageType.Clear();
        _messageHandlersForMyRequests.Clear();

        _isDisposed = true;
    }

    #endregion

    #region Properties

    /// <summary>
    /// Gets whether connection is open to the server
    /// </summary>
    public bool Connected => !_isDisposed && _webSocket.State == WebSocketState.Open;

    #endregion

    #region Public methods

    /// <summary>
    /// Open and initialize a connection with the server.
    /// If true is returned, then <see cref="DisconnectAsync"/> should be called before <see cref="Dispose"/> for a proper cleanup of resources.
    /// If false is returned, then there is no need to call <see cref="DisconnectAsync"/> before calling <see cref="Dispose"/>.
    /// </summary>
    /// <returns><see cref="Task"/> will resolve to true if the connection initialized properly, false otherwise</returns>
    public async Task<bool> ConnectAsync()
    {
        ObjectDisposedException.ThrowIf(_isDisposed, this);

        Console.WriteLine("PapiClient connecting");

        await _webSocket.ConnectAsync(s_connectionUri, _cancellationToken);
        _incomingMessageThread.Start();
        _outgoingMessageThread.Start();

        if (!_clientInitializationComplete.Wait(CONNECT_TIMEOUT))
        {
            await Console.Error.WriteLineAsync("PapiClient did not connect");
            await DisconnectAsync();
            return false;
        }

        Console.WriteLine("PapiClient connected successfully");
        return true;
    }

    /// <summary>
    /// Attempt to close the connection to the server gracefully.
    /// After calling this method, the PapiClient object should not be used for anything. If you want to reconnect, create a new object.
    /// </summary>
    public async Task DisconnectAsync()
    {
        ObjectDisposedException.ThrowIf(_isDisposed, this);

        Console.WriteLine("PapiClient disconnecting");

        SignalToBeginGracefulDisconnect();

        if (_incomingMessageThread.IsAlive && !_incomingMessageThread.Join(DISCONNECT_TIMEOUT))
            await Console.Error.WriteLineAsync(
                "Incoming message thread did not shut down properly"
            );
        if (_outgoingMessageThread.IsAlive && !_outgoingMessageThread.Join(DISCONNECT_TIMEOUT))
            await Console.Error.WriteLineAsync(
                "Outgoing message thread did not shut down properly"
            );

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
    /// Return once message handling is complete.
    /// </summary>
    public void BlockUntilMessageHandlingComplete()
    {
        ObjectDisposedException.ThrowIf(_isDisposed, this);

        if (_incomingMessageThread.IsAlive)
            _incomingMessageThread.Join();
        if (_outgoingMessageThread.IsAlive)
            _outgoingMessageThread.Join();
    }

    /// <summary>
    /// Register a request handler with the server.
    /// </summary>
    /// <param name="requestType">The request type to register</param>
    /// <param name="requestHandler">Method that is called when a request of the specified type is received from the server</param>
    /// <param name="responseTimeoutInMs">Number of milliseconds to wait for the registration response to be received</param>
    /// <returns>True if the registration was successful</returns>
    public bool RegisterRequestHandler(
        Enum<RequestType> requestType,
        Func<dynamic, ResponseToRequest> requestHandler,
        int responseTimeoutInMs = 1000
    )
    {
        ObjectDisposedException.ThrowIf(_isDisposed, this);

        Console.WriteLine($"Registering handler for request type {requestType}...");
        bool registrationSucceeded = false;
        using ManualResetEventSlim registrationComplete = new(false);

        var requestMessage = new MessageRequest(
            RequestType.RegisterRequest,
            Interlocked.Increment(ref _nextRequestId),
            new dynamic[] { requestType.ToString(), _clientId }
        );

        _messageHandlersForMyRequests[requestMessage.RequestId] = new MessageHandlerResponse(
            requestMessage,
            (bool success, dynamic? _) =>
            {
                if (!success)
                {
                    Console.Error.WriteLine(
                        $"Failed to register request type \"{requestType}\" with the server"
                    );
                }
                else
                {
                    var responder = (MessageHandlerRequestByRequestType)
                        _messageHandlersByMessageType[MessageType.Request];
                    responder.SetHandlerForRequestType(requestType, requestHandler);
                    Console.WriteLine(
                        $"Request type \"{requestType}\" successfully registered with the server"
                    );
                    registrationSucceeded = true;
                }

                // ReSharper disable once AccessToDisposedClosure
                registrationComplete.Set();
            }
        );

        QueueOutgoingMessage(requestMessage);
        if (!registrationComplete.Wait(responseTimeoutInMs))
        {
            Console.Error.WriteLine(
                $"No response came back when registering request type \"{requestType}\""
            );
        }
        return registrationSucceeded;
    }

    /// <summary>
    /// Configure PapiClient to call <paramref name="eventHandler"/> whenever an event of type <paramref name="eventType"/> is received.
    /// </summary>
    /// <param name="eventType">Event type to monitor</param>
    /// <param name="eventHandler">Function that optionally returns messages to send when an event is received</param>
    public void RegisterEventHandler(
        Enum<EventType> eventType,
        Func<dynamic?, Message?> eventHandler
    )
    {
        ObjectDisposedException.ThrowIf(_isDisposed, this);

        var msgHandler = (MessageHandlerEvent)_messageHandlersByMessageType[MessageType.Event];
        msgHandler.RegisterEventHandler(eventType, eventHandler);
        Console.WriteLine($"Handler for event type \"{eventType}\" successfully registered");
    }

    /// <summary>
    /// Configure PapiClient to no longer call <paramref name="eventHandler"/> whenever an event of type <paramref name="eventType"/> is received.
    /// </summary>
    /// <param name="eventType">Event type to monitor</param>
    /// <param name="eventHandler">Same function reference previously passed to RegisterEventHandler</param>
    public void UnregisterEventHandler(
        Enum<EventType> eventType,
        Func<dynamic?, Message?> eventHandler
    )
    {
        ObjectDisposedException.ThrowIf(_isDisposed, this);

        var msgHandler = (MessageHandlerEvent)_messageHandlersByMessageType[MessageType.Event];
        msgHandler.UnregisterEventHandler(eventType, eventHandler);
        Console.WriteLine($"Handler for event type \"{eventType}\" successfully unregistered");
    }

    /// <summary>
    /// Send an event message to the server.
    /// </summary>
    /// <param name="message">Event message to send</param>
    public void SendEvent(MessageEvent message)
    {
        ObjectDisposedException.ThrowIf(_isDisposed, this);

        QueueOutgoingMessage(message);
    }

    #endregion

    #region Private helper methods for any thread to call

    /// <summary>
    /// Queues the specified message to be sent to the server
    /// </summary>
    /// <param name="message">Message to send</param>
    private void QueueOutgoingMessage(Message message)
    {
        _outgoingMessages.Add(message, _cancellationToken);
    }

    /// <summary>
    /// This should signal anything that is waiting on potential new data to stop waiting
    /// </summary>
    private void SignalToBeginGracefulDisconnect()
    {
        // This should shut down the socket and messaging threads
        _cancellationTokenSource.Cancel();

        // This will make sure anything else blocked on the queue is freed
        _outgoingMessages.CompleteAdding();
    }

    #endregion

    #region Private methods for the outgoing messaging thread to use exclusively

    /// <summary>
    /// Entry point for the outgoing messaging thread
    /// Pulls messages out of the queue and sends them to the server
    /// </summary>
    private async void HandleOutgoingMessages()
    {
        try
        {
            Console.WriteLine("PapiClient HandleOutgoingMessages starting");

            do
            {
                try
                {
                    Message message = _outgoingMessages.Take(_cancellationToken);
                    await SendOutgoingMessageAsync(message);
                }
                catch (OperationCanceledException)
                {
                    break;
                }
                catch (Exception ex)
                {
                    await Console.Error.WriteLineAsync(
                        $"Exception while sending outgoing messages: {ex}"
                    );
                }
            } while (!_cancellationToken.IsCancellationRequested && Connected);

            Console.WriteLine("PapiClient HandleOutgoingMessages finishing");
        }
        catch (ObjectDisposedException) { }
    }

    private async Task SendOutgoingMessageAsync(Message message)
    {
        message.SenderId = _clientId;
        string jsonData = JsonSerializer.Serialize(message, s_serializationOptions);
        /* Helpful for debugging
        Console.WriteLine(
            "Sending message over websocket: {0}",
            StringUtils.LimitLength(jsonData, 180)
        );
        */
        byte[] data = s_utf8WithoutBom.GetBytes(jsonData);
        await _webSocket.SendAsync(data, WebSocketMessageType.Text, true, _cancellationToken);
    }

    #endregion

    #region Private methods for the incoming messaging thread to use exclusively

    /// <summary>
    /// Entry point for the incoming messaging thread
    /// Receives and processes messages coming from the server
    /// </summary>
    private async void HandleIncomingMessages()
    {
        try
        {
            Console.WriteLine("PapiClient HandleIncomingMessages starting");

            do
            {
                try
                {
                    Message? message = await ReceiveIncomingMessageAsync();
                    // Handle each message asynchronously so we can keep receiving more messages
                    _ = Task.Run(
                        () =>
                        {
                            HandleIncomingMessage(message);
                        },
                        _cancellationToken
                    );
                }
                catch (OperationCanceledException)
                {
                    break;
                }
                catch (Exception ex)
                {
                    await Console.Error.WriteLineAsync($"Exception while handling messages: {ex}");
                }
            } while (!_cancellationToken.IsCancellationRequested && Connected);

            Console.WriteLine("PapiClient HandleIncomingMessages finishing");
        }
        catch (ObjectDisposedException) { }
    }

    private async Task<Message?> ReceiveIncomingMessageAsync()
    {
        using MemoryStream message = new(RECEIVE_BUFFER_LENGTH);
        byte[] buffer = new byte[RECEIVE_BUFFER_LENGTH];
        Memory<byte> bufferMemory = new(buffer);
        ValueWebSocketReceiveResult result;
        do
        {
            result = await _webSocket.ReceiveAsync(bufferMemory, _cancellationToken);
            switch (result.MessageType)
            {
                case WebSocketMessageType.Text:
                    message.Write(buffer, 0, result.Count);
                    break;
                case WebSocketMessageType.Binary:
                    throw new InvalidOperationException("Can't handle binary data yet.");
                case WebSocketMessageType.Close:
                    SignalToBeginGracefulDisconnect();
                    return null;
                default:
                    throw new Exception($"Unknown WebSocketMessageType: {result.MessageType}");
            }
        } while (!result.EndOfMessage);

        string jsonData = s_utf8WithoutBom.GetString(message.GetBuffer(), 0, (int)message.Position);
        /* Helpful for debugging
        Console.WriteLine(
            "Received message over websocket: {0}",
            StringUtils.LimitLength(jsonData, 180)
        );
        */
        return JsonSerializer.Deserialize<Message>(jsonData, s_serializationOptions);
    }

    #endregion

    #region Private methods for thread pool threads to use exclusively

    /// <summary>
    /// Entry point for thread pool threads
    /// Message handler for any kind of message
    /// </summary>
    private void HandleIncomingMessage(Message? message)
    {
        try
        {
            if (message is null)
            {
                if (!_cancellationToken.IsCancellationRequested)
                    Console.Error.WriteLine("Received null message!");
                return;
            }

            if (message is MessageResponse messageResponse)
            {
                HandleIncomingMessageResponse(messageResponse);
                return;
            }

            if (_messageHandlersByMessageType.TryGetValue(message.Type, out var messageHandler))
            {
                foreach (var messageToSend in messageHandler.HandleMessage(message))
                {
                    QueueOutgoingMessage(messageToSend);
                }
            }
            else
            {
                Console.Error.WriteLine($"No handler registered for message type: {message.Type}");
            }
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine($"Exception while handling message: {ex}");
        }
    }

    /// <summary>
    /// Message handler for a response to a request we previously sent
    /// </summary>
    private void HandleIncomingMessageResponse(MessageResponse response)
    {
        // Remove, don't just get, the response handler since the request is complete
        if (_messageHandlersForMyRequests.TryRemove(response.RequestId, out var messageHandler))
        {
            foreach (var messageToSend in messageHandler.HandleMessage(response))
            {
                QueueOutgoingMessage(messageToSend);
            }
        }
        else
        {
            Console.Error.WriteLine(
                $"No handler registered for response from request ID: {response.RequestId}"
            );
        }
    }

    #endregion
}

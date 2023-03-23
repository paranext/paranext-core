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
internal sealed class PapiClient : IMessageSink
{
    #region Delegates/Constants/Member variables
    private const int CONNECT_TIMEOUT = 30000;
    private const int RECEIVE_BUFFER_LENGTH = 2048;
    private static readonly Encoding s_utf8WithoutBOM = new UTF8Encoding();
    private static readonly Uri s_connectionUri = new("ws://localhost:8876");
    private static readonly JsonSerializerOptions s_serializationOptions;

    private readonly Dictionary<Enum<MessageType>, IMessageHandler> _messageHandlersByMessageType = new ();
    private readonly ConcurrentDictionary<int, IMessageHandler> _messageHandlersForMyRequests = new ();
    private readonly ClientWebSocket _webSocket;
    private int _clientId = MessageInitClient.NetworkConnectorInfo.CLIENT_ID_UNSET;
    private int _nextRequestId = 1;
    #endregion

    #region Constructors
    static PapiClient()
    {
        s_serializationOptions = SerializationOptions.CreateSerializationOptions();
        s_serializationOptions.Converters.Add(new MessageConverter());
    }

    public PapiClient()
    {
        _webSocket = new ClientWebSocket();
        _messageHandlersByMessageType[MessageType.Event] = new MessageHandlerEvent();
        _messageHandlersByMessageType[MessageType.Request] = new MessageHandlerRequestByRequestType(this);
    }
    #endregion

    #region Properties
    /// <summary>
    /// Gets whether connection is open to the server
    /// </summary>
    public bool Connected => _webSocket.State == WebSocketState.Open;
    #endregion

    #region Public methods
    /// <summary>
    /// Opens a connection with the server
    /// </summary>
    public async Task Connect()
    {
        CancellationTokenSource cancelTokenSource = new(CONNECT_TIMEOUT);
        try
        {
            await _webSocket.ConnectAsync(s_connectionUri, cancelTokenSource.Token);

            MessageInitClient? message = await ReceiveMessage<MessageInitClient>();
            if (message == null || message.ConnectorInfo == null)
            {
                // Something went wrong with our connection and we didn't get a response we expected.
                // TODO: Handle this better
                await Close();
                return;
            }

            _clientId = message.ConnectorInfo.ClientId;
            await SendMessage(new MessageClientConnect(_clientId));
        }
        catch (Exception ex)
        {
            // TODO: Handle failures better
            Console.WriteLine("Exception: {0}", ex);
        }
    }

    /// <summary>
    /// Gracefully closes the connection to the server.
    /// </summary>
    public async Task Close()
    {
        await _webSocket.CloseAsync(WebSocketCloseStatus.NormalClosure, string.Empty, CancellationToken.None);
        _webSocket.Dispose();
    }

    /// <summary>
    /// Registers a request handler with the server
    /// </summary>
    /// <param name="requestToHandle">The request to register</param>
    /// <param name="doStuff">Method that is called when the request is received from the server</param>
    /// <param name="responseTimeoutInMS">Number of milliseconds to wait for the registration response to be received</param>
    /// <returns>True if the registration was successful</returns>
    public async Task<bool> RegisterRequestHandler(
        Enum<RequestType> requestToHandle,
        Func<dynamic, ResponseToRequest> doStuff,
        int responseTimeoutInMS = 1000)
    {
        Console.WriteLine($"Registering handler for request type {requestToHandle}...");
        bool registrationSucceeded = false;
        ManualResetEventSlim registrationComplete = new(false);

        var registerRequest = new MessageRequest(
            _clientId,
            RequestType.RegisterRequest,
            Interlocked.Increment(ref _nextRequestId),
            new dynamic[] { requestToHandle.ToString(), _clientId });

        _messageHandlersForMyRequests[registerRequest.RequestId] =
            new MessageHandlerResponse(registerRequest, (bool success, dynamic? data) =>
            {
                if (!success)
                {
                    Console.Error.WriteLine("Failed to register request type \"{0}\" with the server", registerRequest.RequestType);
                }
                else
                {
                    var responder = _messageHandlersByMessageType[MessageType.Request];
                    if (responder == null)
                    {
                        Console.Error.WriteLine("No message handler registered for MessageType.Request");
                    }
                    else if (responder is MessageHandlerRequestByRequestType responderToUpdate)
                    {
                        responderToUpdate.SetHandlerForRequestType(requestToHandle, doStuff);
                        Console.WriteLine("Request type for \"{0}\" successfully registered", requestToHandle);
                        registrationSucceeded = true;
                    }
                    else
                    {
                        Console.Error.WriteLine("Unexpected message handler registered for MessageType.Request");
                    }
                }

                registrationComplete.Set();
            });
        
        await SendMessage(registerRequest);
        if (!registrationComplete.Wait(responseTimeoutInMS))
        {
            Console.Error.WriteLine("No response came back when registering request type \"{0}\"", requestToHandle);
        }
        return registrationSucceeded;
    }

    /// <summary>
    /// Gets and processes messages coming from the server.
    /// Blocks until the connection is closed
    /// </summary>
    public async Task HandleMessages()
    {
        // Handle any messages sent from the server
        do
        {
            try
            {
                Console.WriteLine("Waiting for a request...");
                Task<Message?> receiveTask = ReceiveMessage<Message>();
                Message? message = await receiveTask;
                if (receiveTask.Exception != null)
                {
                    Console.Error.WriteLine("Error getting message:\n" + receiveTask.Exception);
                    continue;
                }
                if (message is null)
                {
                    Console.Error.WriteLine("Received null message!");
                    continue;
                }

                Console.WriteLine("Received message of type: {0}", message.Type);
                if (message is MessageResponse response)
                {
                    // Remove, don't just get, the response handler since the request is complete
                    if (_messageHandlersForMyRequests.TryRemove(response.RequestId, out IMessageHandler? messageHandler))
                    {
                        messageHandler.HandleMessage(message);
                    }
                    else
                    {
                        Console.Error.WriteLine("No handler registered for response from request ID: {0}", response.RequestId);
                        continue;
                    }
                }
                else
                {
                    if (_messageHandlersByMessageType.TryGetValue(message.Type, out IMessageHandler? messageHandler))
                    {
                        messageHandler.HandleMessage(message);
                    }
                    else
                    {
                        Console.Error.WriteLine("No handler registered for message type: {0}", message.Type);
                        continue;
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception while handling message: {0}", ex);
            }
        } while (Connected);
    }
    #endregion

    #region Private helper methods
    /// <summary>
    /// Sends the specified message to the server
    /// </summary>
    public async Task SendMessage(Message message)
    {
        if (_webSocket.State != WebSocketState.Open)
            throw new InvalidOperationException("Can not send data when the socket is closed");

        message.SenderId = _clientId;
        string jsonData = JsonSerializer.Serialize(message, s_serializationOptions);
        Console.WriteLine("Sending message over websocket: {0}", jsonData);
        byte[] data = s_utf8WithoutBOM.GetBytes(jsonData);
        await _webSocket.SendAsync(data, WebSocketMessageType.Text, true, CancellationToken.None);
    }

    /// <summary>
    /// Waits to receive a message from the server
    /// </summary>
    /// <typeparam name="TReturn">The expected message return type or use Message if unknown.</typeparam>
    private async Task<TReturn?> ReceiveMessage<TReturn>() where TReturn : Message
    {
        if (_webSocket.State != WebSocketState.Open)
            throw new InvalidOperationException("Can not receive data when the socket is closed");

        using MemoryStream message = new(RECEIVE_BUFFER_LENGTH);

        byte[] buffer = new byte[RECEIVE_BUFFER_LENGTH];
        Memory<byte> bufferMemory = new(buffer);
        ValueWebSocketReceiveResult result;
        do
        {
            result = await _webSocket.ReceiveAsync(bufferMemory, CancellationToken.None);  // Wait forever
            if (result.MessageType == WebSocketMessageType.Binary)
                throw new InvalidOperationException("Can't handle binary data yet.");

            if (result.MessageType == WebSocketMessageType.Close)
            {
                // TODO: Handle close request better
                await Close();
                return null;
            }

            message.Write(buffer, 0, result.Count);
        } while (!result.EndOfMessage);

        string jsonData = s_utf8WithoutBOM.GetString(message.GetBuffer(), 0, (int)message.Position);
        Console.WriteLine("Received message over websocket: {0}", jsonData);
        return JsonSerializer.Deserialize<TReturn>(jsonData, s_serializationOptions);
    }
    #endregion
}

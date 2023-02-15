using System.Net.WebSockets;
using System.Reflection.Metadata;
using System.Text;
using System.Text.Json;
using Paranext.DataProvider.Data;
using Paranext.DataProvider.Utils;
using PtxUtils;

namespace Paranext.DataProvider.Web;

/// <summary>
/// Class to facilitate communication to the Paranext server via the PAPI
/// </summary>
internal sealed class PapiClient
{
    #region Delegates/Constants/Member variables
    private delegate Task RequestHandler(dynamic requestData, Enum<RequestTypes> requestType,
        int requestId, int requesterId);

    private const int CONNECT_TIMEOUT = 30000;
    private const int RECEIVE_BUFFER_LENGTH = 2048;
    private static readonly Encoding UTF8WithoutBOM = new UTF8Encoding();
    private static readonly Uri ConnectionUri = new("ws://localhost:8876");
    private static readonly JsonSerializerOptions serializationOptions;

    private readonly Dictionary<Enum<RequestTypes>, RequestHandler> requestFunctionMap = new();
    private readonly ClientWebSocket _webSocket;
    private int _clientId = NetworkConnectorInfo.CLIENT_ID_UNSET;
    private int requestId;
    #endregion

    #region Constructors
    static PapiClient()
    {
        serializationOptions = JsonUtils.CreateSerializationOptions();
        serializationOptions.Converters.Add(new MessageConverter());
    }

    public PapiClient()
    {
        _webSocket = new ClientWebSocket();
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
            await _webSocket.ConnectAsync(ConnectionUri, cancelTokenSource.Token);

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
    /// <param name="doStuff">Method that is called when the request is recieved from the server</param>
    /// <returns>True if the registration was successful</returns>
    public async Task<bool> RegisterRequest(Enum<RequestTypes> requestToHandle, Func<dynamic, RequestReturn> doStuff)
    {
        Console.WriteLine($"Registering request {requestToHandle}...");
        await SendMessage(new MessageRequest(_clientId, RequestTypes.RegisterRequest, requestId++,
            new dynamic[] {requestToHandle.ToString(), _clientId}));

        Task<MessageResponse?> responseTask = ReceiveMessage<MessageResponse>();
        MessageResponse? response = await responseTask;
        if (responseTask.Exception != null)
        {
            Console.Error.WriteLine("Error registering request: " + responseTask.Exception);
            return false;
        }

        if (response == null || !response.Success)
        {
            Console.Error.WriteLine("Failed to register request with the server");
            if (response?.ErrorMessage != null)
                Console.Error.WriteLine("Message: " + response.ErrorMessage);
            return false;
        }

        async Task HandleRequest(dynamic requestData, Enum<RequestTypes> requestType, int requestId, int requesterId) {
            RequestReturn result = doStuff(requestData);
            if (result.Success)
                await SendMessage(new MessageResponse(_clientId, requestType, requestId, requesterId, result.Contents));
            else
                await SendMessage(new MessageResponse(_clientId, requestType, requestId, requesterId, result.ErrorMessage!));
        }

        Console.WriteLine("Request successfully registered");
        requestFunctionMap.Add(requestToHandle, HandleRequest);
        return true;
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
            Console.WriteLine("Waiting for a request...");
            Task<Message?> receiveTask = ReceiveMessage<Message>();
            Message? message = await receiveTask;
            if (receiveTask.Exception != null)
            {
                Console.Error.WriteLine("Error getting message:\n" + receiveTask.Exception);
                continue;
            }

            Console.WriteLine("Got request: " + message?.ToString());

            if (message is MessageRequest request)
            {
                if (!requestFunctionMap.TryGetValue(request.RequestType, out RequestHandler? requestHandler))
                {
                    Console.Error.WriteLine("Unexpected request from server: " + request.RequestType);
                    continue;
                }

                await requestHandler(request.Contents, request.RequestType, request.RequestId, request.SenderId);
            }
        } while (Connected);
    }
    #endregion

    #region Private helper methods
    /// <summary>
    /// Sends the specified message to the server
    /// </summary>
    private async Task SendMessage(Message message)
    {
        if (_webSocket.State != WebSocketState.Open)
           throw new InvalidOperationException("Can not send data when the socket is closed");

        string jsonData = JsonSerializer.Serialize(message, serializationOptions);
        byte[] data = UTF8WithoutBOM.GetBytes(jsonData);
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

            message.Write(buffer, 0, result .Count);
        } while (!result.EndOfMessage);

        string jsonData = UTF8WithoutBOM.GetString(message.GetBuffer(), 0, (int)message.Position);
        return JsonSerializer.Deserialize<TReturn>(jsonData, serializationOptions);
    }
    #endregion
}

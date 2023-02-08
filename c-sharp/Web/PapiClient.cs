using System.Net.WebSockets;
using System.Text;
using System.Text.Json;
using Paranext.DataProvider.Data;
using Paranext.DataProvider.Utils;

namespace Paranext.DataProvider.Web;

/// <summary>
/// Class to facilitate communication to the server via the PAPI
/// </summary>
internal sealed class PapiClient
{
    #region Constants/Member variables
    private const int CONNECT_TIMEOUT = 30000;
    private const int RECEIVE_BUFFER_LENGTH = 2048;
    private static readonly Encoding UTF8WithoutBOM = new UTF8Encoding();
    private static readonly Uri ConnectionUri = new("ws://localhost:8876");
    private static readonly JsonSerializerOptions serializationOptions;

    private readonly ClientWebSocket _webSocket;
    private int _clientId = NetworkConnectorInfo.CLIENT_ID_UNSET;
    #endregion

    #region Constructors
    static PapiClient()
    {
        serializationOptions = JsonUtils.CreateSerializationOptions();
        serializationOptions.Converters.Add(new MessageCreationConverter());
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

            await SendMessage(new MessageClientConnect() { SenderId = _clientId });
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
    /// Sends the specified message to the server
    /// </summary>
    public async Task SendMessage(Message message)
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
    public async Task<TReturn?> ReceiveMessage<TReturn>() where TReturn : Message
    {
        if (_webSocket.State != WebSocketState.Open)
            throw new InvalidOperationException("Can not receive data when the socket is closed");

        using MemoryStream message = new(RECEIVE_BUFFER_LENGTH);

        byte[] buffer = new byte[RECEIVE_BUFFER_LENGTH];
        Memory<byte> bufferMemory = new(buffer);
        ValueWebSocketReceiveResult result;
        do
        {
            result = await _webSocket.ReceiveAsync(bufferMemory, CancellationToken.None);
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

using PtxUtils;

namespace Paranext.DataProvider.Data;

// **********************************************************************************************
// NOTE: The types defined in this file should match what is defined in NetworkConnectorTypes.ts
// **********************************************************************************************

#region MessageType class
public sealed class MessageType : EnumType
{
    public static readonly Enum<MessageType> InitClient = new("init-client");
    public static readonly Enum<MessageType> ClientConnect = new("client-connect");
    public static readonly Enum<MessageType> Request = new("request");
    public static readonly Enum<MessageType> Response = new("response");

    private MessageType() { } // Can't create an instance
}
#endregion

#region RequestTypes class
public sealed class RequestTypes : EnumType
{
    public static readonly Enum<RequestTypes> RegisterRequest = new("server:registerRequest");

    public static readonly Enum<RequestTypes> AddOne = new("command:addOne");

    private RequestTypes() { } // Can't create an instance
}
#endregion

#region NetworkConnectorInfo class
public sealed class NetworkConnectorInfo
{
    public const int CLIENT_ID_UNSET = -1;

    /// <summary>
    /// ONLY FOR DESERIALIZATION
    /// </summary>
    private NetworkConnectorInfo()
    {
    }

    public NetworkConnectorInfo(int clientId)
    {
        ClientId = clientId;
    }

    public int ClientId { get; set; } = CLIENT_ID_UNSET;
}
#endregion

#region Message class
/// <summary>
/// Base class for messages sent over the websocket connection
/// </summary>
public abstract class Message
{
    protected Message(int senderId)
    {
        SenderId = senderId;
    }

    public const int UNKNOWN_SENDER_ID = -1;

    public abstract Enum<MessageType> Type { get; }

    public int SenderId { get; set; } = UNKNOWN_SENDER_ID;
}
#endregion

#region MessageInitClient class
/// <summary>
/// Message sent to the client to give it NetworkConnectorInfo
/// </summary>
public sealed class MessageInitClient : Message
{
    /// <summary>
    /// ONLY FOR DESERIALIZATION
    /// </summary>
    private MessageInitClient() : base(UNKNOWN_SENDER_ID)
    {
    }

    public MessageInitClient(int senderId, NetworkConnectorInfo connectorInfo) : base(senderId)
    {
        ConnectorInfo = connectorInfo;
    }

    public override Enum<MessageType> Type => MessageType.InitClient;

    public NetworkConnectorInfo? ConnectorInfo { get; set; }
}
#endregion

#region MessageClientConnect class
/// <summary>
/// Message responding to the server to let it know this connection is ready to receive messages
/// </summary>
public sealed class MessageClientConnect : Message
{
    /// <summary>
    /// ONLY FOR DESERIALIZATION
    /// </summary>
    private MessageClientConnect() : base(UNKNOWN_SENDER_ID)
    {
    }

    public MessageClientConnect(int senderId) : base(senderId)
    {
    }

    public override Enum<MessageType> Type => MessageType.ClientConnect;
}
#endregion

#region MessageRequest class
/// <summary>
/// Message requests to/from the server.
/// </summary>
public sealed class MessageRequest : Message
{
    /// <summary>
    /// ONLY FOR DESERIALIZATION
    /// </summary>
    private MessageRequest() : base(UNKNOWN_SENDER_ID)
    {
    }

    public MessageRequest(int senderId, Enum<RequestTypes> requestType, int requestId, dynamic? contents) : base(senderId)
    {
        RequestType = requestType;
        RequestId = requestId;
        Contents = contents;
    }

    public override Enum<MessageType> Type => MessageType.Request;

    public Enum<RequestTypes> RequestType { get; set; }

    public int RequestId { get; set; }

    public dynamic? Contents { get; set; }
}
#endregion

#region MessageResponse class
/// <summary>
/// Message responses from/to the server - It is the result of sending/getting a request
/// </summary>
public sealed class MessageResponse : Message
{
    /// <summary>
    /// ONLY FOR DESERIALIZATION
    /// </summary>
    private MessageResponse() : base(UNKNOWN_SENDER_ID)
    {
    }

    /// <summary>
    /// Response when there was an error - no contents
    /// </summary>
    public MessageResponse(int senderId, Enum<RequestTypes> requestType, int requestId,
        int requesterId, string errorMessage) : base(senderId)
    {
        RequestType = requestType;
        RequestId = requestId;
        RequesterId = requesterId;
        Success = false;
        ErrorMessage = errorMessage;
    }

    /// <summary>
    /// Response when successful
    /// </summary>
    public MessageResponse(int senderId, Enum<RequestTypes> requestType, int requestId,
        int requesterId, dynamic? contents) : base(senderId)
    {
        RequestType = requestType;
        RequestId = requestId;
        RequesterId = requesterId;
        Success = true;
        Contents = contents;
    }

    public sealed override Enum<MessageType> Type => MessageType.Response;

    public Enum<RequestTypes> RequestType { get; set; }

    public bool Success { get; set; }

    public string? ErrorMessage { get; set; }

    public int RequestId { get; set; }

    public int RequesterId { get; set; }

    public dynamic? Contents { get; set; }
}
#endregion

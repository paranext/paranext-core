using System.Text.Json.Serialization;
using PtxUtils;

namespace Paranext.DataProvider.Data;

// **********************************************************************************************
// NOTE: The types defined in this file should match what is defined in NetworkConnectorTypes.ts
// **********************************************************************************************

#region MessageType class
public sealed class MessageType : EnumType
{
    public static readonly Enum<MessageType> InitClient = new("initClient");
    public static readonly Enum<MessageType> ClientConnect = new("clientConnect");
    public static readonly Enum<MessageType> Request = new("request");
    public static readonly Enum<MessageType> Response = new("response");
}
#endregion

#region NetworkConnectorInfo class
public sealed class NetworkConnectorInfo
{
    public const int CLIENT_ID_UNSET = -1;

    public NetworkConnectorInfo()
    {
        ClientId = CLIENT_ID_UNSET;
    }

    public int ClientId { get; set; }
}
#endregion

#region Message class
/// <summary>
/// Base class for messages sent over the websocket connection
/// </summary>
public abstract class Message
{
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
    public override Enum<MessageType> Type => MessageType.ClientConnect;
}
#endregion

#region MessageRequest class
/// <summary>
/// Base class for message requests
/// </summary>
/// <typeparam name="TParam">The type of the message contents</typeparam>
public abstract class MessageRequest<TParam> : Message
{
    public override Enum<MessageType> Type => MessageType.Request;

    public abstract string RequestType { get; }

    public int RequestId { get; set; }
    public TParam? Contents { get; set; }
}
#endregion

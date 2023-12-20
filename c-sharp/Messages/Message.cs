namespace Paranext.DataProvider.Messages;

/// <summary>
/// Base class for messages sent over the websocket connection
/// </summary>
public class Message
{
    private Message()
    {
        SenderId = UNKNOWN_SENDER_ID;
        Type = MessageType.UNKNOWN;
    }

    protected Message(string messageType)
    {
        SenderId = UNKNOWN_SENDER_ID;
        Type = messageType;
    }

    protected Message(string messageType, int senderId)
    {
        SenderId = senderId;
        Type = messageType;
    }

    public const int UNKNOWN_SENDER_ID = -1;

    /// <summary>
    /// Message type
    /// </summary>
    public string Type { get; protected set; }

    /// <summary>
    /// ID (as assigned by the server) of the original sender of this message
    /// </summary>
    public int SenderId { get; set; }

    public override string ToString()
    {
        return $"MessageType: {Type} from {SenderId}";
    }
}

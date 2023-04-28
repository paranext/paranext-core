using PtxUtils;

namespace Paranext.DataProvider.Messages;

/// <summary>
/// Base class for messages sent over the websocket connection
/// </summary>
public abstract class Message
{
    protected Message(int senderId)
    {
        SenderId = senderId;
    }

    protected Message()
    {
        SenderId = UNKNOWN_SENDER_ID;
    }

    public const int UNKNOWN_SENDER_ID = -1;

    /// <summary>
    /// Message type
    /// </summary>
    public abstract Enum<MessageType> Type { get; }

    /// <summary>
    /// ID (as assigned by the server) of the original sender of this message
    /// </summary>
    public int SenderId { get; set; }

    public override string ToString()
    {
        return $"Type: {Type} from {SenderId}";
    }
}

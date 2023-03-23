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

    public const int UNKNOWN_SENDER_ID = -1;

    public abstract Enum<MessageType> Type { get; }

    public int SenderId { get; set; } = UNKNOWN_SENDER_ID;

    public override string ToString()
    {
        return $"Type: {Type} from {SenderId}";
    }
}

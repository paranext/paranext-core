using PtxUtils;

namespace Paranext.DataProvider.Messages;

/// <summary>
/// Message events to/from the server.
/// </summary>
public sealed class MessageEvent : Message
{
    /// <summary>
    /// ONLY FOR DESERIALIZATION
    /// </summary>
    private MessageEvent() : base(UNKNOWN_SENDER_ID)
    {
    }

    public MessageEvent(int senderId, dynamic? contents) : base(senderId)
    {
        Contents = contents;
    }

    public override Enum<MessageType> Type => MessageType.Event;

    public dynamic? Contents { get; set; }

    public override string ToString()
    {
        return $"Event: {Contents} from {SenderId}";
    }
}

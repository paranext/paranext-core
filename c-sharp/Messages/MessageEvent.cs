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
    private MessageEvent() { }

    public MessageEvent(string? eventType)
    {
        EventType = eventType;
    }

    public override Enum<MessageType> Type => MessageType.Event;

    public string? EventType { get; set; }

    public override string ToString()
    {
        return $"Event: {EventType} from {SenderId}";
    }
}

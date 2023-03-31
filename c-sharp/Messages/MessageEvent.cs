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

    public MessageEvent(Enum<EventType> eventType, dynamic? eventContents)
    {
        EventType = eventType;
        Event = eventContents;
    }

    public override Enum<MessageType> Type => MessageType.Event;

    public Enum<EventType> EventType { get; set; }

    public dynamic? Event { get; set; }

    public override string ToString()
    {
        return $"Event: {EventType} from {SenderId} is {Event}";
    }
}

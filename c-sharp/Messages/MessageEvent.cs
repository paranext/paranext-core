using Paranext.DataProvider.JsonUtils;

namespace Paranext.DataProvider.Messages;

/// <summary>
/// Message events to/from the server.
/// </summary>
[JsonMessageDeserialization(MessageField.MESSAGE_TYPE, MessageType.EVENT)]
public class MessageEvent : Message
{
    /// <summary>
    /// ONLY FOR DESERIALIZATION
    /// </summary>
    private MessageEvent()
        : base(MessageType.EVENT)
    {
        EventType = Messages.EventType.UNKNOWN;
        Event = null;
    }

    public MessageEvent(string eventType, object? eventContents)
        : base(MessageType.EVENT)
    {
        EventType = eventType;
        Event = eventContents;
    }

    public string EventType { get; set; }

    /// <summary>
    /// Weakly typed event contents - subclasses hide this with a strongly typed property
    /// </summary>
    public object? Event { get; set; }

    public override string ToString()
    {
        return base.ToString() + $", EventType = {EventType}";
    }
}

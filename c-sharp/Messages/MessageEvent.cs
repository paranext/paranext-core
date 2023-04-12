using PtxUtils;

namespace Paranext.DataProvider.Messages;

/// <summary>
/// Message events to/from the server.
/// </summary>
public class MessageEvent : Message
{
    /// <summary>
    /// ONLY FOR DESERIALIZATION
    /// </summary>
    protected MessageEvent()
    {
        // Default for new events that don't have a custom class
        EventContentsType = typeof(System.Text.Json.JsonElement);
    }

    public override Enum<MessageType> Type => MessageType.Event;

    public virtual Enum<EventType> EventType { get; set; }

    /// <summary>
    /// Weakly typed contents of the event message. See also <seealso cref="MessageEventGeneric{ContentsType}.EventContents"/>
    /// </summary>
    public dynamic? Event { get; set; }

    /// <summary>
    /// The intended type of the data stored in <see cref="Event"/>. This is used during deserialization.
    /// </summary>
    [System.Text.Json.Serialization.JsonIgnore]
    public Type EventContentsType { get; protected set; }

    public override string ToString()
    {
        return $"Event: {EventType} from {SenderId} is \"{Event}\"";
    }
}

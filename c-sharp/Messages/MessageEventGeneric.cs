using PtxUtils;

namespace Paranext.DataProvider.Messages;

/// <summary>
/// This is what all event messages (other than "MessageEvent" itself) should use as a base class
/// </summary>
public abstract class MessageEventGeneric<ContentsType> : MessageEvent
// Unfortunately using the EventType as a generic type is not supported, as in "MessageEventGeneric<EventType, ContentsType>".
// You can't pass any old object as a type to generics. They must be System.Type values, and PtxUtils.Enum values are not System.Type values.
// Even if PtxUtils.Enum values were actually enums it wouldn't help.  https://stackoverflow.com/a/1331811/7303994
{
    private readonly Enum<EventType> _eventType;

    protected MessageEventGeneric(Enum<EventType> eventType)
    {
        _eventType = eventType;
        EventContentsType = typeof(ContentsType);
    }

    protected MessageEventGeneric(Enum<EventType> eventType, ContentsType eventContents)
        : this(eventType)
    {
        Event = eventContents;
    }

    public sealed override Enum<EventType> EventType => _eventType;

    /// <summary>
    /// Strongly typed contents of the event message. See also <seealso cref="MessageEvent.Event"/>
    /// </summary>
    [System.Text.Json.Serialization.JsonIgnore]
    public ContentsType? EventContents
    {
        get { return Event; }
    }
}

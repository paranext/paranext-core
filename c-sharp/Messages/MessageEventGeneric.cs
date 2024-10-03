namespace Paranext.DataProvider.Messages;

/// <summary>
/// Message events to/from the server.
/// </summary>
public class MessageEventGeneric<TContents> : MessageEvent
{
    private TContents _contents;

    /// <summary>
    /// ONLY FOR DESERIALIZATION
    /// </summary>
    private MessageEventGeneric()
        : base(Messages.EventType.UNKNOWN, default)
    {
        _contents = default!;
    }

    public MessageEventGeneric(string eventType, TContents eventContents)
        : base(eventType, eventContents)
    {
        _contents = eventContents;
    }

    public new TContents Event
    {
        get => _contents;
        // When we update the strongly typed event variable,
        // also update the weakly typed one owned by MessageEvent
        set
        {
            _contents = value;
            base.Event = _contents!;
        }
    }

    public override string ToString()
    {
        return base.ToString() + $", Event = {Event}";
    }
}

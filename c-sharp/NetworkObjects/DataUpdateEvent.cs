using Paranext.DataProvider.Messages;
using PtxUtils;

namespace Paranext.DataProvider.NetworkObjects
{
    internal sealed class DataUpdateEvent : MessageEventGeneric<bool>
    {
        // A parameterless constructor is required for serialization to work, but we never need to deserialize this particular event. So just use a null event type.
        // Because the event types are dynamic based on data provider names, we can't create every possible event type ahead of time.
        public DataUpdateEvent()
            : base(Enum<EventType>.Null) { }

        public DataUpdateEvent(Enum<EventType> eventType, bool eventContents)
            : base(eventType, eventContents) { }
    }
}

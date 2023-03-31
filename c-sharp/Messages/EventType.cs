using PtxUtils;

namespace Paranext.DataProvider.Messages;

public sealed class EventType : EnumType
{
    public static readonly Enum<EventType> ClientConnect = new("network:onDidClientConnect");
    public static readonly Enum<EventType> ClientDisconnect = new("network:onDidClientDisconnect");
    public static readonly Enum<EventType> ObjectDispose = new("object:onDidDisposeNetworkObject");

    private EventType() { } // Can't create an instance
}

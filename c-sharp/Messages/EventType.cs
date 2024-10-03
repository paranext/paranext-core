namespace Paranext.DataProvider.Messages;

/// <summary>
/// These are well known event types, but there isn't a fixed set of all possible event types
/// </summary>
public static class EventType
{
    public const string UNKNOWN = "UNKNOWN";
    public const string CLIENT_CONNECT = "network:onDidClientConnect";
    public const string CLIENT_DISCONNECT = "network:onDidClientDisconnect";
    public const string OBJECT_DISPOSE = "object:onDidDisposeNetworkObject";
    public const string OBJECT_CREATE = "object:onDidCreateNetworkObject";
}

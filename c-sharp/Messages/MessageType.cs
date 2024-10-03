namespace Paranext.DataProvider.Messages;

/// <summary>
/// This should represent all possible message types
/// </summary>
public static class MessageType
{
    public const string UNKNOWN = "UNKNOWN";
    public const string INIT_CLIENT = "init-client";
    public const string CLIENT_CONNECT = "client-connect";
    public const string REQUEST = "request";
    public const string RESPONSE = "response";
    public const string EVENT = "event";
}

using PtxUtils;

namespace Paranext.DataProvider.Messages;

public sealed class MessageType : EnumType
{
    public static readonly Enum<MessageType> InitClient = new("init-client");
    public static readonly Enum<MessageType> ClientConnect = new("client-connect");
    public static readonly Enum<MessageType> Request = new("request");
    public static readonly Enum<MessageType> Response = new("response");
    public static readonly Enum<MessageType> Event = new("event");

    private MessageType() { } // Can't create an instance
}

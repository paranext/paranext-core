using PtxUtils;

namespace Paranext.DataProvider.Messages;

// **********************************************************************************************
// NOTE: The types defined in this file should match what is defined in NetworkConnectorTypes.ts
// **********************************************************************************************
public sealed class MessageType : EnumType
{
    public static readonly Enum<MessageType> InitClient = new("init-client");
    public static readonly Enum<MessageType> ClientConnect = new("client-connect");
    public static readonly Enum<MessageType> Request = new("request");
    public static readonly Enum<MessageType> Response = new("response");
    public static readonly Enum<MessageType> Event = new("event");

    private MessageType() { } // Can't create an instance
}

using Paranext.DataProvider.JsonUtils;

namespace Paranext.DataProvider.Messages;

[JsonMessageDeserialization(
    MessageField.MESSAGE_TYPE,
    MessageType.EVENT,
    MessageField.EVENT_TYPE,
    Messages.EventType.CLIENT_CONNECT
)]
public sealed class MessageEventClientConnect
    : MessageEventGeneric<MessageEventClientConnectContents>
{
    /// <summary>
    /// ONLY FOR DESERIALIZATION
    /// </summary>
    private MessageEventClientConnect()
        : base(Messages.EventType.CLIENT_CONNECT, null!) { }

    public MessageEventClientConnect(int clientId, bool didReconnect)
        : base(
            Messages.EventType.CLIENT_CONNECT,
            new MessageEventClientConnectContents
            {
                ClientId = clientId,
                DidReconnect = didReconnect
            }
        ) { }
}

public sealed record MessageEventClientConnectContents
{
    public int ClientId { get; set; }
    public bool DidReconnect { get; set; }

    public override string ToString()
    {
        return $"ClientId = {ClientId}, DidReconnect = {DidReconnect}";
    }
}

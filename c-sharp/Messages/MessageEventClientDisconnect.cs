using Paranext.DataProvider.JsonUtils;

namespace Paranext.DataProvider.Messages;

[JsonMessageDeserialization(
    MessageField.MESSAGE_TYPE,
    MessageType.EVENT,
    MessageField.EVENT_TYPE,
    Messages.EventType.CLIENT_DISCONNECT
)]
public sealed class MessageEventClientDisconnect
    : MessageEventGeneric<MessageEventClientDisconnectContents>
{
    /// <summary>
    /// ONLY FOR DESERIALIZATION
    /// </summary>
    private MessageEventClientDisconnect()
        : base(Messages.EventType.CLIENT_DISCONNECT, null!) { }

    public MessageEventClientDisconnect(int clientId)
        : base(
            Messages.EventType.CLIENT_DISCONNECT,
            new MessageEventClientDisconnectContents { ClientId = clientId }
        ) { }
}

public sealed record MessageEventClientDisconnectContents
{
    public int ClientId { get; set; }

    public override string ToString()
    {
        return $"ClientId = {ClientId}";
    }
}

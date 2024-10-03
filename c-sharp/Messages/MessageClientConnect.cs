using Paranext.DataProvider.JsonUtils;

namespace Paranext.DataProvider.Messages;

/// <summary>
/// Message responding to the server to let it know this connection is ready to receive messages
/// </summary>
[JsonMessageDeserialization(MessageField.MESSAGE_TYPE, MessageType.CLIENT_CONNECT)]
public sealed class MessageClientConnect : Message
{
    /// <summary>
    /// ONLY FOR DESERIALIZATION
    /// </summary>
    private MessageClientConnect()
        : base(MessageType.CLIENT_CONNECT) { }

    public MessageClientConnect(int senderId)
        : base(MessageType.CLIENT_CONNECT, senderId) { }
}

using PtxUtils;

namespace Paranext.DataProvider.Messages;

/// <summary>
/// Message responding to the server to let it know this connection is ready to receive messages
/// </summary>
public sealed class MessageClientConnect : Message
{
    /// <summary>
    /// ONLY FOR DESERIALIZATION
    /// </summary>
    private MessageClientConnect()
    {
    }

    public MessageClientConnect(int senderId) : base(senderId)
    {
    }

    public override Enum<MessageType> Type => MessageType.ClientConnect;
}

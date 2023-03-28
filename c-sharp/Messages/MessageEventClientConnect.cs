namespace Paranext.DataProvider.Messages;

public sealed class MessageEventClientConnect
    : MessageEventGeneric<MessageEventClientConnectContents>
{
    /// <summary>
    /// ONLY FOR DESERIALIZATION
    /// </summary>
    private MessageEventClientConnect()
        : base(Messages.EventType.ClientConnect) { }

    public MessageEventClientConnect(MessageEventClientConnectContents eventContents)
        : base(Messages.EventType.ClientConnect, eventContents) { }
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

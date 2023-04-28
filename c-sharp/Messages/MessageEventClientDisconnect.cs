namespace Paranext.DataProvider.Messages;

public sealed class MessageEventClientDisconnect
    : MessageEventGeneric<MessageEventClientDisconnectContents>
{
    /// <summary>
    /// ONLY FOR DESERIALIZATION
    /// </summary>
    private MessageEventClientDisconnect()
        : base(Messages.EventType.ClientDisconnect) { }

    public MessageEventClientDisconnect(MessageEventClientDisconnectContents eventContents)
        : base(Messages.EventType.ClientDisconnect, eventContents) { }
}

public sealed record MessageEventClientDisconnectContents
{
    public int ClientId { get; set; }

    public override string ToString()
    {
        return $"ClientId = {ClientId}";
    }
}

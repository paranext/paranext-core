namespace Paranext.DataProvider.Messages;

public sealed class MessageEventObjectDispose : MessageEventGeneric<string>
{
    /// <summary>
    /// ONLY FOR DESERIALIZATION
    /// </summary>
    private MessageEventObjectDispose()
        : base(Messages.EventType.ObjectDispose) { }

    public MessageEventObjectDispose(string eventContents)
        : base(Messages.EventType.ObjectDispose, eventContents) { }
}

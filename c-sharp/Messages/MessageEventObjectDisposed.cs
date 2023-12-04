namespace Paranext.DataProvider.Messages;

public sealed class MessageEventObjectDisposed : MessageEventGeneric<string>
{
    /// <summary>
    /// ONLY FOR DESERIALIZATION
    /// </summary>
    private MessageEventObjectDisposed()
        : base(Messages.EventType.ObjectDispose) { }

    public MessageEventObjectDisposed(string eventContents)
        : base(Messages.EventType.ObjectDispose, eventContents) { }
}

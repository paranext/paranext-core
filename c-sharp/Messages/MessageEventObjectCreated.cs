namespace Paranext.DataProvider.Messages;

public sealed class MessageEventObjectCreated
    : MessageEventGeneric<MessageEventObjectCreatedContents>
{
    /// <summary>
    /// ONLY FOR DESERIALIZATION
    /// </summary>
    private MessageEventObjectCreated()
        : base(Messages.EventType.ObjectCreate) { }

    public MessageEventObjectCreated(MessageEventObjectCreatedContents eventContents)
        : base(Messages.EventType.ObjectCreate, eventContents) { }
}

public sealed record MessageEventObjectCreatedContents
{
    public string? Id { get; set; }
    public string[]? Functions { get; set; }

    public override string ToString()
    {
        return $"Id = {Id}, Functions = {(Functions != null ? string.Join(',', Functions) : "[null]")}";
    }
}

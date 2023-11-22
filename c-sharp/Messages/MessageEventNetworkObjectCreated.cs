namespace Paranext.DataProvider.Messages;

public sealed class MessageEventObjectCreate : MessageEventGeneric<MessageEventObjectCreateContents>
{
    /// <summary>
    /// ONLY FOR DESERIALIZATION
    /// </summary>
    private MessageEventObjectCreate()
        : base(Messages.EventType.ObjectCreate) { }

    public MessageEventObjectCreate(MessageEventObjectCreateContents eventContents)
        : base(Messages.EventType.ObjectCreate, eventContents) { }
}

public sealed record MessageEventObjectCreateContents
{
    public string? Id { get; set; }
    public string[]? Functions { get; set; }

    public override string ToString()
    {
        return $"Id = {Id}, Functions = {(Functions != null ? string.Join(',', Functions) : "[null]")}";
    }
}

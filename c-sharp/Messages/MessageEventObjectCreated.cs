using Paranext.DataProvider.JsonUtils;

namespace Paranext.DataProvider.Messages;

[JsonMessageDeserialization(
    MessageField.MESSAGE_TYPE,
    MessageType.EVENT,
    MessageField.EVENT_TYPE,
    Messages.EventType.OBJECT_CREATE
)]
public sealed class MessageEventObjectCreated
    : MessageEventGeneric<MessageEventObjectCreatedContents>
{
    /// <summary>
    /// ONLY FOR DESERIALIZATION
    /// </summary>
    private MessageEventObjectCreated()
        : base(Messages.EventType.OBJECT_CREATE, null!) { }

    public MessageEventObjectCreated(string id, string objectType, string[] functions)
        : base(
            Messages.EventType.OBJECT_CREATE,
            new MessageEventObjectCreatedContents
            {
                Id = id,
                ObjectType = objectType,
                Functions = functions,
            }
        ) { }
}

public sealed record MessageEventObjectCreatedContents
{
    public string? Id { get; set; }
    public string? ObjectType { get; set; }
    public string[]? Functions { get; set; }

    public override string ToString()
    {
        return $"Id = {Id}, ObjectType = {ObjectType}, Functions = {(Functions != null ? string.Join(',', Functions) : "[null]")}";
    }
}

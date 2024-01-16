using Paranext.DataProvider.JsonUtils;

namespace Paranext.DataProvider.Messages;

[JsonMessageDeserialization(
    MessageField.MESSAGE_TYPE,
    MessageType.EVENT,
    MessageField.EVENT_TYPE,
    Messages.EventType.OBJECT_CREATE,
    MessageField.OBJECT_TYPE,
    NetworkObjectType.PROJECT_STORAGE_INTERPRETER
)]
public sealed class MessageEventProjectStorageInterpreterCreated
    : MessageEventGeneric<MessageEventProjectStorageInterpreterCreatedContents>
{
    /// <summary>
    /// ONLY FOR DESERIALIZATION
    /// </summary>
    private MessageEventProjectStorageInterpreterCreated()
        : base(Messages.EventType.OBJECT_CREATE, null!) { }

    public MessageEventProjectStorageInterpreterCreated(
        string id,
        string[] functions,
        string projectStorageType,
        string[] projectTypes
    )
        : base(
            Messages.EventType.OBJECT_CREATE,
            new MessageEventProjectStorageInterpreterCreatedContents
            {
                Id = id,
                ObjectType = NetworkObjectType.PROJECT_STORAGE_INTERPRETER,
                Functions = functions,
                Attributes = new ProjectStorageInterpreterAttributes
                {
                    ProjectStorageType = projectStorageType,
                    ProjectTypes = projectTypes
                }
            }
        ) { }
}

public sealed record MessageEventProjectStorageInterpreterCreatedContents
{
    public string? Id { get; set; }
    public string? ObjectType { get; set; }
    public string[]? Functions { get; set; }
    public ProjectStorageInterpreterAttributes? Attributes { get; set; }

    public override string ToString()
    {
        return $"Id = {Id}, ObjectType = {ObjectType}, Functions = {(Functions != null ? string.Join(',', Functions) : "[null]")}, ProjectStorageType = {Attributes?.ProjectStorageType}, ProjectType = {Attributes?.ProjectTypes}";
    }
}

public sealed record ProjectStorageInterpreterAttributes
{
    public string? ProjectStorageType { get; set; }
    public string[]? ProjectTypes { get; set; }
}

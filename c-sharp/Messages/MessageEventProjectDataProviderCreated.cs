using Paranext.DataProvider.JsonUtils;

namespace Paranext.DataProvider.Messages;

[JsonMessageDeserialization(
    MessageField.MESSAGE_TYPE,
    MessageType.EVENT,
    MessageField.EVENT_TYPE,
    Messages.EventType.OBJECT_CREATE,
    MessageField.OBJECT_TYPE,
    NetworkObjectType.PROJECT_DATA_PROVIDER
)]
public sealed class MessageEventProjectDataProviderCreated
    : MessageEventGeneric<MessageEventProjectDataProviderCreatedContents>
{
    /// <summary>
    /// ONLY FOR DESERIALIZATION
    /// </summary>
    private MessageEventProjectDataProviderCreated()
        : base(Messages.EventType.OBJECT_CREATE, null!) { }

    public MessageEventProjectDataProviderCreated(
        string id,
        string[] functions,
        string projectID,
        List<string> projectInterfaces
    )
        : base(
            Messages.EventType.OBJECT_CREATE,
            new MessageEventProjectDataProviderCreatedContents
            {
                Id = id,
                ObjectType = NetworkObjectType.PROJECT_DATA_PROVIDER,
                Functions = functions,
                Attributes = new ProjectDataProviderAttributes
                {
                    ProjectId = projectID,
                    ProjectInterfaces = projectInterfaces,
                },
            }
        ) { }
}

public sealed record MessageEventProjectDataProviderCreatedContents
{
    public string? Id { get; set; }
    public string? ObjectType { get; set; }
    public string[]? Functions { get; set; }
    public ProjectDataProviderAttributes? Attributes { get; set; }

    public override string ToString()
    {
        return $"Id = {Id}, ObjectType = {ObjectType}, Functions = {(Functions != null ? string.Join(',', Functions) : "[null]")}, ProjectID = {Attributes?.ProjectId}, ProjectInterfaces = {(Attributes?.ProjectInterfaces != null ? string.Join(',', Attributes.ProjectInterfaces) : "")}";
    }
}

public sealed record ProjectDataProviderAttributes
{
    public string? ProjectId { get; set; }
    public List<string>? ProjectInterfaces { get; set; }
}

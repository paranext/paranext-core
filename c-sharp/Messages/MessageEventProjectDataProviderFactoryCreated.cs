using Paranext.DataProvider.JsonUtils;

namespace Paranext.DataProvider.Messages;

[JsonMessageDeserialization(
    MessageField.MESSAGE_TYPE,
    MessageType.EVENT,
    MessageField.EVENT_TYPE,
    Messages.EventType.OBJECT_CREATE,
    MessageField.OBJECT_TYPE,
    NetworkObjectType.PROJECT_DATA_PROVIDER_FACTORY
)]
public sealed class MessageEventProjectDataProviderFactoryCreated
    : MessageEventGeneric<MessageEventProjectDataProviderFactoryCreatedContents>
{
    /// <summary>
    /// ONLY FOR DESERIALIZATION
    /// </summary>
    private MessageEventProjectDataProviderFactoryCreated()
        : base(Messages.EventType.OBJECT_CREATE, null!) { }

    public MessageEventProjectDataProviderFactoryCreated(
        string id,
        string[] functions,
        List<string> projectInterfaces
    )
        : base(
            Messages.EventType.OBJECT_CREATE,
            new MessageEventProjectDataProviderFactoryCreatedContents
            {
                Id = id,
                ObjectType = NetworkObjectType.PROJECT_DATA_PROVIDER_FACTORY,
                Functions = functions,
                Attributes = new ProjectDataProviderFactoryAttributes
                {
                    ProjectInterfaces = projectInterfaces,
                },
            }
        ) { }
}

public sealed record MessageEventProjectDataProviderFactoryCreatedContents
{
    public string? Id { get; set; }
    public string? ObjectType { get; set; }
    public string[]? Functions { get; set; }
    public ProjectDataProviderFactoryAttributes? Attributes { get; set; }

    public override string ToString()
    {
        return $"Id = {Id}, ObjectType = {ObjectType}, Functions = {(Functions != null ? string.Join(',', Functions) : "[null]")}, ProjectInterfaces = {(Attributes?.ProjectInterfaces != null ? string.Join(',', Attributes.ProjectInterfaces) : "")}";
    }
}

public sealed record ProjectDataProviderFactoryAttributes
{
    public List<string>? ProjectInterfaces { get; set; }
}

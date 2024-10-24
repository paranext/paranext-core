namespace Paranext.DataProvider.NetworkObjects;

public sealed record ProjectDataProviderCreatedDetails : NetworkObjectCreatedDetails
{
    public ProjectDataProviderAttributes? Attributes { get; set; }

    public override string ToString()
    {
        return $"Id = {Id}, ObjectType = {ObjectType}, Functions = {(FunctionNames != null ? string.Join(',', FunctionNames) : "[null]")}, ProjectID = {Attributes?.ProjectId}, ProjectInterfaces = {(Attributes?.ProjectInterfaces != null ? string.Join(',', Attributes.ProjectInterfaces) : "")}";
    }
}

public sealed record ProjectDataProviderAttributes
{
    public string? ProjectId { get; set; }
    public List<string>? ProjectInterfaces { get; set; }
}

namespace Paranext.DataProvider.NetworkObjects;

public sealed record ProjectDataProviderFactoryCreatedDetails : NetworkObjectCreatedDetails
{
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

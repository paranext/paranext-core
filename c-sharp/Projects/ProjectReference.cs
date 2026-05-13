namespace Paranext.DataProvider.Projects;

public record ProjectReference : ResourceReference
{
    public string Id { get; init; } = string.Empty;
}

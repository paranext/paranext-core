namespace Paranext.DataProvider.NetworkObjects;

public record NetworkObjectCreatedDetails
{
    public string? Id { get; set; }
    public string? ObjectType { get; set; }
    public string[]? FunctionNames { get; set; }

    public override string ToString()
    {
        return $"Id = {Id}, ObjectType = {ObjectType}, FunctionNames = {(FunctionNames != null ? string.Join(',', FunctionNames) : "[null]")}";
    }
}

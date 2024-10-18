namespace Paranext.DataProvider.NetworkObjects;

public record NetworkObjectCreatedDetails
{
    public string? Id { get; set; }
    public string? ObjectType { get; set; }
    public string[]? Functions { get; set; }

    public override string ToString()
    {
        return $"Id = {Id}, ObjectType = {ObjectType}, Functions = {(Functions != null ? string.Join(',', Functions) : "[null]")}";
    }
}

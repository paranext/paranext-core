using System.Text.Json.Serialization;

namespace Paranext.DataProvider.NetworkObjects.Documentation;

/// <summary>
/// OpenRPC content descriptor describing a single method parameter or a method's result. Mirrors
/// the TypeScript <c>ContentDescriptor</c> shape used by network method documentation.
/// </summary>
public record OpenRpcContentDescriptor
{
    /// <summary>The name of the parameter or result.</summary>
    public string Name { get; set; } = "";

    /// <summary>A short summary of the parameter or result.</summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Summary { get; set; }

    /// <summary>Whether the parameter is required. Omit for results.</summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? Required { get; set; }

    /// <summary>JSON Schema for the parameter or result.</summary>
    public OpenRpcSchema Schema { get; set; } = new();
}

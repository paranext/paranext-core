using System.Text.Json.Serialization;

namespace Paranext.DataProvider.NetworkObjects.Documentation;

/// <summary>
/// OpenRPC documentation for a single network object method (the inner <c>method</c> object of
/// <see cref="OpenRpcSingleMethodDocumentation"/>). Set <see cref="Experimental"/> to mark the
/// method experimental; it surfaces as <c>x-experimental: true</c> in the live OpenRPC document
/// returned by <c>rpc.discover</c>. Informational only — it does not change runtime behavior.
/// </summary>
public record OpenRpcMethodDocumentation
{
    /// <summary>
    /// Marks the method experimental in the OpenRPC document. Mirrors the TypeScript
    /// <c>method['x-experimental']</c> field. Informational only.
    /// </summary>
    [JsonPropertyName("x-experimental")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? Experimental { get; set; }

    /// <summary>A short summary of what the method does.</summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Summary { get; set; }

    /// <summary>A verbose explanation of the method behavior.</summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Description { get; set; }

    /// <summary>The method's parameters, in positional order.</summary>
    public IReadOnlyList<OpenRpcContentDescriptor> Params { get; set; } = [];

    /// <summary>The method's result. Methods on a network object always return a value.</summary>
    public OpenRpcContentDescriptor Result { get; set; } = new() { Name = "return value" };
}

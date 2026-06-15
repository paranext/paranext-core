namespace Paranext.DataProvider.NetworkObjects.Documentation;

/// <summary>
/// Minimal OpenRPC JSON Schema descriptor used when documenting a network object method's
/// parameters and result. Only the <c>type</c> keyword is modeled; complex record shapes use
/// <c>"object"</c> rather than a fully-expanded schema (matching the convention used by TypeScript
/// registrations such as <c>platformScripture.invalidateCheckResults</c>).
/// </summary>
public record OpenRpcSchema
{
    /// <summary>
    /// JSON Schema type keyword, e.g. <c>"object"</c>, <c>"string"</c>, <c>"number"</c>,
    /// <c>"boolean"</c>, or <c>"array"</c>.
    /// </summary>
    public string Type { get; set; } = "object";
}

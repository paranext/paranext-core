namespace Paranext.DataProvider.NetworkObjects.Documentation;

/// <summary>
/// A minimal JSON Schema value, used to describe a network object method's parameters and result in
/// OpenRPC documentation. Only the <c>type</c> keyword is modeled; complex record shapes use
/// <c>"object"</c> rather than a fully-expanded schema (matching the convention used by TypeScript
/// registrations such as <c>platformScripture.invalidateCheckResults</c>). The TypeScript OpenRPC
/// model calls the equivalent type <c>Schema</c> (an alias for <c>JSONSchema7</c>).
/// </summary>
public record JsonSchema
{
    /// <summary>
    /// JSON Schema type keyword, e.g. <c>"object"</c>, <c>"string"</c>, <c>"number"</c>,
    /// <c>"boolean"</c>, or <c>"array"</c>.
    /// </summary>
    public string Type { get; set; } = "object";
}

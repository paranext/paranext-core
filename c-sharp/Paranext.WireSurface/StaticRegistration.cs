using System.Text.Json.Serialization;

namespace Paranext.WireSurface;

/// <summary>
/// A wire-surface registration whose name was resolved to one or more compile-time constants.
/// </summary>
public sealed record StaticRegistration(
    [property: JsonPropertyOrder(0)] string Category,
    [property: JsonPropertyOrder(1)] string Name,
    [property: JsonPropertyOrder(2)] string File,
    [property: JsonPropertyOrder(3)] string RegisteredVia,
    [property: JsonPropertyOrder(4)] bool Documented,
    [property: JsonPropertyOrder(5)] bool DocsStaticallyResolved,
    [property: JsonPropertyOrder(6)] bool Experimental
)
{
    [JsonPropertyOrder(7)]
    public string Language => "csharp";
}

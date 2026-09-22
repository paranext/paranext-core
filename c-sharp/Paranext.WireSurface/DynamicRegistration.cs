using System.Text.Json.Serialization;

namespace Paranext.WireSurface;

/// <summary>
/// A wire-surface registration whose name could not be resolved to a compile-time constant. Carries
/// the unresolved expression text instead of a name.
/// </summary>
public sealed record DynamicRegistration(
    [property: JsonPropertyOrder(0)] string Category,
    [property: JsonPropertyOrder(1)] string File,
    [property: JsonPropertyOrder(2)] string RegisteredVia,
    [property: JsonPropertyOrder(3)] string Expression
)
{
    [JsonPropertyOrder(4)]
    public string Language => "csharp";
}

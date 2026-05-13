using System.Text.Json;

namespace Paranext.DataProvider.Projects;

/// <summary>
/// Catch-all for resource references whose type discriminant is not recognized by this version
/// of the software. All JSON properties are preserved via <c>ExtraData</c> so the item
/// can be round-tripped back to storage without data loss.
/// </summary>
public record UnknownResourceReference : ResourceReference
{
    public Dictionary<string, JsonElement>? ExtraData { get; init; }
}

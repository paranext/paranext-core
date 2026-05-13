using System.Text.Json;
using System.Text.Json.Serialization;

namespace Paranext.DataProvider.Projects;

[JsonConverter(typeof(ResourceReferenceConverter))]
public abstract record ResourceReference
{
    public string Name { get; init; } = string.Empty;
}

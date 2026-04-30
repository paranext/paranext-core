using System.Text.Json;
using System.Text.Json.Serialization;

namespace Paranext.DataProvider.Projects;

[JsonConverter(typeof(ResourceReferenceConverter))]
public abstract record ResourceReference
{
    public string Name { get; init; } = string.Empty;
}

public record ProjectReference : ResourceReference
{
    public string Id { get; init; } = string.Empty;
}

public record DblResourceReference : ResourceReference
{
    public string Id { get; init; } = string.Empty;
}

public record EnhancedResourceReference : ResourceReference { }

public record XmlResourceReference : ResourceReference { }

public record SourceLanguageResourceReference : ResourceReference { }

/// <summary>
/// Catch-all for resource references whose type discriminant is not recognized by this version
/// of the software. All JSON properties are preserved via <c>ExtraData</c> so the item
/// can be round-tripped back to storage without data loss.
/// </summary>
public record UnknownResourceReference : ResourceReference
{
    public Dictionary<string, JsonElement>? ExtraData { get; init; }
}

public record ResourceReferenceList
{
    /// <summary>Major version component of the storage format version string.</summary>
    /// <remarks>
    /// Deserialization rejects any stored list whose major version differs from this value,
    /// since a major version change indicates a breaking schema change.
    /// </remarks>
    public const int CurrentMajorVersion = 1;

    /// <summary>
    /// Full storage format version written as a prefix before the JSON body when saving
    /// (e.g. <c>1.0.0 {"dataVersion":"1.0.0","items":[...]}</c>). Not serialized into the JSON body.
    /// </summary>
    public const string CurrentFormatVersion = "1.0.0";

    /// <summary>
    /// Current data schema version written into the JSON body alongside <c>items</c>. Distinct from
    /// <c>CurrentFormatVersion</c>: the format version controls envelope deserialization; the data
    /// version describes the semantics of the <c>items</c> content. The patch digit may be
    /// downgraded; major and minor downgrades are rejected by the TypeScript validator.
    /// </summary>
    public const string CurrentDataVersion = "1.0.0";

    [JsonPropertyName("dataVersion")]
    public string DataVersion { get; init; } = CurrentDataVersion;

    [JsonPropertyName("items")]
    public List<ResourceReference> Items { get; init; } = [];
}

internal sealed class ResourceReferenceConverter : JsonConverter<ResourceReference>
{
    public override ResourceReference? Read(
        ref Utf8JsonReader reader,
        Type typeToConvert,
        JsonSerializerOptions options
    )
    {
        if (reader.TokenType == JsonTokenType.Null)
            return null;

        using var doc = JsonDocument.ParseValue(ref reader);
        var root = doc.RootElement;

        string? type =
            root.TryGetProperty("type", out var typeEl) && typeEl.ValueKind == JsonValueKind.String
                ? typeEl.GetString()
                : null;

        return type switch
        {
            "project" => new ProjectReference
            {
                Name = GetString(root, "name"),
                Id = GetString(root, "id"),
            },
            "dblResource" => new DblResourceReference
            {
                Name = GetString(root, "name"),
                Id = GetString(root, "id"),
            },
            "enhancedResource" => new EnhancedResourceReference { Name = GetString(root, "name") },
            "xmlResource" => new XmlResourceReference { Name = GetString(root, "name") },
            "sourceLanguageResource" => new SourceLanguageResourceReference
            {
                Name = GetString(root, "name"),
            },
            _ => CreateUnknown(root),
        };
    }

    private static string GetString(JsonElement element, string propertyName) =>
        element.TryGetProperty(propertyName, out var prop) && prop.ValueKind == JsonValueKind.String
            ? prop.GetString() ?? ""
            : "";

    private static UnknownResourceReference CreateUnknown(JsonElement root)
    {
        var extraData = new Dictionary<string, JsonElement>();
        foreach (var prop in root.EnumerateObject())
            extraData[prop.Name] = prop.Value.Clone();
        return new UnknownResourceReference
        {
            Name = root.TryGetProperty("name", out var nameEl) ? nameEl.GetString() ?? "" : "",
            ExtraData = extraData.Count > 0 ? extraData : null,
        };
    }

    public override void Write(
        Utf8JsonWriter writer,
        ResourceReference value,
        JsonSerializerOptions options
    )
    {
        writer.WriteStartObject();

        if (value is UnknownResourceReference unknown)
        {
            writer.WriteString("name", unknown.Name);
            if (unknown.ExtraData is not null)
            {
                foreach (var kvp in unknown.ExtraData)
                {
                    if (kvp.Key == "name")
                        continue;
                    writer.WritePropertyName(kvp.Key);
                    kvp.Value.WriteTo(writer);
                }
            }
        }
        else
        {
            string discriminant = value switch
            {
                ProjectReference => "project",
                DblResourceReference => "dblResource",
                EnhancedResourceReference => "enhancedResource",
                XmlResourceReference => "xmlResource",
                SourceLanguageResourceReference => "sourceLanguageResource",
                _ => throw new JsonException(
                    $"Unhandled ResourceReference type: {value.GetType().Name}"
                ),
            };
            writer.WriteString("type", discriminant);
            writer.WriteString("name", value.Name);
            if (value is ProjectReference proj)
                writer.WriteString("id", proj.Id);
            else if (value is DblResourceReference dbl)
                writer.WriteString("id", dbl.Id);
        }

        writer.WriteEndObject();
    }
}

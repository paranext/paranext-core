using System.Text.Json;
using System.Text.Json.Serialization;

namespace Paranext.DataProvider.Projects;

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
                IsShownByDefault = GetNullableBool(root, "isShownByDefault"),
            },
            "dblResource" => new DblResourceReference
            {
                Name = GetString(root, "name"),
                Id = GetString(root, "id"),
                IsShownByDefault = GetNullableBool(root, "isShownByDefault"),
            },
            "enhancedResource" => new EnhancedResourceReference
            {
                Name = GetString(root, "name"),
                IsShownByDefault = GetNullableBool(root, "isShownByDefault"),
            },
            "xmlResource" => new XmlResourceReference
            {
                Name = GetString(root, "name"),
                IsShownByDefault = GetNullableBool(root, "isShownByDefault"),
            },
            "sourceLanguageResource" => new SourceLanguageResourceReference
            {
                Name = GetString(root, "name"),
                IsShownByDefault = GetNullableBool(root, "isShownByDefault"),
            },
            _ => CreateUnknown(root),
        };
    }

    private static string GetString(JsonElement element, string propertyName) =>
        element.TryGetProperty(propertyName, out var prop) && prop.ValueKind == JsonValueKind.String
            ? prop.GetString() ?? ""
            : "";

    private static bool? GetNullableBool(JsonElement element, string propertyName)
    {
        if (!element.TryGetProperty(propertyName, out var prop))
            return null;
        return prop.ValueKind switch
        {
            JsonValueKind.True => true,
            JsonValueKind.False => false,
            _ => null,
        };
    }

    private static UnknownResourceReference CreateUnknown(JsonElement root)
    {
        var extraData = new Dictionary<string, JsonElement>();
        foreach (var prop in root.EnumerateObject())
            extraData[prop.Name] = prop.Value.Clone();
        return new UnknownResourceReference
        {
            Name = GetString(root, "name"),
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
            // ExtraData holds all original properties; write them back verbatim to avoid
            // injecting properties (e.g. "name":"") that were absent in the original JSON.
            if (unknown.ExtraData is not null)
            {
                foreach (var kvp in unknown.ExtraData)
                {
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
            if (value.IsShownByDefault.HasValue)
                writer.WriteBoolean("isShownByDefault", value.IsShownByDefault.Value);
        }

        writer.WriteEndObject();
    }
}

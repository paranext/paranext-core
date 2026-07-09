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

        bool? shown = GetBool(root, "isResourceShownByDefault");
        bool? inCollection = GetBool(root, "inTextCollectionUser");

        // Capture extras against the per-type known-name set so name-only types don't silently
        // swallow (and drop) a Bible-text-only property such as "id" or "inTextCollectionUser" —
        // those flow through ExtraData instead. See ResourceReferenceList.Known*PropertyNames.
        // isResourceShownByDefault is understood on every type (see PT-4040), so it is in both sets.
        return type switch
        {
            "project" => new ProjectReference
            {
                Name = GetString(root, "name"),
                Id = GetString(root, "id"),
                IsResourceShownByDefault = shown,
                InTextCollectionUser = inCollection,
                ExtraData = CaptureExtras(root, ResourceReferenceList.KnownBibleTextPropertyNames),
            },
            "dblResource" => new DblResourceReference
            {
                Name = GetString(root, "name"),
                Id = GetString(root, "id"),
                IsResourceShownByDefault = shown,
                InTextCollectionUser = inCollection,
                ExtraData = CaptureExtras(root, ResourceReferenceList.KnownBibleTextPropertyNames),
            },
            "enhancedResource" => new EnhancedResourceReference
            {
                Name = GetString(root, "name"),
                IsResourceShownByDefault = shown,
                ExtraData = CaptureExtras(root, ResourceReferenceList.KnownNamedOnlyPropertyNames),
            },
            "xmlResource" => new XmlResourceReference
            {
                Name = GetString(root, "name"),
                IsResourceShownByDefault = shown,
                ExtraData = CaptureExtras(root, ResourceReferenceList.KnownNamedOnlyPropertyNames),
            },
            "sourceLanguageResource" => new SourceLanguageResourceReference
            {
                Name = GetString(root, "name"),
                IsResourceShownByDefault = shown,
                ExtraData = CaptureExtras(root, ResourceReferenceList.KnownNamedOnlyPropertyNames),
            },
            _ => CreateUnknown(root),
        };
    }

    private static string GetString(JsonElement element, string propertyName) =>
        element.TryGetProperty(propertyName, out var prop) && prop.ValueKind == JsonValueKind.String
            ? prop.GetString() ?? ""
            : "";

    private static bool? GetBool(JsonElement element, string propertyName) =>
        element.TryGetProperty(propertyName, out var prop)
        && prop.ValueKind is JsonValueKind.True or JsonValueKind.False
            ? prop.GetBoolean()
            : null;

    private static Dictionary<string, JsonElement>? CaptureExtras(
        JsonElement root,
        IReadOnlySet<string> knownProps
    )
    {
        var extras = new Dictionary<string, JsonElement>();
        foreach (var prop in root.EnumerateObject())
            if (!knownProps.Contains(prop.Name))
                extras[prop.Name] = prop.Value.Clone();
        return extras.Count > 0 ? extras : null;
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
                foreach (var kvp in unknown.ExtraData)
                {
                    writer.WritePropertyName(kvp.Key);
                    kvp.Value.WriteTo(writer);
                }
            writer.WriteEndObject();
            return;
        }

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

        // Emit the two flags only when set, so old-build files stay clean.
        if (value.IsResourceShownByDefault is bool shownVal)
            writer.WriteBoolean("isResourceShownByDefault", shownVal);
        if (value.InTextCollectionUser is bool inCollectionVal)
            writer.WriteBoolean("inTextCollectionUser", inCollectionVal);

        // Forward-compat: re-emit unknown properties captured on read.
        if (value.ExtraData is not null)
            foreach (var kvp in value.ExtraData)
            {
                writer.WritePropertyName(kvp.Key);
                kvp.Value.WriteTo(writer);
            }

        writer.WriteEndObject();
    }
}

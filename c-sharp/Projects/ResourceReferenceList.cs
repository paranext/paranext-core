using System.Text.Json;
using System.Text.Json.Serialization;
using System.Xml.Linq;

namespace Paranext.DataProvider.Projects;

[JsonConverter(typeof(ResourceReferenceConverter))]
public abstract record ResourceReference
{
    public string Name { get; init; } = string.Empty;

    /// <summary>
    /// When set by a project admin, indicates this resource should be shown by default
    /// when the shared layout is applied. Null means no admin preference is set.
    /// </summary>
    public bool? IsShownByDefault { get; init; } = null;
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

    /// <summary>Serializes a <see cref="ResourceReferenceList"/> to an <c>&lt;Items&gt;</c> XElement.</summary>
    public static XElement ToXml(ResourceReferenceList list)
    {
        return new XElement(
            "Items",
            list.Items.Select(item =>
            {
                if (item is UnknownResourceReference unknown)
                {
                    // Rebuild all original attributes from ExtraData to avoid data loss
                    var attrs =
                        unknown.ExtraData?.Select(kvp => new XAttribute(
                            kvp.Key,
                            kvp.Value.ToString() ?? ""
                        )) ?? [];
                    return new XElement("Item", attrs);
                }

                string type = GetXmlType(item);

                var element = new XElement(
                    "Item",
                    new XAttribute("type", type),
                    new XAttribute("name", item.Name)
                );

                if (item is ProjectReference proj)
                    element.Add(new XAttribute("id", proj.Id));
                else if (item is DblResourceReference dbl)
                    element.Add(new XAttribute("id", dbl.Id));

                return element;
            })
        );
    }

    /// <summary>Deserializes a <see cref="ResourceReferenceList"/> from an <c>&lt;Items&gt;</c> XElement.</summary>
    /// <remarks>
    /// Unknown item attributes are stored in <see cref="UnknownResourceReference.ExtraData"/> as
    /// <c>string</c>-kind <see cref="System.Text.Json.JsonElement"/>s, since XML attributes have no
    /// type information. Round-tripping through XML is therefore lossless only for string-valued
    /// properties — numeric or boolean JSON values become strings after an XML round-trip.
    /// </remarks>
    public static ResourceReferenceList FromXml(XElement itemsElement, string dataVersion)
    {
        var items = itemsElement
            .Elements("Item")
            .Select(el =>
            {
                string type = el.Attribute("type")?.Value ?? "";
                string name = el.Attribute("name")?.Value ?? "";

                return (ResourceReference)(
                    type switch
                    {
                        "project" => new ProjectReference
                        {
                            Name = name,
                            Id = el.Attribute("id")?.Value ?? "",
                        },
                        "dblResource" => new DblResourceReference
                        {
                            Name = name,
                            Id = el.Attribute("id")?.Value ?? "",
                        },
                        "enhancedResource" => new EnhancedResourceReference { Name = name },
                        "xmlResource" => new XmlResourceReference { Name = name },
                        "sourceLanguageResource" => new SourceLanguageResourceReference
                        {
                            Name = name,
                        },
                        _ => new UnknownResourceReference
                        {
                            Name = name,
                            ExtraData = el.Attributes()
                                .ToDictionary(
                                    a => a.Name.LocalName,
                                    a => System.Text.Json.JsonSerializer.SerializeToElement(a.Value)
                                ),
                        },
                    }
                );
            })
            .ToList();

        return new ResourceReferenceList { Items = items, DataVersion = dataVersion };
    }

    private static string GetXmlType(ResourceReference item) =>
        item switch
        {
            ProjectReference => "project",
            DblResourceReference => "dblResource",
            EnhancedResourceReference => "enhancedResource",
            XmlResourceReference => "xmlResource",
            SourceLanguageResourceReference => "sourceLanguageResource",
            _ => throw new InvalidOperationException($"Unhandled type: {item.GetType().Name}"),
        };
}

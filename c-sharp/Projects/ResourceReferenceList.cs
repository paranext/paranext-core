using System.Text.Json;
using System.Text.Json.Serialization;
using System.Xml.Linq;

namespace Paranext.DataProvider.Projects;

[JsonConverter(typeof(ResourceReferenceConverter))]
public abstract record ResourceReference
{
    public string Name { get; init; } = string.Empty;

    /// <summary>
    /// Project-scope (Send/Receive'd) admin flag: when set, this resource is shown by default.
    /// Consumed by the shared layout (PT-4040) and, for Bible-text resources, by the Scripture Text
    /// Grid, where it also seeds new users' per-user overlay on first open (PT-4050). Understood on
    /// every reference type; null/absent means no admin preference. Serialized only when non-null.
    /// </summary>
    public bool? IsResourceShownByDefault { get; init; }

    /// <summary>
    /// User-scope (NOT Send/Receive'd) per-resource checkbox state on the current user's personal
    /// resources list. Nullable/absent by default; meaningful only for Bible-text references.
    /// Serialized only when non-null.
    /// </summary>
    public bool? IsResourceShownForUser { get; init; }

    /// <summary>
    /// Forward-compat passthrough for JSON/XML properties this build does not recognize, so a
    /// re-serialize preserves them instead of dropping them. Because <see cref="ResourceReference"/>
    /// uses a custom <see cref="ResourceReferenceConverter"/>, <c>[JsonExtensionData]</c> is not
    /// honored automatically — the converter captures/rewrites these manually.
    /// </summary>
    /// <remarks>
    /// TRANSITION-WINDOW RISK: builds released before this field existed have no passthrough, so
    /// during a mixed-version rollout an old build can still drop the new flags on write-back. This
    /// is inherent to introducing passthrough and cannot be fixed in already-shipped builds.
    /// </remarks>
    public Dictionary<string, JsonElement>? ExtraData { get; init; }
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
public record UnknownResourceReference : ResourceReference { }

public record ResourceReferenceList
{
    /// <summary>Major version component of the storage format version string.</summary>
    /// <remarks>
    /// Deserialization rejects any stored list whose major version differs from this value,
    /// since a major version change indicates a breaking schema change.
    /// </remarks>
    public const int CurrentMajorVersion = 1;

    /// <summary>
    /// JSON/XML property names that this build explicitly handles for Bible-text reference types
    /// (<see cref="ProjectReference"/> and <see cref="DblResourceReference"/>). Any property NOT in
    /// this set flows through to <see cref="ResourceReference.ExtraData"/> for forward-compat
    /// round-tripping.
    /// </summary>
    internal static readonly IReadOnlySet<string> KnownBibleTextPropertyNames = new HashSet<string>
    {
        "type",
        "name",
        "id",
        "isResourceShownByDefault",
        "isResourceShownForUser",
    };

    /// <summary>
    /// JSON/XML property names that this build explicitly handles for name-only reference types
    /// (<see cref="EnhancedResourceReference"/>, <see cref="XmlResourceReference"/>,
    /// <see cref="SourceLanguageResourceReference"/>). Narrower than
    /// <see cref="KnownBibleTextPropertyNames"/> because these types never carry <c>id</c> or
    /// <c>isResourceShownForUser</c>; properties outside this set flow through
    /// <see cref="ResourceReference.ExtraData"/>. Includes <c>isResourceShownByDefault</c>, which is
    /// understood on every reference type (see PT-4040).
    /// </summary>
    internal static readonly IReadOnlySet<string> KnownNamedOnlyPropertyNames = new HashSet<string>
    {
        "type",
        "name",
        "isResourceShownByDefault",
    };

    /// <summary>
    /// Full storage format version written as a prefix before the JSON body when saving
    /// (e.g. <c>1.1.0 {"dataVersion":"1.1.0","items":[...]}</c>). Not serialized into the JSON body.
    /// </summary>
    public const string CurrentFormatVersion = "1.1.0";

    /// <summary>
    /// Current data schema version written into the JSON body alongside <c>items</c>. Distinct from
    /// <c>CurrentFormatVersion</c>: the format version controls envelope deserialization; the data
    /// version describes the semantics of the <c>items</c> content. The patch digit may be
    /// downgraded; major and minor downgrades are rejected by the TypeScript validator.
    /// </summary>
    public const string CurrentDataVersion = "1.1.0";

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
                    // Rebuild all original attributes from ExtraData to avoid data loss.
                    var unknownElement = new XElement("Item");
                    AddExtraDataAttributes(unknownElement, unknown.ExtraData);
                    return unknownElement;
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

                // Write the two flags only when set, so old-build files stay clean. XML attributes
                // are untyped strings; booleans are emitted lowercase and parsed back with
                // bool.TryParse (the JSON path uses a native JSON boolean instead).
                if (item.IsResourceShownByDefault is bool shown)
                    element.Add(
                        new XAttribute("isResourceShownByDefault", shown ? "true" : "false")
                    );
                if (item.IsResourceShownForUser is bool inCollection)
                    element.Add(
                        new XAttribute("isResourceShownForUser", inCollection ? "true" : "false")
                    );

                AddExtraDataAttributes(element, item.ExtraData);

                return element;
            })
        );
    }

    /// <summary>
    /// Appends each <paramref name="extraData"/> entry to <paramref name="element"/> as an
    /// <see cref="XAttribute"/>. Strings emit their raw value; other JSON kinds emit their JSON text
    /// (e.g. <c>true</c>, <c>123</c>) so casing survives a JSON-&gt;XML transition. XML attributes
    /// carry no type info, so non-string extras still become strings on the next
    /// <see cref="FromXml"/> read (same limitation documented on <see cref="FromXml"/>).
    /// </summary>
    private static void AddExtraDataAttributes(
        XElement element,
        IReadOnlyDictionary<string, JsonElement>? extraData
    )
    {
        if (extraData is null)
            return;
        foreach (var kvp in extraData)
            element.Add(
                new XAttribute(
                    kvp.Key,
                    kvp.Value.ValueKind == JsonValueKind.String
                        ? kvp.Value.GetString() ?? ""
                        : kvp.Value.GetRawText()
                )
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

                static bool? ParseFlag(XElement el, string attr) =>
                    bool.TryParse(el.Attribute(attr)?.Value, out bool v) ? v : null;

                // Capture unknown attributes against the per-type known-name set (everything else ->
                // ExtraData). Name-only types use the narrower set so a Bible-text-only attribute such
                // as "id" or "isResourceShownForUser" round-trips instead of being silently dropped.
                static Dictionary<string, JsonElement>? CaptureExtras(
                    XElement el,
                    IReadOnlySet<string> known
                )
                {
                    var extras = el.Attributes()
                        .Where(a => !known.Contains(a.Name.LocalName))
                        .ToDictionary(
                            a => a.Name.LocalName,
                            a => JsonSerializer.SerializeToElement(a.Value)
                        );
                    return extras.Count > 0 ? extras : null;
                }

                return (ResourceReference)(
                    type switch
                    {
                        "project" => new ProjectReference
                        {
                            Name = name,
                            Id = el.Attribute("id")?.Value ?? "",
                            IsResourceShownByDefault = ParseFlag(el, "isResourceShownByDefault"),
                            IsResourceShownForUser = ParseFlag(el, "isResourceShownForUser"),
                            ExtraData = CaptureExtras(el, KnownBibleTextPropertyNames),
                        },
                        "dblResource" => new DblResourceReference
                        {
                            Name = name,
                            Id = el.Attribute("id")?.Value ?? "",
                            IsResourceShownByDefault = ParseFlag(el, "isResourceShownByDefault"),
                            IsResourceShownForUser = ParseFlag(el, "isResourceShownForUser"),
                            ExtraData = CaptureExtras(el, KnownBibleTextPropertyNames),
                        },
                        "enhancedResource" => new EnhancedResourceReference
                        {
                            Name = name,
                            IsResourceShownByDefault = ParseFlag(el, "isResourceShownByDefault"),
                            ExtraData = CaptureExtras(el, KnownNamedOnlyPropertyNames),
                        },
                        "xmlResource" => new XmlResourceReference
                        {
                            Name = name,
                            IsResourceShownByDefault = ParseFlag(el, "isResourceShownByDefault"),
                            ExtraData = CaptureExtras(el, KnownNamedOnlyPropertyNames),
                        },
                        "sourceLanguageResource" => new SourceLanguageResourceReference
                        {
                            Name = name,
                            IsResourceShownByDefault = ParseFlag(el, "isResourceShownByDefault"),
                            ExtraData = CaptureExtras(el, KnownNamedOnlyPropertyNames),
                        },
                        _ => new UnknownResourceReference
                        {
                            Name = name,
                            ExtraData = el.Attributes()
                                .ToDictionary(
                                    a => a.Name.LocalName,
                                    a => JsonSerializer.SerializeToElement(a.Value)
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

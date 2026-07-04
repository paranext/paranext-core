using System.Text.Json.Serialization;
using Paratext.Data;
using PtxUtils;

namespace Paranext.DataProvider.JsonUtils;

/// <summary>
/// Serialized form of a project's merged stylesheet (usfm.sty + custom.sty),
/// matching the scripture-editors `StyleInfo` TS shape. Marker dictionary keys
/// are raw marker names (dictionary keys are not camel-cased by the serializer).
/// </summary>
/// <remarks>
/// The wire-side serializer (see <c>SerializationOptions.CreateSerializationOptions</c>)
/// sets <c>PropertyNamingPolicy = JsonNamingPolicy.CamelCase</c> but does NOT set
/// <c>DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull</c>, so every nullable
/// property below is individually annotated with
/// <c>[JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]</c> to omit absent fields
/// from the JSON, matching the TS `StyleInfo` contract.
/// </remarks>
public class PlatformStyleInfo(
    string? defaultFont,
    double? defaultFontSize,
    Dictionary<string, PlatformMarkerStyleInfo> markers
)
{
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? DefaultFont => defaultFont;

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public double? DefaultFontSize => defaultFontSize;

    public Dictionary<string, PlatformMarkerStyleInfo> Markers => markers;
}

public class PlatformMarkerStyleInfo(ScrTag tag)
{
    public string Marker => tag.Marker;

    /// <summary>"paragraph" | "character" | "note" | "milestone" (end/unknown tags are never serialized)</summary>
    public string StyleType =>
        tag.StyleType switch
        {
            ScrStyleType.scParagraphStyle => "paragraph",
            ScrStyleType.scCharacterStyle => "character",
            ScrStyleType.scNoteStyle => "note",
            ScrStyleType.scMilestone => "milestone",
            _ => "unknown", // filtered out by the caller; never emitted
        };

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? EndMarker => string.IsNullOrEmpty(tag.Endmarker) ? null : tag.Endmarker;

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string[]? OccursUnder =>
        tag.OccursUnderList.Count > 0 ? tag.OccursUnderList.ToArray() : null;

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public int? Rank => tag.Rank != 0 ? tag.Rank : null;

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? TextType =>
        tag.TextType != ScrTextType.scNotSpecified ? tag.TextType.ToString().Substring(2) : null;

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string[]? TextProperties { get; } = TextPropertiesToStrings(tag);

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? NotRepeatable => tag.NotRepeatable ? true : null;

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Description => string.IsNullOrEmpty(tag.Description) ? null : tag.Description;

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? FontName => string.IsNullOrEmpty(tag.Fontname) ? null : tag.Fontname;

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public int? FontSize => tag.FontSize != 0 ? tag.FontSize : null;

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? Bold => tag.Bold ? true : null;

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? Italic => tag.Italic ? true : null;

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? Underline => tag.Underline ? true : null;

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? SmallCaps => tag.SmallCaps ? true : null;

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? Subscript => tag.Subscript ? true : null;

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? Superscript => tag.Superscript ? true : null;

    /// <summary>#RRGGBB, omitted for black (PT9 CSSCreator skips black, CSSCreator.cs:149-150)</summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Color =>
        tag.Color.ARGB != RgbColor.Black.ARGB
            ? $"#{tag.Color.R:X2}{tag.Color.G:X2}{tag.Color.B:X2}"
            : null;

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Justification { get; } = JustificationToString(tag);

    /// <summary>Inches (ScrTag stores thousandths; TS StyleInfo units are .sty inches)</summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public double? FirstLineIndent =>
        tag.FirstLineIndent != 0 ? tag.FirstLineIndent / 1000.0 : null;

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public double? LeftMargin => tag.LeftMargin != 0 ? tag.LeftMargin / 1000.0 : null;

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public double? RightMargin => tag.RightMargin != 0 ? tag.RightMargin / 1000.0 : null;

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public int? SpaceBefore => tag.SpaceBefore != 0 ? tag.SpaceBefore : null;

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public int? SpaceAfter => tag.SpaceAfter != 0 ? tag.SpaceAfter : null;

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public int? LineSpacing => tag.LineSpacing != 0 ? tag.LineSpacing : null;

    // Fully qualified because the enum type name `TextProperties` collides with this class's own
    // `TextProperties` instance property — a bare `TextProperties.scParagraph` here binds to the
    // instance property first (simple-name lookup rules) and fails to compile (CS0236, since this
    // is a static field initializer), rather than binding to the `Paratext.Data.TextProperties`
    // enum from the `using` directive.
    private static readonly (Paratext.Data.TextProperties flag, string name)[] s_textPropertyNames =

        [
            (Paratext.Data.TextProperties.scParagraph, "paragraph"),
            (Paratext.Data.TextProperties.scPublishable, "publishable"),
            (Paratext.Data.TextProperties.scVernacular, "vernacular"),
            (Paratext.Data.TextProperties.scPoetic, "poetic"),
            (Paratext.Data.TextProperties.scLevel_1, "level_1"),
            (Paratext.Data.TextProperties.scLevel_2, "level_2"),
            (Paratext.Data.TextProperties.scLevel_3, "level_3"),
            (Paratext.Data.TextProperties.scLevel_4, "level_4"),
            (Paratext.Data.TextProperties.scLevel_5, "level_5"),
            (Paratext.Data.TextProperties.scChapter, "chapter"),
            (Paratext.Data.TextProperties.scVerse, "verse"),
            (Paratext.Data.TextProperties.scBook, "book"),
            (Paratext.Data.TextProperties.scNote, "note"),
            (Paratext.Data.TextProperties.scCrossReference, "crossreference"),
            (Paratext.Data.TextProperties.scNonpublishable, "nonpublishable"),
            (Paratext.Data.TextProperties.scNonvernacular, "nonvernacular"),
        ];

    /// <summary>Lowercase .sty names (ScrTag.ParseTextProperties, ScrTag.cs:964-979); null when none.</summary>
    private static string[]? TextPropertiesToStrings(ScrTag tag)
    {
        var names = s_textPropertyNames
            .Where(pair => (tag.TextProperties & pair.flag) != 0)
            .Select(pair => pair.name)
            .ToArray();
        return names.Length > 0 ? names : null;
    }

    /// <summary>"center"/"right"/"both"; null for the default (left) — with direction set on the
    /// container, omitting text-align:left is visually equivalent incl. the PT9 rtl flip.</summary>
    private static string? JustificationToString(ScrTag tag) =>
        tag.JustificationType switch
        {
            ScrJustificationType.scCenter => "center",
            ScrJustificationType.scRight => "right",
            ScrJustificationType.scBoth => "both",
            _ => null,
        };
}

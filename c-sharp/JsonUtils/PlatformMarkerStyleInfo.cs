using System.Text.Json.Serialization;
using Paratext.Data;
using PtxUtils;

namespace Paranext.DataProvider.JsonUtils;

/// <summary>
/// Serialized form of one marker's entry in a project's merged stylesheet — the value side of
/// <see cref="PlatformStyleInfo.Markers"/>, matching the scripture-editors `MarkerStyleInfo` TS
/// shape. See <see cref="PlatformStyleInfo"/> for the serializer conventions (camel-casing and the
/// per-property WhenWritingNull annotations) that govern both classes.
/// </summary>
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

    // Numeric properties read ScrTag's nullable Raw* twins (e.g. ScrTag.RawRank), whose null means
    // "not specified in the stylesheet" and whose 0 means "explicitly zero" — the folded properties
    // (e.g. ScrTag.Rank) collapse both to 0. Presence reads keep an authored explicit zero on the
    // wire (an explicit \FirstLineIndent 0 must override a base-sheet indent downstream) while a
    // genuinely unspecified property is still omitted.
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public int? Rank => tag.RawRank;

    // An explicit map rather than ToString().Substring(2): for a value outside the enum's defined
    // members (a corrupt or future stylesheet), ToString() yields the numeric string, so the
    // substring either throws (failing the whole getStyleInfo request) or emits garbage. Unknown
    // values fall through to null (omitted from the wire), the same default the sibling maps in
    // this file use; scNotSpecified stays omitted as before.
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? TextType =>
        tag.TextType switch
        {
            ScrTextType.scTitle => "Title",
            ScrTextType.scSection => "Section",
            ScrTextType.scVerseText => "VerseText",
            ScrTextType.scNoteText => "NoteText",
            ScrTextType.scOther => "Other",
            ScrTextType.scBackTranslation => "BackTranslation",
            ScrTextType.scTranslationNote => "TranslationNote",
            _ => null,
        };

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string[]? TextProperties { get; } = TextPropertiesToStrings(tag);

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? NotRepeatable => tag.NotRepeatable ? true : null;

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Description => string.IsNullOrEmpty(tag.Description) ? null : tag.Description;

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? FontName => string.IsNullOrEmpty(tag.Fontname) ? null : tag.Fontname;

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public int? FontSize => tag.RawFontSize;

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
        tag.RawFirstLineIndent is int firstLineIndent ? firstLineIndent / 1000.0 : null;

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public double? LeftMargin => tag.RawLeftMargin is int leftMargin ? leftMargin / 1000.0 : null;

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public double? RightMargin =>
        tag.RawRightMargin is int rightMargin ? rightMargin / 1000.0 : null;

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public int? SpaceBefore => tag.RawSpaceBefore;

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public int? SpaceAfter => tag.RawSpaceAfter;

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public int? LineSpacing => tag.RawLineSpacing;

    // Fully qualified because the enum type name `TextProperties` collides with this class's own
    // `TextProperties` instance property — a bare `TextProperties.scParagraph` here binds to the
    // instance property first (simple-name lookup rules) and fails to compile (CS0236, since this
    // is a static field initializer), rather than binding to the `Paratext.Data.TextProperties`
    // enum from the `using` directive.
    //
    // Complete for the ParatextData version currently referenced (see the csproj). Newer
    // ParatextData adds scNoteSubMarker (.sty name "notesub", for note sub-markers like \fr/\ft);
    // add that pair here when the ParatextData package is upgraded to a version that defines it —
    // ParatextProjectDataProviderStyleInfoTests.TextProperties_ScNoteSubMarkerAvailable_MustSerializeNotesub
    // fails on that upgrade until the pair is added.
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

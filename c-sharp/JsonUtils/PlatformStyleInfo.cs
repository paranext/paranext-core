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

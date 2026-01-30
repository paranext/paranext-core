using System.Text.Json.Serialization;

namespace Paranext.DataProvider.ProjectCreation;

/// <summary>
/// Unicode normalization forms.
/// </summary>
[JsonConverter(typeof(JsonStringEnumConverter))]
public enum NormalizationForm
{
    NFC,
    NFD,
    None,
}

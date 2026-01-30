using System.Text.Json.Serialization;

namespace Paranext.DataProvider.ProjectCreation;

/// <summary>
/// USFM version options.
/// </summary>
[JsonConverter(typeof(JsonStringEnumConverter))]
public enum UsfmVersion
{
    Version2,
    Version3,
}

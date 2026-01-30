using System.Text.Json.Serialization;

namespace Paranext.DataProvider.ProjectCreation;

/// <summary>
/// Book file naming schemes.
/// Maps to BHV-254, BHV-360.
/// </summary>
[JsonConverter(typeof(JsonStringEnumConverter))]
public enum FileNameForm
{
    /// <summary>Number + code (e.g., 41MAT)</summary>
    Form41MAT,

    /// <summary>Code only (e.g., MAT)</summary>
    FormMAT,

    /// <summary>Number only (e.g., 41)</summary>
    Form41,
}

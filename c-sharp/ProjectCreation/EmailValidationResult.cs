using System.Text.Json.Serialization;

namespace Paranext.DataProvider.ProjectCreation;

/// <summary>
/// Email validation result.
/// </summary>
[JsonConverter(typeof(JsonStringEnumConverter))]
public enum EmailValidationResult
{
    Valid,
    Empty,
    EmptyRequireConfirmation,
    InvalidFormat,
}

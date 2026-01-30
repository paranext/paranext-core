using System.Text.Json.Serialization;

namespace Paranext.DataProvider.ProjectCreation;

/// <summary>
/// File comparison states for restore.
/// Maps to EXT-008.
/// </summary>
[JsonConverter(typeof(JsonStringEnumConverter))]
public enum FileComparisonState
{
    DestDoesNotExist,
    SourceDoesNotExist,
    FilesAreSame,
    FilesAreSameVersion,
    SourceIsHigherVersion,
    DestIsHigherVersion,
    SourceIsNewer,
    SourceIsOlder,
}

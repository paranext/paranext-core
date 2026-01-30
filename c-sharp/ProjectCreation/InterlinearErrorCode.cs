using System.Text.Json.Serialization;

namespace Paranext.DataProvider.ProjectCreation;

/// <summary>
/// Interlinear setup error codes.
/// </summary>
[JsonConverter(typeof(JsonStringEnumConverter))]
public enum InterlinearErrorCode
{
    InvalidTaskType,
    MissingSourceProject,
    MissingModelText,
    InvalidDestination,
    DestinationVersificationMismatch,
    LanguageMismatch,
    SetupConflict,
    SaveFailed,
}

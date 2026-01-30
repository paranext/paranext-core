using System.Text.Json.Serialization;

namespace Paranext.DataProvider.ProjectCreation;

/// <summary>
/// Project creation error codes.
/// </summary>
[JsonConverter(typeof(JsonStringEnumConverter))]
public enum ProjectCreationErrorCode
{
    // Validation errors
    InvalidShortName,
    ShortNameHasSpaces,
    ReservedName,
    ShortNameExists,
    EmptyFullName,
    InvalidLanguageId,
    MissingBaseProject,
    BaseProjectNotFound,
    MissingVersification,

    // Permission errors
    PermissionDenied,
    GuestUserRestricted,
    ObserverCannotCreate,

    // State errors
    DuplicateGuid,
    CollectionLocked,

    // System errors
    SettingsSaveFailed,
    VcsInitializationFailed,
    UnknownError,
}

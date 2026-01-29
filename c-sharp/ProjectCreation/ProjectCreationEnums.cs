using System.Text.Json.Serialization;

namespace Paranext.DataProvider.ProjectCreation;

/// <summary>
/// Project type enumeration. Values are serialization contracts (INV-001).
/// Maps to BHV-100.
/// </summary>
[JsonConverter(typeof(JsonStringEnumConverter))]
public enum ProjectType
{
    Standard,
    BackTranslation,
    Daughter,
    Auxiliary,
    StudyBibleAdditions,
    TransliterationManual,
    TransliterationWithEncoder,
    ConsultantNotes,

    // Internal types (not user-selectable)
    Resource,
    GlobalConsultantNotes,
    GlobalAnthropologyNotes,
    MarbleResource,
    XmlResource,
    XmlDictionary,
    AuxiliaryResource,
    NotSelected,
}

/// <summary>
/// Interlinear task types.
/// Maps to BHV-113, BHV-206.
/// </summary>
[JsonConverter(typeof(JsonStringEnumConverter))]
public enum InterlinearTaskType
{
    Glossing,
    GlossingWithoutModel,
    BackTranslation,
    Adaptation,
}

/// <summary>
/// Registration status display types.
/// Maps to EXT-009.
/// </summary>
[JsonConverter(typeof(JsonStringEnumConverter))]
public enum RegistrationMessageType
{
    NoTypeSelected,
    InheritsFromBase,
    NotRegisteredType,
    Registered,
    RegisteredPrivate,
    OfflineAllowed,
    RegistrationExists,
    RegistrationRevoked,
    CanRegister,
    CannotRegister,
    Unregistered,
}

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

/// <summary>
/// USFM version options.
/// </summary>
[JsonConverter(typeof(JsonStringEnumConverter))]
public enum UsfmVersion
{
    Version2,
    Version3,
}

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

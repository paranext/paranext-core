#nullable enable

namespace Paranext.DataProvider.CreatingProjects;

// =====================================================
// ENUMERATIONS
// =====================================================

/// <summary>
/// Project type classification for PT10 project creation.
/// Maps to ParatextData.ProjectType but defined separately to avoid namespace collision.
/// </summary>
public enum ProjectCreationType
{
    NotSelected = 0,
    Standard = 1,
    BackTranslation = 2,
    Daughter = 3,
    TransliterationManual = 4,
    TransliterationWithEncoder = 5,
    StudyBible = 6,
    ConsultantNotes = 7,
    StudyBibleAdditions = 8,
    Auxiliary = 9,
}

/// <summary>
/// Unicode normalization form.
/// </summary>
public enum ProjectNormalization
{
    Undefined = 0,
    NFC = 1,
    NFD = 2,
}

/// <summary>
/// Registration status for a project.
/// </summary>
public enum RegistrationStatus
{
    NotSelected,
    Registered,
    Unregistered,
    InheritsFromBase,
    NotApplicable,
}

// =====================================================
// SHARED CONSTANTS
// =====================================================

/// <summary>
/// Shared constants used across project creation services.
/// </summary>
public static class ProjectCreationConstants
{
    /// <summary>
    /// Windows reserved filenames that cannot be used as project names or language IDs.
    /// These names are reserved by Windows for device drivers and system functions.
    /// </summary>
    public static readonly IReadOnlyList<string> WindowsReservedNames =
    [
        "CON",
        "PRN",
        "AUX",
        "NUL",
        "COM1",
        "COM2",
        "COM3",
        "COM4",
        "COM5",
        "COM6",
        "COM7",
        "COM8",
        "COM9",
        "LPT1",
        "LPT2",
        "LPT3",
        "LPT4",
        "LPT5",
        "LPT6",
        "LPT7",
        "LPT8",
        "LPT9",
    ];
}

// =====================================================
// COMMON TYPES
// =====================================================

/// <summary>
/// Generic validation result returned by all validation methods.
/// </summary>
/// <param name="IsValid">True if validation passed</param>
/// <param name="ErrorCode">Error code for localization (e.g., "SHORTNAME_TOO_SHORT")</param>
/// <param name="ErrorParams">Parameters for error message templating</param>
public record ValidationResult(
    bool IsValid,
    string? ErrorCode = null,
    IReadOnlyDictionary<string, string>? ErrorParams = null
);

/// <summary>
/// Configuration returned for a project type.
/// Describes all UI behavior and validation rules for that type.
/// </summary>
public record ProjectTypeConfiguration
{
    /// <summary>Type being configured.</summary>
    public required ProjectCreationType ProjectType { get; init; }

    /// <summary>True if this type requires a base project.</summary>
    public required bool BaseProjectRequired { get; init; }

    /// <summary>Default value for Editable checkbox.</summary>
    public required bool EditableDefault { get; init; }

    /// <summary>Default normalization form for this type.</summary>
    public required ProjectNormalization NormalizationDefault { get; init; }

    /// <summary>True if type requires its own registration.</summary>
    public required bool RegistrationRequired { get; init; }

    /// <summary>True if type shares parent project registration.</summary>
    public required bool SharesParentRegistration { get; init; }

    /// <summary>True if Books tab should be visible.</summary>
    public required bool BooksTabVisible { get; init; }

    /// <summary>True if Study Bible tab should be visible.</summary>
    public required bool StudyBibleTabVisible { get; init; }

    /// <summary>True if encoding converter field is required.</summary>
    public required bool EncodingConverterRequired { get; init; }

    /// <summary>Filter rule for allowed base types.</summary>
    public string? BaseProjectFilter { get; init; }

    /// <summary>Types that can be used as base for this type.</summary>
    public required IReadOnlyList<ProjectCreationType> AllowedBaseTypes { get; init; }
}

/// <summary>
/// Registration state for a project.
/// </summary>
public record RegistrationState
{
    /// <summary>Current registration status.</summary>
    public required RegistrationStatus Status { get; init; }

    /// <summary>Localization key for status message.</summary>
    public string? MessageKey { get; init; }

    /// <summary>True if online registration is available.</summary>
    public required bool CanRegisterOnline { get; init; }

    /// <summary>True if user can opt out of inherited registration.</summary>
    public required bool CanOptOutOfInheritance { get; init; }

    /// <summary>Warning message if base project not registered.</summary>
    public string? Warning { get; init; }
}

/// <summary>
/// Language selection with BCP-47 components.
/// </summary>
public record LanguageSelection
{
    public required string LanguageId { get; init; }
    public required string LanguageName { get; init; }
    public required string BaseCode { get; init; }
    public string? Script { get; init; }
    public string? Region { get; init; }
    public string? Variant { get; init; }
}

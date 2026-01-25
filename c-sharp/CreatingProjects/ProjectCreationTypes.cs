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

/// <summary>
/// Project reference for dropdowns and selection.
/// Used by GetValidBaseProjects to return filterable project list.
/// </summary>
public record ProjectReference
{
    /// <summary>Project GUID (40-char hex).</summary>
    public required string Guid { get; init; }

    /// <summary>Short name (3-8 chars).</summary>
    public required string ShortName { get; init; }

    /// <summary>Full project name.</summary>
    public required string FullName { get; init; }

    /// <summary>Versification type.</summary>
    public required VersificationType Versification { get; init; }

    /// <summary>Project type.</summary>
    public required ProjectCreationType ProjectType { get; init; }

    /// <summary>True if project contains Scripture content.</summary>
    public required bool IsScripture { get; init; }

    /// <summary>True if project is a resource (non-editable).</summary>
    public required bool IsResource { get; init; }

    /// <summary>True if project is registered.</summary>
    public required bool IsRegistered { get; init; }
}

// =====================================================
// PROJECT DEFAULTS TYPES (CAP-EXT-007)
// =====================================================

/// <summary>
/// Versification type for new projects.
/// </summary>
public enum VersificationType
{
    English,
    Original,
    Septuagint,
    Vulgate,
    RussianOrthodox,
    RussianProtestant,
}

/// <summary>
/// Default values for a project type.
/// </summary>
public record ProjectDefaults
{
    /// <summary>Default versification type.</summary>
    public required VersificationType Versification { get; init; }

    /// <summary>Default normalization form.</summary>
    public required ProjectNormalization Normalization { get; init; }

    /// <summary>Default editable state.</summary>
    public required bool Editable { get; init; }

    /// <summary>Default USFM version.</summary>
    public required int UsfmVersion { get; init; }

    /// <summary>Base project GUID for derived types.</summary>
    public string? BaseProjectGuid { get; init; }
}

/// <summary>
/// Request to create a new project.
/// </summary>
public record CreateProjectRequest
{
    /// <summary>Short name (3-8 chars).</summary>
    public required string ShortName { get; init; }

    /// <summary>Full project name.</summary>
    public required string FullName { get; init; }

    /// <summary>BCP-47 language ID.</summary>
    public required string LanguageId { get; init; }

    /// <summary>Versification to use.</summary>
    public required VersificationType Versification { get; init; }

    /// <summary>Type of project.</summary>
    public required ProjectCreationType ProjectType { get; init; }

    /// <summary>Base project GUID for derived types.</summary>
    public string? BaseProjectGuid { get; init; }
}

/// <summary>
/// Result of project creation.
/// </summary>
public record CreateProjectResult
{
    /// <summary>True if creation succeeded.</summary>
    public required bool Success { get; init; }

    /// <summary>GUID of created project.</summary>
    public string? ProjectGuid { get; init; }

    /// <summary>Error code if failed.</summary>
    public string? ErrorCode { get; init; }

    /// <summary>Error message for display.</summary>
    public string? ErrorMessage { get; init; }
}

// =====================================================
// PROJECT CLEANUP TYPES (CAP-EXT-010)
// =====================================================

/// <summary>
/// Request to clean up a project.
/// </summary>
public record CleanupProjectRequest
{
    /// <summary>GUID of project to clean up.</summary>
    public required string ProjectGuid { get; init; }

    /// <summary>True if project was registered online.</summary>
    public required bool WasRegistered { get; init; }

    /// <summary>Registration metadata if was registered.</summary>
    public ProjectMetadata? Registration { get; init; }
}

/// <summary>
/// Project metadata for registration operations.
/// </summary>
public record ProjectMetadata
{
    /// <summary>Registry ID from server.</summary>
    public string? RegistryId { get; init; }

    /// <summary>Full project name.</summary>
    public string? FullName { get; init; }

    /// <summary>Project visibility (Public, Private, etc.).</summary>
    public string? Visibility { get; init; }
}

// =====================================================
// PROJECT UPDATE TYPES (CAP-EXT-011)
// =====================================================

/// <summary>
/// Request to update an existing project.
/// </summary>
/// <remarks>
/// Fields that are null will not be updated.
/// </remarks>
public record UpdateProjectRequest
{
    /// <summary>GUID of project to update.</summary>
    public required string ProjectGuid { get; init; }

    /// <summary>New short name (if changing).</summary>
    public string? ShortName { get; init; }

    /// <summary>New full name (if changing).</summary>
    public string? FullName { get; init; }

    /// <summary>New language ID (if changing).</summary>
    public string? LanguageId { get; init; }

    /// <summary>New versification (if changing).</summary>
    public VersificationType? Versification { get; init; }

    /// <summary>Project type for validation.</summary>
    public ProjectCreationType? ProjectType { get; init; }

    /// <summary>New normalization form (if changing).</summary>
    public ProjectNormalization? Normalization { get; init; }

    /// <summary>New editable flag (if changing).</summary>
    public bool? Editable { get; init; }

    /// <summary>New USFM version (if changing).</summary>
    public int? UsfmVersion { get; init; }

    /// <summary>New copyright (if changing).</summary>
    public string? Copyright { get; init; }

    /// <summary>New planned books list (if changing).</summary>
    public List<int>? PlannedBooks { get; init; }

    /// <summary>New encoding converter (if changing).</summary>
    public string? EncodingConverter { get; init; }
}

/// <summary>
/// Result of project update.
/// </summary>
public record UpdateProjectResult
{
    /// <summary>True if update succeeded.</summary>
    public required bool Success { get; init; }

    /// <summary>Error code if failed.</summary>
    public string? ErrorCode { get; init; }

    /// <summary>Error message for display.</summary>
    public string? ErrorMessage { get; init; }
}

// =====================================================
// DERIVED PROJECT TYPES (CAP-EXT-012)
// =====================================================

/// <summary>
/// Request to copy books from base to derived project.
/// </summary>
public record CopyBaseBooksRequest
{
    /// <summary>GUID of derived project.</summary>
    public required string DerivedProjectGuid { get; init; }

    /// <summary>GUID of base project to copy from.</summary>
    public required string BaseProjectGuid { get; init; }
}

/// <summary>
/// Result of copying books.
/// </summary>
public record CopyBaseBooksResult
{
    /// <summary>True if copy succeeded.</summary>
    public required bool Success { get; init; }

    /// <summary>List of book numbers that were copied.</summary>
    public IReadOnlyList<int>? CopiedBooks { get; init; }

    /// <summary>Error code if failed.</summary>
    public string? ErrorCode { get; init; }

    /// <summary>Error message for display.</summary>
    public string? ErrorMessage { get; init; }
}

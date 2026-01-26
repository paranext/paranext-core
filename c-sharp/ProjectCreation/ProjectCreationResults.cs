namespace Paranext.DataProvider.ProjectCreation;

/// <summary>
/// Generic validation result returned by all validation methods.
/// </summary>
/// <param name="IsValid">True if validation passed, false if failed.</param>
/// <param name="ErrorCode">Error code identifying the validation failure (e.g., "SHORTNAME_TOO_SHORT").</param>
/// <param name="ErrorParams">Additional parameters for error message formatting (e.g., min/max values).</param>
public record ValidationResult(
    bool IsValid,
    string? ErrorCode = null,
    IReadOnlyDictionary<string, string>? ErrorParams = null
);

/// <summary>
/// Project type configuration returned by GetTypeConfiguration.
/// Describes all UI behavior and validation rules for a project type.
/// Uses string identifiers for project types to avoid Paratext.Data enum issues.
/// </summary>
public record ProjectTypeConfiguration
{
    /// <summary>The project type name (e.g., "Standard", "BackTranslation").</summary>
    public required string ProjectType { get; init; }

    /// <summary>True if this type requires a base project to be selected.</summary>
    public required bool BaseProjectRequired { get; init; }

    /// <summary>Default value for the Editable setting.</summary>
    public required bool EditableDefault { get; init; }

    /// <summary>True if project name should auto-generate from user name.</summary>
    public required bool AutoNameFromUser { get; init; }

    /// <summary>Unicode normalization form ("NFC" or "NFD").</summary>
    public required string NormalizationDefault { get; init; }

    /// <summary>True if this type requires project registration.</summary>
    public required bool RegistrationRequired { get; init; }

    /// <summary>True if this type inherits registration from its base project.</summary>
    public required bool SharesParentRegistration { get; init; }

    /// <summary>True if the books tab should be visible in the UI.</summary>
    public required bool BooksTabVisible { get; init; }

    /// <summary>True if this type requires an encoding converter.</summary>
    public required bool EncodingConverterRequired { get; init; }

    /// <summary>List of project types that can serve as a base for this type.</summary>
    public required IReadOnlyList<string> AllowedBaseTypes { get; init; }

    /// <summary>True if this is a derived type (requires base project).</summary>
    public required bool IsDerivedType { get; init; }

    /// <summary>True if this is a scripture project type.</summary>
    public required bool IsScripture { get; init; }
}

/// <summary>
/// Project reference for dropdowns and selection.
/// Uses string identifiers for project types.
/// </summary>
public record ProjectReference
{
    /// <summary>The unique project GUID.</summary>
    public required string Guid { get; init; }

    /// <summary>The short project name (3-8 characters).</summary>
    public required string ShortName { get; init; }

    /// <summary>The full project name/description.</summary>
    public required string FullName { get; init; }

    /// <summary>The versification system (e.g., "English").</summary>
    public required string Versification { get; init; }

    /// <summary>The project type name.</summary>
    public required string ProjectType { get; init; }

    /// <summary>True if this is a scripture project.</summary>
    public required bool IsScripture { get; init; }

    /// <summary>True if this is a resource project.</summary>
    public required bool IsResource { get; init; }

    /// <summary>True if this project is registered.</summary>
    public required bool IsRegistered { get; init; }
}

/// <summary>
/// Registration state for a project.
/// Describes the current registration status and available actions.
/// </summary>
public record RegistrationState
{
    /// <summary>
    /// Current registration status.
    /// Values: "NotSelected", "Registered", "Unregistered", "InheritsFromBase", "NotApplicable"
    /// </summary>
    public required string Status { get; init; }

    /// <summary>Localization key for status message.</summary>
    public string? MessageKey { get; init; }

    /// <summary>True if online registration is available.</summary>
    public required bool CanRegisterOnline { get; init; }

    /// <summary>True if user can opt out of inherited registration (BackTranslation only).</summary>
    public required bool CanOptOutOfInheritance { get; init; }

    /// <summary>Project metadata if registered.</summary>
    public ProjectMetadata? Metadata { get; init; }

    /// <summary>True if registry server is available.</summary>
    public required bool RegistryServerAvailable { get; init; }
}

/// <summary>
/// Project metadata from registry server.
/// </summary>
public record ProjectMetadata
{
    /// <summary>Registry ID for this project.</summary>
    public required string RegistryId { get; init; }

    /// <summary>Full name from registry.</summary>
    public required string FullName { get; init; }

    /// <summary>Visibility setting (e.g., "public", "private").</summary>
    public required string Visibility { get; init; }

    /// <summary>License information if available.</summary>
    public string? License { get; init; }
}

/// <summary>
/// Language selection with BCP-47 components.
/// </summary>
public record LanguageSelection
{
    /// <summary>Full BCP-47 tag (e.g., "eng-US", "zh-Hans").</summary>
    public required string LanguageId { get; init; }

    /// <summary>Display name for the language.</summary>
    public required string LanguageName { get; init; }

    /// <summary>ISO 639-3 base code (e.g., "eng", "spa").</summary>
    public required string BaseCode { get; init; }

    /// <summary>Script subtag if present (e.g., "Hans", "Latn").</summary>
    public string? Script { get; init; }

    /// <summary>Region subtag if present (e.g., "US", "GB").</summary>
    public string? Region { get; init; }

    /// <summary>Variant subtag if present.</summary>
    public string? Variant { get; init; }
}

// =====================================================
// CAP-009: Project Creation Types
// =====================================================

/// <summary>
/// Request to create a new project.
/// Uses string-based type identifiers for compatibility.
/// </summary>
public record CreateProjectRequest
{
    /// <summary>Short name for the project (3-8 chars, A-Za-z0-9_).</summary>
    public required string ShortName { get; init; }

    /// <summary>Full descriptive name for the project.</summary>
    public required string FullName { get; init; }

    /// <summary>Language ID (BCP-47 tag, e.g., "eng", "spa").</summary>
    public required string LanguageId { get; init; }

    /// <summary>Versification system (e.g., "English", "Original").</summary>
    public required string Versification { get; init; }

    /// <summary>Project type (e.g., "Standard", "BackTranslation").</summary>
    public required string ProjectType { get; init; }

    /// <summary>GUID of base project (required for derived types).</summary>
    public string? BaseProjectGuid { get; init; }

    /// <summary>Copyright statement.</summary>
    public string? Copyright { get; init; }

    /// <summary>Unicode normalization form ("NFC" or "NFD").</summary>
    public string? Normalization { get; init; }

    /// <summary>USFM version (typically 2 or 3).</summary>
    public int? UsfmVersion { get; init; }

    /// <summary>Whether the project is editable.</summary>
    public bool? Editable { get; init; }

    /// <summary>Encoding converter name for TransliterationWithEncoder.</summary>
    public string? EncodingConverter { get; init; }

    /// <summary>Whether the encoder runs in reverse direction.</summary>
    public bool? EncoderReverseDirection { get; init; }
}

/// <summary>
/// Result of project creation.
/// </summary>
public record CreateProjectResult
{
    /// <summary>True if project was created successfully.</summary>
    public required bool Success { get; init; }

    /// <summary>GUID of created project (40-char hex).</summary>
    public string? ProjectGuid { get; init; }

    /// <summary>Error code if creation failed.</summary>
    public string? ErrorCode { get; init; }

    /// <summary>Human-readable error message if creation failed.</summary>
    public string? ErrorMessage { get; init; }
}

// =====================================================
// CAP-010: Project Cleanup Types
// =====================================================

/// <summary>
/// Request to clean up a partially created or cancelled project.
/// </summary>
public record CleanupProjectRequest
{
    /// <summary>GUID of project to clean up.</summary>
    public required string ProjectGuid { get; init; }

    /// <summary>True if the project had been registered with the server.</summary>
    public required bool WasRegistered { get; init; }

    /// <summary>Registration metadata if the project was registered.</summary>
    public ProjectMetadata? Registration { get; init; }
}

// =====================================================
// CAP-011: Project Update Types
// =====================================================

/// <summary>
/// Request to update project settings.
/// All fields except ProjectGuid are optional - only specified fields are updated.
/// </summary>
public record UpdateProjectRequest
{
    /// <summary>GUID of project to update.</summary>
    public required string ProjectGuid { get; init; }

    /// <summary>New short name (if changing).</summary>
    public string? ShortName { get; init; }

    /// <summary>New full name (if changing).</summary>
    public string? FullName { get; init; }

    /// <summary>New copyright statement (if changing).</summary>
    public string? Copyright { get; init; }

    /// <summary>New language ID (if changing).</summary>
    public string? LanguageId { get; init; }

    /// <summary>New versification system (if changing). Only allowed for non-derived types.</summary>
    public string? Versification { get; init; }

    /// <summary>New project type. FORBIDDEN - cannot change project type.</summary>
    public string? ProjectType { get; init; }

    /// <summary>New base project GUID (if changing).</summary>
    public string? BaseProjectGuid { get; init; }

    /// <summary>New encoding converter (if changing).</summary>
    public string? EncodingConverter { get; init; }

    /// <summary>New encoder direction flag (if changing).</summary>
    public bool? EncoderReverseDirection { get; init; }

    /// <summary>New normalization form (if changing).</summary>
    public string? Normalization { get; init; }

    /// <summary>New USFM version (if changing).</summary>
    public int? UsfmVersion { get; init; }

    /// <summary>New editable flag (if changing).</summary>
    public bool? Editable { get; init; }

    /// <summary>New planned books list (if changing).</summary>
    public IReadOnlyList<int>? PlannedBooks { get; init; }
}

/// <summary>
/// Result of project update.
/// </summary>
public record UpdateProjectResult
{
    /// <summary>True if update was successful.</summary>
    public required bool Success { get; init; }

    /// <summary>Error code if update failed.</summary>
    public string? ErrorCode { get; init; }

    /// <summary>Human-readable error message if update failed.</summary>
    public string? ErrorMessage { get; init; }
}

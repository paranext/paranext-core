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

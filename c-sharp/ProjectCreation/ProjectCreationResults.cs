namespace Paranext.DataProvider.ProjectCreation;

/// <summary>
/// Generic validation result returned by all validation methods.
/// </summary>
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
    public required string ProjectType { get; init; }
    public required bool BaseProjectRequired { get; init; }
    public required bool EditableDefault { get; init; }
    public required bool AutoNameFromUser { get; init; }
    public required string NormalizationDefault { get; init; }
    public required bool RegistrationRequired { get; init; }
    public required bool SharesParentRegistration { get; init; }
    public required bool BooksTabVisible { get; init; }
    public required bool EncodingConverterRequired { get; init; }
    public required IReadOnlyList<string> AllowedBaseTypes { get; init; }
    public required bool IsDerivedType { get; init; }
    public required bool IsScripture { get; init; }
}

/// <summary>
/// Project reference for dropdowns and selection.
/// Uses string identifiers for project types.
/// </summary>
public record ProjectReference
{
    public required string Guid { get; init; }
    public required string ShortName { get; init; }
    public required string FullName { get; init; }
    public required string Versification { get; init; }
    public required string ProjectType { get; init; }
    public required bool IsScripture { get; init; }
    public required bool IsResource { get; init; }
    public required bool IsRegistered { get; init; }
}

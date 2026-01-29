namespace Paranext.DataProvider.ProjectCreation;

/// <summary>
/// Options for populating project creation UI.
/// </summary>
public record ProjectOptionsResult
{
    public required IReadOnlyList<LanguageOption> Languages { get; init; }
    public required IReadOnlyList<VersificationOption> Versifications { get; init; }
    public required IReadOnlyList<ProjectTypeOption> ProjectTypes { get; init; }
    public required IReadOnlyList<ProjectOption> AvailableBaseProjects { get; init; }
    public required IReadOnlyList<NamedOption> BiblicalTermsLists { get; init; }
    public required IReadOnlyList<NamedOption> Encodings { get; init; }
    public required IReadOnlyList<NamedOption> Normalizations { get; init; }
}

/// <summary>
/// Language option for project creation.
/// </summary>
public record LanguageOption
{
    public required string Id { get; init; }
    public required string Code { get; init; }
    public required string DisplayName { get; init; }
    public string? Script { get; init; }
    public string? Region { get; init; }
    public bool IsRTL { get; init; }
}

/// <summary>
/// Versification option for project creation.
/// </summary>
public record VersificationOption
{
    public required string Id { get; init; }
    public required string DisplayName { get; init; }
    public bool IsCustomized { get; init; }
}

/// <summary>
/// Project type option for project creation.
/// </summary>
public record ProjectTypeOption
{
    public required ProjectType Value { get; init; }
    public required string Label { get; init; }
    public required bool IsDerived { get; init; }
    public required bool NeedsOwnRegistration { get; init; }
}

/// <summary>
/// Project option for base project selection.
/// </summary>
public record ProjectOption
{
    public required string Name { get; init; }
    public required string Guid { get; init; }
    public required string DisplayName { get; init; }
    public ProjectType? ProjectType { get; init; }
}

/// <summary>
/// Named option for dropdown selections.
/// </summary>
public record NamedOption
{
    public required string Id { get; init; }
    public required string DisplayName { get; init; }
}

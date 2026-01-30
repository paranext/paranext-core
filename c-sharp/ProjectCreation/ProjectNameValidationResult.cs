namespace Paranext.DataProvider.ProjectCreation;

/// <summary>
/// Result of project name validation.
/// Maps to EXT-002.
/// </summary>
public record ProjectNameValidationResult
{
    public required bool IsValid { get; init; }
    public string? FullNameError { get; init; }
    public string? ShortNameError { get; init; }
    public IReadOnlyList<string>? ShortNameSuggestions { get; init; }
}

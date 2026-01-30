namespace Paranext.DataProvider.ProjectCreation;

/// <summary>
/// Request to generate short name abbreviation.
/// Maps to EXT-001.
/// </summary>
public record ShortNameGenerationRequest
{
    public required string FullName { get; init; }
    public string? ValidChars { get; init; }
}

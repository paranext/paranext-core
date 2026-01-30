namespace Paranext.DataProvider.ProjectCreation;

/// <summary>
/// Result of short name generation.
/// Maps to EXT-001.
/// </summary>
public record ShortNameGenerationResult
{
    public required string Abbreviation { get; init; }
    public required bool WasModified { get; init; }
}

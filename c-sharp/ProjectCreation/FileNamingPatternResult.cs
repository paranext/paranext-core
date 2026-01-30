namespace Paranext.DataProvider.ProjectCreation;

/// <summary>
/// Result of file naming pattern validation.
/// Maps to EXT-B2-006, BHV-254.
/// </summary>
public record FileNamingPatternResult
{
    public required bool IsValid { get; init; }
    public string? PrefixError { get; init; }
    public string? SuffixError { get; init; }
    public string? ExtensionError { get; init; }
    public FileNamingExamples? Examples { get; init; }
}

/// <summary>
/// Examples of file naming patterns.
/// </summary>
public record FileNamingExamples
{
    public required string Genesis { get; init; }
    public required string Matthew { get; init; }
    public required string SongOfThree { get; init; }
}

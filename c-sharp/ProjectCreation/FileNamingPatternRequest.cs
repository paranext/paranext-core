namespace Paranext.DataProvider.ProjectCreation;

/// <summary>
/// Request to validate file naming pattern.
/// Maps to EXT-B2-006.
/// </summary>
public record FileNamingPatternRequest
{
    public required string Prefix { get; init; }
    public required FileNameForm Scheme { get; init; }
    public required string Suffix { get; init; }
    public string Extension { get; init; } = ".SFM";
}

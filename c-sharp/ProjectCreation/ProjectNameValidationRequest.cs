namespace Paranext.DataProvider.ProjectCreation;

/// <summary>
/// Request to validate project names.
/// Maps to EXT-002.
/// </summary>
public record ProjectNameValidationRequest
{
    public required string FullName { get; init; }
    public required string ShortName { get; init; }
    public required string Mode { get; init; } // "create" or "edit"
    public string? OriginalShortName { get; init; }
}

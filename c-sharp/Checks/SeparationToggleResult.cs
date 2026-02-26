namespace Paranext.DataProvider.Checks;

/// <summary>
/// Result of toggling verse/non-verse separation.
/// </summary>
public record SeparationToggleResult
{
    public bool Success { get; init; }
    public string? Error { get; init; }
    public bool Enabled { get; init; }
    public bool RebuildRequired { get; init; }
}

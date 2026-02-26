namespace Paranext.DataProvider.Checks;

/// <summary>
/// Result of setting status on selected inventory items.
/// </summary>
public record StatusChangeResult
{
    public bool Success { get; init; }
    public string? Error { get; init; }
    public bool StatusChanged { get; init; }
    public bool AllChanged { get; init; }
    public int SkippedCount { get; init; }
    public string? WarningMessage { get; init; }
}

namespace Paranext.DataProvider.Checks;

/// <summary>
/// Result of executing basic checks.
/// </summary>
public record CheckExecutionResult
{
    public bool Success { get; init; }
    public string? Error { get; init; }
    public List<CheckError> Results { get; init; } = new();
    public bool Overflow { get; init; }
    public int TotalCount { get; init; }
}

/// <summary>
/// Single check error found during check execution.
/// </summary>
public record CheckError(string Reference, string CheckType, string Message, string SelectedText);

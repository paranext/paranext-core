namespace Paranext.DataProvider.Checks;

/// <summary>
/// Result of determining save operations. Contains the list of parameter name/value
/// pairs that should be persisted to project settings.
/// </summary>
public record SaveOperationResult
{
    /// <summary>List of save operations to execute.</summary>
    public List<SaveOperation> Operations { get; init; } = new();
}

namespace Paranext.DataProvider.Checks;

/// <summary>
/// Result of determining which inventory option values have changed and need to be persisted.
/// Contains a success flag and the list of changed settings.
/// Used by SaveInventoryOptions (CAP-008, EXT-007).
/// </summary>
public record SaveInventoryOptionsResult
{
    /// <summary>
    /// Whether the save operation succeeded. False if project is write-protected (VAL-005).
    /// </summary>
    public bool Success { get; init; }

    /// <summary>
    /// List of settings that changed (parameter name and new value).
    /// Empty if write-protected or no values changed.
    /// Reuses SaveOperation record from CAP-004.
    /// </summary>
    public List<SaveOperation> ChangedSettings { get; init; } = new();
}

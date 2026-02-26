namespace Paranext.DataProvider.Checks;

/// <summary>
/// Result of toggling verse/non-verse separation.
/// Includes merge details: when enabling, unknown non-verse items inherit verse status
/// (DESTRUCTIVE merge). The MergedNonVerse* sets represent the final non-verse state
/// after the merge, which the PAPI layer applies back to the TextInventory objects.
/// </summary>
public record SeparationToggleResult
{
    public bool Success { get; init; }
    public string? Error { get; init; }
    public bool Enabled { get; init; }
    public bool RebuildRequired { get; init; }

    /// <summary>
    /// Items that are valid in non-verse after the merge (includes both previously-valid
    /// and newly-inherited-from-verse items). Only populated when enabling separation.
    /// </summary>
    public HashSet<string> MergedNonVerseValid { get; init; } = new();

    /// <summary>
    /// Items that are invalid in non-verse after the merge (includes both previously-invalid
    /// and newly-inherited-from-verse items). Only populated when enabling separation.
    /// </summary>
    public HashSet<string> MergedNonVerseInvalid { get; init; } = new();
}

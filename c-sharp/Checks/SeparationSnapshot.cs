namespace Paranext.DataProvider.Checks;

/// <summary>
/// Snapshot of verse/non-verse inventory item state for toggle separation computation.
/// Used as input to ComputeToggleSeparation for testable business logic separation.
///
/// When enabling separation, unknown non-verse items inherit verse status (DESTRUCTIVE merge).
/// Items already categorized in non-verse are preserved.
/// </summary>
public record SeparationSnapshot
{
    /// <summary>Items marked as valid in verse text inventory.</summary>
    public HashSet<string> VerseValidItems { get; init; } = new();

    /// <summary>Items marked as invalid in verse text inventory.</summary>
    public HashSet<string> VerseInvalidItems { get; init; } = new();

    /// <summary>Items marked as valid in non-verse text inventory.</summary>
    public HashSet<string> NonVerseValidItems { get; init; } = new();

    /// <summary>Items marked as invalid in non-verse text inventory.</summary>
    public HashSet<string> NonVerseInvalidItems { get; init; } = new();

    /// <summary>Items with unknown status in non-verse text inventory (candidates for merge).</summary>
    public HashSet<string> NonVerseUnknownItems { get; init; } = new();
}

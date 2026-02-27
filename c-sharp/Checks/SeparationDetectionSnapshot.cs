namespace Paranext.DataProvider.Checks;

/// <summary>
/// Snapshot of verse/non-verse inventory items for auto-detecting separation state.
/// Used as input to DetermineSetSeparatelyState to compare verse vs non-verse inventories.
/// If the non-verse items differ from verse items, separation is auto-detected as enabled.
/// </summary>
public record SeparationDetectionSnapshot
{
    /// <summary>Items in verse text valid set.</summary>
    public HashSet<string> VerseValidItems { get; init; } = new();

    /// <summary>Items in verse text invalid set.</summary>
    public HashSet<string> VerseInvalidItems { get; init; } = new();

    /// <summary>Items in non-verse text valid set.</summary>
    public HashSet<string> NonVerseValidItems { get; init; } = new();

    /// <summary>Items in non-verse text invalid set.</summary>
    public HashSet<string> NonVerseInvalidItems { get; init; } = new();
}

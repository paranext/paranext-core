namespace Paranext.DataProvider.Checks;

/// <summary>
/// Snapshot of inventory valid/invalid item state, captured from TextInventory objects.
/// Used as input to DetermineSaveOperations for testable business logic separation.
/// </summary>
public record InventoryStatusSnapshot
{
    /// <summary>Verse text valid items (space-separated).</summary>
    public string VerseValidItems { get; init; } = "";

    /// <summary>Verse text invalid items (space-separated).</summary>
    public string VerseInvalidItems { get; init; } = "";

    /// <summary>Non-verse text valid items (space-separated).</summary>
    public string NonVerseValidItems { get; init; } = "";

    /// <summary>Non-verse text invalid items (space-separated).</summary>
    public string NonVerseInvalidItems { get; init; } = "";

    /// <summary>Study Bible content valid items (space-separated).</summary>
    public string StudyBibleValidItems { get; init; } = "";

    /// <summary>Study Bible content invalid items (space-separated).</summary>
    public string StudyBibleInvalidItems { get; init; } = "";
}

namespace Paranext.DataProvider.Checks;

/// <summary>
/// Service for managing inventory status persistence.
/// Contains EXT-003 (SaveInventoryStatus) branching logic.
///
/// The service operates on InventoryStatusSnapshot records (testable DTOs) rather than
/// ParatextData types directly. The PAPI integration layer is responsible for creating
/// snapshots from ScriptureInventoryBase/TextInventory objects and applying the save
/// operations back to the inventory.
/// </summary>
internal static class InventoryStatusService
{
    /// <summary>
    /// Determines which settings parameters need to be saved based on project type
    /// and separation state. Returns a list of save operations with parameter names
    /// and values.
    ///
    /// Branching logic (EXT-003, BHV-110):
    /// - SBA: saves _StudyBible suffixed valid/invalid only
    /// - Regular separated: saves main + _NonText suffixed valid/invalid (4 params)
    /// - Regular unseparated: saves main valid/invalid only (2 params)
    /// </summary>
    public static SaveOperationResult DetermineSaveOperations(
        InventoryStatusSnapshot snapshot,
        bool isSba,
        bool isSeparated
    )
    {
        throw new NotImplementedException("CAP-004: DetermineSaveOperations not yet implemented");
    }

    /// <summary>
    /// Executes a save action only if the user has permission (VAL-004).
    /// Returns true if save was performed, false if silently skipped.
    ///
    /// VAL-004: Only administrators or team members with editable projects can save.
    /// When permission is denied, returns false without calling saveAction or throwing.
    /// </summary>
    public static bool SaveInventoryStatusIfPermitted(bool canMakeChanges, Action saveAction)
    {
        throw new NotImplementedException(
            "CAP-004: SaveInventoryStatusIfPermitted not yet implemented"
        );
    }
}

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

/// <summary>
/// Result of determining save operations. Contains the list of parameter name/value
/// pairs that should be persisted to project settings.
/// </summary>
public record SaveOperationResult
{
    /// <summary>List of save operations to execute.</summary>
    public List<SaveOperation> Operations { get; init; } = new();
}

/// <summary>
/// A single save operation: a parameter name and its value to persist.
/// </summary>
public record SaveOperation(string ParameterName, string Value);

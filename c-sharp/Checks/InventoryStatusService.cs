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
    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Checking/InventoryForm.cs:753-782
    // Method: InventoryForm.SaveInventoryStatus()
    // Maps to: EXT-003, BHV-110
    public static SaveOperationResult DetermineSaveOperations(
        InventoryStatusSnapshot snapshot,
        bool isSba,
        bool isSeparated
    )
    {
        var operations = new List<SaveOperation>();

        if (isSba)
            AddStudyBibleOperations(operations, snapshot);
        else if (isSeparated)
            AddSeparatedOperations(operations, snapshot);
        else
            AddMainOperations(operations, snapshot);

        return new SaveOperationResult { Operations = operations };
    }

    private static void AddStudyBibleOperations(
        List<SaveOperation> operations,
        InventoryStatusSnapshot snapshot
    )
    {
        operations.Add(
            new SaveOperation("MatchedPairingCharacters_StudyBible", snapshot.StudyBibleValidItems)
        );
        operations.Add(
            new SaveOperation(
                "UnmatchedPairingCharacters_StudyBible",
                snapshot.StudyBibleInvalidItems
            )
        );
    }

    private static void AddSeparatedOperations(
        List<SaveOperation> operations,
        InventoryStatusSnapshot snapshot
    )
    {
        AddMainOperations(operations, snapshot);
        operations.Add(
            new SaveOperation("MatchedPairingCharacters_NonText", snapshot.NonVerseValidItems)
        );
        operations.Add(
            new SaveOperation("UnmatchedPairingCharacters_NonText", snapshot.NonVerseInvalidItems)
        );
    }

    private static void AddMainOperations(
        List<SaveOperation> operations,
        InventoryStatusSnapshot snapshot
    )
    {
        operations.Add(new SaveOperation("MatchedPairingCharacters", snapshot.VerseValidItems));
        operations.Add(new SaveOperation("UnmatchedPairingCharacters", snapshot.VerseInvalidItems));
    }

    /// <summary>
    /// Executes a save action only if the user has permission (VAL-004).
    /// Returns true if save was performed, false if silently skipped.
    ///
    /// VAL-004: Only administrators or team members with editable projects can save.
    /// When permission is denied, returns false without calling saveAction or throwing.
    /// </summary>
    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Checking/InventoryForm.cs:753-756
    // Method: InventoryForm.SaveInventoryStatus() (permission guard)
    // Maps to: VAL-004
    public static bool SaveInventoryStatusIfPermitted(bool canMakeChanges, Action saveAction)
    {
        if (!canMakeChanges)
            return false;

        saveAction();
        return true;
    }
}

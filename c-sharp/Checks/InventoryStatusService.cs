namespace Paranext.DataProvider.Checks;

/// <summary>
/// Service for managing inventory status operations.
/// Contains EXT-002 (SetSelectedStatus with always-valid protection),
/// EXT-003 (SaveInventoryStatus branching logic),
/// EXT-004 (ToggleSeparation/DetermineSetSeparatelyState), and permission guards (VAL-004, VAL-006).
///
/// The service operates on InventoryStatusSnapshot and SeparationSnapshot records
/// (testable DTOs) rather than ParatextData types directly. The PAPI integration layer
/// is responsible for creating snapshots from ScriptureInventoryBase/TextInventory
/// objects and applying the results back to the inventory.
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

    /// <summary>
    /// Computes status changes for selected inventory items, enforcing always-valid
    /// protection (VAL-007). Items marked as always-valid in Language Settings cannot
    /// be set to invalid or unknown, but CAN be set to valid.
    ///
    /// Returns a StatusChangeResult indicating which items were changed and which
    /// were skipped, with a warning message for skipped items.
    /// </summary>
    /// <param name="desiredStatus">The status to set (Valid, Invalid, or Unknown).</param>
    /// <param name="selectedItems">Item texts to change status for.</param>
    /// <param name="isAlwaysValid">Predicate checking if an item is always-valid.</param>
    /// <returns>StatusChangeResult with success, change, skip, and warning info.</returns>
    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Checking/InventoryForm.cs:784-859
    // Method: InventoryForm.SetSelectedStatus()
    // Maps to: EXT-002, BHV-114, BHV-305, INV-007, VAL-007
    public static StatusChangeResult ComputeStatusChanges(
        ItemStatus desiredStatus,
        string[] selectedItems,
        Func<string, bool> isAlwaysValid
    )
    {
        if (selectedItems.Length == 0)
        {
            return new StatusChangeResult
            {
                Success = true,
                StatusChanged = false,
                AllChanged = true,
                SkippedCount = 0,
                WarningMessage = null,
            };
        }

        int skippedCount = selectedItems.Count(item =>
            isAlwaysValid(item) && desiredStatus != ItemStatus.Valid
        );
        bool statusChanged = skippedCount < selectedItems.Length;
        bool allChanged = skippedCount == 0;
        string? warningMessage = skippedCount > 0 ? "Item is in Language Settings" : null;

        return new StatusChangeResult
        {
            Success = true,
            StatusChanged = statusChanged,
            AllChanged = allChanged,
            SkippedCount = skippedCount,
            WarningMessage = warningMessage,
        };
    }

    /// <summary>
    /// Resolves a content category string to the appropriate InventoryTextType.
    ///
    /// Category mapping (EXT-002):
    /// - "studycontenttext" -> StudyBibleContent
    /// - "nonversetext" -> NonVerseText
    /// - default -> VerseText (when separation supported) or AllText (combined)
    /// </summary>
    /// <param name="category">Content category string from UI.</param>
    /// <param name="supportsSeparateInventories">Whether the check supports separation.</param>
    /// <returns>The InventoryTextType for the target inventory.</returns>
    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Checking/InventoryForm.cs:801-815
    // Method: InventoryForm.SetSelectedStatus() (category switch)
    // Maps to: EXT-002, TS-095
    public static InventoryTextType ResolveInventoryCategory(
        string category,
        bool supportsSeparateInventories
    )
    {
        return category switch
        {
            "studycontenttext" => InventoryTextType.StudyBibleContent,
            "nonversetext" => InventoryTextType.NonVerseText,
            _ => supportsSeparateInventories
                ? InventoryTextType.VerseText
                : InventoryTextType.AllText,
        };
    }

    /// <summary>
    /// Guards the SetSelectedStatus operation with permission check (VAL-004).
    /// When canMakeChanges is false, returns a failure StatusChangeResult without
    /// invoking the compute action.
    /// </summary>
    /// <param name="canMakeChanges">Whether user has permission to make changes.</param>
    /// <param name="computeAction">The action to compute status changes.</param>
    /// <returns>StatusChangeResult from computeAction, or failure if not permitted.</returns>
    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Checking/InventoryForm.cs:784-786
    // Method: InventoryForm.SetSelectedStatus() (permission guard)
    // Maps to: VAL-004
    public static StatusChangeResult SetSelectedStatusIfPermitted(
        bool canMakeChanges,
        Func<StatusChangeResult> computeAction
    )
    {
        if (!canMakeChanges)
        {
            return new StatusChangeResult
            {
                Success = false,
                Error = "Permission denied: cannot make changes",
                StatusChanged = false,
                AllChanged = false,
                SkippedCount = 0,
            };
        }

        return computeAction();
    }

    // =========================================================================
    // EXT-004: Verse/Non-Verse Separation Toggle Logic (CAP-005)
    // =========================================================================

    /// <summary>
    /// Computes the result of toggling verse/non-verse separation.
    /// When enabling (enable=true): performs destructive merge where unknown non-verse
    /// items inherit their status from the verse inventory. Items already categorized
    /// in non-verse are preserved.
    /// When disabling (enable=false): no merge, just indicates separation is off.
    ///
    /// DESTRUCTIVE: The merge permanently modifies non-verse statuses. Toggling OFF
    /// does NOT restore original non-verse state. Re-toggling ON re-applies the merge
    /// for items that are currently Unknown in non-verse.
    /// </summary>
    /// <param name="enable">Whether to enable (true) or disable (false) separation.</param>
    /// <param name="snapshot">Current state of verse/non-verse inventory items.</param>
    /// <returns>SeparationToggleResult with merge details.</returns>
    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Checking/InventoryForm.cs:2101-2112, 1229-1267
    // Method: InventoryForm.setNonVerseStatus_Clicked() + SetNonVerseStatusFromVerseStatus()
    // Maps to: EXT-004, BHV-107, BHV-314
    public static SeparationToggleResult ComputeToggleSeparation(
        bool enable,
        SeparationSnapshot snapshot
    )
    {
        if (!enable)
        {
            return new SeparationToggleResult
            {
                Success = true,
                Enabled = false,
                RebuildRequired = true,
            };
        }

        // Start with existing categorized non-verse items (preserved)
        var mergedValid = new HashSet<string>(snapshot.NonVerseValidItems);
        var mergedInvalid = new HashSet<string>(snapshot.NonVerseInvalidItems);

        // Unknown non-verse items inherit their status from the verse inventory
        MergeUnknownItems(snapshot.VerseValidItems, snapshot.NonVerseUnknownItems, mergedValid);
        MergeUnknownItems(snapshot.VerseInvalidItems, snapshot.NonVerseUnknownItems, mergedInvalid);

        return new SeparationToggleResult
        {
            Success = true,
            Enabled = true,
            RebuildRequired = true,
            MergedNonVerseValid = mergedValid,
            MergedNonVerseInvalid = mergedInvalid,
        };
    }

    /// <summary>
    /// Determines the initial separation state by checking the project setting
    /// and auto-detecting whether non-verse settings differ from verse settings.
    /// Returns true if separation should be enabled.
    /// </summary>
    /// <param name="settingValue">Value of MatchedPairsCheckSetSeparately project setting (may be null/empty).</param>
    /// <param name="snapshot">Current verse/non-verse inventory items for auto-detection.</param>
    /// <returns>True if separation is enabled (by setting or auto-detection).</returns>
    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Checking/InventoryForm.cs:1875-1901
    // Method: InventoryForm.DetermineSetSeparatelyState()
    // Maps to: M-006, BHV-107
    public static bool DetermineSetSeparatelyState(
        string? settingValue,
        SeparationDetectionSnapshot snapshot
    )
    {
        // If setting is explicitly "true", return true immediately
        if (string.Equals(settingValue, "True", StringComparison.OrdinalIgnoreCase))
            return true;

        // For null, empty, or "false" settings: auto-detect by checking
        // if non-verse settings differ from verse settings.
        // Returns true when non-verse valid/invalid items are not subsets of verse items.
        return !snapshot.NonVerseValidItems.IsSubsetOf(snapshot.VerseValidItems)
            || !snapshot.NonVerseInvalidItems.IsSubsetOf(snapshot.VerseInvalidItems);
    }

    /// <summary>
    /// Guards the ToggleSeparation operation with administrator permission check (VAL-006).
    /// When isAdmin is false, returns a failure SeparationToggleResult without invoking
    /// the toggle action.
    /// </summary>
    /// <param name="isAdmin">Whether the current user is an administrator.</param>
    /// <param name="toggleAction">The action to compute the toggle result.</param>
    /// <returns>SeparationToggleResult from toggleAction, or failure if not admin.</returns>
    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Checking/InventoryForm.cs:370 (UpdateMenuStatus)
    // Maps to: VAL-006
    public static SeparationToggleResult ToggleSeparationIfPermitted(
        bool isAdmin,
        Func<SeparationToggleResult> toggleAction
    )
    {
        if (!isAdmin)
        {
            return new SeparationToggleResult
            {
                Success = false,
                Error = "Only administrators can toggle verse/non-verse separation",
                Enabled = false,
                RebuildRequired = false,
            };
        }

        return toggleAction();
    }

    /// <summary>
    /// Guards the ToggleSeparation operation with check-type support check (BHV-107).
    /// When supportsSeparateInventories is false, returns a failure SeparationToggleResult
    /// without invoking the toggle action.
    /// </summary>
    /// <param name="supportsSeparateInventories">Whether the check supports separation.</param>
    /// <param name="toggleAction">The action to compute the toggle result.</param>
    /// <returns>SeparationToggleResult from toggleAction, or failure if not supported.</returns>
    // === PORTED FROM PT9 ===
    // Source: PT9/ParatextChecks/Checks/MatchedPairsCheck.cs:81-90
    // Maps to: BHV-107
    public static SeparationToggleResult ToggleSeparationIfSupported(
        bool supportsSeparateInventories,
        Func<SeparationToggleResult> toggleAction
    )
    {
        if (!supportsSeparateInventories)
        {
            return new SeparationToggleResult
            {
                Success = false,
                Error = "This check type does not support separate inventories",
                Enabled = false,
                RebuildRequired = false,
            };
        }

        return toggleAction();
    }

    /// <summary>
    /// Copies items from <paramref name="sourceItems"/> into <paramref name="targetSet"/>
    /// when the item exists in <paramref name="unknownItems"/>. Used during separation toggle
    /// to inherit verse statuses for unknown non-verse items.
    /// </summary>
    private static void MergeUnknownItems(
        HashSet<string> sourceItems,
        HashSet<string> unknownItems,
        HashSet<string> targetSet
    )
    {
        foreach (string item in sourceItems)
        {
            if (unknownItems.Contains(item))
            {
                targetSet.Add(item);
            }
        }
    }
}

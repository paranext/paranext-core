namespace Paranext.DataProvider.Checks;

// === NEW IN PT10 ===
// Reason: PAPI communication types for matched pairs inventory feature
// Maps to: CAP-013 (shared types)

#region Input Types

/// <summary>
/// Parameters for building the matched pairs inventory.
/// Maps to EXT-001 (InventoryForm.BuildInventory).
/// </summary>
public record BuildInventoryInput(
    string ProjectId,
    bool IsSba,
    bool IsSeparated,
    int[]? SelectedBooks = null
);

/// <summary>
/// Parameters for setting inventory item status.
/// Maps to EXT-002 (InventoryForm.SetSelectedStatus).
/// </summary>
public record SetStatusInput(
    ItemStatus DesiredStatus,
    string Category,
    string[] SelectedItems,
    string ProjectId,
    bool IsSeparated,
    bool IsSba
);

/// <summary>
/// Parameters for saving inventory status to project settings.
/// Maps to EXT-003 (InventoryForm.SaveInventoryStatus).
/// </summary>
public record SaveInventoryStatusInput(string ProjectId, bool IsSba, bool IsSeparated);

/// <summary>
/// Parameters for toggling verse/non-verse separation.
/// WARNING: Enabling separation is destructive - unknown non-verse items
/// inherit verse status and cannot be reverted.
/// Maps to EXT-004 (InventoryForm verse/non-verse toggle).
/// </summary>
public record ToggleSeparationInput(bool Enable, string ProjectId);

/// <summary>
/// Parameters for determining inventory column configuration.
/// Maps to EXT-005 (InventoryForm.SetupDisplayedColumns).
/// </summary>
public record GetDisplayedColumnsInput(
    bool IsSba,
    bool IsSeparated,
    bool SupportsSeparateInventories
);

/// <summary>
/// Parameters for determining content type filter options.
/// Maps to EXT-006 (InventoryForm.SetupTextTypeDropdown).
/// </summary>
public record GetContentTypeFilterInput(bool IsSba, bool IsSeparated);

/// <summary>
/// Parameters for saving inventory option values.
/// Maps to EXT-007 (CMSOptionsForm.cmdOK_Click).
/// </summary>
public record SaveInventoryOptionsInput(
    string ProjectId,
    Dictionary<string, string> OldValues,
    Dictionary<string, string> NewValues
);

/// <summary>
/// Parameters for determining option parameter UI control type.
/// Maps to EXT-008 (CMSOptionsForm.SetupParameterValue).
/// </summary>
public record GetOptionParameterTypeInput(
    string OptionName,
    string CurrentValue,
    string DefaultValue,
    bool IsErrorStorage
);

/// <summary>
/// Parameters for executing basic checks.
/// Maps to EXT-009 (RunBasicChecksForm.cmdOK_Click).
/// </summary>
public record ExecuteBasicChecksInput(
    string ProjectId,
    List<string> ChecksToRun,
    List<int> BooksToCheck,
    int FirstChapter = 0,
    int LastChapter = 0
);

/// <summary>
/// Parameters for initializing an inventory session.
/// Maps to EXT-013 (WindowCollection.FindOrCreateInventoryForm).
/// </summary>
public record InitializeInventoryInput(string ProjectId, string CheckType);

#endregion

#region Output Types

/// <summary>
/// Result of building the matched pairs inventory.
/// Contains all populated TextInventory data serialized for the UI.
/// </summary>
public record InventoryBuildResult
{
    public bool Success { get; init; }
    public string? Error { get; init; }
    public List<InventoryItemData> Items { get; init; } = new();
    public bool VersePopulated { get; init; }
    public bool NonVersePopulated { get; init; }
    public bool RegularPopulated { get; init; }
    public bool StudyBiblePopulated { get; init; }
    public bool CombinedIsMerge { get; init; }
    public bool SetupComplete { get; init; }
}

/// <summary>
/// Result of setting status on selected inventory items.
/// </summary>
public record StatusChangeResult
{
    public bool Success { get; init; }
    public string? Error { get; init; }
    public bool StatusChanged { get; init; }
    public bool AllChanged { get; init; }
    public int SkippedCount { get; init; }
    public string? WarningMessage { get; init; }
}

/// <summary>
/// Result of toggling verse/non-verse separation.
/// </summary>
public record SeparationToggleResult
{
    public bool Success { get; init; }
    public string? Error { get; init; }
    public bool Enabled { get; init; }
    public bool RebuildRequired { get; init; }
}

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

/// <summary>
/// Result of initializing an inventory session.
/// </summary>
public record InventoryInitResult
{
    public bool Success { get; init; }
    public string? Error { get; init; }
    public string Title { get; init; } = string.Empty;
    public bool IsSba { get; init; }
    public bool IsSeparated { get; init; }
    public bool SupportsSeparateInventories { get; init; }
    public List<InventoryOption> Options { get; init; } = new();
    public PermissionState Permissions { get; init; } = new();
}

/// <summary>
/// Single inventory option with name, value, default, and label.
/// </summary>
public record InventoryOption(string Name, string Value, string DefaultValue, string Label);

/// <summary>
/// Single inventory item data for the UI.
/// </summary>
public record InventoryItemData
{
    public string Text { get; init; } = string.Empty;
    public Dictionary<string, int> Counts { get; init; } = new();
    public Dictionary<string, ItemStatus> Statuses { get; init; } = new();
    public List<int> References { get; init; } = new();
    public int TotalCount { get; init; }
}

/// <summary>
/// Single instance of an inventory item in the text.
/// For the lower pane reference list (BHV-117).
/// </summary>
public record InventoryInstanceData(
    string Reference,
    int VerseRef,
    string ContextBefore,
    string ItemText,
    string ContextAfter
);

#endregion

namespace Paranext.DataProvider.Checks;

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

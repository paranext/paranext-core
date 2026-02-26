namespace Paranext.DataProvider.Checks;

/// <summary>
/// Pure computation services for inventory display configuration.
/// Contains EXT-005 (GetDisplayedColumns) and EXT-006 (GetContentTypeFilterOptions).
/// </summary>
internal static class InventoryDisplayService
{
    /// <summary>
    /// Returns the list of column definitions for the inventory display.
    /// For MatchedPairs: Text + count/status columns per project type and separation.
    /// </summary>
    /// <param name="isSba">Whether the project is Study Bible Additions.</param>
    /// <param name="isSeparated">Whether verse/non-verse separation is enabled.</param>
    /// <param name="supportsSeparateInventories">Whether the check supports separate inventories.</param>
    /// <returns>List of column definitions for the inventory upper pane.</returns>
    public static List<ColumnDefinition> GetDisplayedColumns(
        bool isSba,
        bool isSeparated,
        bool supportsSeparateInventories
    )
    {
        throw new NotImplementedException();
    }
}

namespace Paranext.DataProvider.Checks;

/// <summary>
/// Pure computation services for inventory display configuration.
/// Contains EXT-005 (GetDisplayedColumns) and EXT-006 (GetContentTypeFilterOptions).
/// </summary>
internal static class InventoryDisplayService
{
    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Checking/InventoryForm.cs:1322-1388
    // Method: InventoryForm.SetupDisplayedColumns()
    // Maps to: EXT-005
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
        var columns = new List<ColumnDefinition>
        {
            new("Text", "Text", "text", DefaultSortDescending: false),
        };

        if (isSba)
        {
            if (isSeparated)
            {
                // SBA separated: verse/non-verse columns then study content columns
                columns.Add(
                    new("VerseTextCount", "Verse text #", "count", DefaultSortDescending: true)
                );
                columns.Add(
                    new(
                        "VerseTextStatus",
                        "Verse text Status",
                        "status",
                        DefaultSortDescending: false
                    )
                );
                columns.Add(
                    new("NonVerseCount", "Non-verse text #", "count", DefaultSortDescending: true)
                );
                columns.Add(
                    new(
                        "NonVerseStatus",
                        "Non-verse text Status",
                        "status",
                        DefaultSortDescending: false
                    )
                );
                columns.Add(
                    new(
                        "StudyContentCount",
                        "Study Bible content #",
                        "count",
                        DefaultSortDescending: true
                    )
                );
                columns.Add(
                    new(
                        "StudyContentStatus",
                        "Study Bible content Status",
                        "status",
                        DefaultSortDescending: false
                    )
                );
            }
            else
            {
                // SBA non-separated: regular text and study content columns
                columns.Add(
                    new("RegularTextCount", "Regular text #", "count", DefaultSortDescending: true)
                );
                columns.Add(
                    new(
                        "RegularTextStatus",
                        "Regular text Status",
                        "status",
                        DefaultSortDescending: false
                    )
                );
                columns.Add(
                    new(
                        "StudyContentCount",
                        "Study Bible content #",
                        "count",
                        DefaultSortDescending: true
                    )
                );
                columns.Add(
                    new(
                        "StudyContentStatus",
                        "Study Bible content Status",
                        "status",
                        DefaultSortDescending: false
                    )
                );
            }
        }
        else
        {
            if (isSeparated)
            {
                // Regular separated: verse and non-verse columns
                columns.Add(
                    new("VerseTextCount", "Verse text #", "count", DefaultSortDescending: true)
                );
                columns.Add(
                    new(
                        "VerseTextStatus",
                        "Verse text Status",
                        "status",
                        DefaultSortDescending: false
                    )
                );
                columns.Add(
                    new("NonVerseCount", "Non-verse text #", "count", DefaultSortDescending: true)
                );
                columns.Add(
                    new(
                        "NonVerseStatus",
                        "Non-verse text Status",
                        "status",
                        DefaultSortDescending: false
                    )
                );
            }
            else
            {
                // Regular non-separated: combined columns
                columns.Add(new("CombinedCount", "#", "count", DefaultSortDescending: true));
                columns.Add(
                    new("CombinedStatus", "Status", "status", DefaultSortDescending: false)
                );
            }
        }

        return columns;
    }
}

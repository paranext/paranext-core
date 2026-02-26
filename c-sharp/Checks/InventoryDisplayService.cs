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
        var columns = new List<ColumnDefinition>
        {
            new("Text", "Text", "text", DefaultSortDescending: false),
        };

        if (isSeparated)
            AddVerseAndNonVerseColumns(columns);
        else if (isSba)
            AddRegularTextColumns(columns);
        else
            AddCombinedColumns(columns);

        if (isSba)
            AddStudyContentColumns(columns);

        return columns;
    }

    private static void AddVerseAndNonVerseColumns(List<ColumnDefinition> columns)
    {
        columns.Add(new("VerseTextCount", "Verse text #", "count", DefaultSortDescending: true));
        columns.Add(
            new("VerseTextStatus", "Verse text Status", "status", DefaultSortDescending: false)
        );
        columns.Add(new("NonVerseCount", "Non-verse text #", "count", DefaultSortDescending: true));
        columns.Add(
            new("NonVerseStatus", "Non-verse text Status", "status", DefaultSortDescending: false)
        );
    }

    private static void AddRegularTextColumns(List<ColumnDefinition> columns)
    {
        columns.Add(
            new("RegularTextCount", "Regular text #", "count", DefaultSortDescending: true)
        );
        columns.Add(
            new("RegularTextStatus", "Regular text Status", "status", DefaultSortDescending: false)
        );
    }

    private static void AddCombinedColumns(List<ColumnDefinition> columns)
    {
        columns.Add(new("CombinedCount", "#", "count", DefaultSortDescending: true));
        columns.Add(new("CombinedStatus", "Status", "status", DefaultSortDescending: false));
    }

    private static void AddStudyContentColumns(List<ColumnDefinition> columns)
    {
        columns.Add(
            new("StudyContentCount", "Study Bible content #", "count", DefaultSortDescending: true)
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

    /// <summary>
    /// Returns content type filter options based on project type and separation state.
    /// Hidden when regular non-separated; shows options for all other paths.
    /// </summary>
    /// <param name="isSba">Whether the project is Study Bible Additions.</param>
    /// <param name="isSeparated">Whether verse/non-verse separation is enabled.</param>
    /// <returns>Content type filter configuration with visibility and options.</returns>
    public static ContentTypeFilterResult GetContentTypeFilterOptions(bool isSba, bool isSeparated)
    {
        if (!isSba && !isSeparated)
            return new ContentTypeFilterResult { Visible = false };

        var options = new List<ContentTypeOption> { new("All text", InventoryTextType.AllText) };

        if (isSeparated)
        {
            options.Add(new("Verse text only", InventoryTextType.VerseText));
            options.Add(new("Non-verse text only", InventoryTextType.NonVerseText));
        }
        else if (isSba)
        {
            options.Add(new("Base project content only", InventoryTextType.RegularContent));
        }

        if (isSba)
            options.Add(new("Study Bible content only", InventoryTextType.StudyBibleContent));

        return new ContentTypeFilterResult { Visible = true, Options = options };
    }
}

using Paranext.DataProvider.Checks;

namespace TestParanextDataProvider.Checks;

/// <summary>
/// Tests for CAP-006 GetDisplayedColumns: pure computation that returns column definitions
/// for the inventory upper pane based on 4-way branching (Regular/SBA x Separated/NonSeparated).
///
/// Source: EXT-005 (InventoryForm.SetupDisplayedColumns, PT9 InventoryForm.cs:1322-1388)
/// Contract: Section 4.7 M-007 GetDisplayedColumns
/// Golden master: gm-008 (column configuration state machine)
///
/// No mocking required - this is a pure static computation with no dependencies.
/// </summary>
[TestFixture]
public class InventoryDisplayServiceTests
{
    #region Acceptance Test (gm-008)

    /// <summary>
    /// Acceptance test: Verifies all 4 branching paths return correct column IDs
    /// matching the golden master gm-008 exactly. When this test passes, CAP-006 is complete.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-006")]
    [Property("GoldenMasterId", "gm-008")]
    [Property("BehaviorId", "EXT-005")]
    [Description(
        "Acceptance test: GetDisplayedColumns returns correct column IDs for all 4 branching paths"
    )]
    public void GetDisplayedColumns_AllFourPaths_MatchGoldenMaster()
    {
        // Path 1: Regular non-separated
        var regularNonSep = InventoryDisplayService.GetDisplayedColumns(
            isSba: false,
            isSeparated: false,
            supportsSeparateInventories: true
        );
        Assert.That(
            regularNonSep.Select(c => c.Id).ToArray(),
            Is.EqualTo(new[] { "Text", "CombinedCount", "CombinedStatus" }),
            "Regular non-separated column IDs must match gm-008"
        );

        // Path 2: Regular separated
        var regularSep = InventoryDisplayService.GetDisplayedColumns(
            isSba: false,
            isSeparated: true,
            supportsSeparateInventories: true
        );
        Assert.That(
            regularSep.Select(c => c.Id).ToArray(),
            Is.EqualTo(
                new[]
                {
                    "Text",
                    "VerseTextCount",
                    "VerseTextStatus",
                    "NonVerseCount",
                    "NonVerseStatus",
                }
            ),
            "Regular separated column IDs must match gm-008"
        );

        // Path 3: SBA non-separated
        var sbaNonSep = InventoryDisplayService.GetDisplayedColumns(
            isSba: true,
            isSeparated: false,
            supportsSeparateInventories: true
        );
        Assert.That(
            sbaNonSep.Select(c => c.Id).ToArray(),
            Is.EqualTo(
                new[]
                {
                    "Text",
                    "RegularTextCount",
                    "RegularTextStatus",
                    "StudyContentCount",
                    "StudyContentStatus",
                }
            ),
            "SBA non-separated column IDs must match gm-008"
        );

        // Path 4: SBA separated
        var sbaSep = InventoryDisplayService.GetDisplayedColumns(
            isSba: true,
            isSeparated: true,
            supportsSeparateInventories: true
        );
        Assert.That(
            sbaSep.Select(c => c.Id).ToArray(),
            Is.EqualTo(
                new[]
                {
                    "Text",
                    "VerseTextCount",
                    "VerseTextStatus",
                    "NonVerseCount",
                    "NonVerseStatus",
                    "StudyContentCount",
                    "StudyContentStatus",
                }
            ),
            "SBA separated column IDs must match gm-008"
        );
    }

    #endregion

    #region Contract Tests - Regular Non-Separated (TS-101)

    /// <summary>
    /// TS-101: Regular non-separated project returns exactly 3 columns.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-006")]
    [Property("ScenarioId", "TS-101")]
    [Property("BehaviorId", "EXT-005")]
    public void GetDisplayedColumns_RegularNonSeparated_ReturnsThreeColumns()
    {
        var columns = InventoryDisplayService.GetDisplayedColumns(
            isSba: false,
            isSeparated: false,
            supportsSeparateInventories: true
        );

        Assert.That(columns, Has.Count.EqualTo(3));
    }

    /// <summary>
    /// TS-101: Regular non-separated - Text column is first with correct properties.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-006")]
    [Property("ScenarioId", "TS-101")]
    [Property("BehaviorId", "EXT-005")]
    public void GetDisplayedColumns_RegularNonSeparated_TextColumnIsFirst()
    {
        var columns = InventoryDisplayService.GetDisplayedColumns(
            isSba: false,
            isSeparated: false,
            supportsSeparateInventories: true
        );

        var textCol = columns[0];
        Assert.That(textCol.Id, Is.EqualTo("Text"));
        Assert.That(textCol.Label, Is.EqualTo("Text"));
        Assert.That(textCol.Type, Is.EqualTo("text"));
        Assert.That(
            textCol.DefaultSortDescending,
            Is.False,
            "Text columns sort ascending by default"
        );
    }

    /// <summary>
    /// TS-101: Regular non-separated - CombinedCount column has correct properties.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-006")]
    [Property("ScenarioId", "TS-101")]
    [Property("BehaviorId", "EXT-005")]
    public void GetDisplayedColumns_RegularNonSeparated_CombinedCountColumn()
    {
        var columns = InventoryDisplayService.GetDisplayedColumns(
            isSba: false,
            isSeparated: false,
            supportsSeparateInventories: true
        );

        var countCol = columns[1];
        Assert.That(countCol.Id, Is.EqualTo("CombinedCount"));
        Assert.That(countCol.Type, Is.EqualTo("count"));
        Assert.That(
            countCol.DefaultSortDescending,
            Is.True,
            "Count columns sort descending by default"
        );
    }

    /// <summary>
    /// TS-101: Regular non-separated - CombinedStatus column has correct properties.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-006")]
    [Property("ScenarioId", "TS-101")]
    [Property("BehaviorId", "EXT-005")]
    public void GetDisplayedColumns_RegularNonSeparated_CombinedStatusColumn()
    {
        var columns = InventoryDisplayService.GetDisplayedColumns(
            isSba: false,
            isSeparated: false,
            supportsSeparateInventories: true
        );

        var statusCol = columns[2];
        Assert.That(statusCol.Id, Is.EqualTo("CombinedStatus"));
        Assert.That(statusCol.Type, Is.EqualTo("status"));
        Assert.That(
            statusCol.DefaultSortDescending,
            Is.False,
            "Status columns sort ascending by default"
        );
    }

    #endregion

    #region Contract Tests - Regular Separated (TS-102)

    /// <summary>
    /// TS-102: Regular separated project returns exactly 5 columns.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-006")]
    [Property("ScenarioId", "TS-102")]
    [Property("BehaviorId", "EXT-005")]
    public void GetDisplayedColumns_RegularSeparated_ReturnsFiveColumns()
    {
        var columns = InventoryDisplayService.GetDisplayedColumns(
            isSba: false,
            isSeparated: true,
            supportsSeparateInventories: true
        );

        Assert.That(columns, Has.Count.EqualTo(5));
    }

    /// <summary>
    /// TS-102: Regular separated - VerseTextCount column has correct properties.
    /// Contract Section 4.7 specifies label "Verse text #" for this column.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-006")]
    [Property("ScenarioId", "TS-102")]
    [Property("BehaviorId", "EXT-005")]
    public void GetDisplayedColumns_RegularSeparated_VerseTextCountColumn()
    {
        var columns = InventoryDisplayService.GetDisplayedColumns(
            isSba: false,
            isSeparated: true,
            supportsSeparateInventories: true
        );

        var verseCountCol = columns[1];
        Assert.That(verseCountCol.Id, Is.EqualTo("VerseTextCount"));
        Assert.That(verseCountCol.Label, Is.EqualTo("Verse text #"));
        Assert.That(verseCountCol.Type, Is.EqualTo("count"));
        Assert.That(verseCountCol.DefaultSortDescending, Is.True);
    }

    /// <summary>
    /// TS-102: Regular separated - VerseTextStatus column has correct properties.
    /// Contract Section 4.7 specifies label "Verse text Status".
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-006")]
    [Property("ScenarioId", "TS-102")]
    [Property("BehaviorId", "EXT-005")]
    public void GetDisplayedColumns_RegularSeparated_VerseTextStatusColumn()
    {
        var columns = InventoryDisplayService.GetDisplayedColumns(
            isSba: false,
            isSeparated: true,
            supportsSeparateInventories: true
        );

        var verseStatusCol = columns[2];
        Assert.That(verseStatusCol.Id, Is.EqualTo("VerseTextStatus"));
        Assert.That(verseStatusCol.Label, Is.EqualTo("Verse text Status"));
        Assert.That(verseStatusCol.Type, Is.EqualTo("status"));
        Assert.That(verseStatusCol.DefaultSortDescending, Is.False);
    }

    /// <summary>
    /// TS-102: Regular separated - NonVerseCount column has correct properties.
    /// Contract Section 4.7 specifies label "Non-verse text #".
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-006")]
    [Property("ScenarioId", "TS-102")]
    [Property("BehaviorId", "EXT-005")]
    public void GetDisplayedColumns_RegularSeparated_NonVerseCountColumn()
    {
        var columns = InventoryDisplayService.GetDisplayedColumns(
            isSba: false,
            isSeparated: true,
            supportsSeparateInventories: true
        );

        var nonVerseCountCol = columns[3];
        Assert.That(nonVerseCountCol.Id, Is.EqualTo("NonVerseCount"));
        Assert.That(nonVerseCountCol.Label, Is.EqualTo("Non-verse text #"));
        Assert.That(nonVerseCountCol.Type, Is.EqualTo("count"));
        Assert.That(nonVerseCountCol.DefaultSortDescending, Is.True);
    }

    /// <summary>
    /// TS-102: Regular separated - NonVerseStatus column has correct properties.
    /// Contract Section 4.7 specifies label "Non-verse text Status".
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-006")]
    [Property("ScenarioId", "TS-102")]
    [Property("BehaviorId", "EXT-005")]
    public void GetDisplayedColumns_RegularSeparated_NonVerseStatusColumn()
    {
        var columns = InventoryDisplayService.GetDisplayedColumns(
            isSba: false,
            isSeparated: true,
            supportsSeparateInventories: true
        );

        var nonVerseStatusCol = columns[4];
        Assert.That(nonVerseStatusCol.Id, Is.EqualTo("NonVerseStatus"));
        Assert.That(nonVerseStatusCol.Label, Is.EqualTo("Non-verse text Status"));
        Assert.That(nonVerseStatusCol.Type, Is.EqualTo("status"));
        Assert.That(nonVerseStatusCol.DefaultSortDescending, Is.False);
    }

    #endregion

    #region Extraction Tests - SBA Non-Separated (EXT-005)

    /// <summary>
    /// EXT-005: SBA non-separated project returns exactly 5 columns with SBA-specific names.
    /// </summary>
    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-006")]
    [Property("ExtractionId", "EXT-005")]
    [Property("BehaviorId", "EXT-005")]
    public void GetDisplayedColumns_SbaNonSeparated_ReturnsFiveColumns()
    {
        var columns = InventoryDisplayService.GetDisplayedColumns(
            isSba: true,
            isSeparated: false,
            supportsSeparateInventories: true
        );

        Assert.That(columns, Has.Count.EqualTo(5));
    }

    /// <summary>
    /// EXT-005: SBA non-separated - RegularTextCount column with correct properties.
    /// </summary>
    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-006")]
    [Property("ExtractionId", "EXT-005")]
    [Property("BehaviorId", "EXT-005")]
    public void GetDisplayedColumns_SbaNonSeparated_RegularTextCountColumn()
    {
        var columns = InventoryDisplayService.GetDisplayedColumns(
            isSba: true,
            isSeparated: false,
            supportsSeparateInventories: true
        );

        var regCountCol = columns[1];
        Assert.That(regCountCol.Id, Is.EqualTo("RegularTextCount"));
        Assert.That(regCountCol.Type, Is.EqualTo("count"));
        Assert.That(regCountCol.DefaultSortDescending, Is.True);
    }

    /// <summary>
    /// EXT-005: SBA non-separated - RegularTextStatus column with correct properties.
    /// </summary>
    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-006")]
    [Property("ExtractionId", "EXT-005")]
    [Property("BehaviorId", "EXT-005")]
    public void GetDisplayedColumns_SbaNonSeparated_RegularTextStatusColumn()
    {
        var columns = InventoryDisplayService.GetDisplayedColumns(
            isSba: true,
            isSeparated: false,
            supportsSeparateInventories: true
        );

        var regStatusCol = columns[2];
        Assert.That(regStatusCol.Id, Is.EqualTo("RegularTextStatus"));
        Assert.That(regStatusCol.Type, Is.EqualTo("status"));
        Assert.That(regStatusCol.DefaultSortDescending, Is.False);
    }

    /// <summary>
    /// EXT-005: SBA non-separated - StudyContentCount column with correct properties.
    /// </summary>
    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-006")]
    [Property("ExtractionId", "EXT-005")]
    [Property("BehaviorId", "EXT-005")]
    public void GetDisplayedColumns_SbaNonSeparated_StudyContentCountColumn()
    {
        var columns = InventoryDisplayService.GetDisplayedColumns(
            isSba: true,
            isSeparated: false,
            supportsSeparateInventories: true
        );

        var studyCountCol = columns[3];
        Assert.That(studyCountCol.Id, Is.EqualTo("StudyContentCount"));
        Assert.That(studyCountCol.Type, Is.EqualTo("count"));
        Assert.That(studyCountCol.DefaultSortDescending, Is.True);
    }

    /// <summary>
    /// EXT-005: SBA non-separated - StudyContentStatus column with correct properties.
    /// </summary>
    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-006")]
    [Property("ExtractionId", "EXT-005")]
    [Property("BehaviorId", "EXT-005")]
    public void GetDisplayedColumns_SbaNonSeparated_StudyContentStatusColumn()
    {
        var columns = InventoryDisplayService.GetDisplayedColumns(
            isSba: true,
            isSeparated: false,
            supportsSeparateInventories: true
        );

        var studyStatusCol = columns[4];
        Assert.That(studyStatusCol.Id, Is.EqualTo("StudyContentStatus"));
        Assert.That(studyStatusCol.Type, Is.EqualTo("status"));
        Assert.That(studyStatusCol.DefaultSortDescending, Is.False);
    }

    #endregion

    #region Extraction Tests - SBA Separated (EXT-005)

    /// <summary>
    /// EXT-005: SBA separated project returns exactly 7 columns (most columns of any path).
    /// </summary>
    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-006")]
    [Property("ExtractionId", "EXT-005")]
    [Property("BehaviorId", "EXT-005")]
    public void GetDisplayedColumns_SbaSeparated_ReturnsSevenColumns()
    {
        var columns = InventoryDisplayService.GetDisplayedColumns(
            isSba: true,
            isSeparated: true,
            supportsSeparateInventories: true
        );

        Assert.That(columns, Has.Count.EqualTo(7));
    }

    /// <summary>
    /// EXT-005: SBA separated - column order is Text, VerseText*, NonVerse*, StudyContent*.
    /// The verse and non-verse columns come first, then study content columns are appended.
    /// </summary>
    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-006")]
    [Property("ExtractionId", "EXT-005")]
    [Property("BehaviorId", "EXT-005")]
    public void GetDisplayedColumns_SbaSeparated_ColumnsInCorrectOrder()
    {
        var columns = InventoryDisplayService.GetDisplayedColumns(
            isSba: true,
            isSeparated: true,
            supportsSeparateInventories: true
        );

        var ids = columns.Select(c => c.Id).ToArray();
        Assert.That(
            ids,
            Is.EqualTo(
                new[]
                {
                    "Text",
                    "VerseTextCount",
                    "VerseTextStatus",
                    "NonVerseCount",
                    "NonVerseStatus",
                    "StudyContentCount",
                    "StudyContentStatus",
                }
            )
        );
    }

    /// <summary>
    /// EXT-005: SBA separated - StudyContent columns at positions 5 and 6 have correct types.
    /// </summary>
    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-006")]
    [Property("ExtractionId", "EXT-005")]
    [Property("BehaviorId", "EXT-005")]
    public void GetDisplayedColumns_SbaSeparated_StudyContentColumnsAtEnd()
    {
        var columns = InventoryDisplayService.GetDisplayedColumns(
            isSba: true,
            isSeparated: true,
            supportsSeparateInventories: true
        );

        // StudyContentCount at index 5
        Assert.That(columns[5].Id, Is.EqualTo("StudyContentCount"));
        Assert.That(columns[5].Type, Is.EqualTo("count"));
        Assert.That(columns[5].DefaultSortDescending, Is.True);

        // StudyContentStatus at index 6
        Assert.That(columns[6].Id, Is.EqualTo("StudyContentStatus"));
        Assert.That(columns[6].Type, Is.EqualTo("status"));
        Assert.That(columns[6].DefaultSortDescending, Is.False);
    }

    #endregion

    #region Column Property Invariant Tests

    /// <summary>
    /// Invariant: The first column is always "Text" regardless of project type or separation state.
    /// This holds for all 4 branching paths.
    /// </summary>
    [TestCase(false, false, TestName = "Regular non-separated")]
    [TestCase(false, true, TestName = "Regular separated")]
    [TestCase(true, false, TestName = "SBA non-separated")]
    [TestCase(true, true, TestName = "SBA separated")]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-006")]
    [Property("BehaviorId", "EXT-005")]
    public void GetDisplayedColumns_AllPaths_FirstColumnIsAlwaysText(bool isSba, bool isSeparated)
    {
        var columns = InventoryDisplayService.GetDisplayedColumns(
            isSba,
            isSeparated,
            supportsSeparateInventories: true
        );

        Assert.That(columns, Is.Not.Empty);
        Assert.That(columns[0].Id, Is.EqualTo("Text"));
        Assert.That(columns[0].Label, Is.EqualTo("Text"));
        Assert.That(columns[0].Type, Is.EqualTo("text"));
        Assert.That(columns[0].DefaultSortDescending, Is.False);
    }

    /// <summary>
    /// Invariant: All count columns sort descending by default.
    /// Section 3.4 specifies "Default sort direction: descending for counts".
    /// </summary>
    [TestCase(false, false, TestName = "Regular non-separated")]
    [TestCase(false, true, TestName = "Regular separated")]
    [TestCase(true, false, TestName = "SBA non-separated")]
    [TestCase(true, true, TestName = "SBA separated")]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-006")]
    [Property("BehaviorId", "EXT-005")]
    public void GetDisplayedColumns_AllPaths_CountColumnsSortDescending(
        bool isSba,
        bool isSeparated
    )
    {
        var columns = InventoryDisplayService.GetDisplayedColumns(
            isSba,
            isSeparated,
            supportsSeparateInventories: true
        );

        var countColumns = columns.Where(c => c.Type == "count").ToList();
        Assert.That(countColumns, Is.Not.Empty, "Every path should have at least one count column");
        Assert.That(
            countColumns.All(c => c.DefaultSortDescending),
            Is.True,
            "All count columns must sort descending by default"
        );
    }

    /// <summary>
    /// Invariant: All status columns sort ascending by default.
    /// Section 3.4 specifies "Default sort direction: ascending for text".
    /// Status columns follow the same ascending convention as text.
    /// </summary>
    [TestCase(false, false, TestName = "Regular non-separated")]
    [TestCase(false, true, TestName = "Regular separated")]
    [TestCase(true, false, TestName = "SBA non-separated")]
    [TestCase(true, true, TestName = "SBA separated")]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-006")]
    [Property("BehaviorId", "EXT-005")]
    public void GetDisplayedColumns_AllPaths_StatusColumnsSortAscending(
        bool isSba,
        bool isSeparated
    )
    {
        var columns = InventoryDisplayService.GetDisplayedColumns(
            isSba,
            isSeparated,
            supportsSeparateInventories: true
        );

        var statusColumns = columns.Where(c => c.Type == "status").ToList();
        Assert.That(
            statusColumns,
            Is.Not.Empty,
            "Every path should have at least one status column"
        );
        Assert.That(
            statusColumns.All(c => !c.DefaultSortDescending),
            Is.True,
            "All status columns must sort ascending by default"
        );
    }

    /// <summary>
    /// Invariant: Column Type values are always one of "text", "count", or "status".
    /// Section 3.4 validation rule: Type must be one of "text", "count", "status".
    /// </summary>
    [TestCase(false, false, TestName = "Regular non-separated")]
    [TestCase(false, true, TestName = "Regular separated")]
    [TestCase(true, false, TestName = "SBA non-separated")]
    [TestCase(true, true, TestName = "SBA separated")]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-006")]
    [Property("BehaviorId", "EXT-005")]
    public void GetDisplayedColumns_AllPaths_ColumnTypesAreValid(bool isSba, bool isSeparated)
    {
        var columns = InventoryDisplayService.GetDisplayedColumns(
            isSba,
            isSeparated,
            supportsSeparateInventories: true
        );

        var validTypes = new[] { "text", "count", "status" };
        foreach (var col in columns)
        {
            Assert.That(
                validTypes,
                Does.Contain(col.Type),
                $"Column '{col.Id}' has invalid type '{col.Type}'"
            );
        }
    }

    /// <summary>
    /// Invariant: Count and status columns always come in pairs (count then status)
    /// following the Text column. This is the pattern across all 4 paths.
    /// </summary>
    [TestCase(false, false, TestName = "Regular non-separated")]
    [TestCase(false, true, TestName = "Regular separated")]
    [TestCase(true, false, TestName = "SBA non-separated")]
    [TestCase(true, true, TestName = "SBA separated")]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-006")]
    [Property("BehaviorId", "EXT-005")]
    public void GetDisplayedColumns_AllPaths_CountStatusColumnsArePaired(
        bool isSba,
        bool isSeparated
    )
    {
        var columns = InventoryDisplayService.GetDisplayedColumns(
            isSba,
            isSeparated,
            supportsSeparateInventories: true
        );

        // Skip the first "Text" column; remaining columns should be count/status pairs
        var dataColumns = columns.Skip(1).ToList();
        Assert.That(
            dataColumns.Count % 2,
            Is.EqualTo(0),
            "Data columns (after Text) must come in count/status pairs"
        );

        for (int i = 0; i < dataColumns.Count; i += 2)
        {
            Assert.That(
                dataColumns[i].Type,
                Is.EqualTo("count"),
                $"Column at pair index {i} should be 'count', got '{dataColumns[i].Type}' (Id: {dataColumns[i].Id})"
            );
            Assert.That(
                dataColumns[i + 1].Type,
                Is.EqualTo("status"),
                $"Column at pair index {i + 1} should be 'status', got '{dataColumns[i + 1].Type}' (Id: {dataColumns[i + 1].Id})"
            );
        }
    }

    /// <summary>
    /// Invariant: Column IDs are unique within each configuration.
    /// No duplicate IDs should exist in any single column configuration.
    /// </summary>
    [TestCase(false, false, TestName = "Regular non-separated")]
    [TestCase(false, true, TestName = "Regular separated")]
    [TestCase(true, false, TestName = "SBA non-separated")]
    [TestCase(true, true, TestName = "SBA separated")]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-006")]
    [Property("BehaviorId", "EXT-005")]
    public void GetDisplayedColumns_AllPaths_ColumnIdsAreUnique(bool isSba, bool isSeparated)
    {
        var columns = InventoryDisplayService.GetDisplayedColumns(
            isSba,
            isSeparated,
            supportsSeparateInventories: true
        );

        var ids = columns.Select(c => c.Id).ToList();
        Assert.That(ids, Is.Unique, "Column IDs must be unique within a configuration");
    }

    #endregion

    #region Golden Master Test (gm-008)

    /// <summary>
    /// Golden master gm-008: Verifies exact column count per path.
    /// Regular non-separated: 3, Regular separated: 5, SBA non-separated: 5, SBA separated: 7.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-006")]
    [Property("GoldenMasterId", "gm-008")]
    [Property("BehaviorId", "EXT-005")]
    public void GetDisplayedColumns_ColumnCounts_MatchGoldenMaster()
    {
        Assert.Multiple(() =>
        {
            Assert.That(
                InventoryDisplayService.GetDisplayedColumns(false, false, true).Count,
                Is.EqualTo(3),
                "Regular non-separated should have 3 columns"
            );

            Assert.That(
                InventoryDisplayService.GetDisplayedColumns(false, true, true).Count,
                Is.EqualTo(5),
                "Regular separated should have 5 columns"
            );

            Assert.That(
                InventoryDisplayService.GetDisplayedColumns(true, false, true).Count,
                Is.EqualTo(5),
                "SBA non-separated should have 5 columns"
            );

            Assert.That(
                InventoryDisplayService.GetDisplayedColumns(true, true, true).Count,
                Is.EqualTo(7),
                "SBA separated should have 7 columns"
            );
        });
    }

    #endregion

    // ========================================================================
    // CAP-007: GetContentTypeFilterOptions
    //
    // Tests for the content type filter dropdown configuration.
    // Pure computation with 4-way branching (Regular/SBA x Separated/NonSeparated).
    //
    // Source: EXT-006 (InventoryForm.SetupTextTypeDropdown, PT9 InventoryForm.cs:1281-1320)
    // Contract: Section 4.8 M-008 GetContentTypeFilterOptions
    // Golden master: gm-009 (content type filter configuration)
    // ========================================================================

    #region CAP-007 Acceptance Test (gm-009)

    /// <summary>
    /// Acceptance test: Verifies all 4 branching paths return correct visibility and option
    /// labels matching the golden master gm-009 exactly. When this test passes, CAP-007 is complete.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-007")]
    [Property("GoldenMasterId", "gm-009")]
    [Property("BehaviorId", "EXT-006")]
    [Description(
        "Acceptance test: GetContentTypeFilterOptions returns correct visibility and options for all 4 branching paths"
    )]
    public void GetContentTypeFilterOptions_AllFourPaths_MatchGoldenMaster()
    {
        // Path 1: Regular non-separated -> not visible
        var regularNonSep = InventoryDisplayService.GetContentTypeFilterOptions(
            isSba: false,
            isSeparated: false
        );
        Assert.That(
            regularNonSep.Visible,
            Is.False,
            "Regular non-separated: filter must be hidden"
        );
        Assert.That(
            regularNonSep.Options,
            Is.Null,
            "Regular non-separated: Options must be null when not visible"
        );

        // Path 2: Regular separated -> 3 options
        var regularSep = InventoryDisplayService.GetContentTypeFilterOptions(
            isSba: false,
            isSeparated: true
        );
        Assert.That(regularSep.Visible, Is.True, "Regular separated: filter must be visible");
        Assert.That(
            regularSep.Options!.Select(o => o.Label).ToArray(),
            Is.EqualTo(new[] { "All text", "Verse text only", "Non-verse text only" }),
            "Regular separated: option labels must match gm-009"
        );

        // Path 3: SBA non-separated -> 3 options
        var sbaNonSep = InventoryDisplayService.GetContentTypeFilterOptions(
            isSba: true,
            isSeparated: false
        );
        Assert.That(sbaNonSep.Visible, Is.True, "SBA non-separated: filter must be visible");
        Assert.That(
            sbaNonSep.Options!.Select(o => o.Label).ToArray(),
            Is.EqualTo(
                new[] { "All text", "Base project content only", "Study Bible content only" }
            ),
            "SBA non-separated: option labels must match gm-009"
        );

        // Path 4: SBA separated -> 4 options
        var sbaSep = InventoryDisplayService.GetContentTypeFilterOptions(
            isSba: true,
            isSeparated: true
        );
        Assert.That(sbaSep.Visible, Is.True, "SBA separated: filter must be visible");
        Assert.That(
            sbaSep.Options!.Select(o => o.Label).ToArray(),
            Is.EqualTo(
                new[]
                {
                    "All text",
                    "Verse text only",
                    "Non-verse text only",
                    "Study Bible content only",
                }
            ),
            "SBA separated: option labels must match gm-009"
        );
    }

    #endregion

    #region CAP-007 Contract Tests - Regular Non-Separated (TS-103)

    /// <summary>
    /// TS-103: Regular non-separated project hides the content type filter dropdown.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("ScenarioId", "TS-103")]
    [Property("BehaviorId", "EXT-006")]
    public void GetContentTypeFilterOptions_RegularNonSeparated_NotVisible()
    {
        var result = InventoryDisplayService.GetContentTypeFilterOptions(
            isSba: false,
            isSeparated: false
        );

        Assert.That(result.Visible, Is.False);
    }

    /// <summary>
    /// TS-103: When not visible, Options must be null (Section 3.5 validation rule).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("ScenarioId", "TS-103")]
    [Property("BehaviorId", "EXT-006")]
    public void GetContentTypeFilterOptions_RegularNonSeparated_OptionsIsNull()
    {
        var result = InventoryDisplayService.GetContentTypeFilterOptions(
            isSba: false,
            isSeparated: false
        );

        Assert.That(
            result.Options,
            Is.Null,
            "When Visible is false, Options must be null (Section 3.5 validation)"
        );
    }

    #endregion

    #region CAP-007 Contract Tests - Regular Separated (TS-104)

    /// <summary>
    /// TS-104: Regular separated project shows the content type filter dropdown.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("ScenarioId", "TS-104")]
    [Property("BehaviorId", "EXT-006")]
    public void GetContentTypeFilterOptions_RegularSeparated_IsVisible()
    {
        var result = InventoryDisplayService.GetContentTypeFilterOptions(
            isSba: false,
            isSeparated: true
        );

        Assert.That(result.Visible, Is.True);
    }

    /// <summary>
    /// TS-104: Regular separated provides exactly 3 options.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("ScenarioId", "TS-104")]
    [Property("BehaviorId", "EXT-006")]
    public void GetContentTypeFilterOptions_RegularSeparated_ReturnsThreeOptions()
    {
        var result = InventoryDisplayService.GetContentTypeFilterOptions(
            isSba: false,
            isSeparated: true
        );

        Assert.That(result.Options, Is.Not.Null);
        Assert.That(result.Options!, Has.Count.EqualTo(3));
    }

    /// <summary>
    /// TS-104: Regular separated option labels match exactly.
    /// Contract Section 4.8: "All text, Verse text only, Non-verse text only"
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("ScenarioId", "TS-104")]
    [Property("BehaviorId", "EXT-006")]
    public void GetContentTypeFilterOptions_RegularSeparated_OptionLabels()
    {
        var result = InventoryDisplayService.GetContentTypeFilterOptions(
            isSba: false,
            isSeparated: true
        );

        var labels = result.Options!.Select(o => o.Label).ToArray();
        Assert.That(
            labels,
            Is.EqualTo(new[] { "All text", "Verse text only", "Non-verse text only" })
        );
    }

    /// <summary>
    /// TS-104: Regular separated option TextType values match the enum.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("ScenarioId", "TS-104")]
    [Property("BehaviorId", "EXT-006")]
    public void GetContentTypeFilterOptions_RegularSeparated_OptionTextTypes()
    {
        var result = InventoryDisplayService.GetContentTypeFilterOptions(
            isSba: false,
            isSeparated: true
        );

        var textTypes = result.Options!.Select(o => o.TextType).ToArray();
        Assert.That(
            textTypes,
            Is.EqualTo(
                new[]
                {
                    InventoryTextType.AllText,
                    InventoryTextType.VerseText,
                    InventoryTextType.NonVerseText,
                }
            )
        );
    }

    #endregion

    #region CAP-007 Contract Tests - SBA Non-Separated (TS-105)

    /// <summary>
    /// TS-105: SBA non-separated project shows the content type filter dropdown.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("ScenarioId", "TS-105")]
    [Property("BehaviorId", "EXT-006")]
    public void GetContentTypeFilterOptions_SbaNonSeparated_IsVisible()
    {
        var result = InventoryDisplayService.GetContentTypeFilterOptions(
            isSba: true,
            isSeparated: false
        );

        Assert.That(result.Visible, Is.True);
    }

    /// <summary>
    /// TS-105: SBA non-separated provides exactly 3 options.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("ScenarioId", "TS-105")]
    [Property("BehaviorId", "EXT-006")]
    public void GetContentTypeFilterOptions_SbaNonSeparated_ReturnsThreeOptions()
    {
        var result = InventoryDisplayService.GetContentTypeFilterOptions(
            isSba: true,
            isSeparated: false
        );

        Assert.That(result.Options, Is.Not.Null);
        Assert.That(result.Options!, Has.Count.EqualTo(3));
    }

    /// <summary>
    /// TS-105: SBA non-separated option labels match exactly.
    /// Contract Section 4.8: "All text, Base project content only, Study Bible content only"
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("ScenarioId", "TS-105")]
    [Property("BehaviorId", "EXT-006")]
    public void GetContentTypeFilterOptions_SbaNonSeparated_OptionLabels()
    {
        var result = InventoryDisplayService.GetContentTypeFilterOptions(
            isSba: true,
            isSeparated: false
        );

        var labels = result.Options!.Select(o => o.Label).ToArray();
        Assert.That(
            labels,
            Is.EqualTo(
                new[] { "All text", "Base project content only", "Study Bible content only" }
            )
        );
    }

    /// <summary>
    /// TS-105: SBA non-separated option TextType values match the enum.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("ScenarioId", "TS-105")]
    [Property("BehaviorId", "EXT-006")]
    public void GetContentTypeFilterOptions_SbaNonSeparated_OptionTextTypes()
    {
        var result = InventoryDisplayService.GetContentTypeFilterOptions(
            isSba: true,
            isSeparated: false
        );

        var textTypes = result.Options!.Select(o => o.TextType).ToArray();
        Assert.That(
            textTypes,
            Is.EqualTo(
                new[]
                {
                    InventoryTextType.AllText,
                    InventoryTextType.RegularContent,
                    InventoryTextType.StudyBibleContent,
                }
            )
        );
    }

    #endregion

    #region CAP-007 Contract Tests - SBA Separated (TS-106)

    /// <summary>
    /// TS-106: SBA separated project shows the content type filter dropdown.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("ScenarioId", "TS-106")]
    [Property("BehaviorId", "EXT-006")]
    public void GetContentTypeFilterOptions_SbaSeparated_IsVisible()
    {
        var result = InventoryDisplayService.GetContentTypeFilterOptions(
            isSba: true,
            isSeparated: true
        );

        Assert.That(result.Visible, Is.True);
    }

    /// <summary>
    /// TS-106: SBA separated provides exactly 4 options (most options of any path).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("ScenarioId", "TS-106")]
    [Property("BehaviorId", "EXT-006")]
    public void GetContentTypeFilterOptions_SbaSeparated_ReturnsFourOptions()
    {
        var result = InventoryDisplayService.GetContentTypeFilterOptions(
            isSba: true,
            isSeparated: true
        );

        Assert.That(result.Options, Is.Not.Null);
        Assert.That(result.Options!, Has.Count.EqualTo(4));
    }

    /// <summary>
    /// TS-106: SBA separated option labels match exactly.
    /// Contract Section 4.8: "All text, Verse text only, Non-verse text only, Study Bible content only"
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("ScenarioId", "TS-106")]
    [Property("BehaviorId", "EXT-006")]
    public void GetContentTypeFilterOptions_SbaSeparated_OptionLabels()
    {
        var result = InventoryDisplayService.GetContentTypeFilterOptions(
            isSba: true,
            isSeparated: true
        );

        var labels = result.Options!.Select(o => o.Label).ToArray();
        Assert.That(
            labels,
            Is.EqualTo(
                new[]
                {
                    "All text",
                    "Verse text only",
                    "Non-verse text only",
                    "Study Bible content only",
                }
            )
        );
    }

    /// <summary>
    /// TS-106: SBA separated option TextType values match the enum.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("ScenarioId", "TS-106")]
    [Property("BehaviorId", "EXT-006")]
    public void GetContentTypeFilterOptions_SbaSeparated_OptionTextTypes()
    {
        var result = InventoryDisplayService.GetContentTypeFilterOptions(
            isSba: true,
            isSeparated: true
        );

        var textTypes = result.Options!.Select(o => o.TextType).ToArray();
        Assert.That(
            textTypes,
            Is.EqualTo(
                new[]
                {
                    InventoryTextType.AllText,
                    InventoryTextType.VerseText,
                    InventoryTextType.NonVerseText,
                    InventoryTextType.StudyBibleContent,
                }
            )
        );
    }

    #endregion

    #region CAP-007 Golden Master Tests (gm-009)

    /// <summary>
    /// Golden master gm-009: Verifies exact option counts per path.
    /// Regular non-separated: not visible, Regular separated: 3, SBA non-separated: 3, SBA separated: 4.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-007")]
    [Property("GoldenMasterId", "gm-009")]
    [Property("BehaviorId", "EXT-006")]
    public void GetContentTypeFilterOptions_OptionCounts_MatchGoldenMaster()
    {
        Assert.Multiple(() =>
        {
            var regNonSep = InventoryDisplayService.GetContentTypeFilterOptions(false, false);
            Assert.That(
                regNonSep.Visible,
                Is.False,
                "gm-009: Regular non-separated must be hidden"
            );

            var regSep = InventoryDisplayService.GetContentTypeFilterOptions(false, true);
            Assert.That(
                regSep.Options!.Count,
                Is.EqualTo(3),
                "gm-009: Regular separated must have 3 options"
            );

            var sbaNonSep = InventoryDisplayService.GetContentTypeFilterOptions(true, false);
            Assert.That(
                sbaNonSep.Options!.Count,
                Is.EqualTo(3),
                "gm-009: SBA non-separated must have 3 options"
            );

            var sbaSep = InventoryDisplayService.GetContentTypeFilterOptions(true, true);
            Assert.That(
                sbaSep.Options!.Count,
                Is.EqualTo(4),
                "gm-009: SBA separated must have 4 options"
            );
        });
    }

    /// <summary>
    /// Golden master gm-009: Verifies the exact first option is always "All text" when visible.
    /// This is true for all 3 visible paths.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-007")]
    [Property("GoldenMasterId", "gm-009")]
    [Property("BehaviorId", "EXT-006")]
    public void GetContentTypeFilterOptions_VisiblePaths_FirstOptionIsAllText()
    {
        Assert.Multiple(() =>
        {
            var regSep = InventoryDisplayService.GetContentTypeFilterOptions(false, true);
            Assert.That(regSep.Options![0].Label, Is.EqualTo("All text"));
            Assert.That(regSep.Options[0].TextType, Is.EqualTo(InventoryTextType.AllText));

            var sbaNonSep = InventoryDisplayService.GetContentTypeFilterOptions(true, false);
            Assert.That(sbaNonSep.Options![0].Label, Is.EqualTo("All text"));
            Assert.That(sbaNonSep.Options[0].TextType, Is.EqualTo(InventoryTextType.AllText));

            var sbaSep = InventoryDisplayService.GetContentTypeFilterOptions(true, true);
            Assert.That(sbaSep.Options![0].Label, Is.EqualTo("All text"));
            Assert.That(sbaSep.Options[0].TextType, Is.EqualTo(InventoryTextType.AllText));
        });
    }

    #endregion

    #region CAP-007 Invariant Tests (INV-008)

    /// <summary>
    /// INV-008: NonVerseText filter explicitly excludes Study Bible content.
    /// In all paths that include NonVerseText, there is no overlap with StudyBibleContent.
    /// Regular separated has NonVerseText but NOT StudyBibleContent.
    /// SBA separated has BOTH NonVerseText AND StudyBibleContent as separate options.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("InvariantId", "INV-008")]
    [Property("BehaviorId", "EXT-006")]
    [Description(
        "INV-008: NonVerseText and StudyBibleContent are always distinct filter options, never merged"
    )]
    public void GetContentTypeFilterOptions_NonVerseAndStudyBible_AlwaysDistinct()
    {
        // Regular separated: has NonVerseText, does NOT have StudyBibleContent
        var regSep = InventoryDisplayService.GetContentTypeFilterOptions(false, true);
        var regSepTypes = regSep.Options!.Select(o => o.TextType).ToList();
        Assert.That(
            regSepTypes,
            Does.Contain(InventoryTextType.NonVerseText),
            "Regular separated must include NonVerseText"
        );
        Assert.That(
            regSepTypes,
            Does.Not.Contain(InventoryTextType.StudyBibleContent),
            "Regular separated must NOT include StudyBibleContent (not an SBA project)"
        );

        // SBA separated: has BOTH NonVerseText AND StudyBibleContent as separate entries
        var sbaSep = InventoryDisplayService.GetContentTypeFilterOptions(true, true);
        var sbaSepTypes = sbaSep.Options!.Select(o => o.TextType).ToList();
        Assert.That(
            sbaSepTypes,
            Does.Contain(InventoryTextType.NonVerseText),
            "SBA separated must include NonVerseText"
        );
        Assert.That(
            sbaSepTypes,
            Does.Contain(InventoryTextType.StudyBibleContent),
            "SBA separated must include StudyBibleContent"
        );

        // Verify they are separate options (not merged)
        var nonVerseIndex = sbaSepTypes.IndexOf(InventoryTextType.NonVerseText);
        var studyBibleIndex = sbaSepTypes.IndexOf(InventoryTextType.StudyBibleContent);
        Assert.That(
            nonVerseIndex,
            Is.Not.EqualTo(studyBibleIndex),
            "INV-008: NonVerseText and StudyBibleContent must be distinct filter options"
        );
    }

    /// <summary>
    /// INV-008: SBA non-separated uses RegularContent (not NonVerseText) for base project content,
    /// keeping Study Bible content separate.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("InvariantId", "INV-008")]
    [Property("BehaviorId", "EXT-006")]
    public void GetContentTypeFilterOptions_SbaNonSeparated_UsesRegularContentNotNonVerse()
    {
        var result = InventoryDisplayService.GetContentTypeFilterOptions(
            isSba: true,
            isSeparated: false
        );

        var textTypes = result.Options!.Select(o => o.TextType).ToList();
        Assert.That(
            textTypes,
            Does.Contain(InventoryTextType.RegularContent),
            "SBA non-separated must use RegularContent for base project content"
        );
        Assert.That(
            textTypes,
            Does.Not.Contain(InventoryTextType.NonVerseText),
            "SBA non-separated must NOT use NonVerseText (uses RegularContent instead)"
        );
        Assert.That(
            textTypes,
            Does.Not.Contain(InventoryTextType.VerseText),
            "SBA non-separated must NOT use VerseText (not separated)"
        );
    }

    #endregion

    #region CAP-007 Extraction Tests - Visibility Invariants (EXT-006)

    /// <summary>
    /// EXT-006: Only regular non-separated hides the filter. All other paths show it.
    /// This is the core visibility rule from the 4-way branch.
    /// </summary>
    [TestCase(false, false, false, TestName = "Regular non-separated: hidden")]
    [TestCase(false, true, true, TestName = "Regular separated: visible")]
    [TestCase(true, false, true, TestName = "SBA non-separated: visible")]
    [TestCase(true, true, true, TestName = "SBA separated: visible")]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-007")]
    [Property("ExtractionId", "EXT-006")]
    [Property("BehaviorId", "EXT-006")]
    public void GetContentTypeFilterOptions_Visibility_MatchesExpected(
        bool isSba,
        bool isSeparated,
        bool expectedVisible
    )
    {
        var result = InventoryDisplayService.GetContentTypeFilterOptions(isSba, isSeparated);

        Assert.That(result.Visible, Is.EqualTo(expectedVisible));
    }

    /// <summary>
    /// EXT-006: When visible, Options must not be null and must contain at least one option.
    /// When not visible, Options must be null.
    /// </summary>
    [TestCase(false, false, TestName = "Regular non-separated")]
    [TestCase(false, true, TestName = "Regular separated")]
    [TestCase(true, false, TestName = "SBA non-separated")]
    [TestCase(true, true, TestName = "SBA separated")]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-007")]
    [Property("ExtractionId", "EXT-006")]
    [Property("BehaviorId", "EXT-006")]
    public void GetContentTypeFilterOptions_OptionsNullity_MatchesVisibility(
        bool isSba,
        bool isSeparated
    )
    {
        var result = InventoryDisplayService.GetContentTypeFilterOptions(isSba, isSeparated);

        if (result.Visible)
        {
            Assert.That(result.Options, Is.Not.Null, "Options must not be null when Visible=true");
            Assert.That(
                result.Options!,
                Is.Not.Empty,
                "Options must not be empty when Visible=true"
            );
        }
        else
        {
            Assert.That(result.Options, Is.Null, "Options must be null when Visible=false");
        }
    }

    /// <summary>
    /// EXT-006: When visible, the first option is always "All text" with TextType AllText.
    /// This is the default selection for the filter dropdown.
    /// </summary>
    [TestCase(false, true, TestName = "Regular separated")]
    [TestCase(true, false, TestName = "SBA non-separated")]
    [TestCase(true, true, TestName = "SBA separated")]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-007")]
    [Property("ExtractionId", "EXT-006")]
    [Property("BehaviorId", "EXT-006")]
    public void GetContentTypeFilterOptions_WhenVisible_FirstOptionIsAllText(
        bool isSba,
        bool isSeparated
    )
    {
        var result = InventoryDisplayService.GetContentTypeFilterOptions(isSba, isSeparated);

        Assert.That(result.Visible, Is.True, "Precondition: filter must be visible for this test");
        Assert.That(result.Options![0].Label, Is.EqualTo("All text"));
        Assert.That(result.Options[0].TextType, Is.EqualTo(InventoryTextType.AllText));
    }

    #endregion
}

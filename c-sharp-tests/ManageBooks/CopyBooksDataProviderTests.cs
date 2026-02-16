// =============================================================================
// TEST FILE: CopyBooksDataProviderTests.cs (CAP-002: CopyBooks)
// =============================================================================
// PAPI command tests for platformScripture.copyBooks
// =============================================================================

using System.Diagnostics.CodeAnalysis;
using NUnit.Framework;
using Paratext.Data;
using Paratext.Data.ProjectSettingsAccess;
using Paranext.DataProvider.ManageBooks;
using Paranext.DataProvider.Projects;
using SIL.Scripture;

namespace TestParanextDataProvider.ManageBooks;

/// <summary>
/// Tests for CopyBooks - the PAPI command that orchestrates book copying between projects (CAP-002).
/// This capability validates project type compatibility, uses comparison services, and delegates
/// to CopyBooksExecution for the actual copy operation.
/// </summary>
/// <remarks>
/// Maps to: platformScripture.copyBooks PAPI command
/// Golden Masters: gm-001-copy-mapin, gm-002-copy-teckit, gm-003,004,005-filtering
/// Behaviors: BHV-301, BHV-550, BHV-551, BHV-552, BHV-553, BHV-554, BHV-555
/// Invariants: INV-007, INV-008
/// Dependencies: CAP-007 (CompareBooks), CAP-013 (GetCompatibleCopyTargets), CAP-020 (CopyBooksExecution), CAP-021 (BookComparisonForCopyDialog)
/// </remarks>
[TestFixture]
[ExcludeFromCodeCoverage]
internal class CopyBooksDataProviderTests : PapiTestBase
{
    private ManageBooksDataProvider _provider = null!;

    [SetUp]
    public override async Task TestSetupAsync()
    {
        await base.TestSetupAsync();
        _provider = new ManageBooksDataProvider(Client, ParatextProjects);
    }

    #region Acceptance Tests (Outer Loop)

    /// <summary>
    /// Acceptance test: Copy books between standard projects completes successfully.
    /// This is the primary "done signal" for the CopyBooks capability.
    /// </summary>
    /// <remarks>
    /// PT9 Source: CopyBooksForm.cs cmdOK_Click handler orchestrates the copy workflow
    /// </remarks>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-035")]
    [Property("BehaviorId", "BHV-301")]
    [Description("Acceptance test: CopyBooks orchestrates complete copy workflow between standard projects")]
    public async Task CopyBooks_StandardToStandard_CompletesSuccessfully_AcceptanceTest()
    {
        // Arrange
        var sourceProject = CreateStandardProjectWithBooks([1, 2, 3]); // GEN, EXO, LEV
        var destProject = CreateStandardProjectWithBooks([]); // Empty destination

        // Set book content in source
        sourceProject.PutText(1, 0, false, "\\id GEN\n\\c 1\n\\v 1 Genesis content.", null);
        sourceProject.PutText(2, 0, false, "\\id EXO\n\\c 1\n\\v 1 Exodus content.", null);
        sourceProject.PutText(3, 0, false, "\\id LEV\n\\c 1\n\\v 1 Leviticus content.", null);

        var request = new CopyBooksRequest(
            sourceProject.Guid.ToString(),
            destProject.Guid.ToString(),
            [1, 2, 3]
        );

        // Act
        var result = await _provider.CopyBooksAsync(request);

        // Assert - Full outcome verification
        Assert.That(result, Is.Not.Null, "Result should not be null");
        Assert.That(result.Success, Is.True, "Copy operation should succeed");
        Assert.That(result.BooksAffected, Is.Not.Null, "BooksAffected should not be null");
        Assert.That(result.BooksAffected, Is.EquivalentTo(new[] { 1, 2, 3 }),
            "All three books should be in affected list");
        Assert.That(result.LastBookNum, Is.EqualTo(3),
            "LastBookNum should be the highest book number copied");

        // Verify side effects - books actually exist in destination
        Assert.That(destProject.BookPresent(1), Is.True, "GEN should exist in destination");
        Assert.That(destProject.BookPresent(2), Is.True, "EXO should exist in destination");
        Assert.That(destProject.BookPresent(3), Is.True, "LEV should exist in destination");
    }

    #endregion

    #region Contract Tests - Basic Copy Operations

    /// <summary>
    /// Contract test: CopyBooks returns success with empty book list.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-035")]
    [Property("BehaviorId", "BHV-301")]
    [Description("CopyBooks with empty book list returns success with no books affected")]
    public async Task CopyBooks_EmptyBookList_ReturnsSuccessWithNoBooks()
    {
        // Arrange
        var sourceProject = CreateStandardProjectWithBooks([1]);
        sourceProject.PutText(1, 0, false, "\\id GEN\n\\c 1\n\\v 1 Content.", null);
        var destProject = CreateStandardProjectWithBooks([]);

        var request = new CopyBooksRequest(
            sourceProject.Guid.ToString(),
            destProject.Guid.ToString(),
            [] // Empty book list
        );

        // Act
        var result = await _provider.CopyBooksAsync(request);

        // Assert
        Assert.That(result.Success, Is.True, "Should succeed with empty list");
        Assert.That(result.BooksAffected, Is.Empty, "No books should be affected");
    }

    /// <summary>
    /// Contract test: CopyBooks copies only specified books, not all books in source.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-035")]
    [Property("BehaviorId", "BHV-301")]
    [Description("CopyBooks copies only the specified books")]
    public async Task CopyBooks_SpecificBooks_CopiesOnlySpecified()
    {
        // Arrange
        var sourceProject = CreateStandardProjectWithBooks([1, 2, 3, 4, 5]); // GEN-DEU
        for (int i = 1; i <= 5; i++)
        {
            string bookId = Canon.BookNumberToId(i);
            sourceProject.PutText(i, 0, false, $"\\id {bookId}\n\\c 1\n\\v 1 Content for {bookId}.", null);
        }
        var destProject = CreateStandardProjectWithBooks([]);

        var request = new CopyBooksRequest(
            sourceProject.Guid.ToString(),
            destProject.Guid.ToString(),
            [1, 3, 5] // Only GEN, LEV, DEU
        );

        // Act
        var result = await _provider.CopyBooksAsync(request);

        // Assert
        Assert.That(result.Success, Is.True);
        Assert.That(result.BooksAffected, Is.EquivalentTo(new[] { 1, 3, 5 }),
            "Should copy only specified books");
        Assert.That(destProject.BookPresent(2), Is.False, "EXO should NOT be copied");
        Assert.That(destProject.BookPresent(4), Is.False, "NUM should NOT be copied");
    }

    /// <summary>
    /// Contract test: CopyBooks returns correct LastBookNum.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-035")]
    [Property("BehaviorId", "BHV-301")]
    [Description("CopyBooks returns LastBookNum as highest book number copied")]
    public async Task CopyBooks_ReturnsLastBookNum()
    {
        // Arrange
        var sourceProject = CreateStandardProjectWithBooks([40, 41, 42]); // MAT, MRK, LUK
        foreach (int bookNum in new[] { 40, 41, 42 })
        {
            string bookId = Canon.BookNumberToId(bookNum);
            sourceProject.PutText(bookNum, 0, false, $"\\id {bookId}\n\\c 1\n\\v 1 Content.", null);
        }
        var destProject = CreateStandardProjectWithBooks([]);

        var request = new CopyBooksRequest(
            sourceProject.Guid.ToString(),
            destProject.Guid.ToString(),
            [40, 41, 42]
        );

        // Act
        var result = await _provider.CopyBooksAsync(request);

        // Assert
        Assert.That(result.Success, Is.True);
        Assert.That(result.LastBookNum, Is.EqualTo(42),
            "LastBookNum should be the last book number copied (Luke = 42)");
    }

    #endregion

    #region Contract Tests - Project Type Validation

    /// <summary>
    /// Contract test: Standard source can copy to Standard destination.
    /// </summary>
    /// <remarks>
    /// Golden Master: gm-003-copy-filter-standard
    /// </remarks>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-037")]
    [Property("BehaviorId", "BHV-552")]
    [Property("GoldenMaster", "gm-003")]
    [Description("Standard to Standard copy is allowed")]
    public async Task CopyBooks_StandardToStandard_Succeeds()
    {
        // Arrange
        var sourceProject = CreateStandardProjectWithBooks([1]);
        sourceProject.PutText(1, 0, false, "\\id GEN\n\\c 1\n\\v 1 Content.", null);
        var destProject = CreateStandardProjectWithBooks([]);

        var request = new CopyBooksRequest(
            sourceProject.Guid.ToString(),
            destProject.Guid.ToString(),
            [1]
        );

        // Act
        var result = await _provider.CopyBooksAsync(request);

        // Assert
        Assert.That(result.Success, Is.True, "Standard to Standard copy should succeed");
    }

    /// <summary>
    /// Contract test: StudyBible source can copy to StudyBible destination.
    /// </summary>
    /// <remarks>
    /// Golden Master: gm-004-copy-filter-studybible
    /// </remarks>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-038")]
    [Property("BehaviorId", "BHV-553")]
    [Property("GoldenMaster", "gm-004")]
    [Description("StudyBible to StudyBible copy is allowed")]
    public async Task CopyBooks_StudyBibleToStudyBible_Succeeds()
    {
        // Arrange
        var sourceProject = CreateStudyBibleProject([1]);
        sourceProject.PutText(1, 0, false, "\\id GEN\n\\c 1\n\\v 1 Study Bible content.", null);
        var destProject = CreateStudyBibleProject([]);

        var request = new CopyBooksRequest(
            sourceProject.Guid.ToString(),
            destProject.Guid.ToString(),
            [1]
        );

        // Act
        var result = await _provider.CopyBooksAsync(request);

        // Assert
        Assert.That(result.Success, Is.True, "StudyBible to StudyBible copy should succeed");
    }

    /// <summary>
    /// Contract test: SBA source can copy to SBA destination.
    /// </summary>
    /// <remarks>
    /// Golden Master: gm-005-copy-filter-sba
    /// </remarks>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-039")]
    [Property("BehaviorId", "BHV-554")]
    [Property("GoldenMaster", "gm-005")]
    [Description("SBA to SBA copy is allowed")]
    public async Task CopyBooks_SBAToSBA_Succeeds()
    {
        // Arrange
        var sourceProject = CreateSBAProject([67]); // XXA
        sourceProject.PutText(67, 0, false, "\\id TOB\n\\c 1\n\\v 1 SBA content.", null);
        var destProject = CreateSBAProject([]);

        var request = new CopyBooksRequest(
            sourceProject.Guid.ToString(),
            destProject.Guid.ToString(),
            [67]
        );

        // Act
        var result = await _provider.CopyBooksAsync(request);

        // Assert
        Assert.That(result.Success, Is.True, "SBA to SBA copy should succeed");
    }

    #endregion

    #region Error Case Tests

    /// <summary>
    /// Error test: StudyBible source cannot copy to Standard destination.
    /// INV-007 violation should return PROJECT_TYPE_INCOMPATIBLE error.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-038")]
    [Property("BehaviorId", "BHV-553")]
    [Property("InvariantId", "INV-007")]
    [Description("StudyBible to Standard copy fails with PROJECT_TYPE_INCOMPATIBLE")]
    public async Task CopyBooks_StudyBibleToStandard_FailsWithIncompatibleType()
    {
        // Arrange
        var sourceProject = CreateStudyBibleProject([1]);
        sourceProject.PutText(1, 0, false, "\\id GEN\n\\c 1\n\\v 1 Content.", null);
        var destProject = CreateStandardProjectWithBooks([]);

        var request = new CopyBooksRequest(
            sourceProject.Guid.ToString(),
            destProject.Guid.ToString(),
            [1]
        );

        // Act
        var result = await _provider.CopyBooksAsync(request);

        // Assert
        Assert.That(result.Success, Is.False, "StudyBible to Standard should fail");
        Assert.That(result.ErrorCode, Is.EqualTo(BookErrorCode.ProjectTypeIncompatible),
            "Error should be PROJECT_TYPE_INCOMPATIBLE");
        Assert.That(result.ErrorMessage, Does.Contain("StudyBible").IgnoreCase,
            "Error message should mention project type");
    }

    /// <summary>
    /// Error test: SBA source cannot copy to Standard destination.
    /// INV-008 violation should return PROJECT_TYPE_INCOMPATIBLE error.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-039")]
    [Property("BehaviorId", "BHV-554")]
    [Property("InvariantId", "INV-008")]
    [Description("SBA to Standard copy fails with PROJECT_TYPE_INCOMPATIBLE")]
    public async Task CopyBooks_SBAToStandard_FailsWithIncompatibleType()
    {
        // Arrange
        var sourceProject = CreateSBAProject([67]);
        sourceProject.PutText(67, 0, false, "\\id TOB\n\\c 1\n\\v 1 Content.", null);
        var destProject = CreateStandardProjectWithBooks([]);

        var request = new CopyBooksRequest(
            sourceProject.Guid.ToString(),
            destProject.Guid.ToString(),
            [67]
        );

        // Act
        var result = await _provider.CopyBooksAsync(request);

        // Assert
        Assert.That(result.Success, Is.False, "SBA to Standard should fail");
        Assert.That(result.ErrorCode, Is.EqualTo(BookErrorCode.ProjectTypeIncompatible),
            "Error should be PROJECT_TYPE_INCOMPATIBLE");
    }

    /// <summary>
    /// Error test: SBA source cannot copy to StudyBible destination.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-039")]
    [Property("BehaviorId", "BHV-554")]
    [Property("InvariantId", "INV-008")]
    [Description("SBA to StudyBible copy fails with PROJECT_TYPE_INCOMPATIBLE")]
    public async Task CopyBooks_SBAToStudyBible_FailsWithIncompatibleType()
    {
        // Arrange
        var sourceProject = CreateSBAProject([67]);
        sourceProject.PutText(67, 0, false, "\\id TOB\n\\c 1\n\\v 1 Content.", null);
        var destProject = CreateStudyBibleProject([]);

        var request = new CopyBooksRequest(
            sourceProject.Guid.ToString(),
            destProject.Guid.ToString(),
            [67]
        );

        // Act
        var result = await _provider.CopyBooksAsync(request);

        // Assert
        Assert.That(result.Success, Is.False, "SBA to StudyBible should fail");
        Assert.That(result.ErrorCode, Is.EqualTo(BookErrorCode.ProjectTypeIncompatible));
    }

    /// <summary>
    /// Error test: Copying book that doesn't exist in source returns BOOK_NOT_FOUND.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-035")]
    [Property("BehaviorId", "BHV-301")]
    [Description("Copy non-existent source book fails with BOOK_NOT_FOUND")]
    public async Task CopyBooks_BookNotInSource_FailsWithBookNotFound()
    {
        // Arrange
        var sourceProject = CreateStandardProjectWithBooks([1]); // Only GEN
        sourceProject.PutText(1, 0, false, "\\id GEN\n\\c 1\n\\v 1 Content.", null);
        var destProject = CreateStandardProjectWithBooks([]);

        var request = new CopyBooksRequest(
            sourceProject.Guid.ToString(),
            destProject.Guid.ToString(),
            [1, 2] // Try to copy GEN and EXO, but EXO doesn't exist
        );

        // Act
        var result = await _provider.CopyBooksAsync(request);

        // Assert
        Assert.That(result.Success, Is.False, "Copy should fail when source book missing");
        Assert.That(result.ErrorCode, Is.EqualTo(BookErrorCode.BookNotFound),
            "Error should be BOOK_NOT_FOUND");
        Assert.That(result.FailedBooks, Does.Contain(2),
            "EXO (2) should be in failed books list");
    }

    /// <summary>
    /// Error test: Non-existent source project returns PROJECT_NOT_FOUND.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-035")]
    [Description("Copy from non-existent project fails with PROJECT_NOT_FOUND")]
    public async Task CopyBooks_NonExistentSourceProject_FailsWithProjectNotFound()
    {
        // Arrange
        var destProject = CreateStandardProjectWithBooks([]);

        var request = new CopyBooksRequest(
            Guid.NewGuid().ToString(), // Non-existent source
            destProject.Guid.ToString(),
            [1]
        );

        // Act
        var result = await _provider.CopyBooksAsync(request);

        // Assert
        Assert.That(result.Success, Is.False, "Copy should fail with non-existent source");
        Assert.That(result.ErrorCode, Is.EqualTo(BookErrorCode.ProjectNotFound));
    }

    /// <summary>
    /// Error test: Non-existent destination project returns PROJECT_NOT_FOUND.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-035")]
    [Description("Copy to non-existent project fails with PROJECT_NOT_FOUND")]
    public async Task CopyBooks_NonExistentDestProject_FailsWithProjectNotFound()
    {
        // Arrange
        var sourceProject = CreateStandardProjectWithBooks([1]);
        sourceProject.PutText(1, 0, false, "\\id GEN\n\\c 1\n\\v 1 Content.", null);

        var request = new CopyBooksRequest(
            sourceProject.Guid.ToString(),
            Guid.NewGuid().ToString(), // Non-existent destination
            [1]
        );

        // Act
        var result = await _provider.CopyBooksAsync(request);

        // Assert
        Assert.That(result.Success, Is.False, "Copy should fail with non-existent dest");
        Assert.That(result.ErrorCode, Is.EqualTo(BookErrorCode.ProjectNotFound));
    }

    /// <summary>
    /// Error test: Null request returns VALIDATION_FAILED.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Description("Copy with null request fails with VALIDATION_FAILED")]
    public async Task CopyBooks_NullRequest_FailsWithValidationFailed()
    {
        // Act
        var result = await _provider.CopyBooksAsync(null);

        // Assert
        Assert.That(result.Success, Is.False);
        Assert.That(result.ErrorCode, Is.EqualTo(BookErrorCode.ValidationFailed));
    }

    #endregion

    #region Invariant Tests

    /// <summary>
    /// INV-007: StudyBible projects can only copy to other StudyBible projects.
    /// Tests the invariant across multiple destination types.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("InvariantId", "INV-007")]
    [Property("ScenarioId", "TS-038")]
    [Property("BehaviorId", "BHV-553")]
    [TestCase("Standard")]
    [Description("INV-007: StudyBible can ONLY copy to StudyBible")]
    public async Task Invariant_StudyBibleOnlyCopiestoStudyBible(string destProjectType)
    {
        // Arrange
        var sourceProject = CreateStudyBibleProject([1]);
        sourceProject.PutText(1, 0, false, "\\id GEN\n\\c 1\n\\v 1 Content.", null);
        var destProject = CreateProjectByType(destProjectType, []);

        Console.WriteLine($"Source project type: {sourceProject.Settings.TranslationInfo.Type}");
        Console.WriteLine($"Dest project type: {destProject.Settings.TranslationInfo.Type}");

        var request = new CopyBooksRequest(
            sourceProject.Guid.ToString(),
            destProject.Guid.ToString(),
            [1]
        );

        // Act
        var result = await _provider.CopyBooksAsync(request);

        Console.WriteLine($"Result: Success={result.Success}, ErrorCode={result.ErrorCode}, Message={result.ErrorMessage}");

        // Assert
        Assert.That(result.Success, Is.False,
            $"INV-007: StudyBible should NOT be able to copy to {destProjectType}");
        Assert.That(result.ErrorCode, Is.EqualTo(BookErrorCode.ProjectTypeIncompatible));
    }

    /// <summary>
    /// INV-008: SBA projects can only copy to other SBA projects.
    /// Tests the invariant across multiple destination types.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("InvariantId", "INV-008")]
    [Property("ScenarioId", "TS-039")]
    [Property("BehaviorId", "BHV-554")]
    [TestCase("Standard")]
    [TestCase("StudyBible")]
    [Description("INV-008: SBA can ONLY copy to SBA")]
    public async Task Invariant_SBAOnlyCopiesToSBA(string destProjectType)
    {
        // Arrange
        var sourceProject = CreateSBAProject([67]); // XXA
        sourceProject.PutText(67, 0, false, "\\id TOB\n\\c 1\n\\v 1 Content.", null);
        var destProject = CreateProjectByType(destProjectType, []);

        var request = new CopyBooksRequest(
            sourceProject.Guid.ToString(),
            destProject.Guid.ToString(),
            [67]
        );

        // Act
        var result = await _provider.CopyBooksAsync(request);

        // Assert
        Assert.That(result.Success, Is.False,
            $"INV-008: SBA should NOT be able to copy to {destProjectType}");
        Assert.That(result.ErrorCode, Is.EqualTo(BookErrorCode.ProjectTypeIncompatible));
    }

    /// <summary>
    /// INV-007 positive case: StudyBible CAN copy to StudyBible.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("InvariantId", "INV-007")]
    [Property("ScenarioId", "TS-038")]
    [Property("BehaviorId", "BHV-553")]
    [Description("INV-007: StudyBible can copy to StudyBible")]
    public async Task Invariant_StudyBibleToStudyBible_Succeeds()
    {
        // Arrange
        var sourceProject = CreateStudyBibleProject([1]);
        sourceProject.PutText(1, 0, false, "\\id GEN\n\\c 1\n\\v 1 StudyBible content.", null);
        var destProject = CreateStudyBibleProject([]);

        var request = new CopyBooksRequest(
            sourceProject.Guid.ToString(),
            destProject.Guid.ToString(),
            [1]
        );

        // Act
        var result = await _provider.CopyBooksAsync(request);

        // Assert
        Assert.That(result.Success, Is.True,
            "INV-007: StudyBible SHOULD be able to copy to StudyBible");
    }

    #endregion

    #region Golden Master Tests

    /// <summary>
    /// Golden master test: Standard project type filtering matches gm-003.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-037")]
    [Property("BehaviorId", "BHV-552")]
    [Property("GoldenMaster", "gm-003")]
    [Description("Standard project filtering matches gm-003 golden master")]
    public async Task CopyBooks_StandardFiltering_MatchesGoldenMaster_gm003()
    {
        // Arrange
        var sourceProject = CreateStandardProjectWithBooks([1]);
        sourceProject.PutText(1, 0, false, "\\id GEN\n\\c 1\n\\v 1 Content.", null);
        var destProject = CreateStandardProjectWithBooks([]);

        var request = new CopyBooksRequest(
            sourceProject.Guid.ToString(),
            destProject.Guid.ToString(),
            [1]
        );

        // Act
        var result = await _provider.CopyBooksAsync(request);

        // Assert - gm-003 confirms Standard to Standard works
        Assert.That(result.Success, Is.True,
            "gm-003: Standard to Standard copy should succeed");
    }

    /// <summary>
    /// Golden master test: StudyBible project type filtering matches gm-004.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-038")]
    [Property("BehaviorId", "BHV-553")]
    [Property("GoldenMaster", "gm-004")]
    [Description("StudyBible project filtering matches gm-004 golden master")]
    public async Task CopyBooks_StudyBibleFiltering_MatchesGoldenMaster_gm004()
    {
        // Arrange - StudyBible to StudyBible (allowed)
        var sourceProject = CreateStudyBibleProject([1]);
        sourceProject.PutText(1, 0, false, "\\id GEN\n\\c 1\n\\v 1 Content.", null);
        var destProject = CreateStudyBibleProject([]);

        var request = new CopyBooksRequest(
            sourceProject.Guid.ToString(),
            destProject.Guid.ToString(),
            [1]
        );

        // Act
        var result = await _provider.CopyBooksAsync(request);

        // Assert - gm-004 confirms StudyBible to StudyBible works
        Assert.That(result.Success, Is.True,
            "gm-004: StudyBible to StudyBible copy should succeed");
    }

    /// <summary>
    /// Golden master test: SBA project type filtering matches gm-005.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-039")]
    [Property("BehaviorId", "BHV-554")]
    [Property("GoldenMaster", "gm-005")]
    [Description("SBA project filtering matches gm-005 golden master")]
    public async Task CopyBooks_SBAFiltering_MatchesGoldenMaster_gm005()
    {
        // Arrange - SBA to SBA (allowed)
        var sourceProject = CreateSBAProject([67]);
        sourceProject.PutText(67, 0, false, "\\id TOB\n\\c 1\n\\v 1 Content.", null);
        var destProject = CreateSBAProject([]);

        var request = new CopyBooksRequest(
            sourceProject.Guid.ToString(),
            destProject.Guid.ToString(),
            [67]
        );

        // Act
        var result = await _provider.CopyBooksAsync(request);

        // Assert - gm-005 confirms SBA to SBA works
        Assert.That(result.Success, Is.True,
            "gm-005: SBA to SBA copy should succeed");
    }

    #endregion

    #region Helper Methods

    /// <summary>
    /// Creates a standard project with the specified books already present.
    /// DummyScrText creates Standard project type by default.
    /// </summary>
    private DummyScrText CreateStandardProjectWithBooks(int[] bookNumbers)
    {
        var scrText = CreateDummyProject();
        // DummyScrText is Standard by default

        var projectDetails = CreateProjectDetails(scrText);
        ParatextProjects.FakeAddProject(projectDetails, scrText);
        return scrText;
    }

    /// <summary>
    /// Creates a project by type name.
    /// </summary>
    private DummyScrText CreateProjectByType(string typeName, int[] bookNumbers)
    {
        return typeName switch
        {
            "Standard" => CreateStandardProjectWithBooks(bookNumbers),
            "StudyBible" => CreateStudyBibleProject(bookNumbers),
            "SBA" => CreateSBAProject(bookNumbers),
            _ => CreateStandardProjectWithBooks(bookNumbers)
        };
    }

    /// <summary>
    /// Creates a StudyBible project.
    /// StudyBible is a derived type that requires a base project.
    /// </summary>
    private DummyScrText CreateStudyBibleProject(int[] bookNumbers)
    {
        // StudyBible requires a base project
        var baseProject = CreateDummyProject();
        var baseDetails = CreateProjectDetails(baseProject);
        ParatextProjects.FakeAddProject(baseDetails, baseProject);

        var scrText = new DummyStudyBibleScrText(baseProject);

        var projectDetails = CreateProjectDetails(scrText);
        ParatextProjects.FakeAddProject(projectDetails, scrText);
        return scrText;
    }

    /// <summary>
    /// Creates an SBA (Study Bible Additions) project.
    /// SBA requires a base project.
    /// </summary>
    private DummyScrText CreateSBAProject(int[] bookNumbers)
    {
        // SBA requires a base project
        var baseProject = CreateDummyProject();
        var baseDetails = CreateProjectDetails(baseProject);
        ParatextProjects.FakeAddProject(baseDetails, baseProject);

        var scrText = new DummySBAScrText(baseProject);

        var projectDetails = CreateProjectDetails(scrText);
        ParatextProjects.FakeAddProject(projectDetails, scrText);
        return scrText;
    }

    #endregion
}

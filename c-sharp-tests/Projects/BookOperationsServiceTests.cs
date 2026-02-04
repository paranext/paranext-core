using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Projects;
using Paratext.Data;
using Paratext.Data.ProjectSettingsAccess;
using Paratext.Data.Repository;
using SIL.Scripture;

namespace TestParanextDataProvider.Projects;

/// <summary>
/// Tests for Book Operations Service (CAP-008, CAP-009).
/// These tests verify GetCompatibleDestinations and CopyBooks functionality.
/// Test Specifications: EXT-008 (extraction-plan.md), spec-014
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
internal class BookOperationsServiceTests : PapiTestBase
{
    #region CAP-008 Acceptance Tests

    /// <summary>
    /// Acceptance Test for CAP-008: GetCompatibleDestinations
    /// Verifies that the service correctly filters projects by type compatibility.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-008")]
    [Property("ScenarioId", "TS-089")]
    [Property("BehaviorId", "BHV-606")]
    [Description("Acceptance test: GetCompatibleDestinations filters by type compatibility")]
    public void GetCompatibleDestinations_AcceptanceTest()
    {
        // Arrange - Create source Standard project
        DummyScrText sourceScrText = CreateDummyProject();
        sourceScrText.Settings.TranslationInfo = new TranslationInformation(ProjectType.Standard);
        ProjectDetails sourceDetails = CreateProjectDetails(sourceScrText);
        ParatextProjects.FakeAddProject(sourceDetails, sourceScrText);
        VersioningManager.EnsureHasGuid(sourceScrText);

        // Create potential destination projects of various types
        DummyScrText destStandard = CreateDummyProject();
        destStandard.Settings.TranslationInfo = new TranslationInformation(ProjectType.Standard);
        ParatextProjects.FakeAddProject(CreateProjectDetails(destStandard), destStandard);
        VersioningManager.EnsureHasGuid(destStandard);

        // Act - Get compatible destinations
        var result = BookOperationsService.GetCompatibleDestinations(sourceScrText.Settings.Guid);

        // Assert - Standard source should have compatible destinations
        Assert.That(result, Is.Not.Null, "Should return compatible destinations");
        Assert.That(
            result.Count(),
            Is.GreaterThan(0),
            "Standard projects should have compatible destinations"
        );
    }

    #endregion

    #region CAP-008 Contract Tests - Type Compatibility Rules

    /// <summary>
    /// Test: Standard source can copy to Standard, BackTranslation, Daughter, etc.
    /// EXT-008: Type compatibility rules
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-008")]
    [Property("ScenarioId", "TS-089")]
    [Property("BehaviorId", "BHV-606")]
    public void GetCompatibleDestinations_StandardSource_AllowsMultipleTypes()
    {
        // Arrange - Create Standard source project
        DummyScrText sourceScrText = CreateDummyProject();
        sourceScrText.Settings.TranslationInfo = new TranslationInformation(ProjectType.Standard);
        ParatextProjects.FakeAddProject(CreateProjectDetails(sourceScrText), sourceScrText);
        VersioningManager.EnsureHasGuid(sourceScrText);

        // Create Standard destination
        DummyScrText destStandard = CreateDummyProject();
        destStandard.Settings.TranslationInfo = new TranslationInformation(ProjectType.Standard);
        ParatextProjects.FakeAddProject(CreateProjectDetails(destStandard), destStandard);
        VersioningManager.EnsureHasGuid(destStandard);

        // Act
        var result = BookOperationsService.GetCompatibleDestinations(sourceScrText.Settings.Guid);

        // Assert - Standard should be in compatible list
        Assert.That(result, Is.Not.Null);
        // Standard source can copy to: Standard, Auxiliary, BackTranslation, Daughter, StudyBible, TransliterationManual
        Assert.That(
            result.Any(p => p.ProjectType == ProjectType.Standard),
            Is.True,
            "Standard should be compatible destination for Standard source"
        );
    }

    /// <summary>
    /// Test: StudyBibleAdditions source can ONLY copy to StudyBibleAdditions.
    /// BHV-606: Study Bible copy restrictions
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-008")]
    [Property("ScenarioId", "TS-089")]
    [Property("BehaviorId", "BHV-606")]
    public void GetCompatibleDestinations_StudyBibleAdditionsSource_OnlyStudyBibleAdditions()
    {
        // Arrange - Create StudyBibleAdditions source project
        DummyScrText baseScrText = CreateDummyProject();
        baseScrText.Settings.TranslationInfo = new TranslationInformation(ProjectType.Standard);
        ParatextProjects.FakeAddProject(CreateProjectDetails(baseScrText), baseScrText);
        VersioningManager.EnsureHasGuid(baseScrText);

        DummyScrText sourceScrText = CreateDummyProject();
        sourceScrText.Settings.TranslationInfo = new TranslationInformation(
            ProjectType.StudyBibleAdditions,
            baseScrText.Name
        );
        ParatextProjects.FakeAddProject(CreateProjectDetails(sourceScrText), sourceScrText);
        VersioningManager.EnsureHasGuid(sourceScrText);

        // Create Standard destination (should NOT be compatible)
        DummyScrText destStandard = CreateDummyProject();
        destStandard.Settings.TranslationInfo = new TranslationInformation(ProjectType.Standard);
        ParatextProjects.FakeAddProject(CreateProjectDetails(destStandard), destStandard);
        VersioningManager.EnsureHasGuid(destStandard);

        // Act
        var result = BookOperationsService.GetCompatibleDestinations(sourceScrText.Settings.Guid);

        // Assert - Standard should NOT be in list; only StudyBibleAdditions allowed
        Assert.That(result, Is.Not.Null);
        Assert.That(
            result.All(p => p.ProjectType == ProjectType.StudyBibleAdditions),
            Is.True,
            "BHV-606: StudyBibleAdditions source can only copy to StudyBibleAdditions"
        );
    }

    /// <summary>
    /// Test: StudyBible source can ONLY copy to StudyBible.
    /// EXT-008: Type compatibility rules
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-008")]
    [Property("ScenarioId", "TS-089")]
    [Property("BehaviorId", "BHV-606")]
    public void GetCompatibleDestinations_StudyBibleSource_OnlyStudyBible()
    {
        // Arrange - Create StudyBible source project
        DummyScrText baseScrText = CreateDummyProject();
        baseScrText.Settings.TranslationInfo = new TranslationInformation(ProjectType.Standard);
        ParatextProjects.FakeAddProject(CreateProjectDetails(baseScrText), baseScrText);
        VersioningManager.EnsureHasGuid(baseScrText);

        DummyScrText sourceScrText = CreateDummyProject();
        sourceScrText.Settings.TranslationInfo = new TranslationInformation(
            ProjectType.StudyBible,
            baseScrText.Name
        );
        ParatextProjects.FakeAddProject(CreateProjectDetails(sourceScrText), sourceScrText);
        VersioningManager.EnsureHasGuid(sourceScrText);

        // Create Standard destination (should NOT be compatible)
        DummyScrText destStandard = CreateDummyProject();
        destStandard.Settings.TranslationInfo = new TranslationInformation(ProjectType.Standard);
        ParatextProjects.FakeAddProject(CreateProjectDetails(destStandard), destStandard);
        VersioningManager.EnsureHasGuid(destStandard);

        // Act
        var result = BookOperationsService.GetCompatibleDestinations(sourceScrText.Settings.Guid);

        // Assert - Only StudyBible should be in compatible list
        Assert.That(result, Is.Not.Null);
        Assert.That(
            result.All(p => p.ProjectType == ProjectType.StudyBible),
            Is.True,
            "StudyBible source can only copy to StudyBible"
        );
    }

    /// <summary>
    /// Test: ConsultantNotes source can ONLY copy to ConsultantNotes.
    /// EXT-008: Type compatibility rules
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-008")]
    [Property("ScenarioId", "TS-089")]
    [Property("BehaviorId", "BHV-606")]
    public void GetCompatibleDestinations_ConsultantNotesSource_OnlyConsultantNotes()
    {
        // Arrange - Create ConsultantNotes source project
        DummyScrText sourceScrText = CreateDummyProject();
        sourceScrText.Settings.TranslationInfo = new TranslationInformation(
            ProjectType.ConsultantNotes
        );
        ParatextProjects.FakeAddProject(CreateProjectDetails(sourceScrText), sourceScrText);
        VersioningManager.EnsureHasGuid(sourceScrText);

        // Create Standard destination (should NOT be compatible)
        DummyScrText destStandard = CreateDummyProject();
        destStandard.Settings.TranslationInfo = new TranslationInformation(ProjectType.Standard);
        ParatextProjects.FakeAddProject(CreateProjectDetails(destStandard), destStandard);
        VersioningManager.EnsureHasGuid(destStandard);

        // Act
        var result = BookOperationsService.GetCompatibleDestinations(sourceScrText.Settings.Guid);

        // Assert - Only ConsultantNotes should be in compatible list
        Assert.That(result, Is.Not.Null);
        Assert.That(
            result.All(p => p.ProjectType == ProjectType.ConsultantNotes),
            Is.True,
            "ConsultantNotes source can only copy to ConsultantNotes"
        );
    }

    /// <summary>
    /// Test: BackTranslation source can copy to multiple scripture types.
    /// EXT-008: Type compatibility rules
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-008")]
    [Property("ScenarioId", "TS-089")]
    [Property("BehaviorId", "BHV-606")]
    public void GetCompatibleDestinations_BackTranslationSource_AllowsScriptureTypes()
    {
        // Arrange - Create BackTranslation source project
        DummyScrText baseScrText = CreateDummyProject();
        baseScrText.Settings.TranslationInfo = new TranslationInformation(ProjectType.Standard);
        ParatextProjects.FakeAddProject(CreateProjectDetails(baseScrText), baseScrText);
        VersioningManager.EnsureHasGuid(baseScrText);

        DummyScrText sourceScrText = CreateDummyProject();
        sourceScrText.Settings.TranslationInfo = new TranslationInformation(
            ProjectType.BackTranslation,
            baseScrText.Name
        );
        ParatextProjects.FakeAddProject(CreateProjectDetails(sourceScrText), sourceScrText);
        VersioningManager.EnsureHasGuid(sourceScrText);

        // Create Standard destination
        DummyScrText destStandard = CreateDummyProject();
        destStandard.Settings.TranslationInfo = new TranslationInformation(ProjectType.Standard);
        ParatextProjects.FakeAddProject(CreateProjectDetails(destStandard), destStandard);
        VersioningManager.EnsureHasGuid(destStandard);

        // Act
        var result = BookOperationsService.GetCompatibleDestinations(sourceScrText.Settings.Guid);

        // Assert - BackTranslation can copy to scripture types
        Assert.That(result, Is.Not.Null);
        // Should NOT include StudyBibleAdditions or ConsultantNotes
        Assert.That(
            result.Any(p => p.ProjectType == ProjectType.StudyBibleAdditions),
            Is.False,
            "BackTranslation cannot copy to StudyBibleAdditions"
        );
        Assert.That(
            result.Any(p => p.ProjectType == ProjectType.ConsultantNotes),
            Is.False,
            "BackTranslation cannot copy to ConsultantNotes"
        );
    }

    /// <summary>
    /// Test: Source project should NOT appear in its own compatible destinations.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-008")]
    [Property("ScenarioId", "TS-089")]
    [Property("BehaviorId", "BHV-606")]
    public void GetCompatibleDestinations_ExcludesSourceProject()
    {
        // Arrange
        DummyScrText sourceScrText = CreateDummyProject();
        sourceScrText.Settings.TranslationInfo = new TranslationInformation(ProjectType.Standard);
        ParatextProjects.FakeAddProject(CreateProjectDetails(sourceScrText), sourceScrText);
        VersioningManager.EnsureHasGuid(sourceScrText);

        // Act
        var result = BookOperationsService.GetCompatibleDestinations(sourceScrText.Settings.Guid);

        // Assert - Source project should not be in list
        Assert.That(result, Is.Not.Null);
        Assert.That(
            result.Any(p => p.Guid == sourceScrText.Settings.Guid),
            Is.False,
            "Source project should not appear in its own compatible destinations"
        );
    }

    /// <summary>
    /// Test: GetCompatibleDestinations returns empty for invalid GUID.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-008")]
    [Property("ScenarioId", "TS-089")]
    public void GetCompatibleDestinations_InvalidGuid_ReturnsEmpty()
    {
        // Arrange
        var invalidGuid = HexId.FromStr("0000000000000000000000000000000000000000");

        // Act
        var result = BookOperationsService.GetCompatibleDestinations(invalidGuid);

        // Assert
        Assert.That(result, Is.Not.Null);
        Assert.That(result.Count(), Is.EqualTo(0), "Invalid GUID should return empty list");
    }

    #endregion

    #region CAP-009 Acceptance Tests

    /// <summary>
    /// Acceptance Test for CAP-009: CopyBooks
    /// Verifies that books can be copied between compatible projects.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-009")]
    [Property("SpecId", "spec-014")]
    [Property("ScenarioId", "TS-082")]
    [Property("BehaviorId", "BHV-166")]
    [Description("Acceptance test: CopyBooks copies books between compatible projects")]
    public async Task CopyBooks_AcceptanceTest()
    {
        // Arrange - Create source project with book content
        DummyScrText sourceScrText = CreateDummyProject();
        sourceScrText.Settings.TranslationInfo = new TranslationInformation(ProjectType.Standard);
        sourceScrText.Settings.Editable = true;
        ParatextProjects.FakeAddProject(CreateProjectDetails(sourceScrText), sourceScrText);
        VersioningManager.EnsureHasGuid(sourceScrText);

        // Add book to source
        sourceScrText.PutText(40, 0, false, "\\id MAT\n\\c 1\n\\v 1 Source Matthew text.", null);

        // Create destination project
        DummyScrText destScrText = CreateDummyProject();
        destScrText.Settings.TranslationInfo = new TranslationInformation(ProjectType.Standard);
        destScrText.Settings.Editable = true;
        ParatextProjects.FakeAddProject(CreateProjectDetails(destScrText), destScrText);
        VersioningManager.EnsureHasGuid(destScrText);

        // Act - Copy books
        var request = new CopyBooksRequest(
            sourceScrText.Settings.Guid,
            destScrText.Settings.Guid,
            new[] { "MAT" }
        );
        var result = await BookOperationsService.CopyBooksAsync(request);

        // Assert
        Assert.That(result, Is.Not.Null);
        Assert.That(result.Success, Is.True, "Copy should succeed");
        Assert.That(result.CopiedBooks, Does.Contain("MAT"), "MAT should be in copied list");

        // Verify book was actually copied (side-effect verification)
        Assert.That(destScrText.BookPresent(40), Is.True, "MAT should be present in destination");
    }

    #endregion

    #region CAP-009 Contract Tests - Copy Operations

    /// <summary>
    /// Test: CopyBooks with single book succeeds.
    /// spec-014: Import books with validation
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("SpecId", "spec-014")]
    [Property("ScenarioId", "TS-082")]
    [Property("BehaviorId", "BHV-166")]
    public async Task CopyBooks_SingleBook_Succeeds()
    {
        // Arrange
        DummyScrText sourceScrText = CreateDummyProject();
        sourceScrText.Settings.TranslationInfo = new TranslationInformation(ProjectType.Standard);
        sourceScrText.Settings.Editable = true;
        ParatextProjects.FakeAddProject(CreateProjectDetails(sourceScrText), sourceScrText);
        VersioningManager.EnsureHasGuid(sourceScrText);
        sourceScrText.PutText(1, 0, false, "\\id GEN\n\\c 1\n\\v 1 In the beginning...", null);

        DummyScrText destScrText = CreateDummyProject();
        destScrText.Settings.TranslationInfo = new TranslationInformation(ProjectType.Standard);
        destScrText.Settings.Editable = true;
        ParatextProjects.FakeAddProject(CreateProjectDetails(destScrText), destScrText);
        VersioningManager.EnsureHasGuid(destScrText);

        // Act
        var request = new CopyBooksRequest(
            sourceScrText.Settings.Guid,
            destScrText.Settings.Guid,
            new[] { "GEN" }
        );
        var result = await BookOperationsService.CopyBooksAsync(request);

        // Assert
        Assert.That(result.Success, Is.True);
        Assert.That(result.CopiedBooks, Does.Contain("GEN"));
        Assert.That(result.Errors, Is.Null.Or.Empty);
    }

    /// <summary>
    /// Test: CopyBooks with multiple books succeeds.
    /// INV-018: Admin gets import permission for all books
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("SpecId", "spec-014")]
    [Property("ScenarioId", "TS-082")]
    [Property("BehaviorId", "BHV-166")]
    [Property("InvariantId", "INV-018")]
    public async Task CopyBooks_MultipleBooks_AllCopied()
    {
        // Arrange
        DummyScrText sourceScrText = CreateDummyProject();
        sourceScrText.Settings.TranslationInfo = new TranslationInformation(ProjectType.Standard);
        sourceScrText.Settings.Editable = true;
        ParatextProjects.FakeAddProject(CreateProjectDetails(sourceScrText), sourceScrText);
        VersioningManager.EnsureHasGuid(sourceScrText);

        // Add multiple books to source
        sourceScrText.PutText(40, 0, false, "\\id MAT\n\\c 1\n\\v 1 Matthew", null);
        sourceScrText.PutText(41, 0, false, "\\id MRK\n\\c 1\n\\v 1 Mark", null);
        sourceScrText.PutText(42, 0, false, "\\id LUK\n\\c 1\n\\v 1 Luke", null);

        DummyScrText destScrText = CreateDummyProject();
        destScrText.Settings.TranslationInfo = new TranslationInformation(ProjectType.Standard);
        destScrText.Settings.Editable = true;
        ParatextProjects.FakeAddProject(CreateProjectDetails(destScrText), destScrText);
        VersioningManager.EnsureHasGuid(destScrText);

        // Act
        var request = new CopyBooksRequest(
            sourceScrText.Settings.Guid,
            destScrText.Settings.Guid,
            new[] { "MAT", "MRK", "LUK" }
        );
        var result = await BookOperationsService.CopyBooksAsync(request);

        // Assert
        Assert.That(result.Success, Is.True);
        Assert.That(result.CopiedBooks.Count, Is.EqualTo(3), "All 3 books should be copied");
        Assert.That(result.CopiedBooks, Does.Contain("MAT"));
        Assert.That(result.CopiedBooks, Does.Contain("MRK"));
        Assert.That(result.CopiedBooks, Does.Contain("LUK"));

        // INV-018: Verify books are present in destination (admin permission)
        Assert.That(destScrText.BookPresent(40), Is.True, "INV-018: MAT imported");
        Assert.That(destScrText.BookPresent(41), Is.True, "INV-018: MRK imported");
        Assert.That(destScrText.BookPresent(42), Is.True, "INV-018: LUK imported");
    }

    /// <summary>
    /// Test: CopyBooks fails for incompatible destination type.
    /// CAP-008 dependency: Uses GetCompatibleDestinations for validation
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("ScenarioId", "TS-089")]
    [Property("BehaviorId", "BHV-606")]
    public async Task CopyBooks_IncompatibleDestination_Fails()
    {
        // Arrange - StudyBibleAdditions source
        DummyScrText baseScrText = CreateDummyProject();
        baseScrText.Settings.TranslationInfo = new TranslationInformation(ProjectType.Standard);
        ParatextProjects.FakeAddProject(CreateProjectDetails(baseScrText), baseScrText);
        VersioningManager.EnsureHasGuid(baseScrText);

        DummyScrText sourceScrText = CreateDummyProject();
        sourceScrText.Settings.TranslationInfo = new TranslationInformation(
            ProjectType.StudyBibleAdditions,
            baseScrText.Name
        );
        sourceScrText.Settings.Editable = true;
        ParatextProjects.FakeAddProject(CreateProjectDetails(sourceScrText), sourceScrText);
        VersioningManager.EnsureHasGuid(sourceScrText);
        sourceScrText.PutText(40, 0, false, "\\id MAT\n\\c 1\n\\v 1 SBA content", null);

        // Standard destination (incompatible with StudyBibleAdditions)
        DummyScrText destScrText = CreateDummyProject();
        destScrText.Settings.TranslationInfo = new TranslationInformation(ProjectType.Standard);
        destScrText.Settings.Editable = true;
        ParatextProjects.FakeAddProject(CreateProjectDetails(destScrText), destScrText);
        VersioningManager.EnsureHasGuid(destScrText);

        // Act
        var request = new CopyBooksRequest(
            sourceScrText.Settings.Guid,
            destScrText.Settings.Guid,
            new[] { "MAT" }
        );
        var result = await BookOperationsService.CopyBooksAsync(request);

        // Assert - Should fail due to type incompatibility
        Assert.That(result.Success, Is.False, "Copy should fail for incompatible types");
        Assert.That(
            result.Errors,
            Is.Not.Null.And.Not.Empty,
            "Should have error explaining incompatibility"
        );
    }

    /// <summary>
    /// Test: CopyBooks fails for invalid source GUID.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("ScenarioId", "TS-082")]
    public async Task CopyBooks_InvalidSourceGuid_Fails()
    {
        // Arrange
        var invalidGuid = HexId.FromStr("0000000000000000000000000000000000000000");

        DummyScrText destScrText = CreateDummyProject();
        destScrText.Settings.TranslationInfo = new TranslationInformation(ProjectType.Standard);
        destScrText.Settings.Editable = true;
        ParatextProjects.FakeAddProject(CreateProjectDetails(destScrText), destScrText);
        VersioningManager.EnsureHasGuid(destScrText);

        // Act
        var request = new CopyBooksRequest(invalidGuid, destScrText.Settings.Guid, new[] { "GEN" });
        var result = await BookOperationsService.CopyBooksAsync(request);

        // Assert
        Assert.That(result.Success, Is.False);
        Assert.That(result.Errors, Is.Not.Null.And.Not.Empty);
    }

    /// <summary>
    /// Test: CopyBooks fails for invalid destination GUID.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("ScenarioId", "TS-082")]
    public async Task CopyBooks_InvalidDestinationGuid_Fails()
    {
        // Arrange
        DummyScrText sourceScrText = CreateDummyProject();
        sourceScrText.Settings.TranslationInfo = new TranslationInformation(ProjectType.Standard);
        ParatextProjects.FakeAddProject(CreateProjectDetails(sourceScrText), sourceScrText);
        VersioningManager.EnsureHasGuid(sourceScrText);
        sourceScrText.PutText(1, 0, false, "\\id GEN\n\\c 1\n\\v 1 Test", null);

        var invalidGuid = HexId.FromStr("0000000000000000000000000000000000000000");

        // Act
        var request = new CopyBooksRequest(
            sourceScrText.Settings.Guid,
            invalidGuid,
            new[] { "GEN" }
        );
        var result = await BookOperationsService.CopyBooksAsync(request);

        // Assert
        Assert.That(result.Success, Is.False);
        Assert.That(result.Errors, Is.Not.Null.And.Not.Empty);
    }

    /// <summary>
    /// Test: CopyBooks with empty book list returns success with no books copied.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("ScenarioId", "TS-082")]
    public async Task CopyBooks_EmptyBookList_ReturnsSuccessNoCopied()
    {
        // Arrange
        DummyScrText sourceScrText = CreateDummyProject();
        sourceScrText.Settings.TranslationInfo = new TranslationInformation(ProjectType.Standard);
        ParatextProjects.FakeAddProject(CreateProjectDetails(sourceScrText), sourceScrText);
        VersioningManager.EnsureHasGuid(sourceScrText);

        DummyScrText destScrText = CreateDummyProject();
        destScrText.Settings.TranslationInfo = new TranslationInformation(ProjectType.Standard);
        destScrText.Settings.Editable = true;
        ParatextProjects.FakeAddProject(CreateProjectDetails(destScrText), destScrText);
        VersioningManager.EnsureHasGuid(destScrText);

        // Act
        var request = new CopyBooksRequest(
            sourceScrText.Settings.Guid,
            destScrText.Settings.Guid,
            Array.Empty<string>()
        );
        var result = await BookOperationsService.CopyBooksAsync(request);

        // Assert - Success but no books copied
        Assert.That(result.Success, Is.True);
        Assert.That(result.CopiedBooks.Count, Is.EqualTo(0));
    }

    /// <summary>
    /// Test: CopyBooks reports error for book not present in source.
    /// BHV-167: Import validates book ID
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("SpecId", "spec-014")]
    [Property("ScenarioId", "TS-083")]
    [Property("BehaviorId", "BHV-167")]
    public async Task CopyBooks_BookNotInSource_ReportsError()
    {
        // Arrange
        DummyScrText sourceScrText = CreateDummyProject();
        sourceScrText.Settings.TranslationInfo = new TranslationInformation(ProjectType.Standard);
        ParatextProjects.FakeAddProject(CreateProjectDetails(sourceScrText), sourceScrText);
        VersioningManager.EnsureHasGuid(sourceScrText);
        // Don't add REV to source

        DummyScrText destScrText = CreateDummyProject();
        destScrText.Settings.TranslationInfo = new TranslationInformation(ProjectType.Standard);
        destScrText.Settings.Editable = true;
        ParatextProjects.FakeAddProject(CreateProjectDetails(destScrText), destScrText);
        VersioningManager.EnsureHasGuid(destScrText);

        // Act - Try to copy REV which doesn't exist in source
        var request = new CopyBooksRequest(
            sourceScrText.Settings.Guid,
            destScrText.Settings.Guid,
            new[] { "REV" }
        );
        var result = await BookOperationsService.CopyBooksAsync(request);

        // Assert - Should report error for missing book
        Assert.That(result.Success, Is.False);
        Assert.That(result.Errors, Is.Not.Null.And.Not.Empty);
        Assert.That(
            result.Errors.Any(e => e.BookId == "REV"),
            Is.True,
            "Should have error for REV"
        );
    }

    /// <summary>
    /// Test: CopyBooks overwrites existing book in destination.
    /// BHV-168: GetMatchingDestFiles comparison
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("SpecId", "spec-014")]
    [Property("ScenarioId", "TS-082")]
    [Property("BehaviorId", "BHV-168")]
    public async Task CopyBooks_ExistingBookInDest_Overwrites()
    {
        // Arrange
        DummyScrText sourceScrText = CreateDummyProject();
        sourceScrText.Settings.TranslationInfo = new TranslationInformation(ProjectType.Standard);
        sourceScrText.Settings.Editable = true;
        ParatextProjects.FakeAddProject(CreateProjectDetails(sourceScrText), sourceScrText);
        VersioningManager.EnsureHasGuid(sourceScrText);
        sourceScrText.PutText(40, 0, false, "\\id MAT\n\\c 1\n\\v 1 NEW SOURCE CONTENT", null);

        DummyScrText destScrText = CreateDummyProject();
        destScrText.Settings.TranslationInfo = new TranslationInformation(ProjectType.Standard);
        destScrText.Settings.Editable = true;
        ParatextProjects.FakeAddProject(CreateProjectDetails(destScrText), destScrText);
        VersioningManager.EnsureHasGuid(destScrText);
        destScrText.PutText(40, 0, false, "\\id MAT\n\\c 1\n\\v 1 OLD DEST CONTENT", null);

        // Act
        var request = new CopyBooksRequest(
            sourceScrText.Settings.Guid,
            destScrText.Settings.Guid,
            new[] { "MAT" }
        );
        var result = await BookOperationsService.CopyBooksAsync(request);

        // Assert
        Assert.That(result.Success, Is.True);
        Assert.That(result.CopiedBooks, Does.Contain("MAT"));

        // Verify content was overwritten
        var reference = new VerseRef(40, 0, 0, destScrText.Settings.Versification);
        string destContent = destScrText.GetText(reference, false, false);
        Assert.That(
            destContent,
            Does.Contain("NEW SOURCE CONTENT"),
            "Content should be from source"
        );
        Assert.That(
            destContent,
            Does.Not.Contain("OLD DEST CONTENT"),
            "Old content should be replaced"
        );
    }

    #endregion

    #region Invariant Tests

    /// <summary>
    /// INV-018: Administrator gets edit permission for imported books.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("InvariantId", "INV-018")]
    [Property("BehaviorId", "BHV-166")]
    [Property("CapabilityId", "CAP-009")]
    public async Task Invariant_AdminGetsImportPermission()
    {
        // Arrange - Create editable projects (simulates admin access)
        DummyScrText sourceScrText = CreateDummyProject();
        sourceScrText.Settings.TranslationInfo = new TranslationInformation(ProjectType.Standard);
        sourceScrText.Settings.Editable = true;
        ParatextProjects.FakeAddProject(CreateProjectDetails(sourceScrText), sourceScrText);
        VersioningManager.EnsureHasGuid(sourceScrText);
        sourceScrText.PutText(40, 0, false, "\\id MAT\n\\c 1\n\\v 1 Test", null);
        sourceScrText.PutText(41, 0, false, "\\id MRK\n\\c 1\n\\v 1 Test", null);

        DummyScrText destScrText = CreateDummyProject();
        destScrText.Settings.TranslationInfo = new TranslationInformation(ProjectType.Standard);
        destScrText.Settings.Editable = true;
        ParatextProjects.FakeAddProject(CreateProjectDetails(destScrText), destScrText);
        VersioningManager.EnsureHasGuid(destScrText);

        // Act
        var request = new CopyBooksRequest(
            sourceScrText.Settings.Guid,
            destScrText.Settings.Guid,
            new[] { "MAT", "MRK" }
        );
        var result = await BookOperationsService.CopyBooksAsync(request);

        // Assert - INV-018: Books should be imported (admin has permission)
        Assert.That(result.Success, Is.True, "INV-018: Admin should be able to copy books");
        Assert.That(destScrText.BookPresent(40), Is.True, "INV-018: MAT imported with permission");
        Assert.That(destScrText.BookPresent(41), Is.True, "INV-018: MRK imported with permission");
    }

    #endregion
}

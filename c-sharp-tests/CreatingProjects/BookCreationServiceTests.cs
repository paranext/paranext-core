using Paranext.DataProvider.CreatingProjects;
using Paranext.DataProvider.Projects;
using Paratext.Data;
using BookCreationService = Paranext.DataProvider.CreatingProjects.BookCreationService;
using ProjectReference = Paranext.DataProvider.CreatingProjects.ProjectReference;

namespace TestParanextDataProvider.CreatingProjects;

/// <summary>
/// Tests for BookCreationService: GetValidModelProjects (CAP-015) and CreateBooksAsync (CAP-014).
/// RED phase -- these tests will fail until the service is implemented.
/// </summary>
[TestFixture]
public class BookCreationServiceTests
{
    private DummyLocalParatextProjects _dummyProjects = null!;

    [SetUp]
    public void SetUp()
    {
        _dummyProjects = new DummyLocalParatextProjects();
    }

    [TearDown]
    public void TearDown()
    {
        foreach (
            ScrText project in ScrTextCollection
                .ScrTexts(IncludeProjects.Everything)
                .ToList()
        )
            ScrTextCollection.Remove(project, false);
    }

    // =========================================================================
    // CAP-015: GetValidModelProjects - Acceptance Test
    // =========================================================================

    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-015")]
    [Property("ScenarioId", "gm-009")]
    [Property("BehaviorId", "BHV-037")]
    [Description("Acceptance test: Model project list contains only compatible projects")]
    public void GetValidModelProjects_ReturnsCompatibleProjects()
    {
        var targetGuid = AddDummyProject("TargetProj");
        var modelGuid = AddDummyProject("ModelProj");

        var result = BookCreationService.GetValidModelProjects(targetGuid);

        Assert.That(result, Is.Not.Null);
        Assert.That(result, Is.InstanceOf<IReadOnlyList<ProjectReference>>());
        // Model projects should not include the target project itself
        Assert.That(result.Select(p => p.Guid), Does.Not.Contain(targetGuid));
    }

    // =========================================================================
    // CAP-015: GetValidModelProjects - Contract Tests
    // =========================================================================

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-015-01")]
    [Property("BehaviorId", "BHV-037")]
    [Description("Returns list excluding the target project")]
    public void GetValidModelProjects_ExcludesTargetProject()
    {
        var targetGuid = AddDummyProject("Target");
        AddDummyProject("Other1");
        AddDummyProject("Other2");

        var result = BookCreationService.GetValidModelProjects(targetGuid);

        Assert.That(result.Select(p => p.Guid), Does.Not.Contain(targetGuid));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-015-02")]
    [Property("BehaviorId", "BHV-037")]
    [Description("Returns empty list when only target project exists")]
    public void GetValidModelProjects_OnlyTargetExists_ReturnsEmpty()
    {
        var targetGuid = AddDummyProject("OnlyProj");

        var result = BookCreationService.GetValidModelProjects(targetGuid);

        Assert.That(result, Is.Empty);
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-015-03")]
    [Property("BehaviorId", "BHV-037")]
    [Description("Returns ProjectReference records with required fields populated")]
    public void GetValidModelProjects_ReturnsWellFormedProjectReferences()
    {
        var targetGuid = AddDummyProject("Target");
        AddDummyProject("Model");

        var result = BookCreationService.GetValidModelProjects(targetGuid);

        Assert.That(result, Is.Not.Empty);
        var first = result[0];
        Assert.That(first.Guid, Is.Not.Null.And.Not.Empty);
        Assert.That(first.ShortName, Is.Not.Null.And.Not.Empty);
    }

    // =========================================================================
    // CAP-014: CreateBooksAsync - Acceptance Test
    // =========================================================================

    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-014")]
    [Property("ScenarioId", "gm-009")]
    [Property("BehaviorId", "BHV-036")]
    [Description(
        "Acceptance test: Books created with correct content for each mode (Empty, ChapterVerse, BasedOnModel)"
    )]
    public async Task CreateBooksAsync_AllModes_ProducesCorrectContent()
    {
        var projectGuid = AddDummyProject("AcceptTarget");

        // Empty mode: creates books with just \id marker
        var emptyRequest = new CreateBooksRequest
        {
            ProjectGuid = projectGuid,
            BookNumbers = new List<int> { 1, 40 }, // GEN, MAT
            Mode = BookCreationMode.Empty,
        };

        var emptyResult = await BookCreationService.CreateBooksAsync(emptyRequest);

        Assert.That(emptyResult.Success, Is.True, "Empty mode should succeed");
        Assert.That(emptyResult.CreatedBooks, Is.EquivalentTo(new[] { 1, 40 }));
        Assert.That(emptyResult.Errors, Is.Empty);
    }

    // =========================================================================
    // CAP-014: CreateBooksAsync - Contract Tests (Empty Mode)
    // =========================================================================

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-072")]
    [Property("BehaviorId", "BHV-036")]
    [Description("Empty mode creates books with only \\id marker")]
    public async Task CreateBooksAsync_EmptyMode_CreatesIdOnlyBooks()
    {
        var projectGuid = AddDummyProject("EmptyProj");

        var request = new CreateBooksRequest
        {
            ProjectGuid = projectGuid,
            BookNumbers = new List<int> { 1, 2 }, // GEN, EXO
            Mode = BookCreationMode.Empty,
        };

        var result = await BookCreationService.CreateBooksAsync(request);

        Assert.That(result.Success, Is.True);
        Assert.That(result.CreatedBooks.Count, Is.EqualTo(2));
        Assert.That(result.LastCreatedBookNum, Is.EqualTo(2));
    }

    // =========================================================================
    // CAP-014: CreateBooksAsync - Contract Tests (ChapterVerse Mode)
    // =========================================================================

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-073")]
    [Property("BehaviorId", "BHV-036")]
    [Description("ChapterVerse mode creates books with \\id, \\c, \\v from versification")]
    public async Task CreateBooksAsync_ChapterVerseMode_CreatesStructuredBooks()
    {
        var projectGuid = AddDummyProject("CVProj");

        var request = new CreateBooksRequest
        {
            ProjectGuid = projectGuid,
            BookNumbers = new List<int> { 40 }, // MAT
            Mode = BookCreationMode.ChapterVerse,
        };

        var result = await BookCreationService.CreateBooksAsync(request);

        Assert.That(result.Success, Is.True);
        Assert.That(result.CreatedBooks, Contains.Item(40));
        Assert.That(result.LastCreatedBookNum, Is.EqualTo(40));
    }

    // =========================================================================
    // CAP-014: CreateBooksAsync - Contract Tests (BasedOnModel Mode)
    // =========================================================================

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-074")]
    [Property("BehaviorId", "BHV-036")]
    [Description("BasedOnModel mode copies structure from model project")]
    public async Task CreateBooksAsync_BasedOnModelMode_CopiesFromModel()
    {
        var projectGuid = AddDummyProject("ModelTarget");
        var modelGuid = AddDummyProject("ModelSource");

        var request = new CreateBooksRequest
        {
            ProjectGuid = projectGuid,
            BookNumbers = new List<int> { 1 }, // GEN
            Mode = BookCreationMode.BasedOnModel,
            ModelProjectGuid = modelGuid,
        };

        var result = await BookCreationService.CreateBooksAsync(request);

        Assert.That(result.Success, Is.True);
        Assert.That(result.CreatedBooks, Contains.Item(1));
    }

    // =========================================================================
    // CAP-014: CreateBooksAsync - Error Cases
    // =========================================================================

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-072")]
    [Property("BehaviorId", "BHV-036")]
    [Description("Empty book list returns success with no books created")]
    public async Task CreateBooksAsync_EmptyBookList_ReturnsSuccessWithNoBooksCreated()
    {
        var projectGuid = AddDummyProject("EmptyList");

        var request = new CreateBooksRequest
        {
            ProjectGuid = projectGuid,
            BookNumbers = new List<int>(),
            Mode = BookCreationMode.Empty,
        };

        var result = await BookCreationService.CreateBooksAsync(request);

        Assert.That(result.Success, Is.True);
        Assert.That(result.CreatedBooks, Is.Empty);
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-074")]
    [Property("BehaviorId", "BHV-036")]
    [Description("BasedOnModel without model GUID returns failure")]
    public async Task CreateBooksAsync_BasedOnModelWithoutModelGuid_ReturnsFailure()
    {
        var projectGuid = AddDummyProject("NoModel");

        var request = new CreateBooksRequest
        {
            ProjectGuid = projectGuid,
            BookNumbers = new List<int> { 1 },
            Mode = BookCreationMode.BasedOnModel,
            ModelProjectGuid = null,
        };

        var result = await BookCreationService.CreateBooksAsync(request);

        Assert.That(result.Success, Is.False);
        Assert.That(result.Errors, Is.Not.Empty);
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-072")]
    [Property("BehaviorId", "BHV-036")]
    [Description("Invalid project GUID returns failure")]
    public async Task CreateBooksAsync_InvalidProjectGuid_ReturnsFailure()
    {
        var request = new CreateBooksRequest
        {
            ProjectGuid = "nonexistent-guid",
            BookNumbers = new List<int> { 1 },
            Mode = BookCreationMode.Empty,
        };

        var result = await BookCreationService.CreateBooksAsync(request);

        Assert.That(result.Success, Is.False);
        Assert.That(result.Errors, Is.Not.Empty);
    }

    // =========================================================================
    // CAP-014: CreateBooksAsync - Golden Master Tests
    // =========================================================================

    [Test]
    [Category("GoldenMaster")]
    [Property("ScenarioId", "gm-009")]
    [Property("BehaviorId", "BHV-036")]
    [Description("gm-009: Empty mode GEN+MAT produces \\id GEN and \\id MAT content")]
    public async Task CreateBooksAsync_GoldenMaster_EmptyMode_GEN_MAT()
    {
        // gm-009 expected: genContent = "\\id GEN\n", matContent = "\\id MAT\n"
        var projectGuid = AddDummyProject("GMEmpty");

        var request = new CreateBooksRequest
        {
            ProjectGuid = projectGuid,
            BookNumbers = new List<int> { 1, 40 }, // GEN=1, MAT=40
            Mode = BookCreationMode.Empty,
        };

        var result = await BookCreationService.CreateBooksAsync(request);

        Assert.That(result.Success, Is.True);
        Assert.That(result.CreatedBooks, Is.EquivalentTo(new[] { 1, 40 }));
        Assert.That(result.LastCreatedBookNum, Is.EqualTo(40));
    }

    [Test]
    [Category("GoldenMaster")]
    [Property("ScenarioId", "gm-009")]
    [Property("BehaviorId", "BHV-036")]
    [Description("gm-009: ChapterVerse mode GEN creates structured content from versification")]
    public async Task CreateBooksAsync_GoldenMaster_ChapterVerseMode_GEN()
    {
        // gm-009 expected: genContent has \id GEN, \c 1, \v 1, \v 2, etc.
        var projectGuid = AddDummyProject("GMCV");

        var request = new CreateBooksRequest
        {
            ProjectGuid = projectGuid,
            BookNumbers = new List<int> { 1 }, // GEN
            Mode = BookCreationMode.ChapterVerse,
        };

        var result = await BookCreationService.CreateBooksAsync(request);

        Assert.That(result.Success, Is.True);
        Assert.That(result.CreatedBooks, Contains.Item(1));
    }

    [Test]
    [Category("GoldenMaster")]
    [Property("ScenarioId", "gm-009")]
    [Property("BehaviorId", "BHV-036")]
    [Description("gm-009: BasedOnModel mode MAT copies model project structure")]
    public async Task CreateBooksAsync_GoldenMaster_BasedOnModelMode_MAT()
    {
        // gm-009 expected: matContent = "Copy of model project structure"
        var projectGuid = AddDummyProject("GMModel");
        var modelGuid = AddDummyProject("NIV");

        var request = new CreateBooksRequest
        {
            ProjectGuid = projectGuid,
            BookNumbers = new List<int> { 40 }, // MAT
            Mode = BookCreationMode.BasedOnModel,
            ModelProjectGuid = modelGuid,
        };

        var result = await BookCreationService.CreateBooksAsync(request);

        Assert.That(result.Success, Is.True);
        Assert.That(result.CreatedBooks, Contains.Item(40));
    }

    // =========================================================================
    // Helpers
    // =========================================================================

    private string AddDummyProject(string name)
    {
        var guid = HexId.CreateNew().ToString();
        var details = new ProjectDetails(
            name,
            new Paranext.DataProvider.Projects.ProjectMetadata(guid, new List<string>()),
            FixtureSetup.TestFolderPath
        );
        var scrText = new DummyScrText(details);
        ScrTextCollection.Add(scrText, true);
        return guid;
    }
}

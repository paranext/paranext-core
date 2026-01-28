using Paranext.DataProvider.CreatingProjects;
using Paranext.DataProvider.Projects;
using Paratext.Data;

namespace TestParanextDataProvider.CreatingProjects;

/// <summary>
/// Tests for DerivedProjectService: CopyBaseBooksAsync (CAP-018).
/// RED phase -- these tests will fail until the service is implemented.
/// </summary>
[TestFixture]
public class DerivedProjectServiceTests
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
    // CAP-018: CopyBaseBooksAsync - Acceptance Test
    // =========================================================================

    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-018")]
    [Property("ScenarioId", "gm-012")]
    [Property("BehaviorId", "BHV-059")]
    [Description(
        "Acceptance test: Books copied from base project with DerivedTranslationStatus baseline"
    )]
    public async Task CopyBaseBooksAsync_FromBaseProject_CopiesBooksAndCreatesBaseline()
    {
        var baseGuid = AddDummyProject("BaseProj");
        var derivedGuid = AddDummyProject("DerivedProj");

        var request = new CopyBaseBooksRequest
        {
            DerivedProjectGuid = derivedGuid,
            BaseProjectGuid = baseGuid,
        };

        var result = await DerivedProjectService.CopyBaseBooksAsync(request);

        Assert.That(result.Success, Is.True, "Copy base books should succeed");
        Assert.That(result.CopiedBooks, Is.Not.Empty, "Should have copied books");
        Assert.That(result.ErrorCode, Is.Null);
    }

    // =========================================================================
    // CAP-018: CopyBaseBooksAsync - Contract Tests
    // =========================================================================

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-087")]
    [Property("BehaviorId", "BHV-059")]
    [Description("Copies all books from base project to derived project")]
    public async Task CopyBaseBooksAsync_ValidProjects_CopiesAllBaseBooks()
    {
        var baseGuid = AddDummyProject("NIV");
        var derivedGuid = AddDummyProject("TestSBA");

        var request = new CopyBaseBooksRequest
        {
            DerivedProjectGuid = derivedGuid,
            BaseProjectGuid = baseGuid,
        };

        var result = await DerivedProjectService.CopyBaseBooksAsync(request);

        Assert.That(result.Success, Is.True);
        Assert.That(result.CopiedBooks, Is.Not.Empty);
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-087")]
    [Property("BehaviorId", "BHV-059")]
    [Description("Returns failure when derived project GUID is invalid")]
    public async Task CopyBaseBooksAsync_InvalidDerivedGuid_ReturnsFailure()
    {
        var baseGuid = AddDummyProject("BaseValid");

        var request = new CopyBaseBooksRequest
        {
            DerivedProjectGuid = "nonexistent-guid",
            BaseProjectGuid = baseGuid,
        };

        var result = await DerivedProjectService.CopyBaseBooksAsync(request);

        Assert.That(result.Success, Is.False);
        Assert.That(result.ErrorCode, Is.Not.Null);
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-087")]
    [Property("BehaviorId", "BHV-059")]
    [Description("Returns failure when base project GUID is invalid")]
    public async Task CopyBaseBooksAsync_InvalidBaseGuid_ReturnsFailure()
    {
        var derivedGuid = AddDummyProject("DerivedValid");

        var request = new CopyBaseBooksRequest
        {
            DerivedProjectGuid = derivedGuid,
            BaseProjectGuid = "nonexistent-guid",
        };

        var result = await DerivedProjectService.CopyBaseBooksAsync(request);

        Assert.That(result.Success, Is.False);
        Assert.That(result.ErrorCode, Is.Not.Null);
    }

    // =========================================================================
    // CAP-018: CopyBaseBooksAsync - Golden Master Tests
    // =========================================================================

    [Test]
    [Category("GoldenMaster")]
    [Property("ScenarioId", "gm-012")]
    [Property("BehaviorId", "BHV-059")]
    [Description("gm-012: Copy GEN, EXO, MAT, MRK from NIV base to StudyBibleAdditions project")]
    public async Task CopyBaseBooksAsync_GoldenMaster_CopiesExpectedBooks()
    {
        // gm-012 expected: booksCopied=[GEN,EXO,MAT,MRK], baselineCreated=true,
        // derivedTranslationStatusInitialized=true
        var baseGuid = AddDummyProject("NIV");
        var derivedGuid = AddDummyProject("TestSBA");

        var request = new CopyBaseBooksRequest
        {
            DerivedProjectGuid = derivedGuid,
            BaseProjectGuid = baseGuid,
        };

        var result = await DerivedProjectService.CopyBaseBooksAsync(request);

        Assert.That(result.Success, Is.True);
        // gm-012: All base books should be copied
        Assert.That(result.CopiedBooks, Is.Not.Empty);
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

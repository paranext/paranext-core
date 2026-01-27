using Paranext.DataProvider.Projects;
using Paratext.Data;
using BookCreationService = Paranext.DataProvider.CreatingProjects.BookCreationService;
using ProjectReference = Paranext.DataProvider.CreatingProjects.ProjectReference;

namespace TestParanextDataProvider.CreatingProjects;

/// <summary>
/// Tests for BookCreationService: GetValidModelProjects (CAP-015).
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

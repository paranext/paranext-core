using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Projects;

namespace TestParanextDataProvider.Projects;

[ExcludeFromCodeCoverage]
[TestFixture]
public class LocalParatextProjectsTests
{
    private LocalParatextProjects _localProjects;

    [SetUp]
    public void SetUp()
    {
        _localProjects = new TestLocalParatextProjectsInTempDir();
    }

    [TearDown]
    public void TearDown()
    {
        if (_localProjects is IDisposable disposable)
            disposable.Dispose();
    }

    [TestCase("-ABC_441f1e41ffb8d319650847df35f4ffb78f12914e", "HIMOM", "1234")]
    [TestCase("-_441f1e41ffb8d319650847df35f4ffb78f12914e", "MONKEY", "abc123")]
    [TestCase("ABC@_441f1e41ffb8d319650847df35f4ffb78f12914e", "ABC@_441", "abe5")]
    [TestCase("A_B_C", "123", "affff00990")]
    [TestCase("ABC_", "123", "a236")]
    [TestCase("_441f1e41ffb8d319650847df35f4ffb78f12914e", "abs", "0626")]
    [TestCase("ABC", "sdlkfjasdf", "1606")]
    public void Initialize_SingleProject_ProjectIsRetrievable(string folder, string name, string id)
    {
        CreateTempProject(folder, CreateParatextProjectDetails(folder, name, id));

        _localProjects.Initialize();
        var details = _localProjects.GetAllProjectDetails().Single();
        Assert.That(details, Is.EqualTo(_localProjects.GetProjectDetails(id)));
        Assert.That(details.HomeDirectory, Does.EndWith(folder));
        // ScrText always prioritizes the folder name over the Name setting as the "name" even when
        // accessing scrText.Settings.Name. So basically name here doesn't get set to anything.
        Assert.That(details.Name, Is.EqualTo(folder));
        Assert.That(details.Metadata.Id.Equals(id, StringComparison.OrdinalIgnoreCase));
    }

    private void CreateTempProject(string folder, ProjectDetails details)
    {
        ((TestLocalParatextProjectsInTempDir)_localProjects).CreateTempProject(folder, details);
    }

    private static ProjectDetails CreateParatextProjectDetails(
        string folder,
        string name,
        string id
    )
    {
        return new ProjectDetails(name, new ProjectMetadata(id, ["paratext"]), folder);
    }

    [Test]
    public void GetParatextProjectInterfaces_Unpublished_IncludesLegacyComment()
    {
        var interfaces = LocalParatextProjects.GetParatextProjectInterfaces(isPublished: false);

        Assert.That(interfaces, Does.Contain(ProjectInterfaces.LEGACY_COMMENT));
        Assert.That(interfaces, Does.Contain(ProjectInterfaces.BASE));
        Assert.That(interfaces, Does.Contain(ProjectInterfaces.USFM_BOOK));
        Assert.That(interfaces, Does.Contain(ProjectInterfaces.SCRIPTURE_EDIT_PERMISSIONS));
    }

    [Test]
    public void GetParatextProjectInterfaces_Published_ExcludesLegacyCommentButKeepsScripture()
    {
        var interfaces = LocalParatextProjects.GetParatextProjectInterfaces(isPublished: true);

        Assert.That(interfaces, Does.Not.Contain(ProjectInterfaces.LEGACY_COMMENT));
        Assert.That(interfaces, Does.Contain(ProjectInterfaces.BASE));
        Assert.That(interfaces, Does.Contain(ProjectInterfaces.USFM_BOOK));
        Assert.That(interfaces, Does.Contain(ProjectInterfaces.USFM_CHAPTER));
        Assert.That(interfaces, Does.Contain(ProjectInterfaces.USFM_VERSE));
        Assert.That(interfaces, Does.Contain(ProjectInterfaces.USX_BOOK));
        Assert.That(interfaces, Does.Contain(ProjectInterfaces.USX_CHAPTER));
        Assert.That(interfaces, Does.Contain(ProjectInterfaces.USX_VERSE));
        Assert.That(interfaces, Does.Contain(ProjectInterfaces.PLAIN_TEXT_VERSE));
        Assert.That(interfaces, Does.Contain(ProjectInterfaces.MARKER_NAMES));
        Assert.That(interfaces, Does.Contain(ProjectInterfaces.TEXT_CONNECTION_SETTINGS));
        Assert.That(interfaces, Does.Contain(ProjectInterfaces.SCRIPTURE_EDIT_PERMISSIONS));
    }

    [TestCase("ABC_4488", "PRJX", "abc7")]
    public void Initialize_SingleUnpublishedProject_AdvertisesUnpublishedInterfaces(
        string folder,
        string name,
        string id
    )
    {
        CreateTempProject(folder, CreateParatextProjectDetails(folder, name, id));
        _localProjects.Initialize();

        var details = _localProjects.GetProjectDetails(id);

        // Unpublished projects must advertise the full interface list including legacyCommentManager.comments
        Assert.That(
            details.Metadata.ProjectInterfaces,
            Does.Contain(ProjectInterfaces.LEGACY_COMMENT),
            "Unpublished Paratext project must advertise legacyCommentManager.comments"
        );
        Assert.That(
            details.Metadata.ProjectInterfaces,
            Does.Contain(ProjectInterfaces.USFM_CHAPTER)
        );
    }

    [Test]
    public void GetAvailableUnpublishedProjectDetails_UnpublishedOnly_ReturnsAll()
    {
        CreateTempProject("NR1", CreateParatextProjectDetails("NR1", "First", "aaaa01"));
        CreateTempProject("NR2", CreateParatextProjectDetails("NR2", "Second", "aaaa02"));
        _localProjects.Initialize();

        var unpublished = _localProjects.GetAvailableUnpublishedProjectDetails().ToList();

        Assert.That(unpublished, Has.Count.EqualTo(2));
        Assert.That(
            unpublished.Select(d => d.Metadata.Id),
            Is.EquivalentTo(new[] { "AAAA01", "AAAA02" })
        );
    }

    [Test]
    public void GetAvailablePublishedProjectDetails_NoPublished_ReturnsEmpty()
    {
        CreateTempProject("NR1", CreateParatextProjectDetails("NR1", "First", "aaaa01"));
        _localProjects.Initialize();

        var published = _localProjects.GetAvailablePublishedProjectDetails().ToList();

        // DummyScrText / TestLocalParatextProjectsInTempDir produces unpublished ScrTexts
        // (IsResourceProject defaults to false on the base ScrText class), so the published
        // list is empty in this fixture. This documents the partition between the two helpers.
        Assert.That(published, Is.Empty);
    }
}

using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Projects;

namespace TestParanextDataProvider.Projects;

[ExcludeFromCodeCoverage]
[TestFixture]
public class LocalParatextProjectsTests
{
    private const string TEST_ID = "441f1e41ffb8d319650847df35f4ffb78f12914e";
    private LocalParatextProjects _localProjects;

    [SetUp]
    public void SetUp()
    {
        if (OperatingSystem.IsMacOS())
            Assert.Ignore("Mac is missing ICU support so some of these tests will not work");

        _localProjects = new TestLocalParatextProjectsInTempDir();
    }

    [TearDown]
    public void TearDown()
    {
        if (_localProjects is IDisposable disposable)
            disposable.Dispose();
    }

    #region Tests originally for now defunct DoesFolderMatchMetadata method
    // Previously, local project folder names had to follow the pattern shortname_id. Now this
    // has been relaxed, and folders can be named with any name allowed by the OS.

    [TestCase("-ABC_441f1e41ffb8d319650847df35f4ffb78f12914e")]
    [TestCase("-_441f1e41ffb8d319650847df35f4ffb78f12914e")]
    [TestCase("ABC@_441f1e41ffb8d319650847df35f4ffb78f12914e")]
    [TestCase("A_B_C")]
    [TestCase("ABC_")]
    [TestCase("ABC_441f1e41ffb8d319650847df35f4ffb78f1291 e")]
    [TestCase("_441f1e41ffb8d319650847df35f4ffb78f12914e")]
    [TestCase("ABC")]
    public void Initialize_NonStandardFolderName_ProjectIsRetrievable(string folder)
    {
        CreateTempProject(folder, CreateParatextProjectMetadata("ABC"));

        _localProjects.Initialize();
        var details = _localProjects.GetAllProjectDetails().Single();
        Assert.That(details, Is.EqualTo(_localProjects.GetProjectDetails(TEST_ID)));
        Assert.That(details.HomeDirectory, Does.EndWith(folder));
        Assert.That(details.Metadata.Name, Is.EqualTo("ABC"));
        Assert.That(details.Metadata.ID.Equals(TEST_ID, StringComparison.OrdinalIgnoreCase));
    }

    [TestCase("ABC_441f1e41ffb8d319650847df35f4ffb78f12914e", "ABD")]
    [TestCase("AB-C_441f1e41ffb8d319650847df35f4ffb78f12914e", "AB-D")]
    [TestCase("A-B-C_441f1e41ffb8d319650847df35f4ffb78f12914e", "ABC")]
    public void Initialize_NameDoesNotMatch_ProjectIsRetrievable(string folder, string name)
    {
        var metadata = CreateParatextProjectMetadata(name);
        CreateTempProject(folder, metadata);
        _localProjects.Initialize();
        var details = _localProjects.GetAllProjectDetails().Single();
        Assert.That(details, Is.EqualTo(_localProjects.GetProjectDetails(TEST_ID)));
        Assert.That(details.HomeDirectory, Does.EndWith(folder));
        Assert.That(details.Metadata.Name, Is.EqualTo(name));
        Assert.That(details.Metadata.ID.Equals(TEST_ID, StringComparison.OrdinalIgnoreCase));
    }

    [TestCase("ABC_541f1e41ffb8d319650847df35f4ffb78f12914e", "ABC")]
    [TestCase("AB-C_541f1e41ffb8d319650847df35f4ffb78f12914e", "AB-C")]
    public void Initialize_IdDoesNotMatch_ProjectIsRetrievable(string folder, string name)
    {
        var metadata = CreateParatextProjectMetadata(name);
        CreateTempProject(folder, metadata);
        _localProjects.Initialize();
        var details = _localProjects.GetAllProjectDetails().Single();
        Assert.That(details, Is.EqualTo(_localProjects.GetProjectDetails(TEST_ID)));
        Assert.That(details.HomeDirectory, Does.EndWith(folder));
        Assert.That(details.Metadata.Name, Is.EqualTo(name));
        Assert.That(details.Metadata.ID.Equals(TEST_ID, StringComparison.OrdinalIgnoreCase));
    }

    [TestCase("ABC_441F1E41FFB8D319650847DF35F4FFB78F12914E", "ABC")]
    [TestCase("ABC_441F1E41FFB8D319650847DF35F4FFB78F12914E", "abc")]
    [TestCase("AB-C_441f1e41ffb8d319650847df35f4ffb78f12914e", "AB-C")]
    [TestCase("A-B-C_441f1e41ffb8d319650847df35f4ffb78f12914e", "A-B-C")]
    public void Initialize_IdAndNameMatch_ProjectIsRetrievable(string folder, string name)
    {
        var metadata = CreateParatextProjectMetadata(name);
        CreateTempProject(folder, metadata);
        _localProjects.Initialize();
        var details = _localProjects.GetAllProjectDetails().Single();
        Assert.That(details, Is.EqualTo(_localProjects.GetProjectDetails(TEST_ID)));
        Assert.That(details.HomeDirectory, Does.EndWith(folder));
        Assert.That(details.Metadata.Name, Is.EqualTo(name));
        Assert.That(details.Metadata.ID.Equals(TEST_ID, StringComparison.OrdinalIgnoreCase));
    }

    #endregion

    private void CreateTempProject(string folder, ProjectMetadata metadata)
    {
        ((TestLocalParatextProjectsInTempDir)_localProjects).CreateTempProject(folder, metadata);
    }

    private static ProjectMetadata CreateParatextProjectMetadata(string name)
    {
        return new ProjectMetadata(TEST_ID, name, "paratextFolders", "paratext");
    }
}

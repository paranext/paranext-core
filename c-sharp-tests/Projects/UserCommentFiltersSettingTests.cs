using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.JsonUtils;
using Paranext.DataProvider.Projects;
using Paratext.Data;
using PtxUtils;

namespace TestParanextDataProvider.Projects;

[ExcludeFromCodeCoverage]
[TestFixture]
internal class UserCommentFiltersSettingTests : PapiTestBase
{
    private const string PdpName = "userCommentFiltersTestProject";

    private string _tempDir = null!;
    private DummyScrText _scrText = null!;
    private ProjectDetails _projectDetails = null!;
    private DummyParatextProjectDataProvider _provider = null!;

    [SetUp]
    public override async Task TestSetupAsync()
    {
        await base.TestSetupAsync();

        _tempDir = Path.Combine(Path.GetTempPath(), Guid.NewGuid().ToString());
        Directory.CreateDirectory(_tempDir);

        var metadata = new ProjectMetadata(HexId.CreateNew().ToString(), []);
        _projectDetails = new ProjectDetails("UserCommentFiltersTestProject", metadata, _tempDir);
        _scrText = new DummyScrText(_projectDetails);
        ParatextProjects.FakeAddProject(_projectDetails, _scrText);

        _provider = new DummyParatextProjectDataProvider(
            PdpName,
            Client,
            _projectDetails,
            ParatextProjects
        );
    }

    [TearDown]
    public void TearDown()
    {
        _scrText?.Dispose();
        if (Directory.Exists(_tempDir))
            Directory.Delete(_tempDir, recursive: true);
    }

    // --- GetUserCommentFilters ---

    [Test]
    public void GetUserCommentFilters_NoFileExists_ReturnsDefault()
    {
        var result = _provider.GetUserCommentFilters();
        Assert.That(result.Preset, Is.EqualTo("all"));
        Assert.That(result.ScopeFilter, Is.EqualTo("all-books"));
        // CommentFilterSelection has no named default-version constant (unlike
        // ResourceReferenceList.CurrentDataVersion), so the default is pinned as a literal here.
        Assert.That(result.DataVersion, Is.EqualTo("1.0.0"));
    }

    [Test]
    public void GetUserCommentFilters_AfterSet_ReturnsStoredSelection()
    {
        var input = new CommentFilterSelection
        {
            Preset = "unresolved",
            ScopeFilter = "current-chapter",
        };
        _provider.SetUserCommentFilters(input.SerializeToJson());

        var result = _provider.GetUserCommentFilters();
        Assert.That(result.Preset, Is.EqualTo("unresolved"));
        Assert.That(result.ScopeFilter, Is.EqualTo("current-chapter"));
    }

    // --- File is written at the right path ---

    [Test]
    public void SetUserCommentFilters_WritesFileUnderExtensionsFolder()
    {
        var input = new CommentFilterSelection();
        _provider.SetUserCommentFilters(input.SerializeToJson());

        string userId = _scrText.User.Name;
        string expectedPath = Path.Combine(_tempDir, "Extensions", $"UserSettings-{userId}.xml");
        Assert.That(File.Exists(expectedPath), Is.True);
    }

    // --- ResetUserCommentFilters ---

    [Test]
    public void ResetUserCommentFilters_AfterSet_ReturnsDefault()
    {
        var input = new CommentFilterSelection
        {
            Preset = "unresolved",
            ScopeFilter = "current-verse",
        };
        _provider.SetUserCommentFilters(input.SerializeToJson());
        _provider.ResetUserCommentFilters();

        var result = _provider.GetUserCommentFilters();
        Assert.That(result.Preset, Is.EqualTo("all"));
        Assert.That(result.ScopeFilter, Is.EqualTo("all-books"));
    }

    // --- Downgrade protection ---

    [Test]
    public void SetUserCommentFilters_MinorVersionDowngrade_Throws()
    {
        var v110 = new CommentFilterSelection { DataVersion = "1.1.0", Preset = "unread" };
        _provider.SetUserCommentFilters(v110.SerializeToJson());

        var v100 = new CommentFilterSelection { DataVersion = "1.0.0" };
        Assert.That(
            () => _provider.SetUserCommentFilters(v100.SerializeToJson()),
            Throws.TypeOf<InvalidDataException>().With.Message.Contains("downgrade")
        );
    }

    [Test]
    public void SetUserCommentFilters_PatchVersionDowngrade_Succeeds()
    {
        var v101 = new CommentFilterSelection { DataVersion = "1.0.1", Preset = "unread" };
        _provider.SetUserCommentFilters(v101.SerializeToJson());

        var v100 = new CommentFilterSelection { DataVersion = "1.0.0" };
        Assert.That(() => _provider.SetUserCommentFilters(v100.SerializeToJson()), Throws.Nothing);
    }

    [Test]
    public void SetUserCommentFilters_MajorVersionDowngrade_Throws()
    {
        var v200 = new CommentFilterSelection { DataVersion = "2.0.0" };
        // 2.0.0 fails the CurrentMajorVersion == 1 check, so write it directly via the underlying
        // settings store to simulate a future-version file already on disk.
        var settings = new UserProjectSettings(_scrText.Directory, _scrText.User.Name);
        settings.SetSetting("CommentFilters", "2.0.0", CommentFilterSelection.ToXml(v200));

        // 1.0.0 itself passes ValidateUserSettingVersion (major 1 is current), so this exercises
        // ValidateVersionNotDowngraded catching the major-component downgrade against the stored
        // 2.0.0.
        var v100 = new CommentFilterSelection { DataVersion = "1.0.0" };
        Assert.That(
            () => _provider.SetUserCommentFilters(v100.SerializeToJson()),
            Throws.TypeOf<InvalidDataException>()
        );
    }

    [Test]
    public void SetUserCommentFilters_MalformedDataVersion_Throws()
    {
        const string malformedJson = """{"dataVersion":"garbage","preset":"all"}""";
        Assert.That(
            () => _provider.SetUserCommentFilters(malformedJson),
            Throws.TypeOf<InvalidDataException>().With.Message.Contains("garbage")
        );
    }

    [Test]
    public void SetUserCommentFilters_NoCurrentValue_AllowsAnyVersion()
    {
        // No prior write - downgrade protection has nothing to compare against.
        var v100 = new CommentFilterSelection { DataVersion = "1.0.0" };
        Assert.That(() => _provider.SetUserCommentFilters(v100.SerializeToJson()), Throws.Nothing);
    }
}

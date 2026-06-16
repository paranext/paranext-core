using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.JsonUtils;
using Paranext.DataProvider.Projects;
using Paratext.Data;
using PtxUtils;

namespace TestParanextDataProvider.Projects;

[ExcludeFromCodeCoverage]
[TestFixture]
internal class UserTextConnectionSettingTests : PapiTestBase
{
    private const string PdpName = "userTextConnectionSettingTestProject";

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
        _projectDetails = new ProjectDetails("UserSettingsTestProject", metadata, _tempDir);
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

    // --- GetUserModelTexts ---

    [Test]
    public void GetUserModelTexts_NoFileExists_ReturnsDefaultEmptyList()
    {
        var result = _provider.GetUserModelTexts();
        Assert.That(result, Is.InstanceOf<ResourceReferenceList>());
        Assert.That(result.Items, Is.Empty);
        Assert.That(result.DataVersion, Is.EqualTo(ResourceReferenceList.CurrentDataVersion));
    }

    [Test]
    public void GetUserModelTexts_AfterSet_ReturnsStoredList()
    {
        var input = new ResourceReferenceList
        {
            Items = [new ProjectReference { Name = "ESV", Id = "aabbcc" }],
        };
        _provider.SetUserModelTexts(input.SerializeToJson());
        var result = _provider.GetUserModelTexts();
        Assert.That(result.Items, Has.Count.EqualTo(1));
        Assert.That(((ProjectReference)result.Items[0]).Id, Is.EqualTo("aabbcc"));
    }

    // --- GetUserReferencedProjectsAndResources ---

    [Test]
    public void GetUserReferencedProjectsAndResources_NoFileExists_ReturnsDefaultEmptyList()
    {
        var result = _provider.GetUserReferencedProjectsAndResources();
        Assert.That(result.Items, Is.Empty);
    }

    [Test]
    public void GetUserReferencedProjectsAndResources_AfterSet_ReturnsStoredList()
    {
        var input = new ResourceReferenceList
        {
            Items = [new EnhancedResourceReference { Name = "BDAG" }],
        };
        _provider.SetUserReferencedProjectsAndResources(input.SerializeToJson());
        var result = _provider.GetUserReferencedProjectsAndResources();
        Assert.That(result.Items, Has.Count.EqualTo(1));
        Assert.That(result.Items[0], Is.InstanceOf<EnhancedResourceReference>());
        Assert.That(result.Items[0].Name, Is.EqualTo("BDAG"));
    }

    // --- File is written at the right path ---

    [Test]
    public void SetUserModelTexts_WritesFileUnderExtensionsFolder()
    {
        var input = new ResourceReferenceList();
        _provider.SetUserModelTexts(input.SerializeToJson());

        string userId = _scrText.User.Name;
        string expectedPath = Path.Combine(_tempDir, "Extensions", $"UserSettings-{userId}.xml");
        Assert.That(File.Exists(expectedPath), Is.True);
    }

    // --- ModelTexts and ReferencedProjectsAndResources are independent ---

    [Test]
    public void SetBothSettings_StoreIndependently()
    {
        var modelList = new ResourceReferenceList
        {
            Items = [new ProjectReference { Name = "ModelProj", Id = "aaa" }],
        };
        var refList = new ResourceReferenceList
        {
            Items = [new EnhancedResourceReference { Name = "RefResource" }],
        };

        _provider.SetUserModelTexts(modelList.SerializeToJson());
        _provider.SetUserReferencedProjectsAndResources(refList.SerializeToJson());

        var modelResult = _provider.GetUserModelTexts();
        var refResult = _provider.GetUserReferencedProjectsAndResources();

        Assert.That(((ProjectReference)modelResult.Items[0]).Name, Is.EqualTo("ModelProj"));
        Assert.That(refResult.Items[0].Name, Is.EqualTo("RefResource"));
    }

    // --- ResetUserModelTexts ---

    [Test]
    public void ResetUserModelTexts_AfterSet_ReturnsEmptyDefault()
    {
        var input = new ResourceReferenceList
        {
            Items = [new ProjectReference { Name = "ESV", Id = "aabbcc" }],
        };
        _provider.SetUserModelTexts(input.SerializeToJson());
        _provider.ResetUserModelTexts();
        var result = _provider.GetUserModelTexts();
        Assert.That(result.Items, Is.Empty);
    }

    // --- ResetUserReferencedProjectsAndResources ---

    [Test]
    public void ResetUserReferencedProjectsAndResources_AfterSet_ReturnsEmptyDefault()
    {
        var input = new ResourceReferenceList
        {
            Items = [new EnhancedResourceReference { Name = "BDAG" }],
        };
        _provider.SetUserReferencedProjectsAndResources(input.SerializeToJson());
        _provider.ResetUserReferencedProjectsAndResources();
        var result = _provider.GetUserReferencedProjectsAndResources();
        Assert.That(result.Items, Is.Empty);
    }

    // --- Downgrade protection ---

    [Test]
    public void SetUserModelTexts_MinorVersionDowngrade_Throws()
    {
        var v110 = new ResourceReferenceList
        {
            DataVersion = "1.1.0",
            Items = [new EnhancedResourceReference { Name = "BDAG" }],
        };
        _provider.SetUserModelTexts(v110.SerializeToJson());

        var v100 = new ResourceReferenceList { DataVersion = "1.0.0", Items = [] };
        Assert.That(
            () => _provider.SetUserModelTexts(v100.SerializeToJson()),
            Throws.TypeOf<InvalidDataException>().With.Message.Contains("downgrade")
        );
    }

    [Test]
    public void SetUserModelTexts_PatchVersionDowngrade_Succeeds()
    {
        var v101 = new ResourceReferenceList
        {
            DataVersion = "1.0.1",
            Items = [new EnhancedResourceReference { Name = "BDAG" }],
        };
        _provider.SetUserModelTexts(v101.SerializeToJson());

        var v100 = new ResourceReferenceList { DataVersion = "1.0.0", Items = [] };
        Assert.That(() => _provider.SetUserModelTexts(v100.SerializeToJson()), Throws.Nothing);
    }

    [Test]
    public void SetUserReferencedProjectsAndResources_MinorVersionDowngrade_Throws()
    {
        var v110 = new ResourceReferenceList
        {
            DataVersion = "1.1.0",
            Items = [new ProjectReference { Name = "ESV", Id = "abc" }],
        };
        _provider.SetUserReferencedProjectsAndResources(v110.SerializeToJson());

        var v100 = new ResourceReferenceList { DataVersion = "1.0.0", Items = [] };
        Assert.That(
            () => _provider.SetUserReferencedProjectsAndResources(v100.SerializeToJson()),
            Throws.TypeOf<InvalidDataException>().With.Message.Contains("downgrade")
        );
    }

    [Test]
    public void SetUserModelTexts_MajorVersionDowngrade_Throws()
    {
        var v200 = new ResourceReferenceList { DataVersion = "2.0.0", Items = [] };
        // Note: 2.0.0 fails the CurrentMajorVersion == 1 check, so we write it directly
        // via the underlying settings store to simulate a future-version file on disk
        var settings = new UserProjectSettings(_scrText.Directory, _scrText.User.Name);
        settings.SetSetting("ModelTexts", "2.0.0", ResourceReferenceList.ToXml(v200));

        // This test is checking ValidateVersionNotDowngraded, so we need a stored 2.0.0
        // and try to write 1.0.0 — but SetUserModelTexts also calls ValidateUserSettingVersion
        // which rejects major != 1. The major-downgrade path (2→1) is therefore blocked by
        // ValidateUserSettingVersion before ValidateVersionNotDowngraded runs. Verify that.
        var v100 = new ResourceReferenceList { DataVersion = "1.0.0", Items = [] };
        Assert.That(
            () => _provider.SetUserModelTexts(v100.SerializeToJson()),
            Throws.TypeOf<InvalidDataException>()
        );
    }

    [Test]
    public void SetUserModelTexts_MalformedDataVersion_Throws()
    {
        const string malformedJson = """{"dataVersion":"garbage","items":[]}""";
        Assert.That(
            () => _provider.SetUserModelTexts(malformedJson),
            Throws.TypeOf<InvalidDataException>().With.Message.Contains("garbage")
        );
    }

    [Test]
    public void SetUserModelTexts_NoCurrentValue_AllowsAnyVersion()
    {
        // No prior write — downgrade protection has nothing to compare against
        var v100 = new ResourceReferenceList { DataVersion = "1.0.0", Items = [] };
        Assert.That(() => _provider.SetUserModelTexts(v100.SerializeToJson()), Throws.Nothing);
    }
}

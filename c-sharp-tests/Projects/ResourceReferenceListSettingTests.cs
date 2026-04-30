using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.JsonUtils;
using Paranext.DataProvider.Projects;
using Paranext.DataProvider.Services;

namespace TestParanextDataProvider.Projects;

/// <summary>
/// Integration tests for the GetProjectSetting / SetProjectSetting logic that handles the
/// <c>platformScripture.modelTexts</c> and
/// <c>platformScripture.referencedProjectsAndResources</c> settings.
///
/// These settings are stored in ParametersDictionary as <c>"&lt;version&gt; &lt;json&gt;"</c>
/// (e.g. <c>1.0.0 {"dataVersion":"1.0.0","items":[]}</c>).
/// </summary>
[ExcludeFromCodeCoverage]
[TestFixture]
internal class ResourceReferenceListSettingTests : PapiTestBase
{
    private const string PdpName = "resourceReferenceListTestProject";

    private DummyScrText _scrText = null!;
    private ProjectDetails _projectDetails = null!;
    private DummyParatextProjectDataProvider _provider = null!;

    [SetUp]
    public override async Task TestSetupAsync()
    {
        await base.TestSetupAsync();

        // Register a stub for ProjectSettingsService.isValid that always approves changes.
        // SetProjectSetting calls this before writing any value.
        await Client.RegisterRequestHandlerAsync(
            "object:ProjectSettingsService.isValid",
            new Func<string, object?, object?, object?, bool>(
                (key, newValue, currentValue, allChanges) => true
            ),
            null
        );

        _scrText = CreateDummyProject();
        _projectDetails = CreateProjectDetails(_scrText);
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
    }

    // ------------------------------------------------------------------
    // Helpers
    // ------------------------------------------------------------------

    /// <summary>
    /// Directly writes a raw string value into the project's ParametersDictionary so that
    /// GetProjectSetting reads whatever we put there, without going through SetProjectSetting.
    /// </summary>
    private void SetRawSetting(string ptSettingName, string rawValue)
    {
        _scrText.Settings.ParametersDictionary[ptSettingName] = rawValue;
    }

    // ------------------------------------------------------------------
    // GetProjectSetting tests
    // ------------------------------------------------------------------

    #region GetProjectSetting — setting absent

    [TestCase(ProjectSettingsNames.PB_MODEL_TEXTS)]
    [TestCase(ProjectSettingsNames.PB_REFERENCED_PROJECTS_AND_RESOURCES)]
    public void GetProjectSetting_SettingAbsent_ReturnsDefaultEmptyList(string pbSettingName)
    {
        // The setting is not in ParametersDictionary at all.
        var result = _provider.GetProjectSetting(pbSettingName);

        Assert.That(result, Is.InstanceOf<ResourceReferenceList>());
        var list = (ResourceReferenceList)result!;
        Assert.That(list.Items, Is.Empty);
        Assert.That(list.DataVersion, Is.EqualTo(ResourceReferenceList.CurrentDataVersion));
    }

    [TestCase(ProjectSettingsNames.PB_MODEL_TEXTS)]
    [TestCase(ProjectSettingsNames.PB_REFERENCED_PROJECTS_AND_RESOURCES)]
    public void GetProjectSetting_SettingPresentButEmpty_ReturnsDefaultEmptyList(
        string pbSettingName
    )
    {
        string ptSettingName =
            ProjectSettingsNames.GetParatextSettingNameFromPlatformBibleSettingName(pbSettingName)!;

        // An empty string is treated the same as absent.
        SetRawSetting(ptSettingName, "");

        var result = _provider.GetProjectSetting(pbSettingName);

        Assert.That(result, Is.InstanceOf<ResourceReferenceList>());
        var list = (ResourceReferenceList)result!;
        Assert.That(list.Items, Is.Empty);
    }

    #endregion

    #region GetProjectSetting — valid stored value

    [TestCase(ProjectSettingsNames.PB_MODEL_TEXTS)]
    [TestCase(ProjectSettingsNames.PB_REFERENCED_PROJECTS_AND_RESOURCES)]
    public void GetProjectSetting_ValidVersionPrefixWithEmptyItems_ReturnsEmptyList(
        string pbSettingName
    )
    {
        string ptSettingName =
            ProjectSettingsNames.GetParatextSettingNameFromPlatformBibleSettingName(pbSettingName)!;

        string jsonBody = new ResourceReferenceList().SerializeToJson();
        SetRawSetting(
            ptSettingName,
            $"{ResourceReferenceList.CurrentFormatVersion} {jsonBody}"
        );

        var result = _provider.GetProjectSetting(pbSettingName);

        Assert.That(result, Is.InstanceOf<ResourceReferenceList>());
        var list = (ResourceReferenceList)result!;
        Assert.That(list.Items, Is.Empty);
        Assert.That(list.DataVersion, Is.EqualTo(ResourceReferenceList.CurrentDataVersion));
    }

    [TestCase(ProjectSettingsNames.PB_MODEL_TEXTS)]
    [TestCase(ProjectSettingsNames.PB_REFERENCED_PROJECTS_AND_RESOURCES)]
    public void GetProjectSetting_ValidVersionPrefixWithItems_ReturnsCorrectList(
        string pbSettingName
    )
    {
        string ptSettingName =
            ProjectSettingsNames.GetParatextSettingNameFromPlatformBibleSettingName(pbSettingName)!;

        var originalList = new ResourceReferenceList
        {
            Items =
            [
                new ProjectReference { Name = "My Project", Id = "aabbcc" },
                new EnhancedResourceReference { Name = "MyEnhanced" },
            ],
        };
        string jsonBody = originalList.SerializeToJson();
        SetRawSetting(
            ptSettingName,
            $"{ResourceReferenceList.CurrentFormatVersion} {jsonBody}"
        );

        var result = _provider.GetProjectSetting(pbSettingName);

        Assert.That(result, Is.InstanceOf<ResourceReferenceList>());
        var list = (ResourceReferenceList)result!;
        Assert.That(list.Items, Has.Count.EqualTo(2));
        Assert.That(list.Items[0], Is.InstanceOf<ProjectReference>());
        Assert.That(((ProjectReference)list.Items[0]).Name, Is.EqualTo("My Project"));
        Assert.That(((ProjectReference)list.Items[0]).Id, Is.EqualTo("aabbcc"));
        Assert.That(list.Items[1], Is.InstanceOf<EnhancedResourceReference>());
    }

    /// <summary>
    /// The patch digit in the format version is allowed to differ from the current version;
    /// only a major version mismatch is rejected.
    /// </summary>
    [TestCase(ProjectSettingsNames.PB_MODEL_TEXTS)]
    [TestCase(ProjectSettingsNames.PB_REFERENCED_PROJECTS_AND_RESOURCES)]
    public void GetProjectSetting_FutureMinorPatchVersion_StillDeserializesSuccessfully(
        string pbSettingName
    )
    {
        string ptSettingName =
            ProjectSettingsNames.GetParatextSettingNameFromPlatformBibleSettingName(pbSettingName)!;

        // Use a version with the same major but higher minor/patch — must still be accepted.
        string jsonBody = new ResourceReferenceList().SerializeToJson();
        SetRawSetting(ptSettingName, $"1.99.42 {jsonBody}");

        var result = _provider.GetProjectSetting(pbSettingName);

        Assert.That(result, Is.InstanceOf<ResourceReferenceList>());
    }

    #endregion

    #region GetProjectSetting — error cases

    [TestCase(ProjectSettingsNames.PB_MODEL_TEXTS)]
    [TestCase(ProjectSettingsNames.PB_REFERENCED_PROJECTS_AND_RESOURCES)]
    public void GetProjectSetting_MissingVersionPrefix_ThrowsInvalidDataException(
        string pbSettingName
    )
    {
        string ptSettingName =
            ProjectSettingsNames.GetParatextSettingNameFromPlatformBibleSettingName(pbSettingName)!;

        // No space ⟹ no version prefix.
        SetRawSetting(ptSettingName, """{"dataVersion":"1.0.0","items":[]}""");

        Assert.Throws<InvalidDataException>(() => _provider.GetProjectSetting(pbSettingName));
    }

    [TestCase(ProjectSettingsNames.PB_MODEL_TEXTS)]
    [TestCase(ProjectSettingsNames.PB_REFERENCED_PROJECTS_AND_RESOURCES)]
    public void GetProjectSetting_UnparseableVersionString_ThrowsInvalidDataException(
        string pbSettingName
    )
    {
        string ptSettingName =
            ProjectSettingsNames.GetParatextSettingNameFromPlatformBibleSettingName(pbSettingName)!;

        // "not-a-version" cannot be parsed by System.Version.TryParse.
        string jsonBody = new ResourceReferenceList().SerializeToJson();
        SetRawSetting(ptSettingName, $"not-a-version {jsonBody}");

        Assert.Throws<InvalidDataException>(() => _provider.GetProjectSetting(pbSettingName));
    }

    [TestCase(ProjectSettingsNames.PB_MODEL_TEXTS)]
    [TestCase(ProjectSettingsNames.PB_REFERENCED_PROJECTS_AND_RESOURCES)]
    public void GetProjectSetting_IncompatibleMajorVersion_ThrowsInvalidDataException(
        string pbSettingName
    )
    {
        string ptSettingName =
            ProjectSettingsNames.GetParatextSettingNameFromPlatformBibleSettingName(pbSettingName)!;

        // Major version 2 doesn't match CurrentMajorVersion (1).
        string jsonBody = new ResourceReferenceList().SerializeToJson();
        SetRawSetting(ptSettingName, $"2.0.0 {jsonBody}");

        Assert.Throws<InvalidDataException>(() => _provider.GetProjectSetting(pbSettingName));
    }

    #endregion

    // ------------------------------------------------------------------
    // SetProjectSetting tests
    // ------------------------------------------------------------------

    #region SetProjectSetting — storage format

    [TestCase(ProjectSettingsNames.PB_MODEL_TEXTS)]
    [TestCase(ProjectSettingsNames.PB_REFERENCED_PROJECTS_AND_RESOURCES)]
    public void SetProjectSetting_EmptyList_StoresVersionPrefixedJson(string pbSettingName)
    {
        string ptSettingName =
            ProjectSettingsNames.GetParatextSettingNameFromPlatformBibleSettingName(pbSettingName)!;

        var inputList = new ResourceReferenceList();
        string inputJson = inputList.SerializeToJson();

        bool result = _provider.SetProjectSetting(pbSettingName, inputJson);

        Assert.That(result, Is.True);

        string stored = _scrText.Settings.ParametersDictionary[ptSettingName];
        Assert.That(stored, Does.StartWith($"{ResourceReferenceList.CurrentFormatVersion} "));

        // The JSON body after the prefix must round-trip correctly.
        int spaceIndex = stored.IndexOf(' ');
        string jsonBody = stored[(spaceIndex + 1)..];
        var roundTripped = jsonBody.DeserializeFromJson<ResourceReferenceList>();
        Assert.That(roundTripped, Is.Not.Null);
        Assert.That(roundTripped!.Items, Is.Empty);
        Assert.That(
            roundTripped.DataVersion,
            Is.EqualTo(ResourceReferenceList.CurrentDataVersion)
        );
    }

    [TestCase(ProjectSettingsNames.PB_MODEL_TEXTS)]
    [TestCase(ProjectSettingsNames.PB_REFERENCED_PROJECTS_AND_RESOURCES)]
    public void SetProjectSetting_ListWithItems_StoresVersionPrefixedJson(string pbSettingName)
    {
        string ptSettingName =
            ProjectSettingsNames.GetParatextSettingNameFromPlatformBibleSettingName(pbSettingName)!;

        var inputList = new ResourceReferenceList
        {
            Items = [new ProjectReference { Name = "Test Project", Id = "112233" }],
        };
        string inputJson = inputList.SerializeToJson();

        _provider.SetProjectSetting(pbSettingName, inputJson);

        string stored = _scrText.Settings.ParametersDictionary[ptSettingName];

        // Must start with the version prefix followed by a space.
        Assert.That(stored, Does.StartWith($"{ResourceReferenceList.CurrentFormatVersion} "));

        // The JSON body must contain the item we set.
        int spaceIndex = stored.IndexOf(' ');
        string jsonBody = stored[(spaceIndex + 1)..];
        var roundTripped = jsonBody.DeserializeFromJson<ResourceReferenceList>();
        Assert.That(roundTripped, Is.Not.Null);
        Assert.That(roundTripped!.Items, Has.Count.EqualTo(1));
        var proj = roundTripped.Items[0] as ProjectReference;
        Assert.That(proj, Is.Not.Null);
        Assert.That(proj!.Name, Is.EqualTo("Test Project"));
        Assert.That(proj.Id, Is.EqualTo("112233"));
    }

    /// <summary>
    /// End-to-end round-trip: SetProjectSetting followed by GetProjectSetting must return an
    /// equivalent list without any knowledge of the internal storage format.
    /// </summary>
    [TestCase(ProjectSettingsNames.PB_MODEL_TEXTS)]
    [TestCase(ProjectSettingsNames.PB_REFERENCED_PROJECTS_AND_RESOURCES)]
    public void SetThenGetProjectSetting_RoundTripsListCorrectly(string pbSettingName)
    {
        var originalList = new ResourceReferenceList
        {
            Items =
            [
                new ProjectReference { Name = "Proj A", Id = "aaa111" },
                new DblResourceReference { Name = "DBL Resource", Id = "bbb222" },
                new EnhancedResourceReference { Name = "Enhanced" },
            ],
        };
        string inputJson = originalList.SerializeToJson();

        _provider.SetProjectSetting(pbSettingName, inputJson);
        var result = _provider.GetProjectSetting(pbSettingName);

        Assert.That(result, Is.InstanceOf<ResourceReferenceList>());
        var list = (ResourceReferenceList)result!;
        Assert.That(list.Items, Has.Count.EqualTo(3));
        Assert.That(list.Items[0], Is.InstanceOf<ProjectReference>());
        Assert.That(((ProjectReference)list.Items[0]).Id, Is.EqualTo("aaa111"));
        Assert.That(list.Items[1], Is.InstanceOf<DblResourceReference>());
        Assert.That(((DblResourceReference)list.Items[1]).Id, Is.EqualTo("bbb222"));
        Assert.That(list.Items[2], Is.InstanceOf<EnhancedResourceReference>());
    }

    #endregion
}

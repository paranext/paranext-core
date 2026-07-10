using System.Diagnostics.CodeAnalysis;
using System.Xml.Linq;
using Paranext.DataProvider.JsonUtils;
using Paranext.DataProvider.Projects;
using Paranext.DataProvider.Services;
using Paratext.Data;
using Paratext.Data.Users;

namespace TestParanextDataProvider.Projects;

[TestFixture]
[ExcludeFromCodeCoverage]
internal class ParatextProjectDataProviderShownByDefaultTests : PapiTestBase
{
    private const string PdpName = "shownByDefaultTestProject";

    private DummyScrText _scrText = null!;
    private ProjectDetails _projectDetails = null!;
    private DummyParatextProjectDataProvider _provider = null!;

    [SetUp]
    public override async Task TestSetupAsync()
    {
        await base.TestSetupAsync();

        await Client.RegisterRequestHandlerAsync(
            "object:ProjectSettingsService.isValid",
            new Func<string, object?, object?, object?, bool>((k, n, c, a) => true),
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
    public void TearDown() => _scrText?.Dispose();

    private static string Json(params ResourceReference[] items) =>
        new ResourceReferenceList { Items = [.. items] }.SerializeToJson();

    // A shared project where the current user is NOT an administrator. Non-null Data makes
    // HasPermissionsDefined = true (so IsProjectShared = true) and AmAdministrator = false, so the
    // production IsUserProjectAdministrator() check fires naturally.
    private sealed class NonAdminScrText : DummyScrText
    {
        private readonly NonAdminPermissionManager _permissions = new();
        public override PermissionManager Permissions => _permissions;

        private sealed class NonAdminPermissionManager : PermissionManager
        {
            protected override InternalProjectUserAccessData Data { get; set; } = new();
            public override bool AmAdministrator => false;
        }
    }

    private DummyParatextProjectDataProvider BuildNonAdminProvider(out DummyScrText scrText)
    {
        scrText = new NonAdminScrText();
        var details = CreateProjectDetails(scrText);
        ParatextProjects.FakeAddProject(details, scrText);
        return new DummyParatextProjectDataProvider(
            "nonAdminProject",
            Client,
            details,
            ParatextProjects
        );
    }

    [TestCase(ProjectSettingsNames.PB_MODEL_TEXTS)]
    [TestCase(ProjectSettingsNames.PB_REFERENCED_PROJECTS_AND_RESOURCES)]
    public void SetProjectSetting_NonAdmin_Rejected(string pbSettingName)
    {
        var nonAdmin = BuildNonAdminProvider(out var scrText);
        try
        {
            Assert.Throws<UnauthorizedAccessException>(
                () =>
                    nonAdmin.SetProjectSetting(
                        pbSettingName,
                        Json(new ProjectReference { Name = "P", Id = "aabbcc" })
                    )
            );
        }
        finally
        {
            scrText.Dispose();
        }
    }

    [TestCase(ProjectSettingsNames.PB_MODEL_TEXTS)]
    [TestCase(ProjectSettingsNames.PB_REFERENCED_PROJECTS_AND_RESOURCES)]
    public void SetProjectSetting_Admin_Succeeds(string pbSettingName)
    {
        // Default DummyScrText is administrator via the unshared fallback path.
        Assert.That(
            _provider.SetProjectSetting(
                pbSettingName,
                Json(new ProjectReference { Name = "P", Id = "aabbcc" })
            ),
            Is.True
        );
    }

    private ResourceReferenceList GetList(string pbSettingName) =>
        (ResourceReferenceList)_provider.GetProjectSetting(pbSettingName)!;

    [Test]
    public void AutoPromote_FlaggedModelText_NotInReferenced_IsAppendedToReferenced()
    {
        // Admin flags a model text shown-by-default that is not yet a referenced resource.
        _provider.SetProjectSetting(
            ProjectSettingsNames.PB_MODEL_TEXTS,
            Json(
                new DblResourceReference
                {
                    Name = "D",
                    Id = "112233445566",
                    IsResourceShownByDefault = true,
                }
            )
        );

        var referenced = GetList(ProjectSettingsNames.PB_REFERENCED_PROJECTS_AND_RESOURCES);
        Assert.That(referenced.Items, Has.Count.EqualTo(1));
        var promoted = referenced.Items[0] as DblResourceReference;
        Assert.That(promoted!.Id, Is.EqualTo("112233445566"));
        // The promoted copy preserves the original display name.
        Assert.That(promoted.Name, Is.EqualTo("D"));
        // The promoted copy exists only to drive download; it does not carry the flags.
        Assert.That(promoted.IsResourceShownByDefault, Is.Null);
        Assert.That(promoted.IsResourceShownForUser, Is.Null);
    }

    [Test]
    public void AutoPromote_FlaggedResourceAlreadyInReferenced_IsNoOp()
    {
        _provider.SetProjectSetting(
            ProjectSettingsNames.PB_REFERENCED_PROJECTS_AND_RESOURCES,
            Json(new DblResourceReference { Name = "D", Id = "112233445566" })
        );

        // Flag the same resource in model texts; it is already referenced -> no duplicate.
        _provider.SetProjectSetting(
            ProjectSettingsNames.PB_MODEL_TEXTS,
            Json(
                new DblResourceReference
                {
                    Name = "D",
                    Id = "112233445566",
                    IsResourceShownByDefault = true,
                }
            )
        );

        var referenced = GetList(ProjectSettingsNames.PB_REFERENCED_PROJECTS_AND_RESOURCES);
        Assert.That(referenced.Items, Has.Count.EqualTo(1));
    }

    [Test]
    public void AutoPromote_UnflaggedResources_AreNotPromoted()
    {
        _provider.SetProjectSetting(
            ProjectSettingsNames.PB_MODEL_TEXTS,
            Json(new DblResourceReference { Name = "D", Id = "112233445566" })
        );

        var referenced = GetList(ProjectSettingsNames.PB_REFERENCED_PROJECTS_AND_RESOURCES);
        Assert.That(referenced.Items, Is.Empty);
    }

    [Test]
    public void AutoPromote_WritingReferencedListWithFlaggedEntry_DoesNotDuplicate()
    {
        // The flagged entry is in the very list being written -> already present -> no-op.
        _provider.SetProjectSetting(
            ProjectSettingsNames.PB_REFERENCED_PROJECTS_AND_RESOURCES,
            Json(
                new ProjectReference
                {
                    Name = "P",
                    Id = "aabbcc",
                    IsResourceShownByDefault = true,
                }
            )
        );

        var referenced = GetList(ProjectSettingsNames.PB_REFERENCED_PROJECTS_AND_RESOURCES);
        Assert.That(referenced.Items, Has.Count.EqualTo(1));
    }

    [Test]
    public void AutoPromote_IsIdempotentAcrossRepeatedWrites()
    {
        for (int i = 0; i < 3; i++)
            _provider.SetProjectSetting(
                ProjectSettingsNames.PB_MODEL_TEXTS,
                Json(
                    new DblResourceReference
                    {
                        Name = "D",
                        Id = "112233445566",
                        IsResourceShownByDefault = true,
                    }
                )
            );

        var referenced = GetList(ProjectSettingsNames.PB_REFERENCED_PROJECTS_AND_RESOURCES);
        Assert.That(referenced.Items, Has.Count.EqualTo(1));
    }

    [Test]
    public void Overlay_Get_WhenUnset_ReturnsEmptyMap()
    {
        var overlay = _provider.GetShownByDefaultOverlay();
        Assert.That(overlay, Is.Empty);
    }

    [Test]
    public void Overlay_SetThenGet_RoundTrips()
    {
        var input = new Dictionary<string, bool> { ["aabbcc"] = true, ["ddeeff"] = false };
        Assert.That(_provider.SetShownByDefaultOverlay(input.SerializeToJson()), Is.True);

        var overlay = _provider.GetShownByDefaultOverlay();
        Assert.That(overlay["aabbcc"], Is.True);
        Assert.That(overlay["ddeeff"], Is.False);
    }

    [Test]
    public void Overlay_Get_WithIncompatibleMajorVersion_Throws()
    {
        // Seed the overlay setting directly with a future major version the current build cannot
        // read. "ShownByDefaultOverlay" mirrors ParatextProjectDataProvider.OverlaySettingName
        // (a private const). GetShownByDefaultOverlay must reject it rather than deserialize blindly.
        var userSettings = new UserProjectSettings(_scrText.Directory, _scrText.User.Name);
        userSettings.SetSetting(
            "ShownByDefaultOverlay",
            "2.0.0",
            new XElement(
                "Items",
                new Dictionary<string, bool> { ["aabbcc"] = true }.SerializeToJson()
            )
        );

        Assert.Throws<InvalidDataException>(() => _provider.GetShownByDefaultOverlay());
    }

    [Test]
    public void Overlay_Reset_ClearsMap()
    {
        _provider.SetShownByDefaultOverlay(
            new Dictionary<string, bool> { ["aabbcc"] = true }.SerializeToJson()
        );
        Assert.That(_provider.ResetShownByDefaultOverlay(), Is.True);
        Assert.That(_provider.GetShownByDefaultOverlay(), Is.Empty);
    }

    [Test]
    public void Initialize_FirstOpen_SeedsOverlayFromProjectFlags()
    {
        _provider.SetProjectSetting(
            ProjectSettingsNames.PB_MODEL_TEXTS,
            Json(
                new ProjectReference
                {
                    Name = "P",
                    Id = "aabbcc",
                    IsResourceShownByDefault = true,
                },
                new DblResourceReference
                {
                    Name = "D",
                    Id = "112233445566",
                    IsResourceShownByDefault = false,
                }
            )
        );

        Assert.That(_provider.InitializeShownByDefaultOverlay(), Is.True);

        var overlay = _provider.GetShownByDefaultOverlay();
        Assert.That(overlay["aabbcc"], Is.True);
        Assert.That(overlay["112233445566"], Is.False);
    }

    [Test]
    public void Initialize_IgnoresUnflaggedAndNonBibleTextEntries()
    {
        _provider.SetProjectSetting(
            ProjectSettingsNames.PB_MODEL_TEXTS,
            Json(
                new ProjectReference { Name = "P", Id = "aabbcc" }, // unflagged -> skipped
                new EnhancedResourceReference { Name = "Enh" } // non-Bible-text -> skipped
            )
        );

        _provider.InitializeShownByDefaultOverlay();

        Assert.That(_provider.GetShownByDefaultOverlay(), Is.Empty);
    }

    [Test]
    public void Initialize_SubsequentOpen_IsNoOp_AndDoesNotClobber()
    {
        _provider.SetProjectSetting(
            ProjectSettingsNames.PB_MODEL_TEXTS,
            Json(
                new ProjectReference
                {
                    Name = "P",
                    Id = "aabbcc",
                    IsResourceShownByDefault = true,
                }
            )
        );
        Assert.That(_provider.InitializeShownByDefaultOverlay(), Is.True);

        // User un-checks the resource in their overlay.
        _provider.SetShownByDefaultOverlay(
            new Dictionary<string, bool> { ["aabbcc"] = false }.SerializeToJson()
        );

        // A later open must NOT re-init (must not re-check the user's un-check).
        Assert.That(_provider.InitializeShownByDefaultOverlay(), Is.False);
        Assert.That(_provider.GetShownByDefaultOverlay()["aabbcc"], Is.False);
    }

    [Test]
    public void Initialize_AfterReset_ReInitializes()
    {
        _provider.SetProjectSetting(
            ProjectSettingsNames.PB_MODEL_TEXTS,
            Json(
                new ProjectReference
                {
                    Name = "P",
                    Id = "aabbcc",
                    IsResourceShownByDefault = true,
                }
            )
        );
        _provider.InitializeShownByDefaultOverlay();
        _provider.ResetShownByDefaultOverlay();

        Assert.That(_provider.InitializeShownByDefaultOverlay(), Is.True);
        Assert.That(_provider.GetShownByDefaultOverlay()["aabbcc"], Is.True);
    }

    [Test]
    public void AutoPromote_UnparseableReferencedList_IsLeftUntouched()
    {
        // A future-major or corrupted stored value must never be clobbered by auto-promote
        // (the downstream private S/R reader keys on the major version).
        _scrText.Settings.ParametersDictionary[
            ProjectSettingsNames.PT_REFERENCED_PROJECTS_AND_RESOURCES
        ] = """2.0.0 {"dataVersion":"2.0.0","items":[{"type":"futureType","name":"F"}]}""";

        _provider.SetProjectSetting(
            ProjectSettingsNames.PB_MODEL_TEXTS,
            Json(
                new DblResourceReference
                {
                    Name = "D",
                    Id = "112233445566",
                    IsResourceShownByDefault = true,
                }
            )
        );

        string stored = _scrText.Settings.ParametersDictionary[
            ProjectSettingsNames.PT_REFERENCED_PROJECTS_AND_RESOURCES
        ];
        Assert.That(stored, Does.StartWith("2.0.0 "));
        Assert.That(stored, Does.Contain("futureType"));
    }

    [Test]
    public void Initialize_ReadsFlagsFromReferencedProjectsAndResources()
    {
        // Regression guard: the init loop must read BOTH project-scope lists, not just ModelTexts.
        _provider.SetProjectSetting(
            ProjectSettingsNames.PB_REFERENCED_PROJECTS_AND_RESOURCES,
            Json(
                new DblResourceReference
                {
                    Name = "D",
                    Id = "112233445566",
                    IsResourceShownByDefault = true,
                }
            )
        );

        Assert.That(_provider.InitializeShownByDefaultOverlay(), Is.True);
        Assert.That(_provider.GetShownByDefaultOverlay()["112233445566"], Is.True);
    }
}

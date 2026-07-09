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

    [Test]
    public void SetProjectSetting_NonAdmin_ReferencedList_Rejected()
    {
        // Only the referenced-resources list carries the admin-only shown-by-default default, so it
        // is the only project-scope write gated to administrators.
        var nonAdmin = BuildNonAdminProvider(out var scrText);
        try
        {
            Assert.Throws<UnauthorizedAccessException>(
                () =>
                    nonAdmin.SetProjectSetting(
                        ProjectSettingsNames.PB_REFERENCED_PROJECTS_AND_RESOURCES,
                        Json(new ProjectReference { Name = "P", Id = "aabbcc" })
                    )
            );
        }
        finally
        {
            scrText.Dispose();
        }
    }

    [Test]
    public void SetProjectSetting_NonAdmin_ModelTexts_Allowed()
    {
        // Model texts do NOT participate in shown-by-default and keep their pre-existing ungated
        // behavior, so a non-admin write must succeed (not throw).
        var nonAdmin = BuildNonAdminProvider(out var scrText);
        try
        {
            Assert.That(
                nonAdmin.SetProjectSetting(
                    ProjectSettingsNames.PB_MODEL_TEXTS,
                    Json(new ProjectReference { Name = "P", Id = "aabbcc" })
                ),
                Is.True
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

    [Test]
    public void SetProjectSetting_NonAdmin_ReferencedList_GateRunsBeforeValidation()
    {
        // The admin gate is enforced ahead of the ProjectSettingsService.isValid round-trip, so an
        // unauthorized write is rejected even when validation would fail. Stub isValid -> false and
        // assert the UnauthorizedAccessException (not an InvalidDataException) surfaces.
        Client.RemoveRequestHandler("object:ProjectSettingsService.isValid");
        Client
            .RegisterRequestHandlerAsync(
                "object:ProjectSettingsService.isValid",
                new Func<string, object?, object?, object?, bool>((k, n, c, a) => false),
                null
            )
            .GetAwaiter()
            .GetResult();

        var nonAdmin = BuildNonAdminProvider(out var scrText);
        try
        {
            Assert.Throws<UnauthorizedAccessException>(
                () =>
                    nonAdmin.SetProjectSetting(
                        ProjectSettingsNames.PB_REFERENCED_PROJECTS_AND_RESOURCES,
                        Json(new ProjectReference { Name = "P", Id = "aabbcc" })
                    )
            );
        }
        finally
        {
            scrText.Dispose();
        }
    }

    private ResourceReferenceList GetList(string pbSettingName) =>
        (ResourceReferenceList)_provider.GetProjectSetting(pbSettingName)!;

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

    [TestCase("null")] // JSON null literal -> deserializes to null
    [TestCase("")] // empty value -> treated as nothing to store
    public void Overlay_Set_WithNullOrEmptyValue_Throws(string json)
    {
        // SetShownByDefaultOverlay must reject a value that does not yield a { id -> bool } map
        // rather than storing garbage. (Wrong-shape JSON such as an array or number throws a
        // JsonException earlier in deserialization; this covers the explicit null-map guard.)
        Assert.Throws<InvalidDataException>(() => _provider.SetShownByDefaultOverlay(json));
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
            ProjectSettingsNames.PB_REFERENCED_PROJECTS_AND_RESOURCES,
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
            ProjectSettingsNames.PB_REFERENCED_PROJECTS_AND_RESOURCES,
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
        _provider.InitializeShownByDefaultOverlay();
        _provider.ResetShownByDefaultOverlay();

        Assert.That(_provider.InitializeShownByDefaultOverlay(), Is.True);
        Assert.That(_provider.GetShownByDefaultOverlay()["aabbcc"], Is.True);
    }

    [Test]
    public void Initialize_IgnoresModelTextFlags()
    {
        // Model texts are decoupled from shown-by-default: a flag set on the model-texts list must
        // NOT seed the overlay. Only PB_REFERENCED_PROJECTS_AND_RESOURCES feeds first-open init.
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

        Assert.That(_provider.InitializeShownByDefaultOverlay(), Is.True);
        Assert.That(_provider.GetShownByDefaultOverlay(), Is.Empty);
    }

    [Test]
    public void Initialize_ReadsFlagsFromReferencedProjectsAndResources()
    {
        // Regression guard: the init loop reads the referenced-projects-and-resources list.
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

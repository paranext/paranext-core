using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Projects;
using Paranext.DataProvider.Services;
using Paratext.Data;
using Paratext.Data.Users;

namespace TestParanextDataProvider.Projects;

/// <summary>
/// Covers the computed <c>platform.isRegistered</c> and <c>platform.isCurrentUserAdministrator</c>
/// settings, and the writes they lock: a registered project's short and full names change only
/// through the registry, and only a project administrator can change the project's language.
/// </summary>
[ExcludeFromCodeCoverage]
[TestFixture]
internal class ParatextProjectDataProviderSettingLocksTests : PapiTestBase
{
    private const string PdpName = "settingLocksTestProject";

    private DummyScrText _scrText = null!;
    private DummyParatextProjectDataProvider _provider = null!;

    [SetUp]
    public override async Task TestSetupAsync()
    {
        await base.TestSetupAsync();

        await Client.RegisterRequestHandlerAsync(
            "object:ProjectSettingsService.isValid",
            new Func<string, object?, object?, object?, bool>(
                (key, newValue, currentValue, allChanges) => true
            ),
            null
        );
    }

    [TearDown]
    public void TearDown()
    {
        _scrText?.Dispose();
    }

    private void UseProject(DummyScrText scrText)
    {
        _scrText = scrText;
        ProjectDetails projectDetails = CreateProjectDetails(scrText);
        ParatextProjects.FakeAddProject(projectDetails, scrText);
        _provider = new DummyParatextProjectDataProvider(
            PdpName,
            Client,
            projectDetails,
            ParatextProjects
        );
    }

    [Test]
    public void GetProjectSetting_LocalProject_IsNotRegisteredAndUserIsAdministrator()
    {
        UseProject(CreateDummyProject());

        Assert.Multiple(() =>
        {
            Assert.That(
                _provider.GetProjectSetting(ProjectSettingsNames.PB_IS_REGISTERED),
                Is.False
            );
            Assert.That(
                _provider.GetProjectSetting(ProjectSettingsNames.PB_IS_CURRENT_USER_ADMINISTRATOR),
                Is.True
            );
        });
    }

    [Test]
    public void GetProjectSetting_RegisteredProjectWithoutAdminRole_IsRegisteredAndUserIsNotAdministrator()
    {
        UseProject(new PermissionsScrText(isRegistered: true, isAdministrator: false));

        Assert.Multiple(() =>
        {
            Assert.That(
                _provider.GetProjectSetting(ProjectSettingsNames.PB_IS_REGISTERED),
                Is.True
            );
            Assert.That(
                _provider.GetProjectSetting(ProjectSettingsNames.PB_IS_CURRENT_USER_ADMINISTRATOR),
                Is.False
            );
        });
    }

    [Test]
    public void GetProjectSetting_SharedButUnregisteredProject_IsNotRegistered()
    {
        var scrText = new PermissionsScrText(isRegistered: false, isAdministrator: true);
        UseProject(scrText);

        Assert.Multiple(() =>
        {
            // Shared (it has a permissions file) is not the same as registered.
            Assert.That(scrText.IsProjectShared, Is.True);
            Assert.That(
                _provider.GetProjectSetting(ProjectSettingsNames.PB_IS_REGISTERED),
                Is.False
            );
        });
    }

    [TestCase(ProjectSettingsNames.PB_IS_REGISTERED)]
    [TestCase(ProjectSettingsNames.PB_IS_CURRENT_USER_ADMINISTRATOR)]
    public void SetProjectSetting_ComputedSetting_ThrowsInvalidOperationException(
        string settingName
    )
    {
        UseProject(CreateDummyProject());

        var ex = Assert.Throws<InvalidOperationException>(
            () => _provider.SetProjectSetting(settingName, true)
        );

        Assert.That(ex!.Message, Does.Contain(settingName));
    }

    [TestCase(ProjectSettingsNames.PB_NAME, "NEWNAME")]
    [TestCase(ProjectSettingsNames.PB_FULL_NAME, "New full name")]
    public void SetProjectSetting_NameOfRegisteredProject_ThrowsAndLeavesNameUnchanged(
        string settingName,
        string newValue
    )
    {
        UseProject(new PermissionsScrText(isRegistered: true, isAdministrator: true));
        object? before = _provider.GetProjectSetting(settingName);

        Assert.Throws<InvalidOperationException>(
            () => _provider.SetProjectSetting(settingName, newValue)
        );

        Assert.That(_provider.GetProjectSetting(settingName), Is.EqualTo(before));
    }

    [Test]
    public void SetProjectSetting_FullNameOfSharedButUnregisteredProject_IsWritten()
    {
        UseProject(new PermissionsScrText(isRegistered: false, isAdministrator: true));

        _provider.SetProjectSetting(ProjectSettingsNames.PB_FULL_NAME, "New full name");

        Assert.That(
            _provider.GetProjectSetting(ProjectSettingsNames.PB_FULL_NAME),
            Is.EqualTo("New full name")
        );
    }

    [Test]
    public void SetProjectSetting_LanguageWithoutAdminRole_ThrowsAndLeavesLanguageUnchanged()
    {
        UseProject(new PermissionsScrText(isRegistered: true, isAdministrator: false));
        _scrText.Settings.ParametersDictionary[ProjectSettingsNames.PT_LANGUAGE] = "English";

        Assert.Throws<UnauthorizedAccessException>(
            () => _provider.SetProjectSetting(ProjectSettingsNames.PB_LANGUAGE, "French")
        );

        Assert.That(
            _provider.GetProjectSetting(ProjectSettingsNames.PB_LANGUAGE),
            Is.EqualTo("English")
        );
    }

    [Test]
    public void SetProjectSetting_LanguageAsAdministratorOfRegisteredProject_IsWritten()
    {
        UseProject(new PermissionsScrText(isRegistered: true, isAdministrator: true));

        _provider.SetProjectSetting(ProjectSettingsNames.PB_LANGUAGE, "French");

        Assert.That(
            _provider.GetProjectSetting(ProjectSettingsNames.PB_LANGUAGE),
            Is.EqualTo("French")
        );
    }

    /// <summary>
    /// A shared project (one with a permissions file) that is or is not registered, and whose
    /// current user has or lacks the administrator role.
    /// </summary>
    private sealed class PermissionsScrText(bool isRegistered, bool isAdministrator) : DummyScrText
    {
        private readonly FakePermissionManager _permissions = new(isRegistered, isAdministrator);

        public override PermissionManager Permissions => _permissions;

        private sealed class FakePermissionManager(bool isRegistered, bool isAdministrator)
            : PermissionManager
        {
            // Non-null Data makes HasPermissionsDefined true, which makes ScrText.IsProjectShared
            // true.
            protected override InternalProjectUserAccessData Data { get; set; } =
                new InternalProjectUserAccessData();

            // An unregistered project's license is Limited; a registered one's is Normal or
            // Publishable.
            public override ProjectLicenseType LicenseType =>
                isRegistered ? ProjectLicenseType.Normal : ProjectLicenseType.Limited;

            public override bool AmAdministrator => isAdministrator;
        }
    }
}

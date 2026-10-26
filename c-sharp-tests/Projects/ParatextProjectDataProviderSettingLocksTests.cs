using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Projects;
using Paranext.DataProvider.Services;
using Paratext.Data;
using Paratext.Data.Users;

namespace TestParanextDataProvider.Projects;

/// <summary>
/// Covers the computed <c>platform.isShared</c> and <c>platform.isCurrentUserAdministrator</c>
/// settings, and the writes they lock: a shared project's short and full names change only
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
    public void GetProjectSetting_UnsharedProject_IsNotSharedAndUserIsAdministrator()
    {
        UseProject(CreateDummyProject());

        Assert.Multiple(() =>
        {
            Assert.That(_provider.GetProjectSetting(ProjectSettingsNames.PB_IS_SHARED), Is.False);
            Assert.That(
                _provider.GetProjectSetting(ProjectSettingsNames.PB_IS_CURRENT_USER_ADMINISTRATOR),
                Is.True
            );
        });
    }

    [Test]
    public void GetProjectSetting_SharedProjectWithoutAdminRole_IsSharedAndUserIsNotAdministrator()
    {
        UseProject(new SharedScrText(isAdministrator: false));

        Assert.Multiple(() =>
        {
            Assert.That(_provider.GetProjectSetting(ProjectSettingsNames.PB_IS_SHARED), Is.True);
            Assert.That(
                _provider.GetProjectSetting(ProjectSettingsNames.PB_IS_CURRENT_USER_ADMINISTRATOR),
                Is.False
            );
        });
    }

    [TestCase(ProjectSettingsNames.PB_IS_SHARED)]
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
    public void SetProjectSetting_NameOfSharedProject_ThrowsAndLeavesNameUnchanged(
        string settingName,
        string newValue
    )
    {
        UseProject(new SharedScrText(isAdministrator: true));
        object? before = _provider.GetProjectSetting(settingName);

        Assert.Throws<InvalidOperationException>(
            () => _provider.SetProjectSetting(settingName, newValue)
        );

        Assert.That(_provider.GetProjectSetting(settingName), Is.EqualTo(before));
    }

    [Test]
    public void SetProjectSetting_FullNameOfUnsharedProject_IsWritten()
    {
        UseProject(CreateDummyProject());

        _provider.SetProjectSetting(ProjectSettingsNames.PB_FULL_NAME, "New full name");

        Assert.That(
            _provider.GetProjectSetting(ProjectSettingsNames.PB_FULL_NAME),
            Is.EqualTo("New full name")
        );
    }

    [Test]
    public void SetProjectSetting_LanguageWithoutAdminRole_ThrowsAndLeavesLanguageUnchanged()
    {
        UseProject(new SharedScrText(isAdministrator: false));
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
    public void SetProjectSetting_LanguageAsAdministratorOfSharedProject_IsWritten()
    {
        UseProject(new SharedScrText(isAdministrator: true));

        _provider.SetProjectSetting(ProjectSettingsNames.PB_LANGUAGE, "French");

        Assert.That(
            _provider.GetProjectSetting(ProjectSettingsNames.PB_LANGUAGE),
            Is.EqualTo("French")
        );
    }

    /// <summary>
    /// A shared project (one that takes part in Send/Receive) whose current user has or lacks the
    /// administrator role.
    /// </summary>
    private sealed class SharedScrText(bool isAdministrator) : DummyScrText
    {
        private readonly SharedPermissionManager _permissions = new(isAdministrator);

        public override PermissionManager Permissions => _permissions;

        private sealed class SharedPermissionManager(bool isAdministrator) : PermissionManager
        {
            // Non-null Data makes HasPermissionsDefined true, which makes ScrText.IsProjectShared
            // true.
            protected override InternalProjectUserAccessData Data { get; set; } =
                new InternalProjectUserAccessData();

            public override bool AmAdministrator => isAdministrator;
        }
    }
}

using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Projects;
using Paratext.Data;
using Paratext.Data.ProjectSettingsAccess;
using Paratext.Data.Users;

namespace TestParanextDataProvider.Projects
{
    [ExcludeFromCodeCoverage]
    internal class ParatextProjectDataProviderScriptureEditPermissionsTests : PapiTestBase
    {
        private const string PdpName = "scriptureEditPermissionsTestProject";

        private ScrText _scrText = null!;
        private ProjectDetails _projectDetails = null!;
        private DummyParatextProjectDataProvider _provider = null!;

        [SetUp]
        public override async Task TestSetupAsync()
        {
            await base.TestSetupAsync();

            _scrText = CreateDummyProject();
            _projectDetails = CreateProjectDetails(_scrText);
            ParatextProjects.FakeAddProject(_projectDetails, _scrText);

            _provider = new DummyParatextProjectDataProvider(
                PdpName,
                Client,
                _projectDetails,
                ParatextProjects
            );
            await _provider.RegisterDataProviderAsync();
        }

        [TearDown]
        public void TearDown()
        {
            _scrText?.Dispose();
        }

        [Test]
        public void CanUserEditScripture_ProjectRemovedFromCollection_ReturnsFalse()
        {
            // Arrange - simulate a project being deleted while the provider is still alive
            ScrTextCollection.Remove(_scrText, false);

            // Act
            bool canEdit = _provider.CanUserEditScripture();

            // Assert
            Assert.That(
                canEdit,
                Is.False,
                "Should return false when the project has been removed from the collection"
            );
        }

        [Test]
        public void CanUserEditScripture_NormalProject_ReturnsTrue()
        {
            // Act
            bool canEdit = _provider.CanUserEditScripture();

            // Assert
            Assert.That(
                canEdit,
                Is.True,
                "Default user should have a non-Observer role on a normal project and be able to edit Scripture"
            );
        }

        [Test]
        public void GetCanUserEditScripture_NormalProject_ReturnsTrue()
        {
            // Act
            bool canEdit = _provider.GetCanUserEditScripture();

            // Assert
            Assert.That(
                canEdit,
                Is.True,
                "The reactive getter must agree with CanUserEditScripture on a normal project"
            );
        }

        [Test]
        public void GetCanUserEditScripture_ObserverRole_ReturnsFalse()
        {
            // Arrange
            var observer = new ObserverScrText();
            var details = CreateProjectDetails(observer);
            ParatextProjects.FakeAddProject(details, observer);
            var observerProvider = new DummyParatextProjectDataProvider(
                "scriptureEditPermissionsObserverTestProject",
                Client,
                details,
                ParatextProjects
            );

            // Act
            bool canEdit = observerProvider.GetCanUserEditScripture();

            // Assert
            Assert.That(canEdit, Is.False, "An Observer-role user must not be able to edit Scripture");
        }

        [Test]
        public void SendFullProjectUpdateEvent_AfterRegistration_FiresDataUpdateEvent()
        {
            // Arrange
            int eventsBefore = Client.SentEventCount;

            // Act
            _provider.SendFullProjectUpdateEvent();

            // Assert: CanUserEditScripture subscribers (via getCanUserEditScripture) refresh off this
            // same wildcard event — no per-data-type wiring was added for the new getter.
            Assert.That(
                Client.SentEventCount,
                Is.GreaterThan(eventsBefore),
                "Expected SendFullProjectUpdateEvent to fire a data update event"
            );
        }

        /// <summary>
        /// Test-local ScrText for the Observer role. HaveRoleNotObserver is computed by the base
        /// PermissionManager from Data.Users, so populating it with an Observer-role entry for the
        /// current user is enough - no override of HaveRoleNotObserver itself is needed. Mirrors the
        /// seam in CreateBooksServiceTests.ObserverScrText.
        /// </summary>
        private sealed class ObserverScrText : DummyScrText
        {
            private readonly ObserverPermissionManager _permissions = new();

            public override PermissionManager Permissions => _permissions;

            private sealed class ObserverPermissionManager : PermissionManager
            {
                protected override InternalProjectUserAccessData Data { get; set; } = BuildData();

                public override bool AmAdministrator => false;

                private static InternalProjectUserAccessData BuildData()
                {
                    var data = new InternalProjectUserAccessData();
                    data.Users.Add(
                        new InternalProjectUserAccess(
                            RegistrationInfo.DefaultUser.Name,
                            UserRoles.Observer
                        )
                    );
                    return data;
                }
            }
        }
    }
}

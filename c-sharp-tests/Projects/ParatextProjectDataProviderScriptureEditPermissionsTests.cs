using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Projects;
using Paratext.Data;

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
    }
}

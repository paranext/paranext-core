using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Projects;
using Paratext.Data;

namespace TestParanextDataProvider.Projects
{
    [ExcludeFromCodeCoverage]
    internal class ParatextProjectDataProviderTextConnectionSettingsTests : PapiTestBase
    {
        private const string PdpName = "textConnectionSettingsTestProject";

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
        public void CanUserWriteProjectTextConnectionSettings_ProjectRemovedFromCollection_ReturnsFalse()
        {
            // Arrange - simulate a project being deleted while the provider is still alive
            ScrTextCollection.Remove(_scrText, false);

            // Act
            bool canWrite = _provider.CanUserWriteProjectTextConnectionSettings();

            // Assert
            Assert.That(
                canWrite,
                Is.False,
                "Should return false when the project has been removed from the collection"
            );
        }

        [Test]
        public void CanUserWriteProjectTextConnectionSettings_NormalProject_ReturnsTrue()
        {
            // Act
            bool canWrite = _provider.CanUserWriteProjectTextConnectionSettings();

            // Assert
            Assert.That(
                canWrite,
                Is.True,
                "Default user should have write permission on text connection project settings in a normal project"
            );
        }
    }
}

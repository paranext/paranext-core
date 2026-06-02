using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Projects;
using Paranext.DataProvider.Services;
using Paratext.Data;

namespace TestParanextDataProvider.Projects
{
    [ExcludeFromCodeCoverage]
    internal class ParatextProjectDataProviderIsPublishedTests : PapiTestBase
    {
        private const string PdpName = "isPublishedTestProject";

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
        public void GetProjectSetting_IsPublished_UnpublishedProject_ReturnsFalse()
        {
            // The test project here has not been set up as a published project (see
            // CreateDummyProject in PapiTestBase), so platform.isPublished should come back as
            // false.
            object? value = _provider.GetProjectSetting(ProjectSettingsNames.PB_IS_PUBLISHED);

            Assert.That(value, Is.False);
        }

        [Test]
        public void SetProjectSetting_IsPublished_TrueValue_ThrowsInvalidOperationException()
        {
            // platform.isPublished is a read-only setting; writes must be rejected with
            // InvalidOperationException so the platform side surfaces a clear error instead of
            // silently accepting the value.
            var ex = Assert.Throws<InvalidOperationException>(
                () => _provider.SetProjectSetting(ProjectSettingsNames.PB_IS_PUBLISHED, true)
            );

            Assert.That(ex!.Message, Does.Contain(ProjectSettingsNames.PB_IS_PUBLISHED));
            Assert.That(ex.Message, Does.Contain("read-only"));
        }

        [Test]
        public void SetProjectSetting_IsPublished_FalseValue_ThrowsInvalidOperationException()
        {
            // The read-only check fires regardless of value polarity — writing false is still a
            // write, and must throw.
            Assert.Throws<InvalidOperationException>(
                () => _provider.SetProjectSetting(ProjectSettingsNames.PB_IS_PUBLISHED, false)
            );
        }
    }
}

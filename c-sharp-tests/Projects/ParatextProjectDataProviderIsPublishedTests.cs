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
        public void GetProjectSetting_IsPublished_NonResourceProject_ReturnsFalse()
        {
            // A plain DummyScrText is not a resource project, so platform.isPublished should
            // mirror ScrText.IsResourceProject and come back as false. This pins the
            // GetProjectSetting branch added for PB_IS_PUBLISHED.
            object? value = _provider.GetProjectSetting(ProjectSettingsNames.PB_IS_PUBLISHED);

            Assert.That(value, Is.False);
        }

        [Test]
        public void SetProjectSetting_IsPublished_TrueValue_ThrowsInvalidOperationException()
        {
            // platform.isPublished is computed read-only from ScrText.IsResourceProject; writes
            // must be rejected with InvalidOperationException so the platform side surfaces a
            // clear error instead of silently accepting the value.
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
            // write, and must throw to preserve the invariant that the setting only ever
            // reflects ScrText.IsResourceProject.
            Assert.Throws<InvalidOperationException>(
                () => _provider.SetProjectSetting(ProjectSettingsNames.PB_IS_PUBLISHED, false)
            );
        }
    }
}

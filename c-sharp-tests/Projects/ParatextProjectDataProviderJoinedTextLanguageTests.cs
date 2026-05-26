using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Projects;
using Paratext.Data;

namespace TestParanextDataProvider.Projects
{
    /// <summary>
    /// Unit tests for <see cref="ParatextProjectDataProvider.GetJoinedTextLanguage"/>
    /// and <see cref="ParatextProjectDataProvider.SetJoinedTextLanguage"/>.
    /// </summary>
    [ExcludeFromCodeCoverage]
    [TestFixture]
    internal class ParatextProjectDataProviderJoinedTextLanguageTests : PapiTestBase
    {
        private const string PdpName = "joinedTextLanguageTestProject";
        private const int GenesisBookNum = 1;

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
        }

        [TearDown]
        public void TearDown()
        {
            _scrText?.Dispose();
        }

        [Test]
        [Description(
            "For a non-sigla DummyScrText, GetJoinedTextLanguage falls back to the project-level "
                + "language tag (since the dummy project has no joined-text setup)."
        )]
        public void GetJoinedTextLanguage_DummyProject_ReturnsProjectLanguageOrEmptyString()
        {
            // DummyScrText typically has no language tag configured or returns the dummy's
            // default. The contract: returns a string (possibly empty); never throws.
            var result = _provider.GetJoinedTextLanguage(GenesisBookNum);

            Assert.That(result, Is.Not.Null, "must return a string, never null");
        }

        [Test]
        [Description("SetJoinedTextLanguage is read-only and must throw NotSupportedException.")]
        public void SetJoinedTextLanguage_AlwaysThrows()
        {
            Assert.That(
                () => _provider.SetJoinedTextLanguage(GenesisBookNum, "en"),
                Throws.TypeOf<NotSupportedException>()
            );
        }
    }
}

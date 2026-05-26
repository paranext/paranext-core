using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Projects;
using Paratext.Data;

namespace TestParanextDataProvider.Projects
{
    /// <summary>
    /// Unit tests for <see cref="ParatextProjectDataProvider.GetHeadingMarkers"/>
    /// and <see cref="ParatextProjectDataProvider.SetHeadingMarkers"/>.
    ///
    /// <para>
    /// Setup mirrors <see cref="ParatextProjectDataProviderVersificationTests"/>:
    /// a <see cref="DummyScrText"/> is created and registered via
    /// <c>ParatextProjects.FakeAddProject</c>, then we construct a
    /// <see cref="DummyParatextProjectDataProvider"/> that subclasses the real PDP and
    /// exposes its registered methods directly.
    /// </para>
    /// </summary>
    [ExcludeFromCodeCoverage]
    [TestFixture]
    internal class ParatextProjectDataProviderHeadingMarkersTests : PapiTestBase
    {
        private const string PdpName = "headingMarkersTestProject";
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
            "GetHeadingMarkers returns the markers from the stylesheet where "
                + "StyleType == scParagraphStyle AND TextType == scSection. "
                + "Default Paratext stylesheet should include at least 's', 'ms', 'mr' headings."
        )]
        public void GetHeadingMarkers_DefaultStylesheet_IncludesStandardHeadingMarkers()
        {
            var result = _provider.GetHeadingMarkers(GenesisBookNum);

            Assert.That(result, Is.Not.Null);
            Assert.That(result, Is.Not.Empty);
            // Standard USFM heading markers in default Paratext stylesheet.
            Assert.That(result, Contains.Item("s"));
        }

        [Test]
        [Description(
            "GetHeadingMarkers should never include non-paragraph markers (e.g. 'c', 'v')."
        )]
        public void GetHeadingMarkers_DefaultStylesheet_ExcludesChapterAndVerseMarkers()
        {
            var result = _provider.GetHeadingMarkers(GenesisBookNum);

            Assert.That(result, Does.Not.Contain("c"), "chapter marker should not be a heading");
            Assert.That(result, Does.Not.Contain("v"), "verse marker should not be a heading");
        }

        [Test]
        [Description(
            "GetHeadingMarkers should not include scVerseText paragraph markers like 'p'."
        )]
        public void GetHeadingMarkers_DefaultStylesheet_ExcludesBodyParagraphMarkers()
        {
            var result = _provider.GetHeadingMarkers(GenesisBookNum);

            Assert.That(
                result,
                Does.Not.Contain("p"),
                "p is scVerseText, not scSection — should not be a heading"
            );
        }

        [Test]
        [Description("SetHeadingMarkers is read-only and must throw NotSupportedException.")]
        public void SetHeadingMarkers_AlwaysThrows()
        {
            Assert.That(
                () => _provider.SetHeadingMarkers(GenesisBookNum, new[] { "s" }),
                Throws.TypeOf<NotSupportedException>()
            );
        }
    }
}

using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Projects;
using Paratext.Data;

namespace TestParanextDataProvider.Projects
{
    /// <summary>
    /// Unit tests for <see cref="ParatextProjectDataProvider.GetStyleInfo"/> — the method
    /// registered under the <c>platformScripture.StyleInfo</c> projectInterface that serializes
    /// the project's merged stylesheet (usfm.sty + custom.sty, merged for free by ParatextData's
    /// <c>ScrStylesheet</c>) into the scripture-editors <c>StyleInfo</c> wire shape.
    ///
    /// <para>
    /// Setup follows the same pattern used by
    /// <see cref="ParatextProjectDataProviderVersificationTests"/>: a <see cref="DummyScrText"/>
    /// (which installs a <see cref="DummyScrStylesheet"/> via <c>AddTag</c>) is created and
    /// registered via <c>ParatextProjects.FakeAddProject</c>, then a
    /// <see cref="DummyParatextProjectDataProvider"/> gives direct in-process access to the
    /// registered methods.
    /// </para>
    /// </summary>
    [ExcludeFromCodeCoverage]
    [TestFixture]
    internal class ParatextProjectDataProviderStyleInfoTests : PapiTestBase
    {
        private const string PdpName = "styleInfoTestProject";
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
        public void GetStyleInfo_ReturnsMarkersWithStyleTypes()
        {
            var result = _provider.GetStyleInfo(GenesisBookNum);

            Assert.That(result.Markers, Is.Not.Empty);
            Assert.That(result.Markers.ContainsKey("ip"), Is.True);
            Assert.That(result.Markers["ip"].StyleType, Is.EqualTo("paragraph"));
        }

        [Test]
        [Description(
            "The 'v' tag (a character style) must round-trip as 'character', confirming the "
                + "StyleType mapping isn't hard-coded to paragraph."
        )]
        public void GetStyleInfo_CharacterStyleTag_MapsToCharacterStyleType()
        {
            var result = _provider.GetStyleInfo(GenesisBookNum);

            Assert.That(result.Markers.ContainsKey("v"), Is.True);
            Assert.That(result.Markers["v"].StyleType, Is.EqualTo("character"));
        }

        [Test]
        public void GetStyleInfo_SkipsDerivedEndTags()
        {
            var result = _provider.GetStyleInfo(GenesisBookNum);

            Assert.That(result.Markers.Keys.Any(k => k.EndsWith("*")), Is.False);
        }

        [Test]
        [Description(
            "DummyScrStylesheet's 'w' tag has endMarker 'w*', which AddTag adds as a second "
                + "scEndStyle-typed tag. GetStyleInfo must skip it while still emitting 'w' with "
                + "its EndMarker property carrying the closer."
        )]
        public void GetStyleInfo_EndMarkerTagIsSkipped_ButBaseTagCarriesEndMarker()
        {
            var result = _provider.GetStyleInfo(GenesisBookNum);

            Assert.That(result.Markers.ContainsKey("w*"), Is.False);
            Assert.That(result.Markers.ContainsKey("w"), Is.True);
            Assert.That(result.Markers["w"].EndMarker, Is.EqualTo("w*"));
        }

        [Test]
        [Description(
            "'id' is a paragraph-style tag with scNonpublishable | scNonvernacular | scParagraph "
                + "| scBook TextProperties set in DummyScrStylesheet — confirms the TextProperties "
                + "flags->name mapping round-trips real flag combinations, not just a single flag."
        )]
        public void GetStyleInfo_IdTag_ReportsExpectedTextProperties()
        {
            var result = _provider.GetStyleInfo(GenesisBookNum);

            Assert.That(result.Markers.ContainsKey("id"), Is.True);
            var textProperties = result.Markers["id"].TextProperties;
            Assert.That(textProperties, Is.Not.Null);
            Assert.That(
                textProperties,
                Is.EquivalentTo(new[] { "paragraph", "book", "nonpublishable", "nonvernacular" })
            );
        }

        [Test]
        [Description(
            "'v' has only scVerse | scPublishable set in DummyScrStylesheet, so NotRepeatable, "
                + "Bold, Italic, etc. (never set on the dummy tag) must all be omitted (null), "
                + "not merely false/0."
        )]
        public void GetStyleInfo_UnsetOptionalProperties_AreNull()
        {
            var result = _provider.GetStyleInfo(GenesisBookNum);

            var v = result.Markers["v"];
            Assert.That(v.NotRepeatable, Is.Null);
            Assert.That(v.Bold, Is.Null);
            Assert.That(v.Italic, Is.Null);
            Assert.That(v.Underline, Is.Null);
            Assert.That(v.SmallCaps, Is.Null);
            Assert.That(v.Subscript, Is.Null);
            Assert.That(v.Superscript, Is.Null);
            Assert.That(v.Color, Is.Null);
            Assert.That(v.Justification, Is.Null);
            Assert.That(v.FirstLineIndent, Is.Null);
            Assert.That(v.LeftMargin, Is.Null);
            Assert.That(v.RightMargin, Is.Null);
            Assert.That(v.SpaceBefore, Is.Null);
            Assert.That(v.SpaceAfter, Is.Null);
            Assert.That(v.LineSpacing, Is.Null);
            Assert.That(v.Description, Is.Null);
            Assert.That(v.FontName, Is.Null);
            Assert.That(v.FontSize, Is.Null);
        }

        [Test]
        [Description(
            "'p' has occursUnder 'c' in DummyScrStylesheet, so OccursUnder must surface it as a "
                + "single-element array."
        )]
        public void GetStyleInfo_OccursUnder_ReflectsDummyStylesheet()
        {
            var result = _provider.GetStyleInfo(GenesisBookNum);

            Assert.That(result.Markers["p"].OccursUnder, Is.EquivalentTo(new[] { "c" }));
        }

        [Test]
        [Description(
            "GetStyleInfo's default font/size must match the exact ScrText accessors PT9's "
                + "CSSCreator.CreateUsfmCss(ScrText, ...) reads — ScrText.Language.FontName / "
                + "ScrText.Language.FontSize — confirming the wiring, not a hard-coded value."
        )]
        public void GetStyleInfo_DefaultFontAndSize_MatchScrTextLanguage()
        {
            var result = _provider.GetStyleInfo(GenesisBookNum);

            Assert.That(result.DefaultFont, Is.EqualTo(_scrText.Language.FontName));
            Assert.That(result.DefaultFontSize, Is.EqualTo((double)_scrText.Language.FontSize));
        }
    }
}

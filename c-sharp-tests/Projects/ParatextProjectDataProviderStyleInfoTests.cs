using System.Diagnostics.CodeAnalysis;
using System.Text.Json;
using Paranext.DataProvider.JsonUtils;
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

        [Test]
        [Description(
            "Wire-shape contract: serializing GetStyleInfo's result through the REAL PAPI "
                + "serializer (SerializationOptions.CreateSerializationOptions, the same options "
                + "PapiClient's JSON-RPC formatter copies) must produce the scripture-editors "
                + "StyleInfo TS shape — camelCase property keys, unset optionals omitted entirely "
                + "(WhenWritingNull), and marker dictionary keys left raw (no DictionaryKeyPolicy)."
        )]
        public void GetStyleInfo_SerializedThroughPapiWireSerializer_MatchesTsStyleInfoShape()
        {
            var result = _provider.GetStyleInfo(GenesisBookNum);

            string json = JsonSerializer.Serialize(
                result,
                SerializationOptions.CreateSerializationOptions()
            );

            Assert.Multiple(() =>
            {
                // camelCase property keys (TS: defaultFont, defaultFontSize, markers, styleType),
                // never the C# PascalCase names.
                Assert.That(json, Does.Contain("\"defaultFont\""));
                Assert.That(json, Does.Contain("\"defaultFontSize\""));
                Assert.That(json, Does.Contain("\"markers\""));
                Assert.That(json, Does.Contain("\"styleType\""));
                Assert.That(json, Does.Not.Contain("\"DefaultFont\""));
                Assert.That(json, Does.Not.Contain("\"DefaultFontSize\""));
                Assert.That(json, Does.Not.Contain("\"Markers\""));
                Assert.That(json, Does.Not.Contain("\"StyleType\""));

                // Unset optionals are ABSENT, not null: no DummyScrStylesheet tag sets Bold, so
                // no marker may carry a "bold" key — and nothing anywhere may serialize as null
                // (every optional is [JsonIgnore(Condition = WhenWritingNull)]).
                Assert.That(json, Does.Not.Contain("\"bold\""));
                Assert.That(json, Does.Not.Contain(":null"));

                // Marker dictionary keys stay raw (PropertyNamingPolicy must not leak into
                // dictionary keys — markers are looked up verbatim TS-side).
                Assert.That(json, Does.Contain("\"ip\":"));
                Assert.That(json, Does.Not.Contain("\"Ip\""));
            });
        }

        /// <summary>
        /// The style types <see cref="ParatextProjectDataProvider.GetStyleInfo"/> filters out
        /// (derived end tags and unknown placeholders are never serialized). Mirrors the filter
        /// list inside GetStyleInfo — if that list changes, update this set to match.
        /// </summary>
        private static readonly ScrStyleType[] s_styleTypesFilteredByGetStyleInfo =
        [
            ScrStyleType.scEndStyle,
            ScrStyleType.scMilestoneEnd,
            ScrStyleType.scUnknownStyle,
        ];

        /// <summary>The scripture-editors TS `StyleType` union (styleInfo.ts).</summary>
        private static readonly string[] s_tsStyleTypeUnion =
        [
            "paragraph",
            "character",
            "note",
            "milestone",
        ];

        [Test]
        [Description(
            "Exhaustiveness guard: GetStyleInfo's filter list and PlatformMarkerStyleInfo's "
                + "StyleType switch are separately maintained. Every ScrStyleType enum value must "
                + "be either filtered out by GetStyleInfo or mapped onto the TS StyleType union — "
                + "a future ScrStyleType addition must fail here loudly instead of silently "
                + "emitting styleType:\"unknown\" off the TS union."
        )]
        public void PlatformMarkerStyleInfo_EveryScrStyleType_IsFilteredOrMapsToTsUnion()
        {
            Assert.Multiple(() =>
            {
                foreach (ScrStyleType styleType in Enum.GetValues<ScrStyleType>())
                {
                    if (s_styleTypesFilteredByGetStyleInfo.Contains(styleType))
                        continue;

                    var markerInfo = new PlatformMarkerStyleInfo(
                        new ScrTag("zz") { StyleType = styleType }
                    );

                    Assert.That(
                        s_tsStyleTypeUnion,
                        Does.Contain(markerInfo.StyleType),
                        $"ScrStyleType.{styleType} is neither in GetStyleInfo's filter list nor "
                            + "mapped by PlatformMarkerStyleInfo.StyleType onto the TS StyleType "
                            + "union — extend the switch (and the TS union) or the filter."
                    );
                }
            });
        }
    }
}

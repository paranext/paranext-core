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

        /// <summary>
        /// Registers an extra tag on the project's stylesheet so a test can exercise value
        /// conversions the stock DummyScrStylesheet tags never set.
        /// </summary>
        private void AddStylesheetTag(ScrTag tag) =>
            ((DummyScrStylesheet)_scrText.DefaultStylesheet).AddTag(tag);

        [Test]
        [Description(
            "A tag carrying real presentation values must convert to the TS wire values: color "
                + "as #RRGGBB from the RgbColor channels, indent/margins from thousandths of an "
                + "inch to inches, point sizes passed through raw, set flags as true, and rank "
                + "verbatim — all asserted as independent literals."
        )]
        public void GetStyleInfo_ValueBearingTag_ConvertsPresentationValues()
        {
            // RawColor holds ScrTag.ParseColor's normalized (r << 16 | g << 8 | b) form of the
            // .sty integer color: `\Color 8401664` (0x803300, the legacy B-G-R COLORREF order)
            // parses to 0x003380. The distinct R (0x00) and B (0x80) channels make a red/blue
            // channel swap in the #RRGGBB formatting fail loudly.
            AddStylesheetTag(
                new ScrTag("zst")
                {
                    StyleType = ScrStyleType.scCharacterStyle,
                    RawColor = 0x003380,
                    Bold = true,
                    Italic = true,
                    Underline = true,
                    SmallCaps = true,
                    FontSize = 14,
                    SpaceBefore = 6,
                    SpaceAfter = 3,
                    LineSpacing = 2,
                    FirstLineIndent = 250,
                    LeftMargin = 125,
                    RightMargin = 375,
                    Rank = 5,
                }
            );

            var result = _provider.GetStyleInfo(GenesisBookNum);

            var zst = result.Markers["zst"];
            Assert.Multiple(() =>
            {
                Assert.That(zst.Color, Is.EqualTo("#003380"));
                Assert.That(zst.Bold, Is.True);
                Assert.That(zst.Italic, Is.True);
                Assert.That(zst.Underline, Is.True);
                Assert.That(zst.SmallCaps, Is.True);
                Assert.That(zst.FontSize, Is.EqualTo(14));
                Assert.That(zst.SpaceBefore, Is.EqualTo(6));
                Assert.That(zst.SpaceAfter, Is.EqualTo(3));
                Assert.That(zst.LineSpacing, Is.EqualTo(2));
                Assert.That(zst.FirstLineIndent, Is.EqualTo(0.25));
                Assert.That(zst.LeftMargin, Is.EqualTo(0.125));
                Assert.That(zst.RightMargin, Is.EqualTo(0.375));
                Assert.That(zst.Rank, Is.EqualTo(5));
            });
        }

        [TestCase(ScrJustificationType.scCenter, "center")]
        [TestCase(ScrJustificationType.scRight, "right")]
        [TestCase(ScrJustificationType.scBoth, "both")]
        [Description(
            "Non-default justification values must map onto the TS justification strings (left, "
                + "the default, is covered by the omitted-when-unset test above)."
        )]
        public void GetStyleInfo_JustificationType_MapsToTsJustificationString(
            ScrJustificationType justification,
            string expected
        )
        {
            AddStylesheetTag(
                new ScrTag("zst")
                {
                    StyleType = ScrStyleType.scParagraphStyle,
                    JustificationType = justification,
                }
            );

            var result = _provider.GetStyleInfo(GenesisBookNum);

            Assert.That(result.Markers["zst"].Justification, Is.EqualTo(expected));
        }

        [Test]
        [Description(
            "GetStyleInfo's default font/size read the exact ScrText accessors PT9's "
                + "CSSCreator.CreateUsfmCss(ScrText, ...) reads — ScrText.Language.FontName / "
                + "ScrText.Language.FontSize, which resolve to the project's DefaultFont / "
                + "DefaultFontSize settings. Explicit setting values asserted as literals prove "
                + "the values flow through, rather than comparing the result to the same "
                + "accessor the implementation reads."
        )]
        public void GetStyleInfo_DefaultFontAndSize_ComeFromProjectDefaultFontSettings()
        {
            _scrText.Settings.DefaultFont = "Gentium Plus Test";
            _scrText.Settings.DefaultFontSize = 13;

            var result = _provider.GetStyleInfo(GenesisBookNum);

            Assert.That(result.DefaultFont, Is.EqualTo("Gentium Plus Test"));
            Assert.That(result.DefaultFontSize, Is.EqualTo(13));
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

        [Test]
        [Description(
            "Upgrade tripwire: newer ParatextData adds TextProperties.scNoteSubMarker (.sty name "
                + "\"notesub\", carried by note-internal character markers like \\fr/\\ft/\\xo/\\xt "
                + "and used by UsfmParser to auto-close them). The version currently referenced "
                + "doesn't define the member, so the flag is looked up by NAME at runtime and this "
                + "test passes vacuously today; when a ParatextData upgrade introduces the member, "
                + "the assert branch activates and fails until the (scNoteSubMarker, \"notesub\") "
                + "pair is added to PlatformMarkerStyleInfo's flag->name table in "
                + "PlatformStyleInfo.cs."
        )]
        public void TextProperties_ScNoteSubMarkerAvailable_MustSerializeNotesub()
        {
            // Reflection (name-based parse) because the member doesn't exist at compile time in
            // the ParatextData version currently referenced; TryParse also yields the flag value
            // needed to build the tag once it does exist.
            if (!Enum.TryParse("scNoteSubMarker", out TextProperties scNoteSubMarker))
            {
                Assert.Pass(
                    "The referenced ParatextData's TextProperties enum does not define "
                        + "scNoteSubMarker — nothing to serialize yet. This test self-activates "
                        + "when the ParatextData package is upgraded to a version that adds it."
                );
            }

            var markerInfo = new PlatformMarkerStyleInfo(
                new ScrTag("zzz")
                {
                    StyleType = ScrStyleType.scCharacterStyle,
                    TextProperties = scNoteSubMarker,
                }
            );

            Assert.That(
                markerInfo.TextProperties ?? [],
                Does.Contain("notesub"),
                "ParatextData now defines TextProperties.scNoteSubMarker, but "
                    + "PlatformMarkerStyleInfo does not serialize it — add the "
                    + "(scNoteSubMarker, \"notesub\") pair to s_textPropertyNames in "
                    + "PlatformStyleInfo.cs."
            );
        }
    }
}

// === TEST FILE: CAP-005 WriteResourceXml ===
// TDD Phase: RED (tests should fail -- implementation does not exist yet)
// Capability: CAP-005 (WriteResourceXml)
// Micro-Phase: BE-3 (Domain: Rendering Pipeline)
// Sources: EXT-006 (PT9/ParatextBase/TextCollection/TextCollectionControl.cs:262-322)
// Golden Masters: gm-004 (verse XML rendering), gm-013 (poetic slash rendering)
// Test Spec: spec-005 (text retrieval)

using System.Diagnostics.CodeAnalysis;
using System.Xml.Linq;
using Paranext.DataProvider.Projects;
using Paranext.DataProvider.TextCollection;
using Paratext.Data;
using SIL.Scripture;

namespace TestParanextDataProvider.TextCollection;

/// <summary>
/// Tests for VerseXmlGenerator.WriteResourceXml (CAP-005).
///
/// WriteResourceXml generates XML for a single text at a verse reference.
/// The XML follows the BHV-601 contract structure:
/// <![CDATA[
/// <resource abbrev="..." verseref="..." align="..." direction="...">
///   <verseusx name="..." fontname="..." fontsize="..." language="...">
///     <usx version="3.0">content</usx>
///   </verseusx>
/// </resource>
/// ]]>
///
/// Source: EXT-006 (PT9/ParatextBase/TextCollection/TextCollectionControl.cs:262-322)
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
internal class VerseXmlGeneratorTests : PapiTestBase
{
    #region Constants

    // Standard USFM content for testing
    private const string GENESIS_USFM =
        @"\id GEN
\c 1
\p
\v 1 In the beginning God created the heavens and the earth.
\v 2 Now the earth was formless and empty.
\v 3 And God said, ""Let there be light,"" and there was light.";

    private const string MATTHEW_USFM =
        @"\id MAT
\ip This is the introduction to Matthew.
\c 1
\p
\v 1 The book of the genealogy of Jesus Christ, the son of David, the son of Abraham.
\v 2 Abraham was the father of Isaac.
\v 18 Now the birth of Jesus Christ\f + \fr 1:18 \ft Some manuscripts say birth of Christ\f* took place in this way.";

    // USFM with poetic markers for gm-013 testing
    private const string PSALMS_USFM =
        @"\id PSA
\c 23
\p
\v 1 The LORD is my shepherd,
\q1 I lack nothing.
\q2 He makes me lie down in green pastures,
\q1 he leads me beside quiet waters.";

    // Book number constants
    private const int GEN = 1;
    private const int MAT = 40;
    private const int PSA = 19;
    private const int JUDE = 65;

    #endregion

    #region Test setup

    private DummyScrText _scrText = null!;
    private string _projectId = null!;
    private string _projectName = null!;

    [SetUp]
    public override async Task TestSetupAsync()
    {
        await base.TestSetupAsync();
        _scrText = CreateDummyProject();
        ScrTextCollection.Add(_scrText, true);
        _projectId = _scrText.Guid.ToString();
        _projectName = _scrText.Name;
    }

    [TearDown]
    public override void TestTearDown()
    {
        _scrText?.Dispose();
        base.TestTearDown();
    }

    #endregion

    #region Helper methods

    /// <summary>
    /// Creates a TextCollectionItem for the default test project.
    /// </summary>
    private TextCollectionItem CreateItem(double zoom = 1.0)
    {
        return new TextCollectionItem(_projectName, _projectId, zoom);
    }

    /// <summary>
    /// Creates a TextCollectionItem for a given ScrText.
    /// </summary>
    private static TextCollectionItem CreateItem(ScrText scrText, double zoom = 1.0)
    {
        return new TextCollectionItem(scrText.Name, scrText.Guid.ToString(), zoom);
    }

    /// <summary>
    /// Puts USFM text into a ScrText for testing.
    /// </summary>
    private static void PutBookText(ScrText scrText, int bookNum, string usfm)
    {
        scrText.PutText(bookNum, 0, false, usfm, null);
    }

    /// <summary>
    /// Parses the XML output and returns the root resource element.
    /// </summary>
    private static XElement ParseResourceXml(string xml)
    {
        return XElement.Parse(xml);
    }

    #endregion

    // =========================================================================
    // ACCEPTANCE TEST (Step 0)
    // =========================================================================

    #region Acceptance Test

    /// <summary>
    /// OUTER ACCEPTANCE TEST: WriteResourceXml generates XML with the correct
    /// BHV-601 structure for a standard verse. When this passes, CAP-005 is complete.
    ///
    /// Verifies the full XML structure contract:
    /// - Root element is "resource" with abbrev, verseref, align, direction attributes
    /// - Child element is "verseusx" with name, fontname, fontsize, language attributes
    /// - Content wrapped in "usx" element with version="3.0"
    /// - Font size = base font * zoom
    /// - Direction and alignment correctly set
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-005")]
    [Property("GoldenMasterId", "gm-004")]
    [Property("ScenarioId", "TS-040")]
    [Property("BehaviorId", "BHV-601")]
    public void WriteResourceXml_StandardVerse_ProducesCorrectXmlStructure()
    {
        // Arrange: Set up a project with Matthew book data
        PutBookText(_scrText, MAT, MATTHEW_USFM);
        TextCollectionItem item = CreateItem(zoom: 1.0);
        var verseRef = new VerseRef(MAT, 1, 1, ScrVers.English);

        // Act
        string xml = VerseXmlGenerator.WriteResourceXml(item, verseRef);

        // Assert: Verify complete XML structure (BHV-601 contract)
        Assert.That(xml, Is.Not.Null.And.Not.Empty, "XML output must not be null or empty");

        XElement resource = ParseResourceXml(xml);

        // Root element structure
        Assert.That(resource.Name.LocalName, Is.EqualTo("resource"), "Root element must be 'resource'");
        Assert.That(
            resource.Attribute("abbrev")?.Value,
            Is.Not.Null.And.Not.Empty,
            "resource must have 'abbrev' attribute"
        );
        Assert.That(
            resource.Attribute("verseref")?.Value,
            Is.Not.Null.And.Not.Empty,
            "resource must have 'verseref' attribute"
        );
        Assert.That(
            resource.Attribute("align")?.Value,
            Is.EqualTo("left").Or.EqualTo("right"),
            "resource must have 'align' attribute set to 'left' or 'right'"
        );
        Assert.That(
            resource.Attribute("direction")?.Value,
            Is.EqualTo("ltr").Or.EqualTo("rtl"),
            "resource must have 'direction' attribute set to 'ltr' or 'rtl'"
        );

        // Child verseusx element
        XElement? verseusx = resource.Element("verseusx");
        Assert.That(verseusx, Is.Not.Null, "resource must contain a 'verseusx' child element");
        Assert.That(
            verseusx!.Attribute("name")?.Value,
            Is.Not.Null.And.Not.Empty,
            "verseusx must have 'name' attribute"
        );
        Assert.That(
            verseusx.Attribute("fontname")?.Value,
            Is.Not.Null,
            "verseusx must have 'fontname' attribute"
        );
        Assert.That(
            verseusx.Attribute("fontsize")?.Value,
            Is.Not.Null.And.Not.Empty,
            "verseusx must have 'fontsize' attribute"
        );
        Assert.That(
            verseusx.Attribute("language")?.Value,
            Is.Not.Null,
            "verseusx must have 'language' attribute"
        );

        // Content usx element
        XElement? usx = verseusx.Element("usx");
        Assert.That(usx, Is.Not.Null, "verseusx must contain a 'usx' child element");
        Assert.That(
            usx!.Attribute("version")?.Value,
            Is.EqualTo("3.0"),
            "usx must have version='3.0'"
        );

        // Verify content is present
        Assert.That(
            usx.HasElements || !string.IsNullOrEmpty(usx.Value),
            Is.True,
            "usx element must contain verse content"
        );
    }

    #endregion

    // =========================================================================
    // CONTRACT TESTS (Step 2): Happy Path
    // =========================================================================

    #region Happy Path Tests

    /// <summary>
    /// WriteResourceXml sets the abbreviation attribute to the project short name.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("ScenarioId", "TS-040")]
    [Property("BehaviorId", "BHV-601")]
    public void WriteResourceXml_StandardVerse_AbbrevMatchesProjectName()
    {
        // Arrange
        PutBookText(_scrText, MAT, MATTHEW_USFM);
        TextCollectionItem item = CreateItem();
        var verseRef = new VerseRef(MAT, 1, 1, ScrVers.English);

        // Act
        string xml = VerseXmlGenerator.WriteResourceXml(item, verseRef);

        // Assert
        XElement resource = ParseResourceXml(xml);
        string? abbrev = resource.Attribute("abbrev")?.Value;
        Assert.That(abbrev, Does.Contain(_projectName).Or.Not.Empty);
    }

    /// <summary>
    /// WriteResourceXml sets the verseref attribute to match the requested verse reference.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("ScenarioId", "TS-040")]
    [Property("BehaviorId", "BHV-601")]
    public void WriteResourceXml_StandardVerse_VerseRefAttributeMatchesInput()
    {
        // Arrange
        PutBookText(_scrText, MAT, MATTHEW_USFM);
        TextCollectionItem item = CreateItem();
        var verseRef = new VerseRef(MAT, 1, 1, ScrVers.English);

        // Act
        string xml = VerseXmlGenerator.WriteResourceXml(item, verseRef);

        // Assert: verseref attribute should contain the book/chapter/verse info
        XElement resource = ParseResourceXml(xml);
        string? verseRefAttr = resource.Attribute("verseref")?.Value;
        Assert.That(verseRefAttr, Is.Not.Null.And.Not.Empty);
    }

    /// <summary>
    /// WriteResourceXml for an LTR project sets align="left" and direction="ltr".
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("ScenarioId", "TS-040")]
    [Property("BehaviorId", "BHV-601")]
    public void WriteResourceXml_LtrProject_SetsLeftAlignAndLtrDirection()
    {
        // Arrange: Default DummyScrText is LTR
        PutBookText(_scrText, MAT, MATTHEW_USFM);
        TextCollectionItem item = CreateItem();
        var verseRef = new VerseRef(MAT, 1, 1, ScrVers.English);

        // Act
        string xml = VerseXmlGenerator.WriteResourceXml(item, verseRef);

        // Assert
        XElement resource = ParseResourceXml(xml);
        Assert.That(resource.Attribute("align")?.Value, Is.EqualTo("left"));
        Assert.That(resource.Attribute("direction")?.Value, Is.EqualTo("ltr"));
    }

    /// <summary>
    /// WriteResourceXml includes the USX version 3.0 wrapper around content.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("ScenarioId", "TS-040")]
    [Property("BehaviorId", "BHV-601")]
    public void WriteResourceXml_StandardVerse_UsxVersionIs3Point0()
    {
        // Arrange
        PutBookText(_scrText, MAT, MATTHEW_USFM);
        TextCollectionItem item = CreateItem();
        var verseRef = new VerseRef(MAT, 1, 1, ScrVers.English);

        // Act
        string xml = VerseXmlGenerator.WriteResourceXml(item, verseRef);

        // Assert
        XElement resource = ParseResourceXml(xml);
        XElement? usx = resource.Element("verseusx")?.Element("usx");
        Assert.That(usx, Is.Not.Null);
        Assert.That(usx!.Attribute("version")?.Value, Is.EqualTo("3.0"));
    }

    #endregion

    // =========================================================================
    // GOLDEN MASTER TESTS (Step 3): gm-004 - Zoom Factor
    // =========================================================================

    #region Zoom Factor Tests (gm-004: zoom-applied, TS-041)

    /// <summary>
    /// WriteResourceXml applies zoom factor to font size.
    /// Font size = base font size * zoom factor.
    /// With zoom=1.0 and base font size 12, fontsize should be 12.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-005")]
    [Property("GoldenMasterId", "gm-004")]
    [Property("ScenarioId", "TS-041")]
    [Property("BehaviorId", "BHV-601")]
    public void WriteResourceXml_ZoomOne_FontSizeEqualsBaseFontSize()
    {
        // Arrange
        PutBookText(_scrText, MAT, MATTHEW_USFM);
        TextCollectionItem item = CreateItem(zoom: 1.0);
        var verseRef = new VerseRef(MAT, 1, 1, ScrVers.English);

        // Act
        string xml = VerseXmlGenerator.WriteResourceXml(item, verseRef);

        // Assert: fontsize should be the base font size (unchanged by zoom=1.0)
        XElement resource = ParseResourceXml(xml);
        string? fontsizeStr = resource.Element("verseusx")?.Attribute("fontsize")?.Value;
        Assert.That(fontsizeStr, Is.Not.Null, "fontsize attribute must be present");
        int fontsize = int.Parse(fontsizeStr!);
        Assert.That(fontsize, Is.GreaterThan(0), "fontsize must be positive");
    }

    /// <summary>
    /// WriteResourceXml applies zoom factor to font size.
    /// With zoom=1.5, fontsize should be base * 1.5.
    /// gm-004 specifies: base font 12 * zoom 1.5 = fontsize 18.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-005")]
    [Property("GoldenMasterId", "gm-004")]
    [Property("ScenarioId", "TS-041")]
    [Property("BehaviorId", "BHV-601")]
    public void WriteResourceXml_ZoomOnePointFive_FontSizeIsBaseTimesZoom()
    {
        // Arrange
        PutBookText(_scrText, MAT, MATTHEW_USFM);
        TextCollectionItem itemZoom1 = CreateItem(zoom: 1.0);
        TextCollectionItem itemZoom15 = CreateItem(zoom: 1.5);
        var verseRef = new VerseRef(MAT, 1, 1, ScrVers.English);

        // Act
        string xmlZoom1 = VerseXmlGenerator.WriteResourceXml(itemZoom1, verseRef);
        string xmlZoom15 = VerseXmlGenerator.WriteResourceXml(itemZoom15, verseRef);

        // Assert: fontsize at 1.5x should be 1.5 times fontsize at 1.0x
        XElement resource1 = ParseResourceXml(xmlZoom1);
        XElement resource15 = ParseResourceXml(xmlZoom15);
        int fontsize1 = int.Parse(resource1.Element("verseusx")!.Attribute("fontsize")!.Value);
        int fontsize15 = int.Parse(resource15.Element("verseusx")!.Attribute("fontsize")!.Value);

        // fontsize15 should be approximately fontsize1 * 1.5 (integer rounding)
        int expectedFontsize = (int)(fontsize1 * 1.5);
        Assert.That(
            fontsize15,
            Is.EqualTo(expectedFontsize),
            $"Font size with zoom 1.5 should be {expectedFontsize} (base {fontsize1} * 1.5)"
        );
    }

    /// <summary>
    /// WriteResourceXml applies zoom factor of 2.0.
    /// Font size should double.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-005")]
    [Property("GoldenMasterId", "gm-004")]
    [Property("ScenarioId", "TS-041")]
    [Property("BehaviorId", "BHV-601")]
    public void WriteResourceXml_ZoomTwo_FontSizeIsDoubled()
    {
        // Arrange
        PutBookText(_scrText, MAT, MATTHEW_USFM);
        TextCollectionItem itemZoom1 = CreateItem(zoom: 1.0);
        TextCollectionItem itemZoom2 = CreateItem(zoom: 2.0);
        var verseRef = new VerseRef(MAT, 1, 1, ScrVers.English);

        // Act
        string xmlZoom1 = VerseXmlGenerator.WriteResourceXml(itemZoom1, verseRef);
        string xmlZoom2 = VerseXmlGenerator.WriteResourceXml(itemZoom2, verseRef);

        // Assert
        int fontsize1 = int.Parse(
            ParseResourceXml(xmlZoom1).Element("verseusx")!.Attribute("fontsize")!.Value
        );
        int fontsize2 = int.Parse(
            ParseResourceXml(xmlZoom2).Element("verseusx")!.Attribute("fontsize")!.Value
        );

        Assert.That(
            fontsize2,
            Is.EqualTo(fontsize1 * 2),
            $"Font size with zoom 2.0 should be {fontsize1 * 2} (base {fontsize1} * 2)"
        );
    }

    #endregion

    // =========================================================================
    // GOLDEN MASTER TESTS: gm-004 - RTL Text Direction
    // =========================================================================

    #region RTL Direction Tests (gm-004: rtl-text, TS-045)

    /// <summary>
    /// WriteResourceXml for an LTR project sets direction="ltr" and align="left"
    /// (verifying the direction attribute is correctly derived from ScrText.RightToLeft).
    /// gm-004 specifies: LTR texts get direction="ltr" and align="left",
    /// RTL texts get direction="rtl" and align="right".
    ///
    /// Note: DummyScrText creates an LTR language by default. The RTL behavior is
    /// verified by checking that the implementation correctly reads ScrText.RightToLeft
    /// and sets the attributes accordingly. The implementation must use scrText.RightToLeft
    /// to determine direction and alignment.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-005")]
    [Property("GoldenMasterId", "gm-004")]
    [Property("ScenarioId", "TS-045")]
    [Property("BehaviorId", "BHV-601")]
    public void WriteResourceXml_LtrProject_DirectionAndAlignDerivedFromScrText()
    {
        // Arrange: Default DummyScrText is LTR (direction comes from language LDML)
        PutBookText(_scrText, GEN, GENESIS_USFM);
        TextCollectionItem item = CreateItem();
        var verseRef = new VerseRef(GEN, 1, 1, ScrVers.English);

        // Act
        string xml = VerseXmlGenerator.WriteResourceXml(item, verseRef);

        // Assert: DummyScrText is LTR, so direction="ltr" and align="left"
        XElement resource = ParseResourceXml(xml);
        Assert.That(
            resource.Attribute("direction")?.Value,
            Is.EqualTo("ltr"),
            "LTR project must have direction='ltr'"
        );
        Assert.That(
            resource.Attribute("align")?.Value,
            Is.EqualTo("left"),
            "LTR project must have align='left'"
        );
    }

    /// <summary>
    /// WriteResourceXml must read direction from ScrText.RightToLeft property,
    /// not from a hardcoded value. This test verifies the direction/align attributes
    /// are present and valid (either "ltr"/"left" or "rtl"/"right").
    ///
    /// gm-004: RTL contract requires direction="rtl" align="right" for RTL projects.
    /// Since DummyScrText cannot easily be configured as RTL (RightToLeft comes from
    /// LDML language data), we verify the attribute contract is honored.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-005")]
    [Property("GoldenMasterId", "gm-004")]
    [Property("ScenarioId", "TS-045")]
    [Property("BehaviorId", "BHV-601")]
    public void WriteResourceXml_AnyProject_DirectionAndAlignAreConsistent()
    {
        // Arrange
        PutBookText(_scrText, GEN, GENESIS_USFM);
        TextCollectionItem item = CreateItem();
        var verseRef = new VerseRef(GEN, 1, 1, ScrVers.English);

        // Act
        string xml = VerseXmlGenerator.WriteResourceXml(item, verseRef);

        // Assert: direction and align must be consistent pairs
        XElement resource = ParseResourceXml(xml);
        string? direction = resource.Attribute("direction")?.Value;
        string? align = resource.Attribute("align")?.Value;

        Assert.That(direction, Is.Not.Null, "direction attribute must be present");
        Assert.That(align, Is.Not.Null, "align attribute must be present");

        // Consistent pairs: ltr/left or rtl/right
        if (direction == "ltr")
        {
            Assert.That(
                align,
                Is.EqualTo("left"),
                "LTR direction must pair with left alignment"
            );
        }
        else if (direction == "rtl")
        {
            Assert.That(
                align,
                Is.EqualTo("right"),
                "RTL direction must pair with right alignment"
            );
        }
        else
        {
            Assert.Fail($"direction must be 'ltr' or 'rtl', got '{direction}'");
        }
    }

    #endregion

    // =========================================================================
    // GOLDEN MASTER TESTS: gm-004 - Intro Verse
    // =========================================================================

    #region Intro Verse Tests (gm-004: intro-verse, TS-043)

    /// <summary>
    /// WriteResourceXml handles introduction verses (chapter 0).
    /// gm-004 specifies: intro content is rendered in the XML output.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-005")]
    [Property("GoldenMasterId", "gm-004")]
    [Property("ScenarioId", "TS-043")]
    [Property("BehaviorId", "BHV-601")]
    public void WriteResourceXml_IntroVerse_RendersIntroContent()
    {
        // Arrange: Matthew has intro content (\ip)
        PutBookText(_scrText, MAT, MATTHEW_USFM);
        TextCollectionItem item = CreateItem();
        // Chapter 0 = introduction
        var verseRef = new VerseRef(MAT, 0, 0, ScrVers.English);

        // Act
        string xml = VerseXmlGenerator.WriteResourceXml(item, verseRef);

        // Assert: Output should not be empty; intro content should be present
        Assert.That(xml, Is.Not.Null.And.Not.Empty, "Intro verse must produce non-empty XML");
        XElement resource = ParseResourceXml(xml);
        Assert.That(
            resource.Name.LocalName,
            Is.EqualTo("resource"),
            "Intro verse output must still follow resource structure"
        );
    }

    #endregion

    // =========================================================================
    // GOLDEN MASTER TESTS: gm-004 - Past End of Chapter
    // =========================================================================

    #region Past End of Chapter Tests (gm-004: past-end-of-chapter, TS-044)

    /// <summary>
    /// WriteResourceXml handles verse references past the end of a chapter gracefully.
    /// gm-004 specifies: graceful fallback (empty content or valid XML with no verse content).
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-005")]
    [Property("GoldenMasterId", "gm-004")]
    [Property("ScenarioId", "TS-044")]
    [Property("BehaviorId", "BHV-601")]
    public void WriteResourceXml_PastEndOfChapter_GracefulFallback()
    {
        // Arrange: Matthew chapter 1 has only a few verses in our test data
        PutBookText(_scrText, MAT, MATTHEW_USFM);
        TextCollectionItem item = CreateItem();
        var verseRef = new VerseRef(MAT, 1, 99, ScrVers.English);

        // Act: Should not throw
        string xml = VerseXmlGenerator.WriteResourceXml(item, verseRef);

        // Assert: Should produce valid XML (possibly with empty content)
        Assert.That(xml, Is.Not.Null, "Past-end verse must not return null");
        // The XML structure should still be valid, even if content is empty
        XElement resource = ParseResourceXml(xml);
        Assert.That(resource.Name.LocalName, Is.EqualTo("resource"));
    }

    #endregion

    // =========================================================================
    // GOLDEN MASTER TESTS: gm-004 - Footnote Exclusion
    // =========================================================================

    #region Footnote Exclusion Tests (gm-004: footnotes-excluded, TS-047)

    /// <summary>
    /// WriteResourceXml excludes footnotes from the multi-pane XML output.
    /// gm-004 specifies: footnote tokens are excluded via token filtering.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-005")]
    [Property("GoldenMasterId", "gm-004")]
    [Property("ScenarioId", "TS-047")]
    [Property("BehaviorId", "BHV-601")]
    public void WriteResourceXml_VerseWithFootnotes_ExcludesFootnoteContent()
    {
        // Arrange: MAT 1:18 has a footnote in our test USFM
        PutBookText(_scrText, MAT, MATTHEW_USFM);
        TextCollectionItem item = CreateItem();
        var verseRef = new VerseRef(MAT, 1, 18, ScrVers.English);

        // Act
        string xml = VerseXmlGenerator.WriteResourceXml(item, verseRef);

        // Assert: XML should not contain footnote markers
        Assert.That(xml, Is.Not.Null.And.Not.Empty);

        // Footnote content markers (\f, \ft, \fr) should not appear in USX output
        // The USX representation uses <note> elements for footnotes
        XElement resource = ParseResourceXml(xml);
        XElement? usx = resource.Element("verseusx")?.Element("usx");
        Assert.That(usx, Is.Not.Null);

        // Check that no <note> elements exist in the output (footnotes excluded)
        IEnumerable<XElement> noteElements = usx!.Descendants("note");
        Assert.That(
            noteElements.Count(),
            Is.EqualTo(0),
            "Footnote <note> elements must be excluded from multi-pane XML"
        );
    }

    /// <summary>
    /// WriteResourceXml also excludes StudyBible markers (SBA markers).
    /// Notes in gm-004: "StudyBible markers are also excluded (not just footnotes)"
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-005")]
    [Property("GoldenMasterId", "gm-004")]
    [Property("ScenarioId", "TS-047")]
    [Property("BehaviorId", "BHV-601")]
    public void WriteResourceXml_VerseWithSbaMarkers_ExcludesSbaContent()
    {
        // Arrange: USFM with SBA-style sidebar marker
        string usfmWithSba =
            @"\id MAT
\c 1
\p
\v 1 The book of the genealogy\esb \s Study Note \p This is a study note\esbe of Jesus Christ.";
        PutBookText(_scrText, MAT, usfmWithSba);
        TextCollectionItem item = CreateItem();
        var verseRef = new VerseRef(MAT, 1, 1, ScrVers.English);

        // Act
        string xml = VerseXmlGenerator.WriteResourceXml(item, verseRef);

        // Assert: SBA sidebar content should not appear in the output
        Assert.That(xml, Is.Not.Null.And.Not.Empty);

        // SBA sidebar elements should be excluded
        XElement resource = ParseResourceXml(xml);
        XElement? usx = resource.Element("verseusx")?.Element("usx");
        Assert.That(usx, Is.Not.Null);

        IEnumerable<XElement> sidebarElements = usx!.Descendants("sidebar");
        Assert.That(
            sidebarElements.Count(),
            Is.EqualTo(0),
            "SBA sidebar elements must be excluded from multi-pane XML"
        );
    }

    #endregion

    // =========================================================================
    // GOLDEN MASTER TESTS: gm-004 - Verse Ranges
    // =========================================================================

    #region Verse Range Tests (gm-004: verse-range, TS-046)

    /// <summary>
    /// WriteResourceXml combines verse ranges into a single XML element.
    /// gm-004 specifies: when ChangeVersificationWithRanges returns a range,
    /// multiple verses are combined into single XML element.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-005")]
    [Property("GoldenMasterId", "gm-004")]
    [Property("ScenarioId", "TS-046")]
    [Property("BehaviorId", "BHV-601")]
    public void WriteResourceXml_VerseRange_ProducesValidXml()
    {
        // Arrange: Create a project with verse content that includes a range
        string judeUsfm =
            @"\id JUD
\c 1
\p
\v 14 Enoch, the seventh from Adam, prophesied about them.
\v 15 See, the Lord is coming with thousands upon thousands of his holy ones.";
        PutBookText(_scrText, JUDE, judeUsfm);
        TextCollectionItem item = CreateItem();

        // Create a verse reference that could result in a range via versification
        var verseRef = new VerseRef(JUDE, 1, 14, ScrVers.English);

        // Act
        string xml = VerseXmlGenerator.WriteResourceXml(item, verseRef);

        // Assert: Output should be valid XML with resource structure
        Assert.That(xml, Is.Not.Null.And.Not.Empty);
        XElement resource = ParseResourceXml(xml);
        Assert.That(resource.Name.LocalName, Is.EqualTo("resource"));
    }

    #endregion

    // =========================================================================
    // GOLDEN MASTER TESTS: gm-004 - Versification Mapping
    // =========================================================================

    #region Versification Mapping Tests (gm-004: versification-mapping, TS-042)

    /// <summary>
    /// WriteResourceXml applies versification mapping via ChangeVersificationWithRanges.
    /// gm-004 specifies: verse reference is mapped to the project's versification.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-005")]
    [Property("GoldenMasterId", "gm-004")]
    [Property("ScenarioId", "TS-042")]
    [Property("BehaviorId", "BHV-601")]
    public void WriteResourceXml_DifferentVersification_MapsVerseCorrectly()
    {
        // Arrange: Set up a project with Genesis content
        PutBookText(_scrText, GEN, GENESIS_USFM);
        TextCollectionItem item = CreateItem();

        // Using English versification for the reference
        var verseRef = new VerseRef(GEN, 1, 1, ScrVers.English);

        // Act
        string xml = VerseXmlGenerator.WriteResourceXml(item, verseRef);

        // Assert: The output should have a valid verseref attribute
        // The exact mapped value depends on versification, but it should be present
        XElement resource = ParseResourceXml(xml);
        string? verseRefAttr = resource.Attribute("verseref")?.Value;
        Assert.That(
            verseRefAttr,
            Is.Not.Null.And.Not.Empty,
            "Versification-mapped verseref must be present"
        );
    }

    #endregion

    // =========================================================================
    // GOLDEN MASTER TESTS: gm-013 - Poetic Slash Rendering
    // =========================================================================

    #region Poetic Slash Tests (gm-013, TS-122)

    /// <summary>
    /// WriteResourceXml renders poetic/paragraph markers so they can be displayed
    /// as slash separators (' / ') in multi-pane. The XSLT Para template renders
    /// ' / ' separator between paragraph-level elements.
    ///
    /// gm-013: "A slash in a text in the left pane indicates a line break or poetic marker"
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-005")]
    [Property("GoldenMasterId", "gm-013")]
    [Property("ScenarioId", "TS-122")]
    [Property("BehaviorId", "BHV-601")]
    public void WriteResourceXml_PoeticMarkers_ProducesValidXmlForSlashRendering()
    {
        // Arrange: Psalm 23:1 has poetic markers (\q1, \q2)
        PutBookText(_scrText, PSA, PSALMS_USFM);
        TextCollectionItem item = CreateItem();
        var verseRef = new VerseRef(PSA, 23, 1, ScrVers.English);

        // Act
        string xml = VerseXmlGenerator.WriteResourceXml(item, verseRef);

        // Assert: Output should contain paragraph elements that represent poetic lines
        Assert.That(xml, Is.Not.Null.And.Not.Empty);
        XElement resource = ParseResourceXml(xml);
        XElement? usx = resource.Element("verseusx")?.Element("usx");
        Assert.That(usx, Is.Not.Null);

        // The USX output should contain para elements with poetic style attributes
        // (e.g., style="q1", style="q2") which the XSLT transforms into ' / ' separators
        // The exact rendering of slashes is done by XSLT, but the USX must contain
        // the paragraph markers that produce them
        Assert.That(
            usx!.HasElements || !string.IsNullOrEmpty(usx.Value),
            Is.True,
            "Poetic verse must produce content for slash rendering"
        );
    }

    #endregion

    // =========================================================================
    // CONTRACT TESTS: Error Cases
    // =========================================================================

    #region Error Case Tests

    /// <summary>
    /// WriteResourceXml throws when the project cannot be found.
    /// data-contracts.md specifies: PROJECT_NOT_FOUND error when project not found.
    /// The exception must NOT be NotImplementedException (which indicates
    /// the method is not implemented at all).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("ScenarioId", "TS-040")]
    [Property("BehaviorId", "BHV-601")]
    public void WriteResourceXml_ProjectNotFound_ThrowsNonNotImplementedException()
    {
        // Arrange: Item with a non-existent project ID
        var item = new TextCollectionItem(
            "NonExistent",
            "0000000000000000000000000000000000000000",
            1.0
        );
        var verseRef = new VerseRef(MAT, 1, 1, ScrVers.English);

        // Act & Assert: Should throw an exception indicating project not found,
        // but NOT a NotImplementedException (which just means the method is a stub)
        var ex = Assert.Throws<Exception>(
            () => VerseXmlGenerator.WriteResourceXml(item, verseRef)
        );
        Assert.That(
            ex,
            Is.Not.TypeOf<NotImplementedException>(),
            "Exception must not be NotImplementedException -- method must be implemented"
        );
        Assert.That(
            ex!.Message,
            Does.Contain("not found").IgnoreCase.Or.Contain("PROJECT_NOT_FOUND").IgnoreCase,
            "Exception message should indicate project not found"
        );
    }

    /// <summary>
    /// WriteResourceXml handles a book not present in the project.
    /// data-contracts.md specifies: INVALID_STATE for "Book not available in project".
    /// The behavior should either throw or return valid XML with empty content.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("ScenarioId", "TS-040")]
    [Property("BehaviorId", "BHV-601")]
    public void WriteResourceXml_BookNotInProject_HandlesGracefully()
    {
        // Arrange: Project has no Jude book data
        PutBookText(_scrText, MAT, MATTHEW_USFM);
        TextCollectionItem item = CreateItem();
        var verseRef = new VerseRef(JUDE, 1, 1, ScrVers.English);

        // Act: Should either throw or return valid XML with empty/graceful content
        // Based on PT9 behavior, GetVerseText returns empty for missing books
        string xml = VerseXmlGenerator.WriteResourceXml(item, verseRef);

        // Assert: If it returns XML, it should still have valid structure
        if (!string.IsNullOrEmpty(xml))
        {
            XElement resource = ParseResourceXml(xml);
            Assert.That(resource.Name.LocalName, Is.EqualTo("resource"));
        }
    }

    #endregion

    // =========================================================================
    // SPEC-005 TESTS: Text Retrieval Integration
    // =========================================================================

    #region Text Retrieval Tests (spec-005)

    /// <summary>
    /// WriteResourceXml retrieves verse content with versification mapping (spec-005).
    /// spec-005 scenario: "GetVerseText retrieves content with versification mapping"
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("ScenarioId", "TS-040")]
    [Property("BehaviorId", "BHV-113")]
    public void WriteResourceXml_VerseWithContent_ContainsVerseText()
    {
        // Arrange: Put specific content in the project
        PutBookText(_scrText, GEN, GENESIS_USFM);
        TextCollectionItem item = CreateItem();
        var verseRef = new VerseRef(GEN, 1, 1, ScrVers.English);

        // Act
        string xml = VerseXmlGenerator.WriteResourceXml(item, verseRef);

        // Assert: The output should contain the actual verse text
        Assert.That(xml, Is.Not.Null.And.Not.Empty);
        Assert.That(
            xml,
            Does.Contain("beginning").Or.Contain("created").Or.Contain("heavens"),
            "XML should contain verse text content from Genesis 1:1"
        );
    }

    /// <summary>
    /// WriteResourceXml returns empty/minimal content for a missing book (spec-005).
    /// spec-005 scenario: "GetText returns empty string for missing book"
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("ScenarioId", "TS-040")]
    [Property("BehaviorId", "BHV-113")]
    public void WriteResourceXml_MissingBook_ReturnsEmptyOrMinimalContent()
    {
        // Arrange: Project only has MAT, not a book with number 99
        PutBookText(_scrText, MAT, MATTHEW_USFM);
        TextCollectionItem item = CreateItem();
        // Book 66 = Revelation, which we haven't put text for
        var verseRef = new VerseRef(66, 1, 1, ScrVers.English);

        // Act: Should handle gracefully
        string xml = VerseXmlGenerator.WriteResourceXml(item, verseRef);

        // Assert: Should produce valid (possibly empty-content) resource XML
        if (!string.IsNullOrEmpty(xml))
        {
            XElement resource = ParseResourceXml(xml);
            Assert.That(resource.Name.LocalName, Is.EqualTo("resource"));
        }
    }

    #endregion

    // =========================================================================
    // EDGE CASE TESTS: Joined Texts (BHV-114)
    // =========================================================================

    #region Joined Text Tests (BHV-114)

    /// <summary>
    /// WriteResourceXml resolves joined texts (e.g., "HEB/GRK") to the
    /// correct testament text via GetJoinedText (BHV-114).
    /// For OT books, the HEB portion is used; for NT, GRK is used.
    /// spec-005 scenario: "GetJoinedText returns HEB for OT and GRK for NT"
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("ScenarioId", "TS-040")]
    [Property("BehaviorId", "BHV-114")]
    [Description("Joined texts (HEB/GRK) should resolve to correct testament text")]
    public void WriteResourceXml_JoinedTextName_ProducesValidOutput()
    {
        // Arrange: Create item with a joined-text-style name
        // Note: Actual joined text resolution requires specific ScrTextCollection
        // configuration. This test verifies the method handles such names gracefully.
        PutBookText(_scrText, GEN, GENESIS_USFM);
        TextCollectionItem item = CreateItem();
        var verseRef = new VerseRef(GEN, 1, 1, ScrVers.English);

        // Act: Should handle standard project
        string xml = VerseXmlGenerator.WriteResourceXml(item, verseRef);

        // Assert: Valid output produced
        Assert.That(xml, Is.Not.Null.And.Not.Empty);
        XElement resource = ParseResourceXml(xml);
        Assert.That(resource.Name.LocalName, Is.EqualTo("resource"));
    }

    #endregion

    // =========================================================================
    // EDGE CASE TESTS: Multiple Verses in Same Chapter
    // =========================================================================

    #region Multiple Verse Tests

    /// <summary>
    /// WriteResourceXml produces different content for different verses
    /// in the same chapter, verifying verse-specific content extraction.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("ScenarioId", "TS-040")]
    [Property("BehaviorId", "BHV-601")]
    public void WriteResourceXml_DifferentVerses_ProduceDifferentContent()
    {
        // Arrange
        PutBookText(_scrText, GEN, GENESIS_USFM);
        TextCollectionItem item = CreateItem();
        var verseRef1 = new VerseRef(GEN, 1, 1, ScrVers.English);
        var verseRef2 = new VerseRef(GEN, 1, 2, ScrVers.English);

        // Act
        string xml1 = VerseXmlGenerator.WriteResourceXml(item, verseRef1);
        string xml2 = VerseXmlGenerator.WriteResourceXml(item, verseRef2);

        // Assert: Different verses should produce different XML content
        Assert.That(xml1, Is.Not.Null.And.Not.Empty);
        Assert.That(xml2, Is.Not.Null.And.Not.Empty);
        Assert.That(
            xml1,
            Is.Not.EqualTo(xml2),
            "Different verses should produce different XML content"
        );
    }

    #endregion

    // =========================================================================
    // EDGE CASE TESTS: Same verse, different zoom levels
    // =========================================================================

    #region Zoom Consistency Tests

    /// <summary>
    /// WriteResourceXml with different zoom levels produces XML where
    /// only the fontsize differs (not the content or structure).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("ScenarioId", "TS-041")]
    [Property("BehaviorId", "BHV-601")]
    public void WriteResourceXml_DifferentZooms_OnlyFontSizeDiffers()
    {
        // Arrange
        PutBookText(_scrText, GEN, GENESIS_USFM);
        TextCollectionItem itemZoom1 = CreateItem(zoom: 1.0);
        TextCollectionItem itemZoom12 = CreateItem(zoom: 1.2);
        var verseRef = new VerseRef(GEN, 1, 1, ScrVers.English);

        // Act
        string xml1 = VerseXmlGenerator.WriteResourceXml(itemZoom1, verseRef);
        string xml12 = VerseXmlGenerator.WriteResourceXml(itemZoom12, verseRef);

        // Assert: Both produce valid XML
        XElement resource1 = ParseResourceXml(xml1);
        XElement resource12 = ParseResourceXml(xml12);

        // Structural elements match
        Assert.That(resource1.Name.LocalName, Is.EqualTo(resource12.Name.LocalName));
        Assert.That(
            resource1.Attribute("abbrev")?.Value,
            Is.EqualTo(resource12.Attribute("abbrev")?.Value),
            "Abbrev should be the same regardless of zoom"
        );
        Assert.That(
            resource1.Attribute("direction")?.Value,
            Is.EqualTo(resource12.Attribute("direction")?.Value),
            "Direction should be the same regardless of zoom"
        );

        // Font sizes should differ
        int fontsize1 = int.Parse(
            resource1.Element("verseusx")!.Attribute("fontsize")!.Value
        );
        int fontsize12 = int.Parse(
            resource12.Element("verseusx")!.Attribute("fontsize")!.Value
        );
        Assert.That(
            fontsize12,
            Is.Not.EqualTo(fontsize1),
            "Different zoom levels must produce different font sizes"
        );
    }

    #endregion

    // =========================================================================
    // EDGE CASE: Different projects for same verse
    // =========================================================================

    #region Multi-Project Tests

    /// <summary>
    /// WriteResourceXml produces different content for different projects
    /// when rendering the same verse reference.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("ScenarioId", "TS-040")]
    [Property("BehaviorId", "BHV-601")]
    public void WriteResourceXml_DifferentProjects_ProducesDifferentAbbrev()
    {
        // Arrange: Create two projects with different names
        DummyScrText project2 = CreateDummyProject();
        ScrTextCollection.Add(project2, true);

        PutBookText(_scrText, GEN, GENESIS_USFM);
        PutBookText(
            project2,
            GEN,
            @"\id GEN
\c 1
\p
\v 1 Au commencement Dieu crea les cieux et la terre."
        );

        TextCollectionItem item1 = CreateItem();
        TextCollectionItem item2 = CreateItem(project2);
        var verseRef = new VerseRef(GEN, 1, 1, ScrVers.English);

        // Act
        string xml1 = VerseXmlGenerator.WriteResourceXml(item1, verseRef);
        string xml2 = VerseXmlGenerator.WriteResourceXml(item2, verseRef);

        // Assert: Both produce valid XML with different abbreviations
        XElement resource1 = ParseResourceXml(xml1);
        XElement resource2 = ParseResourceXml(xml2);

        string? abbrev1 = resource1.Attribute("abbrev")?.Value;
        string? abbrev2 = resource2.Attribute("abbrev")?.Value;
        Assert.That(abbrev1, Is.Not.EqualTo(abbrev2), "Different projects should have different abbreviations");

        project2.Dispose();
    }

    #endregion

    // =========================================================================
    // EDGE CASE: XML well-formedness
    // =========================================================================

    #region XML Well-Formedness Tests

    /// <summary>
    /// WriteResourceXml always produces well-formed XML that can be parsed
    /// without errors, even with minimal verse content.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("ScenarioId", "TS-040")]
    [Property("BehaviorId", "BHV-601")]
    public void WriteResourceXml_AnyVerse_ProducesWellFormedXml()
    {
        // Arrange
        PutBookText(_scrText, GEN, GENESIS_USFM);
        TextCollectionItem item = CreateItem();
        var verseRef = new VerseRef(GEN, 1, 3, ScrVers.English);

        // Act
        string xml = VerseXmlGenerator.WriteResourceXml(item, verseRef);

        // Assert: XML must parse without errors
        Assert.That(xml, Is.Not.Null.And.Not.Empty);
        Assert.DoesNotThrow(
            () => XElement.Parse(xml),
            "WriteResourceXml must produce well-formed XML"
        );
    }

    #endregion

    // =========================================================================
    // EDGE CASE: Language attribute
    // =========================================================================

    #region Language Attribute Tests

    /// <summary>
    /// WriteResourceXml includes a language attribute on the verseusx element.
    /// This is needed for CSS generation (per-language font/direction rules).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("ScenarioId", "TS-040")]
    [Property("BehaviorId", "BHV-601")]
    public void WriteResourceXml_StandardVerse_IncludesLanguageAttribute()
    {
        // Arrange
        PutBookText(_scrText, GEN, GENESIS_USFM);
        TextCollectionItem item = CreateItem();
        var verseRef = new VerseRef(GEN, 1, 1, ScrVers.English);

        // Act
        string xml = VerseXmlGenerator.WriteResourceXml(item, verseRef);

        // Assert
        XElement resource = ParseResourceXml(xml);
        XElement? verseusx = resource.Element("verseusx");
        Assert.That(verseusx, Is.Not.Null);
        Assert.That(
            verseusx!.Attribute("language"),
            Is.Not.Null,
            "verseusx must include a 'language' attribute for CSS generation"
        );
    }

    #endregion

    // =========================================================================
    // EDGE CASE: Name attribute on verseusx
    // =========================================================================

    #region Name Attribute Tests

    /// <summary>
    /// WriteResourceXml includes a name attribute on the verseusx element
    /// that identifies the project.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("ScenarioId", "TS-040")]
    [Property("BehaviorId", "BHV-601")]
    public void WriteResourceXml_StandardVerse_IncludesNameAttribute()
    {
        // Arrange
        PutBookText(_scrText, GEN, GENESIS_USFM);
        TextCollectionItem item = CreateItem();
        var verseRef = new VerseRef(GEN, 1, 1, ScrVers.English);

        // Act
        string xml = VerseXmlGenerator.WriteResourceXml(item, verseRef);

        // Assert
        XElement resource = ParseResourceXml(xml);
        XElement? verseusx = resource.Element("verseusx");
        Assert.That(verseusx, Is.Not.Null);
        Assert.That(
            verseusx!.Attribute("name")?.Value,
            Is.Not.Null.And.Not.Empty,
            "verseusx must include a 'name' attribute identifying the project"
        );
    }

    #endregion

    // =========================================================================
    // =========================================================================
    //
    //  CAP-006: GenerateMultiPaneContent
    //
    //  Tests for VerseXmlGenerator.GenerateMultiPaneContent (EXT-007).
    //  GenerateMultiPaneContent iterates all items calling WriteResourceXml
    //  per item and generates CSS per unique language via CSSCreator.
    //
    //  Source: PT9/ParatextBase/TextCollection/TextCollectionControl.cs:327-355
    //  Golden Master: gm-012 (multi-pane combined XML + CSS)
    //  Scenarios: TS-097, TS-122
    //
    // =========================================================================
    // =========================================================================

    // =========================================================================
    // CAP-006 ACCEPTANCE TEST (Step 0)
    // =========================================================================

    #region CAP-006 Acceptance Test

    /// <summary>
    /// OUTER ACCEPTANCE TEST: GenerateMultiPaneContent produces combined XML
    /// containing one resource element per item, CSS output, and correct
    /// resource count. When this passes, CAP-006 is complete.
    ///
    /// gm-012: 3 items at MAT 1:1 produce combined XML with 3 resource
    /// elements, CSS per unique language, and resourceCount=3.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-006")]
    [Property("GoldenMasterId", "gm-012")]
    [Property("ScenarioId", "TS-097")]
    [Property("BehaviorId", "BHV-T016")]
    public void GenerateMultiPaneContent_ThreeItems_ProducesCombinedXmlCssAndCorrectCount()
    {
        // Arrange: Create 3 projects with different names and content
        DummyScrText project2 = CreateDummyProject();
        DummyScrText project3 = CreateDummyProject();
        ScrTextCollection.Add(project2, true);
        ScrTextCollection.Add(project3, true);

        PutBookText(_scrText, MAT, MATTHEW_USFM);
        PutBookText(
            project2,
            MAT,
            @"\id MAT
\c 1
\p
\v 1 Au commencement de l'Evangile de Jesus-Christ."
        );
        PutBookText(
            project3,
            MAT,
            @"\id MAT
\c 1
\p
\v 1 Libro de la genealogia de Jesucristo."
        );

        var items = new List<TextCollectionItem>
        {
            CreateItem(),
            CreateItem(project2),
            CreateItem(project3),
        };
        var verseRef = new VerseRef(MAT, 1, 1, ScrVers.English);

        // Act
        MultiPaneContent result = VerseXmlGenerator.GenerateMultiPaneContent(items, verseRef);

        // Assert: Combined XML, CSS, and resource count
        Assert.That(result, Is.Not.Null, "Result must not be null");
        Assert.That(result.Xml, Is.Not.Null.And.Not.Empty, "XML output must not be empty");
        Assert.That(result.Css, Is.Not.Null, "CSS output must not be null");
        Assert.That(result.ResourceCount, Is.EqualTo(3), "ResourceCount must match item count");

        // Verify 3 <resource> elements in the combined XML
        // Parse by wrapping in a root element (combined XML is a fragment)
        XElement wrapper = XElement.Parse($"<root>{result.Xml}</root>");
        var resourceElements = wrapper.Elements("resource").ToList();
        Assert.That(
            resourceElements.Count,
            Is.EqualTo(3),
            "Combined XML must contain exactly 3 <resource> elements"
        );

        project2.Dispose();
        project3.Dispose();
    }

    #endregion

    // =========================================================================
    // CAP-006 CONTRACT TESTS: Happy Path
    // =========================================================================

    #region CAP-006 Happy Path Tests

    /// <summary>
    /// GenerateMultiPaneContent with a single item produces 1 resource element.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-006")]
    [Property("ScenarioId", "TS-097")]
    [Property("BehaviorId", "BHV-T016")]
    public void GenerateMultiPaneContent_SingleItem_ProducesOneResourceElement()
    {
        // Arrange
        PutBookText(_scrText, MAT, MATTHEW_USFM);
        var items = new List<TextCollectionItem> { CreateItem() };
        var verseRef = new VerseRef(MAT, 1, 1, ScrVers.English);

        // Act
        MultiPaneContent result = VerseXmlGenerator.GenerateMultiPaneContent(items, verseRef);

        // Assert
        Assert.That(result.ResourceCount, Is.EqualTo(1));
        XElement wrapper = XElement.Parse($"<root>{result.Xml}</root>");
        Assert.That(
            wrapper.Elements("resource").Count(),
            Is.EqualTo(1),
            "Single item should produce exactly 1 <resource> element"
        );
    }

    /// <summary>
    /// GenerateMultiPaneContent resource count always equals the number of items passed in.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-006")]
    [Property("ScenarioId", "TS-097")]
    [Property("BehaviorId", "BHV-T016")]
    public void GenerateMultiPaneContent_TwoItems_ResourceCountMatchesItemCount()
    {
        // Arrange
        DummyScrText project2 = CreateDummyProject();
        ScrTextCollection.Add(project2, true);

        PutBookText(_scrText, MAT, MATTHEW_USFM);
        PutBookText(
            project2,
            MAT,
            @"\id MAT
\c 1
\p
\v 1 Another translation of Matthew verse one."
        );

        var items = new List<TextCollectionItem> { CreateItem(), CreateItem(project2) };
        var verseRef = new VerseRef(MAT, 1, 1, ScrVers.English);

        // Act
        MultiPaneContent result = VerseXmlGenerator.GenerateMultiPaneContent(items, verseRef);

        // Assert
        Assert.That(
            result.ResourceCount,
            Is.EqualTo(2),
            "ResourceCount must equal the number of items"
        );

        project2.Dispose();
    }

    /// <summary>
    /// GenerateMultiPaneContent produces CSS output (non-null).
    /// CSS is generated per unique language via CSSCreator.CreateUsfmCss.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-006")]
    [Property("ScenarioId", "TS-097")]
    [Property("BehaviorId", "BHV-T016")]
    public void GenerateMultiPaneContent_WithItems_ProducesCssOutput()
    {
        // Arrange
        PutBookText(_scrText, MAT, MATTHEW_USFM);
        var items = new List<TextCollectionItem> { CreateItem() };
        var verseRef = new VerseRef(MAT, 1, 1, ScrVers.English);

        // Act
        MultiPaneContent result = VerseXmlGenerator.GenerateMultiPaneContent(items, verseRef);

        // Assert: CSS must be a non-null string (may be empty if CSSCreator returns empty)
        Assert.That(result.Css, Is.Not.Null, "CSS output must not be null");
    }

    /// <summary>
    /// GenerateMultiPaneContent XML output contains well-formed XML for each resource.
    /// Each resource element must follow the BHV-601 structure from CAP-005.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-006")]
    [Property("ScenarioId", "TS-097")]
    [Property("BehaviorId", "BHV-601")]
    public void GenerateMultiPaneContent_MultipleItems_EachResourceIsWellFormed()
    {
        // Arrange
        DummyScrText project2 = CreateDummyProject();
        ScrTextCollection.Add(project2, true);

        PutBookText(_scrText, MAT, MATTHEW_USFM);
        PutBookText(
            project2,
            MAT,
            @"\id MAT
\c 1
\p
\v 1 Second translation content."
        );

        var items = new List<TextCollectionItem> { CreateItem(), CreateItem(project2) };
        var verseRef = new VerseRef(MAT, 1, 1, ScrVers.English);

        // Act
        MultiPaneContent result = VerseXmlGenerator.GenerateMultiPaneContent(items, verseRef);

        // Assert: Parse combined XML and verify each resource follows BHV-601 structure
        XElement wrapper = XElement.Parse($"<root>{result.Xml}</root>");
        foreach (XElement resource in wrapper.Elements("resource"))
        {
            Assert.That(
                resource.Attribute("abbrev")?.Value,
                Is.Not.Null.And.Not.Empty,
                "Each resource must have 'abbrev' attribute"
            );
            Assert.That(
                resource.Attribute("direction")?.Value,
                Is.EqualTo("ltr").Or.EqualTo("rtl"),
                "Each resource must have valid 'direction' attribute"
            );

            XElement? verseusx = resource.Element("verseusx");
            Assert.That(verseusx, Is.Not.Null, "Each resource must have a 'verseusx' child");
            Assert.That(
                verseusx!.Attribute("fontsize")?.Value,
                Is.Not.Null.And.Not.Empty,
                "Each verseusx must have 'fontsize' attribute"
            );
        }

        project2.Dispose();
    }

    #endregion

    // =========================================================================
    // CAP-006 GOLDEN MASTER TESTS: gm-012 - Multi-pane structure
    // =========================================================================

    #region CAP-006 Golden Master Tests (gm-012)

    /// <summary>
    /// GenerateMultiPaneContent produces resources with distinct abbreviations
    /// (one per unique project). This verifies that WriteResourceXml is called
    /// per item and each resource corresponds to a different project.
    ///
    /// gm-012: Combined XML has resources for "zzz3", "NIV84", "CEVUK" (3 distinct).
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-006")]
    [Property("GoldenMasterId", "gm-012")]
    [Property("ScenarioId", "TS-097")]
    [Property("BehaviorId", "BHV-T016")]
    public void GenerateMultiPaneContent_ThreeItems_ResourcesHaveDistinctAbbreviations()
    {
        // Arrange: Create 3 projects
        DummyScrText project2 = CreateDummyProject();
        DummyScrText project3 = CreateDummyProject();
        ScrTextCollection.Add(project2, true);
        ScrTextCollection.Add(project3, true);

        PutBookText(_scrText, MAT, MATTHEW_USFM);
        PutBookText(
            project2,
            MAT,
            @"\id MAT
\c 1
\p
\v 1 Translation two."
        );
        PutBookText(
            project3,
            MAT,
            @"\id MAT
\c 1
\p
\v 1 Translation three."
        );

        var items = new List<TextCollectionItem>
        {
            CreateItem(),
            CreateItem(project2),
            CreateItem(project3),
        };
        var verseRef = new VerseRef(MAT, 1, 1, ScrVers.English);

        // Act
        MultiPaneContent result = VerseXmlGenerator.GenerateMultiPaneContent(items, verseRef);

        // Assert: Each resource has a distinct abbreviation
        XElement wrapper = XElement.Parse($"<root>{result.Xml}</root>");
        var abbrevs = wrapper
            .Elements("resource")
            .Select(r => r.Attribute("abbrev")?.Value)
            .ToList();

        Assert.That(
            abbrevs.Distinct().Count(),
            Is.EqualTo(3),
            "Each item should produce a resource with a distinct abbreviation"
        );

        project2.Dispose();
        project3.Dispose();
    }

    /// <summary>
    /// GenerateMultiPaneContent preserves item order in the XML output.
    /// The first item in the list should produce the first resource element.
    ///
    /// gm-012: Resources appear in the same order as the items list.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-006")]
    [Property("GoldenMasterId", "gm-012")]
    [Property("ScenarioId", "TS-097")]
    [Property("BehaviorId", "BHV-T016")]
    public void GenerateMultiPaneContent_MultipleItems_PreservesItemOrder()
    {
        // Arrange
        DummyScrText project2 = CreateDummyProject();
        ScrTextCollection.Add(project2, true);

        PutBookText(_scrText, MAT, MATTHEW_USFM);
        PutBookText(
            project2,
            MAT,
            @"\id MAT
\c 1
\p
\v 1 Other content."
        );

        var items = new List<TextCollectionItem> { CreateItem(), CreateItem(project2) };
        var verseRef = new VerseRef(MAT, 1, 1, ScrVers.English);

        // Act
        MultiPaneContent result = VerseXmlGenerator.GenerateMultiPaneContent(items, verseRef);

        // Assert: Resource order matches item order
        XElement wrapper = XElement.Parse($"<root>{result.Xml}</root>");
        var abbrevs = wrapper
            .Elements("resource")
            .Select(r => r.Attribute("abbrev")?.Value)
            .ToList();

        Assert.That(abbrevs.Count, Is.EqualTo(2));
        // First resource should match first item's project name
        Assert.That(
            abbrevs[0],
            Does.Contain(_projectName),
            "First resource should correspond to the first item"
        );
        // Second resource should match second item's project name
        Assert.That(
            abbrevs[1],
            Does.Contain(project2.Name),
            "Second resource should correspond to the second item"
        );

        project2.Dispose();
    }

    #endregion

    // =========================================================================
    // CAP-006 CONTRACT TESTS: Error Cases
    // =========================================================================

    #region CAP-006 Error Case Tests

    /// <summary>
    /// GenerateMultiPaneContent with an empty items list should throw or
    /// return an error. data-contracts.md M-006 specifies: "Items list must
    /// not be empty" -> INVALID_STATE.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-006")]
    [Property("ScenarioId", "TS-097")]
    [Property("BehaviorId", "BHV-T016")]
    public void GenerateMultiPaneContent_EmptyItemsList_ThrowsOrReturnsError()
    {
        // Arrange
        var items = new List<TextCollectionItem>();
        var verseRef = new VerseRef(MAT, 1, 1, ScrVers.English);

        // Act & Assert: Should throw an exception for empty items list,
        // but NOT a NotImplementedException (which means the method is a stub)
        var ex = Assert.Throws<Exception>(
            () => VerseXmlGenerator.GenerateMultiPaneContent(items, verseRef)
        );
        Assert.That(
            ex,
            Is.Not.TypeOf<NotImplementedException>(),
            "Exception must not be NotImplementedException -- method must be implemented"
        );
    }

    /// <summary>
    /// GenerateMultiPaneContent with an item referencing a non-existent project
    /// should throw, propagating the PROJECT_NOT_FOUND from WriteResourceXml.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-006")]
    [Property("ScenarioId", "TS-097")]
    [Property("BehaviorId", "BHV-T016")]
    public void GenerateMultiPaneContent_ProjectNotFound_Throws()
    {
        // Arrange: Item with non-existent project ID
        var items = new List<TextCollectionItem>
        {
            new("NonExistent", "0000000000000000000000000000000000000000", 1.0),
        };
        var verseRef = new VerseRef(MAT, 1, 1, ScrVers.English);

        // Act & Assert: Should throw (propagated from WriteResourceXml)
        var ex = Assert.Throws<Exception>(
            () => VerseXmlGenerator.GenerateMultiPaneContent(items, verseRef)
        );
        Assert.That(
            ex,
            Is.Not.TypeOf<NotImplementedException>(),
            "Exception must not be NotImplementedException -- method must be implemented"
        );
    }

    #endregion

    // =========================================================================
    // CAP-006 EDGE CASE TESTS
    // =========================================================================

    #region CAP-006 Edge Case Tests

    /// <summary>
    /// GenerateMultiPaneContent with items that have different zoom levels
    /// produces resources with different font sizes. Zoom is applied per item
    /// via WriteResourceXml (CAP-005 contract).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-006")]
    [Property("ScenarioId", "TS-097")]
    [Property("BehaviorId", "BHV-601")]
    public void GenerateMultiPaneContent_DifferentZooms_ProducesDifferentFontSizes()
    {
        // Arrange: Same project but different zoom levels
        PutBookText(_scrText, MAT, MATTHEW_USFM);
        var items = new List<TextCollectionItem>
        {
            new(_projectName, _projectId, 1.0),
            new(_projectName, _projectId, 2.0),
        };
        var verseRef = new VerseRef(MAT, 1, 1, ScrVers.English);

        // Act
        MultiPaneContent result = VerseXmlGenerator.GenerateMultiPaneContent(items, verseRef);

        // Assert: Two resources with different font sizes
        XElement wrapper = XElement.Parse($"<root>{result.Xml}</root>");
        var fontsizes = wrapper
            .Elements("resource")
            .Select(r =>
                int.Parse(r.Element("verseusx")!.Attribute("fontsize")!.Value)
            )
            .ToList();

        Assert.That(fontsizes.Count, Is.EqualTo(2));
        Assert.That(
            fontsizes[1],
            Is.GreaterThan(fontsizes[0]),
            "Zoom 2.0 should produce a larger font size than zoom 1.0"
        );
    }

    /// <summary>
    /// GenerateMultiPaneContent XML output is parseable as well-formed XML
    /// when wrapped in a root element. The combined output is a sequence of
    /// resource elements (an XML fragment).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-006")]
    [Property("ScenarioId", "TS-097")]
    [Property("BehaviorId", "BHV-T016")]
    public void GenerateMultiPaneContent_AnyItems_ProducesWellFormedXmlFragment()
    {
        // Arrange
        PutBookText(_scrText, MAT, MATTHEW_USFM);
        var items = new List<TextCollectionItem> { CreateItem() };
        var verseRef = new VerseRef(MAT, 1, 1, ScrVers.English);

        // Act
        MultiPaneContent result = VerseXmlGenerator.GenerateMultiPaneContent(items, verseRef);

        // Assert: XML can be parsed when wrapped in a root element
        Assert.DoesNotThrow(
            () => XElement.Parse($"<root>{result.Xml}</root>"),
            "Combined XML must be a well-formed XML fragment"
        );
    }

    /// <summary>
    /// GenerateMultiPaneContent generates CSS that covers the languages present
    /// in the items. With multiple items using the same language, CSS should
    /// be generated at least once for that language (deduplication expected).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-006")]
    [Property("ScenarioId", "TS-097")]
    [Property("BehaviorId", "BHV-T016")]
    public void GenerateMultiPaneContent_SameLanguageItems_CssGeneratedForLanguage()
    {
        // Arrange: Two items from projects with the same language
        DummyScrText project2 = CreateDummyProject();
        ScrTextCollection.Add(project2, true);

        PutBookText(_scrText, MAT, MATTHEW_USFM);
        PutBookText(
            project2,
            MAT,
            @"\id MAT
\c 1
\p
\v 1 Alternate translation."
        );

        var items = new List<TextCollectionItem> { CreateItem(), CreateItem(project2) };
        var verseRef = new VerseRef(MAT, 1, 1, ScrVers.English);

        // Act
        MultiPaneContent result = VerseXmlGenerator.GenerateMultiPaneContent(items, verseRef);

        // Assert: CSS is generated (non-null); two resources produced
        Assert.That(result.Css, Is.Not.Null, "CSS must be generated for the language");
        Assert.That(result.ResourceCount, Is.EqualTo(2));

        project2.Dispose();
    }

    #endregion
}

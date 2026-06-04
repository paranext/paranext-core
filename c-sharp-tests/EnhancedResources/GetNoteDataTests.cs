using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.EnhancedResources;

namespace TestParanextDataProvider.EnhancedResources;

/// <summary>
/// Tests for GetNoteData - structured note data for footnotes, endnotes, and cross-references.
/// CAP-015: GetNoteData
///
/// Behaviors: BHV-613 (Note HTML Generation), BHV-614 (Footnote Caller Type Detection)
/// Contract: Section 4.15 M-015: GetNoteDataAsync(NoteInput, CancellationToken) -> NoteData
/// Source: EXT-010 (Note HTML Generation, PT9 MarbleForm.cs ~100 lines)
///
/// PT10 returns structured NoteData DTO instead of PT9's HTML. The caller type is
/// detected from the note style attribute ('f' = footnote, 'fe' = endnote, 'x' = cross-reference).
/// The caller marker is extracted from the 'caller' attribute (default '-' when not found).
/// The body is extracted as plain text from char elements. References are extracted from ref elements.
///
/// Golden masters: gm-014 (4 note data generation cases), gm-015 (3 caller default cases)
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
internal class GetNoteDataTests
{
    // =========================================================================
    // Test data constants - note XML from golden masters gm-014 and gm-015
    // =========================================================================

    // gm-014 case 1: Plain text note (non-XML legacy format)
    private const string PlainTextNote = "A note in the older text format rather than in XML";

    // gm-014 case 2: Standard footnote with fr/ft/fqa char styles
    private const string FootnoteWithChars =
        "<note style=\"f\" caller=\"+\">"
        + "<char style=\"fr\" closed=\"false\">7:13 </char>"
        + "<char style=\"ft\" closed=\"false\">Some manuscripts </char>"
        + "<char style=\"fqa\" closed=\"false\">for the way is wide and easy</char>"
        + "</note>";

    // gm-014 case 3: Cross-reference note with ref elements
    private const string CrossReferenceNote =
        "<note style=\"x\" caller=\"-\">"
        + "<char style=\"xo\" closed=\"false\">7:1 </char>"
        + "<char style=\"xt\" closed=\"false\">For </char>"
        + "<char style=\"xt\" closed=\"false\"><ref loc=\"MAT 7:1-5\">7:1\u20135</ref></char>"
        + "<char style=\"xt\" closed=\"false\">see parallel </char>"
        + " <char style=\"xt\" closed=\"false\">"
        + "<ref loc=\"LUK 6:37\">Luke 6:37</ref>, "
        + "<ref loc=\"LUK 6:38\">38</ref>, "
        + "<ref loc=\"LUK 6:41\">41</ref>, "
        + "<ref loc=\"LUK 6:42\">42</ref>"
        + "</char></note>";

    // gm-014 case 4: Footnote with linkedReference element
    private const string FootnoteWithLinkedRef =
        "<note style=\"f\" caller=\" + \">"
        + "<linkedReference refid=\"01900000000000\" image_links=\"BK00176\" />"
        + "<char style=\"fr\" closed=\"false\">9:0 </char>"
        + "<char style=\"ft\" closed=\"false\">Ps 9 and 10 together follow an acrostic pattern</char>"
        + "</note>";

    // gm-015 case 2: Footnote with caller='+' (explicit caller)
    private const string FootnoteWithExplicitCaller = FootnoteWithChars; // caller="+"

    // gm-015 case 3: Cross-reference with caller='-'
    private const string CrossRefWithDashCaller = CrossReferenceNote; // caller="-"

    // Note with missing caller attribute (TS-038 edge case)
    private const string NoteWithMissingCaller =
        "<note style=\"f\"><char style=\"ft\" closed=\"false\">body text</char></note>";

    // Malformed XML for error case
    private const string MalformedXml = "<note style=\"f\" caller=\"+\"><unclosed>";

    #region Acceptance Tests

    // =========================================================================
    // Acceptance Test 1: gm-014 - NoteData returned with correct caller marker
    // and note segments for all 4 golden master cases
    // =========================================================================

    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-015")]
    [Property("BehaviorId", "BHV-613")]
    [Property("ScenarioId", "TS-037")]
    [Property("GoldenMasterId", "gm-014")]
    [Property("ExtractionId", "EXT-010")]
    [Description(
        "gm-014 case 2: Standard footnote with fr/ft/fqa chars returns NoteData with callerType='footnote', callerMarker='+', and body containing note text"
    )]
    public void GetNoteData_StandardFootnote_ReturnsFootnoteNoteData()
    {
        // Arrange: Standard footnote with char styles (gm-014 case 2)
        var input = new NoteInput(NoteXml: FootnoteWithChars);

        // Act
        NoteData result = NoteService.GetNoteData(input);

        // Assert: NoteData has correct caller type and marker
        Assert.That(result, Is.Not.Null, "NoteData must not be null for valid footnote XML");
        Assert.That(
            result.CallerType,
            Is.EqualTo("footnote"),
            "Note style 'f' must map to callerType 'footnote'"
        );
        Assert.That(
            result.CallerMarker,
            Is.EqualTo("+"),
            "Caller marker must be '+' from caller attribute"
        );
        Assert.That(
            result.Body,
            Is.Not.Null.And.Not.Empty,
            "Body must contain note text extracted from char elements"
        );
        Assert.That(
            result.Body,
            Does.Contain("7:13"),
            "Body must include reference text from fr char"
        );
        Assert.That(
            result.Body,
            Does.Contain("Some manuscripts"),
            "Body must include footnote text from ft char"
        );
        Assert.That(
            result.Body,
            Does.Contain("for the way is wide and easy"),
            "Body must include quoted text from fqa char"
        );
    }

    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-015")]
    [Property("BehaviorId", "BHV-613")]
    [Property("ScenarioId", "TS-037")]
    [Property("GoldenMasterId", "gm-014")]
    [Property("ExtractionId", "EXT-010")]
    [Description(
        "gm-014 case 3: Cross-reference note with ref elements returns NoteData with callerType='cross-reference' and extracted references"
    )]
    public void GetNoteData_CrossReference_ReturnsCrossReferenceNoteData()
    {
        // Arrange: Cross-reference note with ref elements (gm-014 case 3)
        var input = new NoteInput(NoteXml: CrossReferenceNote);

        // Act
        NoteData result = NoteService.GetNoteData(input);

        // Assert: Cross-reference note data
        Assert.That(result, Is.Not.Null, "NoteData must not be null for valid cross-reference XML");
        Assert.That(
            result.CallerType,
            Is.EqualTo("cross-reference"),
            "Note style 'x' must map to callerType 'cross-reference'"
        );
        Assert.That(
            result.CallerMarker,
            Is.EqualTo("-"),
            "Caller marker must be '-' from caller attribute"
        );
        Assert.That(
            result.Body,
            Is.Not.Null.And.Not.Empty,
            "Body must contain cross-reference text"
        );
        Assert.That(result.Body, Does.Contain("7:1"), "Body must include reference origin text");
        Assert.That(
            result.References,
            Is.Not.Null.And.Not.Empty,
            "References must be extracted from ref elements"
        );
    }

    // =========================================================================
    // Acceptance Test 2: gm-015 - Default caller is '-' when not found
    // =========================================================================

    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-015")]
    [Property("BehaviorId", "BHV-614")]
    [Property("ScenarioId", "TS-038")]
    [Property("GoldenMasterId", "gm-015")]
    [Property("ExtractionId", "EXT-010")]
    [Description(
        "gm-015: Default caller is '-' when caller attribute is missing from note XML (BHV-614)"
    )]
    public void GetNoteData_MissingCallerAttribute_DefaultsToDash()
    {
        // Arrange: Note XML without caller attribute (gm-015 / TS-038)
        var input = new NoteInput(NoteXml: NoteWithMissingCaller);

        // Act
        NoteData result = NoteService.GetNoteData(input);

        // Assert: Default caller is '-' per BHV-614
        Assert.That(result, Is.Not.Null, "NoteData must not be null for valid XML");
        Assert.That(
            result.CallerMarker,
            Is.EqualTo("-"),
            "Caller marker must default to '-' when caller attribute is missing (BHV-614)"
        );
    }

    #endregion

    #region Golden Master Tests - gm-014 Parameterized

    // =========================================================================
    // Golden Master gm-014: 4 parameterized note data cases from MarbleFormTests
    // =========================================================================

    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-015")]
    [Property("BehaviorId", "BHV-613")]
    [Property("ScenarioId", "TS-037")]
    [Property("GoldenMasterId", "gm-014")]
    [Property("ExtractionId", "EXT-010")]
    [Description("gm-014 case 1: Plain text (non-XML) note returns NoteData with body text")]
    public void GetNoteData_PlainTextNote_ReturnsNoteDataWithBody()
    {
        // Arrange: Plain text note - legacy non-XML format (gm-014 case 1)
        var input = new NoteInput(NoteXml: PlainTextNote);

        // Act
        NoteData result = NoteService.GetNoteData(input);

        // Assert: Plain text note should still produce valid NoteData
        Assert.That(result, Is.Not.Null, "NoteData must not be null for plain text note");
        Assert.That(
            result.CallerMarker,
            Is.EqualTo("-"),
            "Plain text (non-XML) defaults caller to '-' (gm-015 confirms this)"
        );
        Assert.That(result.Body, Is.Not.Null.And.Not.Empty, "Body must contain the note text");
    }

    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-015")]
    [Property("BehaviorId", "BHV-613")]
    [Property("ScenarioId", "TS-037")]
    [Property("GoldenMasterId", "gm-014")]
    [Property("ExtractionId", "EXT-010")]
    [Description("gm-014 case 2: Standard footnote returns correct caller marker '+'")]
    public void GetNoteData_StandardFootnote_CallerMarkerIsPlus()
    {
        // Arrange
        var input = new NoteInput(NoteXml: FootnoteWithChars);

        // Act
        NoteData result = NoteService.GetNoteData(input);

        // Assert: gm-014 case 2 expects caller 'a' (passed externally) but note XML has caller='+'
        // PT10 extracts caller from XML, so callerMarker should be '+'
        Assert.That(
            result.CallerMarker,
            Is.EqualTo("+"),
            "Caller marker extracted from note XML caller attribute"
        );
    }

    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-015")]
    [Property("BehaviorId", "BHV-613")]
    [Property("ScenarioId", "TS-037")]
    [Property("GoldenMasterId", "gm-014")]
    [Property("ExtractionId", "EXT-010")]
    [Description(
        "gm-014 case 3: Cross-reference note extracts ref elements as SerializedVerseRef[]"
    )]
    public void GetNoteData_CrossReference_ExtractsRefElements()
    {
        // Arrange: Cross-reference with ref elements linking to MAT 7:1-5, LUK 6:37, 38, 41, 42
        var input = new NoteInput(NoteXml: CrossReferenceNote);

        // Act
        NoteData result = NoteService.GetNoteData(input);

        // Assert: References extracted from <ref loc="..."> elements
        Assert.That(
            result.References,
            Is.Not.Null,
            "References must not be null for cross-reference notes"
        );
        // The cross-reference has 5 ref elements: MAT 7:1-5, LUK 6:37, LUK 6:38, LUK 6:41, LUK 6:42
        Assert.That(
            result.References.Count,
            Is.GreaterThanOrEqualTo(5),
            "Cross-reference should extract at least 5 ref elements"
        );
    }

    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-015")]
    [Property("BehaviorId", "BHV-613")]
    [Property("ScenarioId", "TS-037")]
    [Property("GoldenMasterId", "gm-014")]
    [Property("ExtractionId", "EXT-010")]
    [Description(
        "gm-014 case 4: Footnote with linkedReference element returns footnote NoteData (linkedReference is ignored in body text)"
    )]
    public void GetNoteData_FootnoteWithLinkedReference_ReturnsFootnoteData()
    {
        // Arrange: Footnote with linkedReference element (gm-014 case 4)
        var input = new NoteInput(NoteXml: FootnoteWithLinkedRef);

        // Act
        NoteData result = NoteService.GetNoteData(input);

        // Assert: NoteData has footnote type and body from char elements
        Assert.That(result.CallerType, Is.EqualTo("footnote"), "Style 'f' maps to 'footnote'");
        // Note: caller attribute is ' + ' (with spaces) which should be trimmed to '+'
        Assert.That(
            result.CallerMarker,
            Is.EqualTo("+"),
            "Caller marker ' + ' (with spaces) should be trimmed to '+'"
        );
        Assert.That(
            result.Body,
            Does.Contain("Ps 9 and 10 together follow an acrostic pattern"),
            "Body must contain the footnote text from ft char"
        );
    }

    #endregion

    #region Golden Master Tests - gm-015 Caller Type Extraction

    // =========================================================================
    // Golden Master gm-015: 3 parameterized caller type cases
    // =========================================================================

    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-015")]
    [Property("BehaviorId", "BHV-614")]
    [Property("ScenarioId", "TS-038")]
    [Property("GoldenMasterId", "gm-015")]
    [Property("ExtractionId", "EXT-010")]
    [Description("gm-015 case 1: Plain text (non-XML) note defaults caller type to '-'")]
    public void GetNoteData_PlainTextNote_CallerDefaultsToDash()
    {
        // Arrange: gm-015 case 1 - plain text, not XML
        var input = new NoteInput(NoteXml: PlainTextNote);

        // Act
        NoteData result = NoteService.GetNoteData(input);

        // Assert: gm-015 expected callerType is '-' for plain text
        Assert.That(
            result.CallerMarker,
            Is.EqualTo("-"),
            "Plain text (non-XML) note must default caller to '-' (gm-015 case 1)"
        );
    }

    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-015")]
    [Property("BehaviorId", "BHV-614")]
    [Property("ScenarioId", "TS-038")]
    [Property("GoldenMasterId", "gm-015")]
    [Property("ExtractionId", "EXT-010")]
    [Description("gm-015 case 2: Footnote with caller='+' returns callerMarker '+'")]
    public void GetNoteData_FootnoteWithCallerPlus_CallerIsPlus()
    {
        // Arrange: gm-015 case 2 - footnote with explicit caller='+'
        var input = new NoteInput(NoteXml: FootnoteWithExplicitCaller);

        // Act
        NoteData result = NoteService.GetNoteData(input);

        // Assert: gm-015 expected callerType is '+' for caller='+' attribute
        Assert.That(
            result.CallerMarker,
            Is.EqualTo("+"),
            "Footnote with caller='+' must return callerMarker '+' (gm-015 case 2)"
        );
    }

    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-015")]
    [Property("BehaviorId", "BHV-614")]
    [Property("ScenarioId", "TS-038")]
    [Property("GoldenMasterId", "gm-015")]
    [Property("ExtractionId", "EXT-010")]
    [Description("gm-015 case 3: Cross-reference with caller='-' returns callerMarker '-'")]
    public void GetNoteData_CrossRefWithCallerDash_CallerIsDash()
    {
        // Arrange: gm-015 case 3 - cross-reference with caller='-'
        var input = new NoteInput(NoteXml: CrossRefWithDashCaller);

        // Act
        NoteData result = NoteService.GetNoteData(input);

        // Assert: gm-015 expected callerType is '-' for caller='-' attribute
        Assert.That(
            result.CallerMarker,
            Is.EqualTo("-"),
            "Cross-reference with caller='-' must return callerMarker '-' (gm-015 case 3)"
        );
    }

    #endregion

    #region Contract Tests - Caller Type Detection

    // =========================================================================
    // Contract: callerType detected from note style attribute
    // 'f' -> footnote, 'fe' -> endnote, 'x' -> cross-reference
    // =========================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-015")]
    [Property("BehaviorId", "BHV-613")]
    [Property("ScenarioId", "TS-037")]
    [Property("ExtractionId", "EXT-010")]
    [Description("Note style 'f' maps to callerType 'footnote'")]
    public void GetNoteData_StyleF_CallerTypeIsFootnote()
    {
        // Arrange: Note with style='f'
        var input = new NoteInput(NoteXml: FootnoteWithChars);

        // Act
        NoteData result = NoteService.GetNoteData(input);

        // Assert
        Assert.That(
            result.CallerType,
            Is.EqualTo("footnote"),
            "Note style 'f' must map to 'footnote'"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-015")]
    [Property("BehaviorId", "BHV-613")]
    [Property("ScenarioId", "TS-037")]
    [Property("ExtractionId", "EXT-010")]
    [Description("Note style 'x' maps to callerType 'cross-reference'")]
    public void GetNoteData_StyleX_CallerTypeIsCrossReference()
    {
        // Arrange: Note with style='x'
        var input = new NoteInput(NoteXml: CrossReferenceNote);

        // Act
        NoteData result = NoteService.GetNoteData(input);

        // Assert
        Assert.That(
            result.CallerType,
            Is.EqualTo("cross-reference"),
            "Note style 'x' must map to 'cross-reference'"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-015")]
    [Property("BehaviorId", "BHV-613")]
    [Property("ScenarioId", "TS-037")]
    [Property("ExtractionId", "EXT-010")]
    [Description("Note style 'fe' maps to callerType 'endnote'")]
    public void GetNoteData_StyleFe_CallerTypeIsEndnote()
    {
        // Arrange: Endnote with style='fe'
        const string endnoteXml =
            "<note style=\"fe\" caller=\"+\">"
            + "<char style=\"fr\" closed=\"false\">1:1 </char>"
            + "<char style=\"ft\" closed=\"false\">An endnote about the beginning</char>"
            + "</note>";
        var input = new NoteInput(NoteXml: endnoteXml);

        // Act
        NoteData result = NoteService.GetNoteData(input);

        // Assert
        Assert.That(
            result.CallerType,
            Is.EqualTo("endnote"),
            "Note style 'fe' must map to 'endnote'"
        );
    }

    #endregion

    #region Contract Tests - Body Text Extraction

    // =========================================================================
    // Contract: NoteData.body contains the note text from char elements
    // =========================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-015")]
    [Property("BehaviorId", "BHV-613")]
    [Property("ScenarioId", "TS-037")]
    [Property("ExtractionId", "EXT-010")]
    [Description("Body text is extracted from char elements within the note XML")]
    public void GetNoteData_FootnoteWithChars_BodyContainsCharElementText()
    {
        // Arrange
        var input = new NoteInput(NoteXml: FootnoteWithChars);

        // Act
        NoteData result = NoteService.GetNoteData(input);

        // Assert: Body should contain text from all char elements
        Assert.That(result.Body, Is.Not.Null.And.Not.Empty, "Body must not be empty");
        Assert.That(result.Body, Does.Contain("Some manuscripts"));
        Assert.That(result.Body, Does.Contain("for the way is wide and easy"));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-015")]
    [Property("BehaviorId", "BHV-613")]
    [Property("ScenarioId", "TS-037")]
    [Property("ExtractionId", "EXT-010")]
    [Description("Cross-reference body contains text from xt char elements")]
    public void GetNoteData_CrossReference_BodyContainsReferenceText()
    {
        // Arrange
        var input = new NoteInput(NoteXml: CrossReferenceNote);

        // Act
        NoteData result = NoteService.GetNoteData(input);

        // Assert: Body should contain text from xt char elements including ref text
        Assert.That(result.Body, Is.Not.Null.And.Not.Empty, "Body must not be empty");
        Assert.That(result.Body, Does.Contain("For"), "Body includes xt text 'For'");
        Assert.That(result.Body, Does.Contain("see parallel"), "Body includes xt text");
        Assert.That(
            result.Body,
            Does.Contain("Luke 6:37"),
            "Body includes ref display text from xt chars"
        );
    }

    #endregion

    #region Contract Tests - NoteData Structure

    // =========================================================================
    // Contract: NoteData record fields match Section 4.15 Result Type
    // =========================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-015")]
    [Property("BehaviorId", "BHV-613")]
    [Property("ScenarioId", "TS-037")]
    [Property("ExtractionId", "EXT-010")]
    [Description(
        "NoteData has all 4 fields: callerType, callerMarker, body, references (Section 4.15)"
    )]
    public void GetNoteData_ValidInput_NoteDataHasAllContractFields()
    {
        // Arrange
        var input = new NoteInput(NoteXml: FootnoteWithChars);

        // Act
        NoteData result = NoteService.GetNoteData(input);

        // Assert: Verify all 4 fields exist and are accessible (structural contract)
        Assert.That(result.CallerType, Is.Not.Null, "CallerType field must exist and be non-null");
        Assert.That(
            result.CallerMarker,
            Is.Not.Null,
            "CallerMarker field must exist and be non-null"
        );
        Assert.That(result.Body, Is.Not.Null, "Body field must exist and be non-null");
        Assert.That(result.References, Is.Not.Null, "References field must exist (may be empty)");
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-015")]
    [Property("BehaviorId", "BHV-613")]
    [Property("ScenarioId", "TS-037")]
    [Property("ExtractionId", "EXT-010")]
    [Description("NoteData contains no HTML - all fields are plain text or structured data")]
    public void GetNoteData_ValidInput_NoHtmlInAnyField()
    {
        // Arrange
        var input = new NoteInput(NoteXml: FootnoteWithChars);

        // Act
        NoteData result = NoteService.GetNoteData(input);

        // Assert: No HTML tags - Theme 2 mandates structured data, not HTML
        Assert.That(result.CallerType, Does.Not.Contain("<"), "CallerType must not contain HTML");
        Assert.That(
            result.CallerMarker,
            Does.Not.Contain("<"),
            "CallerMarker must not contain HTML"
        );
        Assert.That(result.Body, Does.Not.Contain("<"), "Body must not contain HTML tags");
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-015")]
    [Property("BehaviorId", "BHV-613")]
    [Property("ScenarioId", "TS-037")]
    [Property("ExtractionId", "EXT-010")]
    [Description("callerType is one of the three valid enum values")]
    public void GetNoteData_ValidInput_CallerTypeIsValidEnum()
    {
        // Arrange
        var input = new NoteInput(NoteXml: FootnoteWithChars);

        // Act
        NoteData result = NoteService.GetNoteData(input);

        // Assert: callerType must be one of the 3 valid values per contract
        string[] validCallerTypes = ["footnote", "endnote", "cross-reference"];
        Assert.That(
            validCallerTypes,
            Does.Contain(result.CallerType),
            "CallerType must be 'footnote', 'endnote', or 'cross-reference'"
        );
    }

    #endregion

    #region Contract Tests - References Extraction

    // =========================================================================
    // Contract: References extracted from ref elements in cross-reference notes
    // =========================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-015")]
    [Property("BehaviorId", "BHV-613")]
    [Property("ScenarioId", "TS-037")]
    [Property("ExtractionId", "EXT-010")]
    [Description("Footnote without ref elements returns empty References array")]
    public void GetNoteData_FootnoteNoRefs_ReferencesArrayEmpty()
    {
        // Arrange: Footnote has no ref elements
        var input = new NoteInput(NoteXml: FootnoteWithChars);

        // Act
        NoteData result = NoteService.GetNoteData(input);

        // Assert
        Assert.That(
            result.References,
            Is.Not.Null.And.Empty,
            "Footnote without ref elements should have empty References"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-015")]
    [Property("BehaviorId", "BHV-613")]
    [Property("ScenarioId", "TS-037")]
    [Property("ExtractionId", "EXT-010")]
    [Description(
        "Cross-reference with ref elements extracts SerializedVerseRef array from loc attributes"
    )]
    public void GetNoteData_CrossRefWithRefs_ExtractsVerseRefsFromLocAttributes()
    {
        // Arrange: Cross-reference has refs: MAT 7:1-5, LUK 6:37, LUK 6:38, LUK 6:41, LUK 6:42
        var input = new NoteInput(NoteXml: CrossReferenceNote);

        // Act
        NoteData result = NoteService.GetNoteData(input);

        // Assert: References parsed from ref loc attributes
        Assert.That(result.References, Is.Not.Null.And.Not.Empty, "References must be extracted");
        // Verify references are real verse references (not default/empty structs)
        foreach (var verseRef in result.References)
        {
            Assert.That(
                verseRef.BookNum,
                Is.GreaterThan(0),
                "Each reference must have a valid book number (not a default VerseRef)"
            );
        }
    }

    #endregion

    #region Error Cases

    // =========================================================================
    // Error condition: Null/empty XML -> INVALID_ARGUMENT PlatformError
    // Contract Section 4.15 Error Conditions
    // =========================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-015")]
    [Property("BehaviorId", "BHV-613")]
    [Property("ScenarioId", "TS-037")]
    [Property("ExtractionId", "EXT-010")]
    [Description("Null note XML throws INVALID_ARGUMENT PlatformError")]
    public void GetNoteData_NullXml_ThrowsInvalidArgument()
    {
        // Arrange
        var input = new NoteInput(NoteXml: null!);

        // Act & Assert
        var ex = Assert.Throws<InvalidOperationException>(() => NoteService.GetNoteData(input));

        Assert.That(ex, Is.Not.Null);
        Assert.That(
            ex!.Data["platformErrorCode"],
            Is.EqualTo("INVALID_ARGUMENT"),
            "Must use INVALID_ARGUMENT error code"
        );
        Assert.That(
            ex.Message,
            Does.Contain("Note XML must not be empty"),
            "Error message must match contract"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-015")]
    [Property("BehaviorId", "BHV-613")]
    [Property("ScenarioId", "TS-037")]
    [Property("ExtractionId", "EXT-010")]
    [Description("Empty string note XML throws INVALID_ARGUMENT PlatformError")]
    public void GetNoteData_EmptyXml_ThrowsInvalidArgument()
    {
        // Arrange
        var input = new NoteInput(NoteXml: "");

        // Act & Assert
        var ex = Assert.Throws<InvalidOperationException>(() => NoteService.GetNoteData(input));

        Assert.That(ex, Is.Not.Null);
        Assert.That(
            ex!.Data["platformErrorCode"],
            Is.EqualTo("INVALID_ARGUMENT"),
            "Must use INVALID_ARGUMENT error code"
        );
        Assert.That(
            ex.Message,
            Does.Contain("Note XML must not be empty"),
            "Error message must match contract"
        );
    }

    // =========================================================================
    // Error condition: Malformed XML -> INTERNAL PlatformError
    // =========================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-015")]
    [Property("BehaviorId", "BHV-613")]
    [Property("ScenarioId", "TS-037")]
    [Property("ExtractionId", "EXT-010")]
    [Description("Malformed XML throws INTERNAL PlatformError")]
    public void GetNoteData_MalformedXml_ThrowsInternalError()
    {
        // Arrange: XML that cannot be parsed
        var input = new NoteInput(NoteXml: MalformedXml);

        // Act & Assert
        var ex = Assert.Throws<InvalidOperationException>(() => NoteService.GetNoteData(input));

        Assert.That(ex, Is.Not.Null);
        Assert.That(
            ex!.Data["platformErrorCode"],
            Is.EqualTo("INTERNAL"),
            "Must use INTERNAL error code for malformed XML"
        );
        Assert.That(
            ex.Message,
            Does.Contain("Failed to parse note XML"),
            "Error message must match contract"
        );
    }

    #endregion

    #region Determinism and Structural Guarantees

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-015")]
    [Property("BehaviorId", "BHV-613")]
    [Property("ScenarioId", "TS-037")]
    [Property("ExtractionId", "EXT-010")]
    [Description("Same input always produces same output (stateless, deterministic)")]
    public void GetNoteData_SameInput_AlwaysReturnsSameResult()
    {
        // Arrange
        var input = new NoteInput(NoteXml: FootnoteWithChars);

        // Act
        NoteData result1 = NoteService.GetNoteData(input);
        NoteData result2 = NoteService.GetNoteData(input);

        // Assert
        Assert.That(result1.CallerType, Is.EqualTo(result2.CallerType));
        Assert.That(result1.CallerMarker, Is.EqualTo(result2.CallerMarker));
        Assert.That(result1.Body, Is.EqualTo(result2.Body));
        Assert.That(result1.References.Count, Is.EqualTo(result2.References.Count));
    }

    #endregion
}

using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.EnhancedResources;

namespace TestParanextDataProvider.EnhancedResources;

/// <summary>
/// Tests for LexiconService.ParseLexicalLinksAsync (CAP-001).
///
/// Parses semicolon-separated lexical link strings from USX character elements
/// into structured LexicalLink objects. Format: "Dictionary:Lemma:BBBMMM" where
/// BBB and MMM are 3-digit zero-padded indices.
///
/// Contract: Section 4.1 ParseLexicalLinks (data-contracts.md)
/// Behavior: BHV-302 (Lexical Link Data Model)
/// Extraction: EXT-001 (Lexical Link Parsing and Format Handling)
/// Invariant: INV-013 (Book-to-Dictionary Mapping)
/// Golden Master: GM-007 (Lexical Link Parsing)
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
public class LexiconServiceTests
{
    // =========================================================================
    // ACCEPTANCE TEST (OUTER LOOP) - The "done signal" for CAP-001
    // =========================================================================

    /// <summary>
    /// Acceptance test: When ParseLexicalLinks is called with valid link strings,
    /// it produces structured LexicalLink objects with correct dictionary, lemma,
    /// baseFormIndex, and meaningIndex. This matches the GM-007 golden master.
    ///
    /// This test passes when CAP-001 is COMPLETE.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-001")]
    [Property("ScenarioId", "TS-035")]
    [Property("BehaviorId", "BHV-302")]
    [Property("GoldenMaster", "GM-007")]
    [Description(
        "Acceptance test: Lexical link strings parsed into structured LexicalLink "
            + "objects with correct dictionary, lemma, baseFormIndex, and meaningIndex"
    )]
    public async Task ParseLexicalLinks_AcceptanceTest_MatchesGoldenMaster()
    {
        // Arrange: GM-007 single link input
        var singleInput = new LexicalLinkInput("SDBG:agapao:001002");

        // Act: Call the public API defined in data-contracts.md Section 4.1
        var singleResult = await LexiconService.ParseLexicalLinksAsync(
            singleInput,
            CancellationToken.None
        );

        // Assert: Verify single link matches GM-007 expected output exactly
        Assert.That(singleResult.Success, Is.True, "Single link parsing should succeed");
        Assert.That(singleResult.Links, Is.Not.Null);
        Assert.That(singleResult.Links!, Has.Count.EqualTo(1));

        var link = singleResult.Links![0];
        Assert.That(link.Dictionary, Is.EqualTo("SDBG"), "GM-007: dictionary should be SDBG");
        Assert.That(link.Lemma, Is.EqualTo("agapao"), "GM-007: lemma should be agapao");
        Assert.That(link.BaseFormIndex, Is.EqualTo(1), "GM-007: baseFormIndex should be 1");
        Assert.That(link.MeaningIndex, Is.EqualTo(2), "GM-007: meaningIndex should be 2");

        // Arrange: GM-007 multiple links input
        var multiInput = new LexicalLinkInput("SDBG:agapao:001002;SDBG:theos:001001");

        // Act: Parse multi-link string
        var multiResult = await LexiconService.ParseLexicalLinksAsync(
            multiInput,
            CancellationToken.None
        );

        // Assert: Verify multi-link matches GM-007 expected output
        Assert.That(multiResult.Success, Is.True, "Multi-link parsing should succeed");
        Assert.That(multiResult.Links, Is.Not.Null);
        Assert.That(
            multiResult.Links!,
            Has.Count.EqualTo(2),
            "GM-007: multipleLinks should produce 2 links"
        );

        var link0 = multiResult.Links![0];
        Assert.That(link0.Dictionary, Is.EqualTo("SDBG"));
        Assert.That(link0.Lemma, Is.EqualTo("agapao"));
        Assert.That(link0.BaseFormIndex, Is.EqualTo(1));
        Assert.That(link0.MeaningIndex, Is.EqualTo(2));

        var link1 = multiResult.Links![1];
        Assert.That(link1.Dictionary, Is.EqualTo("SDBG"));
        Assert.That(link1.Lemma, Is.EqualTo("theos"));
        Assert.That(link1.BaseFormIndex, Is.EqualTo(1));
        Assert.That(link1.MeaningIndex, Is.EqualTo(1));
    }

    // =========================================================================
    // CONTRACT TESTS - Happy Path
    // =========================================================================

    /// <summary>
    /// TS-035: A standard single lexical link string is parsed correctly.
    /// "SDBG:agapao:001002" -> Dictionary=SDBG, Lemma=agapao, BaseFormIndex=1, MeaningIndex=2
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-035")]
    [Property("BehaviorId", "BHV-302")]
    [Property("ExtractionId", "EXT-001")]
    [Description("Single lexical link parses Dictionary:Lemma:BBBMMM format correctly")]
    public async Task ParseLexicalLinks_SingleLink_ParsesCorrectly()
    {
        // Arrange: Standard link string from TS-035
        var input = new LexicalLinkInput("SDBG:agapao:001002");

        // Act
        var result = await LexiconService.ParseLexicalLinksAsync(input, CancellationToken.None);

        // Assert: Per TS-035 expected output
        Assert.That(result.Success, Is.True, "Parsing a valid single link should succeed");
        Assert.That(result.Links, Is.Not.Null);
        Assert.That(
            result.Links!,
            Has.Count.EqualTo(1),
            "Single link should produce exactly 1 result"
        );

        var link = result.Links![0];
        Assert.That(link.Dictionary, Is.EqualTo("SDBG"), "Dictionary should be SDBG");
        Assert.That(link.Lemma, Is.EqualTo("agapao"), "Lemma should be agapao");
        Assert.That(
            link.BaseFormIndex,
            Is.EqualTo(1),
            "BaseFormIndex: 001 -> 1 (3-digit zero-padded)"
        );
        Assert.That(
            link.MeaningIndex,
            Is.EqualTo(2),
            "MeaningIndex: 002 -> 2 (3-digit zero-padded)"
        );
    }

    /// <summary>
    /// TS-036: Multiple lexical links per word parsed from semicolon-separated string.
    /// "SDBG:agapao:001002;SDBG:theos:001001" -> 2 links
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-036")]
    [Property("BehaviorId", "BHV-302")]
    [Property("ExtractionId", "EXT-001")]
    [Description("Semicolon-separated multiple links parsed into correct count")]
    public async Task ParseLexicalLinks_MultipleLinksSemicolonSeparated_ParsesBoth()
    {
        // Arrange: TS-036 edge case - multiple links per word
        var input = new LexicalLinkInput("SDBG:agapao:001002;SDBG:theos:001001");

        // Act
        var result = await LexiconService.ParseLexicalLinksAsync(input, CancellationToken.None);

        // Assert: Per TS-036 expected output - count of 2
        Assert.That(result.Success, Is.True, "Parsing multiple valid links should succeed");
        Assert.That(result.Links, Is.Not.Null);
        Assert.That(
            result.Links!,
            Has.Count.EqualTo(2),
            "Two semicolon-separated links should produce 2 results"
        );

        // Verify first link
        Assert.That(result.Links![0].Dictionary, Is.EqualTo("SDBG"));
        Assert.That(result.Links![0].Lemma, Is.EqualTo("agapao"));
        Assert.That(result.Links![0].BaseFormIndex, Is.EqualTo(1));
        Assert.That(result.Links![0].MeaningIndex, Is.EqualTo(2));

        // Verify second link
        Assert.That(result.Links![1].Dictionary, Is.EqualTo("SDBG"));
        Assert.That(result.Links![1].Lemma, Is.EqualTo("theos"));
        Assert.That(result.Links![1].BaseFormIndex, Is.EqualTo(1));
        Assert.That(result.Links![1].MeaningIndex, Is.EqualTo(1));
    }

    /// <summary>
    /// Verify that zero-padded BBBMMM indices are decoded correctly.
    /// "001002" -> BaseFormIndex=1, MeaningIndex=2
    /// "003005" -> BaseFormIndex=3, MeaningIndex=5
    /// Leading zeros are significant during parsing.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-035")]
    [Property("BehaviorId", "BHV-302")]
    [Property("ExtractionId", "EXT-001")]
    [Description("Zero-padded BBBMMM indices decoded correctly: 001002 -> baseForm=1, meaning=2")]
    public async Task ParseLexicalLinks_ZeroPaddedIndices_DecodesCorrectly()
    {
        // Arrange: Various zero-padded index values
        var input1 = new LexicalLinkInput("SDBG:test:001002");
        var input2 = new LexicalLinkInput("SDBH:word:003005");
        var input3 = new LexicalLinkInput("DCLEX:entry:010020");

        // Act
        var result1 = await LexiconService.ParseLexicalLinksAsync(input1, CancellationToken.None);
        var result2 = await LexiconService.ParseLexicalLinksAsync(input2, CancellationToken.None);
        var result3 = await LexiconService.ParseLexicalLinksAsync(input3, CancellationToken.None);

        // Assert: Zero-padded values are correctly converted to integers
        Assert.That(result1.Success, Is.True);
        Assert.That(result1.Links![0].BaseFormIndex, Is.EqualTo(1), "001 -> 1");
        Assert.That(result1.Links![0].MeaningIndex, Is.EqualTo(2), "002 -> 2");

        Assert.That(result2.Success, Is.True);
        Assert.That(result2.Links![0].BaseFormIndex, Is.EqualTo(3), "003 -> 3");
        Assert.That(result2.Links![0].MeaningIndex, Is.EqualTo(5), "005 -> 5");

        Assert.That(result3.Success, Is.True);
        Assert.That(result3.Links![0].BaseFormIndex, Is.EqualTo(10), "010 -> 10");
        Assert.That(result3.Links![0].MeaningIndex, Is.EqualTo(20), "020 -> 20");
    }

    /// <summary>
    /// Verify all three valid dictionary names are accepted: SDBG, SDBH, DCLEX.
    /// </summary>
    [TestCase("SDBG:lemma:001001", "SDBG")]
    [TestCase("SDBH:lemma:001001", "SDBH")]
    [TestCase("DCLEX:lemma:001001", "DCLEX")]
    [Category("Contract")]
    [Property("ScenarioId", "TS-035")]
    [Property("BehaviorId", "BHV-302")]
    [Description("All valid dictionary names (SDBG, SDBH, DCLEX) are accepted")]
    public async Task ParseLexicalLinks_ValidDictionaries_AcceptsAll(
        string linkString,
        string expectedDictionary
    )
    {
        // Arrange
        var input = new LexicalLinkInput(linkString);

        // Act
        var result = await LexiconService.ParseLexicalLinksAsync(input, CancellationToken.None);

        // Assert
        Assert.That(result.Success, Is.True);
        Assert.That(result.Links![0].Dictionary, Is.EqualTo(expectedDictionary));
    }

    // =========================================================================
    // CONTRACT TESTS - Error Cases
    // =========================================================================

    /// <summary>
    /// Null link string returns INVALID_INPUT error.
    /// Per data-contracts.md Section 4.1 error conditions.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-035")]
    [Property("BehaviorId", "BHV-302")]
    [Description("Null link string returns INVALID_INPUT error")]
    public async Task ParseLexicalLinks_NullLinkString_ReturnsInvalidInput()
    {
        // Arrange: Null link string
        var input = new LexicalLinkInput(null!);

        // Act
        var result = await LexiconService.ParseLexicalLinksAsync(input, CancellationToken.None);

        // Assert: Per Section 4.1 error conditions
        Assert.That(result.Success, Is.False, "Null input should fail");
        Assert.That(result.Error, Is.Not.Null);
        Assert.That(
            result.Error!.Code,
            Is.EqualTo("INVALID_INPUT"),
            "Error code should be INVALID_INPUT"
        );
        Assert.That(
            result.Error.Message,
            Is.EqualTo("Link string must not be null or empty"),
            "Error message should match contract"
        );
    }

    /// <summary>
    /// Empty link string returns INVALID_INPUT error.
    /// Per data-contracts.md Section 4.1 error conditions.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-035")]
    [Property("BehaviorId", "BHV-302")]
    [Description("Empty link string returns INVALID_INPUT error")]
    public async Task ParseLexicalLinks_EmptyLinkString_ReturnsInvalidInput()
    {
        // Arrange: Empty link string
        var input = new LexicalLinkInput("");

        // Act
        var result = await LexiconService.ParseLexicalLinksAsync(input, CancellationToken.None);

        // Assert: Per Section 4.1 error conditions
        Assert.That(result.Success, Is.False, "Empty input should fail");
        Assert.That(result.Error, Is.Not.Null);
        Assert.That(result.Error!.Code, Is.EqualTo("INVALID_INPUT"));
        Assert.That(result.Error.Message, Is.EqualTo("Link string must not be null or empty"));
    }

    /// <summary>
    /// Malformed link format (wrong number of colon-separated parts) returns PARSE_ERROR.
    /// Per data-contracts.md Section 4.1: "Invalid lexical link format"
    /// </summary>
    [TestCase("SDBG:agapao", Description = "Missing BBBMMM portion")]
    [TestCase("SDBG", Description = "Only dictionary name")]
    [TestCase("just-text", Description = "No colons at all")]
    [TestCase("SDBG:agapao:001002:extra", Description = "Too many colon-separated parts")]
    [Category("Contract")]
    [Property("ScenarioId", "TS-035")]
    [Property("BehaviorId", "BHV-302")]
    [Description("Malformed link format returns PARSE_ERROR")]
    public async Task ParseLexicalLinks_MalformedFormat_ReturnsParseError(string linkString)
    {
        // Arrange
        var input = new LexicalLinkInput(linkString);

        // Act
        var result = await LexiconService.ParseLexicalLinksAsync(input, CancellationToken.None);

        // Assert: Per Section 4.1 error conditions
        Assert.That(result.Success, Is.False, $"Malformed input '{linkString}' should fail");
        Assert.That(result.Error, Is.Not.Null);
        Assert.That(result.Error!.Code, Is.EqualTo("PARSE_ERROR"));
        Assert.That(
            result.Error.Message,
            Is.EqualTo("Invalid lexical link format: expected 'Dictionary:Lemma:BBBMMM'"),
            "Error message should match contract exactly"
        );
    }

    /// <summary>
    /// Invalid BBBMMM indices (non-numeric) return PARSE_ERROR.
    /// Per data-contracts.md Section 4.1: "Invalid base form or meaning index in link"
    /// </summary>
    [TestCase("SDBG:agapao:abcdef", Description = "Non-numeric indices")]
    [TestCase("SDBG:agapao:001abc", Description = "Partially non-numeric")]
    [TestCase("SDBG:agapao:12", Description = "Too few digits")]
    [Category("Contract")]
    [Property("ScenarioId", "TS-035")]
    [Property("BehaviorId", "BHV-302")]
    [Description("Invalid BBBMMM indices return PARSE_ERROR")]
    public async Task ParseLexicalLinks_InvalidIndices_ReturnsParseError(string linkString)
    {
        // Arrange
        var input = new LexicalLinkInput(linkString);

        // Act
        var result = await LexiconService.ParseLexicalLinksAsync(input, CancellationToken.None);

        // Assert: Per Section 4.1 error conditions
        Assert.That(result.Success, Is.False, $"Invalid indices in '{linkString}' should fail");
        Assert.That(result.Error, Is.Not.Null);
        Assert.That(result.Error!.Code, Is.EqualTo("PARSE_ERROR"));
        Assert.That(
            result.Error.Message,
            Is.EqualTo("Invalid base form or meaning index in link"),
            "Error message should match contract exactly"
        );
    }

    /// <summary>
    /// When a multi-link string contains one malformed link, the entire parse fails.
    /// Per EXT-001: ParseLexicalLinks returns a list or fails entirely.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-036")]
    [Property("BehaviorId", "BHV-302")]
    [Description("Multi-link string with one malformed link fails entirely")]
    public async Task ParseLexicalLinks_MultiLinkWithOneMalformed_ReturnsError()
    {
        // Arrange: First link valid, second link malformed
        var input = new LexicalLinkInput("SDBG:agapao:001002;badlink");

        // Act
        var result = await LexiconService.ParseLexicalLinksAsync(input, CancellationToken.None);

        // Assert: Entire parse should fail
        Assert.That(result.Success, Is.False, "Multi-link with malformed entry should fail");
        Assert.That(result.Error, Is.Not.Null);
        Assert.That(result.Error!.Code, Is.EqualTo("PARSE_ERROR"));
    }

    // =========================================================================
    // GOLDEN MASTER TESTS - GM-007
    // =========================================================================

    /// <summary>
    /// GM-007: Single link golden master verification.
    /// Input: "SDBG:agapao:001002"
    /// Expected: { dictionary: "SDBG", lemma: "agapao", baseFormIndex: 1, meaningIndex: 2 }
    /// Comparison strategy: exact
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("ScenarioId", "TS-035")]
    [Property("BehaviorId", "BHV-302")]
    [Property("GoldenMaster", "GM-007")]
    [Description("GM-007: Single link parsing matches PT9 golden master exactly")]
    public async Task GoldenMaster_GM007_SingleLinkParsing()
    {
        // GM-007 input: singleLink = "SDBG:agapao:001002"
        var input = new LexicalLinkInput("SDBG:agapao:001002");

        // Act
        var result = await LexiconService.ParseLexicalLinksAsync(input, CancellationToken.None);

        // Assert: Exact match to GM-007 expected-output.json singleLink section
        Assert.That(result.Success, Is.True);
        Assert.That(result.Links, Has.Count.EqualTo(1));

        var link = result.Links![0];
        Assert.That(link.Dictionary, Is.EqualTo("SDBG"), "GM-007 singleLink.dictionary");
        Assert.That(link.Lemma, Is.EqualTo("agapao"), "GM-007 singleLink.lemma");
        Assert.That(link.BaseFormIndex, Is.EqualTo(1), "GM-007 singleLink.baseFormIndex");
        Assert.That(link.MeaningIndex, Is.EqualTo(2), "GM-007 singleLink.meaningIndex");
    }

    /// <summary>
    /// GM-007: Multiple links golden master verification.
    /// Input: "SDBG:agapao:001002;SDBG:theos:001001"
    /// Expected: count=2, links[0]={SDBG, agapao, 1, 2}, links[1]={SDBG, theos, 1, 1}
    /// Comparison strategy: exact
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("ScenarioId", "TS-036")]
    [Property("BehaviorId", "BHV-302")]
    [Property("GoldenMaster", "GM-007")]
    [Description("GM-007: Multiple link parsing matches PT9 golden master exactly")]
    public async Task GoldenMaster_GM007_MultipleLinkParsing()
    {
        // GM-007 input: multipleLinks = "SDBG:agapao:001002;SDBG:theos:001001"
        var input = new LexicalLinkInput("SDBG:agapao:001002;SDBG:theos:001001");

        // Act
        var result = await LexiconService.ParseLexicalLinksAsync(input, CancellationToken.None);

        // Assert: Exact match to GM-007 expected-output.json multipleLinks section
        Assert.That(result.Success, Is.True);
        Assert.That(result.Links, Has.Count.EqualTo(2), "GM-007: count should be 2");

        // First link
        Assert.That(result.Links![0].Dictionary, Is.EqualTo("SDBG"));
        Assert.That(result.Links![0].Lemma, Is.EqualTo("agapao"));
        Assert.That(result.Links![0].BaseFormIndex, Is.EqualTo(1));
        Assert.That(result.Links![0].MeaningIndex, Is.EqualTo(2));

        // Second link
        Assert.That(result.Links![1].Dictionary, Is.EqualTo("SDBG"));
        Assert.That(result.Links![1].Lemma, Is.EqualTo("theos"));
        Assert.That(result.Links![1].BaseFormIndex, Is.EqualTo(1));
        Assert.That(result.Links![1].MeaningIndex, Is.EqualTo(1));
    }

    // =========================================================================
    // INVARIANT TESTS - INV-013 (Book-to-Dictionary Mapping)
    // =========================================================================

    /// <summary>
    /// INV-013: OT books map to SDBH dictionary.
    /// Canon.IsBookOT returns true for Genesis (book 1) through Malachi (book 39).
    /// TS-066: Get dictionary for OT book (GEN) -> SDBH.
    /// </summary>
    [TestCase(1, "SDBH", Description = "GEN (Genesis) -> SDBH")]
    [TestCase(2, "SDBH", Description = "EXO (Exodus) -> SDBH")]
    [TestCase(19, "SDBH", Description = "PSA (Psalms) -> SDBH")]
    [TestCase(39, "SDBH", Description = "MAL (Malachi) -> SDBH")]
    [Category("Invariant")]
    [Property("InvariantId", "INV-013")]
    [Property("ScenarioId", "TS-066")]
    [Property("BehaviorId", "BHV-302")]
    [Description("INV-013: OT books (1-39) map to SDBH (Hebrew dictionary)")]
    public void GetDictionaryForBook_OtBooks_ReturnsSdbh(int bookNumber, string expectedDictionary)
    {
        // INV-013: "Old Testament books use SDBH (Hebrew dictionary)"
        // Determined by Canon.IsBookOT
        var result = LexiconService.GetDictionaryForBook(bookNumber);

        Assert.That(
            result,
            Is.EqualTo(expectedDictionary),
            $"INV-013: Book {bookNumber} should map to {expectedDictionary}"
        );
    }

    /// <summary>
    /// INV-013: NT books map to SDBG dictionary.
    /// Canon.IsBookNT returns true for Matthew (book 40) through Revelation (book 66).
    /// TS-067: Get dictionary for NT book (MAT) -> SDBG.
    /// </summary>
    [TestCase(40, "SDBG", Description = "MAT (Matthew) -> SDBG")]
    [TestCase(41, "SDBG", Description = "MRK (Mark) -> SDBG")]
    [TestCase(43, "SDBG", Description = "JHN (John) -> SDBG")]
    [TestCase(66, "SDBG", Description = "REV (Revelation) -> SDBG")]
    [Category("Invariant")]
    [Property("InvariantId", "INV-013")]
    [Property("ScenarioId", "TS-067")]
    [Property("BehaviorId", "BHV-302")]
    [Description("INV-013: NT books (40-66) map to SDBG (Greek dictionary)")]
    public void GetDictionaryForBook_NtBooks_ReturnsSdbg(int bookNumber, string expectedDictionary)
    {
        // INV-013: "New Testament books use SDBG (Greek dictionary)"
        // Determined by Canon.IsBookNT
        var result = LexiconService.GetDictionaryForBook(bookNumber);

        Assert.That(
            result,
            Is.EqualTo(expectedDictionary),
            $"INV-013: Book {bookNumber} should map to {expectedDictionary}"
        );
    }

    /// <summary>
    /// INV-013: DC (Deuterocanonical) books map to DCLEX dictionary.
    /// Books that are neither OT nor NT are Deuterocanonical.
    /// TS-068: Get dictionary for DC book (JDT/Judith) -> DCLEX.
    ///
    /// Note: Deuterocanonical book numbers vary by versification system.
    /// Judith is typically book 68 in some numbering schemes.
    /// Using SIL.Scripture.Canon to determine testament is the authoritative approach.
    /// </summary>
    [TestCase(67, "DCLEX", Description = "TOB (Tobit) -> DCLEX")]
    [TestCase(68, "DCLEX", Description = "JDT (Judith) -> DCLEX")]
    [TestCase(69, "DCLEX", Description = "ESG (Esther Greek) -> DCLEX")]
    [Category("Invariant")]
    [Property("InvariantId", "INV-013")]
    [Property("ScenarioId", "TS-068")]
    [Property("BehaviorId", "BHV-302")]
    [Description("INV-013: DC books map to DCLEX (Deuterocanon dictionary)")]
    public void GetDictionaryForBook_DcBooks_ReturnsDclex(int bookNumber, string expectedDictionary)
    {
        // INV-013: "Deuterocanonical books use DCLEX"
        // Books that are neither OT nor NT
        var result = LexiconService.GetDictionaryForBook(bookNumber);

        Assert.That(
            result,
            Is.EqualTo(expectedDictionary),
            $"INV-013: Book {bookNumber} should map to {expectedDictionary}"
        );
    }

    /// <summary>
    /// INV-013: Book-to-dictionary mapping is deterministic.
    /// Calling GetDictionaryForBook with the same input always produces the same result.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("InvariantId", "INV-013")]
    [Property("ScenarioId", "TS-066")]
    [Property("BehaviorId", "BHV-302")]
    [Description("INV-013: Book-to-dictionary mapping is deterministic across repeated calls")]
    public void GetDictionaryForBook_RepeatedCalls_ReturnsSameResult()
    {
        // INV-013: The mapping is determined by Canon.IsBookOT / Canon.IsBookNT.
        // This is a pure function with no state - repeated calls must be identical.
        var result1 = LexiconService.GetDictionaryForBook(1); // GEN -> SDBH
        var result2 = LexiconService.GetDictionaryForBook(1);
        Assert.That(result2, Is.EqualTo(result1), "Same input should always produce same output");

        var result3 = LexiconService.GetDictionaryForBook(40); // MAT -> SDBG
        var result4 = LexiconService.GetDictionaryForBook(40);
        Assert.That(result4, Is.EqualTo(result3), "Same input should always produce same output");
    }

    // =========================================================================
    // EXTRACTION TESTS - EXT-001
    // =========================================================================

    /// <summary>
    /// EXT-001: ParseLexicalLinks is a self-contained data transformation
    /// with no external dependencies. It must work purely from the input string.
    /// </summary>
    [Test]
    [Category("Extraction")]
    [Property("ExtractionId", "EXT-001")]
    [Property("ScenarioId", "TS-035")]
    [Property("BehaviorId", "BHV-302")]
    [Description("EXT-001: Parse is self-contained with no external dependencies")]
    public async Task ParseLexicalLinks_SelfContained_NoExternalDependencies()
    {
        // EXT-001: "PT9 Dependencies: None (self-contained)"
        // Verify the method works without any initialization or external state
        var input = new LexicalLinkInput("SDBH:dabar:002003");

        // Act: Call directly without any setup
        var result = await LexiconService.ParseLexicalLinksAsync(input, CancellationToken.None);

        // Assert
        Assert.That(result.Success, Is.True, "EXT-001: Should work without external dependencies");
        Assert.That(result.Links![0].Dictionary, Is.EqualTo("SDBH"));
        Assert.That(result.Links![0].Lemma, Is.EqualTo("dabar"));
        Assert.That(result.Links![0].BaseFormIndex, Is.EqualTo(2));
        Assert.That(result.Links![0].MeaningIndex, Is.EqualTo(3));
    }

    // =========================================================================
    // RESULT TYPE STRUCTURE TESTS
    // =========================================================================

    /// <summary>
    /// Success result has correct structure: Success=true, Links is non-null list,
    /// Error is null.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-035")]
    [Property("BehaviorId", "BHV-302")]
    [Description("Success result has correct structure per Section 3.1")]
    public async Task ParseLexicalLinks_SuccessResult_HasCorrectStructure()
    {
        // data-contracts.md Section 3.1 result type:
        // { success: true, links: LexicalLink[] }
        var input = new LexicalLinkInput("SDBG:agapao:001002");

        // Act
        var result = await LexiconService.ParseLexicalLinksAsync(input, CancellationToken.None);

        // Assert: Verify result structure
        Assert.That(result.Success, Is.True);
        Assert.That(result.Links, Is.Not.Null, "Links should be present on success");
        Assert.That(result.Links, Is.Not.Empty, "Links should not be empty for valid input");
        Assert.That(result.Error, Is.Null, "Error should be null on success");
    }

    /// <summary>
    /// Error result has correct structure: Success=false, Links is null,
    /// Error has Code and Message.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-035")]
    [Property("BehaviorId", "BHV-302")]
    [Description("Error result has correct structure per Section 3.1")]
    public async Task ParseLexicalLinks_ErrorResult_HasCorrectStructure()
    {
        // data-contracts.md Section 3.1 result type:
        // { success: false, error: { code: string, message: string } }
        var input = new LexicalLinkInput("");

        // Act
        var result = await LexiconService.ParseLexicalLinksAsync(input, CancellationToken.None);

        // Assert: Verify error result structure
        Assert.That(result.Success, Is.False);
        Assert.That(result.Links, Is.Null, "Links should be null on failure");
        Assert.That(result.Error, Is.Not.Null, "Error should be present on failure");
        Assert.That(
            result.Error!.Code,
            Is.Not.Null.And.Not.Empty,
            "Error code should be non-empty"
        );
        Assert.That(
            result.Error.Message,
            Is.Not.Null.And.Not.Empty,
            "Error message should be non-empty"
        );
    }
}

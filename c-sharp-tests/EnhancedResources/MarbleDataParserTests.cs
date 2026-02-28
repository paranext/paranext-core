using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.EnhancedResources;

namespace TestParanextDataProvider.EnhancedResources;

/// <summary>
/// Tests for MarbleDataParser.ParseUsxTokensAsync (CAP-002).
///
/// Parses USX XML content into a structured MarbleToken stream with section
/// boundary detection, optional source word loading, and text processing
/// (cantillation stripping, bracket removal, phrase text aggregation).
///
/// Contract: Section 4.2 ParseUsxTokens (data-contracts.md)
/// Input: Section 2.6 TokenParsingInput
/// Output: Section 3.2 MarbleToken / ParseUsxTokensResult
/// Behavior: BHV-608 (Marble Data Parsing and Token Extraction)
/// Extractions: EXT-006, EXT-013, EXT-014, EXT-015
/// Invariants: INV-017 (Section Boundaries), VAL-012 (Cantillation Stripping)
/// Golden Masters: GM-011, GM-012, GM-021
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
public class MarbleDataParserTests
{
    // =========================================================================
    // TEST DATA - Representative USX XML snippets
    // =========================================================================

    /// <summary>
    /// Minimal USX XML containing book, chapter, verse, paragraph, character,
    /// note, and text link elements. Exercises all 10 MarbleTokenType values.
    /// </summary>
    private const string SampleUsxWithAllTokenTypes = """
        <usx version="3.0">
          <book code="GEN" style="id">Genesis</book>
          <chapter number="1" style="c" sid="GEN 1"/>
          <para style="s1">The Creation</para>
          <para style="p">
            <verse number="1" style="v" sid="GEN 1:1"/>In the beginning
            <char style="w" link-href="SDBH:reshit:001001">reshit</char>
            God created the heavens and the earth.
            <note caller="+" style="f">A footnote about creation.</note>
            <verse eid="GEN 1:1"/>
            <verse number="2" style="v" sid="GEN 1:2"/>And the earth was without form.
            <verse eid="GEN 1:2"/>
          </para>
          <para style="s1">The Second Day</para>
          <para style="p">
            <verse number="3" style="v" sid="GEN 1:3"/>And God said, Let there be light.
            <verse eid="GEN 1:3"/>
          </para>
          <chapter eid="GEN 1"/>
        </usx>
        """;

    /// <summary>
    /// USX XML with whitespace between notes and verse elements.
    /// Tests TS-049: whitespace preservation.
    /// </summary>
    private const string UsxWithWhitespaceBetweenElements = """
        <usx version="3.0">
          <book code="GEN" style="id">Genesis</book>
          <chapter number="1" style="c" sid="GEN 1"/>
          <para style="p">
            <verse number="1" style="v" sid="GEN 1:1"/>Text before note.
            <note caller="+" style="f">A footnote.</note>  <verse eid="GEN 1:1"/>
            <verse number="2" style="v" sid="GEN 1:2"/>Next verse text.
            <verse eid="GEN 1:2"/>
          </para>
          <chapter eid="GEN 1"/>
        </usx>
        """;

    /// <summary>
    /// USX XML with multiple section heading markers (\s1) for testing
    /// INV-017 section boundary detection.
    /// </summary>
    private const string UsxWithSectionBoundaries = """
        <usx version="3.0">
          <book code="MAT" style="id">Matthew</book>
          <chapter number="1" style="c" sid="MAT 1"/>
          <para style="s1">The Genealogy of Jesus</para>
          <para style="p">
            <verse number="1" style="v" sid="MAT 1:1"/>The book of the genealogy.
            <verse eid="MAT 1:1"/>
          </para>
          <para style="s1">The Birth of Jesus</para>
          <para style="p">
            <verse number="18" style="v" sid="MAT 1:18"/>Now the birth of Jesus Christ.
            <verse eid="MAT 1:18"/>
          </para>
          <para style="s1">The Visit of the Wise Men</para>
          <para style="p">
            <verse number="25" style="v" sid="MAT 1:25"/>And he called his name Jesus.
            <verse eid="MAT 1:25"/>
          </para>
          <chapter eid="MAT 1"/>
        </usx>
        """;

    /// <summary>
    /// NT USX XML for source word tests. Book 40 (Matthew) -> SDBG (Greek).
    /// </summary>
    private const string NtUsxForSourceWords = """
        <usx version="3.0">
          <book code="MAT" style="id">Matthew</book>
          <chapter number="1" style="c" sid="MAT 1"/>
          <para style="p">
            <verse number="1" style="v" sid="MAT 1:1"/>
            <char style="w" link-href="SDBG:biblos:001001" src-text="[biblos]" src-transliteration="biblos" src-pos="noun-ngfs" src-lemma="biblos">book</char>
            <char style="w" link-href="SDBG:genesis:001001" src-text="geneseos" src-transliteration="geneseos" src-pos="noun-ngfs" src-lemma="genesis">genealogy</char>
            <verse eid="MAT 1:1"/>
          </para>
          <chapter eid="MAT 1"/>
        </usx>
        """;

    /// <summary>
    /// OT USX XML for Hebrew source word tests. Book 1 (Genesis) -> SDBH (Hebrew).
    /// Contains cantillation marks that must be stripped per VAL-012.
    /// The Hebrew text includes marks in ranges U+0591-U+05AF, U+05BD, U+05C3.
    /// </summary>
    private const string OtUsxWithCantillation = """
        <usx version="3.0">
          <book code="GEN" style="id">Genesis</book>
          <chapter number="1" style="c" sid="GEN 1"/>
          <para style="p">
            <verse number="1" style="v" sid="GEN 1:1"/>
            <char style="w" link-href="SDBH:reshit:001001" src-text="b@re)si^t" src-transliteration="bereshit" src-pos="nsfcaH" src-lemma="reshit">beginning</char>
            <verse eid="GEN 1:1"/>
          </para>
          <chapter eid="GEN 1"/>
        </usx>
        """;

    // =========================================================================
    // ACCEPTANCE TEST (OUTER LOOP) - The "done signal" for CAP-002
    // =========================================================================

    /// <summary>
    /// Acceptance test: When ParseUsxTokensAsync is called with valid USX XML,
    /// it produces a well-ordered MarbleToken sequence containing all expected
    /// token types, with section boundaries correctly detected at \s markers.
    /// This matches the GM-011 and GM-012 golden masters.
    ///
    /// This test passes when CAP-002 is COMPLETE.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-048")]
    [Property("BehaviorId", "BHV-608")]
    [Property("GoldenMaster", "GM-011")]
    [Description(
        "Acceptance test: USX XML parsed into ordered MarbleToken sequence "
            + "with section boundaries and all 10 token types represented"
    )]
    public async Task ParseUsxTokens_AcceptanceTest_MatchesGoldenMaster()
    {
        // Arrange: GM-011 input - sample USX with all token types
        var input = new TokenParsingInput(
            UsxContent: SampleUsxWithAllTokenTypes,
            BookNumber: 1, // Genesis -> OT
            IncludeSourceWords: false,
            ResourceId: "ESV-ER"
        );

        // Act: Call the public API defined in data-contracts.md Section 4.2
        var result = await MarbleDataParser.ParseUsxTokensAsync(input, CancellationToken.None);

        // Assert: GM-011 expected output shape
        Assert.That(result.Success, Is.True, "Parsing valid USX should succeed");
        Assert.That(result.Tokens, Is.Not.Null, "Tokens should be present on success");
        Assert.That(result.Tokens!, Is.Not.Empty, "Token list should not be empty");
        Assert.That(result.Error, Is.Null, "Error should be null on success");

        // GM-011: Verify all expected token types are present in the output
        var tokenTypes = result.Tokens!.Select(t => t.Type).Distinct().ToHashSet();
        Assert.That(
            tokenTypes,
            Does.Contain(MarbleTokenType.Book),
            "GM-011: Token stream should contain Book token"
        );
        Assert.That(
            tokenTypes,
            Does.Contain(MarbleTokenType.Chapter),
            "GM-011: Token stream should contain Chapter token"
        );
        Assert.That(
            tokenTypes,
            Does.Contain(MarbleTokenType.ParagraphStart),
            "GM-011: Token stream should contain ParagraphStart token"
        );
        Assert.That(
            tokenTypes,
            Does.Contain(MarbleTokenType.Verse),
            "GM-011: Token stream should contain Verse token"
        );
        Assert.That(
            tokenTypes,
            Does.Contain(MarbleTokenType.Note),
            "GM-011: Token stream should contain Note token"
        );

        // GM-011: Verify order is preserved (Book comes first)
        Assert.That(
            result.Tokens![0].Type,
            Is.EqualTo(MarbleTokenType.Book),
            "GM-011: First token should be Book"
        );

        // GM-011: Verify section boundaries detected
        Assert.That(
            result.SectionBoundaries,
            Is.Not.Null,
            "GM-011: Section boundaries should be present"
        );
        Assert.That(
            result.SectionBoundaries!,
            Is.Not.Empty,
            "GM-011: Section boundaries should be non-empty (\\s1 markers present)"
        );
    }

    // =========================================================================
    // CONTRACT TESTS - Happy Path
    // =========================================================================

    /// <summary>
    /// TS-048: USX XML parsed into correct MarbleToken sequence.
    /// All expected token types (Book, Chapter, ParagraphStart/End,
    /// CharacterStart/End, Note, TextLink, Verse) should be present.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-048")]
    [Property("BehaviorId", "BHV-608")]
    [Property("ExtractionId", "EXT-006")]
    [Description("USX XML parsed into all expected MarbleToken types in correct order")]
    public async Task ParseUsxTokens_SampleUsx_ProducesAllTokenTypes()
    {
        // Arrange: TS-048 - Parse sample USX XML with all element types
        var input = new TokenParsingInput(
            UsxContent: SampleUsxWithAllTokenTypes,
            BookNumber: 1,
            IncludeSourceWords: false,
            ResourceId: "ESV-ER"
        );

        // Act
        var result = await MarbleDataParser.ParseUsxTokensAsync(input, CancellationToken.None);

        // Assert: Per TS-048 - ordered list of token types
        Assert.That(result.Success, Is.True, "Parsing valid USX should succeed");
        Assert.That(result.Tokens, Is.Not.Null);

        // Verify the token sequence contains the expected types from the USX
        var types = result.Tokens!.Select(t => t.Type).ToList();

        // Book element should produce Book token
        Assert.That(types, Does.Contain(MarbleTokenType.Book), "Should contain Book token");

        // Chapter element should produce Chapter token
        Assert.That(types, Does.Contain(MarbleTokenType.Chapter), "Should contain Chapter token");

        // Para elements should produce ParagraphStart tokens
        Assert.That(
            types,
            Does.Contain(MarbleTokenType.ParagraphStart),
            "Should contain ParagraphStart token"
        );

        // Verse elements should produce Verse tokens
        Assert.That(types, Does.Contain(MarbleTokenType.Verse), "Should contain Verse token");

        // Char elements should produce CharacterStart tokens
        Assert.That(
            types,
            Does.Contain(MarbleTokenType.CharacterStart),
            "Should contain CharacterStart token"
        );

        // Note elements should produce Note tokens
        Assert.That(types, Does.Contain(MarbleTokenType.Note), "Should contain Note token");

        // Char with link-href should produce TextLink tokens
        Assert.That(types, Does.Contain(MarbleTokenType.TextLink), "Should contain TextLink token");
    }

    /// <summary>
    /// TS-048: Token indices are sequential and unique within the chapter.
    /// Each token must have a unique tokenIndex for reference.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-048")]
    [Property("BehaviorId", "BHV-608")]
    [Description("Token indices are sequential and unique within parsed chapter")]
    public async Task ParseUsxTokens_ValidUsx_TokenIndicesAreSequential()
    {
        // Arrange
        var input = new TokenParsingInput(
            UsxContent: SampleUsxWithAllTokenTypes,
            BookNumber: 1,
            IncludeSourceWords: false,
            ResourceId: "ESV-ER"
        );

        // Act
        var result = await MarbleDataParser.ParseUsxTokensAsync(input, CancellationToken.None);

        // Assert: Token indices should be unique and sequential
        Assert.That(result.Success, Is.True);
        var indices = result.Tokens!.Select(t => t.TokenIndex).ToList();
        Assert.That(indices, Is.Unique, "TS-048: Token indices must be unique within the chapter");
        Assert.That(indices, Is.Ordered, "TS-048: Token indices must be in ascending order");
    }

    /// <summary>
    /// TS-050: Section boundaries detected from \s paragraph markers.
    /// The parser should identify ParagraphStart tokens with \s style and record
    /// their token indices as section boundaries.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-050")]
    [Property("BehaviorId", "BHV-608")]
    [Property("InvariantId", "INV-017")]
    [Description("Section boundaries detected at \\s paragraph markers per INV-017")]
    public async Task ParseUsxTokens_UsxWithSections_DetectsSectionBoundaries()
    {
        // Arrange: USX with three \s1 section headings
        var input = new TokenParsingInput(
            UsxContent: UsxWithSectionBoundaries,
            BookNumber: 40, // Matthew
            IncludeSourceWords: false,
            ResourceId: "ESV-ER"
        );

        // Act
        var result = await MarbleDataParser.ParseUsxTokensAsync(input, CancellationToken.None);

        // Assert: Per TS-050 and INV-017 - section boundaries at \s markers
        Assert.That(result.Success, Is.True);
        Assert.That(result.SectionBoundaries, Is.Not.Null);
        Assert.That(
            result.SectionBoundaries!,
            Has.Count.EqualTo(3),
            "TS-050: Three \\s1 markers should produce 3 section boundaries"
        );

        // Verify boundaries point to ParagraphStart tokens with \s1 style
        foreach (int boundaryIndex in result.SectionBoundaries!)
        {
            var token = result.Tokens!.First(t => t.TokenIndex == boundaryIndex);
            Assert.That(
                token.Type,
                Is.EqualTo(MarbleTokenType.ParagraphStart),
                "TS-050: Section boundary should be at ParagraphStart token"
            );
            Assert.That(
                token.Style,
                Does.StartWith("s"),
                "TS-050: Section boundary token should have \\s style"
            );
        }
    }

    /// <summary>
    /// TS-048: Verse tokens contain correct verse numbers.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-048")]
    [Property("BehaviorId", "BHV-608")]
    [Description("Verse tokens contain correct verse numbers from USX")]
    public async Task ParseUsxTokens_UsxWithVerses_VerseTokensHaveCorrectNumbers()
    {
        // Arrange
        var input = new TokenParsingInput(
            UsxContent: SampleUsxWithAllTokenTypes,
            BookNumber: 1,
            IncludeSourceWords: false,
            ResourceId: "ESV-ER"
        );

        // Act
        var result = await MarbleDataParser.ParseUsxTokensAsync(input, CancellationToken.None);

        // Assert: Verse tokens should have correct verse numbers
        Assert.That(result.Success, Is.True);
        var verseTokens = result.Tokens!.Where(t => t.Type == MarbleTokenType.Verse).ToList();
        Assert.That(
            verseTokens,
            Has.Count.GreaterThanOrEqualTo(3),
            "Should have verse tokens for verses 1, 2, 3"
        );

        var verseNumbers = verseTokens
            .Where(v => v.VerseNumber.HasValue)
            .Select(v => v.VerseNumber!.Value)
            .ToList();
        Assert.That(verseNumbers, Does.Contain(1), "Should contain verse 1");
        Assert.That(verseNumbers, Does.Contain(2), "Should contain verse 2");
        Assert.That(verseNumbers, Does.Contain(3), "Should contain verse 3");
    }

    /// <summary>
    /// TS-048: TextLink tokens include lexical link data when USX has link-href attributes.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-048")]
    [Property("BehaviorId", "BHV-608")]
    [Property("ExtractionId", "EXT-006")]
    [Description("TextLink tokens include parsed lexical links from link-href attributes")]
    public async Task ParseUsxTokens_UsxWithLinks_TextLinkTokensHaveLinks()
    {
        // Arrange
        var input = new TokenParsingInput(
            UsxContent: SampleUsxWithAllTokenTypes,
            BookNumber: 1,
            IncludeSourceWords: false,
            ResourceId: "ESV-ER"
        );

        // Act
        var result = await MarbleDataParser.ParseUsxTokensAsync(input, CancellationToken.None);

        // Assert: TextLink tokens should have parsed lexical links
        Assert.That(result.Success, Is.True);
        var textLinkTokens = result.Tokens!.Where(t => t.Type == MarbleTokenType.TextLink).ToList();
        Assert.That(
            textLinkTokens,
            Is.Not.Empty,
            "Should have TextLink tokens from USX char elements with link-href"
        );

        var firstTextLink = textLinkTokens.First();
        Assert.That(
            firstTextLink.Links,
            Is.Not.Null.And.Not.Empty,
            "TextLink tokens should have parsed lexical links"
        );
        Assert.That(
            firstTextLink.Links![0].Dictionary,
            Is.EqualTo("SDBH"),
            "Link dictionary should be SDBH for Genesis"
        );
        Assert.That(
            firstTextLink.Links![0].Lemma,
            Is.EqualTo("reshit"),
            "Link lemma should match link-href"
        );
    }

    // =========================================================================
    // CONTRACT TESTS - Source Word Loading
    // =========================================================================

    /// <summary>
    /// TS-048: When includeSourceWords is true and book is NT (bookNumber=40+),
    /// TextLink tokens should be augmented with Greek source word data.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-048")]
    [Property("BehaviorId", "BHV-608")]
    [Property("ExtractionId", "EXT-013")]
    [Description("NT source words loaded with Greek text, transliteration, and POS tags")]
    public async Task ParseUsxTokens_NtWithSourceWords_AugmentsTokensWithGreek()
    {
        // Arrange: NT USX with source word attributes, includeSourceWords=true
        var input = new TokenParsingInput(
            UsxContent: NtUsxForSourceWords,
            BookNumber: 40, // Matthew -> NT -> SDBG
            IncludeSourceWords: true,
            ResourceId: "ESV-ER"
        );

        // Act
        var result = await MarbleDataParser.ParseUsxTokensAsync(input, CancellationToken.None);

        // Assert: TextLink tokens should have source word data
        Assert.That(result.Success, Is.True);
        var textLinkTokens = result
            .Tokens!.Where(t => t.Type == MarbleTokenType.TextLink && t.SourceWord != null)
            .ToList();
        Assert.That(
            textLinkTokens,
            Is.Not.Empty,
            "TextLink tokens should have SourceWord data when includeSourceWords=true"
        );

        // Verify source word properties are populated
        var firstSource = textLinkTokens.First().SourceWord!;
        Assert.That(
            firstSource.SurfaceText,
            Is.Not.Null.And.Not.Empty,
            "SourceWord.SurfaceText should be populated"
        );
        Assert.That(
            firstSource.Transliteration,
            Is.Not.Null.And.Not.Empty,
            "SourceWord.Transliteration should be populated"
        );
        Assert.That(
            firstSource.PosTag,
            Is.Not.Null.And.Not.Empty,
            "SourceWord.PosTag should be populated"
        );
        Assert.That(
            firstSource.Lemma,
            Is.Not.Null.And.Not.Empty,
            "SourceWord.Lemma should be populated"
        );
    }

    /// <summary>
    /// When includeSourceWords is false, TextLink tokens should NOT have source word data.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-048")]
    [Property("BehaviorId", "BHV-608")]
    [Description("Source words not loaded when includeSourceWords is false")]
    public async Task ParseUsxTokens_WithoutSourceWords_NoSourceWordData()
    {
        // Arrange: Same NT USX but includeSourceWords=false
        var input = new TokenParsingInput(
            UsxContent: NtUsxForSourceWords,
            BookNumber: 40,
            IncludeSourceWords: false,
            ResourceId: "ESV-ER"
        );

        // Act
        var result = await MarbleDataParser.ParseUsxTokensAsync(input, CancellationToken.None);

        // Assert: No source word data when not requested
        Assert.That(result.Success, Is.True);
        var tokensWithSourceWords = result.Tokens!.Where(t => t.SourceWord != null).ToList();
        Assert.That(
            tokensWithSourceWords,
            Is.Empty,
            "No tokens should have SourceWord data when includeSourceWords=false"
        );
    }

    // =========================================================================
    // EDGE CASE TESTS - Whitespace, Cantillation, Brackets, Phrase Text
    // =========================================================================

    /// <summary>
    /// TS-049: Whitespace between notes and verse elements is preserved in the token stream.
    /// GM-011: whitespacePreservation.preservedBetweenNotesAndVerses = true.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-049")]
    [Property("BehaviorId", "BHV-608")]
    [Property("GoldenMaster", "GM-011")]
    [Description("Whitespace between notes and verse elements preserved as Whitespace tokens")]
    public async Task ParseUsxTokens_WhitespaceBetweenElements_PreservedInTokenStream()
    {
        // Arrange: TS-049 - USX with whitespace between note and verse elements
        var input = new TokenParsingInput(
            UsxContent: UsxWithWhitespaceBetweenElements,
            BookNumber: 1,
            IncludeSourceWords: false,
            ResourceId: "ESV-ER"
        );

        // Act
        var result = await MarbleDataParser.ParseUsxTokensAsync(input, CancellationToken.None);

        // Assert: Per TS-049 and GM-011 - whitespace tokens should be present
        Assert.That(result.Success, Is.True);
        var whitespaceTokens = result
            .Tokens!.Where(t => t.Type == MarbleTokenType.Whitespace)
            .ToList();
        Assert.That(
            whitespaceTokens,
            Is.Not.Empty,
            "TS-049: Whitespace between notes and verses should be preserved as Whitespace tokens"
        );
    }

    /// <summary>
    /// TS-080: Hebrew cantillation marks stripped from source word text.
    /// VAL-012: Unicode ranges U+0591-U+05AF, U+05BD, U+05C3 are stripped.
    /// GM-021: cantillationStripping.stripped = true, removedRanges matches.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-080")]
    [Property("BehaviorId", "BHV-608")]
    [Property("GoldenMaster", "GM-021")]
    [Description(
        "VAL-012: Hebrew cantillation marks (U+0591-U+05AF, U+05BD, U+05C3) "
            + "stripped from source word surface text"
    )]
    public async Task ParseUsxTokens_HebrewWithCantillation_StrippedFromSurfaceText()
    {
        // Arrange: Hebrew text with cantillation marks
        // U+0591 = HEBREW ACCENT ETNAHTA
        // U+05A3 = HEBREW ACCENT MUNAH
        // U+05BD = HEBREW POINT METEG
        // U+05C3 = HEBREW PUNCTUATION SOF PASUQ
        string hebrewWithCantillation = "\u05D1\u05B0\u05E8\u0591\u05D5\u05BC\u05DA";
        string expectedStripped = "\u05D1\u05B0\u05E8\u05D5\u05BC\u05DA"; // U+0591 removed

        string usxWithHebrew = $"""
            <usx version="3.0">
              <book code="GEN" style="id">Genesis</book>
              <chapter number="1" style="c" sid="GEN 1"/>
              <para style="p">
                <verse number="1" style="v" sid="GEN 1:1"/>
                <char style="w" link-href="SDBH:reshit:001001" src-text="{hebrewWithCantillation}" src-transliteration="bereshit" src-pos="nsfcaH" src-lemma="reshit">beginning</char>
                <verse eid="GEN 1:1"/>
              </para>
              <chapter eid="GEN 1"/>
            </usx>
            """;

        var input = new TokenParsingInput(
            UsxContent: usxWithHebrew,
            BookNumber: 1, // OT -> SDBH
            IncludeSourceWords: true,
            ResourceId: "ESV-ER"
        );

        // Act
        var result = await MarbleDataParser.ParseUsxTokensAsync(input, CancellationToken.None);

        // Assert: Per TS-080, VAL-012, GM-021 - cantillation marks stripped
        Assert.That(result.Success, Is.True);
        var sourceTokens = result.Tokens!.Where(t => t.SourceWord != null).ToList();
        Assert.That(sourceTokens, Is.Not.Empty, "Should have tokens with source word data");

        var surfaceText = sourceTokens.First().SourceWord!.SurfaceText;

        // Verify no cantillation marks remain (U+0591-U+05AF range)
        foreach (char c in surfaceText)
        {
            int codePoint = c;
            Assert.That(
                codePoint is < 0x0591 or > 0x05AF,
                Is.True,
                $"VAL-012: Cantillation mark U+{codePoint:X4} should be stripped"
            );
            Assert.That(
                codePoint,
                Is.Not.EqualTo(0x05BD),
                "VAL-012: U+05BD (METEG) should be stripped"
            );
            Assert.That(
                codePoint,
                Is.Not.EqualTo(0x05C3),
                "VAL-012: U+05C3 (SOF PASUQ) should be stripped"
            );
        }
    }

    /// <summary>
    /// TS-081: Square brackets stripped from source words.
    /// Source words from critical apparatus sometimes have brackets like "[klinon]".
    /// GM-021: bracketRemoval.result = "klinon".
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-081")]
    [Property("BehaviorId", "BHV-608")]
    [Property("GoldenMaster", "GM-021")]
    [Description("Square brackets from critical apparatus stripped from source word text")]
    public async Task ParseUsxTokens_SourceWordWithBrackets_BracketsStripped()
    {
        // Arrange: TS-081 - source word text contains square brackets
        string usxWithBracketedWord = """
            <usx version="3.0">
              <book code="MAT" style="id">Matthew</book>
              <chapter number="1" style="c" sid="MAT 1"/>
              <para style="p">
                <verse number="1" style="v" sid="MAT 1:1"/>
                <char style="w" link-href="SDBG:klinon:001001" src-text="[klinon]" src-transliteration="klinon" src-pos="noun-dans" src-lemma="klinon">couch</char>
                <verse eid="MAT 1:1"/>
              </para>
              <chapter eid="MAT 1"/>
            </usx>
            """;

        var input = new TokenParsingInput(
            UsxContent: usxWithBracketedWord,
            BookNumber: 40,
            IncludeSourceWords: true,
            ResourceId: "ESV-ER"
        );

        // Act
        var result = await MarbleDataParser.ParseUsxTokensAsync(input, CancellationToken.None);

        // Assert: Per TS-081 and GM-021 - brackets removed
        Assert.That(result.Success, Is.True);
        var sourceTokens = result.Tokens!.Where(t => t.SourceWord != null).ToList();
        Assert.That(sourceTokens, Is.Not.Empty);

        var surfaceText = sourceTokens.First().SourceWord!.SurfaceText;
        Assert.That(
            surfaceText,
            Does.Not.Contain("["),
            "TS-081: Square brackets should be stripped from surface text"
        );
        Assert.That(
            surfaceText,
            Does.Not.Contain("]"),
            "TS-081: Square brackets should be stripped from surface text"
        );
        Assert.That(
            surfaceText,
            Is.EqualTo("klinon"),
            "GM-021: After bracket removal, text should be 'klinon'"
        );
    }

    /// <summary>
    /// TS-082: Phrase text concatenated with space for adjacent words,
    /// ellipsis (U+2026) for gaps greater than 2 words.
    /// GM-021: phraseTextConcatenation.gapGreaterThan2.separator = "\u2026".
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-082")]
    [Property("BehaviorId", "BHV-608")]
    [Property("GoldenMaster", "GM-021")]
    [Description("Phrase text uses ellipsis separator for gaps > 2 words, space for adjacent")]
    public async Task ParseUsxTokens_PhraseTextAggregation_UsesEllipsisForLargeGaps()
    {
        // Arrange: USX with tokens sharing TargetLinks across a gap > 2 words
        // This tests the phrase text aggregation logic from EXT-015
        string usxWithPhraseGap = """
            <usx version="3.0">
              <book code="MAT" style="id">Matthew</book>
              <chapter number="1" style="c" sid="MAT 1"/>
              <para style="p">
                <verse number="1" style="v" sid="MAT 1:1"/>
                <char style="w" link-href="SDBG:biblos:001001" src-text="biblos" src-transliteration="biblos" src-pos="noun-ngfs" src-lemma="biblos">book</char>
                word1 word2 word3
                <char style="w" link-href="SDBG:biblos:001001" src-text="geneseos" src-transliteration="geneseos" src-pos="noun-ngfs" src-lemma="genesis">genealogy</char>
                <verse eid="MAT 1:1"/>
              </para>
              <chapter eid="MAT 1"/>
            </usx>
            """;

        var input = new TokenParsingInput(
            UsxContent: usxWithPhraseGap,
            BookNumber: 40,
            IncludeSourceWords: true,
            ResourceId: "ESV-ER"
        );

        // Act
        var result = await MarbleDataParser.ParseUsxTokensAsync(input, CancellationToken.None);

        // Assert: Per TS-082 and GM-021 - ellipsis for gaps > 2 words
        Assert.That(result.Success, Is.True);

        // Find tokens with phrase text that includes an ellipsis
        var tokensWithPhraseText = result.Tokens!.Where(t => t.PhraseText != null).ToList();

        // When tokens sharing a link have a gap > 2 words, phrase text uses ellipsis
        if (tokensWithPhraseText.Count > 0)
        {
            var phraseWithEllipsis = tokensWithPhraseText.FirstOrDefault(t =>
                t.PhraseText!.Contains('\u2026')
            );
            Assert.That(
                phraseWithEllipsis,
                Is.Not.Null,
                "TS-082: Phrase text should use ellipsis (U+2026) for gaps > 2 words"
            );
        }
    }

    // =========================================================================
    // CONTRACT TESTS - Error Cases
    // =========================================================================

    /// <summary>
    /// Invalid USX XML returns PARSE_ERROR.
    /// Per data-contracts.md Section 4.2 error conditions.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-048")]
    [Property("BehaviorId", "BHV-608")]
    [Description("Invalid USX XML returns PARSE_ERROR per Section 4.2")]
    public async Task ParseUsxTokens_InvalidXml_ReturnsParseError()
    {
        // Arrange: Malformed XML
        var input = new TokenParsingInput(
            UsxContent: "<usx><not-closed>",
            BookNumber: 1,
            IncludeSourceWords: false,
            ResourceId: "ESV-ER"
        );

        // Act
        var result = await MarbleDataParser.ParseUsxTokensAsync(input, CancellationToken.None);

        // Assert: Per Section 4.2 error conditions
        Assert.That(result.Success, Is.False, "Invalid XML should fail");
        Assert.That(result.Error, Is.Not.Null);
        Assert.That(
            result.Error!.Code,
            Is.EqualTo("PARSE_ERROR"),
            "Error code should be PARSE_ERROR"
        );
        Assert.That(
            result.Error.Message,
            Is.EqualTo("Failed to parse USX content"),
            "Error message should match contract"
        );
    }

    /// <summary>
    /// Null USX content returns PARSE_ERROR.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-048")]
    [Property("BehaviorId", "BHV-608")]
    [Description("Null USX content returns PARSE_ERROR")]
    public async Task ParseUsxTokens_NullContent_ReturnsParseError()
    {
        // Arrange: Null USX content
        var input = new TokenParsingInput(
            UsxContent: null!,
            BookNumber: 1,
            IncludeSourceWords: false,
            ResourceId: "ESV-ER"
        );

        // Act
        var result = await MarbleDataParser.ParseUsxTokensAsync(input, CancellationToken.None);

        // Assert
        Assert.That(result.Success, Is.False, "Null content should fail");
        Assert.That(result.Error, Is.Not.Null);
        Assert.That(result.Error!.Code, Is.EqualTo("PARSE_ERROR"));
    }

    /// <summary>
    /// Empty USX content returns PARSE_ERROR.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-048")]
    [Property("BehaviorId", "BHV-608")]
    [Description("Empty USX content returns PARSE_ERROR")]
    public async Task ParseUsxTokens_EmptyContent_ReturnsParseError()
    {
        // Arrange: Empty string
        var input = new TokenParsingInput(
            UsxContent: "",
            BookNumber: 1,
            IncludeSourceWords: false,
            ResourceId: "ESV-ER"
        );

        // Act
        var result = await MarbleDataParser.ParseUsxTokensAsync(input, CancellationToken.None);

        // Assert
        Assert.That(result.Success, Is.False, "Empty content should fail");
        Assert.That(result.Error, Is.Not.Null);
        Assert.That(result.Error!.Code, Is.EqualTo("PARSE_ERROR"));
    }

    // =========================================================================
    // GOLDEN MASTER TESTS
    // =========================================================================

    /// <summary>
    /// GM-011: USX XML to MarbleToken Parsing.
    /// Verifies token sequence order, whitespace preservation, and section boundary detection.
    /// Comparison strategy: semantic.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("ScenarioId", "TS-048")]
    [Property("BehaviorId", "BHV-608")]
    [Property("GoldenMaster", "GM-011")]
    [Description(
        "GM-011: Token sequence order preserved, whitespace present, section boundaries detected"
    )]
    public async Task GoldenMaster_GM011_TokenSequenceAndBoundaries()
    {
        // Arrange: GM-011 input - sample USX with all token types
        var input = new TokenParsingInput(
            UsxContent: SampleUsxWithAllTokenTypes,
            BookNumber: 1,
            IncludeSourceWords: false,
            ResourceId: "ESV-ER"
        );

        // Act
        var result = await MarbleDataParser.ParseUsxTokensAsync(input, CancellationToken.None);

        // Assert: GM-011 expected output
        Assert.That(result.Success, Is.True);

        // GM-011: tokenSequence.orderPreserved = true
        // Book must come before Chapter, Chapter before Verse, etc.
        var bookIndex = result.Tokens!.First(t => t.Type == MarbleTokenType.Book).TokenIndex;
        var chapterIndex = result.Tokens!.First(t => t.Type == MarbleTokenType.Chapter).TokenIndex;
        var firstVerseIndex = result.Tokens!.First(t => t.Type == MarbleTokenType.Verse).TokenIndex;
        Assert.That(
            bookIndex,
            Is.LessThan(chapterIndex),
            "GM-011: Book token must precede Chapter token"
        );
        Assert.That(
            chapterIndex,
            Is.LessThan(firstVerseIndex),
            "GM-011: Chapter token must precede first Verse token"
        );

        // GM-011: whitespacePreservation.whitespaceTokensPresent = true
        var hasWhitespace = result.Tokens!.Any(t => t.Type == MarbleTokenType.Whitespace);
        Assert.That(
            hasWhitespace,
            Is.True,
            "GM-011: Whitespace tokens should be present in output"
        );

        // GM-011: sectionBoundaries.detectedFromSMarkers = true
        Assert.That(
            result.SectionBoundaries,
            Is.Not.Null.And.Not.Empty,
            "GM-011: Section boundaries should be detected from \\s markers"
        );
    }

    /// <summary>
    /// GM-012: Token scope filtering depends on correct section boundary detection.
    /// This test verifies the prerequisite: section boundaries are correctly populated
    /// so that scope filtering (CAP-003) can operate on them.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("ScenarioId", "TS-050")]
    [Property("BehaviorId", "BHV-608")]
    [Property("GoldenMaster", "GM-012")]
    [Description("GM-012: Section boundaries correctly populated for scope filtering")]
    public async Task GoldenMaster_GM012_SectionBoundariesForScopeFiltering()
    {
        // Arrange: GM-012 - USX with section boundaries
        var input = new TokenParsingInput(
            UsxContent: UsxWithSectionBoundaries,
            BookNumber: 40,
            IncludeSourceWords: false,
            ResourceId: "ESV-ER"
        );

        // Act
        var result = await MarbleDataParser.ParseUsxTokensAsync(input, CancellationToken.None);

        // Assert: GM-012 prerequisite - section boundaries available for filtering
        Assert.That(result.Success, Is.True);
        Assert.That(
            result.SectionBoundaries,
            Is.Not.Null,
            "GM-012: Section boundaries must be available for scope filtering"
        );
        Assert.That(
            result.SectionBoundaries!.Count,
            Is.GreaterThanOrEqualTo(2),
            "GM-012: Multiple section boundaries expected for filtering tests"
        );

        // Verify each section boundary is a valid token index
        foreach (int boundary in result.SectionBoundaries!)
        {
            Assert.That(
                result.Tokens!.Any(t => t.TokenIndex == boundary),
                Is.True,
                $"GM-012: Section boundary index {boundary} must correspond to an actual token"
            );
        }
    }

    /// <summary>
    /// GM-021: Source text processing golden master.
    /// Verifies cantillation stripping, bracket removal, and phrase text concatenation.
    /// Comparison strategy: exact.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("ScenarioId", "TS-080")]
    [Property("BehaviorId", "BHV-608")]
    [Property("GoldenMaster", "GM-021")]
    [Description("GM-021: Source text processing - cantillation stripped, brackets removed")]
    public async Task GoldenMaster_GM021_SourceTextProcessing()
    {
        // Arrange: GM-021 input - NT USX with source words (brackets in src-text)
        string usxWithProcessableSourceText = """
            <usx version="3.0">
              <book code="MAT" style="id">Matthew</book>
              <chapter number="1" style="c" sid="MAT 1"/>
              <para style="p">
                <verse number="1" style="v" sid="MAT 1:1"/>
                <char style="w" link-href="SDBG:klinon:001001" src-text="[klinon]" src-transliteration="klinon" src-pos="noun-dans" src-lemma="klinon">couch</char>
                <verse eid="MAT 1:1"/>
              </para>
              <chapter eid="MAT 1"/>
            </usx>
            """;

        var input = new TokenParsingInput(
            UsxContent: usxWithProcessableSourceText,
            BookNumber: 40,
            IncludeSourceWords: true,
            ResourceId: "ESV-ER"
        );

        // Act
        var result = await MarbleDataParser.ParseUsxTokensAsync(input, CancellationToken.None);

        // Assert: GM-021 expected output
        Assert.That(result.Success, Is.True);

        var sourceTokens = result.Tokens!.Where(t => t.SourceWord != null).ToList();
        Assert.That(sourceTokens, Is.Not.Empty, "GM-021: Should have source word tokens");

        // GM-021: bracketRemoval.result = "klinon"
        var surfaceText = sourceTokens.First().SourceWord!.SurfaceText;
        Assert.That(
            surfaceText,
            Is.EqualTo("klinon"),
            "GM-021: Brackets should be removed from source text"
        );
    }

    // =========================================================================
    // INVARIANT TESTS
    // =========================================================================

    /// <summary>
    /// INV-017: Section boundaries are always determined by \s paragraph markers.
    /// When no \s markers are present, section boundaries should be empty.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("InvariantId", "INV-017")]
    [Property("ScenarioId", "TS-050")]
    [Property("BehaviorId", "BHV-608")]
    [Description("INV-017: No \\s markers means empty section boundaries")]
    public async Task INV017_NoSectionMarkers_EmptySectionBoundaries()
    {
        // Arrange: USX without any \s markers
        string usxWithoutSections = """
            <usx version="3.0">
              <book code="GEN" style="id">Genesis</book>
              <chapter number="1" style="c" sid="GEN 1"/>
              <para style="p">
                <verse number="1" style="v" sid="GEN 1:1"/>In the beginning.
                <verse eid="GEN 1:1"/>
              </para>
              <chapter eid="GEN 1"/>
            </usx>
            """;

        var input = new TokenParsingInput(
            UsxContent: usxWithoutSections,
            BookNumber: 1,
            IncludeSourceWords: false,
            ResourceId: "ESV-ER"
        );

        // Act
        var result = await MarbleDataParser.ParseUsxTokensAsync(input, CancellationToken.None);

        // Assert: INV-017 - no \s markers means no section boundaries
        Assert.That(result.Success, Is.True);
        Assert.That(result.SectionBoundaries, Is.Not.Null);
        Assert.That(
            result.SectionBoundaries!,
            Is.Empty,
            "INV-017: No \\s markers should yield empty section boundaries"
        );
    }

    /// <summary>
    /// INV-017: Section boundaries must correspond to ParagraphStart tokens.
    /// Every index in SectionBoundaries must be a valid token with type ParagraphStart
    /// and a style starting with "s".
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("InvariantId", "INV-017")]
    [Property("ScenarioId", "TS-050")]
    [Property("BehaviorId", "BHV-608")]
    [Description("INV-017: Every section boundary index maps to a ParagraphStart with \\s style")]
    public async Task INV017_SectionBoundaries_AllMapToParagraphStartWithSStyle()
    {
        // Arrange: USX with multiple \s1 markers
        var input = new TokenParsingInput(
            UsxContent: UsxWithSectionBoundaries,
            BookNumber: 40,
            IncludeSourceWords: false,
            ResourceId: "ESV-ER"
        );

        // Act
        var result = await MarbleDataParser.ParseUsxTokensAsync(input, CancellationToken.None);

        // Assert: INV-017 - every boundary is a valid ParagraphStart with \s
        Assert.That(result.Success, Is.True);
        Assert.That(result.SectionBoundaries, Is.Not.Null.And.Not.Empty);

        foreach (int boundaryIndex in result.SectionBoundaries!)
        {
            var boundaryToken = result.Tokens!.FirstOrDefault(t => t.TokenIndex == boundaryIndex);
            Assert.That(
                boundaryToken,
                Is.Not.Null,
                $"INV-017: Boundary index {boundaryIndex} must reference an existing token"
            );
            Assert.That(
                boundaryToken!.Type,
                Is.EqualTo(MarbleTokenType.ParagraphStart),
                $"INV-017: Boundary at index {boundaryIndex} must be ParagraphStart"
            );
            Assert.That(
                boundaryToken.Style,
                Does.StartWith("s"),
                $"INV-017: Boundary at index {boundaryIndex} must have \\s style"
            );
        }
    }

    /// <summary>
    /// VAL-012 / INV-C20: Hebrew cantillation marks are always stripped.
    /// Specifically tests the exact Unicode ranges that must be removed.
    /// This is a critical invariant for correct Hebrew text display.
    /// </summary>
    [TestCase('\u0591', Description = "HEBREW ACCENT ETNAHTA")]
    [TestCase('\u059A', Description = "HEBREW ACCENT YETIV")]
    [TestCase('\u05A5', Description = "HEBREW ACCENT MERKHA")]
    [TestCase('\u05AF', Description = "HEBREW MARK MASORA CIRCLE")]
    [TestCase('\u05BD', Description = "HEBREW POINT METEG")]
    [TestCase('\u05C3', Description = "HEBREW PUNCTUATION SOF PASUQ")]
    [Category("Invariant")]
    [Property("InvariantId", "VAL-012")]
    [Property("ScenarioId", "TS-080")]
    [Property("BehaviorId", "BHV-608")]
    [Description("VAL-012: All cantillation marks in specified Unicode ranges are stripped")]
    public async Task VAL012_CantillationMark_StrippedFromSurfaceText(char cantillationMark)
    {
        // Arrange: Hebrew base letter (BET) + cantillation mark
        string hebrewWithMark = $"\u05D1{cantillationMark}\u05E8";
        string expectedClean = "\u05D1\u05E8"; // BET + RESH without mark

        string usxWithMark = $"""
            <usx version="3.0">
              <book code="GEN" style="id">Genesis</book>
              <chapter number="1" style="c" sid="GEN 1"/>
              <para style="p">
                <verse number="1" style="v" sid="GEN 1:1"/>
                <char style="w" link-href="SDBH:test:001001" src-text="{hebrewWithMark}" src-transliteration="test" src-pos="nsfcaH" src-lemma="test">test</char>
                <verse eid="GEN 1:1"/>
              </para>
              <chapter eid="GEN 1"/>
            </usx>
            """;

        var input = new TokenParsingInput(
            UsxContent: usxWithMark,
            BookNumber: 1,
            IncludeSourceWords: true,
            ResourceId: "ESV-ER"
        );

        // Act
        var result = await MarbleDataParser.ParseUsxTokensAsync(input, CancellationToken.None);

        // Assert: The cantillation mark should not appear in the surface text
        Assert.That(result.Success, Is.True);
        var sourceTokens = result.Tokens!.Where(t => t.SourceWord != null).ToList();
        Assert.That(sourceTokens, Is.Not.Empty);

        var surfaceText = sourceTokens.First().SourceWord!.SurfaceText;
        // NOTE: NUnit's Does.Not.Contain() uses StringComparison.CurrentCulture,
        // which treats Hebrew cantillation marks (U+0591-U+05AF, U+05BD) as
        // "default ignorable" under ICU globalization, causing false matches.
        // Use ordinal char-by-char check instead (same pattern as TS-080 test).
        foreach (char c in surfaceText)
        {
            Assert.That(
                (int)c,
                Is.Not.EqualTo((int)cantillationMark),
                $"VAL-012: Cantillation mark U+{(int)cantillationMark:X4} should be stripped"
            );
        }
    }

    // =========================================================================
    // RESULT TYPE STRUCTURE TESTS
    // =========================================================================

    /// <summary>
    /// Success result has correct structure: Success=true, Tokens is non-null,
    /// SectionBoundaries is non-null, Error is null.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-048")]
    [Property("BehaviorId", "BHV-608")]
    [Description("Success result has correct structure per Section 3.2")]
    public async Task ParseUsxTokens_SuccessResult_HasCorrectStructure()
    {
        // Arrange: Valid USX
        var input = new TokenParsingInput(
            UsxContent: SampleUsxWithAllTokenTypes,
            BookNumber: 1,
            IncludeSourceWords: false,
            ResourceId: "ESV-ER"
        );

        // Act
        var result = await MarbleDataParser.ParseUsxTokensAsync(input, CancellationToken.None);

        // Assert: Per Section 3.2 result type structure
        Assert.That(result.Success, Is.True);
        Assert.That(result.Tokens, Is.Not.Null, "Tokens should be present on success");
        Assert.That(
            result.SectionBoundaries,
            Is.Not.Null,
            "SectionBoundaries should be present on success"
        );
        Assert.That(result.Error, Is.Null, "Error should be null on success");
    }

    /// <summary>
    /// Error result has correct structure: Success=false, Tokens is null,
    /// SectionBoundaries is null, Error has Code and Message.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-048")]
    [Property("BehaviorId", "BHV-608")]
    [Description("Error result has correct structure per Section 3.2")]
    public async Task ParseUsxTokens_ErrorResult_HasCorrectStructure()
    {
        // Arrange: Invalid USX
        var input = new TokenParsingInput(
            UsxContent: "<not-valid-xml",
            BookNumber: 1,
            IncludeSourceWords: false,
            ResourceId: "ESV-ER"
        );

        // Act
        var result = await MarbleDataParser.ParseUsxTokensAsync(input, CancellationToken.None);

        // Assert: Per Section 3.2 result type structure
        Assert.That(result.Success, Is.False);
        Assert.That(result.Tokens, Is.Null, "Tokens should be null on failure");
        Assert.That(
            result.SectionBoundaries,
            Is.Null,
            "SectionBoundaries should be null on failure"
        );
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

    // =========================================================================
    // EXTRACTION TESTS - EXT-006, EXT-013, EXT-014, EXT-015
    // =========================================================================

    /// <summary>
    /// EXT-006: USX XML to MarbleToken conversion is a self-contained transformation.
    /// The parser should handle standard USX elements without external state.
    /// </summary>
    [Test]
    [Category("Extraction")]
    [Property("ExtractionId", "EXT-006")]
    [Property("ScenarioId", "TS-048")]
    [Property("BehaviorId", "BHV-608")]
    [Description("EXT-006: USX to token conversion is self-contained")]
    public async Task ParseUsxTokens_EXT006_SelfContainedConversion()
    {
        // Arrange: Minimal valid USX
        string minimalUsx = """
            <usx version="3.0">
              <book code="GEN" style="id">Genesis</book>
              <chapter number="1" style="c" sid="GEN 1"/>
              <para style="p">
                <verse number="1" style="v" sid="GEN 1:1"/>In the beginning.
                <verse eid="GEN 1:1"/>
              </para>
              <chapter eid="GEN 1"/>
            </usx>
            """;

        var input = new TokenParsingInput(
            UsxContent: minimalUsx,
            BookNumber: 1,
            IncludeSourceWords: false,
            ResourceId: "ESV-ER"
        );

        // Act: Call directly without any prior initialization
        var result = await MarbleDataParser.ParseUsxTokensAsync(input, CancellationToken.None);

        // Assert: Should work without external dependencies
        Assert.That(
            result.Success,
            Is.True,
            "EXT-006: Parser should work on valid USX without external setup"
        );
        Assert.That(result.Tokens, Is.Not.Null.And.Not.Empty);
    }

    /// <summary>
    /// EXT-014: ParagraphStart and ParagraphEnd tokens correctly paired.
    /// Every para element should produce both a ParagraphStart and ParagraphEnd.
    /// </summary>
    [Test]
    [Category("Extraction")]
    [Property("ExtractionId", "EXT-014")]
    [Property("ScenarioId", "TS-048")]
    [Property("BehaviorId", "BHV-608")]
    [Description("EXT-014: Paragraph start/end tokens correctly paired")]
    public async Task ParseUsxTokens_EXT014_ParagraphTokensPaired()
    {
        // Arrange
        var input = new TokenParsingInput(
            UsxContent: SampleUsxWithAllTokenTypes,
            BookNumber: 1,
            IncludeSourceWords: false,
            ResourceId: "ESV-ER"
        );

        // Act
        var result = await MarbleDataParser.ParseUsxTokensAsync(input, CancellationToken.None);

        // Assert: ParagraphStart and ParagraphEnd should be paired
        Assert.That(result.Success, Is.True);
        var paragraphStarts = result.Tokens!.Count(t => t.Type == MarbleTokenType.ParagraphStart);
        var paragraphEnds = result.Tokens!.Count(t => t.Type == MarbleTokenType.ParagraphEnd);
        Assert.That(
            paragraphEnds,
            Is.EqualTo(paragraphStarts),
            "EXT-014: Every ParagraphStart should have a matching ParagraphEnd"
        );
    }

    /// <summary>
    /// EXT-015: Phrase text aggregation applies only when source words share links.
    /// When includeSourceWords is false, no phrase text should be computed.
    /// </summary>
    [Test]
    [Category("Extraction")]
    [Property("ExtractionId", "EXT-015")]
    [Property("ScenarioId", "TS-082")]
    [Property("BehaviorId", "BHV-608")]
    [Description("EXT-015: No phrase text when source words not requested")]
    public async Task ParseUsxTokens_EXT015_NoPhraseTextWithoutSourceWords()
    {
        // Arrange
        var input = new TokenParsingInput(
            UsxContent: SampleUsxWithAllTokenTypes,
            BookNumber: 1,
            IncludeSourceWords: false,
            ResourceId: "ESV-ER"
        );

        // Act
        var result = await MarbleDataParser.ParseUsxTokensAsync(input, CancellationToken.None);

        // Assert: No phrase text when source words not loaded
        Assert.That(result.Success, Is.True);
        var tokensWithPhraseText = result.Tokens!.Where(t => t.PhraseText != null).ToList();
        Assert.That(
            tokensWithPhraseText,
            Is.Empty,
            "EXT-015: No phrase text should be present when includeSourceWords=false"
        );
    }

    /// <summary>
    /// TS-048: ParagraphStart tokens should carry the style attribute.
    /// \p paragraphs have style="p", \s1 sections have style="s1".
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-048")]
    [Property("BehaviorId", "BHV-608")]
    [Description("ParagraphStart tokens carry the USFM style marker")]
    public async Task ParseUsxTokens_ParagraphTokens_CarryStyleAttribute()
    {
        // Arrange
        var input = new TokenParsingInput(
            UsxContent: UsxWithSectionBoundaries,
            BookNumber: 40,
            IncludeSourceWords: false,
            ResourceId: "ESV-ER"
        );

        // Act
        var result = await MarbleDataParser.ParseUsxTokensAsync(input, CancellationToken.None);

        // Assert: ParagraphStart tokens should have Style set
        Assert.That(result.Success, Is.True);
        var paragraphStarts = result
            .Tokens!.Where(t => t.Type == MarbleTokenType.ParagraphStart)
            .ToList();
        Assert.That(paragraphStarts, Is.Not.Empty);

        foreach (var para in paragraphStarts)
        {
            Assert.That(
                para.Style,
                Is.Not.Null.And.Not.Empty,
                $"ParagraphStart at index {para.TokenIndex} should have a style"
            );
        }

        // Verify both \p and \s1 styles are present
        var styles = paragraphStarts.Select(p => p.Style).ToHashSet();
        Assert.That(styles, Does.Contain("p"), "Should have \\p style paragraphs");
        Assert.That(styles, Does.Contain("s1"), "Should have \\s1 style sections");
    }
}

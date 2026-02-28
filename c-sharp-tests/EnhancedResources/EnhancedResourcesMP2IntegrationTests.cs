using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.EnhancedResources;
using SIL.Scripture;

namespace TestParanextDataProvider.EnhancedResources;

/// <summary>
/// Integration tests for Micro-Phase 2 (Core Parsing) capability chains.
///
/// These tests verify cross-capability interactions between:
/// - CAP-001 (ParseLexicalLinks): Parses link strings into structured LexicalLink objects
/// - CAP-002 (ParseUsxTokens): Parses USX XML into MarbleToken stream with section boundaries
/// - CAP-003 (GetLinksInScope): Filters token stream by scope (verse/section/chapter/sense)
/// - CAP-008 (TranslatePartOfSpeech): Translates POS tags to human-readable text
///
/// Integration Touchpoints:
/// 1. CAP-002 -> CAP-003: Scope filtering operates on parsed token stream
/// 2. CAP-002 -> CAP-001 -> CAP-008: Links in parsed tokens have POS tags that can be translated
/// 3. CAP-001 -> CAP-008: Parsed lexical links from link strings use dictionaries that
///    determine POS format (SDBH for Hebrew, SDBG for Greek)
/// 4. CAP-002 -> CAP-003 -> CAP-008: Full pipeline from USX to scoped, POS-translated links
///
/// These tests use REAL implementations (not mocks). All four capabilities are implemented
/// and pass unit tests individually. Integration tests verify they compose correctly.
/// </summary>
[TestFixture]
[Category("Integration")]
[ExcludeFromCodeCoverage]
public class EnhancedResourcesMP2IntegrationTests
{
    // =========================================================================
    // TEST DATA - USX XML for integration scenarios
    // =========================================================================

    /// <summary>
    /// NT USX XML with source words containing POS tags for Greek.
    /// Two sections with links in different verses, POS tags on source words.
    /// Designed for full pipeline testing: parse -> scope filter -> POS translate.
    /// </summary>
    private const string NtUsxWithSourceAndSections = """
        <usx version="3.0">
          <book code="MAT" style="id">Matthew</book>
          <chapter number="1" style="c" sid="MAT 1"/>
          <para style="s1">The Genealogy</para>
          <para style="p">
            <verse number="1" style="v" sid="MAT 1:1"/>
            <char style="w" link-href="SDBG:biblos:001001" src-text="biblos" src-transliteration="biblos" src-pos="noun-ngfs" src-lemma="biblos">book</char>
            of the
            <char style="w" link-href="SDBG:genesis:001001" src-text="geneseos" src-transliteration="geneseos" src-pos="noun-ngfs" src-lemma="genesis">genealogy</char>
            <verse eid="MAT 1:1"/>
            <verse number="2" style="v" sid="MAT 1:2"/>
            <char style="w" link-href="SDBG:gennao:001001" src-text="egennesen" src-transliteration="egennesen" src-pos="noun-dans" src-lemma="gennao">begot</char>
            <verse eid="MAT 1:2"/>
          </para>
          <para style="s1">The Birth of Jesus</para>
          <para style="p">
            <verse number="18" style="v" sid="MAT 1:18"/>
            <char style="w" link-href="SDBG:genesis:001001" src-text="genesis" src-transliteration="genesis" src-pos="noun-ngfs" src-lemma="genesis">birth</char>
            of Jesus
            <char style="w" link-href="SDBG:christos:001001" src-text="christou" src-transliteration="christou" src-pos="noun-dgms" src-lemma="christos">Christ</char>
            <verse eid="MAT 1:18"/>
          </para>
          <chapter eid="MAT 1"/>
        </usx>
        """;

    /// <summary>
    /// OT USX XML with Hebrew source words containing POS tags.
    /// Used for Hebrew POS translation integration.
    /// All POS tags use validated Hebrew format: root (2 chars) + ng (2 chars) + state (1 char)
    /// + suffix (3 chars, optional) + language (1 char).
    /// Tags used: "nspmaH" (noun masculine plural absolute Hebrew) - known valid from unit tests.
    /// </summary>
    private const string OtUsxWithHebrewSource = """
        <usx version="3.0">
          <book code="GEN" style="id">Genesis</book>
          <chapter number="1" style="c" sid="GEN 1"/>
          <para style="s1">The Creation</para>
          <para style="p">
            <verse number="1" style="v" sid="GEN 1:1"/>
            <char style="w" link-href="SDBH:reshit:001001" src-text="bereshit" src-transliteration="bereshit" src-pos="nssmaH" src-lemma="reshit">beginning</char>
            <char style="w" link-href="SDBH:elohim:001001" src-text="elohim" src-transliteration="elohim" src-pos="nspmaH" src-lemma="elohim">God</char>
            <char style="w" link-href="SDBH:bara:001001" src-text="bara" src-transliteration="bara" src-pos="nssmaH" src-lemma="bara">created</char>
            <verse eid="GEN 1:1"/>
            <verse number="2" style="v" sid="GEN 1:2"/>
            <char style="w" link-href="SDBH:eretz:001001" src-text="haarets" src-transliteration="haarets" src-pos="nssmaH" src-lemma="eretz">earth</char>
            <verse eid="GEN 1:2"/>
          </para>
          <chapter eid="GEN 1"/>
        </usx>
        """;

    // =========================================================================
    // HELPER: Parse USX into tokens (using REAL CAP-002 implementation)
    // =========================================================================

    /// <summary>
    /// Helper to parse USX XML using the real CAP-002 ParseUsxTokensAsync.
    /// Asserts parsing succeeds as a precondition for integration tests.
    /// </summary>
    private static async Task<ParseUsxTokensResult> ParseTokens(
        string usxContent,
        int bookNumber,
        bool includeSourceWords = false
    )
    {
        var input = new TokenParsingInput(
            UsxContent: usxContent,
            BookNumber: bookNumber,
            IncludeSourceWords: includeSourceWords,
            ResourceId: "test-resource"
        );
        var result = await MarbleDataParser.ParseUsxTokensAsync(input, CancellationToken.None);
        Assert.That(
            result.Success,
            Is.True,
            "Integration precondition: CAP-002 USX parsing must succeed"
        );
        return result;
    }

    // =========================================================================
    // CHAIN 1: CAP-002 -> CAP-003 (Parse USX -> Filter by scope)
    // =========================================================================

    /// <summary>
    /// Integration: Parse USX into tokens (CAP-002), then filter by CurrentVerse
    /// scope (CAP-003). Verifies that the token stream produced by the parser
    /// is correctly consumed by the scope filter.
    ///
    /// This tests the primary data flow: XML -> token stream -> scoped link list.
    /// </summary>
    [Test]
    [Property("IntegrationChain", "CAP-002 -> CAP-003")]
    [Property("CapabilityId", "CAP-002,CAP-003")]
    [Property("ScenarioId", "TS-048,TS-051")]
    [Property("BehaviorId", "BHV-608,BHV-402")]
    [Description("Parse USX -> CurrentVerse scope filter: full pipeline from XML to scoped links")]
    public async Task ParseUsxThenScopeFilter_CurrentVerse_ReturnsOnlyCurrentVerseLinks()
    {
        // Arrange: Parse NT USX with sections (CAP-002)
        var parsedTokens = await ParseTokens(
            NtUsxWithSourceAndSections,
            bookNumber: 40,
            includeSourceWords: true
        );

        // Act: Filter by CurrentVerse for MAT 1:1 (CAP-003)
        var scopeInput = new ScopeFilterInput(
            VerseRef: new VerseRef(40, 1, 1), // MAT 1:1
            Scope: "currentVerse",
            FilteredLemma: null,
            FilteredSource: null,
            ResourceId: "test-resource"
        );
        var scopeResult = await MarbleDataParser.GetLinksInScopeAsync(
            scopeInput,
            parsedTokens,
            CancellationToken.None
        );

        // Assert: Scope filter successfully consumed parser output
        Assert.That(
            scopeResult.Success,
            Is.True,
            "CAP-003: Scope filtering should succeed on CAP-002 output"
        );
        Assert.That(scopeResult.Links, Is.Not.Null.And.Not.Empty, "Should have links in MAT 1:1");

        // Verify only MAT 1:1 links are returned (biblos and genesis)
        var lemmas = scopeResult.Links!.Select(l => l.Lemma).ToList();
        Assert.That(lemmas, Does.Contain("biblos"), "MAT 1:1 contains biblos link");
        Assert.That(lemmas, Does.Contain("genesis"), "MAT 1:1 contains genesis link");

        // Should NOT contain links from other verses
        Assert.That(
            lemmas,
            Does.Not.Contain("gennao"),
            "CurrentVerse should not include MAT 1:2 links"
        );
        Assert.That(
            lemmas,
            Does.Not.Contain("christos"),
            "CurrentVerse should not include MAT 1:18 links"
        );
    }

    /// <summary>
    /// Integration: Parse USX (CAP-002), then filter by CurrentSection (CAP-003).
    /// Verifies that section boundaries detected by the parser are correctly used
    /// by the scope filter to limit links to the current section.
    ///
    /// The section boundary data flows from CAP-002's SectionBoundaries output
    /// into CAP-003's section-based filtering logic.
    /// </summary>
    [Test]
    [Property("IntegrationChain", "CAP-002 -> CAP-003")]
    [Property("CapabilityId", "CAP-002,CAP-003")]
    [Property("ScenarioId", "TS-050,TS-052")]
    [Property("BehaviorId", "BHV-608,BHV-402")]
    [Property("InvariantId", "INV-017")]
    [Description(
        "Parse USX -> CurrentSection scope filter: section boundaries from parser respected"
    )]
    public async Task ParseUsxThenScopeFilter_CurrentSection_RespectsSectionBoundaries()
    {
        // Arrange: Parse NT USX with 2 sections (CAP-002)
        var parsedTokens = await ParseTokens(
            NtUsxWithSourceAndSections,
            bookNumber: 40,
            includeSourceWords: false
        );

        // Verify CAP-002 detected section boundaries (integration precondition)
        Assert.That(
            parsedTokens.SectionBoundaries,
            Is.Not.Null.And.Not.Empty,
            "CAP-002 must detect \\s1 section boundaries for CAP-003 to use"
        );
        Assert.That(
            parsedTokens.SectionBoundaries!.Count,
            Is.EqualTo(2),
            "Two \\s1 markers should produce 2 section boundaries"
        );

        // Act: Filter by CurrentSection for MAT 1:1 - in "The Genealogy" section (CAP-003)
        var section1Input = new ScopeFilterInput(
            VerseRef: new VerseRef(40, 1, 1),
            Scope: "currentSection",
            FilteredLemma: null,
            FilteredSource: null,
            ResourceId: "test-resource"
        );
        var section1Result = await MarbleDataParser.GetLinksInScopeAsync(
            section1Input,
            parsedTokens,
            CancellationToken.None
        );

        // Act: Filter by CurrentSection for MAT 1:18 - in "The Birth of Jesus" section
        var section2Input = new ScopeFilterInput(
            VerseRef: new VerseRef(40, 1, 18),
            Scope: "currentSection",
            FilteredLemma: null,
            FilteredSource: null,
            ResourceId: "test-resource"
        );
        var section2Result = await MarbleDataParser.GetLinksInScopeAsync(
            section2Input,
            parsedTokens,
            CancellationToken.None
        );

        // Assert: Section 1 has links from verses 1-2 but not verse 18
        Assert.That(section1Result.Success, Is.True);
        Assert.That(section1Result.Links, Is.Not.Null.And.Not.Empty);
        var section1Lemmas = section1Result.Links!.Select(l => l.Lemma).Distinct().ToHashSet();
        Assert.That(section1Lemmas, Does.Contain("biblos"), "Section 1 should contain biblos");
        Assert.That(
            section1Lemmas,
            Does.Not.Contain("christos"),
            "Section 1 should NOT contain section 2's christos"
        );

        // Assert: Section 2 has links from verse 18 but not verses 1-2
        Assert.That(section2Result.Success, Is.True);
        Assert.That(section2Result.Links, Is.Not.Null.And.Not.Empty);
        var section2Lemmas = section2Result.Links!.Select(l => l.Lemma).Distinct().ToHashSet();
        Assert.That(section2Lemmas, Does.Contain("christos"), "Section 2 should contain christos");
        Assert.That(
            section2Lemmas,
            Does.Not.Contain("biblos"),
            "Section 2 should NOT contain section 1's biblos"
        );
        Assert.That(
            section2Lemmas,
            Does.Not.Contain("gennao"),
            "Section 2 should NOT contain section 1's gennao"
        );
    }

    // =========================================================================
    // CHAIN 2: CAP-001 -> CAP-008 (Parse links -> Translate POS)
    // =========================================================================

    /// <summary>
    /// Integration: Parse a lexical link string (CAP-001) to get the dictionary,
    /// then use that dictionary to translate a POS tag (CAP-008).
    ///
    /// This verifies that the dictionary field from a parsed link correctly
    /// routes to the appropriate POS translation format (SDBG for Greek,
    /// SDBH for Hebrew).
    /// </summary>
    [Test]
    [Property("IntegrationChain", "CAP-001 -> CAP-008")]
    [Property("CapabilityId", "CAP-001,CAP-008")]
    [Property("ScenarioId", "TS-035,TS-056")]
    [Property("BehaviorId", "BHV-302,BHV-610")]
    [Description(
        "Parse Greek link -> Translate POS: dictionary from parsed link routes to SDBG POS format"
    )]
    public async Task ParseLinkThenTranslatePOS_GreekLink_TranslatesWithCorrectDictionary()
    {
        // Arrange & Act: CAP-001 - Parse a Greek lexical link string
        var linkInput = new LexicalLinkInput("SDBG:biblos:001001");
        var linkResult = await LexiconService.ParseLexicalLinksAsync(
            linkInput,
            CancellationToken.None
        );

        // Assert: Link parsed successfully
        Assert.That(linkResult.Success, Is.True, "CAP-001: Link parsing should succeed");
        var link = linkResult.Links![0];
        Assert.That(link.Dictionary, Is.EqualTo("SDBG"), "Parsed link should be SDBG (Greek)");

        // Act: CAP-008 - Use the parsed link's dictionary to translate a POS tag
        // The dictionary determines whether we use Greek (hyphen-separated) or Hebrew
        // (character-code) format
        var posInput = new PosTranslationInput(link.Dictionary, "noun-dans", ShortFormat: false);
        var posResult = await PosTranslationService.TranslatePartOfSpeechAsync(
            posInput,
            CancellationToken.None
        );

        // Assert: POS translation succeeds with dictionary from parsed link
        Assert.That(
            posResult.Success,
            Is.True,
            "CAP-008: POS translation should succeed with dictionary from CAP-001 output"
        );
        Assert.That(
            posResult.Translation,
            Is.EqualTo("noun declinable accusative neuter singular"),
            "Greek POS tag should translate correctly using SDBG dictionary from parsed link"
        );
    }

    /// <summary>
    /// Integration: Parse a Hebrew lexical link string (CAP-001) to get the dictionary,
    /// then use that dictionary to translate a Hebrew POS tag (CAP-008).
    ///
    /// This verifies Hebrew routing: SDBH from parsed links uses character-code POS format.
    /// </summary>
    [Test]
    [Property("IntegrationChain", "CAP-001 -> CAP-008")]
    [Property("CapabilityId", "CAP-001,CAP-008")]
    [Property("ScenarioId", "TS-035,TS-055")]
    [Property("BehaviorId", "BHV-302,BHV-610")]
    [Description(
        "Parse Hebrew link -> Translate POS: dictionary from parsed link routes to SDBH POS format"
    )]
    public async Task ParseLinkThenTranslatePOS_HebrewLink_TranslatesWithCorrectDictionary()
    {
        // Arrange & Act: CAP-001 - Parse a Hebrew lexical link string
        var linkInput = new LexicalLinkInput("SDBH:reshit:001001");
        var linkResult = await LexiconService.ParseLexicalLinksAsync(
            linkInput,
            CancellationToken.None
        );

        // Assert: Link parsed successfully
        Assert.That(linkResult.Success, Is.True, "CAP-001: Link parsing should succeed");
        var link = linkResult.Links![0];
        Assert.That(link.Dictionary, Is.EqualTo("SDBH"), "Parsed link should be SDBH (Hebrew)");

        // Act: CAP-008 - Use the parsed link's dictionary to translate a Hebrew POS tag
        var posInput = new PosTranslationInput(link.Dictionary, "nspmaH", ShortFormat: false);
        var posResult = await PosTranslationService.TranslatePartOfSpeechAsync(
            posInput,
            CancellationToken.None
        );

        // Assert: POS translation succeeds with dictionary from parsed link
        Assert.That(
            posResult.Success,
            Is.True,
            "CAP-008: POS translation should succeed with dictionary from CAP-001 output"
        );
        Assert.That(
            posResult.Translation,
            Is.EqualTo("noun masculine plural absolute"),
            "Hebrew POS tag should translate correctly using SDBH dictionary from parsed link"
        );
    }

    // =========================================================================
    // CHAIN 3: CAP-002 + CAP-008 (Parse USX -> Translate source word POS)
    // =========================================================================

    /// <summary>
    /// Integration: Parse USX with source words (CAP-002) to get tokens with POS tags,
    /// then translate those POS tags (CAP-008).
    ///
    /// This verifies that source word POS tags embedded in USX attributes are
    /// correctly extracted by the parser and are in the format expected by the
    /// POS translation service.
    /// </summary>
    [Test]
    [Property("IntegrationChain", "CAP-002 -> CAP-008")]
    [Property("CapabilityId", "CAP-002,CAP-008")]
    [Property("ScenarioId", "TS-048,TS-056")]
    [Property("BehaviorId", "BHV-608,BHV-610")]
    [Description("Parse NT USX with source words -> Translate POS tags from parsed tokens")]
    public async Task ParseUsxThenTranslatePOS_GreekSourceWords_POSTagsTranslateCorrectly()
    {
        // Arrange & Act: CAP-002 - Parse NT USX with source words
        var parsedTokens = await ParseTokens(
            NtUsxWithSourceAndSections,
            bookNumber: 40,
            includeSourceWords: true
        );

        // Extract source word tokens with POS tags
        var sourceWordTokens = parsedTokens.Tokens!.Where(t => t.SourceWord != null).ToList();

        Assert.That(
            sourceWordTokens,
            Is.Not.Empty,
            "CAP-002 should extract source word tokens with POS tags"
        );

        // Act: CAP-008 - Translate each source word's POS tag
        var translationResults = new List<(string PosTag, PosTranslationResult Result)>();
        foreach (var token in sourceWordTokens)
        {
            var posInput = new PosTranslationInput(
                Dictionary: "SDBG", // NT -> Greek
                PosTag: token.SourceWord!.PosTag,
                ShortFormat: false
            );
            var posResult = await PosTranslationService.TranslatePartOfSpeechAsync(
                posInput,
                CancellationToken.None
            );
            translationResults.Add((token.SourceWord.PosTag, posResult));
        }

        // Assert: All POS tags from parsed USX translate successfully
        foreach (var (posTag, result) in translationResults)
        {
            Assert.That(
                result.Success,
                Is.True,
                $"CAP-008: POS tag '{posTag}' from CAP-002 output should translate successfully"
            );
            Assert.That(
                result.Translation,
                Is.Not.Null.And.Not.Empty,
                $"CAP-008: Translation for '{posTag}' should be non-empty"
            );
        }

        // Verify specific known translations from our test data
        // "noun-ngfs" is a Greek POS tag from the test USX
        var nounResult = translationResults.First(r => r.PosTag == "noun-ngfs");
        Assert.That(
            nounResult.Result.Translation,
            Does.Contain("noun"),
            "'noun-ngfs' translation should contain 'noun'"
        );
    }

    /// <summary>
    /// Integration: Parse OT USX with Hebrew source words (CAP-002), then translate
    /// those Hebrew POS tags (CAP-008).
    ///
    /// This verifies Hebrew POS tags from parsed tokens translate correctly,
    /// confirming the integration between OT parsing and Hebrew POS translation.
    /// </summary>
    [Test]
    [Property("IntegrationChain", "CAP-002 -> CAP-008")]
    [Property("CapabilityId", "CAP-002,CAP-008")]
    [Property("ScenarioId", "TS-048,TS-055")]
    [Property("BehaviorId", "BHV-608,BHV-610")]
    [Description("Parse OT USX with Hebrew source words -> Translate POS tags using SDBH")]
    public async Task ParseUsxThenTranslatePOS_HebrewSourceWords_POSTagsTranslateCorrectly()
    {
        // Arrange & Act: CAP-002 - Parse OT USX with Hebrew source words
        var parsedTokens = await ParseTokens(
            OtUsxWithHebrewSource,
            bookNumber: 1,
            includeSourceWords: true
        );

        // Extract source word tokens with POS tags
        var sourceWordTokens = parsedTokens.Tokens!.Where(t => t.SourceWord != null).ToList();

        Assert.That(
            sourceWordTokens,
            Is.Not.Empty,
            "CAP-002 should extract Hebrew source word tokens"
        );

        // Act: CAP-008 - Translate each Hebrew source word's POS tag
        var translationResults = new List<(string PosTag, PosTranslationResult Result)>();
        foreach (var token in sourceWordTokens)
        {
            var posInput = new PosTranslationInput(
                Dictionary: "SDBH", // OT -> Hebrew
                PosTag: token.SourceWord!.PosTag,
                ShortFormat: false
            );
            var posResult = await PosTranslationService.TranslatePartOfSpeechAsync(
                posInput,
                CancellationToken.None
            );
            translationResults.Add((token.SourceWord.PosTag, posResult));
        }

        // Assert: All Hebrew POS tags from parsed USX translate successfully
        foreach (var (posTag, result) in translationResults)
        {
            Assert.That(
                result.Success,
                Is.True,
                $"CAP-008: Hebrew POS tag '{posTag}' from CAP-002 should translate successfully"
            );
            Assert.That(
                result.Translation,
                Is.Not.Null.And.Not.Empty,
                $"CAP-008: Translation for Hebrew '{posTag}' should be non-empty"
            );
        }

        // Verify known Hebrew POS: "nspmaH" -> "noun masculine plural absolute"
        var nspmaResult = translationResults.First(r => r.PosTag == "nspmaH");
        Assert.That(
            nspmaResult.Result.Translation,
            Is.EqualTo("noun masculine plural absolute"),
            "Known Hebrew POS 'nspmaH' should match PT9 translation"
        );
    }

    // =========================================================================
    // CHAIN 4: Full Pipeline (CAP-002 -> CAP-003 -> CAP-008)
    // =========================================================================

    /// <summary>
    /// Integration: Full pipeline test - Parse USX (CAP-002) -> Scope filter (CAP-003)
    /// -> Translate POS on filtered results (CAP-008).
    ///
    /// This tests the complete data flow a user would experience when viewing
    /// an Enhanced Resource:
    /// 1. CAP-002: USX XML is parsed into tokens with source words
    /// 2. CAP-003: Tokens are filtered by current verse scope
    /// 3. CAP-008: POS tags on filtered links' source words are translated
    ///
    /// Verifies that data flows correctly across all three capability boundaries.
    /// </summary>
    [Test]
    [Property("IntegrationChain", "CAP-002 -> CAP-003 -> CAP-008")]
    [Property("CapabilityId", "CAP-002,CAP-003,CAP-008")]
    [Property("ScenarioId", "TS-048,TS-051,TS-056")]
    [Property("BehaviorId", "BHV-608,BHV-402,BHV-610")]
    [Description(
        "Full pipeline: Parse USX -> Scope filter (CurrentVerse) -> Translate POS on results"
    )]
    public async Task FullPipeline_ParseScopeTranslate_CurrentVerseWithPOSTranslation()
    {
        // Step 1: CAP-002 - Parse NT USX with source words
        var parsedTokens = await ParseTokens(
            NtUsxWithSourceAndSections,
            bookNumber: 40,
            includeSourceWords: true
        );

        Assert.That(parsedTokens.Tokens, Is.Not.Null.And.Not.Empty, "Step 1 (CAP-002): Tokens");
        Assert.That(
            parsedTokens.SectionBoundaries,
            Is.Not.Null,
            "Step 1 (CAP-002): Section boundaries"
        );

        // Step 2: CAP-003 - Filter by CurrentVerse for MAT 1:1
        var scopeInput = new ScopeFilterInput(
            VerseRef: new VerseRef(40, 1, 1),
            Scope: "currentVerse",
            FilteredLemma: null,
            FilteredSource: null,
            ResourceId: "test-resource"
        );
        var scopeResult = await MarbleDataParser.GetLinksInScopeAsync(
            scopeInput,
            parsedTokens,
            CancellationToken.None
        );

        Assert.That(scopeResult.Success, Is.True, "Step 2 (CAP-003): Scope filter should succeed");
        Assert.That(
            scopeResult.Links,
            Is.Not.Null.And.Not.Empty,
            "Step 2 (CAP-003): Should have links in MAT 1:1"
        );

        // Step 3: CAP-008 - Find tokens for filtered links and translate their POS tags
        // Get the token indices from scope result, find matching tokens with source words
        var filteredTokens = parsedTokens
            .Tokens!.Where(t =>
                t.SourceWord != null
                && t.Type == MarbleTokenType.TextLink
                && t.Links != null
                && t.Links.Any(l =>
                    scopeResult.Links!.Any(sl =>
                        sl.Lemma == l.Lemma && sl.Dictionary == l.Dictionary
                    )
                )
            )
            .ToList();

        // Translate POS for all matching source word tokens
        var posTranslations = new List<(string Lemma, string PosTag, string Translation)>();
        foreach (var token in filteredTokens)
        {
            // Only translate tokens that are in the verse scope
            var verseRef = new VerseRef(40, 1, 1);
            var posInput = new PosTranslationInput(
                Dictionary: "SDBG",
                PosTag: token.SourceWord!.PosTag,
                ShortFormat: false
            );
            var posResult = await PosTranslationService.TranslatePartOfSpeechAsync(
                posInput,
                CancellationToken.None
            );

            Assert.That(
                posResult.Success,
                Is.True,
                $"Step 3 (CAP-008): POS translation for '{token.SourceWord.PosTag}' should succeed"
            );
            posTranslations.Add(
                (token.SourceWord.Lemma, token.SourceWord.PosTag, posResult.Translation!)
            );
        }

        // Assert: Full pipeline produced valid, non-empty POS translations
        Assert.That(
            posTranslations,
            Is.Not.Empty,
            "Full pipeline should produce at least one POS translation"
        );

        // Verify each translation is meaningful (not just the tag repeated back)
        foreach (var (lemma, posTag, translation) in posTranslations)
        {
            Assert.That(
                translation,
                Is.Not.EqualTo(posTag),
                $"Translation for '{lemma}' should differ from raw POS tag"
            );
            Assert.That(
                translation.Length,
                Is.GreaterThan(posTag.Length),
                $"Full-form translation for '{lemma}' should be longer than abbreviated tag"
            );
        }
    }

    /// <summary>
    /// Integration: Full pipeline with scope widening - demonstrates that changing
    /// scope from CurrentVerse to CurrentChapter reveals more links whose POS tags
    /// can all be translated.
    ///
    /// This verifies the workflow where a user widens scope and sees more
    /// source words with POS information.
    /// </summary>
    [Test]
    [Property("IntegrationChain", "CAP-002 -> CAP-003 -> CAP-008")]
    [Property("CapabilityId", "CAP-002,CAP-003,CAP-008")]
    [Property("ScenarioId", "TS-048,TS-053,TS-055")]
    [Property("BehaviorId", "BHV-608,BHV-402,BHV-610")]
    [Description(
        "Full pipeline: scope widening from verse to chapter reveals more translatable POS tags"
    )]
    public async Task FullPipeline_ScopeWidening_MoreLinksAllTranslatable()
    {
        // Step 1: CAP-002 - Parse OT USX with Hebrew source words
        var parsedTokens = await ParseTokens(
            OtUsxWithHebrewSource,
            bookNumber: 1,
            includeSourceWords: true
        );

        // Step 2: CAP-003 - Filter by CurrentVerse for GEN 1:1
        var verseInput = new ScopeFilterInput(
            VerseRef: new VerseRef(1, 1, 1),
            Scope: "currentVerse",
            FilteredLemma: null,
            FilteredSource: null,
            ResourceId: "test-resource"
        );
        var verseResult = await MarbleDataParser.GetLinksInScopeAsync(
            verseInput,
            parsedTokens,
            CancellationToken.None
        );

        // Step 2b: CAP-003 - Filter by CurrentChapter for GEN 1:1
        var chapterInput = new ScopeFilterInput(
            VerseRef: new VerseRef(1, 1, 1),
            Scope: "currentChapter",
            FilteredLemma: null,
            FilteredSource: null,
            ResourceId: "test-resource"
        );
        var chapterResult = await MarbleDataParser.GetLinksInScopeAsync(
            chapterInput,
            parsedTokens,
            CancellationToken.None
        );

        // Assert: Chapter scope yields more links than verse scope
        Assert.That(verseResult.Success, Is.True);
        Assert.That(chapterResult.Success, Is.True);
        Assert.That(
            chapterResult.MatchCount,
            Is.GreaterThan(verseResult.MatchCount),
            "Step 2 (CAP-003): Chapter scope should have more links than verse scope"
        );

        // Step 3: CAP-008 - Verify all source word POS tags in both scopes are translatable
        var allSourceTokens = parsedTokens.Tokens!.Where(t => t.SourceWord != null).ToList();

        int successfulTranslations = 0;
        foreach (var token in allSourceTokens)
        {
            var posInput = new PosTranslationInput(
                Dictionary: "SDBH", // OT -> Hebrew
                PosTag: token.SourceWord!.PosTag,
                ShortFormat: false
            );
            var posResult = await PosTranslationService.TranslatePartOfSpeechAsync(
                posInput,
                CancellationToken.None
            );

            Assert.That(
                posResult.Success,
                Is.True,
                $"Step 3 (CAP-008): Hebrew POS '{token.SourceWord.PosTag}' from chapter scope "
                    + "should translate successfully"
            );
            successfulTranslations++;
        }

        // Verify we translated POS for all source word tokens
        Assert.That(
            successfulTranslations,
            Is.EqualTo(allSourceTokens.Count),
            "All source word POS tags should translate successfully"
        );
        Assert.That(
            successfulTranslations,
            Is.GreaterThan(0),
            "Should have translated at least one POS tag"
        );
    }

    // =========================================================================
    // CHAIN: CAP-002 -> CAP-001 (Token parsing uses link parsing for TextLink)
    // =========================================================================

    /// <summary>
    /// Integration: When CAP-002 parses USX containing char elements with link-href
    /// attributes, it produces TextLink tokens whose Links field contains the same
    /// structured data as CAP-001's ParseLexicalLinks output.
    ///
    /// This verifies that the parser internally uses the same link parsing logic
    /// as the standalone CAP-001 API.
    /// </summary>
    [Test]
    [Property("IntegrationChain", "CAP-001 -> CAP-002")]
    [Property("CapabilityId", "CAP-001,CAP-002")]
    [Property("ScenarioId", "TS-035,TS-048")]
    [Property("BehaviorId", "BHV-302,BHV-608")]
    [Description("Parse USX link-href produces same LexicalLink as standalone ParseLexicalLinks")]
    public async Task ParseUsxLinksMatchStandaloneParse_SameLinkString_SameStructuredOutput()
    {
        // Arrange & Act: CAP-001 - Parse the link string directly
        var standaloneInput = new LexicalLinkInput("SDBG:biblos:001001");
        var standaloneResult = await LexiconService.ParseLexicalLinksAsync(
            standaloneInput,
            CancellationToken.None
        );
        Assert.That(standaloneResult.Success, Is.True, "CAP-001: Standalone parse should succeed");
        var standaloneLink = standaloneResult.Links![0];

        // Act: CAP-002 - Parse USX that embeds the same link string
        var parsedTokens = await ParseTokens(
            NtUsxWithSourceAndSections,
            bookNumber: 40,
            includeSourceWords: false
        );

        // Find the TextLink token with "biblos" (from link-href="SDBG:biblos:001001")
        var textLinkToken = parsedTokens.Tokens!.FirstOrDefault(t =>
            t.Type == MarbleTokenType.TextLink
            && t.Links != null
            && t.Links.Any(l => l.Lemma == "biblos")
        );

        Assert.That(textLinkToken, Is.Not.Null, "CAP-002: Should produce TextLink for biblos");
        var embeddedLink = textLinkToken!.Links!.First(l => l.Lemma == "biblos");

        // Assert: The link from CAP-002's token matches CAP-001's standalone parse
        Assert.That(
            embeddedLink.Dictionary,
            Is.EqualTo(standaloneLink.Dictionary),
            "Dictionary should match between CAP-001 and CAP-002 output"
        );
        Assert.That(
            embeddedLink.Lemma,
            Is.EqualTo(standaloneLink.Lemma),
            "Lemma should match between CAP-001 and CAP-002 output"
        );
        Assert.That(
            embeddedLink.BaseFormIndex,
            Is.EqualTo(standaloneLink.BaseFormIndex),
            "BaseFormIndex should match between CAP-001 and CAP-002 output"
        );
        Assert.That(
            embeddedLink.MeaningIndex,
            Is.EqualTo(standaloneLink.MeaningIndex),
            "MeaningIndex should match between CAP-001 and CAP-002 output"
        );
    }

    // =========================================================================
    // CROSS-TESTAMENT: Book number determines dictionary for POS translation
    // =========================================================================

    /// <summary>
    /// Integration: Book-to-dictionary mapping (CAP-001/INV-013) determines which
    /// POS format CAP-008 uses. OT books use SDBH (character codes), NT books use
    /// SDBG (hyphen-separated).
    ///
    /// This tests the cross-capability contract: the dictionary determined by
    /// the book number feeds into POS translation format selection.
    /// </summary>
    [Test]
    [Property("IntegrationChain", "CAP-001 -> CAP-008")]
    [Property("CapabilityId", "CAP-001,CAP-008")]
    [Property("ScenarioId", "TS-066,TS-067,TS-055,TS-056")]
    [Property("BehaviorId", "BHV-302,BHV-610")]
    [Property("InvariantId", "INV-013")]
    [Description(
        "Book-to-dictionary mapping (INV-013) determines POS translation format (SDBH vs SDBG)"
    )]
    public async Task BookToDictionaryToPOS_OTvsNT_CorrectPOSFormatUsed()
    {
        // Arrange: Get dictionary for OT book (CAP-001 helper / INV-013)
        string otDictionary = LexiconService.GetDictionaryForBook(1); // Genesis -> SDBH
        string ntDictionary = LexiconService.GetDictionaryForBook(40); // Matthew -> SDBG

        Assert.That(otDictionary, Is.EqualTo("SDBH"), "INV-013: OT -> SDBH");
        Assert.That(ntDictionary, Is.EqualTo("SDBG"), "INV-013: NT -> SDBG");

        // Act: CAP-008 - Translate Hebrew POS tag using OT dictionary
        var hebrewResult = await PosTranslationService.TranslatePartOfSpeechAsync(
            new PosTranslationInput(otDictionary, "nspmaH", ShortFormat: false),
            CancellationToken.None
        );

        // Act: CAP-008 - Translate Greek POS tag using NT dictionary
        var greekResult = await PosTranslationService.TranslatePartOfSpeechAsync(
            new PosTranslationInput(ntDictionary, "noun-dans", ShortFormat: false),
            CancellationToken.None
        );

        // Assert: Both translations succeed with correct format-specific output
        Assert.That(hebrewResult.Success, Is.True, "Hebrew POS translation should succeed");
        Assert.That(
            hebrewResult.Translation,
            Is.EqualTo("noun masculine plural absolute"),
            "Hebrew character-code POS should translate to full grammatical description"
        );

        Assert.That(greekResult.Success, Is.True, "Greek POS translation should succeed");
        Assert.That(
            greekResult.Translation,
            Is.EqualTo("noun declinable accusative neuter singular"),
            "Greek hyphen-separated POS should translate to full grammatical description"
        );

        // Verify the two POS formats produce different translations (they ARE different formats)
        Assert.That(
            hebrewResult.Translation,
            Is.Not.EqualTo(greekResult.Translation),
            "Hebrew and Greek POS translations should differ (different tag systems)"
        );
    }
}

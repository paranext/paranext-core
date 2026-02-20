using Paranext.DataProvider.EnhancedResources;

namespace TestParanextDataProvider.EnhancedResources;

/// <summary>
/// Tests for CAP-005: ParseLexicalLinks.
/// Validates parsing of "Dictionary:Lemma:BBBMMM" format link strings into structured
/// ParsedLexicalLink objects, MatchesFilter behavior (exact vs partial matching based
/// on FilterOrigin), IsAnyLemmaInLinks helper, and GetLemmaString.
///
/// PT9 Source: Paratext/Marble/MarbleLexicalLink.cs:1-119
/// Golden Master: gm-006-lexical-link-parsing
/// Extraction: EXT-009
/// </summary>
[TestFixture]
public class LexicalLinkServiceTests
{
    #region Acceptance Test

    /// <summary>
    /// Outer acceptance test for CAP-005.
    /// Verifies all gm-006 golden master scenarios in a single comprehensive test.
    /// When this test passes, the capability is complete.
    ///
    /// Golden master scenarios:
    /// - LLP-01: Single link parsed correctly
    /// - LLP-02: Semicolon-separated multi-links parsed
    /// - LLP-03: ScripturePane exact match returns true
    /// - LLP-04: DictionaryTab partial match returns true
    /// - LLP-05: ScripturePane non-match returns false
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-005")]
    [Property("GoldenMasterId", "gm-006")]
    [Description(
        "Acceptance test: Lexical link strings parsed into structured link objects"
    )]
    public void ParseLexicalLinks_AllGoldenMasterScenarios_Pass()
    {
        Assert.Multiple(() =>
        {
            // LLP-01: Single link "SDBG:logos:001001" parsed correctly
            var links01 = LexicalLinkService.ParseLexicalLinks("SDBG:logos:001001");
            Assert.That(links01, Has.Count.EqualTo(1), "LLP-01: Single link should produce 1 result");
            Assert.That(
                links01[0].Dictionary,
                Is.EqualTo("SDBG"),
                "LLP-01: Dictionary must be SDBG"
            );
            Assert.That(
                links01[0].Lemma,
                Is.EqualTo("logos"),
                "LLP-01: Lemma must be logos"
            );
            Assert.That(
                links01[0].BaseFormIndex,
                Is.EqualTo("001"),
                "LLP-01: BaseFormIndex must be 001"
            );
            Assert.That(
                links01[0].MeaningIndex,
                Is.EqualTo("001"),
                "LLP-01: MeaningIndex must be 001"
            );

            // LLP-02: Semicolon-separated links produce 2 results
            var links02 = LexicalLinkService.ParseLexicalLinks(
                "SDBG:logos:001001;SDBG:logos:001002"
            );
            Assert.That(
                links02,
                Has.Count.EqualTo(2),
                "LLP-02: Semicolon-separated should produce 2 results"
            );

            // LLP-03: ScripturePane exact match
            var filterLink03 = LexicalLinkService.ParseLexicalLinks("SDBG:logos:001001");
            var tokenLink03 = LexicalLinkService.ParseLexicalLinks("SDBG:logos:001001");
            Assert.That(
                tokenLink03[0].MatchesFilter(filterLink03[0], FilterOrigin.ScripturePane),
                Is.True,
                "LLP-03: ScripturePane exact match must return true"
            );

            // LLP-04: DictionaryTab partial match (base form only, ignoring meaning)
            var filterLink04 = LexicalLinkService.ParseLexicalLinks("SDBG:logos:001");
            var tokenLink04 = LexicalLinkService.ParseLexicalLinks("SDBG:logos:001001");
            Assert.That(
                tokenLink04[0].MatchesFilter(filterLink04[0], FilterOrigin.DictionaryTab),
                Is.True,
                "LLP-04: DictionaryTab partial match must return true"
            );

            // LLP-05: ScripturePane non-match (different meaning)
            var filterLink05 = LexicalLinkService.ParseLexicalLinks("SDBG:logos:001001");
            var tokenLink05 = LexicalLinkService.ParseLexicalLinks("SDBG:logos:001002");
            Assert.That(
                tokenLink05[0].MatchesFilter(filterLink05[0], FilterOrigin.ScripturePane),
                Is.False,
                "LLP-05: ScripturePane with different meaning must return false"
            );
        });
    }

    #endregion

    #region Contract Tests - ParseLexicalLinks Happy Path

    /// <summary>
    /// TS-134: Parse a single SDBG (Greek) link in Dictionary:Lemma:BBBMMM format.
    /// Verifies all four parsed fields: Dictionary, Lemma, BaseFormIndex, MeaningIndex.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-134")]
    [Property("BehaviorId", "BHV-600")]
    [Property("GoldenMasterId", "gm-006")]
    [Description("Parse single SDBG link into structured components")]
    public void ParseLexicalLinks_SingleSdbgLink_ParsedCorrectly()
    {
        // Arrange
        const string rawLink = "SDBG:logos:001001";

        // Act
        var result = LexicalLinkService.ParseLexicalLinks(rawLink);

        // Assert
        Assert.That(result, Has.Count.EqualTo(1));
        var link = result[0];
        Assert.Multiple(() =>
        {
            Assert.That(link.Dictionary, Is.EqualTo("SDBG"));
            Assert.That(link.Lemma, Is.EqualTo("logos"));
            Assert.That(link.BaseFormIndex, Is.EqualTo("001"));
            Assert.That(link.MeaningIndex, Is.EqualTo("001"));
        });
    }

    /// <summary>
    /// TS-134: Parse a single SDBH (Hebrew) link.
    /// Verifies that Hebrew dictionary links are parsed identically to Greek.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-134")]
    [Property("BehaviorId", "BHV-600")]
    [Description("Parse single SDBH link into structured components")]
    public void ParseLexicalLinks_SingleSdbhLink_ParsedCorrectly()
    {
        // Arrange
        const string rawLink = "SDBH:dabar:002003";

        // Act
        var result = LexicalLinkService.ParseLexicalLinks(rawLink);

        // Assert
        Assert.That(result, Has.Count.EqualTo(1));
        var link = result[0];
        Assert.Multiple(() =>
        {
            Assert.That(link.Dictionary, Is.EqualTo("SDBH"));
            Assert.That(link.Lemma, Is.EqualTo("dabar"));
            Assert.That(link.BaseFormIndex, Is.EqualTo("002"));
            Assert.That(link.MeaningIndex, Is.EqualTo("003"));
        });
    }

    /// <summary>
    /// TS-135: Parse semicolon-separated multiple links.
    /// A single word token can link to multiple dictionary entries.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-135")]
    [Property("BehaviorId", "BHV-600")]
    [Property("GoldenMasterId", "gm-006")]
    [Description("Parse semicolon-separated multi-links into correct count")]
    public void ParseLexicalLinks_SemicolonSeparated_ParsesBothLinks()
    {
        // Arrange
        const string rawLink = "SDBG:logos:001001;SDBG:logos:001002";

        // Act
        var result = LexicalLinkService.ParseLexicalLinks(rawLink);

        // Assert
        Assert.That(result, Has.Count.EqualTo(2));
        Assert.Multiple(() =>
        {
            Assert.That(result[0].Lemma, Is.EqualTo("logos"));
            Assert.That(result[0].MeaningIndex, Is.EqualTo("001"));
            Assert.That(result[1].Lemma, Is.EqualTo("logos"));
            Assert.That(result[1].MeaningIndex, Is.EqualTo("002"));
        });
    }

    /// <summary>
    /// TS-135: Parse mixed dictionary links (SDBG + SDBH in same string).
    /// Covers the case where a word has links to both Greek and Hebrew dictionaries.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-135")]
    [Property("BehaviorId", "BHV-600")]
    [Description("Parse mixed SDBG and SDBH links from single string")]
    public void ParseLexicalLinks_MixedDictionaries_ParsesBothCorrectly()
    {
        // Arrange
        const string rawLink = "SDBG:logos:001001;SDBH:dabar:002003";

        // Act
        var result = LexicalLinkService.ParseLexicalLinks(rawLink);

        // Assert
        Assert.That(result, Has.Count.EqualTo(2));
        Assert.Multiple(() =>
        {
            Assert.That(result[0].Dictionary, Is.EqualTo("SDBG"));
            Assert.That(result[0].Lemma, Is.EqualTo("logos"));
            Assert.That(result[1].Dictionary, Is.EqualTo("SDBH"));
            Assert.That(result[1].Lemma, Is.EqualTo("dabar"));
        });
    }

    /// <summary>
    /// TS-134: Verify FullLink property preserves the original link string.
    /// Used by MatchesFilter for exact matching in ScripturePane mode.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-134")]
    [Property("BehaviorId", "BHV-600")]
    [Description("FullLink property preserves original link string")]
    public void ParseLexicalLinks_SingleLink_FullLinkPreservesOriginal()
    {
        // Arrange
        const string rawLink = "SDBG:logos:001001";

        // Act
        var result = LexicalLinkService.ParseLexicalLinks(rawLink);

        // Assert
        Assert.That(result[0].FullLink, Is.EqualTo("SDBG:logos:001001"));
    }

    /// <summary>
    /// TS-134: Verify BBBMMM format: base form index is 3-digit padded.
    /// The 6-character suffix "001001" splits as BBB=001, MMM=001.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-134")]
    [Property("BehaviorId", "BHV-600")]
    [Description("BBBMMM: 3-digit base form index preserved from 6-char suffix")]
    public void ParseLexicalLinks_BbbMmmFormat_BaseFormIndexIs3Digits()
    {
        // Arrange -- "123456" suffix: BBB=123, MMM=456
        const string rawLink = "SDBG:test:123456";

        // Act
        var result = LexicalLinkService.ParseLexicalLinks(rawLink);

        // Assert
        Assert.That(result, Has.Count.EqualTo(1));
        Assert.That(result[0].BaseFormIndex, Is.EqualTo("123"));
    }

    /// <summary>
    /// TS-134: Verify BBBMMM format: meaning index is 3-digit padded.
    /// The 6-character suffix "123456" splits as BBB=123, MMM=456.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-134")]
    [Property("BehaviorId", "BHV-600")]
    [Description("BBBMMM: 3-digit meaning index preserved from 6-char suffix")]
    public void ParseLexicalLinks_BbbMmmFormat_MeaningIndexIs3Digits()
    {
        // Arrange -- "123456" suffix: BBB=123, MMM=456
        const string rawLink = "SDBG:test:123456";

        // Act
        var result = LexicalLinkService.ParseLexicalLinks(rawLink);

        // Assert
        Assert.That(result, Has.Count.EqualTo(1));
        Assert.That(result[0].MeaningIndex, Is.EqualTo("456"));
    }

    #endregion

    #region Contract Tests - ParseLexicalLinks Error Cases

    /// <summary>
    /// TS-134: Empty string returns empty list (graceful degradation).
    /// Per data-contracts.md: "invalid format returns empty list".
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-134")]
    [Property("BehaviorId", "BHV-600")]
    [Description("Empty string input returns empty parsed list")]
    public void ParseLexicalLinks_EmptyString_ReturnsEmptyList()
    {
        // Arrange
        const string rawLink = "";

        // Act
        var result = LexicalLinkService.ParseLexicalLinks(rawLink);

        // Assert
        Assert.That(result, Is.Empty);
    }

    /// <summary>
    /// TS-134: Null string returns empty list (graceful degradation).
    /// Per data-contracts.md: "Accepts any string (invalid format returns empty list)".
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-134")]
    [Property("BehaviorId", "BHV-600")]
    [Description("Null string input returns empty parsed list")]
    public void ParseLexicalLinks_NullString_ReturnsEmptyList()
    {
        // Act
        var result = LexicalLinkService.ParseLexicalLinks(null!);

        // Assert
        Assert.That(result, Is.Empty);
    }

    /// <summary>
    /// TS-134: Completely invalid format returns empty list.
    /// E.g., a random word with no colons is not a valid link.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-134")]
    [Property("BehaviorId", "BHV-600")]
    [Description("Invalid format string returns empty parsed list")]
    public void ParseLexicalLinks_InvalidFormat_ReturnsEmptyList()
    {
        // Arrange
        const string rawLink = "not-a-valid-link";

        // Act
        var result = LexicalLinkService.ParseLexicalLinks(rawLink);

        // Assert
        Assert.That(result, Is.Empty);
    }

    /// <summary>
    /// TS-134: String with only one colon (missing parts) returns empty list.
    /// "SDBG:logos" has no BBBMMM suffix.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-134")]
    [Property("BehaviorId", "BHV-600")]
    [Description("Link with missing BBBMMM suffix returns empty list")]
    public void ParseLexicalLinks_MissingBbbmmm_ReturnsEmptyList()
    {
        // Arrange
        const string rawLink = "SDBG:logos";

        // Act
        var result = LexicalLinkService.ParseLexicalLinks(rawLink);

        // Assert
        Assert.That(result, Is.Empty);
    }

    /// <summary>
    /// TS-135: Trailing semicolon should not produce an extra empty link.
    /// "SDBG:logos:001001;" should produce exactly 1 link, not 2.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-135")]
    [Property("BehaviorId", "BHV-600")]
    [Description("Trailing semicolon does not produce extra empty link")]
    public void ParseLexicalLinks_TrailingSemicolon_ProducesCorrectCount()
    {
        // Arrange
        const string rawLink = "SDBG:logos:001001;";

        // Act
        var result = LexicalLinkService.ParseLexicalLinks(rawLink);

        // Assert
        Assert.That(result, Has.Count.EqualTo(1));
    }

    /// <summary>
    /// TS-135: Mixed valid and invalid links: invalid entries are silently skipped.
    /// Per data-contracts.md: "Invalid entries are silently skipped."
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-135")]
    [Property("BehaviorId", "BHV-600")]
    [Description("Invalid links in semicolon-separated input are silently skipped")]
    public void ParseLexicalLinks_MixedValidInvalid_SkipsInvalidEntries()
    {
        // Arrange -- first link valid, second invalid (no BBBMMM), third valid
        const string rawLink = "SDBG:logos:001001;invalid;SDBH:dabar:002003";

        // Act
        var result = LexicalLinkService.ParseLexicalLinks(rawLink);

        // Assert -- only the 2 valid links returned
        Assert.That(result, Has.Count.EqualTo(2));
        Assert.Multiple(() =>
        {
            Assert.That(result[0].Dictionary, Is.EqualTo("SDBG"));
            Assert.That(result[1].Dictionary, Is.EqualTo("SDBH"));
        });
    }

    #endregion

    #region Contract Tests - MatchesFilter

    /// <summary>
    /// TS-136 / LLP-03: ScripturePane origin uses exact match on full link string.
    /// When the filter and token have identical full links, MatchesFilter returns true.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-136")]
    [Property("BehaviorId", "BHV-600")]
    [Property("GoldenMasterId", "gm-006")]
    [Description("ScripturePane: exact match on full link returns true")]
    public void MatchesFilter_ScripturePaneExactMatch_ReturnsTrue()
    {
        // Arrange
        var filterLinks = LexicalLinkService.ParseLexicalLinks("SDBG:logos:001001");
        var tokenLinks = LexicalLinkService.ParseLexicalLinks("SDBG:logos:001001");

        // Act
        bool matches = tokenLinks[0].MatchesFilter(
            filterLinks[0],
            FilterOrigin.ScripturePane
        );

        // Assert
        Assert.That(matches, Is.True, "Exact link match in ScripturePane should return true");
    }

    /// <summary>
    /// TS-136 / LLP-05: ScripturePane requires exact match.
    /// Different meaning number means no match in ScripturePane mode.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-136")]
    [Property("BehaviorId", "BHV-600")]
    [Property("GoldenMasterId", "gm-006")]
    [Description("ScripturePane: different meaning number returns false")]
    public void MatchesFilter_ScripturePaneDifferentMeaning_ReturnsFalse()
    {
        // Arrange
        var filterLinks = LexicalLinkService.ParseLexicalLinks("SDBG:logos:001001");
        var tokenLinks = LexicalLinkService.ParseLexicalLinks("SDBG:logos:001002");

        // Act
        bool matches = tokenLinks[0].MatchesFilter(
            filterLinks[0],
            FilterOrigin.ScripturePane
        );

        // Assert
        Assert.That(
            matches,
            Is.False,
            "Different meaning in ScripturePane should return false"
        );
    }

    /// <summary>
    /// TS-137 / LLP-04: DictionaryTab origin uses partial match (base form only).
    /// When filter has base form only (3 digits), it matches any meaning in that base form.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-137")]
    [Property("BehaviorId", "BHV-600")]
    [Property("GoldenMasterId", "gm-006")]
    [Description("DictionaryTab: partial match on base form returns true")]
    public void MatchesFilter_DictionaryTabPartialMatch_ReturnsTrue()
    {
        // Arrange -- filter has shorter link (no meaning index)
        var filterLinks = LexicalLinkService.ParseLexicalLinks("SDBG:logos:001");
        var tokenLinks = LexicalLinkService.ParseLexicalLinks("SDBG:logos:001001");

        // Act
        bool matches = tokenLinks[0].MatchesFilter(
            filterLinks[0],
            FilterOrigin.DictionaryTab
        );

        // Assert
        Assert.That(
            matches,
            Is.True,
            "DictionaryTab partial match should return true (base form match, ignoring meaning)"
        );
    }

    /// <summary>
    /// TS-137: DictionaryTab partial match fails for different lemma.
    /// Even in partial mode, the lemma must match.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-137")]
    [Property("BehaviorId", "BHV-600")]
    [Description("DictionaryTab: different lemma returns false")]
    public void MatchesFilter_DictionaryTabDifferentLemma_ReturnsFalse()
    {
        // Arrange
        var filterLinks = LexicalLinkService.ParseLexicalLinks("SDBG:logos:001001");
        var tokenLinks = LexicalLinkService.ParseLexicalLinks("SDBG:theos:002001");

        // Act
        bool matches = tokenLinks[0].MatchesFilter(
            filterLinks[0],
            FilterOrigin.DictionaryTab
        );

        // Assert
        Assert.That(
            matches,
            Is.False,
            "Different lemma should return false even in DictionaryTab mode"
        );
    }

    /// <summary>
    /// TS-136: Different dictionary should not match even with same lemma/index.
    /// SDBG and SDBH links with same lemma are different entries.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-136")]
    [Property("BehaviorId", "BHV-600")]
    [Description("Different dictionary with same lemma returns false")]
    public void MatchesFilter_DifferentDictionary_ReturnsFalse()
    {
        // Arrange
        var filterLinks = LexicalLinkService.ParseLexicalLinks("SDBG:logos:001001");
        var tokenLinks = LexicalLinkService.ParseLexicalLinks("SDBH:logos:001001");

        // Act
        bool matches = tokenLinks[0].MatchesFilter(
            filterLinks[0],
            FilterOrigin.ScripturePane
        );

        // Assert
        Assert.That(
            matches,
            Is.False,
            "Different dictionary should not match"
        );
    }

    /// <summary>
    /// TS-136: ScripturePane exact match also succeeds when both links
    /// are from the same SDBH (Hebrew) dictionary.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-136")]
    [Property("BehaviorId", "BHV-600")]
    [Description("ScripturePane: SDBH exact match also returns true")]
    public void MatchesFilter_ScripturePaneSdbhExactMatch_ReturnsTrue()
    {
        // Arrange
        var filterLinks = LexicalLinkService.ParseLexicalLinks("SDBH:dabar:002003");
        var tokenLinks = LexicalLinkService.ParseLexicalLinks("SDBH:dabar:002003");

        // Act
        bool matches = tokenLinks[0].MatchesFilter(
            filterLinks[0],
            FilterOrigin.ScripturePane
        );

        // Assert
        Assert.That(matches, Is.True);
    }

    #endregion

    #region Contract Tests - IsAnyLemmaInLinks

    /// <summary>
    /// TS-135: IsAnyLemmaInLinks returns true when the lemma is present in the link string.
    /// Used for checking term membership in a token's lexical links.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-135")]
    [Property("BehaviorId", "BHV-600")]
    [Description("IsAnyLemmaInLinks returns true when lemma is present")]
    public void IsAnyLemmaInLinks_LemmaPresent_ReturnsTrue()
    {
        // Arrange
        const string lemma = "logos";
        const string links = "SDBG:logos:001001;SDBG:theos:002001";

        // Act
        bool result = LexicalLinkService.IsAnyLemmaInLinks(lemma, links);

        // Assert
        Assert.That(result, Is.True, "Lemma 'logos' should be found in links");
    }

    /// <summary>
    /// TS-135: IsAnyLemmaInLinks returns false when lemma is not in links.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-135")]
    [Property("BehaviorId", "BHV-600")]
    [Description("IsAnyLemmaInLinks returns false when lemma is absent")]
    public void IsAnyLemmaInLinks_LemmaAbsent_ReturnsFalse()
    {
        // Arrange
        const string lemma = "pneuma";
        const string links = "SDBG:logos:001001;SDBG:theos:002001";

        // Act
        bool result = LexicalLinkService.IsAnyLemmaInLinks(lemma, links);

        // Assert
        Assert.That(result, Is.False, "Lemma 'pneuma' should not be found in links");
    }

    /// <summary>
    /// TS-135: IsAnyLemmaInLinks returns false for empty link string.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-135")]
    [Property("BehaviorId", "BHV-600")]
    [Description("IsAnyLemmaInLinks returns false for empty links")]
    public void IsAnyLemmaInLinks_EmptyLinks_ReturnsFalse()
    {
        // Arrange
        const string lemma = "logos";
        const string links = "";

        // Act
        bool result = LexicalLinkService.IsAnyLemmaInLinks(lemma, links);

        // Assert
        Assert.That(result, Is.False);
    }

    /// <summary>
    /// TS-135: IsAnyLemmaInLinks returns false for null link string.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-135")]
    [Property("BehaviorId", "BHV-600")]
    [Description("IsAnyLemmaInLinks returns false for null links")]
    public void IsAnyLemmaInLinks_NullLinks_ReturnsFalse()
    {
        // Arrange
        const string lemma = "logos";

        // Act
        bool result = LexicalLinkService.IsAnyLemmaInLinks(lemma, null!);

        // Assert
        Assert.That(result, Is.False);
    }

    #endregion

    #region Contract Tests - GetLemmaString

    /// <summary>
    /// TS-134: GetLemmaString returns the lemma from a parsed link.
    /// Used for display in the UI (e.g., tooltip, dictionary tab heading).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-134")]
    [Property("BehaviorId", "BHV-600")]
    [Description("GetLemmaString returns expected lemma from parsed link")]
    public void GetLemmaString_ParsedLink_ReturnsLemma()
    {
        // Arrange
        var links = LexicalLinkService.ParseLexicalLinks("SDBG:logos:001001");

        // Act
        string lemmaString = links[0].GetLemmaString();

        // Assert
        Assert.That(lemmaString, Is.EqualTo("logos"));
    }

    /// <summary>
    /// TS-134: GetLemmaString for Hebrew link returns Hebrew lemma.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-134")]
    [Property("BehaviorId", "BHV-600")]
    [Description("GetLemmaString returns Hebrew lemma from parsed SDBH link")]
    public void GetLemmaString_SdbhLink_ReturnsHebrewLemma()
    {
        // Arrange
        var links = LexicalLinkService.ParseLexicalLinks("SDBH:dabar:002003");

        // Act
        string lemmaString = links[0].GetLemmaString();

        // Assert
        Assert.That(lemmaString, Is.EqualTo("dabar"));
    }

    #endregion

    #region Golden Master Tests

    /// <summary>
    /// Golden master LLP-01: Single link "SDBG:logos:001001" parsed into structured object.
    /// Exact comparison against gm-006 expected output.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "gm-006")]
    [Property("GoldenMasterScenario", "LLP-01")]
    [Property("BehaviorId", "BHV-600")]
    [Description("GM LLP-01: Single SDBG link parsed with all fields correct")]
    public void GoldenMaster_LLP01_SingleLinkParsedCorrectly()
    {
        // Arrange (from gm-006 input.json LLP-01)
        const string rawLink = "SDBG:logos:001001";

        // Act
        var result = LexicalLinkService.ParseLexicalLinks(rawLink);

        // Assert (from gm-006 expected-output.json LLP-01)
        Assert.That(result, Has.Count.EqualTo(1), "LLP-01: linkCount must be 1");
        Assert.Multiple(() =>
        {
            Assert.That(result[0].Dictionary, Is.EqualTo("SDBG"));
            Assert.That(result[0].Lemma, Is.EqualTo("logos"));
            Assert.That(result[0].BaseFormIndex, Is.EqualTo("001"));
            Assert.That(result[0].MeaningIndex, Is.EqualTo("001"));
        });
    }

    /// <summary>
    /// Golden master LLP-02: Semicolon-separated links produce correct count.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "gm-006")]
    [Property("GoldenMasterScenario", "LLP-02")]
    [Property("BehaviorId", "BHV-600")]
    [Description("GM LLP-02: Semicolon-separated links parsed into list of 2")]
    public void GoldenMaster_LLP02_MultiLinkCountCorrect()
    {
        // Arrange (from gm-006 input.json LLP-02)
        const string rawLink = "SDBG:logos:001001;SDBG:logos:001002";

        // Act
        var result = LexicalLinkService.ParseLexicalLinks(rawLink);

        // Assert (from gm-006 expected-output.json LLP-02)
        Assert.That(result, Has.Count.EqualTo(2), "LLP-02: linkCount must be 2");
    }

    /// <summary>
    /// Golden master LLP-03: ScripturePane exact match returns true.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "gm-006")]
    [Property("GoldenMasterScenario", "LLP-03")]
    [Property("BehaviorId", "BHV-600")]
    [Description("GM LLP-03: ScripturePane exact match returns true")]
    public void GoldenMaster_LLP03_ScripturePaneExactMatch()
    {
        // Arrange (from gm-006 input.json LLP-03)
        var filterLinks = LexicalLinkService.ParseLexicalLinks("SDBG:logos:001001");
        var tokenLinks = LexicalLinkService.ParseLexicalLinks("SDBG:logos:001001");

        // Act
        bool matches = tokenLinks[0].MatchesFilter(
            filterLinks[0],
            FilterOrigin.ScripturePane
        );

        // Assert (from gm-006 expected-output.json LLP-03)
        Assert.That(matches, Is.True, "LLP-03: ScripturePane exact match must be true");
    }

    /// <summary>
    /// Golden master LLP-04: DictionaryTab partial match returns true.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "gm-006")]
    [Property("GoldenMasterScenario", "LLP-04")]
    [Property("BehaviorId", "BHV-600")]
    [Description("GM LLP-04: DictionaryTab partial match returns true")]
    public void GoldenMaster_LLP04_DictionaryTabPartialMatch()
    {
        // Arrange (from gm-006 input.json LLP-04)
        var filterLinks = LexicalLinkService.ParseLexicalLinks("SDBG:logos:001");
        var tokenLinks = LexicalLinkService.ParseLexicalLinks("SDBG:logos:001001");

        // Act
        bool matches = tokenLinks[0].MatchesFilter(
            filterLinks[0],
            FilterOrigin.DictionaryTab
        );

        // Assert (from gm-006 expected-output.json LLP-04)
        Assert.That(matches, Is.True, "LLP-04: DictionaryTab partial match must be true");
    }

    /// <summary>
    /// Golden master LLP-05: ScripturePane non-match (different meaning) returns false.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "gm-006")]
    [Property("GoldenMasterScenario", "LLP-05")]
    [Property("BehaviorId", "BHV-600")]
    [Description("GM LLP-05: ScripturePane different meaning returns false")]
    public void GoldenMaster_LLP05_ScripturePaneNonMatch()
    {
        // Arrange (from gm-006 input.json LLP-05)
        var filterLinks = LexicalLinkService.ParseLexicalLinks("SDBG:logos:001001");
        var tokenLinks = LexicalLinkService.ParseLexicalLinks("SDBG:logos:001002");

        // Act
        bool matches = tokenLinks[0].MatchesFilter(
            filterLinks[0],
            FilterOrigin.ScripturePane
        );

        // Assert (from gm-006 expected-output.json LLP-05)
        Assert.That(
            matches,
            Is.False,
            "LLP-05: ScripturePane different meaning must be false"
        );
    }

    #endregion

    #region Edge Case Tests

    /// <summary>
    /// Edge case: Parse a link with only dictionary and lemma parts (2 colons but
    /// the BBBMMM portion is shorter than 6 characters). Should handle gracefully.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-134")]
    [Property("BehaviorId", "BHV-600")]
    [Description("Link with short BBBMMM (less than 6 chars) handled gracefully")]
    public void ParseLexicalLinks_ShortBbbmmm_HandledGracefully()
    {
        // Arrange -- "001" is only 3 chars, not 6 (may be DictionaryTab partial link)
        const string rawLink = "SDBG:logos:001";

        // Act
        var result = LexicalLinkService.ParseLexicalLinks(rawLink);

        // Assert -- should still parse (at least dictionary and lemma)
        // The BBBMMM split may give "001" for base form and "" for meaning
        // or the entire "001" as base form. Implementation determines exact behavior.
        // The key requirement: no exception thrown, result is usable.
        Assert.That(result, Is.Not.Null, "Should not throw; returns a list (possibly empty)");
    }

    /// <summary>
    /// Edge case: Multiple semicolons in a row should not produce extra entries.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-135")]
    [Property("BehaviorId", "BHV-600")]
    [Description("Multiple consecutive semicolons do not produce extra entries")]
    public void ParseLexicalLinks_ConsecutiveSemicolons_NoExtraEntries()
    {
        // Arrange
        const string rawLink = "SDBG:logos:001001;;SDBH:dabar:002003";

        // Act
        var result = LexicalLinkService.ParseLexicalLinks(rawLink);

        // Assert -- exactly 2 valid links, empty entry between semicolons skipped
        Assert.That(result, Has.Count.EqualTo(2));
    }

    /// <summary>
    /// Edge case: Whitespace-only string returns empty list.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-134")]
    [Property("BehaviorId", "BHV-600")]
    [Description("Whitespace-only string returns empty list")]
    public void ParseLexicalLinks_WhitespaceOnly_ReturnsEmptyList()
    {
        // Arrange
        const string rawLink = "   ";

        // Act
        var result = LexicalLinkService.ParseLexicalLinks(rawLink);

        // Assert
        Assert.That(result, Is.Empty);
    }

    #endregion
}

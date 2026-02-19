using Paranext.DataProvider.EnhancedResources;

namespace TestParanextDataProvider.EnhancedResources;

/// <summary>
/// Tests for CAP-014: ProcessDictionaryMarkup.
/// Validates conversion of 8+ dictionary markup patterns to HTML.
/// The function processes curly-brace patterns ({A:}, {L:}, {D:}, {N:}, {S:})
/// for structured references and pipe-delimited patterns (|i, |b, |u) for
/// text formatting. Patterns are replaced via regex in a fixed processing order.
///
/// PT9 Source: Paratext/Marble/DictionaryTab.cs:1185-1275
/// Golden Master: gm-008-dictionary-markup
/// Extraction: EXT-056
///
/// Contract signature (data-contracts.md Method 14):
///   public string ProcessDictionaryMarkup(string rawMarkup, string dictionary)
///
/// Markup patterns:
///   {A:text}     - Author reference (styled HTML span)
///   {L:dict:lemma:sense} - Lexical cross-reference (clickable link, displaylemma: URL)
///   {D:text}     - Domain reference (styled HTML, displaycat: URL)
///   {N:number}   - Note reference (superscript note number)
///   {S:BBBCCCVVV} - Scripture reference (versification-aware verse link via FormatBCVRefs)
///   |itext|i     - Italic formatting (&lt;i&gt; tag)
///   |btext|b     - Bold formatting (&lt;b&gt; tag)
///   |utext|u     - Underline formatting (&lt;u&gt; tag)
///
/// Processing order is fixed: curly-brace patterns first, then pipe-delimited.
/// Unrecognized patterns pass through unchanged (no error condition).
/// </summary>
[TestFixture]
public class DictionaryMarkupProcessorTests
{
    #region Acceptance Test

    /// <summary>
    /// Outer acceptance test for CAP-014.
    /// Verifies all gm-008 golden master scenarios in a single comprehensive test.
    /// When this test passes, the capability is complete.
    ///
    /// Golden master scenarios:
    /// - DMP-01: {A:} author reference -> author-styled HTML
    /// - DMP-02: {L:} lexical link -> clickable displaylemma: link
    /// - DMP-03: {D:} domain reference -> domain-styled HTML
    /// - DMP-04: {N:} note reference -> superscript note number
    /// - DMP-05: {S:} scripture reference -> versification-aware verse link
    /// - DMP-06: |i...|i -> &lt;i&gt; tag
    /// - DMP-07: |b...|b -> &lt;b&gt; tag
    /// - DMP-08: |u...|u -> &lt;u&gt; tag
    /// - DMP-09: Mixed markup -> all patterns replaced in single string
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-014")]
    [Property("GoldenMasterId", "gm-008")]
    [Property("BehaviorId", "BHV-413")]
    [Property("ScenarioId", "TS-143")]
    [Description(
        "Acceptance test: Dictionary markup patterns converted to HTML"
    )]
    public void ProcessDictionaryMarkup_AllGoldenMasterScenarios_Pass()
    {
        Assert.Multiple(() =>
        {
            // DMP-01: Author reference
            var result01 = DictionaryMarkupProcessor.ProcessDictionaryMarkup(
                "{A:Louw and Nida}",
                "SDBG"
            );
            Assert.That(
                result01,
                Does.Not.Contain("{A:"),
                "DMP-01: {A:} pattern must be replaced"
            );
            Assert.That(
                result01,
                Does.Contain("Louw and Nida"),
                "DMP-01: Author name must appear in output"
            );

            // DMP-02: Lexical cross-reference
            var result02 = DictionaryMarkupProcessor.ProcessDictionaryMarkup(
                "{L:SDBG:logos:001001}",
                "SDBG"
            );
            Assert.That(
                result02,
                Does.Not.Contain("{L:"),
                "DMP-02: {L:} pattern must be replaced"
            );
            Assert.That(
                result02,
                Does.Contain("displaylemma:"),
                "DMP-02: Lexical link must use displaylemma: URL scheme"
            );

            // DMP-03: Domain reference
            var result03 = DictionaryMarkupProcessor.ProcessDictionaryMarkup(
                "{D:domain text}",
                "SDBG"
            );
            Assert.That(
                result03,
                Does.Not.Contain("{D:"),
                "DMP-03: {D:} pattern must be replaced"
            );

            // DMP-04: Note reference
            var result04 = DictionaryMarkupProcessor.ProcessDictionaryMarkup(
                "{N:1}",
                "SDBG"
            );
            Assert.That(
                result04,
                Does.Not.Contain("{N:"),
                "DMP-04: {N:} pattern must be replaced"
            );
            Assert.That(
                result04,
                Does.Contain("1"),
                "DMP-04: Note number must appear in output"
            );

            // DMP-05: Scripture reference
            var result05 = DictionaryMarkupProcessor.ProcessDictionaryMarkup(
                "{S:001001001}",
                "SDBG"
            );
            Assert.That(
                result05,
                Does.Not.Contain("{S:"),
                "DMP-05: {S:} pattern must be replaced"
            );

            // DMP-06: Italic
            var result06 = DictionaryMarkupProcessor.ProcessDictionaryMarkup(
                "|iitalic text|i",
                "SDBG"
            );
            Assert.That(
                result06,
                Is.EqualTo("<i>italic text</i>"),
                "DMP-06: |i...|i must become <i>...</i>"
            );

            // DMP-07: Bold
            var result07 = DictionaryMarkupProcessor.ProcessDictionaryMarkup(
                "|bbold text|b",
                "SDBG"
            );
            Assert.That(
                result07,
                Is.EqualTo("<b>bold text</b>"),
                "DMP-07: |b...|b must become <b>...</b>"
            );

            // DMP-08: Underline
            var result08 = DictionaryMarkupProcessor.ProcessDictionaryMarkup(
                "|uunderlined text|u",
                "SDBG"
            );
            Assert.That(
                result08,
                Is.EqualTo("<u>underlined text</u>"),
                "DMP-08: |u...|u must become <u>...</u>"
            );

            // DMP-09: Mixed markup with multiple patterns
            var result09 = DictionaryMarkupProcessor.ProcessDictionaryMarkup(
                "Plain text with {A:Author} and {S:001002003} mixed",
                "SDBG"
            );
            Assert.That(
                result09,
                Does.Not.Contain("{A:"),
                "DMP-09: {A:} pattern must be replaced in mixed content"
            );
            Assert.That(
                result09,
                Does.Not.Contain("{S:"),
                "DMP-09: {S:} pattern must be replaced in mixed content"
            );
            Assert.That(
                result09,
                Does.Contain("Plain text with"),
                "DMP-09: Surrounding text must be preserved"
            );
            Assert.That(
                result09,
                Does.Contain("mixed"),
                "DMP-09: Trailing text must be preserved"
            );
        });
    }

    #endregion

    #region Author Reference ({A:}) Tests

    /// <summary>
    /// Tests that {A:Author Name} produces HTML containing the author name
    /// in an appropriately styled element.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("GoldenMasterId", "gm-008")]
    [Property("BehaviorId", "BHV-413")]
    [Property("ScenarioId", "TS-143")]
    [Description("DMP-01: {A:} author reference replaced with author-styled HTML")]
    public void ProcessDictionaryMarkup_AuthorReference_ProducesAuthorHtml()
    {
        var result = DictionaryMarkupProcessor.ProcessDictionaryMarkup(
            "{A:Louw and Nida}",
            "SDBG"
        );

        Assert.That(result, Does.Not.Contain("{A:"), "Raw {A:} pattern must not remain");
        Assert.That(
            result,
            Does.Not.Contain("}"),
            "Closing brace from {A:} must not remain"
        );
        Assert.That(
            result,
            Does.Contain("Louw and Nida"),
            "Author name must appear in output HTML"
        );
    }

    /// <summary>
    /// Tests that multiple {A:} patterns in the same string are all replaced.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("BehaviorId", "BHV-413")]
    [Property("ScenarioId", "TS-143")]
    [Description("Multiple {A:} patterns in one string are all processed")]
    public void ProcessDictionaryMarkup_MultipleAuthorRefs_AllReplaced()
    {
        var result = DictionaryMarkupProcessor.ProcessDictionaryMarkup(
            "{A:Author One} some text {A:Author Two}",
            "SDBG"
        );

        Assert.That(result, Does.Not.Contain("{A:"), "All {A:} patterns must be replaced");
        Assert.That(result, Does.Contain("Author One"), "First author must appear");
        Assert.That(result, Does.Contain("Author Two"), "Second author must appear");
    }

    #endregion

    #region Lexical Link ({L:}) Tests

    /// <summary>
    /// Tests that {L:SDBG:logos:001001} produces a clickable link with displaylemma: URL.
    /// PT9 generates links using the displaylemma: scheme for navigating to dictionary entries.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("GoldenMasterId", "gm-008")]
    [Property("BehaviorId", "BHV-413")]
    [Property("ScenarioId", "TS-144")]
    [Description("DMP-02: {L:} lexical link replaced with clickable displaylemma: link")]
    public void ProcessDictionaryMarkup_LexicalLink_ProducesClickableLink()
    {
        var result = DictionaryMarkupProcessor.ProcessDictionaryMarkup(
            "{L:SDBG:logos:001001}",
            "SDBG"
        );

        Assert.That(result, Does.Not.Contain("{L:"), "Raw {L:} pattern must not remain");
        Assert.That(
            result,
            Does.Contain("displaylemma:"),
            "Link must use displaylemma: URL scheme"
        );
        Assert.That(
            result,
            Does.Contain("<a "),
            "Lexical link must be an HTML anchor element"
        );
    }

    /// <summary>
    /// Tests that {L:} links for SDBH dictionary use the same displaylemma: scheme.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("BehaviorId", "BHV-413")]
    [Property("ScenarioId", "TS-144")]
    [Description("{L:} link for SDBH dictionary also uses displaylemma: scheme")]
    public void ProcessDictionaryMarkup_LexicalLinkSDBH_ProducesClickableLink()
    {
        var result = DictionaryMarkupProcessor.ProcessDictionaryMarkup(
            "{L:SDBH:dabar:001001}",
            "SDBH"
        );

        Assert.That(result, Does.Not.Contain("{L:"), "Raw {L:} pattern must not remain");
        Assert.That(
            result,
            Does.Contain("displaylemma:"),
            "SDBH link must also use displaylemma: URL scheme"
        );
        Assert.That(result, Does.Contain("<a "), "Must be an anchor element");
    }

    #endregion

    #region Domain Reference ({D:}) Tests

    /// <summary>
    /// Tests that {D:domain text} produces domain-styled HTML.
    /// PT9 uses the displaycat: URL scheme for domain references.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("GoldenMasterId", "gm-008")]
    [Property("BehaviorId", "BHV-413")]
    [Property("ScenarioId", "TS-143")]
    [Description("DMP-03: {D:} domain reference replaced with domain-styled HTML")]
    public void ProcessDictionaryMarkup_DomainReference_ProducesDomainHtml()
    {
        var result = DictionaryMarkupProcessor.ProcessDictionaryMarkup(
            "{D:Communication}",
            "SDBG"
        );

        Assert.That(result, Does.Not.Contain("{D:"), "Raw {D:} pattern must not remain");
        Assert.That(
            result,
            Does.Contain("Communication"),
            "Domain text must appear in output"
        );
    }

    /// <summary>
    /// Tests that {D:} with displaycat: URL scheme produces a clickable link.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("BehaviorId", "BHV-413")]
    [Property("ScenarioId", "TS-143")]
    [Description("{D:} domain reference uses displaycat: URL scheme")]
    public void ProcessDictionaryMarkup_DomainReference_UsesDisplaycatScheme()
    {
        var result = DictionaryMarkupProcessor.ProcessDictionaryMarkup(
            "{D:33.A Communication}",
            "SDBG"
        );

        Assert.That(result, Does.Not.Contain("{D:"), "Raw {D:} pattern must not remain");
        Assert.That(
            result,
            Does.Contain("displaycat:"),
            "Domain link must use displaycat: URL scheme"
        );
    }

    #endregion

    #region Note Reference ({N:}) Tests

    /// <summary>
    /// Tests that {N:1} produces a superscript note number.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("GoldenMasterId", "gm-008")]
    [Property("BehaviorId", "BHV-413")]
    [Property("ScenarioId", "TS-143")]
    [Description("DMP-04: {N:} note reference replaced with superscript note number")]
    public void ProcessDictionaryMarkup_NoteReference_ProducesSuperscriptHtml()
    {
        var result = DictionaryMarkupProcessor.ProcessDictionaryMarkup(
            "{N:1}",
            "SDBG"
        );

        Assert.That(result, Does.Not.Contain("{N:"), "Raw {N:} pattern must not remain");
        Assert.That(result, Does.Contain("1"), "Note number must appear in output");
        Assert.That(
            result,
            Does.Contain("<sup>").Or.Contain("sup"),
            "Note reference must be superscript styled"
        );
    }

    /// <summary>
    /// Tests multi-digit note references (e.g., {N:12}).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("BehaviorId", "BHV-413")]
    [Property("ScenarioId", "TS-143")]
    [Description("Multi-digit note reference {N:12} works correctly")]
    public void ProcessDictionaryMarkup_MultiDigitNote_ProducesCorrectHtml()
    {
        var result = DictionaryMarkupProcessor.ProcessDictionaryMarkup(
            "{N:12}",
            "SDBG"
        );

        Assert.That(result, Does.Not.Contain("{N:"), "Raw {N:} pattern must not remain");
        Assert.That(result, Does.Contain("12"), "Multi-digit note number must appear");
    }

    #endregion

    #region Scripture Reference ({S:}) Tests

    /// <summary>
    /// Tests that {S:001001001} produces a versification-aware verse link.
    /// This uses FormatBCVRefs from CAP-030 (EncyclopediaContentService).
    /// 001001001 = Genesis 1:1.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("GoldenMasterId", "gm-008")]
    [Property("BehaviorId", "BHV-413")]
    [Property("ScenarioId", "TS-145")]
    [Description("DMP-05: {S:} scripture reference replaced with verse link")]
    public void ProcessDictionaryMarkup_ScriptureRef_ProducesVerseLink()
    {
        var result = DictionaryMarkupProcessor.ProcessDictionaryMarkup(
            "{S:001001001}",
            "SDBG"
        );

        Assert.That(result, Does.Not.Contain("{S:"), "Raw {S:} pattern must not remain");
        Assert.That(
            result,
            Does.Contain("goto:"),
            "Scripture link must use goto: URL scheme (from FormatBCVRefs)"
        );
        Assert.That(
            result,
            Does.Contain("1:1"),
            "Genesis 1:1 must appear as verse reference"
        );
    }

    /// <summary>
    /// Tests that multiple space-separated scripture references within a single {S:}
    /// pattern are all resolved.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("BehaviorId", "BHV-413")]
    [Property("ScenarioId", "TS-145")]
    [Description("Multiple BCV refs within {S:} are all resolved")]
    public void ProcessDictionaryMarkup_MultipleScriptureRefs_AllResolved()
    {
        var result = DictionaryMarkupProcessor.ProcessDictionaryMarkup(
            "{S:001001001 040001001}",
            "SDBG"
        );

        Assert.That(result, Does.Not.Contain("{S:"), "Raw {S:} pattern must not remain");
        Assert.That(
            result,
            Does.Contain("1:1"),
            "Genesis 1:1 reference must appear"
        );
    }

    /// <summary>
    /// Tests NT scripture reference: 040001001 = Matthew 1:1.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("BehaviorId", "BHV-413")]
    [Property("ScenarioId", "TS-145")]
    [Description("NT scripture reference 040001001 produces Matthew 1:1 link")]
    public void ProcessDictionaryMarkup_NtScriptureRef_ProducesCorrectLink()
    {
        var result = DictionaryMarkupProcessor.ProcessDictionaryMarkup(
            "{S:040001001}",
            "SDBG"
        );

        Assert.That(result, Does.Not.Contain("{S:"), "Raw {S:} pattern must not remain");
        Assert.That(
            result,
            Does.Contain("goto:"),
            "Must use goto: URL scheme"
        );
    }

    #endregion

    #region Italic Formatting (|i...|i) Tests

    /// <summary>
    /// Tests that |itext|i is converted to &lt;i&gt;text&lt;/i&gt;.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("GoldenMasterId", "gm-008")]
    [Property("BehaviorId", "BHV-413")]
    [Property("ScenarioId", "TS-146")]
    [Description("DMP-06: |i...|i replaced with <i>...</i>")]
    public void ProcessDictionaryMarkup_Italic_ProducesItalicHtml()
    {
        var result = DictionaryMarkupProcessor.ProcessDictionaryMarkup(
            "|iitalic text|i",
            "SDBG"
        );

        Assert.That(
            result,
            Is.EqualTo("<i>italic text</i>"),
            "|iitalic text|i must become <i>italic text</i>"
        );
    }

    /// <summary>
    /// Tests that multiple italic spans in one string are all converted.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("BehaviorId", "BHV-413")]
    [Property("ScenarioId", "TS-146")]
    [Description("Multiple |i...|i spans in one string are all converted")]
    public void ProcessDictionaryMarkup_MultipleItalic_AllConverted()
    {
        var result = DictionaryMarkupProcessor.ProcessDictionaryMarkup(
            "|ifirst|i and |isecond|i",
            "SDBG"
        );

        Assert.That(
            result,
            Is.EqualTo("<i>first</i> and <i>second</i>"),
            "Both italic spans must be converted"
        );
    }

    #endregion

    #region Bold Formatting (|b...|b) Tests

    /// <summary>
    /// Tests that |btext|b is converted to &lt;b&gt;text&lt;/b&gt;.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("GoldenMasterId", "gm-008")]
    [Property("BehaviorId", "BHV-413")]
    [Property("ScenarioId", "TS-146")]
    [Description("DMP-07: |b...|b replaced with <b>...</b>")]
    public void ProcessDictionaryMarkup_Bold_ProducesBoldHtml()
    {
        var result = DictionaryMarkupProcessor.ProcessDictionaryMarkup(
            "|bbold text|b",
            "SDBG"
        );

        Assert.That(
            result,
            Is.EqualTo("<b>bold text</b>"),
            "|bbold text|b must become <b>bold text</b>"
        );
    }

    #endregion

    #region Underline Formatting (|u...|u) Tests

    /// <summary>
    /// Tests that |utext|u is converted to &lt;u&gt;text&lt;/u&gt;.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("GoldenMasterId", "gm-008")]
    [Property("BehaviorId", "BHV-413")]
    [Property("ScenarioId", "TS-146")]
    [Description("DMP-08: |u...|u replaced with <u>...</u>")]
    public void ProcessDictionaryMarkup_Underline_ProducesUnderlineHtml()
    {
        var result = DictionaryMarkupProcessor.ProcessDictionaryMarkup(
            "|uunderlined text|u",
            "SDBG"
        );

        Assert.That(
            result,
            Is.EqualTo("<u>underlined text</u>"),
            "|uunderlined text|u must become <u>underlined text</u>"
        );
    }

    #endregion

    #region Mixed Markup Tests

    /// <summary>
    /// Tests that mixed markup with multiple pattern types in one string
    /// is correctly processed. All patterns must be replaced while preserving
    /// surrounding plain text.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-014")]
    [Property("GoldenMasterId", "gm-008")]
    [Property("BehaviorId", "BHV-413")]
    [Property("ScenarioId", "TS-143")]
    [Description("DMP-09: Mixed markup with multiple patterns all replaced")]
    public void ProcessDictionaryMarkup_MixedMarkup_AllPatternsReplaced()
    {
        var result = DictionaryMarkupProcessor.ProcessDictionaryMarkup(
            "Plain text with {A:Author} and {S:001002003} mixed",
            "SDBG"
        );

        Assert.Multiple(() =>
        {
            Assert.That(result, Does.Not.Contain("{A:"), "{A:} must be replaced");
            Assert.That(result, Does.Not.Contain("{S:"), "{S:} must be replaced");
            Assert.That(
                result,
                Does.Contain("Plain text with"),
                "Leading text preserved"
            );
            Assert.That(result, Does.Contain("mixed"), "Trailing text preserved");
            Assert.That(result, Does.Contain("Author"), "Author name preserved");
        });
    }

    /// <summary>
    /// Tests bold text inside a curly-brace pattern context.
    /// Patterns should be independently replaceable.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-014")]
    [Property("BehaviorId", "BHV-413")]
    [Property("ScenarioId", "TS-146")]
    [Description("Bold and italic in same string both converted")]
    public void ProcessDictionaryMarkup_BoldAndItalicMixed_BothConverted()
    {
        var result = DictionaryMarkupProcessor.ProcessDictionaryMarkup(
            "|bbold|b and |iitalic|i",
            "SDBG"
        );

        Assert.That(
            result,
            Is.EqualTo("<b>bold</b> and <i>italic</i>"),
            "Both bold and italic must be converted in mixed content"
        );
    }

    /// <summary>
    /// Tests all three formatting patterns (bold, italic, underline) in one string.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-014")]
    [Property("BehaviorId", "BHV-413")]
    [Property("ScenarioId", "TS-146")]
    [Description("All three formatting patterns in one string")]
    public void ProcessDictionaryMarkup_AllFormattingPatterns_AllConverted()
    {
        var result = DictionaryMarkupProcessor.ProcessDictionaryMarkup(
            "|bbold|b |iitalic|i |uunderline|u",
            "SDBG"
        );

        Assert.That(
            result,
            Is.EqualTo("<b>bold</b> <i>italic</i> <u>underline</u>"),
            "All three formatting patterns must be converted"
        );
    }

    /// <summary>
    /// Tests a complex mixed string combining structured references and formatting.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-014")]
    [Property("BehaviorId", "BHV-413")]
    [Property("ScenarioId", "TS-143")]
    [Description("Complex mixed markup: {A:}, |i, {N:}, and {S:} in one string")]
    public void ProcessDictionaryMarkup_ComplexMixed_AllPatternsReplaced()
    {
        var result = DictionaryMarkupProcessor.ProcessDictionaryMarkup(
            "See {A:Louw} for |idetails|i on {N:2} and {S:040005003}",
            "SDBG"
        );

        Assert.Multiple(() =>
        {
            Assert.That(result, Does.Not.Contain("{A:"), "{A:} replaced");
            Assert.That(result, Does.Not.Contain("|i"), "|i pattern replaced");
            Assert.That(result, Does.Not.Contain("{N:"), "{N:} replaced");
            Assert.That(result, Does.Not.Contain("{S:"), "{S:} replaced");
            Assert.That(result, Does.Contain("See "), "Leading text preserved");
            Assert.That(result, Does.Contain("<i>details</i>"), "Italic converted");
            Assert.That(result, Does.Contain("Louw"), "Author name preserved");
        });
    }

    #endregion

    #region Edge Cases

    /// <summary>
    /// Tests that plain text without any markup passes through unchanged.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("BehaviorId", "BHV-413")]
    [Property("ScenarioId", "TS-143")]
    [Description("Plain text without markup passes through unchanged")]
    public void ProcessDictionaryMarkup_PlainText_PassesThroughUnchanged()
    {
        var result = DictionaryMarkupProcessor.ProcessDictionaryMarkup(
            "This is plain text with no markup",
            "SDBG"
        );

        Assert.That(
            result,
            Is.EqualTo("This is plain text with no markup"),
            "Text without markup must pass through unchanged"
        );
    }

    /// <summary>
    /// Tests that empty string input returns empty string.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("BehaviorId", "BHV-413")]
    [Property("ScenarioId", "TS-143")]
    [Description("Empty string input returns empty string")]
    public void ProcessDictionaryMarkup_EmptyString_ReturnsEmpty()
    {
        var result = DictionaryMarkupProcessor.ProcessDictionaryMarkup(
            "",
            "SDBG"
        );

        Assert.That(result, Is.EqualTo(""), "Empty input must return empty output");
    }

    /// <summary>
    /// Tests that unrecognized patterns pass through unchanged.
    /// Per data-contracts.md: "unrecognized patterns pass through unchanged."
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("BehaviorId", "BHV-413")]
    [Property("ScenarioId", "TS-143")]
    [Description("Unrecognized markup patterns pass through unchanged")]
    public void ProcessDictionaryMarkup_UnrecognizedPattern_PassesThroughUnchanged()
    {
        var result = DictionaryMarkupProcessor.ProcessDictionaryMarkup(
            "{X:unknown pattern}",
            "SDBG"
        );

        Assert.That(
            result,
            Is.EqualTo("{X:unknown pattern}"),
            "Unrecognized {X:} pattern must pass through unchanged"
        );
    }

    /// <summary>
    /// Tests that a single pipe delimiter without matching close does not crash.
    /// Unmatched pipe delimiters should pass through or be handled gracefully.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("BehaviorId", "BHV-413")]
    [Property("ScenarioId", "TS-146")]
    [Description("Unmatched |i delimiter does not crash")]
    public void ProcessDictionaryMarkup_UnmatchedPipeDelimiter_HandledGracefully()
    {
        // Should not throw; unmatched delimiters pass through or are handled
        Assert.DoesNotThrow(() =>
        {
            var result = DictionaryMarkupProcessor.ProcessDictionaryMarkup(
                "|itext without closing delimiter",
                "SDBG"
            );
            // Result should contain the text (graceful handling)
            Assert.That(result, Is.Not.Null, "Result must not be null");
        });
    }

    /// <summary>
    /// Tests empty content within markup delimiters.
    /// {A:} with no content should produce minimal or empty HTML.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("BehaviorId", "BHV-413")]
    [Property("ScenarioId", "TS-143")]
    [Description("Empty content within {A:} delimiters handled gracefully")]
    public void ProcessDictionaryMarkup_EmptyAuthorContent_HandledGracefully()
    {
        Assert.DoesNotThrow(() =>
        {
            var result = DictionaryMarkupProcessor.ProcessDictionaryMarkup(
                "{A:}",
                "SDBG"
            );
            Assert.That(result, Does.Not.Contain("{A:"), "{A:} must still be processed");
        });
    }

    /// <summary>
    /// Tests empty italic content |i|i.
    /// Should produce &lt;i&gt;&lt;/i&gt; (empty tag pair).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("BehaviorId", "BHV-413")]
    [Property("ScenarioId", "TS-146")]
    [Description("Empty |i|i produces <i></i>")]
    public void ProcessDictionaryMarkup_EmptyItalic_ProducesEmptyTag()
    {
        var result = DictionaryMarkupProcessor.ProcessDictionaryMarkup(
            "|i|i",
            "SDBG"
        );

        Assert.That(
            result,
            Is.EqualTo("<i></i>"),
            "Empty |i|i must produce <i></i>"
        );
    }

    /// <summary>
    /// Tests that the dictionary parameter is accepted for both SDBG and SDBH.
    /// The dictionary parameter identifies Greek (SDBG) or Hebrew (SDBH) context.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("BehaviorId", "BHV-413")]
    [Property("ScenarioId", "TS-143")]
    [Description("Both SDBG and SDBH dictionary values are accepted")]
    public void ProcessDictionaryMarkup_BothDictionaries_Accepted()
    {
        Assert.Multiple(() =>
        {
            var resultG = DictionaryMarkupProcessor.ProcessDictionaryMarkup(
                "|btest|b",
                "SDBG"
            );
            Assert.That(
                resultG,
                Is.EqualTo("<b>test</b>"),
                "SDBG dictionary must be accepted"
            );

            var resultH = DictionaryMarkupProcessor.ProcessDictionaryMarkup(
                "|btest|b",
                "SDBH"
            );
            Assert.That(
                resultH,
                Is.EqualTo("<b>test</b>"),
                "SDBH dictionary must be accepted"
            );
        });
    }

    /// <summary>
    /// Tests that italic within a larger text context works correctly.
    /// Surrounding text must be preserved.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("BehaviorId", "BHV-413")]
    [Property("ScenarioId", "TS-146")]
    [Description("Italic embedded within surrounding text")]
    public void ProcessDictionaryMarkup_ItalicInContext_SurroundingTextPreserved()
    {
        var result = DictionaryMarkupProcessor.ProcessDictionaryMarkup(
            "before |iword|i after",
            "SDBG"
        );

        Assert.That(
            result,
            Is.EqualTo("before <i>word</i> after"),
            "Surrounding text must be preserved around italic"
        );
    }

    /// <summary>
    /// Tests {L:} pattern with colon-separated parts: dictionary:lemma:sense.
    /// The link should include the lemma information.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("BehaviorId", "BHV-413")]
    [Property("ScenarioId", "TS-144")]
    [Description("{L:} pattern carries dict:lemma:sense parts")]
    public void ProcessDictionaryMarkup_LexicalLinkParts_CarriedInLink()
    {
        var result = DictionaryMarkupProcessor.ProcessDictionaryMarkup(
            "{L:SDBG:agape:003011}",
            "SDBG"
        );

        Assert.Multiple(() =>
        {
            Assert.That(result, Does.Not.Contain("{L:"), "{L:} pattern must be replaced");
            Assert.That(
                result,
                Does.Contain("displaylemma:"),
                "Link must use displaylemma: scheme"
            );
            Assert.That(result, Does.Contain("<a "), "Must produce HTML anchor");
        });
    }

    /// <summary>
    /// Tests that {S:} with an invalid BCV reference handles gracefully.
    /// FormatBCVRefs returns empty string for invalid refs, so the
    /// pattern should be replaced but with minimal/empty verse link output.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("BehaviorId", "BHV-413")]
    [Property("ScenarioId", "TS-145")]
    [Description("{S:} with invalid BCV reference handled gracefully")]
    public void ProcessDictionaryMarkup_InvalidScriptureRef_HandledGracefully()
    {
        Assert.DoesNotThrow(() =>
        {
            var result = DictionaryMarkupProcessor.ProcessDictionaryMarkup(
                "{S:999999999}",
                "SDBG"
            );
            Assert.That(
                result,
                Does.Not.Contain("{S:"),
                "{S:} pattern must still be processed even with invalid BCV"
            );
        });
    }

    /// <summary>
    /// Tests that {S:} with a range reference (BBBCCCVVV-BBBCCCVVV) is handled.
    /// FormatBCVRefs supports range references with hyphen separators.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("BehaviorId", "BHV-413")]
    [Property("ScenarioId", "TS-145")]
    [Description("{S:} with range reference (BBBCCCVVV-BBBCCCVVV) produces range link")]
    public void ProcessDictionaryMarkup_ScriptureRefRange_ProducesRangeLink()
    {
        var result = DictionaryMarkupProcessor.ProcessDictionaryMarkup(
            "{S:001001001-001001003}",
            "SDBG"
        );

        Assert.Multiple(() =>
        {
            Assert.That(result, Does.Not.Contain("{S:"), "{S:} must be replaced");
            Assert.That(
                result,
                Does.Contain("goto:"),
                "Range reference must produce goto: link"
            );
        });
    }

    #endregion

    #region Processing Order Tests

    /// <summary>
    /// Tests that curly-brace patterns are processed before pipe-delimited
    /// formatting patterns. The fixed processing order ensures that
    /// {A:} content containing |i delimiters is handled correctly.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("BehaviorId", "BHV-413")]
    [Property("ScenarioId", "TS-143")]
    [Description("Processing order: curly-brace patterns processed before pipe patterns")]
    public void ProcessDictionaryMarkup_ProcessingOrder_CurlyBraceBeforePipe()
    {
        // If {A:} is processed first, and then |i is processed,
        // the output should have properly ordered replacements
        var result = DictionaryMarkupProcessor.ProcessDictionaryMarkup(
            "{A:Author Name} |iitalic|i",
            "SDBG"
        );

        Assert.Multiple(() =>
        {
            Assert.That(result, Does.Not.Contain("{A:"), "{A:} must be replaced");
            Assert.That(
                result,
                Does.Contain("<i>italic</i>"),
                "Italic must be converted"
            );
            Assert.That(
                result,
                Does.Contain("Author Name"),
                "Author name preserved after both passes"
            );
        });
    }

    #endregion

    #region Golden Master Comparison Tests

    /// <summary>
    /// Golden master test using TestCaseSource to verify all DMP scenarios.
    /// Each scenario from gm-008 is tested individually for clear failure reporting.
    /// </summary>
    [TestCase(
        "DMP-01",
        "{A:Louw and Nida}",
        "SDBG",
        "{A:",
        "Louw and Nida"
    )]
    [TestCase(
        "DMP-02",
        "{L:SDBG:logos:001001}",
        "SDBG",
        "{L:",
        "displaylemma:"
    )]
    [TestCase(
        "DMP-03",
        "{D:domain text}",
        "SDBG",
        "{D:",
        "domain text"
    )]
    [TestCase(
        "DMP-04",
        "{N:1}",
        "SDBG",
        "{N:",
        "1"
    )]
    [TestCase(
        "DMP-05",
        "{S:001001001}",
        "SDBG",
        "{S:",
        "goto:"
    )]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-014")]
    [Property("GoldenMasterId", "gm-008")]
    [Property("BehaviorId", "BHV-413")]
    [Property("ScenarioId", "TS-143")]
    [Description("Golden master: each curly-brace pattern removes raw markup and produces expected content")]
    public void ProcessDictionaryMarkup_GoldenMaster_CurlyBracePatterns(
        string scenarioId,
        string input,
        string dictionary,
        string mustNotContain,
        string mustContain
    )
    {
        var result = DictionaryMarkupProcessor.ProcessDictionaryMarkup(input, dictionary);

        Assert.Multiple(() =>
        {
            Assert.That(
                result,
                Does.Not.Contain(mustNotContain),
                $"{scenarioId}: Raw pattern '{mustNotContain}' must not remain"
            );
            Assert.That(
                result,
                Does.Contain(mustContain),
                $"{scenarioId}: Expected content '{mustContain}' must appear in output"
            );
        });
    }

    /// <summary>
    /// Golden master test for pipe-delimited formatting patterns.
    /// These have exact expected HTML output.
    /// </summary>
    [TestCase(
        "DMP-06",
        "|iitalic text|i",
        "<i>italic text</i>"
    )]
    [TestCase(
        "DMP-07",
        "|bbold text|b",
        "<b>bold text</b>"
    )]
    [TestCase(
        "DMP-08",
        "|uunderlined text|u",
        "<u>underlined text</u>"
    )]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-014")]
    [Property("GoldenMasterId", "gm-008")]
    [Property("BehaviorId", "BHV-413")]
    [Property("ScenarioId", "TS-146")]
    [Description("Golden master: pipe-delimited formatting patterns produce exact HTML")]
    public void ProcessDictionaryMarkup_GoldenMaster_FormattingPatterns(
        string scenarioId,
        string input,
        string expectedOutput
    )
    {
        var result = DictionaryMarkupProcessor.ProcessDictionaryMarkup(input, "SDBG");

        Assert.That(
            result,
            Is.EqualTo(expectedOutput),
            $"{scenarioId}: '{input}' must produce '{expectedOutput}'"
        );
    }

    #endregion
}

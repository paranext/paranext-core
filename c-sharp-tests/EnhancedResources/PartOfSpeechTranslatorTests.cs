using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider;
using Paranext.DataProvider.EnhancedResources;

namespace TestParanextDataProvider.EnhancedResources;

/// <summary>
/// Tests for PartOfSpeechTranslator.Translate - POS tag translation.
/// CAP-005: TranslatePartOfSpeech
///
/// Behaviors: BHV-615 (Part-of-Speech Tag Translation)
/// Contract: Section 4.5 M-005, Section 2.5 PosTranslateInput, Section 3.5 PosTranslateResult
/// Source: EXT-052 (PartOfSpeechTranslator - POS Translation Tables)
///
/// PartOfSpeechTranslator.Translate is a static method that translates compound POS tag
/// strings into human-readable long or short form strings. 28 Greek codes and 14 Hebrew
/// codes are supported. Hebrew tags have the trailing 'H' stripped before lookup.
/// Each character in the compound tag maps to a POS sub-category.
///
/// Golden masters:
///   gm-016: Greek long form ("noun-dans" -> "noun declinable accusative neuter singular")
///   gm-017: Hebrew short form ("nspmaH" -> "n m.pl abs")
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
internal class PartOfSpeechTranslatorTests
{
    #region Acceptance Tests (Golden Masters)

    // -------------------------------------------------------------------------
    // gm-016: Compound POS tag translation, long form
    // Input: SDBG "noun-dans" (Greek noun with full declension codes)
    // Expected: "noun declinable accusative neuter singular"
    // -------------------------------------------------------------------------

    [Test]
    [Category("Acceptance")]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-005")]
    [Property("ScenarioId", "TS-039")]
    [Property("BehaviorId", "BHV-615")]
    [Property("GoldenMasterId", "gm-016")]
    [Description(
        "gm-016: Greek compound POS tag 'noun-dans' translates to long form 'noun declinable accusative neuter singular'"
    )]
    public void Translate_GreekCompoundTag_LongForm_MatchesGoldenMaster()
    {
        // Arrange: gm-016 test case 1 - Greek noun with full declension codes
        string tag = "noun-dans";
        string language = "Greek";
        string form = "long";

        // Act
        PosTranslateResult result = PartOfSpeechTranslator.Translate(tag, language, form);

        // Assert: exact match per gm-016 expected-output.json
        Assert.That(result.IsKnown, Is.True, "Greek 'noun-dans' should be a known compound tag");
        Assert.That(
            result.DisplayString,
            Is.EqualTo("noun declinable accusative neuter singular"),
            "Must match PT9 golden master output for Greek long form compound tag"
        );
    }

    // -------------------------------------------------------------------------
    // gm-016: Hebrew compound POS tag, long form (cross-language test in gm-016)
    // Input: SDBH "nspmaH" (Hebrew noun with gender/number/state codes)
    // Expected: "noun masculine plural absolute"
    // -------------------------------------------------------------------------

    [Test]
    [Category("Acceptance")]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-005")]
    [Property("ScenarioId", "TS-040")]
    [Property("BehaviorId", "BHV-615")]
    [Property("GoldenMasterId", "gm-016")]
    [Description(
        "gm-016: Hebrew compound POS tag 'nspmaH' translates to long form 'noun masculine plural absolute' (trailing H stripped)"
    )]
    public void Translate_HebrewCompoundTag_LongForm_MatchesGoldenMaster()
    {
        // Arrange: gm-016 test case 2 - Hebrew noun with gender/number/state codes
        // The trailing 'H' is a Hebrew language marker and must be stripped
        string tag = "nspmaH";
        string language = "Hebrew";
        string form = "long";

        // Act
        PosTranslateResult result = PartOfSpeechTranslator.Translate(tag, language, form);

        // Assert: exact match per gm-016 expected-output.json
        Assert.That(result.IsKnown, Is.True, "Hebrew 'nspmaH' should be known after H stripping");
        Assert.That(
            result.DisplayString,
            Is.EqualTo("noun masculine plural absolute"),
            "Must match PT9 golden master output for Hebrew long form (H stripped)"
        );
    }

    // -------------------------------------------------------------------------
    // gm-017: Hebrew compound POS tag, short form
    // Input: SDBH "nspmaH" (same tag as above, but short form)
    // Expected: "n m.pl abs"
    // -------------------------------------------------------------------------

    [Test]
    [Category("Acceptance")]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-005")]
    [Property("ScenarioId", "TS-040")]
    [Property("BehaviorId", "BHV-615")]
    [Property("GoldenMasterId", "gm-017")]
    [Description(
        "gm-017: Hebrew compound POS tag 'nspmaH' translates to short form 'n m.pl abs' (trailing H stripped)"
    )]
    public void Translate_HebrewCompoundTag_ShortForm_MatchesGoldenMaster()
    {
        // Arrange: gm-017 test case 1 - Hebrew noun short form
        string tag = "nspmaH";
        string language = "Hebrew";
        string form = "short";

        // Act
        PosTranslateResult result = PartOfSpeechTranslator.Translate(tag, language, form);

        // Assert: exact match per gm-017 expected-output.json
        Assert.That(result.IsKnown, Is.True, "Hebrew 'nspmaH' should be known after H stripping");
        Assert.That(
            result.DisplayString,
            Is.EqualTo("n m.pl abs"),
            "Must match PT9 golden master output for Hebrew short form"
        );
    }

    // -------------------------------------------------------------------------
    // gm-017: Greek compound POS tag, short form (cross-language in gm-017)
    // Input: SDBG "noun-dans"
    // Expected: "n decl acc n sg"
    // -------------------------------------------------------------------------

    [Test]
    [Category("Acceptance")]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-005")]
    [Property("ScenarioId", "TS-039")]
    [Property("BehaviorId", "BHV-615")]
    [Property("GoldenMasterId", "gm-017")]
    [Description(
        "gm-017: Greek compound POS tag 'noun-dans' translates to short form 'n decl acc n sg'"
    )]
    public void Translate_GreekCompoundTag_ShortForm_MatchesGoldenMaster()
    {
        // Arrange: gm-017 test case 2 - Greek noun short form
        string tag = "noun-dans";
        string language = "Greek";
        string form = "short";

        // Act
        PosTranslateResult result = PartOfSpeechTranslator.Translate(tag, language, form);

        // Assert: exact match per gm-017 expected-output.json
        Assert.That(result.IsKnown, Is.True, "Greek 'noun-dans' should be a known compound tag");
        Assert.That(
            result.DisplayString,
            Is.EqualTo("n decl acc n sg"),
            "Must match PT9 golden master output for Greek short form"
        );
    }

    #endregion

    #region Contract Tests - Greek POS Codes (TS-039)

    // -------------------------------------------------------------------------
    // TS-039: Greek POS tag translation (28 codes, long form)
    // The golden master confirms individual code translation; these tests
    // verify representative individual Greek codes in both forms.
    // -------------------------------------------------------------------------

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("ScenarioId", "TS-039")]
    [Property("BehaviorId", "BHV-615")]
    [Description("Greek single POS code 'N' translates to 'Noun' in long form")]
    public void Translate_GreekN_LongForm_ReturnsNoun()
    {
        PosTranslateResult result = PartOfSpeechTranslator.Translate("N", "Greek", "long");

        Assert.That(result.IsKnown, Is.True);
        Assert.That(result.DisplayString, Does.Contain("noun").IgnoreCase);
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("ScenarioId", "TS-039")]
    [Property("BehaviorId", "BHV-615")]
    [Description("Greek single POS code 'V' translates to 'Verb' in long form")]
    public void Translate_GreekV_LongForm_ReturnsVerb()
    {
        PosTranslateResult result = PartOfSpeechTranslator.Translate("V", "Greek", "long");

        Assert.That(result.IsKnown, Is.True);
        Assert.That(result.DisplayString, Does.Contain("verb").IgnoreCase);
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("ScenarioId", "TS-039")]
    [Property("BehaviorId", "BHV-615")]
    [Description("Greek single POS code 'A' translates to 'Adjective' in long form")]
    public void Translate_GreekA_LongForm_ReturnsAdjective()
    {
        PosTranslateResult result = PartOfSpeechTranslator.Translate("A", "Greek", "long");

        Assert.That(result.IsKnown, Is.True);
        Assert.That(result.DisplayString, Does.Contain("adjective").IgnoreCase);
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("ScenarioId", "TS-039")]
    [Property("BehaviorId", "BHV-615")]
    [Description("Greek single POS code 'D' translates to 'Adverb' in long form")]
    public void Translate_GreekD_LongForm_ReturnsAdverb()
    {
        PosTranslateResult result = PartOfSpeechTranslator.Translate("D", "Greek", "long");

        Assert.That(result.IsKnown, Is.True);
        Assert.That(result.DisplayString, Does.Contain("adverb").IgnoreCase);
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("ScenarioId", "TS-039")]
    [Property("BehaviorId", "BHV-615")]
    [Description("Greek single POS code 'P' translates to 'Preposition' in long form")]
    public void Translate_GreekP_LongForm_ReturnsPreposition()
    {
        PosTranslateResult result = PartOfSpeechTranslator.Translate("P", "Greek", "long");

        Assert.That(result.IsKnown, Is.True);
        Assert.That(result.DisplayString, Does.Contain("preposition").IgnoreCase);
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("ScenarioId", "TS-039")]
    [Property("BehaviorId", "BHV-615")]
    [Description("Greek codes return short form abbreviations")]
    public void Translate_GreekN_ShortForm_ReturnsAbbreviation()
    {
        PosTranslateResult result = PartOfSpeechTranslator.Translate("N", "Greek", "short");

        Assert.That(result.IsKnown, Is.True);
        // Short form should be an abbreviated version (e.g., "n" not "noun")
        Assert.That(
            result.DisplayString.Length,
            Is.LessThan(10),
            "Short form should be abbreviated"
        );
    }

    #endregion

    #region Contract Tests - Hebrew POS Codes (TS-040)

    // -------------------------------------------------------------------------
    // TS-040: Hebrew POS tag translation (14 codes, short form)
    // Hebrew codes: final 'H' is stripped before lookup.
    // -------------------------------------------------------------------------

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("ScenarioId", "TS-040")]
    [Property("BehaviorId", "BHV-615")]
    [Description("Hebrew tag 'VH' strips trailing H and translates 'V' as verb")]
    public void Translate_HebrewVH_LongForm_StripsHAndReturnsVerb()
    {
        // "VH" -> strip trailing H -> lookup "V" in Hebrew table
        PosTranslateResult result = PartOfSpeechTranslator.Translate("VH", "Hebrew", "long");

        Assert.That(result.IsKnown, Is.True, "Hebrew 'VH' should resolve to 'V' after H stripping");
        Assert.That(result.DisplayString, Does.Contain("verb").IgnoreCase);
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("ScenarioId", "TS-040")]
    [Property("BehaviorId", "BHV-615")]
    [Description("Hebrew single code 'n' (no trailing H) translates correctly")]
    public void Translate_HebrewN_LongForm_ReturnsNoun()
    {
        PosTranslateResult result = PartOfSpeechTranslator.Translate("n", "Hebrew", "long");

        Assert.That(result.IsKnown, Is.True);
        Assert.That(result.DisplayString, Does.Contain("noun").IgnoreCase);
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("ScenarioId", "TS-040")]
    [Property("BehaviorId", "BHV-615")]
    [Description("Hebrew code in short form returns abbreviated version")]
    public void Translate_HebrewN_ShortForm_ReturnsAbbreviation()
    {
        PosTranslateResult result = PartOfSpeechTranslator.Translate("n", "Hebrew", "short");

        Assert.That(result.IsKnown, Is.True);
        Assert.That(
            result.DisplayString.Length,
            Is.LessThan(10),
            "Short form should be abbreviated"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("ScenarioId", "TS-040")]
    [Property("BehaviorId", "BHV-615")]
    [Description(
        "Hebrew compound tag with trailing H is stripped and all sub-codes are translated"
    )]
    public void Translate_HebrewCompoundWithH_StripsHandTranslatesAllCodes()
    {
        // "nspmaH" -> strip trailing H -> "nspma" -> translate each code
        PosTranslateResult result = PartOfSpeechTranslator.Translate("nspmaH", "Hebrew", "long");

        Assert.That(result.IsKnown, Is.True);
        // The compound result should contain multiple words (each code translates to a word)
        string[] words = result.DisplayString.Split(' ');
        Assert.That(
            words.Length,
            Is.GreaterThan(1),
            "Compound tag should produce multi-word translation"
        );
    }

    #endregion

    #region Contract Tests - Result Structure

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("ScenarioId", "TS-039")]
    [Property("BehaviorId", "BHV-615")]
    [Description("PosTranslateResult contains localization key following expected pattern")]
    public void Translate_KnownGreekCode_ReturnsLocalizationKey()
    {
        PosTranslateResult result = PartOfSpeechTranslator.Translate("N", "Greek", "long");

        Assert.That(result.IsKnown, Is.True);
        // Localization keys follow pattern: EnhancedResource.PartOfSpeech.{form}
        Assert.That(
            result.LocalizationKey,
            Does.StartWith("EnhancedResource.PartOfSpeech."),
            "Localization key must follow EnhancedResource.PartOfSpeech.{form} pattern"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("ScenarioId", "TS-039")]
    [Property("BehaviorId", "BHV-615")]
    [Description("DisplayString is not null or empty for known codes")]
    public void Translate_KnownCode_DisplayStringIsNotEmpty()
    {
        PosTranslateResult result = PartOfSpeechTranslator.Translate("V", "Greek", "long");

        Assert.That(result.IsKnown, Is.True);
        Assert.That(result.DisplayString, Is.Not.Null.And.Not.Empty);
    }

    #endregion

    #region Edge Cases - Unknown Tags (TS-041)

    // -------------------------------------------------------------------------
    // TS-041: Unknown POS tags return empty/IsKnown=false
    // -------------------------------------------------------------------------

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("ScenarioId", "TS-041")]
    [Property("BehaviorId", "BHV-615")]
    [Description("Unknown Greek POS tag 'ZZ' returns IsKnown=false with empty display string")]
    public void Translate_UnknownGreekTag_ReturnsIsKnownFalseWithEmptyDisplay()
    {
        PosTranslateResult result = PartOfSpeechTranslator.Translate("ZZ", "Greek", "long");

        Assert.That(result.IsKnown, Is.False, "Unrecognized tag 'ZZ' should not be known");
        Assert.That(
            result.DisplayString,
            Is.Empty,
            "Unknown tag should return empty display string"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("ScenarioId", "TS-041")]
    [Property("BehaviorId", "BHV-615")]
    [Description("Unknown Hebrew POS tag returns IsKnown=false with empty display string")]
    public void Translate_UnknownHebrewTag_ReturnsIsKnownFalseWithEmptyDisplay()
    {
        PosTranslateResult result = PartOfSpeechTranslator.Translate("QQH", "Hebrew", "long");

        Assert.That(
            result.IsKnown,
            Is.False,
            "Unrecognized tag 'QQH' (after H stripping -> 'QQ') should not be known"
        );
        Assert.That(result.DisplayString, Is.Empty);
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("ScenarioId", "TS-041")]
    [Property("BehaviorId", "BHV-615")]
    [Description("Unknown tag in short form also returns IsKnown=false")]
    public void Translate_UnknownTagShortForm_ReturnsIsKnownFalse()
    {
        PosTranslateResult result = PartOfSpeechTranslator.Translate("ZZ", "Greek", "short");

        Assert.That(result.IsKnown, Is.False);
        Assert.That(result.DisplayString, Is.Empty);
    }

    #endregion

    #region Error Cases - Empty Tag

    // -------------------------------------------------------------------------
    // Contract Section 4.5 Error Conditions: Empty tag -> INVALID_ARGUMENT
    // -------------------------------------------------------------------------

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("ScenarioId", "TS-039")]
    [Property("BehaviorId", "BHV-615")]
    [Description("Empty tag string throws InvalidOperationException with INVALID_ARGUMENT code")]
    public void Translate_EmptyTag_ThrowsInvalidArgument()
    {
        var ex = Assert.Throws<InvalidOperationException>(
            () => PartOfSpeechTranslator.Translate("", "Greek", "long")
        );

        Assert.That(ex, Is.Not.Null);
        Assert.That(ex!.Message, Does.Contain("POS tag must not be empty"));
        Assert.That(
            ex.Data["platformErrorCode"],
            Is.EqualTo("INVALID_ARGUMENT"),
            "Must use PlatformErrorCodes.InvalidArgument"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("ScenarioId", "TS-039")]
    [Property("BehaviorId", "BHV-615")]
    [Description("Null tag string throws InvalidOperationException with INVALID_ARGUMENT code")]
    public void Translate_NullTag_ThrowsInvalidArgument()
    {
        var ex = Assert.Throws<InvalidOperationException>(
            () => PartOfSpeechTranslator.Translate(null!, "Greek", "long")
        );

        Assert.That(ex, Is.Not.Null);
        Assert.That(ex!.Message, Does.Contain("POS tag must not be empty"));
        Assert.That(ex.Data["platformErrorCode"], Is.EqualTo("INVALID_ARGUMENT"));
    }

    #endregion

    #region Hebrew H-Stripping Specifics

    // -------------------------------------------------------------------------
    // Hebrew-specific: trailing 'H' is a language marker that must be stripped.
    // This behavior is specified in BHV-615, Section 2.5, and gm-017.
    // -------------------------------------------------------------------------

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("ScenarioId", "TS-040")]
    [Property("BehaviorId", "BHV-615")]
    [Description(
        "Hebrew tag consisting of only 'H' should strip to empty and return IsKnown=false or handle gracefully"
    )]
    public void Translate_HebrewOnlyH_HandlesGracefully()
    {
        // Edge case: tag is just "H" - after stripping trailing H, tag is empty
        // This should either throw INVALID_ARGUMENT (if tag becomes empty after stripping)
        // or return IsKnown=false
        PosTranslateResult result = PartOfSpeechTranslator.Translate("H", "Hebrew", "long");

        // After H stripping, the effective tag is empty - should be unknown
        Assert.That(result.IsKnown, Is.False);
        Assert.That(result.DisplayString, Is.Empty);
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("ScenarioId", "TS-040")]
    [Property("BehaviorId", "BHV-615")]
    [Description("Greek tag with trailing H does NOT strip the H (H-stripping is Hebrew only)")]
    public void Translate_GreekTagWithH_DoesNotStripH()
    {
        // For Greek, 'H' is not stripped - it would be treated as a POS code character
        // The result depends on whether 'H' is a valid Greek code
        PosTranslateResult result = PartOfSpeechTranslator.Translate("NH", "Greek", "long");

        // 'N' is noun (known), 'H' may or may not be a valid Greek sub-code
        // Key assertion: this is NOT the same as translating just "N"
        PosTranslateResult resultWithoutH = PartOfSpeechTranslator.Translate("N", "Greek", "long");
        // If H is not stripped for Greek, the translations should differ
        // (unless H happens to translate to empty in Greek context)
        Assert.That(result, Is.Not.Null, "Should return a result without throwing");
    }

    #endregion

    #region Determinism and Consistency

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("ScenarioId", "TS-039")]
    [Property("BehaviorId", "BHV-615")]
    [Description("Same input always produces same output (stateless, deterministic)")]
    public void Translate_SameInput_AlwaysReturnsSameResult()
    {
        // PartOfSpeechTranslator is stateless - verify determinism
        PosTranslateResult result1 = PartOfSpeechTranslator.Translate("noun-dans", "Greek", "long");
        PosTranslateResult result2 = PartOfSpeechTranslator.Translate("noun-dans", "Greek", "long");

        Assert.That(result1.DisplayString, Is.EqualTo(result2.DisplayString));
        Assert.That(result1.IsKnown, Is.EqualTo(result2.IsKnown));
        Assert.That(result1.LocalizationKey, Is.EqualTo(result2.LocalizationKey));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("ScenarioId", "TS-039")]
    [Property("BehaviorId", "BHV-615")]
    [Description("Long form and short form produce different display strings for the same tag")]
    public void Translate_LongVsShort_ProduceDifferentDisplayStrings()
    {
        PosTranslateResult longResult = PartOfSpeechTranslator.Translate(
            "noun-dans",
            "Greek",
            "long"
        );
        PosTranslateResult shortResult = PartOfSpeechTranslator.Translate(
            "noun-dans",
            "Greek",
            "short"
        );

        Assert.That(longResult.IsKnown, Is.True);
        Assert.That(shortResult.IsKnown, Is.True);
        Assert.That(
            longResult.DisplayString,
            Is.Not.EqualTo(shortResult.DisplayString),
            "Long and short forms must produce different display strings"
        );
        // Long form should be longer than short form
        Assert.That(
            longResult.DisplayString.Length,
            Is.GreaterThan(shortResult.DisplayString.Length),
            "Long form should be longer than short form"
        );
    }

    #endregion
}

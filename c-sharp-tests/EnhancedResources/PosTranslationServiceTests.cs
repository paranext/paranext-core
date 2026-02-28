using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.EnhancedResources;

namespace TestParanextDataProvider.EnhancedResources;

/// <summary>
/// Tests for PosTranslationService.TranslatePartOfSpeechAsync (CAP-008).
///
/// Translates part-of-speech tags from SDBH (Hebrew) character-based codes and
/// SDBG (Greek) hyphen-separated codes to human-readable text in both long and
/// short formats.
///
/// Contract: Section 4.8 TranslatePartOfSpeech (data-contracts.md)
/// Input: Section 2.7 PosTranslationInput
/// Output: Section 3.6 PosTranslationResult
/// Behavior: BHV-610 (Part-of-Speech Translation System)
/// Extraction: EXT-008 (POS Translation Worker B1)
/// Golden Master: GM-013 (POS Translation)
///
/// PT9 Source: Paratext.Marble.PartOfSpeechTranslator + PartOfSpeechTranslatorTests.cs
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
public class PosTranslationServiceTests
{
    // =========================================================================
    // ACCEPTANCE TEST (OUTER LOOP) - The "done signal" for CAP-008
    // =========================================================================

    /// <summary>
    /// Acceptance test: When TranslatePartOfSpeech is called with Hebrew and Greek
    /// POS tags, it produces the same human-readable translations as PT9.
    ///
    /// This test passes when CAP-008 is COMPLETE.
    ///
    /// Verifies all three GM-013 scenarios:
    /// 1. Hebrew long format: "nspmaH" -> "noun masculine plural absolute"
    /// 2. Greek long format: "noun-dans" -> "noun declinable accusative neuter singular"
    /// 3. Greek short format: "noun-dans" -> "n decl acc n sg"
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-008")]
    [Property("ScenarioId", "TS-055")]
    [Property("BehaviorId", "BHV-610")]
    [Property("GoldenMaster", "GM-013")]
    [Description(
        "Acceptance test: POS tags translated to human-readable text for Hebrew "
            + "character codes, Greek hyphen-separated codes, in long and short formats"
    )]
    public async Task TranslatePartOfSpeech_AcceptanceTest_MatchesGoldenMaster()
    {
        // Arrange & Act: GM-013 scenario 1 - Hebrew long format
        var hebrewLongResult = await PosTranslationService.TranslatePartOfSpeechAsync(
            new PosTranslationInput("SDBH", "nspmaH", ShortFormat: false),
            CancellationToken.None
        );

        // Assert: Hebrew long format matches PT9 exactly
        Assert.That(hebrewLongResult.Success, Is.True, "Hebrew long format should succeed");
        Assert.That(
            hebrewLongResult.Translation,
            Is.EqualTo("noun masculine plural absolute"),
            "GM-013: Hebrew 'nspmaH' long format must match PT9 output"
        );

        // Arrange & Act: GM-013 scenario 2 - Greek long format
        var greekLongResult = await PosTranslationService.TranslatePartOfSpeechAsync(
            new PosTranslationInput("SDBG", "noun-dans", ShortFormat: false),
            CancellationToken.None
        );

        // Assert: Greek long format matches PT9 exactly
        Assert.That(greekLongResult.Success, Is.True, "Greek long format should succeed");
        Assert.That(
            greekLongResult.Translation,
            Is.EqualTo("noun declinable accusative neuter singular"),
            "GM-013: Greek 'noun-dans' long format must match PT9 output"
        );

        // Arrange & Act: GM-013 scenario 3 - Greek short format
        var greekShortResult = await PosTranslationService.TranslatePartOfSpeechAsync(
            new PosTranslationInput("SDBG", "noun-dans", ShortFormat: true),
            CancellationToken.None
        );

        // Assert: Greek short format matches PT9 exactly
        Assert.That(greekShortResult.Success, Is.True, "Greek short format should succeed");
        Assert.That(
            greekShortResult.Translation,
            Is.EqualTo("n decl acc n sg"),
            "GM-013: Greek 'noun-dans' short format must match PT9 output"
        );
    }

    // =========================================================================
    // CONTRACT TESTS - Happy Path
    // =========================================================================

    /// <summary>
    /// Hebrew POS tag "nspmaH" translates to "noun masculine plural absolute" in long format.
    /// From PT9 PartOfSpeechTranslatorTests.TranslateTag_LongForm.
    /// SDBH uses character-based codes where each character represents a grammatical category.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-055")]
    [Property("BehaviorId", "BHV-610")]
    [Description("SDBH Hebrew POS tag translated from character codes to long format")]
    public async Task TranslatePartOfSpeech_HebrewLongFormat_ReturnsFullTranslation()
    {
        // Arrange
        var input = new PosTranslationInput("SDBH", "nspmaH", ShortFormat: false);

        // Act
        var result = await PosTranslationService.TranslatePartOfSpeechAsync(
            input,
            CancellationToken.None
        );

        // Assert
        Assert.That(result.Success, Is.True);
        Assert.That(
            result.Translation,
            Is.EqualTo("noun masculine plural absolute"),
            "PT9 exact match: SDBH 'nspmaH' long format"
        );
    }

    /// <summary>
    /// Greek POS tag "noun-dans" translates to "noun declinable accusative neuter singular"
    /// in long format. From PT9 PartOfSpeechTranslatorTests.TranslateTag_LongForm.
    /// SDBG uses hyphen-separated codes.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-056")]
    [Property("BehaviorId", "BHV-610")]
    [Description("SDBG Greek POS tag translated from hyphen-separated codes to long format")]
    public async Task TranslatePartOfSpeech_GreekLongFormat_ReturnsFullTranslation()
    {
        // Arrange
        var input = new PosTranslationInput("SDBG", "noun-dans", ShortFormat: false);

        // Act
        var result = await PosTranslationService.TranslatePartOfSpeechAsync(
            input,
            CancellationToken.None
        );

        // Assert
        Assert.That(result.Success, Is.True);
        Assert.That(
            result.Translation,
            Is.EqualTo("noun declinable accusative neuter singular"),
            "PT9 exact match: SDBG 'noun-dans' long format"
        );
    }

    /// <summary>
    /// Greek POS tag "noun-dans" in short format produces "n decl acc n sg".
    /// From PT9 PartOfSpeechTranslatorTests.TranslateTag_ShortForm.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-057")]
    [Property("BehaviorId", "BHV-610")]
    [Description("POS tag short format produces abbreviated output")]
    public async Task TranslatePartOfSpeech_GreekShortFormat_ReturnsAbbreviatedTranslation()
    {
        // Arrange
        var input = new PosTranslationInput("SDBG", "noun-dans", ShortFormat: true);

        // Act
        var result = await PosTranslationService.TranslatePartOfSpeechAsync(
            input,
            CancellationToken.None
        );

        // Assert
        Assert.That(result.Success, Is.True);
        Assert.That(
            result.Translation,
            Is.EqualTo("n decl acc n sg"),
            "PT9 exact match: SDBG 'noun-dans' short format"
        );
    }

    /// <summary>
    /// Hebrew POS tag "nspmaH" in short format produces "n m.pl abs".
    /// From PT9 PartOfSpeechTranslatorTests.TranslateTag_ShortForm.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-055")]
    [Property("BehaviorId", "BHV-610")]
    [Description("SDBH Hebrew POS tag short format produces abbreviated output")]
    public async Task TranslatePartOfSpeech_HebrewShortFormat_ReturnsAbbreviatedTranslation()
    {
        // Arrange
        var input = new PosTranslationInput("SDBH", "nspmaH", ShortFormat: true);

        // Act
        var result = await PosTranslationService.TranslatePartOfSpeechAsync(
            input,
            CancellationToken.None
        );

        // Assert
        Assert.That(result.Success, Is.True);
        Assert.That(
            result.Translation,
            Is.EqualTo("n m.pl abs"),
            "PT9 exact match: SDBH 'nspmaH' short format"
        );
    }

    // =========================================================================
    // CONTRACT TESTS - Result Structure
    // =========================================================================

    /// <summary>
    /// Successful translation result has correct structure: Success=true,
    /// Translation is non-null, Components is populated, Error is null.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-055")]
    [Property("BehaviorId", "BHV-610")]
    [Description("Successful POS translation result has correct structure")]
    public async Task TranslatePartOfSpeech_SuccessResult_HasCorrectStructure()
    {
        // Arrange
        var input = new PosTranslationInput("SDBH", "nspmaH", ShortFormat: false);

        // Act
        var result = await PosTranslationService.TranslatePartOfSpeechAsync(
            input,
            CancellationToken.None
        );

        // Assert
        Assert.That(result.Success, Is.True);
        Assert.That(result.Translation, Is.Not.Null.And.Not.Empty);
        Assert.That(result.Components, Is.Not.Null);
        Assert.That(result.Components!, Is.Not.Empty, "Components should be populated on success");
        Assert.That(result.Error, Is.Null, "Error should be null on success");
    }

    /// <summary>
    /// Hebrew POS tag components include expected number of elements.
    /// "nspmaH" breaks down into: noun, masculine, plural, absolute = 4 components.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-055")]
    [Property("BehaviorId", "BHV-610")]
    [Description("Hebrew POS tag produces components for each grammatical element")]
    public async Task TranslatePartOfSpeech_HebrewTag_ComponentsMatchElementCount()
    {
        // Arrange
        var input = new PosTranslationInput("SDBH", "nspmaH", ShortFormat: false);

        // Act
        var result = await PosTranslationService.TranslatePartOfSpeechAsync(
            input,
            CancellationToken.None
        );

        // Assert: "noun masculine plural absolute" = 4 words = 4 components
        Assert.That(result.Success, Is.True);
        Assert.That(result.Components, Is.Not.Null);
        Assert.That(
            result.Components!,
            Has.Count.EqualTo(4),
            "Hebrew 'nspmaH' should have 4 components: noun, masculine, plural, absolute"
        );
    }

    /// <summary>
    /// Greek POS tag components include expected number of elements.
    /// "noun-dans" breaks down into: noun, declinable, accusative, neuter, singular = 5 components.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-056")]
    [Property("BehaviorId", "BHV-610")]
    [Description("Greek POS tag produces components for each grammatical element")]
    public async Task TranslatePartOfSpeech_GreekTag_ComponentsMatchElementCount()
    {
        // Arrange
        var input = new PosTranslationInput("SDBG", "noun-dans", ShortFormat: false);

        // Act
        var result = await PosTranslationService.TranslatePartOfSpeechAsync(
            input,
            CancellationToken.None
        );

        // Assert: "noun declinable accusative neuter singular" = 5 words = 5 components
        Assert.That(result.Success, Is.True);
        Assert.That(result.Components, Is.Not.Null);
        Assert.That(
            result.Components!,
            Has.Count.EqualTo(5),
            "Greek 'noun-dans' should have 5 components: noun, declinable, accusative, neuter, singular"
        );
    }

    // =========================================================================
    // CONTRACT TESTS - Error Cases
    // =========================================================================

    /// <summary>
    /// Invalid dictionary name (not SDBH or SDBG) returns INVALID_INPUT error.
    /// Contract: Section 4.8 Error Conditions.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-055")]
    [Property("BehaviorId", "BHV-610")]
    [Description("Invalid dictionary returns INVALID_INPUT error")]
    public async Task TranslatePartOfSpeech_InvalidDictionary_ReturnsInvalidInputError()
    {
        // Arrange
        var input = new PosTranslationInput("INVALID", "nspmaH", ShortFormat: false);

        // Act
        var result = await PosTranslationService.TranslatePartOfSpeechAsync(
            input,
            CancellationToken.None
        );

        // Assert
        Assert.That(result.Success, Is.False);
        Assert.That(result.Error, Is.Not.Null);
        Assert.That(result.Error!.Code, Is.EqualTo("INVALID_INPUT"));
        Assert.That(
            result.Error.Message,
            Does.Contain("SDBH").Or.Contains("SDBG"),
            "Error message should mention valid dictionary names"
        );
        Assert.That(result.Translation, Is.Null);
        Assert.That(result.Components, Is.Null);
    }

    /// <summary>
    /// Unknown POS tag that cannot be parsed returns PARSE_ERROR.
    /// Contract: Section 4.8 Error Conditions.
    /// Edge case from strategic plan: "Unknown POS tag returns PARSE_ERROR".
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-055")]
    [Property("BehaviorId", "BHV-610")]
    [Description("Unknown POS tag returns PARSE_ERROR")]
    public async Task TranslatePartOfSpeech_UnknownPosTag_ReturnsParseError()
    {
        // Arrange: "zzzzz" is not a valid Hebrew POS tag
        var input = new PosTranslationInput("SDBH", "zzzzz", ShortFormat: false);

        // Act
        var result = await PosTranslationService.TranslatePartOfSpeechAsync(
            input,
            CancellationToken.None
        );

        // Assert
        Assert.That(result.Success, Is.False);
        Assert.That(result.Error, Is.Not.Null);
        Assert.That(result.Error!.Code, Is.EqualTo("PARSE_ERROR"));
        Assert.That(
            result.Error.Message,
            Does.Contain("zzzzz"),
            "Error message should include the unknown POS tag"
        );
    }

    /// <summary>
    /// Empty POS tag returns PARSE_ERROR.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-055")]
    [Property("BehaviorId", "BHV-610")]
    [Description("Empty POS tag returns PARSE_ERROR")]
    public async Task TranslatePartOfSpeech_EmptyPosTag_ReturnsParseError()
    {
        // Arrange
        var input = new PosTranslationInput("SDBG", "", ShortFormat: false);

        // Act
        var result = await PosTranslationService.TranslatePartOfSpeechAsync(
            input,
            CancellationToken.None
        );

        // Assert
        Assert.That(result.Success, Is.False);
        Assert.That(result.Error, Is.Not.Null);
        Assert.That(result.Error!.Code, Is.EqualTo("PARSE_ERROR"));
    }

    /// <summary>
    /// PARSE_ERROR result has correct structure: Success=false, Translation is null,
    /// Components is null, Error is populated.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-055")]
    [Property("BehaviorId", "BHV-610")]
    [Description("Error result has correct structure")]
    public async Task TranslatePartOfSpeech_ErrorResult_HasCorrectStructure()
    {
        // Arrange: Invalid dictionary triggers error
        var input = new PosTranslationInput("DCLEX", "tag", ShortFormat: false);

        // Act
        var result = await PosTranslationService.TranslatePartOfSpeechAsync(
            input,
            CancellationToken.None
        );

        // Assert
        Assert.That(result.Success, Is.False);
        Assert.That(result.Translation, Is.Null, "Translation should be null on error");
        Assert.That(result.Components, Is.Null, "Components should be null on error");
        Assert.That(result.Error, Is.Not.Null, "Error should be populated on failure");
        Assert.That(result.Error!.Code, Is.Not.Null.And.Not.Empty);
        Assert.That(result.Error.Message, Is.Not.Null.And.Not.Empty);
    }

    // =========================================================================
    // GOLDEN MASTER TESTS - Exact PT9 Match
    // =========================================================================

    /// <summary>
    /// GM-013 Hebrew long format: exact PT9 match for "nspmaH".
    /// PT9 Source: PartOfSpeechTranslatorTests.TranslateTag_LongForm("SDBH", "nspmaH", ...)
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("ScenarioId", "TS-055")]
    [Property("BehaviorId", "BHV-610")]
    [Property("GoldenMaster", "GM-013")]
    [Description("GM-013: Hebrew long format matches PT9 PartOfSpeechTranslatorTests")]
    public async Task GoldenMaster_HebrewLongFormat_MatchesPt9()
    {
        // Arrange: GM-013 input parameter "hebrewTag"
        var input = new PosTranslationInput("SDBH", "nspmaH", ShortFormat: false);

        // Act
        var result = await PosTranslationService.TranslatePartOfSpeechAsync(
            input,
            CancellationToken.None
        );

        // Assert: PT9 exact output from PartOfSpeechTranslatorTests.cs line 14
        Assert.That(result.Success, Is.True);
        Assert.That(result.Translation, Is.EqualTo("noun masculine plural absolute"));
    }

    /// <summary>
    /// GM-013 Greek long format: exact PT9 match for "noun-dans".
    /// PT9 Source: PartOfSpeechTranslatorTests.TranslateTag_LongForm("SDBG", "noun-dans", ...)
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("ScenarioId", "TS-056")]
    [Property("BehaviorId", "BHV-610")]
    [Property("GoldenMaster", "GM-013")]
    [Description("GM-013: Greek long format matches PT9 PartOfSpeechTranslatorTests")]
    public async Task GoldenMaster_GreekLongFormat_MatchesPt9()
    {
        // Arrange: GM-013 input parameter "greekTag"
        var input = new PosTranslationInput("SDBG", "noun-dans", ShortFormat: false);

        // Act
        var result = await PosTranslationService.TranslatePartOfSpeechAsync(
            input,
            CancellationToken.None
        );

        // Assert: PT9 exact output from PartOfSpeechTranslatorTests.cs line 15
        Assert.That(result.Success, Is.True);
        Assert.That(result.Translation, Is.EqualTo("noun declinable accusative neuter singular"));
    }

    /// <summary>
    /// GM-013 Greek short format: exact PT9 match for "noun-dans" short.
    /// PT9 Source: PartOfSpeechTranslatorTests.TranslateTag_ShortForm("SDBG", "noun-dans", ...)
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("ScenarioId", "TS-057")]
    [Property("BehaviorId", "BHV-610")]
    [Property("GoldenMaster", "GM-013")]
    [Description("GM-013: Greek short format matches PT9 PartOfSpeechTranslatorTests")]
    public async Task GoldenMaster_GreekShortFormat_MatchesPt9()
    {
        // Arrange: GM-013 input parameter "greekTagShort"
        var input = new PosTranslationInput("SDBG", "noun-dans", ShortFormat: true);

        // Act
        var result = await PosTranslationService.TranslatePartOfSpeechAsync(
            input,
            CancellationToken.None
        );

        // Assert: PT9 exact output from PartOfSpeechTranslatorTests.cs line 22
        Assert.That(result.Success, Is.True);
        Assert.That(result.Translation, Is.EqualTo("n decl acc n sg"));
    }

    /// <summary>
    /// GM-013 Hebrew short format: exact PT9 match for "nspmaH" short.
    /// PT9 Source: PartOfSpeechTranslatorTests.TranslateTag_ShortForm("SDBH", "nspmaH", ...)
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("ScenarioId", "TS-055")]
    [Property("BehaviorId", "BHV-610")]
    [Property("GoldenMaster", "GM-013")]
    [Description("GM-013: Hebrew short format matches PT9 PartOfSpeechTranslatorTests")]
    public async Task GoldenMaster_HebrewShortFormat_MatchesPt9()
    {
        // Arrange
        var input = new PosTranslationInput("SDBH", "nspmaH", ShortFormat: true);

        // Act
        var result = await PosTranslationService.TranslatePartOfSpeechAsync(
            input,
            CancellationToken.None
        );

        // Assert: PT9 exact output from PartOfSpeechTranslatorTests.cs line 21
        Assert.That(result.Success, Is.True);
        Assert.That(result.Translation, Is.EqualTo("n m.pl abs"));
    }

    // =========================================================================
    // PARAMETERIZED TESTS - PT9 Equivalence
    // =========================================================================

    /// <summary>
    /// Parameterized long format test covering all PT9 test vectors.
    /// Each test case is a direct match from PartOfSpeechTranslatorTests.TranslateTag_LongForm.
    /// </summary>
    [TestCase("SDBH", "nspmaH", "noun masculine plural absolute")]
    [TestCase("SDBG", "noun-dans", "noun declinable accusative neuter singular")]
    [Category("Contract")]
    [Property("ScenarioId", "TS-055")]
    [Property("BehaviorId", "BHV-610")]
    [Description("Parameterized long format test from PT9 test vectors")]
    public async Task TranslatePartOfSpeech_LongFormat_MatchesPt9(
        string dictionary,
        string posTag,
        string expectedTranslation
    )
    {
        // Arrange
        var input = new PosTranslationInput(dictionary, posTag, ShortFormat: false);

        // Act
        var result = await PosTranslationService.TranslatePartOfSpeechAsync(
            input,
            CancellationToken.None
        );

        // Assert
        Assert.That(result.Success, Is.True);
        Assert.That(result.Translation, Is.EqualTo(expectedTranslation));
    }

    /// <summary>
    /// Parameterized short format test covering all PT9 test vectors.
    /// Each test case is a direct match from PartOfSpeechTranslatorTests.TranslateTag_ShortForm.
    /// </summary>
    [TestCase("SDBH", "nspmaH", "n m.pl abs")]
    [TestCase("SDBG", "noun-dans", "n decl acc n sg")]
    [Category("Contract")]
    [Property("ScenarioId", "TS-057")]
    [Property("BehaviorId", "BHV-610")]
    [Description("Parameterized short format test from PT9 test vectors")]
    public async Task TranslatePartOfSpeech_ShortFormat_MatchesPt9(
        string dictionary,
        string posTag,
        string expectedTranslation
    )
    {
        // Arrange
        var input = new PosTranslationInput(dictionary, posTag, ShortFormat: true);

        // Act
        var result = await PosTranslationService.TranslatePartOfSpeechAsync(
            input,
            CancellationToken.None
        );

        // Assert
        Assert.That(result.Success, Is.True);
        Assert.That(result.Translation, Is.EqualTo(expectedTranslation));
    }
}

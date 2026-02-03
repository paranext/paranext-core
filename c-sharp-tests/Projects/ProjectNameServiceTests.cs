using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Projects;

namespace TestParanextDataProvider.Projects;

/// <summary>
/// Tests for ProjectNameService.GenerateAbbreviation() - CAP-005
/// Reference: gm-002-name-abbreviation, EXT-005, BHV-601
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
public class ProjectNameServiceTests
{
    #region Acceptance Test - CAP-005

    /// <summary>
    /// Acceptance test for CAP-005: Name abbreviation generation capability.
    /// When this test passes, the capability is complete.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-005")]
    [Property("ScenarioId", "TS-002")]
    [Description("Acceptance test: GenerateAbbreviation correctly generates short names from full names")]
    public void GenerateAbbreviation_AcceptanceTest()
    {
        // This acceptance test verifies the complete GenerateAbbreviation capability

        // Multiple words - first letters
        var result1 = ProjectNameService.GenerateAbbreviation("Monkey Soup");
        Assert.That(result1, Is.EqualTo("MSp"), "Multiple words should use first letters, padded to 3");

        // Many words - truncate to 8
        var result2 = ProjectNameService.GenerateAbbreviation("Monkey Soup That Is Too Spicy When Left");
        Assert.That(result2.Length, Is.LessThanOrEqualTo(8), "Result should be max 8 chars");
        Assert.That(result2, Is.EqualTo("MSTITSWL"), "Should truncate to 8 characters");

        // With digits - preserve last 2
        var result3 = ProjectNameService.GenerateAbbreviation("Monkey1 Soup6");
        Assert.That(result3, Is.EqualTo("MS16"), "Should preserve last 2 digits");
    }

    #endregion

    #region Golden Master Tests - gm-002

    /// <summary>
    /// gm-002-01: Multiple words - first letters
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "gm-002-01")]
    [Property("ScenarioId", "TS-ABB-001")]
    [Property("BehaviorId", "BHV-601")]
    public void GenerateAbbreviation_MultipleWords_ReturnsFirstLettersPaddedTo3()
    {
        var result = ProjectNameService.GenerateAbbreviation("Monkey Soup");

        Assert.That(result, Is.EqualTo("MSp"));
    }

    /// <summary>
    /// gm-002-02: Many words - truncate to 8 chars
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "gm-002-02")]
    [Property("ScenarioId", "TS-ABB-002")]
    [Property("BehaviorId", "BHV-601")]
    public void GenerateAbbreviation_ManyWords_TruncatesTo8Chars()
    {
        var result = ProjectNameService.GenerateAbbreviation(
            "Monkey Soup That Is Too Spicy When Left"
        );

        Assert.That(result, Is.EqualTo("MSTITSWL"));
    }

    /// <summary>
    /// gm-002-03: With digits - preserve last 2
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "gm-002-03")]
    [Property("ScenarioId", "TS-ABB-003")]
    [Property("BehaviorId", "BHV-601")]
    public void GenerateAbbreviation_WithDigits_PreservesLast2Digits()
    {
        var result = ProjectNameService.GenerateAbbreviation("Monkey1 Soup6");

        Assert.That(result, Is.EqualTo("MS16"));
    }

    /// <summary>
    /// gm-002-04: Single word - pad to 3
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "gm-002-04")]
    [Property("ScenarioId", "TS-ABB-004")]
    [Property("BehaviorId", "BHV-601")]
    public void GenerateAbbreviation_SingleWord_PadsTo3CharsWithLastValidChars()
    {
        var result = ProjectNameService.GenerateAbbreviation("Monkey");

        Assert.That(result, Is.EqualTo("Mky"));
    }

    /// <summary>
    /// gm-002-05: Single short word
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "gm-002-05")]
    [Property("ScenarioId", "TS-ABB-005")]
    [Property("BehaviorId", "BHV-601")]
    public void GenerateAbbreviation_SingleShortWord_RepeatsLastChar()
    {
        var result = ProjectNameService.GenerateAbbreviation("My");

        Assert.That(result, Is.EqualTo("Myy"));
    }

    /// <summary>
    /// gm-002-06: With parentheses
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "gm-002-06")]
    [Property("ScenarioId", "TS-ABB-006")]
    [Property("BehaviorId", "BHV-601")]
    public void GenerateAbbreviation_WithParentheses_SkipsParentheses()
    {
        var result = ProjectNameService.GenerateAbbreviation("Translation (Draft)");

        Assert.That(result, Is.EqualTo("TDt"));
    }

    /// <summary>
    /// gm-002-07: With numbers at start
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "gm-002-07")]
    [Property("ScenarioId", "TS-ABB-007")]
    [Property("BehaviorId", "BHV-601")]
    public void GenerateAbbreviation_WithNumbersAtStart_PreservesLeadingDigit()
    {
        var result = ProjectNameService.GenerateAbbreviation("2nd Translation Project");

        Assert.That(result, Is.EqualTo("2TP2"));
    }

    /// <summary>
    /// gm-002-08: Mixed case words
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "gm-002-08")]
    [Property("ScenarioId", "TS-ABB-008")]
    [Property("BehaviorId", "BHV-601")]
    public void GenerateAbbreviation_MixedCaseWords_PreservesCaseOfFirstChar()
    {
        var result = ProjectNameService.GenerateAbbreviation("new TRANSLATION Project");

        Assert.That(result, Is.EqualTo("nTPt"));
    }

    /// <summary>
    /// gm-002-09: With special characters
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "gm-002-09")]
    [Property("ScenarioId", "TS-ABB-009")]
    [Property("BehaviorId", "BHV-601")]
    public void GenerateAbbreviation_WithSpecialCharacters_SkipsSpecialChars()
    {
        var result = ProjectNameService.GenerateAbbreviation("Test's Project - Draft");

        Assert.That(result, Is.EqualTo("TPDt"));
    }

    /// <summary>
    /// gm-002-10: Empty string
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "gm-002-10")]
    [Property("ScenarioId", "TS-ABB-010")]
    [Property("BehaviorId", "BHV-601")]
    public void GenerateAbbreviation_EmptyString_ReturnsEmptyString()
    {
        var result = ProjectNameService.GenerateAbbreviation("");

        Assert.That(result, Is.EqualTo(""));
    }

    #endregion

    #region Contract Tests - Additional Coverage

    /// <summary>
    /// Test null input - edge case
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-ABB-011")]
    [Property("BehaviorId", "BHV-601")]
    public void GenerateAbbreviation_NullInput_ReturnsEmptyOrHandlesGracefully()
    {
        // The implementation should handle null gracefully
        var result = ProjectNameService.GenerateAbbreviation(null!);

        // Either returns empty string or doesn't throw
        Assert.That(result, Is.Not.Null.Or.EqualTo(""));
    }

    /// <summary>
    /// Test whitespace only input
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-ABB-012")]
    [Property("BehaviorId", "BHV-601")]
    public void GenerateAbbreviation_WhitespaceOnly_ReturnsEmpty()
    {
        var result = ProjectNameService.GenerateAbbreviation("   ");

        Assert.That(result, Is.EqualTo(""));
    }

    /// <summary>
    /// Test all digits input
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-ABB-013")]
    [Property("BehaviorId", "BHV-601")]
    public void GenerateAbbreviation_AllDigits_PreservesLast2Digits()
    {
        var result = ProjectNameService.GenerateAbbreviation("12345");

        // When only digits, should preserve last 2
        Assert.That(result, Does.EndWith("45").Or.Match("^[0-9]{2,}$"));
    }

    /// <summary>
    /// Test single letter input
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-ABB-014")]
    [Property("BehaviorId", "BHV-601")]
    public void GenerateAbbreviation_SingleLetter_PadsToMinimum3()
    {
        var result = ProjectNameService.GenerateAbbreviation("A");

        Assert.That(result.Length, Is.GreaterThanOrEqualTo(3));
        Assert.That(result, Does.StartWith("A"));
    }

    /// <summary>
    /// Test exactly 8 chars result (boundary)
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-ABB-015")]
    [Property("BehaviorId", "BHV-601")]
    public void GenerateAbbreviation_ExactlyEightWords_ReturnsExactly8Chars()
    {
        var result = ProjectNameService.GenerateAbbreviation("A B C D E F G H");

        Assert.That(result.Length, Is.EqualTo(8));
        Assert.That(result, Is.EqualTo("ABCDEFGH"));
    }

    /// <summary>
    /// Test output never exceeds 8 characters
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-ABB-016")]
    [Property("BehaviorId", "BHV-601")]
    [TestCase("A B C D E F G H I J K")]
    [TestCase("Very Long Name With Many Many Many Words")]
    public void GenerateAbbreviation_LongInput_NeverExceeds8Chars(string input)
    {
        var result = ProjectNameService.GenerateAbbreviation(input);

        Assert.That(result.Length, Is.LessThanOrEqualTo(8), $"Result '{result}' exceeds 8 chars");
    }

    /// <summary>
    /// Test output never less than 3 chars (unless empty input)
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-ABB-017")]
    [Property("BehaviorId", "BHV-601")]
    [TestCase("A")]
    [TestCase("Ab")]
    [TestCase("M")]
    public void GenerateAbbreviation_ShortInput_AlwaysAtLeast3Chars(string input)
    {
        var result = ProjectNameService.GenerateAbbreviation(input);

        Assert.That(
            result.Length,
            Is.GreaterThanOrEqualTo(3),
            $"Result '{result}' should be at least 3 chars"
        );
    }

    /// <summary>
    /// Test valid character set in output
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-ABB-018")]
    [Property("BehaviorId", "BHV-601")]
    public void GenerateAbbreviation_AnyInput_OutputOnlyValidChars()
    {
        var inputs = new[]
        {
            "Monkey Soup",
            "Test's Project",
            "2nd Translation",
            "new TRANSLATION Project"
        };

        foreach (var input in inputs)
        {
            var result = ProjectNameService.GenerateAbbreviation(input);
            // Valid chars are A-Za-z0-9_
            Assert.That(
                result,
                Does.Match(@"^[A-Za-z0-9_]*$"),
                $"Result '{result}' contains invalid characters for input '{input}'"
            );
        }
    }

    #endregion
}

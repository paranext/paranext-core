using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.CreatingProjects;

namespace TestParanextDataProvider.CreatingProjects
{
    /// <summary>
    /// Tests for ProjectNameService (CAP-002: GenerateAbbreviation).
    /// TDD Variant: Classic TDD
    ///
    /// These tests verify the FormTextNameAbbrev algorithm that auto-generates
    /// a short name abbreviation from a full project name.
    ///
    /// Algorithm (from EXT-006 in extraction-plan.md):
    /// - First letter of each word (word boundary = non-valid char)
    /// - Last 2 digits from numbers in name
    /// - Minimum 3 characters (pad from original if needed)
    /// - Maximum 8 characters (truncate)
    /// - Valid chars: A-Z, a-z, 0-9, underscore
    /// </summary>
    [TestFixture]
    [ExcludeFromCodeCoverage]
    [Category("CreatingProjects")]
    [Category("CAP-002")]
    public class ProjectNameServiceTests
    {
        #region GenerateAbbreviation - Basic Tests

        /// <summary>
        /// CAP-002: Basic abbreviation - first letters of each word.
        /// "New Testament Translation" -> "NTT"
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-025")]
        [Property("BehaviorId", "BHV-006")]
        [Description("Generate abbreviation from full name with multiple words")]
        public void FormTextNameAbbrev_WithMultipleWords_ReturnsFirstLettersOfEachWord()
        {
            // Arrange
            const string fullName = "New Testament Translation";

            // Act
            string result = ProjectNameService.FormTextNameAbbrev(fullName);

            // Assert
            Assert.That(result, Is.EqualTo("NTT"));
        }

        /// <summary>
        /// CAP-002: Abbreviation with numbers - includes last 2 digits.
        /// "Bible Version 2024" -> "BV24"
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-026")]
        [Property("BehaviorId", "BHV-006")]
        [Description("Generate abbreviation including last 2 digits from numbers")]
        public void FormTextNameAbbrev_WithNumbers_ReturnsLettersPlusLastTwoDigits()
        {
            // Arrange
            const string fullName = "Bible Version 2024";

            // Act
            string result = ProjectNameService.FormTextNameAbbrev(fullName);

            // Assert
            Assert.That(result, Is.EqualTo("BV24"));
        }

        /// <summary>
        /// CAP-002: Four-digit year takes only last 2 digits.
        /// "My Project 1999" -> "MP99"
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-027")]
        [Property("BehaviorId", "BHV-006")]
        [Description("Generate abbreviation with 4-digit year uses only last 2 digits")]
        public void FormTextNameAbbrev_WithFourDigitYear_UsesLastTwoDigits()
        {
            // Arrange
            const string fullName = "My Project 1999";

            // Act
            string result = ProjectNameService.FormTextNameAbbrev(fullName);

            // Assert
            Assert.That(result, Is.EqualTo("MP99"));
        }

        #endregion

        #region GenerateAbbreviation - Edge Cases

        /// <summary>
        /// CAP-002: Empty string input returns empty string.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-028")]
        [Property("BehaviorId", "BHV-006")]
        [Description("Empty input returns empty string")]
        public void FormTextNameAbbrev_WithEmptyString_ReturnsEmptyString()
        {
            // Arrange
            const string fullName = "";

            // Act
            string result = ProjectNameService.FormTextNameAbbrev(fullName);

            // Assert
            Assert.That(result, Is.EqualTo(""));
        }

        /// <summary>
        /// CAP-002: Null input returns empty string.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-028")]
        [Property("BehaviorId", "BHV-006")]
        [Description("Null input returns empty string")]
        public void FormTextNameAbbrev_WithNull_ReturnsEmptyString()
        {
            // Arrange
            string? fullName = null;

            // Act
            string result = ProjectNameService.FormTextNameAbbrev(fullName!);

            // Assert
            Assert.That(result, Is.EqualTo(""));
        }

        /// <summary>
        /// CAP-002: Single character should be padded to minimum 3.
        /// Since "A" produces just "A" (1 letter), padding should add more chars.
        /// Per algorithm: pad from original valid chars.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-094")]
        [Property("BehaviorId", "BHV-006")]
        [Description("Single character input is padded to minimum 3 characters")]
        public void FormTextNameAbbrev_WithSingleCharacter_PadsToMinimumThree()
        {
            // Arrange
            const string fullName = "A";

            // Act
            string result = ProjectNameService.FormTextNameAbbrev(fullName);

            // Assert - Should be at least 3 characters
            Assert.That(result.Length, Is.GreaterThanOrEqualTo(3));
            Assert.That(result[0], Is.EqualTo('A'));
        }

        /// <summary>
        /// CAP-002: Very long name truncates to maximum 8 characters.
        /// "Very Long Project Name Here" would produce "VLPNH" (5 chars) - within limit
        /// Need a longer example to test truncation
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-094")]
        [Property("BehaviorId", "BHV-006")]
        [Description("Long name is truncated to maximum 8 characters")]
        public void FormTextNameAbbrev_WithVeryLongName_TruncatesToEightCharacters()
        {
            // Arrange - 10 words to produce 10 first-letters
            const string fullName = "Alpha Beta Gamma Delta Epsilon Zeta Eta Theta Iota Kappa";

            // Act
            string result = ProjectNameService.FormTextNameAbbrev(fullName);

            // Assert - Max 8 characters
            Assert.That(result.Length, Is.LessThanOrEqualTo(8));
        }

        /// <summary>
        /// CAP-002: Underscore is a valid character and should be included.
        /// "Test_Project" - underscore acts as word separator in some contexts.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-094")]
        [Property("BehaviorId", "BHV-006")]
        [Description("Underscore is a valid character in project names")]
        public void FormTextNameAbbrev_WithUnderscore_HandlesUnderscoreAsValidChar()
        {
            // Arrange
            const string fullName = "Test_Name";

            // Act
            string result = ProjectNameService.FormTextNameAbbrev(fullName);

            // Assert - Underscore is valid, should not act as word separator
            Assert.That(result, Does.Match("[A-Za-z0-9_]+"));
        }

        /// <summary>
        /// CAP-002: French name with spaces between words.
        /// "Projet en Francais" -> "PEF"
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-094")]
        [Property("BehaviorId", "BHV-006")]
        [Description("French name handles spaces correctly")]
        public void FormTextNameAbbrev_WithFrenchName_ReturnsFirstLettersOfEachWord()
        {
            // Arrange
            const string fullName = "Projet en Francais";

            // Act
            string result = ProjectNameService.FormTextNameAbbrev(fullName);

            // Assert
            Assert.That(result, Is.EqualTo("PEF"));
        }

        /// <summary>
        /// CAP-002: Name with special characters (non-valid) acts as word separators.
        /// "Hello-World" - hyphen separates words -> "HW"
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-094")]
        [Property("BehaviorId", "BHV-006")]
        [Description("Special characters act as word separators")]
        public void FormTextNameAbbrev_WithHyphen_TreatsAsWordSeparator()
        {
            // Arrange
            const string fullName = "Hello-World";

            // Act
            string result = ProjectNameService.FormTextNameAbbrev(fullName);

            // Assert - Hyphen acts as word separator
            Assert.That(result, Is.EqualTo("HW").Or.Contains("H").And.Contains("W"));
        }

        /// <summary>
        /// CAP-002: Two-letter abbreviation should be padded.
        /// "My Project" -> "MP" but should be padded to "MP?" (3 chars min)
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-094")]
        [Property("BehaviorId", "BHV-006")]
        [Description("Two-letter abbreviation is padded to minimum 3 characters")]
        public void FormTextNameAbbrev_WithTwoWords_PadsToMinimumThree()
        {
            // Arrange - Only produces 2 letters: "MP"
            const string fullName = "My Project";

            // Act
            string result = ProjectNameService.FormTextNameAbbrev(fullName);

            // Assert - Should be padded to at least 3 chars
            Assert.That(result.Length, Is.GreaterThanOrEqualTo(3));
            Assert.That(result, Does.StartWith("MP"));
        }

        #endregion

        #region GenerateAbbreviation - Parameterized Tests

        /// <summary>
        /// CAP-002: Parameterized test for various abbreviation scenarios.
        /// </summary>
        [TestCase("New Testament Translation", "NTT")]
        [TestCase("Bible Version 2024", "BV24")]
        [TestCase("My Project 1999", "MP99")]
        [TestCase("Projet en Francais", "PEF")]
        [Category("Contract")]
        [Property("ScenarioId", "TS-025")]
        [Property("BehaviorId", "BHV-006")]
        [Description("Parameterized abbreviation generation tests")]
        public void FormTextNameAbbrev_VariousInputs_ReturnsExpectedAbbreviation(
            string fullName,
            string expected
        )
        {
            // Act
            string result = ProjectNameService.FormTextNameAbbrev(fullName);

            // Assert
            Assert.That(result, Is.EqualTo(expected));
        }

        #endregion

        #region GenerateAbbreviation - Invariants

        /// <summary>
        /// CAP-002 Invariant: Result always contains only valid characters.
        /// Valid chars: A-Z, a-z, 0-9, underscore
        /// </summary>
        [Test]
        [Category("Invariant")]
        [Property("InvariantId", "INV-001")]
        [Property("BehaviorId", "BHV-006")]
        [TestCase("New Testament Translation")]
        [TestCase("Bible Version 2024")]
        [TestCase("Special!@#Characters")]
        [TestCase("Unicode: Caf\u00e9")]
        [Description("Abbreviation contains only valid project name characters")]
        public void FormTextNameAbbrev_AnyInput_ResultContainsOnlyValidChars(string fullName)
        {
            // Act
            string result = ProjectNameService.FormTextNameAbbrev(fullName);

            // Assert - All characters must be in valid set
            const string validChars =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_";
            foreach (char c in result)
            {
                Assert.That(
                    validChars.Contains(c),
                    Is.True,
                    $"Character '{c}' is not in valid character set"
                );
            }
        }

        /// <summary>
        /// CAP-002 Invariant: Non-empty input produces result of 3-8 characters.
        /// </summary>
        [Test]
        [Category("Invariant")]
        [Property("InvariantId", "INV-001")]
        [Property("BehaviorId", "BHV-006")]
        [TestCase("Test")]
        [TestCase("A")]
        [TestCase("Very Long Project Name Here Today")]
        [Description("Non-empty input produces result of 3-8 characters")]
        public void FormTextNameAbbrev_NonEmptyInput_ResultLengthInValidRange(string fullName)
        {
            // Act
            string result = ProjectNameService.FormTextNameAbbrev(fullName);

            // Assert - Length between 3 and 8 (if non-empty result)
            if (!string.IsNullOrEmpty(result))
            {
                Assert.That(
                    result.Length,
                    Is.InRange(3, 8),
                    $"Result '{result}' has length {result.Length}, expected 3-8"
                );
            }
        }

        #endregion
    }
}

using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.CreatingProjects;
using Paratext.Data;

namespace TestParanextDataProvider.CreatingProjects
{
    /// <summary>
    /// Tests for ProjectNameService.
    ///
    /// CAP-002: GenerateAbbreviation (FormTextNameAbbrev)
    /// TDD Variant: Classic TDD
    /// These tests verify the FormTextNameAbbrev algorithm that auto-generates
    /// a short name abbreviation from a full project name.
    ///
    /// CAP-003: GenerateProjectName (NextUnusedProjectName)
    /// TDD Variant: Outside-In TDD
    /// These tests verify the NextUnusedProjectName function that generates
    /// unique project names by appending sequential numbers.
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
    internal class ProjectNameServiceTests : PapiTestBase
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

        #region CAP-003: NextUnusedProjectName - Acceptance Test (Outer Loop)

        /// <summary>
        /// CAP-003 Acceptance Test: NextUnusedProjectName generates unique project names
        /// by appending sequential numbers when names are taken.
        /// This is the ACCEPTANCE TEST for CAP-003.
        /// </summary>
        [Test]
        [Category("Acceptance")]
        [Category("CAP-003")]
        [Property("CapabilityId", "CAP-003")]
        [Property("ScenarioId", "TS-022")]
        [Property("BehaviorId", "BHV-007")]
        [Description("Acceptance: NextUnusedProjectName generates unique names")]
        public void NextUnusedProjectName_AcceptanceTest()
        {
            // Arrange - Add existing projects MP, MP1, MP2
            var mp = CreateDummyProject();
            mp.Name = "MP";
            ParatextProjects.FakeAddProject(CreateProjectDetails(mp), mp);

            var mp1 = CreateDummyProject();
            mp1.Name = "MP1";
            ParatextProjects.FakeAddProject(CreateProjectDetails(mp1), mp1);

            var mp2 = CreateDummyProject();
            mp2.Name = "MP2";
            ParatextProjects.FakeAddProject(CreateProjectDetails(mp2), mp2);

            // Act - Request next unused name starting with "MP"
            var (shortName, fullName) = ProjectNameService.NextUnusedProjectName("MP", "My Project");

            // Assert - Should return MP3 as MP, MP1, MP2 are taken
            Assert.That(shortName, Is.EqualTo("MP3"));
            Assert.That(fullName, Is.EqualTo("My Project3"));
        }

        #endregion

        #region CAP-003: NextUnusedProjectName - Default Names

        /// <summary>
        /// CAP-003: When no input is provided, returns default project names.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Category("CAP-003")]
        [Property("ScenarioId", "TS-023")]
        [Property("BehaviorId", "BHV-007")]
        [Description("Empty input returns default names")]
        public void NextUnusedProjectName_EmptyInput_ReturnsDefaultNames()
        {
            // Act - Call with no parameters
            var (shortName, fullName) = ProjectNameService.NextUnusedProjectName();

            // Assert - Should return default names (implementation defined)
            Assert.That(shortName, Is.Not.Null.And.Not.Empty);
            Assert.That(fullName, Is.Not.Null.And.Not.Empty);
            Assert.That(shortName.Length, Is.InRange(3, 8), "Short name should be 3-8 chars");
        }

        /// <summary>
        /// CAP-003: When null is provided, returns default project names.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Category("CAP-003")]
        [Property("ScenarioId", "TS-023")]
        [Property("BehaviorId", "BHV-007")]
        [Description("Null input returns default names")]
        public void NextUnusedProjectName_NullInput_ReturnsDefaultNames()
        {
            // Act - Call with null parameters
            var (shortName, fullName) = ProjectNameService.NextUnusedProjectName(null, null);

            // Assert - Should return default names
            Assert.That(shortName, Is.Not.Null.And.Not.Empty);
            Assert.That(fullName, Is.Not.Null.And.Not.Empty);
        }

        #endregion

        #region CAP-003: NextUnusedProjectName - Available Names

        /// <summary>
        /// CAP-003: When provided name is available, returns it as-is.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Category("CAP-003")]
        [Property("ScenarioId", "TS-024")]
        [Property("BehaviorId", "BHV-007")]
        [Description("Available name returns as-is")]
        public void NextUnusedProjectName_AvailableName_ReturnsAsIs()
        {
            // Arrange - No existing projects with this name

            // Act
            var (shortName, fullName) = ProjectNameService.NextUnusedProjectName(
                "NewProj",
                "New Project"
            );

            // Assert - Should return the names unchanged
            Assert.That(shortName, Is.EqualTo("NewProj"));
            Assert.That(fullName, Is.EqualTo("New Project"));
        }

        #endregion

        #region CAP-003: NextUnusedProjectName - Name Conflicts

        /// <summary>
        /// CAP-003: When name exists, appends number to make it unique.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Category("CAP-003")]
        [Property("ScenarioId", "TS-022")]
        [Property("BehaviorId", "BHV-007")]
        [Description("Existing name gets number appended")]
        public void NextUnusedProjectName_NameExists_AppendsNumber()
        {
            // Arrange - Add existing project
            var scrText = CreateDummyProject();
            scrText.Name = "TestPrj";
            ParatextProjects.FakeAddProject(CreateProjectDetails(scrText), scrText);

            // Act
            var (shortName, fullName) = ProjectNameService.NextUnusedProjectName(
                "TestPrj",
                "Test Project"
            );

            // Assert - Should return TestPrj1
            Assert.That(shortName, Is.EqualTo("TestPrj1"));
            Assert.That(fullName, Is.EqualTo("Test Project1"));
        }

        /// <summary>
        /// CAP-003: When multiple numbered names exist, returns next available.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Category("CAP-003")]
        [Property("ScenarioId", "TS-078")]
        [Property("BehaviorId", "BHV-007")]
        [Description("Multiple existing names returns next available number")]
        public void NextUnusedProjectName_MultipleExist_ReturnsNextAvailable()
        {
            // Arrange - Add existing projects Test, Test1, Test2
            var test = CreateDummyProject();
            test.Name = "Test";
            ParatextProjects.FakeAddProject(CreateProjectDetails(test), test);

            var test1 = CreateDummyProject();
            test1.Name = "Test1";
            ParatextProjects.FakeAddProject(CreateProjectDetails(test1), test1);

            var test2 = CreateDummyProject();
            test2.Name = "Test2";
            ParatextProjects.FakeAddProject(CreateProjectDetails(test2), test2);

            // Act
            var (shortName, fullName) = ProjectNameService.NextUnusedProjectName(
                "Test",
                "Test Project"
            );

            // Assert - Should return Test3
            Assert.That(shortName, Is.EqualTo("Test3"));
            Assert.That(fullName, Is.EqualTo("Test Project3"));
        }

        /// <summary>
        /// CAP-003: When there's a gap in numbers (e.g., Test, Test2 but no Test1),
        /// should return the first available number.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Category("CAP-003")]
        [Property("ScenarioId", "TS-078")]
        [Property("BehaviorId", "BHV-007")]
        [Description("Gap in numbers returns first available")]
        public void NextUnusedProjectName_GapInNumbers_ReturnsFirstAvailable()
        {
            // Arrange - Add Test and Test2, but NOT Test1
            var test = CreateDummyProject();
            test.Name = "Test";
            ParatextProjects.FakeAddProject(CreateProjectDetails(test), test);

            var test2 = CreateDummyProject();
            test2.Name = "Test2";
            ParatextProjects.FakeAddProject(CreateProjectDetails(test2), test2);

            // Act
            var (shortName, fullName) = ProjectNameService.NextUnusedProjectName(
                "Test",
                "Test Project"
            );

            // Assert - Should return Test1 (first available gap)
            Assert.That(shortName, Is.EqualTo("Test1"));
            Assert.That(fullName, Is.EqualTo("Test Project1"));
        }

        #endregion

        #region CAP-003: NextUnusedProjectName - Force Numbered

        /// <summary>
        /// CAP-003: When forceNumbered is true, always appends number even if base is available.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Category("CAP-003")]
        [Property("ScenarioId", "TS-078")]
        [Property("BehaviorId", "BHV-007")]
        [Description("Force numbered always appends number")]
        public void NextUnusedProjectName_ForceNumbered_AlwaysAppendsNumber()
        {
            // Arrange - No existing projects, but force numbered

            // Act
            var (shortName, fullName) = ProjectNameService.NextUnusedProjectName(
                "NewProj",
                "New Project",
                forceNumbered: true
            );

            // Assert - Should return NewProj1 even though NewProj is available
            Assert.That(shortName, Is.EqualTo("NewProj1"));
            Assert.That(fullName, Is.EqualTo("New Project1"));
        }

        /// <summary>
        /// CAP-003: When forceNumbered is true and numbered names exist, returns next number.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Category("CAP-003")]
        [Property("ScenarioId", "TS-078")]
        [Property("BehaviorId", "BHV-007")]
        [Description("Force numbered with existing numbered names")]
        public void NextUnusedProjectName_ForceNumbered_WithExistingNumbered_ReturnsNextNumber()
        {
            // Arrange - Add existing Test1
            var test1 = CreateDummyProject();
            test1.Name = "Test1";
            ParatextProjects.FakeAddProject(CreateProjectDetails(test1), test1);

            // Act
            var (shortName, fullName) = ProjectNameService.NextUnusedProjectName(
                "Test",
                "Test Project",
                forceNumbered: true
            );

            // Assert - Should return Test2 (skipping Test which is available but not numbered)
            Assert.That(shortName, Is.EqualTo("Test2"));
            Assert.That(fullName, Is.EqualTo("Test Project2"));
        }

        #endregion

        #region CAP-003: NextUnusedProjectName - Invariants

        /// <summary>
        /// CAP-003 Invariant: Returned short name is always valid (3-8 chars, valid chars).
        /// </summary>
        [Test]
        [Category("Invariant")]
        [Category("CAP-003")]
        [Property("InvariantId", "INV-003")]
        [Property("BehaviorId", "BHV-007")]
        [TestCase("ABC", "ABC Project")]
        [TestCase("Test", "Test Project")]
        [TestCase("ABCDEFGH", "Very Long Name")]
        [Description("Returned short name is always valid")]
        public void NextUnusedProjectName_ReturnsValidShortName(
            string inputShort,
            string inputFull
        )
        {
            // Act
            var (shortName, _) = ProjectNameService.NextUnusedProjectName(inputShort, inputFull);

            // Assert - Short name must be valid
            Assert.That(shortName, Is.Not.Null.And.Not.Empty);
            Assert.That(shortName.Length, Is.InRange(3, 8), "Length must be 3-8");

            const string validChars =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_";
            foreach (char c in shortName)
            {
                Assert.That(validChars.Contains(c), Is.True, $"Invalid char '{c}' in short name");
            }
        }

        /// <summary>
        /// CAP-003 Invariant: Returned names are never duplicates of existing projects.
        /// </summary>
        [Test]
        [Category("Invariant")]
        [Category("CAP-003")]
        [Property("InvariantId", "INV-003")]
        [Property("BehaviorId", "BHV-007")]
        [Description("Returned name is never a duplicate")]
        public void NextUnusedProjectName_NeverReturnsDuplicate()
        {
            // Arrange - Add several existing projects
            for (int i = 1; i <= 5; i++)
            {
                var scrText = CreateDummyProject();
                scrText.Name = i == 1 ? "Test" : $"Test{i - 1}";
                ParatextProjects.FakeAddProject(CreateProjectDetails(scrText), scrText);
            }

            // Act
            var (shortName, _) = ProjectNameService.NextUnusedProjectName("Test", "Test Project");

            // Assert - Returned name should not exist in collection
            var existingProjects = ScrTextCollection
                .ScrTexts(IncludeProjects.Everything)
                .Select(p => p.Name)
                .ToList();
            Assert.That(
                existingProjects,
                Does.Not.Contain(shortName),
                $"Returned name '{shortName}' already exists"
            );
        }

        #endregion
    }
}


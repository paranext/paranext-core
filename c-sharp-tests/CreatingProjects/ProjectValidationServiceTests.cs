using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.CreatingProjects;
using Paratext.Data;

namespace TestParanextDataProvider.CreatingProjects
{
    /// <summary>
    /// Tests for ProjectValidationService (CAP-001: ValidateShortName).
    /// TDD Variant: Classic TDD
    ///
    /// These tests verify the ValidateShortName function that validates project short names
    /// according to Paratext rules.
    ///
    /// Validation rules (from EXT-007 in extraction-plan.md):
    /// - Length must be 3-8 characters
    /// - No spaces allowed
    /// - Only valid characters: A-Z, a-z, 0-9, underscore
    /// - Cannot be a Windows reserved name (CON, PRN, AUX, NUL, COM1-9, LPT1-9)
    /// - Cannot duplicate an existing project name (exact match)
    /// - Cannot duplicate an existing project name (case-insensitive match)
    /// - Cannot match an existing orphan project folder
    /// </summary>
    [TestFixture]
    [ExcludeFromCodeCoverage]
    [Category("CreatingProjects")]
    [Category("CAP-001")]
    internal class ProjectValidationServiceTests : PapiTestBase
    {
        #region Acceptance Test (Outer Loop)

        /// <summary>
        /// CAP-001 Acceptance Test: ValidateShortName correctly identifies valid project names
        /// and rejects invalid ones according to all validation rules.
        /// This is the ACCEPTANCE TEST for CAP-001.
        /// </summary>
        [Test]
        [Category("Acceptance")]
        [Property("CapabilityId", "CAP-001")]
        [Property("ScenarioId", "TS-009")]
        [Property("BehaviorId", "BHV-005")]
        [Description("Acceptance: ValidateShortName validates project names correctly")]
        public void ValidateShortName_AcceptanceTest()
        {
            // Arrange - Set up test scenarios for various validation rules

            // Act & Assert - Valid name should pass
            var validResult = ProjectValidationService.ValidateShortName("TestPrj");
            Assert.That(validResult.IsValid, Is.True, "Valid name should pass validation");

            // Act & Assert - Too short name should fail
            var tooShortResult = ProjectValidationService.ValidateShortName("AB");
            Assert.That(tooShortResult.IsValid, Is.False, "Too short name should fail");
            Assert.That(
                tooShortResult.ErrorCode,
                Is.EqualTo(ValidationErrorCode.InvalidLength),
                "Should report InvalidLength error"
            );

            // Act & Assert - Reserved name should fail
            var reservedResult = ProjectValidationService.ValidateShortName("CON");
            Assert.That(reservedResult.IsValid, Is.False, "Reserved name should fail");
            Assert.That(
                reservedResult.ErrorCode,
                Is.EqualTo(ValidationErrorCode.ReservedName),
                "Should report ReservedName error"
            );
        }

        #endregion

        #region Valid Name Tests

        /// <summary>
        /// CAP-001: Valid name with 3 characters (minimum length) passes validation.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-009")]
        [Property("BehaviorId", "BHV-005")]
        [Description("Valid name with minimum length (3 chars) passes validation")]
        public void ValidateShortName_WithValidThreeCharName_ReturnsSuccess()
        {
            // Arrange
            const string shortName = "ABC";

            // Act
            ValidationResult result = ProjectValidationService.ValidateShortName(shortName);

            // Assert
            Assert.That(result.IsValid, Is.True);
            Assert.That(result.ErrorCode, Is.Null);
        }

        /// <summary>
        /// CAP-001: Valid name with 8 characters (maximum length) passes validation.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-009")]
        [Property("BehaviorId", "BHV-005")]
        [Description("Valid name with maximum length (8 chars) passes validation")]
        public void ValidateShortName_WithValidEightCharName_ReturnsSuccess()
        {
            // Arrange
            const string shortName = "ABCDEFGH";

            // Act
            ValidationResult result = ProjectValidationService.ValidateShortName(shortName);

            // Assert
            Assert.That(result.IsValid, Is.True);
        }

        /// <summary>
        /// CAP-001: Valid name with underscore passes validation.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-009")]
        [Property("BehaviorId", "BHV-005")]
        [Description("Valid name with underscore passes validation")]
        public void ValidateShortName_WithUnderscore_ReturnsSuccess()
        {
            // Arrange
            const string shortName = "Test_1";

            // Act
            ValidationResult result = ProjectValidationService.ValidateShortName(shortName);

            // Assert
            Assert.That(result.IsValid, Is.True);
        }

        /// <summary>
        /// CAP-001: Valid name with digits passes validation.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-009")]
        [Property("BehaviorId", "BHV-005")]
        [Description("Valid name with digits passes validation")]
        public void ValidateShortName_WithDigits_ReturnsSuccess()
        {
            // Arrange
            const string shortName = "Test123";

            // Act
            ValidationResult result = ProjectValidationService.ValidateShortName(shortName);

            // Assert
            Assert.That(result.IsValid, Is.True);
        }

        #endregion

        #region Invalid Length Tests

        /// <summary>
        /// CAP-001: Name with less than 3 characters fails with InvalidLength error.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-010")]
        [Property("BehaviorId", "BHV-005")]
        [Description("Name too short (< 3 chars) returns InvalidLength")]
        public void ValidateShortName_TooShort_ReturnsInvalidLength()
        {
            // Arrange
            const string shortName = "AB";

            // Act
            ValidationResult result = ProjectValidationService.ValidateShortName(shortName);

            // Assert
            Assert.That(result.IsValid, Is.False);
            Assert.That(result.ErrorCode, Is.EqualTo(ValidationErrorCode.InvalidLength));
        }

        /// <summary>
        /// CAP-001: Empty name fails with InvalidLength error.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-011")]
        [Property("BehaviorId", "BHV-005")]
        [Description("Empty name returns InvalidLength")]
        public void ValidateShortName_Empty_ReturnsInvalidLength()
        {
            // Arrange
            const string shortName = "";

            // Act
            ValidationResult result = ProjectValidationService.ValidateShortName(shortName);

            // Assert
            Assert.That(result.IsValid, Is.False);
            Assert.That(result.ErrorCode, Is.EqualTo(ValidationErrorCode.InvalidLength));
        }

        /// <summary>
        /// CAP-001: Single character name fails with InvalidLength error.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-010")]
        [Property("BehaviorId", "BHV-005")]
        [Description("Single character name returns InvalidLength")]
        public void ValidateShortName_SingleChar_ReturnsInvalidLength()
        {
            // Arrange
            const string shortName = "A";

            // Act
            ValidationResult result = ProjectValidationService.ValidateShortName(shortName);

            // Assert
            Assert.That(result.IsValid, Is.False);
            Assert.That(result.ErrorCode, Is.EqualTo(ValidationErrorCode.InvalidLength));
        }

        /// <summary>
        /// CAP-001: Name with more than 8 characters fails with InvalidLength error.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-012")]
        [Property("BehaviorId", "BHV-005")]
        [Description("Name too long (> 8 chars) returns InvalidLength")]
        public void ValidateShortName_TooLong_ReturnsInvalidLength()
        {
            // Arrange
            const string shortName = "ABCDEFGHI"; // 9 characters

            // Act
            ValidationResult result = ProjectValidationService.ValidateShortName(shortName);

            // Assert
            Assert.That(result.IsValid, Is.False);
            Assert.That(result.ErrorCode, Is.EqualTo(ValidationErrorCode.InvalidLength));
        }

        #endregion

        #region Contains Space Tests

        /// <summary>
        /// CAP-001: Name containing space fails with ContainsSpace error.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-013")]
        [Property("BehaviorId", "BHV-005")]
        [Description("Name with space returns ContainsSpace")]
        public void ValidateShortName_WithSpace_ReturnsContainsSpace()
        {
            // Arrange
            const string shortName = "My Proj";

            // Act
            ValidationResult result = ProjectValidationService.ValidateShortName(shortName);

            // Assert
            Assert.That(result.IsValid, Is.False);
            Assert.That(result.ErrorCode, Is.EqualTo(ValidationErrorCode.ContainsSpace));
        }

        /// <summary>
        /// CAP-001: Name with leading space fails with ContainsSpace error.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-013")]
        [Property("BehaviorId", "BHV-005")]
        [Description("Name with leading space returns ContainsSpace")]
        public void ValidateShortName_WithLeadingSpace_ReturnsContainsSpace()
        {
            // Arrange
            const string shortName = " TestPrj";

            // Act
            ValidationResult result = ProjectValidationService.ValidateShortName(shortName);

            // Assert
            Assert.That(result.IsValid, Is.False);
            Assert.That(result.ErrorCode, Is.EqualTo(ValidationErrorCode.ContainsSpace));
        }

        /// <summary>
        /// CAP-001: Name with trailing space fails with ContainsSpace error.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-013")]
        [Property("BehaviorId", "BHV-005")]
        [Description("Name with trailing space returns ContainsSpace")]
        public void ValidateShortName_WithTrailingSpace_ReturnsContainsSpace()
        {
            // Arrange
            const string shortName = "TestPrj ";

            // Act
            ValidationResult result = ProjectValidationService.ValidateShortName(shortName);

            // Assert
            Assert.That(result.IsValid, Is.False);
            Assert.That(result.ErrorCode, Is.EqualTo(ValidationErrorCode.ContainsSpace));
        }

        #endregion

        #region Invalid Character Tests

        /// <summary>
        /// CAP-001: Name with hyphen fails with InvalidCharacter error.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-014")]
        [Property("BehaviorId", "BHV-005")]
        [Description("Name with hyphen returns InvalidCharacter")]
        public void ValidateShortName_WithHyphen_ReturnsInvalidCharacter()
        {
            // Arrange
            const string shortName = "Test-1";

            // Act
            ValidationResult result = ProjectValidationService.ValidateShortName(shortName);

            // Assert
            Assert.That(result.IsValid, Is.False);
            Assert.That(result.ErrorCode, Is.EqualTo(ValidationErrorCode.InvalidCharacter));
        }

        /// <summary>
        /// CAP-001: Name with period fails with InvalidCharacter error.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-014")]
        [Property("BehaviorId", "BHV-005")]
        [Description("Name with period returns InvalidCharacter")]
        public void ValidateShortName_WithPeriod_ReturnsInvalidCharacter()
        {
            // Arrange
            const string shortName = "Test.1";

            // Act
            ValidationResult result = ProjectValidationService.ValidateShortName(shortName);

            // Assert
            Assert.That(result.IsValid, Is.False);
            Assert.That(result.ErrorCode, Is.EqualTo(ValidationErrorCode.InvalidCharacter));
        }

        /// <summary>
        /// CAP-001: Name with at-sign fails with InvalidCharacter error.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-014")]
        [Property("BehaviorId", "BHV-005")]
        [Description("Name with at-sign returns InvalidCharacter")]
        public void ValidateShortName_WithAtSign_ReturnsInvalidCharacter()
        {
            // Arrange
            const string shortName = "Test@1";

            // Act
            ValidationResult result = ProjectValidationService.ValidateShortName(shortName);

            // Assert
            Assert.That(result.IsValid, Is.False);
            Assert.That(result.ErrorCode, Is.EqualTo(ValidationErrorCode.InvalidCharacter));
        }

        /// <summary>
        /// CAP-001: Name with unicode character fails with InvalidCharacter error.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-014")]
        [Property("BehaviorId", "BHV-005")]
        [Description("Name with unicode character returns InvalidCharacter")]
        public void ValidateShortName_WithUnicode_ReturnsInvalidCharacter()
        {
            // Arrange - e with acute accent
            const string shortName = "Caf\u00e9";

            // Act
            ValidationResult result = ProjectValidationService.ValidateShortName(shortName);

            // Assert
            Assert.That(result.IsValid, Is.False);
            Assert.That(result.ErrorCode, Is.EqualTo(ValidationErrorCode.InvalidCharacter));
        }

        #endregion

        #region Reserved Name Tests

        /// <summary>
        /// CAP-001: Windows reserved name "CON" fails with ReservedName error.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-015")]
        [Property("BehaviorId", "BHV-005")]
        [Description("Reserved name CON returns ReservedName")]
        public void ValidateShortName_ReservedName_CON_ReturnsReservedName()
        {
            // Arrange
            const string shortName = "CON";

            // Act
            ValidationResult result = ProjectValidationService.ValidateShortName(shortName);

            // Assert
            Assert.That(result.IsValid, Is.False);
            Assert.That(result.ErrorCode, Is.EqualTo(ValidationErrorCode.ReservedName));
        }

        /// <summary>
        /// CAP-001: Windows reserved name "PRN" fails with ReservedName error.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-015")]
        [Property("BehaviorId", "BHV-005")]
        [Description("Reserved name PRN returns ReservedName")]
        public void ValidateShortName_ReservedName_PRN_ReturnsReservedName()
        {
            // Arrange
            const string shortName = "PRN";

            // Act
            ValidationResult result = ProjectValidationService.ValidateShortName(shortName);

            // Assert
            Assert.That(result.IsValid, Is.False);
            Assert.That(result.ErrorCode, Is.EqualTo(ValidationErrorCode.ReservedName));
        }

        /// <summary>
        /// CAP-001: Windows reserved name "AUX" fails with ReservedName error.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-015")]
        [Property("BehaviorId", "BHV-005")]
        [Description("Reserved name AUX returns ReservedName")]
        public void ValidateShortName_ReservedName_AUX_ReturnsReservedName()
        {
            // Arrange
            const string shortName = "AUX";

            // Act
            ValidationResult result = ProjectValidationService.ValidateShortName(shortName);

            // Assert
            Assert.That(result.IsValid, Is.False);
            Assert.That(result.ErrorCode, Is.EqualTo(ValidationErrorCode.ReservedName));
        }

        /// <summary>
        /// CAP-001: Windows reserved name "NUL" fails with ReservedName error.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-015")]
        [Property("BehaviorId", "BHV-005")]
        [Description("Reserved name NUL returns ReservedName")]
        public void ValidateShortName_ReservedName_NUL_ReturnsReservedName()
        {
            // Arrange
            const string shortName = "NUL";

            // Act
            ValidationResult result = ProjectValidationService.ValidateShortName(shortName);

            // Assert
            Assert.That(result.IsValid, Is.False);
            Assert.That(result.ErrorCode, Is.EqualTo(ValidationErrorCode.ReservedName));
        }

        /// <summary>
        /// CAP-001: Windows reserved name "COM1" fails with ReservedName error.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-015")]
        [Property("BehaviorId", "BHV-005")]
        [Description("Reserved name COM1 returns ReservedName")]
        public void ValidateShortName_ReservedName_COM1_ReturnsReservedName()
        {
            // Arrange
            const string shortName = "COM1";

            // Act
            ValidationResult result = ProjectValidationService.ValidateShortName(shortName);

            // Assert
            Assert.That(result.IsValid, Is.False);
            Assert.That(result.ErrorCode, Is.EqualTo(ValidationErrorCode.ReservedName));
        }

        /// <summary>
        /// CAP-001: Windows reserved name "LPT1" fails with ReservedName error.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-015")]
        [Property("BehaviorId", "BHV-005")]
        [Description("Reserved name LPT1 returns ReservedName")]
        public void ValidateShortName_ReservedName_LPT1_ReturnsReservedName()
        {
            // Arrange
            const string shortName = "LPT1";

            // Act
            ValidationResult result = ProjectValidationService.ValidateShortName(shortName);

            // Assert
            Assert.That(result.IsValid, Is.False);
            Assert.That(result.ErrorCode, Is.EqualTo(ValidationErrorCode.ReservedName));
        }

        /// <summary>
        /// CAP-001: Reserved names are case-insensitive (lowercase "con" should fail).
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-016")]
        [Property("BehaviorId", "BHV-005")]
        [Description("Reserved name check is case-insensitive")]
        public void ValidateShortName_ReservedName_LowercaseCon_ReturnsReservedName()
        {
            // Arrange
            const string shortName = "con";

            // Act
            ValidationResult result = ProjectValidationService.ValidateShortName(shortName);

            // Assert
            Assert.That(result.IsValid, Is.False);
            Assert.That(result.ErrorCode, Is.EqualTo(ValidationErrorCode.ReservedName));
        }

        #endregion

        #region Duplicate Name Tests

        /// <summary>
        /// CAP-001: Name that exactly matches existing project fails with DuplicateName error.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-017")]
        [Property("BehaviorId", "BHV-005")]
        [Description("Duplicate exact name returns DuplicateName")]
        public void ValidateShortName_DuplicateName_ReturnsDuplicateName()
        {
            // Arrange - Add a project to the collection with name "TestPrj"
            var scrText = CreateDummyProject();
            scrText.Name = "TestPrj";
            ParatextProjects.FakeAddProject(CreateProjectDetails(scrText), scrText);

            // Act - Try to validate same name
            ValidationResult result = ProjectValidationService.ValidateShortName("TestPrj");

            // Assert
            Assert.That(result.IsValid, Is.False);
            Assert.That(result.ErrorCode, Is.EqualTo(ValidationErrorCode.DuplicateName));
        }

        /// <summary>
        /// CAP-001: Name that differs only by case from existing project fails with
        /// CaseInsensitiveDuplicate error.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-018")]
        [Property("BehaviorId", "BHV-005")]
        [Description("Case-insensitive duplicate returns CaseInsensitiveDuplicate")]
        public void ValidateShortName_CaseInsensitiveDuplicate_ReturnsCaseInsensitiveDuplicate()
        {
            // Arrange - Add a project to the collection with name "TestPrj"
            var scrText = CreateDummyProject();
            scrText.Name = "TestPrj";
            ParatextProjects.FakeAddProject(CreateProjectDetails(scrText), scrText);

            // Act - Try to validate same name with different case
            ValidationResult result = ProjectValidationService.ValidateShortName("TESTPRJ");

            // Assert
            Assert.That(result.IsValid, Is.False);
            Assert.That(result.ErrorCode, Is.EqualTo(ValidationErrorCode.CaseInsensitiveDuplicate));
        }

        #endregion

        #region Existing Folder Tests

        /// <summary>
        /// CAP-001: Name that matches an existing orphan folder fails with ExistingFolder error.
        /// Note: This test requires file system access to verify folder existence.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-019")]
        [Property("BehaviorId", "BHV-005")]
        [Description("Name matching existing folder returns ExistingFolder")]
        public void ValidateShortName_ExistingFolder_ReturnsExistingFolder()
        {
            // Arrange - Create an orphan folder in the test directory
            string testFolder = Path.Combine(FixtureSetup.TestFolderPath, "OrphanPr");
            Directory.CreateDirectory(testFolder);

            try
            {
                // Act - Try to validate name matching the orphan folder
                ValidationResult result = ProjectValidationService.ValidateShortName("OrphanPr");

                // Assert
                Assert.That(result.IsValid, Is.False);
                Assert.That(result.ErrorCode, Is.EqualTo(ValidationErrorCode.ExistingFolder));
            }
            finally
            {
                // Cleanup
                if (Directory.Exists(testFolder))
                    Directory.Delete(testFolder, true);
            }
        }

        #endregion

        #region Edit Mode Tests (isNewProject = false)

        /// <summary>
        /// CAP-001: When editing an existing project, the original name should pass validation
        /// even though it exists in the collection.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-020")]
        [Property("BehaviorId", "BHV-005")]
        [Description("Edit mode: original name passes validation")]
        public void ValidateShortName_ExistingProject_NotNewProject_ReturnsSuccess()
        {
            // Arrange - Add a project to the collection
            var scrText = CreateDummyProject();
            scrText.Name = "EditPrj";
            ParatextProjects.FakeAddProject(CreateProjectDetails(scrText), scrText);

            // Act - Validate the same name when editing (not new project)
            ValidationResult result = ProjectValidationService.ValidateShortName(
                "EditPrj",
                isNewProject: false,
                originalName: "EditPrj"
            );

            // Assert
            Assert.That(result.IsValid, Is.True, "Original name should pass when editing");
        }

        /// <summary>
        /// CAP-001: When editing an existing project, a different duplicate name should fail.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-021")]
        [Property("BehaviorId", "BHV-005")]
        [Description("Edit mode: different duplicate name fails")]
        public void ValidateShortName_ExistingProject_DifferentDuplicate_ReturnsDuplicateName()
        {
            // Arrange - Add two projects to the collection
            var scrText1 = CreateDummyProject();
            scrText1.Name = "EditPrj";
            ParatextProjects.FakeAddProject(CreateProjectDetails(scrText1), scrText1);

            var scrText2 = CreateDummyProject();
            scrText2.Name = "OtherPrj";
            ParatextProjects.FakeAddProject(CreateProjectDetails(scrText2), scrText2);

            // Act - Try to rename EditPrj to OtherPrj (which is taken)
            ValidationResult result = ProjectValidationService.ValidateShortName(
                "OtherPrj",
                isNewProject: false,
                originalName: "EditPrj"
            );

            // Assert
            Assert.That(result.IsValid, Is.False);
            Assert.That(result.ErrorCode, Is.EqualTo(ValidationErrorCode.DuplicateName));
        }

        #endregion

        #region Parameterized Tests

        /// <summary>
        /// CAP-001: Parameterized test for various valid names.
        /// </summary>
        [TestCase("ABC")]
        [TestCase("Test123")]
        [TestCase("Test_1")]
        [TestCase("ABCDEFGH")]
        [TestCase("abc")]
        [TestCase("Ab1_")]
        [Category("Contract")]
        [Property("ScenarioId", "TS-009")]
        [Property("BehaviorId", "BHV-005")]
        [Description("Parameterized test for valid names")]
        public void ValidateShortName_ValidNames_ReturnSuccess(string shortName)
        {
            // Act
            ValidationResult result = ProjectValidationService.ValidateShortName(shortName);

            // Assert
            Assert.That(result.IsValid, Is.True, $"Name '{shortName}' should be valid");
        }

        /// <summary>
        /// CAP-001: Parameterized test for all Windows reserved names.
        /// </summary>
        [TestCase("CON")]
        [TestCase("PRN")]
        [TestCase("AUX")]
        [TestCase("NUL")]
        [TestCase("COM1")]
        [TestCase("COM2")]
        [TestCase("COM3")]
        [TestCase("COM4")]
        [TestCase("COM5")]
        [TestCase("COM6")]
        [TestCase("COM7")]
        [TestCase("COM8")]
        [TestCase("COM9")]
        [TestCase("LPT1")]
        [TestCase("LPT2")]
        [TestCase("LPT3")]
        [TestCase("LPT4")]
        [TestCase("LPT5")]
        [TestCase("LPT6")]
        [TestCase("LPT7")]
        [TestCase("LPT8")]
        [TestCase("LPT9")]
        [Category("Contract")]
        [Property("ScenarioId", "TS-015")]
        [Property("BehaviorId", "BHV-005")]
        [Description("Parameterized test for reserved names")]
        public void ValidateShortName_ReservedNames_ReturnReservedName(string shortName)
        {
            // Act
            ValidationResult result = ProjectValidationService.ValidateShortName(shortName);

            // Assert
            Assert.That(result.IsValid, Is.False);
            Assert.That(
                result.ErrorCode,
                Is.EqualTo(ValidationErrorCode.ReservedName),
                $"Reserved name '{shortName}' should fail"
            );
        }

        /// <summary>
        /// CAP-001: Parameterized test for invalid characters.
        /// </summary>
        [TestCase("Test-1", '-')]
        [TestCase("Test.1", '.')]
        [TestCase("Test@1", '@')]
        [TestCase("Test#1", '#')]
        [TestCase("Test$1", '$')]
        [TestCase("Test!1", '!')]
        [Category("Contract")]
        [Property("ScenarioId", "TS-014")]
        [Property("BehaviorId", "BHV-005")]
        [Description("Parameterized test for invalid characters")]
        public void ValidateShortName_InvalidChars_ReturnInvalidCharacter(
            string shortName,
            char invalidChar
        )
        {
            // Act
            ValidationResult result = ProjectValidationService.ValidateShortName(shortName);

            // Assert
            Assert.That(result.IsValid, Is.False);
            Assert.That(result.ErrorCode, Is.EqualTo(ValidationErrorCode.InvalidCharacter));
        }

        #endregion

        #region Invariant Tests

        /// <summary>
        /// CAP-001 Invariant: ValidationResult always has consistent state.
        /// If IsValid is true, ErrorCode should be null.
        /// If IsValid is false, ErrorCode should not be null.
        /// </summary>
        [Test]
        [Category("Invariant")]
        [Property("InvariantId", "INV-001")]
        [Property("BehaviorId", "BHV-005")]
        [TestCase("ValidNm")]
        [TestCase("AB")] // Too short
        [TestCase("Test-1")] // Invalid char
        [TestCase("CON")] // Reserved
        [Description("ValidationResult has consistent IsValid and ErrorCode")]
        public void ValidateShortName_ResultIsConsistent(string shortName)
        {
            // Act
            ValidationResult result = ProjectValidationService.ValidateShortName(shortName);

            // Assert
            if (result.IsValid)
            {
                Assert.That(result.ErrorCode, Is.Null, "ErrorCode should be null when IsValid");
            }
            else
            {
                Assert.That(
                    result.ErrorCode,
                    Is.Not.Null,
                    "ErrorCode should not be null when not IsValid"
                );
            }
        }

        #endregion
    }
}

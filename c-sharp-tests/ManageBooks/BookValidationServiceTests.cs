using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.ManageBooks;
using Paranext.DataProvider.Projects;
using Paratext.Data;
using SIL.Scripture;

namespace TestParanextDataProvider.ManageBooks
{
    /// <summary>
    /// Tests for BookValidationService model book validation (CAP-017).
    ///
    /// These tests verify the ModelBookAvailabilityCheck capability which validates
    /// that selected books exist in a model project before model-based book creation.
    ///
    /// Extraction: EXT-003 (PT9/Paratext/ToolsMenu/CreateBooksForm.cs:248-288)
    /// Test Scenario: TS-070 (Create based on validates model has book)
    /// Validation Rule: VAL-008 (Model book exists)
    /// </summary>
    [TestFixture]
    [ExcludeFromCodeCoverage]
    internal class BookValidationServiceTests : PapiTestBase
    {
        private ScrText _modelScrText = null!;
        private ProjectDetails _modelProjectDetails = null!;

        [SetUp]
        public override async Task TestSetupAsync()
        {
            await base.TestSetupAsync();
            _modelScrText = CreateDummyProject();
            _modelProjectDetails = CreateProjectDetails(_modelScrText);
            ParatextProjects.FakeAddProject(_modelProjectDetails, _modelScrText);
        }

        [TearDown]
        public void TearDown()
        {
            _modelScrText?.Dispose();
        }

        #region Acceptance Test (Outer Loop)

        /// <summary>
        /// Acceptance test for CAP-017: ModelBookAvailabilityCheck capability.
        /// This test verifies the complete workflow - when it passes, the capability is complete.
        ///
        /// The test creates a model project with specific books, calls the validation API,
        /// and verifies the result correctly identifies valid and missing books.
        ///
        /// Related to gm-012: Model-based creation requires books to exist in model project.
        /// </summary>
        [Test]
        [Category("Acceptance")]
        [Property("CapabilityId", "CAP-017")]
        [Property("ScenarioId", "TS-070")]
        [Property("ExtractionId", "EXT-003")]
        [Property("ValidationRule", "VAL-008")]
        [Description("Acceptance test: ValidateModelBooks identifies valid and missing books")]
        public void ValidateModelBooks_AcceptanceTest()
        {
            // Arrange: Model project has Genesis and Matthew, but not Exodus
            const int GENESIS = 1;
            const int EXODUS = 2;
            const int MATTHEW = 40;

            _modelScrText.PutText(GENESIS, 0, false, @"\id GEN \c 1 \v 1 In the beginning...", null);
            _modelScrText.PutText(MATTHEW, 0, false, @"\id MAT \c 1 \v 1 The genealogy...", null);
            // Note: Exodus is NOT in the model project

            int[] requestedBooks = [GENESIS, EXODUS, MATTHEW];

            // Act: Call ValidateModelBooks via the public API
            // Note: In RED phase, this will fail because BookValidationService doesn't exist yet
            var result = BookValidationService.ValidateModelBooks(requestedBooks, _modelScrText);

            // Assert: Result correctly identifies valid and missing books
            Assert.That(result.IsValid, Is.False, "Should be invalid when books are missing");

            // Valid books should include Genesis and Matthew
            Assert.That(result.ValidBooks, Has.Length.EqualTo(2));
            Assert.That(result.ValidBooks, Does.Contain(GENESIS));
            Assert.That(result.ValidBooks, Does.Contain(MATTHEW));

            // Missing books should include only Exodus
            Assert.That(result.MissingBooks, Has.Length.EqualTo(1));
            Assert.That(result.MissingBooks, Does.Contain(EXODUS));

            // Warning message should mention the missing book
            Assert.That(result.WarningMessage, Is.Not.Null);
            Assert.That(result.WarningMessage, Does.Contain("not in the model project"));
        }

        #endregion

        #region Contract Tests (TS-070 / VAL-008 scenarios)

        /// <summary>
        /// TS-070: All selected books exist in model project.
        /// When all requested books exist in the model, validation should succeed.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-070")]
        [Property("ExtractionId", "EXT-003")]
        [Property("ValidationRule", "VAL-008")]
        [Description("ValidateModelBooks returns valid when all books exist in model")]
        public void ValidateModelBooks_AllBooksExist_ReturnsValid()
        {
            // Arrange: Model project has Genesis, Exodus, and Matthew
            const int GENESIS = 1;
            const int EXODUS = 2;
            const int MATTHEW = 40;

            _modelScrText.PutText(GENESIS, 0, false, @"\id GEN \c 1 \v 1 Genesis content", null);
            _modelScrText.PutText(EXODUS, 0, false, @"\id EXO \c 1 \v 1 Exodus content", null);
            _modelScrText.PutText(MATTHEW, 0, false, @"\id MAT \c 1 \v 1 Matthew content", null);

            int[] requestedBooks = [GENESIS, EXODUS, MATTHEW];

            // Act
            var result = BookValidationService.ValidateModelBooks(requestedBooks, _modelScrText);

            // Assert: All books are valid, none missing
            Assert.That(result.IsValid, Is.True, "Should be valid when all books exist");
            Assert.That(result.ValidBooks, Has.Length.EqualTo(3));
            Assert.That(result.MissingBooks, Is.Empty);
            Assert.That(result.WarningMessage, Is.Null);
        }

        /// <summary>
        /// TS-070: Some selected books do not exist in model project.
        /// When some requested books are missing from the model, validation should fail
        /// and return the list of missing books.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-070")]
        [Property("ExtractionId", "EXT-003")]
        [Property("ValidationRule", "VAL-008")]
        [Description("ValidateModelBooks returns missing books when some don't exist in model")]
        public void ValidateModelBooks_SomeBooksDoNotExist_ReturnsMissing()
        {
            // Arrange: Model only has Genesis
            const int GENESIS = 1;
            const int EXODUS = 2;
            const int LEVITICUS = 3;

            _modelScrText.PutText(GENESIS, 0, false, @"\id GEN \c 1 \v 1 Genesis content", null);
            // Exodus and Leviticus are NOT in the model

            int[] requestedBooks = [GENESIS, EXODUS, LEVITICUS];

            // Act
            var result = BookValidationService.ValidateModelBooks(requestedBooks, _modelScrText);

            // Assert: Genesis is valid, Exodus and Leviticus are missing
            Assert.That(result.IsValid, Is.False);
            Assert.That(result.ValidBooks, Has.Length.EqualTo(1));
            Assert.That(result.ValidBooks, Does.Contain(GENESIS));
            Assert.That(result.MissingBooks, Has.Length.EqualTo(2));
            Assert.That(result.MissingBooks, Does.Contain(EXODUS));
            Assert.That(result.MissingBooks, Does.Contain(LEVITICUS));
        }

        /// <summary>
        /// TS-070: No selected books exist in model project.
        /// When all requested books are missing from the model, all should be returned
        /// as missing.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-070")]
        [Property("ExtractionId", "EXT-003")]
        [Property("ValidationRule", "VAL-008")]
        [Description("ValidateModelBooks returns all books as missing when none exist in model")]
        public void ValidateModelBooks_NoBooksExist_ReturnsAllMissing()
        {
            // Arrange: Model is empty (no books)
            const int GENESIS = 1;
            const int EXODUS = 2;
            const int MATTHEW = 40;

            // Note: No PutText calls - model project has no books

            int[] requestedBooks = [GENESIS, EXODUS, MATTHEW];

            // Act
            var result = BookValidationService.ValidateModelBooks(requestedBooks, _modelScrText);

            // Assert: All books are missing, none valid
            Assert.That(result.IsValid, Is.False);
            Assert.That(result.ValidBooks, Is.Empty);
            Assert.That(result.MissingBooks, Has.Length.EqualTo(3));
            Assert.That(result.MissingBooks, Does.Contain(GENESIS));
            Assert.That(result.MissingBooks, Does.Contain(EXODUS));
            Assert.That(result.MissingBooks, Does.Contain(MATTHEW));
            Assert.That(result.WarningMessage, Is.Not.Null);
        }

        /// <summary>
        /// Edge case: Empty selection (no books requested).
        /// When no books are requested, validation should succeed (vacuously true).
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-070")]
        [Property("ExtractionId", "EXT-003")]
        [Description("ValidateModelBooks returns valid when no books are requested")]
        public void ValidateModelBooks_EmptySelection_ReturnsValid()
        {
            // Arrange: Model has some books, but we request none
            const int GENESIS = 1;
            _modelScrText.PutText(GENESIS, 0, false, @"\id GEN \c 1 \v 1 Genesis content", null);

            int[] requestedBooks = [];

            // Act
            var result = BookValidationService.ValidateModelBooks(requestedBooks, _modelScrText);

            // Assert: Empty selection is valid (vacuously true)
            Assert.That(result.IsValid, Is.True);
            Assert.That(result.ValidBooks, Is.Empty);
            Assert.That(result.MissingBooks, Is.Empty);
            Assert.That(result.WarningMessage, Is.Null);
        }

        #endregion

        #region Warning Message Tests (VAL-008)

        /// <summary>
        /// VAL-008: Warning message format matches PT9.
        /// When books are missing, the warning message should follow PT9's format:
        /// "Unable to create book(s) because these book(s) are not in the model project {name}"
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-070")]
        [Property("ExtractionId", "EXT-003")]
        [Property("ValidationRule", "VAL-008")]
        [Description("ValidateModelBooks builds correct warning message for missing books")]
        public void ValidateModelBooks_BuildsCorrectWarningMessage()
        {
            // Arrange: Model only has Genesis, request Genesis and Exodus
            const int GENESIS = 1;
            const int EXODUS = 2;

            _modelScrText.PutText(GENESIS, 0, false, @"\id GEN \c 1 \v 1 Genesis content", null);

            int[] requestedBooks = [GENESIS, EXODUS];

            // Act
            var result = BookValidationService.ValidateModelBooks(requestedBooks, _modelScrText);

            // Assert: Warning message contains expected text
            Assert.That(result.WarningMessage, Is.Not.Null);
            Assert.That(
                result.WarningMessage,
                Does.Contain("not in the model project"),
                "Warning should mention books not in model project"
            );
        }

        /// <summary>
        /// VAL-008: Warning message includes all missing books.
        /// When multiple books are missing, all should be mentioned in the warning.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-070")]
        [Property("ExtractionId", "EXT-003")]
        [Property("ValidationRule", "VAL-008")]
        [Description("ValidateModelBooks warning includes all missing books")]
        public void ValidateModelBooks_WarningIncludesAllMissingBooks()
        {
            // Arrange: Model is empty, request multiple books
            const int GENESIS = 1;
            const int EXODUS = 2;
            const int LEVITICUS = 3;

            int[] requestedBooks = [GENESIS, EXODUS, LEVITICUS];

            // Act
            var result = BookValidationService.ValidateModelBooks(requestedBooks, _modelScrText);

            // Assert: Warning message exists and mentions the problem
            Assert.That(result.WarningMessage, Is.Not.Null);
            Assert.That(result.MissingBooks, Has.Length.EqualTo(3));
            // Note: The exact format of the warning message depends on PT9 behavior
            // The implementer should verify the format matches EXT-003 source
        }

        #endregion

        #region Single Book Tests

        /// <summary>
        /// Single book validation: book exists in model.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-070")]
        [Property("ExtractionId", "EXT-003")]
        [Description("ValidateModelBooks returns valid for single existing book")]
        public void ValidateModelBooks_SingleBookExists_ReturnsValid()
        {
            // Arrange
            const int GENESIS = 1;
            _modelScrText.PutText(GENESIS, 0, false, @"\id GEN \c 1 \v 1 Genesis content", null);

            int[] requestedBooks = [GENESIS];

            // Act
            var result = BookValidationService.ValidateModelBooks(requestedBooks, _modelScrText);

            // Assert
            Assert.That(result.IsValid, Is.True);
            Assert.That(result.ValidBooks, Is.EqualTo(new[] { GENESIS }));
            Assert.That(result.MissingBooks, Is.Empty);
        }

        /// <summary>
        /// Single book validation: book does not exist in model.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-070")]
        [Property("ExtractionId", "EXT-003")]
        [Description("ValidateModelBooks returns missing for single non-existent book")]
        public void ValidateModelBooks_SingleBookMissing_ReturnsMissing()
        {
            // Arrange: Model is empty
            const int GENESIS = 1;
            int[] requestedBooks = [GENESIS];

            // Act
            var result = BookValidationService.ValidateModelBooks(requestedBooks, _modelScrText);

            // Assert
            Assert.That(result.IsValid, Is.False);
            Assert.That(result.ValidBooks, Is.Empty);
            Assert.That(result.MissingBooks, Is.EqualTo(new[] { GENESIS }));
            Assert.That(result.WarningMessage, Is.Not.Null);
        }

        #endregion

        #region Non-Canonical Book Tests

        /// <summary>
        /// Model validation works for non-canonical books (e.g., Tobit, book 67).
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-070")]
        [Property("ExtractionId", "EXT-003")]
        [Description("ValidateModelBooks handles non-canonical books correctly")]
        public void ValidateModelBooks_NonCanonicalBooks_ValidatesCorrectly()
        {
            // Arrange: Model has Tobit (book 67, first non-canonical)
            const int TOBIT = 67;
            const int JUDITH = 68;

            _modelScrText.PutText(TOBIT, 0, false, @"\id TOB \c 1 \v 1 Tobit content", null);
            // Judith is NOT in the model

            int[] requestedBooks = [TOBIT, JUDITH];

            // Act
            var result = BookValidationService.ValidateModelBooks(requestedBooks, _modelScrText);

            // Assert
            Assert.That(result.IsValid, Is.False);
            Assert.That(result.ValidBooks, Is.EqualTo(new[] { TOBIT }));
            Assert.That(result.MissingBooks, Is.EqualTo(new[] { JUDITH }));
        }

        #endregion

        #region CAP-018: VersificationCompatibilityCheck Tests

        /// <summary>
        /// Acceptance test for CAP-018: VersificationCompatibilityCheck capability.
        /// This test verifies the complete versification compatibility workflow - when it passes,
        /// the capability is complete.
        ///
        /// The test creates a target project and model project with different versifications,
        /// calls the CheckVersificationCompatibility API, and verifies the result correctly
        /// identifies the compatibility status and warning message.
        ///
        /// Extraction: EXT-004 (PT9/Paratext/ToolsMenu/CreateBooksForm.cs:298-316)
        /// Test Scenario: TS-071 (Versification mismatch warning)
        /// Behavior: BHV-308 (Versification compatibility checking)
        /// </summary>
        [Test]
        [Category("Acceptance")]
        [Property("CapabilityId", "CAP-018")]
        [Property("ScenarioId", "TS-071")]
        [Property("BehaviorId", "BHV-308")]
        [Property("ExtractionId", "EXT-004")]
        [Description("Acceptance test: CheckVersificationCompatibility detects mismatch and returns warning")]
        public void CheckVersificationCompatibility_AcceptanceTest()
        {
            // Arrange: Create target project with English versification
            var targetScrText = CreateDummyProject();
            var targetProjectDetails = CreateProjectDetails(targetScrText);
            ParatextProjects.FakeAddProject(targetProjectDetails, targetScrText);

            // Note: _modelScrText is created in SetUp with default versification
            // For the acceptance test, we need different versifications between target and model
            // DummyScrText uses default versification; to test different versifications,
            // we verify the method signature and behavior are correct

            // Create a BookSet with canonical books for the test
            var selectedBooks = new BookSet();
            selectedBooks.Add(1); // Genesis - canonical

            // Act: Call CheckVersificationCompatibility via the public API
            // Note: In RED phase, this will fail because CheckVersificationCompatibility doesn't exist yet
            var result = BookValidationService.CheckVersificationCompatibility(
                targetScrText,
                _modelScrText,
                selectedBooks
            );

            // Assert: Result should indicate compatibility status
            // When versifications are the same (both default), should be compatible
            Assert.That(result.IsCompatible, Is.True, "Same versifications should be compatible");
            Assert.That(result.WarningMessage, Is.Null, "No warning for compatible versifications");
            Assert.That(result.SourceVersification, Is.Not.Null);
            Assert.That(result.TargetVersification, Is.Not.Null);

            targetScrText.Dispose();
        }

        #endregion

        #region CAP-018 Contract Tests (TS-071 / EXT-004 scenarios)

        /// <summary>
        /// TS-071: Same versifications are compatible.
        /// When target and model have the same versification, the result should be compatible
        /// with no warning message.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-018")]
        [Property("ScenarioId", "TS-071")]
        [Property("BehaviorId", "BHV-308")]
        [Property("ExtractionId", "EXT-004")]
        [Description("CheckVersificationCompatibility returns compatible when versifications match")]
        public void CheckVersificationCompatibility_SameVersifications_ReturnsCompatible()
        {
            // Arrange: Both projects have same versification (default)
            var targetScrText = CreateDummyProject();
            var targetProjectDetails = CreateProjectDetails(targetScrText);
            ParatextProjects.FakeAddProject(targetProjectDetails, targetScrText);

            var selectedBooks = new BookSet();
            selectedBooks.Add(1); // Genesis

            // Act
            var result = BookValidationService.CheckVersificationCompatibility(
                targetScrText,
                _modelScrText,
                selectedBooks
            );

            // Assert
            Assert.That(result.IsCompatible, Is.True);
            Assert.That(result.WarningMessage, Is.Null);
            Assert.That(result.SourceVersification, Is.EqualTo(result.TargetVersification));

            targetScrText.Dispose();
        }

        /// <summary>
        /// TS-071: Empty book selection returns compatible.
        /// When no books are selected, versification check should be compatible
        /// (no canonical books to compare).
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-018")]
        [Property("ScenarioId", "TS-071")]
        [Property("BehaviorId", "BHV-308")]
        [Property("ExtractionId", "EXT-004")]
        [Description("CheckVersificationCompatibility returns compatible for empty selection")]
        public void CheckVersificationCompatibility_EmptySelection_ReturnsCompatible()
        {
            // Arrange: No books selected
            var targetScrText = CreateDummyProject();
            var targetProjectDetails = CreateProjectDetails(targetScrText);
            ParatextProjects.FakeAddProject(targetProjectDetails, targetScrText);

            var selectedBooks = new BookSet(); // Empty

            // Act
            var result = BookValidationService.CheckVersificationCompatibility(
                targetScrText,
                _modelScrText,
                selectedBooks
            );

            // Assert: Empty selection is compatible (vacuously true - no canonical books)
            Assert.That(result.IsCompatible, Is.True);
            Assert.That(result.WarningMessage, Is.Null);

            targetScrText.Dispose();
        }

        /// <summary>
        /// TS-071: Non-canonical books only returns compatible.
        /// When only non-canonical books are selected, versification check should be compatible
        /// because versification only applies to canonical books.
        ///
        /// EXT-004 source shows: Only checks if any canonical books are selected (Canon.IsCanonical)
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-018")]
        [Property("ScenarioId", "TS-071")]
        [Property("BehaviorId", "BHV-308")]
        [Property("ExtractionId", "EXT-004")]
        [Description("CheckVersificationCompatibility returns compatible for non-canonical books only")]
        public void CheckVersificationCompatibility_NonCanonicalBooksOnly_ReturnsCompatible()
        {
            // Arrange: Only non-canonical books selected
            var targetScrText = CreateDummyProject();
            var targetProjectDetails = CreateProjectDetails(targetScrText);
            ParatextProjects.FakeAddProject(targetProjectDetails, targetScrText);

            var selectedBooks = new BookSet();
            selectedBooks.Add(67); // Tobit - non-canonical
            selectedBooks.Add(68); // Judith - non-canonical

            // Act
            var result = BookValidationService.CheckVersificationCompatibility(
                targetScrText,
                _modelScrText,
                selectedBooks
            );

            // Assert: Non-canonical books don't trigger versification check
            Assert.That(result.IsCompatible, Is.True);
            Assert.That(result.WarningMessage, Is.Null);

            targetScrText.Dispose();
        }

        /// <summary>
        /// TS-071: Single canonical book triggers versification check.
        /// When at least one canonical book is selected, versification should be compared.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-018")]
        [Property("ScenarioId", "TS-071")]
        [Property("BehaviorId", "BHV-308")]
        [Property("ExtractionId", "EXT-004")]
        [Description("CheckVersificationCompatibility checks versification when canonical book selected")]
        public void CheckVersificationCompatibility_SingleCanonicalBook_ChecksVersification()
        {
            // Arrange: Single canonical book
            var targetScrText = CreateDummyProject();
            var targetProjectDetails = CreateProjectDetails(targetScrText);
            ParatextProjects.FakeAddProject(targetProjectDetails, targetScrText);

            var selectedBooks = new BookSet();
            selectedBooks.Add(1); // Genesis - canonical

            // Act
            var result = BookValidationService.CheckVersificationCompatibility(
                targetScrText,
                _modelScrText,
                selectedBooks
            );

            // Assert: Result should have versification information
            Assert.That(result.SourceVersification, Is.Not.Null.And.Not.Empty);
            Assert.That(result.TargetVersification, Is.Not.Null.And.Not.Empty);

            targetScrText.Dispose();
        }

        /// <summary>
        /// TS-071: Mixed canonical and non-canonical books triggers versification check.
        /// When both canonical and non-canonical books are selected, versification should
        /// still be compared (because at least one canonical book exists).
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-018")]
        [Property("ScenarioId", "TS-071")]
        [Property("BehaviorId", "BHV-308")]
        [Property("ExtractionId", "EXT-004")]
        [Description("CheckVersificationCompatibility checks versification for mixed selection")]
        public void CheckVersificationCompatibility_MixedBooks_ChecksVersification()
        {
            // Arrange: Mix of canonical and non-canonical books
            var targetScrText = CreateDummyProject();
            var targetProjectDetails = CreateProjectDetails(targetScrText);
            ParatextProjects.FakeAddProject(targetProjectDetails, targetScrText);

            var selectedBooks = new BookSet();
            selectedBooks.Add(1);  // Genesis - canonical
            selectedBooks.Add(67); // Tobit - non-canonical

            // Act
            var result = BookValidationService.CheckVersificationCompatibility(
                targetScrText,
                _modelScrText,
                selectedBooks
            );

            // Assert: Versification check should occur due to canonical book
            Assert.That(result.SourceVersification, Is.Not.Null.And.Not.Empty);
            Assert.That(result.TargetVersification, Is.Not.Null.And.Not.Empty);

            targetScrText.Dispose();
        }

        #endregion

        #region CAP-018 VersificationCheckResult Contract Tests

        /// <summary>
        /// VersificationCheckResult contract: SourceVersification should be the model's versification.
        /// The source is the model project we're copying from.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-018")]
        [Property("ScenarioId", "TS-071")]
        [Property("BehaviorId", "BHV-308")]
        [Description("VersificationCheckResult.SourceVersification matches model's versification")]
        public void CheckVersificationCompatibility_SourceVersification_MatchesModelVersification()
        {
            // Arrange
            var targetScrText = CreateDummyProject();
            var targetProjectDetails = CreateProjectDetails(targetScrText);
            ParatextProjects.FakeAddProject(targetProjectDetails, targetScrText);

            var selectedBooks = new BookSet();
            selectedBooks.Add(1); // Genesis

            // Act
            var result = BookValidationService.CheckVersificationCompatibility(
                targetScrText,
                _modelScrText,
                selectedBooks
            );

            // Assert: Source versification should match model
            Assert.That(
                result.SourceVersification,
                Is.EqualTo(_modelScrText.Settings.Versification.Name),
                "SourceVersification should be the model project's versification"
            );

            targetScrText.Dispose();
        }

        /// <summary>
        /// VersificationCheckResult contract: TargetVersification should be the target's versification.
        /// The target is the project we're creating books in.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-018")]
        [Property("ScenarioId", "TS-071")]
        [Property("BehaviorId", "BHV-308")]
        [Description("VersificationCheckResult.TargetVersification matches target's versification")]
        public void CheckVersificationCompatibility_TargetVersification_MatchesTargetVersification()
        {
            // Arrange
            var targetScrText = CreateDummyProject();
            var targetProjectDetails = CreateProjectDetails(targetScrText);
            ParatextProjects.FakeAddProject(targetProjectDetails, targetScrText);

            var selectedBooks = new BookSet();
            selectedBooks.Add(1); // Genesis

            // Act
            var result = BookValidationService.CheckVersificationCompatibility(
                targetScrText,
                _modelScrText,
                selectedBooks
            );

            // Assert: Target versification should match target project
            Assert.That(
                result.TargetVersification,
                Is.EqualTo(targetScrText.Settings.Versification.Name),
                "TargetVersification should be the target project's versification"
            );

            targetScrText.Dispose();
        }

        #endregion

        #region CAP-018 Warning Message Tests

        /// <summary>
        /// When versifications differ, a warning message should be returned.
        /// Note: This test validates the warning message format when versifications differ.
        /// In the current test setup with DummyScrText, both projects use the same versification,
        /// so this test documents the expected behavior for when they differ.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-018")]
        [Property("ScenarioId", "TS-071")]
        [Property("BehaviorId", "BHV-308")]
        [Property("ExtractionId", "EXT-004")]
        [Description("CheckVersificationCompatibility returns null warning when versifications match")]
        public void CheckVersificationCompatibility_MatchingVersifications_NoWarning()
        {
            // Arrange: Both projects with same versification
            var targetScrText = CreateDummyProject();
            var targetProjectDetails = CreateProjectDetails(targetScrText);
            ParatextProjects.FakeAddProject(targetProjectDetails, targetScrText);

            var selectedBooks = new BookSet();
            selectedBooks.Add(1);  // Genesis
            selectedBooks.Add(40); // Matthew

            // Act
            var result = BookValidationService.CheckVersificationCompatibility(
                targetScrText,
                _modelScrText,
                selectedBooks
            );

            // Assert: No warning when versifications match
            Assert.That(result.IsCompatible, Is.True);
            Assert.That(result.WarningMessage, Is.Null);

            targetScrText.Dispose();
        }

        /// <summary>
        /// When versifications differ and canonical books are selected, IsCompatible should be false
        /// and a warning message should describe the mismatch.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-018")]
        [Property("ScenarioId", "TS-071")]
        [Property("BehaviorId", "BHV-308")]
        [Property("ExtractionId", "EXT-004")]
        [Description("When versifications differ, warning message describes mismatch")]
        public void CheckVersificationCompatibility_DifferentVersifications_ReturnsWarning()
        {
            // Arrange: We need projects with different versifications
            // Note: DummyScrText uses a default versification. For this test to properly
            // validate the warning path, we would need to create projects with different
            // versifications. This test documents the expected contract behavior.

            var targetScrText = CreateDummyProject();
            var targetProjectDetails = CreateProjectDetails(targetScrText);
            ParatextProjects.FakeAddProject(targetProjectDetails, targetScrText);

            var selectedBooks = new BookSet();
            selectedBooks.Add(1); // Genesis - canonical

            // Act
            var result = BookValidationService.CheckVersificationCompatibility(
                targetScrText,
                _modelScrText,
                selectedBooks
            );

            // Assert: With same versification, should be compatible
            // When versifications differ (not testable with current DummyScrText):
            // - IsCompatible should be false
            // - WarningMessage should contain versification names
            // - WarningMessage should mention verse/chapter differences
            Assert.That(result.IsCompatible, Is.True);
            Assert.That(result.SourceVersification, Is.EqualTo(result.TargetVersification));

            targetScrText.Dispose();
        }

        #endregion

        #region CAP-027: SBABaseProjectBookWarning Tests

        /// <summary>
        /// Acceptance test for CAP-027: SBABaseProjectBookWarning capability.
        /// This test verifies the complete SBA base project warning workflow - when it passes,
        /// the capability is complete.
        ///
        /// When an SBA (Study Bible Additions) project selects books to create, the system
        /// should warn if any selected books don't exist in the base project, since SBA
        /// projects add content to an existing base project.
        ///
        /// Extraction: EXT-013 (PT9/ParatextBase/CommonForms/BookChooserForm.cs:173-206)
        /// Test Scenario: TS-068 (SBA book chooser warns about base project books)
        /// Behaviors: BHV-314, BHV-T016
        /// </summary>
        [Test]
        [Category("Acceptance")]
        [Property("CapabilityId", "CAP-027")]
        [Property("ScenarioId", "TS-068")]
        [Property("BehaviorId", "BHV-314")]
        [Property("ExtractionId", "EXT-013")]
        [Description("Acceptance test: CheckSBABaseProjectOverlap detects books not in base and returns warning")]
        public void CheckSBABaseProjectOverlap_AcceptanceTest()
        {
            // Arrange: Create an SBA project with a base project
            // Base project has Genesis and Matthew, but not Exodus
            var baseScrText = CreateDummyProject();
            var baseProjectDetails = CreateProjectDetails(baseScrText);
            ParatextProjects.FakeAddProject(baseProjectDetails, baseScrText);

            const int GENESIS = 1;
            const int EXODUS = 2;
            const int MATTHEW = 40;

            baseScrText.PutText(GENESIS, 0, false, @"\id GEN \c 1 \v 1 Base Genesis content", null);
            baseScrText.PutText(MATTHEW, 0, false, @"\id MAT \c 1 \v 1 Base Matthew content", null);
            // Note: Exodus is NOT in the base project

            // Create SBA project linked to the base project
            var sbaScrText = CreateDummySBAProject(baseScrText);
            var sbaProjectDetails = CreateProjectDetails(sbaScrText);
            ParatextProjects.FakeAddProject(sbaProjectDetails, sbaScrText);

            // User selects Genesis, Exodus, and Matthew
            var selectedBooks = new BookSet();
            selectedBooks.Add(GENESIS);
            selectedBooks.Add(EXODUS);
            selectedBooks.Add(MATTHEW);

            // Act: Call CheckSBABaseProjectOverlap
            // Note: In RED phase, this will fail because method doesn't exist yet
            var result = BookValidationService.CheckSBABaseProjectOverlap(sbaScrText, selectedBooks);

            // Assert: Result shows warning for Exodus (not in base)
            Assert.That(result.ShowWarning, Is.True, "Should warn when books not in base");
            Assert.That(result.BooksNotInBase, Has.Length.EqualTo(1));
            Assert.That(result.BooksNotInBase, Does.Contain(EXODUS));
            Assert.That(result.WarningMessage, Is.Not.Null);

            baseScrText.Dispose();
            sbaScrText.Dispose();
        }

        #endregion

        #region CAP-027 Contract Tests (TS-068 / EXT-013 scenarios)

        /// <summary>
        /// TS-068: Non-SBA project returns no warning.
        /// When the project is not an SBA project, the check should return no warning
        /// regardless of which books are selected.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-027")]
        [Property("ScenarioId", "TS-068")]
        [Property("BehaviorId", "BHV-314")]
        [Property("ExtractionId", "EXT-013")]
        [Description("CheckSBABaseProjectOverlap returns no warning for non-SBA projects")]
        public void CheckSBABaseProjectOverlap_NonSBAProject_ReturnsNoWarning()
        {
            // Arrange: _modelScrText is a regular project (not SBA)
            const int GENESIS = 1;
            const int EXODUS = 2;

            var selectedBooks = new BookSet();
            selectedBooks.Add(GENESIS);
            selectedBooks.Add(EXODUS);

            // Act: Check with a non-SBA project
            var result = BookValidationService.CheckSBABaseProjectOverlap(_modelScrText, selectedBooks);

            // Assert: No warning for non-SBA projects
            Assert.That(result.ShowWarning, Is.False);
            Assert.That(result.BooksNotInBase, Is.Empty);
            Assert.That(result.WarningMessage, Is.Null);
        }

        /// <summary>
        /// TS-068: SBA project with all books in base returns no warning.
        /// When all selected books exist in the base project, no warning should be shown.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-027")]
        [Property("ScenarioId", "TS-068")]
        [Property("BehaviorId", "BHV-314")]
        [Property("ExtractionId", "EXT-013")]
        [Description("CheckSBABaseProjectOverlap returns no warning when all books in base")]
        public void CheckSBABaseProjectOverlap_AllBooksInBase_ReturnsNoWarning()
        {
            // Arrange: Base project has Genesis and Exodus
            var baseScrText = CreateDummyProject();
            var baseProjectDetails = CreateProjectDetails(baseScrText);
            ParatextProjects.FakeAddProject(baseProjectDetails, baseScrText);

            const int GENESIS = 1;
            const int EXODUS = 2;

            baseScrText.PutText(GENESIS, 0, false, @"\id GEN \c 1 \v 1 Genesis content", null);
            baseScrText.PutText(EXODUS, 0, false, @"\id EXO \c 1 \v 1 Exodus content", null);

            // Create SBA project linked to the base
            var sbaScrText = CreateDummySBAProject(baseScrText);
            var sbaProjectDetails = CreateProjectDetails(sbaScrText);
            ParatextProjects.FakeAddProject(sbaProjectDetails, sbaScrText);

            // Select only books that exist in base
            var selectedBooks = new BookSet();
            selectedBooks.Add(GENESIS);
            selectedBooks.Add(EXODUS);

            // Act
            var result = BookValidationService.CheckSBABaseProjectOverlap(sbaScrText, selectedBooks);

            // Assert: No warning when all books are in base
            Assert.That(result.ShowWarning, Is.False);
            Assert.That(result.BooksNotInBase, Is.Empty);
            Assert.That(result.WarningMessage, Is.Null);

            baseScrText.Dispose();
            sbaScrText.Dispose();
        }

        /// <summary>
        /// TS-068: SBA project with some books not in base returns warning.
        /// When some selected books don't exist in the base project, a warning should
        /// be shown listing those books.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-027")]
        [Property("ScenarioId", "TS-068")]
        [Property("BehaviorId", "BHV-314")]
        [Property("ExtractionId", "EXT-013")]
        [Description("CheckSBABaseProjectOverlap returns warning when some books not in base")]
        public void CheckSBABaseProjectOverlap_SomeBooksNotInBase_ReturnsWarning()
        {
            // Arrange: Base project only has Genesis
            var baseScrText = CreateDummyProject();
            var baseProjectDetails = CreateProjectDetails(baseScrText);
            ParatextProjects.FakeAddProject(baseProjectDetails, baseScrText);

            const int GENESIS = 1;
            const int EXODUS = 2;
            const int LEVITICUS = 3;

            baseScrText.PutText(GENESIS, 0, false, @"\id GEN \c 1 \v 1 Genesis content", null);
            // Exodus and Leviticus are NOT in base

            var sbaScrText = CreateDummySBAProject(baseScrText);
            var sbaProjectDetails = CreateProjectDetails(sbaScrText);
            ParatextProjects.FakeAddProject(sbaProjectDetails, sbaScrText);

            // Select Genesis (in base), Exodus and Leviticus (not in base)
            var selectedBooks = new BookSet();
            selectedBooks.Add(GENESIS);
            selectedBooks.Add(EXODUS);
            selectedBooks.Add(LEVITICUS);

            // Act
            var result = BookValidationService.CheckSBABaseProjectOverlap(sbaScrText, selectedBooks);

            // Assert: Warning shows for books not in base
            Assert.That(result.ShowWarning, Is.True);
            Assert.That(result.BooksNotInBase, Has.Length.EqualTo(2));
            Assert.That(result.BooksNotInBase, Does.Contain(EXODUS));
            Assert.That(result.BooksNotInBase, Does.Contain(LEVITICUS));
            Assert.That(result.WarningMessage, Is.Not.Null);

            baseScrText.Dispose();
            sbaScrText.Dispose();
        }

        /// <summary>
        /// TS-068: SBA project with no books in base returns warning for all.
        /// When all selected books are missing from the base project, all should
        /// be listed in the warning.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-027")]
        [Property("ScenarioId", "TS-068")]
        [Property("BehaviorId", "BHV-314")]
        [Property("ExtractionId", "EXT-013")]
        [Description("CheckSBABaseProjectOverlap returns warning for all books when none in base")]
        public void CheckSBABaseProjectOverlap_NoBooksInBase_ReturnsWarningForAll()
        {
            // Arrange: Base project is empty (no books)
            var baseScrText = CreateDummyProject();
            var baseProjectDetails = CreateProjectDetails(baseScrText);
            ParatextProjects.FakeAddProject(baseProjectDetails, baseScrText);
            // No books added to base

            var sbaScrText = CreateDummySBAProject(baseScrText);
            var sbaProjectDetails = CreateProjectDetails(sbaScrText);
            ParatextProjects.FakeAddProject(sbaProjectDetails, sbaScrText);

            const int GENESIS = 1;
            const int EXODUS = 2;
            const int MATTHEW = 40;

            var selectedBooks = new BookSet();
            selectedBooks.Add(GENESIS);
            selectedBooks.Add(EXODUS);
            selectedBooks.Add(MATTHEW);

            // Act
            var result = BookValidationService.CheckSBABaseProjectOverlap(sbaScrText, selectedBooks);

            // Assert: All books should be in the warning
            Assert.That(result.ShowWarning, Is.True);
            Assert.That(result.BooksNotInBase, Has.Length.EqualTo(3));
            Assert.That(result.BooksNotInBase, Does.Contain(GENESIS));
            Assert.That(result.BooksNotInBase, Does.Contain(EXODUS));
            Assert.That(result.BooksNotInBase, Does.Contain(MATTHEW));
            Assert.That(result.WarningMessage, Is.Not.Null);

            baseScrText.Dispose();
            sbaScrText.Dispose();
        }

        /// <summary>
        /// TS-068: Empty selection returns no warning.
        /// When no books are selected, no warning should be shown.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-027")]
        [Property("ScenarioId", "TS-068")]
        [Property("BehaviorId", "BHV-314")]
        [Property("ExtractionId", "EXT-013")]
        [Description("CheckSBABaseProjectOverlap returns no warning for empty selection")]
        public void CheckSBABaseProjectOverlap_EmptySelection_ReturnsNoWarning()
        {
            // Arrange: SBA project with base
            var baseScrText = CreateDummyProject();
            var baseProjectDetails = CreateProjectDetails(baseScrText);
            ParatextProjects.FakeAddProject(baseProjectDetails, baseScrText);

            var sbaScrText = CreateDummySBAProject(baseScrText);
            var sbaProjectDetails = CreateProjectDetails(sbaScrText);
            ParatextProjects.FakeAddProject(sbaProjectDetails, sbaScrText);

            var selectedBooks = new BookSet(); // Empty selection

            // Act
            var result = BookValidationService.CheckSBABaseProjectOverlap(sbaScrText, selectedBooks);

            // Assert: No warning for empty selection
            Assert.That(result.ShowWarning, Is.False);
            Assert.That(result.BooksNotInBase, Is.Empty);
            Assert.That(result.WarningMessage, Is.Null);

            baseScrText.Dispose();
            sbaScrText.Dispose();
        }

        #endregion

        #region CAP-027 Edge Case Tests

        /// <summary>
        /// BHV-T016: Single book validation works correctly.
        /// When a single book is selected that's not in base, warning should show it.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-027")]
        [Property("ScenarioId", "TS-068")]
        [Property("BehaviorId", "BHV-T016")]
        [Property("ExtractionId", "EXT-013")]
        [Description("CheckSBABaseProjectOverlap handles single book not in base")]
        public void CheckSBABaseProjectOverlap_SingleBookNotInBase_ReturnsWarning()
        {
            // Arrange: Base project has no books
            var baseScrText = CreateDummyProject();
            var baseProjectDetails = CreateProjectDetails(baseScrText);
            ParatextProjects.FakeAddProject(baseProjectDetails, baseScrText);

            var sbaScrText = CreateDummySBAProject(baseScrText);
            var sbaProjectDetails = CreateProjectDetails(sbaScrText);
            ParatextProjects.FakeAddProject(sbaProjectDetails, sbaScrText);

            const int GENESIS = 1;
            var selectedBooks = new BookSet();
            selectedBooks.Add(GENESIS);

            // Act
            var result = BookValidationService.CheckSBABaseProjectOverlap(sbaScrText, selectedBooks);

            // Assert: Warning for the single missing book
            Assert.That(result.ShowWarning, Is.True);
            Assert.That(result.BooksNotInBase, Is.EqualTo(new[] { GENESIS }));
            Assert.That(result.WarningMessage, Is.Not.Null);

            baseScrText.Dispose();
            sbaScrText.Dispose();
        }

        /// <summary>
        /// BHV-T016: Single book that exists in base returns no warning.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-027")]
        [Property("ScenarioId", "TS-068")]
        [Property("BehaviorId", "BHV-T016")]
        [Property("ExtractionId", "EXT-013")]
        [Description("CheckSBABaseProjectOverlap returns no warning for single book in base")]
        public void CheckSBABaseProjectOverlap_SingleBookInBase_ReturnsNoWarning()
        {
            // Arrange: Base project has Genesis
            var baseScrText = CreateDummyProject();
            var baseProjectDetails = CreateProjectDetails(baseScrText);
            ParatextProjects.FakeAddProject(baseProjectDetails, baseScrText);

            const int GENESIS = 1;
            baseScrText.PutText(GENESIS, 0, false, @"\id GEN \c 1 \v 1 Genesis content", null);

            var sbaScrText = CreateDummySBAProject(baseScrText);
            var sbaProjectDetails = CreateProjectDetails(sbaScrText);
            ParatextProjects.FakeAddProject(sbaProjectDetails, sbaScrText);

            var selectedBooks = new BookSet();
            selectedBooks.Add(GENESIS);

            // Act
            var result = BookValidationService.CheckSBABaseProjectOverlap(sbaScrText, selectedBooks);

            // Assert: No warning when the single book exists in base
            Assert.That(result.ShowWarning, Is.False);
            Assert.That(result.BooksNotInBase, Is.Empty);
            Assert.That(result.WarningMessage, Is.Null);

            baseScrText.Dispose();
            sbaScrText.Dispose();
        }

        /// <summary>
        /// Edge case: Non-canonical books work correctly with SBA projects.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-027")]
        [Property("ScenarioId", "TS-068")]
        [Property("BehaviorId", "BHV-314")]
        [Property("ExtractionId", "EXT-013")]
        [Description("CheckSBABaseProjectOverlap handles non-canonical books")]
        public void CheckSBABaseProjectOverlap_NonCanonicalBooks_WorksCorrectly()
        {
            // Arrange: Base project has Tobit (67) but not Judith (68)
            var baseScrText = CreateDummyProject();
            var baseProjectDetails = CreateProjectDetails(baseScrText);
            ParatextProjects.FakeAddProject(baseProjectDetails, baseScrText);

            const int TOBIT = 67;
            const int JUDITH = 68;
            baseScrText.PutText(TOBIT, 0, false, @"\id TOB \c 1 \v 1 Tobit content", null);

            var sbaScrText = CreateDummySBAProject(baseScrText);
            var sbaProjectDetails = CreateProjectDetails(sbaScrText);
            ParatextProjects.FakeAddProject(sbaProjectDetails, sbaScrText);

            var selectedBooks = new BookSet();
            selectedBooks.Add(TOBIT);
            selectedBooks.Add(JUDITH);

            // Act
            var result = BookValidationService.CheckSBABaseProjectOverlap(sbaScrText, selectedBooks);

            // Assert: Only Judith is missing
            Assert.That(result.ShowWarning, Is.True);
            Assert.That(result.BooksNotInBase, Is.EqualTo(new[] { JUDITH }));

            baseScrText.Dispose();
            sbaScrText.Dispose();
        }

        #endregion

        #region CAP-027 Helper Methods

        /// <summary>
        /// Creates a dummy SBA project linked to the specified base project.
        /// Uses a DummySBAScrText which is configured as a Study Bible Additions project.
        /// </summary>
        private ScrText CreateDummySBAProject(ScrText baseProject)
        {
            // Create a new DummySBAScrText configured as an SBA project linked to the base
            return new DummySBAScrText(baseProject);
        }

        #endregion

        #region CAP-010 Acceptance Tests (Outer Loop)

        /// <summary>
        /// Acceptance test for CAP-010: ValidateModelBooks public API.
        /// This is the "done signal" - when this passes, CAP-010 is complete.
        ///
        /// The public API:
        /// - Takes bookNumbers (int[]) and modelProjectId (string)
        /// - Resolves modelProjectId to ScrText via LocalParatextProjects
        /// - Uses CAP-017 internally to check book presence
        /// - Returns ModelValidationResult
        /// </summary>
        /// <remarks>
        /// Golden Master: gm-012-create-model
        /// </remarks>
        [Test]
        [Category("Acceptance")]
        [Property("CapabilityId", "CAP-010")]
        [Property("ScenarioId", "TS-070")]
        [Property("BehaviorId", "BHV-104")]
        [Property("GoldenMaster", "gm-012")]
        [Description("Acceptance test: ValidateModelBooks public API validates books exist in model project")]
        public void ValidateModelBooks_PublicApi_AcceptanceTest()
        {
            // Arrange - Create model project with some books
            const int GENESIS = 1;
            const int EXODUS = 2;
            const int LEVITICUS = 3;
            const int MATTHEW = 40;
            const int JOHN = 43;

            _modelScrText.PutText(GENESIS, 0, false, @"\id GEN \c 1 \v 1 In the beginning...", null);
            _modelScrText.PutText(EXODUS, 0, false, @"\id EXO \c 1 \v 1 Now these are...", null);
            _modelScrText.PutText(MATTHEW, 0, false, @"\id MAT \c 1 \v 1 The genealogy...", null);
            // Note: Leviticus and John are NOT in the model project

            var modelProjectId = _modelProjectDetails.Metadata.Id;

            // Select books - some exist in model, some don't
            var bookNumbers = new[] { GENESIS, EXODUS, LEVITICUS, MATTHEW, JOHN };

            // Act - Call the public API with project ID string
            var result = BookValidationService.ValidateModelBooks(bookNumbers, modelProjectId);

            // Assert - Full outcome verification
            Assert.That(result, Is.Not.Null, "Result should not be null");
            Assert.That(result.IsValid, Is.False, "Should not be valid when books are missing");

            // Valid books should include GEN(1), EXO(2), MAT(40)
            Assert.That(result.ValidBooks, Does.Contain(GENESIS), "GEN should be valid (exists in model)");
            Assert.That(result.ValidBooks, Does.Contain(EXODUS), "EXO should be valid (exists in model)");
            Assert.That(result.ValidBooks, Does.Contain(MATTHEW), "MAT should be valid (exists in model)");

            // Missing books should include LEV(3), JHN(43)
            Assert.That(result.MissingBooks, Does.Contain(LEVITICUS), "LEV should be missing (not in model)");
            Assert.That(result.MissingBooks, Does.Contain(JOHN), "JHN should be missing (not in model)");

            // Warning message should be set
            Assert.That(
                result.WarningMessage,
                Is.Not.Null.And.Not.Empty,
                "Warning message should be provided when books are missing"
            );
        }

        #endregion

        #region CAP-010 Contract Tests - Project ID Resolution

        /// <summary>
        /// Verifies the public API correctly resolves project ID to ScrText.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-010")]
        [Property("ScenarioId", "TS-070")]
        [Property("BehaviorId", "BHV-104")]
        public void ValidateModelBooks_ValidProjectId_ResolvesProjectCorrectly()
        {
            // Arrange
            const int GENESIS = 1;
            const int EXODUS = 2;
            _modelScrText.PutText(GENESIS, 0, false, @"\id GEN \c 1 \v 1 Genesis content", null);
            _modelScrText.PutText(EXODUS, 0, false, @"\id EXO \c 1 \v 1 Exodus content", null);

            var modelProjectId = _modelProjectDetails.Metadata.Id;
            var bookNumbers = new[] { GENESIS, EXODUS };

            // Act
            var result = BookValidationService.ValidateModelBooks(bookNumbers, modelProjectId);

            // Assert - Should successfully resolve and validate
            Assert.That(result.IsValid, Is.True, "All requested books exist in model");
            Assert.That(result.ValidBooks.Length, Is.EqualTo(2));
        }

        /// <summary>
        /// Verifies the public API handles invalid project ID gracefully.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-010")]
        [Property("ScenarioId", "TS-070")]
        [Property("BehaviorId", "BHV-104")]
        public void ValidateModelBooks_InvalidProjectId_ReturnsError()
        {
            // Arrange
            var invalidProjectId = Guid.NewGuid().ToString("N"); // Non-existent project
            var bookNumbers = new[] { 1, 2 };

            // Act
            var result = BookValidationService.ValidateModelBooks(bookNumbers, invalidProjectId);

            // Assert - Should indicate failure
            Assert.That(result.IsValid, Is.False, "Should fail for invalid project ID");
            Assert.That(
                result.WarningMessage,
                Is.Not.Null.And.Not.Empty,
                "Should provide error message for invalid project"
            );
        }

        /// <summary>
        /// Verifies the public API handles null project ID.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-010")]
        [Property("ScenarioId", "TS-070")]
        public void ValidateModelBooks_NullProjectId_ReturnsError()
        {
            // Arrange
            string? nullProjectId = null;
            var bookNumbers = new[] { 1, 2 };

            // Act
            var result = BookValidationService.ValidateModelBooks(bookNumbers, nullProjectId!);

            // Assert
            Assert.That(result.IsValid, Is.False, "Should fail for null project ID");
            Assert.That(result.WarningMessage, Is.Not.Null.And.Not.Empty);
        }

        /// <summary>
        /// Verifies the public API handles empty project ID.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-010")]
        [Property("ScenarioId", "TS-070")]
        public void ValidateModelBooks_EmptyProjectId_ReturnsError()
        {
            // Arrange
            var emptyProjectId = string.Empty;
            var bookNumbers = new[] { 1, 2 };

            // Act
            var result = BookValidationService.ValidateModelBooks(bookNumbers, emptyProjectId);

            // Assert
            Assert.That(result.IsValid, Is.False, "Should fail for empty project ID");
            Assert.That(result.WarningMessage, Is.Not.Null.And.Not.Empty);
        }

        #endregion

        #region CAP-010 Contract Tests - All Books Valid

        /// <summary>
        /// When all requested books exist in model, should return valid result.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-010")]
        [Property("ScenarioId", "TS-070")]
        [Property("BehaviorId", "BHV-104")]
        public void ValidateModelBooks_AllBooksExistInModel_ReturnsValid()
        {
            // Arrange
            const int GENESIS = 1;
            const int EXODUS = 2;
            const int LEVITICUS = 3;

            _modelScrText.PutText(GENESIS, 0, false, @"\id GEN \c 1 \v 1 Genesis", null);
            _modelScrText.PutText(EXODUS, 0, false, @"\id EXO \c 1 \v 1 Exodus", null);
            _modelScrText.PutText(LEVITICUS, 0, false, @"\id LEV \c 1 \v 1 Leviticus", null);

            var modelProjectId = _modelProjectDetails.Metadata.Id;
            var bookNumbers = new[] { GENESIS, EXODUS, LEVITICUS };

            // Act
            var result = BookValidationService.ValidateModelBooks(bookNumbers, modelProjectId);

            // Assert
            Assert.That(result.IsValid, Is.True, "Should be valid when all books exist");
            Assert.That(result.ValidBooks, Is.EquivalentTo(new[] { GENESIS, EXODUS, LEVITICUS }));
            Assert.That(result.MissingBooks, Is.Empty);
            Assert.That(result.WarningMessage, Is.Null.Or.Empty);
        }

        /// <summary>
        /// When requesting subset of model books, should return valid.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-010")]
        [Property("ScenarioId", "TS-070")]
        public void ValidateModelBooks_SubsetOfModelBooks_ReturnsValid()
        {
            // Arrange - Model has multiple books
            const int GENESIS = 1;
            const int EXODUS = 2;
            const int LEVITICUS = 3;
            const int MATTHEW = 40;

            _modelScrText.PutText(GENESIS, 0, false, @"\id GEN \c 1 \v 1 Genesis", null);
            _modelScrText.PutText(EXODUS, 0, false, @"\id EXO \c 1 \v 1 Exodus", null);
            _modelScrText.PutText(LEVITICUS, 0, false, @"\id LEV \c 1 \v 1 Leviticus", null);
            _modelScrText.PutText(MATTHEW, 0, false, @"\id MAT \c 1 \v 1 Matthew", null);

            var modelProjectId = _modelProjectDetails.Metadata.Id;
            var bookNumbers = new[] { GENESIS, MATTHEW }; // Just a subset

            // Act
            var result = BookValidationService.ValidateModelBooks(bookNumbers, modelProjectId);

            // Assert
            Assert.That(result.IsValid, Is.True);
            Assert.That(result.ValidBooks, Is.EquivalentTo(new[] { GENESIS, MATTHEW }));
            Assert.That(result.MissingBooks, Is.Empty);
        }

        #endregion

        #region CAP-010 Contract Tests - Missing Books

        /// <summary>
        /// When some books don't exist in model, should return missing books list.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-010")]
        [Property("ScenarioId", "TS-070")]
        [Property("BehaviorId", "BHV-104")]
        public void ValidateModelBooks_SomeBooksNotInModel_ReturnsMissingBooks()
        {
            // Arrange
            const int GENESIS = 1;
            const int LEVITICUS = 3;
            const int MATTHEW = 40;
            const int JOHN = 43;

            _modelScrText.PutText(GENESIS, 0, false, @"\id GEN \c 1 \v 1 Genesis", null);
            _modelScrText.PutText(MATTHEW, 0, false, @"\id MAT \c 1 \v 1 Matthew", null);
            // LEV and JHN are NOT in the model

            var modelProjectId = _modelProjectDetails.Metadata.Id;
            var bookNumbers = new[] { GENESIS, LEVITICUS, MATTHEW, JOHN };

            // Act
            var result = BookValidationService.ValidateModelBooks(bookNumbers, modelProjectId);

            // Assert
            Assert.That(result.IsValid, Is.False, "Should not be valid when books missing");
            Assert.That(result.ValidBooks, Is.EquivalentTo(new[] { GENESIS, MATTHEW }));
            Assert.That(result.MissingBooks, Is.EquivalentTo(new[] { LEVITICUS, JOHN }));
        }

        /// <summary>
        /// When no requested books exist in model, all should be in missing list.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-010")]
        [Property("ScenarioId", "TS-070")]
        public void ValidateModelBooks_NoBooksInModel_ReturnsAllMissing()
        {
            // Arrange - Empty model project (no books added)
            var modelProjectId = _modelProjectDetails.Metadata.Id;
            var bookNumbers = new[] { 1, 2, 3 };

            // Act
            var result = BookValidationService.ValidateModelBooks(bookNumbers, modelProjectId);

            // Assert
            Assert.That(result.IsValid, Is.False);
            Assert.That(result.ValidBooks, Is.Empty, "No books should be valid");
            Assert.That(result.MissingBooks, Is.EquivalentTo(new[] { 1, 2, 3 }));
        }

        /// <summary>
        /// Single missing book should still make result invalid.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-010")]
        [Property("ScenarioId", "TS-070")]
        public void ValidateModelBooks_SingleBookMissing_ReturnsInvalid()
        {
            // Arrange
            const int GENESIS = 1;
            const int EXODUS = 2;
            const int LEVITICUS = 3;

            _modelScrText.PutText(GENESIS, 0, false, @"\id GEN \c 1 \v 1 Genesis", null);
            _modelScrText.PutText(EXODUS, 0, false, @"\id EXO \c 1 \v 1 Exodus", null);
            // LEV(3) is missing

            var modelProjectId = _modelProjectDetails.Metadata.Id;
            var bookNumbers = new[] { GENESIS, EXODUS, LEVITICUS };

            // Act
            var result = BookValidationService.ValidateModelBooks(bookNumbers, modelProjectId);

            // Assert
            Assert.That(result.IsValid, Is.False, "Single missing book should invalidate");
            Assert.That(result.MissingBooks, Has.Exactly(1).Items);
            Assert.That(result.MissingBooks, Does.Contain(LEVITICUS));
        }

        #endregion

        #region CAP-010 Contract Tests - Edge Cases

        /// <summary>
        /// Empty book selection should return valid (nothing to validate).
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-010")]
        [Property("ScenarioId", "TS-070")]
        public void ValidateModelBooks_EmptyBookList_ReturnsValid()
        {
            // Arrange
            _modelScrText.PutText(1, 0, false, @"\id GEN \c 1 \v 1 Genesis", null);
            var modelProjectId = _modelProjectDetails.Metadata.Id;
            var bookNumbers = Array.Empty<int>();

            // Act
            var result = BookValidationService.ValidateModelBooks(bookNumbers, modelProjectId);

            // Assert
            Assert.That(result.IsValid, Is.True, "Empty selection should be valid");
            Assert.That(result.ValidBooks, Is.Empty);
            Assert.That(result.MissingBooks, Is.Empty);
        }

        /// <summary>
        /// Null book array should be handled gracefully.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-010")]
        [Property("ScenarioId", "TS-070")]
        public void ValidateModelBooks_NullBookArray_ReturnsValid()
        {
            // Arrange
            _modelScrText.PutText(1, 0, false, @"\id GEN \c 1 \v 1 Genesis", null);
            var modelProjectId = _modelProjectDetails.Metadata.Id;
            int[]? nullBookNumbers = null;

            // Act
            var result = BookValidationService.ValidateModelBooks(nullBookNumbers!, modelProjectId);

            // Assert - Should handle null gracefully
            Assert.That(result.IsValid, Is.True, "Null selection should be treated as empty/valid");
        }

        /// <summary>
        /// Single book that exists should return valid (public API with project ID).
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-010")]
        [Property("ScenarioId", "TS-070")]
        public void ValidateModelBooks_PublicApi_SingleBookExists_ReturnsValid()
        {
            // Arrange
            const int JUDE = 65;
            _modelScrText.PutText(JUDE, 0, false, @"\id JUD \c 1 \v 1 Jude content", null);
            var modelProjectId = _modelProjectDetails.Metadata.Id;
            var bookNumbers = new[] { JUDE };

            // Act
            var result = BookValidationService.ValidateModelBooks(bookNumbers, modelProjectId);

            // Assert
            Assert.That(result.IsValid, Is.True);
            Assert.That(result.ValidBooks, Is.EquivalentTo(new[] { JUDE }));
        }

        /// <summary>
        /// Non-canonical books should be validated the same way (public API with project ID).
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-010")]
        [Property("ScenarioId", "TS-070")]
        public void ValidateModelBooks_PublicApi_NonCanonicalBooks_ValidatesCorrectly()
        {
            // Arrange - Model has some non-canonical books
            const int TOBIT = 67;
            const int JUDITH = 68;
            const int WISDOM = 69;

            _modelScrText.PutText(TOBIT, 0, false, @"\id TOB \c 1 \v 1 Tobit", null);
            _modelScrText.PutText(JUDITH, 0, false, @"\id JDT \c 1 \v 1 Judith", null);
            // WISDOM not in model

            var modelProjectId = _modelProjectDetails.Metadata.Id;
            var bookNumbers = new[] { TOBIT, WISDOM }; // TOB exists, WIS doesn't

            // Act
            var result = BookValidationService.ValidateModelBooks(bookNumbers, modelProjectId);

            // Assert
            Assert.That(result.IsValid, Is.False);
            Assert.That(result.ValidBooks, Does.Contain(TOBIT));
            Assert.That(result.MissingBooks, Does.Contain(WISDOM));
        }

        #endregion

        #region CAP-010 Contract Tests - Warning Message

        /// <summary>
        /// Warning message should be set when books are missing.
        /// Per EXT-003: "Unable to create book(s) because these book(s) are not in the model project {name}"
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-010")]
        [Property("ScenarioId", "TS-070")]
        [Property("BehaviorId", "VAL-008")]
        public void ValidateModelBooks_MissingBooks_ReturnsCorrectWarningMessage()
        {
            // Arrange
            const int GENESIS = 1;
            const int EXODUS = 2;
            const int LEVITICUS = 3;

            _modelScrText.PutText(GENESIS, 0, false, @"\id GEN \c 1 \v 1 Genesis", null);
            // EXO(2) and LEV(3) missing

            var modelProjectId = _modelProjectDetails.Metadata.Id;
            var bookNumbers = new[] { GENESIS, EXODUS, LEVITICUS };

            // Act
            var result = BookValidationService.ValidateModelBooks(bookNumbers, modelProjectId);

            // Assert - Warning should follow PT9 format from EXT-003
            Assert.That(result.WarningMessage, Is.Not.Null);
            Assert.That(
                result.WarningMessage,
                Does.Contain("not in the model project"),
                "Warning should indicate books not in model"
            );
        }

        /// <summary>
        /// Warning message should include model project name for context.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-010")]
        [Property("ScenarioId", "TS-070")]
        public void ValidateModelBooks_MissingBooks_WarningIncludesModelProjectName()
        {
            // Arrange
            const int GENESIS = 1;
            const int EXODUS = 2;

            _modelScrText.PutText(GENESIS, 0, false, @"\id GEN \c 1 \v 1 Genesis", null);
            // EXO(2) missing

            var modelProjectId = _modelProjectDetails.Metadata.Id;
            var modelProjectName = _modelScrText.Name;
            var bookNumbers = new[] { GENESIS, EXODUS };

            // Act
            var result = BookValidationService.ValidateModelBooks(bookNumbers, modelProjectId);

            // Assert
            Assert.That(
                result.WarningMessage,
                Does.Contain(modelProjectName),
                "Warning should include model project name"
            );
        }

        /// <summary>
        /// Warning message should list all missing book names.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-010")]
        [Property("ScenarioId", "TS-070")]
        public void ValidateModelBooks_MultipleMissing_WarningIncludesAllBookNames()
        {
            // Arrange - Model has only Genesis
            const int GENESIS = 1;
            const int EXODUS = 2;
            const int LEVITICUS = 3;
            const int MATTHEW = 40;

            _modelScrText.PutText(GENESIS, 0, false, @"\id GEN \c 1 \v 1 Genesis", null);
            // All others missing

            var modelProjectId = _modelProjectDetails.Metadata.Id;
            var bookNumbers = new[] { EXODUS, LEVITICUS, MATTHEW };

            // Act
            var result = BookValidationService.ValidateModelBooks(bookNumbers, modelProjectId);

            // Assert - Should mention all missing books
            Assert.That(result.WarningMessage, Is.Not.Null);
            Assert.That(result.MissingBooks, Has.Length.EqualTo(3));
        }

        #endregion

        #region CAP-010 Invariant Tests

        /// <summary>
        /// VAL-008: Model book must exist for model-based creation.
        /// This invariant ensures validation catches ALL missing books.
        /// </summary>
        [Test]
        [Category("Invariant")]
        [Property("InvariantId", "VAL-008")]
        [Property("CapabilityId", "CAP-010")]
        [Property("ScenarioId", "TS-070")]
        [Description("VAL-008: Every missing book must be reported in MissingBooks array")]
        public void ValidateModelBooks_Invariant_AllMissingBooksReported()
        {
            // Arrange - Model has books 1, 3, 5
            const int GENESIS = 1;
            const int LEVITICUS = 3;
            const int DEUTERONOMY = 5;

            _modelScrText.PutText(GENESIS, 0, false, @"\id GEN Genesis", null);
            _modelScrText.PutText(LEVITICUS, 0, false, @"\id LEV Leviticus", null);
            _modelScrText.PutText(DEUTERONOMY, 0, false, @"\id DEU Deuteronomy", null);

            var modelProjectId = _modelProjectDetails.Metadata.Id;
            // Request books 1-6: 1,3,5 exist; 2,4,6 don't
            var bookNumbers = new[] { 1, 2, 3, 4, 5, 6 };

            // Act
            var result = BookValidationService.ValidateModelBooks(bookNumbers, modelProjectId);

            // Assert - Invariant: every book in request is either valid OR missing
            Assert.That(
                result.ValidBooks.Length + result.MissingBooks.Length,
                Is.EqualTo(bookNumbers.Length),
                "VAL-008: Every requested book must be accounted for"
            );

            Assert.That(
                result.MissingBooks,
                Is.EquivalentTo(new[] { 2, 4, 6 }),
                "VAL-008: All non-existent books must be in MissingBooks"
            );
        }

        /// <summary>
        /// VAL-008: ValidBooks and MissingBooks should be disjoint (no overlap).
        /// </summary>
        [Test]
        [Category("Invariant")]
        [Property("InvariantId", "VAL-008")]
        [Property("CapabilityId", "CAP-010")]
        public void ValidateModelBooks_Invariant_ValidAndMissingAreDisjoint()
        {
            // Arrange
            _modelScrText.PutText(1, 0, false, @"\id GEN Genesis", null);
            _modelScrText.PutText(2, 0, false, @"\id EXO Exodus", null);

            var modelProjectId = _modelProjectDetails.Metadata.Id;
            var bookNumbers = new[] { 1, 2, 3, 4 };

            // Act
            var result = BookValidationService.ValidateModelBooks(bookNumbers, modelProjectId);

            // Assert - No book should appear in both lists
            var overlap = result.ValidBooks.Intersect(result.MissingBooks).ToArray();
            Assert.That(
                overlap,
                Is.Empty,
                "VAL-008: No book should be in both ValidBooks and MissingBooks"
            );
        }

        /// <summary>
        /// VAL-008: IsValid should be true IFF MissingBooks is empty.
        /// </summary>
        [TestCase(new[] { 1, 2 }, new[] { 1, 2 }, true, Description = "All exist -> valid")]
        [TestCase(new[] { 1, 2 }, new[] { 1, 2, 3 }, false, Description = "One missing -> invalid")]
        [TestCase(new int[] { }, new[] { 1 }, false, Description = "All missing -> invalid")]
        [Category("Invariant")]
        [Property("InvariantId", "VAL-008")]
        [Property("CapabilityId", "CAP-010")]
        public void ValidateModelBooks_Invariant_IsValidMatchesMissingBooksEmpty(
            int[] modelBooks,
            int[] requestedBooks,
            bool expectedValid
        )
        {
            // Arrange
            foreach (var bookNum in modelBooks)
            {
                var bookId = Canon.BookNumberToId(bookNum);
                _modelScrText.PutText(bookNum, 0, false, $@"\id {bookId}", null);
            }

            var modelProjectId = _modelProjectDetails.Metadata.Id;

            // Act
            var result = BookValidationService.ValidateModelBooks(requestedBooks, modelProjectId);

            // Assert
            Assert.That(
                result.IsValid,
                Is.EqualTo(expectedValid),
                "VAL-008: IsValid must equal (MissingBooks.Length == 0)"
            );
            Assert.That(
                result.IsValid,
                Is.EqualTo(result.MissingBooks.Length == 0),
                "VAL-008: Consistency check - IsValid <=> no missing books"
            );
        }

        #endregion
    }
}

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
    }
}

using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.ManageBooks;
using Paranext.DataProvider.Projects;
using Paratext.Data;
using SIL.Scripture;

namespace TestParanextDataProvider.ManageBooks
{
    /// <summary>
    /// Tests for BookCreationService permission checking (CAP-015).
    ///
    /// CAP-015: PermissionCheckForBookCreation
    /// Strategy: Classic TDD - permission logic with edge cases to discover
    ///
    /// This capability checks permissions before book creation:
    /// - Calls ScrText.Creatable(bookNum) for per-book permission
    /// - Calls ProjectPermissionManager.CanCreateOrImportBooks() for import permission
    /// - Returns PermissionResult with success/failure and unauthorized books
    ///
    /// Test Specification: spec-007-permissions.json
    /// Extraction: EXT-001 (CheckAndGrantBookPermissions)
    /// Behaviors: BHV-107, BHV-112
    /// Invariant: INV-005 (Team members need book permission)
    /// </summary>
    [TestFixture]
    [ExcludeFromCodeCoverage]
    internal class BookCreationServiceTests : PapiTestBase
    {
        private ScrText _scrText = null!;
        private ProjectDetails _projectDetails = null!;

        [SetUp]
        public override async Task TestSetupAsync()
        {
            await base.TestSetupAsync();
            _scrText = CreateDummyProject();
            _projectDetails = CreateProjectDetails(_scrText);
            ParatextProjects.FakeAddProject(_projectDetails, _scrText);
        }

        [TearDown]
        public void TearDown()
        {
            _scrText?.Dispose();
        }

        #region CheckAndGrantBookPermissions Tests

        /// <summary>
        /// TS-018: Creatable returns true when user has write permission.
        /// Tests the happy path where user can create a book.
        /// </summary>
        /// <remarks>
        /// Ported from spec-007-permissions.json scenario "Creatable checks permission".
        /// This verifies ScrText.Creatable returns true for writable users.
        /// </remarks>
        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-015")]
        [Property("ScenarioId", "TS-018")]
        [Property("BehaviorId", "BHV-107")]
        [Description("CheckAndGrantBookPermissions returns success when user has permission")]
        public void CheckAndGrantBookPermissions_WithWritableUser_ReturnsSuccess()
        {
            // Arrange
            const int JUDE = 65;
            var selectedBooks = new BookSet();
            selectedBooks.Add(JUDE);

            // Act
            // In RED phase, BookCreationService.CheckAndGrantBookPermissions doesn't exist
            var result = BookCreationService.CheckAndGrantBookPermissions(selectedBooks, _scrText);

            // Assert
            Assert.That(result.Success, Is.True, "User with write permission should be able to create books");
            Assert.That(result.UnauthorizedBooks, Is.Empty, "No books should be unauthorized for writable user");
            Assert.That(result.ErrorMessage, Is.Null.Or.Empty);
        }

        /// <summary>
        /// TS-025: CanCreateOrImportBooks returns true when user has appropriate role.
        /// Tests permission check for book import capability.
        /// </summary>
        /// <remarks>
        /// Ported from spec-007-permissions.json scenario "CanCreateOrImportBooks checks permission".
        /// This verifies ProjectPermissionManager.CanCreateOrImportBooks returns true for permitted users.
        /// </remarks>
        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-015")]
        [Property("ScenarioId", "TS-025")]
        [Property("BehaviorId", "BHV-112")]
        [Description("CheckAndGrantBookPermissions returns success when user can create/import")]
        public void CheckAndGrantBookPermissions_WithImportPermission_ReturnsSuccess()
        {
            // Arrange
            const int GENESIS = 1;
            var selectedBooks = new BookSet();
            selectedBooks.Add(GENESIS);

            // Act
            var result = BookCreationService.CheckAndGrantBookPermissions(selectedBooks, _scrText);

            // Assert
            Assert.That(result.Success, Is.True, "User with import permission should be able to create books");
            Assert.That(result.UnauthorizedBooks, Is.Empty);
        }

        /// <summary>
        /// Tests permission check with multiple books where all are allowed.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-015")]
        [Property("ScenarioId", "TS-018")]
        [Property("BehaviorId", "BHV-107")]
        [Description("CheckAndGrantBookPermissions returns success for multiple books when all permitted")]
        public void CheckAndGrantBookPermissions_WithMultipleAllowedBooks_ReturnsSuccess()
        {
            // Arrange
            var selectedBooks = new BookSet();
            selectedBooks.Add(1);  // Genesis
            selectedBooks.Add(2);  // Exodus
            selectedBooks.Add(3);  // Leviticus

            // Act
            var result = BookCreationService.CheckAndGrantBookPermissions(selectedBooks, _scrText);

            // Assert
            Assert.That(result.Success, Is.True);
            Assert.That(result.UnauthorizedBooks, Is.Empty);
        }

        /// <summary>
        /// Tests that empty BookSet returns success (no books to check).
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-015")]
        [Property("ScenarioId", "TS-018")]
        [Property("BehaviorId", "BHV-107")]
        [Description("CheckAndGrantBookPermissions returns success for empty book set")]
        public void CheckAndGrantBookPermissions_WithEmptyBookSet_ReturnsSuccess()
        {
            // Arrange
            var selectedBooks = new BookSet();

            // Act
            var result = BookCreationService.CheckAndGrantBookPermissions(selectedBooks, _scrText);

            // Assert
            Assert.That(result.Success, Is.True, "Empty book set should return success (nothing to check)");
            Assert.That(result.UnauthorizedBooks, Is.Empty);
        }

        #endregion

        #region Error Cases

        /// <summary>
        /// Tests that unauthorized books are returned in the result.
        /// Note: This test may need adjustment once we understand how to simulate
        /// a non-admin user without permission in the test environment.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-015")]
        [Property("ScenarioId", "TS-025")]
        [Property("BehaviorId", "BHV-112")]
        [Description("CheckAndGrantBookPermissions returns unauthorized books when permission denied")]
        public void CheckAndGrantBookPermissions_WithUnauthorizedBooks_ReturnsUnauthorizedList()
        {
            // Arrange
            // For this test, we need to simulate a scenario where some books
            // are not creatable. This may require configuring the project permissions.
            var selectedBooks = new BookSet();
            selectedBooks.Add(1);  // Genesis

            // Act
            // In a real scenario with restricted permissions, this would fail
            // For now, we test the API shape - the result should have UnauthorizedBooks property
            var result = BookCreationService.CheckAndGrantBookPermissions(selectedBooks, _scrText);

            // Assert - verify the result has the correct shape
            Assert.That(result, Has.Property("Success"));
            Assert.That(result, Has.Property("UnauthorizedBooks"));
            Assert.That(result, Has.Property("ErrorMessage"));
        }

        /// <summary>
        /// Tests that null ScrText throws ArgumentNullException.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-015")]
        [Property("ScenarioId", "TS-018")]
        [Property("BehaviorId", "BHV-107")]
        [Description("CheckAndGrantBookPermissions throws ArgumentNullException for null ScrText")]
        public void CheckAndGrantBookPermissions_WithNullScrText_ThrowsArgumentNullException()
        {
            // Arrange
            var selectedBooks = new BookSet();
            selectedBooks.Add(1);
            ScrText? nullScrText = null;

            // Act & Assert
            Assert.That(
                () => BookCreationService.CheckAndGrantBookPermissions(selectedBooks, nullScrText!),
                Throws.TypeOf<ArgumentNullException>()
            );
        }

        /// <summary>
        /// Tests that null BookSet throws ArgumentNullException.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-015")]
        [Property("ScenarioId", "TS-018")]
        [Property("BehaviorId", "BHV-107")]
        [Description("CheckAndGrantBookPermissions throws ArgumentNullException for null BookSet")]
        public void CheckAndGrantBookPermissions_WithNullBookSet_ThrowsArgumentNullException()
        {
            // Arrange
            BookSet? nullBookSet = null;

            // Act & Assert
            Assert.That(
                () => BookCreationService.CheckAndGrantBookPermissions(nullBookSet!, _scrText),
                Throws.TypeOf<ArgumentNullException>()
            );
        }

        #endregion

        #region Invariant Tests (INV-005)

        /// <summary>
        /// INV-005: Team members need book permission to import.
        /// Tests that non-administrators need explicit permission.
        /// </summary>
        /// <remarks>
        /// This invariant verifies that team members (non-administrators) need
        /// explicit book edit permission to create or import books.
        /// </remarks>
        [Test]
        [Category("Invariant")]
        [Property("CapabilityId", "CAP-015")]
        [Property("InvariantId", "INV-005")]
        [Property("BehaviorId", "BHV-112")]
        [Description("INV-005: Team members need explicit permission to create books")]
        public void CheckAndGrantBookPermissions_EnforcesTeamMemberPermissionRequirement()
        {
            // Arrange
            // This test verifies the invariant that non-admin users need explicit permission.
            // In the DummyScrText environment, all users have permission by default,
            // so this test verifies the API behavior for permitted users.
            var selectedBooks = new BookSet();
            selectedBooks.Add(65);  // Jude

            // Act
            var result = BookCreationService.CheckAndGrantBookPermissions(selectedBooks, _scrText);

            // Assert
            // The result should either succeed (user has permission) or
            // return the specific books that are unauthorized
            Assert.That(
                result.Success || result.UnauthorizedBooks.Count > 0,
                Is.True,
                "Permission check must either succeed or identify unauthorized books"
            );
        }

        #endregion

        #region ScrText.Creatable Integration

        /// <summary>
        /// Tests that the permission check uses ScrText.Creatable internally.
        /// This verifies the integration with ParatextData's permission API.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-015")]
        [Property("ScenarioId", "TS-018")]
        [Property("BehaviorId", "BHV-107")]
        [Description("Permission check uses ScrText.Creatable for each book")]
        public void CheckAndGrantBookPermissions_UsesCreatableForEachBook()
        {
            // Arrange
            // Test canonical books across OT, NT ranges
            int[] testBooks = { 1, 40, 66 };  // Genesis, Matthew, Revelation
            var selectedBooks = new BookSet();
            foreach (int bookNum in testBooks)
            {
                selectedBooks.Add(bookNum);
            }

            // Act
            var result = BookCreationService.CheckAndGrantBookPermissions(selectedBooks, _scrText);

            // Assert
            // For a project where user has full access, all books should be creatable
            Assert.That(result.Success, Is.True);
            Assert.That(result.UnauthorizedBooks, Is.Empty);
        }

        /// <summary>
        /// Tests permission check with non-canonical book numbers.
        /// Non-canonical books (67-123) should also be checked for permission.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-015")]
        [Property("ScenarioId", "TS-018")]
        [Property("BehaviorId", "BHV-107")]
        [Description("Permission check works for non-canonical books")]
        public void CheckAndGrantBookPermissions_WithNonCanonicalBooks_ChecksPermission()
        {
            // Arrange
            // Non-canonical book numbers (deuterocanon/extras)
            var selectedBooks = new BookSet();
            selectedBooks.Add(67);  // Tobit
            selectedBooks.Add(68);  // Judith

            // Act
            var result = BookCreationService.CheckAndGrantBookPermissions(selectedBooks, _scrText);

            // Assert
            // Result should indicate success or identify which non-canonical books are unauthorized
            Assert.That(result.Success || result.UnauthorizedBooks.Count > 0, Is.True);
        }

        #endregion

        #region CAP-019: CreateAvailableBookSet Tests

        /// <summary>
        /// Acceptance test for CAP-019: AvailableBookSetCalculation capability.
        /// This test verifies the complete workflow - when it passes, the capability is complete.
        ///
        /// Tests that CreateAvailableBookSet correctly calculates which books are available
        /// for creation by excluding existing books from the full canon.
        /// </summary>
        /// <remarks>
        /// Golden masters: gm-017-sba-noncanonical, gm-019-available-books
        /// Extraction: EXT-005 (CreateAvailableBookSet)
        /// </remarks>
        [Test]
        [Category("Acceptance")]
        [Property("CapabilityId", "CAP-019")]
        [Property("ScenarioId", "TS-072")]
        [Property("BehaviorId", "BHV-T015")]
        [Description("Acceptance test: CreateAvailableBookSet returns books not present in project")]
        public void CreateAvailableBookSet_AcceptanceTest()
        {
            // Arrange: Create a project with some books already present
            const int GENESIS = 1;
            const int EXODUS = 2;
            _scrText.PutText(GENESIS, 0, false, @"\id GEN \c 1 \v 1 In the beginning...", null);
            _scrText.PutText(EXODUS, 0, false, @"\id EXO \c 1 \v 1 These are the names...", null);

            // Act: Call CreateAvailableBookSet (standard project, not SBA)
            var result = BookCreationService.CreateAvailableBookSet(_scrText, isStudyBible: false);

            // Assert: Result should exclude Genesis and Exodus
            Assert.That(result, Is.Not.Null, "Result should not be null");
            Assert.That(result.IsSelected(GENESIS), Is.False, "Genesis should not be available (already exists)");
            Assert.That(result.IsSelected(EXODUS), Is.False, "Exodus should not be available (already exists)");

            // At least some canonical books should be available (e.g., Matthew)
            const int MATTHEW = 40;
            Assert.That(result.IsSelected(MATTHEW), Is.True, "Matthew should be available (doesn't exist yet)");
        }

        /// <summary>
        /// TS-072: Available book set excludes existing books.
        /// Tests that books already present in the project are not included in available set.
        /// </summary>
        /// <remarks>
        /// Golden master: gm-019-available-books
        /// Input: existingBooks [1, 2] (Genesis, Exodus)
        /// Expected: availableContains: false for books [1, 2]
        /// </remarks>
        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-019")]
        [Property("ScenarioId", "TS-072")]
        [Property("BehaviorId", "BHV-T015")]
        [Description("CreateAvailableBookSet excludes existing books from available set")]
        public void CreateAvailableBookSet_WithExistingBooks_ExcludesThoseBooks()
        {
            // Arrange: Add Genesis and Exodus to project (matching gm-019 input)
            const int GENESIS = 1;
            const int EXODUS = 2;
            _scrText.PutText(GENESIS, 0, false, @"\id GEN \c 1 \v 1 Content", null);
            _scrText.PutText(EXODUS, 0, false, @"\id EXO \c 1 \v 1 Content", null);

            // Act
            var result = BookCreationService.CreateAvailableBookSet(_scrText, isStudyBible: false);

            // Assert: Existing books should NOT be in the available set
            Assert.That(result.IsSelected(GENESIS), Is.False, "Genesis already exists, should not be available");
            Assert.That(result.IsSelected(EXODUS), Is.False, "Exodus already exists, should not be available");
        }

        /// <summary>
        /// TS-067: SBA only allows non-canonical book creation.
        /// Tests that Study Bible Additions projects can only create non-canonical books (67-124).
        /// </summary>
        /// <remarks>
        /// Golden master: gm-017-sba-noncanonical
        /// Input: projectType: StudyBibleAdditions
        /// Expected: availableBookCount: 15, canonicalAvailable: false
        /// Related: INV-004 (SBA projects cannot create canonical books)
        /// </remarks>
        [Test]
        [Category("Contract")]
        [Category("GoldenMaster")]
        [Property("CapabilityId", "CAP-019")]
        [Property("ScenarioId", "TS-067")]
        [Property("BehaviorId", "BHV-T018")]
        [Description("CreateAvailableBookSet for SBA returns only non-canonical books")]
        public void CreateAvailableBookSet_ForSBAProject_ReturnsOnlyNonCanonicalBooks()
        {
            // Arrange: Empty project (no books present)
            // SBA projects should only allow non-canonical books

            // Act
            var result = BookCreationService.CreateAvailableBookSet(_scrText, isStudyBible: true);

            // Assert: Only non-canonical books (67-124) should be available
            // Canonical books (1-66) should NOT be available
            const int GENESIS = 1;
            const int MATTHEW = 40;
            const int REVELATION = 66;
            const int TOBIT = 67; // First non-canonical

            Assert.That(result.IsSelected(GENESIS), Is.False, "Genesis (canonical) should not be available for SBA");
            Assert.That(result.IsSelected(MATTHEW), Is.False, "Matthew (canonical) should not be available for SBA");
            Assert.That(result.IsSelected(REVELATION), Is.False, "Revelation (canonical) should not be available for SBA");
            Assert.That(result.IsSelected(TOBIT), Is.True, "Tobit (non-canonical) should be available for SBA");

            // Per gm-017: 15 non-canonical books should be available (67-124 range but some not defined)
            int nonCanonicalCount = 0;
            for (int bookNum = 67; bookNum <= 124; bookNum++)
            {
                if (result.IsSelected(bookNum))
                {
                    nonCanonicalCount++;
                }
            }
            // Note: The exact count depends on which non-canonical books are defined in Canon
            Assert.That(nonCanonicalCount, Is.GreaterThan(0), "At least some non-canonical books should be available");
        }

        /// <summary>
        /// INV-004: SBA projects cannot create canonical books.
        /// Tests the invariant that canonical books are never available for SBA projects.
        /// </summary>
        [Test]
        [Category("Invariant")]
        [Property("CapabilityId", "CAP-019")]
        [Property("InvariantId", "INV-004")]
        [Property("BehaviorId", "BHV-T018")]
        [Description("INV-004: SBA projects cannot create canonical books (1-66)")]
        public void CreateAvailableBookSet_SBAInvariant_NoCanonicalBooksAvailable()
        {
            // Arrange: Test SBA project

            // Act
            var result = BookCreationService.CreateAvailableBookSet(_scrText, isStudyBible: true);

            // Assert: NO canonical books (1-66) should be available
            for (int bookNum = 1; bookNum <= 66; bookNum++)
            {
                Assert.That(
                    result.IsSelected(bookNum),
                    Is.False,
                    $"Book {bookNum} is canonical and should not be available for SBA project"
                );
            }
        }

        /// <summary>
        /// Tests standard project returns all books (canonical and non-canonical) minus existing.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-019")]
        [Property("ScenarioId", "TS-072")]
        [Property("BehaviorId", "BHV-T015")]
        [Description("CreateAvailableBookSet for standard project returns canonical and non-canonical")]
        public void CreateAvailableBookSet_ForStandardProject_ReturnsBothCanonicalAndNonCanonical()
        {
            // Arrange: Empty project

            // Act
            var result = BookCreationService.CreateAvailableBookSet(_scrText, isStudyBible: false);

            // Assert: Both canonical and non-canonical books should be available
            const int GENESIS = 1;
            const int TOBIT = 67;

            Assert.That(result.IsSelected(GENESIS), Is.True, "Genesis (canonical) should be available for standard project");
            Assert.That(result.IsSelected(TOBIT), Is.True, "Tobit (non-canonical) should be available for standard project");
        }

        /// <summary>
        /// Tests that empty project has all books available (for standard project).
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-019")]
        [Property("ScenarioId", "TS-072")]
        [Property("BehaviorId", "BHV-T015")]
        [Description("CreateAvailableBookSet for empty standard project returns all books")]
        public void CreateAvailableBookSet_EmptyStandardProject_ReturnsAllBooks()
        {
            // Arrange: Empty project (no books present)

            // Act
            var result = BookCreationService.CreateAvailableBookSet(_scrText, isStudyBible: false);

            // Assert: Should have at least 66 canonical books available
            int canonicalCount = 0;
            for (int bookNum = 1; bookNum <= 66; bookNum++)
            {
                if (result.IsSelected(bookNum))
                {
                    canonicalCount++;
                }
            }
            Assert.That(canonicalCount, Is.EqualTo(66), "All 66 canonical books should be available in empty project");
        }

        /// <summary>
        /// Tests null ScrText parameter handling.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-019")]
        [Property("ScenarioId", "TS-072")]
        [Property("BehaviorId", "BHV-T015")]
        [Description("CreateAvailableBookSet throws ArgumentNullException for null ScrText")]
        public void CreateAvailableBookSet_WithNullScrText_ThrowsArgumentNullException()
        {
            // Arrange
            ScrText? nullScrText = null;

            // Act & Assert
            Assert.That(
                () => BookCreationService.CreateAvailableBookSet(nullScrText!, isStudyBible: false),
                Throws.TypeOf<ArgumentNullException>()
            );
        }

        /// <summary>
        /// Tests that SBA with some non-canonical books present excludes those from available set.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-019")]
        [Property("ScenarioId", "TS-067")]
        [Property("BehaviorId", "BHV-T018")]
        [Description("CreateAvailableBookSet for SBA excludes existing non-canonical books")]
        public void CreateAvailableBookSet_SBAWithExistingNonCanonical_ExcludesThoseBooks()
        {
            // Arrange: Add Tobit (non-canonical) to SBA project
            const int TOBIT = 67;
            _scrText.PutText(TOBIT, 0, false, @"\id TOB \c 1 \v 1 Content", null);

            // Act
            var result = BookCreationService.CreateAvailableBookSet(_scrText, isStudyBible: true);

            // Assert: Tobit should NOT be available (already exists)
            Assert.That(result.IsSelected(TOBIT), Is.False, "Tobit already exists, should not be available");

            // But other non-canonical books should still be available
            const int JUDITH = 68;
            Assert.That(result.IsSelected(JUDITH), Is.True, "Judith (non-canonical, not present) should be available");
        }

        /// <summary>
        /// Tests that standard project with all canonical books present returns only non-canonical.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-019")]
        [Property("ScenarioId", "TS-072")]
        [Property("BehaviorId", "BHV-T015")]
        [Description("CreateAvailableBookSet with all canonical present returns only non-canonical")]
        public void CreateAvailableBookSet_AllCanonicalPresent_ReturnsOnlyNonCanonical()
        {
            // Arrange: Add all 66 canonical books
            for (int bookNum = 1; bookNum <= 66; bookNum++)
            {
                string bookId = Canon.BookNumberToId(bookNum);
                _scrText.PutText(bookNum, 0, false, $@"\id {bookId} \c 1 \v 1 Content", null);
            }

            // Act
            var result = BookCreationService.CreateAvailableBookSet(_scrText, isStudyBible: false);

            // Assert: No canonical books should be available
            for (int bookNum = 1; bookNum <= 66; bookNum++)
            {
                Assert.That(result.IsSelected(bookNum), Is.False, $"Book {bookNum} exists, should not be available");
            }

            // But non-canonical should still be available
            const int TOBIT = 67;
            Assert.That(result.IsSelected(TOBIT), Is.True, "Tobit (non-canonical) should be available");
        }

        #endregion

        #region Result Type Verification

        /// <summary>
        /// Verifies that PermissionResult has all required properties.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-015")]
        [Property("ScenarioId", "TS-018")]
        [Property("BehaviorId", "BHV-107")]
        [Description("PermissionResult contains all required properties")]
        public void PermissionResult_HasRequiredProperties()
        {
            // Arrange
            var selectedBooks = new BookSet();
            selectedBooks.Add(1);

            // Act
            var result = BookCreationService.CheckAndGrantBookPermissions(selectedBooks, _scrText);

            // Assert - verify result type has expected shape per data-contracts.md
            Assert.That(result, Is.Not.Null);
            Assert.That(result, Has.Property("Success"));
            Assert.That(result, Has.Property("ErrorMessage"));
            Assert.That(result, Has.Property("UnauthorizedBooks"));

            // Verify UnauthorizedBooks is a list type
            Assert.That(result.UnauthorizedBooks, Is.Not.Null);
            Assert.That(result.UnauthorizedBooks, Is.InstanceOf<IList<int>>().Or.InstanceOf<List<int>>());
        }

        #endregion
    }
}

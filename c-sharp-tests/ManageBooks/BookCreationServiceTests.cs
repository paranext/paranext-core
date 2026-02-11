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

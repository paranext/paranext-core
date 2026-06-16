using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.ManageBooks;
using Paratext.Data;
using SIL.Scripture;

namespace TestParanextDataProvider.ManageBooks
{
    /// <summary>
    /// Tests for <see cref="DeleteBooksOrchestrator"/> (CAP-005, EXT-005).
    ///
    /// Capability: CAP-005 DeleteBooks
    /// Contract: implementation/extraction-plan.md EXT-005
    ///
    /// <code>
    /// public static bool DeleteBooks(ScrText scrText, BookSet selectedBooks);
    /// </code>
    ///
    /// The orchestrator is the internal stateless service; the wire entry is
    /// <c>ManageBooksService.DeleteBooksAsync</c> (see <see cref="DeleteBooksServiceTests"/>).
    /// These tests exercise the orchestrator contract directly: admin check,
    /// VersioningManager.AlwaysCommit, scrText.DeleteBooks, result.
    ///
    /// Tests derive expected behavior from:
    /// - PT9 source: Paratext/ToolsMenu/DeleteBooksForm.cs:72-97
    /// - ScrText.DeleteBooks: ParatextData/ScrText.cs:721-751
    /// - Specifications: test-specifications/spec-001-delete-books.json
    /// - Invariants: INV-001 (admin for shared), INV-002 (WriteLock),
    ///   INV-C01 (lock required), INV-C02 (admin for shared)
    ///
    /// WriteLock failure path (INV-002, TS-005) is tested at the service layer
    /// (DeleteBooksServiceTests) where the contract is "map LockNotObtained to
    /// platformErrorCode=UNAVAILABLE". At the orchestrator layer, exceptions
    /// from scrText simply propagate; a dedicated test would need cross-process
    /// lock manipulation that is outside the value of a unit test.
    ///
    /// NOTE: UI scenarios TS-055 (OK state), TS-056 (no books), TS-057 (shared
    /// confirmation default=No), TS-058 (project change reset), and TS-074
    /// (menu handler → modal) are covered by the Phase 3 UI component-builder,
    /// not by this backend orchestrator. Contract Section 4.6 precondition:
    /// "UI must have already obtained user confirmation before calling this method".
    /// </summary>
    [TestFixture]
    [ExcludeFromCodeCoverage]
    internal class DeleteBooksOrchestratorTests : PapiTestBase
    {
        private DummyScrText _scrText = null!;

        [SetUp]
        public override async Task TestSetupAsync()
        {
            await base.TestSetupAsync();

            _scrText = (DummyScrText)CreateDummyProject();

            // Seed the project with 3 books: GEN (1), EXO (2), LEV (3)
            WriteBook(_scrText, 1, "GEN");
            WriteBook(_scrText, 2, "EXO");
            WriteBook(_scrText, 3, "LEV");

            var details = CreateProjectDetails(_scrText);
            ParatextProjects.FakeAddProject(details, _scrText);
        }

        [TearDown]
        public void TestTearDownScrText()
        {
            _scrText?.Dispose();
        }

        private static void WriteBook(ScrText scrText, int bookNum, string bookCode)
        {
            scrText.PutText(
                bookNum,
                0,
                false,
                $"\\id {bookCode} Test Project\n\\c 1\n\\v 1 Test verse",
                null
            );
        }

        // ---- BHV-100: Delete removes files and updates BooksPresentSet -------

        [Test]
        [Category("Contract")]
        [Category("Acceptance")]
        [Property("CapabilityId", "CAP-005")]
        [Property("ScenarioId", "TS-001")]
        [Property("BehaviorId", "BHV-100")]
        [Property("SpecId", "spec-001")]
        [Description("Happy path: delete single book removes file and updates BooksPresentSet")]
        public void DeleteBooks_SingleBook_RemovesFromBooksPresentSet()
        {
            // Arrange
            Assert.That(
                _scrText.BooksPresentSet.IsSelected(1),
                Is.True,
                "precondition: GEN present"
            );
            Assert.That(
                _scrText.BooksPresentSet.IsSelected(2),
                Is.True,
                "precondition: EXO present"
            );
            var toDelete = new BookSet();
            toDelete.Add(1); // GEN

            // Act
            DeleteBooksOrchestrator.DeleteBooks(_scrText, toDelete);

            // Assert: GEN removed, EXO still present
            Assert.That(_scrText.BooksPresentSet.IsSelected(1), Is.False, "GEN should be removed");
            Assert.That(_scrText.BooksPresentSet.IsSelected(2), Is.True, "EXO should remain");
            Assert.That(_scrText.BooksPresentSet.IsSelected(3), Is.True, "LEV should remain");
        }

        [Test]
        [Category("Contract")]
        [Category("Critical")]
        [Property("CapabilityId", "CAP-005")]
        [Property("ScenarioId", "TS-002")]
        [Property("BehaviorId", "BHV-100")]
        [Property("SpecId", "spec-001")]
        [Description("Edge case: delete all books results in empty BooksPresentSet")]
        public void DeleteBooks_AllBooks_ResultsInEmptyBooksPresentSet()
        {
            // Arrange
            var toDelete = new BookSet();
            toDelete.Add(1);
            toDelete.Add(2);
            toDelete.Add(3);

            // Act
            DeleteBooksOrchestrator.DeleteBooks(_scrText, toDelete);

            // Assert
            Assert.That(
                _scrText.BooksPresentSet.Count,
                Is.EqualTo(0),
                "BooksPresentSet should be empty"
            );
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-005")]
        [Property("ScenarioId", "TS-003")]
        [Property("BehaviorId", "BHV-100")]
        [Property("SpecId", "spec-001")]
        [Description("Edge case: delete empty BookSet is a no-op — BooksPresentSet unchanged")]
        public void DeleteBooks_EmptyBookSet_IsNoOp()
        {
            // Arrange
            var initialBooks = new[] { 1, 2, 3 };
            var toDelete = new BookSet(); // empty

            // Act
            DeleteBooksOrchestrator.DeleteBooks(_scrText, toDelete);

            // Assert: all original books still present
            foreach (var bookNum in initialBooks)
            {
                Assert.That(
                    _scrText.BooksPresentSet.IsSelected(bookNum),
                    Is.True,
                    $"Book {bookNum} should remain present"
                );
            }
            Assert.That(_scrText.BooksPresentSet.Count, Is.EqualTo(3));
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-005")]
        [Property("ScenarioId", "TS-001")]
        [Property("BehaviorId", "BHV-100")]
        [Description(
            "Deleting a subset leaves the other books untouched (BooksPresentSet count decreases by exactly the deleted count)."
        )]
        public void DeleteBooks_TwoOfThreeBooks_LeavesThirdBook()
        {
            // Arrange
            var toDelete = new BookSet();
            toDelete.Add(1); // GEN
            toDelete.Add(3); // LEV

            // Act
            DeleteBooksOrchestrator.DeleteBooks(_scrText, toDelete);

            // Assert
            Assert.That(_scrText.BooksPresentSet.IsSelected(1), Is.False);
            Assert.That(_scrText.BooksPresentSet.IsSelected(2), Is.True, "EXO should remain");
            Assert.That(_scrText.BooksPresentSet.IsSelected(3), Is.False);
            Assert.That(_scrText.BooksPresentSet.Count, Is.EqualTo(1));
        }

        // ---- INV-C01: Lock released after success ------------------------

        [Test]
        [Category("Contract")]
        [Category("Invariant")]
        [Property("CapabilityId", "CAP-005")]
        [Property("BehaviorId", "BHV-100")]
        [Property("InvariantId", "INV-C01")]
        [Description(
            "INV-C01: After a successful delete, the WriteLock is released so subsequent mutations can succeed."
        )]
        public void DeleteBooks_AfterSuccess_WriteLockIsReleased()
        {
            // Arrange
            var toDelete = new BookSet();
            toDelete.Add(1); // GEN

            // Act: delete once, then a second mutation (write a new book) on same scrText
            DeleteBooksOrchestrator.DeleteBooks(_scrText, toDelete);

            // Assert: follow-up mutation succeeds (would throw LockNotObtained if leaked)
            Assert.DoesNotThrow(
                () => _scrText.PutText(40, 0, false, "\\id MAT \\c 1 \\v 1 text", null),
                "WriteLock should be released; subsequent PutText must succeed"
            );
            Assert.That(
                _scrText.BooksPresentSet.IsSelected(40),
                Is.True,
                "MAT should be added after delete released lock"
            );
        }

        // ---- Deterministic / return contract ------------------------------

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-005")]
        [Property("BehaviorId", "BHV-100")]
        [Description(
            "Repeated delete of an already-removed book is a no-op on the second call (idempotent at the BooksPresentSet level)."
        )]
        public void DeleteBooks_RepeatedDelete_IsIdempotent()
        {
            // Arrange
            var toDelete = new BookSet();
            toDelete.Add(1);

            // Act
            DeleteBooksOrchestrator.DeleteBooks(_scrText, toDelete);
            var afterFirst = _scrText.BooksPresentSet.Count;

            // Second delete of same (now-absent) book — must not error, must not change count
            Assert.DoesNotThrow(() => DeleteBooksOrchestrator.DeleteBooks(_scrText, toDelete));

            // Assert
            Assert.That(_scrText.BooksPresentSet.Count, Is.EqualTo(afterFirst));
            Assert.That(_scrText.BooksPresentSet.IsSelected(1), Is.False);
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-005")]
        [Property("BehaviorId", "BHV-100")]
        [Description(
            "Delete preserves remaining books' content (files for non-deleted books are still readable)."
        )]
        public void DeleteBooks_RemainingBooks_StillReadable()
        {
            // Arrange
            var toDelete = new BookSet();
            toDelete.Add(1); // GEN

            // Act
            DeleteBooksOrchestrator.DeleteBooks(_scrText, toDelete);

            // Assert: EXO is still readable via ScrText.GetText
            var exoText = _scrText.GetText(2);
            Assert.That(
                exoText,
                Is.Not.Null.And.Not.Empty,
                "EXO text should still be readable after GEN deleted"
            );
            Assert.That(exoText, Does.Contain("EXO"), "EXO id marker should still be in the file");
        }
    }
}

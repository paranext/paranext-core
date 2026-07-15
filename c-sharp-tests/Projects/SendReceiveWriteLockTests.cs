using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.JsonUtils;
using Paranext.DataProvider.ManageBooks;
using Paranext.DataProvider.Projects;
using Paranext.DataProvider.Projects.SendReceive;
using Paratext.Data;
using Paratext.Data.ProjectComments;
using SIL.Scripture;

namespace TestParanextDataProvider.Projects
{
    /// <summary>
    /// Unit tests for the process-wide <see cref="SendReceiveWriteLock"/> registry. Every test clears
    /// the (static) registry before and after so state never leaks between tests or to other fixtures.
    /// </summary>
    [ExcludeFromCodeCoverage]
    internal class SendReceiveWriteLockTests
    {
        [SetUp]
        public void SetUp() => SendReceiveWriteLock.Clear();

        [TearDown]
        public void TearDown() => SendReceiveWriteLock.Clear();

        [Test]
        public void IsBlocked_NothingSyncing_ReturnsFalse()
        {
            Assert.That(SendReceiveWriteLock.IsBlocked("projectA"), Is.False);
        }

        [Test]
        public void IsBlocked_ProjectSyncing_ReturnsTrueForThatProjectOnly()
        {
            SendReceiveWriteLock.SetSyncing(["projectA", "projectB"]);

            Assert.Multiple(() =>
            {
                Assert.That(SendReceiveWriteLock.IsBlocked("projectA"), Is.True);
                Assert.That(SendReceiveWriteLock.IsBlocked("projectB"), Is.True);
                Assert.That(SendReceiveWriteLock.IsBlocked("projectC"), Is.False);
            });
        }

        [Test]
        public void IsBlocked_ProjectIdCasingDiffers_StillBlocked()
        {
            SendReceiveWriteLock.SetSyncing(["AbCdEf123"]);

            Assert.Multiple(() =>
            {
                Assert.That(SendReceiveWriteLock.IsBlocked("abcdef123"), Is.True);
                Assert.That(SendReceiveWriteLock.IsBlocked("ABCDEF123"), Is.True);
            });
        }

        [Test]
        public void IsBlocked_NullOrEmptyProjectId_ReturnsFalse()
        {
            SendReceiveWriteLock.SetSyncing(["projectA"]);

            Assert.Multiple(() =>
            {
                Assert.That(SendReceiveWriteLock.IsBlocked(null), Is.False);
                Assert.That(SendReceiveWriteLock.IsBlocked(string.Empty), Is.False);
            });
        }

        [Test]
        public void SetSyncing_CalledAgain_ReplacesPreviousSet()
        {
            SendReceiveWriteLock.SetSyncing(["projectA"]);
            SendReceiveWriteLock.SetSyncing(["projectB"]);

            Assert.Multiple(() =>
            {
                Assert.That(SendReceiveWriteLock.IsBlocked("projectA"), Is.False);
                Assert.That(SendReceiveWriteLock.IsBlocked("projectB"), Is.True);
            });
        }

        [Test]
        public void Clear_AfterSetSyncing_UnblocksEverything()
        {
            SendReceiveWriteLock.SetSyncing(["projectA", "projectB"]);
            SendReceiveWriteLock.Clear();

            Assert.Multiple(() =>
            {
                Assert.That(SendReceiveWriteLock.IsBlocked("projectA"), Is.False);
                Assert.That(SendReceiveWriteLock.IsBlocked("projectB"), Is.False);
            });
        }

        [Test]
        public void ThrowIfBlocked_Blocked_ThrowsWithSentinel()
        {
            SendReceiveWriteLock.SetSyncing(["projectA"]);

            var ex = Assert.Throws<InvalidOperationException>(
                () => SendReceiveWriteLock.ThrowIfBlocked("projectA")
            );
            Assert.That(ex!.Message, Does.EndWith(SendReceiveWriteLock.EditBlockedSentinel));
        }

        [Test]
        public void ThrowIfBlocked_NotBlocked_DoesNotThrow()
        {
            Assert.DoesNotThrow(() => SendReceiveWriteLock.ThrowIfBlocked("projectA"));
        }
    }

    /// <summary>
    /// Verifies the write-gate is actually wired into every gated project-write entry point: each
    /// method is rejected (with the sentinel) while the project is registered as syncing. One
    /// round-trip test additionally proves a write succeeds again after <c>Clear()</c>.
    ///
    /// Covered here: all 11 <see cref="ParatextProjectDataProvider"/> write methods and the 5
    /// mutating <see cref="ManageBooksService"/> wire methods. The two
    /// <c>InventoryDataProvider</c> setters are gated identically but are private (only reachable
    /// through the PAPI wire dispatch), so they have no direct wiring test; the gate call itself is
    /// the same one-line <c>ThrowIfBlocked</c> covered by <see cref="SendReceiveWriteLockTests"/>.
    /// </summary>
    [ExcludeFromCodeCoverage]
    internal class SendReceiveWriteLockGateTests : PapiTestBase
    {
        private const string PdpName = "sendReceiveWriteLockGateTestProject";

        private ScrText _scrText = null!;
        private ProjectDetails _projectDetails = null!;
        private DummyParatextProjectDataProvider _provider = null!;
        private ManageBooksService _manageBooksService = null!;

        private string ProjectId => _projectDetails.Metadata.Id;

        [SetUp]
        public override async Task TestSetupAsync()
        {
            await base.TestSetupAsync();
            SendReceiveWriteLock.Clear();

            _scrText = CreateDummyProject();
            _projectDetails = CreateProjectDetails(_scrText);
            ParatextProjects.FakeAddProject(_projectDetails, _scrText);

            // Seed a book so the round-trip write has something valid to modify once the gate is
            // cleared. The entry-gate tests don't need it (they throw before touching the project).
            _scrText.PutText(
                1,
                0,
                false,
                @"\id GEN \ip intro \c 2 \p \v 1 verse one \c 3 \p \v 1 bla",
                null
            );

            _provider = new DummyParatextProjectDataProvider(
                PdpName,
                Client,
                _projectDetails,
                ParatextProjects
            );

            var pdpFactory = new ParatextProjectDataProviderFactory(Client, ParatextProjects);
            await pdpFactory.InitializeAsync();
            _manageBooksService = new ManageBooksService(Client, ParatextProjects, pdpFactory);
        }

        [TearDown]
        public void TearDown()
        {
            SendReceiveWriteLock.Clear();
            _scrText?.Dispose();
        }

        /// <summary>
        /// Marks this fixture's project as syncing, invokes <paramref name="write"/>, and asserts
        /// it is rejected with the sentinel-suffixed exception (before any mutation can happen).
        /// </summary>
        private void AssertWriteBlocked(TestDelegate write)
        {
            SendReceiveWriteLock.SetSyncing([ProjectId]);

            var ex = Assert.Throws<InvalidOperationException>(write);
            Assert.That(ex!.Message, Does.EndWith(SendReceiveWriteLock.EditBlockedSentinel));
        }

        /// <summary>Minimal comment for the comment-mutation gate tests (never dereferenced —
        /// the gate throws first).</summary>
        private PlatformCommentWrapper CreateMinimalCommentWrapper() =>
            new(new Comment(_scrText.User));

        [Test]
        public void SetChapterUsfm_ProjectSyncing_ThrowsWithSentinel_ThenSucceedsAfterClear()
        {
            var verseRef = new VerseRef(1, 2, 0);

            SendReceiveWriteLock.SetSyncing([ProjectId]);
            var ex = Assert.Throws<InvalidOperationException>(
                () => _provider.SetChapterUsfm(verseRef, @"\c 2 \p \v 2 New chapter text.")
            );
            Assert.That(ex!.Message, Does.EndWith(SendReceiveWriteLock.EditBlockedSentinel));

            SendReceiveWriteLock.Clear();
            Assert.That(
                _provider.SetChapterUsfm(verseRef, @"\c 2 \p \v 2 New chapter text."),
                Is.True,
                "Write should succeed once the project is no longer syncing"
            );
        }

        [Test]
        public void SetBookUsfm_ProjectSyncing_ThrowsWithSentinel() =>
            AssertWriteBlocked(
                () => _provider.SetBookUsfm(new VerseRef(1, 1, 0), @"\id GEN \c 1 \p \v 1 text")
            );

        [Test]
        public void SetBookUsx_ProjectSyncing_ThrowsWithSentinel() =>
            AssertWriteBlocked(() => _provider.SetBookUsx(new VerseRef(1, 1, 0), "<usx/>"));

        [Test]
        public void SetChapterUsx_ProjectSyncing_ThrowsWithSentinel() =>
            AssertWriteBlocked(() => _provider.SetChapterUsx(new VerseRef(1, 2, 0), "<usx/>"));

        [Test]
        public void SetProjectSetting_ProjectSyncing_ThrowsWithSentinel() =>
            AssertWriteBlocked(() => _provider.SetProjectSetting("platform.fullName", "New Name"));

        [Test]
        public void SetExtensionData_ProjectSyncing_ThrowsWithSentinel() =>
            AssertWriteBlocked(
                () =>
                    _provider.SetExtensionData(
                        new ProjectDataScope
                        {
                            ProjectID = ProjectId,
                            ExtensionName = "myExtension",
                            DataQualifier = "myFile.txt",
                        },
                        "data"
                    )
            );

        [Test]
        public void CreateComment_ProjectSyncing_ThrowsWithSentinel() =>
            AssertWriteBlocked(() => _provider.CreateComment(CreateMinimalCommentWrapper()));

        [Test]
        public void AddCommentToThread_ProjectSyncing_ThrowsWithSentinel() =>
            AssertWriteBlocked(() => _provider.AddCommentToThread(CreateMinimalCommentWrapper()));

        [Test]
        public void UpdateComment_ProjectSyncing_ThrowsWithSentinel() =>
            AssertWriteBlocked(() => _provider.UpdateComment("someCommentId", "<p>updated</p>"));

        [Test]
        public void DeleteComment_ProjectSyncing_ThrowsWithSentinel() =>
            AssertWriteBlocked(() => _provider.DeleteComment("someCommentId"));

        [Test]
        public void ResolveConflict_ProjectSyncing_ThrowsWithSentinel() =>
            AssertWriteBlocked(() => _provider.ResolveConflict("someThreadId", "accept"));

        // ManageBooksService wire methods (the gate is the first statement, so none of these need
        // the request contents to be otherwise valid). The methods are non-async Task methods, so
        // the gate's throw propagates synchronously at call time.

        [Test]
        public void DeleteBooks_ProjectSyncing_ThrowsWithSentinel() =>
            AssertWriteBlocked(
                () => _manageBooksService.DeleteBooksAsync(new DeleteBooksRequest(ProjectId, [1]))
            );

        [Test]
        public void CreateBooks_ProjectSyncing_ThrowsWithSentinel() =>
            AssertWriteBlocked(
                () =>
                    _manageBooksService.CreateBooksAsync(
                        new CreateBooksRequest(ProjectId, [1], CreationMethod.Empty, null)
                    )
            );

        [Test]
        public void CopyBooks_DestinationProjectSyncing_ThrowsWithSentinel() =>
            AssertWriteBlocked(
                () =>
                    _manageBooksService.CopyBooksAsync(
                        new CopyBooksRequest("someOtherProjectId", ProjectId, [1])
                    )
            );

        [Test]
        public void CopyCustomVersification_DestinationProjectSyncing_ThrowsWithSentinel() =>
            AssertWriteBlocked(
                () =>
                    _manageBooksService.CopyCustomVersificationAsync(
                        "someOtherProjectId",
                        ProjectId
                    )
            );

        [Test]
        public void ImportBooks_ProjectSyncing_ThrowsWithSentinel() =>
            AssertWriteBlocked(
                () =>
                    _manageBooksService.ImportBooksAsync(new ImportBooksInput(ProjectId, [], false))
            );
    }
}

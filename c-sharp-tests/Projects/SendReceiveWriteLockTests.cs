using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Projects;
using Paranext.DataProvider.Projects.SendReceive;
using Paratext.Data;
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
    /// Verifies the write-gate is actually wired into a project write: a Scripture write is rejected
    /// (with the sentinel) while the project is registered as syncing, and succeeds once cleared.
    /// </summary>
    [ExcludeFromCodeCoverage]
    internal class SendReceiveWriteLockGateTests : PapiTestBase
    {
        private const string PdpName = "sendReceiveWriteLockGateTestProject";

        private ScrText _scrText = null!;
        private ProjectDetails _projectDetails = null!;
        private DummyParatextProjectDataProvider _provider = null!;

        [SetUp]
        public override async Task TestSetupAsync()
        {
            await base.TestSetupAsync();
            SendReceiveWriteLock.Clear();

            _scrText = CreateDummyProject();
            _projectDetails = CreateProjectDetails(_scrText);
            ParatextProjects.FakeAddProject(_projectDetails, _scrText);

            // Seed a book so the write has something valid to modify once the gate is cleared.
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
        }

        [TearDown]
        public void TearDown()
        {
            SendReceiveWriteLock.Clear();
            _scrText?.Dispose();
        }

        [Test]
        public void SetChapterUsfm_ProjectSyncing_ThrowsWithSentinel_ThenSucceedsAfterClear()
        {
            var verseRef = new VerseRef(1, 2, 0);

            SendReceiveWriteLock.SetSyncing([_projectDetails.Metadata.Id]);
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
    }
}

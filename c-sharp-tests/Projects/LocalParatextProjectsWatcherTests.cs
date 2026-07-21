using System.Diagnostics.CodeAnalysis;
using System.Threading;
using Paranext.DataProvider;
using Paranext.DataProvider.Projects;

namespace TestParanextDataProvider.Projects
{
    /// <summary>
    /// Exercises the project-directory FileSystemWatcher in <see cref="LocalParatextProjects"/>: it
    /// must fire on a project's Settings.xml being created or deleted (a project added/removed on
    /// disk out-of-band, e.g. a Send/Receive clone) but NOT on other file churn (scripture text,
    /// comments, notes) which happens constantly during normal editing.
    /// </summary>
    [ExcludeFromCodeCoverage]
    internal class LocalParatextProjectsWatcherTests
    {
        /// <summary>
        /// Overrides the change handler to just count firings, so these tests observe the
        /// watcher/debounce wiring without touching the global <c>ScrTextCollection</c> (via
        /// RefreshScrTexts) or the real PAPI event. A non-null client is still required so the base
        /// class actually starts the watcher.
        /// </summary>
        private sealed class WatchingProjects(PapiClient papiClient)
            : LocalParatextProjects(papiClient)
        {
            private int _changeCount;

            public int ChangeCount => Volatile.Read(ref _changeCount);

            public void StartWatchingForTest() => StartWatchingProjectDirectory();

            protected override void OnProjectDirectoriesChanged() =>
                Interlocked.Increment(ref _changeCount);
        }

        // Generous so a slow CI box (FileSystemWatcher delivery + the 500ms debounce) doesn't flake.
        // A real regression still fails within this window because nothing ever fires.
        private const int FireTimeoutMs = 5000;
        private const int PollIntervalMs = 50;

        private string _tempRoot = null!;
        private WatchingProjects _projects = null!;

        [SetUp]
        public void SetUp()
        {
            _tempRoot = Path.Combine(Path.GetTempPath(), "pb-watcher-" + Path.GetRandomFileName());
            Directory.CreateDirectory(_tempRoot);

            // The constructor reads PLATFORM_BIBLE_PROJECT_ROOT_FOLDER once to set the root; restore
            // it immediately afterward so this process-global env var never leaks past construction.
            string? original = Environment.GetEnvironmentVariable(
                "PLATFORM_BIBLE_PROJECT_ROOT_FOLDER"
            );
            Environment.SetEnvironmentVariable("PLATFORM_BIBLE_PROJECT_ROOT_FOLDER", _tempRoot);
            try
            {
                _projects = new WatchingProjects(new DummyPapiClient());
            }
            finally
            {
                Environment.SetEnvironmentVariable("PLATFORM_BIBLE_PROJECT_ROOT_FOLDER", original);
            }
            _projects.StartWatchingForTest();
        }

        [TearDown]
        public void TearDown()
        {
            _projects.Dispose();
            try
            {
                Directory.Delete(_tempRoot, recursive: true);
            }
            catch
            {
                // Best-effort temp cleanup; a leftover temp dir must not fail the test run.
            }
        }

        /// <summary>
        /// Creates a project subdirectory, then (after a brief pause so the recursive watch is
        /// established) writes its Settings.xml, and returns the Settings.xml path.
        /// </summary>
        private string AddProjectSettingsFile(string projectName)
        {
            var projectDir = Path.Combine(_tempRoot, projectName);
            Directory.CreateDirectory(projectDir);
            // Let the watcher register the new subdirectory before we create the file in it (Linux
            // inotify adds recursive watches asynchronously).
            Thread.Sleep(300);
            var settingsPath = Path.Combine(projectDir, "Settings.xml");
            File.WriteAllText(settingsPath, "<ScriptureText/>");
            return settingsPath;
        }

        [Test]
        public void CreatingProjectSettingsFile_FiresChange()
        {
            AddProjectSettingsFile("AddedProject");

            Assert.That(
                () => _projects.ChangeCount,
                Is.GreaterThan(0).After(FireTimeoutMs, PollIntervalMs),
                "Adding a project's Settings.xml should fire a projects-changed refresh"
            );
        }

        [Test]
        public void DeletingProjectSettingsFile_FiresChange()
        {
            var settingsPath = AddProjectSettingsFile("RemovedProject");
            // Wait for the add to fire first so the delete is a distinct (post-debounce) event rather
            // than being coalesced with the create.
            Assert.That(
                () => _projects.ChangeCount,
                Is.GreaterThan(0).After(FireTimeoutMs, PollIntervalMs)
            );
            var countAfterAdd = _projects.ChangeCount;

            File.Delete(settingsPath);

            Assert.That(
                () => _projects.ChangeCount,
                Is.GreaterThan(countAfterAdd).After(FireTimeoutMs, PollIntervalMs),
                "Deleting a project's Settings.xml should fire a projects-changed refresh"
            );
        }

        [Test]
        public void ModifyingExistingProjectSettingsFileContent_FiresChange()
        {
            // An in-place content rewrite of an existing project's Settings.xml (e.g. a Send/Receive
            // receive pulling an upstream FullName/Language/Editable change) is a Changed event, not
            // a create/delete/rename; it must still fire a projects-changed refresh so the picker /
            // Home / New Tab don't show stale display metadata.
            var settingsPath = AddProjectSettingsFile("EditedSettingsProject");
            // Wait for the create to fire so the in-place edit is a distinct (post-debounce) event.
            Assert.That(
                () => _projects.ChangeCount,
                Is.GreaterThan(0).After(FireTimeoutMs, PollIntervalMs)
            );
            var countAfterAdd = _projects.ChangeCount;

            // Rewrite the SAME file's content in place (no rename/delete).
            File.WriteAllText(settingsPath, "<ScriptureText FullName=\"Upstream Rename\"/>");

            Assert.That(
                () => _projects.ChangeCount,
                Is.GreaterThan(countAfterAdd).After(FireTimeoutMs, PollIntervalMs),
                "An in-place content rewrite of Settings.xml should fire a projects-changed refresh"
            );
        }

        [Test]
        public void ChangingNonSettingsFile_DoesNotFireChange()
        {
            // Normal editing churn - scripture text, comments, notes - must not trigger a refresh.
            var projectDir = Path.Combine(_tempRoot, "EditedProject");
            Directory.CreateDirectory(projectDir);
            Thread.Sleep(300);
            File.WriteAllText(Path.Combine(projectDir, "01GENESIS.SFM"), "\\id GEN");
            File.WriteAllText(Path.Combine(projectDir, "Notes_user.xml"), "<notes/>");

            // The "Settings.xml" filter excludes these by name, so nothing is ever queued; a short
            // wait confirms no stray event arrives.
            Thread.Sleep(1000);
            Assert.That(
                _projects.ChangeCount,
                Is.EqualTo(0),
                "Only Settings.xml add/remove should fire; other file churn must be ignored"
            );
        }
    }
}

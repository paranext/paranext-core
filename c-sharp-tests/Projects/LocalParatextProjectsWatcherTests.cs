using System.Diagnostics.CodeAnalysis;
using System.Threading;
using Paranext.DataProvider;
using Paranext.DataProvider.Projects;

namespace TestParanextDataProvider.Projects
{
    /// <summary>
    /// Exercises the non-recursive project/resource container watchers in
    /// <see cref="LocalParatextProjects"/>. They must fire on a project FOLDER being
    /// added/removed/renamed under the root (or _projectsById) and on a resource file
    /// (.p8z/.xml1z) being added/removed/updated in _Resources/_resourcesById, but NOT on
    /// churn inside a project folder (.hg Mercurial writes, scripture .SFM saves) nor on an
    /// in-place Settings.xml content rewrite (that is handled inline by the writer, not the
    /// watcher).
    /// </summary>
    [ExcludeFromCodeCoverage]
    internal class LocalParatextProjectsWatcherTests
    {
        /// <summary>
        /// Overrides the change handler to just count firings, so these tests observe the
        /// watcher/debounce wiring without touching the global <c>ScrTextCollection</c> (via
        /// RefreshScrTexts) or the real PAPI event. A non-null client is still required so the
        /// base class actually starts the watchers.
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

        // Generous so a slow CI box (FileSystemWatcher delivery + the 500ms debounce) doesn't
        // flake. A real regression still fails within this window because nothing ever fires.
        private const int FireTimeoutMs = 5000;
        private const int PollIntervalMs = 50;

        // Long enough that, if an event were going to arrive, it would have (delivery + debounce),
        // so a "count is unchanged" assertion is meaningful rather than merely early.
        private const int QuiesceMs = 1500;

        private string _tempRoot = null!;
        private WatchingProjects _projects = null!;

        [SetUp]
        public void SetUp()
        {
            _tempRoot = Path.Combine(Path.GetTempPath(), "pb-watcher-" + Path.GetRandomFileName());
            Directory.CreateDirectory(_tempRoot);

            // The constructor reads PLATFORM_BIBLE_PROJECT_ROOT_FOLDER once to set the root;
            // restore it immediately so this process-global env var never leaks past construction.
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
        /// Creates a directory and waits until at least one change has fired (its creation is a
        /// DirectoryName event on the parent container). Returns the change count observed after
        /// that fire, so a follow-up action can be asserted as a DISTINCT increment.
        /// </summary>
        private int CreateDirectoryAndAwaitFire(string directory, string because)
        {
            var countBefore = _projects.ChangeCount;
            Directory.CreateDirectory(directory);
            Assert.That(
                () => _projects.ChangeCount,
                Is.GreaterThan(countBefore).After(FireTimeoutMs, PollIntervalMs),
                because
            );
            return _projects.ChangeCount;
        }

        [Test]
        public void CreatingProjectFolder_FiresChange()
        {
            CreateDirectoryAndAwaitFire(
                Path.Combine(_tempRoot, "AddedProject"),
                "Adding a project folder under the root should fire a projects-changed refresh"
            );
        }

        [Test]
        public void DeletingProjectFolder_FiresChange()
        {
            var projectDir = Path.Combine(_tempRoot, "RemovedProject");
            var countAfterAdd = CreateDirectoryAndAwaitFire(
                projectDir,
                "precondition: adding the project folder fires"
            );

            Directory.Delete(projectDir, recursive: true);

            Assert.That(
                () => _projects.ChangeCount,
                Is.GreaterThan(countAfterAdd).After(FireTimeoutMs, PollIntervalMs),
                "Deleting a project folder should fire a projects-changed refresh"
            );
        }

        [Test]
        public void RenamingProjectFolder_FiresChange()
        {
            var projectDir = Path.Combine(_tempRoot, "OrigName");
            var countAfterAdd = CreateDirectoryAndAwaitFire(
                projectDir,
                "precondition: adding the project folder fires"
            );

            Directory.Move(projectDir, Path.Combine(_tempRoot, "RenamedName"));

            Assert.That(
                () => _projects.ChangeCount,
                Is.GreaterThan(countAfterAdd).After(FireTimeoutMs, PollIntervalMs),
                "Renaming a project folder should fire a projects-changed refresh"
            );
        }

        [Test]
        public void ProjectFolderUnderProjectsById_FiresChange()
        {
            // _projectsById is an optional by-GUID projects container. Creating it triggers the
            // root watcher to lazily attach a watcher for it; a project folder created inside it
            // must then fire.
            var byIdDir = Path.Combine(_tempRoot, "_projectsById");
            var countAfterContainer = CreateDirectoryAndAwaitFire(
                byIdDir,
                "precondition: creating _projectsById fires (root watcher) and attaches its watcher"
            );

            Directory.CreateDirectory(Path.Combine(byIdDir, "ByIdProject"));

            Assert.That(
                () => _projects.ChangeCount,
                Is.GreaterThan(countAfterContainer).After(FireTimeoutMs, PollIntervalMs),
                "Adding a project folder inside _projectsById should fire a projects-changed refresh"
            );
        }

        [Test]
        public void InPlaceSettingsXmlRewrite_DoesNotFireChange()
        {
            // Deliberate design gap: a pure content rewrite of an existing project's Settings.xml
            // (a grandchild of the root) is invisible to the non-recursive container watchers. It
            // is notified inline by whoever writes it (core setSetting / DBL / PT10 S/R), not here.
            var projectDir = Path.Combine(_tempRoot, "EditedSettingsProject");
            var settingsPath = Path.Combine(projectDir, "Settings.xml");
            var countAfterFolder = CreateDirectoryAndAwaitFire(
                projectDir,
                "precondition: creating the project folder fires"
            );
            // Writing Settings.xml (a grandchild) must not fire; then rewrite it in place.
            File.WriteAllText(settingsPath, "<ScriptureText/>");
            Thread.Sleep(QuiesceMs);
            File.WriteAllText(settingsPath, "<ScriptureText FullName=\"Upstream Rename\"/>");
            Thread.Sleep(QuiesceMs);

            Assert.That(
                _projects.ChangeCount,
                Is.EqualTo(countAfterFolder),
                "An in-place Settings.xml rewrite must NOT fire the watcher (handled inline)"
            );
        }

        [Test]
        public void ScriptureFileWrite_DoesNotFireChange()
        {
            // Normal editing churn - scripture text, comments, notes - lives inside a project
            // folder (a grandchild of the root) and must be invisible to the non-recursive watch.
            var projectDir = Path.Combine(_tempRoot, "EditedProject");
            var countAfterFolder = CreateDirectoryAndAwaitFire(
                projectDir,
                "precondition: creating the project folder fires"
            );

            File.WriteAllText(Path.Combine(projectDir, "01GENESIS.SFM"), "\\id GEN");
            File.WriteAllText(Path.Combine(projectDir, "Notes_user.xml"), "<notes/>");
            Thread.Sleep(QuiesceMs);

            Assert.That(
                _projects.ChangeCount,
                Is.EqualTo(countAfterFolder),
                "Scripture/comment/notes writes inside a project folder must not fire the watcher"
            );
        }

        [Test]
        public void MercurialWrite_DoesNotFireChange()
        {
            // A project's .hg store churns heavily during Send/Receive. It is a grandchild subtree
            // of the root and must never be watched (no recursion).
            var projectDir = Path.Combine(_tempRoot, "HgProject");
            var countAfterFolder = CreateDirectoryAndAwaitFire(
                projectDir,
                "precondition: creating the project folder fires"
            );

            var hgDir = Path.Combine(projectDir, ".hg", "store");
            Directory.CreateDirectory(hgDir);
            File.WriteAllText(Path.Combine(hgDir, "00changelog.i"), "hg-internal");
            Thread.Sleep(QuiesceMs);

            Assert.That(
                _projects.ChangeCount,
                Is.EqualTo(countAfterFolder),
                "Writes inside a project's .hg store must not fire the watcher"
            );
        }

        /// <summary>
        /// Creates a resource container directory (waiting for its creation to fire + be lazily
        /// attached), then returns the change count after that fire so a follow-up file write can
        /// be asserted as a distinct increment.
        /// </summary>
        private int CreateResourceContainerAndAwaitFire(string containerName)
        {
            return CreateDirectoryAndAwaitFire(
                Path.Combine(_tempRoot, containerName),
                $"precondition: creating {containerName} fires (root watcher) and attaches its watcher"
            );
        }

        [Test]
        public void ResourceFileAddedToResources_FiresChange()
        {
            var countAfterContainer = CreateResourceContainerAndAwaitFire("_Resources");

            File.WriteAllText(Path.Combine(_tempRoot, "_Resources", "NASB.p8z"), "resource");

            Assert.That(
                () => _projects.ChangeCount,
                Is.GreaterThan(countAfterContainer).After(FireTimeoutMs, PollIntervalMs),
                "Adding a .p8z resource to _Resources should fire a projects-changed refresh"
            );
        }

        [Test]
        public void XmlResourceFileAddedToResourcesById_FiresChange()
        {
            var countAfterContainer = CreateResourceContainerAndAwaitFire("_resourcesById");

            File.WriteAllText(
                Path.Combine(_tempRoot, "_resourcesById", "SOMEGUID.xml1z"),
                "resource"
            );

            Assert.That(
                () => _projects.ChangeCount,
                Is.GreaterThan(countAfterContainer).After(FireTimeoutMs, PollIntervalMs),
                "Adding a .xml1z resource to _resourcesById should fire a projects-changed refresh"
            );
        }

        [Test]
        public void ResourceFileUpdatedInPlace_FiresChange()
        {
            var countAfterContainer = CreateResourceContainerAndAwaitFire("_Resources");
            var resourcePath = Path.Combine(_tempRoot, "_Resources", "VUL07.p8z");
            File.WriteAllText(resourcePath, "v1");
            // Wait for the CREATE to fire (distinct from the container-creation fire) so the in-place
            // update is a genuinely separate, post-debounce event.
            Assert.That(
                () => _projects.ChangeCount,
                Is.GreaterThan(countAfterContainer).After(FireTimeoutMs, PollIntervalMs)
            );
            var countAfterCreate = _projects.ChangeCount;

            File.WriteAllText(resourcePath, "v2-newer-version");

            Assert.That(
                () => _projects.ChangeCount,
                Is.GreaterThan(countAfterCreate).After(FireTimeoutMs, PollIntervalMs),
                "An in-place overwrite of an existing resource should fire a projects-changed refresh"
            );
        }

        [Test]
        public void NonResourceFileInResources_DoesNotFireChange()
        {
            var countAfterContainer = CreateResourceContainerAndAwaitFire("_Resources");

            // Extensions ParatextData does not enumerate as resources (present on disk but not part
            // of the known-projects cache) must not fire.
            File.WriteAllText(Path.Combine(_tempRoot, "_Resources", "BHS.mbv1z"), "not-enumerated");
            File.WriteAllText(Path.Combine(_tempRoot, "_Resources", "notes.txt"), "unrelated");
            Thread.Sleep(QuiesceMs);

            Assert.That(
                _projects.ChangeCount,
                Is.EqualTo(countAfterContainer),
                "Non-.p8z/.xml1z files in _Resources must not fire the watcher"
            );
        }
    }
}

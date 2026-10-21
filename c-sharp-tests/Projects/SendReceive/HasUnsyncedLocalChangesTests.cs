using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider;
using Paranext.DataProvider.Projects;
using Paranext.DataProvider.Projects.SendReceive;
using Paratext.Data;
using Paratext.Data.Repository;

namespace TestParanextDataProvider.Projects.SendReceive
{
    /// <summary>
    /// Tests of <see cref="ParatextProjectSendReceiveService.HasUnsyncedLocalChanges"/> against a
    /// scripted Mercurial: the answer for each repository state, <see langword="null"/> when the
    /// repository cannot be read, and the log-once-per-failure-episode behavior.
    /// </summary>
    [TestFixture]
    [ExcludeFromCodeCoverage]
    internal class HasUnsyncedLocalChangesTests : PapiTestBase
    {
        private const string FailureLog = "Could not determine unsynced changes";

        private Hg? _originalHg;
        private ScriptedHg _hg = null!;
        private ScriptedService _service = null!;

        [SetUp]
        public void SetUpHg()
        {
            _originalHg = Hg.Default;
            _hg = new ScriptedHg();
            Hg.Default = _hg;
            _service = new ScriptedService(
                Client,
                new ParatextProjectDataProviderFactory(Client, ParatextProjects),
                new AppInfo("test", "1.0.0", "test"),
                ParatextProjects
            );
        }

        [TearDown]
        public void RestoreHg() => Hg.Default = _originalHg;

        [Test]
        public void UnsharedProject_IsNotUnsynced_WithoutTouchingTheRepository()
        {
            _hg.StatusFailure = new InvalidOperationException("must not be read");

            Assert.That(_service.HasUnsyncedLocalChanges(new DummyScrText()), Is.False);
        }

        [Test]
        public void UncommittedChanges_AreUnsynced()
        {
            _hg.Statuses["file.usfm"] = Hg.FileStatus.Modified;

            Assert.That(_service.HasUnsyncedLocalChanges(new SharedDummyScrText()), Is.True);
        }

        [Test]
        public void CleanRepositoryWithoutLastSyncedTip_IsNotUnsynced()
        {
            Assert.That(_service.HasUnsyncedLocalChanges(new SharedDummyScrText()), Is.False);
        }

        [Test]
        public void TipMovedSinceLastSync_IsUnsynced()
        {
            _service.LastSyncedTip = "t0";
            _hg.TipId = "t1";

            Assert.That(_service.HasUnsyncedLocalChanges(new SharedDummyScrText()), Is.True);
        }

        [Test]
        public void RepositoryReadFails_ReturnsNull()
        {
            _hg.StatusFailure = new InvalidOperationException("hg is gone");

            Assert.That(_service.HasUnsyncedLocalChanges(new SharedDummyScrText()), Is.Null);
        }

        [TestCase("Uncommitted", true, TestName = "LogsOncePerFailureEpisode_Uncommitted")]
        [TestCase("NoLastSyncedTip", false, TestName = "LogsOncePerFailureEpisode_NoLastSyncedTip")]
        [TestCase("TipComparison", true, TestName = "LogsOncePerFailureEpisode_TipComparison")]
        public void LogsOncePerFailureEpisode(string successPath, bool expectedAfterRecovery)
        {
            var project = new SharedDummyScrText();
            var original = Console.Error;
            var captured = new StringWriter();
            Console.SetError(captured);
            try
            {
                _hg.StatusFailure = new InvalidOperationException("hg is gone");
                _service.HasUnsyncedLocalChanges(project);
                _service.HasUnsyncedLocalChanges(project);
                Assert.That(CountOccurrences(captured.ToString(), FailureLog), Is.EqualTo(1));

                _hg.StatusFailure = null;
                switch (successPath)
                {
                    case "Uncommitted":
                        _hg.Statuses["file.usfm"] = Hg.FileStatus.Modified;
                        break;
                    case "TipComparison":
                        _service.LastSyncedTip = "t0";
                        _hg.TipId = "t1";
                        break;
                }
                Assert.That(
                    _service.HasUnsyncedLocalChanges(project),
                    Is.EqualTo(expectedAfterRecovery)
                );

                _hg.StatusFailure = new InvalidOperationException("hg is gone again");
                _service.HasUnsyncedLocalChanges(project);
                Assert.That(
                    CountOccurrences(captured.ToString(), FailureLog),
                    Is.EqualTo(2),
                    "a failure after a successful check is logged again"
                );
            }
            finally
            {
                Console.SetError(original);
            }
        }

        private static int CountOccurrences(string text, string value) =>
            text.Split(value).Length - 1;

        private sealed class ScriptedService(
            PapiClient client,
            ParatextProjectDataProviderFactory factory,
            AppInfo appInfo,
            LocalParatextProjects projects
        ) : ParatextProjectSendReceiveService(client, factory, appInfo, projects)
        {
            public string? LastSyncedTip { get; set; }

            protected internal override string? GetLastSyncedTipId(ScrText scrText) =>
                LastSyncedTip;
        }

        /// <summary>
        /// A Mercurial whose repository reads are scripted, so no process is spawned.
        /// </summary>
        private sealed class ScriptedHg : Hg
        {
            public Exception? StatusFailure { get; set; }
            public Dictionary<string, FileStatus> Statuses { get; } = [];
            public string? TipId { get; set; }

            public override bool IsRepository(string repository) => true;

            public override Dictionary<string, FileStatus> GetStatuses(
                string repository,
                string fromRev,
                string toRev,
                string filter = null!,
                string options = null!
            ) => StatusFailure is not null ? throw StatusFailure : new(Statuses);

            public override string GetTipId(string repository) => TipId!;
        }
    }
}

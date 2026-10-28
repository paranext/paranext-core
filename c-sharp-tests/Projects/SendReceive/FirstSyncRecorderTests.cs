using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Projects.SendReceive;

namespace TestParanextDataProvider.Projects.SendReceive
{
    /// <summary>
    /// Unit tests for <see cref="FirstSyncRecorder"/> through its test constructor: a fake state
    /// read, a recording write, and a background runner that holds the work until the test runs it.
    /// </summary>
    [TestFixture]
    [ExcludeFromCodeCoverage]
    internal class FirstSyncRecorderTests
    {
        private string? _state;
        private readonly List<string> _writes = [];
        private readonly List<Action> _queued = [];
        private bool _throwOnWrite;
        private FirstSyncRecorder _recorder = null!;

        [SetUp]
        public void SetUp()
        {
            _state = "pending";
            _writes.Clear();
            _queued.Clear();
            _throwOnWrite = false;
            _recorder = new FirstSyncRecorder(
                () => _state,
                value =>
                {
                    if (_throwOnWrite)
                        throw new InvalidOperationException("write failed");
                    _writes.Add(value);
                    _state = value;
                },
                work =>
                {
                    _queued.Add(work);
                    return Task.CompletedTask;
                }
            );
        }

        private static SyncActivityState Finished(SyncOutcome? outcome) =>
            new(false, []) { Outcome = outcome };

        private void RunQueued()
        {
            foreach (Action work in _queued.ToArray())
                work();
            _queued.Clear();
        }

        [Test]
        public void Succeeded_FromPending_WritesSyncedInBackground()
        {
            _recorder.OnSyncActivityChanged(Finished(SyncOutcome.Succeeded));
            Assert.That(_writes, Is.Empty, "the write is deferred off the raising thread");

            RunQueued();
            Assert.That(_writes, Is.EqualTo(new[] { "synced" }));
        }

        [TestCase("unknown")]
        [TestCase(null)]
        public void Succeeded_FromUnknown_WritesSynced(string? state)
        {
            _state = state;
            _recorder.OnSyncActivityChanged(Finished(SyncOutcome.Succeeded));
            RunQueued();
            Assert.That(_writes, Is.EqualTo(new[] { "synced" }));
        }

        [Test]
        public void Succeeded_WhenAlreadySynced_DoesNotWrite()
        {
            _state = "synced";
            _recorder.OnSyncActivityChanged(Finished(SyncOutcome.Succeeded));
            RunQueued();
            Assert.That(_writes, Is.Empty);
        }

        [Test]
        public void Failed_DoesNotWrite()
        {
            _recorder.OnSyncActivityChanged(Finished(SyncOutcome.Failed));
            RunQueued();
            Assert.That(_writes, Is.Empty);
        }

        [Test]
        public void NoOutcome_DoesNotWrite()
        {
            _recorder.OnSyncActivityChanged(Finished(null));
            RunQueued();
            Assert.That(_writes, Is.Empty);
        }

        [Test]
        public void StillSyncing_DoesNotWrite()
        {
            _recorder.OnSyncActivityChanged(
                new SyncActivityState(true, []) { Outcome = SyncOutcome.Succeeded }
            );
            RunQueued();
            Assert.That(_writes, Is.Empty);
        }

        [Test]
        public void WriteThrows_IsLoggedAndNextSuccessRetries()
        {
            _throwOnWrite = true;
            _recorder.OnSyncActivityChanged(Finished(SyncOutcome.Succeeded));
            Assert.DoesNotThrow(RunQueued);
            Assert.That(_writes, Is.Empty);

            _throwOnWrite = false;
            _recorder.OnSyncActivityChanged(Finished(SyncOutcome.Succeeded));
            RunQueued();
            Assert.That(_writes, Is.EqualTo(new[] { "synced" }));
        }
    }
}

using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Projects;

namespace TestParanextDataProvider.Projects
{
    /// <summary>
    /// Verifies the notify plumbing of <see cref="LocalParatextProjects"/>:
    /// <see cref="LocalParatextProjects.NotifyProjectsChanged"/> debounces — a burst of calls
    /// (e.g. an inline setting-write notify plus the watcher catching that same on-disk write, or a
    /// run of display-setting writes) must collapse into a single emitted
    /// <c>platform.onDidChangeProjects</c> event, since each event drives a full metadata refetch —
    /// and the watcher path funnels through the shared
    /// <see cref="LocalParatextProjects.RefreshAndNotifyProjectsChanged"/>, which itself no-ops
    /// before <see cref="LocalParatextProjects.Initialize"/> (an early writer must not broadcast
    /// a bogus project-list change off an uninitialised <c>ScrTextCollection</c>).
    /// </summary>
    [ExcludeFromCodeCoverage]
    internal class LocalParatextProjectsNotifyTests
    {
        // Generous so a slow CI box (the 500ms debounce plus scheduling jitter) doesn't flake.
        private const int SettleTimeoutMs = 5000;
        private const int PollIntervalMs = 50;

        // Window to prove an event does NOT arrive: comfortably past the 500ms notify debounce
        // (3x), so a wrongly-scheduled emit would land inside it.
        private static readonly TimeSpan NoEventSettleWindow = TimeSpan.FromMilliseconds(1500);

        /// <summary>
        /// Substitutes <see cref="LocalParatextProjects.RefreshAndNotifyProjectsChanged"/> with a
        /// counter and exposes the protected watcher callback, so the funnel test below can pin the
        /// delegation without touching the global <c>ScrTextCollection</c> (via RefreshScrTexts) or
        /// the real PAPI event.
        /// </summary>
        private sealed class FunnelObservingProjects(DummyPapiClient papiClient)
            : LocalParatextProjects(papiClient)
        {
            public int RefreshAndNotifyCallCount { get; private set; }

            public override void RefreshAndNotifyProjectsChanged() => RefreshAndNotifyCallCount++;

            public void FireOnProjectDirectoriesChanged() => OnProjectDirectoriesChanged();
        }

        [Test]
        public void OnProjectDirectoriesChanged_DelegatesToRefreshAndNotifyProjectsChanged()
        {
            // The watcher path must funnel through the shared refresh-then-notify method so its
            // best-effort contract (a refresh throw must not suppress the notify) and any test
            // substitution of the refresh apply to the inline and watcher paths alike.
            using var projects = new FunnelObservingProjects(new DummyPapiClient());

            projects.FireOnProjectDirectoriesChanged();

            Assert.That(
                projects.RefreshAndNotifyCallCount,
                Is.EqualTo(1),
                "the watcher callback must delegate to RefreshAndNotifyProjectsChanged"
            );
        }

        [Test]
        public void NotifyProjectsChanged_CoalescesRapidCallsIntoOneEvent()
        {
            var client = new DummyPapiClient();
            using var projects = new LocalParatextProjects(client);

            projects.NotifyProjectsChanged();
            projects.NotifyProjectsChanged();
            projects.NotifyProjectsChanged();

            Assert.That(
                () => client.SentEventCount,
                Is.EqualTo(1).After(SettleTimeoutMs, PollIntervalMs),
                "Rapid NotifyProjectsChanged calls should debounce into a single emitted event"
            );
            Assert.That(
                client.NextSentEvent.eventType,
                Is.EqualTo(LocalParatextProjects.PROJECTS_CHANGED_EVENT_TYPE)
            );
        }

        [Test]
        public void RefreshAndNotifyProjectsChanged_BeforeInitialize_DoesNotNotify()
        {
            // A writer can land before startup initialization completes (e.g. a sync finishing
            // before Initialize() has set up the ScrTextCollection). Refreshing then would scan
            // an uninitialised collection and broadcast a bogus project-list change, so the
            // funnel must no-op until Initialize completes.
            var client = new DummyPapiClient();
            using var projects = new LocalParatextProjects(client);

            projects.RefreshAndNotifyProjectsChanged();

            Assert.That(
                SpinWait.SpinUntil(() => client.SentEventCount > 0, NoEventSettleWindow),
                Is.False,
                "RefreshAndNotifyProjectsChanged before Initialize must not emit a project-list change"
            );

            // Control: the direct notify path has no initialization guard (it never touches the
            // ScrTextCollection), so an emit still arrives — proving the zero above pinned the
            // guard rather than a client that records nothing.
            projects.NotifyProjectsChanged();
            Assert.That(
                () => client.SentEventCount,
                Is.EqualTo(1).After(SettleTimeoutMs, PollIntervalMs),
                "NotifyProjectsChanged must still emit pre-Initialize"
            );
        }
    }
}

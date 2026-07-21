using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Projects;

namespace TestParanextDataProvider.Projects
{
    /// <summary>
    /// Verifies <see cref="LocalParatextProjects.NotifyProjectsChanged"/> debounces: a burst of calls
    /// (e.g. an inline setting-write notify plus the watcher catching that same on-disk write, or a
    /// run of display-setting writes) must collapse into a single emitted
    /// <c>platform.onDidChangeProjects</c> event, since each event drives a full metadata refetch.
    /// </summary>
    [ExcludeFromCodeCoverage]
    internal class LocalParatextProjectsNotifyTests
    {
        // Generous so a slow CI box (the 500ms debounce plus scheduling jitter) doesn't flake.
        private const int SettleTimeoutMs = 5000;
        private const int PollIntervalMs = 50;

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
    }
}

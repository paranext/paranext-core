using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Projects;
using Paranext.DataProvider.Services;
using Paratext.Data;
using SIL.Scripture;

namespace TestParanextDataProvider.Projects
{
    /// <summary>
    /// Unit tests for the <see cref="ParatextProjectDataProvider"/> copy-limit methods — i.e. the
    /// methods registered under the <c>platformScripture.CopyLimit</c> projectInterface.
    ///
    /// <c>GetBookCopyLimits</c> delegates to <see cref="ResourceCopyLimit.GetBookCopyLimits"/>,
    /// whose public-build body always returns <c>null</c> (no limit); <c>SetBookCopyLimits</c>
    /// exists only to satisfy the canonical DataProvider get/set contract and always throws.
    /// </summary>
    [ExcludeFromCodeCoverage]
    [TestFixture]
    internal class ParatextProjectDataProviderCopyLimitTests : PapiTestBase
    {
        private const string PdpName = "copyLimitTestProject";

        private ScrText _scrText = null!;
        private ProjectDetails _projectDetails = null!;
        private DummyParatextProjectDataProvider _provider = null!;

        [SetUp]
        public override async Task TestSetupAsync()
        {
            await base.TestSetupAsync();

            _scrText = CreateDummyProject();
            _projectDetails = CreateProjectDetails(_scrText);
            ParatextProjects.FakeAddProject(_projectDetails, _scrText);

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
            _scrText?.Dispose();
        }

        [Test]
        public void GetBookCopyLimits_PublicBuild_ReturnsNoLimit()
        {
            Assert.That(_provider.GetBookCopyLimits(new VerseRef("GEN", "1", "1", null)), Is.Null);
        }

        [Test]
        public void GetBookCopyLimits_RequestInAnotherVersification_PublicBuild_ReturnsNoLimit()
        {
            _scrText.Settings.Versification = ScrVers.English;
            Assert.That(
                _provider.GetBookCopyLimits(new VerseRef("MAL", "1", "1", ScrVers.Original)),
                Is.Null
            );
        }

        [Test]
        public void SetBookCopyLimits_AlwaysThrows()
        {
            Assert.Throws<NotSupportedException>(
                () => _provider.SetBookCopyLimits(new VerseRef("GEN", "1", "1", null), null)
            );
        }

        // --- data-update events --------------------------------------------------------------------
        // DummyPapiClient.SendEventAsync enqueues synchronously, so the events are queued when the
        // write returns; the assertions still drain-then-poll rather than sleep.
        private static readonly TimeSpan EventWaitTimeout = TimeSpan.FromSeconds(5);
        private static readonly TimeSpan EventSettleWindow = TimeSpan.FromMilliseconds(200);

        private void DrainEvents()
        {
            while (Client.SentEventCount > 0)
                _ = Client.NextSentEvent;
        }

        /// <summary>Every data-update event sent after <paramref name="write"/> runs.</summary>
        private List<(string eventType, object? eventParameters)> EventsSentBy(Action write)
        {
            DrainEvents();
            write();
            Assert.That(
                SpinWait.SpinUntil(() => Client.SentEventCount > 0, EventWaitTimeout),
                Is.True,
                "the write must send a data-update event"
            );
            // Let any further events of the same write arrive.
            SpinWait.SpinUntil(() => false, EventSettleWindow);
            var events = new List<(string eventType, object? eventParameters)>();
            while (Client.SentEventCount > 0)
                events.Add(Client.NextSentEvent);
            return events;
        }

        private static void AssertEveryEventRefreshesCopyLimits(
            List<(string eventType, object? eventParameters)> events
        )
        {
            Assert.That(events, Is.Not.Empty);
            foreach (var (_, eventParameters) in events)
                Assert.That(
                    eventParameters,
                    Is.EqualTo("*")
                        .Or.InstanceOf<List<string>>()
                        .And.Contains(ProjectDataType.BOOK_COPY_LIMITS),
                    "every update this provider sends must refresh the copy limits"
                );
        }

        [Test]
        public void BookCopyLimits_IsRefreshedByEveryUpdate_ChapterWrite()
        {
            _scrText.PutText(1, 0, false, @"\id GEN \c 1 \p \v 1 one \c 2 \p \v 1 two", null);

            var events = EventsSentBy(
                () => _provider.SetChapterUsfm(new VerseRef(1, 2, 0), @"\c 2 \p \v 1 changed")
            );

            AssertEveryEventRefreshesCopyLimits(events);
        }

        [Test]
        public async Task BookCopyLimits_IsRefreshedByEveryUpdate_SettingWrite()
        {
            await Client.RegisterRequestHandlerAsync(
                "object:ProjectSettingsService.isValid",
                new Func<string, object?, object?, object?, bool>(
                    (key, newValue, currentValue, allChanges) => true
                ),
                null
            );

            var events = EventsSentBy(
                () => _provider.SetProjectSetting(ProjectSettingsNames.PB_VERSIFICATION, 4)
            );

            AssertEveryEventRefreshesCopyLimits(events);
        }

        [Test]
        public void BookCopyLimits_IsRefreshedByEveryUpdate_ExtensionDataWrite()
        {
            var scope = new ProjectDataScope
            {
                ProjectID = _projectDetails.Metadata.Id,
                ExtensionName = "myExtension",
                DataQualifier = "myFile.txt",
            };

            var events = EventsSentBy(() => _provider.SetExtensionData(scope, "contents"));

            AssertEveryEventRefreshesCopyLimits(events);
        }

        [Test]
        public void FullProjectUpdate_IsSentAsEveryDataType()
        {
            var events = EventsSentBy(() => _provider.SendFullProjectUpdateEvent());

            Assert.That(events.Select(e => e.eventParameters), Is.EqualTo(new object[] { "*" }));
        }

        [Test]
        public void CopyLimitInterface_IsAdvertisedForPublishedProjects()
        {
            Assert.That(
                LocalParatextProjects.GetParatextProjectInterfaces(isPublished: true),
                Does.Contain(ProjectInterfaces.COPY_LIMIT)
            );
        }
    }
}

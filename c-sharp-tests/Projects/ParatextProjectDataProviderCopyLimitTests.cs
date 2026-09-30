using System.Diagnostics.CodeAnalysis;
using System.Reflection;
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
    /// <c>GetBookCopyLimits</c> delegates to <see cref="ResourceCopyLimit.GetBookCopyLimits"/>
    /// (through <c>BookCopyLimitsSource</c>, which tests replace), whose public-build body always
    /// returns <c>null</c> (no limit); <c>SetBookCopyLimits</c>
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
        public void GetBookCopyLimits_AsksForTheBookOfThisProject_AndReturnsTheAnswerAsItIs()
        {
            // The project and the request are in different versifications, and the request names a
            // chapter and verse, to show that only the book is used: the answer stays indexed by the
            // project's own chapter numbers, as the chapter-text endpoints are.
            _scrText.Settings.Versification = ScrVers.English;
            var limits = new int?[] { null, 11, 22, 33, 44 };
            var requests = new List<(ScrText scrText, int bookNum)>();
            _provider.BookCopyLimitsSource = (scrText, bookNum) =>
            {
                requests.Add((scrText, bookNum));
                return limits;
            };

            var result = _provider.GetBookCopyLimits(
                new VerseRef("MAL", "3", "5", ScrVers.Original)
            );

            Assert.That(result, Is.SameAs(limits));
            Assert.That(requests, Has.Count.EqualTo(1));
            Assert.That(requests[0].scrText, Is.SameAs(_scrText));
            Assert.That(requests[0].bookNum, Is.EqualTo(Canon.BookIdToNumber("MAL")));
        }

        [Test]
        public void BookCopyLimitsSource_DefaultsToResourceCopyLimit()
        {
            Assert.That(
                _provider.BookCopyLimitsSource.Method,
                Is.EqualTo(
                    typeof(ResourceCopyLimit).GetMethod(nameof(ResourceCopyLimit.GetBookCopyLimits))
                )
            );
        }

        [Test]
        public void ResourceCopyLimit_KeepsTheSignatureTheDownstreamPatchReplaces()
        {
            // Looked up by name rather than through `typeof`, so a rename or a move fails here
            // rather than being carried along by a refactoring tool.
            var type = typeof(ParatextProjectDataProvider).Assembly.GetType(
                "Paranext.DataProvider.Projects.ResourceCopyLimit"
            );
            Assert.That(type, Is.Not.Null, "ResourceCopyLimit must keep its name and namespace");

            var method = type!.GetMethod(
                "GetBookCopyLimits",
                BindingFlags.Public | BindingFlags.Static
            );
            Assert.That(method, Is.Not.Null, "GetBookCopyLimits must stay public and static");
            Assert.That(
                method!.GetParameters().Select(parameter => parameter.ParameterType),
                Is.EqualTo(new[] { typeof(ScrText), typeof(int) })
            );
            Assert.That(method.ReturnType, Is.EqualTo(typeof(int?[])));
            var nullability = new NullabilityInfoContext().Create(method.ReturnParameter);
            Assert.That(nullability.ReadState, Is.EqualTo(NullabilityState.Nullable));
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

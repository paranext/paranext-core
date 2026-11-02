using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider;
using Paranext.DataProvider.Projects;
using Paranext.DataProvider.Projects.SendReceive;

namespace TestParanextDataProvider.Projects.SendReceive
{
    /// <summary>
    /// Registration-documentation tests for the open-source
    /// <see cref="ParatextProjectSendReceiveService"/> stub: breakSyncLock and isAvailable are @experimental
    /// (see the TS declaration), so their registrations must carry experimental OpenRPC documentation
    /// (<c>x-experimental: true</c>) surfaced by <c>rpc.discover</c> — the same doc-assertion
    /// pattern as <c>VersificationConversionServiceTests</c>. Deliberately NOT named
    /// <c>ParatextProjectSendReceiveServiceTests</c> (or any of the per-feature
    /// <c>ParatextProjectSendReceiveService*Tests</c> names the Paratext 10 overlay adds),
    /// so the stub's tests and the overlay's tests can coexist.
    /// </summary>
    [TestFixture]
    [ExcludeFromCodeCoverage]
    internal class ParatextProjectSendReceiveServiceStubDocsTests : PapiTestBase
    {
        [Test]
        public async Task InitializeAsync_RegistersBreakSyncLockWithExperimentalDocs()
        {
            const string wireName = "command:paratextBibleSendReceive.breakSyncLock";
            var service = new ParatextProjectSendReceiveService(
                Client,
                new ParatextProjectDataProviderFactory(Client, ParatextProjects),
                new AppInfo("test", "1.0.0", "test"),
                ParatextProjects
            );

            await service.InitializeAsync();

            Assert.That(
                Client.IsHandlerRegistered(wireName),
                Is.True,
                "breakSyncLock handler registered under its exact wire name"
            );
            var docs = Client.GetDocumentationFor(wireName);
            Assert.That(docs, Is.Not.Null, "breakSyncLock registered with OpenRPC documentation");
            Assert.That(docs!.Method.Experimental, Is.True, "breakSyncLock marked experimental");
            Assert.That(
                docs.Method.Params.Select(p => p.Name),
                Is.EqualTo(new[] { "projectIds" }),
                "documents the single projectIds parameter"
            );
        }

        [Test]
        public async Task InitializeAsync_RegistersIsAvailableWithExperimentalDocs()
        {
            const string wireName = "command:paratextBibleSendReceive.isAvailable";
            var service = new ParatextProjectSendReceiveService(
                Client,
                new ParatextProjectDataProviderFactory(Client, ParatextProjects),
                new AppInfo("test", "1.0.0", "test"),
                ParatextProjects
            );

            await service.InitializeAsync();

            Assert.That(
                Client.IsHandlerRegistered(wireName),
                Is.True,
                "isAvailable handler registered under its exact wire name"
            );
            var docs = Client.GetDocumentationFor(wireName);
            Assert.That(docs, Is.Not.Null, "isAvailable registered with OpenRPC documentation");
            Assert.That(docs!.Method.Experimental, Is.True, "isAvailable marked experimental");
        }

        // Pins the seam, not the stub's own answer: the Paratext 10 patch replaces
        // IsSendReceiveAvailable's body, so asserting core's `false` here would fail in the patched
        // suite. What both builds rely on is that the command answers whatever that method answers.
        [TestCase(true)]
        [TestCase(false)]
        public async Task IsAvailableCommand_AnswersWhatIsSendReceiveAvailableAnswers(
            bool available
        )
        {
            var service = new FixedAvailabilityService(
                Client,
                new ParatextProjectDataProviderFactory(Client, ParatextProjects),
                new AppInfo("test", "1.0.0", "test"),
                ParatextProjects,
                available
            );

            await service.InitializeAsync();

            Assert.That(
                Client.InvokeRequestHandler("command:paratextBibleSendReceive.isAvailable"),
                Is.EqualTo(available)
            );
        }

        private sealed class FixedAvailabilityService(
            PapiClient client,
            ParatextProjectDataProviderFactory factory,
            AppInfo appInfo,
            LocalParatextProjects projects,
            bool available
        ) : ParatextProjectSendReceiveService(client, factory, appInfo, projects)
        {
            protected internal override bool IsSendReceiveAvailable() => available;
        }
    }
}

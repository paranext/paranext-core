using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider;
using Paranext.DataProvider.Projects;
using Paranext.DataProvider.Projects.SendReceive;

namespace TestParanextDataProvider.Projects.SendReceive
{
    /// <summary>
    /// Registration-documentation tests for the open-source
    /// <see cref="ParatextProjectSendReceiveService"/> stub: breakSyncLock is @experimental (see
    /// the TS declaration), so its registration must carry experimental OpenRPC documentation
    /// (<c>x-experimental: true</c>) surfaced by <c>rpc.discover</c> — the same doc-assertion
    /// pattern as <c>VersificationConversionServiceTests</c>. Deliberately NOT named
    /// <c>ParatextProjectSendReceiveServiceTests</c> (or any of the per-feature
    /// <c>ParatextProjectSendReceiveService*Tests</c> names the Paratext 10 Studio overlay adds),
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
    }
}

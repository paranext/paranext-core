using System.Diagnostics.CodeAnalysis;
using System.Text.Json;
using Paranext.DataProvider.Checks;
using Paranext.DataProvider.ParatextUtils;
using Paranext.DataProvider.Projects;
using TestParanextDataProvider.Projects;

namespace TestParanextDataProvider.Checks
{
    /// <summary>
    /// Startup behavior of <see cref="InventoryDataProvider"/> in snapshot mode: on a warm start
    /// the provider registers while project lists are still snapshot-served and the global
    /// ScrTextCollection is empty, so its startup probe (which reads any project's Settings.xml
    /// to enumerate inventory options) must resolve the probed project through the instance's
    /// targeted-load-aware path. The static lookup throws ProjectNotFoundException pre-scan, and
    /// because Program.cs registers this provider fire-and-forget, that failure would leave
    /// inventories unavailable for the whole session.
    /// </summary>
    [ExcludeFromCodeCoverage]
    [TestFixture]
    internal class InventoryDataProviderStartupTests
    {
        private const string APP_VERSION = "5.0.0-test";

        private DummyPapiClient _papiClient = null!;
        private TestLocalParatextProjectsInTempDir _localProjects = null!;

        [SetUp]
        public void SetUp()
        {
            _papiClient = new DummyPapiClient();
            _localProjects = new TestLocalParatextProjectsInTempDir(_papiClient);
        }

        [TearDown]
        public void TearDown()
        {
            _localProjects.Dispose();
            _papiClient.Dispose();
            // Snapshot mode arms process-wide one-shot state on PlatformScrTextCollection; clear
            // it so a failed test can't silently skip a later test's project refresh.
            PlatformScrTextCollection.ResetProjectRefreshDeferralStateForTesting();
        }

        [Test]
        public void RegisterDataProvider_SnapshotModePreScan_StartsUsingSnapshotServedProject()
        {
            string root = _localProjects.TestProjectRootFolder;
            _localProjects.CreateTempProject(
                "SNAP1",
                new ProjectDetails("SNAP1", new ProjectMetadata("aaaa2101", ["paratext"]), "SNAP1")
            );
            new ProjectMetadataSnapshotStore(root).WriteSnapshot(
                [
                    new ProjectMetadataSnapshotEntry(
                        Name: "SNAP1",
                        HomeDirectory: Path.Combine(root, "SNAP1"),
                        FullPath: Path.Combine(root, "SNAP1"),
                        IsResource: false,
                        IsXmlResource: false,
                        IsJoined: false,
                        FullName: "Snapshot Project",
                        Language: null,
                        LanguageTag: "en",
                        IsEditable: true,
                        Id: "AAAA2101"
                    ),
                ],
                APP_VERSION
            );
            _localProjects.TryEnterSnapshotMode(APP_VERSION);
            Assert.That(_localProjects.IsInSnapshotMode, Is.True, "Sanity: snapshot mode must arm");
            _localProjects.EnsureMinimalInitialized();

            var provider = new InventoryDataProvider(_papiClient, _localProjects);

            Assert.DoesNotThrow(
                () => provider.RegisterDataProviderAsync().GetAwaiter().GetResult(),
                "Registration must survive a warm (snapshot-served, pre-scan) start"
            );

            var inventories = (List<InventoryDetails>?)
                _papiClient.InvokeRequestHandler(
                    "object:platformScripture.inventoryDataProvider-data.getAvailableInventories",
                    default(JsonElement)
                );
            Assert.That(
                inventories,
                Is.Not.Null.And.Not.Empty,
                "Inventories must be available after a warm-start registration"
            );
        }
    }
}

using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Projects.DigitalBibleLibrary;
using Paratext.Data;
using Paratext.Data.Archiving;
using PtxUtils;

namespace TestParanextDataProvider.Projects.DigitalBibleLibrary
{
    /// <summary>
    /// Covers the update-status recheck the front end calls on every resource-list refresh, and the
    /// catalog projection behind it.
    ///
    /// Three things about it are contracts rather than implementation detail. It has to answer
    /// without reaching the DBL, including before the background catalog fetch has finished on
    /// startup, because the TypeScript side treats an absent entry as "unknown" and keeps its
    /// cached value — an exception or a network call here would instead stall or break the refresh.
    /// Its keys are DBL entry uids, which is what the TypeScript looks entries up by. And it is
    /// reached by name through `IDblResourcesProvider`, so its registered wire name is a
    /// cross-language contract: renaming either half without the other breaks the refresh silently
    /// at runtime rather than at compile time. The name also deliberately avoids the
    /// `get`/`set`/`subscribe` prefixes reserved for data-type accessors.
    ///
    /// NOT covered, deliberately: the body of <c>RecomputeDblResourcesUpdateStatus</c> past its
    /// <c>_hasFetchedResources</c> guard — the gate and the one line joining the two halves,
    /// <c>ProjectUpdateStatus(_resources, InstalledDblIds())</c>. Reaching it needs
    /// <c>_resources</c> populated, and its only writer is a live DBL download, so every test here
    /// returns at that guard. Replacing that call's arguments therefore passes the suite. Read the
    /// count below as covering the two halves, not the seam between them; the seam is verified by
    /// hand against a resource with a real pending update.
    /// </summary>
    [ExcludeFromCodeCoverage]
    internal class DblResourcesDataProviderTests : PapiTestBase
    {
        private const string RecomputeUpdateStatusWireName =
            "object:platformGetResources.dblResourcesProvider-data.recomputeDblResourcesUpdateStatus";

        /// <summary>
        /// A catalog entry whose <see cref="InstallableResource.ExistingScrText"/> throws. That
        /// property is the live project-collection lookup the installed-uid set exists to avoid, so
        /// a test that reaches it fails loudly instead of silently depending on collection state.
        /// </summary>
        private sealed class ThrowingLookupResource : InstallableResource
        {
            public override ScrText ExistingScrText =>
                throw new InvalidOperationException(
                    "ExistingScrText must not be consulted for this resource"
                );
        }

        /// <summary>
        /// A catalog entry backed by a local project, so <c>IsNewerThanCurrentlyInstalled</c> runs
        /// its real comparison chain instead of short-circuiting on "not installed".
        /// </summary>
        private sealed class InstalledResource(ScrText existing) : InstallableResource
        {
            public override ScrText ExistingScrText { get; } = existing;
        }

        private static InstallableResource ResourceWithUid(string dblEntryUid) =>
            new ThrowingLookupResource { DBLEntryUid = HexId.FromStr(dblEntryUid) };

        /// <summary>
        /// A local project that presents itself as an installed DBL resource. <see cref="ScrText"/>
        /// declares <c>IsResourceProject</c> as <c>virtual =&gt; false</c>, so a plain
        /// <see cref="DummyScrText"/> is filtered out of the scan before its DBL id is read.
        /// </summary>
        private sealed class FakeResourceScrText : DummyScrText
        {
            public override bool IsResourceProject => true;
        }

        /// <summary>
        /// A local project whose resource-project check throws, standing in for the corrupt
        /// <c>Settings.xml</c> that makes <c>IsResourceProject</c> and <c>Settings</c> fault.
        /// </summary>
        /// <remarks>
        /// The fault is armed after construction rather than from the start. Building and
        /// registering a <see cref="DummyScrText"/> reads its settings — the constructor reaches
        /// <c>Settings</c>, which resolves <c>Guid</c>, which consults <c>IsResourceProject</c> —
        /// so a double that throws immediately cannot be constructed at all.
        /// </remarks>
        private sealed class UnreadableScrText : DummyScrText
        {
            public bool IsUnreadable { get; set; }

            public override bool IsResourceProject =>
                IsUnreadable
                    ? throw new InvalidOperationException("This project's settings cannot be read")
                    : base.IsResourceProject;
        }

        private FakeResourceScrText AddInstalledResourceProject(string dblEntryUid)
        {
            FakeResourceScrText scrText = new();
            scrText.Settings.DBLId = HexId.FromStr(dblEntryUid);
            ScrTextCollection.Add(scrText, true);
            return scrText;
        }

        /// <summary>
        /// An installed entry that reports up to date. A <see cref="DummyScrText"/> is not a
        /// resource project, so once the name matches, <c>IsNewerThanCurrentlyInstalled</c> stops
        /// at its <c>!scrText.IsResourceProject</c> branch and returns false.
        /// </summary>
        private static InstallableResource UpToDateResource(string dblEntryUid, ScrText existing) =>
            new InstalledResource(existing)
            {
                DBLEntryUid = HexId.FromStr(dblEntryUid),
                Name = existing.Name,
            };

        /// <summary>
        /// An installed entry that reports an update available, via the name-mismatch branch of
        /// <c>IsNewerThanCurrentlyInstalled</c>.
        /// </summary>
        private static InstallableResource OutOfDateResource(string dblEntryUid, ScrText existing) =>
            new InstalledResource(existing)
            {
                DBLEntryUid = HexId.FromStr(dblEntryUid),
                Name = existing.Name + "-renamed",
            };

        [Test]
        public async Task RecomputeDblResourcesUpdateStatus_ReturnsEmptyBeforeCatalogIsFetched()
        {
            DblResourcesDataProvider provider = new(Client, ParatextProjects);

            var updateStatus = await provider.RecomputeDblResourcesUpdateStatus();

            Assert.That(updateStatus, Is.Empty);
        }

        [Test]
        public async Task RecomputeDblResourcesUpdateStatus_IsRegisteredUnderItsContractName()
        {
            DblResourcesDataProvider provider = new(Client, ParatextProjects);

            await provider.RegisterDataProviderAsync();

            Assert.That(
                Client.IsHandlerRegistered(RecomputeUpdateStatusWireName),
                Is.True,
                $"Expected '{RecomputeUpdateStatusWireName}' on the wire; "
                    + $"registered: {string.Join(", ", Client.RegisteredRequestTypes)}"
            );
        }

        [Test]
        public void ProjectUpdateStatus_KeysByDblEntryUid()
        {
            var resources = new[]
            {
                ResourceWithUid("97196133a859179b"),
                ResourceWithUid("6c21e835eb8ca3b2"),
            };

            var updateStatus = DblResourcesDataProvider.ProjectUpdateStatus(
                resources,
                new HashSet<string>()
            );

            Assert.That(
                updateStatus.Keys,
                Is.EquivalentTo(new[] { "97196133a859179b", "6c21e835eb8ca3b2" })
            );
        }

        /// <summary>
        /// The uninstalled answer is `true` — the same value ParatextData returns, since
        /// `IsNewerThanCurrentlyInstalled` opens with `if (!Installed) return true;`. Reaching it
        /// without touching the project collection is the whole point of the installed-uid set, and
        /// the throwing lookup is what proves the collection was not touched.
        /// </summary>
        [Test]
        public void ProjectUpdateStatus_ReportsUninstalledWithoutConsultingTheProjectCollection()
        {
            var resources = new[] { ResourceWithUid("97196133a859179b") };

            var updateStatus = DblResourcesDataProvider.ProjectUpdateStatus(
                resources,
                new HashSet<string>()
            );

            Assert.That(updateStatus["97196133a859179b"], Is.True);
        }

        /// <summary>
        /// A single failing entry must not cost the whole map. The TypeScript treats a missing key
        /// as "unknown" and keeps the value it has, so omitting one entry degrades one row, whereas
        /// letting the exception escape leaves every row stale for the session.
        /// </summary>
        [Test]
        public void ProjectUpdateStatus_SkipsOnlyTheEntryThatThrows()
        {
            var resources = new[]
            {
                ResourceWithUid("97196133a859179b"),
                ResourceWithUid("6c21e835eb8ca3b2"),
            };

            // Marking the first uid installed sends it down the ParatextData path, where this
            // fake's lookup throws; the second stays on the no-lookup path.
            var updateStatus = DblResourcesDataProvider.ProjectUpdateStatus(
                resources,
                new HashSet<string> { "97196133a859179b" }
            );

            Assert.Multiple(() =>
            {
                Assert.That(updateStatus.ContainsKey("97196133a859179b"), Is.False);
                Assert.That(updateStatus["6c21e835eb8ca3b2"], Is.True);
            });
        }

        /// <summary>
        /// An installed, current resource reports no update — the state this whole recheck exists
        /// to reach, since a stale `true` here is what left the row reading "Update" for the rest
        /// of the session.
        /// </summary>
        [Test]
        public void ProjectUpdateStatus_ReportsNoUpdateForAnInstalledCurrentResource()
        {
            using DummyScrText existing = new();
            var resources = new[] { UpToDateResource("97196133a859179b", existing) };

            var updateStatus = DblResourcesDataProvider.ProjectUpdateStatus(
                resources,
                new HashSet<string> { "97196133a859179b" }
            );

            Assert.That(updateStatus["97196133a859179b"], Is.False);
        }

        /// <summary>
        /// An installed resource whose DBL copy is newer reports an update. Without this the suite
        /// only ever asserts the `false` side, so the badge could stop appearing entirely — for
        /// every resource, whether or not an update exists — and stay green.
        /// </summary>
        [Test]
        public void ProjectUpdateStatus_ReportsAnUpdateForAnInstalledOutOfDateResource()
        {
            using DummyScrText existing = new();
            var resources = new[] { OutOfDateResource("97196133a859179b", existing) };

            var updateStatus = DblResourcesDataProvider.ProjectUpdateStatus(
                resources,
                new HashSet<string> { "97196133a859179b" }
            );

            Assert.That(updateStatus["97196133a859179b"], Is.True);
        }

        /// <summary>
        /// Duplicate uids resolve first-wins, matching `FindResource`'s `FirstOrDefault`, so the
        /// flag shown describes the same resource the install/uninstall buttons act on. The two
        /// entries deliberately disagree, which is the only way this can tell first-wins from the
        /// indexer's last-wins.
        /// </summary>
        [Test]
        public void ProjectUpdateStatus_ResolvesADuplicateUidToTheFirstEntry()
        {
            using DummyScrText existing = new();
            var resources = new[]
            {
                UpToDateResource("97196133a859179b", existing),
                OutOfDateResource("97196133a859179b", existing),
            };

            var updateStatus = DblResourcesDataProvider.ProjectUpdateStatus(
                resources,
                new HashSet<string> { "97196133a859179b" }
            );

            Assert.Multiple(() =>
            {
                Assert.That(updateStatus, Has.Count.EqualTo(1));
                Assert.That(updateStatus["97196133a859179b"], Is.False);
            });
        }

        /// <summary>
        /// The scan is what tells `ProjectUpdateStatus` which entries are worth asking ParatextData
        /// about. Reporting an installed resource as absent is the stuck-badge bug this fixture
        /// exists for, so the uid has to come back, and a project that is not a resource must not.
        /// </summary>
        [Test]
        public void InstalledDblIds_ReturnsResourceProjectDblIdsAndSkipsOtherProjects()
        {
            AddInstalledResourceProject("97196133a859179b");
            ScrTextCollection.Add(new DummyScrText(), true);

            var installedDblIds = DblResourcesDataProvider.InstalledDblIds();

            Assert.That(installedDblIds, Is.EquivalentTo(new[] { "97196133a859179b" }));
        }

        /// <summary>
        /// One unreadable project must cost only itself. Without the per-item guard the exception
        /// escapes the scan and faults the whole recheck, which leaves every row's flag stale for
        /// the rest of the session — the outcome the guard inside `ProjectUpdateStatus` also exists
        /// to prevent.
        /// </summary>
        [Test]
        public void InstalledDblIds_SkipsAnUnreadableProjectAndKeepsTheRest()
        {
            UnreadableScrText unreadable = new();
            ScrTextCollection.Add(unreadable, true);
            unreadable.IsUnreadable = true;
            AddInstalledResourceProject("6c21e835eb8ca3b2");

            var installedDblIds = DblResourcesDataProvider.InstalledDblIds();

            Assert.That(installedDblIds, Is.EquivalentTo(new[] { "6c21e835eb8ca3b2" }));
        }
    }
}

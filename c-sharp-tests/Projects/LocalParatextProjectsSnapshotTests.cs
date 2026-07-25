using System.Diagnostics;
using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.ParatextUtils;
using Paranext.DataProvider.Projects;
using Paranext.DataProvider.Projects.SendReceive;
using Paratext.Data;
using Paratext.Data.Users;
using SIL.TestUtilities;
using SIL.Xml;

namespace TestParanextDataProvider.Projects
{
    /// <summary>
    /// Behavior tests for <see cref="LocalParatextProjects"/> snapshot mode: serving project
    /// metadata from the persisted snapshot before the full ParatextData scan completes, then
    /// reconciling with (and switching to) live results once the scan runs. The no-snapshot path
    /// must keep today's behavior.
    /// </summary>
    [ExcludeFromCodeCoverage]
    [TestFixture]
    internal class LocalParatextProjectsSnapshotTests
    {
        private const string APP_VERSION = "5.0.0-test";

        // Generous so a slow CI box (fire-and-forget snapshot writes plus the 500ms notify
        // debounce plus scheduling jitter) doesn't flake.
        private const int SettleTimeoutMs = 10000;
        private const int PollIntervalMs = 50;

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
            // Snapshot-mode tests arm process-wide one-shot state on PlatformScrTextCollection
            // (the deferred-refresh latch and the pre-scan targeted-add flag). Clear it so a test
            // that failed partway through can't silently skip a later test's project refresh.
            PlatformScrTextCollection.ResetProjectRefreshDeferralStateForTesting();
        }

        private string Root => _localProjects.TestProjectRootFolder;

        private ProjectMetadataSnapshotStore CreateStore() => new(Root);

        /// <summary>Creates a real minimal project on disk in the temp project root.</summary>
        private void CreateTempProject(string folder, string id)
        {
            _localProjects.CreateTempProject(
                folder,
                new ProjectDetails(folder, new ProjectMetadata(id, ["paratext"]), folder)
            );
        }

        /// <summary>
        /// Builds a snapshot entry describing a folder-backed project in the temp root. Display
        /// fields default to deliberately "stale" values so tests can observe the switch from
        /// snapshot-served to live-scanned metadata.
        /// </summary>
        private ProjectMetadataSnapshotEntry CreateFolderEntry(
            string folder,
            string id,
            string? language = "Klingon",
            string? fullName = "Stale Full Name"
        )
        {
            return new ProjectMetadataSnapshotEntry(
                Name: folder,
                HomeDirectory: Path.Combine(Root, folder),
                FullPath: Path.Combine(Root, folder),
                IsResource: false,
                IsXmlResource: false,
                IsJoined: false,
                FullName: fullName,
                Language: language,
                LanguageTag: "en",
                IsEditable: true,
                Id: id.ToUpperInvariant()
            );
        }

        private ProjectMetadataSnapshotEntry CreateResourceEntry(string name, string id)
        {
            return new ProjectMetadataSnapshotEntry(
                Name: name,
                HomeDirectory: Root,
                FullPath: Path.Combine(Root, name + ".p8z"),
                IsResource: true,
                IsXmlResource: false,
                IsJoined: false,
                FullName: null,
                Language: null,
                LanguageTag: "en",
                IsEditable: false,
                Id: id.ToUpperInvariant()
            );
        }

        private void SeedSnapshot(params ProjectMetadataSnapshotEntry[] entries)
        {
            CreateStore().WriteSnapshot([.. entries], APP_VERSION);
        }

        [Test]
        public void TryEnterSnapshotMode_NoSnapshotFile_StaysInLiveMode()
        {
            _localProjects.TryEnterSnapshotMode(APP_VERSION);

            Assert.That(_localProjects.IsInSnapshotMode, Is.False);
        }

        [Test]
        public void TryEnterSnapshotMode_ValidSnapshot_ServesEntriesBeforeInitialize()
        {
            CreateTempProject("SNAP1", "aaaa1101");
            SeedSnapshot(CreateFolderEntry("SNAP1", "aaaa1101"));

            _localProjects.TryEnterSnapshotMode(APP_VERSION);

            Assert.That(_localProjects.IsInSnapshotMode, Is.True);
            ProjectDetails details = _localProjects
                .GetAvailableUnpublishedProjectDetails()
                .Single();
            Assert.Multiple(() =>
            {
                Assert.That(details.Name, Is.EqualTo("SNAP1"));
                Assert.That(details.Metadata.Id, Is.EqualTo("AAAA1101"));
                Assert.That(details.HomeDirectory, Is.EqualTo(Path.Combine(Root, "SNAP1")));
                Assert.That(details.Metadata.FullName, Is.EqualTo("Stale Full Name"));
                Assert.That(details.Metadata.Language, Is.EqualTo("Klingon"));
                Assert.That(details.Metadata.LanguageTag, Is.EqualTo("en"));
                Assert.That(details.Metadata.IsEditable, Is.True);
                Assert.That(details.Metadata.IsPublished, Is.False);
                // ProjectInterfaces are re-derived at load, never persisted, so an unpublished
                // entry must advertise the full unpublished list.
                Assert.That(
                    details.Metadata.ProjectInterfaces,
                    Does.Contain(ProjectInterfaces.LEGACY_COMMENT)
                );
                Assert.That(_localProjects.GetAvailablePublishedProjectDetails(), Is.Empty);
            });
        }

        [Test]
        public void TryEnterSnapshotMode_CorruptedSnapshot_BehavesAsNoSnapshotAndRewrites()
        {
            CreateTempProject("SNAP1", "aaaa1102");
            File.WriteAllText(
                Path.Combine(Root, ProjectMetadataSnapshotStore.SNAPSHOT_FILE_NAME),
                "{{{ definitely not a snapshot"
            );

            _localProjects.TryEnterSnapshotMode(APP_VERSION);
            Assert.That(_localProjects.IsInSnapshotMode, Is.False);

            // Same as no snapshot: the normal initialize + scan flow works...
            _localProjects.Initialize();
            Assert.That(
                _localProjects.GetAllProjectDetails().Single().Metadata.Id,
                Is.EqualTo("AAAA1102")
            );
            // ...and a valid snapshot is rewritten at scan end for the next run.
            Assert.That(
                () => CreateStore().TryLoad(APP_VERSION),
                Is.Not.Null.After(SettleTimeoutMs, PollIntervalMs)
            );
        }

        [Test]
        public void PreScan_DeadFolderEntry_IsHiddenFromLists()
        {
            CreateTempProject("SNAP1", "aaaa1103");
            SeedSnapshot(
                CreateFolderEntry("SNAP1", "aaaa1103"),
                CreateFolderEntry("GHOST", "bbbb1103")
            );

            _localProjects.TryEnterSnapshotMode(APP_VERSION);

            List<ProjectDetails> details =
            [
                .. _localProjects.GetAvailableUnpublishedProjectDetails(),
            ];
            Assert.That(details.Select(d => d.Metadata.Id), Is.EqualTo(new[] { "AAAA1103" }));
        }

        [Test]
        public void PreScan_ResourceEntries_FilteredWhenRegistrationInvalid()
        {
            Assume.That(
                RegistrationInfo.DefaultUser.IsValid,
                Is.False,
                "This test documents the serve-time registration filter and requires an "
                    + "unregistered Paratext environment"
            );
            CreateTempProject("SNAP1", "aaaa1104");
            // A live resource file so the entry passes the liveness check and only the
            // registration filter can hide it.
            File.WriteAllBytes(Path.Combine(Root, "RES.p8z"), [0]);
            SeedSnapshot(
                CreateFolderEntry("SNAP1", "aaaa1104"),
                CreateResourceEntry("RES", "cccc1104")
            );

            _localProjects.TryEnterSnapshotMode(APP_VERSION);

            Assert.Multiple(() =>
            {
                Assert.That(_localProjects.GetAvailablePublishedProjectDetails(), Is.Empty);
                Assert.That(
                    _localProjects.GetAllProjectDetails().Select(d => d.Metadata.Id),
                    Is.EqualTo(new[] { "AAAA1104" })
                );
            });
        }

        [Test]
        public void Initialize_AfterSnapshotServing_SwitchesToLiveMetadata()
        {
            CreateTempProject("SNAP1", "aaaa1105");
            SeedSnapshot(CreateFolderEntry("SNAP1", "aaaa1105", language: "Klingon"));

            _localProjects.TryEnterSnapshotMode(APP_VERSION);
            Assert.That(
                _localProjects.GetAvailableUnpublishedProjectDetails().Single().Metadata.Language,
                Is.EqualTo("Klingon"),
                "Pre-scan, metadata must come from the snapshot"
            );

            _localProjects.CollapseScanGate();
            _localProjects.Initialize();

            // The minimal test project has no Language setting, so the live scan reports null -
            // proving the switch away from the snapshot's stale value.
            ProjectDetails details = _localProjects
                .GetAvailableUnpublishedProjectDetails()
                .Single();
            Assert.Multiple(() =>
            {
                Assert.That(details.Metadata.Language, Is.Null);
                Assert.That(details.Metadata.Id, Is.EqualTo("AAAA1105"));
            });
        }

        [Test]
        public void Initialize_SnapshotDiffersFromScan_NotifiesAndRewritesSnapshot()
        {
            CreateTempProject("SNAP1", "aaaa1106");
            SeedSnapshot(CreateFolderEntry("SNAP1", "aaaa1106", language: "Klingon"));

            _localProjects.TryEnterSnapshotMode(APP_VERSION);
            _localProjects.CollapseScanGate();
            _localProjects.Initialize();

            Assert.Multiple(() =>
            {
                // Stale display metadata was served pre-scan, so scan-end reconciliation must ask
                // consumers to refetch...
                Assert.That(
                    () => _papiClient.SentEventCount,
                    Is.GreaterThanOrEqualTo(1).After(SettleTimeoutMs, PollIntervalMs),
                    "Expected a PROJECTS_CHANGED notification after the reconciliation diff"
                );
                // ...and the snapshot must be rewritten with the corrected (live) metadata.
                Assert.That(
                    () => CreateStore().TryLoad(APP_VERSION)?.Projects.SingleOrDefault()?.Language,
                    Is.Null.After(SettleTimeoutMs, PollIntervalMs),
                    "Expected the snapshot to be rewritten with live metadata (Language null)"
                );
            });
            Assert.That(
                _papiClient.NextSentEvent.eventType,
                Is.EqualTo(LocalParatextProjects.PROJECTS_CHANGED_EVENT_TYPE)
            );
        }

        [Test]
        public void GetParatextProjectOrLoadTargeted_PreScan_LoadsProjectWithoutFullScan()
        {
            CreateTempProject("SNAP1", "aaaa1107");
            SeedSnapshot(CreateFolderEntry("SNAP1", "aaaa1107", language: "Klingon"));

            _localProjects.TryEnterSnapshotMode(APP_VERSION);
            _localProjects.EnsureMinimalInitialized();

            ScrText scrText = _localProjects.GetParatextProjectOrLoadTargeted("aaaa1107");

            Assert.Multiple(() =>
            {
                Assert.That(scrText.Name, Is.EqualTo("SNAP1"));
                Assert.That(scrText.Guid.ToString(), Is.EqualTo("aaaa1107").IgnoreCase);
                // The full scan must NOT have run: lists still serve the snapshot's stale value.
                Assert.That(
                    _localProjects
                        .GetAvailableUnpublishedProjectDetails()
                        .Single()
                        .Metadata.Language,
                    Is.EqualTo("Klingon"),
                    "A targeted load must not trigger the full project scan"
                );
            });

            // A repeat call returns the already-indexed instance.
            Assert.That(
                _localProjects.GetParatextProjectOrLoadTargeted("aaaa1107"),
                Is.SameAs(scrText)
            );
        }

        [Test]
        public void GetParatextProjectOrLoadTargeted_GhostEntry_FallsBackToScanThenThrows()
        {
            CreateTempProject("SNAP1", "aaaa1108");
            SeedSnapshot(
                CreateFolderEntry("SNAP1", "aaaa1108", language: "Klingon"),
                CreateFolderEntry("GHOST", "bbbb1108")
            );

            _localProjects.TryEnterSnapshotMode(APP_VERSION);
            _localProjects.EnsureMinimalInitialized();

            // The ghost's directory does not exist, so the targeted load must collapse the scan
            // gate, run the full scan, and then throw today's unknown-project error.
            Assert.Throws<ProjectNotFoundException>(
                () => _localProjects.GetParatextProjectOrLoadTargeted("bbbb1108")
            );

            // The fallback completed the full scan: lists now serve live metadata.
            Assert.That(
                _localProjects.GetAvailableUnpublishedProjectDetails().Single().Metadata.Language,
                Is.Null,
                "The ghost fallback should have completed the full scan"
            );
        }

        [Test]
        public void Initialize_SnapshotModeWithNoSnapshotFile_WritesSnapshotAtScanEnd()
        {
            CreateTempProject("SNAP1", "aaaa1109");

            _localProjects.TryEnterSnapshotMode(APP_VERSION);
            _localProjects.Initialize();

            Assert.That(
                () => CreateStore().TryLoad(APP_VERSION),
                Is.Not.Null.After(SettleTimeoutMs, PollIntervalMs),
                "Expected a snapshot to be written at scan end so the next run can use it"
            );
            ProjectMetadataSnapshotEntry entry = CreateStore()
                .TryLoad(APP_VERSION)!
                .Projects.Single();
            Assert.Multiple(() =>
            {
                Assert.That(entry.Name, Is.EqualTo("SNAP1"));
                Assert.That(entry.Id, Is.EqualTo("AAAA1109"));
                Assert.That(entry.IsResource, Is.False);
                Assert.That(entry.IsJoined, Is.False);
                Assert.That(entry.HomeDirectory, Is.EqualTo(Path.Combine(Root, "SNAP1")));
                Assert.That(entry.FullPath, Is.EqualTo(Path.Combine(Root, "SNAP1")));
            });
        }

        [Test]
        public void BuildEntries_JoinedText_PersistsUsableOtMemberPath()
        {
            _localProjects.EnsureMinimalInitialized();
            CreateTempProject("HEBOT", "aaaa1120");
            CreateTempProject("GRKNT", "bbbb1120");
            var otText = new ScrText(
                new ProjectName(Path.Combine(Root, "HEBOT")) { ShortName = "HEBOT" },
                RegistrationInfo.DefaultUser
            );
            var ntText = new ScrText(
                new ProjectName(Path.Combine(Root, "GRKNT")) { ShortName = "GRKNT" },
                RegistrationInfo.DefaultUser
            );
            var joinedText = new JoinedScrText(RegistrationInfo.DefaultUser, otText, ntText);

            ProjectMetadataSnapshotEntry entry = ProjectMetadataSnapshotStore
                .BuildEntries([joinedText])
                .Single();

            Assert.Multiple(() =>
            {
                Assert.That(entry.IsJoined, Is.True);
                Assert.That(entry.IsResource, Is.True);
                // A JoinedScrText has no ProjectName path of its own (ScrText.FullPath is null),
                // so the snapshot must persist the OT member's path. Persisting null would make
                // the liveness check fail forever and silently hide the joined resource from the
                // pre-scan lists.
                Assert.That(entry.FullPath, Is.EqualTo(otText.FullPath).And.Not.Null);
                Assert.That(entry.Id, Is.EqualTo("AAAA1120"));
            });
        }

        [Test]
        public void Initialize_SnapshotEntryThatWasNeverServed_DoesNotNotify()
        {
            // Uses a shared root across two LocalParatextProjects instances to simulate two app
            // runs over the same project root folder.
            using var sharedRoot = new TemporaryFolder(TestContext.CurrentContext.Test.ID);
            var store = new ProjectMetadataSnapshotStore(sharedRoot.Path);

            // Run 1: a normal startup writes an accurate snapshot at scan end.
            using (
                var firstRun = new TestLocalParatextProjectsInTempDir(_papiClient, sharedRoot.Path)
            )
            {
                firstRun.CreateTempProject(
                    "SNAP1",
                    new ProjectDetails(
                        "SNAP1",
                        new ProjectMetadata("aaaa1121", ["paratext"]),
                        "SNAP1"
                    )
                );
                firstRun.TryEnterSnapshotMode(APP_VERSION);
                firstRun.Initialize();
                Assert.That(
                    () => store.TryLoad(APP_VERSION),
                    Is.Not.Null.After(SettleTimeoutMs, PollIntervalMs),
                    "Sanity: run 1 must write a snapshot at scan end"
                );
            }

            // Doctor the snapshot: add a ghost entry whose folder does not exist, so it can never
            // be served (the liveness check hides it).
            ProjectMetadataSnapshot accurate = store.TryLoad(APP_VERSION)!;
            store.WriteSnapshot(
                [
                    .. accurate.Projects,
                    new ProjectMetadataSnapshotEntry(
                        Name: "GHOST",
                        HomeDirectory: Path.Combine(sharedRoot.Path, "GHOST"),
                        FullPath: Path.Combine(sharedRoot.Path, "GHOST"),
                        IsResource: false,
                        IsXmlResource: false,
                        IsJoined: false,
                        FullName: "Ghost",
                        Language: null,
                        LanguageTag: "en",
                        IsEditable: true,
                        Id: "BBBB1121"
                    ),
                ],
                APP_VERSION
            );

            // Run 2: the ghost is hidden at serve time, so consumers never see it - and scan-end
            // reconciliation must therefore NOT ask them to refetch (nothing they saw changed).
            using var secondClient = new DummyPapiClient();
            using var secondRun = new TestLocalParatextProjectsInTempDir(
                secondClient,
                sharedRoot.Path
            );
            secondRun.TryEnterSnapshotMode(APP_VERSION);
            Assert.That(secondRun.IsInSnapshotMode, Is.True, "Sanity: snapshot mode must arm");
            Assert.That(
                secondRun.GetAvailableUnpublishedProjectDetails().Select(d => d.Metadata.Id),
                Is.EqualTo(new[] { "AAAA1121" }),
                "Sanity: the ghost entry must be hidden from the served list"
            );
            secondRun.CollapseScanGate();
            secondRun.Initialize();

            // Reconciliation rewrites the snapshot (dropping the ghost) as its last step; wait for
            // that, then give a (wrongly) scheduled notify its debounce window to fire.
            Assert.That(
                () => store.TryLoad(APP_VERSION)?.Projects.Count,
                Is.EqualTo(1).After(SettleTimeoutMs, PollIntervalMs),
                "Sanity: reconciliation must rewrite the snapshot without the ghost"
            );
            Thread.Sleep(1000);
            Assert.That(
                secondClient.SentEventCount,
                Is.Zero,
                "Reconciliation must diff what was actually SERVED: an entry hidden at serve time "
                    + "on both sides is no change from the consumer's point of view, so no "
                    + "projects-changed event may fire"
            );
        }

        [Test]
        public void FactoryStart_SnapshotMode_CompletesFullScanWithoutExternalInitialize()
        {
            CreateTempProject("SNAP1", "aaaa1122");
            SeedSnapshot(CreateFolderEntry("SNAP1", "aaaa1122", language: "Klingon"));
            _localProjects.TryEnterSnapshotMode(APP_VERSION);
            _localProjects.CollapseScanGate();

            var factory = new TestableParatextProjectDataProviderFactory(
                _papiClient,
                _localProjects
            );
            factory.InitializeAsync().GetAwaiter().GetResult();

            // The factory's snapshot-mode start must kick the full scan (idempotent, gate-aware)
            // in the background: when Program.cs's early scan task faulted, this is the retry.
            // Without it a failed early scan leaves the app serving the stale snapshot all
            // session with no path to recovery.
            Assert.That(
                () =>
                    _localProjects
                        .GetAvailableUnpublishedProjectDetails()
                        .Single()
                        .Metadata.Language,
                Is.Null.After(SettleTimeoutMs, PollIntervalMs),
                "The factory's snapshot-mode start must complete the full scan in the background"
            );
        }

        [Test]
        public void GetParatextProjectOrLoadTargeted_ProjectIsSyncing_ResolvesViaFullScanFallback()
        {
            CreateTempProject("SNAP1", "aaaa1123");
            SeedSnapshot(CreateFolderEntry("SNAP1", "aaaa1123", language: "Klingon"));
            _localProjects.TryEnterSnapshotMode(APP_VERSION);
            _localProjects.EnsureMinimalInitialized();

            long token = SendReceiveWriteLock.SetSyncing(["AAAA1123"]);
            try
            {
                ScrText scrText = _localProjects.GetParatextProjectOrLoadTargeted("aaaa1123");

                Assert.Multiple(() =>
                {
                    Assert.That(scrText.Name, Is.EqualTo("SNAP1"));
                    // The targeted path runs ProjectFileUpdateManager.PerformUpdates - a project
                    // mutation - which the armed Send/Receive write gate must reject; the load
                    // must then resolve via the full scan (whose own PerformUpdates runs inside
                    // ParatextData, outside our gate). Live metadata proves the scan ran.
                    Assert.That(
                        _localProjects
                            .GetAvailableUnpublishedProjectDetails()
                            .Single()
                            .Metadata.Language,
                        Is.Null,
                        "A write-gated targeted load must fall back to the full scan"
                    );
                });
            }
            finally
            {
                SendReceiveWriteLock.Clear(token);
            }
        }

        [Test]
        public void CollapseScanGate_TargetedLoadCannotRearmIt()
        {
            CreateTempProject("SNAP1", "aaaa1124");
            SeedSnapshot(CreateFolderEntry("SNAP1", "aaaa1124"));
            _localProjects.TryEnterSnapshotMode(APP_VERSION);
            _localProjects.EnsureMinimalInitialized();

            _localProjects.CollapseScanGate();
            // A targeted load slides the gate deadline out. After a collapse (a fallback is about
            // to run - or already waiting on - the full scan) that slide must not re-arm the
            // gate, or the fallback goes back to waiting on the gate instead of the scan.
            _localProjects.GetParatextProjectOrLoadTargeted("aaaa1124");

            Assert.That(
                _localProjects.ScanGateNotBeforeTicksForTesting,
                Is.Zero,
                "A collapsed scan gate must be sticky: a concurrent targeted-load slide may not "
                    + "re-arm it"
            );
        }

        [Test]
        public void GetParatextProjectOrLoadTargeted_MissingLanguageCode_ResolvesViaFullScanLikeTheRefresh()
        {
            CreateTempProject("SNAP1", "aaaa1125");
            // A project whose Settings has only the colon placeholder language code. The full
            // refresh treats this as corrupted (MakeUnsupported + excluded from the collection),
            // so a targeted load must never serve it either.
            CreateTempProjectWithLanguageCode("BADLANG", "bbbb1125", ":::");
            SeedSnapshot(
                CreateFolderEntry("SNAP1", "aaaa1125"),
                CreateFolderEntry("BADLANG", "bbbb1125")
            );
            _localProjects.TryEnterSnapshotMode(APP_VERSION);
            _localProjects.EnsureMinimalInitialized();

            // The refresh makes this project unsupported (excluded), so resolving it must end in
            // today's unknown-project error - never a successfully targeted-loaded ScrText.
            Assert.Throws<ProjectNotFoundException>(
                () => _localProjects.GetParatextProjectOrLoadTargeted("bbbb1125")
            );
        }

        [Test]
        public void GetParatextProjectOrLoadTargeted_MinimalInitializationFaulted_FailsFastToFallback()
        {
            CreateTempProject("SNAP1", "aaaa1126");
            SeedSnapshot(CreateFolderEntry("SNAP1", "aaaa1126"));
            _localProjects.TryEnterSnapshotMode(APP_VERSION);
            // Sabotage minimal initialization: SetUpProjectRootFolder copies usfm.sty into the
            // root, which fails when a directory occupies that name.
            Directory.CreateDirectory(Path.Combine(Root, "usfm.sty"));
            Assert.Catch(
                () => _localProjects.EnsureMinimalInitialized(),
                "Sanity: minimal initialization must fail with the sabotaged root"
            );

            var stopwatch = Stopwatch.StartNew();
            Assert.Catch(() => _localProjects.GetParatextProjectOrLoadTargeted("aaaa1126"));
            stopwatch.Stop();

            // Pre-fix this burned the full 10s bounded wait on a TCS that could never complete;
            // a faulted minimal initialization must instead fail the wait fast and go straight to
            // the (self-initializing, so also failing fast) full-scan fallback.
            Assert.That(
                stopwatch.Elapsed,
                Is.LessThan(TimeSpan.FromSeconds(8)),
                "A faulted minimal initialization must fail targeted loads fast instead of "
                    + "burning the bounded wait timeout"
            );
        }

        /// <summary>
        /// Like <see cref="CreateTempProject"/> but with a caller-chosen LanguageIsoCode so tests
        /// can exercise the corrupted-language validation.
        /// </summary>
        private void CreateTempProjectWithLanguageCode(
            string folder,
            string id,
            string languageIsoCode
        )
        {
            var folderPath = Path.Combine(Root, folder);
            Directory.CreateDirectory(folderPath);
            var settings = new MinimalParatextProjectSettings
            {
                Name = folder,
                Guid = id,
                LanguageIsoCode = languageIsoCode,
                MinParatextVersion = "8.0.100.76",
            };
            XmlSerializationHelper.SerializeToFileWithWriteThrough(
                Path.Join(folderPath, "Settings.xml"),
                settings
            );
        }

        [Test]
        public void Initialize_WithoutTryEnterSnapshotMode_KeepsTodaysFlowAndWritesNoSnapshot()
        {
            CreateTempProject("SNAP1", "aaaa1110");

            _localProjects.Initialize();

            // Unchanged first-run behavior: project retrievable exactly as today.
            Assert.That(
                _localProjects.GetAllProjectDetails().Single().Metadata.Id,
                Is.EqualTo("AAAA1110")
            );
            // Give any (erroneous) fire-and-forget write a moment to land, then assert none did:
            // without an app version (TryEnterSnapshotMode not called) no snapshot may be written.
            Thread.Sleep(500);
            Assert.That(
                File.Exists(Path.Combine(Root, ProjectMetadataSnapshotStore.SNAPSHOT_FILE_NAME)),
                Is.False
            );
        }
    }
}

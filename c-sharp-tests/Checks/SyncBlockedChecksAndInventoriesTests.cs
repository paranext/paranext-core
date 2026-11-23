using System.Diagnostics.CodeAnalysis;
using System.Reflection;
using Paranext.DataProvider.Checks;
using Paranext.DataProvider.Projects.SendReceive;
using Paratext.Data;
using Paratext.Data.Checking;
using SIL.Scripture;

namespace TestParanextDataProvider.Checks
{
    /// <summary>
    /// Initializing a check or inventory can save the project's settings (the characters check
    /// applies its default characters the first time it is used), so every path that initializes
    /// one goes through the Send/Receive write gate: while a sync of the project is armed, the
    /// initialization is refused instead of racing the sync's file replacement, and it writes
    /// nothing. Checks and inventories that are already initialized keep working, and a sync of a
    /// different project changes nothing.
    /// </summary>
    [ExcludeFromCodeCoverage]
    internal class SyncBlockedChecksAndInventoriesTests : PapiTestBase
    {
        private const string CheckRunnerPrefix = "object:dotNetCheckRunner-data";
        private const string InventoryPrefix =
            "object:platformScripture.inventoryDataProvider-data";
        private const string GenesisUsfm = @"\id GEN \c 1 \p \v 1 In the beginning God created.";

        private static readonly string s_characterId = CheckType.Character.InternalValue;

        private ScrText _scrText = null!;
        private string _projectId = null!;

        [SetUp]
        public override async Task TestSetupAsync()
        {
            await base.TestSetupAsync();
            SendReceiveWriteLock.ResetForTests();

            _scrText = CreateDummyProject();
            _scrText.PutText(1, 0, false, GenesisUsfm, null);
            var details = CreateProjectDetails(_scrText);
            _projectId = details.Metadata.Id;
            ParatextProjects.FakeAddProject(details, _scrText);
        }

        [TearDown]
        public void TearDown()
        {
            SendReceiveWriteLock.ResetForTests();
            _scrText?.Dispose();
        }

        private void ArmSyncOf(string projectId) => SendReceiveWriteLock.SetSyncing([projectId]);

        private bool DefaultCharactersApplied => _scrText.Settings.AlreadyAppliedDefaultChars;

        private async Task<InventoryDataProvider> RegisterInventoryDataProviderAsync()
        {
            var inventoryDataProvider = new InventoryDataProvider(Client, ParatextProjects);
            await inventoryDataProvider.RegisterDataProviderAsync();
            return inventoryDataProvider;
        }

        private async Task RegisterCheckRunnerAsync()
        {
            var checkRunner = new CheckRunner(Client, await RegisterInventoryDataProviderAsync());
            await checkRunner.RegisterDataProviderAsync();
        }

        private static void AssertIsSyncRefusal(Exception? exception)
        {
            Assert.That(exception, Is.TypeOf<InvalidOperationException>());
            Assert.That(exception!.Message, Does.EndWith(SendReceiveWriteLock.EditBlockedSentinel));
        }

        /// <summary>
        /// Handlers invoked through <see cref="DummyPapiClient"/> run by reflection, which wraps what
        /// they throw.
        /// </summary>
        private static void AssertHandlerRefusesDuringSync(AsyncTestDelegate request)
        {
            var wrapper = Assert.ThrowsAsync<TargetInvocationException>(request);
            AssertIsSyncRefusal(wrapper!.InnerException);
        }

        private InventoryItemStatusSelector ItemStatusSelector =>
            new() { ProjectId = _projectId, InventoryId = s_characterId };

        private InventoryOptionsSelector OptionsSelector =>
            new() { ProjectId = _projectId, InventoryId = s_characterId };

        private InputRange GenesisRange =>
            new(
                _projectId,
                new VerseRef(1, 1, 1),
                new VerseRef(
                    1,
                    InputRange.MAX_CHAPTER_OR_VERSE_NUM,
                    InputRange.MAX_CHAPTER_OR_VERSE_NUM
                )
            );

        [Test]
        public void TheDummyProject_HasNotHadItsDefaultCharactersApplied()
        {
            // Every "writes nothing" assertion below relies on this starting state
            Assert.That(DefaultCharactersApplied, Is.False);
        }

        // --- inventories -------------------------------------------------------------------------

        [Test]
        public async Task BuildInventorySummary_ProjectSyncing_RefusesAndWritesNothing()
        {
            var inventoryDataProvider = await RegisterInventoryDataProviderAsync();
            ArmSyncOf(_projectId);

            var exception = Assert.Catch(
                () => inventoryDataProvider.BuildInventorySummary(s_characterId, [GenesisRange])
            );

            AssertIsSyncRefusal(exception);
            Assert.That(DefaultCharactersApplied, Is.False);
            Assert.That(SendReceiveWriteLock.InFlightWriteCount, Is.EqualTo(0));
        }

        [Test]
        public async Task BuildInventorySummary_NotSyncing_InitializesTheInventory()
        {
            var inventoryDataProvider = await RegisterInventoryDataProviderAsync();

            inventoryDataProvider.BuildInventorySummary(s_characterId, [GenesisRange]);

            Assert.That(DefaultCharactersApplied, Is.True);
            Assert.That(SendReceiveWriteLock.InFlightWriteCount, Is.EqualTo(0));
        }

        [Test]
        public async Task BuildInventorySummary_OtherProjectSyncing_InitializesTheInventory()
        {
            var inventoryDataProvider = await RegisterInventoryDataProviderAsync();
            ArmSyncOf("someOtherProjectId");

            inventoryDataProvider.BuildInventorySummary(s_characterId, [GenesisRange]);

            Assert.That(DefaultCharactersApplied, Is.True);
        }

        [Test]
        public async Task InventoryGetters_ProjectSyncing_RefuseAndWriteNothing()
        {
            await RegisterInventoryDataProviderAsync();
            ArmSyncOf(_projectId);

            Assert.Multiple(() =>
            {
                AssertHandlerRefusesDuringSync(
                    () =>
                        Client.SendRequestAsync<List<InventoryItemStatus>>(
                            $"{InventoryPrefix}.getInventoryItemStatus",
                            [ItemStatusSelector]
                        )
                );
                AssertHandlerRefusesDuringSync(
                    () =>
                        Client.SendRequestAsync<List<InventoryOptionValue>>(
                            $"{InventoryPrefix}.getInventoryOptionValues",
                            [OptionsSelector]
                        )
                );
                Assert.That(DefaultCharactersApplied, Is.False);
                Assert.That(SendReceiveWriteLock.InFlightWriteCount, Is.EqualTo(0));
            });
        }

        [Test]
        public async Task InventoryGetters_OtherProjectSyncing_Answer()
        {
            await RegisterInventoryDataProviderAsync();
            ArmSyncOf("someOtherProjectId");

            var itemStatus = await Client.SendRequestAsync<List<InventoryItemStatus>>(
                $"{InventoryPrefix}.getInventoryItemStatus",
                [ItemStatusSelector]
            );
            var optionValues = await Client.SendRequestAsync<List<InventoryOptionValue>>(
                $"{InventoryPrefix}.getInventoryOptionValues",
                [OptionsSelector]
            );

            Assert.That(itemStatus, Is.Not.Null);
            Assert.That(optionValues, Is.Not.Null);
            Assert.That(DefaultCharactersApplied, Is.True);
        }

        // --- checks ------------------------------------------------------------------------------

        [Test]
        public void CheckCacheGetCheck_ProjectSyncing_RefusesAndWritesNothing()
        {
            var checkCache = new CheckCache([s_characterId], Client);
            ArmSyncOf(_projectId);

            var exception = Assert.Catch(() => checkCache.GetCheck(s_characterId, _projectId));

            AssertIsSyncRefusal(exception);
            Assert.That(DefaultCharactersApplied, Is.False);
            Assert.That(SendReceiveWriteLock.InFlightWriteCount, Is.EqualTo(0));
        }

        [Test]
        public void CheckCacheGetCheck_CreatedBeforeTheSync_IsStillReturned()
        {
            var checkCache = new CheckCache([s_characterId], Client);
            var created = checkCache.GetCheck(s_characterId, _projectId);
            ArmSyncOf(_projectId);

            Assert.That(checkCache.GetCheck(s_characterId, _projectId), Is.SameAs(created));
        }

        [Test]
        public void CheckCacheGetCheck_OtherProjectSyncing_CreatesTheCheck()
        {
            var checkCache = new CheckCache([s_characterId], Client);
            ArmSyncOf("someOtherProjectId");

            Assert.That(checkCache.GetCheck(s_characterId, _projectId), Is.Not.Null);
            Assert.That(DefaultCharactersApplied, Is.True);
        }

        [Test]
        public void CheckCacheGetCheckInWriteScope_DoesNotEnterTheGateAgain()
        {
            // A caller that already holds the project's write scope must not have its check
            // creation refused by a sync that armed while that scope was open
            var checkCache = new CheckCache([s_characterId], Client);
            ArmSyncOf(_projectId);

            Assert.That(checkCache.GetCheckInWriteScope(s_characterId, _projectId), Is.Not.Null);
        }

        [Test]
        public void RunChecksForProject_ReinitializeWhileSyncing_ReportsTheRefusalAndRetriesLater()
        {
            var checkCache = new CheckCache([s_characterId], Client);
            var check = checkCache.GetCheck(s_characterId, _projectId);
            check.SettingsChanged = true;
            ArmSyncOf(_projectId);

            var failures = checkCache.RunChecksForProject(
                GenesisRange,
                [s_characterId],
                ErrorMessageDenials.Get(_scrText)
            );

            Assert.That(failures, Has.Count.EqualTo(1));
            AssertIsSyncRefusal(failures[0].Exception);
            Assert.That(check.SettingsChanged, Is.True);
            Assert.That(SendReceiveWriteLock.InFlightWriteCount, Is.EqualTo(0));
        }

        [Test]
        public async Task LookUpCheckSetupStatus_ProjectSyncing_RefusesAndWritesNothing()
        {
            await RegisterCheckRunnerAsync();
            ArmSyncOf(_projectId);

            Assert.Multiple(() =>
            {
                AssertHandlerRefusesDuringSync(
                    () =>
                        Client.SendRequestAsync<CheckSetupState>(
                            $"{CheckRunnerPrefix}.lookUpCheckSetupStatus",
                            [s_characterId, _projectId]
                        )
                );
                AssertHandlerRefusesDuringSync(
                    () =>
                        Client.SendRequestAsync<bool>(
                            $"{CheckRunnerPrefix}.isCheckSetupForProject",
                            [s_characterId, _projectId]
                        )
                );
                Assert.That(DefaultCharactersApplied, Is.False);
                Assert.That(SendReceiveWriteLock.InFlightWriteCount, Is.EqualTo(0));
            });
        }

        [Test]
        public async Task LookUpCheckSetupStatus_OtherProjectSyncing_Answers()
        {
            await RegisterCheckRunnerAsync();
            ArmSyncOf("someOtherProjectId");

            Assert.DoesNotThrowAsync(
                () =>
                    Client.SendRequestAsync<CheckSetupState>(
                        $"{CheckRunnerPrefix}.lookUpCheckSetupStatus",
                        [s_characterId, _projectId]
                    )
            );
        }

        [Test]
        public async Task CheckJob_ProjectSyncing_CompletesWithTheCheckReportedAsNotRun()
        {
            await RegisterCheckRunnerAsync();
            ArmSyncOf(_projectId);

            CheckJobStatusReport report = await RunCheckJobAsync();

            Assert.That(report.Status, Is.EqualTo(CheckJobStatus.Completed), report.Error);
            Assert.That(report.CheckErrors, Is.Not.Null.And.Count.EqualTo(1));
            Assert.That(
                report.CheckErrors![0].Message,
                Does.EndWith(SendReceiveWriteLock.EditBlockedSentinel)
            );
            Assert.That(DefaultCharactersApplied, Is.False);
        }

        [Test]
        public async Task CheckJob_AfterTheSyncEnds_RunsTheCheck()
        {
            await RegisterCheckRunnerAsync();
            long token = SendReceiveWriteLock.SetSyncing([_projectId]);
            await RunCheckJobAsync();
            SendReceiveWriteLock.Clear(token);

            CheckJobStatusReport report = await RunCheckJobAsync();

            Assert.That(report.Status, Is.EqualTo(CheckJobStatus.Completed), report.Error);
            Assert.That(report.CheckErrors, Is.Null.Or.Empty);
            Assert.That(DefaultCharactersApplied, Is.True);
        }

        private async Task<CheckJobStatusReport> RunCheckJobAsync()
        {
            var scope = new CheckJobScope
            {
                CheckIds = [s_characterId],
                InputRanges = [GenesisRange],
            };
            string jobId = (
                await Client.SendRequestAsync<string>($"{CheckRunnerPrefix}.beginCheckJob", [scope])
            )!;

            var deadline = DateTime.UtcNow.AddSeconds(30);
            while (true)
            {
                var report = (
                    await Client.SendRequestAsync<CheckJobStatusReport>(
                        $"{CheckRunnerPrefix}.retrieveCheckJobUpdate",
                        [jobId, 0]
                    )
                )!;
                if (
                    report.Status != CheckJobStatus.Queued
                    && report.Status != CheckJobStatus.Running
                )
                    return report;
                if (DateTime.UtcNow > deadline)
                    Assert.Fail($"Check job {jobId} did not finish; last status {report.Status}");
                await Task.Delay(20);
            }
        }
    }
}

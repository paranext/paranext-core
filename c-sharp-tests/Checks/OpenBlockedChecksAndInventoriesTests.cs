using System.Diagnostics.CodeAnalysis;
using System.Reflection;
using System.Text.Json;
using Paranext.DataProvider;
using Paranext.DataProvider.Checks;
using Paranext.DataProvider.Projects;
using Paranext.DataProvider.Projects.SendReceive;
using Paratext.Data;
using Paratext.Data.Checking;
using PtxUtils;
using SIL.Scripture;

namespace TestParanextDataProvider.Checks
{
    /// <summary>
    /// Checks and inventories refuse a project Platform.Bible can't open (a Study Bible Additions
    /// project), and keep working for an ordinary one.
    /// </summary>
    [ExcludeFromCodeCoverage]
    internal class OpenBlockedChecksAndInventoriesTests : PapiTestBase
    {
        private const string CheckRunnerPrefix = "object:dotNetCheckRunner-data";
        private const string InventoryPrefix =
            "object:platformScripture.inventoryDataProvider-data";
        private const string GenesisUsfm = @"\id GEN \c 1 \p \v 1 In the beginning God created.";

        private static readonly string s_checkId = CheckType.Capitalization.InternalValue;
        private static string InventoryId => InventoryFactory.GetAvailableInventoryIds().First();

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

        /// <summary>
        /// Handlers invoked through <see cref="DummyPapiClient"/> run by reflection, which wraps what
        /// they throw.
        /// </summary>
        private static void AssertHandlerRefusesOpenBlocked(AsyncTestDelegate request)
        {
            var wrapper = Assert.ThrowsAsync<TargetInvocationException>(request);
            Assert.That(wrapper!.InnerException, Is.TypeOf<ProjectOpenBlockedException>());
            Assert.That(
                wrapper.InnerException!.Message,
                Does.Contain(ProjectOpenBlockedException.Sentinel)
            );
        }

        private InventoryItemStatusSelector ItemStatusSelector =>
            new() { ProjectId = _projectId, InventoryId = InventoryId };

        private InventoryOptionsSelector OptionsSelector =>
            new() { ProjectId = _projectId, InventoryId = InventoryId };

        private InputRange[] GenesisRange =>
            [new InputRange(_projectId, new VerseRef(1, 1, 0), null)];

        // --- checks ------------------------------------------------------------------------------

        [Test]
        public void CheckCacheGetCheck_StudyBibleAdditions_Refuses()
        {
            MakeStudyBibleAdditions(_scrText);
            var checkCache = new CheckCache([s_checkId], Client);

            Assert.That(
                () => checkCache.GetCheck(s_checkId, _projectId),
                Throws.TypeOf<ProjectOpenBlockedException>()
            );
        }

        [Test]
        public void CheckCacheGetCheck_Standard_ReturnsTheCheck()
        {
            var checkCache = new CheckCache([s_checkId], Client);

            Assert.That(checkCache.GetCheck(s_checkId, _projectId), Is.Not.Null);
        }

        [Test]
        public async Task IsCheckSetupForProject_StudyBibleAdditions_Refuses()
        {
            await RegisterCheckRunnerAsync();
            MakeStudyBibleAdditions(_scrText);

            AssertHandlerRefusesOpenBlocked(
                () =>
                    Client.SendRequestAsync<bool>(
                        $"{CheckRunnerPrefix}.isCheckSetupForProject",
                        [s_checkId, _projectId]
                    )
            );
        }

        [Test]
        public async Task IsCheckSetupForProject_Standard_Answers()
        {
            await RegisterCheckRunnerAsync();

            Assert.DoesNotThrowAsync(
                () =>
                    Client.SendRequestAsync<bool>(
                        $"{CheckRunnerPrefix}.isCheckSetupForProject",
                        [s_checkId, _projectId]
                    )
            );
        }

        [Test]
        public async Task CheckJob_StudyBibleAdditions_ErrorsWithTheSentinel()
        {
            await RegisterCheckRunnerAsync();
            MakeStudyBibleAdditions(_scrText);

            CheckJobStatusReport report = await RunCheckJobAsync();

            Assert.That(report.Status, Is.EqualTo(CheckJobStatus.Errored));
            Assert.That(report.Error, Does.EndWith(ProjectOpenBlockedException.Sentinel));
        }

        [Test]
        public async Task CheckJob_Standard_Completes()
        {
            await RegisterCheckRunnerAsync();

            CheckJobStatusReport report = await RunCheckJobAsync();

            Assert.That(report.Status, Is.EqualTo(CheckJobStatus.Completed), report.Error);
        }

        private async Task<CheckJobStatusReport> RunCheckJobAsync()
        {
            var scope = new CheckJobScope { CheckIds = [s_checkId], InputRanges = GenesisRange };
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

        [TestCase("denyCheckResult")]
        [TestCase("allowCheckResult")]
        public async Task CheckResultDenial_StudyBibleAdditions_RefusesAndLeavesNoWriteScopeOpen(
            string functionName
        )
        {
            await RegisterCheckRunnerAsync();
            MakeStudyBibleAdditions(_scrText);

            AssertHandlerRefusesOpenBlocked(
                () =>
                    Client.SendRequestAsync<bool>(
                        $"{CheckRunnerPrefix}.{functionName}",
                        [
                            s_checkId,
                            "checkResultType",
                            _projectId,
                            new VerseRef(1, 1, 1),
                            "itemText",
                            null,
                        ]
                    )
            );
            Assert.That(SendReceiveWriteLock.InFlightWriteCount, Is.EqualTo(0));
        }

        [TestCase("denyCheckResult")]
        [TestCase("allowCheckResult")]
        public async Task CheckResultDenial_Standard_Succeeds(string functionName)
        {
            await RegisterCheckRunnerAsync();

            bool? result = await Client.SendRequestAsync<bool>(
                $"{CheckRunnerPrefix}.{functionName}",
                [s_checkId, "checkResultType", _projectId, new VerseRef(1, 1, 1), "itemText", null]
            );

            Assert.That(result, Is.True);
        }

        // --- inventories -------------------------------------------------------------------------

        private Task<List<InventoryDetails>?> GetAvailableInventoriesAsync() =>
            Client.SendRequestAsync<List<InventoryDetails>>(
                $"{InventoryPrefix}.getAvailableInventories",
                [default(JsonElement)]
            );

        [Test]
        public async Task StartDataProvider_FirstProjectIsStudyBibleAdditions_ListsInventories()
        {
            MakeStudyBibleAdditions(_scrText);
            // Named to sort after the Study Bible Additions project, so that one is found first.
            string standardId = HexId.CreateNew().ToString();
            using var standard = new DummyScrText(
                new ProjectDetails("Zz", new ProjectMetadata(standardId, []), "")
            );
            ParatextProjects.FakeAddProject(CreateProjectDetails(standard), standard);
            Assert.That(
                ParatextProjects.GetAllProjectDetails().First().Metadata.Id,
                Is.EqualTo(_projectId).IgnoreCase
            );

            await RegisterInventoryDataProviderAsync();

            Assert.That(await GetAvailableInventoriesAsync(), Is.Not.Null.And.Not.Empty);
        }

        [Test]
        public void StartDataProvider_OnlyProjectIsStudyBibleAdditions_DoesNotThrow()
        {
            MakeStudyBibleAdditions(_scrText);

            Assert.DoesNotThrowAsync(RegisterInventoryDataProviderAsync);
        }

        [Test]
        public async Task InventoryGetters_StudyBibleAdditions_Refuse()
        {
            await RegisterInventoryDataProviderAsync();
            MakeStudyBibleAdditions(_scrText);

            Assert.Multiple(() =>
            {
                AssertHandlerRefusesOpenBlocked(
                    () =>
                        Client.SendRequestAsync<List<InventoryItemStatus>>(
                            $"{InventoryPrefix}.getInventoryItemStatus",
                            [ItemStatusSelector]
                        )
                );
                AssertHandlerRefusesOpenBlocked(
                    () =>
                        Client.SendRequestAsync<List<InventoryOptionValue>>(
                            $"{InventoryPrefix}.getInventoryOptionValues",
                            [OptionsSelector]
                        )
                );
            });
        }

        [Test]
        public async Task InventorySetters_Standard_Succeed()
        {
            await RegisterInventoryDataProviderAsync();

            bool? itemStatusResult = await Client.SendRequestAsync<bool>(
                $"{InventoryPrefix}.setInventoryItemStatus",
                [ItemStatusSelector, JsonDocument.Parse("[]").RootElement]
            );
            bool? optionValuesResult = await Client.SendRequestAsync<bool>(
                $"{InventoryPrefix}.setInventoryOptionValues",
                [OptionsSelector, JsonDocument.Parse("[]").RootElement]
            );

            Assert.That(itemStatusResult, Is.True);
            Assert.That(optionValuesResult, Is.True);
        }

        [Test]
        public async Task InventorySetters_StudyBibleAdditions_RefuseAndLeaveNoWriteScopeOpen()
        {
            await RegisterInventoryDataProviderAsync();
            MakeStudyBibleAdditions(_scrText);

            Assert.Multiple(() =>
            {
                AssertHandlerRefusesOpenBlocked(
                    () =>
                        Client.SendRequestAsync<bool>(
                            $"{InventoryPrefix}.setInventoryItemStatus",
                            [ItemStatusSelector, JsonDocument.Parse("[]").RootElement]
                        )
                );
                Assert.That(SendReceiveWriteLock.InFlightWriteCount, Is.EqualTo(0));
                AssertHandlerRefusesOpenBlocked(
                    () =>
                        Client.SendRequestAsync<bool>(
                            $"{InventoryPrefix}.setInventoryOptionValues",
                            [OptionsSelector, JsonDocument.Parse("[]").RootElement]
                        )
                );
                Assert.That(SendReceiveWriteLock.InFlightWriteCount, Is.EqualTo(0));
            });
        }

        [Test]
        public async Task InventorySelectorMethods_Standard_Answer()
        {
            await RegisterInventoryDataProviderAsync();

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
        }

        [Test]
        public async Task BuildInventorySummary_StudyBibleAdditions_Refuses()
        {
            var inventoryDataProvider = await RegisterInventoryDataProviderAsync();
            MakeStudyBibleAdditions(_scrText);

            Assert.That(
                () => inventoryDataProvider.BuildInventorySummary(InventoryId, GenesisRange),
                Throws
                    .TypeOf<ProjectOpenBlockedException>()
                    .With.Message.Contains(ProjectOpenBlockedException.Sentinel)
            );
        }

        [Test]
        public async Task BuildInventorySummary_Standard_Summarizes()
        {
            var inventoryDataProvider = await RegisterInventoryDataProviderAsync();

            SummarizedInventory summary = inventoryDataProvider.BuildInventorySummary(
                InventoryId,
                GenesisRange
            );

            Assert.That(summary.ProjectId, Is.EqualTo(_projectId));
        }
    }
}

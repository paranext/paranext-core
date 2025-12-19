using System.Collections.Concurrent;
using System.Text.Json;
using Paranext.DataProvider.NetworkObjects;
using Paranext.DataProvider.Projects;
using Paratext.Checks;
using Paratext.Data.Checking;
using PtxUtils;
using SIL.Scripture;

namespace Paranext.DataProvider.Checks;

/// <summary>
/// This class is intended to be a singleton that registers a data provider on the PAPI network.
/// The data provider implements the ICheckRunner interface that is defined in TypeScript. See the
/// definition of ICheckRunner and its related types in TypeScript for more details.
/// </summary>
internal sealed class CheckRunner : NetworkObjects.DataProvider
{
    #region Internal classes

    // This can be eliminated once RetrieveInventoryData is removed
    private class InventoryItem(string inventoryText, string verse, VerseRef verseRef, int offset)
    {
        public string InventoryText { get; set; } = inventoryText;
        public string Verse { get; set; } = verse;
        public VerseRef VerseRef { get; set; } = verseRef;
        public int Offset { get; set; } = offset;
    }

    #endregion

    #region Consts and member variables

    private readonly Dictionary<string, CheckRunnerCheckDetails> _checkDetailsByCheckId =
        new()
        {
            { CheckType.Capitalization.InternalValue, new(CheckType.Capitalization) },
            { CheckType.ChapterVerse.InternalValue, new(CheckType.ChapterVerse) },
            { CheckType.Character.InternalValue, new(CheckType.Character) },
            { CheckType.Marker.InternalValue, new(CheckType.Marker) },
            { CheckType.MatchedPairs.InternalValue, new(CheckType.MatchedPairs) },
            { CheckType.Numbers.InternalValue, new(CheckType.Numbers) },
            {
                CheckType.ParagraphFinalPunctuation.InternalValue,
                new(CheckType.ParagraphFinalPunctuation)
            },
            { CheckType.Punctuation.InternalValue, new(CheckType.Punctuation) },
            { CheckType.Quotation.InternalValue, new(CheckType.Quotation) },
            { CheckType.QuotationTypes.InternalValue, new(CheckType.QuotationTypes) },
            { CheckType.QuotedText.InternalValue, new(CheckType.QuotedText) },
            { CheckType.Reference.InternalValue, new(CheckType.Reference) },
            { CheckType.RepeatedWord.InternalValue, new(CheckType.RepeatedWord) },
            { CheckType.Schema.InternalValue, new(CheckType.Schema) },
        };
    private readonly List<string> _allCheckIds;
    private readonly List<CheckRunnerCheckDetails> _allCheckDetails;
    private readonly ConcurrentDictionary<string, ErrorMessageDenials> _denialsByProjectId = new();
    private readonly ConcurrentDictionary<string, CheckJobStatus> _activeCheckJobsByJobId = new();
    private readonly ConcurrentQueue<string> _queuedCheckJobs = new();
    private readonly CheckCache _checkCache;
    private readonly object _runChecksLock = new();

    // This can be eliminated once RetrieveInventoryData is removed
    private readonly InventoryDataProvider _inventoryDataProvider;

    #endregion

    #region Constructor

    public CheckRunner(PapiClient papiClient, InventoryDataProvider inventoryDataProvider)
        : base("dotNetCheckRunner", papiClient, NetworkObjectType.CHECK_RUNNER)
    {
        _allCheckIds = _checkDetailsByCheckId.Keys.ToList();
        _allCheckDetails = _checkDetailsByCheckId.Values.ToList();
        _checkCache = new CheckCache(_allCheckIds, papiClient);
        _inventoryDataProvider = inventoryDataProvider;
    }

    #endregion

    #region DataProvider methods

    // Must provide all functions that are part of ICheckRunner in TS
    protected override List<(string functionName, Delegate function)> GetFunctions()
    {
        return
        [
            ("abandonCheckJob", AbandonCheckJob),
            ("allowCheckResult", AllowCheckResult),
            ("beginCheckJob", BeginCheckJob),
            ("denyCheckResult", DenyCheckResult),
            ("getAvailableChecks", GetAvailableChecks),
            ("retrieveCheckJobUpdate", RetrieveCheckJobUpdate),
            ("retrieveInventoryData", RetrieveInventoryData),
            ("isCheckSetupForProject", IsCheckSetupForProject),
            ("stopCheckJob", StopCheckJob),
        ];
    }

    protected override Task StartDataProviderAsync()
    {
        return Task.CompletedTask;
    }

    #endregion

    #region CheckRunner methods

    private List<CheckRunnerCheckDetails> GetAvailableChecks(JsonElement _ignore)
    {
        return _allCheckDetails;
    }

    private string BeginCheckJob(CheckJobScope jobScope)
    {
        var job = new CheckJobStatus(jobScope);
        _activeCheckJobsByJobId[job.JobId] = job;
        _queuedCheckJobs.Enqueue(job.JobId);
        ThreadingUtils.RunTask(Task.Run(ProcessQueuedCheckJobs), "Process queued check jobs");
        return job.JobId;
    }

    // Default timeout should match CHECK_STOP_DEFAULT_TIMEOUT_MS in check.model.ts
    private bool StopCheckJob(string jobId, int? timeoutMs = 2000)
    {
        var job =
            (_activeCheckJobsByJobId.TryGetValue(jobId, out var x) ? x : null)
            ?? throw new Exception($"No active check job with ID {jobId} (stop)");
        job.StopRequested = true;
        if (_queuedCheckJobs.Contains(jobId) || job.Status != CheckJobStatus.Running)
            return true;
        // Poll until the job stops or the timeout expires
        var stopwatch = System.Diagnostics.Stopwatch.StartNew();
        while (stopwatch.ElapsedMilliseconds < timeoutMs.GetValueOrDefault())
        {
            if (job.Status != CheckJobStatus.Running)
                return true;
            Thread.Sleep(100);
        }
        return job.Status != CheckJobStatus.Running;
    }

    private void AbandonCheckJob(string jobId)
    {
        var job =
            (_activeCheckJobsByJobId.TryGetValue(jobId, out var x) ? x : null)
            ?? throw new Exception($"No active check job with ID {jobId} (abandon)");
        job.StopRequested = true;
        if (!_activeCheckJobsByJobId.TryRemove(jobId, out _))
            Console.WriteLine($"Failed to remove check job {jobId} from active jobs");
    }

    private CheckJobStatusReport RetrieveCheckJobUpdate(string jobId, int maxResultsToInclude)
    {
        var job =
            (_activeCheckJobsByJobId.TryGetValue(jobId, out var x) ? x : null)
            ?? throw new Exception($"No active check job with ID {jobId} (update)");
        return job.GenerateStatusReport(maxResultsToInclude);
    }

    /// <summary>
    /// This method is obsolete, but it has been kept temporarily for backward compatibility.
    /// <br/>
    /// Normally, you would want to call BuildInventorySummary first and just display that data.
    /// Then, when a user clicks on an item to see details, you would call BeginItemizedInventoryJob
    /// followed by RetrieveItemizedInventoryJobUpdate to get the details for that item.
    /// <br/>
    /// This method simulates that process for all items and returns the combined results.
    /// </summary>
    [Obsolete("Use BuildInventorySummary and BeginItemizedInventoryJob on InventoryDataProvider")]
    private List<InventoryItem> RetrieveInventoryData(
        string checkId,
        string projectId,
        InputRange inputRange
    )
    {
        ArgumentException.ThrowIfNullOrEmpty(checkId);
        ArgumentException.ThrowIfNullOrEmpty(projectId);
        ArgumentNullException.ThrowIfNull(inputRange);

        var summarizedInventory = _inventoryDataProvider.BuildInventorySummary(
            checkId,
            [inputRange]
        );

        var allKeys = summarizedInventory
            .InventoryCountLists.SelectMany(list => list.Items)
            .Select(item => item.Key)
            .ToHashSet();

        var retVal = new List<InventoryItem>();

        foreach (var key in allKeys)
        {
            var itemizedJobScope = new ItemizedInventoryJobScope
            {
                SummarizedInventoryId = summarizedInventory.SummarizedInventoryId,
                Key = key,
            };
            var jobId = _inventoryDataProvider.BeginItemizedInventoryJob(itemizedJobScope);

            ItemizedInventoryJobStatusReport? jobReport = null;
            List<ItemizedInventoryItem> results = [];
            do
            {
                Thread.Sleep(10);
                jobReport = _inventoryDataProvider.RetrieveItemizedInventoryJobUpdate(
                    jobId,
                    int.MaxValue
                );
                results.AddRange(jobReport.NextResults ?? []);
            } while (jobReport.Status == ItemizedInventoryJobStatus.Running);
            _inventoryDataProvider.AbandonItemizedInventoryJob(jobId);

            if (results.Count == 0)
                continue;

            retVal.AddRange(
                results.Select(result => new InventoryItem(
                    result.InventoryText,
                    result.SourceText,
                    result.Location.VerseRef,
                    result.Location.Offset ?? 0
                ))
            );
        }

        _inventoryDataProvider.DiscardInventorySummary(summarizedInventory.SummarizedInventoryId);

        return retVal;
    }

    private bool IsCheckSetupForProject(string checkId, string projectId)
    {
        ArgumentException.ThrowIfNullOrEmpty(checkId);
        ArgumentException.ThrowIfNullOrEmpty(projectId);

        var dataSource = new ChecksDataSource(LocalParatextProjects.GetParatextProject(projectId));
        var check = CheckFactory.CreateCheck(checkId, dataSource);
        return check.SetupComplete;
    }

    private bool DenyCheckResult(
        string checkId,
        string checkResultType,
        string projectId,
        VerseRef vRef,
        string itemText,
        string? _checkResultUniqueId
    )
    {
        var check = _checkCache.GetCheck(checkId, projectId);
        var denials = GetOrCreateDenials(projectId);
        denials.AddDenial(new Enum<MessageId>(checkResultType), vRef, null, itemText);
        denials.Save();
        check.AccessResults(vRef.BookNum, recorder => recorder.PostProcessResults(denials));
        return true;
    }

    private bool AllowCheckResult(
        string checkId,
        string checkResultType,
        string projectId,
        VerseRef vRef,
        string itemText,
        string? _checkResultUniqueId
    )
    {
        var check = _checkCache.GetCheck(checkId, projectId);
        var denials = GetOrCreateDenials(projectId);
        denials.RemoveDenial(new Enum<MessageId>(checkResultType), vRef, null, itemText);
        denials.Save();
        check.AccessResults(vRef.BookNum, recorder => recorder.PostProcessResults(denials));
        return true;
    }

    private void ProcessQueuedCheckJobs()
    {
        lock (_runChecksLock)
        {
            while (_queuedCheckJobs.TryDequeue(out var jobId))
            {
                ProcessCheckJob(jobId);
            }
        }
    }

    private void ProcessCheckJob(string jobId)
    {
        // It might have been cancelled/abandoned while in the queue
        if (!_activeCheckJobsByJobId.TryGetValue(jobId, out var job))
            return;

        // Don't start a job that has been requested to stop
        if (job.StopRequested)
        {
            job.Status = CheckJobStatus.Stopped;
            return;
        }

        // This should never happen, but just in case
        if (job.Status != CheckJobStatus.Queued)
        {
            Console.WriteLine($"Check job {jobId} is not queued. Skipping.");
            return;
        }

        ErrorMessageDenials denials = GetOrCreateDenials(job.JobScope.InputRanges[0].ProjectId);

        job.Status = CheckJobStatus.Running;
        job.PercentComplete = 0;
        job.StartTimeUtc = DateTime.UtcNow;

        double itemsToComplete = job.JobScope.InputRanges.Length * job.JobScope.CheckIds.Length;
        var completedItems = 0;

        try
        {
            var checkIdsToRun = new List<string>();
            foreach (var range in job.JobScope.InputRanges)
            {
                checkIdsToRun.Clear();
                foreach (var checkId in job.JobScope.CheckIds)
                {
                    if (job.StopRequested)
                        break;

                    var check = _checkCache.GetCheck(checkId, range.ProjectId);
                    if (check.SettingsChanged)
                        check.ClearResults();

                    bool areResultsCached = false;
                    check.AccessResults(
                        range.Start.BookNum,
                        recorder =>
                        {
                            areResultsCached = recorder.ResultsReady;
                            if (areResultsCached)
                            {
                                job.AllResults.AddRange(recorder.GetResultsInRange(range));
                                job.PercentComplete = 100 * ++completedItems / itemsToComplete;
                            }
                        }
                    );
                    if (!areResultsCached)
                        checkIdsToRun.Add(checkId);
                }

                if (job.StopRequested)
                    break;

                if (checkIdsToRun.Count == 0)
                    continue;

                _checkCache.RunChecksForProject(range, checkIdsToRun, denials);
                foreach (var checkId in checkIdsToRun)
                {
                    var check = _checkCache.GetCheck(checkId, range.ProjectId);
                    check.AccessResults(
                        range.Start.BookNum,
                        recorder =>
                        {
                            if (!recorder.ResultsReady)
                                throw new Exception(
                                    $"Check {checkId} did not complete running properly."
                                );
                            job.AllResults.AddRange(recorder.GetResultsInRange(range));
                            job.PercentComplete = 100 * ++completedItems / itemsToComplete;
                        }
                    );
                }
            }

            job.Status = job.StopRequested ? CheckJobStatus.Stopped : CheckJobStatus.Completed;
        }
        catch (Exception ex)
        {
            job.Status = CheckJobStatus.Errored;
            job.Error = ex.Message;
        }
        finally
        {
            job.EndTimeUtc = DateTime.UtcNow;
            // Avoid problems with floating point precision
            job.PercentComplete = Math.Round(job.PercentComplete, 0);
        }
    }

    private ErrorMessageDenials GetOrCreateDenials(string projectId)
    {
        return _denialsByProjectId.GetOrAdd(
            projectId,
            id => ErrorMessageDenials.Get(LocalParatextProjects.GetParatextProject(id))
        );
    }

    #endregion
}

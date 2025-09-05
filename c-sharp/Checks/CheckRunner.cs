using System.Collections.Concurrent;
using System.Text.Json;
using Paranext.DataProvider.NetworkObjects;
using Paranext.DataProvider.ParatextUtils;
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

    private class InventoryItem(string inventoryText, string verse, VerseRef verseRef, int offset)
    {
        public string InventoryText { get; set; } = inventoryText;
        public string Verse { get; set; } = verse;
        public VerseRef VerseRef { get; set; } = verseRef;
        public int Offset { get; set; } = offset;
    }

    #endregion

    #region Consts and member variables

    // See platform-scripture.d.ts for the TypeScript definition
    const string CHECK_RESULTS_INVALIDATE_COMMAND = "platformScripture.invalidateCheckResults";

    private readonly Dictionary<string, ParatextCheckDetails> _checkDetailsByCheckId =
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
    private readonly List<ParatextCheckDetails> _allCheckDetails;
    private readonly ConcurrentDictionary<string, ErrorMessageDenials> _denialsByProjectId = new();
    private readonly ConcurrentDictionary<string, CheckJobStatus> _activeCheckJobsByJobId = new();
    private readonly ConcurrentQueue<string> _queuedCheckJobs = new();
    private readonly CheckCache _checkCache;
    private readonly object _runChecksLock = new();

    #endregion

    #region Constructor
    public CheckRunner(PapiClient papiClient)
        : base("dotNetCheckRunner", papiClient, NetworkObjectType.CHECK_RUNNER)
    {
        _allCheckIds = _checkDetailsByCheckId.Keys.ToList();
        _allCheckDetails = _checkDetailsByCheckId.Values.ToList();
        _checkCache = new CheckCache(_allCheckIds, papiClient);
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
            ("cleanupCheckJob", CleanupCheckJob),
            ("denyCheckResult", DenyCheckResult),
            ("getAvailableChecks", GetAvailableChecks),
            ("retrieveCheckJobUpdate", RetrieveCheckJobUpdate),
            ("retrieveInventoryData", RetrieveInventoryData),
            ("stopCheckJob", StopCheckJob),
        ];
    }

    protected override Task StartDataProviderAsync()
    {
        return Task.CompletedTask;
    }

    #endregion

    #region CheckRunner methods

    private List<ParatextCheckDetails> GetAvailableChecks(JsonElement _ignore)
    {
        return _allCheckDetails;
    }

    private string BeginCheckJob(CheckJobScope jobScope)
    {
        var job = new CheckJobStatus() { JobScope = jobScope };
        _activeCheckJobsByJobId[job.JobId] = job;
        _queuedCheckJobs.Enqueue(job.JobId);
        ThreadingUtils.RunTask(Task.Run(ProcessQueuedCheckJobs), "Process queued check jobs");
        return job.JobId;
    }

    private bool StopCheckJob(string jobId, int? timeoutMs = 2000)
    {
        var job =
            (_activeCheckJobsByJobId.TryGetValue(jobId, out var x) ? x : null)
            ?? throw new Exception($"No active check job with ID {jobId} (stop)");
        job.StopRequested = true;
        if (_queuedCheckJobs.Contains(jobId) || job.Status != CheckJobStatus.Running)
            return true;
        // Poll until the job stops or the timeout expires
        var sw = System.Diagnostics.Stopwatch.StartNew();
        while (sw.ElapsedMilliseconds < timeoutMs.GetValueOrDefault())
        {
            if (job.Status != CheckJobStatus.Running)
                return true;
            Thread.Sleep(100);
        }
        return false;
    }

    private void CleanupCheckJob(string jobId)
    {
        var job =
            (_activeCheckJobsByJobId.TryGetValue(jobId, out var x) ? x : null)
            ?? throw new Exception($"No active check job with ID {jobId} (cleanup)");
        if (job.Status == CheckJobStatus.Running)
            throw new Exception($"Cannot clean up check job {jobId} while it is still running");
        job.StopRequested = true;
        if (!_activeCheckJobsByJobId.TryRemove(jobId, out _))
            Console.WriteLine($"Failed to remove check job {jobId} from active jobs");
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

    private List<InventoryItem> RetrieveInventoryData(
        string checkId,
        string projectId,
        CheckInputRange checkInputRange
    )
    {
        ArgumentException.ThrowIfNullOrEmpty(checkId);
        ArgumentException.ThrowIfNullOrEmpty(projectId);
        ArgumentNullException.ThrowIfNull(checkInputRange);

        var dataSource = _checkCache.GetChecksDataSource(projectId);
        var check = CheckFactory.CreateCheck(checkId, dataSource);
        if (check is not ScriptureInventoryBase checkWithInventory)
        {
            Console.WriteLine(
                $"Check {checkId} does not support inventories. Cannot retrieve inventory data."
            );
            return [];
        }

        // "GetText" will tokenize the text for checks to use
        // "0" chapter number means all chapters
        var chapterNum =
            checkInputRange.Start.ChapterNum == checkInputRange.End?.ChapterNum
                ? checkInputRange.Start.ChapterNum
                : 0;
        dataSource.GetText(checkInputRange.Start.BookNum, chapterNum, check.NeededFormat);

        var textTokens = dataSource.TextTokens;
        var newReferences = checkWithInventory.GetReferences(textTokens, "");

        var references = new List<TextTokenSubstring>();
        references.AddRange(newReferences);

        return
        [
            .. references.Select(reference => new InventoryItem(
                reference.InventoryText,
                reference.Token.Text,
                reference.Token.VerseRef,
                reference.Offset
            )),
        ];
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
        lock (check.ModifyResultsLock)
        {
            var denials = GetOrCreateDenials(projectId);
            denials.AddDenial(new Enum<MessageId>(checkResultType), vRef, null, itemText);
            denials.Save();
            check.GetResultsRecorder(vRef.BookNum).PostProcessResults(denials, null);
            return true;
        }
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
        lock (check.ModifyResultsLock)
        {
            var denials = GetOrCreateDenials(projectId);
            denials.RemoveDenial(new Enum<MessageId>(checkResultType), vRef, null, itemText);
            denials.Save();
            check.GetResultsRecorder(vRef.BookNum).PostProcessResults(denials, null);
            return true;
        }
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

                    var resultsRecorder = check.GetResultsRecorder(range.Start.BookNum);
                    if (resultsRecorder.ResultsReady)
                    {
                        job.AllResults.AddRange(resultsRecorder.GetResultsInRange(range));
                        job.PercentComplete = 100 * ++completedItems / itemsToComplete;
                    }
                    else
                        checkIdsToRun.Add(checkId);
                }

                if (job.StopRequested)
                    break;

                if (checkIdsToRun.Count == 0)
                    continue;

                RunChecksForProject(range, checkIdsToRun);
                foreach (var checkId in checkIdsToRun)
                {
                    var check = _checkCache.GetCheck(checkId, range.ProjectId);
                    var resultsRecorder = check.GetResultsRecorder(range.Start.BookNum);
                    if (!resultsRecorder.ResultsReady)
                        throw new Exception($"Check {checkId} did not complete running properly.");
                    job.AllResults.AddRange(resultsRecorder.GetResultsInRange(range));
                    job.PercentComplete = 100 * ++completedItems / itemsToComplete;
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

    /// <summary>
    /// Run all provided checks on a project for books within active ranges
    /// </summary>
    private void RunChecksForProject(CheckInputRange range, IEnumerable<string> checkIds)
    {
        // Text has to be tokenized for the checks before the checks can run
        var enabledChecksForProject = _checkCache.GetChecks(checkIds, range.ProjectId);
        CheckDataFormat neededDataFormat = 0;
        foreach (var check in enabledChecksForProject)
            neededDataFormat |= check.Check.NeededFormat;

        // "GetText" will tokenize the text for checks to use
        // "0" chapter number means all chapters
        var checkDataSource = _checkCache.GetChecksDataSource(range.ProjectId);
        checkDataSource.GetText(range.Start.BookNum, 0, neededDataFormat);

        var scrText = LocalParatextProjects.GetParatextProject(range.ProjectId);
        var indexer = new UsfmBookIndexer(scrText.GetText(range.Start.BookNum));

        foreach (var checkId in checkIds)
        {
            var check = _checkCache.GetCheck(checkId, range.ProjectId);
            check.ClearResultsForBook(range.Start.BookNum);
            // Checks have to be reinitialized to pick up changes to inventories
            // Inventories are stored in the project settings file
            if (check.SettingsChanged)
            {
                check.SettingsChanged = false;
                check.Check.Initialize(checkDataSource);
            }
            RunCheck(check, checkDataSource, range, indexer);
        }
    }

    /// <summary>
    /// Run the given check on the given range
    /// </summary>
    private void RunCheck(
        CheckForProject checkForProject,
        ChecksDataSource dataSource,
        CheckInputRange range,
        UsfmBookIndexer indexer
    )
    {
        CheckResultsRecorder recorder = checkForProject.GetResultsRecorder(range.Start.BookNum);
        ErrorMessageDenials denials = GetOrCreateDenials(range.ProjectId);

        lock (checkForProject.ModifyResultsLock)
        {
            recorder.ClearResultsFromBook(range.Start.BookNum);
            checkForProject.Check.Run(range.Start.BookNum, dataSource, recorder);
            recorder.PostProcessResults(denials, indexer);
            recorder.ResultsReady = true;
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

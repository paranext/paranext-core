using System.Collections.Concurrent;
using System.Text.Json;
using Paranext.DataProvider.ParatextUtils;
using Paranext.DataProvider.Projects;
using Paratext.Checks;
using Paratext.Data.Checking;
using SIL.Scripture;

namespace Paranext.DataProvider.Checks;

/// <summary>
/// This class is intended to be a singleton that registers a data provider on the PAPI network.
/// The data provider implements the ICheckRunner interface that is defined in TypeScript. See the
/// definition of ICheckRunner and its related types in TypeScript for more details.
/// </summary>
internal class CheckRunner : NetworkObjects.DataProvider
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

    private const string DATA_TYPE_AVAILABLE_CHECKS = "AvailableChecks";

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
    private readonly ConcurrentDictionary<string, ErrorMessageDenials> _denialsByProjectId = new();
    private readonly ConcurrentDictionary<string, CheckJobStatus> _activeCheckJobsById = new();
    private readonly ConcurrentQueue<string> _queuedCheckJobs = new();
    private readonly CheckCache _checkCache = new();
    private readonly object _runChecksLock = new();

    #endregion

    #region Constructor
    public CheckRunner(PapiClient papiClient)
        : base("dotNetCheckRunner", papiClient, "checkRunner") { }

    #endregion

    #region DataProvider methods

    // Must provide all functions that are part of ICheckRunner in TS
    protected override List<(string functionName, Delegate function)> GetFunctions()
    {
        return
        [
            ("allowCheckResult", AllowCheckResult),
            ("denyCheckResult", DenyCheckResult),
            ("getAvailableChecks", GetAvailableChecks),
            ("retrieveInventoryData", RetrieveInventoryData),
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
        return new List<ParatextCheckDetails>(_checkDetailsByCheckId.Values);
    }

    private string BeginCheckJob()
    {
        var job = new CheckJobStatus();
        _activeCheckJobsById[job.JobId] = job;
        _queuedCheckJobs.Enqueue(job.JobId);
        return job.JobId;
    }

    private bool StopCheckJob(string jobId, int timeoutMs)
    {
        var job =
            (_activeCheckJobsById.TryGetValue(jobId, out var x) ? x : null)
            ?? throw new Exception($"No active check job with ID {jobId}");
        job.StopRequested = true;
        if (_queuedCheckJobs.Contains(jobId))
            return true;
        // TODO: Actually wait for the job to stop
        return false;
    }

    private void CleanupCheckJob(string jobId)
    {
        var job =
            (_activeCheckJobsById.TryGetValue(jobId, out var x) ? x : null)
            ?? throw new Exception($"No active check job with ID {jobId}");
        if (job.Status == CheckJobStatus.Queued)
            job.StopRequested = true;
        else if (job.Status == CheckJobStatus.Running)
            throw new Exception($"Cannot clean up check job {jobId} while it is still running");
        _activeCheckJobsById.TryRemove(jobId, out _);
    }

    private void AbandonCheckJob(string jobId)
    {
        var job =
            (_activeCheckJobsById.TryGetValue(jobId, out var x) ? x : null)
            ?? throw new Exception($"No active check job with ID {jobId}");
        job.StopRequested = true;
        _activeCheckJobsById.TryRemove(jobId, out _);
    }

    private CheckJobStatusReport RetrieveCheckJobUpdate(string jobId, int maxResultsToInclude)
    {
        var job =
            (_activeCheckJobsById.TryGetValue(jobId, out var x) ? x : null)
            ?? throw new Exception($"No active check job with ID {jobId}");
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
        string selectedText,
        string? _checkResultUniqueId
    )
    {
        var check = _checkCache.GetCheck(checkId, projectId);
        lock (check.Lock)
        {
            var denials = GetOrCreateDenials(projectId);
            denials.AddDenial(MessageId.UnknownUseMsgText, vRef, checkResultType, selectedText);
            denials.Save();
            check.ResultsRecorder.PostProcessResults(null, denials, null);
            return true;
        }
    }

    private bool AllowCheckResult(
        string checkId,
        string checkResultType,
        string projectId,
        VerseRef vRef,
        string selectedText,
        string? _checkResultUniqueId
    )
    {
        var check = _checkCache.GetCheck(checkId, projectId);
        lock (check.Lock)
        {
            var denials = GetOrCreateDenials(projectId);
            denials.RemoveDenial(MessageId.UnknownUseMsgText, vRef, checkResultType, selectedText);
            denials.Save();
            check.ResultsRecorder.PostProcessResults(null, denials, null);
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
        if (!_activeCheckJobsById.TryGetValue(jobId, out var job))
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

        try
        {
            foreach (var range in job.JobScope.InputRanges)
            {
                if (job.StopRequested)
                    break;

                foreach (var checkId in job.JobScope.CheckIds)
                {
                    if (job.StopRequested)
                        break;

                    var check = _checkCache.GetCheck(checkId, range.ProjectId);
                    RunChecksForProject(range.ProjectId);
                }
            }
            int totalProjects = job.JobScope.InputRanges.Length;
            int projectsCompleted = 0;

            foreach (var range in job.JobScope.InputRanges)
            {
                if (job.StopRequested)
                    break;

                RunChecksForProject(range.ProjectId);
                projectsCompleted++;
                job.PercentComplete = (int)((projectsCompleted / (double)totalProjects) * 100);
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
            job.PercentComplete = 100;
        }
    }

    /// <summary>
    /// Asynchronously run all enabled checks on a project for books within active ranges
    /// </summary>
    private void RunChecksForProject(string projectId)
    {
        ThreadingUtils.RunTask(
            Task.Run(() => RunChecksForProjectInternal(projectId)),
            $"RunChecksForProject {projectId}"
        );
    }

    /// <summary>
    /// Run all enabled checks on a project for books within active ranges
    /// </summary>
    private void RunChecksForProjectInternal(string projectId)
    {
        lock (_runChecksLock)
        {
            bool signalUpdatedData = false;

            // Text has to be tokenized for the checks before the checks can run
            var enabledChecksForProject = _checksByIds
                .Where((kvp) => kvp.Key.projectId == projectId)
                .Select((kvp) => kvp.Value.Check);
            CheckDataFormat neededDataFormat = 0;
            foreach (var check in enabledChecksForProject)
                neededDataFormat |= check.NeededFormat;

            foreach (var range in _activeRanges.Where((range) => range.ProjectId == projectId))
            {
                // "GetText" will tokenize the text for checks to use
                // "0" chapter number means all chapters
                _dataSourcesByProjectId[projectId]
                    .GetText(range.Start.BookNum, 0, neededDataFormat);

                var scrText = LocalParatextProjects.GetParatextProject(projectId);
                var indexer = new UsfmBookIndexer(scrText.GetText(range.Start.BookNum));

                foreach (
                    var checkId in _checkDetailsByCheckId
                        .Values.Where(
                            (checkDetails) => checkDetails.EnabledProjectIds.Contains(projectId)
                        )
                        .Select((checkDetails) => checkDetails.CheckId)
                )
                {
                    if (_checksByIds.TryGetValue((checkId, projectId), out var x))
                    {
                        // Checks have to be reinitialized to pick up changes to inventories
                        // Inventories are stored in the project settings file
                        if (x.SettingsChanged)
                        {
                            x.SettingsChanged = false;
                            x.Check.Initialize(_dataSourcesByProjectId[projectId]);
                        }
                        bool newResultsReturned = RunCheck(checkId, x.Check, range, indexer);
                        signalUpdatedData |= newResultsReturned;
                    }
                }
            }

            if (signalUpdatedData)
                SendDataUpdateEvent(DATA_TYPE_CHECK_RESULTS, "RunChecksForProject");
        }
    }

    /// <summary>
    /// Returns true if the check produced any new or different results, false otherwise.
    /// </summary>
    private bool RunCheck(
        string checkId,
        ScriptureCheckBase check,
        CheckInputRange range,
        UsfmBookIndexer indexer
    )
    {
        var checkData = _checksByIds.GetOrAdd(
            (checkId, range.ProjectId),
            (ids) => new CheckForProject(check, ids.checkId, ids.projectId)
        );
        CheckResultsRecorder recorder = checkData.ResultsRecorder;
        ErrorMessageDenials denials = GetOrCreateDenials(range.ProjectId);

        lock (checkData.Lock)
        {
            var removedItems = recorder.TrimResultsFromBook(range.Start.BookNum);
            int totalBeforeRunning = recorder.CheckRunResults.Count;
            check.Run(range.Start.BookNum, GetOrCreateDataSource(range.ProjectId), recorder);
            recorder.PostProcessResults(_activeRanges, denials, indexer);
            int totalAfterRunning = recorder.CheckRunResults.Count;

            if (totalAfterRunning == totalBeforeRunning)
                return removedItems.Count != 0;

            if (totalAfterRunning != totalBeforeRunning + removedItems.Count)
                return true;

            return removedItems.Exists(item => !recorder.CheckRunResults.Contains(item));
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

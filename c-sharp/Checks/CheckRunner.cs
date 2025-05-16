using System.Collections.Concurrent;
using System.Text.Json;
using Paranext.DataProvider.ParatextUtils;
using Paranext.DataProvider.Projects;
using Paratext.Checks;
using Paratext.Data;
using Paratext.Data.Checking;
using Paratext.Data.ProjectFileAccess;
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

    private sealed class CheckForProject(ScriptureCheckBase check, string checkId, string projectId)
    {
        public ScriptureCheckBase Check { get; } = check;
        public CheckResultsRecorder ResultsRecorder { get; } = new(checkId, projectId);
        public bool SettingsChanged { get; set; } = false;
        public object Lock = new();
    }

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
    private const string DATA_TYPE_ACTIVE_RANGES = "ActiveRanges";
    private const string DATA_TYPE_CHECK_RESULTS = "CheckResults";

    // Note that CheckType.Schema is not available outside Paratext itself due to dependencies
    // It cannot be easily copied, either, without some refactoring
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
        };
    private CheckInputRange[] _activeRanges = [];
    private readonly ConcurrentDictionary<string, ChecksDataSource> _dataSourcesByProjectId = [];
    private readonly ConcurrentDictionary<string, ErrorMessageDenials> _denialsByProjectId = [];
    private readonly ConcurrentDictionary<
        (string checkId, string projectId),
        CheckForProject
    > _checksByIds = [];
    private readonly object _setActiveRangesLock = new();
    private readonly object _runChecksLock = new();

    #endregion

    #region Constructor
    public CheckRunner(PapiClient papiClient)
        : base("dotNetCheckRunner", papiClient, "checkRunner")
    {
        // When inventory data is changed, there is no way from the ScrText or Settings objects
        // to be notified of the change. So we have to listen for file changes in the project
        // directory and rerun checks for the project if the inventory data changes.
        ProjectFileManager.FileChanged += (scrText, relFilePath, changeType) =>
        {
            if (relFilePath.Contains("SETTINGS.XML", StringComparison.InvariantCultureIgnoreCase))
            {
                var projectId = scrText.GetProjectDetails().Metadata.Id;
                _checksByIds
                    .Where((kvp) => kvp.Key.projectId == projectId)
                    .Select((kvp) => kvp.Value)
                    .ToList()
                    .ForEach((check) => check.SettingsChanged = true);
                RunChecksForProject(projectId);
            }
        };
    }

    #endregion

    #region DataProvider methods

    // Must provide all functions that are part of ICheckRunner in TS
    protected override List<(string functionName, Delegate function)> GetFunctions()
    {
        return
        [
            ("allowCheckResult", AllowCheckResult),
            ("denyCheckResult", DenyCheckResult),
            ("disableCheck", DisableCheck),
            ("enableCheck", EnableCheck),
            ("getActiveRanges", GetActiveRanges),
            ("getAvailableChecks", GetAvailableChecks),
            ("getCheckResults", GetCheckResults),
            ("setActiveRanges", SetActiveRanges),
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

    private CheckInputRange[] GetActiveRanges(JsonElement _ignore)
    {
        return _activeRanges;
    }

    private bool SetActiveRanges(JsonElement _ignore, CheckInputRange[]? ranges)
    {
        ArgumentNullException.ThrowIfNull(ranges);

        foreach (var range in ranges)
        {
            if (range.End.HasValue && range.Start.BookNum != range.End.Value.BookNum)
                throw new ArgumentException("Ranges cannot span between books");
        }

        lock (_setActiveRangesLock)
        {
            var oldProjectIds = _activeRanges.Select(range => range.ProjectId).Distinct();
            var newProjectIds = ranges.Select(range => range.ProjectId).Distinct();

            foreach (var projectId in oldProjectIds)
                GetOrCreateDataSource(projectId).ScrText.TextChanged -= RerunChecks;
            foreach (var projectId in newProjectIds)
                GetOrCreateDataSource(projectId).ScrText.TextChanged += RerunChecks;
            _activeRanges = ranges;

            foreach (var projectId in newProjectIds)
                RunChecksForProject(projectId);

            SendDataUpdateEvent(DATA_TYPE_ACTIVE_RANGES, "SetActiveRanges");
            return true;
        }
    }

    private List<CheckRunResult> GetCheckResults(JsonElement _ignore)
    {
        var retVal = new List<CheckRunResult>();

        foreach (var check in _checksByIds.Values)
        {
            lock (check.Lock)
            {
                retVal.AddRange(check.ResultsRecorder.CheckRunResults);
            }

            if (retVal.Count >= 1000)
                break;
        }

        if (retVal.Count > 1000)
        {
            var fullCount = retVal.Count;
            retVal.RemoveRange(1000, fullCount - 1000);
            retVal.TrimExcess();
            Console.WriteLine($"Trimming {fullCount} check results to 1000");
        }

        Console.WriteLine($"Returning {retVal.Count} check results");
        return retVal;
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

        var dataSource = GetOrCreateDataSource(projectId);
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

    private void EnableCheck(string checkId, string projectId)
    {
        ArgumentException.ThrowIfNullOrEmpty(checkId);
        ArgumentException.ThrowIfNullOrEmpty(projectId);

        var enabledProjectIds = _checkDetailsByCheckId[checkId].EnabledProjectIds;
        if (enabledProjectIds.Contains(projectId))
        {
            Console.WriteLine($"Check {checkId} for project {projectId} was already enabled");
            return;
        }

        enabledProjectIds.Add(projectId);
        var check = CheckFactory.CreateCheck(checkId, GetOrCreateDataSource(projectId));
        _checksByIds.TryAdd((checkId, projectId), new CheckForProject(check, checkId, projectId));
        Console.WriteLine($"Enabled check {checkId} for project {projectId}");
        RunChecksForProject(projectId);
        SendDataUpdateEvent(DATA_TYPE_AVAILABLE_CHECKS, "EnableCheck");
    }

    private void DisableCheck(string checkId, string? projectId)
    {
        ArgumentException.ThrowIfNullOrEmpty(checkId);

        HashSet<string> updateEvents = [DATA_TYPE_AVAILABLE_CHECKS];
        var checkDetails = _checkDetailsByCheckId[checkId];

        string[] projectIds;
        if (string.IsNullOrEmpty(projectId))
            projectIds = _checksByIds
                .Keys.Where(ids => ids.checkId == checkId)
                .Select(ids => ids.projectId)
                .Distinct()
                .ToArray();
        else
            projectIds = [projectId];

        var cid = checkId;
        foreach (var pid in projectIds)
        {
            var checkData = _checksByIds[(cid, pid)];
            lock (checkData.Lock)
            {
                if (checkData.ResultsRecorder.CheckRunResults.Count > 0)
                    updateEvents.Add(DATA_TYPE_CHECK_RESULTS);
                _checksByIds.TryRemove((cid, pid), out _);
                Console.WriteLine(
                    checkDetails.EnabledProjectIds.Remove(pid)
                        ? $"Disabled check {cid} for project {pid}"
                        : $"Project {pid} was not enabled for check {cid}"
                );
            }
        }

        SendDataUpdateEvent(updateEvents.ToList(), "disable check update");
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
        if (!_checksByIds.TryGetValue((checkId, projectId), out var check))
            throw new Exception($"Check {checkId} is not enabled for project {projectId}");
        lock (check.Lock)
        {
            var denials = GetOrCreateDenials(projectId);
            denials.AddDenial(MessageId.UnknownUseMsgText, vRef, checkResultType, selectedText);
            denials.Save();
            check.ResultsRecorder.PostProcessResults(null, denials, null);
            SendDataUpdateEvent(DATA_TYPE_CHECK_RESULTS, "Denied check result");
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
        if (!_checksByIds.TryGetValue((checkId, projectId), out var check))
            throw new Exception($"Check {checkId} has not been run for project {projectId}");
        lock (check.Lock)
        {
            var denials = GetOrCreateDenials(projectId);
            denials.RemoveDenial(MessageId.UnknownUseMsgText, vRef, checkResultType, selectedText);
            denials.Save();
            check.ResultsRecorder.PostProcessResults(null, denials, null);
            SendDataUpdateEvent(DATA_TYPE_CHECK_RESULTS, "Allowed check result");
            return true;
        }
    }

    private void RerunChecks(object? sender, TextChangedEventArgs e)
    {
        var projectId = _dataSourcesByProjectId.First((kvp) => kvp.Value.ScrText == e.ScrText).Key;
        if (string.IsNullOrEmpty(projectId))
        {
            Console.WriteLine(
                $"Attempted to run checks on project {e.ScrText.Guid} but couldn't find its project ID"
            );
            return;
        }

        // Only run the checks if we have some range active that includes the text that changed
        if (_activeRanges.Any((range) => range.IsWithinRange(projectId, e.BookNum, e.ChapterNum)))
            RunChecksForProject(projectId);
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

    private ChecksDataSource GetOrCreateDataSource(string projectId)
    {
        return _dataSourcesByProjectId.GetOrAdd(
            projectId,
            id => new ChecksDataSource(LocalParatextProjects.GetParatextProject(id))
        );
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

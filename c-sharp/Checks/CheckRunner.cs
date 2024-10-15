using System.Text.Json;
using System.Text.Json.Nodes;
using Paranext.DataProvider.JsonUtils;
using Paranext.DataProvider.MessageHandlers;
using Paranext.DataProvider.MessageTransports;
using Paranext.DataProvider.ParatextUtils;
using Paranext.DataProvider.Projects;
using Paratext.Checks;
using Paratext.Data;
using Paratext.Data.Checking;

namespace Paranext.DataProvider.Checks;

/// <summary>
/// This class is intended to be a singleton that registers a data provider on the PAPI network.
/// The data provider implements the ICheckRunner interface that is defined in TypeScript. See the
/// definition of ICheckRunner and its related types in TypeScript for more details.
/// </summary>
internal class CheckRunner(PapiClient papiClient)
    : NetworkObjects.DataProvider("dotNetCheckRunner", papiClient, "checkRunner")
{
    #region Internal classes

    private sealed class CheckForProject(ScriptureCheckBase check, string checkId, string projectId)
    {
        public ScriptureCheckBase Check { get; } = check;
        public CheckResultsRecorder ResultsRecorder { get; } = new(checkId, projectId);
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
    private readonly Dictionary<string, ChecksDataSource> _dataSourcesByProjectId = [];
    private readonly Dictionary<(string checkId, string projectId), CheckForProject> _checksByIds =
    [];
    private readonly object _dataProviderLock = new();

    #endregion

    #region DataProvider methods

    // Must provide all functions that are part of ICheckRunner in TS
    protected override List<string> GetFunctionNames()
    {
        return
        [
            "disableCheck",
            "enableCheck",
            "getActiveRanges",
            "getAvailableChecks",
            "getCheckResults",
            "setActiveRanges",
        ];
    }

    protected override Task StartDataProvider()
    {
        return Task.CompletedTask;
    }

    protected override ResponseToRequest HandleRequest(string functionName, JsonArray args)
    {
        lock (_dataProviderLock)
        {
            Console.WriteLine($"Calling {functionName} with args {args}");

            return functionName switch
            {
                "disableCheck" => DisableCheck(
                    args[0].Deserialize<string>() ?? "",
                    args.Count > 1 ? args[1].Deserialize<string>() : null
                ),
                "enableCheck" => EnableCheck(
                    args[0].Deserialize<string>() ?? "",
                    args[1].Deserialize<string>() ?? ""
                ),
                "getActiveRanges" => GetActiveRanges(),
                "getAvailableChecks" => GetAvailableChecks(),
                "getCheckResults" => GetCheckResults(),
                "setActiveRanges" => SetActiveRanges(
                    CheckInputRangeConverter.CreateCheckInputRangeArray(args[1])
                ),
                _ => ResponseToRequest.Failed($"Unknown function: {functionName}"),
            };
        }
    }

    #endregion

    #region CheckRunner methods

    private ResponseToRequest GetAvailableChecks()
    {
        return ResponseToRequest.Succeeded(
            new List<ParatextCheckDetails>(_checkDetailsByCheckId.Values)
        );
    }

    private ResponseToRequest GetActiveRanges()
    {
        return ResponseToRequest.Succeeded(_activeRanges);
    }

    private ResponseToRequest SetActiveRanges(CheckInputRange[]? ranges)
    {
        ArgumentNullException.ThrowIfNull(ranges);

        foreach (var range in ranges)
        {
            if (range.End.HasValue && range.Start.BookNum != range.End.Value.BookNum)
                throw new ArgumentException("Ranges cannot span between books");
        }

        foreach (var projectId in _activeRanges.Select(range => range.ProjectId).Distinct())
            GetOrCreateDataSource(projectId).ScrText.TextChanged -= RerunChecks;
        foreach (var projectId in ranges.Select(range => range.ProjectId).Distinct())
            GetOrCreateDataSource(projectId).ScrText.TextChanged += RerunChecks;
        _activeRanges = ranges;

        bool notifyOfUpdatedCheckResults = false;
        foreach (var projectId in ranges.Select(range => range.ProjectId).Distinct())
        {
            bool producedNewOrDifferentResults = RunChecksForProject(projectId);
            notifyOfUpdatedCheckResults |= producedNewOrDifferentResults;
        }

        List<string> updateEvents = [DATA_TYPE_ACTIVE_RANGES];
        if (notifyOfUpdatedCheckResults)
            updateEvents.Add(DATA_TYPE_CHECK_RESULTS);

        SendDataUpdateEvent(updateEvents);
        return ResponseToRequest.Succeeded(updateEvents);
    }

    private ResponseToRequest GetCheckResults()
    {
        var retVal = new List<CheckRunResult>();
        foreach (var check in _checksByIds.Values)
            retVal.AddRange(check.ResultsRecorder.CheckRunResults);
        if (retVal.Count > 1000)
        {
            var fullCount = retVal.Count;
            retVal.RemoveRange(1000, fullCount - 1000);
            retVal.TrimExcess();
            Console.WriteLine($"Trimming {fullCount} check results to 1000");
        }
        Console.WriteLine($"Returning {retVal.Count} check results");
        return ResponseToRequest.Succeeded(retVal);
    }

    private ResponseToRequest EnableCheck(string checkId, string projectId)
    {
        ArgumentException.ThrowIfNullOrEmpty(checkId);
        ArgumentException.ThrowIfNullOrEmpty(projectId);

        List<string> updateEvents = [];

        var enabledProjectIds = _checkDetailsByCheckId[checkId].EnabledProjectIds;
        if (enabledProjectIds.Contains(projectId))
            Console.WriteLine($"Check {checkId} for project {projectId} was already enabled");
        else
        {
            updateEvents.Add(DATA_TYPE_AVAILABLE_CHECKS);
            enabledProjectIds.Add(projectId);
            var check = CheckFactory.CreateCheck(checkId, GetOrCreateDataSource(projectId));
            _checksByIds.Add((checkId, projectId), new CheckForProject(check, checkId, projectId));
            Console.WriteLine($"Enabled check {checkId} for project {projectId}");
            if (RunChecksForProject(projectId))
                updateEvents.Add(DATA_TYPE_CHECK_RESULTS);
        }

        if (updateEvents.Count > 0)
            SendDataUpdateEvent(updateEvents);
        return ResponseToRequest.Succeeded();
    }

    private ResponseToRequest DisableCheck(string checkId, string? projectId)
    {
        ArgumentException.ThrowIfNullOrEmpty(checkId);

        List<string> updateEvents = [DATA_TYPE_AVAILABLE_CHECKS];
        var checkDetails = _checkDetailsByCheckId[checkId];

        if (string.IsNullOrEmpty(projectId))
        {
            Console.WriteLine($"Disabled check {checkId} for all projects");
            checkDetails.EnabledProjectIds.Clear();
            bool resultsRemoved = false;
            foreach (var ids in _checksByIds.Keys.Where(ids => ids.checkId == checkId))
            {
                resultsRemoved |= _checksByIds[ids].ResultsRecorder.CheckRunResults.Count > 0;
                _checksByIds.Remove(ids);
            }
            if (resultsRemoved)
                updateEvents.Add(DATA_TYPE_CHECK_RESULTS);

            SendDataUpdateEvent(updateEvents);
            return ResponseToRequest.Succeeded(updateEvents);
        }

        var projectIds = checkDetails.EnabledProjectIds;
        int resultsCount = _checksByIds[(checkId, projectId)].ResultsRecorder.CheckRunResults.Count;
        _checksByIds.Remove((checkId, projectId));
        Console.WriteLine(
            projectIds.Remove(projectId)
                ? $"Disabled check {checkId} for project {projectId}"
                : $"Project {projectId} was not enabled for check {checkId}"
        );
        if (resultsCount > 0)
            updateEvents.Add(DATA_TYPE_CHECK_RESULTS);

        SendDataUpdateEvent(updateEvents);
        return ResponseToRequest.Succeeded(updateEvents);
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

        bool notifyOfNewOrDifferentResults = false;

        // Only run the checks if we have some range active that includes the text that changed
        if (_activeRanges.Any((range) => range.IsWithinRange(projectId, e.BookNum, e.ChapterNum)))
            notifyOfNewOrDifferentResults = RunChecksForProject(projectId);

        if (notifyOfNewOrDifferentResults)
            SendDataUpdateEvent(DATA_TYPE_CHECK_RESULTS);
    }

    /// <summary>
    /// Run all enabled checks on a project for books within active ranges
    /// </summary>
    /// <returns>true if some check produced any new or different results, false otherwise</returns>
    private bool RunChecksForProject(string projectId)
    {
        bool retVal = false;

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
            _dataSourcesByProjectId[projectId].GetText(range.Start.BookNum, 0, neededDataFormat);

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
                var check = _checksByIds[(checkId, projectId)].Check;
                bool newResultsReturned = RunCheck(checkId, check, range, indexer);
                retVal |= newResultsReturned;
            }
        }
        return retVal;
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
        CheckResultsRecorder recorder;
        if (!_checksByIds.TryGetValue((checkId, range.ProjectId), out var data))
        {
            var checkData = new CheckForProject(check, checkId, range.ProjectId);
            _checksByIds.Add((checkId, range.ProjectId), checkData);
            recorder = checkData.ResultsRecorder;
        }
        else
            recorder = data.ResultsRecorder;

        var removedItems = recorder.TrimResultsFromBook(range.Start.BookNum);
        int totalBeforeRunning = recorder.CheckRunResults.Count;
        check.Run(range.Start.BookNum, GetOrCreateDataSource(range.ProjectId), recorder);
        recorder.FilterResults(range);
        recorder.CalculateActualOffsets(indexer);
        int totalAfterRunning = recorder.CheckRunResults.Count;

        if (totalAfterRunning == totalBeforeRunning)
            return removedItems.Count != 0;

        if (totalAfterRunning != totalBeforeRunning + removedItems.Count)
            return true;

        return removedItems.Exists(item => !recorder.CheckRunResults.Contains(item));
    }

    private ChecksDataSource GetOrCreateDataSource(string projectId)
    {
        if (!_dataSourcesByProjectId.TryGetValue(projectId, out var dataSource))
        {
            var scrText = LocalParatextProjects.GetParatextProject(projectId);
            dataSource = new ChecksDataSource(scrText);
            _dataSourcesByProjectId.Add(projectId, dataSource);
        }
        return dataSource;
    }

    #endregion
}

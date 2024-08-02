using System.Text.Json;
using System.Text.Json.Nodes;
using Paranext.DataProvider.JsonUtils;
using Paranext.DataProvider.MessageHandlers;
using Paranext.DataProvider.Messages;
using Paranext.DataProvider.MessageTransports;
using Paranext.DataProvider.Projects;
using Paratext.Checks;
using Paratext.Data;
using Paratext.Data.Checking;

namespace Paranext.DataProvider.Checks;

internal class CheckRunner(PapiClient papiClient)
    : NetworkObjects.DataProvider("dotNetCheckRunner", papiClient, "checkRunner")
{
    // Note that CheckType.Schema is not available outside Paratext itself due to dependencies
    // It cannot be easily copied, either, without some refactoring
    private readonly Dictionary<string, ParatextCheckDetails> _checkDetailsByCheckId = new()
    {
        { CheckType.Capitalization.InternalValue, new (CheckType.Capitalization) },
        { CheckType.ChapterVerse.InternalValue, new (CheckType.ChapterVerse) },
        { CheckType.Character.InternalValue, new (CheckType.Character) },
        { CheckType.Marker.InternalValue, new (CheckType.Marker) },
        { CheckType.MatchedPairs.InternalValue, new (CheckType.MatchedPairs) },
        { CheckType.Numbers.InternalValue, new (CheckType.Numbers) },
        { CheckType.ParagraphFinalPunctuation.InternalValue, new (CheckType.ParagraphFinalPunctuation) },
        { CheckType.Punctuation.InternalValue, new (CheckType.Punctuation) },
        { CheckType.Quotation.InternalValue, new (CheckType.Quotation) },
        { CheckType.QuotationTypes.InternalValue, new (CheckType.QuotationTypes) },
        { CheckType.QuotedText.InternalValue, new (CheckType.QuotedText) },
        { CheckType.Reference.InternalValue, new (CheckType.Reference) },
        { CheckType.RepeatedWord.InternalValue, new (CheckType.RepeatedWord) },
    };
    private CheckInputRange[] _activeRanges = [];
    private readonly Dictionary<string, ChecksDataSource> _dataSourceByProjectId = [];
    private readonly Dictionary<(string checkId, string projectId), ScriptureCheckBase> _checksByCheckAndProjectIds = [];
    private readonly Dictionary<(string checkId, string projectId), CheckResultsRecorder> _resultsByCheckAndProjectIds = [];
    private readonly object _lock = new();
    private readonly MessageEvent _checkResultsUpdatedEvent = new ("dotNetCheckRunner-data:onDidUpdate", null);

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
        lock (_lock)
        {
            Console.WriteLine($"Calling {functionName} with args {args}");

            return functionName switch
            {
                "disableCheck" => DisableCheck(args[0].Deserialize<string>() ?? "", args.Count > 1 ? args[1].Deserialize<string>() : null),
                "enableCheck" => EnableCheck(args[0].Deserialize<string>() ?? "", args[1].Deserialize<string>() ?? ""),
                "getActiveRanges" => GetActiveRanges(),
                "getAvailableChecks" => GetAvailableChecks(),
                "getCheckResults" => GetCheckResults(),
                "setActiveRanges" => SetActiveRanges(CheckInputRangeConverter.CreateCheckInputRangeArray(args[1])),
                _ => ResponseToRequest.Failed($"Unknown function: {functionName}"),
            };
        }
    }

    private ResponseToRequest GetAvailableChecks()
    {
        return ResponseToRequest.Succeeded(new List<ParatextCheckDetails>(_checkDetailsByCheckId.Values));
    }

    private ResponseToRequest GetActiveRanges()
    {
        return ResponseToRequest.Succeeded(_activeRanges);
    }

    private ResponseToRequest SetActiveRanges(CheckInputRange[]? ranges)
    {
        ArgumentNullException.ThrowIfNull(ranges);

        foreach(var range in _activeRanges)
            GetOrCreateDataSource(range.ProjectId).ScrText.TextChanged -= RerunChecks;
        foreach(var range in ranges)
            GetOrCreateDataSource(range.ProjectId).ScrText.TextChanged += RerunChecks;
        _activeRanges = ranges;
        foreach (var projectId in ranges.Select(r => r.ProjectId).Distinct())
            RunChecksForProject(projectId);
        return ResponseToRequest.Succeeded("ActiveRanges");
    }

    private ResponseToRequest GetCheckResults()
    {
        var retVal = new List<CheckRunResult>();
        foreach (var results in _resultsByCheckAndProjectIds.Values)
            retVal.AddRange(results.CheckRunResults);
        Console.WriteLine($"Returning {retVal.Count} check results");
        return ResponseToRequest.Succeeded(retVal);
    }

    private ResponseToRequest EnableCheck(string checkId, string projectId)
    {
        ArgumentException.ThrowIfNullOrEmpty(checkId);
        ArgumentException.ThrowIfNullOrEmpty(projectId);

        var enabledProjectIds = _checkDetailsByCheckId[checkId].EnabledProjectIds;
        if (enabledProjectIds.Contains(projectId))
            Console.WriteLine($"Check {checkId} for project {projectId} was already enabled");
        else
        {
            enabledProjectIds.Add(projectId);
            var check = CheckFactory.CreateCheck(checkId, GetOrCreateDataSource(projectId));
            _checksByCheckAndProjectIds.Add((checkId, projectId), check);
            Console.WriteLine($"Enabled check {checkId} for project {projectId}");
        }

        return ResponseToRequest.Succeeded("AvailableChecks");
    }

    private ResponseToRequest DisableCheck(string checkId, string? projectId)
    {
        ArgumentException.ThrowIfNullOrEmpty(checkId);

        var checkDetails = _checkDetailsByCheckId[checkId];

        if (string.IsNullOrEmpty(projectId))
        {
            Console.WriteLine($"Disabled check {checkId} for all projects");
            checkDetails.EnabledProjectIds.Clear();
            foreach (var checkAndProjectId in _checksByCheckAndProjectIds.Keys.Where(checkAndProjectId => checkAndProjectId.Item1 == checkId))
            {
                _checksByCheckAndProjectIds.Remove(checkAndProjectId);
            }
            return ResponseToRequest.Succeeded("AvailableChecks");
        }

        var projectIds = checkDetails.EnabledProjectIds;
        _checksByCheckAndProjectIds.Remove((checkId, projectId));
        Console.WriteLine(projectIds.Remove(projectId)
            ? $"Disabled check {checkId} for project {projectId}"
            : $"Project {projectId} was not enabled for check {checkId}");
        return ResponseToRequest.Succeeded("AvailableChecks");
    }

    private void RerunChecks(object? sender, TextChangedEventArgs e)
    {
        var projectId = _dataSourceByProjectId.First((kvp) => kvp.Value.ScrText == e.ScrText).Key;
        if (string.IsNullOrEmpty(projectId))
        {
            Console.WriteLine($"Attempted to run checks on project {e.ScrText.Guid} but couldn't find its project ID");
            return;
        }

        bool notifyOfNewResults = false;

        // Only run the checks if we have some range active that includes the text that changed
        if (_activeRanges.Any((range) => range.IsWithinRange(projectId, e.BookNum, e.ChapterNum)))
            notifyOfNewResults = RunChecksForProject(projectId);

        if (notifyOfNewResults)
        {
            Console.WriteLine($"Data changed");
            PapiClient.SendEvent(_checkResultsUpdatedEvent);
        }
    }

    private bool RunChecksForProject(string projectId)
    {
        bool retVal = false;

        // Text has to be tokenized for the checks before the checks can run
        var enabledChecksForProject = _checksByCheckAndProjectIds
                .Where((kvp) => kvp.Key.projectId == projectId)
                .Select((kvp) => kvp.Value);
        CheckDataFormat neededDataFormat = 0;
        foreach (var check in enabledChecksForProject)
            neededDataFormat |= check.NeededFormat;

        foreach (var range in _activeRanges.Where((range) => range.ProjectId == projectId))
        {
            // "GetText" will tokenize the text for checks to use
            // "0" chapter number means all chapters
            _dataSourceByProjectId[projectId].GetText(range.Start.BookNum, 0, neededDataFormat);

            foreach (var checkId in _checkDetailsByCheckId.Values
                .Where((checkDetails) => checkDetails.EnabledProjectIds.Contains(projectId))
                .Select((checkDetails) => checkDetails.CheckId))
            {
                var check = _checksByCheckAndProjectIds[(checkId, projectId)];
                bool newResultsReturned = RunCheck(checkId, check, range);
                retVal |= newResultsReturned;
            }
        }
        return retVal;
    }

    /// <summary>
    /// Returns true if the check produced any new or different results, false otherwise.
    /// </summary>
    private bool RunCheck(string checkId, ScriptureCheckBase check, CheckInputRange range)
    {
        if (!_resultsByCheckAndProjectIds.TryGetValue((checkId, range.ProjectId), out var results))
        {
            results = new CheckResultsRecorder(checkId, range.ProjectId);
            _resultsByCheckAndProjectIds.Add((checkId, range.ProjectId), results);
        }

        var removedItems = results.CheckRunResults.FindAll((result) => result.Start.VerseRef.BookNum == range.Start.BookNum);
        results.CheckRunResults.RemoveAll((result) => result.Start.VerseRef.BookNum == range.Start.BookNum);
        int totalBeforeRunning = results.CheckRunResults.Count;
        results.CurrentBookNumber = range.Start.BookNum;
        check.Run(range.Start.BookNum, GetOrCreateDataSource(range.ProjectId), results);
        int totalAfterRunning = results.CheckRunResults.Count;

        if (totalAfterRunning == totalBeforeRunning)
            return removedItems.Count != 0;

        return removedItems.Exists(item => !results.CheckRunResults.Contains(item));
    }

    private ChecksDataSource GetOrCreateDataSource(string projectId)
    {
        if (!_dataSourceByProjectId.TryGetValue(projectId, out var dataSource))
        {
            var scrText = LocalParatextProjects.GetParatextProject(projectId);
            dataSource = new ChecksDataSource(scrText);
            _dataSourceByProjectId.Add(projectId, dataSource);
        }
        return dataSource;
    }
}

using Paranext.DataProvider.ParatextUtils;
using Paratext.Checks;
using Paratext.Data.Checking;

namespace Paranext.DataProvider.Checks;

/// <summary>
/// Holds a check and its results for a specific project.
/// </summary>
internal sealed class CheckForProject(ScriptureCheckBase check, string checkId, string projectId)
{
    private readonly Dictionary<int, CheckResultsRecorder> _recordersByBookNum = new();
    private readonly object _lock = new();

    public ScriptureCheckBase Check { get; } = check;

    /// <summary>
    /// Indicates whether configuration settings (e.g., inventories) for this check have changed
    /// since the last time the check was run.
    /// </summary>
    public bool SettingsChanged { get; set; } = false;

    /// <summary>
    /// Access the results recorder for a specific book within the scope of this check, and
    /// perform the specified action on that results recorder. The action can read or modify the
    /// results recorder as needed.
    /// <br/>
    /// Note that the callbacks are done within a lock to ensure thread safety. The callbacks should
    /// be quick and non-blocking to avoid contention and deadlocks.
    /// </summary>
    /// <param name="bookNum">Book number associated with the recorder to access</param>
    /// <param name="callback">Callback to run on the accessed recorder</param>
    public void AccessResults(int bookNum, Action<CheckResultsRecorder> callback)
    {
        lock (_lock)
        {
            if (!_recordersByBookNum.ContainsKey(bookNum))
                _recordersByBookNum[bookNum] = new CheckResultsRecorder(checkId, projectId);
            var recorder = _recordersByBookNum[bookNum];
            callback(recorder);
        }
    }

    public void ClearResults()
    {
        lock (_lock)
        {
            foreach (var recorder in _recordersByBookNum.Values)
            {
                recorder.ClearResults();
            }
        }
    }

    public void ClearResultsForBook(int bookNum)
    {
        lock (_lock)
        {
            _recordersByBookNum[bookNum].ClearResults();
        }
    }

    public void Run(
        ChecksDataSource dataSource,
        int bookNum,
        UsfmBookIndexer indexer,
        ErrorMessageDenials denials
    )
    {
        AccessResults(
            bookNum,
            (recorder) =>
            {
                recorder.ClearResultsFromBook(bookNum);
                Check.Run(bookNum, dataSource, recorder);
                recorder.PostProcessResults(denials, indexer);
                recorder.ResultsReady = true;
            }
        );
    }
}

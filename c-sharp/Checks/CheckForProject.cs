using Paratext.Checks;
using Paratext.Data.Checking;

namespace Paranext.DataProvider.Checks;

/// <summary>
/// Holds a check and its results for a specific project.
/// </summary>
internal sealed class CheckForProject(ScriptureCheckBase check, string checkId, string projectId)
{
    private readonly Dictionary<int, CheckResultsRecorder> _recordersByBookNum = new();
    private readonly Dictionary<int, int> _editCountsByBookNum = new();
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

    /// <summary>
    /// Clears the results for a book because its text was edited. The edit is counted even when
    /// this check has no results for the book, so a run that read the book's text before the edit
    /// can tell that it ran on old text (see <see cref="GetEditCount"/>).
    /// </summary>
    public void ClearResultsForBook(int bookNum)
    {
        lock (_lock)
        {
            _editCountsByBookNum[bookNum] = _editCountsByBookNum.GetValueOrDefault(bookNum) + 1;
            if (_recordersByBookNum.TryGetValue(bookNum, out var recorder))
                recorder.ClearResults();
        }
    }

    /// <summary>
    /// The number of edits to a book that this check has been told about. Read it before reading
    /// the book's text and pass it to <see cref="Run"/>.
    /// </summary>
    public int GetEditCount(int bookNum)
    {
        lock (_lock)
        {
            return _editCountsByBookNum.GetValueOrDefault(bookNum);
        }
    }

    /// <summary>
    /// Runs the check on a book and records its results. The results are marked ready only if no
    /// edit to the book was counted since <paramref name="editCountBeforeTextRead"/>; otherwise the
    /// check ran on text that has since been edited and the next run has to redo it.
    /// </summary>
    /// <param name="editCountBeforeTextRead">
    /// <see cref="GetEditCount"/> for the book, read before the text the check runs on was read
    /// </param>
    public void Run(
        ChecksDataSource dataSource,
        int bookNum,
        ErrorMessageDenials denials,
        int editCountBeforeTextRead
    )
    {
        AccessResults(
            bookNum,
            (recorder) =>
            {
                recorder.ClearResultsFromBook(bookNum);
                Check.Run(bookNum, dataSource, recorder);
                recorder.PostProcessResults(denials);
                // Same lock as ClearResultsForBook, so an edit cannot slip in between the comparison
                // and the mark
                recorder.ResultsReady =
                    _editCountsByBookNum.GetValueOrDefault(bookNum) == editCountBeforeTextRead;
            }
        );
    }
}

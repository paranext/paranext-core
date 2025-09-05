using System.Collections.Concurrent;
using Paranext.DataProvider.Checks;
using Paratext.Checks;

/// <summary>
/// Holds a check and its results for a specific project
/// </summary>
internal sealed class CheckForProject(ScriptureCheckBase check, string checkId, string projectId)
{
    private ConcurrentDictionary<int, CheckResultsRecorder> _recordersByBookNum = new();

    public ScriptureCheckBase Check { get; } = check;
    public bool SettingsChanged { get; set; } = false;
    public readonly object ModifyResultsLock = new();

    public CheckResultsRecorder GetResultsRecorder(int bookNum)
    {
        return _recordersByBookNum.GetOrAdd(
            bookNum,
            _ => new CheckResultsRecorder(checkId, projectId)
        );
    }

    public void ClearResults()
    {
        lock (ModifyResultsLock)
        {
            foreach (var recorder in _recordersByBookNum.Values)
            {
                recorder.ClearResults();
            }
        }
    }

    public void ClearResultsForBook(int bookNum)
    {
        lock (ModifyResultsLock)
        {
            _recordersByBookNum[bookNum].ClearResults();
        }
    }
}

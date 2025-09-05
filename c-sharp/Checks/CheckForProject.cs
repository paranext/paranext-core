using System.Collections.Concurrent;
using Paratext.Checks;

namespace Paranext.DataProvider.Checks;

/// <summary>
/// Holds a check and its results for a specific project. Any code that modifies the results
/// should lock on the ModifyResultsLock object before doing so.
/// </summary>
public sealed class CheckForProject(ScriptureCheckBase check, string checkId, string projectId)
{
    private ConcurrentDictionary<int, CheckResultsRecorder> _recordersByBookNum = new();

    public ScriptureCheckBase Check { get; } = check;
    public bool SettingsChanged { get; set; } = false;
    public object ModifyResultsLock { get; init; } = new();

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

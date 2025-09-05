using Paranext.DataProvider.Checks;
using Paratext.Checks;

/// <summary>
/// Holds a check and its results for a specific project
/// </summary>
internal sealed class CheckForProject(ScriptureCheckBase check, string checkId, string projectId)
{
    public ScriptureCheckBase Check { get; } = check;
    public CheckResultsRecorder ResultsRecorder { get; } = new(checkId, projectId);
    public readonly object Lock = new();

    public void ClearResults()
    {
        lock (Lock)
        {
            ResultsRecorder.CheckRunResults.Clear();
        }
    }

    public void ClearResultsForBook(int bookNum)
    {
        lock (Lock)
        {
            ResultsRecorder.TrimResultsFromBook(bookNum);
        }
    }
}

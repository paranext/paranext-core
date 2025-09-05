namespace Paranext.DataProvider.Checks;

/// <summary>
/// A report on the status of a check job, including a batch of results if available. This class
/// must serialize to the CheckJobStatusReport type defined in TypeScript.
/// </summary>
public class CheckJobStatusReport
{
    public string JobId { get; init; } = Guid.NewGuid().ToString();
    public string Status { get; set; } = CheckJobStatus.Queued;
    public double PercentComplete { get; set; } = 0;
    public int TotalResultsCount { get; set; } = 0;
    public IList<CheckRunResult> NextResults { get; set; } = [];
    public string Error { get; set; } = "";
    public double TotalExecutionTimeMs { get; set; } = 0;
}

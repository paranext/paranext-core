using Paranext.DataProvider;
using Paranext.DataProvider.Checks;

internal class CheckJobStatus : CheckJobStatusReport
{
    #region Possible Status Values

    public const string Queued = "queued";
    public const string Running = "running";
    public const string Stopped = "stopped";
    public const string Errored = "errored";
    public const string Completed = "completed";

    #endregion

    public CheckJobScope JobScope { get; set; } = null!;
    public ConcurrentBatchCollection<CheckRunResult> AllResults { get; set; } =
        new ConcurrentBatchCollection<CheckRunResult>();
    public DateTime StartTimeUtc { get; set; } = DateTime.UtcNow;
    public DateTime? EndTimeUtc { get; set; } = null;
    public bool StopRequested { get; set; } = false;

    public CheckJobStatusReport GenerateStatusReport(int maxResultsToInclude)
    {
        return new CheckJobStatusReport
        {
            JobId = JobId,
            Status = Status,
            PercentComplete = PercentComplete,
            TotalResultsCount = AllResults.TotalCountAdded,
            NextResults = AllResults.DequeueRange(maxResultsToInclude),
            Error = string.IsNullOrEmpty(Error) ? string.Empty : Error,
            TotalExecutionTimeMs = (
                (EndTimeUtc ?? DateTime.UtcNow) - StartTimeUtc
            ).TotalMilliseconds,
        };
    }
}

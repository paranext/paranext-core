namespace Paranext.DataProvider.Checks;

/// <summary>
/// Represents the current status of a check job, including its results. This is the
/// CheckJobStatusReport plus additional runtime information used internally.
/// </summary>
internal sealed class CheckJobStatus(CheckJobScope jobScope) : CheckJobStatusReport
{
    #region Possible Status Values

    public const string Queued = "queued";
    public const string Running = "running";
    public const string Stopped = "stopped";
    public const string Errored = "errored";
    public const string Completed = "completed";

    #endregion

    public CheckJobScope JobScope { get; init; } = jobScope;
    public ConcurrentBatchCollection<CheckRunResult> AllResults { get; set; } =
        new ConcurrentBatchCollection<CheckRunResult>();
    public DateTime StartTimeUtc { get; set; } = DateTime.UtcNow;
    public DateTime? EndTimeUtc { get; set; } = null;
    public bool StopRequested { get; set; } = false;

    private readonly List<CheckJobError> _checkErrors = [];
    private readonly object _checkErrorsLock = new();

    /// <summary>
    /// Records that a check could not run. A check that fails the same way in several books is
    /// recorded once.
    /// </summary>
    public void AddCheckError(CheckJobError checkError)
    {
        lock (_checkErrorsLock)
        {
            if (!_checkErrors.Contains(checkError))
                _checkErrors.Add(checkError);
        }
    }

    private List<CheckJobError>? SnapshotCheckErrors()
    {
        lock (_checkErrorsLock)
            return _checkErrors.Count > 0 ? [.. _checkErrors] : null;
    }

    public CheckJobStatusReport GenerateStatusReport(int maxResultsToInclude)
    {
        return new CheckJobStatusReport
        {
            JobId = JobId,
            Status = Status,
            PercentComplete = PercentComplete,
            TotalResultsCount = AllResults.TotalCountAdded,
            NextResults =
                AllResults.Count > 0 ? AllResults.DequeueRange(maxResultsToInclude) : null,
            Error = string.IsNullOrEmpty(Error) ? null : Error,
            CheckErrors = SnapshotCheckErrors(),
            TotalExecutionTimeMs = (
                (EndTimeUtc ?? DateTime.UtcNow) - StartTimeUtc
            ).TotalMilliseconds,
        };
    }
}

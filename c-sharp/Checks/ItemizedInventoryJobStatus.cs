namespace Paranext.DataProvider.Checks;

/// <summary>
/// Represents the current status of an itemized inventory job, including its results. This is the
/// ItemizedInventoryJobStatusReport plus additional runtime information used internally.
/// </summary>
internal sealed class ItemizedInventoryJobStatus(ItemizedInventoryJobScope jobScope)
    : ItemizedInventoryJobStatusReport
{
    #region Possible Status Values

    public const string Running = "running";
    public const string Stopped = "stopped";
    public const string Errored = "errored";
    public const string Completed = "completed";

    #endregion

    public ItemizedInventoryJobScope JobScope { get; init; } = jobScope;
    public ConcurrentBatchCollection<ItemizedInventoryItem> AllResults { get; set; } =
        new ConcurrentBatchCollection<ItemizedInventoryItem>();
    public DateTime StartTimeUtc { get; set; } = DateTime.UtcNow;
    public DateTime? EndTimeUtc { get; set; } = null;
    public bool StopRequested { get; set; } = false;

    public void AppendResults(List<ItemizedInventoryItem> newItems)
    {
        newItems.Sort(
            (a, b) =>
            {
                int cmp = a.Location.VerseRef.CompareTo(b.Location.VerseRef);
                if (cmp != 0)
                    return cmp;
                return a.Location.Offset.CompareTo(b.Location.Offset);
            }
        );
        AllResults.AddRange(newItems);
    }

    public ItemizedInventoryJobStatusReport GenerateStatusReport(int maxResultsToInclude)
    {
        return new ItemizedInventoryJobStatusReport
        {
            JobId = JobId,
            InventoryId = InventoryId,
            ProjectId = ProjectId,
            Key = Key,
            Status = Status,
            PercentComplete = PercentComplete,
            TotalResultsCount = AllResults.TotalCountAdded,
            NextResults =
                AllResults.Count > 0 ? AllResults.DequeueRange(maxResultsToInclude) : null,
            Error = string.IsNullOrEmpty(Error) ? null : Error,
            TotalExecutionTimeMs = (
                (EndTimeUtc ?? DateTime.UtcNow) - StartTimeUtc
            ).TotalMilliseconds,
        };
    }
}

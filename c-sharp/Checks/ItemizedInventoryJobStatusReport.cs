namespace Paranext.DataProvider.Checks;

/// <summary>
/// A report on the status of an itemized inventory results job, including a batch of results if
/// available.
/// <br/>
/// This class must serialize to the ItemizedInventoryJobStatusReport type defined in TypeScript.
/// </summary>
internal class ItemizedInventoryJobStatusReport
{
    public string JobId { get; init; } = Guid.NewGuid().ToString();
    public string InventoryId { get; set; } = string.Empty;
    public string ProjectId { get; set; } = string.Empty;
    public string Key { get; set; } = string.Empty;
    public string Status { get; set; } = ItemizedInventoryJobStatus.Running;
    public double PercentComplete { get; set; } = 0;
    public int TotalResultsCount { get; set; } = 0;
    public IList<ItemizedInventoryItem>? NextResults { get; set; } = null;
    public string? Error { get; set; } = null;
    public double TotalExecutionTimeMs { get; set; } = 0;
}

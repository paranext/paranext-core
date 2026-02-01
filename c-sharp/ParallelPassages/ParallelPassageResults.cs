namespace Paranext.DataProvider.ParallelPassages;

/// <summary>
/// Aggregated status flags for a parallel passage set.
/// Computed from per-verse PassageStates via ParallelPassageStatuses.GetPassageState().
/// </summary>
public record StatusAggregation(
    bool AllIgnored,
    bool AllTicked,
    bool AnyOutdated,
    bool AllChanged,
    bool AllUnfinished
);

/// <summary>
/// Result of an approval toggle command.
/// </summary>
public record ApprovalResult(
    bool Success,
    StatusAggregation? UpdatedStatuses = null,
    string? ErrorCode = null,
    string? Message = null
);

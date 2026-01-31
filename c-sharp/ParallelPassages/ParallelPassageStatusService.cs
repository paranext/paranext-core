using Paratext.Data;

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
/// Service that aggregates per-verse passage states into boolean summary flags.
/// EXT-001: Passage Status Aggregation.
/// </summary>
public class ParallelPassageStatusService
{
    /// <summary>
    /// Computes aggregated status for a passage set by querying ParallelPassageStatuses.GetPassageState()
    /// for each verse and combining the results into boolean flags.
    /// </summary>
    public StatusAggregation GetAggregatedStatus(ScrText scrText, ParallelPassageEntry passage)
    {
        // TODO: MP-3 implementation (CAP-001)
        throw new NotImplementedException("CAP-001: GetAggregatedStatus not yet implemented");
    }
}

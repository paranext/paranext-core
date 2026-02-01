using Paratext.Data;

namespace Paranext.DataProvider.ParallelPassages;

/// <summary>
/// Result of an approval toggle command.
/// </summary>
public record ApprovalResult(
    bool Success,
    StatusAggregation? UpdatedStatuses = null,
    string? ErrorCode = null,
    string? Message = null
);

/// <summary>
/// Handles approval toggle commands with cross-type propagation.
/// EXT-003: ToggleSetApproval (Row mode).
/// EXT-004: ToggleIndividualApproval (Column mode).
/// </summary>
public class ParallelPassageApprovalService
{
    private readonly ParallelPassageAccessor _accessor;
    private readonly ParallelPassageStatusService _statusService;

    public ParallelPassageApprovalService(
        ParallelPassageAccessor accessor,
        ParallelPassageStatusService statusService
    )
    {
        _accessor = accessor;
        _statusService = statusService;
    }

    /// <summary>
    /// Toggles all verses in a passage set between Finished and Unfinished.
    /// For NTtoOT passages, propagates to related OTtoOT and NTtoNT.
    /// </summary>
    public ApprovalResult ToggleSetApproval(ScrText scrText, ParallelPassageEntry passage)
    {
        // TODO: Implement in GREEN phase
        throw new NotImplementedException("CAP-003: ToggleSetApproval not yet implemented");
    }

    /// <summary>
    /// Toggles a single verse's approval state with bidirectional cross-type propagation.
    /// </summary>
    public ApprovalResult ToggleIndividualApproval(
        ScrText scrText,
        ParallelPassageEntry passage,
        string headVerse
    )
    {
        // TODO: Implement in GREEN phase
        throw new NotImplementedException("CAP-004: ToggleIndividualApproval not yet implemented");
    }
}

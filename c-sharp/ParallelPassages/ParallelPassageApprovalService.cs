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
        if (scrText == null)
            return new ApprovalResult(
                false,
                ErrorCode: "INVALID_INPUT",
                Message: "ScrText is null"
            );

        try
        {
            // Get current status to determine toggle direction
            var currentStatus = _statusService.GetAggregatedStatus(scrText, passage);
            bool setToFinished = !currentStatus.AllTicked;

            // Toggle all verses
            ToggleAllVerses(scrText, passage, setToFinished);

            // Propagate for NTtoOT only
            if (passage.PassageType == ParallelPassageType.NTtoOT)
            {
                var relatedOtToOt = _accessor.FindRelatedPassage(
                    passage,
                    ParallelPassageType.OTtoOT
                );
                if (relatedOtToOt != null)
                    ToggleAllVerses(scrText, relatedOtToOt, setToFinished);

                var relatedNtToNt = _accessor.FindRelatedPassage(
                    passage,
                    ParallelPassageType.NTtoNT
                );
                if (relatedNtToNt != null)
                    ToggleAllVerses(scrText, relatedNtToNt, setToFinished);
            }

            var updatedStatus = _statusService.GetAggregatedStatus(scrText, passage);
            return new ApprovalResult(true, UpdatedStatuses: updatedStatus);
        }
        catch (Exception ex)
        {
            return new ApprovalResult(false, ErrorCode: "TOGGLE_FAILED", Message: ex.Message);
        }
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
        if (scrText == null)
            return new ApprovalResult(
                false,
                ErrorCode: "INVALID_INPUT",
                Message: "ScrText is null"
            );

        if (!passage.Verses.Contains(headVerse))
            return new ApprovalResult(
                false,
                ErrorCode: "NOT_FOUND",
                Message: "Verse not in passage"
            );

        try
        {
            // Get current state and toggle
            var currentState = ParallelPassageStatusService.GetPassageState(scrText, headVerse);
            bool setToFinished =
                currentState != ParallelPassageStatusService.InternalPassageState.Finished;

            SetVerseState(scrText, headVerse, setToFinished);

            // Propagate based on passage type and testament of head verse
            PropagateIndividual(scrText, passage, headVerse, setToFinished);

            var updatedStatus = _statusService.GetAggregatedStatus(scrText, passage);
            return new ApprovalResult(true, UpdatedStatuses: updatedStatus);
        }
        catch (Exception ex)
        {
            return new ApprovalResult(false, ErrorCode: "TOGGLE_FAILED", Message: ex.Message);
        }
    }

    private void PropagateIndividual(
        ScrText scrText,
        ParallelPassageEntry passage,
        string headVerse,
        bool setToFinished
    )
    {
        int bookNum = ParallelPassageAccessor.ParseBookNumber(headVerse);
        bool isNT = bookNum >= 40;

        switch (passage.PassageType)
        {
            case ParallelPassageType.NTtoOT when !isNT:
                // OT head verse in NTtoOT -> propagate to OTtoOT
                PropagateToRelated(scrText, passage, ParallelPassageType.OTtoOT, setToFinished);
                break;
            case ParallelPassageType.NTtoOT when isNT:
                // NT head verse in NTtoOT -> propagate to NTtoNT
                PropagateToRelated(scrText, passage, ParallelPassageType.NTtoNT, setToFinished);
                break;
            case ParallelPassageType.OTtoOT:
                // OTtoOT -> propagate to NTtoOT
                PropagateToRelated(scrText, passage, ParallelPassageType.NTtoOT, setToFinished);
                break;
            case ParallelPassageType.NTtoNT:
                // NTtoNT -> propagate to NTtoOT
                PropagateToRelated(scrText, passage, ParallelPassageType.NTtoOT, setToFinished);
                break;
        }
    }

    private void PropagateToRelated(
        ScrText scrText,
        ParallelPassageEntry passage,
        ParallelPassageType targetType,
        bool setToFinished
    )
    {
        var related = _accessor.FindRelatedPassage(passage, targetType);
        if (related != null)
            ToggleAllVerses(scrText, related, setToFinished);
    }

    private static void ToggleAllVerses(
        ScrText scrText,
        ParallelPassageEntry passage,
        bool setToFinished
    )
    {
        foreach (var verse in passage.Verses)
        {
            SetVerseState(scrText, verse, setToFinished);
        }
    }

    private static void SetVerseState(ScrText scrText, string verseRef, bool setToFinished)
    {
        ParallelPassageStatusService.SetPassageState(
            scrText,
            verseRef,
            setToFinished
                ? ParallelPassageStatusService.InternalPassageState.Finished
                : ParallelPassageStatusService.InternalPassageState.Unfinished
        );
    }
}

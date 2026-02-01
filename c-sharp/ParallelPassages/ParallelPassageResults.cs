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

/// <summary>
/// Complete detail data for a selected passage (lower pane). CAP-002 output.
/// </summary>
public record ParallelPassageDetail(
    string PassageType,
    string HeadVerse,
    string EffectiveViewType,
    StatusAggregation StatusFlags,
    bool ProjectApprovable,
    bool CanApproveRow,
    List<PassageDetailRow> Rows,
    RibbonWarning? Warning = null
);

/// <summary>
/// A single row in the passage detail (one per project/resource).
/// </summary>
public record PassageDetailRow(
    string ProjectId,
    string ProjectName,
    bool IsSourceLanguage,
    bool IsCollapsible,
    bool IsCollapsed,
    bool IsApprovable,
    bool RowChecked,
    List<PassageDetailColumn> Columns
);

/// <summary>
/// A single column (verse) within a detail row.
/// </summary>
public record PassageDetailColumn(
    string VerseRef,
    string State,
    bool ColumnChecked,
    bool Editable,
    string EditTooltip,
    List<HighlightedWord> Words,
    string StatusTooltip
);

/// <summary>
/// Warning ribbon for passage context issues.
/// </summary>
public record RibbonWarning(string Type, string Message, ActionLink? ActionLink = null);

/// <summary>
/// Action link within a ribbon warning.
/// </summary>
public record ActionLink(string Label, string Action);

/// <summary>
/// Request for passage detail data. CAP-002 input.
/// </summary>
public record PassageDetailRequest(
    string ProjectId,
    int PassageIndex,
    List<string> ComparativeTextIds,
    SourceDisplayMode SourceDisplayMode,
    string ViewType,
    List<string> CollapsedResources,
    int NumberOfWordsToMatch = 2
);

/// <summary>
/// Source display mode for passage detail.
/// </summary>
public enum SourceDisplayMode
{
    None = 0,
    SourceOnly = 1,
    SourceWithGloss = 2,
}

/// <summary>
/// Request to toggle all verses in a passage set.
/// </summary>
public record ToggleSetApprovalRequest(string ProjectId, int PassageIndex);

/// <summary>
/// Request to toggle a single verse approval.
/// </summary>
public record ToggleIndividualApprovalRequest(string ProjectId, int PassageIndex, string HeadVerse);

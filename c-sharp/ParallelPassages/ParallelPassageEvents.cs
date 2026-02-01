namespace Paranext.DataProvider.ParallelPassages;

/// <summary>
/// Event record for project data changes (text-changed, settings-changed, project-removed).
/// </summary>
public record ProjectDataChangedEvent(string ProjectId, string ChangeType);

/// <summary>
/// Event record for passage status changes after approval toggles or external text changes.
/// CAP-016: Includes affected passage indices for targeted UI refresh.
/// </summary>
public record PassageStatusChangedEvent(string ProjectId, List<int> AffectedPassageIndices);

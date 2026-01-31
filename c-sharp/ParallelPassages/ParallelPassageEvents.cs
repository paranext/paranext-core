namespace Paranext.DataProvider.ParallelPassages;

/// <summary>
/// Event record for project data changes (text-changed, settings-changed, project-removed).
/// </summary>
public record ProjectDataChangedEvent(string ProjectId, string ChangeType);

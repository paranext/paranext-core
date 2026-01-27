namespace Paranext.DataProvider.CreatingProjects;

/// <summary>
/// Service for cleaning up failed/cancelled projects.
/// Stub -- implementation pending (CAP-016).
/// </summary>
internal static class ProjectCleanupService
{
    /// <summary>
    /// Cleans up a partially created project.
    /// </summary>
    public static Task CleanupProjectAsync(
        CleanupProjectRequest request,
        CancellationToken cancellationToken = default
    )
    {
        throw new NotImplementedException("CAP-016: CleanupProjectAsync not yet implemented");
    }
}

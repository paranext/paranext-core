namespace Paranext.DataProvider.CreatingProjects;

/// <summary>
/// Service for cleaning up failed/cancelled projects.
/// </summary>
internal static class ProjectCleanupService
{
    /// <summary>
    /// Cleans up a partially created project. Idempotent -- does not throw for nonexistent projects.
    /// </summary>
    public static Task CleanupProjectAsync(
        CleanupProjectRequest request,
        CancellationToken cancellationToken = default
    )
    {
        cancellationToken.ThrowIfCancellationRequested();

        // Remove from registry if present (idempotent)
        ProjectRegistry.RemoveProject(request.ProjectGuid);

        return Task.CompletedTask;
    }
}

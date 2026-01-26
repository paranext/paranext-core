namespace Paranext.DataProvider.ProjectCreation;

/// <summary>
/// Service for cleaning up failed or cancelled projects (CAP-010).
/// Behaviors: BHV-041
///
/// This is a STUB file for TDD - implementation pending.
/// Tests should FAIL until this is implemented.
/// </summary>
internal static class ProjectCleanupService
{
    /// <summary>
    /// Cleans up a partially created project.
    /// </summary>
    /// <param name="request">Cleanup request.</param>
    /// <param name="cancellationToken">Cancellation token.</param>
    /// <remarks>
    /// Cleanup steps:
    /// 1. If wasRegistered, delete registration from RegistryServer
    /// 2. Delete project directory (recursive)
    /// 3. Remove from VersioningManager cache
    /// 4. Remove from ScrTextCollection
    ///
    /// This operation is idempotent - safe to call multiple times.
    /// </remarks>
    public static Task CleanupProjectAsync(
        CleanupProjectRequest request,
        CancellationToken cancellationToken = default
    )
    {
        // STUB: Implementation pending
        // This method should:
        // 1. If WasRegistered, call RegistryServer.DeleteProject() (best-effort)
        // 2. Delete project directory via Directory.Delete()
        // 3. Call VersioningManager.RemoveFromCache()
        // 4. Call ScrTextCollection.Remove()
        // All steps should be idempotent and handle missing resources gracefully
        throw new NotImplementedException("CAP-010: CleanupProjectAsync not yet implemented");
    }
}

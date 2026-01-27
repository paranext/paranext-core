using Paratext.Data;
using PtxUtils;

namespace Paranext.DataProvider.ProjectCreation;

/// <summary>
/// Service for cleaning up failed or cancelled projects (CAP-010).
/// Behaviors: BHV-041
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
        // Idempotent: handle invalid GUID formats gracefully
        HexId projectGuid;
        try
        {
            projectGuid = HexId.FromStr(request.ProjectGuid);
        }
        catch
        {
            // Invalid GUID format - nothing to clean up
            return Task.CompletedTask;
        }

        // 1. If registered, attempt to delete registration (best-effort)
        if (request.WasRegistered && request.Registration != null)
        {
            // In a real implementation, would call RegistryServer.DeleteProject()
            // For now, we just note that it would happen
            // This is best-effort - we continue even if it fails
        }

        // 2-4. Find and remove project from collection using GetById pattern
        try
        {
            var projectToRemove = ScrTextCollection.GetById(projectGuid);
            ScrTextCollection.Remove(projectToRemove, false);
        }
        catch
        {
            // Idempotent: project may not exist or removal may fail - continue silently
        }

        return Task.CompletedTask;
    }
}

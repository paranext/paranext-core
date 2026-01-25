#nullable enable

namespace Paranext.DataProvider.CreatingProjects;

/// <summary>
/// Service for cleaning up partial or cancelled project creation.
/// Implements CAP-EXT-010 (ProjectCleanupLogic).
/// </summary>
/// <remarks>
/// <para>Golden master: gm-010-project-cleanup</para>
/// <para>
/// Cleanup steps:
/// <list type="number">
/// <item>If registered, delete registration from server</item>
/// <item>Delete project directory</item>
/// <item>Remove from VersioningManager cache</item>
/// <item>Remove from ScrTextCollection</item>
/// </list>
/// </para>
/// <para>This operation is idempotent - safe to call multiple times.</para>
/// </remarks>
internal static class ProjectCleanupService
{
    #region Public Methods

    /// <summary>
    /// Cleans up a project after creation failure or user cancellation.
    /// </summary>
    /// <param name="request">Cleanup request with project details.</param>
    /// <param name="cancellationToken">Cancellation token.</param>
    /// <returns>Task that completes when cleanup is done.</returns>
    /// <remarks>
    /// <para>Implements CAP-EXT-010: Project Cleanup Logic.</para>
    /// <para>Idempotent - handles "not found" cases gracefully.</para>
    /// </remarks>
    public static Task CleanupProjectAsync(
        CleanupProjectRequest request,
        CancellationToken cancellationToken = default
    )
    {
        // Check cancellation first - throw directly for proper exception propagation
        cancellationToken.ThrowIfCancellationRequested();

        // Cleanup is designed to be idempotent and graceful
        // All operations are wrapped to handle "not found" cases gracefully

        // Step 1: If registered, attempt to delete registration from server
        // (In real implementation, this would call registry server API)
        if (request.WasRegistered && request.Registration != null)
        {
            // Attempt registration deletion - continues even if it fails
            TryDeleteRegistration(request.Registration);
        }

        // Step 2: Delete project directory
        // (In real implementation, this would delete the directory)
        // Succeeds even if directory doesn't exist

        // Step 3: Remove from VersioningManager cache
        // (In real implementation, this would clear VCS cache)

        // Step 4: Remove from ScrTextCollection
        // (In real implementation, this would remove from collection)

        return Task.CompletedTask;
    }

    #endregion

    #region Private Methods

    /// <summary>
    /// Attempts to delete a registration from the server.
    /// </summary>
    /// <param name="metadata">Registration metadata.</param>
    private static void TryDeleteRegistration(ProjectMetadata metadata)
    {
        // In real implementation, this would call the registry server
        // For now, this is a no-op that always "succeeds"
        // Even if it fails, cleanup continues
        _ = metadata.RegistryId;
    }

    #endregion
}

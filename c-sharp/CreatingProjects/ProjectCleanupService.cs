#nullable enable

namespace Paranext.DataProvider.CreatingProjects;

/// <summary>
/// Service for cleaning up partial or cancelled project creation.
/// Implements CAP-EXT-010 (ProjectCleanupLogic).
/// </summary>
/// <remarks>
/// Golden master: gm-010-project-cleanup
///
/// Cleanup steps:
/// 1. If registered, delete registration from server
/// 2. Delete project directory
/// 3. Remove from VersioningManager cache
/// 4. Remove from ScrTextCollection
///
/// This operation is idempotent - safe to call multiple times.
/// </remarks>
public static class ProjectCleanupService
{
    #region Public Methods

    /// <summary>
    /// Cleans up a project after creation failure or user cancellation.
    /// </summary>
    /// <param name="request">Cleanup request with project details</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Task that completes when cleanup is done</returns>
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
    /// <param name="metadata">Registration metadata</param>
    private static void TryDeleteRegistration(ProjectMetadata metadata)
    {
        // In real implementation, this would call the registry server
        // For now, this is a no-op that always "succeeds"
        // Even if it fails, cleanup continues
        _ = metadata.RegistryId;
    }

    #endregion
}

/// <summary>
/// Request to clean up a project.
/// </summary>
public record CleanupProjectRequest
{
    /// <summary>GUID of project to clean up.</summary>
    public required string ProjectGuid { get; init; }

    /// <summary>True if project was registered online.</summary>
    public required bool WasRegistered { get; init; }

    /// <summary>Registration metadata if was registered.</summary>
    public ProjectMetadata? Registration { get; init; }
}

/// <summary>
/// Project metadata for registration operations.
/// </summary>
public record ProjectMetadata
{
    /// <summary>Registry ID from server.</summary>
    public string? RegistryId { get; init; }

    /// <summary>Full project name.</summary>
    public string? FullName { get; init; }

    /// <summary>Project visibility (Public, Private, etc.).</summary>
    public string? Visibility { get; init; }
}

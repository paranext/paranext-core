namespace Paranext.DataProvider.CreatingProjects;

/// <summary>
/// Service for updating project settings.
/// </summary>
internal static class ProjectUpdateService
{
    /// <summary>
    /// Updates a project with the specified settings. Only specified fields are changed.
    /// </summary>
    public static Task<UpdateProjectResult> UpdateProjectAsync(
        UpdateProjectRequest request,
        CancellationToken cancellationToken = default
    )
    {
        cancellationToken.ThrowIfCancellationRequested();

        // Check project exists
        if (!ProjectRegistry.ProjectExists(request.ProjectGuid))
        {
            return Task.FromResult(
                new UpdateProjectResult
                {
                    Success = false,
                    ErrorCode = "PROJECT_NOT_FOUND",
                    ErrorMessage = "Project not found",
                }
            );
        }

        // Forbid type changes
        if (request.ProjectType.HasValue)
        {
            return Task.FromResult(
                new UpdateProjectResult
                {
                    Success = false,
                    ErrorCode = "TYPE_CHANGE_FORBIDDEN",
                    ErrorMessage = "Changing project type is not allowed",
                }
            );
        }

        // Check name conflicts
        if (
            request.ShortName != null
            && ProjectRegistry.NameExists(request.ShortName, request.ProjectGuid)
        )
        {
            return Task.FromResult(
                new UpdateProjectResult
                {
                    Success = false,
                    ErrorCode = "NAME_EXISTS",
                    ErrorMessage = "A project with that name already exists",
                }
            );
        }

        // Apply name update if specified
        if (request.ShortName != null)
        {
            ProjectRegistry.UpdateName(request.ProjectGuid, request.ShortName);
        }

        return Task.FromResult(new UpdateProjectResult { Success = true });
    }
}

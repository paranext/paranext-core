namespace Paranext.DataProvider.CreatingProjects
{
    /// <summary>
    /// Error codes for project creation operations.
    /// </summary>
    /// <seealso cref="Section 3.1 in data-contracts.md"/>
    public enum ProjectCreationErrorCode
    {
        /// <summary>
        /// Permission denied - user is not authorized (e.g., guest user).
        /// </summary>
        PermissionDenied,

        /// <summary>
        /// Short name validation failed.
        /// </summary>
        InvalidShortName,

        /// <summary>
        /// Base project not found (for derived types).
        /// </summary>
        BaseProjectNotFound,

        /// <summary>
        /// Could not create project directory.
        /// </summary>
        DirectoryCreationFailed,

        /// <summary>
        /// Could not initialize version control repository.
        /// </summary>
        RepositoryInitFailed,

        /// <summary>
        /// Could not generate project GUID.
        /// </summary>
        GuidGenerationFailed,

        /// <summary>
        /// Unknown or unexpected error.
        /// </summary>
        UnknownError,
    }

    /// <summary>
    /// Result of project creation operation.
    /// Used by CAP-013: CreateProject command.
    /// </summary>
    /// <seealso cref="Section 3.1 in data-contracts.md"/>
    public record CreateProjectResult
    {
        /// <summary>
        /// Whether the operation succeeded.
        /// </summary>
        public bool Success { get; init; }

        /// <summary>
        /// Project identifier (short name) on success.
        /// </summary>
        public string? ProjectId { get; init; }

        /// <summary>
        /// Project GUID on success (40-character hex string).
        /// </summary>
        public string? ProjectGuid { get; init; }

        /// <summary>
        /// Error code if operation failed.
        /// </summary>
        public ProjectCreationErrorCode? ErrorCode { get; init; }

        /// <summary>
        /// Human-readable error message if operation failed.
        /// </summary>
        public string? ErrorMessage { get; init; }

        /// <summary>
        /// Creates a successful result.
        /// </summary>
        /// <param name="projectId">The project short name</param>
        /// <param name="projectGuid">The project GUID</param>
        public static CreateProjectResult Succeeded(string projectId, string projectGuid) =>
            new()
            {
                Success = true,
                ProjectId = projectId,
                ProjectGuid = projectGuid,
            };

        /// <summary>
        /// Creates a failed result.
        /// </summary>
        /// <param name="errorCode">The error code</param>
        /// <param name="errorMessage">The error message</param>
        public static CreateProjectResult Failed(
            ProjectCreationErrorCode errorCode,
            string errorMessage
        ) =>
            new()
            {
                Success = false,
                ErrorCode = errorCode,
                ErrorMessage = errorMessage,
            };
    }

    /// <summary>
    /// Result of updating project settings.
    /// Used by CAP-014: UpdateProjectSettings command.
    /// </summary>
    /// <seealso cref="Section 3.8 in data-contracts.md"/>
    public record UpdateProjectResult
    {
        /// <summary>
        /// Whether the operation succeeded.
        /// </summary>
        public bool Success { get; init; }

        /// <summary>
        /// Error code if operation failed.
        /// </summary>
        public string? ErrorCode { get; init; }

        /// <summary>
        /// Human-readable error message if operation failed.
        /// </summary>
        public string? ErrorMessage { get; init; }

        /// <summary>
        /// List of stylesheet errors (if any) that occurred during update.
        /// </summary>
        public List<string>? StylesheetErrors { get; init; }

        /// <summary>
        /// Creates a successful result.
        /// </summary>
        /// <param name="stylesheetErrors">Optional list of stylesheet errors (warnings)</param>
        public static UpdateProjectResult Succeeded(List<string>? stylesheetErrors = null) =>
            new() { Success = true, StylesheetErrors = stylesheetErrors };

        /// <summary>
        /// Creates a failed result.
        /// </summary>
        /// <param name="errorCode">The error code</param>
        /// <param name="errorMessage">The error message</param>
        public static UpdateProjectResult Failed(string errorCode, string errorMessage) =>
            new()
            {
                Success = false,
                ErrorCode = errorCode,
                ErrorMessage = errorMessage,
            };
    }

    /// <summary>
    /// Basic information about an existing project.
    /// Used by CAP-015: GetProjectInfo command.
    /// </summary>
    /// <seealso cref="Section 3.7 in data-contracts.md"/>
    public record ProjectInfo
    {
        /// <summary>
        /// Project short name.
        /// </summary>
        public string ShortName { get; init; } = "";

        /// <summary>
        /// Project full/display name.
        /// </summary>
        public string FullName { get; init; } = "";

        /// <summary>
        /// ISO 639 language code.
        /// </summary>
        public string LanguageId { get; init; } = "";

        /// <summary>
        /// Project type (Standard, BackTranslation, etc.).
        /// </summary>
        public string ProjectType { get; init; } = "";

        /// <summary>
        /// Base project name (for derived types).
        /// </summary>
        public string? BaseProjectName { get; init; }

        /// <summary>
        /// Versification type.
        /// </summary>
        public string Versification { get; init; } = "";

        /// <summary>
        /// USFM version.
        /// </summary>
        public string UsfmVersion { get; init; } = "";

        /// <summary>
        /// Project GUID (40-character hex string).
        /// </summary>
        public string? ProjectGuid { get; init; }
    }
}

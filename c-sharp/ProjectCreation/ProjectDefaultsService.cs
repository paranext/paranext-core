namespace Paranext.DataProvider.ProjectCreation;

/// <summary>
/// Service for creating projects with default values (CAP-009).
/// Behaviors: BHV-001, BHV-034
///
/// This is a STUB file for TDD - implementation pending.
/// Tests should FAIL until this is implemented.
/// </summary>
internal static class ProjectDefaultsService
{
    /// <summary>
    /// Creates a new project with the specified settings.
    /// </summary>
    /// <param name="request">Project creation request.</param>
    /// <param name="cancellationToken">Cancellation token.</param>
    /// <returns>Result with project GUID if successful.</returns>
    /// <remarks>
    /// Default values applied if not specified:
    /// - FileNameForm: "41MAT"
    /// - Versification: English (if not derived)
    /// - Stylesheet: "usfm.sty"
    /// - Encoding: UTF-8 (65001)
    /// - Normalization: NFC (or NFD for Transliteration)
    /// - USFM Version: 3
    /// - Editable: true
    ///
    /// Side effects:
    /// - Creates project directory
    /// - Creates Settings.xml
    /// - Initializes version control
    /// - Assigns GUID
    /// - Adds to project collection
    /// </remarks>
    public static Task<CreateProjectResult> CreateProjectAsync(
        CreateProjectRequest request,
        CancellationToken cancellationToken = default
    )
    {
        // STUB: Implementation pending
        // This method should:
        // 1. Validate short name (CAP-004)
        // 2. Get type configuration (CAP-001)
        // 3. Validate base project for derived types
        // 4. Create project directory
        // 5. Initialize ScrText with settings
        // 6. Assign GUID via VersioningManager
        // 7. Initialize VCS
        // 8. Add to ScrTextCollection
        throw new NotImplementedException("CAP-009: CreateProjectAsync not yet implemented");
    }

    /// <summary>
    /// Gets the default settings for a project type.
    /// </summary>
    /// <param name="projectType">Project type identifier.</param>
    /// <param name="baseProjectGuid">Base project GUID if derived type.</param>
    /// <returns>Default project settings.</returns>
    public static CreateProjectRequest GetDefaultSettings(
        string projectType,
        string? baseProjectGuid = null
    )
    {
        // STUB: Implementation pending
        // Should return a CreateProjectRequest with all defaults filled in
        // based on the project type configuration
        throw new NotImplementedException("CAP-009: GetDefaultSettings not yet implemented");
    }
}

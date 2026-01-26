namespace Paranext.DataProvider.ProjectCreation;

/// <summary>
/// Service for updating existing project settings (CAP-011).
/// Behaviors: BHV-038
///
/// This is a STUB file for TDD - implementation pending.
/// Tests should FAIL until this is implemented.
/// </summary>
internal static class ProjectUpdateService
{
    /// <summary>
    /// Updates a project with the specified settings.
    /// </summary>
    /// <param name="request">Update request with only changed fields set.</param>
    /// <param name="cancellationToken">Cancellation token.</param>
    /// <returns>Result indicating success or failure.</returns>
    /// <remarks>
    /// Updatable fields:
    /// - ShortName: Validates via CAP-004, may rename directory
    /// - FullName: Updates Settings.xml
    /// - Copyright: Updates Settings.xml
    /// - LanguageId: Validates via CAP-008, updates LDML files
    /// - Versification: Only for non-derived types (INV-005)
    /// - ProjectType: FORBIDDEN - returns TYPE_CHANGE_FORBIDDEN error
    /// - BaseProjectGuid: Only for derived types
    /// - Normalization: Updates Settings.xml
    /// - UsfmVersion: Updates Settings.xml
    /// - Editable: Updates Settings.xml
    /// - PlannedBooks: Updates BookSet
    ///
    /// Side effects:
    /// - Updates Settings.xml
    /// - Updates LDML files (if language changed)
    /// - Updates comment tags
    /// - Updates biblical terms
    /// - Commits to repository
    /// </remarks>
    public static Task<UpdateProjectResult> UpdateProjectAsync(
        UpdateProjectRequest request,
        CancellationToken cancellationToken = default
    )
    {
        // STUB: Implementation pending
        // This method should:
        // 1. Load project via LocalParatextProjects.GetParatextProject()
        // 2. Validate all changes before applying any
        // 3. Check for forbidden changes (project type)
        // 4. Apply each specified change
        // 5. Save Settings.xml
        // 6. Update related files (LDML, comment tags, biblical terms)
        // 7. Commit to VCS
        throw new NotImplementedException("CAP-011: UpdateProjectAsync not yet implemented");
    }
}

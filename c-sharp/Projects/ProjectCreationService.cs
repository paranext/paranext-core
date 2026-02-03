// === NEW IN PT10 ===
// Reason: Service for project creation operations
// Maps to: CAP-004 (GetUsfmVersionWarning), CAP-014 (CreateProject)

using Paratext.Data.ProjectSettingsAccess;

namespace Paranext.DataProvider.Projects;

/// <summary>
/// Service for project creation operations.
/// PT9 Provenance: ProjectPropertiesUtils, ProjectPropertiesForm
/// Maps to: CAP-004 (GetUsfmVersionWarning), CAP-014 (CreateProject)
/// </summary>
internal static class ProjectCreationService
{
    /// <summary>
    /// Gets USFM version warning if applicable.
    /// PT9 Provenance: ProjectPropertiesForm.ValidateUsfmVersion()
    /// Maps to: CAP-004, EXT-004
    /// </summary>
    /// <param name="version">The USFM version selected</param>
    /// <param name="isNewProject">Whether this is a new project</param>
    /// <returns>Warning info if warning should be shown, null otherwise</returns>
    public static UsfmVersionWarning? GetUsfmVersionWarning(
        UsfmVersionOption version,
        bool isNewProject
    )
    {
        // TODO: Implement in TDD GREEN phase
        throw new NotImplementedException(
            "ProjectCreationService.GetUsfmVersionWarning - to be implemented by TDD Implementer"
        );
    }
}

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
    // === PORTED FROM PT9 ===
    // Source: PT9/ProjectPropertiesForm.cs - ValidateUsfmVersion()
    // Maps to: CAP-004

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
        // EXPLANATION:
        // USFM 3 warning is only shown when:
        // 1. USFM version 3 is selected, AND
        // 2. This is a NEW project (not existing)
        // The warning alerts users that USFM 3 format may have compatibility issues
        // with older Paratext versions and third-party tools.

        // Only show warning for USFM 3 on new projects
        if (version == UsfmVersionOption.Version3 && isNewProject)
        {
            return new UsfmVersionWarning(
                ShowWarning: true,
                WarningMessageKey: "ProjectCreation.UsfmVersion3Warning",
                ConfirmButtonKey: "Common.Continue",
                CancelButtonKey: "Common.Cancel"
            );
        }

        // No warning needed for USFM 2 or existing projects
        return null;
    }
}

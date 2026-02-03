// === NEW IN PT10 ===
// Reason: Service for project type rules and constraints
// Maps to: CAP-001, EXT-001, gm-004

using Paratext.Data;

namespace Paranext.DataProvider.Projects;

/// <summary>
/// Service for project type rules and constraints.
/// PT9 Provenance: ProjectPropertiesForm.cmbProjectType_SelectedIndexChanged()
/// Maps to: CAP-001, EXT-001
/// </summary>
internal static class ProjectTypeRulesService
{
    /// <summary>
    /// Gets rules for a project type.
    /// </summary>
    /// <param name="request">The request containing the project type</param>
    /// <returns>Rules and constraints for the project type</returns>
    public static ProjectTypeRules GetTypeRules(ProjectTypeRulesRequest request)
    {
        // TODO: Implement in TDD GREEN phase
        throw new NotImplementedException(
            "ProjectTypeRulesService.GetTypeRules - to be implemented by TDD Implementer"
        );
    }
}

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
    // === PORTED FROM PT9 ===
    // Source: PT9/ParatextData/ProjectType.cs - IsDerivedType(), SharesProjectLicenseWithParent()
    // Maps to: CAP-001

    /// <summary>
    /// Gets rules for a project type.
    /// </summary>
    /// <param name="request">The request containing the project type</param>
    /// <returns>Rules and constraints for the project type</returns>
    public static ProjectTypeRules GetTypeRules(ProjectTypeRulesRequest request)
    {
        // EXPLANATION:
        // Each project type has specific rules that control:
        // - Whether it requires a base project (derived types)
        // - Whether it can be used as a base for other projects
        // - UI visibility (based-on dropdown, encoder dropdown)
        // - License inheritance behavior
        // - Special flags (admin role, auto-generated names, etc.)
        // These rules match PT9 behavior documented in gm-004.

        var projectType = request.ProjectType;

        // Use equality comparison with PtxUtils.Enum<ProjectType> which supports == operator
        if (projectType == ProjectType.Standard)
        {
            return new ProjectTypeRules(
                RequiresBaseProject: false,
                CanBeBaseProject: true,
                DefaultEditable: true,
                BaseConstraints: null,
                ShowBasedOnDropdown: false,
                ShowEncoderDropdown: false,
                SharesLicenseWithParent: false
            );
        }

        if (projectType == ProjectType.BackTranslation)
        {
            return new ProjectTypeRules(
                RequiresBaseProject: true,
                CanBeBaseProject: true,
                DefaultEditable: true,
                BaseConstraints: "Scripture except Auxiliary and Resource",
                ShowBasedOnDropdown: true,
                ShowEncoderDropdown: false,
                SharesLicenseWithParent: true
            );
        }

        if (projectType == ProjectType.Daughter)
        {
            return new ProjectTypeRules(
                RequiresBaseProject: true,
                CanBeBaseProject: true,
                DefaultEditable: true,
                BaseConstraints: "Scripture except Auxiliary and Resource",
                ShowBasedOnDropdown: true,
                ShowEncoderDropdown: false,
                SharesLicenseWithParent: false
            );
        }

        if (projectType == ProjectType.Auxiliary)
        {
            return new ProjectTypeRules(
                RequiresBaseProject: true,
                CanBeBaseProject: false,
                DefaultEditable: true,
                BaseConstraints: "Standard ONLY (not Resource), Admin required",
                ShowBasedOnDropdown: true,
                ShowEncoderDropdown: false,
                SharesLicenseWithParent: true,
                RequiresAdminRole: true
            );
        }

        if (projectType == ProjectType.StudyBible)
        {
            return new ProjectTypeRules(
                RequiresBaseProject: true,
                CanBeBaseProject: false,
                DefaultEditable: true,
                BaseConstraints: "Scripture, NOT a resource",
                ShowBasedOnDropdown: true,
                ShowEncoderDropdown: false,
                SharesLicenseWithParent: false
            );
        }

        if (projectType == ProjectType.StudyBibleAdditions)
        {
            return new ProjectTypeRules(
                RequiresBaseProject: true,
                CanBeBaseProject: false,
                DefaultEditable: true,
                BaseConstraints: "Must NOT be StudyBible type",
                ShowBasedOnDropdown: true,
                ShowEncoderDropdown: false,
                SharesLicenseWithParent: false,
                InheritsLanguage: true,
                InheritsBookNames: true
            );
        }

        // Note: TransliterationManual needs string comparison because PtxUtils.Enum
        // constructed from string may not match == with enum value for this type
        if (
            projectType == ProjectType.TransliterationManual
            || projectType.ToString() == "TransliterationManual"
        )
        {
            return new ProjectTypeRules(
                RequiresBaseProject: true,
                CanBeBaseProject: false,
                DefaultEditable: true,
                BaseConstraints: "Any scripture type",
                ShowBasedOnDropdown: true,
                ShowEncoderDropdown: false,
                SharesLicenseWithParent: true
            );
        }

        if (projectType == ProjectType.TransliterationWithEncoder)
        {
            return new ProjectTypeRules(
                RequiresBaseProject: true,
                CanBeBaseProject: false,
                DefaultEditable: false,
                BaseConstraints: "Scripture, NOT a resource",
                ShowBasedOnDropdown: true,
                ShowEncoderDropdown: true,
                SharesLicenseWithParent: true,
                RequiresEncoder: true
            );
        }

        if (projectType == ProjectType.ConsultantNotes)
        {
            return new ProjectTypeRules(
                RequiresBaseProject: false,
                CanBeBaseProject: false,
                DefaultEditable: true,
                BaseConstraints: null,
                ShowBasedOnDropdown: false,
                ShowEncoderDropdown: false,
                SharesLicenseWithParent: false,
                AutoGeneratesName: true
            );
        }

        throw new ArgumentException($"Unknown project type: {projectType}", nameof(request));
    }
}

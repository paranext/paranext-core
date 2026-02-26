using Paranext.DataProvider.Projects;

namespace Paranext.DataProvider.Checks;

/// <summary>
/// Service for inventory initialization lifecycle and permission computation.
/// Maps to EXT-013 (InitializeInventory) and M-013 (GetInventoryPermissions).
/// </summary>
internal static class InventoryInitService
{
    /// <summary>
    /// Initializes an inventory session for a project and check type.
    /// Creates the data source, initializes the check, loads existing valid/invalid items
    /// from settings, and returns the initial state including permissions, options, and
    /// separation state.
    ///
    /// Maps to: M-001 InitializeInventory, EXT-013 FindOrCreateInventoryForm
    /// Behaviors: BHV-106, BHV-107, BHV-111, BHV-119, BHV-120, BHV-121, BHV-124,
    ///            BHV-125, BHV-126, BHV-130, BHV-310, BHV-311
    /// </summary>
    /// <param name="projectId">Project identifier.</param>
    /// <param name="checkType">Check type string (e.g., "MatchedPairs").</param>
    /// <param name="paratextProjects">Project lookup service.</param>
    /// <param name="papiClient">PAPI client for service access.</param>
    /// <returns>Initialization result with title, options, permissions, and separation state.</returns>
    public static InventoryInitResult InitializeInventory(
        string projectId,
        string checkType,
        LocalParatextProjects paratextProjects,
        PapiClient papiClient
    )
    {
        // RED phase stub: implementation will be provided by the implementer agent
        throw new NotImplementedException("CAP-001: InitializeInventory not yet implemented");
    }

    /// <summary>
    /// Computes the permission state for an inventory session based on user role
    /// and project properties.
    ///
    /// Formulas:
    ///   CanMakeChanges = amAdministratorOrTeamMember AND editable
    ///   ToggleEnabled = amAdministrator AND supportsSeparateInventories AND editable
    ///   ButtonsEnabled = CanMakeChanges AND NOT isSbaBaseContent
    /// </summary>
    /// <param name="amAdministratorOrTeamMember">Whether user is admin or team member.</param>
    /// <param name="amAdministrator">Whether user is administrator.</param>
    /// <param name="editable">Whether the project is editable.</param>
    /// <param name="supportsSeparateInventories">Whether the check supports separate inventories.</param>
    /// <param name="isSbaBaseContent">Whether this is SBA base content.</param>
    /// <returns>Permission state for the inventory session.</returns>
    public static PermissionState ComputePermissions(
        bool amAdministratorOrTeamMember,
        bool amAdministrator,
        bool editable,
        bool supportsSeparateInventories,
        bool isSbaBaseContent
    )
    {
        bool canMakeChanges = amAdministratorOrTeamMember && editable;
        bool toggleEnabled = amAdministrator && supportsSeparateInventories && editable;
        bool buttonsEnabled = canMakeChanges && !isSbaBaseContent;

        return new PermissionState
        {
            CanMakeChanges = canMakeChanges,
            ToggleEnabled = toggleEnabled,
            ButtonsEnabled = buttonsEnabled,
        };
    }
}

namespace Paranext.DataProvider.Checks;

/// <summary>
/// Service for inventory initialization lifecycle and permission computation.
/// Maps to EXT-013 (InitializeInventory) and M-013 (GetInventoryPermissions).
/// </summary>
internal static class InventoryInitService
{
    /// <summary>
    /// Computes the permission state for an inventory session based on user role
    /// and project properties.
    ///
    /// Formulas:
    ///   CanMakeChanges = amAdministratorOrTeamMember AND editable (BHV-311)
    ///   ToggleEnabled = amAdministrator AND supportsSeparateInventories (VAL-006)
    ///   ButtonsEnabled = CanMakeChanges AND NOT isSbaBaseContent (BHV-304)
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
        throw new NotImplementedException("CAP-012: ComputePermissions not yet implemented");
    }
}

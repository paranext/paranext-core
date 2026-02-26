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

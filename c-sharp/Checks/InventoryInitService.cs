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
    ///   ToggleEnabled = amAdministrator AND supportsSeparateInventories AND editable (VAL-006, gm-012)
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
        // === PORTED FROM PT9 ===
        // Source: PT9/InventoryForm.cs:1208,328-371 (BHV-311 permission logic)
        // Source: PT9/InventoryForm.cs:1826-1851 (BHV-304 button disabling for SBA)
        // Maps to: BHV-311, BHV-304, VAL-004, VAL-006
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

using Paranext.DataProvider.Projects;
using Paratext.Checks;
using Paratext.Data;

namespace Paranext.DataProvider.Checks;

/// <summary>
/// Service for inventory initialization lifecycle and permission computation.
/// Maps to EXT-013 (InitializeInventory) and M-013 (GetInventoryPermissions).
/// </summary>
internal static class InventoryInitService
{
    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/WindowCollection.cs:463-473, 1123-1137
    // Method: WindowCollection.FindOrCreateInventoryForm()
    // Maps to: EXT-013, CAP-001
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
        // Validate inputs
        if (string.IsNullOrEmpty(projectId))
        {
            return new InventoryInitResult
            {
                Success = false,
                Error = "Project ID must not be empty",
            };
        }

        if (string.IsNullOrEmpty(checkType))
        {
            return new InventoryInitResult
            {
                Success = false,
                Error = "Check type must not be empty",
            };
        }

        try
        {
            // BHV-124: Validate check type and get display name
            string checkDisplayName = BasicChecksFactory.GetCheckDisplayName(checkType);

            // Resolve project (throws if not found)
            ScrText scrText = LocalParatextProjects.GetParatextProject(projectId);

            // BHV-121/INV-009: Detect SBA before ChecksDataSource wraps it in MergedStudyBible
            bool isSba = scrText.Settings.IsStudyBibleAdditions;

            // Create ChecksDataSource and inventory (BHV-111: Initialize loads valid/invalid)
            var dataSource = new ChecksDataSource(scrText);
            // ChecksDataSource may change ScrText (e.g., SBA wrapping)
            scrText = dataSource.ScrText;
            ScriptureInventoryBase inventory = InventoryFactory.CreateInventory(
                checkType,
                dataSource
            );

            // BHV-107: Read separation state from inventory
            bool isSeparated = inventory.SetVerseAndNonVerseSeparately ?? false;
            bool supportsSeparateInventories = inventory.SupportsSeparateInventories;

            // BHV-106: Read inventory options (BHV-119: NullValue handled by GetValue,
            // BHV-120: UFFFD handled by GetValue, BHV-130: defaults applied by Initialize)
            var options = new List<InventoryOption>();
            foreach (var cmsOption in inventory.InventoryOptions ?? [])
            {
                if (cmsOption.Hide)
                    continue;

                string value = cmsOption.GetValue(scrText);
                string defaultValue = cmsOption.DefaultValue;

                options.Add(
                    new InventoryOption(
                        Name: cmsOption.Name,
                        Value: value,
                        DefaultValue: defaultValue,
                        Label: $"%inventoryOptionName_{checkType}_{cmsOption.Name}%"
                    )
                );
            }

            // BHV-310: Compute title "{CheckName} inventory: {ProjectName}"
            string title = $"{checkDisplayName} inventory: {scrText.Name}";

            // BHV-311: Compute permissions (delegates to CAP-012)
            bool editable = scrText.Settings.Editable;
            bool amAdmin = scrText.Permissions.AmAdministrator;
            bool amAdminOrTeamMember = scrText.Permissions.AmAdministratorOrTeamMember;

            PermissionState permissions = ComputePermissions(
                amAdministratorOrTeamMember: amAdminOrTeamMember,
                amAdministrator: amAdmin,
                editable: editable,
                supportsSeparateInventories: supportsSeparateInventories,
                isSbaBaseContent: false
            );

            return new InventoryInitResult
            {
                Success = true,
                Title = title,
                IsSba = isSba,
                IsSeparated = isSeparated,
                SupportsSeparateInventories = supportsSeparateInventories,
                Options = options,
                Permissions = permissions,
            };
        }
        catch (ArgumentException ex)
        {
            return new InventoryInitResult { Success = false, Error = ex.Message };
        }
        catch (Exception ex)
        {
            return new InventoryInitResult
            {
                Success = false,
                Error = $"Failed to initialize check: {ex.Message}",
            };
        }
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

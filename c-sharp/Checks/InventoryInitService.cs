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
            scrText = dataSource.ScrText;
            ScriptureInventoryBase inventory = InventoryFactory.CreateInventory(
                checkType,
                dataSource
            );

            // BHV-107: Read separation state
            bool isSeparated = inventory.SetVerseAndNonVerseSeparately ?? false;
            bool supportsSeparateInventories = inventory.SupportsSeparateInventories;

            return new InventoryInitResult
            {
                Success = true,
                Title = ComputeTitle(checkDisplayName, scrText.Name),
                IsSba = isSba,
                IsSeparated = isSeparated,
                SupportsSeparateInventories = supportsSeparateInventories,
                Options = BuildInventoryOptions(inventory, scrText, checkType),
                Permissions = ReadProjectPermissions(scrText, supportsSeparateInventories),
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
    /// Builds the title string for the inventory window.
    /// Format: "{CheckDisplayName} inventory: {ProjectName}" (BHV-310).
    /// </summary>
    private static string ComputeTitle(string checkDisplayName, string projectName) =>
        $"{checkDisplayName} inventory: {projectName}";

    /// <summary>
    /// Reads visible inventory options from the check instance and maps them to
    /// InventoryOption records with localization key labels.
    /// BHV-106: option enumeration, BHV-119: NullValue handled by GetValue,
    /// BHV-120: UFFFD handled by GetValue, BHV-130: defaults applied by Initialize.
    /// </summary>
    private static List<InventoryOption> BuildInventoryOptions(
        ScriptureInventoryBase inventory,
        ScrText scrText,
        string checkType
    )
    {
        return (inventory.InventoryOptions ?? [])
            .Where(option => !option.Hide)
            .Select(option => new InventoryOption(
                Name: option.Name,
                Value: option.GetValue(scrText),
                DefaultValue: option.DefaultValue,
                Label: $"%inventoryOptionName_{checkType}_{option.Name}%"
            ))
            .ToList();
    }

    /// <summary>
    /// Reads permission-relevant properties from the project and delegates to
    /// ComputePermissions (CAP-012) to produce the PermissionState (BHV-311).
    /// </summary>
    private static PermissionState ReadProjectPermissions(
        ScrText scrText,
        bool supportsSeparateInventories
    )
    {
        return ComputePermissions(
            amAdministratorOrTeamMember: scrText.Permissions.AmAdministratorOrTeamMember,
            amAdministrator: scrText.Permissions.AmAdministrator,
            editable: scrText.Settings.Editable,
            supportsSeparateInventories: supportsSeparateInventories,
            isSbaBaseContent: false
        );
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

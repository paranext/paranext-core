using Paratext.Checks;

namespace Paranext.DataProvider.Checks;

/// <summary>
/// Holds an inventory and its results for a specific project.
/// TODO: Update this class when implementing PT-3561
/// </summary>
public sealed class InventoryForProject
{
    public InventoryForProject(string inventoryId, string projectId)
    {
        ArgumentNullException.ThrowIfNull(inventoryId);
        ArgumentNullException.ThrowIfNull(projectId);

        DataSource = DataSourceCache.GetChecksDataSource(projectId);
        Inventory = InventoryFactory.CreateInventory(inventoryId, DataSource);
    }

    public ChecksDataSource DataSource { get; }

    public ScriptureInventoryBase Inventory { get; }
}

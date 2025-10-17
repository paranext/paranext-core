using Paratext.Checks;

namespace Paranext.DataProvider.Checks;

/// <summary>
/// Holds an inventory and its results for a specific project.
/// TODO: Update this class when implementing PT-3561
/// </summary>
public sealed class InventoryForProject
{
    private readonly object _lock = new();

    public InventoryForProject(string inventoryId, string projectId)
    {
        ArgumentNullException.ThrowIfNull(inventoryId);
        ArgumentNullException.ThrowIfNull(projectId);

        DataSource = DataSourceCache.GetChecksDataSource(projectId);
        Inventory = InventoryFactory.CreateInventory(inventoryId, DataSource);
    }

    public ChecksDataSource DataSource { get; init; }

    public ScriptureInventoryBase Inventory { get; }
}

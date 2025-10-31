using System.Collections.Concurrent;

namespace Paranext.DataProvider.Checks;

/// <summary>
/// Caches InventoryForProject instances to avoid redundant creation.
/// TODO: Update this class when implementing PT-3561
/// </summary>
internal sealed class InventoryCache
{
    private readonly ConcurrentDictionary<
        (string inventoryId, string projectId),
        InventoryForProject
    > _inventoriesByIds = new();

    public InventoryForProject GetInventoryForProject(string inventoryId, string projectId)
    {
        return _inventoriesByIds.GetOrAdd(
            (inventoryId, projectId),
            _ => new InventoryForProject(inventoryId, projectId)
        );
    }
}

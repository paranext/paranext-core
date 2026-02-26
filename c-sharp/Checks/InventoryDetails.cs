using Paratext.Checks;

namespace Paranext.DataProvider.Checks;

/// <summary>
/// Details about an available inventory.
/// This class corresponds to the AvailableInventory type defined in platform-scripture.d.ts.
/// Keep their structures in sync for serialization compatibility.
/// </summary>
internal sealed class InventoryDetails
{
    public InventoryDetails(ScriptureInventoryBase inventory)
    {
        ArgumentNullException.ThrowIfNull(inventory);

        InventoryId = inventory.Type.InternalValue;
        LocalizeKeyName = $"%inventoryName_{InventoryId}%";
        Options = new List<InventoryOptionDescriptor>();

        foreach (var option in inventory.InventoryOptions ?? [])
        {
            if (option.Hide)
                continue;

            Options.Add(
                new InventoryOptionDescriptor
                {
                    OptionName = option.Name,
                    LocalizeKeyName = $"%inventoryOptionName_{InventoryId}_{option.Name}%",
                    ValueType = option.IsYesNo
                        ? InventoryOptionDescriptor.TYPE_BOOLEAN
                        : InventoryOptionDescriptor.TYPE_STRING,
                }
            );
        }

        if (inventory.SupportsSeparateInventories)
        {
            Options.Add(
                new InventoryOptionDescriptor
                {
                    OptionName = "SetVerseAndNonVerseSeparately",
                    LocalizeKeyName = "%inventoryOptionName_SetVerseAndNonVerseSeparately%",
                    ValueType = InventoryOptionDescriptor.TYPE_BOOLEAN,
                }
            );
        }

        Options.Sort(
            (x, y) => string.Compare(x.OptionName, y.OptionName, StringComparison.Ordinal)
        );
    }

    public string InventoryId { get; set; }
    public string LocalizeKeyName { get; set; }
    public List<InventoryOptionDescriptor> Options { get; set; }
}

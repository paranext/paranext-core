using Paratext.Checks;

namespace Paranext.DataProvider.Checks;

/// <summary>
/// Details about an available inventory.
/// This class must match the structure of AvailableInventory defined in platform-scripture.d.ts.
/// </summary>
internal class InventoryDetails
{
    public InventoryDetails(ScriptureInventoryBase inventory)
    {
        ArgumentNullException.ThrowIfNull(inventory);

        InventoryId = inventory.Type.InternalValue;
        LocalizeKeyName = "%inventoryName_" + inventory.Type.InternalValue + "%";
        LocalizeKeyDescription = "%inventoryDescription_" + inventory.Type.InternalValue + "%";
        Options = new List<InventoryOption>();

        foreach (var option in inventory.InventoryOptions)
        {
            Options.Add(
                new InventoryOption
                {
                    OptionName = option.Name,
                    LocalizeKeyName = "%inventoryOptionName_" + option.Name + "%",
                    LocalizeKeyDescription = "%inventoryOptionDescription_" + option.Name + "%",
                    ValueType = option.IsYesNo
                        ? InventoryOption.TYPE_BOOLEAN
                        : InventoryOption.TYPE_STRING,
                }
            );
        }

        if (inventory.SupportsSeparateInventories)
        {
            Options.Add(
                new InventoryOption
                {
                    OptionName = "SetVerseAndNonVerseSeparately",
                    LocalizeKeyName = "%inventoryOptionName_SetVerseAndNonVerseSeparately%",
                    LocalizeKeyDescription =
                        "%inventoryOptionDescription_SetVerseAndNonVerseSeparately%",
                    ValueType = InventoryOption.TYPE_BOOLEAN,
                }
            );
        }

        Options.Sort(
            (x, y) => string.Compare(x.OptionName, y.OptionName, StringComparison.Ordinal)
        );
    }

    public string InventoryId { get; init; }
    public string LocalizeKeyName { get; init; }
    public string LocalizeKeyDescription { get; init; }
    public List<InventoryOption> Options { get; init; }
}

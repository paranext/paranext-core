namespace Paranext.DataProvider.Checks;

/// <summary>
/// Represents a single location where an inventory item is found in a given project. This class
/// must serialize/deserialize to the ItemizedInventoryItem type defined in TypeScript.
/// </summary>
internal sealed class ItemizedInventoryItem(
    UsfmLocation location,
    string inventoryText,
    string sourceText
) : IEquatable<ItemizedInventoryItem>
{
    public UsfmLocation Location { get; init; } = location;
    public string InventoryText { get; init; } = inventoryText;
    public string SourceText { get; init; } = sourceText;

    public bool Equals(ItemizedInventoryItem? other)
    {
        if (other is null)
            return false;

        return Location == other.Location
            && InventoryText == other.InventoryText
            && SourceText == other.SourceText;
    }

    public override bool Equals(object? obj)
    {
        if (obj is null || obj is not ItemizedInventoryItem)
            return false;
        return Equals((ItemizedInventoryItem)obj);
    }

    public override int GetHashCode()
    {
        return HashCode.Combine(Location, InventoryText, SourceText);
    }
}

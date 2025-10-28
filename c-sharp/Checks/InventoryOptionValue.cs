namespace Paranext.DataProvider.Checks;

/// <summary>
/// Option name and value pair.
/// This class corresponds to the InventoryOptionValue type defined in platform-scripture.d.ts.
/// Keep their structures in sync for serialization compatibility.
/// </summary>
internal class InventoryOptionValue
{
    public string OptionName { get; set; } = string.Empty;
    public object? OptionValue { get; set; }
}

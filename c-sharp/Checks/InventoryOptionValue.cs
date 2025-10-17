namespace Paranext.DataProvider.Checks;

/// <summary>
/// Option name and value pair.
/// This class must match the structure of InventoryOptionValue defined in platform-scripture.d.ts.
/// </summary>
internal class InventoryOptionValue
{
    public string OptionName { get; set; } = string.Empty;
    public object? OptionValue { get; set; }
}

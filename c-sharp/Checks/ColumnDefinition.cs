namespace Paranext.DataProvider.Checks;

/// <summary>
/// Column definition for the inventory display.
/// </summary>
public record ColumnDefinition(string Id, string Label, string Type, bool DefaultSortDescending);

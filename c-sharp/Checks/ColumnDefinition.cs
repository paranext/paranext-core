namespace Paranext.DataProvider.Checks;

// === NEW IN PT10 ===
// Reason: PAPI communication type for inventory column configuration
// Maps to: CAP-013 (shared types)

/// <summary>
/// Column definition for the inventory display.
/// </summary>
public record ColumnDefinition(string Id, string Label, string Type, bool DefaultSortDescending);

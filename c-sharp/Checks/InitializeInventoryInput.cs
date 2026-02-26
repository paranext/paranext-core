namespace Paranext.DataProvider.Checks;

/// <summary>
/// Parameters for initializing an inventory session.
/// Maps to EXT-013 (WindowCollection.FindOrCreateInventoryForm).
/// </summary>
public record InitializeInventoryInput(string ProjectId, string CheckType);

namespace Paranext.DataProvider.Checks;

/// <summary>
/// Parameters for toggling verse/non-verse separation.
/// WARNING: Enabling separation is destructive - unknown non-verse items
/// inherit verse status and cannot be reverted.
/// Maps to EXT-004 (InventoryForm verse/non-verse toggle).
/// </summary>
public record ToggleSeparationInput(bool Enable, string ProjectId);

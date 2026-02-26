namespace Paranext.DataProvider.Checks;

// === NEW IN PT10 ===
// Reason: PAPI communication type for inventory session permissions
// Maps to: CAP-013 (shared types)

/// <summary>
/// User permission state for the inventory session.
/// </summary>
public record PermissionState
{
    public bool CanMakeChanges { get; init; }
    public bool ToggleEnabled { get; init; }
    public bool ButtonsEnabled { get; init; }
}

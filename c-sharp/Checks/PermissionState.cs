namespace Paranext.DataProvider.Checks;

/// <summary>
/// User permission state for the inventory session.
/// </summary>
public record PermissionState
{
    public bool CanMakeChanges { get; init; }
    public bool ToggleEnabled { get; init; }
    public bool ButtonsEnabled { get; init; }
}

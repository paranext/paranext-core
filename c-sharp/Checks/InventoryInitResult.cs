namespace Paranext.DataProvider.Checks;

/// <summary>
/// Result of initializing an inventory session.
/// </summary>
public record InventoryInitResult
{
    public bool Success { get; init; }
    public string? Error { get; init; }
    public string Title { get; init; } = string.Empty;
    public bool IsSba { get; init; }
    public bool IsSeparated { get; init; }
    public bool SupportsSeparateInventories { get; init; }
    public List<InventoryOption> Options { get; init; } = new();
    public PermissionState Permissions { get; init; } = new();
}

/// <summary>
/// Single inventory option with name, value, default, and label.
/// </summary>
public record InventoryOption(string Name, string Value, string DefaultValue, string Label);

namespace Paranext.DataProvider.Checks;

// === NEW IN PT10 ===
// Reason: PAPI communication type for option parameter UI control info
// Maps to: CAP-013 (shared types)

/// <summary>
/// Describes the UI control type for a check option parameter.
/// </summary>
public record OptionParameterInfo
{
    public OptionControlType ControlType { get; init; }
    public List<string>? AvailableValues { get; init; }
    public string CurrentValue { get; init; } = string.Empty;
}

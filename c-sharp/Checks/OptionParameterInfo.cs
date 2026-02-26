namespace Paranext.DataProvider.Checks;

/// <summary>
/// Describes the UI control type for a check option parameter.
/// </summary>
public record OptionParameterInfo
{
    public OptionControlType ControlType { get; init; }
    public List<string>? AvailableValues { get; init; }
    public string CurrentValue { get; init; } = string.Empty;
}

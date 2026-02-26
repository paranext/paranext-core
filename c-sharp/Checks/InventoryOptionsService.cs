namespace Paranext.DataProvider.Checks;

/// <summary>
/// Pure computation services for inventory option management.
/// Contains EXT-007 (SaveInventoryOptions) and EXT-008 (GetOptionParameterType).
/// </summary>
internal static class InventoryOptionsService
{
    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/ToolsMenu/CMSOptionsForm.cs:123-176
    // Method: CMSOptionsForm.SetupParameterValue()
    // Maps to: EXT-008
    /// <summary>
    /// Determines the UI control type for a check option parameter value editor.
    /// YesNo for boolean options, EditableCombo for freeform values.
    /// Error storage parameters always return the default value.
    /// </summary>
    /// <param name="input">Option parameter type input with name, current/default values, error storage flag.</param>
    /// <returns>OptionParameterInfo with control type, available values, and current value.</returns>
    public static OptionParameterInfo GetOptionParameterType(GetOptionParameterTypeInput input)
    {
        string effectiveCurrentValue = input.IsErrorStorage
            ? input.DefaultValue
            : input.CurrentValue;

        bool isYesNo = input.DefaultValue is "Yes" or "No";

        return new OptionParameterInfo
        {
            ControlType = isYesNo ? OptionControlType.YesNo : OptionControlType.EditableCombo,
            AvailableValues = isYesNo ? ["Yes", "No"] : null,
            CurrentValue = effectiveCurrentValue,
        };
    }
}

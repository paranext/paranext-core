namespace Paranext.DataProvider.Checks;

/// <summary>
/// Pure computation services for inventory option management.
/// Contains EXT-007 (SaveInventoryOptions) and EXT-008 (GetOptionParameterType).
/// </summary>
internal static class InventoryOptionsService
{
    /// <summary>
    /// Determines the UI control type for a check option parameter value editor.
    /// YesNo for boolean options, EditableCombo for freeform values.
    /// Error storage parameters always return the default value.
    /// </summary>
    /// <param name="input">Option parameter type input with name, current/default values, error storage flag.</param>
    /// <returns>OptionParameterInfo with control type, available values, and current value.</returns>
    public static OptionParameterInfo GetOptionParameterType(GetOptionParameterTypeInput input)
    {
        throw new NotImplementedException("CAP-009: GetOptionParameterType not yet implemented");
    }
}

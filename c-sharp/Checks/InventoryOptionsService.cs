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

    /// <summary>
    /// Determines which inventory option values have changed between old and new dictionaries.
    /// Returns a result indicating success/failure and the list of changed settings.
    ///
    /// Write-protected projects return Success=false with no changes (VAL-005).
    /// Only values where old != new are included in ChangedSettings.
    /// New keys not present in oldValues are treated as changes (PT9: !HasSetting).
    /// </summary>
    /// <param name="oldValues">Previous option values (from dialog open / GetValue).</param>
    /// <param name="newValues">New option values (from user edits).</param>
    /// <param name="isWriteProtected">Whether the project is write-protected.</param>
    /// <returns>SaveInventoryOptionsResult with success flag and changed settings list.</returns>
    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/ToolsMenu/CMSOptionsForm.cs:64-86
    // Method: CMSOptionsForm.cmdOK_Click()
    // Maps to: EXT-007, BHV-119, BHV-130, VAL-005
    public static SaveInventoryOptionsResult DetermineOptionChanges(
        Dictionary<string, string> oldValues,
        Dictionary<string, string> newValues,
        bool isWriteProtected
    )
    {
        if (isWriteProtected)
        {
            return new SaveInventoryOptionsResult { Success = false };
        }

        List<SaveOperation> changedSettings = newValues
            .Where(kvp =>
                !oldValues.TryGetValue(kvp.Key, out var oldValue) || oldValue != kvp.Value
            )
            .Select(kvp => new SaveOperation(kvp.Key, kvp.Value))
            .ToList();

        return new SaveInventoryOptionsResult { Success = true, ChangedSettings = changedSettings };
    }
}

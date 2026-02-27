namespace Paranext.DataProvider.Checks;

/// <summary>
/// Parameters for determining option parameter UI control type.
/// Maps to EXT-008 (CMSOptionsForm.SetupParameterValue).
/// </summary>
public record GetOptionParameterTypeInput(
    string OptionName,
    string CurrentValue,
    string DefaultValue,
    bool IsErrorStorage
);

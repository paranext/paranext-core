namespace Paranext.DataProvider.Checks;

/// <summary>
/// Parameters for saving inventory option values.
/// Maps to EXT-007 (CMSOptionsForm.cmdOK_Click).
/// </summary>
public record SaveInventoryOptionsInput(
    string ProjectId,
    Dictionary<string, string> OldValues,
    Dictionary<string, string> NewValues
);

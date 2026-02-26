namespace Paranext.DataProvider.Checks;

// === NEW IN PT10 ===
// Reason: PAPI communication type for option parameter UI control type
// Maps to: CAP-013 (shared types)

/// <summary>
/// Type of UI control to render for a check option parameter.
/// Serializes to camelCase strings via converter registered in SerializationOptions.
/// </summary>
public enum OptionControlType
{
    YesNo,
    ProjectList,
    EditableCombo,
}

namespace Paranext.DataProvider.Checks;

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

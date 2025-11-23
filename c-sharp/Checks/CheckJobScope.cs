namespace Paranext.DataProvider.Checks;

/// <summary>
/// Describes which checks to run on which parts of which projects. This class must
/// serialize/deserialize to the CheckJobScope type defined in TypeScript.
/// </summary>
internal sealed class CheckJobScope
{
    public string[] CheckIds { get; set; } = [];
    public InputRange[] InputRanges { get; set; } = [];
}

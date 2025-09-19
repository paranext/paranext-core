namespace Paranext.DataProvider.Checks;

/// <summary>
/// Describes which checks to run on which parts of which projects. This class must
/// serialize/deserialize to the CheckJobScope type defined in TypeScript.
/// </summary>
public sealed class CheckJobScope
{
    public string[] CheckIds { get; set; } = [];
    public CheckInputRange[] InputRanges { get; set; } = [];
}

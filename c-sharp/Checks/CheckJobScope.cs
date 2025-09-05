using Paranext.DataProvider.Checks;

/// <summary>
/// Describes the scope of a check job, including which checks to run on parts of which projects
/// </summary>
internal class CheckJobScope
{
    public string[] CheckIds { get; set; } = [];
    public CheckInputRange[] InputRanges { get; set; } = [];
}

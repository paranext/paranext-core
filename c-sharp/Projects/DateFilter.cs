namespace Paranext.DataProvider.Projects;

/// <summary>
/// Date-based filter for comment-thread selection. Each field is an optional ISO-8601 date string;
/// unset fields impose no constraint.
/// </summary>
public class DateFilter
{
    public string? Exact { get; set; }
    public string? Before { get; set; }
    public string? After { get; set; }
    public string? Start { get; set; }
    public string? End { get; set; }
}

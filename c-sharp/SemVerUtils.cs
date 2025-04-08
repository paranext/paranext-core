using System.Text.RegularExpressions;

namespace Paranext.DataProvider;

public static partial class SemVerUtils
{
    [GeneratedRegex(
        @"^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$"
    )]
    private static partial Regex SemVerRegex();

    private static readonly Regex semVerRegex = SemVerRegex();

    public static Version ConvertSemVerToVersion(string semVer)
    {
        var match = semVerRegex.Match(semVer);
        return new Version(
            10,
            int.TryParse(match.Groups[1].Value, out int major) ? major : 0,
            int.TryParse(match.Groups[2].Value, out int minor) ? minor : 0,
            int.TryParse(match.Groups[3].Value, out int patch) ? patch : 0
        );
    }
}

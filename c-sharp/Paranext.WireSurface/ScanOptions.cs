namespace Paranext.WireSurface;

/// <summary>
/// Parsed and validated command-line arguments: the C# project to load, the root every output path
/// is made relative to, the tracked-file set entries are filtered against, and the file the scan
/// result is written to.
/// </summary>
public sealed record ScanOptions(
    string ProjectPath,
    string RepoRoot,
    IReadOnlySet<string> TrackedFiles,
    string OutputPath
)
{
    private const string Usage =
        "usage: Paranext.WireSurface --project <csproj> --repo-root <dir> --tracked-files <list> --out <json>";

    private static readonly IReadOnlySet<string> RequiredFlags = new HashSet<string>(
        StringComparer.Ordinal
    )
    {
        "--project",
        "--repo-root",
        "--tracked-files",
        "--out",
    };

    /// <summary>
    /// Parses <paramref name="args"/>, requiring exactly the four flags above (each with a value)
    /// and no others, then reads the tracked-file list from disk. Any parsing or read failure writes
    /// a usage message to <paramref name="stderr"/> and returns null, for the caller to treat as
    /// exit 64 (EX_USAGE).
    /// </summary>
    public static ScanOptions? Parse(string[] args, TextWriter stderr)
    {
        var values = new Dictionary<string, string>(StringComparer.Ordinal);
        for (var i = 0; i < args.Length; i++)
        {
            var flag = args[i];
            if (!RequiredFlags.Contains(flag) || i + 1 >= args.Length || values.ContainsKey(flag))
            {
                stderr.WriteLine(Usage);
                return null;
            }
            values[flag] = args[++i];
        }

        if (values.Count != RequiredFlags.Count)
        {
            stderr.WriteLine(Usage);
            return null;
        }

        var trackedFilesPath = values["--tracked-files"];
        IReadOnlySet<string> trackedFiles;
        try
        {
            trackedFiles = ReadTrackedFiles(trackedFilesPath);
        }
        catch (IOException ex)
        {
            stderr.WriteLine(
                $"wire-surface: could not read --tracked-files '{trackedFilesPath}': {ex.Message}"
            );
            return null;
        }

        return new ScanOptions(
            values["--project"],
            values["--repo-root"],
            trackedFiles,
            values["--out"]
        );
    }

    /// <summary>
    /// One repo-relative path per line, LF- or CRLF-separated; blank lines (after trimming) are
    /// dropped.
    /// </summary>
    private static IReadOnlySet<string> ReadTrackedFiles(string path) =>
        File.ReadAllText(path)
            .Split('\n')
            .Select(line => line.Trim())
            .Where(line => line.Length > 0)
            .ToHashSet(StringComparer.Ordinal);
}

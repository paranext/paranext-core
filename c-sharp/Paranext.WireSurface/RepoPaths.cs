namespace Paranext.WireSurface;

/// <summary>
/// Makes a syntax tree's file path relative to the repository root and normalises separators to
/// <c>/</c>, so the scan output is identical whether it was produced on Windows, macOS, or Linux
/// (design §7).
/// </summary>
public static class RepoPaths
{
    /// <summary>
    /// An empty <paramref name="repoRoot"/> means <paramref name="filePath"/> is already
    /// repo-relative (the shape an in-memory fixture compilation's tree paths are constructed
    /// with) — there is no root to strip, only separators to normalise.
    ///
    /// Otherwise, when <paramref name="filePath"/> is textually rooted at <paramref name="repoRoot"/>
    /// — the ordinary case, including a Windows-style root fed to a non-Windows runtime — an ordinal
    /// prefix strip handles it directly: on a non-Windows OS, <see cref="Path.GetRelativePath"/>
    /// treats a backslash as an ordinary filename character rather than a separator, so it cannot
    /// relate a Windows-style pair like <c>C:\r</c> and <c>C:\r\c-sharp\A.cs</c> at all. Anything
    /// that is not a plain prefix (a different drive, a sibling directory, `..` segments) falls back
    /// to <see cref="Path.GetRelativePath"/> for genuine relative-path computation.
    /// </summary>
    public static string Relative(string repoRoot, string filePath)
    {
        if (repoRoot.Length == 0)
            return filePath.Replace('\\', '/');

        if (filePath.StartsWith(repoRoot, StringComparison.Ordinal))
        {
            var remainder = filePath[repoRoot.Length..].TrimStart('/', '\\');
            return remainder.Replace('\\', '/');
        }

        return Path.GetRelativePath(repoRoot, filePath).Replace('\\', '/');
    }
}

using System.Diagnostics;
using System.Diagnostics.CodeAnalysis;

namespace TestParanextDataProvider;

/// <summary>
/// Symbolic-link and junction creation for tests that need one.
/// </summary>
[ExcludeFromCodeCoverage]
internal static class FileSystemLinks
{
    /// <summary>
    /// Create a symbolic link, or <see cref="Assert.Ignore(string)"/> the current test where the
    /// environment cannot. Link creation is a privileged operation on Windows without developer
    /// mode, so a test that needs one skips rather than fails there; CI's macOS and Linux legs run
    /// it regardless.
    /// </summary>
    public static void CreateLinkOrIgnore(string linkPath, string targetPath, bool isDirectory)
    {
        try
        {
            if (isDirectory)
                Directory.CreateSymbolicLink(linkPath, targetPath);
            else
                File.CreateSymbolicLink(linkPath, targetPath);
        }
        catch (Exception e) when (e is IOException or UnauthorizedAccessException)
        {
            Assert.Ignore($"Symbolic links cannot be created in this environment: {e.Message}");
        }
    }

    /// <summary>
    /// Create a Windows directory junction, or <see cref="Assert.Ignore(string)"/> the current test
    /// where that is not possible. .NET has no API for junctions, so this runs <c>mklink /J</c>;
    /// unlike a symbolic link, a junction needs no privilege.
    /// </summary>
    public static void CreateJunctionOrIgnore(string junctionPath, string targetPath)
    {
        if (!OperatingSystem.IsWindows())
            Assert.Ignore("Directory junctions exist only on Windows");

        using var mklink = Process.Start(
            new ProcessStartInfo("cmd.exe")
            {
                ArgumentList = { "/c", "mklink", "/J", junctionPath, targetPath },
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                UseShellExecute = false,
            }
        )!;
        var error = mklink.StandardError.ReadToEnd();
        mklink.WaitForExit();
        if (mklink.ExitCode != 0)
            Assert.Ignore($"A directory junction could not be created: {error}");
    }
}

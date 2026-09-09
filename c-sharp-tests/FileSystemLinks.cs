using System.Diagnostics.CodeAnalysis;

namespace TestParanextDataProvider;

/// <summary>
/// Symbolic-link creation for tests that need one.
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
}

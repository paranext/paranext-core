using System.Diagnostics.CodeAnalysis;
using System.Reflection;
using Paranext.DataProvider.ParatextUtils;
using SIL.WritingSystems;

namespace TestParanextDataProvider;

[SetUpFixture]
[ExcludeFromCodeCoverage]
public class FixtureSetup
{
    /// <summary>
    /// The prefix every test temp folder name starts with. The stale-folder sweep deletes only
    /// folders named with it, so a test that makes its own temp folder names it
    /// <c>{TEST_FOLDER_PREFIX}-{RunId}-{test id}</c>.
    /// </summary>
    internal const string TEST_FOLDER_PREFIX = "Platform.Bible.Tests";

    /// <summary>
    /// Identifies this test run (a GUID in <c>N</c> format). Temp folders named after it are unique
    /// to the run, so concurrent runs never share, and so never delete, each other's folders.
    /// </summary>
    public static string RunId { get; } = Guid.NewGuid().ToString("N");

    // Unique per test run: the folder is deleted in teardown, so two runs sharing one folder
    // (two developer sessions, or an IDE run beside a CLI run) would delete each other's
    // fixture files mid-run and fail at random.
    public static string TestFolderPath =>
        Path.Combine(Path.GetTempPath(), $"{TEST_FOLDER_PREFIX}-{RunId}");

    [OneTimeSetUp]
    public void RunBeforeAnyTests()
    {
        if (!Sldr.IsInitialized)
            Sldr.Initialize(true); // always use offline mode in tests.

        // Clean up folders that runs which never reached teardown (crashed, killed, or stopped in
        // a debugger) left behind. A concurrent run's folder is younger than the cutoff, so it is
        // left alone.
        DeleteStaleTestFolders(Path.GetTempPath(), DateTime.UtcNow.AddHours(-24));

        // Create folder for test running. Shouldn't actually be used, but ParatextData
        // throws an error if the directory doesn't exist.
        Directory.CreateDirectory(TestFolderPath);

        var dllPath = Assembly.GetExecutingAssembly().Location;
        // Climb up to the c-sharp folder, then down to the assets folder in order to get the usfm
        // stylesheet needed by certain parts of ParatextData.
        var srcDir = Path.Combine(dllPath, "..", "..", "..", "..", "..", "c-sharp", "assets");
        var sourcePath = Path.Combine(srcDir, "usfm.sty");
        var destPath = Path.Combine(TestFolderPath, "usfm.sty");

        // Overwrite, so setup tolerates an existing folder that already holds a copy.
        File.Copy(sourcePath, destPath, overwrite: true);

        ParatextGlobals.Initialize(TestFolderPath);
    }

    [OneTimeTearDown]
    public void RunAfterAnyTests()
    {
        // Clean up after the tests are run.
        if (Directory.Exists(TestFolderPath))
            Directory.Delete(TestFolderPath, true);
    }

    /// <summary>
    /// Deletes the test folders directly under <paramref name="parentDirectory"/> — the ones named
    /// <c>Platform.Bible.Tests</c> or <c>Platform.Bible.Tests-*</c> — that have been neither
    /// created nor modified since <paramref name="cutoffUtc"/>.
    /// </summary>
    /// <remarks>
    /// Best effort: a folder that cannot be read or deleted is left in place, and no failure
    /// escapes, because a leftover folder must never fail the run that found it.
    /// </remarks>
    internal static void DeleteStaleTestFolders(string parentDirectory, DateTime cutoffUtc)
    {
        try
        {
            foreach (
                var folder in new DirectoryInfo(parentDirectory).EnumerateDirectories(
                    $"{TEST_FOLDER_PREFIX}*"
                )
            )
            {
                try
                {
                    if (
                        folder.Name != TEST_FOLDER_PREFIX
                        && !folder.Name.StartsWith(
                            $"{TEST_FOLDER_PREFIX}-",
                            StringComparison.Ordinal
                        )
                    )
                        continue;

                    // A link is not a folder a test run created; leave it and its target alone.
                    if (folder.Attributes.HasFlag(FileAttributes.ReparsePoint))
                        continue;

                    // Linux may report the last metadata change as the creation time, so a folder
                    // counts as stale only when both times are older than the cutoff.
                    var lastTouchedUtc =
                        folder.CreationTimeUtc > folder.LastWriteTimeUtc
                            ? folder.CreationTimeUtc
                            : folder.LastWriteTimeUtc;
                    if (lastTouchedUtc < cutoffUtc)
                        folder.Delete(recursive: true);
                }
                catch (Exception)
                {
                    // In use, not permitted, or deleted by another run first: skip this folder.
                }
            }
        }
        catch (Exception)
        {
            // The parent cannot be enumerated, so there is nothing this run can sweep.
        }
    }
}

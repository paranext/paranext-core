using System.Diagnostics.CodeAnalysis;
using System.Reflection;
using Paranext.DataProvider.ParatextUtils;
using SIL.WritingSystems;

namespace TestParanextDataProvider;

[SetUpFixture]
[ExcludeFromCodeCoverage]
public class FixtureSetup
{
    private static readonly string s_testFolder = Path.Combine(
        Path.GetTempPath(),
        "Platform.Bible.Tests"
    );

    public static string TestFolderPath => s_testFolder;

    [OneTimeSetUp]
    public void RunBeforeAnyTests()
    {
        if (!Sldr.IsInitialized)
            Sldr.Initialize(true); // always use offline mode in tests.

        // Create folder for test running. Shouldn't actually be used, but ParatextData
        // throws an error if the directory doesn't exist.
        if (!Directory.Exists(s_testFolder))
            Directory.CreateDirectory(s_testFolder);

        var dllPath = Assembly.GetExecutingAssembly().Location;
        // Climb up to the c-sharp folder, then down to the assets folder in order to get the usfm
        // stylesheet needed by certain parts of ParatextData.
        var srcDir = Path.Combine(dllPath, "..", "..", "..", "..", "..", "c-sharp", "assets");
        var sourcePath = Path.Combine(srcDir, "usfm.sty");
        var destPath = Path.Combine(s_testFolder, "usfm.sty");

        // Only copy the usfm.sty file if it doesn't already exist.
        if (!File.Exists(destPath))
            File.Copy(sourcePath, destPath);

        ParatextGlobals.Initialize(s_testFolder);
    }

    [OneTimeTearDown]
    public void RunAfterAnyTests()
    {
        // Clean up after the tests are run.
        if (Directory.Exists(s_testFolder))
            Directory.Delete(s_testFolder, true);
    }
}

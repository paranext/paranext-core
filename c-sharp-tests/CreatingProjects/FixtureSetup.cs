using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.ParatextUtils;

namespace TestParanextDataProvider.CreatingProjects;

/// <summary>
/// Test fixture setup for Creating Projects feature tests.
/// Initializes ParatextGlobals with a dedicated test folder.
/// </summary>
[SetUpFixture]
[ExcludeFromCodeCoverage]
public class FixtureSetup
{
    private static readonly string s_testFolder = Path.Combine(
        Path.GetTempPath(),
        "Platform.Bible.Tests.CreatingProjects"
    );

    /// <summary>
    /// Gets the test folder path for Creating Projects tests.
    /// </summary>
    public static string TestFolderPath => s_testFolder;

    [OneTimeSetUp]
    public void RunBeforeAnyTests()
    {
        // Create folder for test running. ParatextData requires the directory to exist.
        if (!Directory.Exists(s_testFolder))
            Directory.CreateDirectory(s_testFolder);

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

using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.ParatextUtils;

namespace TestParanextDataProvider.ProjectCreation;

/// <summary>
/// Assembly-level setup for ProjectCreation tests.
/// Initializes ParatextGlobals with a temp folder for test isolation.
/// </summary>
[SetUpFixture]
[ExcludeFromCodeCoverage]
public class FixtureSetup
{
    private static readonly string s_testFolder = Path.Combine(
        Path.GetTempPath(),
        "Platform.Bible.ProjectCreation.Tests"
    );

    public static string TestFolderPath => s_testFolder;

    [OneTimeSetUp]
    public void RunBeforeAnyTests()
    {
        // Create folder for test running. ParatextData requires this directory to exist.
        if (!Directory.Exists(s_testFolder))
            Directory.CreateDirectory(s_testFolder);

        ParatextGlobals.Initialize(s_testFolder);
    }

    [OneTimeTearDown]
    public void RunAfterAnyTests()
    {
        // Clean up after tests complete.
        if (Directory.Exists(s_testFolder))
            Directory.Delete(s_testFolder, true);
    }
}

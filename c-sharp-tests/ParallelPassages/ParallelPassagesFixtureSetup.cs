using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.ParatextUtils;

namespace TestParanextDataProvider.ParallelPassages;

[SetUpFixture]
[ExcludeFromCodeCoverage]
public class ParallelPassagesFixtureSetup
{
    private static readonly string s_testFolder = Path.Combine(
        Path.GetTempPath(),
        "Platform.Bible.ParallelPassages.Tests"
    );

    public static string TestFolderPath => s_testFolder;

    [OneTimeSetUp]
    public void RunBeforeAnyTests()
    {
        if (!Directory.Exists(s_testFolder))
            Directory.CreateDirectory(s_testFolder);

        ParatextGlobals.Initialize(s_testFolder);
    }

    [OneTimeTearDown]
    public void RunAfterAnyTests()
    {
        if (Directory.Exists(s_testFolder))
            Directory.Delete(s_testFolder, true);
    }
}

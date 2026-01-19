using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.ParatextUtils;

namespace TestParanextDataProvider.CreatingProjects
{
    /// <summary>
    /// Assembly-level setup for CreatingProjects tests.
    /// Initializes ParatextGlobals before any tests run.
    /// </summary>
    [SetUpFixture]
    [ExcludeFromCodeCoverage]
    [Category("CreatingProjects")]
    public class FixtureSetup
    {
        private static readonly string s_testFolder = Path.Combine(
            Path.GetTempPath(),
            "Platform.Bible.CreatingProjects.Tests"
        );

        public static string TestFolderPath => s_testFolder;

        [OneTimeSetUp]
        public void RunBeforeAnyTests()
        {
            // Create folder for test running. ParatextData requires a valid directory.
            if (!Directory.Exists(s_testFolder))
                Directory.CreateDirectory(s_testFolder);

            ParatextGlobals.Initialize(s_testFolder);
        }

        [OneTimeTearDown]
        public void RunAfterAnyTests()
        {
            // Clean up after tests are run.
            if (Directory.Exists(s_testFolder))
                Directory.Delete(s_testFolder, true);
        }
    }
}

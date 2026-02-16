using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.ParatextUtils;

namespace TestParanextDataProvider.ManageBooks
{
    /// <summary>
    /// Assembly-level setup for ManageBooks tests.
    /// Initializes ParatextGlobals with a test folder.
    /// </summary>
    [SetUpFixture]
    [ExcludeFromCodeCoverage]
    public class FixtureSetup
    {
        private static readonly string s_testFolder = Path.Combine(
            Path.GetTempPath(),
            "Platform.Bible.ManageBooks.Tests"
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
}

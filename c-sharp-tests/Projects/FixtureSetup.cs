using Paranext.DataProvider.ParatextUtils;

namespace TestParanextDataProvider.Projects
{
    [SetUpFixture]
    public class FixtureSetup
    {
        private static readonly string s_testFolder = Path.Combine(Path.GetTempPath(), "Platform.Bible.Tests");

        [OneTimeSetUp]
        public void RunBeforeAnyTests()
        {
            // Create folder for test running. Shouldn't actually be used, but ParatextData
            // throws an error if the directory doesn't exist.
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
}

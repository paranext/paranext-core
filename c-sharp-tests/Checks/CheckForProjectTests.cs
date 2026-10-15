using Paranext.DataProvider.Checks;

namespace TestParanextDataProvider.Checks;

[TestFixture]
internal class CheckForProjectTests
{
    [Test]
    public void ClearResultsForBook_BookTheCheckNeverRan_DoesNotThrow()
    {
        // An edit to any book clears every cached check for the project, including checks that
        // have only ever run on other books
        var check = new CheckForProject(new InitializeHookCheck(), "TestCheck", "TestProject");
        check.AccessResults(1, recorder => recorder.ResultsReady = true);

        Assert.DoesNotThrow(() => check.ClearResultsForBook(2));
        var stillReady = false;
        check.AccessResults(1, recorder => stillReady = recorder.ResultsReady);
        Assert.That(stillReady, Is.True);
    }
}

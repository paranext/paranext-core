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

    private static bool AreResultsReady(CheckForProject check, int bookNum)
    {
        var ready = false;
        check.AccessResults(bookNum, recorder => ready = recorder.ResultsReady);
        return ready;
    }

    [Test]
    public void Run_NoEditSinceTheTextWasRead_MarksResultsReady()
    {
        var check = new CheckForProject(new InitializeHookCheck(), "TestCheck", "TestProject");
        var editCount = check.GetEditCount(1);

        check.Run(null!, 1, null!, editCount);

        Assert.That(AreResultsReady(check, 1), Is.True);
    }

    [Test]
    public void Run_EditAfterTheTextWasReadBeforeTheRunEnds_LeavesResultsNotReady()
    {
        var hookCheck = new InitializeHookCheck();
        var check = new CheckForProject(hookCheck, "TestCheck", "TestProject");
        var editCount = check.GetEditCount(1);
        // The edit lands while the check is running on text read before it
        hookCheck.OnRun = () => check.ClearResultsForBook(1);

        check.Run(null!, 1, null!, editCount);

        Assert.That(AreResultsReady(check, 1), Is.False);
    }

    [Test]
    public void Run_EditToAnotherBook_DoesNotKeepResultsFromBeingReady()
    {
        var hookCheck = new InitializeHookCheck();
        var check = new CheckForProject(hookCheck, "TestCheck", "TestProject");
        var editCount = check.GetEditCount(1);
        hookCheck.OnRun = () => check.ClearResultsForBook(2);

        check.Run(null!, 1, null!, editCount);

        Assert.That(AreResultsReady(check, 1), Is.True);
    }

    [Test]
    public void ClearResultsForBook_BookTheCheckNeverRan_ChangesTheEditCount()
    {
        var check = new CheckForProject(new InitializeHookCheck(), "TestCheck", "TestProject");
        var before = check.GetEditCount(2);

        check.ClearResultsForBook(2);

        Assert.That(check.GetEditCount(2), Is.Not.EqualTo(before));
    }
}

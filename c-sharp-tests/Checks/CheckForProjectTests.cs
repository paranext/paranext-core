using Paranext.DataProvider.Checks;
using Paratext.Checks;
using Paratext.Data;
using Paratext.Data.Checking;
using PtxUtils;
using SIL.Scripture;

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

    private static int CountResults(CheckForProject check, int bookNum)
    {
        var count = 0;
        check.AccessResults(bookNum, recorder => count = recorder.CheckRunResults.Count);
        return count;
    }

    private static CheckForProject CreateCheckThatFindsOneError()
    {
        var hookCheck = new InitializeHookCheck
        {
            OnRun = recordError =>
                recordError.RecordError(
                    new VerseRef(1, 1, 1),
                    "text",
                    0,
                    "message",
                    CheckType.RepeatedWord,
                    new Enum<MessageId>("TestMessage")
                ),
        };
        return new CheckForProject(hookCheck, "TestCheck", "TestProject");
    }

    [Test]
    public void Run_NoEditSinceTheTextWasRead_KeepsTheResults()
    {
        var check = CreateCheckThatFindsOneError();
        var editCount = check.GetEditCount(1);

        check.Run(null!, 1, null!, editCount);

        Assert.That(CountResults(check, 1), Is.EqualTo(1));
    }

    [Test]
    public void Run_EditAfterTheTextWasReadBeforeTheRunEnds_LeavesNoResultsAndNotReady()
    {
        var check = CreateCheckThatFindsOneError();
        // The check's job reads the book's text, then an edit lands, then the check runs on the
        // text it read
        var editCountBeforeTextRead = check.GetEditCount(1);
        check.ClearResultsForBook(1);

        check.Run(null!, 1, null!, editCountBeforeTextRead);

        Assert.That(AreResultsReady(check, 1), Is.False);
        Assert.That(CountResults(check, 1), Is.EqualTo(0));
    }

    [Test]
    public void Run_EditToAnotherBook_DoesNotKeepResultsFromBeingReady()
    {
        var check = CreateCheckThatFindsOneError();
        var editCount = check.GetEditCount(1);
        check.ClearResultsForBook(2);

        check.Run(null!, 1, null!, editCount);

        Assert.That(AreResultsReady(check, 1), Is.True);
    }

    [Test]
    public void Run_EditToABookTheCheckNeverRan_LeavesResultsNotReady()
    {
        var check = CreateCheckThatFindsOneError();
        var editCountBeforeTextRead = check.GetEditCount(2);
        check.ClearResultsForBook(2);

        check.Run(null!, 2, null!, editCountBeforeTextRead);

        Assert.That(AreResultsReady(check, 2), Is.False);
    }
}

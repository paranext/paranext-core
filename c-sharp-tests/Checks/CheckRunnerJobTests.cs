using System.Diagnostics;
using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Checks;
using Paratext.Checks;
using Paratext.Data;
using Paratext.Data.Checking;
using Paratext.Data.ProjectSettingsAccess;
using SIL.Scripture;

namespace TestParanextDataProvider.Checks;

[TestFixture]
[ExcludeFromCodeCoverage]
internal class CheckRunnerJobTests : PapiTestBase
{
    private static readonly string s_repeatedWordCheckId = CheckType.RepeatedWord.InternalValue;
    private static readonly string s_quotationCheckId = CheckType.Quotation.InternalValue;
    private const string ThrowingCheckId = "TestThrowingCheck";

    private DummyScrText _scrText = null!;
    private string _projectId = null!;

    [SetUp]
    public override async Task TestSetupAsync()
    {
        await base.TestSetupAsync();
        _scrText = CreateDummyProject();
        var details = CreateProjectDetails(_scrText);
        ParatextProjects.FakeAddProject(details, _scrText);
        _projectId = details.Metadata.Id;
        PutBook(1, "In the the beginning");
    }

    [TearDown]
    public void TestTearDownScrText()
    {
        _scrText?.Dispose();
    }

    #region Helpers

    internal void PutBook(int bookNum, string verseText)
    {
        var bookId = Canon.BookNumberToId(bookNum);
        _scrText.PutText(
            bookNum,
            0,
            false,
            $"\\id {bookId}\n\\c 1\n\\p\n\\v 1 {verseText}\n",
            null
        );
    }

    internal CheckRunner CreateRunner(
        Func<string, ChecksDataSource, ScriptureCheckBase>? createCheck = null
    ) =>
        new(
            Client,
            new InventoryDataProvider(Client, ParatextProjects),
            createCheck ?? CheckFactory.CreateCheck
        );

    /// <summary>Uses <see cref="ThrowingCheck"/> for <see cref="ThrowingCheckId"/>.</summary>
    internal static ScriptureCheckBase CreateCheckWithThrowingCheck(
        string checkId,
        ChecksDataSource dataSource
    )
    {
        if (checkId != ThrowingCheckId)
            return CheckFactory.CreateCheck(checkId, dataSource);
        var check = new ThrowingCheck();
        check.Initialize(dataSource);
        return check;
    }

    /// <summary>
    /// Runs one job over whole books and polls it to a terminal status, collecting every result
    /// batch along the way.
    /// </summary>
    internal (CheckJobStatusReport Final, List<CheckRunResult> Results) RunJob(
        CheckRunner runner,
        string[] checkIds,
        params int[] bookNums
    )
    {
        var scope = new CheckJobScope
        {
            CheckIds = checkIds,
            InputRanges = bookNums
                .Select(bookNum => new InputRange(
                    _projectId,
                    new VerseRef(bookNum, 1, 1),
                    new VerseRef(
                        bookNum,
                        InputRange.MAX_CHAPTER_OR_VERSE_NUM,
                        InputRange.MAX_CHAPTER_OR_VERSE_NUM
                    )
                ))
                .ToArray(),
        };
        var jobId = runner.BeginCheckJob(scope);

        var results = new List<CheckRunResult>();
        var stopwatch = Stopwatch.StartNew();
        // Longer than the 30 s waits inside the tests' hooks, so a hook that gives up reports its
        // own failed assertion instead of this timeout
        while (stopwatch.Elapsed < TimeSpan.FromSeconds(60))
        {
            var report = runner.RetrieveCheckJobUpdate(jobId, 10_000);
            if (report.NextResults != null)
                results.AddRange(report.NextResults);
            if (report.Status != CheckJobStatus.Queued && report.Status != CheckJobStatus.Running)
            {
                // Drain anything produced after the last poll
                var tail = runner.RetrieveCheckJobUpdate(jobId, 10_000);
                if (tail.NextResults != null)
                    results.AddRange(tail.NextResults);
                return (report, results);
            }
            Thread.Sleep(20);
        }
        throw new TimeoutException($"Check job {jobId} did not finish within 60 seconds");
    }

    #endregion

    #region Harness

    [Test]
    public void HealthyCheck_ProducesResults()
    {
        var (final, results) = RunJob(CreateRunner(), [s_repeatedWordCheckId], 1);

        Assert.That(final.Status, Is.EqualTo(CheckJobStatus.Completed), final.Error);
        Assert.That(results.Where(r => r.CheckId == s_repeatedWordCheckId), Is.Not.Empty);
        Assert.That(final.CheckErrors, Is.Null);
    }

    #endregion

    #region Isolation

    [Test]
    public void InvalidQuotationRules_OtherChecksStillReportAndQuotationIsListed()
    {
        // 'Quotes in Quotes' incomplete: passes Paratext 9's SetupComplete, throws in Run
        _scrText.Settings.Quotes = new QuoteMarks("“", "”");
        _scrText.Settings.InnerQuotes = new QuoteMarks("‘", "");

        var (final, results) = RunJob(
            CreateRunner(),
            [s_repeatedWordCheckId, s_quotationCheckId],
            1
        );

        Assert.That(final.Status, Is.EqualTo(CheckJobStatus.Completed), final.Error);
        Assert.That(results.Where(r => r.CheckId == s_repeatedWordCheckId), Is.Not.Empty);
        Assert.That(final.CheckErrors, Has.Count.EqualTo(1));
        Assert.That(final.CheckErrors![0].CheckId, Is.EqualTo(s_quotationCheckId));
        Assert.That(final.CheckErrors[0].Message, Does.Contain("Quotation rules"));
    }

    [Test]
    public void UnexpectedException_OtherChecksStillReport()
    {
        var (final, results) = RunJob(
            CreateRunner(CreateCheckWithThrowingCheck),
            [ThrowingCheckId, s_repeatedWordCheckId],
            1
        );

        Assert.That(final.Status, Is.EqualTo(CheckJobStatus.Completed), final.Error);
        Assert.That(results.Where(r => r.CheckId == s_repeatedWordCheckId), Is.Not.Empty);
        Assert.That(
            final.CheckErrors,
            Is.EqualTo(new[] { new CheckJobError(ThrowingCheckId, ThrowingCheck.Message) })
        );
    }

    [Test]
    public void CheckThatFailsToBeCreated_OtherChecksStillReport()
    {
        const string failingCheckId = "TestUncreatableCheck";
        const string failureMessage = "The test check could not be created.";
        PutBook(2, "Out of of Egypt");
        ScriptureCheckBase Create(string checkId, ChecksDataSource dataSource) =>
            checkId == failingCheckId
                ? throw new InvalidOperationException(failureMessage)
                : CheckFactory.CreateCheck(checkId, dataSource);

        var (final, results) = RunJob(
            CreateRunner(Create),
            [failingCheckId, s_repeatedWordCheckId],
            1,
            2
        );

        Assert.That(final.Status, Is.EqualTo(CheckJobStatus.Completed), final.Error);
        Assert.That(results.Where(r => r.CheckId == s_repeatedWordCheckId), Is.Not.Empty);
        Assert.That(
            final.CheckErrors,
            Is.EqualTo(new[] { new CheckJobError(failingCheckId, failureMessage) })
        );
    }

    [Test]
    public void SetupLookupThatThrows_FallsThroughToCreationAndOtherChecksStillReport()
    {
        const string failureMessage = "The quotation check could not be created.";
        PutBook(2, "Out of of Egypt");
        // Fails in the setup lookup and again when the job creates the check
        ScriptureCheckBase Create(string checkId, ChecksDataSource dataSource) =>
            checkId == s_quotationCheckId
                ? throw new InvalidOperationException(failureMessage)
                : CheckFactory.CreateCheck(checkId, dataSource);

        var (final, results) = RunJob(
            CreateRunner(Create),
            [s_quotationCheckId, s_repeatedWordCheckId],
            1,
            2
        );

        Assert.That(final.Status, Is.EqualTo(CheckJobStatus.Completed), final.Error);
        Assert.That(results.Where(r => r.CheckId == s_repeatedWordCheckId), Is.Not.Empty);
        Assert.That(
            final.CheckErrors,
            Is.EqualTo(new[] { new CheckJobError(s_quotationCheckId, failureMessage) })
        );
    }

    [Test]
    public void CheckFailingInEveryBook_IsListedOnce()
    {
        PutBook(2, "Out of of Egypt");

        var (final, _) = RunJob(
            CreateRunner(CreateCheckWithThrowingCheck),
            [ThrowingCheckId, s_repeatedWordCheckId],
            1,
            2
        );

        Assert.That(final.CheckErrors, Has.Count.EqualTo(1));
    }

    [Test]
    public void CheckThatFailsInOneBook_KeepsItsResultsFromTheOtherBooks()
    {
        PutBook(2, "Out of of Egypt");
        var throwing = new ThrowingCheck();
        throwing.BooksToThrowFor.Add(2);
        ScriptureCheckBase Create(string checkId, ChecksDataSource dataSource) =>
            checkId == ThrowingCheckId ? throwing : CheckFactory.CreateCheck(checkId, dataSource);

        var (final, results) = RunJob(
            CreateRunner(Create),
            [ThrowingCheckId, s_repeatedWordCheckId],
            1,
            2
        );

        Assert.That(final.Status, Is.EqualTo(CheckJobStatus.Completed), final.Error);
        // Book 2 still ran for the healthy check after the throwing check failed there
        Assert.That(
            results.Where(r => r.CheckId == s_repeatedWordCheckId && r.VerseRef.BookNum == 2),
            Is.Not.Empty
        );
        Assert.That(final.CheckErrors, Has.Count.EqualTo(1));
    }

    [Test]
    public void FailedCheck_RunsAgainOnTheNextJobAfterTheSettingsAreFixed()
    {
        _scrText.Settings.Quotes = new QuoteMarks("“", "”");
        _scrText.Settings.InnerQuotes = new QuoteMarks("‘", "");
        var runner = CreateRunner();
        var (first, _) = RunJob(runner, [s_quotationCheckId], 1);
        Assert.That(first.CheckErrors, Has.Count.EqualTo(1));

        QuotationRulesTestHelper.SetValidQuotationRules(_scrText);
        var (second, _) = RunJob(runner, [s_quotationCheckId], 1);

        Assert.That(second.Status, Is.EqualTo(CheckJobStatus.Completed), second.Error);
        Assert.That(second.CheckErrors, Is.Null);
    }

    #endregion

    #region Setup status

    [Test]
    public void NotApplicableCheck_IsSkippedWithoutErrorAndJobReaches100()
    {
        _scrText.Settings.Quotes = new QuoteMarks("");

        var (final, results) = RunJob(
            CreateRunner(),
            [s_quotationCheckId, s_repeatedWordCheckId],
            1
        );

        Assert.That(final.Status, Is.EqualTo(CheckJobStatus.Completed), final.Error);
        Assert.That(final.CheckErrors, Is.Null);
        Assert.That(results.Where(r => r.CheckId == s_quotationCheckId), Is.Empty);
        Assert.That(results.Where(r => r.CheckId == s_repeatedWordCheckId), Is.Not.Empty);
        Assert.That(final.PercentComplete, Is.EqualTo(100));
    }

    [Test]
    public void QuotesChangedToNone_NextJobSkipsQuotationCheck()
    {
        QuotationRulesTestHelper.SetValidQuotationRules(_scrText);
        PutBook(1, "He said “hello and never closed it.");
        var runner = CreateRunner();
        var (_, firstResults) = RunJob(runner, [s_quotationCheckId], 1);
        // Positive control: the first run caches a quotation result that the second must not serve
        Assert.That(firstResults, Is.Not.Empty);

        _scrText.Settings.Quotes = new QuoteMarks("");
        var (second, results) = RunJob(runner, [s_quotationCheckId], 1);

        Assert.That(second.Status, Is.EqualTo(CheckJobStatus.Completed), second.Error);
        Assert.That(second.CheckErrors, Is.Null);
        Assert.That(results, Is.Empty);
    }

    [Test]
    public void LookUpCheckSetupStatus_IsExposedAndIsCheckSetupFollowsIt()
    {
        _scrText.Settings.Quotes = new QuoteMarks("");
        var runner = CreateRunner();

        var state = runner.LookUpCheckSetupStatus(s_quotationCheckId, _projectId);
        var isSetup = runner.IsCheckSetupForProject(s_quotationCheckId, _projectId);

        Assert.That(state.Status, Is.EqualTo(CheckSetupStatus.NotApplicable));
        // A check that doesn't apply counts as set up
        Assert.That(isSetup, Is.True);
    }

    #endregion

    #region Edits during a job

    private const string HookCheckId = HookCheck.Id;

    /// <summary>
    /// Creates a runner whose jobs can run <paramref name="otherCheckId"/> and
    /// <see cref="HookCheck"/>. The hook check's settings are marked changed, so a job
    /// re-initializes it partway through the book, in the order of the job's check ids: listed after
    /// the other check, after that check has finished the book and before the job reads its results
    /// back; listed first, after the book's text was read and before the other check runs.
    /// </summary>
    private (
        CheckRunner Runner,
        HookCheck Hook,
        CheckForProject OtherCheck
    ) CreateRunnerWithHookCheck(string otherCheckId)
    {
        var hookCheck = new HookCheck();
        ScriptureCheckBase Create(string checkId, ChecksDataSource dataSource) =>
            checkId == HookCheckId ? hookCheck : CheckFactory.CreateCheck(checkId, dataSource);
        var runner = CreateRunner(Create);
        runner.CheckCache.GetCheck(HookCheckId, _projectId).SettingsChanged = true;
        return (runner, hookCheck, runner.CheckCache.GetCheck(otherCheckId, _projectId));
    }

    private static bool AreResultsReady(CheckForProject check, int bookNum)
    {
        var ready = false;
        check.AccessResults(bookNum, recorder => ready = recorder.ResultsReady);
        return ready;
    }

    [Test]
    public void ProcessCheckJob_TextChangeDuringJob_DoesNotErrorTheWholeJob()
    {
        var (runner, hookCheck, repeatedWordCheck) = CreateRunnerWithHookCheck(
            s_repeatedWordCheckId
        );
        var editClearedFinishedCheck = false;
        // The book is edited after the repeated-word check has finished it. The edit goes through
        // the project's real TextChanged handler, which clears that check's results for the book
        // in the background; the hook waits until it has.
        hookCheck.OnInitialize = () =>
        {
            PutBook(1, "In the beginning God God");
            editClearedFinishedCheck = SpinWait.SpinUntil(
                () => !AreResultsReady(repeatedWordCheck, 1),
                TimeSpan.FromSeconds(30)
            );
        };

        var (final, results) = RunJob(runner, [s_repeatedWordCheckId, HookCheckId], 1);

        // The edit really landed between the finished check's run and the job reading it back
        Assert.That(editClearedFinishedCheck, Is.True);
        Assert.That(final.Status, Is.EqualTo(CheckJobStatus.Completed), final.Error);
        Assert.That(final.Error, Is.Null);
        Assert.That(final.CheckErrors, Is.Null.Or.Empty);
        // The cleared check is run again, so its results for the edited text still arrive
        var itemTexts = results
            .Where(r => r.CheckId == s_repeatedWordCheckId)
            .Select(r => r.ItemText)
            .ToList();
        Assert.That(itemTexts, Has.Some.Contains("God"));
        Assert.That(itemTexts, Has.None.Contains("the"));
    }

    [Test]
    public void ProcessCheckJob_TextChangeThenStopDuringJob_DoesNotRunClearedChecksAgain()
    {
        var (runner, hookCheck, repeatedWordCheck) = CreateRunnerWithHookCheck(
            s_repeatedWordCheckId
        );
        var editClearedFinishedCheck = false;
        // As when a consumer abandons the job because of the edit: the stop request arrives once
        // the edit has cleared the finished check's results
        hookCheck.OnInitialize = () =>
        {
            PutBook(1, "In the beginning God God");
            editClearedFinishedCheck = SpinWait.SpinUntil(
                () => !AreResultsReady(repeatedWordCheck, 1),
                TimeSpan.FromSeconds(30)
            );
            foreach (var job in runner.ActiveJobs)
                job.StopRequested = true;
        };

        var (final, results) = RunJob(runner, [s_repeatedWordCheckId, HookCheckId], 1);

        Assert.That(editClearedFinishedCheck, Is.True);
        Assert.That(final.Status, Is.EqualTo(CheckJobStatus.Stopped), final.Error);
        Assert.That(results.Where(r => r.CheckId == s_repeatedWordCheckId), Is.Empty);
    }

    [Test]
    public void ProcessCheckJob_TextChangeAfterTheTextWasReadBeforeALaterCheckRuns_DeliversAndCachesTheNewText()
    {
        var (runner, hookCheck, _) = CreateRunnerWithHookCheck(s_repeatedWordCheckId);
        var editReachedTheChecks = false;
        // The hook check runs first. The book's text was already read for the whole job, so the
        // edit lands after that read and before the repeated-word check runs. The edit goes through
        // the project's real TextChanged handler, which clears every check's results for the book
        // and then asks consumers to run their checks again. That request is sent after the
        // clearing loop has covered the repeated-word check, so once it is out, the clear for the
        // repeated-word check has happened.
        hookCheck.OnInitialize = () =>
        {
            var requestsBeforeEdit = Client.SentRequestCount;
            PutBook(1, "In the beginning God God");
            editReachedTheChecks = SpinWait.SpinUntil(
                () => Client.SentRequestCount > requestsBeforeEdit,
                TimeSpan.FromSeconds(30)
            );
        };

        var (final, results) = RunJob(runner, [HookCheckId, s_repeatedWordCheckId], 1);

        Assert.That(editReachedTheChecks, Is.True);
        Assert.That(final.Status, Is.EqualTo(CheckJobStatus.Completed), final.Error);
        var itemTexts = results
            .Where(r => r.CheckId == s_repeatedWordCheckId)
            .Select(r => r.ItemText)
            .ToList();
        Assert.That(itemTexts, Has.Some.Contains("God"));
        Assert.That(itemTexts, Has.None.Contains("the"));

        // Results served from the cache by a later job are for the edited text too
        var (secondFinal, secondResults) = RunJob(runner, [s_repeatedWordCheckId], 1);
        Assert.That(secondFinal.Status, Is.EqualTo(CheckJobStatus.Completed), secondFinal.Error);
        var secondItemTexts = secondResults
            .Where(r => r.CheckId == s_repeatedWordCheckId)
            .Select(r => r.ItemText)
            .ToList();
        Assert.That(secondItemTexts, Has.Some.Contains("God"));
        Assert.That(secondItemTexts, Has.None.Contains("the"));
    }

    [Test]
    public void ProcessCheckJob_CheckThatFailsOnTheRerunAfterATextChange_IsRecordedAsAnError()
    {
        const string failingCheckId = "TestHookCheckThatFailsOnRerun";
        const string rerunFailureMessage = "The test check failed on the re-run on purpose.";
        var editingHook = new HookCheck();
        var failingHook = new HookCheck();
        ScriptureCheckBase Create(string checkId, ChecksDataSource dataSource) =>
            checkId switch
            {
                HookCheckId => editingHook,
                failingCheckId => failingHook,
                _ => CheckFactory.CreateCheck(checkId, dataSource),
            };
        var runner = CreateRunner(Create);
        runner.CheckCache.GetCheck(HookCheckId, _projectId).SettingsChanged = true;
        var editReachedTheChecks = false;
        // The editing hook is listed first, so the edit lands after the book's text was read and
        // before the failing check runs. That check's first run succeeds but is not marked ready,
        // so the job runs it again, and the re-run throws.
        editingHook.OnInitialize = () =>
        {
            var requestsBeforeEdit = Client.SentRequestCount;
            PutBook(1, "In the beginning God God");
            editReachedTheChecks = SpinWait.SpinUntil(
                () => Client.SentRequestCount > requestsBeforeEdit,
                TimeSpan.FromSeconds(30)
            );
        };
        var failingHookRuns = 0;
        failingHook.OnRun = _ =>
        {
            if (++failingHookRuns > 1)
                throw new InvalidOperationException(rerunFailureMessage);
        };
        var originalOut = Console.Out;
        var capturedText = new StringWriter();
        Console.SetOut(TextWriter.Synchronized(capturedText));
        (CheckJobStatusReport Final, List<CheckRunResult> Results) job;
        try
        {
            job = RunJob(runner, [HookCheckId, failingCheckId], 1);
        }
        finally
        {
            Console.SetOut(originalOut);
        }

        Assert.That(editReachedTheChecks, Is.True);
        Assert.That(failingHookRuns, Is.EqualTo(2));
        Assert.That(job.Final.Status, Is.EqualTo(CheckJobStatus.Completed), job.Final.Error);
        Assert.That(
            job.Final.CheckErrors,
            Is.EqualTo(new[] { new CheckJobError(failingCheckId, rerunFailureMessage) })
        );
        // A check whose re-run failed is reported as an error, not also as left out of the job
        Assert.That(capturedText.ToString(), Does.Not.Contain("was left out of job"));
    }

    [Test]
    public void ProcessCheckJob_CheckReinitializedDuringJobWithoutTextChange_Completes()
    {
        var (runner, hookCheck, _) = CreateRunnerWithHookCheck(s_repeatedWordCheckId);
        var hookRan = false;
        hookCheck.OnInitialize = () => hookRan = true;

        var (final, results) = RunJob(runner, [s_repeatedWordCheckId, HookCheckId], 1);

        Assert.That(hookRan, Is.True);
        Assert.That(final.Status, Is.EqualTo(CheckJobStatus.Completed), final.Error);
        Assert.That(results.Where(r => r.CheckId == s_repeatedWordCheckId), Is.Not.Empty);
    }

    #endregion
}

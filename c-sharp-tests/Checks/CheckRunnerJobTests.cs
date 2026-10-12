using System.Diagnostics;
using System.Diagnostics.CodeAnalysis;
using System.Reflection;
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

    internal void SetValidQuotationRules()
    {
        _scrText.Settings.Quotes = new QuoteMarks("“", "”");
        _scrText.Settings.InnerQuotes = new QuoteMarks("‘", "’");
        // The dummy project continues quotes by default, which requires somewhere to continue them
        _scrText.Settings.ContinueAt = "p";
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

    internal static T Invoke<T>(CheckRunner runner, string methodName, params object?[] args)
    {
        var method =
            typeof(CheckRunner).GetMethod(
                methodName,
                BindingFlags.NonPublic | BindingFlags.Instance
            ) ?? throw new MissingMethodException(nameof(CheckRunner), methodName);
        try
        {
            return (T)method.Invoke(runner, args)!;
        }
        catch (TargetInvocationException tie) when (tie.InnerException != null)
        {
            throw tie.InnerException;
        }
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
        var jobId = Invoke<string>(runner, "BeginCheckJob", scope);

        var results = new List<CheckRunResult>();
        var stopwatch = Stopwatch.StartNew();
        while (stopwatch.Elapsed < TimeSpan.FromSeconds(30))
        {
            var report = Invoke<CheckJobStatusReport>(
                runner,
                "RetrieveCheckJobUpdate",
                jobId,
                10_000
            );
            if (report.NextResults != null)
                results.AddRange(report.NextResults);
            if (report.Status != CheckJobStatus.Queued && report.Status != CheckJobStatus.Running)
            {
                // Drain anything produced after the last poll
                var tail = Invoke<CheckJobStatusReport>(
                    runner,
                    "RetrieveCheckJobUpdate",
                    jobId,
                    10_000
                );
                if (tail.NextResults != null)
                    results.AddRange(tail.NextResults);
                return (report, results);
            }
            Thread.Sleep(20);
        }
        throw new TimeoutException($"Check job {jobId} did not finish within 30 seconds");
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
        // 'Quotes in Quotes' incomplete: passes P9's SetupComplete, throws in Run
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

        SetValidQuotationRules();
        var (second, _) = RunJob(runner, [s_quotationCheckId], 1);

        Assert.That(second.Status, Is.EqualTo(CheckJobStatus.Completed), second.Error);
        Assert.That(second.CheckErrors, Is.Null);
    }

    #endregion
}

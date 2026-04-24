using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.EnhancedResources;
using SIL.Scripture;
using TestParanextDataProvider.EnhancedResources.Fixtures;

namespace TestParanextDataProvider.EnhancedResources;

/// <summary>
/// Tests for SourceLanguageSearchService.ExecuteSearchAsync.
/// CAP-012: ExecuteSourceLanguageSearch.
/// Service is instance-based; each test constructs SourceLanguageSearchService
/// with a SourceLanguageData record and a MarbleDataAccessService that reports
/// HaveMarbleData = true (or false for the precondition test).
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
internal class SourceLanguageSearchServiceTests
{
    private const string TestResourceId = "SDBG";
    private const int ContextLimit = 10_000;

    private static SourceLanguageSearchService BuildServiceWithData()
    {
        var data = SourceLanguageSearchFixtures.BuildSourceLanguageData();
        var marbleData = new MarbleDataAccessService();
        MarbleTestHelper.InitializeWithTestData(marbleData);
        return new SourceLanguageSearchService(data, marbleData);
    }

    private static SourceLanguageSearchService BuildServiceWithNoMarbleData()
    {
        var data = SourceLanguageSearchFixtures.BuildSourceLanguageData();
        var marbleData = new MarbleDataAccessService();
        MarbleTestHelper.InitializeWithNoData(marbleData);
        return new SourceLanguageSearchService(data, marbleData);
    }

    private static SourceLanguageSearchInput CreateInput(
        string searchText,
        BookRange? bookRange = null,
        int showInContextLimit = ContextLimit
    ) =>
        new(
            SearchText: searchText,
            BookRange: bookRange,
            ResourceId: TestResourceId,
            ShowInContextLimit: showInContextLimit
        );

    [Test]
    public async Task ExecuteSearchAsync_KnownLemma_ReturnsResults()
    {
        var service = BuildServiceWithData();

        var result = await service.ExecuteSearchAsync(CreateInput("logos"), CancellationToken.None);

        Assert.That(result.Results, Is.Not.Empty);
        Assert.That(result.Results[0].Translit, Is.EqualTo("logos"));
        Assert.That(result.TotalOccurrences, Is.EqualTo(7));
        Assert.That(result.ExceedsLimit, Is.False);
        Assert.That(result.ErrorMessage, Is.Null);
    }

    [Test]
    public async Task ExecuteSearchAsync_TrailingNotationStripped_ResolvesToBareLemma()
    {
        var service = BuildServiceWithData();

        var result = await service.ExecuteSearchAsync(
            CreateInput("logos:2"),
            CancellationToken.None
        );

        Assert.That(result.Results, Has.Count.EqualTo(1));
        Assert.That(result.Results[0].Translit, Is.EqualTo("logos"));
    }

    [Test]
    public async Task ExecuteSearchAsync_UnknownLemma_ReturnsNoMatchingLemmaMessage()
    {
        var service = BuildServiceWithData();

        var result = await service.ExecuteSearchAsync(
            CreateInput("nonexistent"),
            CancellationToken.None
        );

        Assert.That(result.Results, Is.Empty);
        Assert.That(result.TotalOccurrences, Is.EqualTo(0));
        Assert.That(result.ErrorMessage, Is.EqualTo("No matching lemma"));
    }

    [Test]
    public async Task ExecuteSearchAsync_BookRangeFilter_KeepsOnlyOccurrencesInRange()
    {
        var service = BuildServiceWithData();

        // John (43) only.
        var input = CreateInput("logos", bookRange: new BookRange(Start: 43, End: 43));

        var result = await service.ExecuteSearchAsync(input, CancellationToken.None);

        Assert.That(result.TotalOccurrences, Is.EqualTo(2));
        Assert.That(result.Results[0].Occurrences.All(vr => vr.BookNum == 43), Is.True);
    }

    [Test]
    public async Task ExecuteSearchAsync_BookRangeFilter_AllOccurrencesRemoved_ReturnsNoMatchingLemma()
    {
        var service = BuildServiceWithData();

        // Genesis (1) only - no Greek NT lemma would appear here.
        var input = CreateInput("logos", bookRange: new BookRange(Start: 1, End: 1));

        var result = await service.ExecuteSearchAsync(input, CancellationToken.None);

        Assert.That(result.Results, Is.Empty);
        Assert.That(result.ErrorMessage, Is.EqualTo("No matching lemma"));
    }

    [Test]
    public async Task ExecuteSearchAsync_BelowContextLimit_ExceedsLimitIsFalse()
    {
        var service = BuildServiceWithData();

        var result = await service.ExecuteSearchAsync(
            CreateInput("logos", showInContextLimit: 100),
            CancellationToken.None
        );

        Assert.That(result.ExceedsLimit, Is.False);
    }

    [Test]
    public async Task ExecuteSearchAsync_AboveContextLimit_ExceedsLimitIsTrue()
    {
        var service = BuildServiceWithData();

        var result = await service.ExecuteSearchAsync(
            CreateInput("logos", showInContextLimit: 3),
            CancellationToken.None
        );

        Assert.That(result.ExceedsLimit, Is.True);
    }

    [Test]
    public void ExecuteSearchAsync_EmptySearchText_ThrowsInvalidArgument()
    {
        var service = BuildServiceWithData();

        var ex = Assert.ThrowsAsync<InvalidOperationException>(
            () => service.ExecuteSearchAsync(CreateInput(""), CancellationToken.None)
        );
        Assert.That(ex!.Message, Does.Contain("Search text"));
    }

    [Test]
    public void ExecuteSearchAsync_NoMarbleData_ThrowsFailedPrecondition()
    {
        var service = BuildServiceWithNoMarbleData();

        var ex = Assert.ThrowsAsync<InvalidOperationException>(
            () => service.ExecuteSearchAsync(CreateInput("logos"), CancellationToken.None)
        );
        Assert.That(ex!.Message, Does.Contain("Enhanced Resource"));
    }

    [Test]
    public void ExecuteSearchAsync_CancellationRequested_Throws()
    {
        var service = BuildServiceWithData();
        using var cts = new CancellationTokenSource();
        cts.Cancel();

        Assert.ThrowsAsync<OperationCanceledException>(
            () => service.ExecuteSearchAsync(CreateInput("logos"), cts.Token)
        );
    }

    [Test]
    public async Task ExecuteSearchAsync_SpecialCharacters_DoesNotHang()
    {
        // BHV-T013: Dictionary lookup (not regex) inherently avoids catastrophic backtracking.
        var service = BuildServiceWithData();

        // A pathological input that would blow up a naive regex.
        var result = await service.ExecuteSearchAsync(
            CreateInput("(a+)+b"),
            CancellationToken.None
        );

        Assert.That(result.Results, Is.Empty);
        Assert.That(result.ErrorMessage, Is.EqualTo("No matching lemma"));
    }
}

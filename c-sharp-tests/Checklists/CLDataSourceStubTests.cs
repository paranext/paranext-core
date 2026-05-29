using Paranext.DataProvider.Projects;
using Paranext.DataProvider.Stubs.Checklists;
using SIL.Scripture;

namespace TestParanextDataProvider.Checklists;

/// <summary>
/// Verifies the golden-master-backed checklist stub
/// (<see cref="Paranext.DataProvider.Stubs.Checklists.CLDataSource"/>) replays captured PT9 punctuation
/// output. The stub matches a scenario by the scenario id embedded in the first project's
/// <c>ScrText.Name</c>, so each test names its <see cref="DummyScrText"/> after the scenario it wants.
/// </summary>
[TestFixture]
public class CLDataSourceStubTests
{
    private static DummyScrText CreateScrTextForScenario(string scenarioName)
    {
        // 24-char hex id (HexId.FromStr inside DummyScrText parses this).
        var id = Guid.NewGuid().ToString("N")[..24];
        var details = new ProjectDetails(
            scenarioName,
            new ProjectMetadata(id, []),
            "testDirectory_" + id
        );
        return new DummyScrText(details);
    }

    [Test]
    public void BuildRows_Gm001_CellShape_ReplaysVerseTextAndPunctuationSequence()
    {
        using var scrText = CreateScrTextForScenario("gm-001-cell-shape");
        var checklist = new CLData(ChecklistType.Punctuation, [scrText], "Punctuation");

        var result = CLDataSource.BuildRows(
            checklist,
            new VerseRef("EXO 20:1", ScrVers.English),
            new VerseRef("EXO 20:20", ScrVers.English),
            new Dictionary<string, string> { ["punctuationFilter"] = "" },
            showReferencedVerseText: true,
            hideMatches: true
        );

        Assert.That(result, Is.True);
        Assert.That(checklist.ExcludedCount, Is.EqualTo(0));
        Assert.That(checklist.Rows, Has.Count.EqualTo(3));

        // Row 0: "EXO 20:1", sequence ".!", verse + text items.
        var cell0 = (CLPunctuationCell)checklist.Rows[0].Cells[0];
        Assert.That(checklist.Rows[0].IsMatch, Is.True);
        Assert.That(cell0.Reference, Is.EqualTo("EXO 20:1"));
        Assert.That(cell0.PunctuationSequence, Is.EqualTo(".!"));
        Assert.That(cell0.Paragraphs, Has.Count.EqualTo(1));

        var items0 = cell0.Paragraphs[0].Items;
        Assert.That(items0, Has.Count.EqualTo(2));
        var verse0 = (CLVerse)items0[0];
        Assert.That(verse0.Book, Is.EqualTo("EXO"));
        Assert.That(verse0.Chapter, Is.EqualTo("20"));
        Assert.That(verse0.Verse, Is.EqualTo("1"));
        Assert.That(verse0.ShowInDisplay, Is.False);
        var text0 = (CLText)items0[1];
        Assert.That(text0.Text, Is.EqualTo("one. another! "));
        Assert.That(text0.Marker, Is.EqualTo(""));

        // Remaining rows preserve source order of sequences.
        Assert.That(
            checklist.Rows.Select(r => ((CLPunctuationCell)r.Cells[0]).PunctuationSequence),
            Is.EqualTo(new[] { ".!", "?", "!" })
        );
    }

    [Test]
    public void BuildRows_Gm006_SequenceSourceOrder_PreservesUnsortedSequence()
    {
        using var scrText = CreateScrTextForScenario("gm-006-sequence-source-order");
        var checklist = new CLData(ChecklistType.Punctuation, [scrText], "Punctuation");

        var result = CLDataSource.BuildRows(
            checklist,
            new VerseRef("GEN 1:1", ScrVers.English),
            new VerseRef("GEN 1:10", ScrVers.English),
            new Dictionary<string, string> { ["punctuationFilter"] = "" },
            showReferencedVerseText: true,
            hideMatches: false
        );

        Assert.That(result, Is.True);
        Assert.That(checklist.Rows, Has.Count.EqualTo(1));

        var cell = (CLPunctuationCell)checklist.Rows[0].Cells[0];
        Assert.That(cell.Reference, Is.EqualTo("GEN 1:1"));
        // Source order ".,!" — NOT sorted. This is the invariant under test (INV-B-05).
        Assert.That(cell.PunctuationSequence, Is.EqualTo(".,!"));
        var text = (CLText)cell.Paragraphs[0].Items[1];
        Assert.That(text.Text, Is.EqualTo("A. B, C! "));
    }

    [Test]
    public void BuildRows_Gm002_EmptyFilterSentinel_IncludesAllQualifyingPunctuation()
    {
        using var scrText = CreateScrTextForScenario("gm-002-empty-filter-sentinel");
        var checklist = new CLData(ChecklistType.Punctuation, [scrText], "Punctuation");

        var result = CLDataSource.BuildRows(
            checklist,
            new VerseRef("GEN 1:1", ScrVers.English),
            new VerseRef("GEN 1:10", ScrVers.English),
            new Dictionary<string, string> { ["punctuationFilter"] = "" },
            showReferencedVerseText: true,
            hideMatches: false
        );

        Assert.That(result, Is.True);
        Assert.That(checklist.ExcludedCount, Is.EqualTo(0));
        // Empty filter means "include all qualifying punctuation": v1 (".!") and v2 ("?") both
        // appear; v3 ("three", no punctuation) is omitted -> 2 rows.
        Assert.That(checklist.Rows, Has.Count.EqualTo(2));
        Assert.That(
            checklist.Rows.Select(r => r.Cells[0].Reference),
            Is.EqualTo(new[] { "GEN 1:1", "GEN 1:2" })
        );
        Assert.That(
            checklist.Rows.Select(r => ((CLPunctuationCell)r.Cells[0]).PunctuationSequence),
            Is.EqualTo(new[] { ".!", "?" })
        );
    }

    [Test]
    public void BuildRows_NoMatchingScenario_ReturnsTrueWithEmptyRows()
    {
        using var scrText = CreateScrTextForScenario("no-such-scenario");
        var checklist = new CLData(ChecklistType.Punctuation, [scrText], "Punctuation");

        var result = CLDataSource.BuildRows(
            checklist,
            new VerseRef("GEN 1:1", ScrVers.English),
            new VerseRef("GEN 1:10", ScrVers.English),
            new Dictionary<string, string> { ["punctuationFilter"] = "" },
            showReferencedVerseText: true,
            hideMatches: false
        );

        Assert.That(result, Is.True);
        Assert.That(checklist.Rows, Is.Empty);
        Assert.That(checklist.ExcludedCount, Is.EqualTo(0));
    }
}

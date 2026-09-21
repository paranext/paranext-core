using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Projects;

namespace TestParanextDataProvider.Projects;

/// <summary>
/// Pins <see cref="ChapterMarkerCorrection.FixChapterMarkers"/> to the behavior of Paratext 9's
/// <c>UsfmEditorTextLoader.FixChapterNumbers</c>, which is the algorithm this backstop ports. The
/// cases below are Paratext 9's own table, so a drift in either direction shows up here.
/// </summary>
[ExcludeFromCodeCoverage]
[TestFixture]
internal class ChapterMarkerCorrectionTests
{
    [TestCase(
        "1\r\n2\r\n",
        "1\r\n2\r\n",
        -1,
        TestName = "No change when the chapter number is not valid"
    )]
    [TestCase(
        "1\n2\n",
        "1\n2\n",
        -1,
        TestName = "No change when the chapter number is not valid, Unix line endings"
    )]
    [TestCase("1\r\n2\r\n", "1\r\n2\r\n", 1, TestName = "Chapter 1 need not have a chapter number")]
    [TestCase(
        "1\n2\n",
        "1\n2\n",
        1,
        TestName = "Chapter 1 need not have a chapter number, Unix line endings"
    )]
    [TestCase(
        "1\r\n2\n",
        "1\r\n2\n",
        1,
        TestName = "Chapter 1 need not have a chapter number, mixed line endings"
    )]
    [TestCase(
        "junk\r\n\\c 1\r\n",
        "junk\r\n\\c 2\r\n",
        1,
        TestName = "A chapter 1 number must be 1"
    )]
    [TestCase(
        "junk\r\n\\c 1\r\n",
        "junk\r\n\\c 2\n",
        1,
        TestName = "A chapter 1 number must be 1, Unix line endings"
    )]
    [TestCase(
        "\\ip p1\r\n\\ip p2\r\n\\c 1\r\n\\p p3\r\n",
        "\\ip p1\r\n\\c 1\r\n\\ip p2\r\n\\c 1\r\n\\p p3\r\n",
        1,
        TestName = "Chapter 1 takes the first marker not in the introduction"
    )]
    [TestCase(
        "\\ip p1\r\n\\c 1\r\n\\p p2\r\n\\p p3\r\n",
        "\\ip p1\r\n\\c 1\r\n\\p p2\r\n\\c 1\r\n\\p p3\r\n",
        1,
        TestName = "Chapter 1 keeps an already non-introductory first marker"
    )]
    [TestCase(
        "\\ip p1\r\n\\c 1\r\n\\p p2\r\n\\p p3\r\n",
        "\\ip p1\r\n\\c 1\r\n\\p p2\r\n\\c 1\n\\p p3\n",
        1,
        TestName = "Chapter 1 keeps an already non-introductory first marker, Unix line endings"
    )]
    [TestCase(
        "\\c 2\r\n1\r\n2\r\n",
        "\\c 2\r\n1\r\n2\r\n",
        2,
        TestName = "A correct chapter is left alone"
    )]
    [TestCase(
        "\\c 2\r\n1\r\n2\r\n",
        "1\r\n2\r\n",
        2,
        TestName = "A missing chapter marker is restored"
    )]
    [TestCase(
        "\\c 2\r\n1\r\n2\r\n",
        "\\c 3\r\n1\r\n2\r\n",
        2,
        TestName = "A wrong chapter number is corrected"
    )]
    [TestCase(
        "\\c 2\r\n1\r\n2\r\n",
        "\\c 2\r\n1\r\n\\c 2\r\n2\r\n",
        2,
        TestName = "A marker typed mid-chapter is removed"
    )]
    [TestCase(
        "\\c 2\r\n1\r\n2\r\n",
        "\\c 2\n1\r\n\\c 2\n2\r\n",
        2,
        TestName = "A marker typed mid-chapter is removed, Unix line endings"
    )]
    [TestCase(
        "\\c 2\r\n\\s Section Head",
        "\\c \\s Section Head",
        2,
        TestName = "A numberless chapter marker gets its number"
    )]
    public void FixChapterMarkers_MatchesParatext9(string expected, string usfm, int chapterNum)
    {
        var result = ChapterMarkerCorrection.FixChapterMarkers(
            usfm,
            chapterNum,
            out var wasCorrected
        );

        Assert.Multiple(() =>
        {
            Assert.That(result, Is.EqualTo(expected));
            Assert.That(wasCorrected, Is.EqualTo(result != usfm));
        });
    }

    /// <summary>
    /// A chapter's alternate (<c>\ca</c>), published (<c>\cp</c>) and chapter-label (<c>\cl</c>)
    /// numbering must survive a correction untouched. Nothing but
    /// <see cref="ChapterMarkerCorrection"/>'s own regex keeps it safe — the markers all begin
    /// <c>\c</c>, and only the whitespace the pattern demands after that <c>\c</c> tells them apart
    /// from a chapter marker — so a later loosening of that pattern would silently strip a
    /// project's alternate numbering with nothing else to catch it. The USJ port pins the same
    /// thing (<c>chapter-marker-repair.util.test.ts</c>).
    /// </summary>
    [TestCase(
        "\\c 2\r\n\\ca 3\\ca*\r\n\\cl Chapter Two\r\n\\cp B\r\n\\p\r\n\\v 1 text\r\n",
        "\\c 2\r\n\\ca 3\\ca*\r\n\\cl Chapter Two\r\n\\cp B\r\n\\p\r\n\\v 1 text\r\n",
        2,
        TestName = "Alternate and published chapter numbering needs no correction"
    )]
    [TestCase(
        "\\c 2\r\n\\ca 3\\ca*\r\n\\cl Chapter Two\r\n\\cp B\r\n\\p\r\n\\v 1 text\r\n",
        "\\c 7\r\n\\ca 3\\ca*\r\n\\cl Chapter Two\r\n\\cp B\r\n\\p\r\n\\v 1 text\r\n",
        2,
        TestName = "Alternate and published chapter numbering survives a correction"
    )]
    // Paratext 9 would move the alternate number off the marker's line and call that a correction;
    // the marker is right, so there is nothing to correct (see IsMarkerForChapter).
    [TestCase(
        "\\c 2 \\ca 3\\ca*\r\n\\p\r\n\\v 1 text\r\n",
        "\\c 2 \\ca 3\\ca*\r\n\\p\r\n\\v 1 text\r\n",
        2,
        TestName = "An alternate number on the marker's line needs no correction"
    )]
    [TestCase(
        "\\ip intro\r\n\\c 1 \\ca 2\\ca*\r\n\\p\r\n\\v 1 text\r\n",
        "\\ip intro\r\n\\c 1 \\ca 2\\ca*\r\n\\p\r\n\\v 1 text\r\n",
        1,
        TestName = "An alternate number on chapter 1's marker line needs no correction"
    )]
    [TestCase(
        "\\c 2\r\n \\ca 3\\ca*\r\n\\p\r\n\\v 1 text\r\n",
        "\\c 23 \\ca 3\\ca*\r\n\\p\r\n\\v 1 text\r\n",
        2,
        TestName = "A number that only begins with the chapter's is still corrected"
    )]
    public void FixChapterMarkers_KeepsAlternateAndPublishedNumbering(
        string expected,
        string usfm,
        int chapterNum
    )
    {
        var result = ChapterMarkerCorrection.FixChapterMarkers(
            usfm,
            chapterNum,
            out var wasCorrected
        );

        Assert.Multiple(() =>
        {
            Assert.That(result, Is.EqualTo(expected));
            Assert.That(wasCorrected, Is.EqualTo(result != usfm));
        });
    }

    [Test]
    public void FixChapterMarkers_LeavesBookLevelUsfmAlone()
    {
        const string bookUsfm = "\\id GEN\r\n\\c 1\r\n\\p one\r\n\\c 2\r\n\\p two\r\n";

        var result = ChapterMarkerCorrection.FixChapterMarkers(bookUsfm, 0, out var wasCorrected);

        Assert.Multiple(() =>
        {
            Assert.That(result, Is.EqualTo(bookUsfm));
            Assert.That(wasCorrected, Is.False);
        });
    }
}

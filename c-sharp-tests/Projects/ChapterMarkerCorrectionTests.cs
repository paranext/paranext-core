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

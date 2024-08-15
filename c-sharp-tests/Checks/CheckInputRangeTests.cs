using Paranext.DataProvider.Checks;
using SIL.Scripture;

namespace TestParanextDataProvider.Checks;

public class CheckInputRangeTests
{
    [TestCase("pid1", "GEN 1:1", "GEN 10:1", "pid1", 1, 4, true)] // In range (single book)
    [TestCase("pid1", "GEN 1:1", "EXO 10:1", "pid1", 1, 4, true)] // In range (multiple books)
    [TestCase("pid1", "GEN 1:1", "GEN 10:1", "pid2", 1, 4, false)] // Different project
    [TestCase("pid1", "GEN 1:1", "GEN 10:1", "pid1", 2, 4, false)] // Book outside range (single book)
    [TestCase("pid1", "GEN 1:1", "GEN 10:1", "pid1", 1, 11, false)] // Chapter after range
    [TestCase("pid1", "GEN 2:1", "GEN 10:1", "pid1", 1, 1, false)] // Chapter before range
    [TestCase("pid1", "GEN 1:1", null, "pid1", 1, 11, true)] // No end, normal in range
    [TestCase("pid1", "GEN 1:1", null, "pid1", 2, 11, false)] // No end, different book
    [TestCase("pid1", "GEN 1:1", "LEV 10:1", "pid1", 5, 1, false)] // Book after range (multiple books)
    [TestCase("pid1", "EXO 1:1", "LEV 10:1", "pid1", 1, 1, false)] // Book before range (multiple books)
    [TestCase("pid1", "GEN 1:1", "GEN 10:1", "pid1", 0, 4, true)] // Book 0, chapter in range
    [TestCase("pid1", "GEN 1:1", "GEN 10:1", "pid1", 0, 20, true)] // Book 0, chapter outside of range
    [TestCase("pid1", "GEN 1:1", "GEN 10:1", "pid1", 1, 0, true)] // Book in range, Chapter 0
    public void IsWithinRange_IdentifiesOutOfRange(
        string verseRefProjectId,
        string verseRefStart,
        string? verseRefEnd,
        string projectId,
        int bookNum,
        int chapterNum,
        bool expectedResult
    )
    {
        VerseRef vrefStart = new(verseRefStart);
        VerseRef? vrefEnd = string.IsNullOrEmpty(verseRefEnd) ? null : new VerseRef(verseRefEnd);
        CheckInputRange checkInputRange = new(verseRefProjectId, vrefStart, vrefEnd);
        Assert.That(
            checkInputRange.IsWithinRange(projectId, bookNum, chapterNum),
            Is.EqualTo(expectedResult)
        );
    }

    [TestCase(null, 1, 1, 1, 1, "projectId")]
    [TestCase("", 1, 1, 1, 1, "empty string")]
    [TestCase("projectId", 1, 0, 1, 10, "start.ChapterNum must be > 0")]
    [TestCase("projectId", 1, 1, 1, 0, "end.ChapterNum must be > 0")]
    [TestCase("projectId", 3, 1, 1, 1, "end must come after start")]
    public void CheckInputRange_Constructor_ThrowsWithBadInputs(
        string? projectId,
        int bookNumStart,
        int chapterNumStart,
        int? bookNumEnd,
        int? chapterNumEnd,
        string expectedPartialMessage
    )
    {
        string exceptionMessage = string.Empty;
        try
        {
            var checkInputRange = new CheckInputRange(
                projectId!,
                new VerseRef(bookNumStart, chapterNumStart, 1),
                bookNumEnd.HasValue && chapterNumEnd.HasValue
                    ? new VerseRef(bookNumEnd.Value, chapterNumEnd.Value, 1)
                    : null
            );

            // This line is to just get linters to not complain about unused variables
            checkInputRange.ToString();
        }
        catch (ArgumentException ex)
        {
            exceptionMessage = ex.Message;
        }

        Assert.That(exceptionMessage, Does.Contain(expectedPartialMessage));
    }
}

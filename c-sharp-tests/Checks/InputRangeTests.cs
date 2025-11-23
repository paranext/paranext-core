using Paranext.DataProvider.Checks;
using SIL.Scripture;

namespace TestParanextDataProvider.Checks;

public class InputRangeTests
{
    [TestCase("pid1", "GEN 1:1", "GEN 10:1", "pid1", 1, 4, ExpectedResult = true)] // In range (single book)
    [TestCase("pid1", "GEN 1:1", "EXO 10:1", "pid1", 1, 4, ExpectedResult = true)] // In range (multiple books)
    [TestCase("pid1", "GEN 1:1", "GEN 10:1", "pid2", 1, 4, ExpectedResult = false)] // Different project
    [TestCase("pid1", "GEN 1:1", "GEN 10:1", "pid1", 2, 4, ExpectedResult = false)] // Book outside range (single book)
    [TestCase("pid1", "GEN 1:1", "GEN 10:1", "pid1", 1, 11, ExpectedResult = false)] // Chapter after range
    [TestCase("pid1", "GEN 2:1", "GEN 10:1", "pid1", 1, 1, ExpectedResult = false)] // Chapter before range
    [TestCase("pid1", "GEN 1:1", null, "pid1", 1, 1, ExpectedResult = true)] // No end, same chapter in range
    [TestCase("pid1", "GEN 1:1", null, "pid1", 1, 2, ExpectedResult = false)] // No end, different chapter
    [TestCase("pid1", "GEN 1:1", null, "pid1", 2, 11, ExpectedResult = false)] // No end, different book
    [TestCase("pid1", "GEN 1:1", "LEV 10:1", "pid1", 5, 1, ExpectedResult = false)] // Book after range (multiple books)
    [TestCase("pid1", "EXO 1:1", "LEV 10:1", "pid1", 1, 1, ExpectedResult = false)] // Book before range (multiple books)
    [TestCase("pid1", "GEN 1:1", "GEN 10:1", "pid1", 0, 4, ExpectedResult = true)] // Book 0, chapter in range
    [TestCase("pid1", "GEN 1:1", "GEN 10:1", "pid1", 0, 20, ExpectedResult = true)] // Book 0, chapter outside of range
    [TestCase("pid1", "GEN 1:1", "GEN 10:1", "pid1", 1, 0, ExpectedResult = true)] // Book in range, Chapter 0
    public bool IsWithinRange_IdentifiesOutOfRange(
        string verseRefProjectId,
        string verseRefStart,
        string? verseRefEnd,
        string projectId,
        int bookNum,
        int chapterNum
    )
    {
        VerseRef vrefStart = new(verseRefStart);
        VerseRef? vrefEnd = string.IsNullOrEmpty(verseRefEnd) ? null : new VerseRef(verseRefEnd);
        InputRange checkInputRange = new(verseRefProjectId, vrefStart, vrefEnd);
        return checkInputRange.IsWithinRange(projectId, bookNum, chapterNum);
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
            var checkInputRange = new InputRange(
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

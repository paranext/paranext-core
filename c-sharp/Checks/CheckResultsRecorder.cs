using Paratext.Checks;
using Paratext.Data;
using Paratext.Data.Checking;
using Paratext.Data.Find;
using PtxUtils;
using SIL.Scripture;

namespace Paranext.DataProvider.Checks;

/// <summary>
/// This class implements <see cref="IRecordCheckError"/> which is needed to call
/// <see cref="ScriptureCheckBase.Run"/> on each check. Checks use <see cref="IRecordCheckError"/>
/// objects for reporting problems to the user. This class is essentially an adapter for storing a
/// list of problems from checks.
/// </summary>
public sealed class CheckResultsRecorder(string checkId, string projectId) : IRecordCheckError
{
    public int CurrentBookNumber { get; set; } = 0;

    public void RecordError(
        ITextToken token,
        int offset,
        int length,
        Enum<CheckType> checkType,
        string message,
        Enum<MessageId> messageId,
        VerseListItemType type = VerseListItemType.Error
    )
    {
        var chapterVerse = token.ScrRefString.Split(":");
        int chapterNumber = int.Parse(chapterVerse[0]);
        int verseNumber = GetVerseNumber(chapterVerse[1]);
        VerseRef verseRef = new (CurrentBookNumber, chapterNumber, verseNumber);
        CheckRunResults.Add(new CheckRunResult(
            checkId,
            projectId,
            message,
            new CheckLocation(verseRef, offset),
            new CheckLocation(verseRef, offset + length)));
    }

    public void RecordError(
        VerseRef vref,
        string text,
        int selectionStart,
        string message,
        Enum<CheckType> checkType,
        Enum<MessageId> messageId,
        VerseListItemType type = VerseListItemType.Error
    )
    {
        CheckRunResults.Add(new CheckRunResult(
            checkId,
            projectId,
            message,
            new CheckLocation(vref, selectionStart),
            new CheckLocation(vref, selectionStart + text.Length)));
    }

    public List<CheckRunResult> CheckRunResults { get; } = [];

    private static int GetVerseNumber(string verseNumber)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(verseNumber);
        if (!IsDigit(verseNumber[0]))
            throw new ArgumentException($"verseNumber must start with an integer: {verseNumber}");

        int lastIndex = 1;
        while (lastIndex < verseNumber.Length)
        {
            if (!IsDigit(verseNumber[lastIndex]))
                break;
            lastIndex++;
        }
        return int.Parse(verseNumber[..lastIndex]);
    }

    private static bool IsDigit(char c)
    {
        return c >= '0' && c <= '9';
    }
}

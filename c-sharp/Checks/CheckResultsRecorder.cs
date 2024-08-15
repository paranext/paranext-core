using Paratext.Checks;
using Paratext.Data;
using Paratext.Data.Checking;
using Paratext.Data.Find;
using PtxUtils;
using SIL.Scripture;

namespace Paranext.DataProvider.Checks;

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
        int verseNumber = int.Parse(chapterVerse[1]);
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
}

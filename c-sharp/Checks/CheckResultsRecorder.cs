using Paranext.DataProvider.ParatextUtils;
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
    public List<CheckRunResult> CheckRunResults { get; } = [];

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
        CheckRunResults.Add(
            new CheckRunResult(
                checkId,
                projectId,
                message,
                // ParatextData adds a space at the end sometimes that isn't in the text
                token.Text.TrimEnd(),
                // Actual offsets will be calculated below after results have been filtered
                new CheckLocation(token.VerseRef, offset),
                new CheckLocation(token.VerseRef, 0)
            )
        );
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
        CheckRunResults.Add(
            new CheckRunResult(
                checkId,
                projectId,
                message,
                // ParatextData adds a space at the end sometimes that isn't in the text
                text.TrimEnd(),
                // Actual offsets will be calculated below after results have been filtered
                new CheckLocation(vref, selectionStart),
                new CheckLocation(vref, 0)
            )
        );
    }

    /// <summary>
    /// Remove all results that are within the given book and return them
    /// </summary>
    /// <returns>All results that were removed</returns>
    public List<CheckRunResult> TrimResultsFromBook(int bookNum)
    {
        var retVal = new List<CheckRunResult>();
        for (int i = CheckRunResults.Count - 1; i >= 0; i--)
        {
            var result = CheckRunResults[i];
            var verseRef = result.Start.VerseRef;
            if (verseRef.BookNum == bookNum)
            {
                retVal.Add(result);
                CheckRunResults.RemoveAt(i);
            }
        }
        return retVal;
    }

    /// <summary>
    /// Remove all results that are not within the given range
    /// </summary>
    public void FilterResults(CheckInputRange range)
    {
        for (int i = CheckRunResults.Count - 1; i >= 0; i--)
        {
            var result = CheckRunResults[i];
            var verseRef = result.Start.VerseRef;
            if (!range.IsWithinRange(result.ProjectId, verseRef.BookNum, verseRef.ChapterNum))
                CheckRunResults.RemoveAt(i);
        }
    }

    /// <summary>
    /// Given an indexed view of USFM text, determine the actual offsets to include for each result
    /// </summary>
    public void CalculateActualOffsets(UsfmBookIndexer indexer)
    {
        foreach (var result in CheckRunResults)
        {
            var verseIndex = indexer.GetIndex(result.Start.VerseRef);
            if (!verseIndex.HasValue)
            {
                result.Start.Offset = 0;
                continue;
            }

            var textIndex = indexer.Usfm.IndexOf(result.Text, verseIndex.Value);
            if (textIndex < 0)
            {
                result.Start.Offset = 0;
                continue;
            }

            result.Start.Offset += textIndex - verseIndex.Value;
            result.End.Offset = result.Start.Offset + result.Text.Length;
        }
    }
}

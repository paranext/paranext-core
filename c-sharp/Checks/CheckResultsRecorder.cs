using System.Text.RegularExpressions;
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
public sealed partial class CheckResultsRecorder(string checkId, string projectId)
    : IRecordCheckError
{
    /// <summary>
    /// Pre-compiled regex for extracting text between ||...|| markers for better performance
    /// </summary>
    [GeneratedRegex(@"\|\|(.*?)\|\|")]
    private static partial Regex ItemTextRegex();

    public List<CheckRunResult> CheckRunResults { get; } = [];

    public bool ResultsReady { get; set; } = false;

    /// <summary>
    /// Parses and normalizes check messages to a consistent format, and separates out item text if present.
    /// </summary>
    /// <param name="message">The raw message to parse</param>
    /// <returns>A tuple containing the normalized message and the extracted item text (if any)</returns>
    private static (string normalizedMessage, string itemText) ParseAndNormalizeMessage(
        string message
    )
    {
        if (string.IsNullOrWhiteSpace(message))
            return (string.Empty, string.Empty);

        string normalized = message.Trim();

        if (normalized.StartsWith("#"))
            normalized = normalized.Substring(1).Trim();

        string[] parts = normalized.Split(':', 2);
        string messageText = parts[0].Trim();
        string? itemText = parts.Length > 1 ? parts[1].Trim() : null;

        if (!string.IsNullOrWhiteSpace(itemText))
        {
            // Remove all pairs of vertical bars (||) from the string
            itemText = itemText.Replace("||", "");
            return ($"{messageText}: {itemText}", itemText);
        }

        return (messageText, string.Empty);
    }

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
        (string normalizedMessage, string itemText) = ParseAndNormalizeMessage(message);
        CheckRunResults.Add(
            new CheckRunResult(
                checkId,
                messageId.InternalValue,
                projectId,
                normalizedMessage,
                // ParatextData adds a space at the end sometimes that isn't in the text
                token.Text.TrimEnd(),
                itemText,
                false,
                token.VerseRef,
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
        (string normalizedMessage, string itemText) = ParseAndNormalizeMessage(message);
        CheckRunResults.Add(
            new CheckRunResult(
                checkId,
                messageId.InternalValue,
                projectId,
                normalizedMessage,
                // ParatextData adds a space at the end sometimes that isn't in the text
                text.TrimEnd(),
                itemText,
                false,
                vref,
                // Actual offsets will be calculated below after results have been filtered
                new CheckLocation(vref, selectionStart),
                new CheckLocation(vref, 0)
            )
        );
    }

    public void ClearResults()
    {
        ResultsReady = false;
        CheckRunResults.Clear();
    }

    /// <summary>
    /// Remove all results that are within the given book and return them
    /// </summary>
    /// <returns>All results that were removed</returns>
    public void ClearResultsFromBook(int bookNum)
    {
        ResultsReady = false;
        for (int i = CheckRunResults.Count - 1; i >= 0; i--)
        {
            var result = CheckRunResults[i];
            var verseRef = result.Start.VerseRef;
            if (verseRef.BookNum == bookNum)
            {
                CheckRunResults.RemoveAt(i);
            }
        }
    }

    public IEnumerable<CheckRunResult> GetResultsInRange(CheckInputRange range)
    {
        foreach (var result in CheckRunResults)
        {
            if (
                range.IsWithinRange(
                    result.ProjectId,
                    result.VerseRef.BookNum,
                    result.VerseRef.ChapterNum
                )
            )
                yield return result;
        }
    }

    /// <summary>
    /// After a check has finished running, filter and complete filling in data on the results found.
    /// This will:<br/>
    /// 1. Lookup whether each check result was previously denied<br/>
    /// 2. Calculate actual offsets for each result
    /// </summary>
    public void PostProcessResults(ErrorMessageDenials? denials, UsfmBookIndexer? indexer)
    {
        for (int i = CheckRunResults.Count - 1; i >= 0; i--)
        {
            var result = CheckRunResults[i];

            // Lookup whether a check was previously denied
            if (denials != null)
            {
                var isDenied = denials.IsDenied(
                    new Enum<MessageId>(result.CheckResultType),
                    result.VerseRef,
                    "",
                    result.ItemText
                );
                if (isDenied != result.IsDenied)
                    CheckRunResults[i] = new CheckRunResult(
                        result.CheckId,
                        result.CheckResultType,
                        result.ProjectId,
                        result.MessageFormatString,
                        result.VerseText,
                        result.ItemText,
                        isDenied,
                        result.VerseRef,
                        result.Start,
                        result.End
                    );
            }

            // Calculate actual offsets
            if (indexer != null)
            {
                var verseIndex = indexer.GetIndex(result.Start.VerseRef);
                if (!verseIndex.HasValue)
                {
                    result.Start.Offset = 0;
                    continue;
                }

                var textIndex = indexer.Usfm.IndexOf(result.VerseText, verseIndex.Value);
                if (textIndex < 0)
                {
                    result.Start.Offset = 0;
                    continue;
                }

                result.Start.Offset += textIndex - verseIndex.Value;
                result.End.Offset = result.Start.Offset + result.VerseText.Length;
            }
        }
    }
}

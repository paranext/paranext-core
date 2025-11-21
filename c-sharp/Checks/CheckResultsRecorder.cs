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
internal sealed partial class CheckResultsRecorder(string checkId, string projectId)
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
        // Implementation copied from RunBasicChecks.RecordError

        // Essentially, all CheckDataSource.TextTokens are ParatextTextTokens, but they publicly
        // are typed as ITextToken for some reason. We need ParatextTextToken.VerseOffset here.
        ParatextTextToken paratextToken = (ParatextTextToken)token;

        string text = "";
        int selectionStart = 0;

        if (paratextToken.Text != null)
        {
            text = paratextToken.Text.Substring(
                offset,
                Math.Min(length, paratextToken.Text.Length - offset)
            );
            selectionStart = paratextToken.VerseOffset + offset;
        }

        RecordError(
            paratextToken.VerseRef,
            text,
            selectionStart,
            message,
            checkType,
            messageId,
            type
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
                text,
                itemText,
                false,
                vref,
                // Actual offsets will be calculated below after results have been filtered
                new UsfmLocation(vref, selectionStart),
                new UsfmLocation(vref, selectionStart + text.Length)
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

    public IEnumerable<CheckRunResult> GetResultsInRange(InputRange range)
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
    /// This will look up whether each check result was previously denied
    /// </summary>
    public void PostProcessResults(ErrorMessageDenials? denials)
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
        }
    }
}

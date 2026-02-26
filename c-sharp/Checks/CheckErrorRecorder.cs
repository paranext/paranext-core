using Paratext.Checks;
using Paratext.Data;
using Paratext.Data.Checking;
using Paratext.Data.Find;
using PtxUtils;
using SIL.Scripture;

namespace Paranext.DataProvider.Checks;

/// <summary>
/// Implements IRecordCheckError to collect check errors as VerseListItem instances.
/// Used by BasicChecksExecutionService to capture results from check.Run().
/// </summary>
internal sealed class CheckErrorRecorder(List<VerseListItem> results) : IRecordCheckError
{
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
        ParatextTextToken tok = (ParatextTextToken)token;

        string text = "";
        int selectionStart = 0;

        if (tok.Text != null)
        {
            text = tok.Text.Substring(offset, Math.Min(length, tok.Text.Length - offset));
            selectionStart = tok.VerseOffset + offset;
        }

        RecordError(tok.VerseRef, text, selectionStart, message, checkType, messageId, type);
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
        ScriptureSelection? selection = vref.IsDefault
            ? null
            : new ScriptureSelection(vref.Clone(), text, selectionStart);

        results.Add(new VerseListItem(selection, message, messageId, type));
    }
}

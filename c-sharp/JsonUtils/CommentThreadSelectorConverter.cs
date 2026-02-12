using System.Text.Json;
using System.Text.Json.Serialization;
using Paranext.DataProvider.Projects;
using SIL.Scripture;

namespace Paranext.DataProvider.JsonUtils;

/// <summary>
/// Converts frontend comment selector JSON to <see cref="CommentThreadSelector"/>,
/// automatically mapping frontend CommentStatus/CommentType values to internal
/// NoteStatus/NoteType values during deserialization.
/// </summary>
public class CommentThreadSelectorConverter : JsonConverter<CommentThreadSelector>
{
    private const string STATUS = "status";
    private const string TYPE = "type";
    private const string THREAD_ID = "threadId";
    private const string DATE_FILTER = "dateFilter";
    private const string AUTHOR = "author";
    private const string ASSIGNED_TO = "assignedTo";
    private const string SCRIPTURE_RANGES = "scriptureRanges";
    private const string IS_READ = "isRead";

    // DateFilter property names
    private const string EXACT = "exact";
    private const string BEFORE = "before";
    private const string AFTER = "after";
    private const string START = "start";
    private const string END = "end";

    // ScriptureRange property names
    private const string GRANULARITY = "granularity";

    public override CommentThreadSelector Read(
        ref Utf8JsonReader reader,
        Type typeToConvert,
        JsonSerializerOptions options
    )
    {
        using JsonDocument doc = JsonDocument.ParseValue(ref reader);
        JsonElement root = doc.RootElement;

        var selector = new CommentThreadSelector();

        if (root.TryGetProperty(THREAD_ID, out JsonElement threadIdEl))
            selector.ThreadId = threadIdEl.GetString();

        if (root.TryGetProperty(AUTHOR, out JsonElement authorEl))
            selector.Author = authorEl.GetString();

        if (root.TryGetProperty(ASSIGNED_TO, out JsonElement assignedToEl))
            selector.AssignedTo = assignedToEl.GetString();

        if (root.TryGetProperty(IS_READ, out JsonElement isReadEl))
            selector.IsRead = isReadEl.GetBoolean();

        // Convert frontend CommentStatus to internal NoteStatus
        if (
            root.TryGetProperty(STATUS, out JsonElement statusEl)
            && statusEl.GetString() is string statusValue
            && !string.IsNullOrEmpty(statusValue)
        )
        {
            selector.Status = JsonConverterUtils.ConvertCommentStatusToNoteStatus(statusValue);
        }

        // Convert frontend CommentType to internal NoteType
        if (
            root.TryGetProperty(TYPE, out JsonElement typeEl)
            && typeEl.GetString() is string typeValue
            && !string.IsNullOrEmpty(typeValue)
        )
        {
            selector.Type = JsonConverterUtils.ConvertCommentTypeToNoteType(typeValue);
        }

        if (root.TryGetProperty(DATE_FILTER, out JsonElement dateFilterEl))
            selector.DateFilter = ReadDateFilter(dateFilterEl);

        if (root.TryGetProperty(SCRIPTURE_RANGES, out JsonElement rangesEl))
            selector.ScriptureRanges = ReadScriptureRanges(rangesEl, options);

        return selector;
    }

    public override void Write(
        Utf8JsonWriter writer,
        CommentThreadSelector value,
        JsonSerializerOptions options
    )
    {
        // CommentThreadSelector is only deserialized from frontend requests, not serialized back
        throw new NotSupportedException("Writing CommentThreadSelector to JSON is not supported.");
    }

    private static DateFilter ReadDateFilter(JsonElement element)
    {
        var dateFilter = new DateFilter();

        if (element.TryGetProperty(EXACT, out JsonElement exactEl))
            dateFilter.Exact = exactEl.GetString();

        if (element.TryGetProperty(BEFORE, out JsonElement beforeEl))
            dateFilter.Before = beforeEl.GetString();

        if (element.TryGetProperty(AFTER, out JsonElement afterEl))
            dateFilter.After = afterEl.GetString();

        if (element.TryGetProperty(START, out JsonElement startEl))
            dateFilter.Start = startEl.GetString();

        if (element.TryGetProperty(END, out JsonElement endEl))
            dateFilter.End = endEl.GetString();

        return dateFilter;
    }

    private static List<ScriptureRange> ReadScriptureRanges(
        JsonElement element,
        JsonSerializerOptions options
    )
    {
        var ranges = new List<ScriptureRange>();

        foreach (JsonElement rangeEl in element.EnumerateArray())
        {
            VerseRef start = JsonSerializer.Deserialize<VerseRef>(
                rangeEl.GetProperty(START).GetRawText(),
                options
            );
            VerseRef end = JsonSerializer.Deserialize<VerseRef>(
                rangeEl.GetProperty(END).GetRawText(),
                options
            );
            string? granularity = rangeEl.TryGetProperty(GRANULARITY, out JsonElement granEl)
                ? granEl.GetString()
                : null;

            ranges.Add(
                new ScriptureRange
                {
                    Start = start,
                    End = end,
                    Granularity = granularity,
                }
            );
        }

        return ranges;
    }
}

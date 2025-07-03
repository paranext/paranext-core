using System.Diagnostics;

namespace Paranext.DataProvider;

public class TraceExclusionFilter(string excludeString) : TraceFilter
{
    private readonly string excludeString = excludeString;

    public override bool ShouldTrace(
        TraceEventCache? cache,
        string source,
        TraceEventType eventType,
        int id,
        string? formatOrMessage,
        object?[]? args,
        object? data1,
        object?[]? data
    )
    {
        // If the raw message (before formatting) matches, skip it.
        if (string.IsNullOrEmpty(formatOrMessage) || formatOrMessage == excludeString)
            return false;

        // Otherwise, allow it.
        return true;
    }
}
